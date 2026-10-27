# Guia de Padrões e Convenções (`fasthtmx`)

Este documento detalha os padrões de templates, herança de layout, macros, banco de dados e customização de projetos derivados do **`fasthtmx`**.

---

## 1. Hierarquia de Templates e Softnav (`#content`)

A resolução de diretórios Jinja2 no `ContextRouter` (`src/core/router/context_router.py`) segue uma ordem estrita de prioridade para permitir que cada projeto customize qualquer tela sem tocar no `src/core/`:

1. **`src/templates/`** *(Prioridade máxima — Layout e overrides do projeto)*
2. **`src/modules/*/templates/`** *(Templates dos módulos de domínio)*
3. **`src/core/templates/`** *(Shell base `core/base_shell.html` e `macros/*.html`)*
4. **`src/core/modules/*/templates/`** *(Fallback padrão para `login.html`, `perfil.html`, etc.)*

### Como funciona o `core/base_shell.html` vs `layout/template.html`

- **`src/core/templates/core/base_shell.html`**:
  - Contém o `<head>` global, injeção de tema SSR (`data-theme` livre de *FOUC*), CSS compilado, importação do bundle JS, container de toasts e modais globais.
  - Expõe os blocos `{% block head_extra %}`, `{% block shell %}` e `{% block scripts_extra %}`.
- **`src/templates/layout/template.html`**:
  - Estende `core/base_shell.html` e define o cromo visual da aplicação (Sidebar, Header, Breadcrumb e a área `<main id="content">` onde o Softnav injeta os fragmentos).
- **Templates de Página (`src/modules/<slug>/templates/<slug>/*.html`)**:
  - Estendem `layout/template.html` e implementam `{% block content %}`.
  - Quando a requisição vem via HTMX (`HX-Request: true` sem `HX-Boosted`), o `ContextRouter` renderiza **apenas** o bloco `content` (ou o bloco alvo configurado). Quando o usuário acessa a URL diretamente ou aperta `F5`, o Jinja2 renderiza a árvore inteira (`base_shell.html` -> `layout/template.html` -> `content`).

### Customizando a Tela de Login sem tocar no `src/core/`

Como `src/templates/` tem precedência sobre `src/core/modules/auth/templates/`, basta criar `src/templates/login.html` no projeto derivado (garantindo a presença do bloco `{% block login_form %}` em volta do `<form>` para que erros `422` de autenticação sejam re-renderizados parcialmente).

---

## 2. Subpages (`#subpage-card`) Resilientes a `F5`

Muitas telas de detalhes possuem abas secundárias (ex.: `/projetos/1/subpage/tarefas`, `/projetos/1/subpage/arquitetura`).

Para evitar que dar `F5` na URL da subpage retorne um fragmento HTML solto sem CSS:

1. No template pai (`projetos/view.html`), use a macro `subpage_nav` e envolva o container da aba com `{% block subpage_content %}`:
   ```jinja2
   {% from "macros/subpage.html" import subpage_nav %}

   {{ subpage_nav(
       tabs=[
           {"slug": "tarefas", "label": "Tarefas", "url": "/projetos/" ~ projeto.id ~ "/subpage/tarefas", "icon": "check-square"},
           {"slug": "arquitetura", "label": "Arquitetura", "url": "/projetos/" ~ projeto.id ~ "/subpage/arquitetura", "icon": "layers"},
       ],
       active_tab=active_tab | default('tarefas')
   ) }}

   <div id="subpage-card">
       {% block subpage_content %}
           {% if subpage_template %}
               {% include subpage_template %}
           {% endif %}
       {% endblock subpage_content %}
   </div>
   ```
2. Na rota da subpage, retorne `self.subpage_response(...)`:
   ```python
   return self.subpage_response(
       request,
       parent_template="projetos/view.html",
       subpage_template=f"projetos/subpage/{tab_name}.html",
       context={"projeto": projeto, "active_tab": tab_name},
   )
   ```
   - **Clique na aba (`HX-Target: subpage-card`)**: renderiza somente `projetos/subpage/<tab>.html`.
   - **Softnav ou `F5` na URL da aba**: renderiza `projetos/view.html` já com a aba correta embutida.

---

## 3. Macros Oficiais do `src/core/templates/macros/`

| Arquivo | Macros Disponíveis | Uso Principal |
| :--- | :--- | :--- |
| `macros/forms.html` | `form_field`, `form_select`, `form_textarea`, `form_checkbox`, `form_error_banner` | Inputs padronizados que exibem erros automaticamante a partir do dicionário `errors` e preservam o valor digitado via `values`. |
| `macros/list.html` | `search_bar`, `sortable_th`, `pagination`, `empty_state` | Barra de busca com debounce HTMX, cabeçalhos de tabela ordenáveis (`sort`/`dir`) e paginação integrada ao `ListResult`. |
| `macros/subpage.html` | `subpage_nav` | Barra de navegação de abas HTMX com `hx-push-url="true"` e alvo `#subpage-card`. |
| `macros/ui.html` | `badge`, `stat_card`, `page_header`, `confirm_delete_modal` | Componentes visuais reutilizáveis e modal de exclusão com verificação assíncrona de bloqueadores. |

---

## 4. Migrações de Banco de Dados (Alembic)

O projeto suporta **SQLite** (padrão local) e **PostgreSQL** (`asyncpg` em produção/staging).

### Via CLI (`fasthtmx db`)
```bash
# Aplicar todas as migrações pendentes
uv run fasthtmx db upgrade

# Criar uma nova revisão autogerada
uv run fasthtmx db revision -m "add_nova_tabela"
```

### Via Alembic direto (selecionando dialeto `-x db=...`)
```bash
# SQLite
uv run alembic -x "db=sqlite" revision --autogenerate -m "descricao"
uv run alembic -x "db=sqlite" upgrade head

# PostgreSQL
uv run alembic -x "db=pg" revision --autogenerate -m "descricao"
uv run alembic -x "db=pg" upgrade head
```

---

## 5. Fluxo de Evolução Multi-Repositório (`core sync`)

O `fasthtmx` atua como repositório laboratório ("upstream") para os projetos internos construídos sobre a mesma arquitetura:

1. Desenvolva e teste melhorias de infraestrutura em `src/core/` ou `cli/` dentro do repositório `fasthtmx`.
2. Rode a suíte de testes (`uv run pytest -v`).
3. Verifique as diferenças nos projetos derivados com:
   ```bash
   uv run fasthtmx core sync --dry-run
   ```
4. Aplique a sincronização com:
   ```bash
   uv run fasthtmx core sync
   ```
   O comando copia `src/core/` e `cli/` preservando intactos `src/modules/`, `src/templates/` e `src/static/` de cada projeto derivado.
