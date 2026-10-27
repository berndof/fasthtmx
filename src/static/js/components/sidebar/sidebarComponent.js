export default () => ({
    isPeeking: false,
    peekTimer: null,
    scrollCheckTimer: null,
    canScrollTop: false,
    canScrollBottom: false,

    openSubitems: Alpine.$persist([]).as("sidebarOpenSubitems"),

    init() {
        this.updateScrollState()
        this.$watch('isSidebarVisible', () => this.updateScrollState())
        this.$watch('openSubitems', () => {
            this.$nextTick(() => this.updateScrollState())
            clearTimeout(this.scrollCheckTimer)
            this.scrollCheckTimer = setTimeout(() => this.updateScrollState(), 300)
        })
        this.$nextTick(() => this.updateScrollState())
    },

    updateScrollState() {
        const el = this.$refs?.navScroll
        if (!el) return
        this.canScrollTop = el.scrollTop > 1
        this.canScrollBottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1
    },

    toggleSubitem(id) {
        if (this.openSubitems.includes(id)) {
            this.openSubitems = this.openSubitems.filter(item => item !== id)
        } else {
            this.openSubitems = [...this.openSubitems, id]
        }
    },

    isOpen(id) {
        return this.openSubitems.includes(id)
    },

    startPeek() {
        if (!this.$store.sidebar.isSidebarOpen && window.innerWidth >= 768) {
            this.isPeeking = true
            this.clearPeekTimer()
        }
    },

    stopPeek() {
        this.clearPeekTimer()
        this.peekTimer = setTimeout(() => {
                this.isPeeking = false
            }, 400)
    },

    clearPeekTimer() {
        if (this.peekTimer) {
            clearTimeout(this.peekTimer)
            this.peekTimer = null
        }
    },

    get isSidebarVisible() {
        return this.$store.sidebar.isSidebarOpen || this.isPeeking
    }
})
