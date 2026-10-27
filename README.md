# ⚡ FastHTMX

> **HTML + CSS + JS as God intended** — Uma arquitetura explícita, enxuta e assíncrona sobre **FastAPI + HTMX + Jinja2 Fragments + SQLAlchemy 2.0 Async + Tailwind CSS v4 + Alpine.js**.

O **FastHTMX** não é um meta-framework caixa-preta: ele organiza o núcleo repetitivo de aplicações web hipermídia (`src/core/`) de forma **explícita, legível e sem mágica oculta**, deixando os módulos de negócio (`src/modules/`) limpos e padronizados no modelo de navegação **Softnav (`#content`)**.

---

## ✨ O que já vem pronto no `src/core/`

- **🧭 `ContextRouter` + Softnav Nativo (`src/core/router/`)**
  - Autenticação obrigatória por padrão (`require_auth = True`), evitando esquecer `Depends(get_current_user)` em rotas internas (use `@route.get("/rota", public=True)` para rotas públicas).
  - Renderização inteligente via `jinja2-fragments`: entrega a página completa no acesso direto/`F5` e apenas o bloco `#content` em transições `HX-Request`.
  - **`subpage_response()`**: suporte de primeira classe para abas/sub-rotas (`#subpage-card`) que funcionam tanto no clique HTMX quanto dando `F5` direto na URL da aba.
  - **`oob_blocks` e `triggers`**: suporte nativo a múltiplos blocos `hx-swap-oob` e eventos JSON no header `HX-Trigger`.

- **📝 Formulários Explícitos (`parse_form` + `FormSchema` em `src/core/forms.py` & `src/core/schema.py`)**
  - Sem geradores de HTML mágicos: você escreve seu HTML/Tailwind normalmente e valida o payload com `result = await parse_form(request, MeuFormSchema)`.
  - Suporte automático a `form.getlist()` para campos `list[...]`, `set[...]`, `tuple[...]` (multi-checkboxes e multi-selects).
  - Tipos anotados prontos para uso:
    - `BRLDecimal` / `OptionalBRLDecimal`: converte `"1.234,56"` ou `"R$ 1.234,56"` direto para `Decimal`.
    - `CleanDigits` / `OptionalCleanDigits`: remove máscara de CPF, CNPJ, CEP ou telefone.
    - `HtmlCheckbox`: converte `"on"`, `"true"`, `"1"` em `True` e checkbox desmarcado/ausente em `False`.
    - `OptionalStr`: converte strings vazias `""` automaticamente em `None`.
  - Tradução unificada de erros do Pydantic v2 para **português (pt-BR)** e re-renderização com `self.form_error_response(...)` (`HTTP 422`).

- **📊 Listagens Paginadas, Ordenáveis e Buscáveis (`ListQuery` + `ListResult` em `src/core/lists.py`)**
  - Paginação, ordenação por coluna e busca textual (`?q=`) integradas ao `AbstractModelService.get_list_result(...)` e às macros de tabela (`macros/list.html`).

- **🛡️ Segurança, Auditoria & Async Real**
  - Sessões JWT (`access-token` + `refresh-token` HttpOnly) respaldadas por banco (`auth_sessions`) com revogação instantânea e throttle de 5 minutos em `touch_last_seen`.
  - Hash de senhas Argon2 executado fora do event loop via `asyncio.to_thread`.
  - `AbstractModelService` com *savepoints* (`begin_nested()`), conversão de `IntegrityError` em `UniqueViolation` amigável, *soft delete* com checagem de bloqueadores (`DeletionBlockedError` + `build_blocker_html` escapado contra XSS) e log automático de auditoria JSON (`audit_logs`).
  - Notificações em tempo real via **Server-Sent Events (SSE)** (`Notifier` com fallback em memória ou Redis Pub/Sub) e sistema de temas SSR livre de *FOUC*.

---

## 🚀 Quickstart

