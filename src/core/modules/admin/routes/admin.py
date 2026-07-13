from uuid import UUID

from fastapi import Request, Form, Depends
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from starlette.responses import RedirectResponse

from core.router.base import CustomRouter
from core.router.methods import get, post
from core.modules.auth.dependencies import require_group
from core.modules.auth.models.group import Group
from core.modules.auth.models.ad_mapping import AdGroupMapping
from core.settings import LDAP_ENABLED


class AdminRouter(CustomRouter):
    prefix = "/admin"
    template_path = "../templates"

    @get("/")
    async def admin_index(self, request: Request, _=require_group("admin")):
        return self.render_template(request, "admin.html")

    @get("/ldap-mapping")
    async def ldap_mapping_list(self, request: Request, _=require_group("admin")):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(AdGroupMapping)
            .options(selectinload(AdGroupMapping.group))
            .order_by(AdGroupMapping.created_at)
        )
        mappings = result.scalars().all()

        result = await db.execute(select(Group).order_by(Group.name))
        groups = result.scalars().all()

        return self.render_template(
            request,
            "admin_ldap_mapping.html",
            extra_context={
                "mappings": mappings,
                "groups": groups,
                "ldap_enabled": LDAP_ENABLED,
            },
        )

    @post("/ldap-mapping/create")
    async def ldap_mapping_create(
        self,
        request: Request,
        _=require_group("admin"),
        ad_group_name: str = Form(...),
        ad_group_dn: str = Form(...),
        group_id: str = Form(...),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        existing = await db.execute(
            select(AdGroupMapping).where(AdGroupMapping.group_id == UUID(group_id))
        )
        if existing.scalar_one_or_none():
            return RedirectResponse(url="/admin/ldap-mapping", status_code=303)

        mapping = AdGroupMapping(
            ad_group_name=ad_group_name,
            ad_group_dn=ad_group_dn,
            group_id=UUID(group_id),
        )
        db.add(mapping)
        await uow.commit()

        return RedirectResponse(url="/admin/ldap-mapping", status_code=303)

    @post("/ldap-mapping/{mapping_id}/delete")
    async def ldap_mapping_delete(
        self,
        request: Request,
        mapping_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        mapping = await db.get(AdGroupMapping, UUID(mapping_id))
        if mapping:
            await db.delete(mapping)
            await uow.commit()

        return RedirectResponse(url="/admin/ldap-mapping", status_code=303)

    @post("/ldap-mapping/sync")
    async def ldap_mapping_sync(self, request: Request, _=require_group("admin")):
        uow = request.scope.get("uow")
        from core.modules.auth.services.ad_sync import AdSyncService

        svc = AdSyncService(uow)
        result = await svc.sync_groups()

        return self.render_template(
            request,
            "admin_ldap_mapping.html",
            htmx_block="sync_result",
            extra_context={
                "sync_result": result,
                "ldap_enabled": LDAP_ENABLED,
            },
        )
