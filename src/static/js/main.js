import { createIcons, icons } from 'lucide';
import htmx from 'htmx.org';
window.htmx = htmx;
import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import focus from '@alpinejs/focus';
import mask from '@alpinejs/mask';
import collapse from '@alpinejs/collapse';

import sidebarComponent from './components/sidebar/sidebarComponent.js';
import useSubpageNavigation from './components/subpage/useSubpageNavigation.js';
import deleteModal from './components/list/deleteModal.js';
import formDirtyGuard from './components/form/formDirtyGuard.js';

/**
 * Registra um componente Alpine de forma idempotente.
 */
const registerComponent = (name, factory) => {
  const key = '__alpine-comp:' + name;
  if (window[key]) return;
  Alpine.data(name, factory);
  window[key] = true;
};

window.registerComponent = registerComponent;

createIcons({ icons });

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('updateTitle', (e) => {
    if (e.detail?.value) {
      document.title = e.detail.value;
    }
  });

  window.addEventListener('popstate', () => {
    if (window.Alpine) {
      Alpine.store('sidebar').currentPath = window.location.pathname;
    }
  });
});

// Destrói árvore Alpine antes do HTMX substituir o elemento (evita listeners órfãos)
document.body.addEventListener('htmx:beforeCleanupElement', (event) => {
  const el = event.detail?.elt ?? event.detail?.el ?? event.target;
  if (el && el._x_dataStack && window.Alpine?.destroyTree) {
    window.Alpine.destroyTree(el);
  }
});

document.body.addEventListener('htmx:afterSwap', (event) => {
  if (!event.detail.target) return;

  if (typeof createIcons === 'function') {
    createIcons({ icons }, event.detail.target);
  }
  if (window.Alpine) {
    Alpine.nextTick(() => {
      Alpine.store('sidebar').currentPath = window.location.pathname;
    });
    window.Alpine.initTree(event.detail.target);
  }
});

// ── Progress bar (#content-loading) ─────────────────────────────────────────
const SWEEP_MS = 900;
const _easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const _bar = {
  el: null,
  barEl: null,
  rafId: null,
  running: false,
  finishing: false,
  sweepStart: null,

  get() {
    if (!this.el) {
      this.el = document.getElementById('content-loading');
      this.barEl = this.el?.querySelector('div');
    }
    return { el: this.el, bar: this.barEl };
  },

  _set(p) {
    const { bar } = this.get();
    if (bar) {
      const tx = -110 + p * 300;
      bar.style.transform = `translateX(${tx}%)`;
    }
  },

  start() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.running = true;
    this.finishing = false;
    this.sweepStart = null;

    const { el, bar } = this.get();
    if (!el || !bar) return;

    bar.style.transition = 'none';
    bar.style.transform = 'translateX(-110%)';
    el.style.transition = 'opacity 150ms ease-in';
    el.style.opacity = '1';

    this.rafId = requestAnimationFrame((ts) => this._tick(ts));
  },

  _tick(ts) {
    if (!this.running) return;
    if (this.sweepStart === null) this.sweepStart = ts;

    const elapsed = ts - this.sweepStart;
    const t = Math.min(elapsed / SWEEP_MS, 1);
    const eased = _easeInOut(t);

    this._set(eased);

    if (t >= 1) {
      if (this.finishing) {
        this.running = false;
        const { el, bar } = this.get();
        if (el) {
          el.style.transition = 'opacity 200ms ease-out';
          el.style.opacity = '0';
          setTimeout(() => {
            if (bar) {
              bar.style.transition = 'none';
              bar.style.transform = 'translateX(-110%)';
            }
            this.finishing = false;
          }, 210);
        }
        return;
      } else {
        this.sweepStart = ts;
      }
    }

    this.rafId = requestAnimationFrame((ts) => this._tick(ts));
  },

  done() {
    this.finishing = true;
    if (!this.running) {
      this.running = true;
      const { el } = this.get();
      if (el) {
        el.style.opacity = '1';
        el.style.transition = 'none';
      }
      this.rafId = requestAnimationFrame((ts) => this._tick(ts));
    }
  },

  cancel() {
    this.running = false;
    this.finishing = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    const { el, bar } = this.get();
    if (el) {
      el.style.transition = 'none';
      el.style.opacity = '0';
    }
    if (bar) {
      bar.style.transition = 'none';
      bar.style.transform = 'translateX(-110%)';
    }
  },
};

