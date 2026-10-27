export default (initial = {}) => {
  const baseFields = {
    name: initial.name || "",
    last_name: initial.last_name || "",
    valor: initial.valor || "",
    recorrencia: initial.recorrencia || "",
    data_inicial: initial.data_inicial || "",
    data_final: initial.data_final || "",
  };
  // mirror any extra keys from original as reactive props (e.g. faixas de altura: metro_inicial, faces, nao_comercial)
  for (const k of Object.keys(initial.original || {})) {
    if (!(k in baseFields)) baseFields[k] = initial[k] ?? "";
  }
  return {
    original: initial.original || {},
    ...baseFields,
    // flag to know if there was a server error (so we enable the button to fix)
    hasServerError: !!initial.hasServerError,

    get isDirty() {
      const norm = (v) => {
        if (Array.isArray(v)) return [...v].sort().join(",");
        if (v === null || v === undefined || v === "") return "false";
        if (typeof v === "boolean") return String(v);
        return v.toString().trim();
      };
      return Object.keys(this.original).some(k => norm(this[k]) !== norm(this.original[k]));
    },
    get isFormValid() {
      // custom validator takes precedence
      if (typeof initial.validate === "function") return initial.validate(this);
      // generic validation — only checks fields present in original
      // name is common to all resources
      if ('name' in this.original && !this.name?.trim()) return false;
      if ('last_name' in this.original) {
        // last_name optional, but if PF and required in future, add check here
      }
      if ('valor' in this.original) {
        const v = parseFloat(this.valor);
        if (!this.valor?.toString().trim() || isNaN(v) || v <= 0) return false;
      }
      if ('recorrencia' in this.original && !this.recorrencia?.trim()) return false;
      if ('data_inicial' in this.original && !this.data_inicial?.trim()) return false;
      // data_final can be empty (perpetual / Única)
      // fallback: at least one dirty-check field must be valid
      if (!('name' in this.original) && !this.name?.trim()) return false;
      return true;
    },
    get canSave() {
      if (this.hasServerError) return this.isFormValid; // re-render with error = enabled
      return this.isDirty && this.isFormValid;
    },
    init() {
      // placeholder for future watchers if needed
    }
  };
};
