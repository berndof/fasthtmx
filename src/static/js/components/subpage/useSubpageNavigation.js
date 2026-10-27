// Factory genérico de navegação de subpáginas.
// Retorna config de Alpine component — specialize por recurso via onBeforeLoad/onAfterLoad.
import htmx from 'htmx.org'

export default (config = {}) => ({
    ...config,

    resourceId: config.resourceId || '',
    resourceType: config.resourceType || '',
    active: config.active || 'mapa',
    tabs: config.tabs || [],

    loading: false,
    errorMessage: '',
    _lastLoaded: null,
    _popHandler: null,

    // --- Hooks (override por especialização) ---
    onBeforeLoad: config.onBeforeLoad || (() => {}),
    onAfterLoad: config.onAfterLoad || (() => {}),

    // --- Lifecycle ---

    init() {
        this.load()
        this._popHandler = () => {
            if (this.$root && !this.$root.isConnected) return
            const tab = this._tabFromPath()
            if (tab && tab !== this.active) {
                this.active = tab
                this.load()
            }
        }
        window.addEventListener('popstate', this._popHandler)
    },

    destroy() {
        if (this._popHandler) {
            window.removeEventListener('popstate', this._popHandler)
            this._popHandler = null
        }
    },

    // --- Tabs ---

    tab(key) {
        return this.tabs.find((t) => t.key === key) || null
    },

    isActive(key) {
        return this.active === key
    },

    _tabFromPath() {
        const path = window.location.pathname
        const matched = this.tabs.find((t) => t.url === path || path.endsWith('/' + t.key))
        if (matched) return matched.key
        const parts = path.split('/').filter(Boolean)
        return parts[3] || this.active
    },

    // --- Load ---

    async load() {
        const tab = this.tab(this.active)
        const card = this.$refs && this.$refs.card
        if (!tab || !card) return

        this.loading = true
        this.errorMessage = ''

        try {
            await this.onBeforeLoad(tab, this._lastLoaded)

            const resp = await fetch(tab.url, { headers: { 'HX-Request': 'true' } })
            if (!resp.ok) throw new Error(`HTTP ${resp.status} para ${tab.url}`)
            const html = await resp.text()

            // Fade out antes do swap
            card.style.opacity = '0'
            card.style.transform = 'translateY(6px)'

            // Cleanup: destroy Alpine tree e mapa anterior
            if (window.UniversalMap?.destroy) {
                window.UniversalMap.destroy(card)
            }
            if (window.Alpine?.destroyTree && card._x_marker) {
                window.Alpine.destroyTree(card)
            }

            card.innerHTML = html
            this._lastLoaded = tab.key

            // Inicializa ícones, Alpine e HTMX no novo conteúdo
            window.initLucideIcons?.(card)
            window.Alpine?.initTree(card)
            if (window.htmx) {
                window.htmx.process(card)
            } else if (htmx) {
                htmx.process(card)
            }

            await this.onAfterLoad(tab, card)

            // Fade in
            requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.22s ease, transform 0.22s ease'
                card.style.opacity = '1'
                card.style.transform = 'translateY(0)'
            })
        } catch (e) {
            console.error('subpageNavigation: falha ao carregar subpágina', tab, e)
            this.errorMessage = 'Não foi possível carregar a subpágina "' + (tab.label || tab.key) + '".'
        } finally {
            this.loading = false
        }
    },

    async retry() {
        this.errorMessage = ''
        return this.load()
    },

    async go(key) {
        if (key === this.active || this.loading) return
        this.active = key
        const tab = this.tab(key)
        if (tab) {
            history.pushState({}, '', tab.url)
            if (window.Alpine) {
                window.Alpine.store('sidebar').currentPath = window.location.pathname
            }
        }
        await this.load()
    },

    // --- Utilities ---

    loadModuleScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script')
            s.type = 'module'
            s.src = src
            s.onload = () => resolve()
            s.onerror = () => { s.remove(); reject(new Error('falha ao carregar ' + src)) }
            document.head.appendChild(s)
        })
    },
})