let _contentDimTimer = null;
const CONTENT_DIM_DELAY_MS = 300;

document.body.addEventListener('htmx:beforeRequest', (event) => {
  if (event.detail.target?.id !== 'content') return;
  if (_contentDimTimer) {
    clearTimeout(_contentDimTimer);
    _contentDimTimer = null;
  }
  _bar.start();
  document.documentElement.classList.add('htmx-request');
  _contentDimTimer = setTimeout(() => {
    document.getElementById('content')?.classList.add('htmx-request');
  }, CONTENT_DIM_DELAY_MS);
});

document.body.addEventListener('htmx:afterRequest', (event) => {
  if (event.detail.target?.id !== 'content') return;
  if (_contentDimTimer) {
    clearTimeout(_contentDimTimer);
    _contentDimTimer = null;
  }
  document.getElementById('content')?.classList.remove('htmx-request');
  document.documentElement.classList.remove('htmx-request');
  _bar.done();
});

document.body.addEventListener('htmx:sendError', () => {
  if (_contentDimTimer) {
    clearTimeout(_contentDimTimer);
    _contentDimTimer = null;
  }
  document.getElementById('content')?.classList.remove('htmx-request');
  document.documentElement.classList.remove('htmx-request');
  _bar.cancel();
  if (window.notify) {
    window.notify('danger', 'Falha de rede', 'Verifique sua conexão e tente novamente.', 5000);
  }
});

document.body.addEventListener('htmx:responseError', (event) => {
  if (_contentDimTimer) {
    clearTimeout(_contentDimTimer);
    _contentDimTimer = null;
  }
  document.getElementById('content')?.classList.remove('htmx-request');
  document.documentElement.classList.remove('htmx-request');
  _bar.cancel();
  const xhr = event.detail?.xhr;
  if (xhr && xhr.status >= 500) {
    if (window.notify) {
      window.notify('danger', 'Erro no servidor', `Erro ${xhr.status}. Tente novamente.`, 5000);
    }
  }
});

// Plugins Alpine
Alpine.plugin(persist);
Alpine.plugin(focus);
Alpine.plugin(mask);
Alpine.plugin(collapse);

// Componentes Globais do Core
registerComponent('sidebarComponent', sidebarComponent);
registerComponent('subpageNav', useSubpageNavigation);
registerComponent('useSubpageNavigation', useSubpageNavigation);
registerComponent('deleteModal', deleteModal);
registerComponent('formDirtyGuard', formDirtyGuard);

window.reloadLucide = function () {
  createIcons({ icons });
};
window.initLucideIcons = (container) => createIcons({ icons }, container);

// Store de Notificações (SSE + Toast + Histórico)
const _notificationTimeouts = new Map();