### 1. Pré-requisitos
- **Python 3.12+** e [`uv`](https://docs.astral.sh/uv/)
- **Node.js 20+** e [`pnpm`](https://pnpm.io/) (para compilar Tailwind v4 e bundle JS com `esbuild`)

### 2. Instalação e Execução (Modo Desenvolvimento)
Por padrão, o projeto roda imediatamente com **SQLite assíncrono (`aiosqlite`)** sem precisar subir container de banco:

```bash
# 1. Instalar dependências Python e Node
uv sync
pnpm install

# 2. Compilar assets (CSS Tailwind v4 + JS bundle)
pnpm run build:dev

# 3. Iniciar servidor de desenvolvimento (cria tabelas e seed automaticamente)
uv run fasthtmx dev
```

Acesse **http://localhost:8000** com as credenciais padrão de desenvolvimento:
- **E-mail / Usuário:** `ti@scc.com.br` (ou `superadmin`)
- **Senha:** `lfw-lala`

---

## 🧩 Explorando o Exemplo Completo Incluso (`/projetos/list`)

O repositório já inclui dois módulos de demonstração em [`src/modules/`](src/modules):
1. **`/home` (`src/modules/home/`)**: Playground interativo demonstrando subpages (`arquitetura`, `macros`, `status`) e validação de formulário HTMX ao vivo.
2. **`/projetos/list` (`src/modules/projetos/`)**: Um showcase completo de **CRUD + Subpages + Bloqueio de Exclusão** extraído dos padrões reais de produção:
   - Listagem com busca textual (`?q=`), ordenação por coluna e paginação parcial (`#table-paged`).
   - Criação de projeto demonstrando `BRLDecimal`, `HtmlCheckbox`, `OptionalStr` e `tags: list[str]` via `getlist()`.
   - Página de detalhes em duas colunas com abas HTMX (`subpage_response`) que suportam `F5` direto na URL da aba.
   - Modal de exclusão que verifica vínculos ativos (`GET /projetos/{id}/blockers`) e bloqueia a remoção enquanto houver tarefas pendentes.

---

## 🛠️ Comandos da CLI (`uv run fasthtmx`)

```bash
# Subir servidor de desenvolvimento (FastAPI + watchers de CSS/JS)
uv run fasthtmx dev

# Gerar um novo módulo completo já no padrão Softnav + ContextRouter
uv run fasthtmx module create <slug> --title "Meu Módulo" --with-subpages

# Gerenciar banco de dados e migrações Alembic
uv run fasthtmx db upgrade
uv run fasthtmx db revision -m "nova tabela"

# Sincronizar evoluções do src/core/ para projetos derivados
uv run fasthtmx core sync --dry-run
uv run fasthtmx core sync ../meu-outro-projeto
```

---

## 📁 Estrutura de Diretórios

```text
fasthtmx/
├── cli/                        # CLI (dev, db, user, module create, core sync)
├── scripts/                    # Scripts utilitários e default_seed.py
├── src/
│   ├── app.py                  # Entrypoint FastAPI + Lifespan + Exception Handlers
│   ├── core/                   # Núcleo agnóstico do framework (sincronizável via CLI)
│   │   ├── database.py         # Async SQLAlchemy 2.0 sessionmanager (SQLite / Postgres)
│   │   ├── forms.py            # parse_form() + FormResult + FormError
│   │   ├── schema.py           # FormSchema, BRLDecimal, CleanDigits, HtmlCheckbox
│   │   ├── lists.py            # ListQuery, ListResult, list_query_params
│   │   ├── router/             # ContextRouter + @route.get/post/put/patch/delete
│   │   ├── services/           # AbstractModelService (savepoints, audit, blockers)
│   │   ├── modules/            # Módulos base (auth, user, notifications, theme)
│   │   └── templates/          # Shell base (core/base_shell.html) e macros globais
│   ├── modules/                # Módulos de domínio da aplicação (ex: home, projetos)
│   ├── templates/              # Layout e páginas customizáveis do projeto
│   └── static/                 # CSS (Tailwind v4) e JS (HTMX + Alpine + componentes)
└── tests/                      # Suíte de testes automatizados (pytest)
```

---

## 🧪 Rodando os Testes

```bash
uv run pytest -v
```
