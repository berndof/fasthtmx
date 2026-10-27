from decimal import Decimal
from urllib.parse import urlencode

import pytest
from fastapi.testclient import TestClient
from pydantic import Field
from starlette.requests import Request

from core.forms import parse_form
from core.schema import (
    BRLDecimal,
    CleanDigits,
    FormSchema,
    HtmlCheckbox,
    OptionalBRLDecimal,
    OptionalCleanDigits,
    OptionalStr,
)
from core.utils.blockers import build_blocker_html


class SampleForm(FormSchema):
    name: str = Field(min_length=3, max_length=50)
    cpf: OptionalCleanDigits = None
    price: BRLDecimal
    discount: OptionalBRLDecimal = None
    tags: list[str] = Field(default_factory=list)
    active: HtmlCheckbox = False
    notes: OptionalStr = None


def _make_form_request(pairs: list[tuple[str, str]]) -> Request:
    body = urlencode(pairs).encode("utf-8")

    async def receive():
        return {"type": "http.request", "body": body, "more_body": False}

    scope = {
        "type": "http",
        "http_version": "1.1",
        "method": "POST",
        "path": "/test",
        "headers": [
            (b"content-type", b"application/x-www-form-urlencoded"),
            (b"content-length", str(len(body)).encode("ascii")),
        ],
    }
    return Request(scope, receive)


@pytest.mark.anyio
async def test_parse_form_coercions_and_getlist():
    req = _make_form_request(
        [
            ("name", "  Torre Central  "),
            ("cpf", "123.456.789-00"),
            ("price", "R$ 1.250,75"),
            ("discount", ""),
            ("tags", "fibra"),
            ("tags", "energia"),
            ("notes", "   "),
            # active omitido (checkbox desmarcado no HTML) -> deve virar False
        ]
    )
    res = await parse_form(req, SampleForm)
    assert res.ok
    assert res.data is not None
    assert res.data.name == "Torre Central"
    assert res.data.cpf == "12345678900"
    assert res.data.price == Decimal("1250.75")
    assert res.data.discount is None
    assert res.data.tags == ["fibra", "energia"]
    assert res.data.active is False
    assert res.data.notes is None


@pytest.mark.anyio
async def test_parse_form_ptbr_errors():
    req = _make_form_request(
        [
            ("name", "ab"),
            ("price", "abc"),
        ]
    )
    res = await parse_form(req, SampleForm)
    assert res.failed
    assert "name" in res.errors
    assert "3 caracteres" in res.errors["name"]
    assert "price" in res.errors
    assert "Valor monetário inválido" in res.errors["price"]


def test_build_blocker_html_escapes_xss():
    html_out = build_blocker_html(
        [
            {
                "label": '<script>alert("xss1")</script>',
                "icon": "link",
                "items": [{"name": '<img src=x onerror=alert("xss2")>'}],
            }
        ]
    )
    assert "<script>" not in html_out
    assert "<img" not in html_out
    assert "&lt;script&gt;" in html_out
    assert "&lt;img" in html_out


def test_app_softnav_and_subpages():
    from app import app

    with TestClient(app) as client:
        # 1. Rota pública /login
        r_login = client.get("/login")
        assert r_login.status_code == 200
        assert "FastHTMX" in r_login.text
        assert "data-theme=" in r_login.text

        # 2. Rota protegida /home sem login -> redireciona para /login
        r_unauth = client.get("/home", follow_redirects=False)
        assert r_unauth.status_code == 302
        assert r_unauth.headers["location"] == "/login"

        # 3. Login com usuário default (superadmin / ti@scc.com.br / lfw-lala)
        r_auth = client.post(
            "/login",
            data={"email": "ti@scc.com.br", "password": "lfw-lala"},
            headers={"HX-Request": "true"},
        )
        assert r_auth.status_code == 200
        assert r_auth.headers.get("HX-Redirect") == "/home"

        # 4. GET /home no F5 (sem HX-Request) -> retorna documento HTML completo
        r_home_full = client.get("/home")
        assert r_home_full.status_code == 200
        assert "<!DOCTYPE html>" in r_home_full.text
        assert "FastHTMX Core Lab" in r_home_full.text

        # 5. GET /home via Softnav (HX-Request: true) -> retorna apenas o bloco #content
        r_home_hx = client.get("/home", headers={"HX-Request": "true"})
        assert r_home_hx.status_code == 200
        assert "<!DOCTYPE html>" not in r_home_hx.text
        assert "FastHTMX Core Lab" in r_home_hx.text

        # 6. Subpage /home/macros via HTMX vs F5
        r_sub_hx = client.get("/home/macros", headers={"HX-Request": "true"})
        assert r_sub_hx.status_code == 200
        assert "<!DOCTYPE html>" not in r_sub_hx.text
        assert "Macros Globais Disponíveis" in r_sub_hx.text

        r_sub_f5 = client.get("/home/macros")
        assert r_sub_f5.status_code == 200
        assert "<!DOCTYPE html>" in r_sub_f5.text
        assert "active: 'macros'" in r_sub_f5.text

        # 7. POST /home/playground com FormSchema + HX-Trigger
        r_play = client.post(
            "/home/playground",
            data={
                "project_name": "Portal Teste",
                "document": "11.222.333/0001-44",
                "budget": "R$ 9.800,50",
                "features": ["softnav", "sse"],
                "active": "true",
            },
            headers={"HX-Request": "true"},
        )
        assert r_play.status_code == 200
        assert "Portal Teste" in r_play.text
        assert "11222333000144" in r_play.text
        assert "hx-trigger" in r_play.headers

        # 8. Listagem de usuários com busca ?q=
        r_users = client.get("/user/list?q=Super", headers={"HX-Request": "true"})
        assert r_users.status_code == 200
        assert "Super Admin" in r_users.text

        # 9. Módulo Showcase /projetos (listagem, criação com BRLDecimal/getlist e subpage)
        r_proj_list = client.get("/projetos/list")
        assert r_proj_list.status_code == 200
        assert "Projetos (Showcase CRUD + Softnav)" in r_proj_list.text
        assert "PRJ-001" in r_proj_list.text

        r_proj_search = client.get(
            "/projetos/list?q=PRJ-001",
            headers={"HX-Request": "true", "HX-Target": "table-paged"},
        )
        assert r_proj_search.status_code == 200
        assert "Gestão de Torres" in r_proj_search.text