Alpine.store('messages', {
  notificationCount: 0,
  notifications: [],
  queue: [],
  history: [],
  maxVisible: 2,
  displayDuration: 5000,
  queueDuration: 2000,
  historyOffset: 0,
  historyHasMore: true,
  historyLoading: false,
  _sse: null,
  _sseUrl: '/events',
  _reconnectTimer: null,
  _reconnectAttempts: 0,

  initSSE(url = '/events') {
    if (!window.EventSource) return;
    if (this._sse && this._sse.readyState !== EventSource.CLOSED) return this._sse;
    this._sseUrl = url;
    this._loadHistory();
    this._refreshUnreadCount();
    this._connectSSE();
    window.addEventListener('beforeunload', () => this._closeSSE());
    return this._sse;
  },

  _connectSSE() {
    if (this._sse) {
      try {
        this._sse.close();
      } catch (e) {}
    }
    const es = new EventSource(this._sseUrl);
    this._sse = es;
    es.onmessage = (event) => {
      if (!event.data || event.data.startsWith(':')) return;
      try {
        const detail = JSON.parse(event.data);
        window.dispatchEvent(new CustomEvent('notify', { detail }));
      } catch (e) {
        console.error('Erro ao processar evento SSE:', e);
      }
    };
    es.onopen = () => {
      this._reconnectAttempts = 0;
    };
    es.onerror = () => {
      try {
        es.close();
      } catch (e) {}
      this._sse = null;
      this._scheduleReconnect();
    };
  },

  _scheduleReconnect() {
    if (this._reconnectTimer) return;
    const delay = Math.min(30000, 1000 * Math.pow(1.6, this._reconnectAttempts));
    this._reconnectAttempts++;
    this._reconnectTimer = setTimeout(async () => {
      this._reconnectTimer = null;
      try {
        const r = await fetch('/api/notificacoes/unread-count', { method: 'GET' });
        if (r.status === 401) return;
      } catch (e) {}
      this._connectSSE();
    }, delay);
  },

  _closeSSE() {
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
      this._reconnectTimer = null;
    }
    if (this._sse) {
      try {
        this._sse.close();
      } catch (e) {}
      this._sse = null;
    }
  },

  async _loadHistory() {
    if (this.historyLoading) return;
    this.historyLoading = true;
    try {
      const resp = await fetch('/api/notificacoes?limit=20&offset=0');
      if (!resp.ok) return;
      const data = await resp.json();
      const variantMap = { success: 'success', error: 'danger', warning: 'warning', info: 'info' };
      this.history = (data.notificacoes || []).map((n) => ({
        id: n.id,
        variant: variantMap[n.nivel] || 'info',
        title: n.titulo,
        message: n.mensagem,
        status: n.lida ? 'read' : 'pending',
        time: n.created_at
          ? new Date(n.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          : '',
      }));
      this.historyOffset = data.next_offset ?? this.history.length;
      this.historyHasMore = (data.notificacoes || []).length === 20;
      this._refreshUnreadCount();
    } catch (e) {
    } finally {
      this.historyLoading = false;
    }
  },

  async loadMore() {
    if (this.historyLoading || !this.historyHasMore) return;
    this.historyLoading = true;
    try {
      const resp = await fetch(`/api/notificacoes?limit=20&offset=${this.historyOffset}`);
      if (!resp.ok) return;
      const data = await resp.json();
      const variantMap = { success: 'success', error: 'danger', warning: 'warning', info: 'info' };
      const more = (data.notificacoes || []).map((n) => ({
        id: n.id,
        variant: variantMap[n.nivel] || 'info',
        title: n.titulo,
        message: n.mensagem,
        status: n.lida ? 'read' : 'pending',
        time: n.created_at
          ? new Date(n.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          : '',
      }));
      const existing = new Set(this.history.map((h) => String(h.id)));
      for (const m of more) if (!existing.has(String(m.id))) this.history.push(m);
      this.historyOffset = data.next_offset ?? this.historyOffset + more.length;
      this.historyHasMore = (data.notificacoes || []).length === 20;
    } catch (e) {
    } finally {
      this.historyLoading = false;
    }
  },

  async _refreshUnreadCount() {
    try {
      const r = await fetch('/api/notificacoes/unread-count');
      if (!r.ok) return;
      const d = await r.json();
      this.notificationCount = d.count ?? 0;
    } catch (e) {}
  },

  async markAllRead() {
    try {
      await fetch('/api/notificacoes/read', { method: 'POST' });
    } catch (e) {}
    this.history.forEach((h) => (h.status = 'read'));
    this.notificationCount = 0;
  },

  addNotification({
    id = null,
    variant = 'info',
    title = null,
    message = null,
    timeout = null,
    icon = null,
    action = null,
    status = 'pending',
    toast = true,
    persist = false,
  }) {
    const nid =
      id ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now());
    const duration = timeout != null ? timeout : this.displayDuration;
    const notification = {
      id: nid,
      variant,
      title,
      message,
      timeout,
      icon,
      action,
      status,
      persist,
      visible: false,
      duration,
    };

    if (!toast) {
      this.notificationCount++;
      this.addToHistory(notification);
      return;
    }

    if (this.notifications.length < this.maxVisible) {
      this.notifications.push(notification);
      this.notificationCount++;
      requestAnimationFrame(() => {
        const n = this.notifications.find((n) => n.id === nid);
        if (n) {
          n.visible = true;
          if (n.timeout !== null) {
            this.startAutoDismiss(nid, n.duration);
          }
        }
      });
    } else {
      this.queue.push(notification);
      this.notificationCount++;
      this.accelerateVisible();
    }
  },

  startAutoDismiss(id, duration) {
    this.clearTimeout(id);
    _notificationTimeouts.set(
      id,
      setTimeout(() => {
        this.dismissNotification(id);
      }, duration)
    );
  },

  pauseAutoDismiss(id) {
    const n = this.notifications.find((n) => n.id === id);
    if (n && n.timeout === null) return;
    this.clearTimeout(id);
  },

  resumeAutoDismiss(id) {
    const n = this.notifications.find((n) => n.id === id);
    if (n && n.visible && n.timeout !== null) {
      this.startAutoDismiss(id, n.duration);
    }
  },

  dismissNotification(id) {
    const n = this.notifications.find((n) => n.id === id);
    if (!n) return;
    this.clearTimeout(id);
    n.visible = false;
    setTimeout(() => {
      const idx = this.notifications.findIndex((n) => n.id === id);
      if (idx === -1) return;
      const removed = { ...this.notifications[idx] };
      this.notifications.splice(idx, 1);
      this.addToHistory(removed);
      this.notificationCount = Math.max(0, this.notificationCount - 1);
      this.processQueue();
    }, 400);
  },

  accelerateVisible() {
    const factor = Math.min(this.queue.length, 3);
    this.notifications.forEach((n) => {
      if (n.timeout === null) return;
      const remaining = Math.max(500, n.duration - factor * 1000);
      this.clearTimeout(n.id);
      this.startAutoDismiss(n.id, remaining);
    });
  },

  processQueue() {
    while (this.notifications.length < this.maxVisible && this.queue.length) {
      const next = this.queue.shift();
      const id = next.id;
      next.duration = this.queueDuration;
      next.visible = false;
      this.notifications.push(next);
      requestAnimationFrame(() => {
        const n = this.notifications.find((n) => n.id === id);
        if (n) {
          n.visible = true;
          if (n.timeout !== null) {
            this.startAutoDismiss(id, n.duration);
          }
        }
      });
    }
  },

  addToHistory(notification) {
    if (this.history.some((h) => String(h.id) === String(notification.id))) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    this.history.unshift({
      id: notification.id,
      variant: notification.variant,
      title: notification.title,
      message: notification.message,
      status: notification.status || 'pending',
      icon: notification.icon || null,
      action: notification.action || null,
      time: timeStr,
    });
    if (this.history.length > 100) this.history.pop();
  },

  clearHistory() {
    this.history = [];
    this.historyOffset = 0;
    this.historyHasMore = true;
    this.notificationCount = 0;
    fetch('/api/notificacoes', { method: 'DELETE' }).catch(() => {});
  },

  dismissActive() {
    const items = [...this.notifications];
    items.forEach((n) => {
      n.visible = false;
      this.clearTimeout(n.id);
    });
    this.queue = [];
    setTimeout(() => {
      items.forEach((n) => {
        if (!n.persist) this.addToHistory(n);
      });
      this.notifications = [];
      this._refreshUnreadCount();
    }, 400);
  },

  clearAll() {
    this.notifications.forEach((n) => this.clearTimeout(n.id));
    this.notifications = [];
    this.queue = [];
    this.notificationCount = 0;
  },

  clearTimeout(id) {
    if (_notificationTimeouts.has(id)) {
      clearTimeout(_notificationTimeouts.get(id));
      _notificationTimeouts.delete(id);
    }
  },
});

