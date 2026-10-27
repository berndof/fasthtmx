// src/static/js/components/list/deleteModal.js
function deleteModal_default(resource = "", basePath = "") {
  return {
    resource,
    basePath,
    modalIsOpen: false,
    itemName: "",
    itemId: "",
    blockedHtml: "",
    checkingBlockers: false,
    isFetchingInitial: false,
    // Guarda contra respostas lentas de outro item/modal já fechado
    _reqSeq: 0,
    _aborter: null,
    init() {
      this._onOpen = (e) => this.openDeleteModal(e.detail);
      this._onBlocked = (e) => {
        if (e.detail.seq !== void 0 && e.detail.seq !== this._reqSeq) return;
        if (!this.modalIsOpen) return;
        this.blockedHtml = e.detail.html || "";
        this.checkingBlockers = false;
        this.isFetchingInitial = false;
      };
      this._onClose = () => this.close();
      window.addEventListener("open-delete-modal", this._onOpen);
      window.addEventListener("delete-blocked", this._onBlocked);
      window.addEventListener("close-delete-modal", this._onClose);
    },
    destroy() {
      window.removeEventListener("open-delete-modal", this._onOpen);
      window.removeEventListener("delete-blocked", this._onBlocked);
      window.removeEventListener("close-delete-modal", this._onClose);
      this._cancelPending();
    },
    _cancelPending() {
      if (this._aborter) {
        this._aborter.abort();
        this._aborter = null;
      }
    },
    openDeleteModal({ id, name }) {
      this._cancelPending();
      this._reqSeq += 1;
      const seq = this._reqSeq;
      this._aborter = new AbortController();
      this.itemId = id;
      this.itemName = name;
      this.blockedHtml = "";
      this.checkingBlockers = false;
      this.isFetchingInitial = true;
      this.modalIsOpen = true;
      this.checkBlockers(seq, this._aborter.signal);
    },
    close() {
      this._reqSeq += 1;
      this._cancelPending();
      this.modalIsOpen = false;
      setTimeout(() => {
        if (!this.modalIsOpen) {
          this.blockedHtml = "";
          this.checkingBlockers = false;
          this.isFetchingInitial = false;
          this.itemId = "";
          this.itemName = "";
        }
      }, 250);
    },
    async checkBlockers(seq, signal) {
      try {
        const resp = await fetch(`${this.basePath}/${this.itemId}/blockers`, { signal });
        if (seq !== this._reqSeq || !this.modalIsOpen) return;
        if (!resp.ok) {
          this.isFetchingInitial = false;
          return;
        }
        const html = await resp.text();
        if (seq !== this._reqSeq || !this.modalIsOpen) return;
        if (html && html.trim()) {
          window.dispatchEvent(
            new CustomEvent("delete-blocked", { detail: { html, seq } })
          );
        } else {
          this.isFetchingInitial = false;
        }
      } catch {
        if (seq === this._reqSeq && this.modalIsOpen) this.isFetchingInitial = false;
      }
    },
    async confirmDelete() {
      this.checkingBlockers = true;
      const seq = this._reqSeq;
      try {
        const resp = await fetch(`${this.basePath}/${this.itemId}`, {
          method: "DELETE"
        });
        if (seq !== this._reqSeq) return;
        if (resp.ok) {
          const row = document.getElementById(`${this.resource}-${this.itemId}`);
          if (row) {
            row.remove();
            this.close();
          } else if (window.htmx) {
            this.close();
            window.htmx.ajax("GET", `${this.basePath}/list`, {
              target: "#content",
              swap: "innerHTML",
              pushUrl: true
            });
          } else {
            window.location.href = `${this.basePath}/list`;
          }
          return;
        }
        if (resp.status === 409) {
          const html = await resp.text();
          if (seq !== this._reqSeq || !this.modalIsOpen) return;
          this.blockedHtml = html;
          this.isFetchingInitial = false;
          return;
        }
        this.close();
      } catch (e) {
        console.error("Falha ao excluir", e);
        this.close();
      } finally {
        if (seq === this._reqSeq) this.checkingBlockers = false;
      }
    }
  };
}
if (!window.__deleteModal409Bound) {
  window.__deleteModal409Bound = true;
  document.addEventListener("htmx:responseError", (event) => {
    if (event.detail.xhr.status === 409) {
      window.dispatchEvent(
        new CustomEvent("delete-blocked", {
          detail: { html: event.detail.xhr.responseText }
        })
      );
    }
  });
}

export {
  deleteModal_default
};