function getInitialTheme() {
  const ALLOWED = new Set([
    'arctic-light',
    'arctic-dark',
    'emerald-light',
    'emerald-dark',
    'sunset-light',
    'sunset-dark',
    'midnight-light',
    'midnight-dark',
  ]);
  try {
    const m = document.cookie.match(/(?:^|; )theme=([^;]*)/);
    if (m) {
      const c = decodeURIComponent(m[1]);
      if (ALLOWED.has(c)) return c;
    }
  } catch (e) {}
  try {
    const raw = localStorage.getItem('_x_theme');
    if (raw) {
      let v = null;
      try {
        v = JSON.parse(raw);
      } catch (e) {
        v = raw;
      }
      if (ALLOWED.has(v)) return v;
      if (ALLOWED.has(raw)) return raw;
    }
  } catch (e) {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'arctic-dark' : 'arctic-light';
}

function getInitialSidebarOpen() {
  try {
    const raw = localStorage.getItem('_x_isSidebarOpen');
    if (raw !== null) return JSON.parse(raw) === true;
  } catch (e) {}
  return false;
}

Alpine.store('theme', {
  current: Alpine.$persist(getInitialTheme()).as('theme'),

  themes: [
    { id: 'arctic', name: 'Arctic', icon: '❄️' },
    { id: 'emerald', name: 'Emerald', icon: '🌿' },
    { id: 'sunset', name: 'Sunset', icon: '🌅' },
    { id: 'midnight', name: 'Midnight', icon: '🌙' },
  ],

  get isDark() {
    return this.current.endsWith('-dark');
  },

  get baseTheme() {
    return this.current.replace(/-(?:light|dark)$/, '');
  },

  toggleDarkMode() {
    const base = this.baseTheme;
    this.current = this.isDark ? `${base}-light` : `${base}-dark`;
  },

  setTheme(themeId) {
    const mode = this.isDark ? 'dark' : 'light';
    this.current = `${themeId}-${mode}`;
  },

  init() {
    let _firstRun = true;
    let _overlayTimer = null;

    Alpine.effect(() => {
      const theme = this.current;
      const isFirst = _firstRun;
      if (isFirst) _firstRun = false;

      if (isFirst) {
        const cur = document.documentElement.getAttribute('data-theme');
        if (cur !== theme) {
          document.documentElement.setAttribute('data-theme', theme);
          document.documentElement.classList.toggle('dark', theme.endsWith('-dark'));
        }
        try {
          document.cookie = `theme=${encodeURIComponent(theme)}; path=/; max-age=31536000; samesite=lax`;
        } catch (e) {}
        document.documentElement.classList.remove('theme-loading');
        return;
      }

      const html = document.documentElement;
      if (_overlayTimer !== null) {
        clearTimeout(_overlayTimer);
        _overlayTimer = null;
        html.classList.remove('theme-transitioning');
        html.style.removeProperty('--theme-overlay-bg');
      }

      const _persist = () => {
        try {
          document.cookie = `theme=${encodeURIComponent(theme)}; path=/; max-age=31536000; samesite=lax`;
        } catch (e) {}
        try {
          fetch('/api/theme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme }),
            keepalive: true,
          }).catch(() => {});
        } catch (e) {}
      };

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        html.setAttribute('data-theme', theme);
        html.classList.toggle('dark', theme.endsWith('-dark'));
        _persist();
        return;
      }

      const overlayBg = window.getComputedStyle(html).backgroundColor;
      html.style.setProperty('--theme-overlay-bg', overlayBg);
      html.classList.add('theme-transitioning');

      _overlayTimer = setTimeout(() => {
        html.setAttribute('data-theme', theme);
        html.classList.toggle('dark', theme.endsWith('-dark'));
        _persist();

        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            html.classList.remove('theme-transitioning');
            _overlayTimer = setTimeout(() => {
              html.style.removeProperty('--theme-overlay-bg');
              _overlayTimer = null;
            }, 130);
          })
        );
      }, 130);
    });
  },
});

Alpine.store('sidebar', {
  currentPath: window.location.pathname,
  isSidebarOpen: Alpine.$persist(getInitialSidebarOpen()).as('isSidebarOpen'),
  sectionMap: { user: 'usuarios' },

  isCurrent(path, exact = false) {
    return exact ? this.currentPath === path : this.currentPath.startsWith(path);
  },

  get activeSection() {
    const seg = this.currentPath.split('/')[1];
    return this.sectionMap[seg] || seg || null;
  },

  toggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },

  init() {
    Alpine.effect(() => {
      const open = this.isSidebarOpen;
      document.documentElement.classList.toggle('sidebar-expanded', open);
    });
    const removeLoading = () => {
      document.documentElement.classList.remove('sidebar-loading', 'theme-loading');
    };
    requestAnimationFrame(() => requestAnimationFrame(removeLoading));
    setTimeout(removeLoading, 300);
  },
});

Alpine.directive('active');

window.notify = (
  variant = 'info',
  title = 'Aviso',
  message = '',
  timeout = null,
  icon = null,
  action = null,
  status = 'pending',
  toast = true,
  persist = false
) => {
  const detail = { variant, title, message, timeout, icon, action, status, toast, persist };
  window.dispatchEvent(new CustomEvent('notify', { detail }));
};

window.clearNotifications = () => {
  window.dispatchEvent(new CustomEvent('clear-notifications'));
  Alpine.store('messages').notificationCount = 0;
};

window.Alpine = Alpine;
window.htmx = htmx;

Alpine.start();
