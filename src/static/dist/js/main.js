var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/htmx.org@2.0.10/node_modules/htmx.org/dist/htmx.esm.js
var htmx_esm_exports = {};
__export(htmx_esm_exports, {
  default: () => htmx_esm_default
});
var htmx2, htmx_esm_default;
var init_htmx_esm = __esm({
  "node_modules/.pnpm/htmx.org@2.0.10/node_modules/htmx.org/dist/htmx.esm.js"() {
    htmx2 = (function() {
      "use strict";
      const htmx = {
        // Tsc madness here, assigning the functions directly results in an invalid TypeScript output, but reassigning is fine
        /* Event processing */
        /** @type {typeof onLoadHelper} */
        onLoad: null,
        /** @type {typeof processNode} */
        process: null,
        /** @type {typeof addEventListenerImpl} */
        on: null,
        /** @type {typeof removeEventListenerImpl} */
        off: null,
        /** @type {typeof triggerEvent} */
        trigger: null,
        /** @type {typeof ajaxHelper} */
        ajax: null,
        /* DOM querying helpers */
        /** @type {typeof find} */
        find: null,
        /** @type {typeof findAll} */
        findAll: null,
        /** @type {typeof closest} */
        closest: null,
        /**
         * Returns the input values that would resolve for a given element via the htmx value resolution mechanism
         *
         * @see https://htmx.org/api/#values
         *
         * @param {Element} elt the element to resolve values on
         * @param {HttpVerb} type the request type (e.g. **get** or **post**) non-GET's will include the enclosing form of the element. Defaults to **post**
         * @returns {Object}
         */
        values: function(elt, type) {
          const inputValues = getInputValues(elt, type || "post");
          return inputValues.values;
        },
        /* DOM manipulation helpers */
        /** @type {typeof removeElement} */
        remove: null,
        /** @type {typeof addClassToElement} */
        addClass: null,
        /** @type {typeof removeClassFromElement} */
        removeClass: null,
        /** @type {typeof toggleClassOnElement} */
        toggleClass: null,
        /** @type {typeof takeClassForElement} */
        takeClass: null,
        /** @type {typeof swap} */
        swap: null,
        /* Extension entrypoints */
        /** @type {typeof defineExtension} */
        defineExtension: null,
        /** @type {typeof removeExtension} */
        removeExtension: null,
        /* Debugging */
        /** @type {typeof logAll} */
        logAll: null,
        /** @type {typeof logNone} */
        logNone: null,
        /* Debugging */
        /**
         * The logger htmx uses to log with
         *
         * @see https://htmx.org/api/#logger
         */
        logger: null,
        /**
         * A property holding the configuration htmx uses at runtime.
         *
         * Note that using a [meta tag](https://htmx.org/docs/#config) is the preferred mechanism for setting these properties.
         *
         * @see https://htmx.org/api/#config
         */
        config: {
          /**
           * Whether to use history.
           * @type boolean
           * @default true
           */
          historyEnabled: true,
          /**
           * The number of pages to keep in **sessionStorage** for history support.
           * @type number
           * @default 10
           */
          historyCacheSize: 10,
          /**
           * @type boolean
           * @default false
           */
          refreshOnHistoryMiss: false,
          /**
           * The default swap style to use if **[hx-swap](https://htmx.org/attributes/hx-swap)** is omitted.
           * @type HtmxSwapStyle
           * @default 'innerHTML'
           */
          defaultSwapStyle: "innerHTML",
          /**
           * The default delay between receiving a response from the server and doing the swap.
           * @type number
           * @default 0
           */
          defaultSwapDelay: 0,
          /**
           * The default delay between completing the content swap and settling attributes.
           * @type number
           * @default 20
           */
          defaultSettleDelay: 20,
          /**
           * If true, htmx will inject a small amount of CSS into the page to make indicators invisible unless the **htmx-indicator** class is present.
           * @type boolean
           * @default true
           */
          includeIndicatorStyles: true,
          /**
           * The class to place on indicators when a request is in flight.
           * @type string
           * @default 'htmx-indicator'
           */
          indicatorClass: "htmx-indicator",
          /**
           * The class to place on triggering elements when a request is in flight.
           * @type string
           * @default 'htmx-request'
           */
          requestClass: "htmx-request",
          /**
           * The class to temporarily place on elements that htmx has added to the DOM.
           * @type string
           * @default 'htmx-added'
           */
          addedClass: "htmx-added",
          /**
           * The class to place on target elements when htmx is in the settling phase.
           * @type string
           * @default 'htmx-settling'
           */
          settlingClass: "htmx-settling",
          /**
           * The class to place on target elements when htmx is in the swapping phase.
           * @type string
           * @default 'htmx-swapping'
           */
          swappingClass: "htmx-swapping",
          /**
           * Allows the use of eval-like functionality in htmx, to enable **hx-vars**, trigger conditions & script tag evaluation. Can be set to **false** for CSP compatibility.
           * @type boolean
           * @default true
           */
          allowEval: true,
          /**
           * If set to false, disables the interpretation of script tags.
           * @type boolean
           * @default true
           */
          allowScriptTags: true,
          /**
           * If set, the nonce will be added to inline scripts.
           * @type string
           * @default ''
           */
          inlineScriptNonce: "",
          /**
           * If set, the nonce will be added to inline styles.
           * @type string
           * @default ''
           */
          inlineStyleNonce: "",
          /**
           * The attributes to settle during the settling phase.
           * @type string[]
           * @default ['class', 'style', 'width', 'height']
           */
          attributesToSettle: ["class", "style", "width", "height"],
          /**
           * Allow cross-site Access-Control requests using credentials such as cookies, authorization headers or TLS client certificates.
           * @type boolean
           * @default false
           */
          withCredentials: false,
          /**
           * @type number
           * @default 0
           */
          timeout: 0,
          /**
           * The default implementation of **getWebSocketReconnectDelay** for reconnecting after unexpected connection loss by the event code **Abnormal Closure**, **Service Restart** or **Try Again Later**.
           * @type {'full-jitter' | ((retryCount:number) => number)}
           * @default "full-jitter"
           */
          wsReconnectDelay: "full-jitter",
          /**
           * The type of binary data being received over the WebSocket connection
           * @type BinaryType
           * @default 'blob'
           */
          wsBinaryType: "blob",
          /**
           * @type string
           * @default '[hx-disable], [data-hx-disable]'
           */
          disableSelector: "[hx-disable], [data-hx-disable]",
          /**
           * @type {'auto' | 'instant' | 'smooth'}
           * @default 'instant'
           */
          scrollBehavior: "instant",
          /**
           * If the focused element should be scrolled into view.
           * @type boolean
           * @default false
           */
          defaultFocusScroll: false,
          /**
           * If set to true htmx will include a cache-busting parameter in GET requests to avoid caching partial responses by the browser
           * @type boolean
           * @default false
           */
          getCacheBusterParam: false,
          /**
           * If set to true, htmx will use the View Transition API when swapping in new content.
           * @type boolean
           * @default false
           */
          globalViewTransitions: false,
          /**
           * htmx will format requests with these methods by encoding their parameters in the URL, not the request body
           * @type {(HttpVerb)[]}
           * @default ['get', 'delete']
           */
          methodsThatUseUrlParams: ["get", "delete"],
          /**
           * If set to true, disables htmx-based requests to non-origin hosts.
           * @type boolean
           * @default false
           */
          selfRequestsOnly: true,
          /**
           * If set to true htmx will not update the title of the document when a title tag is found in new content
           * @type boolean
           * @default false
           */
          ignoreTitle: false,
          /**
           * Whether the target of a boosted element is scrolled into the viewport.
           * @type boolean
           * @default true
           */
          scrollIntoViewOnBoost: true,
          /**
           * The cache to store evaluated trigger specifications into.
           * You may define a simple object to use a never-clearing cache, or implement your own system using a [proxy object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
           * @type {Object|null}
           * @default null
           */
          triggerSpecsCache: null,
          /** @type boolean */
          disableInheritance: false,
          /** @type HtmxResponseHandlingConfig[] */
          responseHandling: [
            { code: "204", swap: false },
            { code: "[23]..", swap: true },
            { code: "[45]..", swap: false, error: true }
          ],
          /**
           * Whether to process OOB swaps on elements that are nested within the main response element.
           * @type boolean
           * @default true
           */
          allowNestedOobSwaps: true,
          /**
           * Whether to treat history cache miss full page reload requests as a "HX-Request" by returning this response header
           * This should always be disabled when using HX-Request header to optionally return partial responses
           * @type boolean
           * @default true
           */
          historyRestoreAsHxRequest: true,
          /**
           * Whether to report input validation errors to the end user and update focus to the first input that fails validation.
           * This should always be enabled as this matches default browser form submit behaviour
           * @type boolean
           * @default false
           */
          reportValidityOfForms: false
        },
        /** @type {typeof parseInterval} */
        parseInterval: null,
        /**
         * proxy of window.location used for page reload functions
         * @type location
         */
        location,
        /** @type {typeof internalEval} */
        _: null,
        version: "2.0.10"
      };
      htmx.onLoad = onLoadHelper;
      htmx.process = processNode;
      htmx.on = addEventListenerImpl;
      htmx.off = removeEventListenerImpl;
      htmx.trigger = triggerEvent;
      htmx.ajax = ajaxHelper;
      htmx.find = find;
      htmx.findAll = findAll;
      htmx.closest = closest;
      htmx.remove = removeElement;
      htmx.addClass = addClassToElement;
      htmx.removeClass = removeClassFromElement;
      htmx.toggleClass = toggleClassOnElement;
      htmx.takeClass = takeClassForElement;
      htmx.swap = swap;
      htmx.defineExtension = defineExtension;
      htmx.removeExtension = removeExtension;
      htmx.logAll = logAll;
      htmx.logNone = logNone;
      htmx.parseInterval = parseInterval;
      htmx._ = internalEval;
      const internalAPI = {
        addTriggerHandler,
        bodyContains,
        canAccessLocalStorage,
        findThisElement,
        filterValues,
        swap,
        hasAttribute,
        getAttributeValue,
        getClosestAttributeValue,
        getClosestMatch,
        getExpressionVars,
        getHeaders,
        getInputValues,
        getInternalData,
        getSwapSpecification,
        getTriggerSpecs,
        getTarget,
        makeFragment,
        mergeObjects,
        makeSettleInfo,
        oobSwap,
        querySelectorExt,
        settleImmediately,
        shouldCancel,
        triggerEvent,
        triggerErrorEvent,
        withExtensions
      };
      const VERBS = ["get", "post", "put", "delete", "patch"];
      const VERB_SELECTOR = VERBS.map(function(verb) {
        return "[hx-" + verb + "], [data-hx-" + verb + "]";
      }).join(", ");
      function parseInterval(str2) {
        if (str2 == void 0) {
          return void 0;
        }
        let interval = NaN;
        if (str2.slice(-2) == "ms") {
          interval = parseFloat(str2.slice(0, -2));
        } else if (str2.slice(-1) == "s") {
          interval = parseFloat(str2.slice(0, -1)) * 1e3;
        } else if (str2.slice(-1) == "m") {
          interval = parseFloat(str2.slice(0, -1)) * 1e3 * 60;
        } else {
          interval = parseFloat(str2);
        }
        return isNaN(interval) ? void 0 : interval;
      }
      function getRawAttribute(elt, name) {
        return elt instanceof Element && elt.getAttribute(name);
      }
      function hasAttribute(elt, qualifiedName) {
        return !!elt.hasAttribute && (elt.hasAttribute(qualifiedName) || elt.hasAttribute("data-" + qualifiedName));
      }
      function getAttributeValue(elt, qualifiedName) {
        return getRawAttribute(elt, qualifiedName) || getRawAttribute(elt, "data-" + qualifiedName);
      }
      function parentElt(elt) {
        const parent = elt.parentElement;
        if (!parent && elt.parentNode instanceof ShadowRoot) return elt.parentNode;
        return parent;
      }
      function getDocument() {
        return document;
      }
      function getRootNode(elt, global) {
        return elt.getRootNode ? elt.getRootNode({ composed: global }) : getDocument();
      }
      function getClosestMatch(elt, condition) {
        while (elt && !condition(elt)) {
          elt = parentElt(elt);
        }
        return elt || null;
      }
      function getAttributeValueWithDisinheritance(initialElement, ancestor, attributeName) {
        const attributeValue = getAttributeValue(ancestor, attributeName);
        const disinherit = getAttributeValue(ancestor, "hx-disinherit");
        var inherit = getAttributeValue(ancestor, "hx-inherit");
        if (initialElement !== ancestor) {
          if (htmx.config.disableInheritance) {
            if (inherit && (inherit === "*" || inherit.split(" ").indexOf(attributeName) >= 0)) {
              return attributeValue;
            } else {
              return null;
            }
          }
          if (disinherit && (disinherit === "*" || disinherit.split(" ").indexOf(attributeName) >= 0)) {
            return "unset";
          }
        }
        return attributeValue;
      }
      function getClosestAttributeValue(elt, attributeName) {
        let closestAttr = null;
        getClosestMatch(elt, function(e) {
          return !!(closestAttr = getAttributeValueWithDisinheritance(elt, asElement(e), attributeName));
        });
        if (closestAttr !== "unset") {
          return closestAttr;
        }
      }
      function matches(elt, selector) {
        return elt instanceof Element && elt.matches(selector);
      }
      function getStartTag(str2) {
        const tagMatcher = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        const match = tagMatcher.exec(str2);
        if (match) {
          return match[1].toLowerCase();
        } else {
          return "";
        }
      }
      function parseHTML(resp) {
        if ("parseHTMLUnsafe" in Document) {
          return Document.parseHTMLUnsafe(resp);
        }
        const parser = new DOMParser();
        return parser.parseFromString(resp, "text/html");
      }
      function takeChildrenFor(fragment, elt) {
        while (elt.childNodes.length > 0) {
          fragment.append(elt.childNodes[0]);
        }
      }
      function duplicateScript(script) {
        const newScript = getDocument().createElement("script");
        forEach(script.attributes, function(attr) {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = script.textContent;
        newScript.async = false;
        if (htmx.config.inlineScriptNonce) {
          newScript.nonce = htmx.config.inlineScriptNonce;
        }
        return newScript;
      }
      function isJavaScriptScriptNode(script) {
        return script.matches("script") && (script.type === "text/javascript" || script.type === "module" || script.type === "");
      }
      function normalizeScriptTags(fragment) {
        Array.from(fragment.querySelectorAll("script")).forEach(
          /** @param {HTMLScriptElement} script */
          (script) => {
            if (isJavaScriptScriptNode(script)) {
              const newScript = duplicateScript(script);
              const parent = script.parentNode;
              try {
                parent.insertBefore(newScript, script);
              } catch (e) {
                logError(e);
              } finally {
                script.remove();
              }
            }
          }
        );
      }
      function makeFragment(response) {
        const responseWithNoHead = response.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i, "");
        const startTag = getStartTag(responseWithNoHead);
        let fragment;
        if (startTag === "html") {
          fragment = /** @type DocumentFragmentWithTitle */
          new DocumentFragment();
          const doc = parseHTML(response);
          takeChildrenFor(fragment, doc.body);
          fragment.title = doc.title;
        } else if (startTag === "body") {
          fragment = /** @type DocumentFragmentWithTitle */
          new DocumentFragment();
          const doc = parseHTML(responseWithNoHead);
          takeChildrenFor(fragment, doc.body);
          fragment.title = doc.title;
        } else {
          const doc = parseHTML('<body><template class="internal-htmx-wrapper">' + responseWithNoHead + "</template></body>");
          fragment = /** @type DocumentFragmentWithTitle */
          doc.querySelector("template").content;
          fragment.title = doc.title;
          var titleElement = fragment.querySelector("title");
          if (titleElement && titleElement.parentNode === fragment) {
            titleElement.remove();
            fragment.title = titleElement.innerText;
          }
        }
        if (fragment) {
          if (htmx.config.allowScriptTags) {
            normalizeScriptTags(fragment);
          } else {
            fragment.querySelectorAll("script").forEach((script) => script.remove());
          }
        }
        return fragment;
      }
      function maybeCall(func) {
        if (func) {
          func();
        }
      }
      function isType(o, type) {
        return Object.prototype.toString.call(o) === "[object " + type + "]";
      }
      function isFunction(o) {
        return typeof o === "function";
      }
      function isRawObject(o) {
        return isType(o, "Object");
      }
      function getInternalData(elt) {
        const dataProp = "htmx-internal-data";
        let data2 = elt[dataProp];
        if (!data2) {
          data2 = elt[dataProp] = {};
        }
        return data2;
      }
      function toArray(arr) {
        const returnArr = [];
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            returnArr.push(arr[i]);
          }
        }
        return returnArr;
      }
      function forEach(arr, func) {
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            func(arr[i]);
          }
        }
      }
      function isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;
        return elemTop < window.innerHeight && elemBottom >= 0;
      }
      function bodyContains(elt) {
        return elt.getRootNode({ composed: true }) === document;
      }
      function splitOnWhitespace(trigger2) {
        return trigger2.trim().split(/\s+/);
      }
      function mergeObjects(obj1, obj2) {
        for (const key in obj2) {
          if (obj2.hasOwnProperty(key)) {
            obj1[key] = obj2[key];
          }
        }
        return obj1;
      }
      function parseJSON(jString) {
        try {
          return JSON.parse(jString);
        } catch (error2) {
          logError(error2);
          return null;
        }
      }
      function canAccessLocalStorage() {
        const test = "htmx:sessionStorageTest";
        try {
          sessionStorage.setItem(test, test);
          sessionStorage.removeItem(test);
          return true;
        } catch (e) {
          return false;
        }
      }
      function normalizePath(path) {
        try {
          const url = new URL(path, window.location.href);
          path = url.pathname + url.search;
        } catch (e) {
        }
        if (path != "/") {
          path = path.replace(/\/+$/, "");
        }
        return path;
      }
      function internalEval(str) {
        return maybeEval(getDocument().body, function() {
          return eval(str);
        });
      }
      function onLoadHelper(callback) {
        const value = htmx.on(
          "htmx:load",
          /** @param {CustomEvent} evt */
          function(evt) {
            callback(evt.detail.elt);
          }
        );
        return value;
      }
      function logAll() {
        htmx.logger = function(elt, event, data2) {
          if (console) {
            console.log(event, elt, data2);
          }
        };
      }
      function logNone() {
        htmx.logger = null;
      }
      function find(eltOrSelector, selector) {
        if (typeof eltOrSelector !== "string") {
          return eltOrSelector.querySelector(selector);
        } else {
          return find(getDocument(), eltOrSelector);
        }
      }
      function findAll(eltOrSelector, selector) {
        if (typeof eltOrSelector !== "string") {
          return eltOrSelector.querySelectorAll(selector);
        } else {
          return findAll(getDocument(), eltOrSelector);
        }
      }
      function getWindow() {
        return window;
      }
      function removeElement(elt, delay) {
        elt = resolveTarget(elt);
        if (delay) {
          getWindow().setTimeout(function() {
            removeElement(elt);
            elt = null;
          }, delay);
        } else {
          parentElt(elt).removeChild(elt);
        }
      }
      function asElement(elt) {
        return elt instanceof Element ? elt : null;
      }
      function asHtmlElement(elt) {
        return elt instanceof HTMLElement ? elt : null;
      }
      function asString(value) {
        return typeof value === "string" ? value : null;
      }
      function asParentNode(elt) {
        return elt instanceof Element || elt instanceof Document || elt instanceof DocumentFragment ? elt : null;
      }
      function addClassToElement(elt, clazz, delay) {
        elt = asElement(resolveTarget(elt));
        if (!elt) {
          return;
        }
        if (delay) {
          getWindow().setTimeout(function() {
            addClassToElement(elt, clazz);
            elt = null;
          }, delay);
        } else {
          elt.classList && elt.classList.add(clazz);
        }
      }
      function removeClassFromElement(node, clazz, delay) {
        let elt = asElement(resolveTarget(node));
        if (!elt) {
          return;
        }
        if (delay) {
          getWindow().setTimeout(function() {
            removeClassFromElement(elt, clazz);
            elt = null;
          }, delay);
        } else {
          if (elt.classList) {
            elt.classList.remove(clazz);
            if (elt.classList.length === 0) {
              elt.removeAttribute("class");
            }
          }
        }
      }
      function toggleClassOnElement(elt, clazz) {
        elt = resolveTarget(elt);
        elt.classList.toggle(clazz);
      }
      function takeClassForElement(elt, clazz) {
        elt = resolveTarget(elt);
        forEach(elt.parentElement.children, function(child) {
          removeClassFromElement(child, clazz);
        });
        addClassToElement(asElement(elt), clazz);
      }
      function closest(elt, selector) {
        elt = asElement(resolveTarget(elt));
        if (elt) {
          return elt.closest(selector);
        }
        return null;
      }
      function startsWith(str2, prefix2) {
        return str2.substring(0, prefix2.length) === prefix2;
      }
      function endsWith(str2, suffix) {
        return str2.substring(str2.length - suffix.length) === suffix;
      }
      function normalizeSelector(selector) {
        const trimmedSelector = selector.trim();
        if (startsWith(trimmedSelector, "<") && endsWith(trimmedSelector, "/>")) {
          return trimmedSelector.substring(1, trimmedSelector.length - 2);
        } else {
          return trimmedSelector;
        }
      }
      function querySelectorAllExt(elt, selector, global) {
        if (selector.indexOf("global ") === 0) {
          return querySelectorAllExt(elt, selector.slice(7), true);
        }
        elt = resolveTarget(elt);
        const parts = [];
        {
          let chevronsCount = 0;
          let offset = 0;
          for (let i = 0; i < selector.length; i++) {
            const char = selector[i];
            if (char === "," && chevronsCount === 0) {
              parts.push(selector.substring(offset, i));
              offset = i + 1;
              continue;
            }
            if (char === "<") {
              chevronsCount++;
            } else if (char === "/" && i < selector.length - 1 && selector[i + 1] === ">") {
              chevronsCount--;
            }
          }
          if (offset < selector.length) {
            parts.push(selector.substring(offset));
          }
        }
        const result = [];
        const unprocessedParts = [];
        while (parts.length > 0) {
          const selector2 = normalizeSelector(parts.shift());
          let item;
          if (selector2.indexOf("closest ") === 0) {
            item = closest(asElement(elt), normalizeSelector(selector2.slice(8)));
          } else if (selector2.indexOf("find ") === 0) {
            item = find(asParentNode(elt), normalizeSelector(selector2.slice(5)));
          } else if (selector2 === "next" || selector2 === "nextElementSibling") {
            item = asElement(elt).nextElementSibling;
          } else if (selector2.indexOf("next ") === 0) {
            item = scanForwardQuery(elt, normalizeSelector(selector2.slice(5)), !!global);
          } else if (selector2 === "previous" || selector2 === "previousElementSibling") {
            item = asElement(elt).previousElementSibling;
          } else if (selector2.indexOf("previous ") === 0) {
            item = scanBackwardsQuery(elt, normalizeSelector(selector2.slice(9)), !!global);
          } else if (selector2 === "document") {
            item = document;
          } else if (selector2 === "window") {
            item = window;
          } else if (selector2 === "body") {
            item = document.body;
          } else if (selector2 === "root") {
            item = getRootNode(elt, !!global);
          } else if (selector2 === "host") {
            item = /** @type ShadowRoot */
            elt.getRootNode().host;
          } else {
            unprocessedParts.push(selector2);
          }
          if (item) {
            result.push(item);
          }
        }
        if (unprocessedParts.length > 0) {
          const standardSelector = unprocessedParts.join(",");
          const rootNode = asParentNode(getRootNode(elt, !!global));
          result.push(...toArray(rootNode.querySelectorAll(standardSelector)));
        }
        return result;
      }
      var scanForwardQuery = function(start2, match, global) {
        const results = asParentNode(getRootNode(start2, global)).querySelectorAll(match);
        for (let i = 0; i < results.length; i++) {
          const elt = results[i];
          if (elt.compareDocumentPosition(start2) === Node.DOCUMENT_POSITION_PRECEDING) {
            return elt;
          }
        }
      };
      var scanBackwardsQuery = function(start2, match, global) {
        const results = asParentNode(getRootNode(start2, global)).querySelectorAll(match);
        for (let i = results.length - 1; i >= 0; i--) {
          const elt = results[i];
          if (elt.compareDocumentPosition(start2) === Node.DOCUMENT_POSITION_FOLLOWING) {
            return elt;
          }
        }
      };
      function querySelectorExt(eltOrSelector, selector) {
        if (typeof eltOrSelector !== "string") {
          return querySelectorAllExt(eltOrSelector, selector)[0];
        } else {
          return querySelectorAllExt(getDocument().body, eltOrSelector)[0];
        }
      }
      function resolveTarget(eltOrSelector, context) {
        if (typeof eltOrSelector === "string") {
          return find(asParentNode(context) || document, eltOrSelector);
        } else {
          return eltOrSelector;
        }
      }
      function processEventArgs(arg1, arg2, arg3, arg4) {
        if (isFunction(arg2)) {
          return {
            target: getDocument().body,
            event: asString(arg1),
            listener: arg2,
            options: arg3
          };
        } else {
          return {
            target: resolveTarget(arg1),
            event: asString(arg2),
            listener: arg3,
            options: arg4
          };
        }
      }
      function addEventListenerImpl(arg1, arg2, arg3, arg4) {
        ready(function() {
          const eventArgs = processEventArgs(arg1, arg2, arg3, arg4);
          eventArgs.target.addEventListener(eventArgs.event, eventArgs.listener, eventArgs.options);
        });
        const b = isFunction(arg2);
        return b ? arg2 : arg3;
      }
      function removeEventListenerImpl(arg1, arg2, arg3) {
        ready(function() {
          const eventArgs = processEventArgs(arg1, arg2, arg3);
          eventArgs.target.removeEventListener(eventArgs.event, eventArgs.listener);
        });
        return isFunction(arg2) ? arg2 : arg3;
      }
      const DUMMY_ELT = getDocument().createElement("output");
      function findAttributeTargets(elt, attrName) {
        const attrTarget = getClosestAttributeValue(elt, attrName);
        if (attrTarget) {
          if (attrTarget === "this") {
            return [findThisElement(elt, attrName)];
          } else {
            const result = querySelectorAllExt(elt, attrTarget);
            const shouldInherit = /(^|,)(\s*)inherit(\s*)($|,)/.test(attrTarget);
            if (shouldInherit) {
              const eltToInheritFrom = asElement(getClosestMatch(elt, function(parent) {
                return parent !== elt && hasAttribute(asElement(parent), attrName);
              }));
              if (eltToInheritFrom) {
                result.push(...findAttributeTargets(eltToInheritFrom, attrName));
              }
            }
            if (result.length === 0) {
              logError('The selector "' + attrTarget + '" on ' + attrName + " returned no matches!");
              return [DUMMY_ELT];
            } else {
              return result;
            }
          }
        }
      }
      function findThisElement(elt, attribute) {
        return asElement(getClosestMatch(elt, function(elt2) {
          return getAttributeValue(asElement(elt2), attribute) != null;
        }));
      }
      function getTarget(elt) {
        const targetStr = getClosestAttributeValue(elt, "hx-target");
        if (targetStr) {
          if (targetStr === "this") {
            return findThisElement(elt, "hx-target");
          } else {
            return querySelectorExt(elt, targetStr);
          }
        } else {
          const data2 = getInternalData(elt);
          if (data2.boosted) {
            return getDocument().body;
          } else {
            return elt;
          }
        }
      }
      function shouldSettleAttribute(name) {
        return htmx.config.attributesToSettle.includes(name);
      }
      function cloneAttributes(mergeTo, mergeFrom) {
        forEach(Array.from(mergeTo.attributes), function(attr) {
          if (!mergeFrom.hasAttribute(attr.name) && shouldSettleAttribute(attr.name)) {
            mergeTo.removeAttribute(attr.name);
          }
        });
        forEach(mergeFrom.attributes, function(attr) {
          if (shouldSettleAttribute(attr.name)) {
            mergeTo.setAttribute(attr.name, attr.value);
          }
        });
      }
      function isInlineSwap(swapStyle, target) {
        const extensions2 = getExtensions(target);
        for (let i = 0; i < extensions2.length; i++) {
          const extension = extensions2[i];
          try {
            if (extension.isInlineSwap(swapStyle)) {
              return true;
            }
          } catch (e) {
            logError(e);
          }
        }
        return swapStyle === "outerHTML";
      }
      function oobSwap(oobValue, oobElement, settleInfo, rootNode) {
        rootNode = rootNode || getDocument();
        let selector = "#" + CSS.escape(getRawAttribute(oobElement, "id"));
        let swapStyle = "outerHTML";
        if (oobValue === "true") {
        } else if (oobValue.indexOf(":") > 0) {
          swapStyle = oobValue.substring(0, oobValue.indexOf(":"));
          selector = oobValue.substring(oobValue.indexOf(":") + 1);
        } else {
          swapStyle = oobValue;
        }
        oobElement.removeAttribute("hx-swap-oob");
        oobElement.removeAttribute("data-hx-swap-oob");
        const targets = querySelectorAllExt(rootNode, selector, false);
        if (targets.length) {
          forEach(
            targets,
            function(target) {
              let fragment;
              const oobElementClone = oobElement.cloneNode(true);
              fragment = getDocument().createDocumentFragment();
              fragment.appendChild(oobElementClone);
              if (!isInlineSwap(swapStyle, target)) {
                fragment = asParentNode(oobElementClone);
              }
              const beforeSwapDetails = { shouldSwap: true, target, fragment };
              if (!triggerEvent(target, "htmx:oobBeforeSwap", beforeSwapDetails)) return;
              target = beforeSwapDetails.target;
              if (beforeSwapDetails.shouldSwap) {
                handlePreservedElements(fragment);
                swapWithStyle(swapStyle, target, target, fragment, settleInfo);
                restorePreservedElements();
              }
              forEach(settleInfo.elts, function(elt) {
                triggerEvent(elt, "htmx:oobAfterSwap", beforeSwapDetails);
              });
            }
          );
          oobElement.parentNode.removeChild(oobElement);
        } else {
          oobElement.parentNode.removeChild(oobElement);
          triggerErrorEvent(getDocument().body, "htmx:oobErrorNoTarget", { content: oobElement, target: selector });
        }
        return oobValue;
      }
      function restorePreservedElements() {
        const pantry = find("#--htmx-preserve-pantry--");
        if (pantry) {
          for (const preservedElt of [...pantry.children]) {
            const existingElement = find("#" + preservedElt.id);
            existingElement.parentNode.moveBefore(preservedElt, existingElement);
            existingElement.remove();
          }
          pantry.remove();
        }
      }
      function handlePreservedElements(fragment) {
        forEach(findAll(fragment, "[hx-preserve], [data-hx-preserve]"), function(preservedElt) {
          const id = getAttributeValue(preservedElt, "id");
          const existingElement = getDocument().getElementById(id);
          if (existingElement != null) {
            if (preservedElt.moveBefore) {
              let pantry = find("#--htmx-preserve-pantry--");
              if (pantry == null) {
                getDocument().body.insertAdjacentHTML("afterend", "<div id='--htmx-preserve-pantry--'></div>");
                pantry = find("#--htmx-preserve-pantry--");
              }
              pantry.moveBefore(existingElement, null);
            } else {
              preservedElt.parentNode.replaceChild(existingElement, preservedElt);
            }
          }
        });
      }
      function handleAttributes(parentNode, fragment, settleInfo) {
        forEach(fragment.querySelectorAll("[id]"), function(newNode) {
          const id = getRawAttribute(newNode, "id");
          if (id && id.length > 0) {
            const parentElt2 = asParentNode(parentNode);
            const oldNode = parentElt2 && parentElt2.querySelector(CSS.escape(newNode.tagName) + "#" + CSS.escape(id));
            if (oldNode && oldNode !== parentElt2) {
              const newAttributes = newNode.cloneNode();
              cloneAttributes(newNode, oldNode);
              settleInfo.tasks.push(function() {
                cloneAttributes(newNode, newAttributes);
              });
            }
          }
        });
      }
      function makeAjaxLoadTask(child) {
        return function() {
          removeClassFromElement(child, htmx.config.addedClass);
          processNode(asElement(child));
          processFocus(asParentNode(child));
          triggerEvent(child, "htmx:load");
        };
      }
      function processFocus(child) {
        const autofocus = "[autofocus]";
        const autoFocusedElt = asHtmlElement(matches(child, autofocus) ? child : child.querySelector(autofocus));
        if (autoFocusedElt != null) {
          autoFocusedElt.focus();
        }
      }
      function insertNodesBefore(parentNode, insertBefore, fragment, settleInfo) {
        handleAttributes(parentNode, fragment, settleInfo);
        while (fragment.childNodes.length > 0) {
          const child = fragment.firstChild;
          addClassToElement(asElement(child), htmx.config.addedClass);
          parentNode.insertBefore(child, insertBefore);
          if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
            settleInfo.tasks.push(makeAjaxLoadTask(child));
          }
        }
      }
      function stringHash(string, hash) {
        let char = 0;
        while (char < string.length) {
          hash = (hash << 5) - hash + string.charCodeAt(char++) | 0;
        }
        return hash;
      }
      function attributeHash(elt) {
        let hash = 0;
        for (let i = 0; i < elt.attributes.length; i++) {
          const attribute = elt.attributes[i];
          if (attribute.value) {
            hash = stringHash(attribute.name, hash);
            hash = stringHash(attribute.value, hash);
          }
        }
        return hash;
      }
      function deInitOnHandlers(elt) {
        const internalData = getInternalData(elt);
        if (internalData.onHandlers) {
          for (let i = 0; i < internalData.onHandlers.length; i++) {
            const handlerInfo = internalData.onHandlers[i];
            removeEventListenerImpl(elt, handlerInfo.event, handlerInfo.listener);
          }
          delete internalData.onHandlers;
        }
      }
      function deInitNode(element) {
        const internalData = getInternalData(element);
        if (internalData.timeout) {
          clearTimeout(internalData.timeout);
        }
        if (internalData.listenerInfos) {
          forEach(internalData.listenerInfos, function(info) {
            if (info.on) {
              removeEventListenerImpl(info.on, info.trigger, info.listener);
            }
          });
        }
        deInitOnHandlers(element);
        forEach(Object.keys(internalData), function(key) {
          if (key !== "firstInitCompleted") delete internalData[key];
        });
      }
      function cleanUpElement(element) {
        triggerEvent(element, "htmx:beforeCleanupElement");
        deInitNode(element);
        forEach(element.children, function(child) {
          cleanUpElement(child);
        });
      }
      function swapOuterHTML(target, fragment, settleInfo) {
        if (target.tagName === "BODY") {
          return swapInnerHTML(target, fragment, settleInfo);
        }
        let newElt;
        const eltBeforeNewContent = target.previousSibling;
        const parentNode = parentElt(target);
        if (!parentNode) {
          return;
        }
        insertNodesBefore(parentNode, target, fragment, settleInfo);
        if (eltBeforeNewContent == null) {
          newElt = parentNode.firstChild;
        } else {
          newElt = eltBeforeNewContent.nextSibling;
        }
        settleInfo.elts = settleInfo.elts.filter(function(e) {
          return e !== target;
        });
        while (newElt && newElt !== target) {
          if (newElt instanceof Element) {
            settleInfo.elts.push(newElt);
          }
          newElt = newElt.nextSibling;
        }
        cleanUpElement(target);
        target.remove();
      }
      function swapAfterBegin(target, fragment, settleInfo) {
        return insertNodesBefore(target, target.firstChild, fragment, settleInfo);
      }
      function swapBeforeBegin(target, fragment, settleInfo) {
        return insertNodesBefore(parentElt(target), target, fragment, settleInfo);
      }
      function swapBeforeEnd(target, fragment, settleInfo) {
        return insertNodesBefore(target, null, fragment, settleInfo);
      }
      function swapAfterEnd(target, fragment, settleInfo) {
        return insertNodesBefore(parentElt(target), target.nextSibling, fragment, settleInfo);
      }
      function swapDelete(target) {
        cleanUpElement(target);
        const parent = parentElt(target);
        if (parent) {
          return parent.removeChild(target);
        }
      }
      function swapInnerHTML(target, fragment, settleInfo) {
        const firstChild = target.firstChild;
        insertNodesBefore(target, firstChild, fragment, settleInfo);
        if (firstChild) {
          while (firstChild.nextSibling) {
            cleanUpElement(firstChild.nextSibling);
            target.removeChild(firstChild.nextSibling);
          }
          cleanUpElement(firstChild);
          target.removeChild(firstChild);
        }
      }
      function swapWithStyle(swapStyle, elt, target, fragment, settleInfo) {
        switch (swapStyle) {
          case "none":
            return;
          case "outerHTML":
            swapOuterHTML(target, fragment, settleInfo);
            return;
          case "afterbegin":
            swapAfterBegin(target, fragment, settleInfo);
            return;
          case "beforebegin":
            swapBeforeBegin(target, fragment, settleInfo);
            return;
          case "beforeend":
            swapBeforeEnd(target, fragment, settleInfo);
            return;
          case "afterend":
            swapAfterEnd(target, fragment, settleInfo);
            return;
          case "delete":
            swapDelete(target);
            return;
          default:
            var extensions2 = getExtensions(elt);
            for (let i = 0; i < extensions2.length; i++) {
              const ext = extensions2[i];
              try {
                const newElements = ext.handleSwap(swapStyle, target, fragment, settleInfo);
                if (newElements) {
                  if (Array.isArray(newElements)) {
                    for (let j = 0; j < newElements.length; j++) {
                      const child = newElements[j];
                      if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                        settleInfo.tasks.push(makeAjaxLoadTask(child));
                      }
                    }
                  }
                  return;
                }
              } catch (e) {
                logError(e);
              }
            }
            if (swapStyle === "innerHTML") {
              swapInnerHTML(target, fragment, settleInfo);
            } else {
              swapWithStyle(htmx.config.defaultSwapStyle, elt, target, fragment, settleInfo);
            }
        }
      }
      function findAndSwapOobElements(fragment, settleInfo, rootNode) {
        var oobElts = findAll(fragment, "[hx-swap-oob], [data-hx-swap-oob]");
        forEach(oobElts, function(oobElement) {
          if (htmx.config.allowNestedOobSwaps || oobElement.parentElement === null) {
            const oobValue = getAttributeValue(oobElement, "hx-swap-oob");
            if (oobValue != null) {
              oobSwap(oobValue, oobElement, settleInfo, rootNode);
            }
          } else {
            oobElement.removeAttribute("hx-swap-oob");
            oobElement.removeAttribute("data-hx-swap-oob");
          }
        });
        return oobElts.length > 0;
      }
      function swap(target, content, swapSpec, swapOptions) {
        if (!swapOptions) {
          swapOptions = {};
        }
        let settleResolve = null;
        let settleReject = null;
        let doSwap = function() {
          maybeCall(swapOptions.beforeSwapCallback);
          target = resolveTarget(target);
          const rootNode = swapOptions.contextElement ? getRootNode(swapOptions.contextElement, false) : getDocument();
          const activeElt = document.activeElement;
          let selectionInfo = {};
          selectionInfo = {
            elt: activeElt,
            // @ts-ignore
            start: activeElt ? activeElt.selectionStart : null,
            // @ts-ignore
            end: activeElt ? activeElt.selectionEnd : null
          };
          const settleInfo = makeSettleInfo(target);
          if (swapSpec.swapStyle === "textContent") {
            target.textContent = content;
          } else {
            let fragment = makeFragment(content);
            settleInfo.title = swapOptions.title || fragment.title;
            if (swapOptions.historyRequest) {
              fragment = fragment.querySelector("[hx-history-elt],[data-hx-history-elt]") || fragment;
            }
            if (swapOptions.selectOOB) {
              const oobSelectValues = swapOptions.selectOOB.split(",");
              for (let i = 0; i < oobSelectValues.length; i++) {
                const oobSelectValue = oobSelectValues[i].split(":", 2);
                let id = oobSelectValue[0].trim();
                if (id.indexOf("#") === 0) {
                  id = id.substring(1);
                }
                const oobValue = oobSelectValue[1] || "true";
                const oobElement = fragment.querySelector("#" + id);
                if (oobElement) {
                  oobSwap(oobValue, oobElement, settleInfo, rootNode);
                }
              }
            }
            findAndSwapOobElements(fragment, settleInfo, rootNode);
            forEach(
              findAll(fragment, "template"),
              /** @param {HTMLTemplateElement} template */
              function(template) {
                if (template.content && findAndSwapOobElements(template.content, settleInfo, rootNode)) {
                  template.remove();
                }
              }
            );
            if (swapOptions.select) {
              const newFragment = getDocument().createDocumentFragment();
              forEach(fragment.querySelectorAll(swapOptions.select), function(node) {
                newFragment.appendChild(node);
              });
              fragment = newFragment;
            }
            handlePreservedElements(fragment);
            swapWithStyle(swapSpec.swapStyle, swapOptions.contextElement, target, fragment, settleInfo);
            restorePreservedElements();
          }
          if (selectionInfo.elt && !bodyContains(selectionInfo.elt) && getRawAttribute(selectionInfo.elt, "id")) {
            const newActiveElt = document.getElementById(getRawAttribute(selectionInfo.elt, "id"));
            const focusOptions = { preventScroll: swapSpec.focusScroll !== void 0 ? !swapSpec.focusScroll : !htmx.config.defaultFocusScroll };
            if (newActiveElt) {
              if (selectionInfo.start && newActiveElt.setSelectionRange) {
                try {
                  newActiveElt.setSelectionRange(selectionInfo.start, selectionInfo.end);
                } catch (e) {
                }
              }
              newActiveElt.focus(focusOptions);
            }
          }
          removeClassFromElement(target, htmx.config.swappingClass);
          forEach(settleInfo.elts, function(elt2) {
            if (elt2.classList) {
              addClassToElement(elt2, htmx.config.settlingClass);
            }
            triggerEvent(elt2, "htmx:afterSwap", swapOptions.eventInfo);
          });
          maybeCall(swapOptions.afterSwapCallback);
          if (!swapSpec.ignoreTitle) {
            handleTitle(settleInfo.title);
          }
          const doSettle = function() {
            forEach(settleInfo.tasks, function(task) {
              task.call();
            });
            forEach(settleInfo.elts, function(elt2) {
              if (elt2.classList) {
                removeClassFromElement(elt2, htmx.config.settlingClass);
              }
              triggerEvent(elt2, "htmx:afterSettle", swapOptions.eventInfo);
            });
            if (swapOptions.anchor) {
              const anchorTarget = asElement(resolveTarget("#" + swapOptions.anchor));
              if (anchorTarget) {
                anchorTarget.scrollIntoView({ block: "start", behavior: "auto" });
              }
            }
            updateScrollState(settleInfo.elts, swapSpec);
            maybeCall(swapOptions.afterSettleCallback);
            maybeCall(settleResolve);
          };
          if (swapSpec.settleDelay > 0) {
            getWindow().setTimeout(doSettle, swapSpec.settleDelay);
          } else {
            doSettle();
          }
        };
        let shouldTransition = htmx.config.globalViewTransitions;
        if (swapSpec.hasOwnProperty("transition")) {
          shouldTransition = swapSpec.transition;
        }
        const elt = swapOptions.contextElement || getDocument();
        if (shouldTransition && triggerEvent(elt, "htmx:beforeTransition", swapOptions.eventInfo) && typeof Promise !== "undefined" && // @ts-ignore experimental feature atm
        document.startViewTransition) {
          const settlePromise = new Promise(function(_resolve, _reject) {
            settleResolve = _resolve;
            settleReject = _reject;
          });
          const innerDoSwap = doSwap;
          doSwap = function() {
            document.startViewTransition(function() {
              innerDoSwap();
              return settlePromise;
            });
          };
        }
        try {
          if (swapSpec?.swapDelay && swapSpec.swapDelay > 0) {
            getWindow().setTimeout(doSwap, swapSpec.swapDelay);
          } else {
            doSwap();
          }
        } catch (e) {
          triggerErrorEvent(elt, "htmx:swapError", swapOptions.eventInfo);
          maybeCall(settleReject);
          throw e;
        }
      }
      function handleTriggerHeader(xhr, header, elt) {
        const triggerBody = xhr.getResponseHeader(header);
        if (triggerBody.indexOf("{") === 0) {
          const triggers = parseJSON(triggerBody);
          for (const eventName in triggers) {
            if (triggers.hasOwnProperty(eventName)) {
              let detail = triggers[eventName];
              if (isRawObject(detail)) {
                elt = detail.target !== void 0 ? detail.target : elt;
              } else {
                detail = { value: detail };
              }
              triggerEvent(elt, eventName, detail);
            }
          }
        } else {
          const eventNames = triggerBody.split(",");
          for (let i = 0; i < eventNames.length; i++) {
            triggerEvent(elt, eventNames[i].trim(), []);
          }
        }
      }
      const WHITESPACE = /\s/;
      const WHITESPACE_OR_COMMA = /[\s,]/;
      const SYMBOL_START = /[_$a-zA-Z]/;
      const SYMBOL_CONT = /[_$a-zA-Z0-9]/;
      const STRINGISH_START = ['"', "'", "/"];
      const NOT_WHITESPACE = /[^\s]/;
      const COMBINED_SELECTOR_START = /[{(]/;
      const COMBINED_SELECTOR_END = /[})]/;
      function tokenizeString(str2) {
        const tokens = [];
        let position = 0;
        while (position < str2.length) {
          if (SYMBOL_START.exec(str2.charAt(position))) {
            var startPosition = position;
            while (SYMBOL_CONT.exec(str2.charAt(position + 1))) {
              position++;
            }
            tokens.push(str2.substring(startPosition, position + 1));
          } else if (STRINGISH_START.indexOf(str2.charAt(position)) !== -1) {
            const startChar = str2.charAt(position);
            var startPosition = position;
            position++;
            while (position < str2.length && str2.charAt(position) !== startChar) {
              if (str2.charAt(position) === "\\") {
                position++;
              }
              position++;
            }
            tokens.push(str2.substring(startPosition, position + 1));
          } else {
            const symbol = str2.charAt(position);
            tokens.push(symbol);
          }
          position++;
        }
        return tokens;
      }
      function isPossibleRelativeReference(token, last, paramName) {
        return SYMBOL_START.exec(token.charAt(0)) && token !== "true" && token !== "false" && token !== "this" && token !== paramName && last !== ".";
      }
      function maybeGenerateConditional(elt, tokens, paramName) {
        if (tokens[0] === "[") {
          tokens.shift();
          let bracketCount = 1;
          let conditionalSource = " return (function(" + paramName + "){ return (";
          let last = null;
          while (tokens.length > 0) {
            const token = tokens[0];
            if (token === "]") {
              bracketCount--;
              if (bracketCount === 0) {
                if (last === null) {
                  conditionalSource = conditionalSource + "true";
                }
                tokens.shift();
                conditionalSource += ")})";
                try {
                  const conditionFunction = maybeEval(
                    elt,
                    function() {
                      return Function(conditionalSource)();
                    },
                    function() {
                      return true;
                    }
                  );
                  conditionFunction.source = conditionalSource;
                  return conditionFunction;
                } catch (e) {
                  triggerErrorEvent(getDocument().body, "htmx:syntax:error", { error: e, source: conditionalSource });
                  return null;
                }
              }
            } else if (token === "[") {
              bracketCount++;
            }
            if (isPossibleRelativeReference(token, last, paramName)) {
              conditionalSource += "((" + paramName + "." + token + ") ? (" + paramName + "." + token + ") : (window." + token + "))";
            } else {
              conditionalSource = conditionalSource + token;
            }
            last = tokens.shift();
          }
        }
      }
      function consumeUntil(tokens, match) {
        let result = "";
        while (tokens.length > 0 && !match.test(tokens[0])) {
          result += tokens.shift();
        }
        return result;
      }
      function consumeCSSSelector(tokens) {
        let result;
        if (tokens.length > 0 && COMBINED_SELECTOR_START.test(tokens[0])) {
          tokens.shift();
          result = consumeUntil(tokens, COMBINED_SELECTOR_END).trim();
          tokens.shift();
        } else {
          result = consumeUntil(tokens, WHITESPACE_OR_COMMA);
        }
        return result;
      }
      const INPUT_SELECTOR = "input, textarea, select";
      function parseAndCacheTrigger(elt, explicitTrigger, cache) {
        const triggerSpecs = [];
        const tokens = tokenizeString(explicitTrigger);
        do {
          consumeUntil(tokens, NOT_WHITESPACE);
          const initialLength = tokens.length;
          const trigger2 = consumeUntil(tokens, /[,\[\s]/);
          if (trigger2 !== "") {
            if (trigger2 === "every") {
              const every = { trigger: "every" };
              consumeUntil(tokens, NOT_WHITESPACE);
              every.pollInterval = parseInterval(consumeUntil(tokens, /[,\[\s]/));
              consumeUntil(tokens, NOT_WHITESPACE);
              var eventFilter = maybeGenerateConditional(elt, tokens, "event");
              if (eventFilter) {
                every.eventFilter = eventFilter;
              }
              triggerSpecs.push(every);
            } else {
              const triggerSpec = { trigger: trigger2 };
              var eventFilter = maybeGenerateConditional(elt, tokens, "event");
              if (eventFilter) {
                triggerSpec.eventFilter = eventFilter;
              }
              consumeUntil(tokens, NOT_WHITESPACE);
              while (tokens.length > 0 && tokens[0] !== ",") {
                const token = tokens.shift();
                if (token === "changed") {
                  triggerSpec.changed = true;
                } else if (token === "once") {
                  triggerSpec.once = true;
                } else if (token === "consume") {
                  triggerSpec.consume = true;
                } else if (token === "delay" && tokens[0] === ":") {
                  tokens.shift();
                  triggerSpec.delay = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
                } else if (token === "from" && tokens[0] === ":") {
                  tokens.shift();
                  if (COMBINED_SELECTOR_START.test(tokens[0])) {
                    var from_arg = consumeCSSSelector(tokens);
                  } else {
                    var from_arg = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                    if (from_arg === "closest" || from_arg === "find" || from_arg === "next" || from_arg === "previous") {
                      tokens.shift();
                      const selector = consumeCSSSelector(tokens);
                      if (selector.length > 0) {
                        from_arg += " " + selector;
                      }
                    }
                  }
                  triggerSpec.from = from_arg;
                } else if (token === "target" && tokens[0] === ":") {
                  tokens.shift();
                  triggerSpec.target = consumeCSSSelector(tokens);
                } else if (token === "throttle" && tokens[0] === ":") {
                  tokens.shift();
                  triggerSpec.throttle = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
                } else if (token === "queue" && tokens[0] === ":") {
                  tokens.shift();
                  triggerSpec.queue = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                } else if (token === "root" && tokens[0] === ":") {
                  tokens.shift();
                  triggerSpec[token] = consumeCSSSelector(tokens);
                } else if (token === "threshold" && tokens[0] === ":") {
                  tokens.shift();
                  triggerSpec[token] = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                } else {
                  triggerErrorEvent(elt, "htmx:syntax:error", { token: tokens.shift() });
                }
                consumeUntil(tokens, NOT_WHITESPACE);
              }
              triggerSpecs.push(triggerSpec);
            }
          }
          if (tokens.length === initialLength) {
            triggerErrorEvent(elt, "htmx:syntax:error", { token: tokens.shift() });
          }
          consumeUntil(tokens, NOT_WHITESPACE);
        } while (tokens[0] === "," && tokens.shift());
        if (cache) {
          cache[explicitTrigger] = triggerSpecs;
        }
        return triggerSpecs;
      }
      function getTriggerSpecs(elt) {
        const explicitTrigger = getAttributeValue(elt, "hx-trigger");
        let triggerSpecs = [];
        if (explicitTrigger) {
          const cache = htmx.config.triggerSpecsCache;
          triggerSpecs = cache && cache[explicitTrigger] || parseAndCacheTrigger(elt, explicitTrigger, cache);
        }
        if (triggerSpecs.length > 0) {
          return triggerSpecs;
        } else if (matches(elt, "form")) {
          return [{ trigger: "submit" }];
        } else if (matches(elt, 'input[type="button"], input[type="submit"]')) {
          return [{ trigger: "click" }];
        } else if (matches(elt, INPUT_SELECTOR)) {
          return [{ trigger: "change" }];
        } else {
          return [{ trigger: "click" }];
        }
      }
      function cancelPolling(elt) {
        getInternalData(elt).cancelled = true;
      }
      function processPolling(elt, handler4, spec) {
        const nodeData = getInternalData(elt);
        nodeData.timeout = getWindow().setTimeout(function() {
          if (bodyContains(elt) && nodeData.cancelled !== true) {
            if (!maybeFilterEvent(spec, elt, makeEvent("hx:poll:trigger", {
              triggerSpec: spec,
              target: elt
            }))) {
              handler4(elt);
            }
            processPolling(elt, handler4, spec);
          }
        }, spec.pollInterval);
      }
      function isLocalLink(elt) {
        return location.hostname === elt.hostname && getRawAttribute(elt, "href") && getRawAttribute(elt, "href").indexOf("#") !== 0;
      }
      function eltIsDisabled(elt) {
        return closest(elt, htmx.config.disableSelector);
      }
      function boostElement(elt, nodeData, triggerSpecs) {
        if (elt instanceof HTMLAnchorElement && isLocalLink(elt) && (elt.target === "" || elt.target === "_self") || elt.tagName === "FORM" && String(getRawAttribute(elt, "method")).toLowerCase() !== "dialog") {
          nodeData.boosted = true;
          let verb, path;
          if (elt.tagName === "A") {
            verb = /** @type HttpVerb */
            "get";
            path = getRawAttribute(elt, "href");
          } else {
            const rawAttribute = getRawAttribute(elt, "method");
            verb = /** @type HttpVerb */
            rawAttribute ? rawAttribute.toLowerCase() : "get";
            path = getRawAttribute(elt, "action");
            if (path == null || path === "") {
              path = location.href;
            }
            if (verb === "get" && path.includes("?")) {
              path = path.replace(/\?[^#]+/, "");
            }
          }
          triggerSpecs.forEach(function(triggerSpec) {
            addEventListener(elt, function(node, evt) {
              const elt2 = asElement(node);
              if (eltIsDisabled(elt2)) {
                cleanUpElement(elt2);
                return;
              }
              issueAjaxRequest(verb, path, elt2, evt);
            }, nodeData, triggerSpec, true);
          });
        }
      }
      function shouldCancel(evt, elt) {
        if (evt.type === "submit" && elt.tagName === "FORM") {
          return true;
        } else if (evt.type === "click") {
          const btn = (
            /** @type {HTMLButtonElement|HTMLInputElement|null} */
            elt.closest('input[type="submit"], button')
          );
          if (btn && btn.form && btn.type === "submit") {
            return true;
          }
          const link = elt.closest("a");
          const samePageAnchor = /^#.+/;
          if (link && link.href && !samePageAnchor.test(link.getAttribute("href"))) {
            return true;
          }
        }
        return false;
      }
      function ignoreBoostedAnchorCtrlClick(elt, evt) {
        return getInternalData(elt).boosted && elt instanceof HTMLAnchorElement && evt.type === "click" && // @ts-ignore this will resolve to undefined for events that don't define those properties, which is fine
        (evt.ctrlKey || evt.metaKey);
      }
      function maybeFilterEvent(triggerSpec, elt, evt) {
        const eventFilter = triggerSpec.eventFilter;
        if (eventFilter) {
          try {
            return eventFilter.call(elt, evt) !== true;
          } catch (e) {
            const source = eventFilter.source;
            triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", { error: e, source });
            return true;
          }
        }
        return false;
      }
      function addEventListener(elt, handler4, nodeData, triggerSpec, explicitCancel) {
        const elementData = getInternalData(elt);
        let eltsToListenOn;
        if (triggerSpec.from) {
          eltsToListenOn = querySelectorAllExt(elt, triggerSpec.from);
        } else {
          eltsToListenOn = [elt];
        }
        if (triggerSpec.changed) {
          if (!("lastValue" in elementData)) {
            elementData.lastValue = /* @__PURE__ */ new WeakMap();
          }
          eltsToListenOn.forEach(function(eltToListenOn) {
            if (!elementData.lastValue.has(triggerSpec)) {
              elementData.lastValue.set(triggerSpec, /* @__PURE__ */ new WeakMap());
            }
            elementData.lastValue.get(triggerSpec).set(eltToListenOn, eltToListenOn.value);
          });
        }
        forEach(eltsToListenOn, function(eltToListenOn) {
          const eventListener = function(evt) {
            if (!bodyContains(elt)) {
              eltToListenOn.removeEventListener(triggerSpec.trigger, eventListener);
              return;
            }
            if (ignoreBoostedAnchorCtrlClick(elt, evt)) {
              return;
            }
            if (explicitCancel || shouldCancel(evt, eltToListenOn)) {
              evt.preventDefault();
            }
            if (maybeFilterEvent(triggerSpec, elt, evt)) {
              return;
            }
            const eventData = getInternalData(evt);
            eventData.triggerSpec = triggerSpec;
            if (eventData.handledFor == null) {
              eventData.handledFor = [];
            }
            if (eventData.handledFor.indexOf(elt) < 0) {
              eventData.handledFor.push(elt);
              if (triggerSpec.consume) {
                evt.stopPropagation();
              }
              if (triggerSpec.target && evt.target) {
                if (!matches(asElement(evt.target), triggerSpec.target)) {
                  return;
                }
              }
              if (triggerSpec.once) {
                if (elementData.triggeredOnce) {
                  return;
                } else {
                  elementData.triggeredOnce = true;
                }
              }
              if (triggerSpec.changed) {
                const node = evt.target;
                const value = node.value;
                const lastValue = elementData.lastValue.get(triggerSpec);
                if (lastValue.has(node) && lastValue.get(node) === value) {
                  return;
                }
                lastValue.set(node, value);
              }
              if (elementData.delayed) {
                clearTimeout(elementData.delayed);
              }
              if (elementData.throttle) {
                return;
              }
              if (triggerSpec.throttle > 0) {
                if (!elementData.throttle) {
                  triggerEvent(elt, "htmx:trigger");
                  handler4(elt, evt);
                  elementData.throttle = getWindow().setTimeout(function() {
                    elementData.throttle = null;
                  }, triggerSpec.throttle);
                }
              } else if (triggerSpec.delay > 0) {
                elementData.delayed = getWindow().setTimeout(function() {
                  triggerEvent(elt, "htmx:trigger");
                  handler4(elt, evt);
                }, triggerSpec.delay);
              } else {
                triggerEvent(elt, "htmx:trigger");
                handler4(elt, evt);
              }
            }
          };
          if (nodeData.listenerInfos == null) {
            nodeData.listenerInfos = [];
          }
          nodeData.listenerInfos.push({
            trigger: triggerSpec.trigger,
            listener: eventListener,
            on: eltToListenOn
          });
          eltToListenOn.addEventListener(triggerSpec.trigger, eventListener);
        });
      }
      let windowIsScrolling = false;
      let scrollHandler = null;
      function initScrollHandler() {
        if (!scrollHandler) {
          scrollHandler = function() {
            windowIsScrolling = true;
          };
          window.addEventListener("scroll", scrollHandler);
          window.addEventListener("resize", scrollHandler);
          setInterval(function() {
            if (windowIsScrolling) {
              windowIsScrolling = false;
              forEach(getDocument().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"), function(elt) {
                maybeReveal(elt);
              });
            }
          }, 200);
        }
      }
      function maybeReveal(elt) {
        if (!hasAttribute(elt, "data-hx-revealed") && isScrolledIntoView(elt)) {
          elt.setAttribute("data-hx-revealed", "true");
          const nodeData = getInternalData(elt);
          if (nodeData.initHash) {
            triggerEvent(elt, "revealed");
          } else {
            elt.addEventListener("htmx:afterProcessNode", function() {
              triggerEvent(elt, "revealed");
            }, { once: true });
          }
        }
      }
      function loadImmediately(elt, handler4, nodeData, delay) {
        const load = function() {
          if (!nodeData.loaded) {
            nodeData.loaded = true;
            triggerEvent(elt, "htmx:trigger");
            handler4(elt);
          }
        };
        if (delay > 0) {
          getWindow().setTimeout(load, delay);
        } else {
          load();
        }
      }
      function processVerbs(elt, nodeData, triggerSpecs) {
        let explicitAction = false;
        forEach(VERBS, function(verb) {
          if (hasAttribute(elt, "hx-" + verb)) {
            const path = getAttributeValue(elt, "hx-" + verb);
            explicitAction = true;
            nodeData.path = path;
            nodeData.verb = verb;
            triggerSpecs.forEach(function(triggerSpec) {
              addTriggerHandler(elt, triggerSpec, nodeData, function(node, evt) {
                const elt2 = asElement(node);
                if (eltIsDisabled(elt2)) {
                  cleanUpElement(elt2);
                  return;
                }
                issueAjaxRequest(verb, path, elt2, evt);
              });
            });
          }
        });
        return explicitAction;
      }
      function addTriggerHandler(elt, triggerSpec, nodeData, handler4) {
        if (triggerSpec.trigger === "revealed") {
          initScrollHandler();
          addEventListener(elt, handler4, nodeData, triggerSpec);
          maybeReveal(asElement(elt));
        } else if (triggerSpec.trigger === "intersect") {
          const observerOptions = {};
          if (triggerSpec.root) {
            observerOptions.root = querySelectorExt(elt, triggerSpec.root);
          }
          if (triggerSpec.threshold) {
            observerOptions.threshold = parseFloat(triggerSpec.threshold);
          }
          const observer2 = new IntersectionObserver(function(entries) {
            for (let i = 0; i < entries.length; i++) {
              const entry = entries[i];
              if (entry.isIntersecting) {
                triggerEvent(elt, "intersect");
                break;
              }
            }
          }, observerOptions);
          observer2.observe(asElement(elt));
          addEventListener(asElement(elt), handler4, nodeData, triggerSpec);
        } else if (!nodeData.firstInitCompleted && triggerSpec.trigger === "load") {
          if (!maybeFilterEvent(triggerSpec, elt, makeEvent("load", { elt }))) {
            loadImmediately(asElement(elt), handler4, nodeData, triggerSpec.delay);
          }
        } else if (triggerSpec.pollInterval > 0) {
          nodeData.polling = true;
          processPolling(asElement(elt), handler4, triggerSpec);
        } else {
          addEventListener(elt, handler4, nodeData, triggerSpec);
        }
      }
      function shouldProcessHxOn(node) {
        const elt = asElement(node);
        if (!elt) {
          return false;
        }
        const attributes = elt.attributes;
        for (let j = 0; j < attributes.length; j++) {
          const attrName = attributes[j].name;
          if (startsWith(attrName, "hx-on:") || startsWith(attrName, "data-hx-on:") || startsWith(attrName, "hx-on-") || startsWith(attrName, "data-hx-on-")) {
            return true;
          }
        }
        return false;
      }
      const HX_ON_QUERY = new XPathEvaluator().createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]');
      function processHXOnRoot(elt, elements) {
        if (shouldProcessHxOn(elt)) {
          elements.push(asElement(elt));
        }
        const iter = HX_ON_QUERY.evaluate(elt);
        let node = null;
        while (node = iter.iterateNext()) elements.push(asElement(node));
      }
      function findHxOnWildcardElements(elt) {
        const elements = [];
        if (elt instanceof DocumentFragment) {
          for (const child of elt.childNodes) {
            processHXOnRoot(child, elements);
          }
        } else {
          processHXOnRoot(elt, elements);
        }
        return elements;
      }
      function findElementsToProcess(elt) {
        if (elt.querySelectorAll) {
          const boostedSelector = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";
          const extensionSelectors = [];
          for (const e in extensions) {
            const extension = extensions[e];
            if (extension.getSelectors) {
              var selectors = extension.getSelectors();
              if (selectors) {
                extensionSelectors.push(selectors);
              }
            }
          }
          const results = elt.querySelectorAll(VERB_SELECTOR + boostedSelector + ", form, [type='submit'], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]" + extensionSelectors.flat().map((s) => ", " + s).join(""));
          return results;
        } else {
          return [];
        }
      }
      function maybeSetLastButtonClicked(evt) {
        const elt = getTargetButton(evt.target);
        const internalData = getRelatedFormData(evt);
        if (internalData) {
          internalData.lastButtonClicked = elt;
        }
      }
      function maybeUnsetLastButtonClicked(evt) {
        const internalData = getRelatedFormData(evt);
        if (internalData) {
          internalData.lastButtonClicked = null;
        }
      }
      function getTargetButton(target) {
        return (
          /** @type {HTMLButtonElement|HTMLInputElement|null} */
          closest(asElement(target), "button, input[type='submit']")
        );
      }
      function getRelatedForm(elt) {
        return elt.form || closest(elt, "form");
      }
      function getRelatedFormData(evt) {
        const elt = getTargetButton(evt.target);
        if (!elt) {
          return;
        }
        const form = getRelatedForm(elt);
        if (!form) {
          return;
        }
        return getInternalData(form);
      }
      function initButtonTracking(elt) {
        elt.addEventListener("click", maybeSetLastButtonClicked);
        elt.addEventListener("focusin", maybeSetLastButtonClicked);
        elt.addEventListener("focusout", maybeUnsetLastButtonClicked);
      }
      function addHxOnEventHandler(elt, eventName, code) {
        const nodeData = getInternalData(elt);
        if (!Array.isArray(nodeData.onHandlers)) {
          nodeData.onHandlers = [];
        }
        let func;
        const listener = function(e) {
          maybeEval(elt, function() {
            if (eltIsDisabled(elt)) {
              return;
            }
            if (!func) {
              func = new Function("event", code);
            }
            func.call(elt, e);
          });
        };
        elt.addEventListener(eventName, listener);
        nodeData.onHandlers.push({ event: eventName, listener });
      }
      function processHxOnWildcard(elt) {
        deInitOnHandlers(elt);
        for (let i = 0; i < elt.attributes.length; i++) {
          const name = elt.attributes[i].name;
          const value = elt.attributes[i].value;
          if (startsWith(name, "hx-on") || startsWith(name, "data-hx-on")) {
            const afterOnPosition = name.indexOf("-on") + 3;
            const nextChar = name.slice(afterOnPosition, afterOnPosition + 1);
            if (nextChar === "-" || nextChar === ":") {
              let eventName = name.slice(afterOnPosition + 1);
              if (startsWith(eventName, ":")) {
                eventName = "htmx" + eventName;
              } else if (startsWith(eventName, "-")) {
                eventName = "htmx:" + eventName.slice(1);
              } else if (startsWith(eventName, "htmx-")) {
                eventName = "htmx:" + eventName.slice(5);
              }
              addHxOnEventHandler(elt, eventName, value);
            }
          }
        }
      }
      function initNode(elt) {
        triggerEvent(elt, "htmx:beforeProcessNode");
        const nodeData = getInternalData(elt);
        const triggerSpecs = getTriggerSpecs(elt);
        const hasExplicitHttpAction = processVerbs(elt, nodeData, triggerSpecs);
        if (!hasExplicitHttpAction) {
          if (getClosestAttributeValue(elt, "hx-boost") === "true") {
            boostElement(elt, nodeData, triggerSpecs);
          } else if (hasAttribute(elt, "hx-trigger")) {
            triggerSpecs.forEach(function(triggerSpec) {
              addTriggerHandler(elt, triggerSpec, nodeData, function() {
              });
            });
          }
        }
        if (elt.tagName === "FORM" || getRawAttribute(elt, "type") === "submit" && hasAttribute(elt, "form")) {
          initButtonTracking(elt);
        }
        nodeData.firstInitCompleted = true;
        triggerEvent(elt, "htmx:afterProcessNode");
      }
      function maybeDeInitAndHash(elt) {
        if (!(elt instanceof Element)) {
          return false;
        }
        const nodeData = getInternalData(elt);
        const hash = attributeHash(elt);
        if (nodeData.initHash !== hash) {
          deInitNode(elt);
          nodeData.initHash = hash;
          return true;
        }
        return false;
      }
      function processNode(elt) {
        elt = resolveTarget(elt);
        if (eltIsDisabled(elt)) {
          cleanUpElement(elt);
          return;
        }
        const elementsToInit = [];
        if (maybeDeInitAndHash(elt)) {
          elementsToInit.push(elt);
        }
        forEach(findElementsToProcess(elt), function(child) {
          if (eltIsDisabled(child)) {
            cleanUpElement(child);
            return;
          }
          if (maybeDeInitAndHash(child)) {
            elementsToInit.push(child);
          }
        });
        forEach(findHxOnWildcardElements(elt), processHxOnWildcard);
        forEach(elementsToInit, initNode);
      }
      function kebabEventName(str2) {
        return str2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function makeEvent(eventName, detail) {
        return new CustomEvent(eventName, { bubbles: true, cancelable: true, composed: true, detail });
      }
      function triggerErrorEvent(elt, eventName, detail) {
        triggerEvent(elt, eventName, mergeObjects({ error: eventName }, detail));
      }
      function ignoreEventForLogging(eventName) {
        return eventName === "htmx:afterProcessNode";
      }
      function withExtensions(elt, toDo, extensionsToIgnore) {
        forEach(getExtensions(elt, [], extensionsToIgnore), function(extension) {
          try {
            toDo(extension);
          } catch (e) {
            logError(e);
          }
        });
      }
      function logError(msg) {
        console.error(msg);
      }
      function triggerEvent(elt, eventName, detail) {
        elt = resolveTarget(elt);
        if (detail == null) {
          detail = {};
        }
        detail.elt = elt;
        const event = makeEvent(eventName, detail);
        if (htmx.logger && !ignoreEventForLogging(eventName)) {
          htmx.logger(elt, eventName, detail);
        }
        if (detail.error) {
          logError(detail.error + (detail.target ? ", " + detail.target : ""));
          triggerEvent(elt, "htmx:error", { errorInfo: detail });
        }
        let eventResult = elt.dispatchEvent(event);
        const kebabName = kebabEventName(eventName);
        if (eventResult && kebabName !== eventName) {
          const kebabedEvent = makeEvent(kebabName, event.detail);
          eventResult = eventResult && elt.dispatchEvent(kebabedEvent);
        }
        withExtensions(asElement(elt), function(extension) {
          eventResult = eventResult && (extension.onEvent(eventName, event) !== false && !event.defaultPrevented);
        });
        return eventResult;
      }
      let currentPathForHistory;
      function setCurrentPathForHistory(path) {
        currentPathForHistory = path;
        if (canAccessLocalStorage()) {
          sessionStorage.setItem("htmx-current-path-for-history", path);
        }
      }
      setCurrentPathForHistory(location.pathname + location.search);
      function getHistoryElement() {
        const historyElt = getDocument().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return historyElt || getDocument().body;
      }
      function saveToHistoryCache(url, rootElt) {
        if (!canAccessLocalStorage()) {
          return;
        }
        const innerHTML = cleanInnerHtmlForHistory(rootElt);
        const title = getDocument().title;
        const scroll = window.scrollY;
        if (htmx.config.historyCacheSize <= 0) {
          sessionStorage.removeItem("htmx-history-cache");
          return;
        }
        url = normalizePath(url);
        const historyCache = parseJSON(sessionStorage.getItem("htmx-history-cache")) || [];
        for (let i = 0; i < historyCache.length; i++) {
          if (historyCache[i].url === url) {
            historyCache.splice(i, 1);
            break;
          }
        }
        const newHistoryItem = { url, content: innerHTML, title, scroll };
        triggerEvent(getDocument().body, "htmx:historyItemCreated", { item: newHistoryItem, cache: historyCache });
        historyCache.push(newHistoryItem);
        while (historyCache.length > htmx.config.historyCacheSize) {
          historyCache.shift();
        }
        while (historyCache.length > 0) {
          try {
            sessionStorage.setItem("htmx-history-cache", JSON.stringify(historyCache));
            break;
          } catch (e) {
            triggerErrorEvent(getDocument().body, "htmx:historyCacheError", { cause: e, cache: historyCache });
            historyCache.shift();
          }
        }
      }
      function getCachedHistory(url) {
        if (!canAccessLocalStorage()) {
          return null;
        }
        url = normalizePath(url);
        const historyCache = parseJSON(sessionStorage.getItem("htmx-history-cache")) || [];
        for (let i = 0; i < historyCache.length; i++) {
          if (historyCache[i].url === url) {
            return historyCache[i];
          }
        }
        return null;
      }
      function cleanInnerHtmlForHistory(elt) {
        const className = htmx.config.requestClass;
        const clone2 = (
          /** @type Element */
          elt.cloneNode(true)
        );
        forEach(findAll(clone2, "." + className), function(child) {
          removeClassFromElement(child, className);
        });
        forEach(findAll(clone2, "[data-disabled-by-htmx]"), function(child) {
          child.removeAttribute("disabled");
        });
        return clone2.innerHTML;
      }
      function saveCurrentPageToHistory() {
        const elt = getHistoryElement();
        let path = currentPathForHistory;
        if (canAccessLocalStorage()) {
          path = sessionStorage.getItem("htmx-current-path-for-history");
        }
        path = path || location.pathname + location.search;
        const disableHistoryCache = getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        if (!disableHistoryCache) {
          triggerEvent(getDocument().body, "htmx:beforeHistorySave", { path, historyElt: elt });
          saveToHistoryCache(path, elt);
        }
        if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, getDocument().title, location.href);
      }
      function pushUrlIntoHistory(path) {
        if (htmx.config.getCacheBusterParam) {
          path = path.replace(/org\.htmx\.cache-buster=[^&]*&?/, "");
          if (endsWith(path, "&") || endsWith(path, "?")) {
            path = path.slice(0, -1);
          }
        }
        if (htmx.config.historyEnabled) {
          history.pushState({ htmx: true }, "", path);
        }
        setCurrentPathForHistory(path);
      }
      function replaceUrlInHistory(path) {
        if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, "", path);
        setCurrentPathForHistory(path);
      }
      function settleImmediately(tasks) {
        forEach(tasks, function(task) {
          task.call(void 0);
        });
      }
      function loadHistoryFromServer(path) {
        const request = new XMLHttpRequest();
        const swapSpec = { swapStyle: "innerHTML", swapDelay: 0, settleDelay: 0 };
        const details = { path, xhr: request, historyElt: getHistoryElement(), swapSpec };
        request.open("GET", path, true);
        if (htmx.config.historyRestoreAsHxRequest) {
          request.setRequestHeader("HX-Request", "true");
        }
        request.setRequestHeader("HX-History-Restore-Request", "true");
        request.setRequestHeader("HX-Current-URL", location.href);
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            details.response = this.response;
            triggerEvent(getDocument().body, "htmx:historyCacheMissLoad", details);
            swap(details.historyElt, details.response, swapSpec, {
              contextElement: details.historyElt,
              historyRequest: true
            });
            setCurrentPathForHistory(details.path);
            triggerEvent(getDocument().body, "htmx:historyRestore", { path, cacheMiss: true, serverResponse: details.response });
          } else {
            triggerErrorEvent(getDocument().body, "htmx:historyCacheMissLoadError", details);
          }
        };
        if (triggerEvent(getDocument().body, "htmx:historyCacheMiss", details)) {
          request.send();
        }
      }
      function restoreHistory(path) {
        saveCurrentPageToHistory();
        path = path || location.pathname + location.search;
        const cached = getCachedHistory(path);
        if (cached) {
          const swapSpec = { swapStyle: "innerHTML", swapDelay: 0, settleDelay: 0, scroll: cached.scroll };
          const details = { path, item: cached, historyElt: getHistoryElement(), swapSpec };
          if (triggerEvent(getDocument().body, "htmx:historyCacheHit", details)) {
            swap(details.historyElt, cached.content, swapSpec, {
              contextElement: details.historyElt,
              title: cached.title
            });
            setCurrentPathForHistory(details.path);
            triggerEvent(getDocument().body, "htmx:historyRestore", details);
          }
        } else {
          if (htmx.config.refreshOnHistoryMiss) {
            htmx.location.reload(true);
          } else {
            loadHistoryFromServer(path);
          }
        }
      }
      function addRequestIndicatorClasses(elt) {
        let indicators = (
          /** @type Element[] */
          findAttributeTargets(elt, "hx-indicator")
        );
        if (indicators == null) {
          indicators = [elt];
        }
        forEach(indicators, function(ic) {
          const internalData = getInternalData(ic);
          internalData.requestCount = (internalData.requestCount || 0) + 1;
          addClassToElement(ic, htmx.config.requestClass);
        });
        return indicators;
      }
      function disableElements(elt) {
        let disabledElts = (
          /** @type Element[] */
          findAttributeTargets(elt, "hx-disabled-elt")
        );
        if (disabledElts == null) {
          disabledElts = [];
        }
        forEach(disabledElts, function(disabledElement) {
          const internalData = getInternalData(disabledElement);
          internalData.requestCount = (internalData.requestCount || 0) + 1;
          if (!disabledElement.hasAttribute("disabled")) {
            disabledElement.setAttribute("disabled", "");
            disabledElement.setAttribute("data-disabled-by-htmx", "");
          }
        });
        return disabledElts;
      }
      function removeRequestIndicators(indicators, disabled) {
        forEach(indicators.concat(disabled), function(ele) {
          const internalData = getInternalData(ele);
          internalData.requestCount = (internalData.requestCount || 1) - 1;
        });
        forEach(indicators, function(ic) {
          const internalData = getInternalData(ic);
          if (internalData.requestCount === 0) {
            removeClassFromElement(ic, htmx.config.requestClass);
          }
        });
        forEach(disabled, function(disabledElement) {
          const internalData = getInternalData(disabledElement);
          if (internalData.requestCount === 0 && disabledElement.hasAttribute("data-disabled-by-htmx")) {
            disabledElement.removeAttribute("disabled");
            disabledElement.removeAttribute("data-disabled-by-htmx");
          }
        });
      }
      function haveSeenNode(processed, elt) {
        for (let i = 0; i < processed.length; i++) {
          const node = processed[i];
          if (node.isSameNode(elt)) {
            return true;
          }
        }
        return false;
      }
      function shouldInclude(element) {
        const elt = (
          /** @type {HTMLInputElement} */
          element
        );
        if (elt.name === "" || elt.name == null || elt.disabled || closest(elt, "fieldset[disabled]")) {
          return false;
        }
        if (elt.type === "button" || elt.type === "submit" || elt.tagName === "image" || elt.tagName === "reset" || elt.tagName === "file") {
          return false;
        }
        if (elt.type === "checkbox" || elt.type === "radio") {
          return elt.checked;
        }
        return true;
      }
      function addValueToFormData(name, value, formData) {
        if (name != null && value != null) {
          if (Array.isArray(value)) {
            value.forEach(function(v) {
              formData.append(name, v);
            });
          } else {
            formData.append(name, value);
          }
        }
      }
      function removeValueFromFormData(name, value, formData) {
        if (name != null && value != null) {
          let values = formData.getAll(name);
          if (Array.isArray(value)) {
            values = values.filter((v) => value.indexOf(v) < 0);
          } else {
            values = values.filter((v) => v !== value);
          }
          formData.delete(name);
          forEach(values, (v) => formData.append(name, v));
        }
      }
      function getValueFromInput(elt) {
        if (elt instanceof HTMLSelectElement && elt.multiple) {
          return toArray(elt.querySelectorAll("option:checked")).map(function(e) {
            return (
              /** @type HTMLOptionElement */
              e.value
            );
          });
        }
        if (elt instanceof HTMLInputElement && elt.files) {
          return toArray(elt.files);
        }
        return elt.value;
      }
      function processInputValue(processed, formData, errors, elt, validate) {
        if (elt == null || haveSeenNode(processed, elt)) {
          return;
        } else {
          processed.push(elt);
        }
        if (shouldInclude(elt)) {
          const name = getRawAttribute(elt, "name");
          addValueToFormData(name, getValueFromInput(elt), formData);
          if (validate) {
            validateElement(elt, errors);
          }
        }
        if (elt instanceof HTMLFormElement) {
          forEach(elt.elements, function(input) {
            if (processed.indexOf(input) >= 0) {
              removeValueFromFormData(input.name, getValueFromInput(input), formData);
            } else {
              processed.push(input);
            }
            if (validate) {
              validateElement(input, errors);
            }
          });
          new FormData(elt).forEach(function(value, name) {
            if (value instanceof File && value.name === "") {
              return;
            }
            addValueToFormData(name, value, formData);
          });
        }
      }
      function validateElement(elt, errors) {
        const element = (
          /** @type {HTMLElement & ElementInternals} */
          elt
        );
        if (element.willValidate) {
          triggerEvent(element, "htmx:validation:validate");
          if (!element.checkValidity()) {
            if (triggerEvent(element, "htmx:validation:failed", {
              message: element.validationMessage,
              validity: element.validity
            }) && !errors.length && htmx.config.reportValidityOfForms) {
              element.reportValidity();
            }
            errors.push({ elt: element, message: element.validationMessage, validity: element.validity });
          }
        }
      }
      function overrideFormData(receiver, donor) {
        for (const key of donor.keys()) {
          receiver.delete(key);
        }
        donor.forEach(function(value, key) {
          receiver.append(key, value);
        });
        return receiver;
      }
      function getInputValues(elt, verb) {
        const processed = [];
        const formData = new FormData();
        const priorityFormData = new FormData();
        const errors = [];
        const internalData = getInternalData(elt);
        if (internalData.lastButtonClicked && !bodyContains(internalData.lastButtonClicked)) {
          internalData.lastButtonClicked = null;
        }
        let validate = elt instanceof HTMLFormElement && elt.noValidate !== true || getAttributeValue(elt, "hx-validate") === "true";
        if (internalData.lastButtonClicked) {
          validate = validate && internalData.lastButtonClicked.formNoValidate !== true;
        }
        if (verb !== "get") {
          processInputValue(processed, priorityFormData, errors, getRelatedForm(elt), validate);
        }
        processInputValue(processed, formData, errors, elt, validate);
        if (internalData.lastButtonClicked || elt.tagName === "BUTTON" || elt.tagName === "INPUT" && getRawAttribute(elt, "type") === "submit") {
          const button = internalData.lastButtonClicked || /** @type HTMLInputElement|HTMLButtonElement */
          elt;
          const name = getRawAttribute(button, "name");
          addValueToFormData(name, button.value, priorityFormData);
        }
        const includes = findAttributeTargets(elt, "hx-include");
        forEach(includes, function(node) {
          processInputValue(processed, formData, errors, asElement(node), validate);
          if (!matches(node, "form")) {
            forEach(asParentNode(node).querySelectorAll(INPUT_SELECTOR), function(descendant) {
              processInputValue(processed, formData, errors, descendant, validate);
            });
          }
        });
        overrideFormData(formData, priorityFormData);
        return { errors, formData, values: formDataProxy(formData) };
      }
      function appendParam(returnStr, name, realValue) {
        if (returnStr !== "") {
          returnStr += "&";
        }
        if (String(realValue) === "[object Object]") {
          realValue = JSON.stringify(realValue);
        }
        const s = encodeURIComponent(realValue);
        returnStr += encodeURIComponent(name) + "=" + s;
        return returnStr;
      }
      function urlEncode(values) {
        values = formDataFromObject(values);
        let returnStr = "";
        values.forEach(function(value, key) {
          returnStr = appendParam(returnStr, key, value);
        });
        return returnStr;
      }
      function getHeaders(elt, target, prompt2) {
        const headers = {
          "HX-Request": "true",
          "HX-Trigger": getRawAttribute(elt, "id"),
          "HX-Trigger-Name": getRawAttribute(elt, "name"),
          "HX-Target": getAttributeValue(target, "id"),
          "HX-Current-URL": location.href
        };
        getValuesForElement(elt, "hx-headers", false, headers);
        if (prompt2 !== void 0) {
          headers["HX-Prompt"] = prompt2;
        }
        if (getInternalData(elt).boosted) {
          headers["HX-Boosted"] = "true";
        }
        return headers;
      }
      function filterValues(inputValues, elt) {
        const paramsValue = getClosestAttributeValue(elt, "hx-params");
        if (paramsValue) {
          if (paramsValue === "none") {
            return new FormData();
          } else if (paramsValue === "*") {
            return inputValues;
          } else if (paramsValue.indexOf("not ") === 0) {
            forEach(paramsValue.slice(4).split(","), function(name) {
              name = name.trim();
              inputValues.delete(name);
            });
            return inputValues;
          } else {
            const newValues = new FormData();
            forEach(paramsValue.split(","), function(name) {
              name = name.trim();
              if (inputValues.has(name)) {
                inputValues.getAll(name).forEach(function(value) {
                  newValues.append(name, value);
                });
              }
            });
            return newValues;
          }
        } else {
          return inputValues;
        }
      }
      function isAnchorLink(elt) {
        return !!getRawAttribute(elt, "href") && getRawAttribute(elt, "href").indexOf("#") >= 0;
      }
      function getSwapSpecification(elt, swapInfoOverride) {
        const swapInfo = swapInfoOverride || getClosestAttributeValue(elt, "hx-swap");
        const swapSpec = {
          swapStyle: getInternalData(elt).boosted ? "innerHTML" : htmx.config.defaultSwapStyle,
          swapDelay: htmx.config.defaultSwapDelay,
          settleDelay: htmx.config.defaultSettleDelay
        };
        if (htmx.config.scrollIntoViewOnBoost && getInternalData(elt).boosted && !isAnchorLink(elt)) {
          swapSpec.show = "top";
        }
        if (swapInfo) {
          const split = splitOnWhitespace(swapInfo);
          if (split.length > 0) {
            for (let i = 0; i < split.length; i++) {
              const value = split[i];
              if (value.indexOf("swap:") === 0) {
                swapSpec.swapDelay = parseInterval(value.slice(5));
              } else if (value.indexOf("settle:") === 0) {
                swapSpec.settleDelay = parseInterval(value.slice(7));
              } else if (value.indexOf("transition:") === 0) {
                swapSpec.transition = value.slice(11) === "true";
              } else if (value.indexOf("ignoreTitle:") === 0) {
                swapSpec.ignoreTitle = value.slice(12) === "true";
              } else if (value.indexOf("scroll:") === 0) {
                const scrollSpec = value.slice(7);
                var splitSpec = scrollSpec.split(":");
                const scrollVal = splitSpec.pop();
                var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
                swapSpec.scroll = scrollVal;
                swapSpec.scrollTarget = selectorVal;
              } else if (value.indexOf("show:") === 0) {
                const showSpec = value.slice(5);
                var splitSpec = showSpec.split(":");
                const showVal = splitSpec.pop();
                var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
                swapSpec.show = showVal;
                swapSpec.showTarget = selectorVal;
              } else if (value.indexOf("focus-scroll:") === 0) {
                const focusScrollVal = value.slice("focus-scroll:".length);
                swapSpec.focusScroll = focusScrollVal == "true";
              } else if (i == 0) {
                swapSpec.swapStyle = value;
              } else {
                logError("Unknown modifier in hx-swap: " + value);
              }
            }
          }
        }
        return swapSpec;
      }
      function usesFormData(elt) {
        return getClosestAttributeValue(elt, "hx-encoding") === "multipart/form-data" || matches(elt, "form") && getRawAttribute(elt, "enctype") === "multipart/form-data";
      }
      function encodeParamsForBody(xhr, elt, filteredParameters) {
        let encodedParameters = null;
        withExtensions(elt, function(extension) {
          if (encodedParameters == null) {
            encodedParameters = extension.encodeParameters(xhr, filteredParameters, elt);
          }
        });
        if (encodedParameters != null) {
          return encodedParameters;
        } else {
          if (usesFormData(elt)) {
            return overrideFormData(new FormData(), formDataFromObject(filteredParameters));
          } else {
            return urlEncode(filteredParameters);
          }
        }
      }
      function makeSettleInfo(target) {
        return { tasks: [], elts: [target] };
      }
      function updateScrollState(content, swapSpec) {
        const first = content[0];
        const last = content[content.length - 1];
        if (swapSpec.scroll) {
          var target = null;
          if (swapSpec.scrollTarget) {
            target = asElement(querySelectorExt(first, swapSpec.scrollTarget));
          }
          if (swapSpec.scroll === "top" && (first || target)) {
            target = target || first;
            target.scrollTop = 0;
          }
          if (swapSpec.scroll === "bottom" && (last || target)) {
            target = target || last;
            target.scrollTop = target.scrollHeight;
          }
          if (typeof swapSpec.scroll === "number") {
            getWindow().setTimeout(function() {
              window.scrollTo(
                0,
                /** @type number */
                swapSpec.scroll
              );
            }, 0);
          }
        }
        if (swapSpec.show) {
          var target = null;
          if (swapSpec.showTarget) {
            let targetStr = swapSpec.showTarget;
            if (swapSpec.showTarget === "window") {
              targetStr = "body";
            }
            target = asElement(querySelectorExt(first, targetStr));
          }
          if (swapSpec.show === "top" && (first || target)) {
            target = target || first;
            target.scrollIntoView({ block: "start", behavior: htmx.config.scrollBehavior });
          }
          if (swapSpec.show === "bottom" && (last || target)) {
            target = target || last;
            target.scrollIntoView({ block: "end", behavior: htmx.config.scrollBehavior });
          }
        }
      }
      function getValuesForElement(elt, attr, evalAsDefault, values, event) {
        if (values == null) {
          values = {};
        }
        if (elt == null) {
          return values;
        }
        const attributeValue = getAttributeValue(elt, attr);
        if (attributeValue) {
          let str2 = attributeValue.trim();
          let evaluateValue = evalAsDefault;
          if (str2 === "unset") {
            return null;
          }
          if (str2.indexOf("javascript:") === 0) {
            str2 = str2.slice(11);
            evaluateValue = true;
          } else if (str2.indexOf("js:") === 0) {
            str2 = str2.slice(3);
            evaluateValue = true;
          }
          if (str2.indexOf("{") !== 0) {
            str2 = "{" + str2 + "}";
          }
          let varsValues;
          if (evaluateValue) {
            varsValues = maybeEval(elt, function() {
              if (event) {
                return Function("event", "return (" + str2 + ")").call(elt, event);
              } else {
                return Function("return (" + str2 + ")").call(elt);
              }
            }, {});
          } else {
            varsValues = parseJSON(str2);
          }
          for (const key in varsValues) {
            if (varsValues.hasOwnProperty(key)) {
              if (values[key] == null) {
                values[key] = varsValues[key];
              }
            }
          }
        }
        return getValuesForElement(asElement(parentElt(elt)), attr, evalAsDefault, values, event);
      }
      function maybeEval(elt, toEval, defaultVal) {
        if (htmx.config.allowEval) {
          return toEval();
        } else {
          triggerErrorEvent(elt, "htmx:evalDisallowedError");
          return defaultVal;
        }
      }
      function getHXVarsForElement(elt, event, expressionVars) {
        return getValuesForElement(elt, "hx-vars", true, expressionVars, event);
      }
      function getHXValsForElement(elt, event, expressionVars) {
        return getValuesForElement(elt, "hx-vals", false, expressionVars, event);
      }
      function getExpressionVars(elt, event) {
        return mergeObjects(getHXVarsForElement(elt, event), getHXValsForElement(elt, event));
      }
      function safelySetHeaderValue(xhr, header, headerValue) {
        if (headerValue !== null) {
          try {
            xhr.setRequestHeader(header, headerValue);
          } catch (e) {
            xhr.setRequestHeader(header, encodeURIComponent(headerValue));
            xhr.setRequestHeader(header + "-URI-AutoEncoded", "true");
          }
        }
      }
      function getPathFromResponse(xhr) {
        if (xhr.responseURL) {
          try {
            const url = new URL(xhr.responseURL);
            return url.pathname + url.search;
          } catch (e) {
            triggerErrorEvent(getDocument().body, "htmx:badResponseUrl", { url: xhr.responseURL });
          }
        }
      }
      function hasHeader(xhr, regexp) {
        return regexp.test(xhr.getAllResponseHeaders());
      }
      function ajaxHelper(verb, path, context) {
        verb = /** @type HttpVerb */
        verb.toLowerCase();
        if (context) {
          if (context instanceof Element || typeof context === "string") {
            return issueAjaxRequest(verb, path, null, null, {
              targetOverride: resolveTarget(context) || DUMMY_ELT,
              returnPromise: true
            });
          } else {
            let resolvedTarget = resolveTarget(context.target);
            if (context.target && !resolvedTarget || context.source && !resolvedTarget && !resolveTarget(context.source)) {
              resolvedTarget = DUMMY_ELT;
            }
            return issueAjaxRequest(
              verb,
              path,
              resolveTarget(context.source),
              context.event,
              {
                handler: context.handler,
                headers: context.headers,
                values: context.values,
                targetOverride: resolvedTarget,
                swapOverride: context.swap,
                select: context.select,
                returnPromise: true,
                push: context.push,
                replace: context.replace,
                selectOOB: context.selectOOB
              }
            );
          }
        } else {
          return issueAjaxRequest(verb, path, null, null, {
            returnPromise: true
          });
        }
      }
      function hierarchyForElt(elt) {
        const arr = [];
        while (elt) {
          arr.push(elt);
          elt = elt.parentElement;
        }
        return arr;
      }
      function verifyPath(elt, path, requestConfig) {
        const url = new URL(path, location.protocol !== "about:" ? location.href : window.origin);
        const origin = location.protocol !== "about:" ? location.origin : window.origin;
        const sameHost = origin === url.origin;
        if (htmx.config.selfRequestsOnly) {
          if (!sameHost) {
            return false;
          }
        }
        return triggerEvent(elt, "htmx:validateUrl", mergeObjects({ url, sameHost }, requestConfig));
      }
      function formDataFromObject(obj) {
        if (obj instanceof FormData) return obj;
        const formData = new FormData();
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key].forEach === "function") {
              obj[key].forEach(function(v) {
                formData.append(key, v);
              });
            } else if (typeof obj[key] === "object" && !(obj[key] instanceof Blob)) {
              formData.append(key, JSON.stringify(obj[key]));
            } else {
              formData.append(key, obj[key]);
            }
          }
        }
        return formData;
      }
      function formDataArrayProxy(formData, name, array) {
        return new Proxy(array, {
          get: function(target, key) {
            if (typeof key === "number") return target[key];
            if (key === "length") return target.length;
            if (key === "push") {
              return function(value) {
                target.push(value);
                formData.append(name, value);
              };
            }
            if (typeof target[key] === "function") {
              return function() {
                target[key].apply(target, arguments);
                formData.delete(name);
                target.forEach(function(v) {
                  formData.append(name, v);
                });
              };
            }
            if (target[key] && target[key].length === 1) {
              return target[key][0];
            } else {
              return target[key];
            }
          },
          set: function(target, index, value) {
            target[index] = value;
            formData.delete(name);
            target.forEach(function(v) {
              formData.append(name, v);
            });
            return true;
          }
        });
      }
      function formDataProxy(formData) {
        return new Proxy(formData, {
          get: function(target, name) {
            if (typeof name === "symbol") {
              const result = Reflect.get(target, name);
              if (typeof result === "function") {
                return function() {
                  return result.apply(formData, arguments);
                };
              } else {
                return result;
              }
            }
            if (name === "toJSON") {
              return () => Object.fromEntries(formData);
            }
            if (name in target) {
              if (typeof target[name] === "function") {
                return function() {
                  return formData[name].apply(formData, arguments);
                };
              }
            }
            const array = formData.getAll(name);
            if (array.length === 0) {
              return void 0;
            } else if (array.length === 1) {
              return array[0];
            } else {
              return formDataArrayProxy(target, name, array);
            }
          },
          set: function(target, name, value) {
            if (typeof name !== "string") {
              return false;
            }
            target.delete(name);
            if (value && typeof value.forEach === "function") {
              value.forEach(function(v) {
                target.append(name, v);
              });
            } else if (typeof value === "object" && !(value instanceof Blob)) {
              target.append(name, JSON.stringify(value));
            } else {
              target.append(name, value);
            }
            return true;
          },
          deleteProperty: function(target, name) {
            if (typeof name === "string") {
              target.delete(name);
            }
            return true;
          },
          // Support Object.assign call from proxy
          ownKeys: function(target) {
            return Reflect.ownKeys(Object.fromEntries(target));
          },
          getOwnPropertyDescriptor: function(target, prop) {
            return Reflect.getOwnPropertyDescriptor(Object.fromEntries(target), prop);
          }
        });
      }
      function issueAjaxRequest(verb, path, elt, event, etc, confirmed) {
        let resolve = null;
        let reject = null;
        etc = etc != null ? etc : {};
        if (etc.returnPromise && typeof Promise !== "undefined") {
          var promise = new Promise(function(_resolve, _reject) {
            resolve = _resolve;
            reject = _reject;
          });
        }
        if (elt == null) {
          elt = getDocument().body;
        }
        const responseHandler = etc.handler || handleAjaxResponse;
        const select = etc.select || null;
        if (!bodyContains(elt)) {
          maybeCall(resolve);
          return promise;
        }
        const target = etc.targetOverride || asElement(getTarget(elt));
        if (target == null || target == DUMMY_ELT) {
          triggerErrorEvent(elt, "htmx:targetError", { target: getClosestAttributeValue(elt, "hx-target") });
          maybeCall(reject);
          return promise;
        }
        let eltData = getInternalData(elt);
        const submitter = eltData.lastButtonClicked;
        if (submitter) {
          const buttonPath = getRawAttribute(submitter, "formaction");
          if (buttonPath != null) {
            path = buttonPath;
          }
          const buttonVerb = getRawAttribute(submitter, "formmethod");
          if (buttonVerb != null) {
            if (VERBS.includes(buttonVerb.toLowerCase())) {
              verb = /** @type HttpVerb */
              buttonVerb;
            } else {
              maybeCall(resolve);
              return promise;
            }
          }
        }
        const confirmQuestion = getClosestAttributeValue(elt, "hx-confirm");
        if (confirmed === void 0) {
          const issueRequest = function(skipConfirmation) {
            return issueAjaxRequest(verb, path, elt, event, etc, !!skipConfirmation);
          };
          const confirmDetails = { target, elt, path, verb, triggeringEvent: event, etc, issueRequest, question: confirmQuestion };
          if (triggerEvent(elt, "htmx:confirm", confirmDetails) === false) {
            maybeCall(resolve);
            return promise;
          }
        }
        let syncElt = elt;
        let syncStrategy = getClosestAttributeValue(elt, "hx-sync");
        let queueStrategy = null;
        let abortable = false;
        if (syncStrategy) {
          const syncStrings = syncStrategy.split(":");
          const selector = syncStrings[0].trim();
          if (selector === "this") {
            syncElt = findThisElement(elt, "hx-sync");
          } else {
            syncElt = asElement(querySelectorExt(elt, selector));
          }
          syncStrategy = (syncStrings[1] || "drop").trim();
          eltData = getInternalData(syncElt);
          if (syncStrategy === "drop" && eltData.xhr && eltData.abortable !== true) {
            maybeCall(resolve);
            return promise;
          } else if (syncStrategy === "abort") {
            if (eltData.xhr) {
              maybeCall(resolve);
              return promise;
            } else {
              abortable = true;
            }
          } else if (syncStrategy === "replace") {
            triggerEvent(syncElt, "htmx:abort");
          } else if (syncStrategy.indexOf("queue") === 0) {
            const queueStrArray = syncStrategy.split(" ");
            queueStrategy = (queueStrArray[1] || "last").trim();
          }
        }
        if (eltData.xhr) {
          if (eltData.abortable) {
            triggerEvent(syncElt, "htmx:abort");
          } else {
            if (queueStrategy == null) {
              if (event) {
                const eventData = getInternalData(event);
                if (eventData && eventData.triggerSpec && eventData.triggerSpec.queue) {
                  queueStrategy = eventData.triggerSpec.queue;
                }
              }
              if (queueStrategy == null) {
                queueStrategy = "last";
              }
            }
            if (eltData.queuedRequests == null) {
              eltData.queuedRequests = [];
            }
            if (queueStrategy === "first" && eltData.queuedRequests.length === 0) {
              eltData.queuedRequests.push(function() {
                issueAjaxRequest(verb, path, elt, event, etc);
              });
            } else if (queueStrategy === "all") {
              eltData.queuedRequests.push(function() {
                issueAjaxRequest(verb, path, elt, event, etc);
              });
            } else if (queueStrategy === "last") {
              eltData.queuedRequests = [];
              eltData.queuedRequests.push(function() {
                issueAjaxRequest(verb, path, elt, event, etc);
              });
            }
            maybeCall(resolve);
            return promise;
          }
        }
        const xhr = new XMLHttpRequest();
        eltData.xhr = xhr;
        eltData.abortable = abortable;
        const endRequestLock = function() {
          eltData.xhr = null;
          eltData.abortable = false;
          if (eltData.queuedRequests != null && eltData.queuedRequests.length > 0) {
            const queuedRequest = eltData.queuedRequests.shift();
            queuedRequest();
          }
        };
        const promptQuestion = getClosestAttributeValue(elt, "hx-prompt");
        if (promptQuestion) {
          var promptResponse = prompt(promptQuestion);
          if (promptResponse === null || !triggerEvent(elt, "htmx:prompt", { prompt: promptResponse, target })) {
            maybeCall(resolve);
            endRequestLock();
            return promise;
          }
        }
        if (confirmQuestion && !confirmed) {
          if (!confirm(confirmQuestion)) {
            maybeCall(resolve);
            endRequestLock();
            return promise;
          }
        }
        let headers = getHeaders(elt, target, promptResponse);
        if (verb !== "get" && !usesFormData(elt)) {
          headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (etc.headers) {
          headers = mergeObjects(headers, etc.headers);
        }
        const results = getInputValues(elt, verb);
        let errors = results.errors;
        const rawFormData = results.formData;
        if (etc.values) {
          overrideFormData(rawFormData, formDataFromObject(etc.values));
        }
        const expressionVars = formDataFromObject(getExpressionVars(elt, event));
        const allFormData = overrideFormData(rawFormData, expressionVars);
        let filteredFormData = filterValues(allFormData, elt);
        if (htmx.config.getCacheBusterParam && verb === "get") {
          filteredFormData.set("org.htmx.cache-buster", getRawAttribute(target, "id") || "true");
        }
        if (path == null || path === "") {
          path = location.href;
        }
        const requestAttrValues = getValuesForElement(elt, "hx-request");
        const eltIsBoosted = getInternalData(elt).boosted;
        let useUrlParams = htmx.config.methodsThatUseUrlParams.indexOf(verb) >= 0;
        const requestConfig = {
          boosted: eltIsBoosted,
          useUrlParams,
          formData: filteredFormData,
          parameters: formDataProxy(filteredFormData),
          unfilteredFormData: allFormData,
          unfilteredParameters: formDataProxy(allFormData),
          headers,
          elt,
          target,
          verb,
          errors,
          withCredentials: etc.credentials || requestAttrValues.credentials || htmx.config.withCredentials,
          timeout: etc.timeout || requestAttrValues.timeout || htmx.config.timeout,
          path,
          triggeringEvent: event
        };
        if (!triggerEvent(elt, "htmx:configRequest", requestConfig)) {
          maybeCall(resolve);
          endRequestLock();
          return promise;
        }
        path = requestConfig.path;
        verb = requestConfig.verb;
        headers = requestConfig.headers;
        filteredFormData = formDataFromObject(requestConfig.parameters);
        errors = requestConfig.errors;
        useUrlParams = requestConfig.useUrlParams;
        if (errors && errors.length > 0) {
          triggerEvent(elt, "htmx:validation:halted", requestConfig);
          maybeCall(resolve);
          endRequestLock();
          return promise;
        }
        const splitPath = path.split("#");
        const pathNoAnchor = splitPath[0];
        const anchor = splitPath[1];
        let finalPath = path;
        if (useUrlParams) {
          finalPath = pathNoAnchor;
          const hasValues = !filteredFormData.keys().next().done;
          if (hasValues) {
            if (finalPath.indexOf("?") < 0) {
              finalPath += "?";
            } else {
              finalPath += "&";
            }
            finalPath += urlEncode(filteredFormData);
            if (anchor) {
              finalPath += "#" + anchor;
            }
          }
        }
        if (!verifyPath(elt, finalPath, requestConfig)) {
          triggerErrorEvent(elt, "htmx:invalidPath", requestConfig);
          maybeCall(reject);
          endRequestLock();
          return promise;
        }
        xhr.open(verb.toUpperCase(), finalPath, true);
        xhr.overrideMimeType("text/html");
        xhr.withCredentials = requestConfig.withCredentials;
        xhr.timeout = requestConfig.timeout;
        if (requestAttrValues.noHeaders) {
        } else {
          for (const header in headers) {
            if (headers.hasOwnProperty(header)) {
              const headerValue = headers[header];
              safelySetHeaderValue(xhr, header, headerValue);
            }
          }
        }
        const responseInfo = {
          xhr,
          target,
          requestConfig,
          etc,
          boosted: eltIsBoosted,
          select,
          pathInfo: {
            requestPath: path,
            finalRequestPath: finalPath,
            responsePath: null,
            anchor
          }
        };
        xhr.onload = function() {
          try {
            const hierarchy = hierarchyForElt(elt);
            responseInfo.pathInfo.responsePath = getPathFromResponse(xhr);
            responseHandler(elt, responseInfo);
            if (responseInfo.keepIndicators !== true) {
              removeRequestIndicators(indicators, disableElts);
            }
            triggerEvent(elt, "htmx:afterRequest", responseInfo);
            triggerEvent(elt, "htmx:afterOnLoad", responseInfo);
            if (!bodyContains(elt)) {
              let secondaryTriggerElt = null;
              while (hierarchy.length > 0 && secondaryTriggerElt == null) {
                const parentEltInHierarchy = hierarchy.shift();
                if (bodyContains(parentEltInHierarchy)) {
                  secondaryTriggerElt = parentEltInHierarchy;
                }
              }
              if (secondaryTriggerElt) {
                triggerEvent(secondaryTriggerElt, "htmx:afterRequest", responseInfo);
                triggerEvent(secondaryTriggerElt, "htmx:afterOnLoad", responseInfo);
              }
            }
            maybeCall(resolve);
          } catch (e) {
            triggerErrorEvent(elt, "htmx:onLoadError", mergeObjects({ error: e }, responseInfo));
            throw e;
          } finally {
            endRequestLock();
          }
        };
        xhr.onerror = function() {
          removeRequestIndicators(indicators, disableElts);
          triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
          triggerErrorEvent(elt, "htmx:sendError", responseInfo);
          maybeCall(reject);
          endRequestLock();
        };
        xhr.onabort = function() {
          removeRequestIndicators(indicators, disableElts);
          triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
          triggerErrorEvent(elt, "htmx:sendAbort", responseInfo);
          maybeCall(reject);
          endRequestLock();
        };
        xhr.ontimeout = function() {
          removeRequestIndicators(indicators, disableElts);
          triggerErrorEvent(elt, "htmx:afterRequest", responseInfo);
          triggerErrorEvent(elt, "htmx:timeout", responseInfo);
          maybeCall(reject);
          endRequestLock();
        };
        if (!triggerEvent(elt, "htmx:beforeRequest", responseInfo)) {
          maybeCall(resolve);
          endRequestLock();
          return promise;
        }
        var indicators = addRequestIndicatorClasses(elt);
        var disableElts = disableElements(elt);
        forEach(["loadstart", "loadend", "progress", "abort"], function(eventName) {
          forEach([xhr, xhr.upload], function(target2) {
            target2.addEventListener(eventName, function(event2) {
              triggerEvent(elt, "htmx:xhr:" + eventName, {
                lengthComputable: event2.lengthComputable,
                loaded: event2.loaded,
                total: event2.total
              });
            });
          });
        });
        triggerEvent(elt, "htmx:beforeSend", responseInfo);
        const params = useUrlParams ? null : encodeParamsForBody(xhr, elt, filteredFormData);
        xhr.send(params);
        return promise;
      }
      function determineHistoryUpdates(elt, responseInfo) {
        const xhr = responseInfo.xhr;
        let pathFromHeaders = null;
        let typeFromHeaders = null;
        if (hasHeader(xhr, /HX-Push:/i)) {
          pathFromHeaders = xhr.getResponseHeader("HX-Push");
          typeFromHeaders = "push";
        } else if (hasHeader(xhr, /HX-Push-Url:/i)) {
          pathFromHeaders = xhr.getResponseHeader("HX-Push-Url");
          typeFromHeaders = "push";
        } else if (hasHeader(xhr, /HX-Replace-Url:/i)) {
          pathFromHeaders = xhr.getResponseHeader("HX-Replace-Url");
          typeFromHeaders = "replace";
        }
        if (pathFromHeaders) {
          if (pathFromHeaders === "false") {
            return {};
          } else {
            return {
              type: typeFromHeaders,
              path: pathFromHeaders
            };
          }
        }
        const requestPath = responseInfo.pathInfo.finalRequestPath;
        const responsePath = responseInfo.pathInfo.responsePath;
        let pushUrl = responseInfo.etc.push || getClosestAttributeValue(elt, "hx-push-url");
        let replaceUrl = responseInfo.etc.replace || getClosestAttributeValue(elt, "hx-replace-url");
        if (pushUrl === "false") pushUrl = null;
        if (replaceUrl === "false") replaceUrl = null;
        const elementIsBoosted = getInternalData(elt).boosted;
        let saveType = null;
        let path = null;
        if (pushUrl) {
          saveType = "push";
          path = pushUrl;
        } else if (replaceUrl) {
          saveType = "replace";
          path = replaceUrl;
        } else if (elementIsBoosted) {
          saveType = "push";
          path = responsePath || requestPath;
        }
        if (path) {
          if (path === "true") {
            path = responsePath || requestPath;
          }
          if (responseInfo.pathInfo.anchor && path.indexOf("#") === -1) {
            path = path + "#" + responseInfo.pathInfo.anchor;
          }
          return {
            type: saveType,
            path
          };
        } else {
          return {};
        }
      }
      function codeMatches(responseHandlingConfig, status) {
        var regExp = new RegExp(responseHandlingConfig.code);
        return regExp.test(status.toString(10));
      }
      function resolveResponseHandling(xhr) {
        for (var i = 0; i < htmx.config.responseHandling.length; i++) {
          var responseHandlingElement = htmx.config.responseHandling[i];
          if (codeMatches(responseHandlingElement, xhr.status)) {
            return responseHandlingElement;
          }
        }
        return {
          swap: false
        };
      }
      function handleTitle(title) {
        if (title) {
          const titleElt = find("title");
          if (titleElt) {
            titleElt.textContent = title;
          } else {
            window.document.title = title;
          }
        }
      }
      function resolveRetarget(elt, target) {
        if (target === "this") {
          return elt;
        }
        const resolvedTarget = asElement(querySelectorExt(elt, target));
        if (resolvedTarget == null) {
          triggerErrorEvent(elt, "htmx:targetError", { target });
          throw new Error(`Invalid re-target ${target}`);
        }
        return resolvedTarget;
      }
      function handleAjaxResponse(elt, responseInfo) {
        const xhr = responseInfo.xhr;
        let target = responseInfo.target;
        const etc = responseInfo.etc;
        const responseInfoSelect = responseInfo.select;
        if (!triggerEvent(elt, "htmx:beforeOnLoad", responseInfo)) return;
        if (hasHeader(xhr, /HX-Trigger:/i)) {
          handleTriggerHeader(xhr, "HX-Trigger", elt);
        }
        if (hasHeader(xhr, /HX-Location:/i)) {
          let redirectPath = xhr.getResponseHeader("HX-Location");
          var redirectSwapSpec = {};
          if (redirectPath.indexOf("{") === 0) {
            redirectSwapSpec = parseJSON(redirectPath);
            redirectPath = redirectSwapSpec.path;
            delete redirectSwapSpec.path;
          }
          redirectSwapSpec.push = redirectSwapSpec.push ?? "true";
          ajaxHelper("get", redirectPath, redirectSwapSpec);
          return;
        }
        const shouldRefresh = hasHeader(xhr, /HX-Refresh:/i) && xhr.getResponseHeader("HX-Refresh") === "true";
        if (hasHeader(xhr, /HX-Redirect:/i)) {
          responseInfo.keepIndicators = true;
          htmx.location.href = xhr.getResponseHeader("HX-Redirect");
          shouldRefresh && htmx.location.reload();
          return;
        }
        if (shouldRefresh) {
          responseInfo.keepIndicators = true;
          htmx.location.reload();
          return;
        }
        const historyUpdate = determineHistoryUpdates(elt, responseInfo);
        const responseHandling = resolveResponseHandling(xhr);
        const shouldSwap = responseHandling.swap;
        let isError = !!responseHandling.error;
        let ignoreTitle = htmx.config.ignoreTitle || responseHandling.ignoreTitle;
        let selectOverride = responseHandling.select;
        if (responseHandling.target) {
          responseInfo.target = resolveRetarget(elt, responseHandling.target);
        }
        var swapOverride = etc.swapOverride;
        if (swapOverride == null && responseHandling.swapOverride) {
          swapOverride = responseHandling.swapOverride;
        }
        if (hasHeader(xhr, /HX-Retarget:/i)) {
          responseInfo.target = resolveRetarget(elt, xhr.getResponseHeader("HX-Retarget"));
        }
        if (hasHeader(xhr, /HX-Reswap:/i)) {
          swapOverride = xhr.getResponseHeader("HX-Reswap");
        }
        var serverResponse = xhr.response;
        var beforeSwapDetails = mergeObjects({
          shouldSwap,
          serverResponse,
          isError,
          ignoreTitle,
          selectOverride,
          swapOverride
        }, responseInfo);
        if (responseHandling.event && !triggerEvent(target, responseHandling.event, beforeSwapDetails)) return;
        if (!triggerEvent(target, "htmx:beforeSwap", beforeSwapDetails)) return;
        target = beforeSwapDetails.target;
        serverResponse = beforeSwapDetails.serverResponse;
        isError = beforeSwapDetails.isError;
        ignoreTitle = beforeSwapDetails.ignoreTitle;
        selectOverride = beforeSwapDetails.selectOverride;
        swapOverride = beforeSwapDetails.swapOverride;
        responseInfo.target = target;
        responseInfo.failed = isError;
        responseInfo.successful = !isError;
        if (beforeSwapDetails.shouldSwap) {
          if (xhr.status === 286) {
            cancelPolling(elt);
          }
          withExtensions(elt, function(extension) {
            serverResponse = extension.transformResponse(serverResponse, xhr, elt);
          });
          if (historyUpdate.type) {
            saveCurrentPageToHistory();
          }
          var swapSpec = getSwapSpecification(elt, swapOverride);
          if (!swapSpec.hasOwnProperty("ignoreTitle")) {
            swapSpec.ignoreTitle = ignoreTitle;
          }
          addClassToElement(target, htmx.config.swappingClass);
          if (responseInfoSelect) {
            selectOverride = responseInfoSelect;
          }
          if (hasHeader(xhr, /HX-Reselect:/i)) {
            selectOverride = xhr.getResponseHeader("HX-Reselect");
          }
          const selectOOB = etc.selectOOB || getClosestAttributeValue(elt, "hx-select-oob");
          const select = getClosestAttributeValue(elt, "hx-select");
          swap(target, serverResponse, swapSpec, {
            select: selectOverride === "unset" ? null : selectOverride || select,
            selectOOB,
            eventInfo: responseInfo,
            anchor: responseInfo.pathInfo.anchor,
            contextElement: elt,
            afterSwapCallback: function() {
              if (hasHeader(xhr, /HX-Trigger-After-Swap:/i)) {
                let finalElt = elt;
                if (!bodyContains(elt)) {
                  finalElt = getDocument().body;
                }
                handleTriggerHeader(xhr, "HX-Trigger-After-Swap", finalElt);
              }
            },
            afterSettleCallback: function() {
              if (hasHeader(xhr, /HX-Trigger-After-Settle:/i)) {
                let finalElt = elt;
                if (!bodyContains(elt)) {
                  finalElt = getDocument().body;
                }
                handleTriggerHeader(xhr, "HX-Trigger-After-Settle", finalElt);
              }
            },
            beforeSwapCallback: function() {
              if (historyUpdate.type) {
                triggerEvent(getDocument().body, "htmx:beforeHistoryUpdate", mergeObjects({ history: historyUpdate }, responseInfo));
                if (historyUpdate.type === "push") {
                  pushUrlIntoHistory(historyUpdate.path);
                  triggerEvent(getDocument().body, "htmx:pushedIntoHistory", { path: historyUpdate.path });
                } else {
                  replaceUrlInHistory(historyUpdate.path);
                  triggerEvent(getDocument().body, "htmx:replacedInHistory", { path: historyUpdate.path });
                }
              }
            }
          });
        }
        if (isError) {
          triggerErrorEvent(elt, "htmx:responseError", mergeObjects({ error: "Response Status Error Code " + xhr.status + " from " + responseInfo.pathInfo.requestPath }, responseInfo));
        }
      }
      const extensions = {};
      function extensionBase() {
        return {
          init: function(api) {
            return null;
          },
          getSelectors: function() {
            return null;
          },
          onEvent: function(name, evt) {
            return true;
          },
          transformResponse: function(text, xhr, elt) {
            return text;
          },
          isInlineSwap: function(swapStyle) {
            return false;
          },
          handleSwap: function(swapStyle, target, fragment, settleInfo) {
            return false;
          },
          encodeParameters: function(xhr, parameters, elt) {
            return null;
          }
        };
      }
      function defineExtension(name, extension) {
        if (extension.init) {
          extension.init(internalAPI);
        }
        extensions[name] = mergeObjects(extensionBase(), extension);
      }
      function removeExtension(name) {
        delete extensions[name];
      }
      function getExtensions(elt, extensionsToReturn, extensionsToIgnore) {
        if (extensionsToReturn == void 0) {
          extensionsToReturn = [];
        }
        if (elt == void 0) {
          return extensionsToReturn;
        }
        if (extensionsToIgnore == void 0) {
          extensionsToIgnore = [];
        }
        const extensionsForElement = getAttributeValue(elt, "hx-ext");
        if (extensionsForElement) {
          forEach(extensionsForElement.split(","), function(extensionName) {
            extensionName = extensionName.replace(/ /g, "");
            if (extensionName.slice(0, 7) == "ignore:") {
              extensionsToIgnore.push(extensionName.slice(7));
              return;
            }
            if (extensionsToIgnore.indexOf(extensionName) < 0) {
              const extension = extensions[extensionName];
              if (extension && extensionsToReturn.indexOf(extension) < 0) {
                extensionsToReturn.push(extension);
              }
            }
          });
        }
        return getExtensions(asElement(parentElt(elt)), extensionsToReturn, extensionsToIgnore);
      }
      var isReady = false;
      getDocument().addEventListener("DOMContentLoaded", function() {
        isReady = true;
      });
      function ready(fn) {
        if (isReady || getDocument().readyState === "complete") {
          fn();
        } else {
          getDocument().addEventListener("DOMContentLoaded", fn);
        }
      }
      function insertIndicatorStyles() {
        if (htmx.config.includeIndicatorStyles !== false) {
          const nonceAttribute = htmx.config.inlineStyleNonce ? ` nonce="${htmx.config.inlineStyleNonce}"` : "";
          const indicator = htmx.config.indicatorClass;
          const request = htmx.config.requestClass;
          getDocument().head.insertAdjacentHTML(
            "beforeend",
            `<style${nonceAttribute}>.${indicator}{opacity:0;visibility: hidden} .${request} .${indicator}, .${request}.${indicator}{opacity:1;visibility: visible;transition: opacity 200ms ease-in}</style>`
          );
        }
      }
      function getMetaConfig() {
        const element = getDocument().querySelector('meta[name="htmx-config"]');
        if (element) {
          return parseJSON(element.content);
        } else {
          return null;
        }
      }
      function mergeMetaConfig() {
        const metaConfig = getMetaConfig();
        if (metaConfig) {
          htmx.config = mergeObjects(htmx.config, metaConfig);
        }
      }
      ready(function() {
        mergeMetaConfig();
        insertIndicatorStyles();
        let body = getDocument().body;
        processNode(body);
        const restoredElts = getDocument().querySelectorAll(
          "[hx-trigger='restored'],[data-hx-trigger='restored']"
        );
        body.addEventListener("htmx:abort", function(evt) {
          const target = (
            /** @type {CustomEvent} */
            evt.detail.elt || evt.target
          );
          const internalData = getInternalData(target);
          if (internalData && internalData.xhr) {
            internalData.xhr.abort();
          }
        });
        const originalPopstate = window.onpopstate ? window.onpopstate.bind(window) : null;
        window.onpopstate = function(event) {
          if (event.state && event.state.htmx) {
            restoreHistory();
            forEach(restoredElts, function(elt) {
              triggerEvent(elt, "htmx:restored", {
                document: getDocument(),
                triggerEvent
              });
            });
          } else {
            if (originalPopstate) {
              originalPopstate(event);
            }
          }
        };
        getWindow().setTimeout(function() {
          triggerEvent(body, "htmx:load", {});
          body = null;
        }, 0);
      });
      return htmx;
    })();
    htmx_esm_default = htmx2;
  }
});

// node_modules/.pnpm/alpinejs@3.15.12/node_modules/alpinejs/dist/module.esm.js
var flushPending = false;
var flushing = false;
var queue = [];
var lastFlushedIndex = -1;
var transactionActive = false;
function scheduler(callback) {
  queueJob(callback);
}
function startTransaction() {
  transactionActive = true;
}
function commitTransaction() {
  transactionActive = false;
  queueFlush();
}
function queueJob(job) {
  if (!queue.includes(job))
    queue.push(job);
  queueFlush();
}
function dequeueJob(job) {
  let index = queue.indexOf(job);
  if (index !== -1 && index > lastFlushedIndex)
    queue.splice(index, 1);
}
function queueFlush() {
  if (!flushing && !flushPending) {
    if (transactionActive)
      return;
    flushPending = true;
    queueMicrotask(flushJobs);
  }
}
function flushJobs() {
  flushPending = false;
  flushing = true;
  for (let i = 0; i < queue.length; i++) {
    queue[i]();
    lastFlushedIndex = i;
  }
  queue.length = 0;
  lastFlushedIndex = -1;
  flushing = false;
}
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
function disableEffectScheduling(callback) {
  shouldSchedule = false;
  callback();
  shouldSchedule = true;
}
function setReactivityEngine(engine) {
  reactive = engine.reactive;
  release = engine.release;
  effect = (callback) => engine.effect(callback, { scheduler: (task) => {
    if (shouldSchedule) {
      scheduler(task);
    } else {
      task();
    }
  } });
  raw = engine.raw;
}
function overrideEffect(override) {
  effect = override;
}
function elementBoundEffect(el) {
  let cleanup2 = () => {
  };
  let wrappedEffect = (callback) => {
    let effectReference = effect(callback);
    if (!el._x_effects) {
      el._x_effects = /* @__PURE__ */ new Set();
      el._x_runEffects = () => {
        el._x_effects.forEach((i) => i());
      };
    }
    el._x_effects.add(effectReference);
    cleanup2 = () => {
      if (effectReference === void 0)
        return;
      el._x_effects.delete(effectReference);
      release(effectReference);
    };
    return effectReference;
  };
  return [wrappedEffect, () => {
    cleanup2();
  }];
}
function watch(getter, callback) {
  let firstTime = true;
  let oldValue;
  let oldValueJSON;
  let effectReference = effect(() => {
    let value = getter();
    let newJSON = JSON.stringify(value);
    if (!firstTime) {
      if (typeof value === "object" || value !== oldValue) {
        let previousValue = typeof oldValue === "object" ? JSON.parse(oldValueJSON) : oldValue;
        queueMicrotask(() => {
          callback(value, previousValue);
        });
      }
    }
    oldValue = value;
    oldValueJSON = newJSON;
    firstTime = false;
  });
  return () => release(effectReference);
}
async function transaction(callback) {
  startTransaction();
  try {
    await callback();
    await Promise.resolve();
  } finally {
    commitTransaction();
  }
}
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
function onElAdded(callback) {
  onElAddeds.push(callback);
}
function onElRemoved(el, callback) {
  if (typeof callback === "function") {
    if (!el._x_cleanups)
      el._x_cleanups = [];
    el._x_cleanups.push(callback);
  } else {
    callback = el;
    onElRemoveds.push(callback);
  }
}
function onAttributesAdded(callback) {
  onAttributeAddeds.push(callback);
}
function onAttributeRemoved(el, name, callback) {
  if (!el._x_attributeCleanups)
    el._x_attributeCleanups = {};
  if (!el._x_attributeCleanups[name])
    el._x_attributeCleanups[name] = [];
  el._x_attributeCleanups[name].push(callback);
}
function cleanupAttributes(el, names) {
  if (!el._x_attributeCleanups)
    return;
  Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
    if (names === void 0 || names.includes(name)) {
      value.forEach((i) => i());
      delete el._x_attributeCleanups[name];
    }
  });
}
function cleanupElement(el) {
  el._x_effects?.forEach(dequeueJob);
  while (el._x_cleanups?.length)
    el._x_cleanups.pop()();
}
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
function startObservingMutations() {
  observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
  currentlyObserving = true;
}
function stopObservingMutations() {
  flushObserver();
  observer.disconnect();
  currentlyObserving = false;
}
var queuedMutations = [];
function flushObserver() {
  let records = observer.takeRecords();
  queuedMutations.push(() => records.length > 0 && onMutate(records));
  let queueLengthWhenTriggered = queuedMutations.length;
  queueMicrotask(() => {
    if (queuedMutations.length === queueLengthWhenTriggered) {
      while (queuedMutations.length > 0)
        queuedMutations.shift()();
    }
  });
}
function mutateDom(callback) {
  if (!currentlyObserving)
    return callback();
  stopObservingMutations();
  let result = callback();
  startObservingMutations();
  return result;
}
var isCollecting = false;
var deferredMutations = [];
function deferMutations() {
  isCollecting = true;
}
function flushAndStopDeferringMutations() {
  isCollecting = false;
  onMutate(deferredMutations);
  deferredMutations = [];
}
function onMutate(mutations) {
  if (isCollecting) {
    deferredMutations = deferredMutations.concat(mutations);
    return;
  }
  let addedNodes = [];
  let removedNodes = /* @__PURE__ */ new Set();
  let addedAttributes = /* @__PURE__ */ new Map();
  let removedAttributes = /* @__PURE__ */ new Map();
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].target._x_ignoreMutationObserver)
      continue;
    if (mutations[i].type === "childList") {
      mutations[i].removedNodes.forEach((node) => {
        if (node.nodeType !== 1)
          return;
        if (!node._x_marker)
          return;
        removedNodes.add(node);
      });
      mutations[i].addedNodes.forEach((node) => {
        if (node.nodeType !== 1)
          return;
        if (removedNodes.has(node)) {
          removedNodes.delete(node);
          return;
        }
        if (node._x_marker)
          return;
        addedNodes.push(node);
      });
    }
    if (mutations[i].type === "attributes") {
      let el = mutations[i].target;
      let name = mutations[i].attributeName;
      let oldValue = mutations[i].oldValue;
      let add2 = () => {
        if (!addedAttributes.has(el))
          addedAttributes.set(el, []);
        addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
      };
      let remove = () => {
        if (!removedAttributes.has(el))
          removedAttributes.set(el, []);
        removedAttributes.get(el).push(name);
      };
      if (el.hasAttribute(name) && oldValue === null) {
        add2();
      } else if (el.hasAttribute(name)) {
        remove();
        add2();
      } else {
        remove();
      }
    }
  }
  removedAttributes.forEach((attrs, el) => {
    cleanupAttributes(el, attrs);
  });
  addedAttributes.forEach((attrs, el) => {
    onAttributeAddeds.forEach((i) => i(el, attrs));
  });
  for (let node of removedNodes) {
    if (addedNodes.some((i) => i.contains(node)))
      continue;
    onElRemoveds.forEach((i) => i(node));
  }
  for (let node of addedNodes) {
    if (!node.isConnected)
      continue;
    onElAddeds.forEach((i) => i(node));
  }
  addedNodes = null;
  removedNodes = null;
  addedAttributes = null;
  removedAttributes = null;
}
function scope(node) {
  return mergeProxies(closestDataStack(node));
}
function addScopeToNode(node, data2, referenceNode) {
  node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
  return () => {
    node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
  };
}
function closestDataStack(node) {
  if (node._x_dataStack)
    return node._x_dataStack;
  if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
    return closestDataStack(node.host);
  }
  if (!node.parentNode) {
    return [];
  }
  return closestDataStack(node.parentNode);
}
function mergeProxies(objects) {
  return new Proxy({ objects }, mergeProxyTrap);
}
function keyInPrototypeChain(obj, key) {
  if (obj === null || obj === Object.prototype)
    return null;
  if (Object.prototype.hasOwnProperty.call(obj, key))
    return obj;
  return keyInPrototypeChain(Object.getPrototypeOf(obj), key);
}
var mergeProxyTrap = {
  ownKeys({ objects }) {
    return Array.from(
      new Set(objects.flatMap((i) => Object.keys(i)))
    );
  },
  has({ objects }, name) {
    if (name == Symbol.unscopables)
      return false;
    return objects.some(
      (obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name)
    );
  },
  get({ objects }, name, thisProxy) {
    if (name == "toJSON")
      return collapseProxies;
    return Reflect.get(
      objects.find(
        (obj) => Reflect.has(obj, name)
      ) || {},
      name,
      thisProxy
    );
  },
  set({ objects }, name, value, thisProxy) {
    let target;
    for (const obj of objects) {
      target = keyInPrototypeChain(obj, name);
      if (target)
        break;
    }
    if (!target)
      target = objects[objects.length - 1];
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    if (descriptor?.set && descriptor?.get)
      return descriptor.set.call(thisProxy, value) || true;
    return Reflect.set(target, name, value);
  }
};
function collapseProxies() {
  let keys = Reflect.ownKeys(this);
  return keys.reduce((acc, key) => {
    acc[key] = Reflect.get(this, key);
    return acc;
  }, {});
}
function initInterceptors(data2) {
  let isObject3 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
  let recurse = (obj, basePath = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
      if (enumerable === false || value === void 0)
        return;
      if (typeof value === "object" && value !== null && value.__v_skip)
        return;
      let path = basePath === "" ? key : `${basePath}.${key}`;
      if (typeof value === "object" && value !== null && value._x_interceptor) {
        obj[key] = value.initialize(data2, path, key);
      } else {
        if (isObject3(value) && value !== obj && !(value instanceof Element)) {
          recurse(value, path);
        }
      }
    });
  };
  return recurse(data2);
}
function interceptor(callback, mutateObj = () => {
}) {
  let obj = {
    initialValue: void 0,
    _x_interceptor: true,
    initialize(data2, path, key) {
      return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
    }
  };
  mutateObj(obj);
  return (initialValue) => {
    if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
      let initialize = obj.initialize.bind(obj);
      obj.initialize = (data2, path, key) => {
        let innerValue = initialValue.initialize(data2, path, key);
        obj.initialValue = innerValue;
        return initialize(data2, path, key);
      };
    } else {
      obj.initialValue = initialValue;
    }
    return obj;
  };
}
function get(obj, path) {
  return path.split(".").reduce((carry, segment) => carry[segment], obj);
}
function set(obj, path, value) {
  if (typeof path === "string")
    path = path.split(".");
  if (path.length === 1)
    obj[path[0]] = value;
  else if (path.length === 0)
    throw error;
  else {
    if (obj[path[0]])
      return set(obj[path[0]], path.slice(1), value);
    else {
      obj[path[0]] = {};
      return set(obj[path[0]], path.slice(1), value);
    }
  }
}
var magics = {};
function magic(name, callback) {
  magics[name] = callback;
}
function injectMagics(obj, el) {
  let memoizedUtilities = getUtilities(el);
  Object.entries(magics).forEach(([name, callback]) => {
    Object.defineProperty(obj, `$${name}`, {
      get() {
        return callback(el, memoizedUtilities);
      },
      enumerable: false
    });
  });
  return obj;
}
function getUtilities(el) {
  let [utilities, cleanup2] = getElementBoundUtilities(el);
  let utils = { interceptor, ...utilities };
  onElRemoved(el, cleanup2);
  return utils;
}
function tryCatch(el, expression, callback, ...args) {
  try {
    return callback(...args);
  } catch (e) {
    handleError(e, el, expression);
  }
}
function handleError(...args) {
  return errorHandler(...args);
}
var errorHandler = normalErrorHandler;
function setErrorHandler(handler4) {
  errorHandler = handler4;
}
function normalErrorHandler(error2, el, expression = void 0) {
  error2 = Object.assign(
    error2 ?? { message: "No error message given." },
    { el, expression }
  );
  console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
  setTimeout(() => {
    throw error2;
  }, 0);
}
var shouldAutoEvaluateFunctions = true;
function dontAutoEvaluateFunctions(callback) {
  let cache = shouldAutoEvaluateFunctions;
  shouldAutoEvaluateFunctions = false;
  let result = callback();
  shouldAutoEvaluateFunctions = cache;
  return result;
}
function evaluate(el, expression, extras = {}) {
  let result;
  evaluateLater(el, expression)((value) => result = value, extras);
  return result;
}
function evaluateLater(...args) {
  return theEvaluatorFunction(...args);
}
var theEvaluatorFunction = () => {
};
function setEvaluator(newEvaluator) {
  theEvaluatorFunction = newEvaluator;
}
var theRawEvaluatorFunction;
function setRawEvaluator(newEvaluator) {
  theRawEvaluatorFunction = newEvaluator;
}
function normalEvaluator(el, expression) {
  let overriddenMagics = {};
  injectMagics(overriddenMagics, el);
  let dataStack = [overriddenMagics, ...closestDataStack(el)];
  let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
  return tryCatch.bind(null, el, expression, evaluator);
}
function generateEvaluatorFromFunction(dataStack, func) {
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [], context } = {}) => {
    if (!shouldAutoEvaluateFunctions) {
      runIfTypeOfFunction(receiver, func, mergeProxies([scope2, ...dataStack]), params);
      return;
    }
    let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
    runIfTypeOfFunction(receiver, result);
  };
}
var evaluatorMemo = {};
function generateFunctionFromString(expression, el) {
  if (evaluatorMemo[expression]) {
    return evaluatorMemo[expression];
  }
  let AsyncFunction = Object.getPrototypeOf(async function() {
  }).constructor;
  let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
  const safeAsyncFunction = () => {
    try {
      let func2 = new AsyncFunction(
        ["__self", "scope"],
        `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
      );
      Object.defineProperty(func2, "name", {
        value: `[Alpine] ${expression}`
      });
      return func2;
    } catch (error2) {
      handleError(error2, el, expression);
      return Promise.resolve();
    }
  };
  let func = safeAsyncFunction();
  evaluatorMemo[expression] = func;
  return func;
}
function generateEvaluatorFromString(dataStack, expression, el) {
  let func = generateFunctionFromString(expression, el);
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [], context } = {}) => {
    func.result = void 0;
    func.finished = false;
    let completeScope = mergeProxies([scope2, ...dataStack]);
    if (typeof func === "function") {
      let promise = func.call(context, func, completeScope).catch((error2) => handleError(error2, el, expression));
      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
        func.result = void 0;
      } else {
        promise.then((result) => {
          runIfTypeOfFunction(receiver, result, completeScope, params, el);
        }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
      }
    }
  };
}
function runIfTypeOfFunction(receiver, value, scope2, params, el) {
  if (shouldAutoEvaluateFunctions && typeof value === "function") {
    let result = value.apply(scope2, params);
    if (result instanceof Promise) {
      result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
    } else {
      receiver(result);
    }
  } else if (typeof value === "object" && value instanceof Promise) {
    value.then((i) => receiver(i));
  } else {
    receiver(value);
  }
}
function evaluateRaw(...args) {
  return theRawEvaluatorFunction(...args);
}
function normalRawEvaluator(el, expression, extras = {}) {
  let overriddenMagics = {};
  injectMagics(overriddenMagics, el);
  let dataStack = [overriddenMagics, ...closestDataStack(el)];
  let scope2 = mergeProxies([extras.scope ?? {}, ...dataStack]);
  let params = extras.params ?? [];
  if (expression.includes("await")) {
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
    let func = new AsyncFunction(
      ["scope"],
      `with (scope) { let __result = ${rightSideSafeExpression}; return __result }`
    );
    let result = func.call(extras.context, scope2);
    return result;
  } else {
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(()=>{ ${expression} })()` : expression;
    let func = new Function(
      ["scope"],
      `with (scope) { let __result = ${rightSideSafeExpression}; return __result }`
    );
    let result = func.call(extras.context, scope2);
    if (typeof result === "function" && shouldAutoEvaluateFunctions) {
      return result.apply(scope2, params);
    }
    return result;
  }
}
var prefixAsString = "x-";
function prefix(subject = "") {
  return prefixAsString + subject;
}
function setPrefix(newPrefix) {
  prefixAsString = newPrefix;
}
var directiveHandlers = {};
function directive(name, callback) {
  directiveHandlers[name] = callback;
  return {
    before(directive2) {
      if (!directiveHandlers[directive2]) {
        console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
        return;
      }
      const pos = directiveOrder.indexOf(directive2);
      directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
    }
  };
}
function directiveExists(name) {
  return Object.keys(directiveHandlers).includes(name);
}
function directives(el, attributes, originalAttributeOverride) {
  attributes = Array.from(attributes);
  if (el._x_virtualDirectives) {
    let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(vAttributes);
    vAttributes = vAttributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    attributes = attributes.concat(vAttributes);
  }
  let transformedAttributeMap = {};
  let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
  return directives2.map((directive2) => {
    return getDirectiveHandler(el, directive2);
  });
}
function attributesOnly(attributes) {
  return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
}
var isDeferringHandlers = false;
var directiveHandlerStacks = /* @__PURE__ */ new Map();
var currentHandlerStackKey = /* @__PURE__ */ Symbol();
function deferHandlingDirectives(callback) {
  isDeferringHandlers = true;
  let key = /* @__PURE__ */ Symbol();
  currentHandlerStackKey = key;
  directiveHandlerStacks.set(key, []);
  let flushHandlers = () => {
    while (directiveHandlerStacks.get(key).length)
      directiveHandlerStacks.get(key).shift()();
    directiveHandlerStacks.delete(key);
  };
  let stopDeferring = () => {
    isDeferringHandlers = false;
    flushHandlers();
  };
  callback(flushHandlers);
  stopDeferring();
}
function getElementBoundUtilities(el) {
  let cleanups = [];
  let cleanup2 = (callback) => cleanups.push(callback);
  let [effect3, cleanupEffect] = elementBoundEffect(el);
  cleanups.push(cleanupEffect);
  let utilities = {
    Alpine: alpine_default,
    effect: effect3,
    cleanup: cleanup2,
    evaluateLater: evaluateLater.bind(evaluateLater, el),
    evaluate: evaluate.bind(evaluate, el)
  };
  let doCleanup = () => cleanups.forEach((i) => i());
  return [utilities, doCleanup];
}
function getDirectiveHandler(el, directive2) {
  let noop = () => {
  };
  let handler4 = directiveHandlers[directive2.type] || noop;
  let [utilities, cleanup2] = getElementBoundUtilities(el);
  onAttributeRemoved(el, directive2.original, cleanup2);
  let fullHandler = () => {
    if (el._x_ignore || el._x_ignoreSelf)
      return;
    handler4.inline && handler4.inline(el, directive2, utilities);
    handler4 = handler4.bind(handler4, el, directive2, utilities);
    isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
  };
  fullHandler.runCleanups = cleanup2;
  return fullHandler;
}
var startingWith = (subject, replacement) => ({ name, value }) => {
  if (name.startsWith(subject))
    name = name.replace(subject, replacement);
  return { name, value };
};
var into = (i) => i;
function toTransformedAttributes(callback = () => {
}) {
  return ({ name, value }) => {
    let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
      return transform(carry);
    }, { name, value });
    if (newName !== name)
      callback(newName, name);
    return { name: newName, value: newValue };
  };
}
var attributeTransformers = [];
function mapAttributes(callback) {
  attributeTransformers.push(callback);
}
function outNonAlpineAttributes({ name }) {
  return alpineAttributeRegex().test(name);
}
var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
  return ({ name, value }) => {
    if (name === value)
      value = "";
    let typeMatch = name.match(alpineAttributeRegex());
    let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
    let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    let original = originalAttributeOverride || transformedAttributeMap[name] || name;
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map((i) => i.replace(".", "")),
      expression: value,
      original
    };
  };
}
var DEFAULT = "DEFAULT";
var directiveOrder = [
  "ignore",
  "ref",
  "id",
  "data",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  DEFAULT,
  "teleport"
];
function byPriority(a, b) {
  let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
  let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
  return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
}
function dispatch(el, name, detail = {}, options = {}) {
  return el.dispatchEvent(
    new CustomEvent(name, {
      detail,
      bubbles: true,
      // Allows events to pass the shadow DOM barrier.
      composed: true,
      cancelable: true,
      // Allows overriding the default event options.
      ...options
    })
  );
}
function walk(el, callback) {
  if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
    Array.from(el.children).forEach((el2) => walk(el2, callback));
    return;
  }
  let skip = false;
  callback(el, () => skip = true);
  if (skip)
    return;
  let node = el.firstElementChild;
  while (node) {
    walk(node, callback, false);
    node = node.nextElementSibling;
  }
}
function warn(message, ...args) {
  console.warn(`Alpine Warning: ${message}`, ...args);
}
var started = false;
function start() {
  if (started)
    warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
  started = true;
  if (!document.body)
    warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
  dispatch(document, "alpine:init");
  dispatch(document, "alpine:initializing");
  startObservingMutations();
  onElAdded((el) => initTree(el, walk));
  onElRemoved((el) => destroyTree(el));
  onAttributesAdded((el, attrs) => {
    directives(el, attrs).forEach((handle) => handle());
  });
  let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
  Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
    initTree(el);
  });
  dispatch(document, "alpine:initialized");
  setTimeout(() => {
    warnAboutMissingPlugins();
  });
}
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
function rootSelectors() {
  return rootSelectorCallbacks.map((fn) => fn());
}
function allSelectors() {
  return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
}
function addRootSelector(selectorCallback) {
  rootSelectorCallbacks.push(selectorCallback);
}
function addInitSelector(selectorCallback) {
  initSelectorCallbacks.push(selectorCallback);
}
function closestRoot(el, includeInitSelectors = false) {
  return findClosest(el, (element) => {
    const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
    if (selectors.some((selector) => element.matches(selector)))
      return true;
  });
}
function findClosest(el, callback) {
  if (!el)
    return;
  if (callback(el))
    return el;
  if (el._x_teleportBack)
    return findClosest(el._x_teleportBack, callback);
  if (el.parentNode instanceof ShadowRoot) {
    return findClosest(el.parentNode.host, callback);
  }
  if (!el.parentElement)
    return;
  return findClosest(el.parentElement, callback);
}
function isRoot(el) {
  return rootSelectors().some((selector) => el.matches(selector));
}
var initInterceptors2 = [];
function interceptInit(callback) {
  initInterceptors2.push(callback);
}
var markerDispenser = 1;
function initTree(el, walker = walk, intercept = () => {
}) {
  if (findClosest(el, (i) => i._x_ignore))
    return;
  deferHandlingDirectives(() => {
    walker(el, (el2, skip) => {
      if (el2._x_marker)
        return;
      intercept(el2, skip);
      initInterceptors2.forEach((i) => i(el2, skip));
      directives(el2, el2.attributes).forEach((handle) => handle());
      if (!el2._x_ignore)
        el2._x_marker = markerDispenser++;
      el2._x_ignore && skip();
    });
  });
}
function destroyTree(root, walker = walk) {
  walker(root, (el) => {
    cleanupElement(el);
    cleanupAttributes(el);
    delete el._x_marker;
  });
}
function warnAboutMissingPlugins() {
  let pluginDirectives = [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]]
  ];
  pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
    if (directiveExists(directive2))
      return;
    selectors.some((selector) => {
      if (document.querySelector(selector)) {
        warn(`found "${selector}", but missing ${plugin2} plugin`);
        return true;
      }
    });
  });
}
var tickStack = [];
var isHolding = false;
function nextTick(callback = () => {
}) {
  queueMicrotask(() => {
    isHolding || setTimeout(() => {
      releaseNextTicks();
    });
  });
  return new Promise((res) => {
    tickStack.push(() => {
      callback();
      res();
    });
  });
}
function releaseNextTicks() {
  isHolding = false;
  while (tickStack.length)
    tickStack.shift()();
}
function holdNextTicks() {
  isHolding = true;
}
function setClasses(el, value) {
  if (Array.isArray(value)) {
    return setClassesFromString(el, value.join(" "));
  } else if (typeof value === "object" && value !== null) {
    return setClassesFromObject(el, value);
  } else if (typeof value === "function") {
    return setClasses(el, value());
  }
  return setClassesFromString(el, value);
}
function splitClasses(classString) {
  return classString.split(/\s/).filter(Boolean);
}
function setClassesFromString(el, classString) {
  let missingClasses = (classString2) => splitClasses(classString2).filter((i) => !el.classList.contains(i)).filter(Boolean);
  let addClassesAndReturnUndo = (classes) => {
    el.classList.add(...classes);
    return () => {
      el.classList.remove(...classes);
    };
  };
  classString = classString === true ? classString = "" : classString || "";
  return addClassesAndReturnUndo(missingClasses(classString));
}
function setClassesFromObject(el, classObject) {
  let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? splitClasses(classString) : false).filter(Boolean);
  let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? splitClasses(classString) : false).filter(Boolean);
  let added = [];
  let removed = [];
  forRemove.forEach((i) => {
    if (el.classList.contains(i)) {
      el.classList.remove(i);
      removed.push(i);
    }
  });
  forAdd.forEach((i) => {
    if (!el.classList.contains(i)) {
      el.classList.add(i);
      added.push(i);
    }
  });
  return () => {
    removed.forEach((i) => el.classList.add(i));
    added.forEach((i) => el.classList.remove(i));
  };
}
function setStyles(el, value) {
  if (typeof value === "object" && value !== null) {
    return setStylesFromObject(el, value);
  }
  return setStylesFromString(el, value);
}
function setStylesFromObject(el, value) {
  let previousStyles = {};
  Object.entries(value).forEach(([key, value2]) => {
    previousStyles[key] = el.style[key];
    if (!key.startsWith("--")) {
      key = kebabCase(key);
    }
    el.style.setProperty(key, value2);
  });
  setTimeout(() => {
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  });
  return () => {
    setStyles(el, previousStyles);
  };
}
function setStylesFromString(el, value) {
  let cache = el.getAttribute("style", value);
  el.setAttribute("style", value);
  return () => {
    el.setAttribute("style", cache || "");
  };
}
function kebabCase(subject) {
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function once(callback, fallback = () => {
}) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      callback.apply(this, arguments);
    } else {
      fallback.apply(this, arguments);
    }
  };
}
directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "function")
    expression = evaluate2(expression);
  if (expression === false)
    return;
  if (!expression || typeof expression === "boolean") {
    registerTransitionsFromHelper(el, modifiers, value);
  } else {
    registerTransitionsFromClassString(el, expression, value);
  }
});
function registerTransitionsFromClassString(el, classString, stage) {
  registerTransitionObject(el, setClasses, "");
  let directiveStorageMap = {
    "enter": (classes) => {
      el._x_transition.enter.during = classes;
    },
    "enter-start": (classes) => {
      el._x_transition.enter.start = classes;
    },
    "enter-end": (classes) => {
      el._x_transition.enter.end = classes;
    },
    "leave": (classes) => {
      el._x_transition.leave.during = classes;
    },
    "leave-start": (classes) => {
      el._x_transition.leave.start = classes;
    },
    "leave-end": (classes) => {
      el._x_transition.leave.end = classes;
    }
  };
  directiveStorageMap[stage](classString);
}
function registerTransitionsFromHelper(el, modifiers, stage) {
  registerTransitionObject(el, setStyles);
  let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
  let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
  let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
  if (modifiers.includes("in") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
  }
  if (modifiers.includes("out") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
  }
  let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
  let wantsOpacity = wantsAll || modifiers.includes("opacity");
  let wantsScale = wantsAll || modifiers.includes("scale");
  let opacityValue = wantsOpacity ? 0 : 1;
  let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
  let delay = modifierValue(modifiers, "delay", 0) / 1e3;
  let origin = modifierValue(modifiers, "origin", "center");
  let property = "opacity, transform";
  let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
  let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
  let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
  if (transitioningIn) {
    el._x_transition.enter.during = {
      transformOrigin: origin,
      transitionDelay: `${delay}s`,
      transitionProperty: property,
      transitionDuration: `${durationIn}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.enter.start = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
    el._x_transition.enter.end = {
      opacity: 1,
      transform: `scale(1)`
    };
  }
  if (transitioningOut) {
    el._x_transition.leave.during = {
      transformOrigin: origin,
      transitionDelay: `${delay}s`,
      transitionProperty: property,
      transitionDuration: `${durationOut}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.leave.start = {
      opacity: 1,
      transform: `scale(1)`
    };
    el._x_transition.leave.end = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
  }
}
function registerTransitionObject(el, setFunction, defaultValue = {}) {
  if (!el._x_transition)
    el._x_transition = {
      enter: { during: defaultValue, start: defaultValue, end: defaultValue },
      leave: { during: defaultValue, start: defaultValue, end: defaultValue },
      in(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.enter.during,
          start: this.enter.start,
          end: this.enter.end
        }, before, after);
      },
      out(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.leave.during,
          start: this.leave.start,
          end: this.leave.end
        }, before, after);
      }
    };
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
  const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let clickAwayCompatibleShow = () => nextTick2(show);
  if (value) {
    if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
      el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
    } else {
      el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
    }
    return;
  }
  el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
    el._x_transition.out(() => {
    }, () => resolve(hide));
    el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
  }) : Promise.resolve(hide);
  queueMicrotask(() => {
    let closest2 = closestHide(el);
    if (closest2) {
      if (!closest2._x_hideChildren)
        closest2._x_hideChildren = [];
      closest2._x_hideChildren.push(el);
    } else {
      nextTick2(() => {
        let hideAfterChildren = (el2) => {
          let carry = Promise.all([
            el2._x_hidePromise,
            ...(el2._x_hideChildren || []).map(hideAfterChildren)
          ]).then(([i]) => i?.());
          delete el2._x_hidePromise;
          delete el2._x_hideChildren;
          return carry;
        };
        hideAfterChildren(el).catch((e) => {
          if (!e.isFromCancelledTransition)
            throw e;
        });
      });
    }
  });
};
function closestHide(el) {
  let parent = el.parentNode;
  if (!parent)
    return;
  return parent._x_hidePromise ? parent : closestHide(parent);
}
function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
}, after = () => {
}) {
  if (el._x_transitioning)
    el._x_transitioning.cancel();
  if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
    before();
    after();
    return;
  }
  let undoStart, undoDuring, undoEnd;
  performTransition(el, {
    start() {
      undoStart = setFunction(el, start2);
    },
    during() {
      undoDuring = setFunction(el, during);
    },
    before,
    end() {
      undoStart();
      undoEnd = setFunction(el, end);
    },
    after,
    cleanup() {
      undoDuring();
      undoEnd();
    }
  });
}
function performTransition(el, stages) {
  let interrupted, reachedBefore, reachedEnd;
  let finish = once(() => {
    mutateDom(() => {
      interrupted = true;
      if (!reachedBefore)
        stages.before();
      if (!reachedEnd) {
        stages.end();
        releaseNextTicks();
      }
      stages.after();
      if (el.isConnected)
        stages.cleanup();
      delete el._x_transitioning;
    });
  });
  el._x_transitioning = {
    beforeCancels: [],
    beforeCancel(callback) {
      this.beforeCancels.push(callback);
    },
    cancel: once(function() {
      while (this.beforeCancels.length) {
        this.beforeCancels.shift()();
      }
      ;
      finish();
    }),
    finish
  };
  mutateDom(() => {
    stages.start();
    stages.during();
  });
  holdNextTicks();
  requestAnimationFrame(() => {
    if (interrupted)
      return;
    let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
    let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    if (duration === 0)
      duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
    mutateDom(() => {
      stages.before();
    });
    reachedBefore = true;
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      mutateDom(() => {
        stages.end();
      });
      releaseNextTicks();
      setTimeout(el._x_transitioning.finish, duration + delay);
      reachedEnd = true;
    });
  });
}
function modifierValue(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1)
    return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue)
    return fallback;
  if (key === "scale") {
    if (isNaN(rawValue))
      return fallback;
  }
  if (key === "duration" || key === "delay") {
    let match = rawValue.match(/([0-9]+)ms/);
    if (match)
      return match[1];
  }
  if (key === "origin") {
    if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
      return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
    }
  }
  return rawValue;
}
var isCloning = false;
function skipDuringClone(callback, fallback = () => {
}) {
  return (...args) => isCloning ? fallback(...args) : callback(...args);
}
function onlyDuringClone(callback) {
  return (...args) => isCloning && callback(...args);
}
var interceptors = [];
function interceptClone(callback) {
  interceptors.push(callback);
}
function cloneNode(from, to) {
  interceptors.forEach((i) => i(from, to));
  isCloning = true;
  dontRegisterReactiveSideEffects(() => {
    initTree(to, (el, callback) => {
      callback(el, () => {
      });
    });
  });
  isCloning = false;
}
var isCloningLegacy = false;
function clone(oldEl, newEl) {
  if (!newEl._x_dataStack)
    newEl._x_dataStack = oldEl._x_dataStack;
  isCloning = true;
  isCloningLegacy = true;
  dontRegisterReactiveSideEffects(() => {
    cloneTree(newEl);
  });
  isCloning = false;
  isCloningLegacy = false;
}
function cloneTree(el) {
  let hasRunThroughFirstEl = false;
  let shallowWalker = (el2, callback) => {
    walk(el2, (el3, skip) => {
      if (hasRunThroughFirstEl && isRoot(el3))
        return skip();
      hasRunThroughFirstEl = true;
      callback(el3, skip);
    });
  };
  initTree(el, shallowWalker);
}
function dontRegisterReactiveSideEffects(callback) {
  let cache = effect;
  overrideEffect((callback2, el) => {
    let storedEffect = cache(callback2);
    release(storedEffect);
    return () => {
    };
  });
  callback();
  overrideEffect(cache);
}
function bind(el, name, value, modifiers = []) {
  if (!el._x_bindings)
    el._x_bindings = reactive({});
  el._x_bindings[name] = value;
  name = modifiers.includes("camel") ? camelCase(name) : name;
  switch (name) {
    case "value":
      bindInputValue(el, value);
      break;
    case "style":
      bindStyles(el, value);
      break;
    case "class":
      bindClasses(el, value);
      break;
    case "selected":
    case "checked":
      bindAttributeAndProperty(el, name, value);
      break;
    default:
      bindAttribute(el, name, value);
      break;
  }
}
function bindInputValue(el, value) {
  if (isRadio(el)) {
    if (el.attributes.value === void 0) {
      el.value = value;
    }
  } else if (isCheckbox(el)) {
    if (Number.isInteger(value)) {
      el.value = value;
    } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
      el.value = String(value);
    } else {
      if (Array.isArray(value)) {
        el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
      } else {
        el.checked = !!value;
      }
    }
  } else if (el.tagName === "SELECT") {
    updateSelect(el, value);
  } else {
    if (el.value === value)
      return;
    el.value = value === void 0 ? "" : value;
  }
}
function bindClasses(el, value) {
  if (el._x_undoAddedClasses)
    el._x_undoAddedClasses();
  el._x_undoAddedClasses = setClasses(el, value);
}
function bindStyles(el, value) {
  if (el._x_undoAddedStyles)
    el._x_undoAddedStyles();
  el._x_undoAddedStyles = setStyles(el, value);
}
function bindAttributeAndProperty(el, name, value) {
  bindAttribute(el, name, value);
  setPropertyIfChanged(el, name, value);
}
function bindAttribute(el, name, value) {
  if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
    el.removeAttribute(name);
  } else {
    if (isBooleanAttr(name))
      value = name;
    setIfChanged(el, name, value);
  }
}
function setIfChanged(el, attrName, value) {
  if (el.getAttribute(attrName) != value) {
    el.setAttribute(attrName, value);
  }
}
function setPropertyIfChanged(el, propName, value) {
  if (el[propName] !== value) {
    el[propName] = value;
  }
}
function updateSelect(el, value) {
  const arrayWrappedValue = [].concat(value).map((value2) => {
    return value2 + "";
  });
  Array.from(el.options).forEach((option) => {
    option.selected = arrayWrappedValue.includes(option.value);
  });
}
function camelCase(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function checkedAttrLooseCompare(valueA, valueB) {
  return valueA == valueB;
}
function safeParseBoolean(rawValue) {
  if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
    return true;
  }
  if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
    return false;
  }
  return rawValue ? Boolean(rawValue) : null;
}
var booleanAttributes = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "shadowrootclonable",
  "shadowrootdelegatesfocus",
  "shadowrootserializable"
]);
function isBooleanAttr(attrName) {
  return booleanAttributes.has(attrName);
}
function attributeShouldntBePreservedIfFalsy(name) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
}
function getBinding(el, name, fallback) {
  if (el._x_bindings && el._x_bindings[name] !== void 0)
    return el._x_bindings[name];
  return getAttributeBinding(el, name, fallback);
}
function extractProp(el, name, fallback, extract = true) {
  if (el._x_bindings && el._x_bindings[name] !== void 0)
    return el._x_bindings[name];
  if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
    let binding = el._x_inlineBindings[name];
    binding.extract = extract;
    return dontAutoEvaluateFunctions(() => {
      return evaluate(el, binding.expression);
    });
  }
  return getAttributeBinding(el, name, fallback);
}
function getAttributeBinding(el, name, fallback) {
  let attr = el.getAttribute(name);
  if (attr === null)
    return typeof fallback === "function" ? fallback() : fallback;
  if (attr === "")
    return true;
  if (isBooleanAttr(name)) {
    return !![name, "true"].includes(attr);
  }
  return attr;
}
function isCheckbox(el) {
  return el.type === "checkbox" || el.localName === "ui-checkbox" || el.localName === "ui-switch";
}
function isRadio(el) {
  return el.type === "radio" || el.localName === "ui-radio";
}
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function throttle(func, limit) {
  let inThrottle;
  return function() {
    let context = this, args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
  let firstRun = true;
  let outerHash;
  let innerHash;
  let reference = effect(() => {
    let outer = outerGet();
    let inner = innerGet();
    if (firstRun) {
      innerSet(cloneIfObject(outer));
      firstRun = false;
    } else {
      let outerHashLatest = JSON.stringify(outer);
      let innerHashLatest = JSON.stringify(inner);
      if (outerHashLatest !== outerHash) {
        innerSet(cloneIfObject(outer));
      } else if (outerHashLatest !== innerHashLatest) {
        outerSet(cloneIfObject(inner));
      } else {
      }
    }
    outerHash = JSON.stringify(outerGet());
    innerHash = JSON.stringify(innerGet());
  });
  return () => {
    release(reference);
  };
}
function cloneIfObject(value) {
  return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
}
function plugin(callback) {
  let callbacks = Array.isArray(callback) ? callback : [callback];
  callbacks.forEach((i) => i(alpine_default));
}
var stores = {};
var isReactive = false;
function store(name, value) {
  if (!isReactive) {
    stores = reactive(stores);
    isReactive = true;
  }
  if (value === void 0) {
    return stores[name];
  }
  stores[name] = value;
  initInterceptors(stores[name]);
  if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
    stores[name].init();
  }
}
function getStores() {
  return stores;
}
var binds = {};
function bind2(name, bindings) {
  let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
  if (name instanceof Element) {
    return applyBindingsObject(name, getBindings());
  } else {
    binds[name] = getBindings;
  }
  return () => {
  };
}
function injectBindingProviders(obj) {
  Object.entries(binds).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback(...args);
        };
      }
    });
  });
  return obj;
}
function applyBindingsObject(el, obj, original) {
  let cleanupRunners = [];
  while (cleanupRunners.length)
    cleanupRunners.pop()();
  let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
  let staticAttributes = attributesOnly(attributes);
  attributes = attributes.map((attribute) => {
    if (staticAttributes.find((attr) => attr.name === attribute.name)) {
      return {
        name: `x-bind:${attribute.name}`,
        value: `"${attribute.value}"`
      };
    }
    return attribute;
  });
  directives(el, attributes, original).map((handle) => {
    cleanupRunners.push(handle.runCleanups);
    handle();
  });
  return () => {
    while (cleanupRunners.length)
      cleanupRunners.pop()();
  };
}
var datas = {};
function data(name, callback) {
  datas[name] = callback;
}
function injectDataProviders(obj, context) {
  Object.entries(datas).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback.bind(context)(...args);
        };
      },
      enumerable: false
    });
  });
  return obj;
}
var Alpine = {
  get reactive() {
    return reactive;
  },
  get release() {
    return release;
  },
  get effect() {
    return effect;
  },
  get raw() {
    return raw;
  },
  get transaction() {
    return transaction;
  },
  version: "3.15.12",
  flushAndStopDeferringMutations,
  dontAutoEvaluateFunctions,
  disableEffectScheduling,
  startObservingMutations,
  stopObservingMutations,
  setReactivityEngine,
  onAttributeRemoved,
  onAttributesAdded,
  closestDataStack,
  skipDuringClone,
  onlyDuringClone,
  addRootSelector,
  addInitSelector,
  setErrorHandler,
  interceptClone,
  addScopeToNode,
  deferMutations,
  mapAttributes,
  evaluateLater,
  interceptInit,
  initInterceptors,
  injectMagics,
  setEvaluator,
  setRawEvaluator,
  mergeProxies,
  extractProp,
  findClosest,
  onElRemoved,
  closestRoot,
  destroyTree,
  interceptor,
  // INTERNAL: not public API and is subject to change without major release.
  transition,
  // INTERNAL
  setStyles,
  // INTERNAL
  mutateDom,
  directive,
  entangle,
  throttle,
  debounce,
  evaluate,
  evaluateRaw,
  initTree,
  nextTick,
  prefixed: prefix,
  prefix: setPrefix,
  plugin,
  magic,
  store,
  start,
  clone,
  // INTERNAL
  cloneNode,
  // INTERNAL
  bound: getBinding,
  $data: scope,
  watch,
  walk,
  data,
  bind: bind2
};
var alpine_default = Alpine;
function makeMap(str2, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str2.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str2) => {
    const hit = cache[str2];
    return hit || (cache[str2] = fn(str2));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str2) => {
  return str2.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str2) => str2.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str2) => str2.charAt(0).toUpperCase() + str2.slice(1));
var toHandlerKey = cacheStringFunction((str2) => str2 ? `on${capitalize(str2)}` : ``);
var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
var targetMap = /* @__PURE__ */ new WeakMap();
var effectStack = [];
var activeEffect;
var ITERATE_KEY = /* @__PURE__ */ Symbol(true ? "iterate" : "");
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(true ? "Map key iterate" : "");
function isEffect(fn) {
  return fn && fn._isEffect === true;
}
function effect2(fn, options = EMPTY_OBJ) {
  if (isEffect(fn)) {
    fn = fn.raw;
  }
  const effect3 = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect3();
  }
  return effect3;
}
function stop(effect3) {
  if (effect3.active) {
    cleanup(effect3);
    if (effect3.options.onStop) {
      effect3.options.onStop();
    }
    effect3.active = false;
  }
}
var uid = 0;
function createReactiveEffect(fn, options) {
  const effect3 = function reactiveEffect() {
    if (!effect3.active) {
      return fn();
    }
    if (!effectStack.includes(effect3)) {
      cleanup(effect3);
      try {
        enableTracking();
        effectStack.push(effect3);
        activeEffect = effect3;
        return fn();
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect3.id = uid++;
  effect3.allowRecurse = !!options.allowRecurse;
  effect3._isEffect = true;
  effect3.active = true;
  effect3.raw = fn;
  effect3.deps = [];
  effect3.options = options;
  return effect3;
}
function cleanup(effect3) {
  const { deps } = effect3;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect3);
    }
    deps.length = 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!shouldTrack || activeEffect === void 0) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = /* @__PURE__ */ new Set());
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      });
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const effects = /* @__PURE__ */ new Set();
  const add2 = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect3) => {
        if (effect3 !== activeEffect || effect3.allowRecurse) {
          effects.add(effect3);
        }
      });
    }
  };
  if (type === "clear") {
    depsMap.forEach(add2);
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        add2(dep);
      }
    });
  } else {
    if (key !== void 0) {
      add2(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          add2(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          add2(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const run = (effect3) => {
    if (effect3.options.onTrigger) {
      effect3.options.onTrigger({
        effect: effect3,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      });
    }
    if (effect3.options.scheduler) {
      effect3.options.scheduler(effect3);
    } else {
      effect3();
    }
  };
  effects.forEach(run);
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
var get2 = /* @__PURE__ */ createGetter();
var readonlyGet = /* @__PURE__ */ createGetter(true);
var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly = false, shallow = false) {
  return function get3(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive2(res);
    }
    return res;
  };
}
var set2 = /* @__PURE__ */ createSetter();
function createSetter(shallow = false) {
  return function set3(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
var mutableHandlers = {
  get: get2,
  set: set2,
  deleteProperty,
  has,
  ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    if (true) {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    if (true) {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
var toReactive = (value) => isObject(value) ? reactive2(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly = false, isShallow = false) {
  target = target[
    "__v_raw"
    /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "get", key);
  }
  !isReadonly && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly = false) {
  const target = this[
    "__v_raw"
    /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "has", key);
  }
  !isReadonly && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
  target = target[
    "__v_raw"
    /* RAW */
  ];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3 ? get3.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly, isShallow) {
  return function forEach2(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive2(target) {
  if (target && target[
    "__v_isReadonly"
    /* IS_READONLY */
  ]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* RAW */
  ] && !(isReadonly && target[
    "__v_isReactive"
    /* IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function toRaw(observed) {
  return observed && toRaw(observed[
    "__v_raw"
    /* RAW */
  ]) || observed;
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
magic("nextTick", () => nextTick);
magic("dispatch", (el) => dispatch.bind(dispatch, el));
magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
  let evaluate2 = evaluateLater2(key);
  let getter = () => {
    let value;
    evaluate2((i) => value = i);
    return value;
  };
  let unwatch = watch(getter, callback);
  cleanup2(unwatch);
});
magic("store", getStores);
magic("data", (el) => scope(el));
magic("root", (el) => closestRoot(el));
magic("refs", (el) => {
  if (el._x_refs_proxy)
    return el._x_refs_proxy;
  el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
  return el._x_refs_proxy;
});
function getArrayOfRefObject(el) {
  let refObjects = [];
  findClosest(el, (i) => {
    if (i._x_refs)
      refObjects.push(i._x_refs);
  });
  return refObjects;
}
var globalIdMemo = {};
function findAndIncrementId(name) {
  if (!globalIdMemo[name])
    globalIdMemo[name] = 0;
  return ++globalIdMemo[name];
}
function closestIdRoot(el, name) {
  return findClosest(el, (element) => {
    if (element._x_ids && element._x_ids[name])
      return true;
  });
}
function setIdRoot(el, name) {
  if (!el._x_ids)
    el._x_ids = {};
  if (!el._x_ids[name])
    el._x_ids[name] = findAndIncrementId(name);
}
magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
  let cacheKey = `${name}${key ? `-${key}` : ""}`;
  return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
    let root = closestIdRoot(el, name);
    let id = root ? root._x_ids[name] : findAndIncrementId(name);
    return key ? `${name}-${id}-${key}` : `${name}-${id}`;
  });
});
interceptClone((from, to) => {
  if (from._x_id) {
    to._x_id = from._x_id;
  }
});
function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
  if (!el._x_id)
    el._x_id = {};
  if (el._x_id[cacheKey])
    return el._x_id[cacheKey];
  let output = callback();
  el._x_id[cacheKey] = output;
  cleanup2(() => {
    delete el._x_id[cacheKey];
  });
  return output;
}
magic("el", (el) => el);
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
function warnMissingPluginMagic(name, magicName, slug) {
  magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
  let func = evaluateLater2(expression);
  let innerGet = () => {
    let result;
    func((i) => result = i);
    return result;
  };
  let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
  let innerSet = (val) => evaluateInnerSet(() => {
  }, { scope: { "__placeholder": val } });
  let initialValue = innerGet();
  innerSet(initialValue);
  queueMicrotask(() => {
    if (!el._x_model)
      return;
    el._x_removeModelListeners["default"]();
    let outerGet = el._x_model.get;
    let outerSet = el._x_model.setWithModifiers;
    let releaseEntanglement = entangle(
      {
        get() {
          return outerGet();
        },
        set(value) {
          outerSet(value);
        }
      },
      {
        get() {
          return innerGet();
        },
        set(value) {
          innerSet(value);
        }
      }
    );
    cleanup2(releaseEntanglement);
  });
});
directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-teleport can only be used on a <template> tag", el);
  let target = getTarget2(expression);
  let clone2 = el.content.cloneNode(true).firstElementChild;
  el._x_teleport = clone2;
  clone2._x_teleportBack = el;
  el.setAttribute("data-teleport-template", true);
  clone2.setAttribute("data-teleport-target", true);
  if (el._x_forwardEvents) {
    el._x_forwardEvents.forEach((eventName) => {
      clone2.addEventListener(eventName, (e) => {
        e.stopPropagation();
        el.dispatchEvent(new e.constructor(e.type, e));
      });
    });
  }
  addScopeToNode(clone2, {}, el);
  let placeInDom = (clone3, target2, modifiers2) => {
    if (modifiers2.includes("prepend")) {
      target2.parentNode.insertBefore(clone3, target2);
    } else if (modifiers2.includes("append")) {
      target2.parentNode.insertBefore(clone3, target2.nextSibling);
    } else {
      target2.appendChild(clone3);
    }
  };
  mutateDom(() => {
    skipDuringClone(() => {
      placeInDom(clone2, target, modifiers);
      initTree(clone2);
    })();
  });
  el._x_teleportPutBack = () => {
    let target2 = getTarget2(expression);
    mutateDom(() => {
      placeInDom(el._x_teleport, target2, modifiers);
    });
  };
  cleanup2(
    () => mutateDom(() => {
      clone2.remove();
      destroyTree(clone2);
    })
  );
});
var teleportContainerDuringClone = document.createElement("div");
function getTarget2(expression) {
  let target = skipDuringClone(() => {
    return document.querySelector(expression);
  }, () => {
    return teleportContainerDuringClone;
  })();
  if (!target)
    warn(`Cannot find x-teleport element for selector: "${expression}"`);
  return target;
}
var handler = () => {
};
handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
  modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
  cleanup2(() => {
    modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
  });
};
directive("ignore", handler);
directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
  effect3(evaluateLater(el, expression));
}));
function on(el, event, modifiers, callback) {
  let listenerTarget = el;
  let handler4 = (e) => callback(e);
  let options = {};
  let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
  if (modifiers.includes("dot"))
    event = dotSyntax(event);
  if (modifiers.includes("camel"))
    event = camelCase2(event);
  if (modifiers.includes("capture"))
    options.capture = true;
  if (modifiers.includes("window"))
    listenerTarget = window;
  if (modifiers.includes("document"))
    listenerTarget = document;
  if (modifiers.includes("passive")) {
    options.passive = modifiers[modifiers.indexOf("passive") + 1] !== "false";
  }
  handler4 = addDebounceOrThrottle(modifiers, handler4);
  if (modifiers.includes("prevent"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.preventDefault();
      next(e);
    });
  if (modifiers.includes("stop"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.stopPropagation();
      next(e);
    });
  if (modifiers.includes("once")) {
    handler4 = wrapHandler(handler4, (next, e) => {
      next(e);
      listenerTarget.removeEventListener(event, handler4, options);
    });
  }
  if (modifiers.includes("away") || modifiers.includes("outside")) {
    listenerTarget = document;
    handler4 = wrapHandler(handler4, (next, e) => {
      if (el.contains(e.target))
        return;
      if (e.target.isConnected === false)
        return;
      if (el.offsetWidth < 1 && el.offsetHeight < 1)
        return;
      if (el._x_isShown === false)
        return;
      next(e);
    });
  }
  if (modifiers.includes("self"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.target === el && next(e);
    });
  if (event === "submit") {
    handler4 = wrapHandler(handler4, (next, e) => {
      if (e.target._x_pendingModelUpdates) {
        e.target._x_pendingModelUpdates.forEach((fn) => fn());
      }
      next(e);
    });
  }
  if (isKeyEvent(event) || isClickEvent(event)) {
    handler4 = wrapHandler(handler4, (next, e) => {
      if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
        return;
      }
      next(e);
    });
  }
  listenerTarget.addEventListener(event, handler4, options);
  return () => {
    listenerTarget.removeEventListener(event, handler4, options);
  };
}
function addDebounceOrThrottle(modifiers, handler4) {
  if (modifiers.includes("debounce")) {
    let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = debounce(handler4, wait);
  }
  if (modifiers.includes("throttle")) {
    let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = throttle(handler4, wait);
  }
  return handler4;
}
function dotSyntax(subject) {
  return subject.replace(/-/g, ".");
}
function camelCase2(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function isNumeric(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function kebabCase2(subject) {
  if ([" ", "_"].includes(
    subject
  ))
    return subject;
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function isKeyEvent(event) {
  return ["keydown", "keyup"].includes(event);
}
function isClickEvent(event) {
  return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
}
function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
  let keyModifiers = modifiers.filter((i) => {
    return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive", "preserve-scroll", "blur", "change", "lazy"].includes(i);
  });
  if (keyModifiers.includes("debounce")) {
    let debounceIndex = keyModifiers.indexOf("debounce");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.includes("throttle")) {
    let debounceIndex = keyModifiers.indexOf("throttle");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.length === 0)
    return false;
  if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
    return false;
  const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
  const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
  keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
  if (selectedSystemKeyModifiers.length > 0) {
    const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
      if (modifier === "cmd" || modifier === "super")
        modifier = "meta";
      return e[`${modifier}Key`];
    });
    if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
      if (isClickEvent(e.type))
        return false;
      if (keyToModifiers(e.key).includes(keyModifiers[0]))
        return false;
    }
  }
  return true;
}
function keyToModifiers(key) {
  if (!key)
    return [];
  key = kebabCase2(key);
  let modifierToKeyMap = {
    "ctrl": "control",
    "slash": "/",
    "space": " ",
    "spacebar": " ",
    "cmd": "meta",
    "esc": "escape",
    "up": "arrow-up",
    "down": "arrow-down",
    "left": "arrow-left",
    "right": "arrow-right",
    "period": ".",
    "comma": ",",
    "equal": "=",
    "minus": "-",
    "underscore": "_"
  };
  modifierToKeyMap[key] = key;
  return Object.keys(modifierToKeyMap).map((modifier) => {
    if (modifierToKeyMap[modifier] === key)
      return modifier;
  }).filter((modifier) => modifier);
}
directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let scopeTarget = el;
  if (modifiers.includes("parent")) {
    scopeTarget = findClosest(el, (element) => element !== el);
  }
  let evaluateGet = evaluateLater(scopeTarget, expression);
  let evaluateSet;
  if (typeof expression === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
  } else if (typeof expression === "function" && typeof expression() === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
  } else {
    evaluateSet = () => {
    };
  }
  let getValue = () => {
    let result;
    evaluateGet((value) => result = value);
    return isGetterSetter(result) ? result.get() : result;
  };
  let setValue = (value) => {
    let result;
    evaluateGet((value2) => result = value2);
    if (isGetterSetter(result)) {
      result.set(value);
    } else {
      evaluateSet(() => {
      }, {
        scope: { "__placeholder": value }
      });
    }
  };
  if (typeof expression === "string" && el.type === "radio") {
    mutateDom(() => {
      if (!el.hasAttribute("name"))
        el.setAttribute("name", expression);
    });
  }
  let hasChangeModifier = modifiers.includes("change") || modifiers.includes("lazy");
  let hasBlurModifier = modifiers.includes("blur");
  let hasEnterModifier = modifiers.includes("enter");
  let hasExplicitEventModifiers = hasChangeModifier || hasBlurModifier || hasEnterModifier;
  let removeListener;
  if (isCloning) {
    removeListener = () => {
    };
  } else if (hasExplicitEventModifiers) {
    let listeners = [];
    let syncValue = (e) => setValue(getInputValue(el, modifiers, e, getValue()));
    if (hasChangeModifier) {
      listeners.push(on(el, "change", modifiers, syncValue));
    }
    if (hasBlurModifier) {
      listeners.push(on(el, "blur", modifiers, syncValue));
      if (el.form) {
        let form = el.form;
        let syncCallback = () => syncValue({ target: el });
        if (!form._x_pendingModelUpdates)
          form._x_pendingModelUpdates = [];
        form._x_pendingModelUpdates.push(syncCallback);
        cleanup2(() => {
          if (form._x_pendingModelUpdates) {
            form._x_pendingModelUpdates.splice(form._x_pendingModelUpdates.indexOf(syncCallback), 1);
          }
        });
      }
    }
    if (hasEnterModifier) {
      listeners.push(on(el, "keydown", modifiers, (e) => {
        if (e.key === "Enter")
          syncValue(e);
      }));
    }
    removeListener = () => listeners.forEach((remove) => remove());
  } else {
    let event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) ? "change" : "input";
    removeListener = on(el, event, modifiers, (e) => {
      setValue(getInputValue(el, modifiers, e, getValue()));
    });
  }
  if (modifiers.includes("fill")) {
    if ([void 0, null, ""].includes(getValue()) || isCheckbox(el) && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
      setValue(
        getInputValue(el, modifiers, { target: el }, getValue())
      );
    }
  }
  if (!el._x_removeModelListeners)
    el._x_removeModelListeners = {};
  el._x_removeModelListeners["default"] = removeListener;
  cleanup2(() => el._x_removeModelListeners["default"]());
  if (el.form) {
    let removeResetListener = on(el.form, "reset", [], (e) => {
      nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
    });
    cleanup2(() => removeResetListener());
  }
  el._x_model = {
    get() {
      return getValue();
    },
    set(value) {
      setValue(value);
    },
    setWithModifiers: addDebounceOrThrottle(modifiers, setValue)
  };
  el._x_forceModelUpdate = (value) => {
    if (value === void 0 && typeof expression === "string" && expression.match(/\./))
      value = "";
    mutateDom(() => {
      if (isCheckbox(el)) {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => val == el.value);
        } else {
          el.checked = !!value;
        }
      } else if (isRadio(el)) {
        if (typeof value === "boolean") {
          el.checked = safeParseBoolean(el.value) === value;
        } else {
          el.checked = el.value == value;
        }
      } else {
        bind(el, "value", value);
      }
    });
  };
  effect3(() => {
    let value = getValue();
    if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
      return;
    el._x_forceModelUpdate(value);
  });
});
function getInputValue(el, modifiers, event, currentValue) {
  return mutateDom(() => {
    if (event instanceof CustomEvent && event.detail !== void 0)
      return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
    else if (isCheckbox(el)) {
      if (Array.isArray(currentValue)) {
        let newValue = null;
        if (modifiers.includes("number")) {
          newValue = safeParseNumber(event.target.value);
        } else if (modifiers.includes("boolean")) {
          newValue = safeParseBoolean(event.target.value);
        } else {
          newValue = event.target.value;
        }
        return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
      } else {
        return event.target.checked;
      }
    } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
      if (modifiers.includes("number")) {
        return Array.from(event.target.selectedOptions).map((option) => {
          let rawValue = option.value || option.text;
          return safeParseNumber(rawValue);
        });
      } else if (modifiers.includes("boolean")) {
        return Array.from(event.target.selectedOptions).map((option) => {
          let rawValue = option.value || option.text;
          return safeParseBoolean(rawValue);
        });
      }
      return Array.from(event.target.selectedOptions).map((option) => {
        return option.value || option.text;
      });
    } else {
      let newValue;
      if (isRadio(el)) {
        if (event.target.checked) {
          newValue = event.target.value;
        } else {
          newValue = currentValue;
        }
      } else {
        newValue = event.target.value;
      }
      if (modifiers.includes("number")) {
        return safeParseNumber(newValue);
      } else if (modifiers.includes("boolean")) {
        return safeParseBoolean(newValue);
      } else if (modifiers.includes("trim")) {
        return newValue.trim();
      } else {
        return newValue;
      }
    }
  });
}
function safeParseNumber(rawValue) {
  let number = rawValue ? parseFloat(rawValue) : null;
  return isNumeric2(number) ? number : rawValue;
}
function checkedAttrLooseCompare2(valueA, valueB) {
  return valueA == valueB;
}
function isNumeric2(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function isGetterSetter(value) {
  return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
}
directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
addInitSelector(() => `[${prefix("init")}]`);
directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "string") {
    return !!expression.trim() && evaluate2(expression, {}, false);
  }
  return evaluate2(expression, {}, false);
}));
directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.textContent = value;
      });
    });
  });
});
directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.innerHTML = value ?? "";
        el._x_ignoreSelf = true;
        initTree(el);
        delete el._x_ignoreSelf;
      });
    });
  });
});
mapAttributes(startingWith(":", into(prefix("bind:"))));
var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
  if (!value) {
    let bindingProviders = {};
    injectBindingProviders(bindingProviders);
    let getBindings = evaluateLater(el, expression);
    getBindings((bindings) => {
      applyBindingsObject(el, bindings, original);
    }, { scope: bindingProviders });
    return;
  }
  if (value === "key")
    return storeKeyForXFor(el, expression);
  if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
    return;
  }
  let evaluate2 = evaluateLater(el, expression);
  effect3(() => evaluate2((result) => {
    if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
      result = "";
    }
    mutateDom(() => bind(el, value, result, modifiers));
  }));
  cleanup2(() => {
    el._x_undoAddedClasses && el._x_undoAddedClasses();
    el._x_undoAddedStyles && el._x_undoAddedStyles();
  });
};
handler2.inline = (el, { value, modifiers, expression }) => {
  if (!value)
    return;
  if (!el._x_inlineBindings)
    el._x_inlineBindings = {};
  el._x_inlineBindings[value] = { expression, extract: false };
};
directive("bind", handler2);
function storeKeyForXFor(el, expression) {
  el._x_keyExpression = expression;
}
addRootSelector(() => `[${prefix("data")}]`);
directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
  if (shouldSkipRegisteringDataDuringClone(el))
    return;
  expression = expression === "" ? "{}" : expression;
  let magicContext = {};
  injectMagics(magicContext, el);
  let dataProviderContext = {};
  injectDataProviders(dataProviderContext, magicContext);
  let data2 = evaluate(el, expression, { scope: dataProviderContext });
  if (data2 === void 0 || data2 === true)
    data2 = {};
  injectMagics(data2, el);
  let reactiveData = reactive(data2);
  initInterceptors(reactiveData);
  let undo = addScopeToNode(el, reactiveData);
  reactiveData["init"] && evaluate(el, reactiveData["init"]);
  cleanup2(() => {
    reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
    undo();
  });
});
interceptClone((from, to) => {
  if (from._x_dataStack) {
    to._x_dataStack = from._x_dataStack;
    to.setAttribute("data-has-alpine-state", true);
  }
});
function shouldSkipRegisteringDataDuringClone(el) {
  if (!isCloning)
    return false;
  if (isCloningLegacy)
    return true;
  return el.hasAttribute("data-has-alpine-state");
}
directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
  let evaluate2 = evaluateLater(el, expression);
  if (!el._x_doHide)
    el._x_doHide = () => {
      mutateDom(() => {
        el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
      });
    };
  if (!el._x_doShow)
    el._x_doShow = () => {
      mutateDom(() => {
        if (el.style.length === 1 && el.style.display === "none") {
          el.removeAttribute("style");
        } else {
          el.style.removeProperty("display");
        }
      });
    };
  let hide = () => {
    el._x_doHide();
    el._x_isShown = false;
  };
  let show = () => {
    el._x_doShow();
    el._x_isShown = true;
  };
  let clickAwayCompatibleShow = () => setTimeout(show);
  let toggle = once(
    (value) => value ? show() : hide(),
    (value) => {
      if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
        el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
      } else {
        value ? clickAwayCompatibleShow() : hide();
      }
    }
  );
  let oldValue;
  let firstTime = true;
  effect3(() => evaluate2((value) => {
    if (!firstTime && value === oldValue)
      return;
    if (modifiers.includes("immediate"))
      value ? clickAwayCompatibleShow() : hide();
    toggle(value);
    oldValue = value;
    firstTime = false;
  }));
});
directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let iteratorNames = parseForExpression(expression);
  let evaluateItems = evaluateLater(el, iteratorNames.items);
  let evaluateKey = evaluateLater(
    el,
    // the x-bind:key expression is stored for our use instead of evaluated.
    el._x_keyExpression || "index"
  );
  el._x_lookup = /* @__PURE__ */ new Map();
  effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
  cleanup2(() => {
    el._x_lookup.forEach(
      (el2) => mutateDom(() => {
        destroyTree(el2);
        el2.remove();
      })
    );
    delete el._x_lookup;
  });
});
function refreshScope(scope2) {
  return (newScope) => {
    Object.entries(newScope).forEach(([key, value]) => {
      scope2[key] = value;
    });
  };
}
function loop(templateEl, iteratorNames, evaluateItems, evaluateKey) {
  evaluateItems((items) => {
    if (isNumeric3(items))
      items = Array.from({ length: items }, (_, i) => i + 1);
    if (items === void 0 || items === null)
      items = [];
    if (items instanceof Set)
      items = Array.from(items);
    if (items instanceof Map)
      items = Array.from(items);
    let oldLookup = templateEl._x_lookup;
    let lookup = /* @__PURE__ */ new Map();
    templateEl._x_lookup = lookup;
    let hasStringKeys = isObject2(items);
    let scopeEntries = Object.entries(items).map(([index, item]) => {
      if (!hasStringKeys)
        index = parseInt(index);
      let scope2 = getIterationScopeVariables(iteratorNames, item, index, items);
      let key;
      evaluateKey((innerKey) => {
        if (typeof innerKey === "object")
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        if (oldLookup.has(innerKey)) {
          lookup.set(innerKey, oldLookup.get(innerKey));
          oldLookup.delete(innerKey);
        }
        key = innerKey;
      }, { scope: { index, ...scope2 } });
      return [key, scope2];
    });
    mutateDom(() => {
      oldLookup.forEach((el) => {
        destroyTree(el);
        el.remove();
      });
      let added = /* @__PURE__ */ new Set();
      let prev = templateEl;
      scopeEntries.forEach(([key, scope2]) => {
        if (lookup.has(key)) {
          let el = lookup.get(key);
          el._x_refreshXForScope(scope2);
          if (prev.nextElementSibling !== el) {
            if (prev.nextElementSibling)
              el.replaceWith(prev.nextElementSibling);
            prev.after(el);
          }
          prev = el;
          if (el._x_currentIfEl) {
            if (el.nextElementSibling !== el._x_currentIfEl)
              prev.after(el._x_currentIfEl);
            prev = el._x_currentIfEl;
          }
          return;
        }
        if (templateEl.content.children.length > 1)
          warn("x-for templates require a single root element, additional elements will be ignored.", templateEl);
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        let reactiveScope = reactive(scope2);
        addScopeToNode(clone2, reactiveScope, templateEl);
        clone2._x_refreshXForScope = refreshScope(reactiveScope);
        lookup.set(key, clone2);
        added.add(clone2);
        prev.after(clone2);
        prev = clone2;
      });
      skipDuringClone(() => added.forEach((clone2) => initTree(clone2)))();
    });
  });
}
function parseForExpression(expression) {
  let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  let stripParensRE = /^\s*\(|\)\s*$/g;
  let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  let inMatch = expression.match(forAliasRE);
  if (!inMatch)
    return;
  let res = {};
  res.items = inMatch[2].trim();
  let item = inMatch[1].replace(stripParensRE, "").trim();
  let iteratorMatch = item.match(forIteratorRE);
  if (iteratorMatch) {
    res.item = item.replace(forIteratorRE, "").trim();
    res.index = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.collection = iteratorMatch[2].trim();
    }
  } else {
    res.item = item;
  }
  return res;
}
function getIterationScopeVariables(iteratorNames, item, index, items) {
  let scopeVariables = {};
  if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
    let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
    names.forEach((name, i) => {
      scopeVariables[name] = item[i];
    });
  } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
    let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
    names.forEach((name) => {
      scopeVariables[name] = item[name];
    });
  } else {
    scopeVariables[iteratorNames.item] = item;
  }
  if (iteratorNames.index)
    scopeVariables[iteratorNames.index] = index;
  if (iteratorNames.collection)
    scopeVariables[iteratorNames.collection] = items;
  return scopeVariables;
}
function isNumeric3(subject) {
  return typeof subject !== "object" && !isNaN(subject);
}
function isObject2(subject) {
  return typeof subject === "object" && !Array.isArray(subject);
}
function handler3() {
}
handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
  let root = closestRoot(el);
  if (!root)
    return;
  if (!root._x_refs)
    root._x_refs = {};
  root._x_refs[expression] = el;
  cleanup2(() => delete root._x_refs[expression]);
};
directive("ref", handler3);
directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-if can only be used on a <template> tag", el);
  let evaluate2 = evaluateLater(el, expression);
  let show = () => {
    if (el._x_currentIfEl)
      return el._x_currentIfEl;
    let clone2 = el.content.cloneNode(true).firstElementChild;
    addScopeToNode(clone2, {}, el);
    mutateDom(() => {
      el.after(clone2);
      skipDuringClone(() => initTree(clone2))();
    });
    el._x_currentIfEl = clone2;
    el._x_undoIf = () => {
      mutateDom(() => {
        destroyTree(clone2);
        clone2.remove();
      });
      delete el._x_currentIfEl;
    };
    return clone2;
  };
  let hide = () => {
    if (!el._x_undoIf)
      return;
    el._x_undoIf();
    delete el._x_undoIf;
  };
  effect3(() => evaluate2((value) => {
    value ? show() : hide();
  }));
  cleanup2(() => el._x_undoIf && el._x_undoIf());
});
directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
  let names = evaluate2(expression);
  names.forEach((name) => setIdRoot(el, name));
});
interceptClone((from, to) => {
  if (from._x_ids) {
    to._x_ids = from._x_ids;
  }
});
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
  let evaluate2 = expression ? evaluateLater(el, expression) : () => {
  };
  if (el.tagName.toLowerCase() === "template") {
    if (!el._x_forwardEvents)
      el._x_forwardEvents = [];
    if (!el._x_forwardEvents.includes(value))
      el._x_forwardEvents.push(value);
  }
  let removeListener = on(el, value, modifiers, (e) => {
    evaluate2(() => {
    }, { scope: { "$event": e }, params: [e] });
  });
  cleanup2(() => removeListener());
}));
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
function warnMissingPluginDirective(name, directiveName, slug) {
  directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setRawEvaluator(normalRawEvaluator);
alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
var src_default = alpine_default;
var module_default = src_default;

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/defaultAttributes.mjs
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/createElement.mjs
var createSVGElement = ([tag, attrs, children]) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.keys(attrs).forEach((name) => {
    element.setAttribute(name, String(attrs[name]));
  });
  if (children?.length) {
    children.forEach((child) => {
      const childElement = createSVGElement(child);
      element.appendChild(childElement);
    });
  }
  return element;
};
var createElement = (iconNode, customAttrs = {}) => {
  const tag = "svg";
  const attrs = {
    ...defaultAttributes,
    ...customAttrs
  };
  return createSVGElement([tag, attrs, iconNode]);
};

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/shared/src/utils/hasA11yProp.mjs
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/shared/src/utils/mergeClasses.mjs
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/shared/src/utils/toCamelCase.mjs
var toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/shared/src/utils/toPascalCase.mjs
var toPascalCase = (string) => {
  const camelCase3 = toCamelCase(string);
  return camelCase3.charAt(0).toUpperCase() + camelCase3.slice(1);
};

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/replaceElement.mjs
var getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
  attrs[attr.name] = attr.value;
  return attrs;
}, {});
var getClassNames = (attrs) => {
  if (typeof attrs === "string") return attrs;
  if (!attrs || !attrs.class) return "";
  if (attrs.class && typeof attrs.class === "string") {
    return attrs.class.split(" ");
  }
  if (attrs.class && Array.isArray(attrs.class)) {
    return attrs.class;
  }
  return "";
};
var replaceElement = (element, { nameAttr, icons, attrs }) => {
  const iconName = element.getAttribute(nameAttr);
  if (iconName == null) return;
  const ComponentName = toPascalCase(iconName);
  const iconNode = icons[ComponentName];
  if (!iconNode) {
    return console.warn(
      `${element.outerHTML} icon name was not found in the provided icons object.`
    );
  }
  const elementAttrs = getAttrs(element);
  const ariaProps = hasA11yProp(elementAttrs) ? {} : { "aria-hidden": "true" };
  const iconAttrs = {
    ...defaultAttributes,
    "data-lucide": iconName,
    ...ariaProps,
    ...attrs,
    ...elementAttrs
  };
  const elementClassNames = getClassNames(elementAttrs);
  const className = getClassNames(attrs);
  const classNames = mergeClasses(
    "lucide",
    `lucide-${iconName}`,
    ...elementClassNames,
    ...className
  );
  if (classNames) {
    Object.assign(iconAttrs, {
      class: classNames
    });
  }
  const svgElement = createElement(iconNode, iconAttrs);
  return element.parentNode?.replaceChild(svgElement, element);
};

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/iconsAndAliases.mjs
var iconsAndAliases_exports = {};
__export(iconsAndAliases_exports, {
  AArrowDown: () => AArrowDown,
  AArrowUp: () => AArrowUp,
  ALargeSmall: () => ALargeSmall,
  Accessibility: () => Accessibility,
  Activity: () => Activity,
  ActivitySquare: () => SquareActivity,
  Ad: () => Ad,
  AirVent: () => AirVent,
  Airplay: () => Airplay,
  AlarmCheck: () => AlarmClockCheck,
  AlarmClock: () => AlarmClock,
  AlarmClockCheck: () => AlarmClockCheck,
  AlarmClockMinus: () => AlarmClockMinus,
  AlarmClockOff: () => AlarmClockOff,
  AlarmClockPlus: () => AlarmClockPlus,
  AlarmMinus: () => AlarmClockMinus,
  AlarmPlus: () => AlarmClockPlus,
  AlarmSmoke: () => AlarmSmoke,
  Album: () => Album,
  AlertCircle: () => CircleAlert,
  AlertOctagon: () => OctagonAlert,
  AlertTriangle: () => TriangleAlert,
  AlignCenter: () => TextAlignCenter,
  AlignCenterHorizontal: () => AlignCenterHorizontal,
  AlignCenterVertical: () => AlignCenterVertical,
  AlignEndHorizontal: () => AlignEndHorizontal,
  AlignEndVertical: () => AlignEndVertical,
  AlignHorizontalDistributeCenter: () => AlignHorizontalDistributeCenter,
  AlignHorizontalDistributeEnd: () => AlignHorizontalDistributeEnd,
  AlignHorizontalDistributeStart: () => AlignHorizontalDistributeStart,
  AlignHorizontalJustifyCenter: () => AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd: () => AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart: () => AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround: () => AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween: () => AlignHorizontalSpaceBetween,
  AlignJustify: () => TextAlignJustify,
  AlignLeft: () => TextAlignStart,
  AlignRight: () => TextAlignEnd,
  AlignStartHorizontal: () => AlignStartHorizontal,
  AlignStartVertical: () => AlignStartVertical,
  AlignVerticalDistributeCenter: () => AlignVerticalDistributeCenter,
  AlignVerticalDistributeEnd: () => AlignVerticalDistributeEnd,
  AlignVerticalDistributeStart: () => AlignVerticalDistributeStart,
  AlignVerticalJustifyCenter: () => AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd: () => AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart: () => AlignVerticalJustifyStart,
  AlignVerticalSpaceAround: () => AlignVerticalSpaceAround,
  AlignVerticalSpaceBetween: () => AlignVerticalSpaceBetween,
  Ambulance: () => Ambulance,
  Ampersand: () => Ampersand,
  Ampersands: () => Ampersands,
  Amphora: () => Amphora,
  Anchor: () => Anchor,
  Angry: () => Angry,
  Annoyed: () => Annoyed,
  Antenna: () => Antenna,
  Anvil: () => Anvil,
  Aperture: () => Aperture,
  AppWindow: () => AppWindow,
  AppWindowMac: () => AppWindowMac,
  Apple: () => Apple,
  Archive: () => Archive,
  ArchiveRestore: () => ArchiveRestore,
  ArchiveX: () => ArchiveX,
  AreaChart: () => ChartArea,
  Armchair: () => Armchair,
  ArrowBigDown: () => ArrowBigDown,
  ArrowBigDownDash: () => ArrowBigDownDash,
  ArrowBigLeft: () => ArrowBigLeft,
  ArrowBigLeftDash: () => ArrowBigLeftDash,
  ArrowBigRight: () => ArrowBigRight,
  ArrowBigRightDash: () => ArrowBigRightDash,
  ArrowBigUp: () => ArrowBigUp,
  ArrowBigUpDash: () => ArrowBigUpDash,
  ArrowDown: () => ArrowDown,
  ArrowDown01: () => ArrowDown01,
  ArrowDown10: () => ArrowDown10,
  ArrowDownAZ: () => ArrowDownAZ,
  ArrowDownAz: () => ArrowDownAZ,
  ArrowDownCircle: () => CircleArrowDown,
  ArrowDownFromLine: () => ArrowDownFromLine,
  ArrowDownLeft: () => ArrowDownLeft,
  ArrowDownLeftFromCircle: () => CircleArrowOutDownLeft,
  ArrowDownLeftFromSquare: () => SquareArrowOutDownLeft,
  ArrowDownLeftSquare: () => SquareArrowDownLeft,
  ArrowDownNarrowWide: () => ArrowDownNarrowWide,
  ArrowDownRight: () => ArrowDownRight,
  ArrowDownRightFromCircle: () => CircleArrowOutDownRight,
  ArrowDownRightFromSquare: () => SquareArrowOutDownRight,
  ArrowDownRightSquare: () => SquareArrowDownRight,
  ArrowDownSquare: () => SquareArrowDown,
  ArrowDownToDot: () => ArrowDownToDot,
  ArrowDownToLine: () => ArrowDownToLine,
  ArrowDownUp: () => ArrowDownUp,
  ArrowDownWideNarrow: () => ArrowDownWideNarrow,
  ArrowDownZA: () => ArrowDownZA,
  ArrowDownZa: () => ArrowDownZA,
  ArrowLeft: () => ArrowLeft,
  ArrowLeftCircle: () => CircleArrowLeft,
  ArrowLeftFromLine: () => ArrowLeftFromLine,
  ArrowLeftRight: () => ArrowLeftRight,
  ArrowLeftSquare: () => SquareArrowLeft,
  ArrowLeftToLine: () => ArrowLeftToLine,
  ArrowRight: () => ArrowRight,
  ArrowRightCircle: () => CircleArrowRight,
  ArrowRightFromLine: () => ArrowRightFromLine,
  ArrowRightLeft: () => ArrowRightLeft,
  ArrowRightSquare: () => SquareArrowRight,
  ArrowRightToLine: () => ArrowRightToLine,
  ArrowUp: () => ArrowUp,
  ArrowUp01: () => ArrowUp01,
  ArrowUp10: () => ArrowUp10,
  ArrowUpAZ: () => ArrowUpAZ,
  ArrowUpAz: () => ArrowUpAZ,
  ArrowUpCircle: () => CircleArrowUp,
  ArrowUpDown: () => ArrowUpDown,
  ArrowUpFromDot: () => ArrowUpFromDot,
  ArrowUpFromLine: () => ArrowUpFromLine,
  ArrowUpLeft: () => ArrowUpLeft,
  ArrowUpLeftFromCircle: () => CircleArrowOutUpLeft,
  ArrowUpLeftFromSquare: () => SquareArrowOutUpLeft,
  ArrowUpLeftSquare: () => SquareArrowUpLeft,
  ArrowUpNarrowWide: () => ArrowUpNarrowWide,
  ArrowUpRight: () => ArrowUpRight,
  ArrowUpRightFromCircle: () => CircleArrowOutUpRight,
  ArrowUpRightFromSquare: () => SquareArrowOutUpRight,
  ArrowUpRightSquare: () => SquareArrowUpRight,
  ArrowUpSquare: () => SquareArrowUp,
  ArrowUpToLine: () => ArrowUpToLine,
  ArrowUpWideNarrow: () => ArrowUpWideNarrow,
  ArrowUpZA: () => ArrowUpZA,
  ArrowUpZa: () => ArrowUpZA,
  ArrowsUpFromLine: () => ArrowsUpFromLine,
  Asterisk: () => Asterisk,
  AsteriskSquare: () => SquareAsterisk,
  Astroid: () => Astroid,
  AtSign: () => AtSign,
  Atom: () => Atom,
  AudioLines: () => AudioLines,
  AudioWaveform: () => AudioWaveform,
  Award: () => Award,
  Axe: () => Axe,
  Axis3D: () => Axis3d,
  Axis3d: () => Axis3d,
  Baby: () => Baby,
  Backpack: () => Backpack,
  Badge: () => Badge,
  BadgeAlert: () => BadgeAlert,
  BadgeCent: () => BadgeCent,
  BadgeCheck: () => BadgeCheck,
  BadgeDollarSign: () => BadgeDollarSign,
  BadgeEuro: () => BadgeEuro,
  BadgeHelp: () => BadgeQuestionMark,
  BadgeIndianRupee: () => BadgeIndianRupee,
  BadgeInfo: () => BadgeInfo,
  BadgeJapaneseYen: () => BadgeJapaneseYen,
  BadgeMinus: () => BadgeMinus,
  BadgePercent: () => BadgePercent,
  BadgePlus: () => BadgePlus,
  BadgePoundSterling: () => BadgePoundSterling,
  BadgeQuestionMark: () => BadgeQuestionMark,
  BadgeRussianRuble: () => BadgeRussianRuble,
  BadgeSwissFranc: () => BadgeSwissFranc,
  BadgeTurkishLira: () => BadgeTurkishLira,
  BadgeX: () => BadgeX,
  BaggageClaim: () => BaggageClaim,
  Balloon: () => Balloon,
  Ban: () => Ban,
  Banana: () => Banana,
  Bandage: () => Bandage,
  Banknote: () => Banknote,
  BanknoteArrowDown: () => BanknoteArrowDown,
  BanknoteArrowUp: () => BanknoteArrowUp,
  BanknoteCheck: () => BanknoteCheck,
  BanknoteX: () => BanknoteX,
  BarChart: () => ChartNoAxesColumnIncreasing,
  BarChart2: () => ChartNoAxesColumn,
  BarChart3: () => ChartColumn,
  BarChart4: () => ChartColumnIncreasing,
  BarChartBig: () => ChartColumnBig,
  BarChartHorizontal: () => ChartBar,
  BarChartHorizontalBig: () => ChartBarBig,
  Barcode: () => Barcode,
  Barrel: () => Barrel,
  Baseline: () => Baseline,
  Bath: () => Bath,
  Battery: () => Battery,
  BatteryCharging: () => BatteryCharging,
  BatteryFull: () => BatteryFull,
  BatteryLow: () => BatteryLow,
  BatteryMedium: () => BatteryMedium,
  BatteryPlus: () => BatteryPlus,
  BatteryWarning: () => BatteryWarning,
  Beaker: () => Beaker,
  Bean: () => Bean,
  BeanOff: () => BeanOff,
  Bed: () => Bed,
  BedDouble: () => BedDouble,
  BedSingle: () => BedSingle,
  Beef: () => Beef,
  BeefOff: () => BeefOff,
  Beer: () => Beer,
  BeerOff: () => BeerOff,
  Bell: () => Bell,
  BellCheck: () => BellCheck,
  BellDot: () => BellDot,
  BellElectric: () => BellElectric,
  BellMinus: () => BellMinus,
  BellOff: () => BellOff,
  BellPlus: () => BellPlus,
  BellRing: () => BellRing,
  BetweenHorizonalEnd: () => BetweenHorizontalEnd,
  BetweenHorizonalStart: () => BetweenHorizontalStart,
  BetweenHorizontalEnd: () => BetweenHorizontalEnd,
  BetweenHorizontalStart: () => BetweenHorizontalStart,
  BetweenVerticalEnd: () => BetweenVerticalEnd,
  BetweenVerticalStart: () => BetweenVerticalStart,
  BicepsFlexed: () => BicepsFlexed,
  Bike: () => Bike,
  Binary: () => Binary,
  Binoculars: () => Binoculars,
  Biohazard: () => Biohazard,
  Bird: () => Bird,
  Birdhouse: () => Birdhouse,
  Bitcoin: () => Bitcoin,
  Blend: () => Blend,
  Blender: () => Blender,
  Blinds: () => Blinds,
  Blocks: () => Blocks,
  Bluetooth: () => Bluetooth,
  BluetoothConnected: () => BluetoothConnected,
  BluetoothOff: () => BluetoothOff,
  BluetoothSearching: () => BluetoothSearching,
  Bold: () => Bold,
  Bolt: () => Bolt,
  Bomb: () => Bomb,
  Bone: () => Bone,
  BoneFracture: () => BoneFracture,
  Book: () => Book,
  BookA: () => BookA,
  BookAlert: () => BookAlert,
  BookAudio: () => BookAudio,
  BookCheck: () => BookCheck,
  BookCopy: () => BookCopy,
  BookDashed: () => BookDashed,
  BookDown: () => BookDown,
  BookHeadphones: () => BookHeadphones,
  BookHeart: () => BookHeart,
  BookImage: () => BookImage,
  BookKey: () => BookKey,
  BookLock: () => BookLock,
  BookMarked: () => BookMarked,
  BookMinus: () => BookMinus,
  BookOpen: () => BookOpen,
  BookOpenCheck: () => BookOpenCheck,
  BookOpenText: () => BookOpenText,
  BookPlus: () => BookPlus,
  BookSearch: () => BookSearch,
  BookTemplate: () => BookDashed,
  BookText: () => BookText,
  BookType: () => BookType,
  BookUp: () => BookUp,
  BookUp2: () => BookUp2,
  BookUser: () => BookUser,
  BookX: () => BookX,
  Bookmark: () => Bookmark,
  BookmarkCheck: () => BookmarkCheck,
  BookmarkMinus: () => BookmarkMinus,
  BookmarkOff: () => BookmarkOff,
  BookmarkPlus: () => BookmarkPlus,
  BookmarkX: () => BookmarkX,
  BoomBox: () => BoomBox,
  Bot: () => Bot,
  BotMessageSquare: () => BotMessageSquare,
  BotOff: () => BotOff,
  BottleWine: () => BottleWine,
  BowArrow: () => BowArrow,
  Box: () => Box,
  BoxSelect: () => SquareDashed,
  Boxes: () => Boxes,
  Braces: () => Braces,
  Brackets: () => Brackets,
  Brain: () => Brain,
  BrainCircuit: () => BrainCircuit,
  BrainCog: () => BrainCog,
  BrickWall: () => BrickWall,
  BrickWallFire: () => BrickWallFire,
  BrickWallShield: () => BrickWallShield,
  Briefcase: () => Briefcase,
  BriefcaseBusiness: () => BriefcaseBusiness,
  BriefcaseConveyorBelt: () => BriefcaseConveyorBelt,
  BriefcaseMedical: () => BriefcaseMedical,
  BringToFront: () => BringToFront,
  Broccoli: () => Broccoli,
  Brush: () => Brush,
  BrushCleaning: () => BrushCleaning,
  Bubbles: () => Bubbles,
  Bug: () => Bug,
  BugOff: () => BugOff,
  BugPlay: () => BugPlay,
  Building: () => Building,
  Building2: () => Building2,
  Bus: () => Bus,
  BusFront: () => BusFront,
  Cable: () => Cable,
  CableCar: () => CableCar,
  Cake: () => Cake,
  CakeSlice: () => CakeSlice,
  Calculator: () => Calculator,
  Calendar: () => Calendar,
  Calendar1: () => Calendar1,
  CalendarArrowDown: () => CalendarArrowDown,
  CalendarArrowUp: () => CalendarArrowUp,
  CalendarCheck: () => CalendarCheck,
  CalendarCheck2: () => CalendarCheck2,
  CalendarClock: () => CalendarClock,
  CalendarCog: () => CalendarCog,
  CalendarDays: () => CalendarDays,
  CalendarFold: () => CalendarFold,
  CalendarHeart: () => CalendarHeart,
  CalendarMinus: () => CalendarMinus,
  CalendarMinus2: () => CalendarMinus2,
  CalendarOff: () => CalendarOff,
  CalendarPlus: () => CalendarPlus,
  CalendarPlus2: () => CalendarPlus2,
  CalendarRange: () => CalendarRange,
  CalendarSearch: () => CalendarSearch,
  CalendarSync: () => CalendarSync,
  CalendarX: () => CalendarX,
  CalendarX2: () => CalendarX2,
  Calendars: () => Calendars,
  Camera: () => Camera,
  CameraOff: () => CameraOff,
  CandlestickChart: () => ChartCandlestick,
  Candy: () => Candy,
  CandyCane: () => CandyCane,
  CandyOff: () => CandyOff,
  Cannabis: () => Cannabis,
  CannabisOff: () => CannabisOff,
  Captions: () => Captions,
  CaptionsOff: () => CaptionsOff,
  Car: () => Car,
  CarFront: () => CarFront,
  CarTaxiFront: () => CarTaxiFront,
  Caravan: () => Caravan,
  CardSim: () => CardSim,
  Carrot: () => Carrot,
  CaseLower: () => CaseLower,
  CaseSensitive: () => CaseSensitive,
  CaseUpper: () => CaseUpper,
  CassetteTape: () => CassetteTape,
  Cast: () => Cast,
  Castle: () => Castle,
  Cat: () => Cat,
  Cctv: () => Cctv,
  CctvOff: () => CctvOff,
  ChartArea: () => ChartArea,
  ChartBar: () => ChartBar,
  ChartBarBig: () => ChartBarBig,
  ChartBarDecreasing: () => ChartBarDecreasing,
  ChartBarIncreasing: () => ChartBarIncreasing,
  ChartBarStacked: () => ChartBarStacked,
  ChartCandlestick: () => ChartCandlestick,
  ChartColumn: () => ChartColumn,
  ChartColumnBig: () => ChartColumnBig,
  ChartColumnDecreasing: () => ChartColumnDecreasing,
  ChartColumnIncreasing: () => ChartColumnIncreasing,
  ChartColumnStacked: () => ChartColumnStacked,
  ChartGantt: () => ChartGantt,
  ChartLine: () => ChartLine,
  ChartNetwork: () => ChartNetwork,
  ChartNoAxesColumn: () => ChartNoAxesColumn,
  ChartNoAxesColumnDecreasing: () => ChartNoAxesColumnDecreasing,
  ChartNoAxesColumnIncreasing: () => ChartNoAxesColumnIncreasing,
  ChartNoAxesCombined: () => ChartNoAxesCombined,
  ChartNoAxesGantt: () => ChartNoAxesGantt,
  ChartPie: () => ChartPie,
  ChartScatter: () => ChartScatter,
  ChartSpline: () => ChartSpline,
  Check: () => Check,
  CheckCheck: () => CheckCheck,
  CheckCircle: () => CircleCheckBig,
  CheckCircle2: () => CircleCheck,
  CheckLine: () => CheckLine,
  CheckSquare: () => SquareCheckBig,
  CheckSquare2: () => SquareCheck,
  ChefHat: () => ChefHat,
  Cherry: () => Cherry,
  ChessBishop: () => ChessBishop,
  ChessKing: () => ChessKing,
  ChessKnight: () => ChessKnight,
  ChessPawn: () => ChessPawn,
  ChessQueen: () => ChessQueen,
  ChessRook: () => ChessRook,
  ChevronDown: () => ChevronDown,
  ChevronDownCircle: () => CircleChevronDown,
  ChevronDownSquare: () => SquareChevronDown,
  ChevronFirst: () => ChevronFirst,
  ChevronLast: () => ChevronLast,
  ChevronLeft: () => ChevronLeft,
  ChevronLeftCircle: () => CircleChevronLeft,
  ChevronLeftSquare: () => SquareChevronLeft,
  ChevronRight: () => ChevronRight,
  ChevronRightCircle: () => CircleChevronRight,
  ChevronRightSquare: () => SquareChevronRight,
  ChevronUp: () => ChevronUp,
  ChevronUpCircle: () => CircleChevronUp,
  ChevronUpSquare: () => SquareChevronUp,
  ChevronsDown: () => ChevronsDown,
  ChevronsDownUp: () => ChevronsDownUp,
  ChevronsLeft: () => ChevronsLeft,
  ChevronsLeftRight: () => ChevronsLeftRight,
  ChevronsLeftRightEllipsis: () => ChevronsLeftRightEllipsis,
  ChevronsRight: () => ChevronsRight,
  ChevronsRightLeft: () => ChevronsRightLeft,
  ChevronsUp: () => ChevronsUp,
  ChevronsUpDown: () => ChevronsUpDown,
  Church: () => Church,
  Cigarette: () => Cigarette,
  CigaretteOff: () => CigaretteOff,
  Circle: () => Circle,
  CircleAlert: () => CircleAlert,
  CircleArrowDown: () => CircleArrowDown,
  CircleArrowLeft: () => CircleArrowLeft,
  CircleArrowOutDownLeft: () => CircleArrowOutDownLeft,
  CircleArrowOutDownRight: () => CircleArrowOutDownRight,
  CircleArrowOutUpLeft: () => CircleArrowOutUpLeft,
  CircleArrowOutUpRight: () => CircleArrowOutUpRight,
  CircleArrowRight: () => CircleArrowRight,
  CircleArrowUp: () => CircleArrowUp,
  CircleCheck: () => CircleCheck,
  CircleCheckBig: () => CircleCheckBig,
  CircleChevronDown: () => CircleChevronDown,
  CircleChevronLeft: () => CircleChevronLeft,
  CircleChevronRight: () => CircleChevronRight,
  CircleChevronUp: () => CircleChevronUp,
  CircleDashed: () => CircleDashed,
  CircleDivide: () => CircleDivide,
  CircleDollarSign: () => CircleDollarSign,
  CircleDot: () => CircleDot,
  CircleDotDashed: () => CircleDotDashed,
  CircleEllipsis: () => CircleEllipsis,
  CircleEqual: () => CircleEqual,
  CircleEuroSign: () => CircleEuroSign,
  CircleFadingArrowUp: () => CircleFadingArrowUp,
  CircleFadingPlus: () => CircleFadingPlus,
  CircleGauge: () => CircleGauge,
  CircleHelp: () => CircleQuestionMark,
  CircleMinus: () => CircleMinus,
  CircleOff: () => CircleOff,
  CircleParking: () => CircleParking,
  CircleParkingOff: () => CircleParkingOff,
  CirclePause: () => CirclePause,
  CirclePercent: () => CirclePercent,
  CirclePile: () => CirclePile,
  CirclePlay: () => CirclePlay,
  CirclePlus: () => CirclePlus,
  CirclePoundSterling: () => CirclePoundSterling,
  CirclePower: () => CirclePower,
  CircleQuestionMark: () => CircleQuestionMark,
  CircleSlash: () => CircleSlash,
  CircleSlash2: () => CircleSlash2,
  CircleSlashed: () => CircleSlash2,
  CircleSmall: () => CircleSmall,
  CircleStar: () => CircleStar,
  CircleStop: () => CircleStop,
  CircleUser: () => CircleUser,
  CircleUserRound: () => CircleUserRound,
  CircleX: () => CircleX,
  CircuitBoard: () => CircuitBoard,
  Citrus: () => Citrus,
  Clapperboard: () => Clapperboard,
  Clipboard: () => Clipboard,
  ClipboardCheck: () => ClipboardCheck,
  ClipboardClock: () => ClipboardClock,
  ClipboardCopy: () => ClipboardCopy,
  ClipboardEdit: () => ClipboardPen,
  ClipboardList: () => ClipboardList,
  ClipboardMinus: () => ClipboardMinus,
  ClipboardPaste: () => ClipboardPaste,
  ClipboardPen: () => ClipboardPen,
  ClipboardPenLine: () => ClipboardPenLine,
  ClipboardPlus: () => ClipboardPlus,
  ClipboardSignature: () => ClipboardPenLine,
  ClipboardType: () => ClipboardType,
  ClipboardX: () => ClipboardX,
  Clock: () => Clock,
  Clock1: () => Clock1,
  Clock10: () => Clock10,
  Clock11: () => Clock11,
  Clock12: () => Clock12,
  Clock2: () => Clock2,
  Clock3: () => Clock3,
  Clock4: () => Clock4,
  Clock5: () => Clock5,
  Clock6: () => Clock6,
  Clock7: () => Clock7,
  Clock8: () => Clock8,
  Clock9: () => Clock9,
  ClockAlert: () => ClockAlert,
  ClockArrowDown: () => ClockArrowDown,
  ClockArrowLeft: () => ClockArrowLeft,
  ClockArrowRight: () => ClockArrowRight,
  ClockArrowUp: () => ClockArrowUp,
  ClockCheck: () => ClockCheck,
  ClockFading: () => ClockFading,
  ClockPlus: () => ClockPlus,
  ClosedCaption: () => ClosedCaption,
  Cloud: () => Cloud,
  CloudAlert: () => CloudAlert,
  CloudBackup: () => CloudBackup,
  CloudCheck: () => CloudCheck,
  CloudCog: () => CloudCog,
  CloudDownload: () => CloudDownload,
  CloudDrizzle: () => CloudDrizzle,
  CloudFog: () => CloudFog,
  CloudHail: () => CloudHail,
  CloudLightning: () => CloudLightning,
  CloudMoon: () => CloudMoon,
  CloudMoonRain: () => CloudMoonRain,
  CloudOff: () => CloudOff,
  CloudRain: () => CloudRain,
  CloudRainWind: () => CloudRainWind,
  CloudSnow: () => CloudSnow,
  CloudSun: () => CloudSun,
  CloudSunRain: () => CloudSunRain,
  CloudSync: () => CloudSync,
  CloudUpload: () => CloudUpload,
  Cloudy: () => Cloudy,
  Clover: () => Clover,
  Club: () => Club,
  Code: () => Code,
  Code2: () => CodeXml,
  CodeSquare: () => SquareCode,
  CodeXml: () => CodeXml,
  Coffee: () => Coffee,
  Cog: () => Cog,
  Coins: () => Coins,
  Columns: () => Columns2,
  Columns2: () => Columns2,
  Columns3: () => Columns3,
  Columns3Cog: () => Columns3Cog,
  Columns4: () => Columns4,
  ColumnsSettings: () => Columns3Cog,
  Combine: () => Combine,
  Command: () => Command,
  Compass: () => Compass,
  Component: () => Component,
  Computer: () => Computer,
  ConciergeBell: () => ConciergeBell,
  Cone: () => Cone,
  Construction: () => Construction,
  Contact: () => Contact,
  Contact2: () => ContactRound,
  ContactRound: () => ContactRound,
  Container: () => Container,
  Contrast: () => Contrast,
  Cookie: () => Cookie,
  CookingPot: () => CookingPot,
  Copy: () => Copy,
  CopyCheck: () => CopyCheck,
  CopyMinus: () => CopyMinus,
  CopyPlus: () => CopyPlus,
  CopySlash: () => CopySlash,
  CopyX: () => CopyX,
  Copyleft: () => Copyleft,
  Copyright: () => Copyright,
  CornerDownLeft: () => CornerDownLeft,
  CornerDownRight: () => CornerDownRight,
  CornerLeftDown: () => CornerLeftDown,
  CornerLeftUp: () => CornerLeftUp,
  CornerRightDown: () => CornerRightDown,
  CornerRightUp: () => CornerRightUp,
  CornerUpLeft: () => CornerUpLeft,
  CornerUpRight: () => CornerUpRight,
  Cpu: () => Cpu,
  CreativeCommons: () => CreativeCommons,
  CreditCard: () => CreditCard,
  Croissant: () => Croissant,
  Crop: () => Crop,
  Cross: () => Cross,
  Crosshair: () => Crosshair,
  Crown: () => Crown,
  Cuboid: () => Cuboid,
  CupSoda: () => CupSoda,
  CurlyBraces: () => Braces,
  Currency: () => Currency,
  Cylinder: () => Cylinder,
  Dam: () => Dam,
  Database: () => Database,
  DatabaseArrowDown: () => DatabaseArrowDown,
  DatabaseArrowUp: () => DatabaseArrowUp,
  DatabaseBackup: () => DatabaseBackup,
  DatabaseCheck: () => DatabaseCheck,
  DatabaseMinus: () => DatabaseMinus,
  DatabasePlus: () => DatabasePlus,
  DatabaseSearch: () => DatabaseSearch,
  DatabaseX: () => DatabaseX,
  DatabaseZap: () => DatabaseZap,
  DecimalsArrowLeft: () => DecimalsArrowLeft,
  DecimalsArrowRight: () => DecimalsArrowRight,
  Delete: () => Delete,
  Dessert: () => Dessert,
  Diameter: () => Diameter,
  Diamond: () => Diamond,
  DiamondMinus: () => DiamondMinus,
  DiamondPercent: () => DiamondPercent,
  DiamondPlus: () => DiamondPlus,
  Dice1: () => Dice1,
  Dice2: () => Dice2,
  Dice3: () => Dice3,
  Dice4: () => Dice4,
  Dice5: () => Dice5,
  Dice6: () => Dice6,
  Dices: () => Dices,
  Diff: () => Diff,
  Disc: () => Disc,
  Disc2: () => Disc2,
  Disc3: () => Disc3,
  DiscAlbum: () => DiscAlbum,
  Divide: () => Divide,
  DivideCircle: () => CircleDivide,
  DivideSquare: () => SquareDivide,
  Dna: () => Dna,
  DnaOff: () => DnaOff,
  Dock: () => Dock,
  Dog: () => Dog,
  DollarSign: () => DollarSign,
  Donut: () => Donut,
  DoorClosed: () => DoorClosed,
  DoorClosedLocked: () => DoorClosedLocked,
  DoorOpen: () => DoorOpen,
  Dot: () => Dot,
  DotSquare: () => SquareDot,
  Download: () => Download,
  DownloadCloud: () => CloudDownload,
  DraftingCompass: () => DraftingCompass,
  Drama: () => Drama,
  Drill: () => Drill,
  Drone: () => Drone,
  Droplet: () => Droplet,
  DropletOff: () => DropletOff,
  Droplets: () => Droplets,
  Drum: () => Drum,
  Drumstick: () => Drumstick,
  Dumbbell: () => Dumbbell,
  Ear: () => Ear,
  EarOff: () => EarOff,
  Earth: () => Earth,
  EarthLock: () => EarthLock,
  Eclipse: () => Eclipse,
  Edit: () => SquarePen,
  Edit2: () => Pen,
  Edit3: () => PenLine,
  Egg: () => Egg,
  EggFried: () => EggFried,
  EggOff: () => EggOff,
  Ellipse: () => Ellipse,
  Ellipsis: () => Ellipsis,
  EllipsisVertical: () => EllipsisVertical,
  Equal: () => Equal,
  EqualApproximately: () => EqualApproximately,
  EqualNot: () => EqualNot,
  EqualSquare: () => SquareEqual,
  Eraser: () => Eraser,
  EthernetPort: () => EthernetPort,
  Euro: () => Euro,
  EvCharger: () => EvCharger,
  Expand: () => Expand,
  ExternalLink: () => ExternalLink,
  Eye: () => Eye,
  EyeClosed: () => EyeClosed,
  EyeDashed: () => EyeDashed,
  EyeOff: () => EyeOff,
  Factory: () => Factory,
  Fan: () => Fan,
  FastForward: () => FastForward,
  Feather: () => Feather,
  Fence: () => Fence,
  FerrisWheel: () => FerrisWheel,
  File: () => File2,
  FileArchive: () => FileArchive,
  FileAudio: () => FileHeadphone,
  FileAudio2: () => FileHeadphone,
  FileAxis3D: () => FileAxis3d,
  FileAxis3d: () => FileAxis3d,
  FileBadge: () => FileBadge,
  FileBadge2: () => FileBadge,
  FileBarChart: () => FileChartColumnIncreasing,
  FileBarChart2: () => FileChartColumn,
  FileBox: () => FileBox,
  FileBraces: () => FileBraces,
  FileBracesCorner: () => FileBracesCorner,
  FileChartColumn: () => FileChartColumn,
  FileChartColumnIncreasing: () => FileChartColumnIncreasing,
  FileChartLine: () => FileChartLine,
  FileChartPie: () => FileChartPie,
  FileCheck: () => FileCheck,
  FileCheck2: () => FileCheckCorner,
  FileCheckCorner: () => FileCheckCorner,
  FileClock: () => FileClock,
  FileCode: () => FileCode,
  FileCode2: () => FileCodeCorner,
  FileCodeCorner: () => FileCodeCorner,
  FileCog: () => FileCog,
  FileCog2: () => FileCog,
  FileDiff: () => FileDiff,
  FileDigit: () => FileDigit,
  FileDown: () => FileDown,
  FileEdit: () => FilePen,
  FileExclamationPoint: () => FileExclamationPoint,
  FileHeadphone: () => FileHeadphone,
  FileHeart: () => FileHeart,
  FileImage: () => FileImage,
  FileInput: () => FileInput,
  FileJson: () => FileBraces,
  FileJson2: () => FileBracesCorner,
  FileKey: () => FileKey,
  FileKey2: () => FileKey,
  FileLineChart: () => FileChartLine,
  FileLock: () => FileLock,
  FileLock2: () => FileLock,
  FileMinus: () => FileMinus,
  FileMinus2: () => FileMinusCorner,
  FileMinusCorner: () => FileMinusCorner,
  FileMusic: () => FileMusic,
  FileOutput: () => FileOutput,
  FilePen: () => FilePen,
  FilePenLine: () => FilePenLine,
  FilePieChart: () => FileChartPie,
  FilePlay: () => FilePlay,
  FilePlus: () => FilePlus,
  FilePlus2: () => FilePlusCorner,
  FilePlusCorner: () => FilePlusCorner,
  FileQuestion: () => FileQuestionMark,
  FileQuestionMark: () => FileQuestionMark,
  FileScan: () => FileScan,
  FileSearch: () => FileSearch,
  FileSearch2: () => FileSearchCorner,
  FileSearchCorner: () => FileSearchCorner,
  FileSignal: () => FileSignal,
  FileSignature: () => FilePenLine,
  FileSliders: () => FileSliders,
  FileSpreadsheet: () => FileSpreadsheet,
  FileStack: () => FileStack,
  FileSymlink: () => FileSymlink,
  FileTerminal: () => FileTerminal,
  FileText: () => FileText,
  FileType: () => FileType,
  FileType2: () => FileTypeCorner,
  FileTypeCorner: () => FileTypeCorner,
  FileUp: () => FileUp,
  FileUser: () => FileUser,
  FileVideo: () => FilePlay,
  FileVideo2: () => FileVideoCamera,
  FileVideoCamera: () => FileVideoCamera,
  FileVolume: () => FileVolume,
  FileVolume2: () => FileSignal,
  FileWarning: () => FileExclamationPoint,
  FileX: () => FileX,
  FileX2: () => FileXCorner,
  FileXCorner: () => FileXCorner,
  Files: () => Files,
  Film: () => Film,
  Filter: () => Funnel,
  FilterX: () => FunnelX,
  Fingerprint: () => FingerprintPattern,
  FingerprintPattern: () => FingerprintPattern,
  FireExtinguisher: () => FireExtinguisher,
  Fish: () => Fish,
  FishOff: () => FishOff,
  FishSymbol: () => FishSymbol,
  FishingHook: () => FishingHook,
  FishingRod: () => FishingRod,
  Flag: () => Flag,
  FlagOff: () => FlagOff,
  FlagTriangleLeft: () => FlagTriangleLeft,
  FlagTriangleRight: () => FlagTriangleRight,
  Flame: () => Flame,
  FlameKindling: () => FlameKindling,
  Flashlight: () => Flashlight,
  FlashlightOff: () => FlashlightOff,
  FlaskConical: () => FlaskConical,
  FlaskConicalOff: () => FlaskConicalOff,
  FlaskRound: () => FlaskRound,
  FlipHorizontal: () => SquareCenterlineDashedHorizontal,
  FlipHorizontal2: () => FlipHorizontal2,
  FlipVertical: () => SquareCenterlineDashedVertical,
  FlipVertical2: () => FlipVertical2,
  Flower: () => Flower,
  Flower2: () => Flower2,
  Focus: () => Focus,
  FoldHorizontal: () => FoldHorizontal,
  FoldVertical: () => FoldVertical,
  Folder: () => Folder,
  FolderArchive: () => FolderArchive,
  FolderBookmark: () => FolderBookmark,
  FolderCheck: () => FolderCheck,
  FolderClock: () => FolderClock,
  FolderClosed: () => FolderClosed,
  FolderCode: () => FolderCode,
  FolderCog: () => FolderCog,
  FolderCog2: () => FolderCog,
  FolderDot: () => FolderDot,
  FolderDown: () => FolderDown,
  FolderEdit: () => FolderPen,
  FolderGit: () => FolderGit,
  FolderGit2: () => FolderGit2,
  FolderHeart: () => FolderHeart,
  FolderInput: () => FolderInput,
  FolderKanban: () => FolderKanban,
  FolderKey: () => FolderKey,
  FolderLock: () => FolderLock,
  FolderMinus: () => FolderMinus,
  FolderOpen: () => FolderOpen,
  FolderOpenDot: () => FolderOpenDot,
  FolderOutput: () => FolderOutput,
  FolderPen: () => FolderPen,
  FolderPlus: () => FolderPlus,
  FolderRoot: () => FolderRoot,
  FolderSearch: () => FolderSearch,
  FolderSearch2: () => FolderSearch2,
  FolderSymlink: () => FolderSymlink,
  FolderSync: () => FolderSync,
  FolderTree: () => FolderTree,
  FolderUp: () => FolderUp,
  FolderX: () => FolderX,
  Folders: () => Folders,
  Footprints: () => Footprints,
  ForkKnife: () => Utensils,
  ForkKnifeCrossed: () => UtensilsCrossed,
  Forklift: () => Forklift,
  Form: () => Form,
  FormInput: () => RectangleEllipsis,
  Forward: () => Forward,
  Frame: () => Frame,
  Frown: () => Frown,
  Fuel: () => Fuel,
  Fullscreen: () => Fullscreen,
  FunctionSquare: () => SquareFunction,
  Funnel: () => Funnel,
  FunnelPlus: () => FunnelPlus,
  FunnelX: () => FunnelX,
  GalleryHorizontal: () => GalleryHorizontal,
  GalleryHorizontalEnd: () => GalleryHorizontalEnd,
  GalleryThumbnails: () => GalleryThumbnails,
  GalleryVertical: () => GalleryVertical,
  GalleryVerticalEnd: () => GalleryVerticalEnd,
  Gamepad: () => Gamepad,
  Gamepad2: () => Gamepad2,
  GamepadDirectional: () => GamepadDirectional,
  GanttChart: () => ChartNoAxesGantt,
  GanttChartSquare: () => SquareChartGantt,
  Gauge: () => Gauge,
  GaugeCircle: () => CircleGauge,
  Gavel: () => Gavel,
  Gem: () => Gem,
  GeorgianLari: () => GeorgianLari,
  Ghost: () => Ghost,
  Gift: () => Gift,
  GitBranch: () => GitBranch,
  GitBranchMinus: () => GitBranchMinus,
  GitBranchPlus: () => GitBranchPlus,
  GitCommit: () => GitCommitHorizontal,
  GitCommitHorizontal: () => GitCommitHorizontal,
  GitCommitVertical: () => GitCommitVertical,
  GitCompare: () => GitCompare,
  GitCompareArrows: () => GitCompareArrows,
  GitFork: () => GitFork,
  GitGraph: () => GitGraph,
  GitMerge: () => GitMerge,
  GitMergeConflict: () => GitMergeConflict,
  GitPullRequest: () => GitPullRequest,
  GitPullRequestArrow: () => GitPullRequestArrow,
  GitPullRequestClosed: () => GitPullRequestClosed,
  GitPullRequestCreate: () => GitPullRequestCreate,
  GitPullRequestCreateArrow: () => GitPullRequestCreateArrow,
  GitPullRequestDraft: () => GitPullRequestDraft,
  GlassWater: () => GlassWater,
  Glasses: () => Glasses,
  Globe: () => Globe,
  Globe2: () => Earth,
  GlobeCheck: () => GlobeCheck,
  GlobeLock: () => GlobeLock,
  GlobeOff: () => GlobeOff,
  GlobeX: () => GlobeX,
  Goal: () => Goal,
  Gpu: () => Gpu,
  Grab: () => HandGrab,
  GraduationCap: () => GraduationCap,
  Grape: () => Grape,
  Grid: () => Grid3x3,
  Grid2X2: () => Grid2x2,
  Grid2X2Check: () => Grid2x2Check,
  Grid2X2Plus: () => Grid2x2Plus,
  Grid2X2X: () => Grid2x2X,
  Grid2x2: () => Grid2x2,
  Grid2x2Check: () => Grid2x2Check,
  Grid2x2Plus: () => Grid2x2Plus,
  Grid2x2X: () => Grid2x2X,
  Grid3X3: () => Grid3x3,
  Grid3x2: () => Grid3x2,
  Grid3x3: () => Grid3x3,
  Grip: () => Grip,
  GripHorizontal: () => GripHorizontal,
  GripVertical: () => GripVertical,
  Group: () => Group,
  Guitar: () => Guitar,
  Ham: () => Ham,
  Hamburger: () => Hamburger,
  Hammer: () => Hammer,
  Hand: () => Hand,
  HandCoins: () => HandCoins,
  HandFist: () => HandFist,
  HandGrab: () => HandGrab,
  HandHeart: () => HandHeart,
  HandHelping: () => HandHelping,
  HandMetal: () => HandMetal,
  HandPlatter: () => HandPlatter,
  Handbag: () => Handbag,
  Handshake: () => Handshake,
  HardDrive: () => HardDrive,
  HardDriveDownload: () => HardDriveDownload,
  HardDriveUpload: () => HardDriveUpload,
  HardHat: () => HardHat,
  Hash: () => Hash,
  HatGlasses: () => HatGlasses,
  Haze: () => Haze,
  Hd: () => Hd,
  HdmiPort: () => HdmiPort,
  Heading: () => Heading,
  Heading1: () => Heading1,
  Heading2: () => Heading2,
  Heading3: () => Heading3,
  Heading4: () => Heading4,
  Heading5: () => Heading5,
  Heading6: () => Heading6,
  HeadphoneOff: () => HeadphoneOff,
  Headphones: () => Headphones,
  Headset: () => Headset,
  Heart: () => Heart,
  HeartCrack: () => HeartCrack,
  HeartHandshake: () => HeartHandshake,
  HeartMinus: () => HeartMinus,
  HeartOff: () => HeartOff,
  HeartPlus: () => HeartPlus,
  HeartPulse: () => HeartPulse,
  HeartX: () => HeartX,
  Heater: () => Heater,
  Helicopter: () => Helicopter,
  HelpCircle: () => CircleQuestionMark,
  HelpingHand: () => HandHelping,
  Hexagon: () => Hexagon,
  Highlighter: () => Highlighter,
  History: () => History,
  Home: () => House,
  Hop: () => Hop,
  HopOff: () => HopOff,
  Hospital: () => Hospital,
  Hotel: () => Hotel,
  Hourglass: () => Hourglass,
  House: () => House,
  HouseHeart: () => HouseHeart,
  HousePlug: () => HousePlug,
  HousePlus: () => HousePlus,
  HouseWifi: () => HouseWifi,
  IceCream: () => IceCreamCone,
  IceCream2: () => IceCreamBowl,
  IceCreamBowl: () => IceCreamBowl,
  IceCreamCone: () => IceCreamCone,
  IdCard: () => IdCard,
  IdCardLanyard: () => IdCardLanyard,
  Image: () => Image,
  ImageDown: () => ImageDown,
  ImageMinus: () => ImageMinus,
  ImageOff: () => ImageOff,
  ImagePlay: () => ImagePlay,
  ImagePlus: () => ImagePlus,
  ImageUp: () => ImageUp,
  ImageUpscale: () => ImageUpscale,
  Images: () => Images,
  Import: () => Import,
  Inbox: () => Inbox,
  Indent: () => ListIndentIncrease,
  IndentDecrease: () => ListIndentDecrease,
  IndentIncrease: () => ListIndentIncrease,
  IndianRupee: () => IndianRupee,
  Infinity: () => Infinity,
  Info: () => Info,
  Inspect: () => SquareMousePointer,
  InspectionPanel: () => InspectionPanel,
  Italic: () => Italic,
  IterationCcw: () => IterationCcw,
  IterationCw: () => IterationCw,
  JapaneseYen: () => JapaneseYen,
  Joystick: () => Joystick,
  Kanban: () => Kanban,
  KanbanSquare: () => SquareKanban,
  KanbanSquareDashed: () => SquareDashedKanban,
  Kayak: () => Kayak,
  Key: () => Key,
  KeyRound: () => KeyRound,
  KeySquare: () => KeySquare,
  Keyboard: () => Keyboard,
  KeyboardMusic: () => KeyboardMusic,
  KeyboardOff: () => KeyboardOff,
  Lamp: () => Lamp,
  LampCeiling: () => LampCeiling,
  LampDesk: () => LampDesk,
  LampFloor: () => LampFloor,
  LampWallDown: () => LampWallDown,
  LampWallUp: () => LampWallUp,
  LandPlot: () => LandPlot,
  Landmark: () => Landmark,
  Languages: () => Languages,
  Laptop: () => Laptop,
  Laptop2: () => LaptopMinimal,
  LaptopMinimal: () => LaptopMinimal,
  LaptopMinimalCheck: () => LaptopMinimalCheck,
  Lasso: () => Lasso,
  LassoSelect: () => LassoSelect,
  Laugh: () => Laugh,
  Layers: () => Layers,
  Layers2: () => Layers2,
  Layers3: () => Layers,
  LayersMinus: () => LayersMinus,
  LayersPlus: () => LayersPlus,
  Layout: () => PanelsTopLeft,
  LayoutDashboard: () => LayoutDashboard,
  LayoutGrid: () => LayoutGrid,
  LayoutList: () => LayoutList,
  LayoutPanelLeft: () => LayoutPanelLeft,
  LayoutPanelTop: () => LayoutPanelTop,
  LayoutTemplate: () => LayoutTemplate,
  Leaf: () => Leaf,
  LeafyGreen: () => LeafyGreen,
  Lectern: () => Lectern,
  LensConcave: () => LensConcave,
  LensConvex: () => LensConvex,
  LetterText: () => TextInitial,
  Library: () => Library,
  LibraryBig: () => LibraryBig,
  LibrarySquare: () => SquareLibrary,
  LifeBuoy: () => LifeBuoy,
  Ligature: () => Ligature,
  Lightbulb: () => Lightbulb,
  LightbulbOff: () => LightbulbOff,
  LineChart: () => ChartLine,
  LineDotRightHorizontal: () => LineDotRightHorizontal,
  LineSquiggle: () => LineSquiggle,
  LineStyle: () => LineStyle,
  Link: () => Link,
  Link2: () => Link2,
  Link2Off: () => Link2Off,
  List: () => List,
  ListCheck: () => ListCheck,
  ListChecks: () => ListChecks,
  ListChevronsDownUp: () => ListChevronsDownUp,
  ListChevronsUpDown: () => ListChevronsUpDown,
  ListCollapse: () => ListCollapse,
  ListEnd: () => ListEnd,
  ListFilter: () => ListFilter,
  ListFilterPlus: () => ListFilterPlus,
  ListIndentDecrease: () => ListIndentDecrease,
  ListIndentIncrease: () => ListIndentIncrease,
  ListMinus: () => ListMinus,
  ListMusic: () => ListMusic,
  ListOrdered: () => ListOrdered,
  ListPlus: () => ListPlus,
  ListRestart: () => ListRestart,
  ListSortAscending: () => ListSortAscending,
  ListSortDescending: () => ListSortDescending,
  ListStart: () => ListStart,
  ListTodo: () => ListTodo,
  ListTree: () => ListTree,
  ListVideo: () => ListVideo,
  ListX: () => ListX,
  Loader: () => Loader,
  Loader2: () => LoaderCircle,
  LoaderCircle: () => LoaderCircle,
  LoaderPinwheel: () => LoaderPinwheel,
  Locate: () => Locate,
  LocateFixed: () => LocateFixed,
  LocateOff: () => LocateOff,
  LocationEdit: () => MapPinPen,
  Lock: () => Lock,
  LockKeyhole: () => LockKeyhole,
  LockKeyholeOpen: () => LockKeyholeOpen,
  LockOpen: () => LockOpen,
  LogIn: () => LogIn,
  LogOut: () => LogOut,
  Logs: () => Logs,
  Lollipop: () => Lollipop,
  Luggage: () => Luggage,
  MSquare: () => SquareM,
  Magnet: () => Magnet,
  Mail: () => Mail,
  MailCheck: () => MailCheck,
  MailMinus: () => MailMinus,
  MailOpen: () => MailOpen,
  MailPlus: () => MailPlus,
  MailQuestion: () => MailQuestionMark,
  MailQuestionMark: () => MailQuestionMark,
  MailSearch: () => MailSearch,
  MailWarning: () => MailWarning,
  MailX: () => MailX,
  Mailbox: () => Mailbox,
  Mails: () => Mails,
  Map: () => Map2,
  MapMinus: () => MapMinus,
  MapPin: () => MapPin,
  MapPinCheck: () => MapPinCheck,
  MapPinCheckInside: () => MapPinCheckInside,
  MapPinHouse: () => MapPinHouse,
  MapPinMinus: () => MapPinMinus,
  MapPinMinusInside: () => MapPinMinusInside,
  MapPinOff: () => MapPinOff,
  MapPinPen: () => MapPinPen,
  MapPinPlus: () => MapPinPlus,
  MapPinPlusInside: () => MapPinPlusInside,
  MapPinSearch: () => MapPinSearch,
  MapPinX: () => MapPinX,
  MapPinXInside: () => MapPinXInside,
  MapPinned: () => MapPinned,
  MapPlus: () => MapPlus,
  Mars: () => Mars,
  MarsStroke: () => MarsStroke,
  Martini: () => Martini,
  Maximize: () => Maximize,
  Maximize2: () => Maximize2,
  Medal: () => Medal,
  Megaphone: () => Megaphone,
  MegaphoneOff: () => MegaphoneOff,
  Meh: () => Meh,
  MemoryStick: () => MemoryStick,
  Menu: () => Menu,
  MenuSquare: () => SquareMenu,
  Merge: () => Merge,
  MessageCircle: () => MessageCircle,
  MessageCircleCheck: () => MessageCircleCheck,
  MessageCircleCode: () => MessageCircleCode,
  MessageCircleDashed: () => MessageCircleDashed,
  MessageCircleHeart: () => MessageCircleHeart,
  MessageCircleMore: () => MessageCircleMore,
  MessageCircleOff: () => MessageCircleOff,
  MessageCirclePlus: () => MessageCirclePlus,
  MessageCircleQuestion: () => MessageCircleQuestionMark,
  MessageCircleQuestionMark: () => MessageCircleQuestionMark,
  MessageCircleReply: () => MessageCircleReply,
  MessageCircleWarning: () => MessageCircleWarning,
  MessageCircleX: () => MessageCircleX,
  MessageSquare: () => MessageSquare,
  MessageSquareCheck: () => MessageSquareCheck,
  MessageSquareCode: () => MessageSquareCode,
  MessageSquareDashed: () => MessageSquareDashed,
  MessageSquareDiff: () => MessageSquareDiff,
  MessageSquareDot: () => MessageSquareDot,
  MessageSquareHeart: () => MessageSquareHeart,
  MessageSquareLock: () => MessageSquareLock,
  MessageSquareMore: () => MessageSquareMore,
  MessageSquareOff: () => MessageSquareOff,
  MessageSquarePlus: () => MessageSquarePlus,
  MessageSquareQuote: () => MessageSquareQuote,
  MessageSquareReply: () => MessageSquareReply,
  MessageSquareShare: () => MessageSquareShare,
  MessageSquareText: () => MessageSquareText,
  MessageSquareWarning: () => MessageSquareWarning,
  MessageSquareX: () => MessageSquareX,
  MessagesSquare: () => MessagesSquare,
  Metronome: () => Metronome,
  Mic: () => Mic,
  Mic2: () => MicVocal,
  MicOff: () => MicOff,
  MicVocal: () => MicVocal,
  Microchip: () => Microchip,
  Microscope: () => Microscope,
  Microwave: () => Microwave,
  Milestone: () => Milestone,
  Milk: () => Milk,
  MilkOff: () => MilkOff,
  Minimize: () => Minimize,
  Minimize2: () => Minimize2,
  Minus: () => Minus,
  MinusCircle: () => CircleMinus,
  MinusSquare: () => SquareMinus,
  MirrorRectangular: () => MirrorRectangular,
  MirrorRound: () => MirrorRound,
  Monitor: () => Monitor,
  MonitorCheck: () => MonitorCheck,
  MonitorCloud: () => MonitorCloud,
  MonitorCog: () => MonitorCog,
  MonitorDot: () => MonitorDot,
  MonitorDown: () => MonitorDown,
  MonitorOff: () => MonitorOff,
  MonitorPause: () => MonitorPause,
  MonitorPlay: () => MonitorPlay,
  MonitorSmartphone: () => MonitorSmartphone,
  MonitorSpeaker: () => MonitorSpeaker,
  MonitorStop: () => MonitorStop,
  MonitorUp: () => MonitorUp,
  MonitorX: () => MonitorX,
  Moon: () => Moon,
  MoonStar: () => MoonStar,
  MoreHorizontal: () => Ellipsis,
  MoreVertical: () => EllipsisVertical,
  Motorbike: () => Motorbike,
  Mountain: () => Mountain,
  MountainSnow: () => MountainSnow,
  Mouse: () => Mouse,
  MouseLeft: () => MouseLeft,
  MouseOff: () => MouseOff,
  MousePointer: () => MousePointer,
  MousePointer2: () => MousePointer2,
  MousePointer2Off: () => MousePointer2Off,
  MousePointerBan: () => MousePointerBan,
  MousePointerClick: () => MousePointerClick,
  MousePointerSquareDashed: () => SquareDashedMousePointer,
  MouseRight: () => MouseRight,
  Move: () => Move,
  Move3D: () => Move3d,
  Move3d: () => Move3d,
  MoveDiagonal: () => MoveDiagonal,
  MoveDiagonal2: () => MoveDiagonal2,
  MoveDown: () => MoveDown,
  MoveDownLeft: () => MoveDownLeft,
  MoveDownRight: () => MoveDownRight,
  MoveHorizontal: () => MoveHorizontal,
  MoveLeft: () => MoveLeft,
  MoveRight: () => MoveRight,
  MoveUp: () => MoveUp,
  MoveUpLeft: () => MoveUpLeft,
  MoveUpRight: () => MoveUpRight,
  MoveVertical: () => MoveVertical,
  Music: () => Music,
  Music2: () => Music2,
  Music3: () => Music3,
  Music4: () => Music4,
  Navigation: () => Navigation,
  Navigation2: () => Navigation2,
  Navigation2Off: () => Navigation2Off,
  NavigationOff: () => NavigationOff,
  Network: () => Network,
  Newspaper: () => Newspaper,
  Nfc: () => Nfc,
  NonBinary: () => NonBinary,
  Notebook: () => Notebook,
  NotebookPen: () => NotebookPen,
  NotebookTabs: () => NotebookTabs,
  NotebookText: () => NotebookText,
  NotepadText: () => NotepadText,
  NotepadTextDashed: () => NotepadTextDashed,
  Nut: () => Nut,
  NutOff: () => NutOff,
  Octagon: () => Octagon,
  OctagonAlert: () => OctagonAlert,
  OctagonMinus: () => OctagonMinus,
  OctagonPause: () => OctagonPause,
  OctagonX: () => OctagonX,
  Omega: () => Omega,
  Option: () => Option,
  Orbit: () => Orbit,
  Origami: () => Origami,
  Outdent: () => ListIndentDecrease,
  Package: () => Package,
  Package2: () => Package2,
  PackageCheck: () => PackageCheck,
  PackageMinus: () => PackageMinus,
  PackageOpen: () => PackageOpen,
  PackagePlus: () => PackagePlus,
  PackageSearch: () => PackageSearch,
  PackageX: () => PackageX,
  PaintBucket: () => PaintBucket,
  PaintRoller: () => PaintRoller,
  Paintbrush: () => Paintbrush,
  Paintbrush2: () => PaintbrushVertical,
  PaintbrushVertical: () => PaintbrushVertical,
  Palette: () => Palette,
  Palmtree: () => TreePalm,
  Panda: () => Panda,
  PanelBottom: () => PanelBottom,
  PanelBottomClose: () => PanelBottomClose,
  PanelBottomDashed: () => PanelBottomDashed,
  PanelBottomInactive: () => PanelBottomDashed,
  PanelBottomOpen: () => PanelBottomOpen,
  PanelLeft: () => PanelLeft,
  PanelLeftClose: () => PanelLeftClose,
  PanelLeftDashed: () => PanelLeftDashed,
  PanelLeftInactive: () => PanelLeftDashed,
  PanelLeftOpen: () => PanelLeftOpen,
  PanelLeftRightDashed: () => PanelLeftRightDashed,
  PanelRight: () => PanelRight,
  PanelRightClose: () => PanelRightClose,
  PanelRightDashed: () => PanelRightDashed,
  PanelRightInactive: () => PanelRightDashed,
  PanelRightOpen: () => PanelRightOpen,
  PanelTop: () => PanelTop,
  PanelTopBottomDashed: () => PanelTopBottomDashed,
  PanelTopClose: () => PanelTopClose,
  PanelTopDashed: () => PanelTopDashed,
  PanelTopInactive: () => PanelTopDashed,
  PanelTopOpen: () => PanelTopOpen,
  PanelsLeftBottom: () => PanelsLeftBottom,
  PanelsLeftRight: () => Columns3,
  PanelsRightBottom: () => PanelsRightBottom,
  PanelsTopBottom: () => Rows3,
  PanelsTopLeft: () => PanelsTopLeft,
  PaperBag: () => PaperBag,
  Paperclip: () => Paperclip,
  Parasol: () => Parasol,
  Parentheses: () => Parentheses,
  ParkingCircle: () => CircleParking,
  ParkingCircleOff: () => CircleParkingOff,
  ParkingMeter: () => ParkingMeter,
  ParkingSquare: () => SquareParking,
  ParkingSquareOff: () => SquareParkingOff,
  PartyPopper: () => PartyPopper,
  Pause: () => Pause,
  PauseCircle: () => CirclePause,
  PauseOctagon: () => OctagonPause,
  PawPrint: () => PawPrint,
  PcCase: () => PcCase,
  Pen: () => Pen,
  PenBox: () => SquarePen,
  PenLine: () => PenLine,
  PenOff: () => PenOff,
  PenSquare: () => SquarePen,
  PenTool: () => PenTool,
  Pencil: () => Pencil,
  PencilLine: () => PencilLine,
  PencilOff: () => PencilOff,
  PencilRuler: () => PencilRuler,
  PencilSparkles: () => PencilSparkles,
  Pentagon: () => Pentagon,
  Percent: () => Percent,
  PercentCircle: () => CirclePercent,
  PercentDiamond: () => DiamondPercent,
  PercentSquare: () => SquarePercent,
  PersonStanding: () => PersonStanding,
  Phi: () => Phi,
  PhilippinePeso: () => PhilippinePeso,
  Phone: () => Phone,
  PhoneCall: () => PhoneCall,
  PhoneForwarded: () => PhoneForwarded,
  PhoneIncoming: () => PhoneIncoming,
  PhoneMissed: () => PhoneMissed,
  PhoneOff: () => PhoneOff,
  PhoneOutgoing: () => PhoneOutgoing,
  Pi: () => Pi,
  PiSquare: () => SquarePi,
  Piano: () => Piano,
  Pickaxe: () => Pickaxe,
  PictureInPicture: () => PictureInPicture,
  PictureInPicture2: () => PictureInPicture2,
  PieChart: () => ChartPie,
  PiggyBank: () => PiggyBank,
  Pilcrow: () => Pilcrow,
  PilcrowLeft: () => PilcrowLeft,
  PilcrowRight: () => PilcrowRight,
  PilcrowSquare: () => SquarePilcrow,
  Pill: () => Pill,
  PillBottle: () => PillBottle,
  Pin: () => Pin,
  PinOff: () => PinOff,
  Pipette: () => Pipette,
  Pizza: () => Pizza,
  Plane: () => Plane,
  PlaneLanding: () => PlaneLanding,
  PlaneTakeoff: () => PlaneTakeoff,
  Play: () => Play,
  PlayCircle: () => CirclePlay,
  PlayOff: () => PlayOff,
  PlaySquare: () => SquarePlay,
  Plug: () => Plug,
  Plug2: () => Plug2,
  PlugZap: () => PlugZap,
  PlugZap2: () => PlugZap,
  Plus: () => Plus,
  PlusCircle: () => CirclePlus,
  PlusSquare: () => SquarePlus,
  PocketKnife: () => PocketKnife,
  Podcast: () => Podcast,
  Podium: () => Podium,
  Pointer: () => Pointer,
  PointerOff: () => PointerOff,
  Popcorn: () => Popcorn,
  Popsicle: () => Popsicle,
  PoundSterling: () => PoundSterling,
  Power: () => Power,
  PowerCircle: () => CirclePower,
  PowerOff: () => PowerOff,
  PowerSquare: () => SquarePower,
  Presentation: () => Presentation,
  Printer: () => Printer,
  PrinterCheck: () => PrinterCheck,
  PrinterX: () => PrinterX,
  Projector: () => Projector,
  Proportions: () => Proportions,
  Puzzle: () => Puzzle,
  Pyramid: () => Pyramid,
  QrCode: () => QrCode,
  Quote: () => Quote,
  Rabbit: () => Rabbit,
  Radar: () => Radar,
  Radiation: () => Radiation,
  Radical: () => Radical,
  Radio: () => Radio,
  RadioOff: () => RadioOff,
  RadioReceiver: () => RadioReceiver,
  RadioTower: () => RadioTower,
  Radius: () => Radius,
  Rainbow: () => Rainbow,
  Rat: () => Rat,
  Ratio: () => Ratio,
  Receipt: () => Receipt,
  ReceiptCent: () => ReceiptCent,
  ReceiptEuro: () => ReceiptEuro,
  ReceiptIndianRupee: () => ReceiptIndianRupee,
  ReceiptJapaneseYen: () => ReceiptJapaneseYen,
  ReceiptPoundSterling: () => ReceiptPoundSterling,
  ReceiptRussianRuble: () => ReceiptRussianRuble,
  ReceiptSwissFranc: () => ReceiptSwissFranc,
  ReceiptText: () => ReceiptText,
  ReceiptTurkishLira: () => ReceiptTurkishLira,
  RectangleCircle: () => RectangleCircle,
  RectangleEllipsis: () => RectangleEllipsis,
  RectangleGoggles: () => RectangleGoggles,
  RectangleHorizontal: () => RectangleHorizontal,
  RectangleVertical: () => RectangleVertical,
  Recycle: () => Recycle,
  Redo: () => Redo,
  Redo2: () => Redo2,
  RedoDot: () => RedoDot,
  RefreshCcw: () => RefreshCcw,
  RefreshCcwDot: () => RefreshCcwDot,
  RefreshCw: () => RefreshCw,
  RefreshCwOff: () => RefreshCwOff,
  Refrigerator: () => Refrigerator,
  Regex: () => Regex,
  RemoveFormatting: () => RemoveFormatting,
  Repeat: () => Repeat,
  Repeat1: () => Repeat1,
  Repeat2: () => Repeat2,
  RepeatOff: () => RepeatOff,
  Replace: () => Replace,
  ReplaceAll: () => ReplaceAll,
  Reply: () => Reply,
  ReplyAll: () => ReplyAll,
  Rewind: () => Rewind,
  Ribbon: () => Ribbon,
  Road: () => Road,
  Rocket: () => Rocket,
  RockingChair: () => RockingChair,
  RollerCoaster: () => RollerCoaster,
  Rose: () => Rose,
  Rotate3D: () => Rotate3d,
  Rotate3d: () => Rotate3d,
  RotateCcw: () => RotateCcw,
  RotateCcwKey: () => RotateCcwKey,
  RotateCcwSquare: () => RotateCcwSquare,
  RotateCw: () => RotateCw,
  RotateCwSquare: () => RotateCwSquare,
  Route: () => Route,
  RouteOff: () => RouteOff,
  Router: () => Router,
  Rows: () => Rows2,
  Rows2: () => Rows2,
  Rows3: () => Rows3,
  Rows4: () => Rows4,
  Rss: () => Rss,
  Ruler: () => Ruler,
  RulerDimensionLine: () => RulerDimensionLine,
  RussianRuble: () => RussianRuble,
  Sailboat: () => Sailboat,
  Salad: () => Salad,
  Sandwich: () => Sandwich,
  Satellite: () => Satellite,
  SatelliteDish: () => SatelliteDish,
  SaudiRiyal: () => SaudiRiyal,
  Save: () => Save,
  SaveAll: () => SaveAll,
  SaveCheck: () => SaveCheck,
  SaveOff: () => SaveOff,
  SavePen: () => SavePen,
  SavePlus: () => SavePlus,
  Scale: () => Scale,
  Scale3D: () => Scale3d,
  Scale3d: () => Scale3d,
  Scaling: () => Scaling,
  Scan: () => Scan,
  ScanBarcode: () => ScanBarcode,
  ScanEye: () => ScanEye,
  ScanFace: () => ScanFace,
  ScanHeart: () => ScanHeart,
  ScanLine: () => ScanLine,
  ScanQrCode: () => ScanQrCode,
  ScanSearch: () => ScanSearch,
  ScanText: () => ScanText,
  ScatterChart: () => ChartScatter,
  School: () => School,
  School2: () => University,
  Scissors: () => Scissors,
  ScissorsLineDashed: () => ScissorsLineDashed,
  ScissorsSquare: () => SquareScissors,
  ScissorsSquareDashedBottom: () => SquareBottomDashedScissors,
  Scooter: () => Scooter,
  ScreenShare: () => ScreenShare,
  ScreenShareOff: () => ScreenShareOff,
  Scroll: () => Scroll,
  ScrollText: () => ScrollText,
  Search: () => Search,
  SearchAlert: () => SearchAlert,
  SearchCheck: () => SearchCheck,
  SearchCode: () => SearchCode,
  SearchSlash: () => SearchSlash,
  SearchX: () => SearchX,
  Section: () => Section,
  Send: () => Send,
  SendHorizonal: () => SendHorizontal,
  SendHorizontal: () => SendHorizontal,
  SendToBack: () => SendToBack,
  SeparatorHorizontal: () => SeparatorHorizontal,
  SeparatorVertical: () => SeparatorVertical,
  Server: () => Server,
  ServerCog: () => ServerCog,
  ServerCrash: () => ServerCrash,
  ServerOff: () => ServerOff,
  Settings: () => Settings,
  Settings2: () => Settings2,
  Shapes: () => Shapes,
  Share: () => Share,
  Share2: () => Share2,
  Sheet: () => Sheet,
  Shell: () => Shell,
  ShelvingUnit: () => ShelvingUnit,
  Shield: () => Shield,
  ShieldAlert: () => ShieldAlert,
  ShieldBan: () => ShieldBan,
  ShieldCheck: () => ShieldCheck,
  ShieldClose: () => ShieldX,
  ShieldCog: () => ShieldCog,
  ShieldCogCorner: () => ShieldCogCorner,
  ShieldEllipsis: () => ShieldEllipsis,
  ShieldHalf: () => ShieldHalf,
  ShieldMinus: () => ShieldMinus,
  ShieldOff: () => ShieldOff,
  ShieldPlus: () => ShieldPlus,
  ShieldQuestion: () => ShieldQuestionMark,
  ShieldQuestionMark: () => ShieldQuestionMark,
  ShieldUser: () => ShieldUser,
  ShieldX: () => ShieldX,
  Ship: () => Ship,
  ShipWheel: () => ShipWheel,
  Shirt: () => Shirt,
  ShoppingBag: () => ShoppingBag,
  ShoppingBasket: () => ShoppingBasket,
  ShoppingCart: () => ShoppingCart,
  Shovel: () => Shovel,
  ShowerHead: () => ShowerHead,
  Shredder: () => Shredder,
  Shrimp: () => Shrimp,
  Shrink: () => Shrink,
  Shrub: () => Shrub,
  Shuffle: () => Shuffle,
  Sidebar: () => PanelLeft,
  SidebarClose: () => PanelLeftClose,
  SidebarOpen: () => PanelLeftOpen,
  Sigma: () => Sigma,
  SigmaSquare: () => SquareSigma,
  Signal: () => Signal,
  SignalHigh: () => SignalHigh,
  SignalLow: () => SignalLow,
  SignalMedium: () => SignalMedium,
  SignalZero: () => SignalZero,
  Signature: () => Signature,
  Signpost: () => Signpost,
  SignpostBig: () => SignpostBig,
  Siren: () => Siren,
  SkipBack: () => SkipBack,
  SkipForward: () => SkipForward,
  Skull: () => Skull,
  Slash: () => Slash,
  SlashSquare: () => SquareSlash,
  Slice: () => Slice,
  Sliders: () => SlidersVertical,
  SlidersHorizontal: () => SlidersHorizontal,
  SlidersVertical: () => SlidersVertical,
  Smartphone: () => Smartphone,
  SmartphoneCharging: () => SmartphoneCharging,
  SmartphoneNfc: () => SmartphoneNfc,
  Smile: () => Smile,
  SmilePlus: () => SmilePlus,
  Snail: () => Snail,
  Snowflake: () => Snowflake,
  SoapDispenserDroplet: () => SoapDispenserDroplet,
  Sofa: () => Sofa,
  SolarPanel: () => SolarPanel,
  SortAsc: () => ArrowUpNarrowWide,
  SortDesc: () => ArrowDownWideNarrow,
  Soup: () => Soup,
  Space: () => Space,
  Spade: () => Spade,
  Sparkle: () => Sparkle,
  Sparkles: () => Sparkles,
  Speaker: () => Speaker,
  Speech: () => Speech,
  SpellCheck: () => SpellCheck,
  SpellCheck2: () => SpellCheck2,
  Spline: () => Spline,
  SplinePointer: () => SplinePointer,
  Split: () => Split,
  SplitSquareHorizontal: () => SquareSplitHorizontal,
  SplitSquareVertical: () => SquareSplitVertical,
  Spool: () => Spool,
  SportShoe: () => SportShoe,
  Spotlight: () => Spotlight,
  SprayCan: () => SprayCan,
  Sprout: () => Sprout,
  Square: () => Square,
  SquareActivity: () => SquareActivity,
  SquareArrowDown: () => SquareArrowDown,
  SquareArrowDownLeft: () => SquareArrowDownLeft,
  SquareArrowDownRight: () => SquareArrowDownRight,
  SquareArrowLeft: () => SquareArrowLeft,
  SquareArrowOutDownLeft: () => SquareArrowOutDownLeft,
  SquareArrowOutDownRight: () => SquareArrowOutDownRight,
  SquareArrowOutUpLeft: () => SquareArrowOutUpLeft,
  SquareArrowOutUpRight: () => SquareArrowOutUpRight,
  SquareArrowRight: () => SquareArrowRight,
  SquareArrowRightEnter: () => SquareArrowRightEnter,
  SquareArrowRightExit: () => SquareArrowRightExit,
  SquareArrowUp: () => SquareArrowUp,
  SquareArrowUpLeft: () => SquareArrowUpLeft,
  SquareArrowUpRight: () => SquareArrowUpRight,
  SquareAsterisk: () => SquareAsterisk,
  SquareBottomDashedScissors: () => SquareBottomDashedScissors,
  SquareCenterlineDashedHorizontal: () => SquareCenterlineDashedHorizontal,
  SquareCenterlineDashedVertical: () => SquareCenterlineDashedVertical,
  SquareChartGantt: () => SquareChartGantt,
  SquareCheck: () => SquareCheck,
  SquareCheckBig: () => SquareCheckBig,
  SquareChevronDown: () => SquareChevronDown,
  SquareChevronLeft: () => SquareChevronLeft,
  SquareChevronRight: () => SquareChevronRight,
  SquareChevronUp: () => SquareChevronUp,
  SquareCode: () => SquareCode,
  SquareDashed: () => SquareDashed,
  SquareDashedBottom: () => SquareDashedBottom,
  SquareDashedBottomCode: () => SquareDashedBottomCode,
  SquareDashedKanban: () => SquareDashedKanban,
  SquareDashedMousePointer: () => SquareDashedMousePointer,
  SquareDashedText: () => SquareDashedText,
  SquareDashedTopSolid: () => SquareDashedTopSolid,
  SquareDivide: () => SquareDivide,
  SquareDot: () => SquareDot,
  SquareEqual: () => SquareEqual,
  SquareFunction: () => SquareFunction,
  SquareGanttChart: () => SquareChartGantt,
  SquareKanban: () => SquareKanban,
  SquareLibrary: () => SquareLibrary,
  SquareM: () => SquareM,
  SquareMenu: () => SquareMenu,
  SquareMinus: () => SquareMinus,
  SquareMousePointer: () => SquareMousePointer,
  SquareParking: () => SquareParking,
  SquareParkingOff: () => SquareParkingOff,
  SquarePause: () => SquarePause,
  SquarePen: () => SquarePen,
  SquarePercent: () => SquarePercent,
  SquarePi: () => SquarePi,
  SquarePilcrow: () => SquarePilcrow,
  SquarePlay: () => SquarePlay,
  SquarePlus: () => SquarePlus,
  SquarePower: () => SquarePower,
  SquareRadical: () => SquareRadical,
  SquareRoundCorner: () => SquareRoundCorner,
  SquareScissors: () => SquareScissors,
  SquareSigma: () => SquareSigma,
  SquareSlash: () => SquareSlash,
  SquareSplitHorizontal: () => SquareSplitHorizontal,
  SquareSplitVertical: () => SquareSplitVertical,
  SquareSquare: () => SquareSquare,
  SquareStack: () => SquareStack,
  SquareStar: () => SquareStar,
  SquareStop: () => SquareStop,
  SquareTerminal: () => SquareTerminal,
  SquareUser: () => SquareUser,
  SquareUserRound: () => SquareUserRound,
  SquareX: () => SquareX,
  SquaresExclude: () => SquaresExclude,
  SquaresIntersect: () => SquaresIntersect,
  SquaresSubtract: () => SquaresSubtract,
  SquaresUnite: () => SquaresUnite,
  Squircle: () => Squircle,
  SquircleDashed: () => SquircleDashed,
  Squirrel: () => Squirrel,
  Stamp: () => Stamp,
  Star: () => Star,
  StarCheck: () => StarCheck,
  StarHalf: () => StarHalf,
  StarMinus: () => StarMinus,
  StarOff: () => StarOff,
  StarPlus: () => StarPlus,
  StarX: () => StarX,
  Stars: () => Sparkles,
  StepBack: () => StepBack,
  StepForward: () => StepForward,
  Stethoscope: () => Stethoscope,
  Sticker: () => Sticker,
  StickyNote: () => StickyNote,
  StickyNoteCheck: () => StickyNoteCheck,
  StickyNoteMinus: () => StickyNoteMinus,
  StickyNoteOff: () => StickyNoteOff,
  StickyNotePlus: () => StickyNotePlus,
  StickyNoteX: () => StickyNoteX,
  StickyNotes: () => StickyNotes,
  Stone: () => Stone,
  StopCircle: () => CircleStop,
  Store: () => Store,
  StretchHorizontal: () => StretchHorizontal,
  StretchVertical: () => StretchVertical,
  Strikethrough: () => Strikethrough,
  Subscript: () => Subscript,
  Subtitles: () => Captions,
  Summary: () => Summary,
  Sun: () => Sun,
  SunDim: () => SunDim,
  SunMedium: () => SunMedium,
  SunMoon: () => SunMoon,
  SunSnow: () => SunSnow,
  Sunrise: () => Sunrise,
  Sunset: () => Sunset,
  Superscript: () => Superscript,
  SwatchBook: () => SwatchBook,
  SwissFranc: () => SwissFranc,
  SwitchCamera: () => SwitchCamera,
  Sword: () => Sword,
  Swords: () => Swords,
  Syringe: () => Syringe,
  Table: () => Table,
  Table2: () => Table2,
  TableCellsMerge: () => TableCellsMerge,
  TableCellsSplit: () => TableCellsSplit,
  TableColumnsSplit: () => TableColumnsSplit,
  TableConfig: () => Columns3Cog,
  TableOfContents: () => TableOfContents,
  TableProperties: () => TableProperties,
  TableRowsSplit: () => TableRowsSplit,
  Tablet: () => Tablet,
  TabletSmartphone: () => TabletSmartphone,
  Tablets: () => Tablets,
  Tag: () => Tag,
  TagPlus: () => TagPlus,
  TagX: () => TagX,
  Tags: () => Tags,
  Tally1: () => Tally1,
  Tally2: () => Tally2,
  Tally3: () => Tally3,
  Tally4: () => Tally4,
  Tally5: () => Tally5,
  Tangent: () => Tangent,
  Target: () => Target,
  Telescope: () => Telescope,
  Tent: () => Tent,
  TentTree: () => TentTree,
  Terminal: () => Terminal,
  TerminalSquare: () => SquareTerminal,
  TestTube: () => TestTube,
  TestTube2: () => TestTubeDiagonal,
  TestTubeDiagonal: () => TestTubeDiagonal,
  TestTubes: () => TestTubes,
  Text: () => TextAlignStart,
  TextAlignCenter: () => TextAlignCenter,
  TextAlignEnd: () => TextAlignEnd,
  TextAlignJustify: () => TextAlignJustify,
  TextAlignStart: () => TextAlignStart,
  TextCursor: () => TextCursor,
  TextCursorInput: () => TextCursorInput,
  TextInitial: () => TextInitial,
  TextQuote: () => TextQuote,
  TextSearch: () => TextSearch,
  TextSelect: () => SquareDashedText,
  TextSelection: () => SquareDashedText,
  TextWrap: () => TextWrap,
  Theater: () => Theater,
  Thermometer: () => Thermometer,
  ThermometerSnowflake: () => ThermometerSnowflake,
  ThermometerSun: () => ThermometerSun,
  ThumbsDown: () => ThumbsDown,
  ThumbsUp: () => ThumbsUp,
  Ticket: () => Ticket,
  TicketCheck: () => TicketCheck,
  TicketMinus: () => TicketMinus,
  TicketPercent: () => TicketPercent,
  TicketPlus: () => TicketPlus,
  TicketSlash: () => TicketSlash,
  TicketX: () => TicketX,
  Tickets: () => Tickets,
  TicketsPlane: () => TicketsPlane,
  Timeline: () => Timeline,
  Timer: () => Timer,
  TimerOff: () => TimerOff,
  TimerReset: () => TimerReset,
  ToggleLeft: () => ToggleLeft,
  ToggleRight: () => ToggleRight,
  Toilet: () => Toilet,
  ToolCase: () => ToolCase,
  Toolbox: () => Toolbox,
  Tornado: () => Tornado,
  Torus: () => Torus,
  Touchpad: () => Touchpad,
  TouchpadOff: () => TouchpadOff,
  TowelRack: () => TowelRack,
  TowerControl: () => TowerControl,
  ToyBrick: () => ToyBrick,
  Tractor: () => Tractor,
  TrafficCone: () => TrafficCone,
  Train: () => TramFront,
  TrainFront: () => TrainFront,
  TrainFrontTunnel: () => TrainFrontTunnel,
  TrainTrack: () => TrainTrack,
  TramFront: () => TramFront,
  Transgender: () => Transgender,
  Trash: () => Trash,
  Trash2: () => Trash2,
  TreeDeciduous: () => TreeDeciduous,
  TreePalm: () => TreePalm,
  TreePine: () => TreePine,
  Trees: () => Trees,
  TrendingDown: () => TrendingDown,
  TrendingUp: () => TrendingUp,
  TrendingUpDown: () => TrendingUpDown,
  Triangle: () => Triangle,
  TriangleAlert: () => TriangleAlert,
  TriangleDashed: () => TriangleDashed,
  TriangleRight: () => TriangleRight,
  Trophy: () => Trophy,
  Truck: () => Truck,
  TruckElectric: () => TruckElectric,
  TurkishLira: () => TurkishLira,
  Turntable: () => Turntable,
  Turtle: () => Turtle,
  Tv: () => Tv,
  Tv2: () => TvMinimal,
  TvMinimal: () => TvMinimal,
  TvMinimalPlay: () => TvMinimalPlay,
  Type: () => Type,
  TypeOutline: () => TypeOutline,
  Umbrella: () => Umbrella,
  UmbrellaOff: () => UmbrellaOff,
  Underline: () => Underline,
  Undo: () => Undo,
  Undo2: () => Undo2,
  UndoDot: () => UndoDot,
  UnfoldHorizontal: () => UnfoldHorizontal,
  UnfoldVertical: () => UnfoldVertical,
  Ungroup: () => Ungroup,
  University: () => University,
  Unlink: () => Unlink,
  Unlink2: () => Unlink2,
  Unlock: () => LockOpen,
  UnlockKeyhole: () => LockKeyholeOpen,
  Unplug: () => Unplug,
  Upload: () => Upload,
  UploadCloud: () => CloudUpload,
  Usb: () => Usb,
  User: () => User,
  User2: () => UserRound,
  UserCheck: () => UserCheck,
  UserCheck2: () => UserRoundCheck,
  UserCircle: () => CircleUser,
  UserCircle2: () => CircleUserRound,
  UserCog: () => UserCog,
  UserCog2: () => UserRoundCog,
  UserKey: () => UserKey,
  UserLock: () => UserLock,
  UserMinus: () => UserMinus,
  UserMinus2: () => UserRoundMinus,
  UserPen: () => UserPen,
  UserPlus: () => UserPlus,
  UserPlus2: () => UserRoundPlus,
  UserRound: () => UserRound,
  UserRoundArrowLeft: () => UserRoundArrowLeft,
  UserRoundCheck: () => UserRoundCheck,
  UserRoundCog: () => UserRoundCog,
  UserRoundKey: () => UserRoundKey,
  UserRoundMinus: () => UserRoundMinus,
  UserRoundPen: () => UserRoundPen,
  UserRoundPlus: () => UserRoundPlus,
  UserRoundSearch: () => UserRoundSearch,
  UserRoundX: () => UserRoundX,
  UserSearch: () => UserSearch,
  UserSquare: () => SquareUser,
  UserSquare2: () => SquareUserRound,
  UserStar: () => UserStar,
  UserX: () => UserX,
  UserX2: () => UserRoundX,
  Users: () => Users,
  Users2: () => UsersRound,
  UsersRound: () => UsersRound,
  Utensils: () => Utensils,
  UtensilsCrossed: () => UtensilsCrossed,
  UtilityPole: () => UtilityPole,
  Van: () => Van,
  Variable: () => Variable,
  Vault: () => Vault,
  VectorSquare: () => VectorSquare,
  Vegan: () => Vegan,
  VenetianMask: () => VenetianMask,
  Venus: () => Venus,
  VenusAndMars: () => VenusAndMars,
  Verified: () => BadgeCheck,
  Vibrate: () => Vibrate,
  VibrateOff: () => VibrateOff,
  Video: () => Video,
  VideoOff: () => VideoOff,
  Videotape: () => Videotape,
  View: () => View,
  Voicemail: () => Voicemail,
  Volleyball: () => Volleyball,
  Volume: () => Volume,
  Volume1: () => Volume1,
  Volume2: () => Volume2,
  VolumeOff: () => VolumeOff,
  VolumeX: () => VolumeX,
  Vote: () => Vote,
  Wallet: () => Wallet,
  Wallet2: () => WalletMinimal,
  WalletCards: () => WalletCards,
  WalletMinimal: () => WalletMinimal,
  Wallpaper: () => Wallpaper,
  Wand: () => Wand,
  Wand2: () => WandSparkles,
  WandSparkles: () => WandSparkles,
  Warehouse: () => Warehouse,
  WashingMachine: () => WashingMachine,
  Watch: () => Watch,
  Waves: () => WavesHorizontal,
  WavesArrowDown: () => WavesArrowDown,
  WavesArrowUp: () => WavesArrowUp,
  WavesHorizontal: () => WavesHorizontal,
  WavesLadder: () => WavesLadder,
  WavesVertical: () => WavesVertical,
  Waypoints: () => Waypoints,
  Webcam: () => Webcam,
  WebcamOff: () => WebcamOff,
  Webhook: () => Webhook,
  WebhookOff: () => WebhookOff,
  Weight: () => Weight,
  WeightTilde: () => WeightTilde,
  Wheat: () => Wheat,
  WheatOff: () => WheatOff,
  WholeWord: () => WholeWord,
  Wifi: () => Wifi,
  WifiCog: () => WifiCog,
  WifiHigh: () => WifiHigh,
  WifiLow: () => WifiLow,
  WifiOff: () => WifiOff,
  WifiPen: () => WifiPen,
  WifiSync: () => WifiSync,
  WifiZero: () => WifiZero,
  Wind: () => Wind,
  WindArrowDown: () => WindArrowDown,
  Wine: () => Wine,
  WineOff: () => WineOff,
  Workflow: () => Workflow,
  Worm: () => Worm,
  WrapText: () => TextWrap,
  Wrench: () => Wrench,
  WrenchOff: () => WrenchOff,
  X: () => X,
  XCircle: () => CircleX,
  XLineTop: () => XLineTop,
  XOctagon: () => OctagonX,
  XSquare: () => SquareX,
  Zap: () => Zap,
  ZapOff: () => ZapOff,
  ZodiacAquarius: () => ZodiacAquarius,
  ZodiacAries: () => ZodiacAries,
  ZodiacCancer: () => ZodiacCancer,
  ZodiacCapricorn: () => ZodiacCapricorn,
  ZodiacGemini: () => ZodiacGemini,
  ZodiacLeo: () => ZodiacLeo,
  ZodiacLibra: () => ZodiacLibra,
  ZodiacOphiuchus: () => ZodiacOphiuchus,
  ZodiacPisces: () => ZodiacPisces,
  ZodiacSagittarius: () => ZodiacSagittarius,
  ZodiacScorpio: () => ZodiacScorpio,
  ZodiacTaurus: () => ZodiacTaurus,
  ZodiacVirgo: () => ZodiacVirgo,
  ZoomIn: () => ZoomIn,
  ZoomOut: () => ZoomOut
});

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/a-arrow-down.mjs
var AArrowDown = [
  ["path", { d: "m14 12 4 4 4-4" }],
  ["path", { d: "M18 16V7" }],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" }],
  ["path", { d: "M3.304 13h6.392" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/a-arrow-up.mjs
var AArrowUp = [
  ["path", { d: "m14 11 4-4 4 4" }],
  ["path", { d: "M18 16V7" }],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" }],
  ["path", { d: "M3.304 13h6.392" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/a-large-small.mjs
var ALargeSmall = [
  ["path", { d: "m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16" }],
  ["path", { d: "M15.697 14h5.606" }],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" }],
  ["path", { d: "M3.304 13h6.392" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/accessibility.mjs
var Accessibility = [
  ["circle", { cx: "16", cy: "4", r: "1" }],
  ["path", { d: "m18 19 1-7-6 1" }],
  ["path", { d: "m5 8 3-3 5.5 3-2.36 3.5" }],
  ["path", { d: "M4.24 14.5a5 5 0 0 0 6.88 6" }],
  ["path", { d: "M13.76 17.5a5 5 0 0 0-6.88-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/activity.mjs
var Activity = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ad.mjs
var Ad = [
  ["path", { d: "M10 13H6" }],
  ["path", { d: "M10 15v-4a2 2 0 0 0-4 0v4" }],
  [
    "path",
    {
      d: "M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z"
    }
  ],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/air-vent.mjs
var AirVent = [
  ["path", { d: "M18 17.5a2.5 2.5 0 1 1-4 2.03V12" }],
  ["path", { d: "M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M6 8h12" }],
  ["path", { d: "M6.6 15.572A2 2 0 1 0 10 17v-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/airplay.mjs
var Airplay = [
  ["path", { d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" }],
  ["path", { d: "m12 15 5 6H7Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/alarm-clock-check.mjs
var AlarmClockCheck = [
  ["circle", { cx: "12", cy: "13", r: "8" }],
  ["path", { d: "M5 3 2 6" }],
  ["path", { d: "m22 6-3-3" }],
  ["path", { d: "M6.38 18.7 4 21" }],
  ["path", { d: "M17.64 18.67 20 21" }],
  ["path", { d: "m9 13 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/alarm-clock-minus.mjs
var AlarmClockMinus = [
  ["circle", { cx: "12", cy: "13", r: "8" }],
  ["path", { d: "M5 3 2 6" }],
  ["path", { d: "m22 6-3-3" }],
  ["path", { d: "M6.38 18.7 4 21" }],
  ["path", { d: "M17.64 18.67 20 21" }],
  ["path", { d: "M9 13h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/alarm-clock-off.mjs
var AlarmClockOff = [
  ["path", { d: "M6.87 6.87a8 8 0 1 0 11.26 11.26" }],
  ["path", { d: "M19.9 14.25a8 8 0 0 0-9.15-9.15" }],
  ["path", { d: "m22 6-3-3" }],
  ["path", { d: "M6.26 18.67 4 21" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M4 4 2 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/alarm-clock-plus.mjs
var AlarmClockPlus = [
  ["circle", { cx: "12", cy: "13", r: "8" }],
  ["path", { d: "M5 3 2 6" }],
  ["path", { d: "m22 6-3-3" }],
  ["path", { d: "M6.38 18.7 4 21" }],
  ["path", { d: "M17.64 18.67 20 21" }],
  ["path", { d: "M12 10v6" }],
  ["path", { d: "M9 13h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/alarm-clock.mjs
var AlarmClock = [
  ["circle", { cx: "12", cy: "13", r: "8" }],
  ["path", { d: "M12 9v4l2 2" }],
  ["path", { d: "M5 3 2 6" }],
  ["path", { d: "m22 6-3-3" }],
  ["path", { d: "M6.38 18.7 4 21" }],
  ["path", { d: "M17.64 18.67 20 21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/alarm-smoke.mjs
var AlarmSmoke = [
  ["path", { d: "M11 21c0-2.5 2-2.5 2-5" }],
  ["path", { d: "M16 21c0-2.5 2-2.5 2-5" }],
  ["path", { d: "m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8" }],
  ["path", { d: "M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z" }],
  ["path", { d: "M6 21c0-2.5 2-2.5 2-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/album.mjs
var Album = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["polyline", { points: "11 3 11 11 14 8 17 11 17 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-center-horizontal.mjs
var AlignCenterHorizontal = [
  ["path", { d: "M2 12h20" }],
  ["path", { d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" }],
  ["path", { d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" }],
  ["path", { d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1" }],
  ["path", { d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-center-vertical.mjs
var AlignCenterVertical = [
  ["path", { d: "M12 2v20" }],
  ["path", { d: "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4" }],
  ["path", { d: "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4" }],
  ["path", { d: "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1" }],
  ["path", { d: "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-end-horizontal.mjs
var AlignEndHorizontal = [
  ["rect", { width: "6", height: "16", x: "4", y: "2", rx: "2" }],
  ["rect", { width: "6", height: "9", x: "14", y: "9", rx: "2" }],
  ["path", { d: "M22 22H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-end-vertical.mjs
var AlignEndVertical = [
  ["rect", { width: "16", height: "6", x: "2", y: "4", rx: "2" }],
  ["rect", { width: "9", height: "6", x: "9", y: "14", rx: "2" }],
  ["path", { d: "M22 22V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-horizontal-distribute-center.mjs
var AlignHorizontalDistributeCenter = [
  ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
  ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
  ["path", { d: "M17 22v-5" }],
  ["path", { d: "M17 7V2" }],
  ["path", { d: "M7 22v-3" }],
  ["path", { d: "M7 5V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-horizontal-distribute-end.mjs
var AlignHorizontalDistributeEnd = [
  ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
  ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
  ["path", { d: "M10 2v20" }],
  ["path", { d: "M20 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-horizontal-distribute-start.mjs
var AlignHorizontalDistributeStart = [
  ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
  ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
  ["path", { d: "M4 2v20" }],
  ["path", { d: "M14 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-horizontal-justify-center.mjs
var AlignHorizontalJustifyCenter = [
  ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2" }],
  ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2" }],
  ["path", { d: "M12 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-horizontal-justify-end.mjs
var AlignHorizontalJustifyEnd = [
  ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2" }],
  ["rect", { width: "6", height: "10", x: "12", y: "7", rx: "2" }],
  ["path", { d: "M22 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-horizontal-justify-start.mjs
var AlignHorizontalJustifyStart = [
  ["rect", { width: "6", height: "14", x: "6", y: "5", rx: "2" }],
  ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2" }],
  ["path", { d: "M2 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-horizontal-space-around.mjs
var AlignHorizontalSpaceAround = [
  ["rect", { width: "6", height: "10", x: "9", y: "7", rx: "2" }],
  ["path", { d: "M4 22V2" }],
  ["path", { d: "M20 22V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-horizontal-space-between.mjs
var AlignHorizontalSpaceBetween = [
  ["rect", { width: "6", height: "14", x: "3", y: "5", rx: "2" }],
  ["rect", { width: "6", height: "10", x: "15", y: "7", rx: "2" }],
  ["path", { d: "M3 2v20" }],
  ["path", { d: "M21 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-start-horizontal.mjs
var AlignStartHorizontal = [
  ["rect", { width: "6", height: "16", x: "4", y: "6", rx: "2" }],
  ["rect", { width: "6", height: "9", x: "14", y: "6", rx: "2" }],
  ["path", { d: "M22 2H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-start-vertical.mjs
var AlignStartVertical = [
  ["rect", { width: "9", height: "6", x: "6", y: "14", rx: "2" }],
  ["rect", { width: "16", height: "6", x: "6", y: "4", rx: "2" }],
  ["path", { d: "M2 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-vertical-distribute-center.mjs
var AlignVerticalDistributeCenter = [
  ["path", { d: "M22 17h-3" }],
  ["path", { d: "M22 7h-5" }],
  ["path", { d: "M5 17H2" }],
  ["path", { d: "M7 7H2" }],
  ["rect", { x: "5", y: "14", width: "14", height: "6", rx: "2" }],
  ["rect", { x: "7", y: "4", width: "10", height: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-vertical-distribute-end.mjs
var AlignVerticalDistributeEnd = [
  ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2" }],
  ["path", { d: "M2 20h20" }],
  ["path", { d: "M2 10h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-vertical-distribute-start.mjs
var AlignVerticalDistributeStart = [
  ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2" }],
  ["path", { d: "M2 14h20" }],
  ["path", { d: "M2 4h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-vertical-justify-center.mjs
var AlignVerticalJustifyCenter = [
  ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2" }],
  ["path", { d: "M2 12h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-vertical-justify-end.mjs
var AlignVerticalJustifyEnd = [
  ["rect", { width: "14", height: "6", x: "5", y: "12", rx: "2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2" }],
  ["path", { d: "M2 22h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-vertical-justify-start.mjs
var AlignVerticalJustifyStart = [
  ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "6", rx: "2" }],
  ["path", { d: "M2 2h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-vertical-space-around.mjs
var AlignVerticalSpaceAround = [
  ["rect", { width: "10", height: "6", x: "7", y: "9", rx: "2" }],
  ["path", { d: "M22 20H2" }],
  ["path", { d: "M22 4H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/align-vertical-space-between.mjs
var AlignVerticalSpaceBetween = [
  ["rect", { width: "14", height: "6", x: "5", y: "15", rx: "2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "3", rx: "2" }],
  ["path", { d: "M2 21h20" }],
  ["path", { d: "M2 3h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ampersand.mjs
var Ampersand = [
  ["path", { d: "M16 12h3" }],
  [
    "path",
    {
      d: "M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ambulance.mjs
var Ambulance = [
  ["path", { d: "M10 10H6" }],
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"
    }
  ],
  ["path", { d: "M8 8v4" }],
  ["path", { d: "M9 18h6" }],
  ["circle", { cx: "17", cy: "18", r: "2" }],
  ["circle", { cx: "7", cy: "18", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ampersands.mjs
var Ampersands = [
  [
    "path",
    { d: "M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5" }
  ],
  [
    "path",
    { d: "M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/amphora.mjs
var Amphora = [
  ["path", { d: "M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8" }],
  ["path", { d: "M10 5H8a2 2 0 0 0 0 4h.68" }],
  ["path", { d: "M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8" }],
  ["path", { d: "M14 5h2a2 2 0 0 1 0 4h-.68" }],
  ["path", { d: "M18 22H6" }],
  ["path", { d: "M9 2h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/anchor.mjs
var Anchor = [
  ["path", { d: "M12 6v16" }],
  ["path", { d: "m19 13 2-1a9 9 0 0 1-18 0l2 1" }],
  ["path", { d: "M9 11h6" }],
  ["circle", { cx: "12", cy: "4", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/annoyed.mjs
var Annoyed = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M8 15h8" }],
  ["path", { d: "M8 9h2" }],
  ["path", { d: "M14 9h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/angry.mjs
var Angry = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2" }],
  ["path", { d: "M7.5 8 10 9" }],
  ["path", { d: "m14 9 2.5-1" }],
  ["path", { d: "M9 10h.01" }],
  ["path", { d: "M15 10h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/antenna.mjs
var Antenna = [
  ["path", { d: "M2 12 7 2" }],
  ["path", { d: "m7 12 5-10" }],
  ["path", { d: "m12 12 5-10" }],
  ["path", { d: "m17 12 5-10" }],
  ["path", { d: "M4.5 7h15" }],
  ["path", { d: "M12 16v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/anvil.mjs
var Anvil = [
  ["path", { d: "M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" }],
  ["path", { d: "M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" }],
  ["path", { d: "M9 12v5" }],
  ["path", { d: "M15 12v5" }],
  ["path", { d: "M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/aperture.mjs
var Aperture = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m14.31 8 5.74 9.94" }],
  ["path", { d: "M9.69 8h11.48" }],
  ["path", { d: "m7.38 12 5.74-9.94" }],
  ["path", { d: "M9.69 16 3.95 6.06" }],
  ["path", { d: "M14.31 16H2.83" }],
  ["path", { d: "m16.62 12-5.74 9.94" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/app-window-mac.mjs
var AppWindowMac = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
  ["path", { d: "M6 8h.01" }],
  ["path", { d: "M10 8h.01" }],
  ["path", { d: "M14 8h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/app-window.mjs
var AppWindow = [
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
  ["path", { d: "M10 4v4" }],
  ["path", { d: "M2 8h20" }],
  ["path", { d: "M6 4v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/apple.mjs
var Apple = [
  ["path", { d: "M12 6.528V3a1 1 0 0 1 1-1h0" }],
  [
    "path",
    {
      d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/archive-restore.mjs
var ArchiveRestore = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h2" }],
  ["path", { d: "M20 8v11a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "m9 15 3-3 3 3" }],
  ["path", { d: "M12 12v9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/archive-x.mjs
var ArchiveX = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" }],
  ["path", { d: "m9.5 17 5-5" }],
  ["path", { d: "m9.5 12 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/archive.mjs
var Archive = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" }],
  ["path", { d: "M10 12h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/armchair.mjs
var Armchair = [
  ["path", { d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" }],
  [
    "path",
    {
      d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"
    }
  ],
  ["path", { d: "M5 18v2" }],
  ["path", { d: "M19 18v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-big-down-dash.mjs
var ArrowBigDownDash = [
  [
    "path",
    {
      d: "M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z"
    }
  ],
  ["path", { d: "M9 4h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-big-left-dash.mjs
var ArrowBigLeftDash = [
  [
    "path",
    {
      d: "M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"
    }
  ],
  ["path", { d: "M20 9v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-big-down.mjs
var ArrowBigDown = [
  [
    "path",
    {
      d: "M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-big-left.mjs
var ArrowBigLeft = [
  [
    "path",
    {
      d: "M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-big-right-dash.mjs
var ArrowBigRightDash = [
  [
    "path",
    {
      d: "M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"
    }
  ],
  ["path", { d: "M4 9v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-big-right.mjs
var ArrowBigRight = [
  [
    "path",
    {
      d: "M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-big-up-dash.mjs
var ArrowBigUpDash = [
  [
    "path",
    {
      d: "M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z"
    }
  ],
  ["path", { d: "M9 20h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-big-up.mjs
var ArrowBigUp = [
  [
    "path",
    {
      d: "M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-0-1.mjs
var ArrowDown01 = [
  ["path", { d: "m3 16 4 4 4-4" }],
  ["path", { d: "M7 20V4" }],
  ["rect", { x: "15", y: "4", width: "4", height: "6", ry: "2" }],
  ["path", { d: "M17 20v-6h-2" }],
  ["path", { d: "M15 20h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-1-0.mjs
var ArrowDown10 = [
  ["path", { d: "m3 16 4 4 4-4" }],
  ["path", { d: "M7 20V4" }],
  ["path", { d: "M17 10V4h-2" }],
  ["path", { d: "M15 10h4" }],
  ["rect", { x: "15", y: "14", width: "4", height: "6", ry: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-a-z.mjs
var ArrowDownAZ = [
  ["path", { d: "m3 16 4 4 4-4" }],
  ["path", { d: "M7 20V4" }],
  ["path", { d: "M20 8h-5" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" }],
  ["path", { d: "M15 14h5l-5 6h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-from-line.mjs
var ArrowDownFromLine = [
  ["path", { d: "M19 3H5" }],
  ["path", { d: "M12 21V7" }],
  ["path", { d: "m6 15 6 6 6-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-left.mjs
var ArrowDownLeft = [
  ["path", { d: "M17 7 7 17" }],
  ["path", { d: "M17 17H7V7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-narrow-wide.mjs
var ArrowDownNarrowWide = [
  ["path", { d: "m3 16 4 4 4-4" }],
  ["path", { d: "M7 20V4" }],
  ["path", { d: "M11 4h4" }],
  ["path", { d: "M11 8h7" }],
  ["path", { d: "M11 12h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-right.mjs
var ArrowDownRight = [
  ["path", { d: "m7 7 10 10" }],
  ["path", { d: "M17 7v10H7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-to-dot.mjs
var ArrowDownToDot = [
  ["path", { d: "M12 2v14" }],
  ["path", { d: "m19 9-7 7-7-7" }],
  ["circle", { cx: "12", cy: "21", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-to-line.mjs
var ArrowDownToLine = [
  ["path", { d: "M12 17V3" }],
  ["path", { d: "m6 11 6 6 6-6" }],
  ["path", { d: "M19 21H5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-up.mjs
var ArrowDownUp = [
  ["path", { d: "m3 16 4 4 4-4" }],
  ["path", { d: "M7 20V4" }],
  ["path", { d: "m21 8-4-4-4 4" }],
  ["path", { d: "M17 4v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-wide-narrow.mjs
var ArrowDownWideNarrow = [
  ["path", { d: "m3 16 4 4 4-4" }],
  ["path", { d: "M7 20V4" }],
  ["path", { d: "M11 4h10" }],
  ["path", { d: "M11 8h7" }],
  ["path", { d: "M11 12h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down-z-a.mjs
var ArrowDownZA = [
  ["path", { d: "m3 16 4 4 4-4" }],
  ["path", { d: "M7 4v16" }],
  ["path", { d: "M15 4h5l-5 6h5" }],
  ["path", { d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" }],
  ["path", { d: "M20 18h-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-down.mjs
var ArrowDown = [
  ["path", { d: "M12 5v14" }],
  ["path", { d: "m19 12-7 7-7-7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-left-right.mjs
var ArrowLeftRight = [
  ["path", { d: "M8 3 4 7l4 4" }],
  ["path", { d: "M4 7h16" }],
  ["path", { d: "m16 21 4-4-4-4" }],
  ["path", { d: "M20 17H4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-left-from-line.mjs
var ArrowLeftFromLine = [
  ["path", { d: "m9 6-6 6 6 6" }],
  ["path", { d: "M3 12h14" }],
  ["path", { d: "M21 19V5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-left-to-line.mjs
var ArrowLeftToLine = [
  ["path", { d: "M3 19V5" }],
  ["path", { d: "m13 6-6 6 6 6" }],
  ["path", { d: "M7 12h14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-left.mjs
var ArrowLeft = [
  ["path", { d: "m12 19-7-7 7-7" }],
  ["path", { d: "M19 12H5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-right-from-line.mjs
var ArrowRightFromLine = [
  ["path", { d: "M3 5v14" }],
  ["path", { d: "M21 12H7" }],
  ["path", { d: "m15 18 6-6-6-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-right-left.mjs
var ArrowRightLeft = [
  ["path", { d: "m16 3 4 4-4 4" }],
  ["path", { d: "M20 7H4" }],
  ["path", { d: "m8 21-4-4 4-4" }],
  ["path", { d: "M4 17h16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-right-to-line.mjs
var ArrowRightToLine = [
  ["path", { d: "M17 12H3" }],
  ["path", { d: "m11 18 6-6-6-6" }],
  ["path", { d: "M21 5v14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-right.mjs
var ArrowRight = [
  ["path", { d: "M5 12h14" }],
  ["path", { d: "m12 5 7 7-7 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-0-1.mjs
var ArrowUp01 = [
  ["path", { d: "m3 8 4-4 4 4" }],
  ["path", { d: "M7 4v16" }],
  ["rect", { x: "15", y: "4", width: "4", height: "6", ry: "2" }],
  ["path", { d: "M17 20v-6h-2" }],
  ["path", { d: "M15 20h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-1-0.mjs
var ArrowUp10 = [
  ["path", { d: "m3 8 4-4 4 4" }],
  ["path", { d: "M7 4v16" }],
  ["path", { d: "M17 10V4h-2" }],
  ["path", { d: "M15 10h4" }],
  ["rect", { x: "15", y: "14", width: "4", height: "6", ry: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-a-z.mjs
var ArrowUpAZ = [
  ["path", { d: "m3 8 4-4 4 4" }],
  ["path", { d: "M7 4v16" }],
  ["path", { d: "M20 8h-5" }],
  ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" }],
  ["path", { d: "M15 14h5l-5 6h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-down.mjs
var ArrowUpDown = [
  ["path", { d: "m21 16-4 4-4-4" }],
  ["path", { d: "M17 20V4" }],
  ["path", { d: "m3 8 4-4 4 4" }],
  ["path", { d: "M7 4v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-from-dot.mjs
var ArrowUpFromDot = [
  ["path", { d: "m5 9 7-7 7 7" }],
  ["path", { d: "M12 16V2" }],
  ["circle", { cx: "12", cy: "21", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-from-line.mjs
var ArrowUpFromLine = [
  ["path", { d: "m18 9-6-6-6 6" }],
  ["path", { d: "M12 3v14" }],
  ["path", { d: "M5 21h14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-left.mjs
var ArrowUpLeft = [
  ["path", { d: "M7 17V7h10" }],
  ["path", { d: "M17 17 7 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-narrow-wide.mjs
var ArrowUpNarrowWide = [
  ["path", { d: "m3 8 4-4 4 4" }],
  ["path", { d: "M7 4v16" }],
  ["path", { d: "M11 12h4" }],
  ["path", { d: "M11 16h7" }],
  ["path", { d: "M11 20h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-right.mjs
var ArrowUpRight = [
  ["path", { d: "M7 7h10v10" }],
  ["path", { d: "M7 17 17 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-to-line.mjs
var ArrowUpToLine = [
  ["path", { d: "M5 3h14" }],
  ["path", { d: "m18 13-6-6-6 6" }],
  ["path", { d: "M12 7v14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-wide-narrow.mjs
var ArrowUpWideNarrow = [
  ["path", { d: "m3 8 4-4 4 4" }],
  ["path", { d: "M7 4v16" }],
  ["path", { d: "M11 12h10" }],
  ["path", { d: "M11 16h7" }],
  ["path", { d: "M11 20h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up-z-a.mjs
var ArrowUpZA = [
  ["path", { d: "m3 8 4-4 4 4" }],
  ["path", { d: "M7 4v16" }],
  ["path", { d: "M15 4h5l-5 6h5" }],
  ["path", { d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" }],
  ["path", { d: "M20 18h-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrow-up.mjs
var ArrowUp = [
  ["path", { d: "m5 12 7-7 7 7" }],
  ["path", { d: "M12 19V5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/arrows-up-from-line.mjs
var ArrowsUpFromLine = [
  ["path", { d: "m4 6 3-3 3 3" }],
  ["path", { d: "M7 17V3" }],
  ["path", { d: "m14 6 3-3 3 3" }],
  ["path", { d: "M17 17V3" }],
  ["path", { d: "M4 21h16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/asterisk.mjs
var Asterisk = [
  ["path", { d: "M12 6v12" }],
  ["path", { d: "M17.196 9 6.804 15" }],
  ["path", { d: "m6.804 9 10.392 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/astroid.mjs
var Astroid = [
  [
    "path",
    {
      d: "M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/atom.mjs
var Atom = [
  ["circle", { cx: "12", cy: "12", r: "1" }],
  [
    "path",
    {
      d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"
    }
  ],
  [
    "path",
    {
      d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/at-sign.mjs
var AtSign = [
  ["circle", { cx: "12", cy: "12", r: "4" }],
  ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/audio-lines.mjs
var AudioLines = [
  ["path", { d: "M2 10v3" }],
  ["path", { d: "M6 6v11" }],
  ["path", { d: "M10 3v18" }],
  ["path", { d: "M14 8v7" }],
  ["path", { d: "M18 5v13" }],
  ["path", { d: "M22 10v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/audio-waveform.mjs
var AudioWaveform = [
  [
    "path",
    {
      d: "M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/axe.mjs
var Axe = [
  ["path", { d: "m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9" }],
  [
    "path",
    {
      d: "M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/award.mjs
var Award = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/axis-3d.mjs
var Axis3d = [
  ["path", { d: "M13.5 10.5 15 9" }],
  ["path", { d: "M4 4v15a1 1 0 0 0 1 1h15" }],
  ["path", { d: "M4.293 19.707 6 18" }],
  ["path", { d: "m9 15 1.5-1.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/baby.mjs
var Baby = [
  ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" }],
  ["path", { d: "M15 12h.01" }],
  [
    "path",
    {
      d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"
    }
  ],
  ["path", { d: "M9 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/backpack.mjs
var Backpack = [
  ["path", { d: "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" }],
  ["path", { d: "M8 10h8" }],
  ["path", { d: "M8 18h8" }],
  ["path", { d: "M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" }],
  ["path", { d: "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-alert.mjs
var BadgeAlert = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-cent.mjs
var BadgeCent = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "M12 7v10" }],
  ["path", { d: "M15.4 10a4 4 0 1 0 0 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-dollar-sign.mjs
var BadgeDollarSign = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
  ["path", { d: "M12 18V6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-euro.mjs
var BadgeEuro = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "M7 12h5" }],
  ["path", { d: "M15 9.4a4 4 0 1 0 0 5.2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-check.mjs
var BadgeCheck = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-indian-rupee.mjs
var BadgeIndianRupee = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "M8 8h8" }],
  ["path", { d: "M8 12h8" }],
  ["path", { d: "m13 17-5-1h1a4 4 0 0 0 0-8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-info.mjs
var BadgeInfo = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "16", y2: "12" }],
  ["line", { x1: "12", x2: "12.01", y1: "8", y2: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-japanese-yen.mjs
var BadgeJapaneseYen = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "m9 8 3 3v7" }],
  ["path", { d: "m12 11 3-3" }],
  ["path", { d: "M9 12h6" }],
  ["path", { d: "M9 16h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-minus.mjs
var BadgeMinus = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-percent.mjs
var BadgePercent = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "m15 9-6 6" }],
  ["path", { d: "M9 9h.01" }],
  ["path", { d: "M15 15h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-plus.mjs
var BadgePlus = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "16" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-pound-sterling.mjs
var BadgePoundSterling = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "M8 12h4" }],
  ["path", { d: "M10 16V9.5a2.5 2.5 0 0 1 5 0" }],
  ["path", { d: "M8 16h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-question-mark.mjs
var BadgeQuestionMark = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
  ["line", { x1: "12", x2: "12.01", y1: "17", y2: "17" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-russian-ruble.mjs
var BadgeRussianRuble = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "M9 16h5" }],
  ["path", { d: "M9 12h5a2 2 0 1 0 0-4h-3v9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-swiss-franc.mjs
var BadgeSwissFranc = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["path", { d: "M11 17V8h4" }],
  ["path", { d: "M11 12h3" }],
  ["path", { d: "M9 16h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-turkish-lira.mjs
var BadgeTurkishLira = [
  ["path", { d: "M11 7v10a5 5 0 0 0 5-5" }],
  ["path", { d: "m15 8-6 3" }],
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge-x.mjs
var BadgeX = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ],
  ["line", { x1: "15", x2: "9", y1: "9", y2: "15" }],
  ["line", { x1: "9", x2: "15", y1: "9", y2: "15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/badge.mjs
var Badge = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/baggage-claim.mjs
var BaggageClaim = [
  ["path", { d: "M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" }],
  ["path", { d: "M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" }],
  ["rect", { width: "13", height: "8", x: "8", y: "6", rx: "1" }],
  ["circle", { cx: "18", cy: "20", r: "2" }],
  ["circle", { cx: "9", cy: "20", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/balloon.mjs
var Balloon = [
  ["path", { d: "M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1" }],
  ["path", { d: "M12 6a2 2 0 0 1 2 2" }],
  ["path", { d: "M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ban.mjs
var Ban = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M4.929 4.929 19.07 19.071" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/banana.mjs
var Banana = [
  ["path", { d: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" }],
  [
    "path",
    {
      d: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bandage.mjs
var Bandage = [
  ["path", { d: "M10 10.01h.01" }],
  ["path", { d: "M10 14.01h.01" }],
  ["path", { d: "M14 10.01h.01" }],
  ["path", { d: "M14 14.01h.01" }],
  ["path", { d: "M18 6v12" }],
  ["path", { d: "M6 6v12" }],
  ["rect", { x: "2", y: "6", width: "20", height: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/banknote-arrow-down.mjs
var BanknoteArrowDown = [
  ["path", { d: "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" }],
  ["path", { d: "m16 19 3 3 3-3" }],
  ["path", { d: "M18 12h.01" }],
  ["path", { d: "M19 16v6" }],
  ["path", { d: "M6 12h.01" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/banknote-arrow-up.mjs
var BanknoteArrowUp = [
  ["path", { d: "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" }],
  ["path", { d: "M18 12h.01" }],
  ["path", { d: "M19 22v-6" }],
  ["path", { d: "m22 19-3-3-3 3" }],
  ["path", { d: "M6 12h.01" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/banknote-check.mjs
var BanknoteCheck = [
  ["path", { d: "M11.748 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.875" }],
  ["path", { d: "m16 19 2 2 4-4" }],
  ["path", { d: "M18 12h.01" }],
  ["path", { d: "M6 12h.01" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/banknote-x.mjs
var BanknoteX = [
  ["path", { d: "M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" }],
  ["path", { d: "m17 17 5 5" }],
  ["path", { d: "M18 12h.01" }],
  ["path", { d: "m22 17-5 5" }],
  ["path", { d: "M6 12h.01" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/banknote.mjs
var Banknote = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }],
  ["circle", { cx: "12", cy: "12", r: "2" }],
  ["path", { d: "M6 12h.01M18 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/barcode.mjs
var Barcode = [
  ["path", { d: "M3 5v14" }],
  ["path", { d: "M8 5v14" }],
  ["path", { d: "M12 5v14" }],
  ["path", { d: "M17 5v14" }],
  ["path", { d: "M21 5v14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/barrel.mjs
var Barrel = [
  ["path", { d: "M10 3a41 41 0 0 0 0 18" }],
  ["path", { d: "M14 3a41 41 0 0 1 0 18" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z"
    }
  ],
  ["path", { d: "M3.84 17h16.32" }],
  ["path", { d: "M3.84 7h16.32" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/baseline.mjs
var Baseline = [
  ["path", { d: "M4 20h16" }],
  ["path", { d: "m6 16 6-12 6 12" }],
  ["path", { d: "M8 12h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bath.mjs
var Bath = [
  ["path", { d: "M10 4 8 6" }],
  ["path", { d: "M17 19v2" }],
  ["path", { d: "M2 12h20" }],
  ["path", { d: "M7 19v2" }],
  ["path", { d: "M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/battery-charging.mjs
var BatteryCharging = [
  ["path", { d: "m11 7-3 5h4l-3 5" }],
  ["path", { d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" }],
  ["path", { d: "M22 14v-4" }],
  ["path", { d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/battery-full.mjs
var BatteryFull = [
  ["path", { d: "M10 10v4" }],
  ["path", { d: "M14 10v4" }],
  ["path", { d: "M22 14v-4" }],
  ["path", { d: "M6 10v4" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/battery-low.mjs
var BatteryLow = [
  ["path", { d: "M22 14v-4" }],
  ["path", { d: "M6 14v-4" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/battery-plus.mjs
var BatteryPlus = [
  ["path", { d: "M10 9v6" }],
  ["path", { d: "M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605" }],
  ["path", { d: "M22 14v-4" }],
  ["path", { d: "M7 12h6" }],
  ["path", { d: "M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/battery-medium.mjs
var BatteryMedium = [
  ["path", { d: "M10 14v-4" }],
  ["path", { d: "M22 14v-4" }],
  ["path", { d: "M6 14v-4" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/battery-warning.mjs
var BatteryWarning = [
  ["path", { d: "M10 17h.01" }],
  ["path", { d: "M10 7v6" }],
  ["path", { d: "M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M22 14v-4" }],
  ["path", { d: "M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/battery.mjs
var Battery = [
  ["path", { d: "M 22 14 L 22 10" }],
  ["rect", { x: "2", y: "6", width: "16", height: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/beaker.mjs
var Beaker = [
  ["path", { d: "M4.5 3h15" }],
  ["path", { d: "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" }],
  ["path", { d: "M6 14h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bean-off.mjs
var BeanOff = [
  ["path", { d: "M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1" }],
  ["path", { d: "M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66" }],
  ["path", { d: "M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bean.mjs
var Bean = [
  [
    "path",
    {
      d: "M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"
    }
  ],
  ["path", { d: "M5.341 10.62a4 4 0 1 0 5.279-5.28" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bed-double.mjs
var BedDouble = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }],
  ["path", { d: "M12 4v6" }],
  ["path", { d: "M2 18h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bed.mjs
var Bed = [
  ["path", { d: "M2 4v16" }],
  ["path", { d: "M2 8h18a2 2 0 0 1 2 2v10" }],
  ["path", { d: "M2 17h20" }],
  ["path", { d: "M6 8v9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bed-single.mjs
var BedSingle = [
  ["path", { d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" }],
  ["path", { d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" }],
  ["path", { d: "M3 18h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/beef-off.mjs
var BeefOff = [
  ["path", { d: "M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12" }],
  ["path", { d: "M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04" }],
  ["path", { d: "M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" }],
  ["path", { d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393" }],
  ["path", { d: "m2 2 20 20" }],
  [
    "path",
    {
      d: "M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/beef.mjs
var Beef = [
  [
    "path",
    {
      d: "M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3"
    }
  ],
  [
    "path",
    {
      d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"
    }
  ],
  ["circle", { cx: "12.5", cy: "8.5", r: "2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/beer-off.mjs
var BeerOff = [
  ["path", { d: "M13 13v5" }],
  ["path", { d: "M17 11.47V8" }],
  ["path", { d: "M17 11h1a3 3 0 0 1 2.745 4.211" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" }],
  ["path", { d: "M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268" }],
  [
    "path",
    {
      d: "M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12"
    }
  ],
  ["path", { d: "M9 14.6V18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/beer.mjs
var Beer = [
  ["path", { d: "M17 11h1a3 3 0 0 1 0 6h-1" }],
  ["path", { d: "M9 12v6" }],
  ["path", { d: "M13 12v6" }],
  [
    "path",
    {
      d: "M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"
    }
  ],
  ["path", { d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bell-dot.mjs
var BellDot = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
  [
    "path",
    {
      d: "M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348"
    }
  ],
  ["circle", { cx: "18", cy: "5", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bell-check.mjs
var BellCheck = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
  ["path", { d: "m15 8 2 2 4-4" }],
  ["path", { d: "M16.8607 4.4824A6 6 0 0 0 6 8C6 12.499 4.589 13.956 3.262 15.326" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17H20A1 1 0 0 0 20.74 15.327C20.209 14.779 19.665 14.218 19.203 13.454"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bell-electric.mjs
var BellElectric = [
  ["path", { d: "M18.518 17.347A7 7 0 0 1 14 19" }],
  ["path", { d: "M18.8 4A11 11 0 0 1 20 9" }],
  ["path", { d: "M9 9h.01" }],
  ["circle", { cx: "20", cy: "16", r: "2" }],
  ["circle", { cx: "9", cy: "9", r: "7" }],
  ["rect", { x: "4", y: "16", width: "10", height: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bell-minus.mjs
var BellMinus = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
  ["path", { d: "M15 8h6" }],
  [
    "path",
    {
      d: "M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bell-off.mjs
var BellOff = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
  ["path", { d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bell-plus.mjs
var BellPlus = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
  ["path", { d: "M15 8h6" }],
  ["path", { d: "M18 5v6" }],
  [
    "path",
    {
      d: "M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bell-ring.mjs
var BellRing = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
  ["path", { d: "M22 8c0-2.3-.8-4.3-2-6" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
    }
  ],
  ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bell.mjs
var Bell = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/between-horizontal-end.mjs
var BetweenHorizontalEnd = [
  ["rect", { width: "13", height: "7", x: "3", y: "3", rx: "1" }],
  ["path", { d: "m22 15-3-3 3-3" }],
  ["rect", { width: "13", height: "7", x: "3", y: "14", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/between-horizontal-start.mjs
var BetweenHorizontalStart = [
  ["rect", { width: "13", height: "7", x: "8", y: "3", rx: "1" }],
  ["path", { d: "m2 9 3 3-3 3" }],
  ["rect", { width: "13", height: "7", x: "8", y: "14", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/between-vertical-start.mjs
var BetweenVerticalStart = [
  ["rect", { width: "7", height: "13", x: "3", y: "8", rx: "1" }],
  ["path", { d: "m15 2-3 3-3-3" }],
  ["rect", { width: "7", height: "13", x: "14", y: "8", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/between-vertical-end.mjs
var BetweenVerticalEnd = [
  ["rect", { width: "7", height: "13", x: "3", y: "3", rx: "1" }],
  ["path", { d: "m9 22 3-3 3 3" }],
  ["rect", { width: "7", height: "13", x: "14", y: "3", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/biceps-flexed.mjs
var BicepsFlexed = [
  [
    "path",
    {
      d: "M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"
    }
  ],
  ["path", { d: "M15 14a5 5 0 0 0-7.584 2" }],
  ["path", { d: "M9.964 6.825C8.019 7.977 9.5 13 8 15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/binary.mjs
var Binary = [
  ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2" }],
  ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2" }],
  ["path", { d: "M6 20h4" }],
  ["path", { d: "M14 10h4" }],
  ["path", { d: "M6 14h2v6" }],
  ["path", { d: "M14 4h2v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bike.mjs
var Bike = [
  ["circle", { cx: "18.5", cy: "17.5", r: "3.5" }],
  ["circle", { cx: "5.5", cy: "17.5", r: "3.5" }],
  ["circle", { cx: "15", cy: "5", r: "1" }],
  ["path", { d: "M12 17.5V14l-3-3 4-3 2 3h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/binoculars.mjs
var Binoculars = [
  ["path", { d: "M10 10h4" }],
  ["path", { d: "M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" }],
  [
    "path",
    {
      d: "M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"
    }
  ],
  ["path", { d: "M 22 16 L 2 16" }],
  [
    "path",
    {
      d: "M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/biohazard.mjs
var Biohazard = [
  ["circle", { cx: "12", cy: "11.9", r: "2" }],
  ["path", { d: "M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6" }],
  ["path", { d: "m8.9 10.1 1.4.8" }],
  ["path", { d: "M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5" }],
  ["path", { d: "m15.1 10.1-1.4.8" }],
  ["path", { d: "M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2" }],
  ["path", { d: "M12 13.9v1.6" }],
  ["path", { d: "M13.5 5.4c-1-.2-2-.2-3 0" }],
  ["path", { d: "M17 16.4c.7-.7 1.2-1.6 1.5-2.5" }],
  ["path", { d: "M5.5 13.9c.3.9.8 1.8 1.5 2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bird.mjs
var Bird = [
  ["path", { d: "M16 7h.01" }],
  ["path", { d: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" }],
  ["path", { d: "m20 7 2 .5-2 .5" }],
  ["path", { d: "M10 18v3" }],
  ["path", { d: "M14 17.75V21" }],
  ["path", { d: "M7 18a6 6 0 0 0 3.84-10.61" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bitcoin.mjs
var Bitcoin = [
  [
    "path",
    {
      d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/birdhouse.mjs
var Birdhouse = [
  ["path", { d: "M12 18v4" }],
  ["path", { d: "m17 18 1.956-11.468" }],
  ["path", { d: "m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8" }],
  ["path", { d: "M4 18h16" }],
  ["path", { d: "M7 18 5.044 6.532" }],
  ["circle", { cx: "12", cy: "10", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/blend.mjs
var Blend = [
  ["circle", { cx: "9", cy: "9", r: "7" }],
  ["circle", { cx: "15", cy: "15", r: "7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/blender.mjs
var Blender = [
  [
    "path",
    {
      d: "M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z"
    }
  ],
  ["path", { d: "m17 2-1 12" }],
  ["path", { d: "M8.006 14 7 2" }],
  ["path", { d: "M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75" }],
  ["path", { d: "M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5" }],
  ["path", { d: "M12 18h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/blinds.mjs
var Blinds = [
  ["path", { d: "M3 3h18" }],
  ["path", { d: "M20 7H8" }],
  ["path", { d: "M20 11H8" }],
  ["path", { d: "M10 19h10" }],
  ["path", { d: "M8 15h12" }],
  ["path", { d: "M4 3v14" }],
  ["circle", { cx: "4", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/blocks.mjs
var Blocks = [
  [
    "path",
    {
      d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"
    }
  ],
  ["rect", { x: "14", y: "2", width: "8", height: "8", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bluetooth-connected.mjs
var BluetoothConnected = [
  ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "12" }],
  ["line", { x1: "3", x2: "6", y1: "12", y2: "12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bluetooth-off.mjs
var BluetoothOff = [
  ["path", { d: "m17 17-5 5V12l-5 5" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M14.5 9.5 17 7l-5-5v4.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bluetooth-searching.mjs
var BluetoothSearching = [
  ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }],
  ["path", { d: "M20.83 14.83a4 4 0 0 0 0-5.66" }],
  ["path", { d: "M18 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bluetooth.mjs
var Bluetooth = [["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bold.mjs
var Bold = [
  ["path", { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bomb.mjs
var Bomb = [
  ["circle", { cx: "11", cy: "13", r: "9" }],
  [
    "path",
    { d: "M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95" }
  ],
  ["path", { d: "m22 2-1.5 1.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bolt.mjs
var Bolt = [
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bone-fracture.mjs
var BoneFracture = [
  [
    "path",
    {
      d: "M14 4.5a1 1 0 0 1 5 0 .5.5 0 0 0 .5.5 1 1 0 0 1 0 5c-.81 0-1.8-.7-2.5 0l-1.958 1.957a.15.15 0 0 1-.252-.072l-.493-2.07a.15.15 0 0 0-.111-.112l-2.072-.494a.15.15 0 0 1-.072-.252L14 7c.7-.7 0-1.69 0-2.5"
    }
  ],
  ["path", { d: "m16 20-1-2" }],
  ["path", { d: "m20 16-2-1" }],
  ["path", { d: "m4 8 2 1" }],
  ["path", { d: "m8 4 1 2" }],
  [
    "path",
    {
      d: "M9.698 14.19a.15.15 0 0 0 .112.112l2.074.489a.15.15 0 0 1 .072.252L10 17c-.7.7 0 1.69 0 2.5a1 1 0 0 1-5 0 .495.495 0 0 0-.5-.5 1 1 0 0 1 0-5c.81 0 1.8.7 2.5 0l1.956-1.957a.15.15 0 0 1 .252.072z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bone.mjs
var Bone = [
  [
    "path",
    {
      d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-a.mjs
var BookA = [
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "m8 13 4-7 4 7" }],
  ["path", { d: "M9.1 11h5.7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-alert.mjs
var BookAlert = [
  ["path", { d: "M12 13h.01" }],
  ["path", { d: "M12 6v3" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-audio.mjs
var BookAudio = [
  ["path", { d: "M12 6v7" }],
  ["path", { d: "M16 8v3" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "M8 8v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-check.mjs
var BookCheck = [
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "m9 9.5 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-dashed.mjs
var BookDashed = [
  ["path", { d: "M12 17h1.5" }],
  ["path", { d: "M12 22h1.5" }],
  ["path", { d: "M12 2h1.5" }],
  ["path", { d: "M17.5 22H19a1 1 0 0 0 1-1" }],
  ["path", { d: "M17.5 2H19a1 1 0 0 1 1 1v1.5" }],
  ["path", { d: "M20 14v3h-2.5" }],
  ["path", { d: "M20 8.5V10" }],
  ["path", { d: "M4 10V8.5" }],
  ["path", { d: "M4 19.5V14" }],
  ["path", { d: "M4 4.5A2.5 2.5 0 0 1 6.5 2H8" }],
  ["path", { d: "M8 22H6.5a1 1 0 0 1 0-5H8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-copy.mjs
var BookCopy = [
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11" }],
  ["path", { d: "M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21" }],
  [
    "path",
    { d: "M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-down.mjs
var BookDown = [
  ["path", { d: "M12 13V7" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "m9 10 3 3 3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-headphones.mjs
var BookHeadphones = [
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "M8 12v-2a4 4 0 0 1 8 0v2" }],
  ["circle", { cx: "15", cy: "12", r: "1" }],
  ["circle", { cx: "9", cy: "12", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-heart.mjs
var BookHeart = [
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  [
    "path",
    {
      d: "M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-image.mjs
var BookImage = [
  ["path", { d: "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["circle", { cx: "10", cy: "8", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-key.mjs
var BookKey = [
  ["path", { d: "M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15" }],
  ["path", { d: "M17 2v6" }],
  ["path", { d: "M17 4h2" }],
  ["path", { d: "M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }],
  ["circle", { cx: "17", cy: "10", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-lock.mjs
var BookLock = [
  ["path", { d: "M18 6V4a2 2 0 1 0-4 0v2" }],
  ["path", { d: "M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }],
  ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" }],
  ["rect", { x: "12", y: "6", width: "8", height: "5", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-marked.mjs
var BookMarked = [
  ["path", { d: "M10 2v8l3-3 3 3V2" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-minus.mjs
var BookMinus = [
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "M9 10h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-open-text.mjs
var BookOpenText = [
  ["path", { d: "M12 7v14" }],
  ["path", { d: "M16 12h2" }],
  ["path", { d: "M16 8h2" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
    }
  ],
  ["path", { d: "M6 12h2" }],
  ["path", { d: "M6 8h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-open-check.mjs
var BookOpenCheck = [
  ["path", { d: "M12 21V7" }],
  ["path", { d: "m16 12 2 2 4-4" }],
  [
    "path",
    {
      d: "M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-open.mjs
var BookOpen = [
  ["path", { d: "M12 7v14" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-plus.mjs
var BookPlus = [
  ["path", { d: "M12 7v6" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "M9 10h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-search.mjs
var BookSearch = [
  ["path", { d: "M11 22H5.5a1 1 0 0 1 0-5h4.501" }],
  ["path", { d: "m21 22-1.879-1.878" }],
  ["path", { d: "M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8" }],
  ["circle", { cx: "17", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-text.mjs
var BookText = [
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "M8 11h8" }],
  ["path", { d: "M8 7h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-type.mjs
var BookType = [
  ["path", { d: "M10 13h4" }],
  ["path", { d: "M12 6v7" }],
  ["path", { d: "M16 8V6H8v2" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-up-2.mjs
var BookUp2 = [
  ["path", { d: "M12 13V7" }],
  ["path", { d: "M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }],
  ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" }],
  ["path", { d: "m9 10 3-3 3 3" }],
  ["path", { d: "m9 5 3-3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-up.mjs
var BookUp = [
  ["path", { d: "M12 13V7" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "m9 10 3-3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-user.mjs
var BookUser = [
  ["path", { d: "M15 13a3 3 0 1 0-6 0" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["circle", { cx: "12", cy: "8", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book-x.mjs
var BookX = [
  ["path", { d: "m14.5 7-5 5" }],
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ],
  ["path", { d: "m9.5 7 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/book.mjs
var Book = [
  [
    "path",
    { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bookmark-check.mjs
var BookmarkCheck = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }
  ],
  ["path", { d: "m9 10 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bookmark-minus.mjs
var BookmarkMinus = [
  ["path", { d: "M15 10H9" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bookmark-off.mjs
var BookmarkOff = [
  [
    "path",
    {
      d: "M19 19v1a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5"
    }
  ],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M8.656 3H17a2 2 0 0 1 2 2v8.344" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bookmark-plus.mjs
var BookmarkPlus = [
  ["path", { d: "M12 7v6" }],
  ["path", { d: "M15 10H9" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bookmark-x.mjs
var BookmarkX = [
  ["path", { d: "m14.5 7.5-5 5" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }
  ],
  ["path", { d: "m9.5 7.5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bookmark.mjs
var Bookmark = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bot-message-square.mjs
var BotMessageSquare = [
  ["path", { d: "M12 6V2H8" }],
  ["path", { d: "M15 11v2" }],
  ["path", { d: "M2 12h2" }],
  ["path", { d: "M20 12h2" }],
  [
    "path",
    {
      d: "M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "M9 11v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/boom-box.mjs
var BoomBox = [
  ["path", { d: "M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }],
  ["path", { d: "M8 8v1" }],
  ["path", { d: "M12 8v1" }],
  ["path", { d: "M16 8v1" }],
  ["rect", { width: "20", height: "12", x: "2", y: "9", rx: "2" }],
  ["circle", { cx: "8", cy: "15", r: "2" }],
  ["circle", { cx: "16", cy: "15", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bot.mjs
var Bot = [
  ["path", { d: "M12 8V4H8" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2" }],
  ["path", { d: "M2 14h2" }],
  ["path", { d: "M20 14h2" }],
  ["path", { d: "M15 13v2" }],
  ["path", { d: "M9 13v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bot-off.mjs
var BotOff = [
  ["path", { d: "M13.67 8H18a2 2 0 0 1 2 2v4.33" }],
  ["path", { d: "M2 14h2" }],
  ["path", { d: "M20 14h2" }],
  ["path", { d: "M22 22 2 2" }],
  ["path", { d: "M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586" }],
  ["path", { d: "M9 13v2" }],
  ["path", { d: "M9.67 4H12v2.33" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bottle-wine.mjs
var BottleWine = [
  [
    "path",
    {
      d: "M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z"
    }
  ],
  ["path", { d: "M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bow-arrow.mjs
var BowArrow = [
  ["path", { d: "M17 3h4v4" }],
  ["path", { d: "M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17" }],
  ["path", { d: "M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05" }],
  [
    "path",
    {
      d: "M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z"
    }
  ],
  ["path", { d: "M9.707 14.293 21 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/box.mjs
var Box = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5" }],
  ["path", { d: "M12 22V12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/boxes.mjs
var Boxes = [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85" }],
  ["path", { d: "m7 16.5 5-3" }],
  ["path", { d: "M7 16.5v5.17" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"
    }
  ],
  ["path", { d: "m17 16.5-5-3" }],
  ["path", { d: "m17 16.5 4.74-2.85" }],
  ["path", { d: "M17 16.5v5.17" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15" }],
  ["path", { d: "m12 8 4.74-2.85" }],
  ["path", { d: "M12 13.5V8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brackets.mjs
var Brackets = [
  ["path", { d: "M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3" }],
  ["path", { d: "M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/braces.mjs
var Braces = [
  ["path", { d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" }],
  ["path", { d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brain-cog.mjs
var BrainCog = [
  ["path", { d: "m10.852 14.772-.383.923" }],
  ["path", { d: "m10.852 9.228-.383-.923" }],
  ["path", { d: "m13.148 14.772.382.924" }],
  ["path", { d: "m13.531 8.305-.383.923" }],
  ["path", { d: "m14.772 10.852.923-.383" }],
  ["path", { d: "m14.772 13.148.923.383" }],
  [
    "path",
    {
      d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771"
    }
  ],
  ["path", { d: "M17.998 5.125a4 4 0 0 1 2.525 5.771" }],
  ["path", { d: "M19.505 10.294a4 4 0 0 1-1.5 7.706" }],
  [
    "path",
    { d: "M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" }
  ],
  ["path", { d: "M4.5 10.291A4 4 0 0 0 6 18" }],
  ["path", { d: "M6.002 5.125a3 3 0 0 0 .4 1.375" }],
  ["path", { d: "m9.228 10.852-.923-.383" }],
  ["path", { d: "m9.228 13.148-.923.383" }],
  ["circle", { cx: "12", cy: "12", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brain-circuit.mjs
var BrainCircuit = [
  [
    "path",
    { d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }
  ],
  ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516" }],
  ["path", { d: "M12 13h4" }],
  ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1" }],
  ["path", { d: "M12 8h8" }],
  ["path", { d: "M16 8V5a2 2 0 0 1 2-2" }],
  ["circle", { cx: "16", cy: "13", r: ".5" }],
  ["circle", { cx: "18", cy: "3", r: ".5" }],
  ["circle", { cx: "20", cy: "21", r: ".5" }],
  ["circle", { cx: "20", cy: "8", r: ".5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brain.mjs
var Brain = [
  ["path", { d: "M12 18V5" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brick-wall-fire.mjs
var BrickWallFire = [
  ["path", { d: "M16 3v2.107" }],
  [
    "path",
    {
      d: "M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9"
    }
  ],
  ["path", { d: "M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938" }],
  ["path", { d: "M3 15h5.253" }],
  ["path", { d: "M3 9h8.228" }],
  ["path", { d: "M8 15v6" }],
  ["path", { d: "M8 3v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brick-wall-shield.mjs
var BrickWallShield = [
  ["path", { d: "M12 9v1.258" }],
  ["path", { d: "M16 3v5.46" }],
  ["path", { d: "M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75" }],
  [
    "path",
    {
      d: "M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"
    }
  ],
  ["path", { d: "M3 15h7" }],
  ["path", { d: "M3 9h12.142" }],
  ["path", { d: "M8 15v6" }],
  ["path", { d: "M8 3v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brick-wall.mjs
var BrickWall = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M12 9v6" }],
  ["path", { d: "M16 15v6" }],
  ["path", { d: "M16 3v6" }],
  ["path", { d: "M3 15h18" }],
  ["path", { d: "M3 9h18" }],
  ["path", { d: "M8 15v6" }],
  ["path", { d: "M8 3v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/briefcase-business.mjs
var BriefcaseBusiness = [
  ["path", { d: "M12 12h.01" }],
  ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" }],
  ["path", { d: "M22 13a18.15 18.15 0 0 1-20 0" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/briefcase-conveyor-belt.mjs
var BriefcaseConveyorBelt = [
  ["path", { d: "M10 20v2" }],
  ["path", { d: "M14 20v2" }],
  ["path", { d: "M18 20v2" }],
  ["path", { d: "M21 20H3" }],
  ["path", { d: "M6 20v2" }],
  ["path", { d: "M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" }],
  ["rect", { x: "4", y: "6", width: "16", height: "10", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/briefcase-medical.mjs
var BriefcaseMedical = [
  ["path", { d: "M12 11v4" }],
  ["path", { d: "M14 13h-4" }],
  ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" }],
  ["path", { d: "M18 6v14" }],
  ["path", { d: "M6 6v14" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/briefcase.mjs
var Briefcase = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bring-to-front.mjs
var BringToFront = [
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "2" }],
  ["path", { d: "M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" }],
  ["path", { d: "M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/broccoli.mjs
var Broccoli = [
  ["path", { d: "M10 13a3 3 0 0 1-2.121-5.121" }],
  [
    "path",
    {
      d: "M15.606 14.204c-3.5 1.5-5.899 4.503-8.899 7.503A1 1 0 0 1 6 22c-2 0-4-2-4-4a1 1 0 0 1 .293-.707c1.911-1.911 3.823-3.578 5.347-5.441"
    }
  ],
  ["path", { d: "M16.573 14.737A4 4 0 0 1 14 11" }],
  [
    "path",
    {
      d: "M7.14 10.907a4 4 0 1 1 2.756-7.43A4 4 0 0 1 16.7 4.48a2 2 0 0 1 2.82 2.82 4 4 0 0 1 1.002 6.805A4 4 0 1 1 13 16"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brush-cleaning.mjs
var BrushCleaning = [
  ["path", { d: "m16 22-1-4" }],
  [
    "path",
    {
      d: "M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"
    }
  ],
  ["path", { d: "M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" }],
  ["path", { d: "m8 22 1-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/brush.mjs
var Brush = [
  ["path", { d: "m11 10 3 3" }],
  ["path", { d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" }],
  ["path", { d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bug-off.mjs
var BugOff = [
  ["path", { d: "M12 20v-8" }],
  ["path", { d: "M12.656 7H14a4 4 0 0 1 4 4v1.344" }],
  ["path", { d: "M14.12 3.88 16 2" }],
  ["path", { d: "M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97" }],
  ["path", { d: "M22 13h-3.344" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97" }],
  ["path", { d: "M6 13H2" }],
  ["path", { d: "m8 2 1.88 1.88" }],
  ["path", { d: "M9.712 4.06A3 3 0 0 1 15 6v1.13" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bubbles.mjs
var Bubbles = [
  ["path", { d: "M7.001 15.085A1.5 1.5 0 0 1 9 16.5" }],
  ["circle", { cx: "18.5", cy: "8.5", r: "3.5" }],
  ["circle", { cx: "7.5", cy: "16.5", r: "5.5" }],
  ["circle", { cx: "7.5", cy: "4.5", r: "2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bug-play.mjs
var BugPlay = [
  ["path", { d: "M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97" }],
  [
    "path",
    {
      d: "M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"
    }
  ],
  ["path", { d: "M14.12 3.88 16 2" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97" }],
  ["path", { d: "M6 13H2" }],
  ["path", { d: "m8 2 1.88 1.88" }],
  ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bug.mjs
var Bug = [
  ["path", { d: "M12 20v-9" }],
  ["path", { d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" }],
  ["path", { d: "M14.12 3.88 16 2" }],
  ["path", { d: "M21 21a4 4 0 0 0-3.81-4" }],
  ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97" }],
  ["path", { d: "M22 13h-4" }],
  ["path", { d: "M3 21a4 4 0 0 1 3.81-4" }],
  ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97" }],
  ["path", { d: "M6 13H2" }],
  ["path", { d: "m8 2 1.88 1.88" }],
  ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/building-2.mjs
var Building2 = [
  ["path", { d: "M10 12h4" }],
  ["path", { d: "M10 8h4" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3" }],
  ["path", { d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" }],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/building.mjs
var Building = [
  ["path", { d: "M12 10h.01" }],
  ["path", { d: "M12 14h.01" }],
  ["path", { d: "M12 6h.01" }],
  ["path", { d: "M16 10h.01" }],
  ["path", { d: "M16 14h.01" }],
  ["path", { d: "M16 6h.01" }],
  ["path", { d: "M8 10h.01" }],
  ["path", { d: "M8 14h.01" }],
  ["path", { d: "M8 6h.01" }],
  ["path", { d: "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bus-front.mjs
var BusFront = [
  ["path", { d: "M4 6 2 7" }],
  ["path", { d: "M10 6h4" }],
  ["path", { d: "m22 7-2-1" }],
  ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2" }],
  ["path", { d: "M4 11h16" }],
  ["path", { d: "M8 15h.01" }],
  ["path", { d: "M16 15h.01" }],
  ["path", { d: "M6 19v2" }],
  ["path", { d: "M18 21v-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/bus.mjs
var Bus = [
  ["path", { d: "M8 6v6" }],
  ["path", { d: "M15 6v6" }],
  ["path", { d: "M2 12h19.6" }],
  [
    "path",
    {
      d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"
    }
  ],
  ["circle", { cx: "7", cy: "18", r: "2" }],
  ["path", { d: "M9 18h5" }],
  ["circle", { cx: "16", cy: "18", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cable-car.mjs
var CableCar = [
  ["path", { d: "M10 3h.01" }],
  ["path", { d: "M14 2h.01" }],
  ["path", { d: "m2 9 20-5" }],
  ["path", { d: "M12 12V6.5" }],
  ["rect", { width: "16", height: "10", x: "4", y: "12", rx: "3" }],
  ["path", { d: "M9 12v5" }],
  ["path", { d: "M15 12v5" }],
  ["path", { d: "M4 17h16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cable.mjs
var Cable = [
  ["path", { d: "M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z" }],
  ["path", { d: "M17 21v-2" }],
  ["path", { d: "M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10" }],
  ["path", { d: "M21 21v-2" }],
  ["path", { d: "M3 5V3" }],
  ["path", { d: "M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z" }],
  ["path", { d: "M7 5V3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cake-slice.mjs
var CakeSlice = [
  ["path", { d: "M16 13H3" }],
  ["path", { d: "M16 17H3" }],
  [
    "path",
    {
      d: "m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6"
    }
  ],
  ["circle", { cx: "9", cy: "7", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cake.mjs
var Cake = [
  ["path", { d: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" }],
  ["path", { d: "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" }],
  ["path", { d: "M2 21h20" }],
  ["path", { d: "M7 8v3" }],
  ["path", { d: "M12 8v3" }],
  ["path", { d: "M17 8v3" }],
  ["path", { d: "M7 4h.01" }],
  ["path", { d: "M12 4h.01" }],
  ["path", { d: "M17 4h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calculator.mjs
var Calculator = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18" }],
  ["path", { d: "M16 10h.01" }],
  ["path", { d: "M12 10h.01" }],
  ["path", { d: "M8 10h.01" }],
  ["path", { d: "M12 14h.01" }],
  ["path", { d: "M8 14h.01" }],
  ["path", { d: "M12 18h.01" }],
  ["path", { d: "M8 18h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-1.mjs
var Calendar1 = [
  ["path", { d: "M11 14h1v4" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }],
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-arrow-down.mjs
var CalendarArrowDown = [
  ["path", { d: "m14 18 4 4 4-4" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M18 14v8" }],
  ["path", { d: "M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-arrow-up.mjs
var CalendarArrowUp = [
  ["path", { d: "m14 18 4-4 4 4" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M18 22v-8" }],
  ["path", { d: "M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-check.mjs
var CalendarCheck = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "m9 16 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-clock.mjs
var CalendarClock = [
  ["path", { d: "M16 14v2.2l1.6 1" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" }],
  ["path", { d: "M3 10h5" }],
  ["path", { d: "M8 2v4" }],
  ["circle", { cx: "16", cy: "16", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-check-2.mjs
var CalendarCheck2 = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "m16 20 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-cog.mjs
var CalendarCog = [
  ["path", { d: "m15.228 16.852-.923-.383" }],
  ["path", { d: "m15.228 19.148-.923.383" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "m16.47 14.305.382.923" }],
  ["path", { d: "m16.852 20.772-.383.924" }],
  ["path", { d: "m19.148 15.228.383-.923" }],
  ["path", { d: "m19.53 21.696-.382-.924" }],
  ["path", { d: "m20.772 16.852.924-.383" }],
  ["path", { d: "m20.772 19.148.924.383" }],
  ["path", { d: "M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-days.mjs
var CalendarDays = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 14h.01" }],
  ["path", { d: "M12 14h.01" }],
  ["path", { d: "M16 14h.01" }],
  ["path", { d: "M8 18h.01" }],
  ["path", { d: "M12 18h.01" }],
  ["path", { d: "M16 18h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-heart.mjs
var CalendarHeart = [
  ["path", { d: "M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125" }],
  [
    "path",
    {
      d: "M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"
    }
  ],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-fold.mjs
var CalendarFold = [
  [
    "path",
    {
      d: "M3 20a2 2 0 0 0 2 2h10a2.4 2.4 0 0 0 1.706-.706l3.588-3.588A2.4 2.4 0 0 0 21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"
    }
  ],
  ["path", { d: "M15 22v-5a1 1 0 0 1 1-1h5" }],
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M3 10h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-minus-2.mjs
var CalendarMinus2 = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M10 16h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-minus.mjs
var CalendarMinus = [
  ["path", { d: "M16 19h6" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-off.mjs
var CalendarOff = [
  ["path", { d: "M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" }],
  ["path", { d: "M21 15.5V6a2 2 0 0 0-2-2H9.5" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M3 10h7" }],
  ["path", { d: "M21 10h-5.5" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-plus-2.mjs
var CalendarPlus2 = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M10 16h4" }],
  ["path", { d: "M12 14v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-plus.mjs
var CalendarPlus = [
  ["path", { d: "M16 19h6" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M19 16v6" }],
  ["path", { d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-range.mjs
var CalendarRange = [
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M17 14h-6" }],
  ["path", { d: "M13 18H7" }],
  ["path", { d: "M7 14h.01" }],
  ["path", { d: "M17 18h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-search.mjs
var CalendarSearch = [
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25" }],
  ["path", { d: "m22 22-1.875-1.875" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 2v4" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-sync.mjs
var CalendarSync = [
  ["path", { d: "M11 10v4h4" }],
  ["path", { d: "m11 14 1.535-1.605a5 5 0 0 1 8 1.5" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "m21 18-1.535 1.605a5 5 0 0 1-8-1.5" }],
  ["path", { d: "M21 22v-4h-4" }],
  ["path", { d: "M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3" }],
  ["path", { d: "M3 10h4" }],
  ["path", { d: "M8 2v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-x-2.mjs
var CalendarX2 = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "m17 22 5-5" }],
  ["path", { d: "m17 17 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar-x.mjs
var CalendarX = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "m14 14-4 4" }],
  ["path", { d: "m10 14 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendar.mjs
var Calendar = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
  ["path", { d: "M3 10h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/calendars.mjs
var Calendars = [
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2" }],
  ["path", { d: "M18 2v2" }],
  ["path", { d: "M2 13h2" }],
  ["path", { d: "M8 8h14" }],
  ["rect", { x: "8", y: "3", width: "14", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/camera-off.mjs
var CameraOff = [
  ["path", { d: "M14.564 14.558a3 3 0 1 1-4.122-4.121" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175" }],
  [
    "path",
    {
      d: "M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/camera.mjs
var Camera = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/candy-cane.mjs
var CandyCane = [
  ["path", { d: "m10.8 5 2.111 4.223" }],
  ["path", { d: "M17.75 7 15 2.1" }],
  ["path", { d: "m4.874 14.647 2.12 4.24" }],
  [
    "path",
    { d: "M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z" }
  ],
  ["path", { d: "m7.906 9.712 2.005 4.411" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/candy-off.mjs
var CandyOff = [
  ["path", { d: "M10 10v7.9" }],
  ["path", { d: "M11.802 6.145a5 5 0 0 1 6.053 6.053" }],
  ["path", { d: "M14 6.1v2.243" }],
  ["path", { d: "m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965" }],
  [
    "path",
    {
      d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"
    }
  ],
  ["path", { d: "m2 2 20 20" }],
  [
    "path",
    {
      d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/candy.mjs
var Candy = [
  ["path", { d: "M10 7v10.9" }],
  ["path", { d: "M14 6.1V17" }],
  [
    "path",
    {
      d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"
    }
  ],
  [
    "path",
    {
      d: "M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07"
    }
  ],
  [
    "path",
    {
      d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cannabis-off.mjs
var CannabisOff = [
  ["path", { d: "M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5" }],
  ["path", { d: "M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9" }],
  ["path", { d: "M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907" }],
  [
    "path",
    {
      d: "M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/captions-off.mjs
var CaptionsOff = [
  ["path", { d: "M10.5 5H19a2 2 0 0 1 2 2v8.5" }],
  ["path", { d: "M17 11h-.5" }],
  ["path", { d: "M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M7 11h4" }],
  ["path", { d: "M7 15h2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cannabis.mjs
var Cannabis = [
  ["path", { d: "M12 22v-4" }],
  [
    "path",
    {
      d: "M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/captions.mjs
var Captions = [
  ["rect", { width: "18", height: "14", x: "3", y: "5", rx: "2", ry: "2" }],
  ["path", { d: "M7 15h4M15 15h2M7 11h2M13 11h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/car-front.mjs
var CarFront = [
  ["path", { d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" }],
  ["path", { d: "M7 14h.01" }],
  ["path", { d: "M17 14h.01" }],
  ["rect", { width: "18", height: "8", x: "3", y: "10", rx: "2" }],
  ["path", { d: "M5 18v2" }],
  ["path", { d: "M19 18v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/car-taxi-front.mjs
var CarTaxiFront = [
  ["path", { d: "M10 2h4" }],
  ["path", { d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" }],
  ["path", { d: "M7 14h.01" }],
  ["path", { d: "M17 14h.01" }],
  ["rect", { width: "18", height: "8", x: "3", y: "10", rx: "2" }],
  ["path", { d: "M5 18v2" }],
  ["path", { d: "M19 18v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/car.mjs
var Car = [
  [
    "path",
    {
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2" }],
  ["path", { d: "M9 17h6" }],
  ["circle", { cx: "17", cy: "17", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/caravan.mjs
var Caravan = [
  ["path", { d: "M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" }],
  ["path", { d: "M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2" }],
  ["path", { d: "M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9" }],
  ["circle", { cx: "8", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/card-sim.mjs
var CardSim = [
  ["path", { d: "M12 14v4" }],
  [
    "path",
    {
      d: "M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
    }
  ],
  ["path", { d: "M8 14h8" }],
  ["rect", { x: "8", y: "10", width: "8", height: "8", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/carrot.mjs
var Carrot = [
  ["path", { d: "M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3" }],
  ["path", { d: "M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7" }],
  ["path", { d: "m8 15-2.58-2.58" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/case-lower.mjs
var CaseLower = [
  ["path", { d: "M10 9v7" }],
  ["path", { d: "M14 6v10" }],
  ["circle", { cx: "17.5", cy: "12.5", r: "3.5" }],
  ["circle", { cx: "6.5", cy: "12.5", r: "3.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/case-sensitive.mjs
var CaseSensitive = [
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" }],
  ["path", { d: "M22 9v7" }],
  ["path", { d: "M3.304 13h6.392" }],
  ["circle", { cx: "18.5", cy: "12.5", r: "3.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/case-upper.mjs
var CaseUpper = [
  [
    "path",
    { d: "M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5" }
  ],
  ["path", { d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" }],
  ["path", { d: "M3.304 13h6.392" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cast.mjs
var Cast = [
  ["path", { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" }],
  ["path", { d: "M2 12a9 9 0 0 1 8 8" }],
  ["path", { d: "M2 16a5 5 0 0 1 4 4" }],
  ["line", { x1: "2", x2: "2.01", y1: "20", y2: "20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cassette-tape.mjs
var CassetteTape = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
  ["circle", { cx: "8", cy: "10", r: "2" }],
  ["path", { d: "M8 12h8" }],
  ["circle", { cx: "16", cy: "10", r: "2" }],
  ["path", { d: "m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/castle.mjs
var Castle = [
  ["path", { d: "M10 5V3" }],
  ["path", { d: "M14 5V3" }],
  ["path", { d: "M15 21v-3a3 3 0 0 0-6 0v3" }],
  ["path", { d: "M18 3v8" }],
  ["path", { d: "M18 5H6" }],
  ["path", { d: "M22 11H2" }],
  ["path", { d: "M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9" }],
  ["path", { d: "M6 3v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cat.mjs
var Cat = [
  [
    "path",
    {
      d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"
    }
  ],
  ["path", { d: "M8 14v.5" }],
  ["path", { d: "M16 14v.5" }],
  ["path", { d: "M11.25 16.25h1.5L12 17l-.75-.75Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cctv-off.mjs
var CctvOff = [
  [
    "path",
    {
      d: "m12.309 6.652 4.797 2.401a1 1 0 0 1 .447 1.341l-.501 1.001.605.605h2.725a1 1 0 0 1 .894 1.447l-.724 1.448"
    }
  ],
  [
    "path",
    {
      d: "m15.166 15.166-.719 1.439a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.9 2.9 0 0 1 .873-1.037"
    }
  ],
  ["path", { d: "M2 19h3.76a2 2 0 0 0 1.8-1.1l1.441-2.902" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M2 21v-4" }],
  ["path", { d: "M7 9h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cctv.mjs
var Cctv = [
  [
    "path",
    { d: "M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" }
  ],
  [
    "path",
    {
      d: "M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"
    }
  ],
  ["path", { d: "M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" }],
  ["path", { d: "M2 21v-4" }],
  ["path", { d: "M7 9h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-area.mjs
var ChartArea = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  [
    "path",
    {
      d: "M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-bar-decreasing.mjs
var ChartBarDecreasing = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M7 11h8" }],
  ["path", { d: "M7 16h3" }],
  ["path", { d: "M7 6h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-bar-big.mjs
var ChartBarBig = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["rect", { x: "7", y: "13", width: "9", height: "4", rx: "1" }],
  ["rect", { x: "7", y: "5", width: "12", height: "4", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-bar-increasing.mjs
var ChartBarIncreasing = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M7 11h8" }],
  ["path", { d: "M7 16h12" }],
  ["path", { d: "M7 6h3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-bar-stacked.mjs
var ChartBarStacked = [
  ["path", { d: "M11 13v4" }],
  ["path", { d: "M15 5v4" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["rect", { x: "7", y: "13", width: "9", height: "4", rx: "1" }],
  ["rect", { x: "7", y: "5", width: "12", height: "4", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-bar.mjs
var ChartBar = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M7 16h8" }],
  ["path", { d: "M7 11h12" }],
  ["path", { d: "M7 6h3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-candlestick.mjs
var ChartCandlestick = [
  ["path", { d: "M9 5v4" }],
  ["rect", { width: "4", height: "6", x: "7", y: "9", rx: "1" }],
  ["path", { d: "M9 15v2" }],
  ["path", { d: "M17 3v2" }],
  ["rect", { width: "4", height: "8", x: "15", y: "5", rx: "1" }],
  ["path", { d: "M17 13v3" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-column-big.mjs
var ChartColumnBig = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["rect", { x: "15", y: "5", width: "4", height: "12", rx: "1" }],
  ["rect", { x: "7", y: "8", width: "4", height: "9", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-column-decreasing.mjs
var ChartColumnDecreasing = [
  ["path", { d: "M13 17V9" }],
  ["path", { d: "M18 17v-3" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M8 17V5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-column-increasing.mjs
var ChartColumnIncreasing = [
  ["path", { d: "M13 17V9" }],
  ["path", { d: "M18 17V5" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M8 17v-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-column-stacked.mjs
var ChartColumnStacked = [
  ["path", { d: "M11 13H7" }],
  ["path", { d: "M19 9h-4" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["rect", { x: "15", y: "5", width: "4", height: "12", rx: "1" }],
  ["rect", { x: "7", y: "8", width: "4", height: "9", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-column.mjs
var ChartColumn = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M18 17V9" }],
  ["path", { d: "M13 17V5" }],
  ["path", { d: "M8 17v-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-gantt.mjs
var ChartGantt = [
  ["path", { d: "M10 6h8" }],
  ["path", { d: "M12 16h6" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M8 11h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-line.mjs
var ChartLine = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "m19 9-5 5-4-4-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-network.mjs
var ChartNetwork = [
  ["path", { d: "m13.11 7.664 1.78 2.672" }],
  ["path", { d: "m14.162 12.788-3.324 1.424" }],
  ["path", { d: "m20 4-6.06 1.515" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["circle", { cx: "12", cy: "6", r: "2" }],
  ["circle", { cx: "16", cy: "12", r: "2" }],
  ["circle", { cx: "9", cy: "15", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-no-axes-column-decreasing.mjs
var ChartNoAxesColumnDecreasing = [
  ["path", { d: "M5 21V3" }],
  ["path", { d: "M12 21V9" }],
  ["path", { d: "M19 21v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-no-axes-column-increasing.mjs
var ChartNoAxesColumnIncreasing = [
  ["path", { d: "M5 21v-6" }],
  ["path", { d: "M12 21V9" }],
  ["path", { d: "M19 21V3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-no-axes-column.mjs
var ChartNoAxesColumn = [
  ["path", { d: "M5 21v-6" }],
  ["path", { d: "M12 21V3" }],
  ["path", { d: "M19 21V9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-no-axes-gantt.mjs
var ChartNoAxesGantt = [
  ["path", { d: "M6 5h12" }],
  ["path", { d: "M4 12h10" }],
  ["path", { d: "M12 19h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-no-axes-combined.mjs
var ChartNoAxesCombined = [
  ["path", { d: "M12 16v5" }],
  ["path", { d: "M16 14.639V21" }],
  ["path", { d: "M20 10.656V21" }],
  ["path", { d: "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" }],
  ["path", { d: "M4 18.463V21" }],
  ["path", { d: "M8 14.656V21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-pie.mjs
var ChartPie = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-scatter.mjs
var ChartScatter = [
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "18.5", cy: "5.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "11.5", cy: "11.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "7.5", cy: "16.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "17.5", cy: "14.5", r: ".5", fill: "currentColor" }],
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chart-spline.mjs
var ChartSpline = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/check-check.mjs
var CheckCheck = [
  ["path", { d: "M18 6 7 17l-5-5" }],
  ["path", { d: "m22 10-7.5 7.5L13 16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/check-line.mjs
var CheckLine = [
  ["path", { d: "M20 4L9 15" }],
  ["path", { d: "M21 19L3 19" }],
  ["path", { d: "M9 15L4 10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/check.mjs
var Check = [["path", { d: "M20 6 9 17l-5-5" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chef-hat.mjs
var ChefHat = [
  [
    "path",
    {
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"
    }
  ],
  ["path", { d: "M6 17h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cherry.mjs
var Cherry = [
  ["path", { d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" }],
  ["path", { d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" }],
  ["path", { d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" }],
  ["path", { d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chess-bishop.mjs
var ChessBishop = [
  ["path", { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" }],
  [
    "path",
    {
      d: "M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18"
    }
  ],
  ["path", { d: "m16 7-2.5 2.5" }],
  ["path", { d: "M9 2h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chess-king.mjs
var ChessKing = [
  ["path", { d: "M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" }],
  [
    "path",
    {
      d: "m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1"
    }
  ],
  ["path", { d: "M10 4h4" }],
  ["path", { d: "M12 2v6.818" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chess-knight.mjs
var ChessKnight = [
  ["path", { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" }],
  [
    "path",
    {
      d: "M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456"
    }
  ],
  ["path", { d: "m15 5 1.425-1.425" }],
  ["path", { d: "m17 8 1.53-1.53" }],
  ["path", { d: "M9.713 12.185 7 18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chess-pawn.mjs
var ChessPawn = [
  ["path", { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" }],
  ["path", { d: "m14.5 10 1.5 8" }],
  ["path", { d: "M7 10h10" }],
  ["path", { d: "m8 18 1.5-8" }],
  ["circle", { cx: "12", cy: "6", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chess-queen.mjs
var ChessQueen = [
  ["path", { d: "M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" }],
  ["path", { d: "m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402" }],
  ["path", { d: "m20 9-3 9" }],
  ["path", { d: "m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34" }],
  ["path", { d: "M7 18 4 9" }],
  ["circle", { cx: "12", cy: "4", r: "2" }],
  ["circle", { cx: "20", cy: "7", r: "2" }],
  ["circle", { cx: "4", cy: "7", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chess-rook.mjs
var ChessRook = [
  ["path", { d: "M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" }],
  ["path", { d: "M10 2v2" }],
  ["path", { d: "M14 2v2" }],
  ["path", { d: "m17 18-1-9" }],
  ["path", { d: "M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2" }],
  ["path", { d: "M6 4h12" }],
  ["path", { d: "m7 18 1-9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevron-down.mjs
var ChevronDown = [["path", { d: "m6 9 6 6 6-6" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevron-first.mjs
var ChevronFirst = [
  ["path", { d: "m17 18-6-6 6-6" }],
  ["path", { d: "M7 6v12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevron-last.mjs
var ChevronLast = [
  ["path", { d: "m7 18 6-6-6-6" }],
  ["path", { d: "M17 6v12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevron-left.mjs
var ChevronLeft = [["path", { d: "m15 18-6-6 6-6" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevron-right.mjs
var ChevronRight = [["path", { d: "m9 18 6-6-6-6" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevron-up.mjs
var ChevronUp = [["path", { d: "m18 15-6-6-6 6" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-down-up.mjs
var ChevronsDownUp = [
  ["path", { d: "m7 20 5-5 5 5" }],
  ["path", { d: "m7 4 5 5 5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-down.mjs
var ChevronsDown = [
  ["path", { d: "m7 6 5 5 5-5" }],
  ["path", { d: "m7 13 5 5 5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-left-right-ellipsis.mjs
var ChevronsLeftRightEllipsis = [
  ["path", { d: "M12 12h.01" }],
  ["path", { d: "M16 12h.01" }],
  ["path", { d: "m17 7 5 5-5 5" }],
  ["path", { d: "m7 7-5 5 5 5" }],
  ["path", { d: "M8 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-left-right.mjs
var ChevronsLeftRight = [
  ["path", { d: "m9 7-5 5 5 5" }],
  ["path", { d: "m15 7 5 5-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-left.mjs
var ChevronsLeft = [
  ["path", { d: "m11 17-5-5 5-5" }],
  ["path", { d: "m18 17-5-5 5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-right-left.mjs
var ChevronsRightLeft = [
  ["path", { d: "m20 17-5-5 5-5" }],
  ["path", { d: "m4 17 5-5-5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-right.mjs
var ChevronsRight = [
  ["path", { d: "m6 17 5-5-5-5" }],
  ["path", { d: "m13 17 5-5-5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-up-down.mjs
var ChevronsUpDown = [
  ["path", { d: "m7 15 5 5 5-5" }],
  ["path", { d: "m7 9 5-5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/chevrons-up.mjs
var ChevronsUp = [
  ["path", { d: "m17 11-5-5-5 5" }],
  ["path", { d: "m17 18-5-5-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/church.mjs
var Church = [
  ["path", { d: "M10 9h4" }],
  ["path", { d: "M12 7v5" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3" }],
  [
    "path",
    {
      d: "m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9"
    }
  ],
  ["path", { d: "M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cigarette-off.mjs
var CigaretteOff = [
  ["path", { d: "M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" }],
  ["path", { d: "M18 8c0-2.5-2-2.5-2-5" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866" }],
  ["path", { d: "M22 8c0-2.5-2-2.5-2-5" }],
  ["path", { d: "M7 12v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cigarette.mjs
var Cigarette = [
  ["path", { d: "M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" }],
  ["path", { d: "M18 8c0-2.5-2-2.5-2-5" }],
  ["path", { d: "M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" }],
  ["path", { d: "M22 8c0-2.5-2-2.5-2-5" }],
  ["path", { d: "M7 12v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-alert.mjs
var CircleAlert = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-arrow-down.mjs
var CircleArrowDown = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 8v8" }],
  ["path", { d: "m8 12 4 4 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-arrow-left.mjs
var CircleArrowLeft = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m12 8-4 4 4 4" }],
  ["path", { d: "M16 12H8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-arrow-out-down-right.mjs
var CircleArrowOutDownRight = [
  ["path", { d: "M12 22a10 10 0 1 1 10-10" }],
  ["path", { d: "M22 22 12 12" }],
  ["path", { d: "M22 16v6h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-arrow-out-down-left.mjs
var CircleArrowOutDownLeft = [
  ["path", { d: "M2 12a10 10 0 1 1 10 10" }],
  ["path", { d: "m2 22 10-10" }],
  ["path", { d: "M8 22H2v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-arrow-out-up-left.mjs
var CircleArrowOutUpLeft = [
  ["path", { d: "M2 8V2h6" }],
  ["path", { d: "m2 2 10 10" }],
  ["path", { d: "M12 2A10 10 0 1 1 2 12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-arrow-out-up-right.mjs
var CircleArrowOutUpRight = [
  ["path", { d: "M22 12A10 10 0 1 1 12 2" }],
  ["path", { d: "M22 2 12 12" }],
  ["path", { d: "M16 2h6v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-arrow-right.mjs
var CircleArrowRight = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m12 16 4-4-4-4" }],
  ["path", { d: "M8 12h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-arrow-up.mjs
var CircleArrowUp = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m16 12-4-4-4 4" }],
  ["path", { d: "M12 16V8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-check-big.mjs
var CircleCheckBig = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335" }],
  ["path", { d: "m9 11 3 3L22 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-check.mjs
var CircleCheck = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m9 12 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-chevron-down.mjs
var CircleChevronDown = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m16 10-4 4-4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-chevron-left.mjs
var CircleChevronLeft = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m14 16-4-4 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-chevron-right.mjs
var CircleChevronRight = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m10 8 4 4-4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-chevron-up.mjs
var CircleChevronUp = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m8 14 4-4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-dashed.mjs
var CircleDashed = [
  ["path", { d: "M10.1 2.182a10 10 0 0 1 3.8 0" }],
  ["path", { d: "M13.9 21.818a10 10 0 0 1-3.8 0" }],
  ["path", { d: "M17.609 3.721a10 10 0 0 1 2.69 2.7" }],
  ["path", { d: "M2.182 13.9a10 10 0 0 1 0-3.8" }],
  ["path", { d: "M20.279 17.609a10 10 0 0 1-2.7 2.69" }],
  ["path", { d: "M21.818 10.1a10 10 0 0 1 0 3.8" }],
  ["path", { d: "M3.721 6.391a10 10 0 0 1 2.7-2.69" }],
  ["path", { d: "M6.391 20.279a10 10 0 0 1-2.69-2.7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-divide.mjs
var CircleDivide = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }],
  ["line", { x1: "12", x2: "12", y1: "16", y2: "16" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-dollar-sign.mjs
var CircleDollarSign = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
  ["path", { d: "M12 18V6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-dot-dashed.mjs
var CircleDotDashed = [
  ["path", { d: "M10.1 2.18a9.93 9.93 0 0 1 3.8 0" }],
  ["path", { d: "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" }],
  ["path", { d: "M21.82 10.1a9.93 9.93 0 0 1 0 3.8" }],
  ["path", { d: "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" }],
  ["path", { d: "M13.9 21.82a9.94 9.94 0 0 1-3.8 0" }],
  ["path", { d: "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" }],
  ["path", { d: "M2.18 13.9a9.93 9.93 0 0 1 0-3.8" }],
  ["path", { d: "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" }],
  ["circle", { cx: "12", cy: "12", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-dot.mjs
var CircleDot = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["circle", { cx: "12", cy: "12", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-ellipsis.mjs
var CircleEllipsis = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M17 12h.01" }],
  ["path", { d: "M12 12h.01" }],
  ["path", { d: "M7 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-equal.mjs
var CircleEqual = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M7 10h10" }],
  ["path", { d: "M7 14h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-euro-sign.mjs
var CircleEuroSign = [
  ["path", { d: "M15 9.4a4 4 0 1 0 0 5.2" }],
  ["path", { d: "M7 12h5" }],
  ["circle", { cx: "12", cy: "12", r: "10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-fading-arrow-up.mjs
var CircleFadingArrowUp = [
  ["path", { d: "M12 2a10 10 0 0 1 7.38 16.75" }],
  ["path", { d: "m16 12-4-4-4 4" }],
  ["path", { d: "M12 16V8" }],
  ["path", { d: "M2.5 8.875a10 10 0 0 0-.5 3" }],
  ["path", { d: "M2.83 16a10 10 0 0 0 2.43 3.4" }],
  ["path", { d: "M4.636 5.235a10 10 0 0 1 .891-.857" }],
  ["path", { d: "M8.644 21.42a10 10 0 0 0 7.631-.38" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-fading-plus.mjs
var CircleFadingPlus = [
  ["path", { d: "M12 2a10 10 0 0 1 7.38 16.75" }],
  ["path", { d: "M12 8v8" }],
  ["path", { d: "M16 12H8" }],
  ["path", { d: "M2.5 8.875a10 10 0 0 0-.5 3" }],
  ["path", { d: "M2.83 16a10 10 0 0 0 2.43 3.4" }],
  ["path", { d: "M4.636 5.235a10 10 0 0 1 .891-.857" }],
  ["path", { d: "M8.644 21.42a10 10 0 0 0 7.631-.38" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-gauge.mjs
var CircleGauge = [
  ["path", { d: "M15.6 2.7a10 10 0 1 0 5.7 5.7" }],
  ["circle", { cx: "12", cy: "12", r: "2" }],
  ["path", { d: "M13.4 10.6 19 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-minus.mjs
var CircleMinus = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M8 12h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-off.mjs
var CircleOff = [
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" }],
  ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-parking-off.mjs
var CircleParkingOff = [
  ["path", { d: "M12.656 7H13a3 3 0 0 1 2.984 3.307" }],
  ["path", { d: "M13 13H9" }],
  ["path", { d: "M19.071 19.071A1 1 0 0 1 4.93 4.93" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M8.357 2.687a10 10 0 0 1 12.956 12.956" }],
  ["path", { d: "M9 17V9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-parking.mjs
var CircleParking = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M9 17V7h4a3 3 0 0 1 0 6H9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-pause.mjs
var CirclePause = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["line", { x1: "10", x2: "10", y1: "15", y2: "9" }],
  ["line", { x1: "14", x2: "14", y1: "15", y2: "9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-percent.mjs
var CirclePercent = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m15 9-6 6" }],
  ["path", { d: "M9 9h.01" }],
  ["path", { d: "M15 15h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-play.mjs
var CirclePlay = [
  [
    "path",
    {
      d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-pile.mjs
var CirclePile = [
  ["circle", { cx: "12", cy: "19", r: "2" }],
  ["circle", { cx: "12", cy: "5", r: "2" }],
  ["circle", { cx: "16", cy: "12", r: "2" }],
  ["circle", { cx: "20", cy: "19", r: "2" }],
  ["circle", { cx: "4", cy: "19", r: "2" }],
  ["circle", { cx: "8", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-plus.mjs
var CirclePlus = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M8 12h8" }],
  ["path", { d: "M12 8v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-pound-sterling.mjs
var CirclePoundSterling = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M10 16V9.5a1 1 0 0 1 5 0" }],
  ["path", { d: "M8 12h4" }],
  ["path", { d: "M8 16h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-power.mjs
var CirclePower = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 7v4" }],
  ["path", { d: "M7.998 9.003a5 5 0 1 0 8-.005" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-question-mark.mjs
var CircleQuestionMark = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
  ["path", { d: "M12 17h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-slash-2.mjs
var CircleSlash2 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M22 2 2 22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-slash.mjs
var CircleSlash = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["line", { x1: "9", x2: "15", y1: "15", y2: "9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-small.mjs
var CircleSmall = [["circle", { cx: "12", cy: "12", r: "6" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-star.mjs
var CircleStar = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  [
    "path",
    {
      d: "M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-stop.mjs
var CircleStop = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-user-round.mjs
var CircleUserRound = [
  ["path", { d: "M17.925 20.056a6 6 0 0 0-11.851.001" }],
  ["circle", { cx: "12", cy: "11", r: "4" }],
  ["circle", { cx: "12", cy: "12", r: "10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-user.mjs
var CircleUser = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["circle", { cx: "12", cy: "10", r: "3" }],
  ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle-x.mjs
var CircleX = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m15 9-6 6" }],
  ["path", { d: "m9 9 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circle.mjs
var Circle = [["circle", { cx: "12", cy: "12", r: "10" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/circuit-board.mjs
var CircuitBoard = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M11 9h4a2 2 0 0 0 2-2V3" }],
  ["circle", { cx: "9", cy: "9", r: "2" }],
  ["path", { d: "M7 21v-4a2 2 0 0 1 2-2h4" }],
  ["circle", { cx: "15", cy: "15", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/citrus.mjs
var Citrus = [
  [
    "path",
    { d: "M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z" }
  ],
  ["path", { d: "M19.65 15.66A8 8 0 0 1 8.35 4.34" }],
  ["path", { d: "m14 10-5.5 5.5" }],
  ["path", { d: "M14 17.85V10H6.15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clapperboard.mjs
var Clapperboard = [
  ["path", { d: "m12.296 3.464 3.02 3.956" }],
  ["path", { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z" }],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }],
  ["path", { d: "m6.18 5.276 3.1 3.899" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-check.mjs
var ClipboardCheck = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
  ["path", { d: "m9 14 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-clock.mjs
var ClipboardClock = [
  ["path", { d: "M16 14v2.2l1.6 1" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v.832" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" }],
  ["circle", { cx: "16", cy: "16", r: "6" }],
  ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-copy.mjs
var ClipboardCopy = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4" }],
  ["path", { d: "M21 14H11" }],
  ["path", { d: "m15 10-4 4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-list.mjs
var ClipboardList = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M12 11h4" }],
  ["path", { d: "M12 16h4" }],
  ["path", { d: "M8 11h.01" }],
  ["path", { d: "M8 16h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-minus.mjs
var ClipboardMinus = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M9 14h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-paste.mjs
var ClipboardPaste = [
  ["path", { d: "M11 14h10" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v1.344" }],
  ["path", { d: "m17 18 4-4-4-4" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" }],
  ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-pen-line.mjs
var ClipboardPenLine = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 1.73 1" }],
  ["path", { d: "M8 18h1" }],
  [
    "path",
    {
      d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-pen.mjs
var ClipboardPen = [
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v2" }],
  [
    "path",
    {
      d: "M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    }
  ],
  ["path", { d: "M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
  ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-plus.mjs
var ClipboardPlus = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M9 14h6" }],
  ["path", { d: "M12 17v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-type.mjs
var ClipboardType = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M9 12v-1h6v1" }],
  ["path", { d: "M11 17h2" }],
  ["path", { d: "M12 11v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard-x.mjs
var ClipboardX = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
  ["path", { d: "m15 11-6 6" }],
  ["path", { d: "m9 11 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clipboard.mjs
var Clipboard = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-1.mjs
var Clock1 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l2-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-11.mjs
var Clock11 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l-2-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-10.mjs
var Clock10 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l-4-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-12.mjs
var Clock12 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-2.mjs
var Clock2 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l4-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-3.mjs
var Clock3 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-4.mjs
var Clock4 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l4 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-5.mjs
var Clock5 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l2 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-6.mjs
var Clock6 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-7.mjs
var Clock7 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l-2 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-8.mjs
var Clock8 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l-4 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-9.mjs
var Clock9 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6H8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-alert.mjs
var ClockAlert = [
  ["path", { d: "M12 6v6l4 2" }],
  ["path", { d: "M20 12v5" }],
  ["path", { d: "M20 21h.01" }],
  ["path", { d: "M21.25 8.2A10 10 0 1 0 16 21.16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-arrow-down.mjs
var ClockArrowDown = [
  ["path", { d: "M12 6v6l2 1" }],
  ["path", { d: "M12.337 21.994a10 10 0 1 1 9.588-8.767" }],
  ["path", { d: "m14 18 4 4 4-4" }],
  ["path", { d: "M18 14v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-arrow-left.mjs
var ClockArrowLeft = [
  ["path", { d: "M12 6v6l1.5.8" }],
  ["path", { d: "M12.338 21.994a10 10 0 1 1 9.587-8.767" }],
  ["path", { d: "M14 18h8" }],
  ["path", { d: "m18 22-4-4 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-arrow-right.mjs
var ClockArrowRight = [
  ["path", { d: "M12 6v6l2 1" }],
  ["path", { d: "M13.5 21.885A10 10 0 1 1 22 12" }],
  ["path", { d: "M14 18h8" }],
  ["path", { d: "m18 22 4-4-4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-arrow-up.mjs
var ClockArrowUp = [
  ["path", { d: "M12 6v6l1.56.78" }],
  ["path", { d: "M13.227 21.925a10 10 0 1 1 8.767-9.588" }],
  ["path", { d: "m14 18 4-4 4 4" }],
  ["path", { d: "M18 22v-8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-check.mjs
var ClockCheck = [
  ["path", { d: "M12 6v6l4 2" }],
  ["path", { d: "M22 12a10 10 0 1 0-11 9.95" }],
  ["path", { d: "m22 16-5.5 5.5L14 19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-fading.mjs
var ClockFading = [
  ["path", { d: "M12 2a10 10 0 0 1 7.38 16.75" }],
  ["path", { d: "M12 6v6l4 2" }],
  ["path", { d: "M2.5 8.875a10 10 0 0 0-.5 3" }],
  ["path", { d: "M2.83 16a10 10 0 0 0 2.43 3.4" }],
  ["path", { d: "M4.636 5.235a10 10 0 0 1 .891-.857" }],
  ["path", { d: "M8.644 21.42a10 10 0 0 0 7.631-.38" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock-plus.mjs
var ClockPlus = [
  ["path", { d: "M12 6v6l3.644 1.822" }],
  ["path", { d: "M16 19h6" }],
  ["path", { d: "M19 16v6" }],
  ["path", { d: "M21.92 13.267a10 10 0 1 0-8.653 8.653" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clock.mjs
var Clock = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 6v6l4 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/closed-caption.mjs
var ClosedCaption = [
  ["path", { d: "M10 9.17a3 3 0 1 0 0 5.66" }],
  ["path", { d: "M17 9.17a3 3 0 1 0 0 5.66" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-alert.mjs
var CloudAlert = [
  ["path", { d: "M12 12v4" }],
  ["path", { d: "M12 20h.01" }],
  ["path", { d: "M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-backup.mjs
var CloudBackup = [
  ["path", { d: "M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607" }],
  ["path", { d: "M7 11v4h4" }],
  ["path", { d: "M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-check.mjs
var CloudCheck = [
  ["path", { d: "m17 15-5.5 5.5L9 18" }],
  ["path", { d: "M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-cog.mjs
var CloudCog = [
  ["path", { d: "m10.852 19.772-.383.924" }],
  ["path", { d: "m13.148 14.228.383-.923" }],
  ["path", { d: "M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923" }],
  ["path", { d: "m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544" }],
  ["path", { d: "m14.772 15.852.923-.383" }],
  ["path", { d: "m14.772 18.148.923.383" }],
  ["path", { d: "M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" }],
  ["path", { d: "m9.228 15.852-.923-.383" }],
  ["path", { d: "m9.228 18.148-.923.383" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-download.mjs
var CloudDownload = [
  ["path", { d: "M12 13v8l-4-4" }],
  ["path", { d: "m12 21 4-4" }],
  ["path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-drizzle.mjs
var CloudDrizzle = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
  ["path", { d: "M8 19v1" }],
  ["path", { d: "M8 14v1" }],
  ["path", { d: "M16 19v1" }],
  ["path", { d: "M16 14v1" }],
  ["path", { d: "M12 21v1" }],
  ["path", { d: "M12 16v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-fog.mjs
var CloudFog = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
  ["path", { d: "M16 17H7" }],
  ["path", { d: "M17 21H9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-hail.mjs
var CloudHail = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
  ["path", { d: "M16 14v2" }],
  ["path", { d: "M8 14v2" }],
  ["path", { d: "M16 20h.01" }],
  ["path", { d: "M8 20h.01" }],
  ["path", { d: "M12 16v2" }],
  ["path", { d: "M12 22h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-lightning.mjs
var CloudLightning = [
  ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" }],
  ["path", { d: "m13 12-3 5h4l-3 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-moon-rain.mjs
var CloudMoonRain = [
  ["path", { d: "M11 20v2" }],
  [
    "path",
    {
      d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"
    }
  ],
  ["path", { d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" }],
  ["path", { d: "M7 19v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-moon.mjs
var CloudMoon = [
  ["path", { d: "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z" }],
  [
    "path",
    {
      d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-off.mjs
var CloudOff = [
  ["path", { d: "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057" }],
  ["path", { d: "M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-rain-wind.mjs
var CloudRainWind = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
  ["path", { d: "m9.2 22 3-7" }],
  ["path", { d: "m9 13-3 7" }],
  ["path", { d: "m17 13-3 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-rain.mjs
var CloudRain = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
  ["path", { d: "M16 14v6" }],
  ["path", { d: "M8 14v6" }],
  ["path", { d: "M12 16v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-snow.mjs
var CloudSnow = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
  ["path", { d: "M8 15h.01" }],
  ["path", { d: "M8 19h.01" }],
  ["path", { d: "M12 17h.01" }],
  ["path", { d: "M12 21h.01" }],
  ["path", { d: "M16 15h.01" }],
  ["path", { d: "M16 19h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-sun-rain.mjs
var CloudSunRain = [
  ["path", { d: "M12 2v2" }],
  ["path", { d: "m4.93 4.93 1.41 1.41" }],
  ["path", { d: "M20 12h2" }],
  ["path", { d: "m19.07 4.93-1.41 1.41" }],
  ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128" }],
  ["path", { d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" }],
  ["path", { d: "M11 20v2" }],
  ["path", { d: "M7 19v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-sun.mjs
var CloudSun = [
  ["path", { d: "M12 2v2" }],
  ["path", { d: "m4.93 4.93 1.41 1.41" }],
  ["path", { d: "M20 12h2" }],
  ["path", { d: "m19.07 4.93-1.41 1.41" }],
  ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128" }],
  ["path", { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-sync.mjs
var CloudSync = [
  ["path", { d: "m17 18-1.535 1.605a5 5 0 0 1-8-1.5" }],
  ["path", { d: "M17 22v-4h-4" }],
  ["path", { d: "M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607" }],
  ["path", { d: "M7 10v4h4" }],
  ["path", { d: "m7 14 1.535-1.605a5 5 0 0 1 8 1.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud-upload.mjs
var CloudUpload = [
  ["path", { d: "M12 13v8" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
  ["path", { d: "m8 17 4-4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloud.mjs
var Cloud = [["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cloudy.mjs
var Cloudy = [
  ["path", { d: "M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z" }],
  ["path", { d: "M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/clover.mjs
var Clover = [
  ["path", { d: "M16.17 7.83 2 22" }],
  [
    "path",
    {
      d: "M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12"
    }
  ],
  ["path", { d: "m7.83 7.83 8.34 8.34" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/club.mjs
var Club = [
  [
    "path",
    { d: "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" }
  ],
  ["path", { d: "M12 17.66L12 22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/code-xml.mjs
var CodeXml = [
  ["path", { d: "m18 16 4-4-4-4" }],
  ["path", { d: "m6 8-4 4 4 4" }],
  ["path", { d: "m14.5 4-5 16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/code.mjs
var Code = [
  ["path", { d: "m16 18 6-6-6-6" }],
  ["path", { d: "m8 6-6 6 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cog.mjs
var Cog = [
  ["path", { d: "M11 10.27 7 3.34" }],
  ["path", { d: "m11 13.73-4 6.93" }],
  ["path", { d: "M12 22v-2" }],
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M14 12h8" }],
  ["path", { d: "m17 20.66-1-1.73" }],
  ["path", { d: "m17 3.34-1 1.73" }],
  ["path", { d: "M2 12h2" }],
  ["path", { d: "m20.66 17-1.73-1" }],
  ["path", { d: "m20.66 7-1.73 1" }],
  ["path", { d: "m3.34 17 1.73-1" }],
  ["path", { d: "m3.34 7 1.73 1" }],
  ["circle", { cx: "12", cy: "12", r: "2" }],
  ["circle", { cx: "12", cy: "12", r: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/coffee.mjs
var Coffee = [
  ["path", { d: "M10 2v2" }],
  ["path", { d: "M14 2v2" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"
    }
  ],
  ["path", { d: "M6 2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/coins.mjs
var Coins = [
  ["path", { d: "M13.744 17.736a6 6 0 1 1-7.48-7.48" }],
  ["path", { d: "M15 6h1v4" }],
  ["path", { d: "m6.134 14.768.866-.5 2 3.464" }],
  ["circle", { cx: "16", cy: "8", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/columns-2.mjs
var Columns2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M12 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/columns-3-cog.mjs
var Columns3Cog = [
  ["path", { d: "M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5" }],
  ["path", { d: "m14.3 19.6 1-.4" }],
  ["path", { d: "M15 3v7.5" }],
  ["path", { d: "m15.2 16.9-.9-.3" }],
  ["path", { d: "m16.6 21.7.3-.9" }],
  ["path", { d: "m16.8 15.3-.4-1" }],
  ["path", { d: "m19.1 15.2.3-.9" }],
  ["path", { d: "m19.6 21.7-.4-1" }],
  ["path", { d: "m20.7 16.8 1-.4" }],
  ["path", { d: "m21.7 19.4-.9-.3" }],
  ["path", { d: "M9 3v18" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/columns-3.mjs
var Columns3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M9 3v18" }],
  ["path", { d: "M15 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/columns-4.mjs
var Columns4 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M7.5 3v18" }],
  ["path", { d: "M12 3v18" }],
  ["path", { d: "M16.5 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/combine.mjs
var Combine = [
  ["path", { d: "M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" }],
  ["path", { d: "M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" }],
  ["path", { d: "m7 15 3 3" }],
  ["path", { d: "m7 21 3-3H5a2 2 0 0 1-2-2v-2" }],
  ["rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" }],
  ["rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/command.mjs
var Command = [
  ["path", { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/compass.mjs
var Compass = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/component.mjs
var Component = [
  [
    "path",
    {
      d: "M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"
    }
  ],
  [
    "path",
    {
      d: "M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z"
    }
  ],
  [
    "path",
    {
      d: "M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z"
    }
  ],
  [
    "path",
    {
      d: "M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/computer.mjs
var Computer = [
  ["rect", { width: "14", height: "8", x: "5", y: "2", rx: "2" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
  ["path", { d: "M6 18h2" }],
  ["path", { d: "M12 18h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/concierge-bell.mjs
var ConciergeBell = [
  ["path", { d: "M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" }],
  ["path", { d: "M20 16a8 8 0 1 0-16 0" }],
  ["path", { d: "M12 4v4" }],
  ["path", { d: "M10 4h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/construction.mjs
var Construction = [
  ["rect", { x: "2", y: "6", width: "20", height: "8", rx: "1" }],
  ["path", { d: "M17 14v7" }],
  ["path", { d: "M7 14v7" }],
  ["path", { d: "M17 3v3" }],
  ["path", { d: "M7 3v3" }],
  ["path", { d: "M10 14 2.3 6.3" }],
  ["path", { d: "m14 6 7.7 7.7" }],
  ["path", { d: "m8 6 8 8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cone.mjs
var Cone = [
  ["path", { d: "m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" }],
  ["ellipse", { cx: "12", cy: "19", rx: "9", ry: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/contact.mjs
var Contact = [
  ["path", { d: "M16 2v2" }],
  ["path", { d: "M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M8 2v2" }],
  ["circle", { cx: "12", cy: "11", r: "3" }],
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/contact-round.mjs
var ContactRound = [
  ["path", { d: "M16 2v2" }],
  ["path", { d: "M17.915 22a6 6 0 0 0-12 0" }],
  ["path", { d: "M8 2v2" }],
  ["circle", { cx: "12", cy: "12", r: "4" }],
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/container.mjs
var Container = [
  [
    "path",
    {
      d: "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"
    }
  ],
  ["path", { d: "M10 21.9V14L2.1 9.1" }],
  ["path", { d: "m10 14 11.9-6.9" }],
  ["path", { d: "M14 19.8v-8.1" }],
  ["path", { d: "M18 17.5V9.4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/contrast.mjs
var Contrast = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 18a6 6 0 0 0 0-12v12z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cookie.mjs
var Cookie = [
  ["path", { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" }],
  ["path", { d: "M8.5 8.5v.01" }],
  ["path", { d: "M16 15.5v.01" }],
  ["path", { d: "M12 12v.01" }],
  ["path", { d: "M11 17v.01" }],
  ["path", { d: "M7 14v.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cooking-pot.mjs
var CookingPot = [
  ["path", { d: "M2 12h20" }],
  ["path", { d: "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" }],
  ["path", { d: "m4 8 16-4" }],
  ["path", { d: "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/copy-check.mjs
var CopyCheck = [
  ["path", { d: "m12 15 2 2 4-4" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/copy-minus.mjs
var CopyMinus = [
  ["line", { x1: "12", x2: "18", y1: "15", y2: "15" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/copy-plus.mjs
var CopyPlus = [
  ["line", { x1: "15", x2: "15", y1: "12", y2: "18" }],
  ["line", { x1: "12", x2: "18", y1: "15", y2: "15" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/copy-slash.mjs
var CopySlash = [
  ["line", { x1: "12", x2: "18", y1: "18", y2: "12" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/copy-x.mjs
var CopyX = [
  ["line", { x1: "12", x2: "18", y1: "12", y2: "18" }],
  ["line", { x1: "12", x2: "18", y1: "18", y2: "12" }],
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/copy.mjs
var Copy = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/copyleft.mjs
var Copyleft = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M9.17 14.83a4 4 0 1 0 0-5.66" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/copyright.mjs
var Copyright = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M14.83 14.83a4 4 0 1 1 0-5.66" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/corner-down-left.mjs
var CornerDownLeft = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4" }],
  ["path", { d: "m9 10-5 5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/corner-down-right.mjs
var CornerDownRight = [
  ["path", { d: "m15 10 5 5-5 5" }],
  ["path", { d: "M4 4v7a4 4 0 0 0 4 4h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/corner-left-down.mjs
var CornerLeftDown = [
  ["path", { d: "m14 15-5 5-5-5" }],
  ["path", { d: "M20 4h-7a4 4 0 0 0-4 4v12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/corner-left-up.mjs
var CornerLeftUp = [
  ["path", { d: "M14 9 9 4 4 9" }],
  ["path", { d: "M20 20h-7a4 4 0 0 1-4-4V4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/corner-right-down.mjs
var CornerRightDown = [
  ["path", { d: "m10 15 5 5 5-5" }],
  ["path", { d: "M4 4h7a4 4 0 0 1 4 4v12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/corner-right-up.mjs
var CornerRightUp = [
  ["path", { d: "m10 9 5-5 5 5" }],
  ["path", { d: "M4 20h7a4 4 0 0 0 4-4V4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/corner-up-left.mjs
var CornerUpLeft = [
  ["path", { d: "M20 20v-7a4 4 0 0 0-4-4H4" }],
  ["path", { d: "M9 14 4 9l5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cpu.mjs
var Cpu = [
  ["path", { d: "M12 20v2" }],
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M17 20v2" }],
  ["path", { d: "M17 2v2" }],
  ["path", { d: "M2 12h2" }],
  ["path", { d: "M2 17h2" }],
  ["path", { d: "M2 7h2" }],
  ["path", { d: "M20 12h2" }],
  ["path", { d: "M20 17h2" }],
  ["path", { d: "M20 7h2" }],
  ["path", { d: "M7 20v2" }],
  ["path", { d: "M7 2v2" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/corner-up-right.mjs
var CornerUpRight = [
  ["path", { d: "m15 14 5-5-5-5" }],
  ["path", { d: "M4 20v-7a4 4 0 0 1 4-4h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/creative-commons.mjs
var CreativeCommons = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" }],
  ["path", { d: "M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/credit-card.mjs
var CreditCard = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/croissant.mjs
var Croissant = [
  ["path", { d: "M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487" }],
  ["path", { d: "M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132" }],
  ["path", { d: "M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42" }],
  ["path", { d: "M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14" }],
  [
    "path",
    {
      d: "M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/crop.mjs
var Crop = [
  ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14" }],
  ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cross.mjs
var Cross = [
  [
    "path",
    {
      d: "M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/crown.mjs
var Crown = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"
    }
  ],
  ["path", { d: "M5 21h14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/crosshair.mjs
var Crosshair = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["line", { x1: "22", x2: "18", y1: "12", y2: "12" }],
  ["line", { x1: "6", x2: "2", y1: "12", y2: "12" }],
  ["line", { x1: "12", x2: "12", y1: "6", y2: "2" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cuboid.mjs
var Cuboid = [
  ["path", { d: "M10 22v-8" }],
  ["path", { d: "M2.336 8.89 10 14l11.715-7.029" }],
  [
    "path",
    {
      d: "M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/currency.mjs
var Currency = [
  ["circle", { cx: "12", cy: "12", r: "8" }],
  ["line", { x1: "3", x2: "6", y1: "3", y2: "6" }],
  ["line", { x1: "21", x2: "18", y1: "3", y2: "6" }],
  ["line", { x1: "3", x2: "6", y1: "21", y2: "18" }],
  ["line", { x1: "21", x2: "18", y1: "21", y2: "18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cup-soda.mjs
var CupSoda = [
  ["path", { d: "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" }],
  ["path", { d: "M5 8h14" }],
  ["path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }],
  ["path", { d: "m12 8 1-6h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/cylinder.mjs
var Cylinder = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
  ["path", { d: "M3 5v14a9 3 0 0 0 18 0V5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dam.mjs
var Dam = [
  ["path", { d: "M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }],
  ["path", { d: "M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }],
  ["path", { d: "M2 10h4" }],
  ["path", { d: "M2 14h4" }],
  ["path", { d: "M2 18h4" }],
  ["path", { d: "M2 6h4" }],
  ["path", { d: "M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-arrow-down.mjs
var DatabaseArrowDown = [
  ["path", { d: "m16 19 3 3 3-3" }],
  ["path", { d: "M19 16v6" }],
  ["path", { d: "M21 12.536V5" }],
  ["path", { d: "M3 12A9 3 0 0 0 15.182 14.806" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 13.318 21.968" }],
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-arrow-up.mjs
var DatabaseArrowUp = [
  ["path", { d: "M19 22v-6" }],
  ["path", { d: "M21 12.536V5" }],
  ["path", { d: "m22 19-3-3-3 3" }],
  ["path", { d: "M3 12A9 3 0 0 0 14.457 14.886" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 13.318 21.968" }],
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-backup.mjs
var DatabaseBackup = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
  ["path", { d: "M3 12a9 3 0 0 0 5 2.69" }],
  ["path", { d: "M21 9.3V5" }],
  ["path", { d: "M3 5v14a9 3 0 0 0 6.47 2.88" }],
  ["path", { d: "M12 12v4h4" }],
  ["path", { d: "M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-check.mjs
var DatabaseCheck = [
  ["path", { d: "m16 19 2 2 4-4" }],
  ["path", { d: "M21 13.127V5" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 13.318 21.968" }],
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-minus.mjs
var DatabaseMinus = [
  ["path", { d: "M21 15V5" }],
  ["path", { d: "M22 19h-6" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 13.318 21.968" }],
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-plus.mjs
var DatabasePlus = [
  ["path", { d: "M19 16v6" }],
  ["path", { d: "M21 12.536V5" }],
  ["path", { d: "M22 19h-6" }],
  ["path", { d: "M3 12A9 3 0 0 0 15.1824 14.8061" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 13.318 21.968" }],
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-search.mjs
var DatabaseSearch = [
  ["path", { d: "M21 11.693V5" }],
  ["path", { d: "m22 22-1.875-1.875" }],
  ["path", { d: "M3 12a9 3 0 0 0 8.697 2.998" }],
  ["path", { d: "M3 5v14a9 3 0 0 0 9.28 2.999" }],
  ["circle", { cx: "18", cy: "18", r: "3" }],
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-x.mjs
var DatabaseX = [
  ["path", { d: "m17 17 5 5" }],
  ["path", { d: "M19.323 13.744A9 3 0 0 0 21 12" }],
  ["path", { d: "M21 13.127V5" }],
  ["path", { d: "m22 17-5 5" }],
  ["path", { d: "M3 12A9 3 0 0 0 13.563 14.954" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 13 21.981" }],
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database-zap.mjs
var DatabaseZap = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 15 21.84" }],
  ["path", { d: "M21 5V8" }],
  ["path", { d: "M21 12L18 17H22L19 22" }],
  ["path", { d: "M3 12A9 3 0 0 0 14.59 14.87" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/database.mjs
var Database = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/decimals-arrow-right.mjs
var DecimalsArrowRight = [
  ["path", { d: "M10 18h10" }],
  ["path", { d: "m17 21 3-3-3-3" }],
  ["path", { d: "M3 11h.01" }],
  ["rect", { x: "15", y: "3", width: "5", height: "8", rx: "2.5" }],
  ["rect", { x: "6", y: "3", width: "5", height: "8", rx: "2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/delete.mjs
var Delete = [
  [
    "path",
    {
      d: "M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"
    }
  ],
  ["path", { d: "m12 9 6 6" }],
  ["path", { d: "m18 9-6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/decimals-arrow-left.mjs
var DecimalsArrowLeft = [
  ["path", { d: "m13 21-3-3 3-3" }],
  ["path", { d: "M20 18H10" }],
  ["path", { d: "M3 11h.01" }],
  ["rect", { x: "6", y: "3", width: "5", height: "8", rx: "2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dessert.mjs
var Dessert = [
  [
    "path",
    {
      d: "M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826"
    }
  ],
  ["path", { d: "M20.804 14.869a9 9 0 0 1-17.608 0" }],
  ["circle", { cx: "12", cy: "4", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/diameter.mjs
var Diameter = [
  ["circle", { cx: "19", cy: "19", r: "2" }],
  ["circle", { cx: "5", cy: "5", r: "2" }],
  ["path", { d: "M6.48 3.66a10 10 0 0 1 13.86 13.86" }],
  ["path", { d: "m6.41 6.41 11.18 11.18" }],
  ["path", { d: "M3.66 6.48a10 10 0 0 0 13.86 13.86" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/diamond-minus.mjs
var DiamondMinus = [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"
    }
  ],
  ["path", { d: "M8 12h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/diamond-percent.mjs
var DiamondPercent = [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"
    }
  ],
  ["path", { d: "M9.2 9.2h.01" }],
  ["path", { d: "m14.5 9.5-5 5" }],
  ["path", { d: "M14.7 14.8h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/diamond-plus.mjs
var DiamondPlus = [
  ["path", { d: "M12 8v8" }],
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"
    }
  ],
  ["path", { d: "M8 12h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/diamond.mjs
var Diamond = [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dice-1.mjs
var Dice1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["path", { d: "M12 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dice-2.mjs
var Dice2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["path", { d: "M15 9h.01" }],
  ["path", { d: "M9 15h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dice-3.mjs
var Dice3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["path", { d: "M16 8h.01" }],
  ["path", { d: "M12 12h.01" }],
  ["path", { d: "M8 16h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dice-4.mjs
var Dice4 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["path", { d: "M16 8h.01" }],
  ["path", { d: "M8 8h.01" }],
  ["path", { d: "M8 16h.01" }],
  ["path", { d: "M16 16h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dice-5.mjs
var Dice5 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["path", { d: "M16 8h.01" }],
  ["path", { d: "M8 8h.01" }],
  ["path", { d: "M8 16h.01" }],
  ["path", { d: "M16 16h.01" }],
  ["path", { d: "M12 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dice-6.mjs
var Dice6 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["path", { d: "M16 8h.01" }],
  ["path", { d: "M16 12h.01" }],
  ["path", { d: "M16 16h.01" }],
  ["path", { d: "M8 8h.01" }],
  ["path", { d: "M8 12h.01" }],
  ["path", { d: "M8 16h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/diff.mjs
var Diff = [
  ["path", { d: "M12 3v14" }],
  ["path", { d: "M5 10h14" }],
  ["path", { d: "M5 21h14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dices.mjs
var Dices = [
  ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2" }],
  ["path", { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" }],
  ["path", { d: "M6 18h.01" }],
  ["path", { d: "M10 14h.01" }],
  ["path", { d: "M15 6h.01" }],
  ["path", { d: "M18 9h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/disc-2.mjs
var Disc2 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["circle", { cx: "12", cy: "12", r: "4" }],
  ["path", { d: "M12 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/disc-3.mjs
var Disc3 = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M6 12c0-1.7.7-3.2 1.8-4.2" }],
  ["circle", { cx: "12", cy: "12", r: "2" }],
  ["path", { d: "M18 12c0 1.7-.7 3.2-1.8 4.2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/disc-album.mjs
var DiscAlbum = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["circle", { cx: "12", cy: "12", r: "5" }],
  ["path", { d: "M12 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/disc.mjs
var Disc = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dna-off.mjs
var DnaOff = [
  ["path", { d: "M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8" }],
  ["path", { d: "m17 6-2.891-2.891" }],
  ["path", { d: "M2 15c3.333-3 6.667-3 10-3" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "m20 9 .891.891" }],
  ["path", { d: "M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1" }],
  ["path", { d: "M3.109 14.109 4 15" }],
  ["path", { d: "m6.5 12.5 1 1" }],
  ["path", { d: "m7 18 2.891 2.891" }],
  ["path", { d: "M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dna.mjs
var Dna = [
  ["path", { d: "m10 16 1.5 1.5" }],
  ["path", { d: "m14 8-1.5-1.5" }],
  ["path", { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" }],
  ["path", { d: "m16.5 10.5 1 1" }],
  ["path", { d: "m17 6-2.891-2.891" }],
  ["path", { d: "M2 15c6.667-6 13.333 0 20-6" }],
  ["path", { d: "m20 9 .891.891" }],
  ["path", { d: "M3.109 14.109 4 15" }],
  ["path", { d: "m6.5 12.5 1 1" }],
  ["path", { d: "m7 18 2.891 2.891" }],
  ["path", { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/divide.mjs
var Divide = [
  ["circle", { cx: "12", cy: "6", r: "1" }],
  ["line", { x1: "5", x2: "19", y1: "12", y2: "12" }],
  ["circle", { cx: "12", cy: "18", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dock.mjs
var Dock = [
  ["path", { d: "M2 8h20" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
  ["path", { d: "M6 16h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dog.mjs
var Dog = [
  ["path", { d: "M11.25 16.25h1.5L12 17z" }],
  ["path", { d: "M16 14v.5" }],
  [
    "path",
    {
      d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"
    }
  ],
  ["path", { d: "M8 14v.5" }],
  [
    "path",
    {
      d: "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dollar-sign.mjs
var DollarSign = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/donut.mjs
var Donut = [
  [
    "path",
    {
      d: "M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/door-closed-locked.mjs
var DoorClosedLocked = [
  ["path", { d: "M10 12h.01" }],
  ["path", { d: "M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" }],
  ["path", { d: "M2 20h8" }],
  ["path", { d: "M20 17v-2a2 2 0 1 0-4 0v2" }],
  ["rect", { x: "14", y: "17", width: "8", height: "5", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/door-closed.mjs
var DoorClosed = [
  ["path", { d: "M10 12h.01" }],
  ["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" }],
  ["path", { d: "M2 20h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/door-open.mjs
var DoorOpen = [
  ["path", { d: "M11 20H2" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14" }],
  ["path", { d: "M14 12h.01" }],
  ["path", { d: "M22 20h-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/download.mjs
var Download = [
  ["path", { d: "M12 15V3" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
  ["path", { d: "m7 10 5 5 5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dot.mjs
var Dot = [["circle", { cx: "12", cy: "12", r: "1" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/drafting-compass.mjs
var DraftingCompass = [
  ["path", { d: "m12.99 6.74 1.93 3.44" }],
  ["path", { d: "M19.136 12a10 10 0 0 1-14.271 0" }],
  ["path", { d: "m21 21-2.16-3.84" }],
  ["path", { d: "m3 21 8.02-14.26" }],
  ["circle", { cx: "12", cy: "5", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/drama.mjs
var Drama = [
  ["path", { d: "M10 11h.01" }],
  ["path", { d: "M14 6h.01" }],
  ["path", { d: "M18 6h.01" }],
  ["path", { d: "M6.5 13.1h.01" }],
  ["path", { d: "M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3" }],
  ["path", { d: "M17.4 9.9c-.8.8-2 .8-2.8 0" }],
  [
    "path",
    {
      d: "M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"
    }
  ],
  ["path", { d: "M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/drill.mjs
var Drill = [
  ["path", { d: "M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z" }],
  [
    "path",
    {
      d: "M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8"
    }
  ],
  ["path", { d: "M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" }],
  ["path", { d: "M18 6h4" }],
  ["path", { d: "m5 10-2 8" }],
  ["path", { d: "m7 18 2-8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/drone.mjs
var Drone = [
  ["path", { d: "M10 10 7 7" }],
  ["path", { d: "m10 14-3 3" }],
  ["path", { d: "m14 10 3-3" }],
  ["path", { d: "m14 14 3 3" }],
  ["path", { d: "M14.205 4.139a4 4 0 1 1 5.439 5.863" }],
  ["path", { d: "M19.637 14a4 4 0 1 1-5.432 5.868" }],
  ["path", { d: "M4.367 10a4 4 0 1 1 5.438-5.862" }],
  ["path", { d: "M9.795 19.862a4 4 0 1 1-5.429-5.873" }],
  ["rect", { x: "10", y: "8", width: "4", height: "8", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/droplet-off.mjs
var DropletOff = [
  [
    "path",
    {
      d: "M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586"
    }
  ],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/droplet.mjs
var Droplet = [
  [
    "path",
    {
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/droplets.mjs
var Droplets = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/drum.mjs
var Drum = [
  ["path", { d: "m2 2 8 8" }],
  ["path", { d: "m22 2-8 8" }],
  ["ellipse", { cx: "12", cy: "9", rx: "10", ry: "5" }],
  ["path", { d: "M7 13.4v7.9" }],
  ["path", { d: "M12 14v8" }],
  ["path", { d: "M17 13.4v7.9" }],
  ["path", { d: "M2 9v8a10 5 0 0 0 20 0V9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/drumstick.mjs
var Drumstick = [
  ["path", { d: "M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23" }],
  ["path", { d: "m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/dumbbell.mjs
var Dumbbell = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4" }],
  ["path", { d: "m20.1 3.9 1.4-1.4" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ear-off.mjs
var EarOff = [
  ["path", { d: "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46" }],
  ["path", { d: "M6 8.5c0-.75.13-1.47.36-2.14" }],
  ["path", { d: "M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76" }],
  ["path", { d: "M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ear.mjs
var Ear = [
  ["path", { d: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" }],
  ["path", { d: "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/earth-lock.mjs
var EarthLock = [
  ["path", { d: "M7 3.34V5a3 3 0 0 0 3 3" }],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }],
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54" }],
  ["path", { d: "M12 2a10 10 0 1 0 9.54 13" }],
  ["path", { d: "M20 6V4a2 2 0 1 0-4 0v2" }],
  ["rect", { width: "8", height: "5", x: "14", y: "6", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/earth.mjs
var Earth = [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54" }],
  [
    "path",
    { d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }],
  ["circle", { cx: "12", cy: "12", r: "10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/eclipse.mjs
var Eclipse = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 2a7 7 0 1 0 10 10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/egg-fried.mjs
var EggFried = [
  ["circle", { cx: "11.5", cy: "12.5", r: "3.5" }],
  [
    "path",
    {
      d: "M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/egg-off.mjs
var EggOff = [
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19" }],
  ["path", { d: "M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ellipse.mjs
var Ellipse = [["ellipse", { cx: "12", cy: "12", rx: "10", ry: "6" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/egg.mjs
var Egg = [["path", { d: "M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ellipsis-vertical.mjs
var EllipsisVertical = [
  ["circle", { cx: "12", cy: "12", r: "1" }],
  ["circle", { cx: "12", cy: "5", r: "1" }],
  ["circle", { cx: "12", cy: "19", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ellipsis.mjs
var Ellipsis = [
  ["circle", { cx: "12", cy: "12", r: "1" }],
  ["circle", { cx: "19", cy: "12", r: "1" }],
  ["circle", { cx: "5", cy: "12", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/equal-approximately.mjs
var EqualApproximately = [
  ["path", { d: "M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" }],
  ["path", { d: "M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/equal.mjs
var Equal = [
  ["line", { x1: "5", x2: "19", y1: "9", y2: "9" }],
  ["line", { x1: "5", x2: "19", y1: "15", y2: "15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/equal-not.mjs
var EqualNot = [
  ["line", { x1: "5", x2: "19", y1: "9", y2: "9" }],
  ["line", { x1: "5", x2: "19", y1: "15", y2: "15" }],
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ethernet-port.mjs
var EthernetPort = [
  [
    "path",
    { d: "m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z" }
  ],
  ["path", { d: "M6 8v1" }],
  ["path", { d: "M10 8v1" }],
  ["path", { d: "M14 8v1" }],
  ["path", { d: "M18 8v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/eraser.mjs
var Eraser = [
  [
    "path",
    {
      d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"
    }
  ],
  ["path", { d: "m5.082 11.09 8.828 8.828" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/euro.mjs
var Euro = [
  ["path", { d: "M4 10h12" }],
  ["path", { d: "M4 14h9" }],
  [
    "path",
    { d: "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ev-charger.mjs
var EvCharger = [
  ["path", { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" }],
  ["path", { d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" }],
  ["path", { d: "M2 21h13" }],
  ["path", { d: "M3 7h11" }],
  ["path", { d: "m9 11-2 3h3l-2 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/expand.mjs
var Expand = [
  ["path", { d: "m15 15 6 6" }],
  ["path", { d: "m15 9 6-6" }],
  ["path", { d: "M21 16v5h-5" }],
  ["path", { d: "M21 8V3h-5" }],
  ["path", { d: "M3 16v5h5" }],
  ["path", { d: "m3 21 6-6" }],
  ["path", { d: "M3 8V3h5" }],
  ["path", { d: "M9 9 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/external-link.mjs
var ExternalLink = [
  ["path", { d: "M15 3h6v6" }],
  ["path", { d: "M10 14 21 3" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/eye-closed.mjs
var EyeClosed = [
  ["path", { d: "m15 18-.722-3.25" }],
  ["path", { d: "M2 8a10.645 10.645 0 0 0 20 0" }],
  ["path", { d: "m20 15-1.726-2.05" }],
  ["path", { d: "m4 15 1.726-2.05" }],
  ["path", { d: "m9 18 .722-3.25" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/eye-dashed.mjs
var EyeDashed = [
  ["path", { d: "M13.054 18.946a11 11 0 0 1-2.11 0" }],
  ["path", { d: "M13.054 5.054a11 11 0 0 0-2.11-.001" }],
  ["path", { d: "M17.072 6.274a11 11 0 0 1 1.753 1.173" }],
  ["path", { d: "M18.825 16.552a11 11 0 0 1-1.753 1.174" }],
  ["path", { d: "M2.514 13.303a11 11 0 0 1-.452-.954 1 1 0 0 1 0-.697 11 11 0 0 1 .45-.955" }],
  ["path", { d: "M21.485 10.697a11 11 0 0 1 .453.955 1 1 0 0 1 0 .697 11 11 0 0 1-.453.954" }],
  ["path", { d: "M5.173 7.448a11 11 0 0 1 1.753-1.174" }],
  ["path", { d: "M6.926 17.726a11 11 0 0 1-1.753-1.174" }],
  ["circle", { cx: "12", cy: "12", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/eye-off.mjs
var EyeOff = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
    }
  ],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/eye.mjs
var Eye = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/factory.mjs
var Factory = [
  ["path", { d: "M12 16h.01" }],
  ["path", { d: "M16 16h.01" }],
  [
    "path",
    {
      d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"
    }
  ],
  ["path", { d: "M8 16h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fan.mjs
var Fan = [
  [
    "path",
    {
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"
    }
  ],
  ["path", { d: "M12 12v.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fast-forward.mjs
var FastForward = [
  ["path", { d: "M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z" }],
  ["path", { d: "M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/feather.mjs
var Feather = [
  [
    "path",
    {
      d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"
    }
  ],
  ["path", { d: "M16 8 2 22" }],
  ["path", { d: "M17.5 15H9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fence.mjs
var Fence = [
  ["path", { d: "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }],
  ["path", { d: "M6 8h4" }],
  ["path", { d: "M6 18h4" }],
  ["path", { d: "m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }],
  ["path", { d: "M14 8h4" }],
  ["path", { d: "M14 18h4" }],
  ["path", { d: "m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ferris-wheel.mjs
var FerrisWheel = [
  ["circle", { cx: "12", cy: "12", r: "2" }],
  ["path", { d: "M12 2v4" }],
  ["path", { d: "m6.8 15-3.5 2" }],
  ["path", { d: "m20.7 7-3.5 2" }],
  ["path", { d: "M6.8 9 3.3 7" }],
  ["path", { d: "m20.7 17-3.5-2" }],
  ["path", { d: "m9 22 3-8 3 8" }],
  ["path", { d: "M8 22h8" }],
  ["path", { d: "M18 18.7a9 9 0 1 0-12 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-archive.mjs
var FileArchive = [
  [
    "path",
    {
      d: "M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 12v-1" }],
  ["path", { d: "M8 18v-2" }],
  ["path", { d: "M8 7V6" }],
  ["circle", { cx: "8", cy: "20", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-axis-3d.mjs
var FileAxis3d = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m8 18 4-4" }],
  ["path", { d: "M8 10v8h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-badge.mjs
var FileBadge = [
  [
    "path",
    {
      d: "M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    {
      d: "m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88"
    }
  ],
  ["circle", { cx: "6", cy: "14", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-box.mjs
var FileBox = [
  [
    "path",
    {
      d: "M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M11.7 14.2 7 17l-4.7-2.8" }],
  [
    "path",
    {
      d: "M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z"
    }
  ],
  ["path", { d: "M7 17v5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-braces-corner.mjs
var FileBracesCorner = [
  [
    "path",
    {
      d: "M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1" }],
  ["path", { d: "M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-braces.mjs
var FileBraces = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" }],
  ["path", { d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-chart-column-increasing.mjs
var FileChartColumnIncreasing = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 18v-2" }],
  ["path", { d: "M12 18v-4" }],
  ["path", { d: "M16 18v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-chart-column.mjs
var FileChartColumn = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 18v-1" }],
  ["path", { d: "M12 18v-6" }],
  ["path", { d: "M16 18v-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-chart-line.mjs
var FileChartLine = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m16 13-3.5 3.5-2-2L8 17" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-chart-pie.mjs
var FileChartPie = [
  [
    "path",
    {
      d: "M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M4.017 11.512a6 6 0 1 0 8.466 8.475" }],
  [
    "path",
    {
      d: "M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-check.mjs
var FileCheck = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m9 15 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-check-corner.mjs
var FileCheckCorner = [
  [
    "path",
    {
      d: "M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m14 20 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-clock.mjs
var FileClock = [
  [
    "path",
    {
      d: "M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 14v2.2l1.6 1" }],
  ["circle", { cx: "8", cy: "16", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-code-corner.mjs
var FileCodeCorner = [
  [
    "path",
    {
      d: "M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m5 16-3 3 3 3" }],
  ["path", { d: "m9 22 3-3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-code.mjs
var FileCode = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M10 12.5 8 15l2 2.5" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-cog.mjs
var FileCog = [
  ["path", { d: "M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z" }],
  ["path", { d: "M20 8v12a2 2 0 0 1-2 2h-4.182" }],
  ["path", { d: "m3.305 19.53.923-.382" }],
  ["path", { d: "M4 10.592V4a2 2 0 0 1 2-2h8" }],
  ["path", { d: "m4.228 16.852-.924-.383" }],
  ["path", { d: "m5.852 15.228-.383-.923" }],
  ["path", { d: "m5.852 20.772-.383.924" }],
  ["path", { d: "m8.148 15.228.383-.923" }],
  ["path", { d: "m8.53 21.696-.382-.924" }],
  ["path", { d: "m9.773 16.852.922-.383" }],
  ["path", { d: "m9.773 19.148.922.383" }],
  ["circle", { cx: "7", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-diff.mjs
var FileDiff = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M9 10h6" }],
  ["path", { d: "M12 13V7" }],
  ["path", { d: "M9 17h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-digit.mjs
var FileDigit = [
  [
    "path",
    {
      d: "M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M10 16h2v6" }],
  ["path", { d: "M10 22h4" }],
  ["rect", { x: "2", y: "16", width: "4", height: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-down.mjs
var FileDown = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M12 18v-6" }],
  ["path", { d: "m9 15 3 3 3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-exclamation-point.mjs
var FileExclamationPoint = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M12 9v4" }],
  ["path", { d: "M12 17h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-headphone.mjs
var FileHeadphone = [
  [
    "path",
    {
      d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    { d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-heart.mjs
var FileHeart = [
  [
    "path",
    {
      d: "M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    {
      d: "M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-image.mjs
var FileImage = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["circle", { cx: "10", cy: "12", r: "2" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-input.mjs
var FileInput = [
  [
    "path",
    {
      d: "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M2 15h10" }],
  ["path", { d: "m9 18 3-3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-lock.mjs
var FileLock = [
  [
    "path",
    {
      d: "M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M9 17v-2a2 2 0 0 0-4 0v2" }],
  ["rect", { width: "8", height: "5", x: "3", y: "17", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-key.mjs
var FileKey = [
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M4 12v6" }],
  ["path", { d: "M4 14h2" }],
  [
    "path",
    {
      d: "M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4"
    }
  ],
  ["circle", { cx: "4", cy: "20", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-minus-corner.mjs
var FileMinusCorner = [
  [
    "path",
    {
      d: "M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M14 18h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-music.mjs
var FileMusic = [
  [
    "path",
    {
      d: "M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 20v-7l3 1.474" }],
  ["circle", { cx: "6", cy: "20", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-minus.mjs
var FileMinus = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M9 15h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-output.mjs
var FileOutput = [
  [
    "path",
    {
      d: "M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m5 11-3 3" }],
  ["path", { d: "m5 17-3-3h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-pen-line.mjs
var FilePenLine = [
  [
    "path",
    {
      d: "M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z"
    }
  ],
  ["path", { d: "M14.487 7.858A1 1 0 0 1 14 7V2" }],
  [
    "path",
    {
      d: "M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516"
    }
  ],
  ["path", { d: "M8 18h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-play.mjs
var FilePlay = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    {
      d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-pen.mjs
var FilePen = [
  [
    "path",
    {
      d: "M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    {
      d: "M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-plus-corner.mjs
var FilePlusCorner = [
  [
    "path",
    {
      d: "M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M14 19h6" }],
  ["path", { d: "M17 16v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-plus.mjs
var FilePlus = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M9 15h6" }],
  ["path", { d: "M12 18v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-question-mark.mjs
var FileQuestionMark = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M12 17h.01" }],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-scan.mjs
var FileScan = [
  [
    "path",
    {
      d: "M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M16 14a2 2 0 0 0-2 2" }],
  ["path", { d: "M16 22a2 2 0 0 1-2-2" }],
  ["path", { d: "M20 14a2 2 0 0 1 2 2" }],
  ["path", { d: "M20 22a2 2 0 0 0 2-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-search-corner.mjs
var FileSearchCorner = [
  [
    "path",
    {
      d: "M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m21 22-2.88-2.88" }],
  ["circle", { cx: "16", cy: "17", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-search.mjs
var FileSearch = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["circle", { cx: "11.5", cy: "14.5", r: "2.5" }],
  ["path", { d: "M13.3 16.3 15 18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-signal.mjs
var FileSignal = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 15h.01" }],
  ["path", { d: "M11.5 13.5a2.5 2.5 0 0 1 0 3" }],
  ["path", { d: "M15 12a5 5 0 0 1 0 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-sliders.mjs
var FileSliders = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 12h8" }],
  ["path", { d: "M10 11v2" }],
  ["path", { d: "M8 17h8" }],
  ["path", { d: "M14 16v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-spreadsheet.mjs
var FileSpreadsheet = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 13h2" }],
  ["path", { d: "M14 13h2" }],
  ["path", { d: "M8 17h2" }],
  ["path", { d: "M14 17h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-stack.mjs
var FileStack = [
  ["path", { d: "M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1" }],
  ["path", { d: "M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1" }],
  [
    "path",
    {
      d: "M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-terminal.mjs
var FileTerminal = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m8 16 2-2-2-2" }],
  ["path", { d: "M12 18h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-symlink.mjs
var FileSymlink = [
  [
    "path",
    {
      d: "M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m10 18 3-3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-type-corner.mjs
var FileTypeCorner = [
  [
    "path",
    {
      d: "M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16" }],
  ["path", { d: "M6 22h2" }],
  ["path", { d: "M7 14v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-text.mjs
var FileText = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M10 9H8" }],
  ["path", { d: "M16 13H8" }],
  ["path", { d: "M16 17H8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-type.mjs
var FileType = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M11 18h2" }],
  ["path", { d: "M12 12v6" }],
  ["path", { d: "M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-up.mjs
var FileUp = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M12 12v6" }],
  ["path", { d: "m15 15-3-3-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-user.mjs
var FileUser = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M16 22a4 4 0 0 0-8 0" }],
  ["circle", { cx: "12", cy: "15", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-video-camera.mjs
var FileVideoCamera = [
  [
    "path",
    {
      d: "M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    { d: "m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157" }
  ],
  ["rect", { width: "7", height: "6", x: "3", y: "16", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-volume.mjs
var FileVolume = [
  [
    "path",
    {
      d: "M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M12 15a5 5 0 0 1 0 6" }],
  [
    "path",
    {
      d: "M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-x-corner.mjs
var FileXCorner = [
  [
    "path",
    {
      d: "M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m15 17 5 5" }],
  ["path", { d: "m20 17-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file-x.mjs
var FileX = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m14.5 12.5-5 5" }],
  ["path", { d: "m9.5 12.5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/file.mjs
var File2 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/film.mjs
var Film = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M7 3v18" }],
  ["path", { d: "M3 7.5h4" }],
  ["path", { d: "M3 12h18" }],
  ["path", { d: "M3 16.5h4" }],
  ["path", { d: "M17 3v18" }],
  ["path", { d: "M17 7.5h4" }],
  ["path", { d: "M17 16.5h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/files.mjs
var Files = [
  ["path", { d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" }],
  ["path", { d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" }],
  ["path", { d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fingerprint-pattern.mjs
var FingerprintPattern = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6" }],
  ["path", { d: "M2 16h.01" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fire-extinguisher.mjs
var FireExtinguisher = [
  ["path", { d: "M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" }],
  ["path", { d: "M9 18h8" }],
  ["path", { d: "M18 3h-3" }],
  ["path", { d: "M11 3a6 6 0 0 0-6 6v11" }],
  ["path", { d: "M5 13h4" }],
  ["path", { d: "M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fish-off.mjs
var FishOff = [
  [
    "path",
    {
      d: "M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058"
    }
  ],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618"
    }
  ],
  [
    "path",
    {
      d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fish-symbol.mjs
var FishSymbol = [["path", { d: "M2 16s9-15 20-4C11 23 2 8 2 8" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fish.mjs
var Fish = [
  [
    "path",
    {
      d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"
    }
  ],
  ["path", { d: "M18 12v.5" }],
  ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86" }],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"
    }
  ],
  ["path", { d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" }],
  ["path", { d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fishing-hook.mjs
var FishingHook = [
  ["path", { d: "m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10" }],
  ["path", { d: "M20.414 8.586 22 7" }],
  ["circle", { cx: "19", cy: "10", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fishing-rod.mjs
var FishingRod = [
  ["path", { d: "M4 11h1" }],
  ["path", { d: "M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4" }],
  ["circle", { cx: "18", cy: "18", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flag-off.mjs
var FlagOff = [
  ["path", { d: "M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M4 22V4" }],
  ["path", { d: "M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flag-triangle-left.mjs
var FlagTriangleLeft = [
  ["path", { d: "M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flag-triangle-right.mjs
var FlagTriangleRight = [
  ["path", { d: "M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flag.mjs
var Flag = [
  [
    "path",
    {
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flame-kindling.mjs
var FlameKindling = [
  [
    "path",
    {
      d: "M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z"
    }
  ],
  ["path", { d: "m5 22 14-4" }],
  ["path", { d: "m5 18 14 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flame.mjs
var Flame = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flashlight-off.mjs
var FlashlightOff = [
  ["path", { d: "M11.652 6H18" }],
  ["path", { d: "M12 13v1" }],
  [
    "path",
    { d: "M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6" }
  ],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flashlight.mjs
var Flashlight = [
  ["path", { d: "M12 13v1" }],
  [
    "path",
    {
      d: "M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z"
    }
  ],
  ["path", { d: "M6 6h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flask-conical.mjs
var FlaskConical = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"
    }
  ],
  ["path", { d: "M6.453 15h11.094" }],
  ["path", { d: "M8.5 2h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flask-conical-off.mjs
var FlaskConicalOff = [
  ["path", { d: "M10 2v2.343" }],
  ["path", { d: "M14 2v6.343" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563" }],
  ["path", { d: "M6.453 15H15" }],
  ["path", { d: "M8.5 2h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flask-round.mjs
var FlaskRound = [
  ["path", { d: "M10 2v6.292a7 7 0 1 0 4 0V2" }],
  ["path", { d: "M5 15h14" }],
  ["path", { d: "M8.5 2h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flip-horizontal-2.mjs
var FlipHorizontal2 = [
  ["path", { d: "m3 7 5 5-5 5V7" }],
  ["path", { d: "m21 7-5 5 5 5V7" }],
  ["path", { d: "M12 20v2" }],
  ["path", { d: "M12 14v2" }],
  ["path", { d: "M12 8v2" }],
  ["path", { d: "M12 2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flip-vertical-2.mjs
var FlipVertical2 = [
  ["path", { d: "m17 3-5 5-5-5h10" }],
  ["path", { d: "m17 21-5-5-5 5h10" }],
  ["path", { d: "M4 12H2" }],
  ["path", { d: "M10 12H8" }],
  ["path", { d: "M16 12h-2" }],
  ["path", { d: "M22 12h-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flower-2.mjs
var Flower2 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2" }],
  ["path", { d: "M12 10v12" }],
  ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" }],
  ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/flower.mjs
var Flower = [
  ["circle", { cx: "12", cy: "12", r: "3" }],
  [
    "path",
    {
      d: "M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"
    }
  ],
  ["path", { d: "M12 7.5V9" }],
  ["path", { d: "M7.5 12H9" }],
  ["path", { d: "M16.5 12H15" }],
  ["path", { d: "M12 16.5V15" }],
  ["path", { d: "m8 8 1.88 1.88" }],
  ["path", { d: "M14.12 9.88 16 8" }],
  ["path", { d: "m8 16 1.88-1.88" }],
  ["path", { d: "M14.12 14.12 16 16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/focus.mjs
var Focus = [
  ["circle", { cx: "12", cy: "12", r: "3" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fold-horizontal.mjs
var FoldHorizontal = [
  ["path", { d: "M2 12h6" }],
  ["path", { d: "M22 12h-6" }],
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M12 8v2" }],
  ["path", { d: "M12 14v2" }],
  ["path", { d: "M12 20v2" }],
  ["path", { d: "m19 9-3 3 3 3" }],
  ["path", { d: "m5 15 3-3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fold-vertical.mjs
var FoldVertical = [
  ["path", { d: "M12 22v-6" }],
  ["path", { d: "M12 8V2" }],
  ["path", { d: "M4 12H2" }],
  ["path", { d: "M10 12H8" }],
  ["path", { d: "M16 12h-2" }],
  ["path", { d: "M22 12h-2" }],
  ["path", { d: "m15 19-3-3-3 3" }],
  ["path", { d: "m15 5-3 3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-archive.mjs
var FolderArchive = [
  ["circle", { cx: "15", cy: "19", r: "2" }],
  [
    "path",
    {
      d: "M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1"
    }
  ],
  ["path", { d: "M15 11v-1" }],
  ["path", { d: "M15 17v-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-bookmark.mjs
var FolderBookmark = [
  ["path", { d: "M12 6v8l3-3 3 3V6" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-check.mjs
var FolderCheck = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ],
  ["path", { d: "m9 13 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-clock.mjs
var FolderClock = [
  ["path", { d: "M16 14v2.2l1.6 1" }],
  [
    "path",
    {
      d: "M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"
    }
  ],
  ["circle", { cx: "16", cy: "16", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-closed.mjs
var FolderClosed = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ],
  ["path", { d: "M2 10h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-code.mjs
var FolderCode = [
  ["path", { d: "M10 10.5 8 13l2 2.5" }],
  ["path", { d: "m14 10.5 2 2.5-2 2.5" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-cog.mjs
var FolderCog = [
  [
    "path",
    {
      d: "M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3"
    }
  ],
  ["path", { d: "m14.305 19.53.923-.382" }],
  ["path", { d: "m15.228 16.852-.923-.383" }],
  ["path", { d: "m16.852 15.228-.383-.923" }],
  ["path", { d: "m16.852 20.772-.383.924" }],
  ["path", { d: "m19.148 15.228.383-.923" }],
  ["path", { d: "m19.53 21.696-.382-.924" }],
  ["path", { d: "m20.772 16.852.924-.383" }],
  ["path", { d: "m20.772 19.148.924.383" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-dot.mjs
var FolderDot = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-down.mjs
var FolderDown = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ],
  ["path", { d: "M12 10v6" }],
  ["path", { d: "m15 13-3 3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-git-2.mjs
var FolderGit2 = [
  ["path", { d: "M18 19a5 5 0 0 1-5-5v8" }],
  [
    "path",
    {
      d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"
    }
  ],
  ["circle", { cx: "13", cy: "12", r: "2" }],
  ["circle", { cx: "20", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-git.mjs
var FolderGit = [
  ["circle", { cx: "12", cy: "13", r: "2" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ],
  ["path", { d: "M14 13h3" }],
  ["path", { d: "M7 13h3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-heart.mjs
var FolderHeart = [
  [
    "path",
    {
      d: "M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417"
    }
  ],
  [
    "path",
    {
      d: "M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-input.mjs
var FolderInput = [
  [
    "path",
    {
      d: "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"
    }
  ],
  ["path", { d: "M2 13h10" }],
  ["path", { d: "m9 16 3-3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-kanban.mjs
var FolderKanban = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
    }
  ],
  ["path", { d: "M8 10v4" }],
  ["path", { d: "M12 10v2" }],
  ["path", { d: "M16 10v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-key.mjs
var FolderKey = [
  [
    "path",
    {
      d: "M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36"
    }
  ],
  ["path", { d: "M19 12v6" }],
  ["path", { d: "M19 14h2" }],
  ["circle", { cx: "19", cy: "20", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-lock.mjs
var FolderLock = [
  ["rect", { width: "8", height: "5", x: "14", y: "17", rx: "1" }],
  [
    "path",
    {
      d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5"
    }
  ],
  ["path", { d: "M20 17v-2a2 2 0 1 0-4 0v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-minus.mjs
var FolderMinus = [
  ["path", { d: "M9 13h6" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-open-dot.mjs
var FolderOpenDot = [
  [
    "path",
    {
      d: "m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"
    }
  ],
  ["circle", { cx: "14", cy: "15", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-open.mjs
var FolderOpen = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-output.mjs
var FolderOutput = [
  [
    "path",
    {
      d: "M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5"
    }
  ],
  ["path", { d: "M2 13h10" }],
  ["path", { d: "m5 10-3 3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-pen.mjs
var FolderPen = [
  [
    "path",
    {
      d: "M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"
    }
  ],
  [
    "path",
    {
      d: "M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-plus.mjs
var FolderPlus = [
  ["path", { d: "M12 10v6" }],
  ["path", { d: "M9 13h6" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-root.mjs
var FolderRoot = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "2" }],
  ["path", { d: "M12 15v5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-search-2.mjs
var FolderSearch2 = [
  ["circle", { cx: "11.5", cy: "12.5", r: "2.5" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ],
  ["path", { d: "M13.3 14.3 15 16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-search.mjs
var FolderSearch = [
  [
    "path",
    {
      d: "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1"
    }
  ],
  ["path", { d: "m21 21-1.9-1.9" }],
  ["circle", { cx: "17", cy: "17", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-symlink.mjs
var FolderSymlink = [
  [
    "path",
    {
      d: "M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"
    }
  ],
  ["path", { d: "m8 16 3-3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-sync.mjs
var FolderSync = [
  [
    "path",
    {
      d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5"
    }
  ],
  ["path", { d: "M12 10v4h4" }],
  ["path", { d: "m12 14 1.535-1.605a5 5 0 0 1 8 1.5" }],
  ["path", { d: "M22 22v-4h-4" }],
  ["path", { d: "m22 18-1.535 1.605a5 5 0 0 1-8-1.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-tree.mjs
var FolderTree = [
  [
    "path",
    {
      d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
    }
  ],
  [
    "path",
    {
      d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
    }
  ],
  ["path", { d: "M3 5a2 2 0 0 0 2 2h3" }],
  ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-up.mjs
var FolderUp = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ],
  ["path", { d: "M12 10v6" }],
  ["path", { d: "m9 13 3-3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder.mjs
var Folder = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folder-x.mjs
var FolderX = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }
  ],
  ["path", { d: "m9.5 10.5 5 5" }],
  ["path", { d: "m14.5 10.5-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/folders.mjs
var Folders = [
  [
    "path",
    {
      d: "M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z"
    }
  ],
  ["path", { d: "M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/footprints.mjs
var Footprints = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"
    }
  ],
  ["path", { d: "M16 17h4" }],
  ["path", { d: "M4 13h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/forklift.mjs
var Forklift = [
  ["path", { d: "M12 12H5a2 2 0 0 0-2 2v5" }],
  ["path", { d: "M15 19h7" }],
  ["path", { d: "M16 19V2" }],
  [
    "path",
    { d: "M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828" }
  ],
  ["path", { d: "M7 19h4" }],
  ["circle", { cx: "13", cy: "19", r: "2" }],
  ["circle", { cx: "5", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/form.mjs
var Form = [
  ["path", { d: "M4 14h6" }],
  ["path", { d: "M4 2h10" }],
  ["rect", { x: "4", y: "18", width: "16", height: "4", rx: "1" }],
  ["rect", { x: "4", y: "6", width: "16", height: "4", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/forward.mjs
var Forward = [
  ["path", { d: "m15 17 5-5-5-5" }],
  ["path", { d: "M4 18v-2a4 4 0 0 1 4-4h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/frame.mjs
var Frame = [
  ["line", { x1: "22", x2: "2", y1: "6", y2: "6" }],
  ["line", { x1: "22", x2: "2", y1: "18", y2: "18" }],
  ["line", { x1: "6", x2: "6", y1: "2", y2: "22" }],
  ["line", { x1: "18", x2: "18", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/frown.mjs
var Frown = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fullscreen.mjs
var Fullscreen = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  ["rect", { width: "10", height: "8", x: "7", y: "8", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/funnel-plus.mjs
var FunnelPlus = [
  [
    "path",
    {
      d: "M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348"
    }
  ],
  ["path", { d: "M16 6h6" }],
  ["path", { d: "M19 3v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/fuel.mjs
var Fuel = [
  ["path", { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" }],
  ["path", { d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" }],
  ["path", { d: "M2 21h13" }],
  ["path", { d: "M3 9h11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/funnel-x.mjs
var FunnelX = [
  [
    "path",
    {
      d: "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473"
    }
  ],
  ["path", { d: "m16.5 3.5 5 5" }],
  ["path", { d: "m21.5 3.5-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/funnel.mjs
var Funnel = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gallery-horizontal-end.mjs
var GalleryHorizontalEnd = [
  ["path", { d: "M2 7v10" }],
  ["path", { d: "M6 5v14" }],
  ["rect", { width: "12", height: "18", x: "10", y: "3", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gallery-horizontal.mjs
var GalleryHorizontal = [
  ["path", { d: "M2 3v18" }],
  ["rect", { width: "12", height: "18", x: "6", y: "3", rx: "2" }],
  ["path", { d: "M22 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gallery-thumbnails.mjs
var GalleryThumbnails = [
  ["rect", { width: "18", height: "14", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M4 21h1" }],
  ["path", { d: "M9 21h1" }],
  ["path", { d: "M14 21h1" }],
  ["path", { d: "M19 21h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gallery-vertical-end.mjs
var GalleryVerticalEnd = [
  ["path", { d: "M7 2h10" }],
  ["path", { d: "M5 6h14" }],
  ["rect", { width: "18", height: "12", x: "3", y: "10", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gallery-vertical.mjs
var GalleryVertical = [
  ["path", { d: "M3 2h18" }],
  ["rect", { width: "18", height: "12", x: "3", y: "6", rx: "2" }],
  ["path", { d: "M3 22h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gamepad-2.mjs
var Gamepad2 = [
  ["line", { x1: "6", x2: "10", y1: "11", y2: "11" }],
  ["line", { x1: "8", x2: "8", y1: "9", y2: "13" }],
  ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12" }],
  ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10" }],
  [
    "path",
    {
      d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gamepad-directional.mjs
var GamepadDirectional = [
  [
    "path",
    {
      d: "M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z"
    }
  ],
  [
    "path",
    {
      d: "M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"
    }
  ],
  [
    "path",
    {
      d: "M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z"
    }
  ],
  [
    "path",
    {
      d: "M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gamepad.mjs
var Gamepad = [
  ["line", { x1: "6", x2: "10", y1: "12", y2: "12" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14" }],
  ["line", { x1: "15", x2: "15.01", y1: "13", y2: "13" }],
  ["line", { x1: "18", x2: "18.01", y1: "11", y2: "11" }],
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gauge.mjs
var Gauge = [
  ["path", { d: "m12 14 4-4" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gavel.mjs
var Gavel = [
  ["path", { d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" }],
  ["path", { d: "m16 16 6-6" }],
  ["path", { d: "m21.5 10.5-8-8" }],
  ["path", { d: "m8 8 6-6" }],
  ["path", { d: "m8.5 7.5 8 8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gem.mjs
var Gem = [
  ["path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6" }],
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"
    }
  ],
  ["path", { d: "M2 9h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ghost.mjs
var Ghost = [
  ["path", { d: "M9 10h.01" }],
  ["path", { d: "M15 10h.01" }],
  ["path", { d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/georgian-lari.mjs
var GeorgianLari = [
  ["path", { d: "M11.5 21a7.5 7.5 0 1 1 7.35-9" }],
  ["path", { d: "M13 12V3" }],
  ["path", { d: "M4 21h16" }],
  ["path", { d: "M9 12V3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gift.mjs
var Gift = [
  ["path", { d: "M12 7v14" }],
  ["path", { d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" }],
  ["path", { d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" }],
  ["rect", { x: "3", y: "7", width: "18", height: "4", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-branch-minus.mjs
var GitBranchMinus = [
  ["path", { d: "M15 6a9 9 0 0 0-9 9V3" }],
  ["path", { d: "M21 18h-6" }],
  ["circle", { cx: "18", cy: "6", r: "3" }],
  ["circle", { cx: "6", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-branch-plus.mjs
var GitBranchPlus = [
  ["path", { d: "M6 3v12" }],
  ["path", { d: "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }],
  ["path", { d: "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }],
  ["path", { d: "M15 6a9 9 0 0 0-9 9" }],
  ["path", { d: "M18 15v6" }],
  ["path", { d: "M21 18h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-branch.mjs
var GitBranch = [
  ["path", { d: "M15 6a9 9 0 0 0-9 9V3" }],
  ["circle", { cx: "18", cy: "6", r: "3" }],
  ["circle", { cx: "6", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-commit-horizontal.mjs
var GitCommitHorizontal = [
  ["circle", { cx: "12", cy: "12", r: "3" }],
  ["line", { x1: "3", x2: "9", y1: "12", y2: "12" }],
  ["line", { x1: "15", x2: "21", y1: "12", y2: "12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-commit-vertical.mjs
var GitCommitVertical = [
  ["path", { d: "M12 3v6" }],
  ["circle", { cx: "12", cy: "12", r: "3" }],
  ["path", { d: "M12 15v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-compare-arrows.mjs
var GitCompareArrows = [
  ["circle", { cx: "5", cy: "6", r: "3" }],
  ["path", { d: "M12 6h5a2 2 0 0 1 2 2v7" }],
  ["path", { d: "m15 9-3-3 3-3" }],
  ["circle", { cx: "19", cy: "18", r: "3" }],
  ["path", { d: "M12 18H7a2 2 0 0 1-2-2V9" }],
  ["path", { d: "m9 15 3 3-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-compare.mjs
var GitCompare = [
  ["circle", { cx: "18", cy: "18", r: "3" }],
  ["circle", { cx: "6", cy: "6", r: "3" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7" }],
  ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-fork.mjs
var GitFork = [
  ["circle", { cx: "12", cy: "18", r: "3" }],
  ["circle", { cx: "6", cy: "6", r: "3" }],
  ["circle", { cx: "18", cy: "6", r: "3" }],
  ["path", { d: "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" }],
  ["path", { d: "M12 12v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-graph.mjs
var GitGraph = [
  ["circle", { cx: "5", cy: "6", r: "3" }],
  ["path", { d: "M5 9v6" }],
  ["circle", { cx: "5", cy: "18", r: "3" }],
  ["path", { d: "M12 3v18" }],
  ["circle", { cx: "19", cy: "6", r: "3" }],
  ["path", { d: "M16 15.7A9 9 0 0 0 19 9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-merge.mjs
var GitMerge = [
  ["circle", { cx: "18", cy: "18", r: "3" }],
  ["circle", { cx: "6", cy: "6", r: "3" }],
  ["path", { d: "M6 21V9a9 9 0 0 0 9 9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-merge-conflict.mjs
var GitMergeConflict = [
  ["path", { d: "M12 6h4a2 2 0 0 1 2 2v7" }],
  ["path", { d: "M6 12v9" }],
  ["path", { d: "M9 3 3 9" }],
  ["path", { d: "M9 9 3 3" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-pull-request-arrow.mjs
var GitPullRequestArrow = [
  ["circle", { cx: "5", cy: "6", r: "3" }],
  ["path", { d: "M5 9v12" }],
  ["circle", { cx: "19", cy: "18", r: "3" }],
  ["path", { d: "m15 9-3-3 3-3" }],
  ["path", { d: "M12 6h5a2 2 0 0 1 2 2v7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-pull-request-closed.mjs
var GitPullRequestClosed = [
  ["circle", { cx: "6", cy: "6", r: "3" }],
  ["path", { d: "M6 9v12" }],
  ["path", { d: "m21 3-6 6" }],
  ["path", { d: "m21 9-6-6" }],
  ["path", { d: "M18 11.5V15" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-pull-request-create-arrow.mjs
var GitPullRequestCreateArrow = [
  ["circle", { cx: "5", cy: "6", r: "3" }],
  ["path", { d: "M5 9v12" }],
  ["path", { d: "m15 9-3-3 3-3" }],
  ["path", { d: "M12 6h5a2 2 0 0 1 2 2v3" }],
  ["path", { d: "M19 15v6" }],
  ["path", { d: "M22 18h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-pull-request-create.mjs
var GitPullRequestCreate = [
  ["circle", { cx: "6", cy: "6", r: "3" }],
  ["path", { d: "M6 9v12" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v3" }],
  ["path", { d: "M18 15v6" }],
  ["path", { d: "M21 18h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-pull-request-draft.mjs
var GitPullRequestDraft = [
  ["circle", { cx: "18", cy: "18", r: "3" }],
  ["circle", { cx: "6", cy: "6", r: "3" }],
  ["path", { d: "M18 6V5" }],
  ["path", { d: "M18 11v-1" }],
  ["line", { x1: "6", x2: "6", y1: "9", y2: "21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/git-pull-request.mjs
var GitPullRequest = [
  ["circle", { cx: "18", cy: "18", r: "3" }],
  ["circle", { cx: "6", cy: "6", r: "3" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7" }],
  ["line", { x1: "6", x2: "6", y1: "9", y2: "21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/glass-water.mjs
var GlassWater = [
  [
    "path",
    {
      d: "M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z"
    }
  ],
  ["path", { d: "M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/glasses.mjs
var Glasses = [
  ["circle", { cx: "6", cy: "15", r: "4" }],
  ["circle", { cx: "18", cy: "15", r: "4" }],
  ["path", { d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" }],
  ["path", { d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2" }],
  ["path", { d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/globe-check.mjs
var GlobeCheck = [
  ["path", { d: "m15 6 2 2 4-4" }],
  ["path", { d: "M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/globe-lock.mjs
var GlobeLock = [
  ["path", { d: "M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13" }],
  ["path", { d: "M2 12h8.5" }],
  ["path", { d: "M20 6V4a2 2 0 1 0-4 0v2" }],
  ["rect", { width: "8", height: "5", x: "14", y: "6", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/globe-off.mjs
var GlobeOff = [
  ["path", { d: "M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643" }],
  ["path", { d: "M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929" }],
  ["path", { d: "M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687" }],
  ["path", { d: "M17.656 12H22" }],
  ["path", { d: "M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45" }],
  ["path", { d: "M2 12h10" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/globe-x.mjs
var GlobeX = [
  ["path", { d: "m16 3 5 5" }],
  ["path", { d: "M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10" }],
  ["path", { d: "m21 3-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/goal.mjs
var Goal = [
  ["path", { d: "M12 13V2l8 4-8 4" }],
  ["path", { d: "M20.561 10.222a9 9 0 1 1-12.55-5.29" }],
  ["path", { d: "M8.002 9.997a5 5 0 1 0 8.9 2.02" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/globe.mjs
var Globe = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
  ["path", { d: "M2 12h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/gpu.mjs
var Gpu = [
  ["path", { d: "M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2" }],
  ["path", { d: "M2 21V3" }],
  ["path", { d: "M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3" }],
  ["circle", { cx: "16", cy: "11", r: "2" }],
  ["circle", { cx: "8", cy: "11", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/graduation-cap.mjs
var GraduationCap = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
    }
  ],
  ["path", { d: "M22 10v6" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grape.mjs
var Grape = [
  ["path", { d: "M22 5V2l-5.89 5.89" }],
  ["circle", { cx: "16.6", cy: "15.89", r: "3" }],
  ["circle", { cx: "8.11", cy: "7.4", r: "3" }],
  ["circle", { cx: "12.35", cy: "11.65", r: "3" }],
  ["circle", { cx: "13.91", cy: "5.85", r: "3" }],
  ["circle", { cx: "18.15", cy: "10.09", r: "3" }],
  ["circle", { cx: "6.56", cy: "13.2", r: "3" }],
  ["circle", { cx: "10.8", cy: "17.44", r: "3" }],
  ["circle", { cx: "5", cy: "19", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grid-2x2-check.mjs
var Grid2x2Check = [
  [
    "path",
    {
      d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"
    }
  ],
  ["path", { d: "m16 19 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grid-2x2-plus.mjs
var Grid2x2Plus = [
  [
    "path",
    {
      d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"
    }
  ],
  ["path", { d: "M16 19h6" }],
  ["path", { d: "M19 22v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grid-2x2-x.mjs
var Grid2x2X = [
  [
    "path",
    {
      d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"
    }
  ],
  ["path", { d: "m16 16 5 5" }],
  ["path", { d: "m16 21 5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grid-2x2.mjs
var Grid2x2 = [
  ["path", { d: "M12 3v18" }],
  ["path", { d: "M3 12h18" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grid-3x2.mjs
var Grid3x2 = [
  ["path", { d: "M15 3v18" }],
  ["path", { d: "M3 12h18" }],
  ["path", { d: "M9 3v18" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grid-3x3.mjs
var Grid3x3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 9h18" }],
  ["path", { d: "M3 15h18" }],
  ["path", { d: "M9 3v18" }],
  ["path", { d: "M15 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grip-horizontal.mjs
var GripHorizontal = [
  ["circle", { cx: "12", cy: "9", r: "1" }],
  ["circle", { cx: "19", cy: "9", r: "1" }],
  ["circle", { cx: "5", cy: "9", r: "1" }],
  ["circle", { cx: "12", cy: "15", r: "1" }],
  ["circle", { cx: "19", cy: "15", r: "1" }],
  ["circle", { cx: "5", cy: "15", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grip-vertical.mjs
var GripVertical = [
  ["circle", { cx: "9", cy: "12", r: "1" }],
  ["circle", { cx: "9", cy: "5", r: "1" }],
  ["circle", { cx: "9", cy: "19", r: "1" }],
  ["circle", { cx: "15", cy: "12", r: "1" }],
  ["circle", { cx: "15", cy: "5", r: "1" }],
  ["circle", { cx: "15", cy: "19", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/grip.mjs
var Grip = [
  ["circle", { cx: "12", cy: "5", r: "1" }],
  ["circle", { cx: "19", cy: "5", r: "1" }],
  ["circle", { cx: "5", cy: "5", r: "1" }],
  ["circle", { cx: "12", cy: "12", r: "1" }],
  ["circle", { cx: "19", cy: "12", r: "1" }],
  ["circle", { cx: "5", cy: "12", r: "1" }],
  ["circle", { cx: "12", cy: "19", r: "1" }],
  ["circle", { cx: "19", cy: "19", r: "1" }],
  ["circle", { cx: "5", cy: "19", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/group.mjs
var Group = [
  ["path", { d: "M3 7V5c0-1.1.9-2 2-2h2" }],
  ["path", { d: "M17 3h2c1.1 0 2 .9 2 2v2" }],
  ["path", { d: "M21 17v2c0 1.1-.9 2-2 2h-2" }],
  ["path", { d: "M7 21H5c-1.1 0-2-.9-2-2v-2" }],
  ["rect", { width: "7", height: "5", x: "7", y: "7", rx: "1" }],
  ["rect", { width: "7", height: "5", x: "10", y: "12", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/guitar.mjs
var Guitar = [
  ["path", { d: "m11.9 12.1 4.514-4.514" }],
  [
    "path",
    {
      d: "M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z"
    }
  ],
  ["path", { d: "m6 16 2 2" }],
  [
    "path",
    {
      d: "M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ham.mjs
var Ham = [
  ["path", { d: "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856" }],
  [
    "path",
    { d: "M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288" }
  ],
  [
    "path",
    {
      d: "M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025"
    }
  ],
  ["path", { d: "m8.5 16.5-1-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hammer.mjs
var Hammer = [
  ["path", { d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" }],
  ["path", { d: "m18 15 4-4" }],
  [
    "path",
    {
      d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hand-coins.mjs
var HandCoins = [
  ["path", { d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" }],
  [
    "path",
    {
      d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
    }
  ],
  ["path", { d: "m2 16 6 6" }],
  ["circle", { cx: "16", cy: "9", r: "2.9" }],
  ["circle", { cx: "6", cy: "5", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hamburger.mjs
var Hamburger = [
  ["path", { d: "M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" }],
  ["path", { d: "M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" }],
  ["path", { d: "M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" }],
  ["path", { d: "m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hand-fist.mjs
var HandFist = [
  [
    "path",
    {
      d: "M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0"
    }
  ],
  ["path", { d: "M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5" }],
  ["path", { d: "M9 5A2 2 0 1 0 5 5V10" }],
  ["path", { d: "M9 7V4A2 2 0 1 1 13 4V7.268" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hand-grab.mjs
var HandGrab = [
  ["path", { d: "M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" }],
  ["path", { d: "M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" }],
  ["path", { d: "M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" }],
  ["path", { d: "M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
  ["path", { d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hand-heart.mjs
var HandHeart = [
  ["path", { d: "M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" }],
  [
    "path",
    {
      d: "m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"
    }
  ],
  ["path", { d: "m2 15 6 6" }],
  [
    "path",
    { d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hand-helping.mjs
var HandHelping = [
  ["path", { d: "M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" }],
  [
    "path",
    {
      d: "m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
    }
  ],
  ["path", { d: "m2 13 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hand-metal.mjs
var HandMetal = [
  ["path", { d: "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" }],
  ["path", { d: "M14 11V9a2 2 0 1 0-4 0v2" }],
  ["path", { d: "M10 10.5V5a2 2 0 1 0-4 0v9" }],
  [
    "path",
    {
      d: "m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hand-platter.mjs
var HandPlatter = [
  ["path", { d: "M12 3V2" }],
  [
    "path",
    {
      d: "m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"
    }
  ],
  ["path", { d: "M2 14h12a2 2 0 0 1 0 4h-2" }],
  ["path", { d: "M4 10h16" }],
  ["path", { d: "M5 10a7 7 0 0 1 14 0" }],
  ["path", { d: "M5 14v6a1 1 0 0 1-1 1H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/handbag.mjs
var Handbag = [
  [
    "path",
    {
      d: "M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"
    }
  ],
  ["path", { d: "M8 11V6a4 4 0 0 1 8 0v5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/handshake.mjs
var Handshake = [
  ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3" }],
  [
    "path",
    {
      d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"
    }
  ],
  ["path", { d: "m21 3 1 11h-2" }],
  ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" }],
  ["path", { d: "M3 4h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hand.mjs
var Hand = [
  ["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
  ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" }],
  ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" }],
  [
    "path",
    {
      d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hard-drive-download.mjs
var HardDriveDownload = [
  ["path", { d: "M12 2v8" }],
  ["path", { d: "m16 6-4 4-4-4" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
  ["path", { d: "M6 18h.01" }],
  ["path", { d: "M10 18h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hard-drive-upload.mjs
var HardDriveUpload = [
  ["path", { d: "m16 6-4-4-4 4" }],
  ["path", { d: "M12 2v8" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
  ["path", { d: "M6 18h.01" }],
  ["path", { d: "M10 18h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hard-drive.mjs
var HardDrive = [
  ["path", { d: "M10 16h.01" }],
  [
    "path",
    {
      d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
    }
  ],
  ["path", { d: "M21.946 12.013H2.054" }],
  ["path", { d: "M6 16h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hard-hat.mjs
var HardHat = [
  ["path", { d: "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" }],
  ["path", { d: "M14 6a6 6 0 0 1 6 6v3" }],
  ["path", { d: "M4 15v-3a6 6 0 0 1 6-6" }],
  ["rect", { x: "2", y: "15", width: "20", height: "4", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hash.mjs
var Hash = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hat-glasses.mjs
var HatGlasses = [
  ["path", { d: "M14 18a2 2 0 0 0-4 0" }],
  [
    "path",
    {
      d: "m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11"
    }
  ],
  ["path", { d: "M2 11h20" }],
  ["circle", { cx: "17", cy: "18", r: "3" }],
  ["circle", { cx: "7", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/haze.mjs
var Haze = [
  ["path", { d: "m5.2 6.2 1.4 1.4" }],
  ["path", { d: "M2 13h2" }],
  ["path", { d: "M20 13h2" }],
  ["path", { d: "m17.4 7.6 1.4-1.4" }],
  ["path", { d: "M22 17H2" }],
  ["path", { d: "M22 21H2" }],
  ["path", { d: "M16 13a4 4 0 0 0-8 0" }],
  ["path", { d: "M12 5V2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hd.mjs
var Hd = [
  ["path", { d: "M10 12H6" }],
  ["path", { d: "M10 15V9" }],
  [
    "path",
    {
      d: "M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z"
    }
  ],
  ["path", { d: "M6 15V9" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hdmi-port.mjs
var HdmiPort = [
  [
    "path",
    { d: "M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z" }
  ],
  ["path", { d: "M7.5 12h9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heading-1.mjs
var Heading1 = [
  ["path", { d: "M4 12h8" }],
  ["path", { d: "M4 18V6" }],
  ["path", { d: "M12 18V6" }],
  ["path", { d: "m17 12 3-2v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heading-2.mjs
var Heading2 = [
  ["path", { d: "M4 12h8" }],
  ["path", { d: "M4 18V6" }],
  ["path", { d: "M12 18V6" }],
  ["path", { d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heading-3.mjs
var Heading3 = [
  ["path", { d: "M4 12h8" }],
  ["path", { d: "M4 18V6" }],
  ["path", { d: "M12 18V6" }],
  ["path", { d: "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" }],
  ["path", { d: "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heading-4.mjs
var Heading4 = [
  ["path", { d: "M12 18V6" }],
  ["path", { d: "M17 10v3a1 1 0 0 0 1 1h3" }],
  ["path", { d: "M21 10v8" }],
  ["path", { d: "M4 12h8" }],
  ["path", { d: "M4 18V6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heading-5.mjs
var Heading5 = [
  ["path", { d: "M4 12h8" }],
  ["path", { d: "M4 18V6" }],
  ["path", { d: "M12 18V6" }],
  ["path", { d: "M17 13v-3h4" }],
  ["path", { d: "M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heading-6.mjs
var Heading6 = [
  ["path", { d: "M4 12h8" }],
  ["path", { d: "M4 18V6" }],
  ["path", { d: "M12 18V6" }],
  ["circle", { cx: "19", cy: "16", r: "2" }],
  ["path", { d: "M20 10c-2 2-3 3.5-3 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heading.mjs
var Heading = [
  ["path", { d: "M6 12h12" }],
  ["path", { d: "M6 20V4" }],
  ["path", { d: "M18 20V4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/headphone-off.mjs
var HeadphoneOff = [
  ["path", { d: "M21 14h-1.343" }],
  ["path", { d: "M9.128 3.47A9 9 0 0 1 21 12v3.343" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3" }],
  ["path", { d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/headphones.mjs
var Headphones = [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/headset.mjs
var Headset = [
  [
    "path",
    {
      d: "M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"
    }
  ],
  ["path", { d: "M21 16v2a4 4 0 0 1-4 4h-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heart-crack.mjs
var HeartCrack = [
  [
    "path",
    {
      d: "M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15"
    }
  ],
  [
    "path",
    {
      d: "M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heart-handshake.mjs
var HeartHandshake = [
  [
    "path",
    {
      d: "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heart-minus.mjs
var HeartMinus = [
  [
    "path",
    {
      d: "m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572"
    }
  ],
  ["path", { d: "M15 15h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heart-off.mjs
var HeartOff = [
  [
    "path",
    {
      d: "M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655"
    }
  ],
  [
    "path",
    {
      d: "m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761"
    }
  ],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heart-plus.mjs
var HeartPlus = [
  [
    "path",
    {
      d: "m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49"
    }
  ],
  ["path", { d: "M15 15h6" }],
  ["path", { d: "M18 12v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heart-pulse.mjs
var HeartPulse = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
    }
  ],
  ["path", { d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heart-x.mjs
var HeartX = [
  ["path", { d: "m15.5 12.5 5 5" }],
  ["path", { d: "m20.5 12.5-5 5" }],
  [
    "path",
    {
      d: "M21.955 8.774a5.5 5.5 0 0 0-9.546-2.95.6.6 0 0 1-.818 0A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.508 5.332a2 2 0 0 0 2.57.352"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heart.mjs
var Heart = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/heater.mjs
var Heater = [
  ["path", { d: "M11 8c2-3-2-3 0-6" }],
  ["path", { d: "M15.5 8c2-3-2-3 0-6" }],
  ["path", { d: "M6 10h.01" }],
  ["path", { d: "M6 14h.01" }],
  ["path", { d: "M10 16v-4" }],
  ["path", { d: "M14 16v-4" }],
  ["path", { d: "M18 16v-4" }],
  ["path", { d: "M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" }],
  ["path", { d: "M5 20v2" }],
  ["path", { d: "M19 20v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/helicopter.mjs
var Helicopter = [
  ["path", { d: "M11 17v4" }],
  ["path", { d: "M14 3v8a2 2 0 0 0 2 2h5.865" }],
  ["path", { d: "M17 17v4" }],
  ["path", { d: "M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z" }],
  ["path", { d: "M2 10v5" }],
  ["path", { d: "M6 3h16" }],
  ["path", { d: "M7 21h14" }],
  ["path", { d: "M8 13H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hexagon.mjs
var Hexagon = [
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/highlighter.mjs
var Highlighter = [
  ["path", { d: "m9 11-6 6v3h9l3-3" }],
  ["path", { d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/history.mjs
var History = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
  ["path", { d: "M3 3v5h5" }],
  ["path", { d: "M12 7v5l4 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hop-off.mjs
var HopOff = [
  ["path", { d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27" }],
  [
    "path",
    { d: "M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28" }
  ],
  ["path", { d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26" }],
  [
    "path",
    { d: "M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25" }
  ],
  ["path", { d: "M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75" }],
  [
    "path",
    {
      d: "M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24"
    }
  ],
  [
    "path",
    { d: "M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28" }
  ],
  ["path", { d: "M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hop.mjs
var Hop = [
  [
    "path",
    { d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18" }
  ],
  [
    "path",
    {
      d: "M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88"
    }
  ],
  [
    "path",
    { d: "M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36" }
  ],
  [
    "path",
    { d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87" }
  ],
  [
    "path",
    { d: "M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08" }
  ],
  [
    "path",
    { d: "M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57" }
  ],
  ["path", { d: "M4.93 4.93 3 3a.7.7 0 0 1 0-1" }],
  [
    "path",
    {
      d: "M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hospital.mjs
var Hospital = [
  ["path", { d: "M12 7v4" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3" }],
  ["path", { d: "M14 9h-4" }],
  ["path", { d: "M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hotel.mjs
var Hotel = [
  ["path", { d: "M10 22v-6.57" }],
  ["path", { d: "M12 11h.01" }],
  ["path", { d: "M12 7h.01" }],
  ["path", { d: "M14 15.43V22" }],
  ["path", { d: "M15 16a5 5 0 0 0-6 0" }],
  ["path", { d: "M16 11h.01" }],
  ["path", { d: "M16 7h.01" }],
  ["path", { d: "M8 11h.01" }],
  ["path", { d: "M8 7h.01" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/hourglass.mjs
var Hourglass = [
  ["path", { d: "M5 22h14" }],
  ["path", { d: "M5 2h14" }],
  ["path", { d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" }],
  ["path", { d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/house-heart.mjs
var HouseHeart = [
  [
    "path",
    {
      d: "M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"
    }
  ],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/house-plus.mjs
var HousePlus = [
  [
    "path",
    {
      d: "M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35"
    }
  ],
  ["path", { d: "M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8" }],
  ["path", { d: "M15 18h6" }],
  ["path", { d: "M18 15v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/house-plug.mjs
var HousePlug = [
  ["path", { d: "M10 12V8.964" }],
  ["path", { d: "M14 12V8.964" }],
  ["path", { d: "M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z" }],
  [
    "path",
    {
      d: "M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/house-wifi.mjs
var HouseWifi = [
  ["path", { d: "M9.5 13.866a4 4 0 0 1 5 .01" }],
  ["path", { d: "M12 17h.01" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    }
  ],
  ["path", { d: "M7 10.754a8 8 0 0 1 10 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/house.mjs
var House = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ice-cream-bowl.mjs
var IceCreamBowl = [
  [
    "path",
    { d: "M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0" }
  ],
  ["path", { d: "M12.14 11a3.5 3.5 0 1 1 6.71 0" }],
  ["path", { d: "M15.5 6.5a3.5 3.5 0 1 0-7 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ice-cream-cone.mjs
var IceCreamCone = [
  ["path", { d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" }],
  ["path", { d: "M17 7A5 5 0 0 0 7 7" }],
  ["path", { d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/id-card-lanyard.mjs
var IdCardLanyard = [
  ["path", { d: "M13.5 8h-3" }],
  ["path", { d: "m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3" }],
  ["path", { d: "M16.899 22A5 5 0 0 0 7.1 22" }],
  ["path", { d: "m9 2 3 6" }],
  ["circle", { cx: "12", cy: "15", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/id-card.mjs
var IdCard = [
  ["path", { d: "M16 10h2" }],
  ["path", { d: "M16 14h2" }],
  ["path", { d: "M6.17 15a3 3 0 0 1 5.66 0" }],
  ["circle", { cx: "9", cy: "11", r: "2" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/image-down.mjs
var ImageDown = [
  [
    "path",
    {
      d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"
    }
  ],
  ["path", { d: "m14 19 3 3v-5.5" }],
  ["path", { d: "m17 22 3-3" }],
  ["circle", { cx: "9", cy: "9", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/image-minus.mjs
var ImageMinus = [
  ["path", { d: "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" }],
  ["line", { x1: "16", x2: "22", y1: "5", y2: "5" }],
  ["circle", { cx: "9", cy: "9", r: "2" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/image-off.mjs
var ImageOff = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
  ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83" }],
  ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "15" }],
  ["path", { d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" }],
  ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/image-play.mjs
var ImagePlay = [
  [
    "path",
    {
      d: "M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"
    }
  ],
  ["path", { d: "M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }],
  ["path", { d: "m6 21 5-5" }],
  ["circle", { cx: "9", cy: "9", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/image-plus.mjs
var ImagePlus = [
  ["path", { d: "M16 5h6" }],
  ["path", { d: "M19 2v6" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }],
  ["circle", { cx: "9", cy: "9", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/image-up.mjs
var ImageUp = [
  [
    "path",
    {
      d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"
    }
  ],
  ["path", { d: "m14 19.5 3-3 3 3" }],
  ["path", { d: "M17 22v-5.5" }],
  ["circle", { cx: "9", cy: "9", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/image-upscale.mjs
var ImageUpscale = [
  ["path", { d: "M16 3h5v5" }],
  ["path", { d: "M17 21h2a2 2 0 0 0 2-2" }],
  ["path", { d: "M21 12v3" }],
  ["path", { d: "m21 3-5 5" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2" }],
  ["path", { d: "m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19" }],
  ["path", { d: "M9 3h3" }],
  ["rect", { x: "3", y: "11", width: "10", height: "10", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/image.mjs
var Image = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["circle", { cx: "9", cy: "9", r: "2" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/images.mjs
var Images = [
  ["path", { d: "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" }],
  ["path", { d: "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" }],
  ["circle", { cx: "13", cy: "7", r: "1", fill: "currentColor" }],
  ["rect", { x: "8", y: "2", width: "14", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/import.mjs
var Import = [
  ["path", { d: "M12 3v12" }],
  ["path", { d: "m8 11 4 4 4-4" }],
  ["path", { d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/inbox.mjs
var Inbox = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/infinity.mjs
var Infinity = [
  ["path", { d: "M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/indian-rupee.mjs
var IndianRupee = [
  ["path", { d: "M6 3h12" }],
  ["path", { d: "M6 8h12" }],
  ["path", { d: "m6 13 8.5 8" }],
  ["path", { d: "M6 13h3" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/info.mjs
var Info = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M12 16v-4" }],
  ["path", { d: "M12 8h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/inspection-panel.mjs
var InspectionPanel = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M7 7h.01" }],
  ["path", { d: "M17 7h.01" }],
  ["path", { d: "M7 17h.01" }],
  ["path", { d: "M17 17h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/italic.mjs
var Italic = [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/iteration-ccw.mjs
var IterationCcw = [
  ["path", { d: "m16 14 4 4-4 4" }],
  ["path", { d: "M20 10a8 8 0 1 0-8 8h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/iteration-cw.mjs
var IterationCw = [
  ["path", { d: "M4 10a8 8 0 1 1 8 8H4" }],
  ["path", { d: "m8 22-4-4 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/japanese-yen.mjs
var JapaneseYen = [
  ["path", { d: "M12 9.5V21m0-11.5L6 3m6 6.5L18 3" }],
  ["path", { d: "M6 15h12" }],
  ["path", { d: "M6 11h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/joystick.mjs
var Joystick = [
  ["path", { d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z" }],
  ["path", { d: "M6 15v-2" }],
  ["path", { d: "M12 15V9" }],
  ["circle", { cx: "12", cy: "6", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/kanban.mjs
var Kanban = [
  ["path", { d: "M5 3v14" }],
  ["path", { d: "M12 3v8" }],
  ["path", { d: "M19 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/kayak.mjs
var Kayak = [
  ["path", { d: "M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z" }],
  [
    "path",
    {
      d: "M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61"
    }
  ],
  ["path", { d: "m6.707 6.707 10.586 10.586" }],
  ["path", { d: "M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/key-round.mjs
var KeyRound = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/key-square.mjs
var KeySquare = [
  [
    "path",
    {
      d: "M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z"
    }
  ],
  ["path", { d: "m14 7 3 3" }],
  [
    "path",
    {
      d: "m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/key.mjs
var Key = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" }],
  ["path", { d: "m21 2-9.6 9.6" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/keyboard-music.mjs
var KeyboardMusic = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
  ["path", { d: "M6 8h4" }],
  ["path", { d: "M14 8h.01" }],
  ["path", { d: "M18 8h.01" }],
  ["path", { d: "M2 12h20" }],
  ["path", { d: "M6 12v4" }],
  ["path", { d: "M10 12v4" }],
  ["path", { d: "M14 12v4" }],
  ["path", { d: "M18 12v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/keyboard-off.mjs
var KeyboardOff = [
  ["path", { d: "M 20 4 A2 2 0 0 1 22 6" }],
  ["path", { d: "M 22 6 L 22 16.41" }],
  ["path", { d: "M 7 16 L 16 16" }],
  ["path", { d: "M 9.69 4 L 20 4" }],
  ["path", { d: "M14 8h.01" }],
  ["path", { d: "M18 8h.01" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" }],
  ["path", { d: "M6 8h.01" }],
  ["path", { d: "M8 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/keyboard.mjs
var Keyboard = [
  ["path", { d: "M10 8h.01" }],
  ["path", { d: "M12 12h.01" }],
  ["path", { d: "M14 8h.01" }],
  ["path", { d: "M16 12h.01" }],
  ["path", { d: "M18 8h.01" }],
  ["path", { d: "M6 8h.01" }],
  ["path", { d: "M7 16h10" }],
  ["path", { d: "M8 12h.01" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lamp-ceiling.mjs
var LampCeiling = [
  ["path", { d: "M12 2v5" }],
  ["path", { d: "M14.829 15.998a3 3 0 1 1-5.658 0" }],
  [
    "path",
    {
      d: "M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lamp-desk.mjs
var LampDesk = [
  [
    "path",
    {
      d: "M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z"
    }
  ],
  ["path", { d: "m14.207 4.793-3.414 3.414" }],
  ["path", { d: "M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" }],
  ["path", { d: "m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lamp-floor.mjs
var LampFloor = [
  ["path", { d: "M12 10v12" }],
  [
    "path",
    {
      d: "M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z"
    }
  ],
  ["path", { d: "M9 22h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lamp-wall-down.mjs
var LampWallDown = [
  [
    "path",
    {
      d: "M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z"
    }
  ],
  ["path", { d: "M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" }],
  ["path", { d: "M8 6h4a2 2 0 0 1 2 2v5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lamp-wall-up.mjs
var LampWallUp = [
  [
    "path",
    {
      d: "M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z"
    }
  ],
  ["path", { d: "M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" }],
  ["path", { d: "M8 18h4a2 2 0 0 0 2-2v-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/land-plot.mjs
var LandPlot = [
  ["path", { d: "m12 8 6-3-6-3v10" }],
  [
    "path",
    {
      d: "m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"
    }
  ],
  ["path", { d: "m6.49 12.85 11.02 6.3" }],
  ["path", { d: "M17.51 12.85 6.5 19.15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lamp.mjs
var Lamp = [
  ["path", { d: "M12 12v6" }],
  [
    "path",
    {
      d: "M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"
    }
  ],
  ["path", { d: "M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/landmark.mjs
var Landmark = [
  ["path", { d: "M10 18v-7" }],
  [
    "path",
    { d: "M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" }
  ],
  ["path", { d: "M14 18v-7" }],
  ["path", { d: "M18 18v-7" }],
  ["path", { d: "M3 22h18" }],
  ["path", { d: "M6 18v-7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/languages.mjs
var Languages = [
  ["path", { d: "m5 8 6 6" }],
  ["path", { d: "m4 14 6-6 2-3" }],
  ["path", { d: "M2 5h12" }],
  ["path", { d: "M7 2h1" }],
  ["path", { d: "m22 22-5-10-5 10" }],
  ["path", { d: "M14 18h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/laptop-minimal-check.mjs
var LaptopMinimalCheck = [
  ["path", { d: "M2 20h20" }],
  ["path", { d: "m9 10 2 2 4-4" }],
  ["rect", { x: "3", y: "4", width: "18", height: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/laptop-minimal.mjs
var LaptopMinimal = [
  ["rect", { width: "18", height: "12", x: "3", y: "4", rx: "2", ry: "2" }],
  ["line", { x1: "2", x2: "22", y1: "20", y2: "20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/laptop.mjs
var Laptop = [
  [
    "path",
    {
      d: "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"
    }
  ],
  ["path", { d: "M20.054 15.987H3.946" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lasso-select.mjs
var LassoSelect = [
  ["path", { d: "M7 22a5 5 0 0 1-2-4" }],
  ["path", { d: "M7 16.93c.96.43 1.96.74 2.99.91" }],
  [
    "path",
    { d: "M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2" }
  ],
  ["path", { d: "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" }],
  [
    "path",
    {
      d: "M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/laugh.mjs
var Laugh = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lasso.mjs
var Lasso = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994" }],
  ["circle", { cx: "5", cy: "16", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layers-2.mjs
var Layers2 = [
  [
    "path",
    {
      d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"
    }
  ],
  [
    "path",
    {
      d: "m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layers-minus.mjs
var LayersMinus = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.832z"
    }
  ],
  ["path", { d: "M16 17h6" }],
  ["path", { d: "M2.003 11.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18" }],
  [
    "path",
    { d: "M2.003 16.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l2.11-.96" }
  ],
  ["path", { d: "M22.018 12.004a1 1 0 0 1-.598.916l-.177.08" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layers-plus.mjs
var LayersPlus = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z"
    }
  ],
  ["path", { d: "M16 17h6" }],
  ["path", { d: "M19 14v6" }],
  ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178" }],
  ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layers.mjs
var Layers = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
    }
  ],
  ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" }],
  ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layout-dashboard.mjs
var LayoutDashboard = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layout-grid.mjs
var LayoutGrid = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layout-list.mjs
var LayoutList = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }],
  ["path", { d: "M14 4h7" }],
  ["path", { d: "M14 9h7" }],
  ["path", { d: "M14 15h7" }],
  ["path", { d: "M14 20h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layout-panel-left.mjs
var LayoutPanelLeft = [
  ["rect", { width: "7", height: "18", x: "3", y: "3", rx: "1" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layout-panel-top.mjs
var LayoutPanelTop = [
  ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/layout-template.mjs
var LayoutTemplate = [
  ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1" }],
  ["rect", { width: "9", height: "7", x: "3", y: "14", rx: "1" }],
  ["rect", { width: "5", height: "7", x: "16", y: "14", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/leaf.mjs
var Leaf = [
  [
    "path",
    { d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/leafy-green.mjs
var LeafyGreen = [
  [
    "path",
    {
      d: "M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22"
    }
  ],
  ["path", { d: "M2 22 17 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lectern.mjs
var Lectern = [
  [
    "path",
    {
      d: "M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3"
    }
  ],
  ["path", { d: "M18 6V3a1 1 0 0 0-1-1h-3" }],
  ["rect", { width: "8", height: "12", x: "8", y: "10", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lens-concave.mjs
var LensConcave = [
  [
    "path",
    {
      d: "M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lens-convex.mjs
var LensConvex = [
  [
    "path",
    {
      d: "M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/library-big.mjs
var LibraryBig = [
  ["rect", { width: "8", height: "18", x: "3", y: "3", rx: "1" }],
  ["path", { d: "M7 3v18" }],
  [
    "path",
    {
      d: "M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/library.mjs
var Library = [
  ["path", { d: "m16 6 4 14" }],
  ["path", { d: "M12 6v14" }],
  ["path", { d: "M8 8v12" }],
  ["path", { d: "M4 4v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/life-buoy.mjs
var LifeBuoy = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "m4.93 4.93 4.24 4.24" }],
  ["path", { d: "m14.83 9.17 4.24-4.24" }],
  ["path", { d: "m14.83 14.83 4.24 4.24" }],
  ["path", { d: "m9.17 14.83-4.24 4.24" }],
  ["circle", { cx: "12", cy: "12", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ligature.mjs
var Ligature = [
  ["path", { d: "M14 12h2v8" }],
  ["path", { d: "M14 20h4" }],
  ["path", { d: "M6 12h4" }],
  ["path", { d: "M6 20h4" }],
  ["path", { d: "M8 20V8a4 4 0 0 1 7.464-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lightbulb-off.mjs
var LightbulbOff = [
  ["path", { d: "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" }],
  ["path", { d: "M9 18h6" }],
  ["path", { d: "M10 22h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lightbulb.mjs
var Lightbulb = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
    }
  ],
  ["path", { d: "M9 18h6" }],
  ["path", { d: "M10 22h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/line-dot-right-horizontal.mjs
var LineDotRightHorizontal = [
  ["path", { d: "M 3 12 L 15 12" }],
  ["circle", { cx: "18", cy: "12", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/line-squiggle.mjs
var LineSquiggle = [
  [
    "path",
    { d: "M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/line-style.mjs
var LineStyle = [
  ["path", { d: "M11 5h2" }],
  ["path", { d: "M15 12h6" }],
  ["path", { d: "M19 5h2" }],
  ["path", { d: "M3 12h6" }],
  ["path", { d: "M3 19h18" }],
  ["path", { d: "M3 5h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/link-2-off.mjs
var Link2Off = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7" }],
  ["path", { d: "M15 7h2a5 5 0 0 1 4 8" }],
  ["line", { x1: "8", x2: "12", y1: "12", y2: "12" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/link-2.mjs
var Link2 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/link.mjs
var Link = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-check.mjs
var ListCheck = [
  ["path", { d: "M16 5H3" }],
  ["path", { d: "M16 12H3" }],
  ["path", { d: "M11 19H3" }],
  ["path", { d: "m15 18 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-checks.mjs
var ListChecks = [
  ["path", { d: "M13 5h8" }],
  ["path", { d: "M13 12h8" }],
  ["path", { d: "M13 19h8" }],
  ["path", { d: "m3 17 2 2 4-4" }],
  ["path", { d: "m3 7 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-chevrons-down-up.mjs
var ListChevronsDownUp = [
  ["path", { d: "M3 5h8" }],
  ["path", { d: "M3 12h8" }],
  ["path", { d: "M3 19h8" }],
  ["path", { d: "m15 5 3 3 3-3" }],
  ["path", { d: "m15 19 3-3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-chevrons-up-down.mjs
var ListChevronsUpDown = [
  ["path", { d: "M3 5h8" }],
  ["path", { d: "M3 12h8" }],
  ["path", { d: "M3 19h8" }],
  ["path", { d: "m15 8 3-3 3 3" }],
  ["path", { d: "m15 16 3 3 3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-collapse.mjs
var ListCollapse = [
  ["path", { d: "M10 5h11" }],
  ["path", { d: "M10 12h11" }],
  ["path", { d: "M10 19h11" }],
  ["path", { d: "m3 10 3-3-3-3" }],
  ["path", { d: "m3 20 3-3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-end.mjs
var ListEnd = [
  ["path", { d: "M16 5H3" }],
  ["path", { d: "M16 12H3" }],
  ["path", { d: "M9 19H3" }],
  ["path", { d: "m16 16-3 3 3 3" }],
  ["path", { d: "M21 5v12a2 2 0 0 1-2 2h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-filter-plus.mjs
var ListFilterPlus = [
  ["path", { d: "M12 5H2" }],
  ["path", { d: "M6 12h12" }],
  ["path", { d: "M9 19h6" }],
  ["path", { d: "M16 5h6" }],
  ["path", { d: "M19 8V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-filter.mjs
var ListFilter = [
  ["path", { d: "M2 5h20" }],
  ["path", { d: "M6 12h12" }],
  ["path", { d: "M9 19h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-indent-decrease.mjs
var ListIndentDecrease = [
  ["path", { d: "M21 5H11" }],
  ["path", { d: "M21 12H11" }],
  ["path", { d: "M21 19H11" }],
  ["path", { d: "m7 8-4 4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-indent-increase.mjs
var ListIndentIncrease = [
  ["path", { d: "M21 5H11" }],
  ["path", { d: "M21 12H11" }],
  ["path", { d: "M21 19H11" }],
  ["path", { d: "m3 8 4 4-4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-minus.mjs
var ListMinus = [
  ["path", { d: "M16 5H3" }],
  ["path", { d: "M11 12H3" }],
  ["path", { d: "M16 19H3" }],
  ["path", { d: "M21 12h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-music.mjs
var ListMusic = [
  ["path", { d: "M16 5H3" }],
  ["path", { d: "M11 12H3" }],
  ["path", { d: "M11 19H3" }],
  ["path", { d: "M21 16V5" }],
  ["circle", { cx: "18", cy: "16", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-ordered.mjs
var ListOrdered = [
  ["path", { d: "M11 5h10" }],
  ["path", { d: "M11 12h10" }],
  ["path", { d: "M11 19h10" }],
  ["path", { d: "M4 4h1v5" }],
  ["path", { d: "M4 9h2" }],
  ["path", { d: "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-plus.mjs
var ListPlus = [
  ["path", { d: "M16 5H3" }],
  ["path", { d: "M11 12H3" }],
  ["path", { d: "M16 19H3" }],
  ["path", { d: "M18 9v6" }],
  ["path", { d: "M21 12h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-restart.mjs
var ListRestart = [
  ["path", { d: "M21 5H3" }],
  ["path", { d: "M7 12H3" }],
  ["path", { d: "M7 19H3" }],
  ["path", { d: "M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" }],
  ["path", { d: "M11 10v4h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-sort-ascending.mjs
var ListSortAscending = [
  ["path", { d: "M3 19h18" }],
  ["path", { d: "M15 12H3" }],
  ["path", { d: "M9 5H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-start.mjs
var ListStart = [
  ["path", { d: "M3 5h6" }],
  ["path", { d: "M3 12h13" }],
  ["path", { d: "M3 19h13" }],
  ["path", { d: "m16 8-3-3 3-3" }],
  ["path", { d: "M21 19V7a2 2 0 0 0-2-2h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-sort-descending.mjs
var ListSortDescending = [
  ["path", { d: "M15 12H3" }],
  ["path", { d: "M3 5h18" }],
  ["path", { d: "M9 19H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-todo.mjs
var ListTodo = [
  ["path", { d: "M13 5h8" }],
  ["path", { d: "M13 12h8" }],
  ["path", { d: "M13 19h8" }],
  ["path", { d: "m3 17 2 2 4-4" }],
  ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-tree.mjs
var ListTree = [
  ["path", { d: "M8 5h13" }],
  ["path", { d: "M13 12h8" }],
  ["path", { d: "M13 19h8" }],
  ["path", { d: "M3 10a2 2 0 0 0 2 2h3" }],
  ["path", { d: "M3 5v12a2 2 0 0 0 2 2h3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-video.mjs
var ListVideo = [
  ["path", { d: "M21 5H3" }],
  ["path", { d: "M10 12H3" }],
  ["path", { d: "M10 19H3" }],
  [
    "path",
    {
      d: "M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list-x.mjs
var ListX = [
  ["path", { d: "M16 5H3" }],
  ["path", { d: "M11 12H3" }],
  ["path", { d: "M16 19H3" }],
  ["path", { d: "m15.5 9.5 5 5" }],
  ["path", { d: "m20.5 9.5-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/list.mjs
var List = [
  ["path", { d: "M3 5h.01" }],
  ["path", { d: "M3 12h.01" }],
  ["path", { d: "M3 19h.01" }],
  ["path", { d: "M8 5h13" }],
  ["path", { d: "M8 12h13" }],
  ["path", { d: "M8 19h13" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/loader-circle.mjs
var LoaderCircle = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/loader-pinwheel.mjs
var LoaderPinwheel = [
  ["path", { d: "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" }],
  ["path", { d: "M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" }],
  ["path", { d: "M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" }],
  ["circle", { cx: "12", cy: "12", r: "10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/loader.mjs
var Loader = [
  ["path", { d: "M12 2v4" }],
  ["path", { d: "m16.2 7.8 2.9-2.9" }],
  ["path", { d: "M18 12h4" }],
  ["path", { d: "m16.2 16.2 2.9 2.9" }],
  ["path", { d: "M12 18v4" }],
  ["path", { d: "m4.9 19.1 2.9-2.9" }],
  ["path", { d: "M2 12h4" }],
  ["path", { d: "m4.9 4.9 2.9 2.9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/locate-fixed.mjs
var LocateFixed = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }],
  ["circle", { cx: "12", cy: "12", r: "7" }],
  ["circle", { cx: "12", cy: "12", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/locate-off.mjs
var LocateOff = [
  ["path", { d: "M12 19v3" }],
  ["path", { d: "M12 2v3" }],
  ["path", { d: "M18.89 13.24a7 7 0 0 0-8.13-8.13" }],
  ["path", { d: "M19 12h3" }],
  ["path", { d: "M2 12h3" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M7.05 7.05a7 7 0 0 0 9.9 9.9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/locate.mjs
var Locate = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }],
  ["circle", { cx: "12", cy: "12", r: "7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lock-keyhole-open.mjs
var LockKeyholeOpen = [
  ["circle", { cx: "12", cy: "16", r: "1" }],
  ["rect", { width: "18", height: "12", x: "3", y: "10", rx: "2" }],
  ["path", { d: "M7 10V7a5 5 0 0 1 9.33-2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lock-keyhole.mjs
var LockKeyhole = [
  ["circle", { cx: "12", cy: "16", r: "1" }],
  ["rect", { x: "3", y: "10", width: "18", height: "12", rx: "2" }],
  ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lock-open.mjs
var LockOpen = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lock.mjs
var Lock = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/log-in.mjs
var LogIn = [
  ["path", { d: "m10 17 5-5-5-5" }],
  ["path", { d: "M15 12H3" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/log-out.mjs
var LogOut = [
  ["path", { d: "m16 17 5-5-5-5" }],
  ["path", { d: "M21 12H9" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/logs.mjs
var Logs = [
  ["path", { d: "M3 5h1" }],
  ["path", { d: "M3 12h1" }],
  ["path", { d: "M3 19h1" }],
  ["path", { d: "M8 5h1" }],
  ["path", { d: "M8 12h1" }],
  ["path", { d: "M8 19h1" }],
  ["path", { d: "M13 5h8" }],
  ["path", { d: "M13 12h8" }],
  ["path", { d: "M13 19h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/lollipop.mjs
var Lollipop = [
  ["circle", { cx: "11", cy: "11", r: "8" }],
  ["path", { d: "m21 21-4.3-4.3" }],
  ["path", { d: "M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/luggage.mjs
var Luggage = [
  ["path", { d: "M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" }],
  ["path", { d: "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" }],
  ["path", { d: "M10 20h4" }],
  ["circle", { cx: "16", cy: "20", r: "2" }],
  ["circle", { cx: "8", cy: "20", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/magnet.mjs
var Magnet = [
  ["path", { d: "m12 15 4 4" }],
  [
    "path",
    {
      d: "M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z"
    }
  ],
  ["path", { d: "m5 8 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail-check.mjs
var MailCheck = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
  ["path", { d: "m16 19 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail-minus.mjs
var MailMinus = [
  ["path", { d: "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
  ["path", { d: "M16 19h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail-open.mjs
var MailOpen = [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail-plus.mjs
var MailPlus = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
  ["path", { d: "M19 16v6" }],
  ["path", { d: "M16 19h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail-search.mjs
var MailSearch = [
  ["path", { d: "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
  ["path", { d: "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" }],
  ["circle", { cx: "18", cy: "18", r: "3" }],
  ["path", { d: "m22 22-1.5-1.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail-question-mark.mjs
var MailQuestionMark = [
  ["path", { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
  ["path", { d: "M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" }],
  ["path", { d: "M20 22v.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail-x.mjs
var MailX = [
  ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
  ["path", { d: "m17 17 4 4" }],
  ["path", { d: "m21 17-4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail-warning.mjs
var MailWarning = [
  ["path", { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
  ["path", { d: "M20 14v4" }],
  ["path", { d: "M20 22v.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mail.mjs
var Mail = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mailbox.mjs
var Mailbox = [
  ["path", { d: "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" }],
  ["polyline", { points: "15,9 18,9 18,11" }],
  ["path", { d: "M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2" }],
  ["line", { x1: "6", x2: "7", y1: "10", y2: "10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mails.mjs
var Mails = [
  ["path", { d: "M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732" }],
  ["path", { d: "m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5" }],
  ["rect", { x: "7", y: "3", width: "15", height: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-minus.mjs
var MapMinus = [
  [
    "path",
    {
      d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14"
    }
  ],
  ["path", { d: "M15 5.764V14" }],
  ["path", { d: "M21 18h-6" }],
  ["path", { d: "M9 3.236v15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-check-inside.mjs
var MapPinCheckInside = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
    }
  ],
  ["path", { d: "m9 10 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-check.mjs
var MapPinCheck = [
  [
    "path",
    {
      d: "M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3" }],
  ["path", { d: "m16 18 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-house.mjs
var MapPinHouse = [
  [
    "path",
    {
      d: "M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"
    }
  ],
  ["path", { d: "M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" }],
  ["path", { d: "M18 22v-3" }],
  ["circle", { cx: "10", cy: "10", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-minus-inside.mjs
var MapPinMinusInside = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
    }
  ],
  ["path", { d: "M9 10h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-minus.mjs
var MapPinMinus = [
  [
    "path",
    {
      d: "M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3" }],
  ["path", { d: "M16 18h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-off.mjs
var MapPinOff = [
  ["path", { d: "M12.75 7.09a3 3 0 0 1 2.16 2.16" }],
  [
    "path",
    {
      d: "M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568"
    }
  ],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533" }],
  ["path", { d: "M9.13 9.13a3 3 0 0 0 3.74 3.74" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-pen.mjs
var MapPinPen = [
  ["path", { d: "M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468" }],
  [
    "path",
    {
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    }
  ],
  ["circle", { cx: "10", cy: "10", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-plus-inside.mjs
var MapPinPlusInside = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
    }
  ],
  ["path", { d: "M12 7v6" }],
  ["path", { d: "M9 10h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-plus.mjs
var MapPinPlus = [
  [
    "path",
    {
      d: "M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3" }],
  ["path", { d: "M16 18h6" }],
  ["path", { d: "M19 15v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-search.mjs
var MapPinSearch = [
  [
    "path",
    {
      d: "M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262"
    }
  ],
  ["path", { d: "m22 22-1.88-1.88" }],
  ["circle", { cx: "12", cy: "10", r: "3" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-x-inside.mjs
var MapPinXInside = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
    }
  ],
  ["path", { d: "m14.5 7.5-5 5" }],
  ["path", { d: "m9.5 7.5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin-x.mjs
var MapPinX = [
  [
    "path",
    {
      d: "M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3" }],
  ["path", { d: "m21.5 15.5-5 5" }],
  ["path", { d: "m21.5 20.5-5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pin.mjs
var MapPin = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-pinned.mjs
var MapPinned = [
  [
    "path",
    {
      d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2" }],
  [
    "path",
    {
      d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map-plus.mjs
var MapPlus = [
  [
    "path",
    {
      d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12"
    }
  ],
  ["path", { d: "M15 5.764V12" }],
  ["path", { d: "M18 15v6" }],
  ["path", { d: "M21 18h-6" }],
  ["path", { d: "M9 3.236v15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/map.mjs
var Map2 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"
    }
  ],
  ["path", { d: "M15 5.764v15" }],
  ["path", { d: "M9 3.236v15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mars-stroke.mjs
var MarsStroke = [
  ["path", { d: "m14 6 4 4" }],
  ["path", { d: "M17 3h4v4" }],
  ["path", { d: "m21 3-7.75 7.75" }],
  ["circle", { cx: "9", cy: "15", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mars.mjs
var Mars = [
  ["path", { d: "M16 3h5v5" }],
  ["path", { d: "m21 3-6.75 6.75" }],
  ["circle", { cx: "10", cy: "14", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/martini.mjs
var Martini = [
  ["path", { d: "M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z" }],
  ["path", { d: "M12 12v10" }],
  ["path", { d: "M7 22h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/maximize-2.mjs
var Maximize2 = [
  ["path", { d: "M15 3h6v6" }],
  ["path", { d: "m21 3-7 7" }],
  ["path", { d: "m3 21 7-7" }],
  ["path", { d: "M9 21H3v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/maximize.mjs
var Maximize = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/medal.mjs
var Medal = [
  [
    "path",
    {
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2" }],
  ["path", { d: "m13 12 5.88-9.8" }],
  ["path", { d: "M8 7h8" }],
  ["circle", { cx: "12", cy: "17", r: "5" }],
  ["path", { d: "M12 18v-2h-.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/megaphone.mjs
var Megaphone = [
  [
    "path",
    {
      d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
    }
  ],
  ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" }],
  ["path", { d: "M8 6v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/megaphone-off.mjs
var MegaphoneOff = [
  ["path", { d: "M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344" }],
  ["path", { d: "M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" }],
  ["path", { d: "M8 8v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/meh.mjs
var Meh = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["line", { x1: "8", x2: "16", y1: "15", y2: "15" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/memory-stick.mjs
var MemoryStick = [
  ["path", { d: "M12 12v-2" }],
  ["path", { d: "M12 18v-2" }],
  ["path", { d: "M16 12v-2" }],
  ["path", { d: "M16 18v-2" }],
  ["path", { d: "M2 11h1.5" }],
  ["path", { d: "M20 18v-2" }],
  ["path", { d: "M20.5 11H22" }],
  ["path", { d: "M4 18v-2" }],
  ["path", { d: "M8 12v-2" }],
  ["path", { d: "M8 18v-2" }],
  ["rect", { x: "2", y: "6", width: "20", height: "10", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/menu.mjs
var Menu = [
  ["path", { d: "M4 5h16" }],
  ["path", { d: "M4 12h16" }],
  ["path", { d: "M4 19h16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/merge.mjs
var Merge = [
  ["path", { d: "m8 6 4-4 4 4" }],
  ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" }],
  ["path", { d: "m20 22-5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-check.mjs
var MessageCircleCheck = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-code.mjs
var MessageCircleCode = [
  ["path", { d: "m10 9-3 3 3 3" }],
  ["path", { d: "m14 15 3-3-3-3" }],
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-dashed.mjs
var MessageCircleDashed = [
  ["path", { d: "M10.1 2.182a10 10 0 0 1 3.8 0" }],
  ["path", { d: "M13.9 21.818a10 10 0 0 1-3.8 0" }],
  ["path", { d: "M17.609 3.72a10 10 0 0 1 2.69 2.7" }],
  ["path", { d: "M2.182 13.9a10 10 0 0 1 0-3.8" }],
  ["path", { d: "M20.28 17.61a10 10 0 0 1-2.7 2.69" }],
  ["path", { d: "M21.818 10.1a10 10 0 0 1 0 3.8" }],
  ["path", { d: "M3.721 6.391a10 10 0 0 1 2.7-2.69" }],
  ["path", { d: "m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-heart.mjs
var MessageCircleHeart = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ],
  [
    "path",
    {
      d: "M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-more.mjs
var MessageCircleMore = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ],
  ["path", { d: "M8 12h.01" }],
  ["path", { d: "M12 12h.01" }],
  ["path", { d: "M16 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-off.mjs
var MessageCircleOff = [
  ["path", { d: "m2 2 20 20" }],
  [
    "path",
    {
      d: "M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989"
    }
  ],
  ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-plus.mjs
var MessageCirclePlus = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ],
  ["path", { d: "M8 12h8" }],
  ["path", { d: "M12 8v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-question-mark.mjs
var MessageCircleQuestionMark = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
  ["path", { d: "M12 17h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-reply.mjs
var MessageCircleReply = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ],
  ["path", { d: "m10 15-3-3 3-3" }],
  ["path", { d: "M7 12h8a2 2 0 0 1 2 2v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-x.mjs
var MessageCircleX = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ],
  ["path", { d: "m15 9-6 6" }],
  ["path", { d: "m9 9 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle-warning.mjs
var MessageCircleWarning = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ],
  ["path", { d: "M12 8v4" }],
  ["path", { d: "M12 16h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-circle.mjs
var MessageCircle = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-check.mjs
var MessageSquareCheck = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "m9 11 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-code.mjs
var MessageSquareCode = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "m10 8-3 3 3 3" }],
  ["path", { d: "m14 14 3-3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-dashed.mjs
var MessageSquareDashed = [
  ["path", { d: "M14 3h2" }],
  ["path", { d: "M16 19h-2" }],
  ["path", { d: "M2 12v-2" }],
  ["path", { d: "M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149" }],
  ["path", { d: "M20 19a2 2 0 0 0 2-2v-1" }],
  ["path", { d: "M22 10v2" }],
  ["path", { d: "M22 6V5a2 2 0 0 0-2-2" }],
  ["path", { d: "M4 3a2 2 0 0 0-2 2v1" }],
  ["path", { d: "M8 19h2" }],
  ["path", { d: "M8 3h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-diff.mjs
var MessageSquareDiff = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "M10 15h4" }],
  ["path", { d: "M10 9h4" }],
  ["path", { d: "M12 7v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-dot.mjs
var MessageSquareDot = [
  [
    "path",
    {
      d: "M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7"
    }
  ],
  ["circle", { cx: "19", cy: "6", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-heart.mjs
var MessageSquareHeart = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  [
    "path",
    {
      d: "M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-lock.mjs
var MessageSquareLock = [
  [
    "path",
    {
      d: "M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10"
    }
  ],
  ["path", { d: "M20 15v-2a2 2 0 0 0-4 0v2" }],
  ["rect", { x: "14", y: "15", width: "8", height: "5", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-more.mjs
var MessageSquareMore = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "M12 11h.01" }],
  ["path", { d: "M16 11h.01" }],
  ["path", { d: "M8 11h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-off.mjs
var MessageSquareOff = [
  [
    "path",
    {
      d: "M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826"
    }
  ],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M8.656 3H20a2 2 0 0 1 2 2v11.344" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-plus.mjs
var MessageSquarePlus = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "M12 8v6" }],
  ["path", { d: "M9 11h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-quote.mjs
var MessageSquareQuote = [
  ["path", { d: "M14 14a2 2 0 0 0 2-2V8h-2" }],
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "M8 14a2 2 0 0 0 2-2V8H8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-reply.mjs
var MessageSquareReply = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "m10 8-3 3 3 3" }],
  ["path", { d: "M17 14v-1a2 2 0 0 0-2-2H7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-share.mjs
var MessageSquareShare = [
  [
    "path",
    {
      d: "M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4"
    }
  ],
  ["path", { d: "M16 3h6v6" }],
  ["path", { d: "m16 9 6-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-text.mjs
var MessageSquareText = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "M7 11h10" }],
  ["path", { d: "M7 15h6" }],
  ["path", { d: "M7 7h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-warning.mjs
var MessageSquareWarning = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "M12 15h.01" }],
  ["path", { d: "M12 7v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square-x.mjs
var MessageSquareX = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ],
  ["path", { d: "m14.5 8.5-5 5" }],
  ["path", { d: "m9.5 8.5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/message-square.mjs
var MessageSquare = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/messages-square.mjs
var MessagesSquare = [
  [
    "path",
    {
      d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
    }
  ],
  [
    "path",
    {
      d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/metronome.mjs
var Metronome = [
  ["path", { d: "M12 11.4V9.1" }],
  ["path", { d: "m12 17 6.59-6.59" }],
  [
    "path",
    {
      d: "m15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2"
    }
  ],
  ["circle", { cx: "20", cy: "9", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mic-off.mjs
var MicOff = [
  ["path", { d: "M12 19v3" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }],
  ["path", { d: "M16.95 16.95A7 7 0 0 1 5 12v-2" }],
  ["path", { d: "M18.89 13.23A7 7 0 0 0 19 12v-2" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mic-vocal.mjs
var MicVocal = [
  ["path", { d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" }],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mic.mjs
var Mic = [
  ["path", { d: "M12 19v3" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }],
  ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/microscope.mjs
var Microscope = [
  ["path", { d: "M6 18h8" }],
  ["path", { d: "M3 22h18" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1" }],
  ["path", { d: "M9 14h2" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/microwave.mjs
var Microwave = [
  ["rect", { width: "20", height: "15", x: "2", y: "4", rx: "2" }],
  ["rect", { width: "8", height: "7", x: "6", y: "8", rx: "1" }],
  ["path", { d: "M18 8v7" }],
  ["path", { d: "M6 19v2" }],
  ["path", { d: "M18 19v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/microchip.mjs
var Microchip = [
  ["path", { d: "M10 12h4" }],
  ["path", { d: "M10 17h4" }],
  ["path", { d: "M10 7h4" }],
  ["path", { d: "M18 12h2" }],
  ["path", { d: "M18 18h2" }],
  ["path", { d: "M18 6h2" }],
  ["path", { d: "M4 12h2" }],
  ["path", { d: "M4 18h2" }],
  ["path", { d: "M4 6h2" }],
  ["rect", { x: "6", y: "2", width: "12", height: "20", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/milestone.mjs
var Milestone = [
  ["path", { d: "M12 13v8" }],
  ["path", { d: "M12 3v3" }],
  [
    "path",
    {
      d: "M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/milk-off.mjs
var MilkOff = [
  ["path", { d: "M8 2h8" }],
  [
    "path",
    {
      d: "M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"
    }
  ],
  ["path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/milk.mjs
var Milk = [
  ["path", { d: "M8 2h8" }],
  [
    "path",
    {
      d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"
    }
  ],
  ["path", { d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/minimize-2.mjs
var Minimize2 = [
  ["path", { d: "m14 10 7-7" }],
  ["path", { d: "M20 10h-6V4" }],
  ["path", { d: "m3 21 7-7" }],
  ["path", { d: "M4 14h6v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/minimize.mjs
var Minimize = [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/minus.mjs
var Minus = [["path", { d: "M5 12h14" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mirror-rectangular.mjs
var MirrorRectangular = [
  ["path", { d: "M11 6 8 9" }],
  ["path", { d: "m16 7-8 8" }],
  ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mirror-round.mjs
var MirrorRound = [
  ["path", { d: "M10 6.6 8.6 8" }],
  ["path", { d: "M12 18v4" }],
  ["path", { d: "M15 7.5 9.5 13" }],
  ["path", { d: "M7 22h10" }],
  ["circle", { cx: "12", cy: "10", r: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-check.mjs
var MonitorCheck = [
  ["path", { d: "m9 10 2 2 4-4" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-cloud.mjs
var MonitorCloud = [
  ["path", { d: "M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-cog.mjs
var MonitorCog = [
  ["path", { d: "M12 17v4" }],
  ["path", { d: "m14.305 7.53.923-.382" }],
  ["path", { d: "m15.228 4.852-.923-.383" }],
  ["path", { d: "m16.852 3.228-.383-.924" }],
  ["path", { d: "m16.852 8.772-.383.923" }],
  ["path", { d: "m19.148 3.228.383-.924" }],
  ["path", { d: "m19.53 9.696-.382-.924" }],
  ["path", { d: "m20.772 4.852.924-.383" }],
  ["path", { d: "m20.772 7.148.924.383" }],
  ["path", { d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" }],
  ["path", { d: "M8 21h8" }],
  ["circle", { cx: "18", cy: "6", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-dot.mjs
var MonitorDot = [
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693" }],
  ["path", { d: "M8 21h8" }],
  ["circle", { cx: "19", cy: "6", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-down.mjs
var MonitorDown = [
  ["path", { d: "M12 13V7" }],
  ["path", { d: "m15 10-3 3-3-3" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-off.mjs
var MonitorOff = [
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M8 21h8" }],
  ["path", { d: "M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-pause.mjs
var MonitorPause = [
  ["path", { d: "M10 13V7" }],
  ["path", { d: "M14 13V7" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-play.mjs
var MonitorPlay = [
  [
    "path",
    {
      d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"
    }
  ],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-smartphone.mjs
var MonitorSmartphone = [
  ["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" }],
  ["path", { d: "M10 19v-3.96 3.15" }],
  ["path", { d: "M7 19h5" }],
  ["rect", { width: "6", height: "10", x: "16", y: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-speaker.mjs
var MonitorSpeaker = [
  ["path", { d: "M5.5 20H8" }],
  ["path", { d: "M17 9h.01" }],
  ["rect", { width: "10", height: "16", x: "12", y: "4", rx: "2" }],
  ["path", { d: "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" }],
  ["circle", { cx: "17", cy: "15", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-stop.mjs
var MonitorStop = [
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }],
  ["rect", { x: "9", y: "7", width: "6", height: "6", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-up.mjs
var MonitorUp = [
  ["path", { d: "m9 10 3-3 3 3" }],
  ["path", { d: "M12 13V7" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor-x.mjs
var MonitorX = [
  ["path", { d: "m14.5 12.5-5-5" }],
  ["path", { d: "m9.5 12.5 5-5" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/monitor.mjs
var Monitor = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/moon-star.mjs
var MoonStar = [
  ["path", { d: "M18 5h4" }],
  ["path", { d: "M20 3v4" }],
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/moon.mjs
var Moon = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/motorbike.mjs
var Motorbike = [
  ["path", { d: "m18 14-1-3" }],
  ["path", { d: "m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81" }],
  ["path", { d: "M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5" }],
  ["circle", { cx: "19", cy: "17", r: "3" }],
  ["circle", { cx: "5", cy: "17", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mountain.mjs
var Mountain = [["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mountain-snow.mjs
var MountainSnow = [
  ["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" }],
  ["path", { d: "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse-left.mjs
var MouseLeft = [
  ["path", { d: "M12 7.318V10" }],
  ["path", { d: "M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7" }],
  ["circle", { cx: "7", cy: "4", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse-off.mjs
var MouseOff = [
  ["path", { d: "M12 6v.343" }],
  ["path", { d: "M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218" }],
  ["path", { d: "M19 13.343V9A7 7 0 0 0 8.56 2.902" }],
  ["path", { d: "M22 22 2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse-pointer-2-off.mjs
var MousePointer2Off = [
  [
    "path",
    {
      d: "m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551"
    }
  ],
  ["path", { d: "M22 2 2 22" }],
  ["path", { d: "m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse-pointer-2.mjs
var MousePointer2 = [
  [
    "path",
    {
      d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse-pointer-ban.mjs
var MousePointerBan = [
  [
    "path",
    {
      d: "M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z"
    }
  ],
  ["circle", { cx: "16", cy: "16", r: "6" }],
  ["path", { d: "m11.8 11.8 8.4 8.4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse-pointer-click.mjs
var MousePointerClick = [
  ["path", { d: "M14 4.1 12 6" }],
  ["path", { d: "m5.1 8-2.9-.8" }],
  ["path", { d: "m6 12-1.9 2" }],
  ["path", { d: "M7.2 2.2 8 5.1" }],
  [
    "path",
    {
      d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse-pointer.mjs
var MousePointer = [
  ["path", { d: "M12.586 12.586 19 19" }],
  [
    "path",
    {
      d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse-right.mjs
var MouseRight = [
  ["path", { d: "M12 7.318V10" }],
  ["path", { d: "M19 10v5a7 7 0 0 1-14 0V9c0-3.527 2.608-6.515 6-7" }],
  ["circle", { cx: "17", cy: "4", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/mouse.mjs
var Mouse = [
  ["rect", { x: "5", y: "2", width: "14", height: "20", rx: "7" }],
  ["path", { d: "M12 6v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-3d.mjs
var Move3d = [
  ["path", { d: "M5 3v16h16" }],
  ["path", { d: "m5 19 6-6" }],
  ["path", { d: "m2 6 3-3 3 3" }],
  ["path", { d: "m18 16 3 3-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-diagonal-2.mjs
var MoveDiagonal2 = [
  ["path", { d: "M19 13v6h-6" }],
  ["path", { d: "M5 11V5h6" }],
  ["path", { d: "m5 5 14 14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-diagonal.mjs
var MoveDiagonal = [
  ["path", { d: "M11 19H5v-6" }],
  ["path", { d: "M13 5h6v6" }],
  ["path", { d: "M19 5 5 19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-down-left.mjs
var MoveDownLeft = [
  ["path", { d: "M11 19H5V13" }],
  ["path", { d: "M19 5L5 19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-down-right.mjs
var MoveDownRight = [
  ["path", { d: "M19 13V19H13" }],
  ["path", { d: "M5 5L19 19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-down.mjs
var MoveDown = [
  ["path", { d: "M8 18L12 22L16 18" }],
  ["path", { d: "M12 2V22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-horizontal.mjs
var MoveHorizontal = [
  ["path", { d: "m18 8 4 4-4 4" }],
  ["path", { d: "M2 12h20" }],
  ["path", { d: "m6 8-4 4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-left.mjs
var MoveLeft = [
  ["path", { d: "M6 8L2 12L6 16" }],
  ["path", { d: "M2 12H22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-right.mjs
var MoveRight = [
  ["path", { d: "M18 8L22 12L18 16" }],
  ["path", { d: "M2 12H22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-up-left.mjs
var MoveUpLeft = [
  ["path", { d: "M5 11V5H11" }],
  ["path", { d: "M5 5L19 19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-up-right.mjs
var MoveUpRight = [
  ["path", { d: "M13 5H19V11" }],
  ["path", { d: "M19 5L5 19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-up.mjs
var MoveUp = [
  ["path", { d: "M8 6L12 2L16 6" }],
  ["path", { d: "M12 2V22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move-vertical.mjs
var MoveVertical = [
  ["path", { d: "M12 2v20" }],
  ["path", { d: "m8 18 4 4 4-4" }],
  ["path", { d: "m8 6 4-4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/move.mjs
var Move = [
  ["path", { d: "M12 2v20" }],
  ["path", { d: "m15 19-3 3-3-3" }],
  ["path", { d: "m19 9 3 3-3 3" }],
  ["path", { d: "M2 12h20" }],
  ["path", { d: "m5 9-3 3 3 3" }],
  ["path", { d: "m9 5 3-3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/music-2.mjs
var Music2 = [
  ["circle", { cx: "8", cy: "18", r: "4" }],
  ["path", { d: "M12 18V2l7 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/music-3.mjs
var Music3 = [
  ["circle", { cx: "12", cy: "18", r: "4" }],
  ["path", { d: "M16 18V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/music-4.mjs
var Music4 = [
  ["path", { d: "M9 18V5l12-2v13" }],
  ["path", { d: "m9 9 12-2" }],
  ["circle", { cx: "6", cy: "18", r: "3" }],
  ["circle", { cx: "18", cy: "16", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/music.mjs
var Music = [
  ["path", { d: "M9 18V5l12-2v13" }],
  ["circle", { cx: "6", cy: "18", r: "3" }],
  ["circle", { cx: "18", cy: "16", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/navigation-2-off.mjs
var Navigation2Off = [
  ["path", { d: "M9.31 9.31 5 21l7-4 7 4-1.17-3.17" }],
  ["path", { d: "M14.53 8.88 12 2l-1.17 3.17" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/navigation-2.mjs
var Navigation2 = [["polygon", { points: "12 2 19 21 12 17 5 21 12 2" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/navigation-off.mjs
var NavigationOff = [
  ["path", { d: "M8.43 8.43 3 11l8 2 2 8 2.57-5.43" }],
  ["path", { d: "M17.39 11.73 22 2l-9.73 4.61" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/navigation.mjs
var Navigation = [["polygon", { points: "3 11 22 2 13 21 11 13 3 11" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/network.mjs
var Network = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" }],
  ["path", { d: "M12 12V8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/newspaper.mjs
var Newspaper = [
  ["path", { d: "M15 18h-5" }],
  ["path", { d: "M18 14h-8" }],
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"
    }
  ],
  ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/nfc.mjs
var Nfc = [
  ["path", { d: "M6 8.32a7.43 7.43 0 0 1 0 7.36" }],
  ["path", { d: "M9.46 6.21a11.76 11.76 0 0 1 0 11.58" }],
  ["path", { d: "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" }],
  ["path", { d: "M16.37 2a20.16 20.16 0 0 1 0 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/non-binary.mjs
var NonBinary = [
  ["path", { d: "M12 2v10" }],
  ["path", { d: "m8.5 4 7 4" }],
  ["path", { d: "m8.5 8 7-4" }],
  ["circle", { cx: "12", cy: "17", r: "5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/notebook-pen.mjs
var NotebookPen = [
  ["path", { d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" }],
  ["path", { d: "M2 6h4" }],
  ["path", { d: "M2 10h4" }],
  ["path", { d: "M2 14h4" }],
  ["path", { d: "M2 18h4" }],
  [
    "path",
    {
      d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/notebook-tabs.mjs
var NotebookTabs = [
  ["path", { d: "M2 6h4" }],
  ["path", { d: "M2 10h4" }],
  ["path", { d: "M2 14h4" }],
  ["path", { d: "M2 18h4" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
  ["path", { d: "M15 2v20" }],
  ["path", { d: "M15 7h5" }],
  ["path", { d: "M15 12h5" }],
  ["path", { d: "M15 17h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/notebook-text.mjs
var NotebookText = [
  ["path", { d: "M2 6h4" }],
  ["path", { d: "M2 10h4" }],
  ["path", { d: "M2 14h4" }],
  ["path", { d: "M2 18h4" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
  ["path", { d: "M9.5 8h5" }],
  ["path", { d: "M9.5 12H16" }],
  ["path", { d: "M9.5 16H14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/notebook.mjs
var Notebook = [
  ["path", { d: "M2 6h4" }],
  ["path", { d: "M2 10h4" }],
  ["path", { d: "M2 14h4" }],
  ["path", { d: "M2 18h4" }],
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
  ["path", { d: "M16 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/notepad-text-dashed.mjs
var NotepadTextDashed = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M12 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M20 12v2" }],
  ["path", { d: "M20 18v2a2 2 0 0 1-2 2h-1" }],
  ["path", { d: "M13 22h-2" }],
  ["path", { d: "M7 22H6a2 2 0 0 1-2-2v-2" }],
  ["path", { d: "M4 14v-2" }],
  ["path", { d: "M4 8V6a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M8 10h6" }],
  ["path", { d: "M8 14h8" }],
  ["path", { d: "M8 18h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/nut-off.mjs
var NutOff = [
  ["path", { d: "M12 4V2" }],
  [
    "path",
    {
      d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939"
    }
  ],
  ["path", { d: "M19 10v3.343" }],
  [
    "path",
    {
      d: "M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/nut.mjs
var Nut = [
  ["path", { d: "M12 4V2" }],
  [
    "path",
    {
      d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"
    }
  ],
  [
    "path",
    {
      d: "M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/notepad-text.mjs
var NotepadText = [
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M12 2v4" }],
  ["path", { d: "M16 2v4" }],
  ["rect", { width: "16", height: "18", x: "4", y: "4", rx: "2" }],
  ["path", { d: "M8 10h6" }],
  ["path", { d: "M8 14h8" }],
  ["path", { d: "M8 18h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/octagon-alert.mjs
var OctagonAlert = [
  ["path", { d: "M12 16h.01" }],
  ["path", { d: "M12 8v4" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/octagon-minus.mjs
var OctagonMinus = [
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
    }
  ],
  ["path", { d: "M8 12h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/octagon-pause.mjs
var OctagonPause = [
  ["path", { d: "M10 15V9" }],
  ["path", { d: "M14 15V9" }],
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/octagon-x.mjs
var OctagonX = [
  ["path", { d: "m15 9-6 6" }],
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
    }
  ],
  ["path", { d: "m9 9 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/octagon.mjs
var Octagon = [
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/omega.mjs
var Omega = [
  [
    "path",
    {
      d: "M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/option.mjs
var Option = [
  ["path", { d: "M14 3h7" }],
  ["path", { d: "M3 3h5.28a1 1 0 0 1 .948.684l5.544 16.632a1 1 0 0 0 .949.684H21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/orbit.mjs
var Orbit = [
  ["path", { d: "M20.341 6.484A10 10 0 0 1 10.266 21.85" }],
  ["path", { d: "M3.659 17.516A10 10 0 0 1 13.74 2.152" }],
  ["circle", { cx: "12", cy: "12", r: "3" }],
  ["circle", { cx: "19", cy: "5", r: "2" }],
  ["circle", { cx: "5", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/origami.mjs
var Origami = [
  ["path", { d: "M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025" }],
  [
    "path",
    { d: "m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009" }
  ],
  [
    "path",
    {
      d: "m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/package-2.mjs
var Package2 = [
  ["path", { d: "M12 3v6" }],
  [
    "path",
    {
      d: "M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z"
    }
  ],
  ["path", { d: "M3.054 9.013h17.893" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/package-check.mjs
var PackageCheck = [
  ["path", { d: "M12 22V12" }],
  ["path", { d: "m16 17 2 2 4-4" }],
  [
    "path",
    {
      d: "M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5" }],
  ["path", { d: "m7.5 4.27 8.997 5.148" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/package-minus.mjs
var PackageMinus = [
  ["path", { d: "M12 22V12" }],
  ["path", { d: "M16 17h6" }],
  [
    "path",
    {
      d: "M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5" }],
  ["path", { d: "m7.5 4.27 8.997 5.148" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/package-open.mjs
var PackageOpen = [
  ["path", { d: "M12 22v-9" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/package-plus.mjs
var PackagePlus = [
  ["path", { d: "M12 22V12" }],
  ["path", { d: "M16 17h6" }],
  ["path", { d: "M19 14v6" }],
  [
    "path",
    {
      d: "M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5" }],
  ["path", { d: "m7.5 4.27 8.997 5.148" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/package-search.mjs
var PackageSearch = [
  ["path", { d: "M12 22V12" }],
  ["path", { d: "M20.27 18.27 22 20" }],
  [
    "path",
    {
      d: "M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5" }],
  ["path", { d: "m7.5 4.27 8.997 5.148" }],
  ["circle", { cx: "18.5", cy: "16.5", r: "2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/package-x.mjs
var PackageX = [
  ["path", { d: "M12 22V12" }],
  ["path", { d: "m16.5 14.5 5 5" }],
  ["path", { d: "m16.5 19.5 5-5" }],
  [
    "path",
    {
      d: "M21 10.5V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.13-.074"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5" }],
  ["path", { d: "m7.5 4.27 8.997 5.148" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/package.mjs
var Package = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
    }
  ],
  ["path", { d: "M12 22V12" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7" }],
  ["path", { d: "m7.5 4.27 9 5.15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/paint-bucket.mjs
var PaintBucket = [
  ["path", { d: "M11 7 6 2" }],
  ["path", { d: "M18.992 12H2.041" }],
  [
    "path",
    {
      d: "M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595"
    }
  ],
  [
    "path",
    {
      d: "m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/paint-roller.mjs
var PaintRoller = [
  ["rect", { width: "16", height: "6", x: "2", y: "2", rx: "2" }],
  ["path", { d: "M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" }],
  ["rect", { width: "4", height: "6", x: "8", y: "16", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/paintbrush-vertical.mjs
var PaintbrushVertical = [
  ["path", { d: "M10 2v2" }],
  ["path", { d: "M14 2v4" }],
  ["path", { d: "M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" }],
  [
    "path",
    {
      d: "M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/paintbrush.mjs
var Paintbrush = [
  ["path", { d: "m14.622 17.897-10.68-2.913" }],
  [
    "path",
    {
      d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"
    }
  ],
  [
    "path",
    {
      d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/palette.mjs
var Palette = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panda.mjs
var Panda = [
  ["path", { d: "M11.25 17.25h1.5L12 18z" }],
  ["path", { d: "m15 12 2 2" }],
  ["path", { d: "M18 6.5a.5.5 0 0 0-.5-.5" }],
  [
    "path",
    {
      d: "M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83"
    }
  ],
  ["path", { d: "M6 6.5a.495.495 0 0 1 .5-.5" }],
  ["path", { d: "m9 12-2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-bottom-close.mjs
var PanelBottomClose = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 15h18" }],
  ["path", { d: "m15 8-3 3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-bottom-dashed.mjs
var PanelBottomDashed = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M14 15h1" }],
  ["path", { d: "M19 15h2" }],
  ["path", { d: "M3 15h2" }],
  ["path", { d: "M9 15h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-bottom-open.mjs
var PanelBottomOpen = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 15h18" }],
  ["path", { d: "m9 10 3-3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-bottom.mjs
var PanelBottom = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 15h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-left-close.mjs
var PanelLeftClose = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M9 3v18" }],
  ["path", { d: "m16 15-3-3 3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-left-dashed.mjs
var PanelLeftDashed = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M9 14v1" }],
  ["path", { d: "M9 19v2" }],
  ["path", { d: "M9 3v2" }],
  ["path", { d: "M9 9v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-left-open.mjs
var PanelLeftOpen = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M9 3v18" }],
  ["path", { d: "m14 9 3 3-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-left-right-dashed.mjs
var PanelLeftRightDashed = [
  ["path", { d: "M15 10V9" }],
  ["path", { d: "M15 15v-1" }],
  ["path", { d: "M15 21v-2" }],
  ["path", { d: "M15 5V3" }],
  ["path", { d: "M9 10V9" }],
  ["path", { d: "M9 15v-1" }],
  ["path", { d: "M9 21v-2" }],
  ["path", { d: "M9 5V3" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-left.mjs
var PanelLeft = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M9 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-right-close.mjs
var PanelRightClose = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M15 3v18" }],
  ["path", { d: "m8 9 3 3-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-right-dashed.mjs
var PanelRightDashed = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M15 14v1" }],
  ["path", { d: "M15 19v2" }],
  ["path", { d: "M15 3v2" }],
  ["path", { d: "M15 9v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-right-open.mjs
var PanelRightOpen = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M15 3v18" }],
  ["path", { d: "m10 15-3-3 3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-right.mjs
var PanelRight = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M15 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-top-bottom-dashed.mjs
var PanelTopBottomDashed = [
  ["path", { d: "M14 15h1" }],
  ["path", { d: "M14 9h1" }],
  ["path", { d: "M19 15h2" }],
  ["path", { d: "M19 9h2" }],
  ["path", { d: "M3 15h2" }],
  ["path", { d: "M3 9h2" }],
  ["path", { d: "M9 15h1" }],
  ["path", { d: "M9 9h1" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-top-close.mjs
var PanelTopClose = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 9h18" }],
  ["path", { d: "m9 16 3-3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-top-dashed.mjs
var PanelTopDashed = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M14 9h1" }],
  ["path", { d: "M19 9h2" }],
  ["path", { d: "M3 9h2" }],
  ["path", { d: "M9 9h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-top-open.mjs
var PanelTopOpen = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 9h18" }],
  ["path", { d: "m15 14-3 3-3-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panel-top.mjs
var PanelTop = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 9h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panels-left-bottom.mjs
var PanelsLeftBottom = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M9 3v18" }],
  ["path", { d: "M9 15h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panels-right-bottom.mjs
var PanelsRightBottom = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 15h12" }],
  ["path", { d: "M15 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/panels-top-left.mjs
var PanelsTopLeft = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 9h18" }],
  ["path", { d: "M9 21V9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/paper-bag.mjs
var PaperBag = [
  [
    "path",
    {
      d: "M5.364 3.848C4 6 3 9.652 3 12.652V19a2 2 0 002 2h14a2 2 0 002-2v-5c0-2.334-1.816-4.668-2.622-7.002"
    }
  ],
  [
    "path",
    {
      d: "M7 3h11.379a2 2 0 011.789 1.106l.723 1.447A1 1 0 0119.997 7h-8.525a2 2 0 01-1.789-1.106L8.79 4.105a2 2 0 10-3.579 1.789l2.261 4.522A5 5 0 018 12.652V21"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/paperclip.mjs
var Paperclip = [
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/parasol.mjs
var Parasol = [
  ["path", { d: "M12.5 11.134 18.196 21" }],
  [
    "path",
    {
      d: "M20.425 5.299a10 10 0 0 0-16.941 9.78c.183.563.843.774 1.355.478L20.16 6.711c.512-.296.66-.973.264-1.413"
    }
  ],
  ["path", { d: "M21 21H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/parentheses.mjs
var Parentheses = [
  ["path", { d: "M8 21s-4-3-4-9 4-9 4-9" }],
  ["path", { d: "M16 3s4 3 4 9-4 9-4 9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/parking-meter.mjs
var ParkingMeter = [
  ["path", { d: "M11 15h2" }],
  ["path", { d: "M12 12v3" }],
  ["path", { d: "M12 19v3" }],
  [
    "path",
    {
      d: "M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z"
    }
  ],
  ["path", { d: "M9 9a3 3 0 1 1 6 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/party-popper.mjs
var PartyPopper = [
  ["path", { d: "M5.8 11.3 2 22l10.7-3.79" }],
  ["path", { d: "M4 3h.01" }],
  ["path", { d: "M22 8h.01" }],
  ["path", { d: "M15 2h.01" }],
  ["path", { d: "M22 20h.01" }],
  [
    "path",
    {
      d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"
    }
  ],
  ["path", { d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" }],
  ["path", { d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" }],
  [
    "path",
    {
      d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pause.mjs
var Pause = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/paw-print.mjs
var PawPrint = [
  ["circle", { cx: "11", cy: "4", r: "2" }],
  ["circle", { cx: "18", cy: "8", r: "2" }],
  ["circle", { cx: "20", cy: "16", r: "2" }],
  [
    "path",
    {
      d: "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pc-case.mjs
var PcCase = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2" }],
  ["path", { d: "M15 14h.01" }],
  ["path", { d: "M9 6h6" }],
  ["path", { d: "M9 10h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pen-line.mjs
var PenLine = [
  ["path", { d: "M13 21h8" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pen-off.mjs
var PenOff = [
  [
    "path",
    {
      d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"
    }
  ],
  ["path", { d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pen-tool.mjs
var PenTool = [
  [
    "path",
    {
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"
    }
  ],
  [
    "path",
    {
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"
    }
  ],
  ["path", { d: "m2.3 2.3 7.286 7.286" }],
  ["circle", { cx: "11", cy: "11", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pen.mjs
var Pen = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pencil-line.mjs
var PencilLine = [
  ["path", { d: "M13 21h8" }],
  ["path", { d: "m15 5 4 4" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pencil-off.mjs
var PencilOff = [
  [
    "path",
    {
      d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"
    }
  ],
  ["path", { d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" }],
  ["path", { d: "m15 5 4 4" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pencil-ruler.mjs
var PencilRuler = [
  ["path", { d: "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" }],
  ["path", { d: "m8 6 2-2" }],
  ["path", { d: "m18 16 2-2" }],
  ["path", { d: "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" }],
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    }
  ],
  ["path", { d: "m15 5 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pencil-sparkles.mjs
var PencilSparkles = [
  ["path", { d: "M10 3H8" }],
  ["path", { d: "m15.007 5.008 3.987 3.986" }],
  ["path", { d: "M20 15v4" }],
  [
    "path",
    {
      d: "M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    }
  ],
  ["path", { d: "M22 17h-4" }],
  ["path", { d: "M4 5v4" }],
  ["path", { d: "M6 7H2" }],
  ["path", { d: "M9 2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pencil.mjs
var Pencil = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    }
  ],
  ["path", { d: "m15 5 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pentagon.mjs
var Pentagon = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/percent.mjs
var Percent = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/phi.mjs
var Phi = [
  ["path", { d: "M12 2v20" }],
  ["circle", { cx: "12", cy: "12", r: "7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/person-standing.mjs
var PersonStanding = [
  ["circle", { cx: "12", cy: "5", r: "1" }],
  ["path", { d: "m9 20 3-6 3 6" }],
  ["path", { d: "m6 8 6 2 6-2" }],
  ["path", { d: "M12 10v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/philippine-peso.mjs
var PhilippinePeso = [
  ["path", { d: "M20 11H4" }],
  ["path", { d: "M20 7H4" }],
  ["path", { d: "M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/phone-call.mjs
var PhoneCall = [
  ["path", { d: "M13 2a9 9 0 0 1 9 9" }],
  ["path", { d: "M13 6a5 5 0 0 1 5 5" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/phone-forwarded.mjs
var PhoneForwarded = [
  ["path", { d: "M14 6h8" }],
  ["path", { d: "m18 2 4 4-4 4" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/phone-incoming.mjs
var PhoneIncoming = [
  ["path", { d: "M16 2v6h6" }],
  ["path", { d: "m22 2-6 6" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/phone-missed.mjs
var PhoneMissed = [
  ["path", { d: "m16 2 6 6" }],
  ["path", { d: "m22 2-6 6" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/phone-off.mjs
var PhoneOff = [
  [
    "path",
    {
      d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272"
    }
  ],
  ["path", { d: "M22 2 2 22" }],
  [
    "path",
    {
      d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/phone-outgoing.mjs
var PhoneOutgoing = [
  ["path", { d: "m16 8 6-6" }],
  ["path", { d: "M22 8V2h-6" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/phone.mjs
var Phone = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pi.mjs
var Pi = [
  ["line", { x1: "9", x2: "9", y1: "4", y2: "20" }],
  ["path", { d: "M4 7c0-1.7 1.3-3 3-3h13" }],
  ["path", { d: "M18 20c-1.7 0-3-1.3-3-3V4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/piano.mjs
var Piano = [
  [
    "path",
    {
      d: "M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8"
    }
  ],
  ["path", { d: "M2 14h20" }],
  ["path", { d: "M6 14v4" }],
  ["path", { d: "M10 14v4" }],
  ["path", { d: "M14 14v4" }],
  ["path", { d: "M18 14v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pickaxe.mjs
var Pickaxe = [
  ["path", { d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999" }],
  [
    "path",
    {
      d: "M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024"
    }
  ],
  [
    "path",
    {
      d: "M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069"
    }
  ],
  [
    "path",
    {
      d: "M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/picture-in-picture-2.mjs
var PictureInPicture2 = [
  ["path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }],
  ["rect", { width: "10", height: "7", x: "12", y: "13", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/picture-in-picture.mjs
var PictureInPicture = [
  ["path", { d: "M2 10h6V4" }],
  ["path", { d: "m2 4 6 6" }],
  ["path", { d: "M21 10V7a2 2 0 0 0-2-2h-7" }],
  ["path", { d: "M3 14v2a2 2 0 0 0 2 2h3" }],
  ["rect", { x: "12", y: "14", width: "10", height: "7", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/piggy-bank.mjs
var PiggyBank = [
  [
    "path",
    {
      d: "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"
    }
  ],
  ["path", { d: "M16 10h.01" }],
  ["path", { d: "M2 8v1a2 2 0 0 0 2 2h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pilcrow-left.mjs
var PilcrowLeft = [
  ["path", { d: "M14 3v11" }],
  ["path", { d: "M14 9h-3a3 3 0 0 1 0-6h9" }],
  ["path", { d: "M18 3v11" }],
  ["path", { d: "M22 18H2l4-4" }],
  ["path", { d: "m6 22-4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pilcrow-right.mjs
var PilcrowRight = [
  ["path", { d: "M10 3v11" }],
  ["path", { d: "M10 9H7a1 1 0 0 1 0-6h8" }],
  ["path", { d: "M14 3v11" }],
  ["path", { d: "m18 14 4 4H2" }],
  ["path", { d: "m22 18-4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pilcrow.mjs
var Pilcrow = [
  ["path", { d: "M13 4v16" }],
  ["path", { d: "M17 4v16" }],
  ["path", { d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pill-bottle.mjs
var PillBottle = [
  ["path", { d: "M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4" }],
  ["path", { d: "M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" }],
  ["rect", { width: "16", height: "5", x: "4", y: "2", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pill.mjs
var Pill = [
  ["path", { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" }],
  ["path", { d: "m8.5 8.5 7 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pin-off.mjs
var PinOff = [
  ["path", { d: "M12 17v5" }],
  ["path", { d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pin.mjs
var Pin = [
  ["path", { d: "M12 17v5" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pipette.mjs
var Pipette = [
  [
    "path",
    {
      d: "m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12"
    }
  ],
  ["path", { d: "m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" }],
  ["path", { d: "m2 22 .414-.414" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pizza.mjs
var Pizza = [
  ["path", { d: "m12 14-1 1" }],
  ["path", { d: "m13.75 18.25-1.25 1.42" }],
  ["path", { d: "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12" }],
  ["path", { d: "M18.8 9.3a1 1 0 0 0 2.1 7.7" }],
  [
    "path",
    {
      d: "M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/plane-landing.mjs
var PlaneLanding = [
  ["path", { d: "M2 22h20" }],
  [
    "path",
    {
      d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/plane-takeoff.mjs
var PlaneTakeoff = [
  ["path", { d: "M2 22h20" }],
  [
    "path",
    {
      d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/plane.mjs
var Plane = [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/play-off.mjs
var PlayOff = [
  ["path", { d: "m10.215 4.56 9.79 5.71a2 2 0 0 1 .003 3.458l-.393.23" }],
  ["path", { d: "m16.042 16.042-8.034 4.686A2 2 0 0 1 5 19V5" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/play.mjs
var Play = [
  [
    "path",
    { d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/plug-2.mjs
var Plug2 = [
  ["path", { d: "M9 2v6" }],
  ["path", { d: "M15 2v6" }],
  ["path", { d: "M12 17v5" }],
  ["path", { d: "M5 8h14" }],
  ["path", { d: "M6 11V8h12v3a6 6 0 1 1-12 0Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/plug-zap.mjs
var PlugZap = [
  ["path", { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" }],
  ["path", { d: "m2 22 3-3" }],
  ["path", { d: "M7.5 13.5 10 11" }],
  ["path", { d: "M10.5 16.5 13 14" }],
  ["path", { d: "m18 3-4 4h6l-4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/plug.mjs
var Plug = [
  ["path", { d: "M12 22v-5" }],
  ["path", { d: "M15 8V2" }],
  ["path", { d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z" }],
  ["path", { d: "M9 8V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/plus.mjs
var Plus = [
  ["path", { d: "M5 12h14" }],
  ["path", { d: "M12 5v14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pocket-knife.mjs
var PocketKnife = [
  ["path", { d: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" }],
  ["path", { d: "M18 6h.01" }],
  ["path", { d: "M6 18h.01" }],
  ["path", { d: "M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" }],
  ["path", { d: "M18 11.66V22a4 4 0 0 0 4-4V6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/podcast.mjs
var Podcast = [
  ["path", { d: "M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z", fill: "currentColor" }],
  ["path", { d: "M16.85 18.58a9 9 0 1 0-9.7 0" }],
  ["path", { d: "M8 14a5 5 0 1 1 8 0" }],
  ["circle", { cx: "12", cy: "11", r: "1", fill: "currentColor" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/podium.mjs
var Podium = [
  ["path", { d: "M12 6V2h-1" }],
  [
    "path",
    {
      d: "M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1"
    }
  ],
  ["path", { d: "M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pointer-off.mjs
var PointerOff = [
  ["path", { d: "M10 4.5V4a2 2 0 0 0-2.41-1.957" }],
  ["path", { d: "M13.9 8.4a2 2 0 0 0-1.26-1.295" }],
  ["path", { d: "M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158" }],
  [
    "path",
    { d: "m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343" }
  ],
  ["path", { d: "M6 6v8" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pointer.mjs
var Pointer = [
  ["path", { d: "M22 14a8 8 0 0 1-8 8" }],
  ["path", { d: "M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
  ["path", { d: "M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" }],
  ["path", { d: "M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" }],
  [
    "path",
    {
      d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/popcorn.mjs
var Popcorn = [
  ["path", { d: "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" }],
  ["path", { d: "M10 22 9 8" }],
  ["path", { d: "m14 22 1-14" }],
  [
    "path",
    {
      d: "M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/popsicle.mjs
var Popsicle = [
  [
    "path",
    { d: "M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z" }
  ],
  ["path", { d: "m22 22-5.5-5.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pound-sterling.mjs
var PoundSterling = [
  ["path", { d: "M18 7c0-5.333-8-5.333-8 0" }],
  ["path", { d: "M10 7v14" }],
  ["path", { d: "M6 21h12" }],
  ["path", { d: "M6 13h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/power-off.mjs
var PowerOff = [
  ["path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15" }],
  ["path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68" }],
  ["path", { d: "M12 2v4" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/power.mjs
var Power = [
  ["path", { d: "M12 2v10" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/printer-check.mjs
var PrinterCheck = [
  ["path", { d: "M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5" }],
  ["path", { d: "m16 19 2 2 4-4" }],
  ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/presentation.mjs
var Presentation = [
  ["path", { d: "M2 3h20" }],
  ["path", { d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" }],
  ["path", { d: "m7 21 5-5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/printer-x.mjs
var PrinterX = [
  ["path", { d: "M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377" }],
  ["path", { d: "m16.5 16.5 5 5" }],
  ["path", { d: "m16.5 21.5 5-5" }],
  ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5" }],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/printer.mjs
var Printer = [
  ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/projector.mjs
var Projector = [
  ["path", { d: "M5 7 3 5" }],
  ["path", { d: "M9 6V3" }],
  ["path", { d: "m13 7 2-2" }],
  ["circle", { cx: "9", cy: "13", r: "3" }],
  [
    "path",
    { d: "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" }
  ],
  ["path", { d: "M16 16h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/proportions.mjs
var Proportions = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
  ["path", { d: "M12 9v11" }],
  ["path", { d: "M2 9h13a2 2 0 0 1 2 2v9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/puzzle.mjs
var Puzzle = [
  [
    "path",
    {
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/pyramid.mjs
var Pyramid = [
  [
    "path",
    {
      d: "M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"
    }
  ],
  ["path", { d: "M12 2v20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/qr-code.mjs
var QrCode = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3" }],
  ["path", { d: "M21 21v.01" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7" }],
  ["path", { d: "M3 12h.01" }],
  ["path", { d: "M12 3h.01" }],
  ["path", { d: "M12 16v.01" }],
  ["path", { d: "M16 12h1" }],
  ["path", { d: "M21 12v.01" }],
  ["path", { d: "M12 21v-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/quote.mjs
var Quote = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rabbit.mjs
var Rabbit = [
  ["path", { d: "M13 16a3 3 0 0 1 2.24 5" }],
  ["path", { d: "M18 12h.01" }],
  [
    "path",
    {
      d: "M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"
    }
  ],
  ["path", { d: "M20 8.54V4a2 2 0 1 0-4 0v3" }],
  ["path", { d: "M7.612 12.524a3 3 0 1 0-1.6 4.3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/radar.mjs
var Radar = [
  ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34" }],
  ["path", { d: "M4 6h.01" }],
  ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35" }],
  ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67" }],
  ["path", { d: "M12 18h.01" }],
  ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67" }],
  ["circle", { cx: "12", cy: "12", r: "2" }],
  ["path", { d: "m13.41 10.59 5.66-5.66" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/radiation.mjs
var Radiation = [
  ["path", { d: "M12 12h.01" }],
  [
    "path",
    {
      d: "M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z"
    }
  ],
  [
    "path",
    {
      d: "M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z"
    }
  ],
  [
    "path",
    {
      d: "M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/radical.mjs
var Radical = [
  [
    "path",
    {
      d: "M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/radio-off.mjs
var RadioOff = [
  ["path", { d: "M13.414 13.414a2 2 0 1 1-2.828-2.828" }],
  ["path", { d: "M16.247 7.761a6 6 0 0 1 1.744 4.572" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 2.234 10.72" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/radio-receiver.mjs
var RadioReceiver = [
  ["path", { d: "M5 16v2" }],
  ["path", { d: "M19 16v2" }],
  ["rect", { width: "20", height: "8", x: "2", y: "8", rx: "2" }],
  ["path", { d: "M18 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/radio-tower.mjs
var RadioTower = [
  ["path", { d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9" }],
  ["path", { d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" }],
  ["circle", { cx: "12", cy: "9", r: "2" }],
  ["path", { d: "M16.2 4.8c2 2 2.26 5.11.8 7.47" }],
  ["path", { d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1" }],
  ["path", { d: "M9.5 18h5" }],
  ["path", { d: "m8 22 4-11 4 11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/radio.mjs
var Radio = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/radius.mjs
var Radius = [
  ["path", { d: "M20.34 17.52a10 10 0 1 0-2.82 2.82" }],
  ["circle", { cx: "19", cy: "19", r: "2" }],
  ["path", { d: "m13.41 13.41 4.18 4.18" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rainbow.mjs
var Rainbow = [
  ["path", { d: "M22 17a10 10 0 0 0-20 0" }],
  ["path", { d: "M6 17a6 6 0 0 1 12 0" }],
  ["path", { d: "M10 17a2 2 0 0 1 4 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rat.mjs
var Rat = [
  ["path", { d: "M13 22H4a2 2 0 0 1 0-4h12" }],
  ["path", { d: "M13.236 18a3 3 0 0 0-2.2-5" }],
  ["path", { d: "M16 9h.01" }],
  [
    "path",
    {
      d: "M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3"
    }
  ],
  ["path", { d: "M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ratio.mjs
var Ratio = [
  ["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2" }],
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-cent.mjs
var ReceiptCent = [
  ["path", { d: "M12 7v10" }],
  ["path", { d: "M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-euro.mjs
var ReceiptEuro = [
  ["path", { d: "M15.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ],
  ["path", { d: "M8 12h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-indian-rupee.mjs
var ReceiptIndianRupee = [
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ],
  ["path", { d: "M8 11h8" }],
  ["path", { d: "M8 7h8" }],
  ["path", { d: "M9 7a4 4 0 0 1 0 8H8l3 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-japanese-yen.mjs
var ReceiptJapaneseYen = [
  ["path", { d: "m12 10 3-3" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ],
  ["path", { d: "M9 11h6" }],
  ["path", { d: "M9 15h6" }],
  ["path", { d: "m9 7 3 3v7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-pound-sterling.mjs
var ReceiptPoundSterling = [
  ["path", { d: "M10 17V9.5a1 1 0 0 1 5 0" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ],
  ["path", { d: "M8 13h5" }],
  ["path", { d: "M8 17h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-russian-ruble.mjs
var ReceiptRussianRuble = [
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ],
  ["path", { d: "M8 11h5a2 2 0 0 0 0-4h-3v10" }],
  ["path", { d: "M8 15h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-swiss-franc.mjs
var ReceiptSwissFranc = [
  ["path", { d: "M10 11h4" }],
  ["path", { d: "M10 17V7h5" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ],
  ["path", { d: "M8 15h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-text.mjs
var ReceiptText = [
  ["path", { d: "M13 16H8" }],
  ["path", { d: "M14 8H8" }],
  ["path", { d: "M16 12H8" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt-turkish-lira.mjs
var ReceiptTurkishLira = [
  ["path", { d: "M10 7v10a5 5 0 0 0 5-5" }],
  ["path", { d: "m14 8-6 3" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/receipt.mjs
var Receipt = [
  ["path", { d: "M12 17V7" }],
  ["path", { d: "M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8" }],
  [
    "path",
    {
      d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rectangle-circle.mjs
var RectangleCircle = [
  ["path", { d: "M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" }],
  ["circle", { cx: "14", cy: "12", r: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rectangle-ellipsis.mjs
var RectangleEllipsis = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }],
  ["path", { d: "M12 12h.01" }],
  ["path", { d: "M17 12h.01" }],
  ["path", { d: "M7 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rectangle-goggles.mjs
var RectangleGoggles = [
  [
    "path",
    {
      d: "M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rectangle-horizontal.mjs
var RectangleHorizontal = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rectangle-vertical.mjs
var RectangleVertical = [
  ["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/recycle.mjs
var Recycle = [
  ["path", { d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" }],
  ["path", { d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" }],
  ["path", { d: "m14 16-3 3 3 3" }],
  ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598" }],
  [
    "path",
    {
      d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"
    }
  ],
  ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/redo-2.mjs
var Redo2 = [
  ["path", { d: "m15 14 5-5-5-5" }],
  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/redo.mjs
var Redo = [
  ["path", { d: "M21 7v6h-6" }],
  ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/redo-dot.mjs
var RedoDot = [
  ["circle", { cx: "12", cy: "17", r: "1" }],
  ["path", { d: "M21 7v6h-6" }],
  ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/refresh-ccw-dot.mjs
var RefreshCcwDot = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
  ["path", { d: "M3 3v5h5" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" }],
  ["path", { d: "M16 16h5v5" }],
  ["circle", { cx: "12", cy: "12", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/refresh-ccw.mjs
var RefreshCcw = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
  ["path", { d: "M3 3v5h5" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" }],
  ["path", { d: "M16 16h5v5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/refresh-cw-off.mjs
var RefreshCwOff = [
  ["path", { d: "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" }],
  ["path", { d: "M8 16H3v5" }],
  ["path", { d: "M3 12C3 9.51 4 7.26 5.64 5.64" }],
  ["path", { d: "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" }],
  ["path", { d: "M21 12c0 1-.16 1.97-.47 2.87" }],
  ["path", { d: "M21 3v5h-5" }],
  ["path", { d: "M22 22 2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/refresh-cw.mjs
var RefreshCw = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
  ["path", { d: "M21 3v5h-5" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
  ["path", { d: "M8 16H3v5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/refrigerator.mjs
var Refrigerator = [
  ["path", { d: "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" }],
  ["path", { d: "M5 10h14" }],
  ["path", { d: "M15 7v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/regex.mjs
var Regex = [
  ["path", { d: "M17 3v10" }],
  ["path", { d: "m12.67 5.5 8.66 5" }],
  ["path", { d: "m12.67 10.5 8.66-5" }],
  ["path", { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/remove-formatting.mjs
var RemoveFormatting = [
  ["path", { d: "M4 7V4h16v3" }],
  ["path", { d: "M5 20h6" }],
  ["path", { d: "M13 4 8 20" }],
  ["path", { d: "m15 15 5 5" }],
  ["path", { d: "m20 15-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/repeat-1.mjs
var Repeat1 = [
  ["path", { d: "m17 2 4 4-4 4" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14" }],
  ["path", { d: "m7 22-4-4 4-4" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3" }],
  ["path", { d: "M11 10h1v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/repeat-2.mjs
var Repeat2 = [
  ["path", { d: "m2 9 3-3 3 3" }],
  ["path", { d: "M13 18H7a2 2 0 0 1-2-2V6" }],
  ["path", { d: "m22 15-3 3-3-3" }],
  ["path", { d: "M11 6h6a2 2 0 0 1 2 2v10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/repeat-off.mjs
var RepeatOff = [
  ["path", { d: "M11.656 6H21l-4-4" }],
  ["path", { d: "M17.898 17.898A4 4 0 0 1 17 18H3l4-4" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-.171 1.159" }],
  ["path", { d: "m21 6-4 4" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 3.102-3.898" }],
  ["path", { d: "m7 22-4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/repeat.mjs
var Repeat = [
  ["path", { d: "m17 2 4 4-4 4" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14" }],
  ["path", { d: "m7 22-4-4 4-4" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/replace-all.mjs
var ReplaceAll = [
  ["path", { d: "M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" }],
  ["path", { d: "M14 4a1 1 0 0 1 1-1" }],
  ["path", { d: "M15 10a1 1 0 0 1-1-1" }],
  ["path", { d: "M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" }],
  ["path", { d: "M21 4a1 1 0 0 0-1-1" }],
  ["path", { d: "M21 9a1 1 0 0 1-1 1" }],
  ["path", { d: "m3 7 3 3 3-3" }],
  ["path", { d: "M6 10V5a2 2 0 0 1 2-2h2" }],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/reply-all.mjs
var ReplyAll = [
  ["path", { d: "m12 17-5-5 5-5" }],
  ["path", { d: "M22 18v-2a4 4 0 0 0-4-4H7" }],
  ["path", { d: "m7 17-5-5 5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/replace.mjs
var Replace = [
  ["path", { d: "M14 4a1 1 0 0 1 1-1" }],
  ["path", { d: "M15 10a1 1 0 0 1-1-1" }],
  ["path", { d: "M21 4a1 1 0 0 0-1-1" }],
  ["path", { d: "M21 9a1 1 0 0 1-1 1" }],
  ["path", { d: "m3 7 3 3 3-3" }],
  ["path", { d: "M6 10V5a2 2 0 0 1 2-2h2" }],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/reply.mjs
var Reply = [
  ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4" }],
  ["path", { d: "m9 17-5-5 5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rewind.mjs
var Rewind = [
  ["path", { d: "M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z" }],
  ["path", { d: "M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/road.mjs
var Road = [
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M12 5V3" }],
  ["path", { d: "M12 9v3" }],
  [
    "path",
    {
      d: "M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rocket.mjs
var Rocket = [
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }],
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"
    }
  ],
  [
    "path",
    {
      d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ribbon.mjs
var Ribbon = [
  ["path", { d: "M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22" }],
  ["path", { d: "m12 18 2.57-3.5" }],
  ["path", { d: "M6.243 9.016a7 7 0 0 1 11.507-.009" }],
  ["path", { d: "M9.35 14.53 12 11.22" }],
  [
    "path",
    {
      d: "M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rocking-chair.mjs
var RockingChair = [
  ["path", { d: "m15 13 3.708 7.416" }],
  ["path", { d: "M3 19a15 15 0 0 0 18 0" }],
  ["path", { d: "m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18" }],
  ["path", { d: "m9 13-3.708 7.416" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/roller-coaster.mjs
var RollerCoaster = [
  ["path", { d: "M6 19V5" }],
  ["path", { d: "M10 19V6.8" }],
  ["path", { d: "M14 19v-7.8" }],
  ["path", { d: "M18 5v4" }],
  ["path", { d: "M18 19v-6" }],
  ["path", { d: "M22 19V9" }],
  ["path", { d: "M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rose.mjs
var Rose = [
  ["path", { d: "M17 10h-1a4 4 0 1 1 4-4v.534" }],
  ["path", { d: "M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31" }],
  [
    "path",
    { d: "M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2" }
  ],
  ["path", { d: "M9.77 12C4 15 2 22 2 22" }],
  ["circle", { cx: "17", cy: "8", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rotate-3d.mjs
var Rotate3d = [
  ["path", { d: "m15.194 13.707 3.814 1.86-1.86 3.814" }],
  ["path", { d: "M16.47214 7.52786 A 5 10 0 1 0 13 21.79796" }],
  ["path", { d: "M21.79796 11 A 10 5 0 1 0 19 15.57071" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rotate-ccw-key.mjs
var RotateCcwKey = [
  ["path", { d: "M12 7v6" }],
  ["path", { d: "M12 9h2" }],
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" }],
  ["path", { d: "M3 3v5h5" }],
  ["circle", { cx: "12", cy: "15", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rotate-ccw.mjs
var RotateCcw = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
  ["path", { d: "M3 3v5h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rotate-ccw-square.mjs
var RotateCcwSquare = [
  ["path", { d: "M20 9V7a2 2 0 0 0-2-2h-6" }],
  ["path", { d: "m15 2-3 3 3 3" }],
  ["path", { d: "M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rotate-cw-square.mjs
var RotateCwSquare = [
  ["path", { d: "M12 5H6a2 2 0 0 0-2 2v3" }],
  ["path", { d: "m9 8 3-3-3-3" }],
  ["path", { d: "M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rotate-cw.mjs
var RotateCw = [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }],
  ["path", { d: "M21 3v5h-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/route-off.mjs
var RouteOff = [
  ["circle", { cx: "6", cy: "19", r: "3" }],
  ["path", { d: "M9 19h8.5c.4 0 .9-.1 1.3-.2" }],
  ["path", { d: "M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M21 15.3a3.5 3.5 0 0 0-3.3-3.3" }],
  ["path", { d: "M15 5h-4.3" }],
  ["circle", { cx: "18", cy: "5", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/route.mjs
var Route = [
  ["circle", { cx: "6", cy: "19", r: "3" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" }],
  ["circle", { cx: "18", cy: "5", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/router.mjs
var Router = [
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
  ["path", { d: "M6.01 18H6" }],
  ["path", { d: "M10.01 18H10" }],
  ["path", { d: "M15 10v4" }],
  ["path", { d: "M17.84 7.17a4 4 0 0 0-5.66 0" }],
  ["path", { d: "M20.66 4.34a8 8 0 0 0-11.31 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rows-2.mjs
var Rows2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 12h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rows-3.mjs
var Rows3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M21 9H3" }],
  ["path", { d: "M21 15H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rows-4.mjs
var Rows4 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M21 7.5H3" }],
  ["path", { d: "M21 12H3" }],
  ["path", { d: "M21 16.5H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/rss.mjs
var Rss = [
  ["path", { d: "M4 11a9 9 0 0 1 9 9" }],
  ["path", { d: "M4 4a16 16 0 0 1 16 16" }],
  ["circle", { cx: "5", cy: "19", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ruler-dimension-line.mjs
var RulerDimensionLine = [
  ["path", { d: "M10 15v-3" }],
  ["path", { d: "M14 15v-3" }],
  ["path", { d: "M18 15v-3" }],
  ["path", { d: "M2 8V4" }],
  ["path", { d: "M22 6H2" }],
  ["path", { d: "M22 8V4" }],
  ["path", { d: "M6 15v-3" }],
  ["rect", { x: "2", y: "12", width: "20", height: "8", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ruler.mjs
var Ruler = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2" }],
  ["path", { d: "m11.5 9.5 2-2" }],
  ["path", { d: "m8.5 6.5 2-2" }],
  ["path", { d: "m17.5 15.5 2-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/russian-ruble.mjs
var RussianRuble = [
  ["path", { d: "M6 11h8a4 4 0 0 0 0-8H9v18" }],
  ["path", { d: "M6 15h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sailboat.mjs
var Sailboat = [
  ["path", { d: "M10 2v15" }],
  ["path", { d: "M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z" }],
  [
    "path",
    { d: "M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/salad.mjs
var Salad = [
  ["path", { d: "M7 21h10" }],
  ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" }],
  [
    "path",
    {
      d: "M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"
    }
  ],
  ["path", { d: "m13 12 4-4" }],
  ["path", { d: "M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sandwich.mjs
var Sandwich = [
  ["path", { d: "m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777" }],
  ["path", { d: "M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25" }],
  ["path", { d: "M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9" }],
  ["path", { d: "m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" }],
  ["rect", { width: "20", height: "4", x: "2", y: "11", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/satellite-dish.mjs
var SatelliteDish = [
  ["path", { d: "M4 10a7.31 7.31 0 0 0 10 10Z" }],
  ["path", { d: "m9 15 3-3" }],
  ["path", { d: "M17 13a6 6 0 0 0-6-6" }],
  ["path", { d: "M21 13A10 10 0 0 0 11 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/satellite.mjs
var Satellite = [
  [
    "path",
    {
      d: "m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5"
    }
  ],
  ["path", { d: "M16.5 7.5 19 5" }],
  [
    "path",
    {
      d: "m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5"
    }
  ],
  ["path", { d: "M9 21a6 6 0 0 0-6-6" }],
  [
    "path",
    {
      d: "M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/saudi-riyal.mjs
var SaudiRiyal = [
  ["path", { d: "m20 19.5-5.5 1.2" }],
  ["path", { d: "M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" }],
  ["path", { d: "m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" }],
  ["path", { d: "M20 10 4 13.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/save-all.mjs
var SaveAll = [
  ["path", { d: "M10 2v3a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6" }],
  ["path", { d: "M18 22H4a2 2 0 0 1-2-2V6" }],
  [
    "path",
    {
      d: "M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/save-check.mjs
var SaveCheck = [
  [
    "path",
    {
      d: "M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4v4.35"
    }
  ],
  ["path", { d: "m16 19 2 2 4-4" }],
  ["path", { d: "M17 15.13V14a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/save-pen.mjs
var SavePen = [
  ["path", { d: "M13.33 13H8a1 1 0 00-1 1v7" }],
  [
    "path",
    {
      d: "M14.363 17.634a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506l4.013-4.009a1 1 0 10-3.004-3.004z"
    }
  ],
  ["path", { d: "M7 3v4a1 1 0 001 1h7" }],
  [
    "path",
    { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10.2a2 2 0 011.4.6l3.8 3.8a2 2 0 01.6 1.4v.3" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/save-off.mjs
var SaveOff = [
  ["path", { d: "M13 13H8a1 1 0 0 0-1 1v7" }],
  ["path", { d: "M14 8h1" }],
  ["path", { d: "M17 21v-4" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41" }],
  ["path", { d: "M29.5 11.5s5 5 4 5" }],
  ["path", { d: "M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/save-plus.mjs
var SavePlus = [
  [
    "path",
    {
      d: "M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V12"
    }
  ],
  ["path", { d: "M16 13H8a1 1 0 0 0-1 1v7" }],
  ["path", { d: "M19 22v-6" }],
  ["path", { d: "M22 19h-6" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scale-3d.mjs
var Scale3d = [
  ["path", { d: "M5 7v11a1 1 0 0 0 1 1h11" }],
  ["path", { d: "M5.293 18.707 11 13" }],
  ["circle", { cx: "19", cy: "19", r: "2" }],
  ["circle", { cx: "5", cy: "5", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/save.mjs
var Save = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scale.mjs
var Scale = [
  ["path", { d: "M12 3v18" }],
  ["path", { d: "m19 8 3 8a5 5 0 0 1-6 0zV7" }],
  ["path", { d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" }],
  ["path", { d: "m5 8 3 8a5 5 0 0 1-6 0zV7" }],
  ["path", { d: "M7 21h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan-barcode.mjs
var ScanBarcode = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  ["path", { d: "M8 7v10" }],
  ["path", { d: "M12 7v10" }],
  ["path", { d: "M17 7v10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scaling.mjs
var Scaling = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }],
  ["path", { d: "M14 15H9v-5" }],
  ["path", { d: "M16 3h5v5" }],
  ["path", { d: "M21 3 9 15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan-eye.mjs
var ScanEye = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  ["circle", { cx: "12", cy: "12", r: "1" }],
  [
    "path",
    {
      d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan-face.mjs
var ScanFace = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
  ["path", { d: "M9 9h.01" }],
  ["path", { d: "M15 9h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan-heart.mjs
var ScanHeart = [
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  [
    "path",
    { d: "M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan-line.mjs
var ScanLine = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  ["path", { d: "M7 12h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan-qr-code.mjs
var ScanQrCode = [
  ["path", { d: "M17 12v4a1 1 0 0 1-1 1h-4" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M17 8V7" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M7 17h.01" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  ["rect", { x: "7", y: "7", width: "5", height: "5", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan-text.mjs
var ScanText = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  ["path", { d: "M7 8h8" }],
  ["path", { d: "M7 12h10" }],
  ["path", { d: "M7 16h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan-search.mjs
var ScanSearch = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
  ["circle", { cx: "12", cy: "12", r: "3" }],
  ["path", { d: "m16 16-1.9-1.9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scan.mjs
var Scan = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/school.mjs
var School = [
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3" }],
  ["path", { d: "M18 4.933V21" }],
  ["path", { d: "m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6" }],
  [
    "path",
    {
      d: "m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"
    }
  ],
  ["path", { d: "M6 4.933V21" }],
  ["circle", { cx: "12", cy: "9", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scissors-line-dashed.mjs
var ScissorsLineDashed = [
  ["path", { d: "M5.42 9.42 8 12" }],
  ["circle", { cx: "4", cy: "8", r: "2" }],
  ["path", { d: "m14 6-8.58 8.58" }],
  ["circle", { cx: "4", cy: "16", r: "2" }],
  ["path", { d: "M10.8 14.8 14 18" }],
  ["path", { d: "M16 12h-2" }],
  ["path", { d: "M22 12h-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scissors.mjs
var Scissors = [
  ["circle", { cx: "6", cy: "6", r: "3" }],
  ["path", { d: "M8.12 8.12 12 12" }],
  ["path", { d: "M20 4 8.12 15.88" }],
  ["circle", { cx: "6", cy: "18", r: "3" }],
  ["path", { d: "M14.8 14.8 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scooter.mjs
var Scooter = [
  ["path", { d: "M21 4h-3.5l2 11.05" }],
  ["path", { d: "M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009" }],
  ["circle", { cx: "19.5", cy: "17.5", r: "2.5" }],
  ["circle", { cx: "4.5", cy: "17.5", r: "2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/screen-share-off.mjs
var ScreenShareOff = [
  ["path", { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" }],
  ["path", { d: "M8 21h8" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "m22 3-5 5" }],
  ["path", { d: "m17 3 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/screen-share.mjs
var ScreenShare = [
  ["path", { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" }],
  ["path", { d: "M8 21h8" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "m17 8 5-5" }],
  ["path", { d: "M17 3h5v5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scroll-text.mjs
var ScrollText = [
  ["path", { d: "M15 12h-5" }],
  ["path", { d: "M15 8h-5" }],
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/scroll.mjs
var Scroll = [
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/search-alert.mjs
var SearchAlert = [
  ["circle", { cx: "11", cy: "11", r: "8" }],
  ["path", { d: "m21 21-4.3-4.3" }],
  ["path", { d: "M11 7v4" }],
  ["path", { d: "M11 15h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/search-check.mjs
var SearchCheck = [
  ["path", { d: "m8 11 2 2 4-4" }],
  ["circle", { cx: "11", cy: "11", r: "8" }],
  ["path", { d: "m21 21-4.3-4.3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/search-code.mjs
var SearchCode = [
  ["path", { d: "m13 13.5 2-2.5-2-2.5" }],
  ["path", { d: "m21 21-4.3-4.3" }],
  ["path", { d: "M9 8.5 7 11l2 2.5" }],
  ["circle", { cx: "11", cy: "11", r: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/search-slash.mjs
var SearchSlash = [
  ["path", { d: "m13.5 8.5-5 5" }],
  ["circle", { cx: "11", cy: "11", r: "8" }],
  ["path", { d: "m21 21-4.3-4.3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/search-x.mjs
var SearchX = [
  ["path", { d: "m13.5 8.5-5 5" }],
  ["path", { d: "m8.5 8.5 5 5" }],
  ["circle", { cx: "11", cy: "11", r: "8" }],
  ["path", { d: "m21 21-4.3-4.3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/search.mjs
var Search = [
  ["path", { d: "m21 21-4.34-4.34" }],
  ["circle", { cx: "11", cy: "11", r: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/section.mjs
var Section = [
  ["path", { d: "M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0" }],
  ["path", { d: "M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/send-horizontal.mjs
var SendHorizontal = [
  [
    "path",
    {
      d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
    }
  ],
  ["path", { d: "M6 12h16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/send-to-back.mjs
var SendToBack = [
  ["rect", { x: "14", y: "14", width: "8", height: "8", rx: "2" }],
  ["rect", { x: "2", y: "2", width: "8", height: "8", rx: "2" }],
  ["path", { d: "M7 14v1a2 2 0 0 0 2 2h1" }],
  ["path", { d: "M14 7h1a2 2 0 0 1 2 2v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/send.mjs
var Send = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/separator-horizontal.mjs
var SeparatorHorizontal = [
  ["path", { d: "m16 16-4 4-4-4" }],
  ["path", { d: "M3 12h18" }],
  ["path", { d: "m8 8 4-4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/separator-vertical.mjs
var SeparatorVertical = [
  ["path", { d: "M12 3v18" }],
  ["path", { d: "m16 16 4-4-4-4" }],
  ["path", { d: "m8 8-4 4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/server-cog.mjs
var ServerCog = [
  ["path", { d: "m10.852 14.772-.383.923" }],
  ["path", { d: "M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923" }],
  ["path", { d: "m13.148 9.228.383-.923" }],
  ["path", { d: "m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544" }],
  ["path", { d: "m14.772 10.852.923-.383" }],
  ["path", { d: "m14.772 13.148.923.383" }],
  ["path", { d: "M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5" }],
  ["path", { d: "M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5" }],
  ["path", { d: "M6 18h.01" }],
  ["path", { d: "M6 6h.01" }],
  ["path", { d: "m9.228 10.852-.923-.383" }],
  ["path", { d: "m9.228 13.148-.923.383" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/server-crash.mjs
var ServerCrash = [
  ["path", { d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" }],
  ["path", { d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" }],
  ["path", { d: "M6 6h.01" }],
  ["path", { d: "M6 18h.01" }],
  ["path", { d: "m13 6-4 6h6l-4 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/server-off.mjs
var ServerOff = [
  ["path", { d: "M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5" }],
  ["path", { d: "M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z" }],
  ["path", { d: "M22 17v-1a2 2 0 0 0-2-2h-1" }],
  ["path", { d: "M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z" }],
  ["path", { d: "M6 18h.01" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/server.mjs
var Server = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/settings-2.mjs
var Settings2 = [
  ["path", { d: "M14 17H5" }],
  ["path", { d: "M19 7h-9" }],
  ["circle", { cx: "17", cy: "17", r: "3" }],
  ["circle", { cx: "7", cy: "7", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/settings.mjs
var Settings = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shapes.mjs
var Shapes = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/share.mjs
var Share = [
  ["path", { d: "M12 2v13" }],
  ["path", { d: "m16 6-4-4-4 4" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/share-2.mjs
var Share2 = [
  ["circle", { cx: "18", cy: "5", r: "3" }],
  ["circle", { cx: "6", cy: "12", r: "3" }],
  ["circle", { cx: "18", cy: "19", r: "3" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sheet.mjs
var Sheet = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["line", { x1: "3", x2: "21", y1: "9", y2: "9" }],
  ["line", { x1: "3", x2: "21", y1: "15", y2: "15" }],
  ["line", { x1: "9", x2: "9", y1: "9", y2: "21" }],
  ["line", { x1: "15", x2: "15", y1: "9", y2: "21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shell.mjs
var Shell = [
  [
    "path",
    {
      d: "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shelving-unit.mjs
var ShelvingUnit = [
  ["path", { d: "M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" }],
  ["path", { d: "M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" }],
  ["path", { d: "M20 22V2" }],
  ["path", { d: "M4 12h16" }],
  ["path", { d: "M4 20h16" }],
  ["path", { d: "M4 2v20" }],
  ["path", { d: "M4 4h16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-alert.mjs
var ShieldAlert = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "M12 8v4" }],
  ["path", { d: "M12 16h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-ban.mjs
var ShieldBan = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "m4.243 5.21 14.39 12.472" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-check.mjs
var ShieldCheck = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-cog-corner.mjs
var ShieldCogCorner = [
  [
    "path",
    {
      d: "M11 22c-3.806-1.45-7-3.966-7-9V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v4"
    }
  ],
  ["path", { d: "M14.923 16.547 14 16.164" }],
  ["path", { d: "m14.923 18.843-.923.383" }],
  ["path", { d: "M16.547 14.923 16.164 14" }],
  ["path", { d: "m16.547 20.467-.383.924" }],
  ["path", { d: "m18.843 14.923.383-.923" }],
  ["path", { d: "m19.225 21.391-.382-.924" }],
  ["path", { d: "m20.467 16.547.923-.383" }],
  ["path", { d: "m20.467 18.843.923.383" }],
  ["circle", { cx: "17.695", cy: "17.695", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-cog.mjs
var ShieldCog = [
  ["path", { d: "m10.929 14.467-.383.924" }],
  ["path", { d: "M10.929 8.923 10.546 8" }],
  ["path", { d: "M13.225 8.923 13.608 8" }],
  ["path", { d: "m13.607 15.391-.382-.924" }],
  ["path", { d: "m14.849 10.547.923-.383" }],
  ["path", { d: "m14.849 12.843.923.383" }],
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "m9.305 10.547-.923-.383" }],
  ["path", { d: "m9.305 12.843-.923.383" }],
  ["circle", { cx: "12.077", cy: "11.695", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-ellipsis.mjs
var ShieldEllipsis = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "M8 12h.01" }],
  ["path", { d: "M12 12h.01" }],
  ["path", { d: "M16 12h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-half.mjs
var ShieldHalf = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "M12 22V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-minus.mjs
var ShieldMinus = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "M9 12h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-plus.mjs
var ShieldPlus = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "M9 12h6" }],
  ["path", { d: "M12 9v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-off.mjs
var ShieldOff = [
  ["path", { d: "m2 2 20 20" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-question-mark.mjs
var ShieldQuestionMark = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" }],
  ["path", { d: "M12 17h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-user.mjs
var ShieldUser = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "M6.376 18.91a6 6 0 0 1 11.249.003" }],
  ["circle", { cx: "12", cy: "11", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield-x.mjs
var ShieldX = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ],
  ["path", { d: "m14.5 9.5-5 5" }],
  ["path", { d: "m9.5 9.5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shield.mjs
var Shield = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ship-wheel.mjs
var ShipWheel = [
  ["circle", { cx: "12", cy: "12", r: "8" }],
  ["path", { d: "M12 2v7.5" }],
  ["path", { d: "m19 5-5.23 5.23" }],
  ["path", { d: "M22 12h-7.5" }],
  ["path", { d: "m19 19-5.23-5.23" }],
  ["path", { d: "M12 14.5V22" }],
  ["path", { d: "M10.23 13.77 5 19" }],
  ["path", { d: "M9.5 12H2" }],
  ["path", { d: "M10.23 10.23 5 5" }],
  ["circle", { cx: "12", cy: "12", r: "2.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ship.mjs
var Ship = [
  ["path", { d: "M12 10.189V14" }],
  ["path", { d: "M12 2v3" }],
  ["path", { d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" }],
  [
    "path",
    {
      d: "M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"
    }
  ],
  [
    "path",
    {
      d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shirt.mjs
var Shirt = [
  [
    "path",
    {
      d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shopping-bag.mjs
var ShoppingBag = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0" }],
  ["path", { d: "M3.103 6.034h17.794" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shopping-basket.mjs
var ShoppingBasket = [
  ["path", { d: "m15 11-1 9" }],
  ["path", { d: "m19 11-4-7" }],
  ["path", { d: "M2 11h20" }],
  ["path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" }],
  ["path", { d: "M4.5 15.5h15" }],
  ["path", { d: "m5 11 4-7" }],
  ["path", { d: "m9 11 1 9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shovel.mjs
var Shovel = [
  [
    "path",
    {
      d: "M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z"
    }
  ],
  [
    "path",
    {
      d: "M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z"
    }
  ],
  ["path", { d: "m9 15 7.879-7.878" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shower-head.mjs
var ShowerHead = [
  ["path", { d: "m4 4 2.5 2.5" }],
  ["path", { d: "M13.5 6.5a4.95 4.95 0 0 0-7 7" }],
  ["path", { d: "M15 5 5 15" }],
  ["path", { d: "M14 17v.01" }],
  ["path", { d: "M10 16v.01" }],
  ["path", { d: "M13 13v.01" }],
  ["path", { d: "M16 10v.01" }],
  ["path", { d: "M11 20v.01" }],
  ["path", { d: "M17 14v.01" }],
  ["path", { d: "M20 11v.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shopping-cart.mjs
var ShoppingCart = [
  ["circle", { cx: "8", cy: "21", r: "1" }],
  ["circle", { cx: "19", cy: "21", r: "1" }],
  [
    "path",
    { d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shredder.mjs
var Shredder = [
  [
    "path",
    { d: "M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5" }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M10 22v-5" }],
  ["path", { d: "M14 19v-2" }],
  ["path", { d: "M18 20v-3" }],
  ["path", { d: "M2 13h20" }],
  ["path", { d: "M6 20v-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shrimp.mjs
var Shrimp = [
  ["path", { d: "M11 12h.01" }],
  ["path", { d: "M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" }],
  [
    "path",
    {
      d: "M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8"
    }
  ],
  ["path", { d: "M14 8a8.5 8.5 0 0 1 0 8" }],
  ["path", { d: "M16 16c2 0 4.5-4 4-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shrub.mjs
var Shrub = [
  ["path", { d: "M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5" }],
  ["path", { d: "M14.5 14.5 12 17" }],
  ["path", { d: "M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shuffle.mjs
var Shuffle = [
  ["path", { d: "m18 14 4 4-4 4" }],
  ["path", { d: "m18 2 4 4-4 4" }],
  ["path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" }],
  ["path", { d: "M2 6h1.972a4 4 0 0 1 3.6 2.2" }],
  ["path", { d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/shrink.mjs
var Shrink = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sigma.mjs
var Sigma = [
  [
    "path",
    {
      d: "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/signal-high.mjs
var SignalHigh = [
  ["path", { d: "M2 20h.01" }],
  ["path", { d: "M7 20v-4" }],
  ["path", { d: "M12 20v-8" }],
  ["path", { d: "M17 20V8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/signal-low.mjs
var SignalLow = [
  ["path", { d: "M2 20h.01" }],
  ["path", { d: "M7 20v-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/signal-zero.mjs
var SignalZero = [["path", { d: "M2 20h.01" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/signal-medium.mjs
var SignalMedium = [
  ["path", { d: "M2 20h.01" }],
  ["path", { d: "M7 20v-4" }],
  ["path", { d: "M12 20v-8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/signal.mjs
var Signal = [
  ["path", { d: "M2 20h.01" }],
  ["path", { d: "M7 20v-4" }],
  ["path", { d: "M12 20v-8" }],
  ["path", { d: "M17 20V8" }],
  ["path", { d: "M22 4v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/signature.mjs
var Signature = [
  [
    "path",
    {
      d: "m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"
    }
  ],
  ["path", { d: "M3 21h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/signpost-big.mjs
var SignpostBig = [
  ["path", { d: "M10 9H4L2 7l2-2h6" }],
  ["path", { d: "M14 5h6l2 2-2 2h-6" }],
  ["path", { d: "M10 22V4a2 2 0 1 1 4 0v18" }],
  ["path", { d: "M8 22h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/signpost.mjs
var Signpost = [
  ["path", { d: "M12 13v8" }],
  ["path", { d: "M12 3v3" }],
  [
    "path",
    {
      d: "M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/siren.mjs
var Siren = [
  ["path", { d: "M7 18v-6a5 5 0 1 1 10 0v6" }],
  ["path", { d: "M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" }],
  ["path", { d: "M21 12h1" }],
  ["path", { d: "M18.5 4.5 18 5" }],
  ["path", { d: "M2 12h1" }],
  ["path", { d: "M12 2v1" }],
  ["path", { d: "m4.929 4.929.707.707" }],
  ["path", { d: "M12 12v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/skip-back.mjs
var SkipBack = [
  [
    "path",
    {
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"
    }
  ],
  ["path", { d: "M3 20V4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/skip-forward.mjs
var SkipForward = [
  ["path", { d: "M21 4v16" }],
  [
    "path",
    { d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/skull.mjs
var Skull = [
  ["path", { d: "m12.5 17-.5-1-.5 1h1z" }],
  [
    "path",
    {
      d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"
    }
  ],
  ["circle", { cx: "15", cy: "12", r: "1" }],
  ["circle", { cx: "9", cy: "12", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/slash.mjs
var Slash = [["path", { d: "M22 2 2 22" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/slice.mjs
var Slice = [
  [
    "path",
    {
      d: "M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sliders-horizontal.mjs
var SlidersHorizontal = [
  ["path", { d: "M10 5H3" }],
  ["path", { d: "M12 19H3" }],
  ["path", { d: "M14 3v4" }],
  ["path", { d: "M16 17v4" }],
  ["path", { d: "M21 12h-9" }],
  ["path", { d: "M21 19h-5" }],
  ["path", { d: "M21 5h-7" }],
  ["path", { d: "M8 10v4" }],
  ["path", { d: "M8 12H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sliders-vertical.mjs
var SlidersVertical = [
  ["path", { d: "M10 8h4" }],
  ["path", { d: "M12 21v-9" }],
  ["path", { d: "M12 8V3" }],
  ["path", { d: "M17 16h4" }],
  ["path", { d: "M19 12V3" }],
  ["path", { d: "M19 21v-5" }],
  ["path", { d: "M3 14h4" }],
  ["path", { d: "M5 10V3" }],
  ["path", { d: "M5 21v-7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/smartphone-charging.mjs
var SmartphoneCharging = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
  ["path", { d: "M12.667 8 10 12h4l-2.667 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/smartphone-nfc.mjs
var SmartphoneNfc = [
  ["rect", { width: "7", height: "12", x: "2", y: "6", rx: "1" }],
  ["path", { d: "M13 8.32a7.43 7.43 0 0 1 0 7.36" }],
  ["path", { d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58" }],
  ["path", { d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/smartphone.mjs
var Smartphone = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
  ["path", { d: "M12 18h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/smile.mjs
var Smile = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/smile-plus.mjs
var SmilePlus = [
  ["path", { d: "M22 11v1a10 10 0 1 1-9-10" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
  ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
  ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }],
  ["path", { d: "M16 5h6" }],
  ["path", { d: "M19 2v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/snail.mjs
var Snail = [
  ["path", { d: "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" }],
  ["circle", { cx: "10", cy: "13", r: "8" }],
  ["path", { d: "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" }],
  ["path", { d: "M18 3 19.1 5.2" }],
  ["path", { d: "M22 3 20.9 5.2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/snowflake.mjs
var Snowflake = [
  ["path", { d: "m10 20-1.25-2.5L6 18" }],
  ["path", { d: "M10 4 8.75 6.5 6 6" }],
  ["path", { d: "m14 20 1.25-2.5L18 18" }],
  ["path", { d: "m14 4 1.25 2.5L18 6" }],
  ["path", { d: "m17 21-3-6h-4" }],
  ["path", { d: "m17 3-3 6 1.5 3" }],
  ["path", { d: "M2 12h6.5L10 9" }],
  ["path", { d: "m20 10-1.5 2 1.5 2" }],
  ["path", { d: "M22 12h-6.5L14 15" }],
  ["path", { d: "m4 10 1.5 2L4 14" }],
  ["path", { d: "m7 21 3-6-1.5-3" }],
  ["path", { d: "m7 3 3 6h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/soap-dispenser-droplet.mjs
var SoapDispenserDroplet = [
  ["path", { d: "M10.5 2v4" }],
  ["path", { d: "M14 2H7a2 2 0 0 0-2 2" }],
  [
    "path",
    {
      d: "M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19"
    }
  ],
  ["path", { d: "M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sofa.mjs
var Sofa = [
  ["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" }],
  [
    "path",
    {
      d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"
    }
  ],
  ["path", { d: "M4 18v2" }],
  ["path", { d: "M20 18v2" }],
  ["path", { d: "M12 4v9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/solar-panel.mjs
var SolarPanel = [
  ["path", { d: "M11 2h2" }],
  ["path", { d: "m14.28 14-4.56 8" }],
  ["path", { d: "m21 22-1.558-4H4.558" }],
  ["path", { d: "M3 10v2" }],
  [
    "path",
    {
      d: "M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z"
    }
  ],
  ["path", { d: "M7 2a4 4 0 0 1-4 4" }],
  ["path", { d: "m8.66 7.66 1.41 1.41" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/soup.mjs
var Soup = [
  ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" }],
  ["path", { d: "M7 21h10" }],
  ["path", { d: "M19.5 12 22 6" }],
  ["path", { d: "M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62" }],
  ["path", { d: "M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62" }],
  ["path", { d: "M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/space.mjs
var Space = [["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/spade.mjs
var Spade = [
  ["path", { d: "M12 18v4" }],
  [
    "path",
    {
      d: "M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sparkle.mjs
var Sparkle = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sparkles.mjs
var Sparkles = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
    }
  ],
  ["path", { d: "M20 2v4" }],
  ["path", { d: "M22 4h-4" }],
  ["circle", { cx: "4", cy: "20", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/speaker.mjs
var Speaker = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
  ["path", { d: "M12 6h.01" }],
  ["circle", { cx: "12", cy: "14", r: "4" }],
  ["path", { d: "M12 14h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/speech.mjs
var Speech = [
  [
    "path",
    {
      d: "M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"
    }
  ],
  ["path", { d: "M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" }],
  ["path", { d: "M17 15a3.5 3.5 0 0 0-.025-4.975" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/spell-check-2.mjs
var SpellCheck2 = [
  ["path", { d: "m6 16 6-12 6 12" }],
  ["path", { d: "M8 12h8" }],
  [
    "path",
    {
      d: "M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/spell-check.mjs
var SpellCheck = [
  ["path", { d: "m6 16 6-12 6 12" }],
  ["path", { d: "M8 12h8" }],
  ["path", { d: "m16 20 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/spline-pointer.mjs
var SplinePointer = [
  [
    "path",
    {
      d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"
    }
  ],
  ["path", { d: "M5 17A12 12 0 0 1 17 5" }],
  ["circle", { cx: "19", cy: "5", r: "2" }],
  ["circle", { cx: "5", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/split.mjs
var Split = [
  ["path", { d: "M16 3h5v5" }],
  ["path", { d: "M8 3H3v5" }],
  ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" }],
  ["path", { d: "m15 9 6-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/spline.mjs
var Spline = [
  ["circle", { cx: "19", cy: "5", r: "2" }],
  ["circle", { cx: "5", cy: "19", r: "2" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/spool.mjs
var Spool = [
  [
    "path",
    {
      d: "M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66"
    }
  ],
  [
    "path",
    {
      d: "m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sport-shoe.mjs
var SportShoe = [
  ["path", { d: "m15 10.42 4.8-5.07" }],
  ["path", { d: "M19 18h3" }],
  [
    "path",
    {
      d: "M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/spotlight.mjs
var Spotlight = [
  ["path", { d: "M15.295 19.562 16 22" }],
  ["path", { d: "m17 16 3.758 2.098" }],
  ["path", { d: "m19 12.5 3.026-.598" }],
  [
    "path",
    {
      d: "M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z"
    }
  ],
  ["path", { d: "M8 9V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/spray-can.mjs
var SprayCan = [
  ["path", { d: "M3 3h.01" }],
  ["path", { d: "M7 5h.01" }],
  ["path", { d: "M11 7h.01" }],
  ["path", { d: "M3 7h.01" }],
  ["path", { d: "M7 9h.01" }],
  ["path", { d: "M3 11h.01" }],
  ["rect", { width: "4", height: "4", x: "15", y: "5" }],
  ["path", { d: "m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2" }],
  ["path", { d: "m13 14 8-2" }],
  ["path", { d: "m13 19 8-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sprout.mjs
var Sprout = [
  [
    "path",
    {
      d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"
    }
  ],
  ["path", { d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" }],
  ["path", { d: "M5 21h14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-activity.mjs
var SquareActivity = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M17 12h-2l-2 5-2-10-2 5H7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-down-left.mjs
var SquareArrowDownLeft = [
  ["path", { d: "M15 15H9l6-6" }],
  ["path", { d: "M9 15V9" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-down-right.mjs
var SquareArrowDownRight = [
  ["path", { d: "M15 15 9 9" }],
  ["path", { d: "M9 15h6V9" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-down.mjs
var SquareArrowDown = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M12 8v8" }],
  ["path", { d: "m8 12 4 4 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-left.mjs
var SquareArrowLeft = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "m12 8-4 4 4 4" }],
  ["path", { d: "M16 12H8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-out-down-left.mjs
var SquareArrowOutDownLeft = [
  ["path", { d: "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6" }],
  ["path", { d: "m3 21 9-9" }],
  ["path", { d: "M9 21H3v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-out-down-right.mjs
var SquareArrowOutDownRight = [
  ["path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }],
  ["path", { d: "m21 21-9-9" }],
  ["path", { d: "M21 15v6h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-out-up-left.mjs
var SquareArrowOutUpLeft = [
  ["path", { d: "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" }],
  ["path", { d: "m3 3 9 9" }],
  ["path", { d: "M3 9V3h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-out-up-right.mjs
var SquareArrowOutUpRight = [
  ["path", { d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" }],
  ["path", { d: "m21 3-9 9" }],
  ["path", { d: "M15 3h6v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-right-enter.mjs
var SquareArrowRightEnter = [
  ["path", { d: "m10 16 4-4-4-4" }],
  ["path", { d: "M3 12h11" }],
  ["path", { d: "M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-right-exit.mjs
var SquareArrowRightExit = [
  ["path", { d: "M10 12h11" }],
  ["path", { d: "m17 16 4-4-4-4" }],
  [
    "path",
    { d: "M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-right.mjs
var SquareArrowRight = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M8 12h8" }],
  ["path", { d: "m12 16 4-4-4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-up-left.mjs
var SquareArrowUpLeft = [
  ["path", { d: "M15 15 9 9" }],
  ["path", { d: "M9 15V9h6" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-up.mjs
var SquareArrowUp = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "m16 12-4-4-4 4" }],
  ["path", { d: "M12 16V8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-arrow-up-right.mjs
var SquareArrowUpRight = [
  ["path", { d: "M15 15V9H9" }],
  ["path", { d: "m9 15 6-6" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-asterisk.mjs
var SquareAsterisk = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M12 8v8" }],
  ["path", { d: "m8.5 14 7-4" }],
  ["path", { d: "m8.5 10 7 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-bottom-dashed-scissors.mjs
var SquareBottomDashedScissors = [
  ["line", { x1: "5", y1: "3", x2: "19", y2: "3" }],
  ["line", { x1: "3", y1: "5", x2: "3", y2: "19" }],
  ["line", { x1: "21", y1: "5", x2: "21", y2: "19" }],
  ["line", { x1: "9", y1: "21", x2: "10", y2: "21" }],
  ["line", { x1: "14", y1: "21", x2: "15", y2: "21" }],
  ["path", { d: "M 3 5 A2 2 0 0 1 5 3" }],
  ["path", { d: "M 19 3 A2 2 0 0 1 21 5" }],
  ["path", { d: "M 5 21 A2 2 0 0 1 3 19" }],
  ["path", { d: "M 21 19 A2 2 0 0 1 19 21" }],
  ["circle", { cx: "8.5", cy: "8.5", r: "1.5" }],
  ["line", { x1: "9.56066", y1: "9.56066", x2: "12", y2: "12" }],
  ["line", { x1: "17", y1: "17", x2: "14.82", y2: "14.82" }],
  ["circle", { cx: "8.5", cy: "15.5", r: "1.5" }],
  ["line", { x1: "9.56066", y1: "14.43934", x2: "17", y2: "7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-centerline-dashed-horizontal.mjs
var SquareCenterlineDashedHorizontal = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" }],
  ["path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" }],
  ["path", { d: "M12 20v2" }],
  ["path", { d: "M12 14v2" }],
  ["path", { d: "M12 8v2" }],
  ["path", { d: "M12 2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-centerline-dashed-vertical.mjs
var SquareCenterlineDashedVertical = [
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" }],
  ["path", { d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" }],
  ["path", { d: "M4 12H2" }],
  ["path", { d: "M10 12H8" }],
  ["path", { d: "M16 12h-2" }],
  ["path", { d: "M22 12h-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-chart-gantt.mjs
var SquareChartGantt = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M9 8h7" }],
  ["path", { d: "M8 12h6" }],
  ["path", { d: "M11 16h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-check-big.mjs
var SquareCheckBig = [
  ["path", { d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344" }],
  ["path", { d: "m9 11 3 3L22 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-check.mjs
var SquareCheck = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "m9 12 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-chevron-down.mjs
var SquareChevronDown = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "m16 10-4 4-4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-chevron-left.mjs
var SquareChevronLeft = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "m14 16-4-4 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-chevron-right.mjs
var SquareChevronRight = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "m10 8 4 4-4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-code.mjs
var SquareCode = [
  ["path", { d: "m10 9-3 3 3 3" }],
  ["path", { d: "m14 15 3-3-3-3" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-chevron-up.mjs
var SquareChevronUp = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "m8 14 4-4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-dashed-bottom-code.mjs
var SquareDashedBottomCode = [
  ["path", { d: "M10 9.5 8 12l2 2.5" }],
  ["path", { d: "M14 21h1" }],
  ["path", { d: "m14 9.5 2 2.5-2 2.5" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" }],
  ["path", { d: "M9 21h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-dashed-bottom.mjs
var SquareDashedBottom = [
  ["path", { d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" }],
  ["path", { d: "M9 21h1" }],
  ["path", { d: "M14 21h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-dashed-kanban.mjs
var SquareDashedKanban = [
  ["path", { d: "M8 7v7" }],
  ["path", { d: "M12 7v4" }],
  ["path", { d: "M16 7v9" }],
  ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
  ["path", { d: "M9 3h1" }],
  ["path", { d: "M14 3h1" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
  ["path", { d: "M21 9v1" }],
  ["path", { d: "M21 14v1" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
  ["path", { d: "M14 21h1" }],
  ["path", { d: "M9 21h1" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
  ["path", { d: "M3 14v1" }],
  ["path", { d: "M3 9v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-dashed-mouse-pointer.mjs
var SquareDashedMousePointer = [
  [
    "path",
    {
      d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"
    }
  ],
  ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
  ["path", { d: "M9 3h1" }],
  ["path", { d: "M9 21h2" }],
  ["path", { d: "M14 3h1" }],
  ["path", { d: "M3 9v1" }],
  ["path", { d: "M21 9v2" }],
  ["path", { d: "M3 14v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-dashed-text.mjs
var SquareDashedText = [
  ["path", { d: "M14 21h1" }],
  ["path", { d: "M14 3h1" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
  ["path", { d: "M21 14v1" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
  ["path", { d: "M21 9v1" }],
  ["path", { d: "M3 14v1" }],
  ["path", { d: "M3 9v1" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
  ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
  ["path", { d: "M7 12h10" }],
  ["path", { d: "M7 16h6" }],
  ["path", { d: "M7 8h8" }],
  ["path", { d: "M9 21h1" }],
  ["path", { d: "M9 3h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-dashed-top-solid.mjs
var SquareDashedTopSolid = [
  ["path", { d: "M14 21h1" }],
  ["path", { d: "M21 14v1" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
  ["path", { d: "M21 9v1" }],
  ["path", { d: "M3 14v1" }],
  ["path", { d: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" }],
  ["path", { d: "M3 9v1" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
  ["path", { d: "M9 21h1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-dashed.mjs
var SquareDashed = [
  ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
  ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
  ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
  ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
  ["path", { d: "M9 3h1" }],
  ["path", { d: "M9 21h1" }],
  ["path", { d: "M14 3h1" }],
  ["path", { d: "M14 21h1" }],
  ["path", { d: "M3 9v1" }],
  ["path", { d: "M21 9v1" }],
  ["path", { d: "M3 14v1" }],
  ["path", { d: "M21 14v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-divide.mjs
var SquareDivide = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }],
  ["line", { x1: "12", x2: "12", y1: "16", y2: "16" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-dot.mjs
var SquareDot = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["circle", { cx: "12", cy: "12", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-equal.mjs
var SquareEqual = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M7 10h10" }],
  ["path", { d: "M7 14h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-function.mjs
var SquareFunction = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["path", { d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" }],
  ["path", { d: "M9 11.2h5.7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-kanban.mjs
var SquareKanban = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M8 7v7" }],
  ["path", { d: "M12 7v4" }],
  ["path", { d: "M16 7v9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-library.mjs
var SquareLibrary = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M7 7v10" }],
  ["path", { d: "M11 7v10" }],
  ["path", { d: "m15 7 2 10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-m.mjs
var SquareM = [
  [
    "path",
    { d: "M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16" }
  ],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-menu.mjs
var SquareMenu = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M7 8h10" }],
  ["path", { d: "M7 12h10" }],
  ["path", { d: "M7 16h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-minus.mjs
var SquareMinus = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M8 12h8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-parking-off.mjs
var SquareParkingOff = [
  ["path", { d: "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41" }],
  ["path", { d: "M3 8.7V19a2 2 0 0 0 2 2h10.3" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M13 13a3 3 0 1 0 0-6H9v2" }],
  ["path", { d: "M9 17v-2.3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-mouse-pointer.mjs
var SquareMousePointer = [
  [
    "path",
    {
      d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"
    }
  ],
  ["path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-parking.mjs
var SquareParking = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M9 17V7h4a3 3 0 0 1 0 6H9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-pause.mjs
var SquarePause = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["line", { x1: "10", x2: "10", y1: "15", y2: "9" }],
  ["line", { x1: "14", x2: "14", y1: "15", y2: "9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-pen.mjs
var SquarePen = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-percent.mjs
var SquarePercent = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "m15 9-6 6" }],
  ["path", { d: "M9 9h.01" }],
  ["path", { d: "M15 15h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-pi.mjs
var SquarePi = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M7 7h10" }],
  ["path", { d: "M10 7v10" }],
  ["path", { d: "M16 17a2 2 0 0 1-2-2V7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-pilcrow.mjs
var SquarePilcrow = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M12 12H9.5a2.5 2.5 0 0 1 0-5H17" }],
  ["path", { d: "M12 7v10" }],
  ["path", { d: "M16 7v10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-play.mjs
var SquarePlay = [
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }],
  [
    "path",
    {
      d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-plus.mjs
var SquarePlus = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M8 12h8" }],
  ["path", { d: "M12 8v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-power.mjs
var SquarePower = [
  ["path", { d: "M12 7v4" }],
  ["path", { d: "M7.998 9.003a5 5 0 1 0 8-.005" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-round-corner.mjs
var SquareRoundCorner = [
  ["path", { d: "M21 11a8 8 0 0 0-8-8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-radical.mjs
var SquareRadical = [
  ["path", { d: "M7 12h2l2 5 2-10h4" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-scissors.mjs
var SquareScissors = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["circle", { cx: "8.5", cy: "8.5", r: "1.5" }],
  ["line", { x1: "9.56066", y1: "9.56066", x2: "12", y2: "12" }],
  ["line", { x1: "17", y1: "17", x2: "14.82", y2: "14.82" }],
  ["circle", { cx: "8.5", cy: "15.5", r: "1.5" }],
  ["line", { x1: "9.56066", y1: "14.43934", x2: "17", y2: "7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-sigma.mjs
var SquareSigma = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M16 8.9V7H8l4 5-4 5h8v-1.9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-slash.mjs
var SquareSlash = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["line", { x1: "9", x2: "15", y1: "15", y2: "9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-split-horizontal.mjs
var SquareSplitHorizontal = [
  ["path", { d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" }],
  ["path", { d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" }],
  ["line", { x1: "12", x2: "12", y1: "4", y2: "20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-split-vertical.mjs
var SquareSplitVertical = [
  ["path", { d: "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" }],
  ["path", { d: "M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-square.mjs
var SquareSquare = [
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-stack.mjs
var SquareStack = [
  ["path", { d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" }],
  ["path", { d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" }],
  ["rect", { width: "8", height: "8", x: "14", y: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-star.mjs
var SquareStar = [
  [
    "path",
    {
      d: "M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"
    }
  ],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-stop.mjs
var SquareStop = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-terminal.mjs
var SquareTerminal = [
  ["path", { d: "m7 11 2-2-2-2" }],
  ["path", { d: "M11 13h4" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-user.mjs
var SquareUser = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["circle", { cx: "12", cy: "10", r: "3" }],
  ["path", { d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-user-round.mjs
var SquareUserRound = [
  ["path", { d: "M18 21a6 6 0 0 0-12 0" }],
  ["circle", { cx: "12", cy: "11", r: "4" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square-x.mjs
var SquareX = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
  ["path", { d: "m15 9-6 6" }],
  ["path", { d: "m9 9 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/squares-exclude.mjs
var SquaresExclude = [
  [
    "path",
    {
      d: "M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0"
    }
  ],
  [
    "path",
    {
      d: "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/square.mjs
var Square = [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/squares-intersect.mjs
var SquaresIntersect = [
  ["path", { d: "M10 22a2 2 0 0 1-2-2" }],
  ["path", { d: "M14 2a2 2 0 0 1 2 2" }],
  ["path", { d: "M16 22h-2" }],
  ["path", { d: "M2 10V8" }],
  ["path", { d: "M2 4a2 2 0 0 1 2-2" }],
  ["path", { d: "M20 8a2 2 0 0 1 2 2" }],
  ["path", { d: "M22 14v2" }],
  ["path", { d: "M22 20a2 2 0 0 1-2 2" }],
  ["path", { d: "M4 16a2 2 0 0 1-2-2" }],
  ["path", { d: "M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z" }],
  ["path", { d: "M8 2h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/squares-subtract.mjs
var SquaresSubtract = [
  ["path", { d: "M10 22a2 2 0 0 1-2-2" }],
  ["path", { d: "M16 22h-2" }],
  [
    "path",
    {
      d: "M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z"
    }
  ],
  ["path", { d: "M20 8a2 2 0 0 1 2 2" }],
  ["path", { d: "M22 14v2" }],
  ["path", { d: "M22 20a2 2 0 0 1-2 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/squares-unite.mjs
var SquaresUnite = [
  [
    "path",
    {
      d: "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/squircle-dashed.mjs
var SquircleDashed = [
  ["path", { d: "M13.77 3.043a34 34 0 0 0-3.54 0" }],
  ["path", { d: "M13.771 20.956a33 33 0 0 1-3.541.001" }],
  ["path", { d: "M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44" }],
  ["path", { d: "M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438" }],
  ["path", { d: "M20.957 10.23a33 33 0 0 1 0 3.54" }],
  ["path", { d: "M3.043 10.23a34 34 0 0 0 .001 3.541" }],
  ["path", { d: "M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438" }],
  ["path", { d: "M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/squircle.mjs
var Squircle = [
  ["path", { d: "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/stamp.mjs
var Stamp = [
  ["path", { d: "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13" }],
  [
    "path",
    {
      d: "M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"
    }
  ],
  ["path", { d: "M5 22h14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/squirrel.mjs
var Squirrel = [
  ["path", { d: "M15.236 22a3 3 0 0 0-2.2-5" }],
  ["path", { d: "M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4" }],
  ["path", { d: "M18 13h.01" }],
  [
    "path",
    {
      d: "M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/star-check.mjs
var StarCheck = [
  [
    "path",
    {
      d: "m19.06 12.501 2.78-2.707a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014"
    }
  ],
  ["path", { d: "m15 18 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/star-half.mjs
var StarHalf = [
  [
    "path",
    {
      d: "M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/star-minus.mjs
var StarMinus = [
  ["path", { d: "M15 18h6" }],
  [
    "path",
    {
      d: "M17.688 14a2.1 2.1 0 0 1 .416-.568l3.736-3.638a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/star-plus.mjs
var StarPlus = [
  [
    "path",
    {
      d: "M11.013 18.582 6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904L20 11.5"
    }
  ],
  ["path", { d: "M15 18h6" }],
  ["path", { d: "M18 15v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/star-off.mjs
var StarOff = [
  [
    "path",
    {
      d: "m10.344 4.688 1.181-2.393a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.237 3.152"
    }
  ],
  [
    "path",
    {
      d: "m17.945 17.945.43 2.505a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a8 8 0 0 0 .4-.099"
    }
  ],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/star-x.mjs
var StarX = [
  ["path", { d: "m15.5 15.5 5 5" }],
  [
    "path",
    {
      d: "m20.063 11.525 1.777-1.731a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428a2.1 2.1 0 0 1 .987-.243 2 2 0 0 1 .132.004"
    }
  ],
  ["path", { d: "m20.5 15.5-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/star.mjs
var Star = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/step-back.mjs
var StepBack = [
  [
    "path",
    {
      d: "M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"
    }
  ],
  ["path", { d: "M21 20V4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/step-forward.mjs
var StepForward = [
  [
    "path",
    { d: "M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" }
  ],
  ["path", { d: "M3 4v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/stethoscope.mjs
var Stethoscope = [
  ["path", { d: "M11 2v2" }],
  ["path", { d: "M5 2v2" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3" }],
  ["circle", { cx: "20", cy: "10", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sticker.mjs
var Sticker = [
  [
    "path",
    {
      d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
    }
  ],
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M8 13h.01" }],
  ["path", { d: "M16 13h.01" }],
  ["path", { d: "M10 16s.8 1 2 1c1.3 0 2-1 2-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sticky-note-check.mjs
var StickyNoteCheck = [
  ["path", { d: "m15 19 2 2 4-4" }],
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    {
      d: "M21 13V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6.5"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sticky-note-minus.mjs
var StickyNoteMinus = [
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    {
      d: "M21 14V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.35"
    }
  ],
  ["path", { d: "M21 18h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sticky-note-off.mjs
var StickyNoteOff = [
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M3.586 3.586A2 2 0 0 0 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.414-.586" }],
  ["path", { d: "M8.656 3H15a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 21 9v6.344" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sticky-note-x.mjs
var StickyNoteX = [
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "m16 16 5 5" }],
  [
    "path",
    {
      d: "M21 12V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"
    }
  ],
  ["path", { d: "m21 16-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sticky-note-plus.mjs
var StickyNotePlus = [
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5" }],
  ["path", { d: "M18 15v6" }],
  [
    "path",
    {
      d: "M21 12.356V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.355"
    }
  ],
  ["path", { d: "M21 18h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sticky-note.mjs
var StickyNote = [
  [
    "path",
    {
      d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
    }
  ],
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sticky-notes.mjs
var StickyNotes = [
  [
    "path",
    {
      d: "M10 8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 16 14v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"
    }
  ],
  ["path", { d: "M10 8v5a1 1 0 0 0 1 1h5" }],
  [
    "path",
    {
      d: "M8 4a2 2 0 0 1 2-2h6a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 22 8v6a2 2 0 0 1-2 2"
    }
  ],
  ["path", { d: "M16 2v5a1 1 0 0 0 1 1h5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/stone.mjs
var Stone = [
  [
    "path",
    {
      d: "M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z"
    }
  ],
  ["path", { d: "M11.99 22 14 12l7.822 3.184" }],
  ["path", { d: "M14 12 8.47 2.302" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/store.mjs
var Store = [
  ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" }],
  [
    "path",
    {
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"
    }
  ],
  ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/stretch-horizontal.mjs
var StretchHorizontal = [
  ["rect", { width: "20", height: "6", x: "2", y: "4", rx: "2" }],
  ["rect", { width: "20", height: "6", x: "2", y: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/strikethrough.mjs
var Strikethrough = [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/subscript.mjs
var Subscript = [
  ["path", { d: "m4 5 8 8" }],
  ["path", { d: "m12 5-8 8" }],
  [
    "path",
    {
      d: "M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/stretch-vertical.mjs
var StretchVertical = [
  ["rect", { width: "6", height: "20", x: "4", y: "2", rx: "2" }],
  ["rect", { width: "6", height: "20", x: "14", y: "2", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/summary.mjs
var Summary = [
  ["path", { d: "M15 4H7" }],
  ["path", { d: "m18 16 3 3-3 3" }],
  ["path", { d: "M3 4v13a2 2 0 0 0 2 2h16" }],
  ["path", { d: "M7 14h7" }],
  ["path", { d: "M7 9h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sun-dim.mjs
var SunDim = [
  ["circle", { cx: "12", cy: "12", r: "4" }],
  ["path", { d: "M12 4h.01" }],
  ["path", { d: "M20 12h.01" }],
  ["path", { d: "M12 20h.01" }],
  ["path", { d: "M4 12h.01" }],
  ["path", { d: "M17.657 6.343h.01" }],
  ["path", { d: "M17.657 17.657h.01" }],
  ["path", { d: "M6.343 17.657h.01" }],
  ["path", { d: "M6.343 6.343h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sun-medium.mjs
var SunMedium = [
  ["circle", { cx: "12", cy: "12", r: "4" }],
  ["path", { d: "M12 3v1" }],
  ["path", { d: "M12 20v1" }],
  ["path", { d: "M3 12h1" }],
  ["path", { d: "M20 12h1" }],
  ["path", { d: "m18.364 5.636-.707.707" }],
  ["path", { d: "m6.343 17.657-.707.707" }],
  ["path", { d: "m5.636 5.636.707.707" }],
  ["path", { d: "m17.657 17.657.707.707" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sun-moon.mjs
var SunMoon = [
  ["path", { d: "M12 2v2" }],
  [
    "path",
    {
      d: "M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"
    }
  ],
  ["path", { d: "M16 12a4 4 0 0 0-4-4" }],
  ["path", { d: "m19 5-1.256 1.256" }],
  ["path", { d: "M20 12h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sun-snow.mjs
var SunSnow = [
  ["path", { d: "M10 21v-1" }],
  ["path", { d: "M10 4V3" }],
  ["path", { d: "M10 9a3 3 0 0 0 0 6" }],
  ["path", { d: "m14 20 1.25-2.5L18 18" }],
  ["path", { d: "m14 4 1.25 2.5L18 6" }],
  ["path", { d: "m17 21-3-6 1.5-3H22" }],
  ["path", { d: "m17 3-3 6 1.5 3" }],
  ["path", { d: "M2 12h1" }],
  ["path", { d: "m20 10-1.5 2 1.5 2" }],
  ["path", { d: "m3.64 18.36.7-.7" }],
  ["path", { d: "m4.34 6.34-.7-.7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sun.mjs
var Sun = [
  ["circle", { cx: "12", cy: "12", r: "4" }],
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M12 20v2" }],
  ["path", { d: "m4.93 4.93 1.41 1.41" }],
  ["path", { d: "m17.66 17.66 1.41 1.41" }],
  ["path", { d: "M2 12h2" }],
  ["path", { d: "M20 12h2" }],
  ["path", { d: "m6.34 17.66-1.41 1.41" }],
  ["path", { d: "m19.07 4.93-1.41 1.41" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sunrise.mjs
var Sunrise = [
  ["path", { d: "M12 2v8" }],
  ["path", { d: "m4.93 10.93 1.41 1.41" }],
  ["path", { d: "M2 18h2" }],
  ["path", { d: "M20 18h2" }],
  ["path", { d: "m19.07 10.93-1.41 1.41" }],
  ["path", { d: "M22 22H2" }],
  ["path", { d: "m8 6 4-4 4 4" }],
  ["path", { d: "M16 18a4 4 0 0 0-8 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sunset.mjs
var Sunset = [
  ["path", { d: "M12 10V2" }],
  ["path", { d: "m4.93 10.93 1.41 1.41" }],
  ["path", { d: "M2 18h2" }],
  ["path", { d: "M20 18h2" }],
  ["path", { d: "m19.07 10.93-1.41 1.41" }],
  ["path", { d: "M22 22H2" }],
  ["path", { d: "m16 6-4 4-4-4" }],
  ["path", { d: "M16 18a4 4 0 0 0-8 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/superscript.mjs
var Superscript = [
  ["path", { d: "m4 19 8-8" }],
  ["path", { d: "m12 19-8-8" }],
  [
    "path",
    {
      d: "M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/swatch-book.mjs
var SwatchBook = [
  ["path", { d: "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z" }],
  ["path", { d: "M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7" }],
  ["path", { d: "M 7 17h.01" }],
  [
    "path",
    { d: "m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8" }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/swiss-franc.mjs
var SwissFranc = [
  ["path", { d: "M10 21V3h8" }],
  ["path", { d: "M6 16h9" }],
  ["path", { d: "M10 9.5h7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/switch-camera.mjs
var SwitchCamera = [
  ["path", { d: "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" }],
  ["path", { d: "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" }],
  ["circle", { cx: "12", cy: "12", r: "3" }],
  ["path", { d: "m18 22-3-3 3-3" }],
  ["path", { d: "m6 2 3 3-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/sword.mjs
var Sword = [
  ["path", { d: "m11 19-6-6" }],
  ["path", { d: "m5 21-2-2" }],
  ["path", { d: "m8 16-4 4" }],
  ["path", { d: "M9.5 17.5 21 6V3h-3L6.5 14.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/swords.mjs
var Swords = [
  ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5" }],
  ["line", { x1: "13", x2: "19", y1: "19", y2: "13" }],
  ["line", { x1: "16", x2: "20", y1: "16", y2: "20" }],
  ["line", { x1: "19", x2: "21", y1: "21", y2: "19" }],
  ["polyline", { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5" }],
  ["line", { x1: "5", x2: "9", y1: "14", y2: "18" }],
  ["line", { x1: "7", x2: "4", y1: "17", y2: "20" }],
  ["line", { x1: "3", x2: "5", y1: "19", y2: "21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/syringe.mjs
var Syringe = [
  ["path", { d: "m18 2 4 4" }],
  ["path", { d: "m17 7 3-3" }],
  ["path", { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" }],
  ["path", { d: "m9 11 4 4" }],
  ["path", { d: "m5 19-3 3" }],
  ["path", { d: "m14 4 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/table-2.mjs
var Table2 = [
  [
    "path",
    {
      d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/table-cells-merge.mjs
var TableCellsMerge = [
  ["path", { d: "M12 21v-6" }],
  ["path", { d: "M12 9V3" }],
  ["path", { d: "M3 15h18" }],
  ["path", { d: "M3 9h18" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/table-cells-split.mjs
var TableCellsSplit = [
  ["path", { d: "M12 15V9" }],
  ["path", { d: "M3 15h18" }],
  ["path", { d: "M3 9h18" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/table-columns-split.mjs
var TableColumnsSplit = [
  ["path", { d: "M14 14v2" }],
  ["path", { d: "M14 20v2" }],
  ["path", { d: "M14 2v2" }],
  ["path", { d: "M14 8v2" }],
  ["path", { d: "M2 15h8" }],
  ["path", { d: "M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2" }],
  ["path", { d: "M2 9h8" }],
  ["path", { d: "M22 15h-4" }],
  ["path", { d: "M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" }],
  ["path", { d: "M22 9h-4" }],
  ["path", { d: "M5 3v18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/table-of-contents.mjs
var TableOfContents = [
  ["path", { d: "M16 5H3" }],
  ["path", { d: "M16 12H3" }],
  ["path", { d: "M16 19H3" }],
  ["path", { d: "M21 5h.01" }],
  ["path", { d: "M21 12h.01" }],
  ["path", { d: "M21 19h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/table-properties.mjs
var TableProperties = [
  ["path", { d: "M15 3v18" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M21 9H3" }],
  ["path", { d: "M21 15H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/table-rows-split.mjs
var TableRowsSplit = [
  ["path", { d: "M14 10h2" }],
  ["path", { d: "M15 22v-8" }],
  ["path", { d: "M15 2v4" }],
  ["path", { d: "M2 10h2" }],
  ["path", { d: "M20 10h2" }],
  ["path", { d: "M3 19h18" }],
  ["path", { d: "M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6" }],
  ["path", { d: "M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2" }],
  ["path", { d: "M8 10h2" }],
  ["path", { d: "M9 22v-8" }],
  ["path", { d: "M9 2v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/table.mjs
var Table = [
  ["path", { d: "M12 3v18" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M3 9h18" }],
  ["path", { d: "M3 15h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tablet-smartphone.mjs
var TabletSmartphone = [
  ["rect", { width: "10", height: "14", x: "3", y: "8", rx: "2" }],
  ["path", { d: "M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" }],
  ["path", { d: "M8 18h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tablet.mjs
var Tablet = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2" }],
  ["line", { x1: "12", x2: "12.01", y1: "18", y2: "18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tablets.mjs
var Tablets = [
  ["circle", { cx: "7", cy: "7", r: "5" }],
  ["circle", { cx: "17", cy: "17", r: "5" }],
  ["path", { d: "M12 17h10" }],
  ["path", { d: "m3.46 10.54 7.08-7.08" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tag-plus.mjs
var TagPlus = [
  ["path", { d: "M16 13h6" }],
  [
    "path",
    {
      d: "m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l1.79-1.79"
    }
  ],
  ["path", { d: "M19 10v6" }],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tag.mjs
var Tag = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tag-x.mjs
var TagX = [
  [
    "path",
    {
      d: "m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.43 2.43 0 0 0 3.42 0l1.79-1.79"
    }
  ],
  ["path", { d: "m16.5 10.5 5 5" }],
  ["path", { d: "m21.5 10.5-5 5" }],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tags.mjs
var Tags = [
  [
    "path",
    {
      d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"
    }
  ],
  ["path", { d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193" }],
  ["circle", { cx: "10.5", cy: "6.5", r: ".5", fill: "currentColor" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tally-1.mjs
var Tally1 = [["path", { d: "M4 4v16" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tally-2.mjs
var Tally2 = [
  ["path", { d: "M4 4v16" }],
  ["path", { d: "M9 4v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tally-3.mjs
var Tally3 = [
  ["path", { d: "M4 4v16" }],
  ["path", { d: "M9 4v16" }],
  ["path", { d: "M14 4v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tally-4.mjs
var Tally4 = [
  ["path", { d: "M4 4v16" }],
  ["path", { d: "M9 4v16" }],
  ["path", { d: "M14 4v16" }],
  ["path", { d: "M19 4v16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tally-5.mjs
var Tally5 = [
  ["path", { d: "M4 4v16" }],
  ["path", { d: "M9 4v16" }],
  ["path", { d: "M14 4v16" }],
  ["path", { d: "M19 4v16" }],
  ["path", { d: "M22 6 2 18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tangent.mjs
var Tangent = [
  ["circle", { cx: "17", cy: "4", r: "2" }],
  ["path", { d: "M15.59 5.41 5.41 15.59" }],
  ["circle", { cx: "4", cy: "17", r: "2" }],
  ["path", { d: "M12 22s-4-9-1.5-11.5S22 12 22 12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/target.mjs
var Target = [
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["circle", { cx: "12", cy: "12", r: "6" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/telescope.mjs
var Telescope = [
  [
    "path",
    {
      d: "m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"
    }
  ],
  ["path", { d: "m13.56 11.747 4.332-.924" }],
  ["path", { d: "m16 21-3.105-6.21" }],
  [
    "path",
    {
      d: "M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"
    }
  ],
  ["path", { d: "m6.158 8.633 1.114 4.456" }],
  ["path", { d: "m8 21 3.105-6.21" }],
  ["circle", { cx: "12", cy: "13", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tent-tree.mjs
var TentTree = [
  ["circle", { cx: "4", cy: "4", r: "2" }],
  ["path", { d: "m14 5 3-3 3 3" }],
  ["path", { d: "m14 10 3-3 3 3" }],
  ["path", { d: "M17 14V2" }],
  ["path", { d: "M17 14H7l-5 8h20Z" }],
  ["path", { d: "M8 14v8" }],
  ["path", { d: "m9 14 5 8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tent.mjs
var Tent = [
  ["path", { d: "M3.5 21 14 3" }],
  ["path", { d: "M20.5 21 10 3" }],
  ["path", { d: "M15.5 21 12 15l-3.5 6" }],
  ["path", { d: "M2 21h20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/terminal.mjs
var Terminal = [
  ["path", { d: "M12 19h8" }],
  ["path", { d: "m4 17 6-6-6-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/test-tube.mjs
var TestTube = [
  ["path", { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" }],
  ["path", { d: "M8.5 2h7" }],
  ["path", { d: "M14.5 16h-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/test-tube-diagonal.mjs
var TestTubeDiagonal = [
  ["path", { d: "M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3" }],
  ["path", { d: "m16 2 6 6" }],
  ["path", { d: "M12 16H4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/test-tubes.mjs
var TestTubes = [
  ["path", { d: "M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2" }],
  ["path", { d: "M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2" }],
  ["path", { d: "M3 2h7" }],
  ["path", { d: "M14 2h7" }],
  ["path", { d: "M9 16H4" }],
  ["path", { d: "M20 16h-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-align-center.mjs
var TextAlignCenter = [
  ["path", { d: "M21 5H3" }],
  ["path", { d: "M17 12H7" }],
  ["path", { d: "M19 19H5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-align-end.mjs
var TextAlignEnd = [
  ["path", { d: "M21 5H3" }],
  ["path", { d: "M21 12H9" }],
  ["path", { d: "M21 19H7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-align-justify.mjs
var TextAlignJustify = [
  ["path", { d: "M3 5h18" }],
  ["path", { d: "M3 12h18" }],
  ["path", { d: "M3 19h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-align-start.mjs
var TextAlignStart = [
  ["path", { d: "M21 5H3" }],
  ["path", { d: "M15 12H3" }],
  ["path", { d: "M17 19H3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-cursor-input.mjs
var TextCursorInput = [
  ["path", { d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6" }],
  ["path", { d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" }],
  ["path", { d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" }],
  ["path", { d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1" }],
  ["path", { d: "M9 6v12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-cursor.mjs
var TextCursor = [
  ["path", { d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" }],
  ["path", { d: "M7 22h1a4 4 0 0 0 4-4" }],
  ["path", { d: "M7 2h1a4 4 0 0 1 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-initial.mjs
var TextInitial = [
  ["path", { d: "M15 5h6" }],
  ["path", { d: "M15 12h6" }],
  ["path", { d: "M3 19h18" }],
  ["path", { d: "m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12" }],
  ["path", { d: "M3.92 10h6.16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-quote.mjs
var TextQuote = [
  ["path", { d: "M17 5H3" }],
  ["path", { d: "M21 12H8" }],
  ["path", { d: "M21 19H8" }],
  ["path", { d: "M3 12v7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-search.mjs
var TextSearch = [
  ["path", { d: "M21 5H3" }],
  ["path", { d: "M10 12H3" }],
  ["path", { d: "M10 19H3" }],
  ["circle", { cx: "17", cy: "15", r: "3" }],
  ["path", { d: "m21 19-1.9-1.9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/theater.mjs
var Theater = [
  ["path", { d: "M2 10s3-3 3-8" }],
  ["path", { d: "M22 10s-3-3-3-8" }],
  ["path", { d: "M10 2c0 4.4-3.6 8-8 8" }],
  ["path", { d: "M14 2c0 4.4 3.6 8 8 8" }],
  ["path", { d: "M2 10s2 2 2 5" }],
  ["path", { d: "M22 10s-2 2-2 5" }],
  ["path", { d: "M8 15h8" }],
  ["path", { d: "M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" }],
  ["path", { d: "M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/text-wrap.mjs
var TextWrap = [
  ["path", { d: "m16 16-3 3 3 3" }],
  ["path", { d: "M3 12h14.5a1 1 0 0 1 0 7H13" }],
  ["path", { d: "M3 19h6" }],
  ["path", { d: "M3 5h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/thermometer-snowflake.mjs
var ThermometerSnowflake = [
  ["path", { d: "m10 20-1.25-2.5L6 18" }],
  ["path", { d: "M10 4 8.75 6.5 6 6" }],
  ["path", { d: "M10.585 15H10" }],
  ["path", { d: "M2 12h6.5L10 9" }],
  ["path", { d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" }],
  ["path", { d: "m4 10 1.5 2L4 14" }],
  ["path", { d: "m7 21 3-6-1.5-3" }],
  ["path", { d: "m7 3 3 6h2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/thermometer-sun.mjs
var ThermometerSun = [
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M12 8a4 4 0 0 0-1.645 7.647" }],
  ["path", { d: "M2 12h2" }],
  ["path", { d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" }],
  ["path", { d: "m4.93 4.93 1.41 1.41" }],
  ["path", { d: "m6.34 17.66-1.41 1.41" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/thermometer.mjs
var Thermometer = [["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/thumbs-down.mjs
var ThumbsDown = [
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"
    }
  ],
  ["path", { d: "M17 14V2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/thumbs-up.mjs
var ThumbsUp = [
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
    }
  ],
  ["path", { d: "M7 10v12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ticket-check.mjs
var TicketCheck = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ticket-minus.mjs
var TicketMinus = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
    }
  ],
  ["path", { d: "M9 12h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ticket-percent.mjs
var TicketPercent = [
  [
    "path",
    {
      d: "M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
    }
  ],
  ["path", { d: "M9 9h.01" }],
  ["path", { d: "m15 9-6 6" }],
  ["path", { d: "M15 15h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ticket-plus.mjs
var TicketPlus = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
    }
  ],
  ["path", { d: "M9 12h6" }],
  ["path", { d: "M12 9v6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ticket-slash.mjs
var TicketSlash = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
    }
  ],
  ["path", { d: "m9.5 14.5 5-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ticket-x.mjs
var TicketX = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
    }
  ],
  ["path", { d: "m9.5 14.5 5-5" }],
  ["path", { d: "m9.5 9.5 5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ticket.mjs
var Ticket = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
    }
  ],
  ["path", { d: "M13 5v2" }],
  ["path", { d: "M13 17v2" }],
  ["path", { d: "M13 11v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tickets-plane.mjs
var TicketsPlane = [
  ["path", { d: "M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12" }],
  ["path", { d: "m12 13.5 3.794.506" }],
  ["path", { d: "m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" }],
  ["path", { d: "M6 10V8" }],
  ["path", { d: "M6 14v1" }],
  ["path", { d: "M6 19v2" }],
  ["rect", { x: "2", y: "8", width: "20", height: "13", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tickets.mjs
var Tickets = [
  ["path", { d: "m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" }],
  ["path", { d: "M6 10V8" }],
  ["path", { d: "M6 14v1" }],
  ["path", { d: "M6 19v2" }],
  ["rect", { x: "2", y: "8", width: "20", height: "13", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/timeline.mjs
var Timeline = [
  ["path", { d: "M4 12h.01" }],
  ["path", { d: "M4 16h.01" }],
  ["path", { d: "M4 20h.01" }],
  ["path", { d: "M4 4h.01" }],
  ["path", { d: "M4 8h.01" }],
  [
    "path",
    {
      d: "M9.414 13.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 12z"
    }
  ],
  [
    "path",
    {
      d: "M9.414 21.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 20z"
    }
  ],
  [
    "path",
    {
      d: "M9.414 5.414A2 2 0 0 0 10.828 6H19a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 4z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/timer.mjs
var Timer = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11" }],
  ["circle", { cx: "12", cy: "14", r: "8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/timer-off.mjs
var TimerOff = [
  ["path", { d: "M10 2h4" }],
  ["path", { d: "M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7" }],
  ["path", { d: "M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M12 12v-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/timer-reset.mjs
var TimerReset = [
  ["path", { d: "M10 2h4" }],
  ["path", { d: "M12 14v-4" }],
  ["path", { d: "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" }],
  ["path", { d: "M9 17H4v5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/toggle-left.mjs
var ToggleLeft = [
  ["circle", { cx: "9", cy: "12", r: "3" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/toggle-right.mjs
var ToggleRight = [
  ["circle", { cx: "15", cy: "12", r: "3" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/toilet.mjs
var Toilet = [
  [
    "path",
    {
      d: "M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"
    }
  ],
  ["path", { d: "M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tool-case.mjs
var ToolCase = [
  ["path", { d: "M10 15h4" }],
  [
    "path",
    {
      d: "m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27"
    }
  ],
  [
    "path",
    {
      d: "m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122"
    }
  ],
  ["path", { d: "M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/toolbox.mjs
var Toolbox = [
  ["path", { d: "M16 12v4" }],
  [
    "path",
    {
      d: "M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z"
    }
  ],
  ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" }],
  ["path", { d: "M2 14h20" }],
  ["path", { d: "M8 12v4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tornado.mjs
var Tornado = [
  ["path", { d: "M21 4H3" }],
  ["path", { d: "M18 8H6" }],
  ["path", { d: "M19 12H9" }],
  ["path", { d: "M16 16h-6" }],
  ["path", { d: "M11 20H9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/torus.mjs
var Torus = [
  ["ellipse", { cx: "12", cy: "11", rx: "3", ry: "2" }],
  ["ellipse", { cx: "12", cy: "12.5", rx: "10", ry: "8.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/touchpad-off.mjs
var TouchpadOff = [
  ["path", { d: "M12 20v-6" }],
  ["path", { d: "M19.656 14H22" }],
  ["path", { d: "M2 14h12" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" }],
  ["path", { d: "M9.656 4H20a2 2 0 0 1 2 2v10.344" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/touchpad.mjs
var Touchpad = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
  ["path", { d: "M2 14h20" }],
  ["path", { d: "M12 20v-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/towel-rack.mjs
var TowelRack = [
  ["path", { d: "M22 7h-2" }],
  [
    "path",
    {
      d: "M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4"
    }
  ],
  ["path", { d: "M9 7H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tower-control.mjs
var TowerControl = [
  ["path", { d: "M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" }],
  ["path", { d: "M8 13v9" }],
  ["path", { d: "M16 22v-9" }],
  ["path", { d: "m9 6 1 7" }],
  ["path", { d: "m15 6-1 7" }],
  ["path", { d: "M12 6V2" }],
  ["path", { d: "M13 2h-2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/toy-brick.mjs
var ToyBrick = [
  ["rect", { width: "18", height: "12", x: "3", y: "8", rx: "1" }],
  ["path", { d: "M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" }],
  ["path", { d: "M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tractor.mjs
var Tractor = [
  ["path", { d: "m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20" }],
  ["path", { d: "M16 18h-5" }],
  ["path", { d: "M18 5a1 1 0 0 0-1 1v5.573" }],
  ["path", { d: "M3 4h8.129a1 1 0 0 1 .99.863L13 11.246" }],
  ["path", { d: "M4 11V4" }],
  ["path", { d: "M7 15h.01" }],
  ["path", { d: "M8 10.1V4" }],
  ["circle", { cx: "18", cy: "18", r: "2" }],
  ["circle", { cx: "7", cy: "15", r: "5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/traffic-cone.mjs
var TrafficCone = [
  ["path", { d: "M16.05 10.966a5 2.5 0 0 1-8.1 0" }],
  [
    "path",
    {
      d: "m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04"
    }
  ],
  ["path", { d: "M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z" }],
  ["path", { d: "M9.194 6.57a5 2.5 0 0 0 5.61 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/train-front-tunnel.mjs
var TrainFrontTunnel = [
  ["path", { d: "M2 22V12a10 10 0 1 1 20 0v10" }],
  ["path", { d: "M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8" }],
  ["path", { d: "M10 15h.01" }],
  ["path", { d: "M14 15h.01" }],
  ["path", { d: "M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z" }],
  ["path", { d: "m9 19-2 3" }],
  ["path", { d: "m15 19 2 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/train-front.mjs
var TrainFront = [
  ["path", { d: "M8 3.1V7a4 4 0 0 0 8 0V3.1" }],
  ["path", { d: "m9 15-1-1" }],
  ["path", { d: "m15 15 1-1" }],
  ["path", { d: "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" }],
  ["path", { d: "m8 19-2 3" }],
  ["path", { d: "m16 19 2 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/train-track.mjs
var TrainTrack = [
  ["path", { d: "M2 17 17 2" }],
  ["path", { d: "m2 14 8 8" }],
  ["path", { d: "m5 11 8 8" }],
  ["path", { d: "m8 8 8 8" }],
  ["path", { d: "m11 5 8 8" }],
  ["path", { d: "m14 2 8 8" }],
  ["path", { d: "M7 22 22 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tram-front.mjs
var TramFront = [
  ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2" }],
  ["path", { d: "M4 11h16" }],
  ["path", { d: "M12 3v8" }],
  ["path", { d: "m8 19-2 3" }],
  ["path", { d: "m18 22-2-3" }],
  ["path", { d: "M8 15h.01" }],
  ["path", { d: "M16 15h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/transgender.mjs
var Transgender = [
  ["path", { d: "M12 16v6" }],
  ["path", { d: "M14 20h-4" }],
  ["path", { d: "M18 2h4v4" }],
  ["path", { d: "m2 2 7.17 7.17" }],
  ["path", { d: "M2 5.355V2h3.357" }],
  ["path", { d: "m22 2-7.17 7.17" }],
  ["path", { d: "M8 5 5 8" }],
  ["circle", { cx: "12", cy: "12", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/trash-2.mjs
var Trash2 = [
  ["path", { d: "M10 11v6" }],
  ["path", { d: "M14 11v6" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
  ["path", { d: "M3 6h18" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/trash.mjs
var Trash = [
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
  ["path", { d: "M3 6h18" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tree-deciduous.mjs
var TreeDeciduous = [
  [
    "path",
    {
      d: "M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"
    }
  ],
  ["path", { d: "M12 19v3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tree-palm.mjs
var TreePalm = [
  ["path", { d: "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" }],
  ["path", { d: "M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" }],
  [
    "path",
    {
      d: "M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"
    }
  ],
  ["path", { d: "M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tree-pine.mjs
var TreePine = [
  [
    "path",
    {
      d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"
    }
  ],
  ["path", { d: "M12 22v-3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/trending-down.mjs
var TrendingDown = [
  ["path", { d: "M16 17h6v-6" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/trees.mjs
var Trees = [
  ["path", { d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" }],
  ["path", { d: "M7 16v6" }],
  ["path", { d: "M13 19v3" }],
  [
    "path",
    {
      d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/trending-up-down.mjs
var TrendingUpDown = [
  ["path", { d: "M14.828 14.828 21 21" }],
  ["path", { d: "M21 16v5h-5" }],
  ["path", { d: "m21 3-9 9-4-4-6 6" }],
  ["path", { d: "M21 8V3h-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/trending-up.mjs
var TrendingUp = [
  ["path", { d: "M16 7h6v6" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/triangle-alert.mjs
var TriangleAlert = [
  ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }],
  ["path", { d: "M12 9v4" }],
  ["path", { d: "M12 17h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/triangle-dashed.mjs
var TriangleDashed = [
  ["path", { d: "M10.17 4.193a2 2 0 0 1 3.666.013" }],
  ["path", { d: "M14 21h2" }],
  ["path", { d: "m15.874 7.743 1 1.732" }],
  ["path", { d: "m18.849 12.952 1 1.732" }],
  ["path", { d: "M21.824 18.18a2 2 0 0 1-1.835 2.824" }],
  ["path", { d: "M4.024 21a2 2 0 0 1-1.839-2.839" }],
  ["path", { d: "m5.136 12.952-1 1.732" }],
  ["path", { d: "M8 21h2" }],
  ["path", { d: "m8.102 7.743-1 1.732" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/triangle-right.mjs
var TriangleRight = [
  ["path", { d: "M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/triangle.mjs
var Triangle = [
  ["path", { d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/trophy.mjs
var Trophy = [
  ["path", { d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" }],
  ["path", { d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" }],
  ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18" }],
  ["path", { d: "M4 22h16" }],
  ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" }],
  ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/truck-electric.mjs
var TruckElectric = [
  ["path", { d: "M14 19V7a2 2 0 0 0-2-2H9" }],
  ["path", { d: "M15 19H9" }],
  ["path", { d: "M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14" }],
  ["path", { d: "M2 13v5a1 1 0 0 0 1 1h2" }],
  ["path", { d: "M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02" }],
  ["circle", { cx: "17", cy: "19", r: "2" }],
  ["circle", { cx: "7", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/truck.mjs
var Truck = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" }],
  ["path", { d: "M15 18H9" }],
  [
    "path",
    { d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" }
  ],
  ["circle", { cx: "17", cy: "18", r: "2" }],
  ["circle", { cx: "7", cy: "18", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/turkish-lira.mjs
var TurkishLira = [
  ["path", { d: "M15 4 5 9" }],
  ["path", { d: "m15 8.5-10 5" }],
  ["path", { d: "M18 12a9 9 0 0 1-9 9V3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/turntable.mjs
var Turntable = [
  ["path", { d: "M10 12.01h.01" }],
  ["path", { d: "M18 8v4a8 8 0 0 1-1.07 4" }],
  ["circle", { cx: "10", cy: "12", r: "4" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/turtle.mjs
var Turtle = [
  [
    "path",
    {
      d: "m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"
    }
  ],
  ["path", { d: "M4.82 7.9 8 10" }],
  ["path", { d: "M15.18 7.9 12 10" }],
  ["path", { d: "M16.93 10H20a2 2 0 0 1 0 4H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tv-minimal-play.mjs
var TvMinimalPlay = [
  [
    "path",
    {
      d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"
    }
  ],
  ["path", { d: "M7 21h10" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tv-minimal.mjs
var TvMinimal = [
  ["path", { d: "M7 21h10" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/tv.mjs
var Tv = [
  ["path", { d: "m17 2-5 5-5-5" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/type-outline.mjs
var TypeOutline = [
  [
    "path",
    {
      d: "M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/type.mjs
var Type = [
  ["path", { d: "M12 4v16" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" }],
  ["path", { d: "M9 20h6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/umbrella-off.mjs
var UmbrellaOff = [
  ["path", { d: "M12 13v7a2 2 0 0 0 4 0" }],
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/umbrella.mjs
var Umbrella = [
  ["path", { d: "M12 13v7a2 2 0 0 0 4 0" }],
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/underline.mjs
var Underline = [
  ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4" }],
  ["line", { x1: "4", x2: "20", y1: "20", y2: "20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/undo-dot.mjs
var UndoDot = [
  ["path", { d: "M21 17a9 9 0 0 0-15-6.7L3 13" }],
  ["path", { d: "M3 7v6h6" }],
  ["circle", { cx: "12", cy: "17", r: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/undo-2.mjs
var Undo2 = [
  ["path", { d: "M9 14 4 9l5-5" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/undo.mjs
var Undo = [
  ["path", { d: "M3 7v6h6" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/unfold-horizontal.mjs
var UnfoldHorizontal = [
  ["path", { d: "M16 12h6" }],
  ["path", { d: "M8 12H2" }],
  ["path", { d: "M12 2v2" }],
  ["path", { d: "M12 8v2" }],
  ["path", { d: "M12 14v2" }],
  ["path", { d: "M12 20v2" }],
  ["path", { d: "m19 15 3-3-3-3" }],
  ["path", { d: "m5 9-3 3 3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/unfold-vertical.mjs
var UnfoldVertical = [
  ["path", { d: "M12 22v-6" }],
  ["path", { d: "M12 8V2" }],
  ["path", { d: "M4 12H2" }],
  ["path", { d: "M10 12H8" }],
  ["path", { d: "M16 12h-2" }],
  ["path", { d: "M22 12h-2" }],
  ["path", { d: "m15 19-3 3-3-3" }],
  ["path", { d: "m15 5-3-3-3 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/ungroup.mjs
var Ungroup = [
  ["rect", { x: "11", y: "14", width: "10", height: "7", rx: "2" }],
  ["rect", { x: "3", y: "3", width: "10", height: "7", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/university.mjs
var University = [
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3" }],
  ["path", { d: "M18 12h.01" }],
  ["path", { d: "M18 16h.01" }],
  [
    "path",
    {
      d: "M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"
    }
  ],
  ["path", { d: "M6 12h.01" }],
  ["path", { d: "M6 16h.01" }],
  ["circle", { cx: "12", cy: "10", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/unlink.mjs
var Unlink = [
  [
    "path",
    {
      d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"
    }
  ],
  [
    "path",
    { d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" }
  ],
  ["line", { x1: "8", x2: "8", y1: "2", y2: "5" }],
  ["line", { x1: "2", x2: "5", y1: "8", y2: "8" }],
  ["line", { x1: "16", x2: "16", y1: "19", y2: "22" }],
  ["line", { x1: "19", x2: "22", y1: "16", y2: "16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/unlink-2.mjs
var Unlink2 = [["path", { d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/unplug.mjs
var Unplug = [
  ["path", { d: "m19 5 3-3" }],
  ["path", { d: "m2 22 3-3" }],
  ["path", { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" }],
  ["path", { d: "M7.5 13.5 10 11" }],
  ["path", { d: "M10.5 16.5 13 14" }],
  ["path", { d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/upload.mjs
var Upload = [
  ["path", { d: "M12 3v12" }],
  ["path", { d: "m17 8-5-5-5 5" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/usb.mjs
var Usb = [
  ["circle", { cx: "10", cy: "7", r: "1" }],
  ["circle", { cx: "4", cy: "20", r: "1" }],
  ["path", { d: "M4.7 19.3 19 5" }],
  ["path", { d: "m21 3-3 1 2 2Z" }],
  ["path", { d: "M9.26 7.68 5 12l2 5" }],
  ["path", { d: "m10 14 5 2 3.5-3.5" }],
  ["path", { d: "m18 12 1-1 1 1-1 1Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-check.mjs
var UserCheck = [
  ["path", { d: "m16 11 2 2 4-4" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
  ["circle", { cx: "9", cy: "7", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-cog.mjs
var UserCog = [
  ["path", { d: "M10 15H6a4 4 0 0 0-4 4v2" }],
  ["path", { d: "m14.305 16.53.923-.382" }],
  ["path", { d: "m15.228 13.852-.923-.383" }],
  ["path", { d: "m16.852 12.228-.383-.923" }],
  ["path", { d: "m16.852 17.772-.383.924" }],
  ["path", { d: "m19.148 12.228.383-.923" }],
  ["path", { d: "m19.53 18.696-.382-.924" }],
  ["path", { d: "m20.772 13.852.924-.383" }],
  ["path", { d: "m20.772 16.148.924.383" }],
  ["circle", { cx: "18", cy: "15", r: "3" }],
  ["circle", { cx: "9", cy: "7", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-key.mjs
var UserKey = [
  ["path", { d: "M20 11v6" }],
  ["path", { d: "M20 13h2" }],
  ["path", { d: "M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578" }],
  ["circle", { cx: "10", cy: "7", r: "4" }],
  ["circle", { cx: "20", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-lock.mjs
var UserLock = [
  ["path", { d: "M19 16v-2a2 2 0 0 0-4 0v2" }],
  ["path", { d: "M9.5 15H7a4 4 0 0 0-4 4v2" }],
  ["circle", { cx: "10", cy: "7", r: "4" }],
  ["rect", { x: "13", y: "16", width: "8", height: "5", rx: ".899" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-minus.mjs
var UserMinus = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
  ["circle", { cx: "9", cy: "7", r: "4" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-pen.mjs
var UserPen = [
  ["path", { d: "M11.5 15H7a4 4 0 0 0-4 4v2" }],
  [
    "path",
    {
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    }
  ],
  ["circle", { cx: "10", cy: "7", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-plus.mjs
var UserPlus = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
  ["circle", { cx: "9", cy: "7", r: "4" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-arrow-left.mjs
var UserRoundArrowLeft = [
  ["path", { d: "m19 16-3 3" }],
  ["path", { d: "M2 21a8 8 0 0 1 12.664-6.5" }],
  ["path", { d: "M22 19h-6l3 3" }],
  ["circle", { cx: "10", cy: "8", r: "5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-cog.mjs
var UserRoundCog = [
  ["path", { d: "m14.305 19.53.923-.382" }],
  ["path", { d: "m15.228 16.852-.923-.383" }],
  ["path", { d: "m16.852 15.228-.383-.923" }],
  ["path", { d: "m16.852 20.772-.383.924" }],
  ["path", { d: "m19.148 15.228.383-.923" }],
  ["path", { d: "m19.53 21.696-.382-.924" }],
  ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62" }],
  ["path", { d: "m20.772 16.852.924-.383" }],
  ["path", { d: "m20.772 19.148.924.383" }],
  ["circle", { cx: "10", cy: "8", r: "5" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-check.mjs
var UserRoundCheck = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6" }],
  ["circle", { cx: "10", cy: "8", r: "5" }],
  ["path", { d: "m16 19 2 2 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-key.mjs
var UserRoundKey = [
  ["path", { d: "M19 11v6" }],
  ["path", { d: "M19 13h2" }],
  ["path", { d: "M2 21a8 8 0 0 1 12.868-6.349" }],
  ["circle", { cx: "10", cy: "8", r: "5" }],
  ["circle", { cx: "19", cy: "19", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-minus.mjs
var UserRoundMinus = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6" }],
  ["circle", { cx: "10", cy: "8", r: "5" }],
  ["path", { d: "M22 19h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-pen.mjs
var UserRoundPen = [
  ["path", { d: "M2 21a8 8 0 0 1 10.821-7.487" }],
  [
    "path",
    {
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    }
  ],
  ["circle", { cx: "10", cy: "8", r: "5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-plus.mjs
var UserRoundPlus = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6" }],
  ["circle", { cx: "10", cy: "8", r: "5" }],
  ["path", { d: "M19 16v6" }],
  ["path", { d: "M22 19h-6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-search.mjs
var UserRoundSearch = [
  ["circle", { cx: "10", cy: "8", r: "5" }],
  ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62" }],
  ["circle", { cx: "18", cy: "18", r: "3" }],
  ["path", { d: "m22 22-1.9-1.9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round.mjs
var UserRound = [
  ["circle", { cx: "12", cy: "8", r: "5" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-round-x.mjs
var UserRoundX = [
  ["path", { d: "M2 21a8 8 0 0 1 11.873-7" }],
  ["circle", { cx: "10", cy: "8", r: "5" }],
  ["path", { d: "m17 17 5 5" }],
  ["path", { d: "m22 17-5 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-search.mjs
var UserSearch = [
  ["circle", { cx: "10", cy: "7", r: "4" }],
  ["path", { d: "M10.3 15H7a4 4 0 0 0-4 4v2" }],
  ["circle", { cx: "17", cy: "17", r: "3" }],
  ["path", { d: "m21 21-1.9-1.9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-star.mjs
var UserStar = [
  [
    "path",
    {
      d: "M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"
    }
  ],
  ["path", { d: "M8 15H7a4 4 0 0 0-4 4v2" }],
  ["circle", { cx: "10", cy: "7", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user-x.mjs
var UserX = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
  ["circle", { cx: "9", cy: "7", r: "4" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/user.mjs
var User = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
  ["circle", { cx: "12", cy: "7", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/users-round.mjs
var UsersRound = [
  ["path", { d: "M18 21a8 8 0 0 0-16 0" }],
  ["circle", { cx: "10", cy: "8", r: "5" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/users.mjs
var Users = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
  ["circle", { cx: "9", cy: "7", r: "4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/utensils-crossed.mjs
var UtensilsCrossed = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" }],
  ["path", { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" }],
  ["path", { d: "m2.1 21.8 6.4-6.3" }],
  ["path", { d: "m19 5-7 7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/utensils.mjs
var Utensils = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" }],
  ["path", { d: "M7 2v20" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/utility-pole.mjs
var UtilityPole = [
  ["path", { d: "M12 2v20" }],
  ["path", { d: "M2 5h20" }],
  ["path", { d: "M3 3v2" }],
  ["path", { d: "M7 3v2" }],
  ["path", { d: "M17 3v2" }],
  ["path", { d: "M21 3v2" }],
  ["path", { d: "m19 5-7 7-7-7" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/van.mjs
var Van = [
  [
    "path",
    {
      d: "M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3"
    }
  ],
  ["path", { d: "M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2" }],
  ["path", { d: "M9 18h5" }],
  ["circle", { cx: "16", cy: "18", r: "2" }],
  ["circle", { cx: "7", cy: "18", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/variable.mjs
var Variable = [
  ["path", { d: "M8 21s-4-3-4-9 4-9 4-9" }],
  ["path", { d: "M16 3s4 3 4 9-4 9-4 9" }],
  ["line", { x1: "15", x2: "9", y1: "9", y2: "15" }],
  ["line", { x1: "9", x2: "15", y1: "9", y2: "15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/vault.mjs
var Vault = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }],
  ["path", { d: "m7.9 7.9 2.7 2.7" }],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor" }],
  ["path", { d: "m13.4 10.6 2.7-2.7" }],
  ["circle", { cx: "7.5", cy: "16.5", r: ".5", fill: "currentColor" }],
  ["path", { d: "m7.9 16.1 2.7-2.7" }],
  ["circle", { cx: "16.5", cy: "16.5", r: ".5", fill: "currentColor" }],
  ["path", { d: "m13.4 13.4 2.7 2.7" }],
  ["circle", { cx: "12", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/vector-square.mjs
var VectorSquare = [
  ["path", { d: "M19.5 7a24 24 0 0 1 0 10" }],
  ["path", { d: "M4.5 7a24 24 0 0 0 0 10" }],
  ["path", { d: "M7 19.5a24 24 0 0 0 10 0" }],
  ["path", { d: "M7 4.5a24 24 0 0 1 10 0" }],
  ["rect", { x: "17", y: "17", width: "5", height: "5", rx: "1" }],
  ["rect", { x: "17", y: "2", width: "5", height: "5", rx: "1" }],
  ["rect", { x: "2", y: "17", width: "5", height: "5", rx: "1" }],
  ["rect", { x: "2", y: "2", width: "5", height: "5", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/vegan.mjs
var Vegan = [
  ["path", { d: "M16 8q6 0 6-6-6 0-6 6" }],
  ["path", { d: "M17.41 3.59a10 10 0 1 0 3 3" }],
  ["path", { d: "M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/venetian-mask.mjs
var VenetianMask = [
  ["path", { d: "M18 11c-1.5 0-2.5.5-3 2" }],
  [
    "path",
    {
      d: "M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z"
    }
  ],
  ["path", { d: "M6 11c1.5 0 2.5.5 3 2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/venus-and-mars.mjs
var VenusAndMars = [
  ["path", { d: "M10 20h4" }],
  ["path", { d: "M12 16v6" }],
  ["path", { d: "M17 2h4v4" }],
  ["path", { d: "m21 2-5.46 5.46" }],
  ["circle", { cx: "12", cy: "11", r: "5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/venus.mjs
var Venus = [
  ["path", { d: "M12 15v7" }],
  ["path", { d: "M9 19h6" }],
  ["circle", { cx: "12", cy: "9", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/vibrate-off.mjs
var VibrateOff = [
  ["path", { d: "m2 8 2 2-2 2 2 2-2 2" }],
  ["path", { d: "m22 8-2 2 2 2-2 2 2 2" }],
  ["path", { d: "M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2" }],
  ["path", { d: "M16 10.34V6c0-.55-.45-1-1-1h-4.34" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/vibrate.mjs
var Vibrate = [
  ["path", { d: "m2 8 2 2-2 2 2 2-2 2" }],
  ["path", { d: "m22 8-2 2 2 2-2 2 2 2" }],
  ["rect", { width: "8", height: "14", x: "8", y: "5", rx: "1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/video.mjs
var Video = [
  ["path", { d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/video-off.mjs
var VideoOff = [
  ["path", { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" }],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/videotape.mjs
var Videotape = [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
  ["path", { d: "M2 8h20" }],
  ["circle", { cx: "8", cy: "14", r: "2" }],
  ["path", { d: "M8 12h8" }],
  ["circle", { cx: "16", cy: "14", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/view.mjs
var View = [
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" }],
  ["path", { d: "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" }],
  ["circle", { cx: "12", cy: "12", r: "1" }],
  [
    "path",
    {
      d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/voicemail.mjs
var Voicemail = [
  ["circle", { cx: "6", cy: "12", r: "4" }],
  ["circle", { cx: "18", cy: "12", r: "4" }],
  ["line", { x1: "6", x2: "18", y1: "16", y2: "16" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/volleyball.mjs
var Volleyball = [
  ["path", { d: "M11 7a16 16 20 0 1 10.98 4.362" }],
  ["path", { d: "M12 12a13 13 0 0 1-8.66 5" }],
  ["path", { d: "M16.83 13.634a16 16 0 0 1-9.267 7.328" }],
  ["path", { d: "M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10" }],
  ["path", { d: "M8.17 15.366a16 16 0 0 1-1.713-11.69" }],
  ["circle", { cx: "12", cy: "12", r: "10" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/volume-1.mjs
var Volume1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/volume-2.mjs
var Volume2 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/volume-off.mjs
var VolumeOff = [
  ["path", { d: "M16 9a5 5 0 0 1 .95 2.293" }],
  ["path", { d: "M19.364 5.636a9 9 0 0 1 1.889 9.96" }],
  ["path", { d: "m2 2 20 20" }],
  [
    "path",
    {
      d: "m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"
    }
  ],
  ["path", { d: "M9.828 4.172A.686.686 0 0 1 11 4.657v.686" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/volume-x.mjs
var VolumeX = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/volume.mjs
var Volume = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/vote.mjs
var Vote = [
  ["path", { d: "m9 12 2 2 4-4" }],
  ["path", { d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" }],
  ["path", { d: "M22 19H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wallet-cards.mjs
var WalletCards = [
  ["path", { d: "M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21" }],
  ["path", { d: "M3 7h18" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wallet-minimal.mjs
var WalletMinimal = [
  ["path", { d: "M17 14h.01" }],
  ["path", { d: "M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wallet.mjs
var Wallet = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wallpaper.mjs
var Wallpaper = [
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M8 21h8" }],
  ["path", { d: "m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15" }],
  ["circle", { cx: "8", cy: "9", r: "2" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wand-sparkles.mjs
var WandSparkles = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"
    }
  ],
  ["path", { d: "m14 7 3 3" }],
  ["path", { d: "M5 6v4" }],
  ["path", { d: "M19 14v4" }],
  ["path", { d: "M10 2v2" }],
  ["path", { d: "M7 8H3" }],
  ["path", { d: "M21 16h-4" }],
  ["path", { d: "M11 3H9" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wand.mjs
var Wand = [
  ["path", { d: "M15 4V2" }],
  ["path", { d: "M15 16v-2" }],
  ["path", { d: "M8 9h2" }],
  ["path", { d: "M20 9h2" }],
  ["path", { d: "M17.8 11.8 19 13" }],
  ["path", { d: "M15 9h.01" }],
  ["path", { d: "M17.8 6.2 19 5" }],
  ["path", { d: "m3 21 9-9" }],
  ["path", { d: "M12.2 6.2 11 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/warehouse.mjs
var Warehouse = [
  ["path", { d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" }],
  [
    "path",
    {
      d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"
    }
  ],
  ["path", { d: "M6 13h12" }],
  ["path", { d: "M6 17h12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/watch.mjs
var Watch = [
  ["path", { d: "M12 10v2.2l1.6 1" }],
  ["path", { d: "m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" }],
  ["path", { d: "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" }],
  ["circle", { cx: "12", cy: "12", r: "6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/washing-machine.mjs
var WashingMachine = [
  ["path", { d: "M3 6h3" }],
  ["path", { d: "M17 6h.01" }],
  ["rect", { width: "18", height: "20", x: "3", y: "2", rx: "2" }],
  ["circle", { cx: "12", cy: "13", r: "5" }],
  ["path", { d: "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/waves-arrow-down.mjs
var WavesArrowDown = [
  ["path", { d: "M12 10L12 2" }],
  ["path", { d: "M16 6L12 10L8 6" }],
  [
    "path",
    {
      d: "M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15"
    }
  ],
  [
    "path",
    {
      d: "M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/waves-arrow-up.mjs
var WavesArrowUp = [
  ["path", { d: "M12 2v8" }],
  [
    "path",
    {
      d: "M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
    }
  ],
  [
    "path",
    {
      d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
    }
  ],
  ["path", { d: "m8 6 4-4 4 4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/waves-horizontal.mjs
var WavesHorizontal = [
  ["path", { d: "M2 12q2.5 2 5 0t5 0 5 0 5 0" }],
  ["path", { d: "M2 19q2.5 2 5 0t5 0 5 0 5 0" }],
  ["path", { d: "M2 5q2.5 2 5 0t5 0 5 0 5 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/waves-vertical.mjs
var WavesVertical = [
  ["path", { d: "M12 2q2 2.5 0 5t0 5 0 5 0 5" }],
  ["path", { d: "M19 2q2 2.5 0 5t0 5 0 5 0 5" }],
  ["path", { d: "M5 2q2 2.5 0 5t0 5 0 5 0 5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/waves-ladder.mjs
var WavesLadder = [
  ["path", { d: "M19 5a2 2 0 0 0-2 2v11" }],
  [
    "path",
    {
      d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
    }
  ],
  ["path", { d: "M7 13h10" }],
  ["path", { d: "M7 9h10" }],
  ["path", { d: "M9 5a2 2 0 0 0-2 2v11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/webcam.mjs
var Webcam = [
  ["circle", { cx: "12", cy: "10", r: "8" }],
  ["circle", { cx: "12", cy: "10", r: "3" }],
  ["path", { d: "M7 22h10" }],
  ["path", { d: "M12 22v-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/waypoints.mjs
var Waypoints = [
  ["path", { d: "m10.586 5.414-5.172 5.172" }],
  ["path", { d: "m18.586 13.414-5.172 5.172" }],
  ["path", { d: "M6 12h12" }],
  ["circle", { cx: "12", cy: "20", r: "2" }],
  ["circle", { cx: "12", cy: "4", r: "2" }],
  ["circle", { cx: "20", cy: "12", r: "2" }],
  ["circle", { cx: "4", cy: "12", r: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/webcam-off.mjs
var WebcamOff = [
  ["path", { d: "M12 22v-4" }],
  ["path", { d: "M12.754 7.096a3 3 0 0 1 2.15 2.15" }],
  ["path", { d: "M12.863 12.873a3 3 0 0 1-3.736-3.735" }],
  ["path", { d: "M16.566 16.57A8 8 0 0 1 5.43 5.433" }],
  ["path", { d: "m2 2 20 20" }],
  ["path", { d: "M7 22h10" }],
  ["path", { d: "M8.478 2.817a8 8 0 0 1 10.705 10.705" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/webhook-off.mjs
var WebhookOff = [
  ["path", { d: "M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15" }],
  ["path", { d: "M9 3.4a4 4 0 0 1 6.52.66" }],
  ["path", { d: "m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05" }],
  ["path", { d: "M20.3 20.3a4 4 0 0 1-2.3.7" }],
  ["path", { d: "M18.6 13a4 4 0 0 1 3.357 3.414" }],
  ["path", { d: "m12 6 .6 1" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/webhook.mjs
var Webhook = [
  ["path", { d: "M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" }],
  ["path", { d: "m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" }],
  ["path", { d: "m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/weight.mjs
var Weight = [
  ["circle", { cx: "12", cy: "5", r: "3" }],
  [
    "path",
    {
      d: "M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/weight-tilde.mjs
var WeightTilde = [
  [
    "path",
    {
      d: "M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z"
    }
  ],
  ["path", { d: "M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0" }],
  ["circle", { cx: "12", cy: "5", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wheat-off.mjs
var WheatOff = [
  ["path", { d: "m2 22 10-10" }],
  ["path", { d: "m16 8-1.17 1.17" }],
  [
    "path",
    { d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }
  ],
  ["path", { d: "m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97" }],
  ["path", { d: "M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62" }],
  ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" }],
  [
    "path",
    {
      d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
    }
  ],
  ["path", { d: "m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98" }],
  ["path", { d: "M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28" }],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wheat.mjs
var Wheat = [
  ["path", { d: "M2 22 16 8" }],
  [
    "path",
    { d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }
  ],
  [
    "path",
    { d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }
  ],
  [
    "path",
    { d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }
  ],
  ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" }],
  [
    "path",
    {
      d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
    }
  ],
  [
    "path",
    {
      d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
    }
  ],
  [
    "path",
    {
      d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/whole-word.mjs
var WholeWord = [
  ["circle", { cx: "7", cy: "12", r: "3" }],
  ["path", { d: "M10 9v6" }],
  ["circle", { cx: "17", cy: "12", r: "3" }],
  ["path", { d: "M14 7v8" }],
  ["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wifi-cog.mjs
var WifiCog = [
  ["path", { d: "m14.305 19.53.923-.382" }],
  ["path", { d: "m15.228 16.852-.923-.383" }],
  ["path", { d: "m16.852 15.228-.383-.923" }],
  ["path", { d: "m16.852 20.772-.383.924" }],
  ["path", { d: "m19.148 15.228.383-.923" }],
  ["path", { d: "m19.53 21.696-.382-.924" }],
  ["path", { d: "M2 7.82a15 15 0 0 1 20 0" }],
  ["path", { d: "m20.772 16.852.924-.383" }],
  ["path", { d: "m20.772 19.148.924.383" }],
  ["path", { d: "M5 11.858a10 10 0 0 1 11.5-1.785" }],
  ["path", { d: "M8.5 15.429a5 5 0 0 1 2.413-1.31" }],
  ["circle", { cx: "18", cy: "18", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wifi-high.mjs
var WifiHigh = [
  ["path", { d: "M12 20h.01" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wifi-low.mjs
var WifiLow = [
  ["path", { d: "M12 20h.01" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wifi-off.mjs
var WifiOff = [
  ["path", { d: "M12 20h.01" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wifi-pen.mjs
var WifiPen = [
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0" }],
  [
    "path",
    {
      d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    }
  ],
  ["path", { d: "M5 12.859a10 10 0 0 1 10.5-2.222" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 3-1.406" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wifi-sync.mjs
var WifiSync = [
  ["path", { d: "M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5" }],
  ["path", { d: "M11.965 14.105h4" }],
  ["path", { d: "M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0" }],
  ["path", { d: "M21.965 22.105v-4" }],
  ["path", { d: "M5 12.86a10 10 0 0 1 3-2.032" }],
  ["path", { d: "M8.5 16.429h.01" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wifi-zero.mjs
var WifiZero = [["path", { d: "M12 20h.01" }]];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wifi.mjs
var Wifi = [
  ["path", { d: "M12 20h.01" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wind-arrow-down.mjs
var WindArrowDown = [
  ["path", { d: "M10 2v8" }],
  ["path", { d: "M12.8 21.6A2 2 0 1 0 14 18H2" }],
  ["path", { d: "M17.5 10a2.5 2.5 0 1 1 2 4H2" }],
  ["path", { d: "m6 6 4 4 4-4" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wind.mjs
var Wind = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wine-off.mjs
var WineOff = [
  ["path", { d: "M8 22h8" }],
  ["path", { d: "M7 10h3m7 0h-1.343" }],
  ["path", { d: "M12 15v7" }],
  [
    "path",
    {
      d: "M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wine.mjs
var Wine = [
  ["path", { d: "M8 22h8" }],
  ["path", { d: "M7 10h10" }],
  ["path", { d: "M12 15v7" }],
  ["path", { d: "M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/workflow.mjs
var Workflow = [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/worm.mjs
var Worm = [
  ["path", { d: "m19 12-1.5 3" }],
  ["path", { d: "M19.63 18.81 22 20" }],
  [
    "path",
    {
      d: "M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wrench-off.mjs
var WrenchOff = [
  [
    "path",
    {
      d: "M10.747 5.093a6 6 0 0 1 6.841-2.882c.438.12.54.662.219.984L14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-2.882 6.842"
    }
  ],
  ["path", { d: "m13.5 13.5-7.88 7.88a1 1 0 0 1-2.999-3l7.88-7.88" }],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/wrench.mjs
var Wrench = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/x-line-top.mjs
var XLineTop = [
  ["path", { d: "M18 4H6" }],
  ["path", { d: "M18 8 6 20" }],
  ["path", { d: "m6 8 12 12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/x.mjs
var X = [
  ["path", { d: "M18 6 6 18" }],
  ["path", { d: "m6 6 12 12" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zap-off.mjs
var ZapOff = [
  ["path", { d: "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317" }],
  ["path", { d: "M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773" }],
  [
    "path",
    {
      d: "M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"
    }
  ],
  ["path", { d: "m2 2 20 20" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zap.mjs
var Zap = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-aquarius.mjs
var ZodiacAquarius = [
  [
    "path",
    {
      d: "m2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10"
    }
  ],
  [
    "path",
    {
      d: "m2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002"
    }
  ]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-aries.mjs
var ZodiacAries = [
  ["path", { d: "M12 7.5a4.5 4.5 0 1 1 5 4.5" }],
  ["path", { d: "M7 12a4.5 4.5 0 1 1 5-4.5V21" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-cancer.mjs
var ZodiacCancer = [
  ["path", { d: "M21 14.5A9 6.5 0 0 1 5.5 19" }],
  ["path", { d: "M3 9.5A9 6.5 0 0 1 18.5 5" }],
  ["circle", { cx: "17.5", cy: "14.5", r: "3.5" }],
  ["circle", { cx: "6.5", cy: "9.5", r: "3.5" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-capricorn.mjs
var ZodiacCapricorn = [
  ["path", { d: "M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0" }],
  ["path", { d: "M7 19V6a3 3 0 0 0-3-3h0" }],
  ["circle", { cx: "17", cy: "17", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-gemini.mjs
var ZodiacGemini = [
  ["path", { d: "M16 4.525v14.948" }],
  ["path", { d: "M20 3A17 17 0 0 1 4 3" }],
  ["path", { d: "M4 21a17 17 0 0 1 16 0" }],
  ["path", { d: "M8 4.525v14.948" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-leo.mjs
var ZodiacLeo = [
  ["path", { d: "M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0" }],
  ["circle", { cx: "7", cy: "16", r: "3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-libra.mjs
var ZodiacLibra = [
  [
    "path",
    { d: "M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21" }
  ],
  ["path", { d: "M3 20h18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-ophiuchus.mjs
var ZodiacOphiuchus = [
  ["path", { d: "M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10" }],
  ["path", { d: "M6 3v12a6 6 0 0 0 12 0V3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-pisces.mjs
var ZodiacPisces = [
  ["path", { d: "M19 21a15 15 0 0 1 0-18" }],
  ["path", { d: "M20 12H4" }],
  ["path", { d: "M5 3a15 15 0 0 1 0 18" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-sagittarius.mjs
var ZodiacSagittarius = [
  ["path", { d: "M15 3h6v6" }],
  ["path", { d: "M21 3 3 21" }],
  ["path", { d: "m9 9 6 6" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-scorpio.mjs
var ZodiacScorpio = [
  ["path", { d: "M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3" }],
  ["path", { d: "m22 19-3 3" }],
  ["path", { d: "M5 19V5.5a1 1 0 0 1 5 0" }],
  ["path", { d: "M5 5.5A2.5 2.5 0 0 0 2.5 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-taurus.mjs
var ZodiacTaurus = [
  ["circle", { cx: "12", cy: "15", r: "6" }],
  ["path", { d: "M18 3A6 6 0 0 1 6 3" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zodiac-virgo.mjs
var ZodiacVirgo = [
  ["path", { d: "M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5" }],
  ["path", { d: "M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5" }],
  ["path", { d: "M6 19V6a3 3 0 0 0-3-3h0" }],
  ["path", { d: "M6 5.5a1 1 0 0 1 5 0V19" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zoom-in.mjs
var ZoomIn = [
  ["circle", { cx: "11", cy: "11", r: "8" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/icons/zoom-out.mjs
var ZoomOut = [
  ["circle", { cx: "11", cy: "11", r: "8" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11" }]
];

// node_modules/.pnpm/lucide@1.24.0/node_modules/lucide/dist/esm/lucide.mjs
var createIcons = ({
  icons = {},
  nameAttr = "data-lucide",
  attrs = {},
  root = document,
  inTemplates
} = {}) => {
  if (!Object.values(icons).length) {
    throw new Error(
      "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`"
    );
  }
  if (typeof root === "undefined") {
    throw new Error("`createIcons()` only works in a browser environment.");
  }
  const elementsToReplace = Array.from(root.querySelectorAll(`[${nameAttr}]`));
  elementsToReplace.forEach((element) => replaceElement(element, { nameAttr, icons, attrs }));
  if (inTemplates) {
    const templates = Array.from(root.querySelectorAll("template"));
    templates.forEach(
      (template) => createIcons({
        icons,
        nameAttr,
        attrs,
        root: template.content,
        inTemplates
      })
    );
  }
  if (nameAttr === "data-lucide") {
    const deprecatedElements = root.querySelectorAll("[icon-name]");
    if (deprecatedElements.length > 0) {
      console.warn(
        "[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"
      );
      Array.from(deprecatedElements).forEach(
        (element) => replaceElement(element, { nameAttr: "icon-name", icons, attrs })
      );
    }
  }
};

// src/static/js/main.js
init_htmx_esm();
createIcons({ icons: iconsAndAliases_exports });
window.Alpine = module_default;
window.htmx = (init_htmx_esm(), __toCommonJS(htmx_esm_exports));
module_default.start();
//!!!!!!
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide/dist/esm/replaceElement.mjs:
lucide/dist/esm/icons/a-arrow-down.mjs:
lucide/dist/esm/icons/a-arrow-up.mjs:
lucide/dist/esm/icons/a-large-small.mjs:
lucide/dist/esm/icons/accessibility.mjs:
lucide/dist/esm/icons/activity.mjs:
lucide/dist/esm/icons/ad.mjs:
lucide/dist/esm/icons/air-vent.mjs:
lucide/dist/esm/icons/airplay.mjs:
lucide/dist/esm/icons/alarm-clock-check.mjs:
lucide/dist/esm/icons/alarm-clock-minus.mjs:
lucide/dist/esm/icons/alarm-clock-off.mjs:
lucide/dist/esm/icons/alarm-clock-plus.mjs:
lucide/dist/esm/icons/alarm-clock.mjs:
lucide/dist/esm/icons/alarm-smoke.mjs:
lucide/dist/esm/icons/album.mjs:
lucide/dist/esm/icons/align-center-horizontal.mjs:
lucide/dist/esm/icons/align-center-vertical.mjs:
lucide/dist/esm/icons/align-end-horizontal.mjs:
lucide/dist/esm/icons/align-end-vertical.mjs:
lucide/dist/esm/icons/align-horizontal-distribute-center.mjs:
lucide/dist/esm/icons/align-horizontal-distribute-end.mjs:
lucide/dist/esm/icons/align-horizontal-distribute-start.mjs:
lucide/dist/esm/icons/align-horizontal-justify-center.mjs:
lucide/dist/esm/icons/align-horizontal-justify-end.mjs:
lucide/dist/esm/icons/align-horizontal-justify-start.mjs:
lucide/dist/esm/icons/align-horizontal-space-around.mjs:
lucide/dist/esm/icons/align-horizontal-space-between.mjs:
lucide/dist/esm/icons/align-start-horizontal.mjs:
lucide/dist/esm/icons/align-start-vertical.mjs:
lucide/dist/esm/icons/align-vertical-distribute-center.mjs:
lucide/dist/esm/icons/align-vertical-distribute-end.mjs:
lucide/dist/esm/icons/align-vertical-distribute-start.mjs:
lucide/dist/esm/icons/align-vertical-justify-center.mjs:
lucide/dist/esm/icons/align-vertical-justify-end.mjs:
lucide/dist/esm/icons/align-vertical-justify-start.mjs:
lucide/dist/esm/icons/align-vertical-space-around.mjs:
lucide/dist/esm/icons/align-vertical-space-between.mjs:
lucide/dist/esm/icons/ampersand.mjs:
lucide/dist/esm/icons/ambulance.mjs:
lucide/dist/esm/icons/ampersands.mjs:
lucide/dist/esm/icons/amphora.mjs:
lucide/dist/esm/icons/anchor.mjs:
lucide/dist/esm/icons/annoyed.mjs:
lucide/dist/esm/icons/angry.mjs:
lucide/dist/esm/icons/antenna.mjs:
lucide/dist/esm/icons/anvil.mjs:
lucide/dist/esm/icons/aperture.mjs:
lucide/dist/esm/icons/app-window-mac.mjs:
lucide/dist/esm/icons/app-window.mjs:
lucide/dist/esm/icons/apple.mjs:
lucide/dist/esm/icons/archive-restore.mjs:
lucide/dist/esm/icons/archive-x.mjs:
lucide/dist/esm/icons/archive.mjs:
lucide/dist/esm/icons/armchair.mjs:
lucide/dist/esm/icons/arrow-big-down-dash.mjs:
lucide/dist/esm/icons/arrow-big-left-dash.mjs:
lucide/dist/esm/icons/arrow-big-down.mjs:
lucide/dist/esm/icons/arrow-big-left.mjs:
lucide/dist/esm/icons/arrow-big-right-dash.mjs:
lucide/dist/esm/icons/arrow-big-right.mjs:
lucide/dist/esm/icons/arrow-big-up-dash.mjs:
lucide/dist/esm/icons/arrow-big-up.mjs:
lucide/dist/esm/icons/arrow-down-0-1.mjs:
lucide/dist/esm/icons/arrow-down-1-0.mjs:
lucide/dist/esm/icons/arrow-down-a-z.mjs:
lucide/dist/esm/icons/arrow-down-from-line.mjs:
lucide/dist/esm/icons/arrow-down-left.mjs:
lucide/dist/esm/icons/arrow-down-narrow-wide.mjs:
lucide/dist/esm/icons/arrow-down-right.mjs:
lucide/dist/esm/icons/arrow-down-to-dot.mjs:
lucide/dist/esm/icons/arrow-down-to-line.mjs:
lucide/dist/esm/icons/arrow-down-up.mjs:
lucide/dist/esm/icons/arrow-down-wide-narrow.mjs:
lucide/dist/esm/icons/arrow-down-z-a.mjs:
lucide/dist/esm/icons/arrow-down.mjs:
lucide/dist/esm/icons/arrow-left-right.mjs:
lucide/dist/esm/icons/arrow-left-from-line.mjs:
lucide/dist/esm/icons/arrow-left-to-line.mjs:
lucide/dist/esm/icons/arrow-left.mjs:
lucide/dist/esm/icons/arrow-right-from-line.mjs:
lucide/dist/esm/icons/arrow-right-left.mjs:
lucide/dist/esm/icons/arrow-right-to-line.mjs:
lucide/dist/esm/icons/arrow-right.mjs:
lucide/dist/esm/icons/arrow-up-0-1.mjs:
lucide/dist/esm/icons/arrow-up-1-0.mjs:
lucide/dist/esm/icons/arrow-up-a-z.mjs:
lucide/dist/esm/icons/arrow-up-down.mjs:
lucide/dist/esm/icons/arrow-up-from-dot.mjs:
lucide/dist/esm/icons/arrow-up-from-line.mjs:
lucide/dist/esm/icons/arrow-up-left.mjs:
lucide/dist/esm/icons/arrow-up-narrow-wide.mjs:
lucide/dist/esm/icons/arrow-up-right.mjs:
lucide/dist/esm/icons/arrow-up-to-line.mjs:
lucide/dist/esm/icons/arrow-up-wide-narrow.mjs:
lucide/dist/esm/icons/arrow-up-z-a.mjs:
lucide/dist/esm/icons/arrow-up.mjs:
lucide/dist/esm/icons/arrows-up-from-line.mjs:
lucide/dist/esm/icons/asterisk.mjs:
lucide/dist/esm/icons/astroid.mjs:
lucide/dist/esm/icons/atom.mjs:
lucide/dist/esm/icons/at-sign.mjs:
lucide/dist/esm/icons/audio-lines.mjs:
lucide/dist/esm/icons/audio-waveform.mjs:
lucide/dist/esm/icons/axe.mjs:
lucide/dist/esm/icons/award.mjs:
lucide/dist/esm/icons/axis-3d.mjs:
lucide/dist/esm/icons/baby.mjs:
lucide/dist/esm/icons/backpack.mjs:
lucide/dist/esm/icons/badge-alert.mjs:
lucide/dist/esm/icons/badge-cent.mjs:
lucide/dist/esm/icons/badge-dollar-sign.mjs:
lucide/dist/esm/icons/badge-euro.mjs:
lucide/dist/esm/icons/badge-check.mjs:
lucide/dist/esm/icons/badge-indian-rupee.mjs:
lucide/dist/esm/icons/badge-info.mjs:
lucide/dist/esm/icons/badge-japanese-yen.mjs:
lucide/dist/esm/icons/badge-minus.mjs:
lucide/dist/esm/icons/badge-percent.mjs:
lucide/dist/esm/icons/badge-plus.mjs:
lucide/dist/esm/icons/badge-pound-sterling.mjs:
lucide/dist/esm/icons/badge-question-mark.mjs:
lucide/dist/esm/icons/badge-russian-ruble.mjs:
lucide/dist/esm/icons/badge-swiss-franc.mjs:
lucide/dist/esm/icons/badge-turkish-lira.mjs:
lucide/dist/esm/icons/badge-x.mjs:
lucide/dist/esm/icons/badge.mjs:
lucide/dist/esm/icons/baggage-claim.mjs:
lucide/dist/esm/icons/balloon.mjs:
lucide/dist/esm/icons/ban.mjs:
lucide/dist/esm/icons/banana.mjs:
lucide/dist/esm/icons/bandage.mjs:
lucide/dist/esm/icons/banknote-arrow-down.mjs:
lucide/dist/esm/icons/banknote-arrow-up.mjs:
lucide/dist/esm/icons/banknote-check.mjs:
lucide/dist/esm/icons/banknote-x.mjs:
lucide/dist/esm/icons/banknote.mjs:
lucide/dist/esm/icons/barcode.mjs:
lucide/dist/esm/icons/barrel.mjs:
lucide/dist/esm/icons/baseline.mjs:
lucide/dist/esm/icons/bath.mjs:
lucide/dist/esm/icons/battery-charging.mjs:
lucide/dist/esm/icons/battery-full.mjs:
lucide/dist/esm/icons/battery-low.mjs:
lucide/dist/esm/icons/battery-plus.mjs:
lucide/dist/esm/icons/battery-medium.mjs:
lucide/dist/esm/icons/battery-warning.mjs:
lucide/dist/esm/icons/battery.mjs:
lucide/dist/esm/icons/beaker.mjs:
lucide/dist/esm/icons/bean-off.mjs:
lucide/dist/esm/icons/bean.mjs:
lucide/dist/esm/icons/bed-double.mjs:
lucide/dist/esm/icons/bed.mjs:
lucide/dist/esm/icons/bed-single.mjs:
lucide/dist/esm/icons/beef-off.mjs:
lucide/dist/esm/icons/beef.mjs:
lucide/dist/esm/icons/beer-off.mjs:
lucide/dist/esm/icons/beer.mjs:
lucide/dist/esm/icons/bell-dot.mjs:
lucide/dist/esm/icons/bell-check.mjs:
lucide/dist/esm/icons/bell-electric.mjs:
lucide/dist/esm/icons/bell-minus.mjs:
lucide/dist/esm/icons/bell-off.mjs:
lucide/dist/esm/icons/bell-plus.mjs:
lucide/dist/esm/icons/bell-ring.mjs:
lucide/dist/esm/icons/bell.mjs:
lucide/dist/esm/icons/between-horizontal-end.mjs:
lucide/dist/esm/icons/between-horizontal-start.mjs:
lucide/dist/esm/icons/between-vertical-start.mjs:
lucide/dist/esm/icons/between-vertical-end.mjs:
lucide/dist/esm/icons/biceps-flexed.mjs:
lucide/dist/esm/icons/binary.mjs:
lucide/dist/esm/icons/bike.mjs:
lucide/dist/esm/icons/binoculars.mjs:
lucide/dist/esm/icons/biohazard.mjs:
lucide/dist/esm/icons/bird.mjs:
lucide/dist/esm/icons/bitcoin.mjs:
lucide/dist/esm/icons/birdhouse.mjs:
lucide/dist/esm/icons/blend.mjs:
lucide/dist/esm/icons/blender.mjs:
lucide/dist/esm/icons/blinds.mjs:
lucide/dist/esm/icons/blocks.mjs:
lucide/dist/esm/icons/bluetooth-connected.mjs:
lucide/dist/esm/icons/bluetooth-off.mjs:
lucide/dist/esm/icons/bluetooth-searching.mjs:
lucide/dist/esm/icons/bluetooth.mjs:
lucide/dist/esm/icons/bold.mjs:
lucide/dist/esm/icons/bomb.mjs:
lucide/dist/esm/icons/bolt.mjs:
lucide/dist/esm/icons/bone-fracture.mjs:
lucide/dist/esm/icons/bone.mjs:
lucide/dist/esm/icons/book-a.mjs:
lucide/dist/esm/icons/book-alert.mjs:
lucide/dist/esm/icons/book-audio.mjs:
lucide/dist/esm/icons/book-check.mjs:
lucide/dist/esm/icons/book-dashed.mjs:
lucide/dist/esm/icons/book-copy.mjs:
lucide/dist/esm/icons/book-down.mjs:
lucide/dist/esm/icons/book-headphones.mjs:
lucide/dist/esm/icons/book-heart.mjs:
lucide/dist/esm/icons/book-image.mjs:
lucide/dist/esm/icons/book-key.mjs:
lucide/dist/esm/icons/book-lock.mjs:
lucide/dist/esm/icons/book-marked.mjs:
lucide/dist/esm/icons/book-minus.mjs:
lucide/dist/esm/icons/book-open-text.mjs:
lucide/dist/esm/icons/book-open-check.mjs:
lucide/dist/esm/icons/book-open.mjs:
lucide/dist/esm/icons/book-plus.mjs:
lucide/dist/esm/icons/book-search.mjs:
lucide/dist/esm/icons/book-text.mjs:
lucide/dist/esm/icons/book-type.mjs:
lucide/dist/esm/icons/book-up-2.mjs:
lucide/dist/esm/icons/book-up.mjs:
lucide/dist/esm/icons/book-user.mjs:
lucide/dist/esm/icons/book-x.mjs:
lucide/dist/esm/icons/book.mjs:
lucide/dist/esm/icons/bookmark-check.mjs:
lucide/dist/esm/icons/bookmark-minus.mjs:
lucide/dist/esm/icons/bookmark-off.mjs:
lucide/dist/esm/icons/bookmark-plus.mjs:
lucide/dist/esm/icons/bookmark-x.mjs:
lucide/dist/esm/icons/bookmark.mjs:
lucide/dist/esm/icons/bot-message-square.mjs:
lucide/dist/esm/icons/boom-box.mjs:
lucide/dist/esm/icons/bot.mjs:
lucide/dist/esm/icons/bot-off.mjs:
lucide/dist/esm/icons/bottle-wine.mjs:
lucide/dist/esm/icons/bow-arrow.mjs:
lucide/dist/esm/icons/box.mjs:
lucide/dist/esm/icons/boxes.mjs:
lucide/dist/esm/icons/brackets.mjs:
lucide/dist/esm/icons/braces.mjs:
lucide/dist/esm/icons/brain-cog.mjs:
lucide/dist/esm/icons/brain-circuit.mjs:
lucide/dist/esm/icons/brain.mjs:
lucide/dist/esm/icons/brick-wall-fire.mjs:
lucide/dist/esm/icons/brick-wall-shield.mjs:
lucide/dist/esm/icons/brick-wall.mjs:
lucide/dist/esm/icons/briefcase-business.mjs:
lucide/dist/esm/icons/briefcase-conveyor-belt.mjs:
lucide/dist/esm/icons/briefcase-medical.mjs:
lucide/dist/esm/icons/briefcase.mjs:
lucide/dist/esm/icons/bring-to-front.mjs:
lucide/dist/esm/icons/broccoli.mjs:
lucide/dist/esm/icons/brush-cleaning.mjs:
lucide/dist/esm/icons/brush.mjs:
lucide/dist/esm/icons/bug-off.mjs:
lucide/dist/esm/icons/bubbles.mjs:
lucide/dist/esm/icons/bug-play.mjs:
lucide/dist/esm/icons/bug.mjs:
lucide/dist/esm/icons/building-2.mjs:
lucide/dist/esm/icons/building.mjs:
lucide/dist/esm/icons/bus-front.mjs:
lucide/dist/esm/icons/bus.mjs:
lucide/dist/esm/icons/cable-car.mjs:
lucide/dist/esm/icons/cable.mjs:
lucide/dist/esm/icons/cake-slice.mjs:
lucide/dist/esm/icons/cake.mjs:
lucide/dist/esm/icons/calculator.mjs:
lucide/dist/esm/icons/calendar-1.mjs:
lucide/dist/esm/icons/calendar-arrow-down.mjs:
lucide/dist/esm/icons/calendar-arrow-up.mjs:
lucide/dist/esm/icons/calendar-check.mjs:
lucide/dist/esm/icons/calendar-clock.mjs:
lucide/dist/esm/icons/calendar-check-2.mjs:
lucide/dist/esm/icons/calendar-cog.mjs:
lucide/dist/esm/icons/calendar-days.mjs:
lucide/dist/esm/icons/calendar-heart.mjs:
lucide/dist/esm/icons/calendar-fold.mjs:
lucide/dist/esm/icons/calendar-minus-2.mjs:
lucide/dist/esm/icons/calendar-minus.mjs:
lucide/dist/esm/icons/calendar-off.mjs:
lucide/dist/esm/icons/calendar-plus-2.mjs:
lucide/dist/esm/icons/calendar-plus.mjs:
lucide/dist/esm/icons/calendar-range.mjs:
lucide/dist/esm/icons/calendar-search.mjs:
lucide/dist/esm/icons/calendar-sync.mjs:
lucide/dist/esm/icons/calendar-x-2.mjs:
lucide/dist/esm/icons/calendar-x.mjs:
lucide/dist/esm/icons/calendar.mjs:
lucide/dist/esm/icons/calendars.mjs:
lucide/dist/esm/icons/camera-off.mjs:
lucide/dist/esm/icons/camera.mjs:
lucide/dist/esm/icons/candy-cane.mjs:
lucide/dist/esm/icons/candy-off.mjs:
lucide/dist/esm/icons/candy.mjs:
lucide/dist/esm/icons/cannabis-off.mjs:
lucide/dist/esm/icons/captions-off.mjs:
lucide/dist/esm/icons/cannabis.mjs:
lucide/dist/esm/icons/captions.mjs:
lucide/dist/esm/icons/car-front.mjs:
lucide/dist/esm/icons/car-taxi-front.mjs:
lucide/dist/esm/icons/car.mjs:
lucide/dist/esm/icons/caravan.mjs:
lucide/dist/esm/icons/card-sim.mjs:
lucide/dist/esm/icons/carrot.mjs:
lucide/dist/esm/icons/case-lower.mjs:
lucide/dist/esm/icons/case-sensitive.mjs:
lucide/dist/esm/icons/case-upper.mjs:
lucide/dist/esm/icons/cast.mjs:
lucide/dist/esm/icons/cassette-tape.mjs:
lucide/dist/esm/icons/castle.mjs:
lucide/dist/esm/icons/cat.mjs:
lucide/dist/esm/icons/cctv-off.mjs:
lucide/dist/esm/icons/cctv.mjs:
lucide/dist/esm/icons/chart-area.mjs:
lucide/dist/esm/icons/chart-bar-decreasing.mjs:
lucide/dist/esm/icons/chart-bar-big.mjs:
lucide/dist/esm/icons/chart-bar-increasing.mjs:
lucide/dist/esm/icons/chart-bar-stacked.mjs:
lucide/dist/esm/icons/chart-bar.mjs:
lucide/dist/esm/icons/chart-candlestick.mjs:
lucide/dist/esm/icons/chart-column-big.mjs:
lucide/dist/esm/icons/chart-column-decreasing.mjs:
lucide/dist/esm/icons/chart-column-increasing.mjs:
lucide/dist/esm/icons/chart-column-stacked.mjs:
lucide/dist/esm/icons/chart-column.mjs:
lucide/dist/esm/icons/chart-gantt.mjs:
lucide/dist/esm/icons/chart-line.mjs:
lucide/dist/esm/icons/chart-network.mjs:
lucide/dist/esm/icons/chart-no-axes-column-decreasing.mjs:
lucide/dist/esm/icons/chart-no-axes-column-increasing.mjs:
lucide/dist/esm/icons/chart-no-axes-column.mjs:
lucide/dist/esm/icons/chart-no-axes-gantt.mjs:
lucide/dist/esm/icons/chart-no-axes-combined.mjs:
lucide/dist/esm/icons/chart-pie.mjs:
lucide/dist/esm/icons/chart-scatter.mjs:
lucide/dist/esm/icons/chart-spline.mjs:
lucide/dist/esm/icons/check-check.mjs:
lucide/dist/esm/icons/check-line.mjs:
lucide/dist/esm/icons/check.mjs:
lucide/dist/esm/icons/chef-hat.mjs:
lucide/dist/esm/icons/cherry.mjs:
lucide/dist/esm/icons/chess-bishop.mjs:
lucide/dist/esm/icons/chess-king.mjs:
lucide/dist/esm/icons/chess-knight.mjs:
lucide/dist/esm/icons/chess-pawn.mjs:
lucide/dist/esm/icons/chess-queen.mjs:
lucide/dist/esm/icons/chess-rook.mjs:
lucide/dist/esm/icons/chevron-down.mjs:
lucide/dist/esm/icons/chevron-first.mjs:
lucide/dist/esm/icons/chevron-last.mjs:
lucide/dist/esm/icons/chevron-left.mjs:
lucide/dist/esm/icons/chevron-right.mjs:
lucide/dist/esm/icons/chevron-up.mjs:
lucide/dist/esm/icons/chevrons-down-up.mjs:
lucide/dist/esm/icons/chevrons-down.mjs:
lucide/dist/esm/icons/chevrons-left-right-ellipsis.mjs:
lucide/dist/esm/icons/chevrons-left-right.mjs:
lucide/dist/esm/icons/chevrons-left.mjs:
lucide/dist/esm/icons/chevrons-right-left.mjs:
lucide/dist/esm/icons/chevrons-right.mjs:
lucide/dist/esm/icons/chevrons-up-down.mjs:
lucide/dist/esm/icons/chevrons-up.mjs:
lucide/dist/esm/icons/church.mjs:
lucide/dist/esm/icons/cigarette-off.mjs:
lucide/dist/esm/icons/cigarette.mjs:
lucide/dist/esm/icons/circle-alert.mjs:
lucide/dist/esm/icons/circle-arrow-down.mjs:
lucide/dist/esm/icons/circle-arrow-left.mjs:
lucide/dist/esm/icons/circle-arrow-out-down-right.mjs:
lucide/dist/esm/icons/circle-arrow-out-down-left.mjs:
lucide/dist/esm/icons/circle-arrow-out-up-left.mjs:
lucide/dist/esm/icons/circle-arrow-out-up-right.mjs:
lucide/dist/esm/icons/circle-arrow-right.mjs:
lucide/dist/esm/icons/circle-arrow-up.mjs:
lucide/dist/esm/icons/circle-check-big.mjs:
lucide/dist/esm/icons/circle-check.mjs:
lucide/dist/esm/icons/circle-chevron-down.mjs:
lucide/dist/esm/icons/circle-chevron-left.mjs:
lucide/dist/esm/icons/circle-chevron-right.mjs:
lucide/dist/esm/icons/circle-chevron-up.mjs:
lucide/dist/esm/icons/circle-dashed.mjs:
lucide/dist/esm/icons/circle-divide.mjs:
lucide/dist/esm/icons/circle-dollar-sign.mjs:
lucide/dist/esm/icons/circle-dot-dashed.mjs:
lucide/dist/esm/icons/circle-dot.mjs:
lucide/dist/esm/icons/circle-ellipsis.mjs:
lucide/dist/esm/icons/circle-equal.mjs:
lucide/dist/esm/icons/circle-euro-sign.mjs:
lucide/dist/esm/icons/circle-fading-arrow-up.mjs:
lucide/dist/esm/icons/circle-fading-plus.mjs:
lucide/dist/esm/icons/circle-gauge.mjs:
lucide/dist/esm/icons/circle-minus.mjs:
lucide/dist/esm/icons/circle-off.mjs:
lucide/dist/esm/icons/circle-parking-off.mjs:
lucide/dist/esm/icons/circle-parking.mjs:
lucide/dist/esm/icons/circle-pause.mjs:
lucide/dist/esm/icons/circle-percent.mjs:
lucide/dist/esm/icons/circle-play.mjs:
lucide/dist/esm/icons/circle-pile.mjs:
lucide/dist/esm/icons/circle-plus.mjs:
lucide/dist/esm/icons/circle-pound-sterling.mjs:
lucide/dist/esm/icons/circle-power.mjs:
lucide/dist/esm/icons/circle-question-mark.mjs:
lucide/dist/esm/icons/circle-slash-2.mjs:
lucide/dist/esm/icons/circle-slash.mjs:
lucide/dist/esm/icons/circle-small.mjs:
lucide/dist/esm/icons/circle-star.mjs:
lucide/dist/esm/icons/circle-stop.mjs:
lucide/dist/esm/icons/circle-user-round.mjs:
lucide/dist/esm/icons/circle-user.mjs:
lucide/dist/esm/icons/circle-x.mjs:
lucide/dist/esm/icons/circle.mjs:
lucide/dist/esm/icons/circuit-board.mjs:
lucide/dist/esm/icons/citrus.mjs:
lucide/dist/esm/icons/clapperboard.mjs:
lucide/dist/esm/icons/clipboard-check.mjs:
lucide/dist/esm/icons/clipboard-clock.mjs:
lucide/dist/esm/icons/clipboard-copy.mjs:
lucide/dist/esm/icons/clipboard-list.mjs:
lucide/dist/esm/icons/clipboard-minus.mjs:
lucide/dist/esm/icons/clipboard-paste.mjs:
lucide/dist/esm/icons/clipboard-pen-line.mjs:
lucide/dist/esm/icons/clipboard-pen.mjs:
lucide/dist/esm/icons/clipboard-plus.mjs:
lucide/dist/esm/icons/clipboard-type.mjs:
lucide/dist/esm/icons/clipboard-x.mjs:
lucide/dist/esm/icons/clipboard.mjs:
lucide/dist/esm/icons/clock-1.mjs:
lucide/dist/esm/icons/clock-11.mjs:
lucide/dist/esm/icons/clock-10.mjs:
lucide/dist/esm/icons/clock-12.mjs:
lucide/dist/esm/icons/clock-2.mjs:
lucide/dist/esm/icons/clock-3.mjs:
lucide/dist/esm/icons/clock-4.mjs:
lucide/dist/esm/icons/clock-5.mjs:
lucide/dist/esm/icons/clock-6.mjs:
lucide/dist/esm/icons/clock-7.mjs:
lucide/dist/esm/icons/clock-8.mjs:
lucide/dist/esm/icons/clock-9.mjs:
lucide/dist/esm/icons/clock-alert.mjs:
lucide/dist/esm/icons/clock-arrow-down.mjs:
lucide/dist/esm/icons/clock-arrow-left.mjs:
lucide/dist/esm/icons/clock-arrow-right.mjs:
lucide/dist/esm/icons/clock-arrow-up.mjs:
lucide/dist/esm/icons/clock-check.mjs:
lucide/dist/esm/icons/clock-fading.mjs:
lucide/dist/esm/icons/clock-plus.mjs:
lucide/dist/esm/icons/clock.mjs:
lucide/dist/esm/icons/closed-caption.mjs:
lucide/dist/esm/icons/cloud-alert.mjs:
lucide/dist/esm/icons/cloud-backup.mjs:
lucide/dist/esm/icons/cloud-check.mjs:
lucide/dist/esm/icons/cloud-cog.mjs:
lucide/dist/esm/icons/cloud-download.mjs:
lucide/dist/esm/icons/cloud-drizzle.mjs:
lucide/dist/esm/icons/cloud-fog.mjs:
lucide/dist/esm/icons/cloud-hail.mjs:
lucide/dist/esm/icons/cloud-lightning.mjs:
lucide/dist/esm/icons/cloud-moon-rain.mjs:
lucide/dist/esm/icons/cloud-moon.mjs:
lucide/dist/esm/icons/cloud-off.mjs:
lucide/dist/esm/icons/cloud-rain-wind.mjs:
lucide/dist/esm/icons/cloud-rain.mjs:
lucide/dist/esm/icons/cloud-snow.mjs:
lucide/dist/esm/icons/cloud-sun-rain.mjs:
lucide/dist/esm/icons/cloud-sun.mjs:
lucide/dist/esm/icons/cloud-sync.mjs:
lucide/dist/esm/icons/cloud-upload.mjs:
lucide/dist/esm/icons/cloud.mjs:
lucide/dist/esm/icons/cloudy.mjs:
lucide/dist/esm/icons/clover.mjs:
lucide/dist/esm/icons/club.mjs:
lucide/dist/esm/icons/code-xml.mjs:
lucide/dist/esm/icons/code.mjs:
lucide/dist/esm/icons/cog.mjs:
lucide/dist/esm/icons/coffee.mjs:
lucide/dist/esm/icons/coins.mjs:
lucide/dist/esm/icons/columns-2.mjs:
lucide/dist/esm/icons/columns-3-cog.mjs:
lucide/dist/esm/icons/columns-3.mjs:
lucide/dist/esm/icons/columns-4.mjs:
lucide/dist/esm/icons/combine.mjs:
lucide/dist/esm/icons/command.mjs:
lucide/dist/esm/icons/compass.mjs:
lucide/dist/esm/icons/component.mjs:
lucide/dist/esm/icons/computer.mjs:
lucide/dist/esm/icons/concierge-bell.mjs:
lucide/dist/esm/icons/construction.mjs:
lucide/dist/esm/icons/cone.mjs:
lucide/dist/esm/icons/contact.mjs:
lucide/dist/esm/icons/contact-round.mjs:
lucide/dist/esm/icons/container.mjs:
lucide/dist/esm/icons/contrast.mjs:
lucide/dist/esm/icons/cookie.mjs:
lucide/dist/esm/icons/cooking-pot.mjs:
lucide/dist/esm/icons/copy-check.mjs:
lucide/dist/esm/icons/copy-minus.mjs:
lucide/dist/esm/icons/copy-plus.mjs:
lucide/dist/esm/icons/copy-slash.mjs:
lucide/dist/esm/icons/copy-x.mjs:
lucide/dist/esm/icons/copy.mjs:
lucide/dist/esm/icons/copyleft.mjs:
lucide/dist/esm/icons/copyright.mjs:
lucide/dist/esm/icons/corner-down-left.mjs:
lucide/dist/esm/icons/corner-down-right.mjs:
lucide/dist/esm/icons/corner-left-down.mjs:
lucide/dist/esm/icons/corner-left-up.mjs:
lucide/dist/esm/icons/corner-right-down.mjs:
lucide/dist/esm/icons/corner-right-up.mjs:
lucide/dist/esm/icons/corner-up-left.mjs:
lucide/dist/esm/icons/cpu.mjs:
lucide/dist/esm/icons/corner-up-right.mjs:
lucide/dist/esm/icons/creative-commons.mjs:
lucide/dist/esm/icons/credit-card.mjs:
lucide/dist/esm/icons/croissant.mjs:
lucide/dist/esm/icons/crop.mjs:
lucide/dist/esm/icons/cross.mjs:
lucide/dist/esm/icons/crown.mjs:
lucide/dist/esm/icons/crosshair.mjs:
lucide/dist/esm/icons/cuboid.mjs:
lucide/dist/esm/icons/currency.mjs:
lucide/dist/esm/icons/cup-soda.mjs:
lucide/dist/esm/icons/cylinder.mjs:
lucide/dist/esm/icons/dam.mjs:
lucide/dist/esm/icons/database-arrow-down.mjs:
lucide/dist/esm/icons/database-arrow-up.mjs:
lucide/dist/esm/icons/database-backup.mjs:
lucide/dist/esm/icons/database-check.mjs:
lucide/dist/esm/icons/database-minus.mjs:
lucide/dist/esm/icons/database-plus.mjs:
lucide/dist/esm/icons/database-search.mjs:
lucide/dist/esm/icons/database-x.mjs:
lucide/dist/esm/icons/database-zap.mjs:
lucide/dist/esm/icons/database.mjs:
lucide/dist/esm/icons/decimals-arrow-right.mjs:
lucide/dist/esm/icons/delete.mjs:
lucide/dist/esm/icons/decimals-arrow-left.mjs:
lucide/dist/esm/icons/dessert.mjs:
lucide/dist/esm/icons/diameter.mjs:
lucide/dist/esm/icons/diamond-minus.mjs:
lucide/dist/esm/icons/diamond-percent.mjs:
lucide/dist/esm/icons/diamond-plus.mjs:
lucide/dist/esm/icons/diamond.mjs:
lucide/dist/esm/icons/dice-1.mjs:
lucide/dist/esm/icons/dice-2.mjs:
lucide/dist/esm/icons/dice-3.mjs:
lucide/dist/esm/icons/dice-4.mjs:
lucide/dist/esm/icons/dice-5.mjs:
lucide/dist/esm/icons/dice-6.mjs:
lucide/dist/esm/icons/diff.mjs:
lucide/dist/esm/icons/dices.mjs:
lucide/dist/esm/icons/disc-2.mjs:
lucide/dist/esm/icons/disc-3.mjs:
lucide/dist/esm/icons/disc-album.mjs:
lucide/dist/esm/icons/disc.mjs:
lucide/dist/esm/icons/dna-off.mjs:
lucide/dist/esm/icons/dna.mjs:
lucide/dist/esm/icons/divide.mjs:
lucide/dist/esm/icons/dock.mjs:
lucide/dist/esm/icons/dog.mjs:
lucide/dist/esm/icons/dollar-sign.mjs:
lucide/dist/esm/icons/donut.mjs:
lucide/dist/esm/icons/door-closed-locked.mjs:
lucide/dist/esm/icons/door-closed.mjs:
lucide/dist/esm/icons/door-open.mjs:
lucide/dist/esm/icons/download.mjs:
lucide/dist/esm/icons/dot.mjs:
lucide/dist/esm/icons/drafting-compass.mjs:
lucide/dist/esm/icons/drama.mjs:
lucide/dist/esm/icons/drill.mjs:
lucide/dist/esm/icons/drone.mjs:
lucide/dist/esm/icons/droplet-off.mjs:
lucide/dist/esm/icons/droplet.mjs:
lucide/dist/esm/icons/droplets.mjs:
lucide/dist/esm/icons/drum.mjs:
lucide/dist/esm/icons/drumstick.mjs:
lucide/dist/esm/icons/dumbbell.mjs:
lucide/dist/esm/icons/ear-off.mjs:
lucide/dist/esm/icons/ear.mjs:
lucide/dist/esm/icons/earth-lock.mjs:
lucide/dist/esm/icons/earth.mjs:
lucide/dist/esm/icons/eclipse.mjs:
lucide/dist/esm/icons/egg-fried.mjs:
lucide/dist/esm/icons/egg-off.mjs:
lucide/dist/esm/icons/ellipse.mjs:
lucide/dist/esm/icons/egg.mjs:
lucide/dist/esm/icons/ellipsis-vertical.mjs:
lucide/dist/esm/icons/ellipsis.mjs:
lucide/dist/esm/icons/equal-approximately.mjs:
lucide/dist/esm/icons/equal.mjs:
lucide/dist/esm/icons/equal-not.mjs:
lucide/dist/esm/icons/ethernet-port.mjs:
lucide/dist/esm/icons/eraser.mjs:
lucide/dist/esm/icons/euro.mjs:
lucide/dist/esm/icons/ev-charger.mjs:
lucide/dist/esm/icons/expand.mjs:
lucide/dist/esm/icons/external-link.mjs:
lucide/dist/esm/icons/eye-closed.mjs:
lucide/dist/esm/icons/eye-dashed.mjs:
lucide/dist/esm/icons/eye-off.mjs:
lucide/dist/esm/icons/eye.mjs:
lucide/dist/esm/icons/factory.mjs:
lucide/dist/esm/icons/fan.mjs:
lucide/dist/esm/icons/fast-forward.mjs:
lucide/dist/esm/icons/feather.mjs:
lucide/dist/esm/icons/fence.mjs:
lucide/dist/esm/icons/ferris-wheel.mjs:
lucide/dist/esm/icons/file-archive.mjs:
lucide/dist/esm/icons/file-axis-3d.mjs:
lucide/dist/esm/icons/file-badge.mjs:
lucide/dist/esm/icons/file-box.mjs:
lucide/dist/esm/icons/file-braces-corner.mjs:
lucide/dist/esm/icons/file-braces.mjs:
lucide/dist/esm/icons/file-chart-column-increasing.mjs:
lucide/dist/esm/icons/file-chart-column.mjs:
lucide/dist/esm/icons/file-chart-line.mjs:
lucide/dist/esm/icons/file-chart-pie.mjs:
lucide/dist/esm/icons/file-check.mjs:
lucide/dist/esm/icons/file-check-corner.mjs:
lucide/dist/esm/icons/file-clock.mjs:
lucide/dist/esm/icons/file-code-corner.mjs:
lucide/dist/esm/icons/file-code.mjs:
lucide/dist/esm/icons/file-cog.mjs:
lucide/dist/esm/icons/file-diff.mjs:
lucide/dist/esm/icons/file-digit.mjs:
lucide/dist/esm/icons/file-down.mjs:
lucide/dist/esm/icons/file-exclamation-point.mjs:
lucide/dist/esm/icons/file-headphone.mjs:
lucide/dist/esm/icons/file-heart.mjs:
lucide/dist/esm/icons/file-image.mjs:
lucide/dist/esm/icons/file-input.mjs:
lucide/dist/esm/icons/file-lock.mjs:
lucide/dist/esm/icons/file-key.mjs:
lucide/dist/esm/icons/file-minus-corner.mjs:
lucide/dist/esm/icons/file-music.mjs:
lucide/dist/esm/icons/file-minus.mjs:
lucide/dist/esm/icons/file-output.mjs:
lucide/dist/esm/icons/file-pen-line.mjs:
lucide/dist/esm/icons/file-play.mjs:
lucide/dist/esm/icons/file-pen.mjs:
lucide/dist/esm/icons/file-plus-corner.mjs:
lucide/dist/esm/icons/file-plus.mjs:
lucide/dist/esm/icons/file-question-mark.mjs:
lucide/dist/esm/icons/file-scan.mjs:
lucide/dist/esm/icons/file-search-corner.mjs:
lucide/dist/esm/icons/file-search.mjs:
lucide/dist/esm/icons/file-signal.mjs:
lucide/dist/esm/icons/file-sliders.mjs:
lucide/dist/esm/icons/file-spreadsheet.mjs:
lucide/dist/esm/icons/file-stack.mjs:
lucide/dist/esm/icons/file-terminal.mjs:
lucide/dist/esm/icons/file-symlink.mjs:
lucide/dist/esm/icons/file-type-corner.mjs:
lucide/dist/esm/icons/file-text.mjs:
lucide/dist/esm/icons/file-type.mjs:
lucide/dist/esm/icons/file-up.mjs:
lucide/dist/esm/icons/file-user.mjs:
lucide/dist/esm/icons/file-video-camera.mjs:
lucide/dist/esm/icons/file-volume.mjs:
lucide/dist/esm/icons/file-x-corner.mjs:
lucide/dist/esm/icons/file-x.mjs:
lucide/dist/esm/icons/file.mjs:
lucide/dist/esm/icons/film.mjs:
lucide/dist/esm/icons/files.mjs:
lucide/dist/esm/icons/fingerprint-pattern.mjs:
lucide/dist/esm/icons/fire-extinguisher.mjs:
lucide/dist/esm/icons/fish-off.mjs:
lucide/dist/esm/icons/fish-symbol.mjs:
lucide/dist/esm/icons/fish.mjs:
lucide/dist/esm/icons/fishing-hook.mjs:
lucide/dist/esm/icons/fishing-rod.mjs:
lucide/dist/esm/icons/flag-off.mjs:
lucide/dist/esm/icons/flag-triangle-left.mjs:
lucide/dist/esm/icons/flag-triangle-right.mjs:
lucide/dist/esm/icons/flag.mjs:
lucide/dist/esm/icons/flame-kindling.mjs:
lucide/dist/esm/icons/flame.mjs:
lucide/dist/esm/icons/flashlight-off.mjs:
lucide/dist/esm/icons/flashlight.mjs:
lucide/dist/esm/icons/flask-conical.mjs:
lucide/dist/esm/icons/flask-conical-off.mjs:
lucide/dist/esm/icons/flask-round.mjs:
lucide/dist/esm/icons/flip-horizontal-2.mjs:
lucide/dist/esm/icons/flip-vertical-2.mjs:
lucide/dist/esm/icons/flower-2.mjs:
lucide/dist/esm/icons/flower.mjs:
lucide/dist/esm/icons/focus.mjs:
lucide/dist/esm/icons/fold-horizontal.mjs:
lucide/dist/esm/icons/fold-vertical.mjs:
lucide/dist/esm/icons/folder-archive.mjs:
lucide/dist/esm/icons/folder-bookmark.mjs:
lucide/dist/esm/icons/folder-check.mjs:
lucide/dist/esm/icons/folder-clock.mjs:
lucide/dist/esm/icons/folder-closed.mjs:
lucide/dist/esm/icons/folder-code.mjs:
lucide/dist/esm/icons/folder-cog.mjs:
lucide/dist/esm/icons/folder-dot.mjs:
lucide/dist/esm/icons/folder-down.mjs:
lucide/dist/esm/icons/folder-git-2.mjs:
lucide/dist/esm/icons/folder-git.mjs:
lucide/dist/esm/icons/folder-heart.mjs:
lucide/dist/esm/icons/folder-input.mjs:
lucide/dist/esm/icons/folder-kanban.mjs:
lucide/dist/esm/icons/folder-key.mjs:
lucide/dist/esm/icons/folder-lock.mjs:
lucide/dist/esm/icons/folder-minus.mjs:
lucide/dist/esm/icons/folder-open-dot.mjs:
lucide/dist/esm/icons/folder-open.mjs:
lucide/dist/esm/icons/folder-output.mjs:
lucide/dist/esm/icons/folder-pen.mjs:
lucide/dist/esm/icons/folder-plus.mjs:
lucide/dist/esm/icons/folder-root.mjs:
lucide/dist/esm/icons/folder-search-2.mjs:
lucide/dist/esm/icons/folder-search.mjs:
lucide/dist/esm/icons/folder-symlink.mjs:
lucide/dist/esm/icons/folder-sync.mjs:
lucide/dist/esm/icons/folder-tree.mjs:
lucide/dist/esm/icons/folder-up.mjs:
lucide/dist/esm/icons/folder.mjs:
lucide/dist/esm/icons/folder-x.mjs:
lucide/dist/esm/icons/folders.mjs:
lucide/dist/esm/icons/footprints.mjs:
lucide/dist/esm/icons/forklift.mjs:
lucide/dist/esm/icons/form.mjs:
lucide/dist/esm/icons/forward.mjs:
lucide/dist/esm/icons/frame.mjs:
lucide/dist/esm/icons/frown.mjs:
lucide/dist/esm/icons/fullscreen.mjs:
lucide/dist/esm/icons/funnel-plus.mjs:
lucide/dist/esm/icons/fuel.mjs:
lucide/dist/esm/icons/funnel-x.mjs:
lucide/dist/esm/icons/funnel.mjs:
lucide/dist/esm/icons/gallery-horizontal-end.mjs:
lucide/dist/esm/icons/gallery-horizontal.mjs:
lucide/dist/esm/icons/gallery-thumbnails.mjs:
lucide/dist/esm/icons/gallery-vertical-end.mjs:
lucide/dist/esm/icons/gallery-vertical.mjs:
lucide/dist/esm/icons/gamepad-2.mjs:
lucide/dist/esm/icons/gamepad-directional.mjs:
lucide/dist/esm/icons/gamepad.mjs:
lucide/dist/esm/icons/gauge.mjs:
lucide/dist/esm/icons/gavel.mjs:
lucide/dist/esm/icons/gem.mjs:
lucide/dist/esm/icons/ghost.mjs:
lucide/dist/esm/icons/georgian-lari.mjs:
lucide/dist/esm/icons/gift.mjs:
lucide/dist/esm/icons/git-branch-minus.mjs:
lucide/dist/esm/icons/git-branch-plus.mjs:
lucide/dist/esm/icons/git-branch.mjs:
lucide/dist/esm/icons/git-commit-horizontal.mjs:
lucide/dist/esm/icons/git-commit-vertical.mjs:
lucide/dist/esm/icons/git-compare-arrows.mjs:
lucide/dist/esm/icons/git-compare.mjs:
lucide/dist/esm/icons/git-fork.mjs:
lucide/dist/esm/icons/git-graph.mjs:
lucide/dist/esm/icons/git-merge.mjs:
lucide/dist/esm/icons/git-merge-conflict.mjs:
lucide/dist/esm/icons/git-pull-request-arrow.mjs:
lucide/dist/esm/icons/git-pull-request-closed.mjs:
lucide/dist/esm/icons/git-pull-request-create-arrow.mjs:
lucide/dist/esm/icons/git-pull-request-create.mjs:
lucide/dist/esm/icons/git-pull-request-draft.mjs:
lucide/dist/esm/icons/git-pull-request.mjs:
lucide/dist/esm/icons/glass-water.mjs:
lucide/dist/esm/icons/glasses.mjs:
lucide/dist/esm/icons/globe-check.mjs:
lucide/dist/esm/icons/globe-lock.mjs:
lucide/dist/esm/icons/globe-off.mjs:
lucide/dist/esm/icons/globe-x.mjs:
lucide/dist/esm/icons/goal.mjs:
lucide/dist/esm/icons/globe.mjs:
lucide/dist/esm/icons/gpu.mjs:
lucide/dist/esm/icons/graduation-cap.mjs:
lucide/dist/esm/icons/grape.mjs:
lucide/dist/esm/icons/grid-2x2-check.mjs:
lucide/dist/esm/icons/grid-2x2-plus.mjs:
lucide/dist/esm/icons/grid-2x2-x.mjs:
lucide/dist/esm/icons/grid-2x2.mjs:
lucide/dist/esm/icons/grid-3x2.mjs:
lucide/dist/esm/icons/grid-3x3.mjs:
lucide/dist/esm/icons/grip-horizontal.mjs:
lucide/dist/esm/icons/grip-vertical.mjs:
lucide/dist/esm/icons/grip.mjs:
lucide/dist/esm/icons/group.mjs:
lucide/dist/esm/icons/guitar.mjs:
lucide/dist/esm/icons/ham.mjs:
lucide/dist/esm/icons/hammer.mjs:
lucide/dist/esm/icons/hand-coins.mjs:
lucide/dist/esm/icons/hamburger.mjs:
lucide/dist/esm/icons/hand-fist.mjs:
lucide/dist/esm/icons/hand-grab.mjs:
lucide/dist/esm/icons/hand-heart.mjs:
lucide/dist/esm/icons/hand-helping.mjs:
lucide/dist/esm/icons/hand-metal.mjs:
lucide/dist/esm/icons/hand-platter.mjs:
lucide/dist/esm/icons/handbag.mjs:
lucide/dist/esm/icons/handshake.mjs:
lucide/dist/esm/icons/hand.mjs:
lucide/dist/esm/icons/hard-drive-download.mjs:
lucide/dist/esm/icons/hard-drive-upload.mjs:
lucide/dist/esm/icons/hard-drive.mjs:
lucide/dist/esm/icons/hard-hat.mjs:
lucide/dist/esm/icons/hash.mjs:
lucide/dist/esm/icons/hat-glasses.mjs:
lucide/dist/esm/icons/haze.mjs:
lucide/dist/esm/icons/hd.mjs:
lucide/dist/esm/icons/hdmi-port.mjs:
lucide/dist/esm/icons/heading-1.mjs:
lucide/dist/esm/icons/heading-2.mjs:
lucide/dist/esm/icons/heading-3.mjs:
lucide/dist/esm/icons/heading-4.mjs:
lucide/dist/esm/icons/heading-5.mjs:
lucide/dist/esm/icons/heading-6.mjs:
lucide/dist/esm/icons/heading.mjs:
lucide/dist/esm/icons/headphone-off.mjs:
lucide/dist/esm/icons/headphones.mjs:
lucide/dist/esm/icons/headset.mjs:
lucide/dist/esm/icons/heart-crack.mjs:
lucide/dist/esm/icons/heart-handshake.mjs:
lucide/dist/esm/icons/heart-minus.mjs:
lucide/dist/esm/icons/heart-off.mjs:
lucide/dist/esm/icons/heart-plus.mjs:
lucide/dist/esm/icons/heart-pulse.mjs:
lucide/dist/esm/icons/heart-x.mjs:
lucide/dist/esm/icons/heart.mjs:
lucide/dist/esm/icons/heater.mjs:
lucide/dist/esm/icons/helicopter.mjs:
lucide/dist/esm/icons/hexagon.mjs:
lucide/dist/esm/icons/highlighter.mjs:
lucide/dist/esm/icons/history.mjs:
lucide/dist/esm/icons/hop-off.mjs:
lucide/dist/esm/icons/hop.mjs:
lucide/dist/esm/icons/hospital.mjs:
lucide/dist/esm/icons/hotel.mjs:
lucide/dist/esm/icons/hourglass.mjs:
lucide/dist/esm/icons/house-heart.mjs:
lucide/dist/esm/icons/house-plus.mjs:
lucide/dist/esm/icons/house-plug.mjs:
lucide/dist/esm/icons/house-wifi.mjs:
lucide/dist/esm/icons/house.mjs:
lucide/dist/esm/icons/ice-cream-bowl.mjs:
lucide/dist/esm/icons/ice-cream-cone.mjs:
lucide/dist/esm/icons/id-card-lanyard.mjs:
lucide/dist/esm/icons/id-card.mjs:
lucide/dist/esm/icons/image-down.mjs:
lucide/dist/esm/icons/image-minus.mjs:
lucide/dist/esm/icons/image-off.mjs:
lucide/dist/esm/icons/image-play.mjs:
lucide/dist/esm/icons/image-plus.mjs:
lucide/dist/esm/icons/image-up.mjs:
lucide/dist/esm/icons/image-upscale.mjs:
lucide/dist/esm/icons/image.mjs:
lucide/dist/esm/icons/images.mjs:
lucide/dist/esm/icons/import.mjs:
lucide/dist/esm/icons/inbox.mjs:
lucide/dist/esm/icons/infinity.mjs:
lucide/dist/esm/icons/indian-rupee.mjs:
lucide/dist/esm/icons/info.mjs:
lucide/dist/esm/icons/inspection-panel.mjs:
lucide/dist/esm/icons/italic.mjs:
lucide/dist/esm/icons/iteration-ccw.mjs:
lucide/dist/esm/icons/iteration-cw.mjs:
lucide/dist/esm/icons/japanese-yen.mjs:
lucide/dist/esm/icons/joystick.mjs:
lucide/dist/esm/icons/kanban.mjs:
lucide/dist/esm/icons/kayak.mjs:
lucide/dist/esm/icons/key-round.mjs:
lucide/dist/esm/icons/key-square.mjs:
lucide/dist/esm/icons/key.mjs:
lucide/dist/esm/icons/keyboard-music.mjs:
lucide/dist/esm/icons/keyboard-off.mjs:
lucide/dist/esm/icons/keyboard.mjs:
lucide/dist/esm/icons/lamp-ceiling.mjs:
lucide/dist/esm/icons/lamp-desk.mjs:
lucide/dist/esm/icons/lamp-floor.mjs:
lucide/dist/esm/icons/lamp-wall-down.mjs:
lucide/dist/esm/icons/lamp-wall-up.mjs:
lucide/dist/esm/icons/land-plot.mjs:
lucide/dist/esm/icons/lamp.mjs:
lucide/dist/esm/icons/landmark.mjs:
lucide/dist/esm/icons/languages.mjs:
lucide/dist/esm/icons/laptop-minimal-check.mjs:
lucide/dist/esm/icons/laptop-minimal.mjs:
lucide/dist/esm/icons/laptop.mjs:
lucide/dist/esm/icons/lasso-select.mjs:
lucide/dist/esm/icons/laugh.mjs:
lucide/dist/esm/icons/lasso.mjs:
lucide/dist/esm/icons/layers-2.mjs:
lucide/dist/esm/icons/layers-minus.mjs:
lucide/dist/esm/icons/layers-plus.mjs:
lucide/dist/esm/icons/layers.mjs:
lucide/dist/esm/icons/layout-dashboard.mjs:
lucide/dist/esm/icons/layout-grid.mjs:
lucide/dist/esm/icons/layout-list.mjs:
lucide/dist/esm/icons/layout-panel-left.mjs:
lucide/dist/esm/icons/layout-panel-top.mjs:
lucide/dist/esm/icons/layout-template.mjs:
lucide/dist/esm/icons/leaf.mjs:
lucide/dist/esm/icons/leafy-green.mjs:
lucide/dist/esm/icons/lectern.mjs:
lucide/dist/esm/icons/lens-concave.mjs:
lucide/dist/esm/icons/lens-convex.mjs:
lucide/dist/esm/icons/library-big.mjs:
lucide/dist/esm/icons/library.mjs:
lucide/dist/esm/icons/life-buoy.mjs:
lucide/dist/esm/icons/ligature.mjs:
lucide/dist/esm/icons/lightbulb-off.mjs:
lucide/dist/esm/icons/lightbulb.mjs:
lucide/dist/esm/icons/line-dot-right-horizontal.mjs:
lucide/dist/esm/icons/line-squiggle.mjs:
lucide/dist/esm/icons/line-style.mjs:
lucide/dist/esm/icons/link-2-off.mjs:
lucide/dist/esm/icons/link-2.mjs:
lucide/dist/esm/icons/link.mjs:
lucide/dist/esm/icons/list-check.mjs:
lucide/dist/esm/icons/list-checks.mjs:
lucide/dist/esm/icons/list-chevrons-down-up.mjs:
lucide/dist/esm/icons/list-chevrons-up-down.mjs:
lucide/dist/esm/icons/list-collapse.mjs:
lucide/dist/esm/icons/list-end.mjs:
lucide/dist/esm/icons/list-filter-plus.mjs:
lucide/dist/esm/icons/list-filter.mjs:
lucide/dist/esm/icons/list-indent-decrease.mjs:
lucide/dist/esm/icons/list-indent-increase.mjs:
lucide/dist/esm/icons/list-minus.mjs:
lucide/dist/esm/icons/list-music.mjs:
lucide/dist/esm/icons/list-ordered.mjs:
lucide/dist/esm/icons/list-plus.mjs:
lucide/dist/esm/icons/list-restart.mjs:
lucide/dist/esm/icons/list-sort-ascending.mjs:
lucide/dist/esm/icons/list-start.mjs:
lucide/dist/esm/icons/list-sort-descending.mjs:
lucide/dist/esm/icons/list-todo.mjs:
lucide/dist/esm/icons/list-tree.mjs:
lucide/dist/esm/icons/list-video.mjs:
lucide/dist/esm/icons/list-x.mjs:
lucide/dist/esm/icons/list.mjs:
lucide/dist/esm/icons/loader-circle.mjs:
lucide/dist/esm/icons/loader-pinwheel.mjs:
lucide/dist/esm/icons/loader.mjs:
lucide/dist/esm/icons/locate-fixed.mjs:
lucide/dist/esm/icons/locate-off.mjs:
lucide/dist/esm/icons/locate.mjs:
lucide/dist/esm/icons/lock-keyhole-open.mjs:
lucide/dist/esm/icons/lock-keyhole.mjs:
lucide/dist/esm/icons/lock-open.mjs:
lucide/dist/esm/icons/lock.mjs:
lucide/dist/esm/icons/log-in.mjs:
lucide/dist/esm/icons/log-out.mjs:
lucide/dist/esm/icons/logs.mjs:
lucide/dist/esm/icons/lollipop.mjs:
lucide/dist/esm/icons/luggage.mjs:
lucide/dist/esm/icons/magnet.mjs:
lucide/dist/esm/icons/mail-check.mjs:
lucide/dist/esm/icons/mail-minus.mjs:
lucide/dist/esm/icons/mail-open.mjs:
lucide/dist/esm/icons/mail-plus.mjs:
lucide/dist/esm/icons/mail-search.mjs:
lucide/dist/esm/icons/mail-question-mark.mjs:
lucide/dist/esm/icons/mail-x.mjs:
lucide/dist/esm/icons/mail-warning.mjs:
lucide/dist/esm/icons/mail.mjs:
lucide/dist/esm/icons/mailbox.mjs:
lucide/dist/esm/icons/mails.mjs:
lucide/dist/esm/icons/map-minus.mjs:
lucide/dist/esm/icons/map-pin-check-inside.mjs:
lucide/dist/esm/icons/map-pin-check.mjs:
lucide/dist/esm/icons/map-pin-house.mjs:
lucide/dist/esm/icons/map-pin-minus-inside.mjs:
lucide/dist/esm/icons/map-pin-minus.mjs:
lucide/dist/esm/icons/map-pin-off.mjs:
lucide/dist/esm/icons/map-pin-pen.mjs:
lucide/dist/esm/icons/map-pin-plus-inside.mjs:
lucide/dist/esm/icons/map-pin-plus.mjs:
lucide/dist/esm/icons/map-pin-search.mjs:
lucide/dist/esm/icons/map-pin-x-inside.mjs:
lucide/dist/esm/icons/map-pin-x.mjs:
lucide/dist/esm/icons/map-pin.mjs:
lucide/dist/esm/icons/map-pinned.mjs:
lucide/dist/esm/icons/map-plus.mjs:
lucide/dist/esm/icons/map.mjs:
lucide/dist/esm/icons/mars-stroke.mjs:
lucide/dist/esm/icons/mars.mjs:
lucide/dist/esm/icons/martini.mjs:
lucide/dist/esm/icons/maximize-2.mjs:
lucide/dist/esm/icons/maximize.mjs:
lucide/dist/esm/icons/medal.mjs:
lucide/dist/esm/icons/megaphone.mjs:
lucide/dist/esm/icons/megaphone-off.mjs:
lucide/dist/esm/icons/meh.mjs:
lucide/dist/esm/icons/memory-stick.mjs:
lucide/dist/esm/icons/menu.mjs:
lucide/dist/esm/icons/merge.mjs:
lucide/dist/esm/icons/message-circle-check.mjs:
lucide/dist/esm/icons/message-circle-code.mjs:
lucide/dist/esm/icons/message-circle-dashed.mjs:
lucide/dist/esm/icons/message-circle-heart.mjs:
lucide/dist/esm/icons/message-circle-more.mjs:
lucide/dist/esm/icons/message-circle-off.mjs:
lucide/dist/esm/icons/message-circle-plus.mjs:
lucide/dist/esm/icons/message-circle-question-mark.mjs:
lucide/dist/esm/icons/message-circle-reply.mjs:
lucide/dist/esm/icons/message-circle-x.mjs:
lucide/dist/esm/icons/message-circle-warning.mjs:
lucide/dist/esm/icons/message-circle.mjs:
lucide/dist/esm/icons/message-square-check.mjs:
lucide/dist/esm/icons/message-square-code.mjs:
lucide/dist/esm/icons/message-square-dashed.mjs:
lucide/dist/esm/icons/message-square-diff.mjs:
lucide/dist/esm/icons/message-square-dot.mjs:
lucide/dist/esm/icons/message-square-heart.mjs:
lucide/dist/esm/icons/message-square-lock.mjs:
lucide/dist/esm/icons/message-square-more.mjs:
lucide/dist/esm/icons/message-square-off.mjs:
lucide/dist/esm/icons/message-square-plus.mjs:
lucide/dist/esm/icons/message-square-quote.mjs:
lucide/dist/esm/icons/message-square-reply.mjs:
lucide/dist/esm/icons/message-square-share.mjs:
lucide/dist/esm/icons/message-square-text.mjs:
lucide/dist/esm/icons/message-square-warning.mjs:
lucide/dist/esm/icons/message-square-x.mjs:
lucide/dist/esm/icons/message-square.mjs:
lucide/dist/esm/icons/messages-square.mjs:
lucide/dist/esm/icons/metronome.mjs:
lucide/dist/esm/icons/mic-off.mjs:
lucide/dist/esm/icons/mic-vocal.mjs:
lucide/dist/esm/icons/mic.mjs:
lucide/dist/esm/icons/microscope.mjs:
lucide/dist/esm/icons/microwave.mjs:
lucide/dist/esm/icons/microchip.mjs:
lucide/dist/esm/icons/milestone.mjs:
lucide/dist/esm/icons/milk-off.mjs:
lucide/dist/esm/icons/milk.mjs:
lucide/dist/esm/icons/minimize-2.mjs:
lucide/dist/esm/icons/minimize.mjs:
lucide/dist/esm/icons/minus.mjs:
lucide/dist/esm/icons/mirror-rectangular.mjs:
lucide/dist/esm/icons/mirror-round.mjs:
lucide/dist/esm/icons/monitor-check.mjs:
lucide/dist/esm/icons/monitor-cloud.mjs:
lucide/dist/esm/icons/monitor-cog.mjs:
lucide/dist/esm/icons/monitor-dot.mjs:
lucide/dist/esm/icons/monitor-down.mjs:
lucide/dist/esm/icons/monitor-off.mjs:
lucide/dist/esm/icons/monitor-pause.mjs:
lucide/dist/esm/icons/monitor-play.mjs:
lucide/dist/esm/icons/monitor-smartphone.mjs:
lucide/dist/esm/icons/monitor-speaker.mjs:
lucide/dist/esm/icons/monitor-stop.mjs:
lucide/dist/esm/icons/monitor-up.mjs:
lucide/dist/esm/icons/monitor-x.mjs:
lucide/dist/esm/icons/monitor.mjs:
lucide/dist/esm/icons/moon-star.mjs:
lucide/dist/esm/icons/moon.mjs:
lucide/dist/esm/icons/motorbike.mjs:
lucide/dist/esm/icons/mountain.mjs:
lucide/dist/esm/icons/mountain-snow.mjs:
lucide/dist/esm/icons/mouse-left.mjs:
lucide/dist/esm/icons/mouse-off.mjs:
lucide/dist/esm/icons/mouse-pointer-2-off.mjs:
lucide/dist/esm/icons/mouse-pointer-2.mjs:
lucide/dist/esm/icons/mouse-pointer-ban.mjs:
lucide/dist/esm/icons/mouse-pointer-click.mjs:
lucide/dist/esm/icons/mouse-pointer.mjs:
lucide/dist/esm/icons/mouse-right.mjs:
lucide/dist/esm/icons/mouse.mjs:
lucide/dist/esm/icons/move-3d.mjs:
lucide/dist/esm/icons/move-diagonal-2.mjs:
lucide/dist/esm/icons/move-diagonal.mjs:
lucide/dist/esm/icons/move-down-left.mjs:
lucide/dist/esm/icons/move-down-right.mjs:
lucide/dist/esm/icons/move-down.mjs:
lucide/dist/esm/icons/move-horizontal.mjs:
lucide/dist/esm/icons/move-left.mjs:
lucide/dist/esm/icons/move-right.mjs:
lucide/dist/esm/icons/move-up-left.mjs:
lucide/dist/esm/icons/move-up-right.mjs:
lucide/dist/esm/icons/move-up.mjs:
lucide/dist/esm/icons/move-vertical.mjs:
lucide/dist/esm/icons/move.mjs:
lucide/dist/esm/icons/music-2.mjs:
lucide/dist/esm/icons/music-3.mjs:
lucide/dist/esm/icons/music-4.mjs:
lucide/dist/esm/icons/music.mjs:
lucide/dist/esm/icons/navigation-2-off.mjs:
lucide/dist/esm/icons/navigation-2.mjs:
lucide/dist/esm/icons/navigation-off.mjs:
lucide/dist/esm/icons/navigation.mjs:
lucide/dist/esm/icons/network.mjs:
lucide/dist/esm/icons/newspaper.mjs:
lucide/dist/esm/icons/nfc.mjs:
lucide/dist/esm/icons/non-binary.mjs:
lucide/dist/esm/icons/notebook-pen.mjs:
lucide/dist/esm/icons/notebook-tabs.mjs:
lucide/dist/esm/icons/notebook-text.mjs:
lucide/dist/esm/icons/notebook.mjs:
lucide/dist/esm/icons/notepad-text-dashed.mjs:
lucide/dist/esm/icons/nut-off.mjs:
lucide/dist/esm/icons/nut.mjs:
lucide/dist/esm/icons/notepad-text.mjs:
lucide/dist/esm/icons/octagon-alert.mjs:
lucide/dist/esm/icons/octagon-minus.mjs:
lucide/dist/esm/icons/octagon-pause.mjs:
lucide/dist/esm/icons/octagon-x.mjs:
lucide/dist/esm/icons/octagon.mjs:
lucide/dist/esm/icons/omega.mjs:
lucide/dist/esm/icons/option.mjs:
lucide/dist/esm/icons/orbit.mjs:
lucide/dist/esm/icons/origami.mjs:
lucide/dist/esm/icons/package-2.mjs:
lucide/dist/esm/icons/package-check.mjs:
lucide/dist/esm/icons/package-minus.mjs:
lucide/dist/esm/icons/package-open.mjs:
lucide/dist/esm/icons/package-plus.mjs:
lucide/dist/esm/icons/package-search.mjs:
lucide/dist/esm/icons/package-x.mjs:
lucide/dist/esm/icons/package.mjs:
lucide/dist/esm/icons/paint-bucket.mjs:
lucide/dist/esm/icons/paint-roller.mjs:
lucide/dist/esm/icons/paintbrush-vertical.mjs:
lucide/dist/esm/icons/paintbrush.mjs:
lucide/dist/esm/icons/palette.mjs:
lucide/dist/esm/icons/panda.mjs:
lucide/dist/esm/icons/panel-bottom-close.mjs:
lucide/dist/esm/icons/panel-bottom-dashed.mjs:
lucide/dist/esm/icons/panel-bottom-open.mjs:
lucide/dist/esm/icons/panel-bottom.mjs:
lucide/dist/esm/icons/panel-left-close.mjs:
lucide/dist/esm/icons/panel-left-dashed.mjs:
lucide/dist/esm/icons/panel-left-open.mjs:
lucide/dist/esm/icons/panel-left-right-dashed.mjs:
lucide/dist/esm/icons/panel-left.mjs:
lucide/dist/esm/icons/panel-right-close.mjs:
lucide/dist/esm/icons/panel-right-dashed.mjs:
lucide/dist/esm/icons/panel-right-open.mjs:
lucide/dist/esm/icons/panel-right.mjs:
lucide/dist/esm/icons/panel-top-bottom-dashed.mjs:
lucide/dist/esm/icons/panel-top-close.mjs:
lucide/dist/esm/icons/panel-top-dashed.mjs:
lucide/dist/esm/icons/panel-top-open.mjs:
lucide/dist/esm/icons/panel-top.mjs:
lucide/dist/esm/icons/panels-left-bottom.mjs:
lucide/dist/esm/icons/panels-right-bottom.mjs:
lucide/dist/esm/icons/panels-top-left.mjs:
lucide/dist/esm/icons/paper-bag.mjs:
lucide/dist/esm/icons/paperclip.mjs:
lucide/dist/esm/icons/parasol.mjs:
lucide/dist/esm/icons/parentheses.mjs:
lucide/dist/esm/icons/parking-meter.mjs:
lucide/dist/esm/icons/party-popper.mjs:
lucide/dist/esm/icons/pause.mjs:
lucide/dist/esm/icons/paw-print.mjs:
lucide/dist/esm/icons/pc-case.mjs:
lucide/dist/esm/icons/pen-line.mjs:
lucide/dist/esm/icons/pen-off.mjs:
lucide/dist/esm/icons/pen-tool.mjs:
lucide/dist/esm/icons/pen.mjs:
lucide/dist/esm/icons/pencil-line.mjs:
lucide/dist/esm/icons/pencil-off.mjs:
lucide/dist/esm/icons/pencil-ruler.mjs:
lucide/dist/esm/icons/pencil-sparkles.mjs:
lucide/dist/esm/icons/pencil.mjs:
lucide/dist/esm/icons/pentagon.mjs:
lucide/dist/esm/icons/percent.mjs:
lucide/dist/esm/icons/phi.mjs:
lucide/dist/esm/icons/person-standing.mjs:
lucide/dist/esm/icons/philippine-peso.mjs:
lucide/dist/esm/icons/phone-call.mjs:
lucide/dist/esm/icons/phone-forwarded.mjs:
lucide/dist/esm/icons/phone-incoming.mjs:
lucide/dist/esm/icons/phone-missed.mjs:
lucide/dist/esm/icons/phone-off.mjs:
lucide/dist/esm/icons/phone-outgoing.mjs:
lucide/dist/esm/icons/phone.mjs:
lucide/dist/esm/icons/pi.mjs:
lucide/dist/esm/icons/piano.mjs:
lucide/dist/esm/icons/pickaxe.mjs:
lucide/dist/esm/icons/picture-in-picture-2.mjs:
lucide/dist/esm/icons/picture-in-picture.mjs:
lucide/dist/esm/icons/piggy-bank.mjs:
lucide/dist/esm/icons/pilcrow-left.mjs:
lucide/dist/esm/icons/pilcrow-right.mjs:
lucide/dist/esm/icons/pilcrow.mjs:
lucide/dist/esm/icons/pill-bottle.mjs:
lucide/dist/esm/icons/pill.mjs:
lucide/dist/esm/icons/pin-off.mjs:
lucide/dist/esm/icons/pin.mjs:
lucide/dist/esm/icons/pipette.mjs:
lucide/dist/esm/icons/pizza.mjs:
lucide/dist/esm/icons/plane-landing.mjs:
lucide/dist/esm/icons/plane-takeoff.mjs:
lucide/dist/esm/icons/plane.mjs:
lucide/dist/esm/icons/play-off.mjs:
lucide/dist/esm/icons/play.mjs:
lucide/dist/esm/icons/plug-2.mjs:
lucide/dist/esm/icons/plug-zap.mjs:
lucide/dist/esm/icons/plug.mjs:
lucide/dist/esm/icons/plus.mjs:
lucide/dist/esm/icons/pocket-knife.mjs:
lucide/dist/esm/icons/podcast.mjs:
lucide/dist/esm/icons/podium.mjs:
lucide/dist/esm/icons/pointer-off.mjs:
lucide/dist/esm/icons/pointer.mjs:
lucide/dist/esm/icons/popcorn.mjs:
lucide/dist/esm/icons/popsicle.mjs:
lucide/dist/esm/icons/pound-sterling.mjs:
lucide/dist/esm/icons/power-off.mjs:
lucide/dist/esm/icons/power.mjs:
lucide/dist/esm/icons/printer-check.mjs:
lucide/dist/esm/icons/presentation.mjs:
lucide/dist/esm/icons/printer-x.mjs:
lucide/dist/esm/icons/printer.mjs:
lucide/dist/esm/icons/projector.mjs:
lucide/dist/esm/icons/proportions.mjs:
lucide/dist/esm/icons/puzzle.mjs:
lucide/dist/esm/icons/pyramid.mjs:
lucide/dist/esm/icons/qr-code.mjs:
lucide/dist/esm/icons/quote.mjs:
lucide/dist/esm/icons/rabbit.mjs:
lucide/dist/esm/icons/radar.mjs:
lucide/dist/esm/icons/radiation.mjs:
lucide/dist/esm/icons/radical.mjs:
lucide/dist/esm/icons/radio-off.mjs:
lucide/dist/esm/icons/radio-receiver.mjs:
lucide/dist/esm/icons/radio-tower.mjs:
lucide/dist/esm/icons/radio.mjs:
lucide/dist/esm/icons/radius.mjs:
lucide/dist/esm/icons/rainbow.mjs:
lucide/dist/esm/icons/rat.mjs:
lucide/dist/esm/icons/ratio.mjs:
lucide/dist/esm/icons/receipt-cent.mjs:
lucide/dist/esm/icons/receipt-euro.mjs:
lucide/dist/esm/icons/receipt-indian-rupee.mjs:
lucide/dist/esm/icons/receipt-japanese-yen.mjs:
lucide/dist/esm/icons/receipt-pound-sterling.mjs:
lucide/dist/esm/icons/receipt-russian-ruble.mjs:
lucide/dist/esm/icons/receipt-swiss-franc.mjs:
lucide/dist/esm/icons/receipt-text.mjs:
lucide/dist/esm/icons/receipt-turkish-lira.mjs:
lucide/dist/esm/icons/receipt.mjs:
lucide/dist/esm/icons/rectangle-circle.mjs:
lucide/dist/esm/icons/rectangle-ellipsis.mjs:
lucide/dist/esm/icons/rectangle-goggles.mjs:
lucide/dist/esm/icons/rectangle-horizontal.mjs:
lucide/dist/esm/icons/rectangle-vertical.mjs:
lucide/dist/esm/icons/recycle.mjs:
lucide/dist/esm/icons/redo-2.mjs:
lucide/dist/esm/icons/redo.mjs:
lucide/dist/esm/icons/redo-dot.mjs:
lucide/dist/esm/icons/refresh-ccw-dot.mjs:
lucide/dist/esm/icons/refresh-ccw.mjs:
lucide/dist/esm/icons/refresh-cw-off.mjs:
lucide/dist/esm/icons/refresh-cw.mjs:
lucide/dist/esm/icons/refrigerator.mjs:
lucide/dist/esm/icons/regex.mjs:
lucide/dist/esm/icons/remove-formatting.mjs:
lucide/dist/esm/icons/repeat-1.mjs:
lucide/dist/esm/icons/repeat-2.mjs:
lucide/dist/esm/icons/repeat-off.mjs:
lucide/dist/esm/icons/repeat.mjs:
lucide/dist/esm/icons/replace-all.mjs:
lucide/dist/esm/icons/reply-all.mjs:
lucide/dist/esm/icons/replace.mjs:
lucide/dist/esm/icons/reply.mjs:
lucide/dist/esm/icons/rewind.mjs:
lucide/dist/esm/icons/road.mjs:
lucide/dist/esm/icons/rocket.mjs:
lucide/dist/esm/icons/ribbon.mjs:
lucide/dist/esm/icons/rocking-chair.mjs:
lucide/dist/esm/icons/roller-coaster.mjs:
lucide/dist/esm/icons/rose.mjs:
lucide/dist/esm/icons/rotate-3d.mjs:
lucide/dist/esm/icons/rotate-ccw-key.mjs:
lucide/dist/esm/icons/rotate-ccw.mjs:
lucide/dist/esm/icons/rotate-ccw-square.mjs:
lucide/dist/esm/icons/rotate-cw-square.mjs:
lucide/dist/esm/icons/rotate-cw.mjs:
lucide/dist/esm/icons/route-off.mjs:
lucide/dist/esm/icons/route.mjs:
lucide/dist/esm/icons/router.mjs:
lucide/dist/esm/icons/rows-2.mjs:
lucide/dist/esm/icons/rows-3.mjs:
lucide/dist/esm/icons/rows-4.mjs:
lucide/dist/esm/icons/rss.mjs:
lucide/dist/esm/icons/ruler-dimension-line.mjs:
lucide/dist/esm/icons/ruler.mjs:
lucide/dist/esm/icons/russian-ruble.mjs:
lucide/dist/esm/icons/sailboat.mjs:
lucide/dist/esm/icons/salad.mjs:
lucide/dist/esm/icons/sandwich.mjs:
lucide/dist/esm/icons/satellite-dish.mjs:
lucide/dist/esm/icons/satellite.mjs:
lucide/dist/esm/icons/saudi-riyal.mjs:
lucide/dist/esm/icons/save-all.mjs:
lucide/dist/esm/icons/save-check.mjs:
lucide/dist/esm/icons/save-pen.mjs:
lucide/dist/esm/icons/save-off.mjs:
lucide/dist/esm/icons/save-plus.mjs:
lucide/dist/esm/icons/scale-3d.mjs:
lucide/dist/esm/icons/save.mjs:
lucide/dist/esm/icons/scale.mjs:
lucide/dist/esm/icons/scan-barcode.mjs:
lucide/dist/esm/icons/scaling.mjs:
lucide/dist/esm/icons/scan-eye.mjs:
lucide/dist/esm/icons/scan-face.mjs:
lucide/dist/esm/icons/scan-heart.mjs:
lucide/dist/esm/icons/scan-line.mjs:
lucide/dist/esm/icons/scan-qr-code.mjs:
lucide/dist/esm/icons/scan-text.mjs:
lucide/dist/esm/icons/scan-search.mjs:
lucide/dist/esm/icons/scan.mjs:
lucide/dist/esm/icons/school.mjs:
lucide/dist/esm/icons/scissors-line-dashed.mjs:
lucide/dist/esm/icons/scissors.mjs:
lucide/dist/esm/icons/scooter.mjs:
lucide/dist/esm/icons/screen-share-off.mjs:
lucide/dist/esm/icons/screen-share.mjs:
lucide/dist/esm/icons/scroll-text.mjs:
lucide/dist/esm/icons/scroll.mjs:
lucide/dist/esm/icons/search-alert.mjs:
lucide/dist/esm/icons/search-check.mjs:
lucide/dist/esm/icons/search-code.mjs:
lucide/dist/esm/icons/search-slash.mjs:
lucide/dist/esm/icons/search-x.mjs:
lucide/dist/esm/icons/search.mjs:
lucide/dist/esm/icons/section.mjs:
lucide/dist/esm/icons/send-horizontal.mjs:
lucide/dist/esm/icons/send-to-back.mjs:
lucide/dist/esm/icons/send.mjs:
lucide/dist/esm/icons/separator-horizontal.mjs:
lucide/dist/esm/icons/separator-vertical.mjs:
lucide/dist/esm/icons/server-cog.mjs:
lucide/dist/esm/icons/server-crash.mjs:
lucide/dist/esm/icons/server-off.mjs:
lucide/dist/esm/icons/server.mjs:
lucide/dist/esm/icons/settings-2.mjs:
lucide/dist/esm/icons/settings.mjs:
lucide/dist/esm/icons/shapes.mjs:
lucide/dist/esm/icons/share.mjs:
lucide/dist/esm/icons/share-2.mjs:
lucide/dist/esm/icons/sheet.mjs:
lucide/dist/esm/icons/shell.mjs:
lucide/dist/esm/icons/shelving-unit.mjs:
lucide/dist/esm/icons/shield-alert.mjs:
lucide/dist/esm/icons/shield-ban.mjs:
lucide/dist/esm/icons/shield-check.mjs:
lucide/dist/esm/icons/shield-cog-corner.mjs:
lucide/dist/esm/icons/shield-cog.mjs:
lucide/dist/esm/icons/shield-ellipsis.mjs:
lucide/dist/esm/icons/shield-half.mjs:
lucide/dist/esm/icons/shield-minus.mjs:
lucide/dist/esm/icons/shield-plus.mjs:
lucide/dist/esm/icons/shield-off.mjs:
lucide/dist/esm/icons/shield-question-mark.mjs:
lucide/dist/esm/icons/shield-user.mjs:
lucide/dist/esm/icons/shield-x.mjs:
lucide/dist/esm/icons/shield.mjs:
lucide/dist/esm/icons/ship-wheel.mjs:
lucide/dist/esm/icons/ship.mjs:
lucide/dist/esm/icons/shirt.mjs:
lucide/dist/esm/icons/shopping-bag.mjs:
lucide/dist/esm/icons/shopping-basket.mjs:
lucide/dist/esm/icons/shovel.mjs:
lucide/dist/esm/icons/shower-head.mjs:
lucide/dist/esm/icons/shopping-cart.mjs:
lucide/dist/esm/icons/shredder.mjs:
lucide/dist/esm/icons/shrimp.mjs:
lucide/dist/esm/icons/shrub.mjs:
lucide/dist/esm/icons/shuffle.mjs:
lucide/dist/esm/icons/shrink.mjs:
lucide/dist/esm/icons/sigma.mjs:
lucide/dist/esm/icons/signal-high.mjs:
lucide/dist/esm/icons/signal-low.mjs:
lucide/dist/esm/icons/signal-zero.mjs:
lucide/dist/esm/icons/signal-medium.mjs:
lucide/dist/esm/icons/signal.mjs:
lucide/dist/esm/icons/signature.mjs:
lucide/dist/esm/icons/signpost-big.mjs:
lucide/dist/esm/icons/signpost.mjs:
lucide/dist/esm/icons/siren.mjs:
lucide/dist/esm/icons/skip-back.mjs:
lucide/dist/esm/icons/skip-forward.mjs:
lucide/dist/esm/icons/skull.mjs:
lucide/dist/esm/icons/slash.mjs:
lucide/dist/esm/icons/slice.mjs:
lucide/dist/esm/icons/sliders-horizontal.mjs:
lucide/dist/esm/icons/sliders-vertical.mjs:
lucide/dist/esm/icons/smartphone-charging.mjs:
lucide/dist/esm/icons/smartphone-nfc.mjs:
lucide/dist/esm/icons/smartphone.mjs:
lucide/dist/esm/icons/smile.mjs:
lucide/dist/esm/icons/smile-plus.mjs:
lucide/dist/esm/icons/snail.mjs:
lucide/dist/esm/icons/snowflake.mjs:
lucide/dist/esm/icons/soap-dispenser-droplet.mjs:
lucide/dist/esm/icons/sofa.mjs:
lucide/dist/esm/icons/solar-panel.mjs:
lucide/dist/esm/icons/soup.mjs:
lucide/dist/esm/icons/space.mjs:
lucide/dist/esm/icons/spade.mjs:
lucide/dist/esm/icons/sparkle.mjs:
lucide/dist/esm/icons/sparkles.mjs:
lucide/dist/esm/icons/speaker.mjs:
lucide/dist/esm/icons/speech.mjs:
lucide/dist/esm/icons/spell-check-2.mjs:
lucide/dist/esm/icons/spell-check.mjs:
lucide/dist/esm/icons/spline-pointer.mjs:
lucide/dist/esm/icons/split.mjs:
lucide/dist/esm/icons/spline.mjs:
lucide/dist/esm/icons/spool.mjs:
lucide/dist/esm/icons/sport-shoe.mjs:
lucide/dist/esm/icons/spotlight.mjs:
lucide/dist/esm/icons/spray-can.mjs:
lucide/dist/esm/icons/sprout.mjs:
lucide/dist/esm/icons/square-activity.mjs:
lucide/dist/esm/icons/square-arrow-down-left.mjs:
lucide/dist/esm/icons/square-arrow-down-right.mjs:
lucide/dist/esm/icons/square-arrow-down.mjs:
lucide/dist/esm/icons/square-arrow-left.mjs:
lucide/dist/esm/icons/square-arrow-out-down-left.mjs:
lucide/dist/esm/icons/square-arrow-out-down-right.mjs:
lucide/dist/esm/icons/square-arrow-out-up-left.mjs:
lucide/dist/esm/icons/square-arrow-out-up-right.mjs:
lucide/dist/esm/icons/square-arrow-right-enter.mjs:
lucide/dist/esm/icons/square-arrow-right-exit.mjs:
lucide/dist/esm/icons/square-arrow-right.mjs:
lucide/dist/esm/icons/square-arrow-up-left.mjs:
lucide/dist/esm/icons/square-arrow-up.mjs:
lucide/dist/esm/icons/square-arrow-up-right.mjs:
lucide/dist/esm/icons/square-asterisk.mjs:
lucide/dist/esm/icons/square-bottom-dashed-scissors.mjs:
lucide/dist/esm/icons/square-centerline-dashed-horizontal.mjs:
lucide/dist/esm/icons/square-centerline-dashed-vertical.mjs:
lucide/dist/esm/icons/square-chart-gantt.mjs:
lucide/dist/esm/icons/square-check-big.mjs:
lucide/dist/esm/icons/square-check.mjs:
lucide/dist/esm/icons/square-chevron-down.mjs:
lucide/dist/esm/icons/square-chevron-left.mjs:
lucide/dist/esm/icons/square-chevron-right.mjs:
lucide/dist/esm/icons/square-code.mjs:
lucide/dist/esm/icons/square-chevron-up.mjs:
lucide/dist/esm/icons/square-dashed-bottom-code.mjs:
lucide/dist/esm/icons/square-dashed-bottom.mjs:
lucide/dist/esm/icons/square-dashed-kanban.mjs:
lucide/dist/esm/icons/square-dashed-mouse-pointer.mjs:
lucide/dist/esm/icons/square-dashed-text.mjs:
lucide/dist/esm/icons/square-dashed-top-solid.mjs:
lucide/dist/esm/icons/square-dashed.mjs:
lucide/dist/esm/icons/square-divide.mjs:
lucide/dist/esm/icons/square-dot.mjs:
lucide/dist/esm/icons/square-equal.mjs:
lucide/dist/esm/icons/square-function.mjs:
lucide/dist/esm/icons/square-kanban.mjs:
lucide/dist/esm/icons/square-library.mjs:
lucide/dist/esm/icons/square-m.mjs:
lucide/dist/esm/icons/square-menu.mjs:
lucide/dist/esm/icons/square-minus.mjs:
lucide/dist/esm/icons/square-parking-off.mjs:
lucide/dist/esm/icons/square-mouse-pointer.mjs:
lucide/dist/esm/icons/square-parking.mjs:
lucide/dist/esm/icons/square-pause.mjs:
lucide/dist/esm/icons/square-pen.mjs:
lucide/dist/esm/icons/square-percent.mjs:
lucide/dist/esm/icons/square-pi.mjs:
lucide/dist/esm/icons/square-pilcrow.mjs:
lucide/dist/esm/icons/square-play.mjs:
lucide/dist/esm/icons/square-plus.mjs:
lucide/dist/esm/icons/square-power.mjs:
lucide/dist/esm/icons/square-round-corner.mjs:
lucide/dist/esm/icons/square-radical.mjs:
lucide/dist/esm/icons/square-scissors.mjs:
lucide/dist/esm/icons/square-sigma.mjs:
lucide/dist/esm/icons/square-slash.mjs:
lucide/dist/esm/icons/square-split-horizontal.mjs:
lucide/dist/esm/icons/square-split-vertical.mjs:
lucide/dist/esm/icons/square-square.mjs:
lucide/dist/esm/icons/square-stack.mjs:
lucide/dist/esm/icons/square-star.mjs:
lucide/dist/esm/icons/square-stop.mjs:
lucide/dist/esm/icons/square-terminal.mjs:
lucide/dist/esm/icons/square-user.mjs:
lucide/dist/esm/icons/square-user-round.mjs:
lucide/dist/esm/icons/square-x.mjs:
lucide/dist/esm/icons/squares-exclude.mjs:
lucide/dist/esm/icons/square.mjs:
lucide/dist/esm/icons/squares-intersect.mjs:
lucide/dist/esm/icons/squares-subtract.mjs:
lucide/dist/esm/icons/squares-unite.mjs:
lucide/dist/esm/icons/squircle-dashed.mjs:
lucide/dist/esm/icons/squircle.mjs:
lucide/dist/esm/icons/stamp.mjs:
lucide/dist/esm/icons/squirrel.mjs:
lucide/dist/esm/icons/star-check.mjs:
lucide/dist/esm/icons/star-half.mjs:
lucide/dist/esm/icons/star-minus.mjs:
lucide/dist/esm/icons/star-plus.mjs:
lucide/dist/esm/icons/star-off.mjs:
lucide/dist/esm/icons/star-x.mjs:
lucide/dist/esm/icons/star.mjs:
lucide/dist/esm/icons/step-back.mjs:
lucide/dist/esm/icons/step-forward.mjs:
lucide/dist/esm/icons/stethoscope.mjs:
lucide/dist/esm/icons/sticker.mjs:
lucide/dist/esm/icons/sticky-note-check.mjs:
lucide/dist/esm/icons/sticky-note-minus.mjs:
lucide/dist/esm/icons/sticky-note-off.mjs:
lucide/dist/esm/icons/sticky-note-x.mjs:
lucide/dist/esm/icons/sticky-note-plus.mjs:
lucide/dist/esm/icons/sticky-note.mjs:
lucide/dist/esm/icons/sticky-notes.mjs:
lucide/dist/esm/icons/stone.mjs:
lucide/dist/esm/icons/store.mjs:
lucide/dist/esm/icons/stretch-horizontal.mjs:
lucide/dist/esm/icons/strikethrough.mjs:
lucide/dist/esm/icons/subscript.mjs:
lucide/dist/esm/icons/stretch-vertical.mjs:
lucide/dist/esm/icons/summary.mjs:
lucide/dist/esm/icons/sun-dim.mjs:
lucide/dist/esm/icons/sun-medium.mjs:
lucide/dist/esm/icons/sun-moon.mjs:
lucide/dist/esm/icons/sun-snow.mjs:
lucide/dist/esm/icons/sun.mjs:
lucide/dist/esm/icons/sunrise.mjs:
lucide/dist/esm/icons/sunset.mjs:
lucide/dist/esm/icons/superscript.mjs:
lucide/dist/esm/icons/swatch-book.mjs:
lucide/dist/esm/icons/swiss-franc.mjs:
lucide/dist/esm/icons/switch-camera.mjs:
lucide/dist/esm/icons/sword.mjs:
lucide/dist/esm/icons/swords.mjs:
lucide/dist/esm/icons/syringe.mjs:
lucide/dist/esm/icons/table-2.mjs:
lucide/dist/esm/icons/table-cells-merge.mjs:
lucide/dist/esm/icons/table-cells-split.mjs:
lucide/dist/esm/icons/table-columns-split.mjs:
lucide/dist/esm/icons/table-of-contents.mjs:
lucide/dist/esm/icons/table-properties.mjs:
lucide/dist/esm/icons/table-rows-split.mjs:
lucide/dist/esm/icons/table.mjs:
lucide/dist/esm/icons/tablet-smartphone.mjs:
lucide/dist/esm/icons/tablet.mjs:
lucide/dist/esm/icons/tablets.mjs:
lucide/dist/esm/icons/tag-plus.mjs:
lucide/dist/esm/icons/tag.mjs:
lucide/dist/esm/icons/tag-x.mjs:
lucide/dist/esm/icons/tags.mjs:
lucide/dist/esm/icons/tally-1.mjs:
lucide/dist/esm/icons/tally-2.mjs:
lucide/dist/esm/icons/tally-3.mjs:
lucide/dist/esm/icons/tally-4.mjs:
lucide/dist/esm/icons/tally-5.mjs:
lucide/dist/esm/icons/tangent.mjs:
lucide/dist/esm/icons/target.mjs:
lucide/dist/esm/icons/telescope.mjs:
lucide/dist/esm/icons/tent-tree.mjs:
lucide/dist/esm/icons/tent.mjs:
lucide/dist/esm/icons/terminal.mjs:
lucide/dist/esm/icons/test-tube.mjs:
lucide/dist/esm/icons/test-tube-diagonal.mjs:
lucide/dist/esm/icons/test-tubes.mjs:
lucide/dist/esm/icons/text-align-center.mjs:
lucide/dist/esm/icons/text-align-end.mjs:
lucide/dist/esm/icons/text-align-justify.mjs:
lucide/dist/esm/icons/text-align-start.mjs:
lucide/dist/esm/icons/text-cursor-input.mjs:
lucide/dist/esm/icons/text-cursor.mjs:
lucide/dist/esm/icons/text-initial.mjs:
lucide/dist/esm/icons/text-quote.mjs:
lucide/dist/esm/icons/text-search.mjs:
lucide/dist/esm/icons/theater.mjs:
lucide/dist/esm/icons/text-wrap.mjs:
lucide/dist/esm/icons/thermometer-snowflake.mjs:
lucide/dist/esm/icons/thermometer-sun.mjs:
lucide/dist/esm/icons/thermometer.mjs:
lucide/dist/esm/icons/thumbs-down.mjs:
lucide/dist/esm/icons/thumbs-up.mjs:
lucide/dist/esm/icons/ticket-check.mjs:
lucide/dist/esm/icons/ticket-minus.mjs:
lucide/dist/esm/icons/ticket-percent.mjs:
lucide/dist/esm/icons/ticket-plus.mjs:
lucide/dist/esm/icons/ticket-slash.mjs:
lucide/dist/esm/icons/ticket-x.mjs:
lucide/dist/esm/icons/ticket.mjs:
lucide/dist/esm/icons/tickets-plane.mjs:
lucide/dist/esm/icons/tickets.mjs:
lucide/dist/esm/icons/timeline.mjs:
lucide/dist/esm/icons/timer.mjs:
lucide/dist/esm/icons/timer-off.mjs:
lucide/dist/esm/icons/timer-reset.mjs:
lucide/dist/esm/icons/toggle-left.mjs:
lucide/dist/esm/icons/toggle-right.mjs:
lucide/dist/esm/icons/toilet.mjs:
lucide/dist/esm/icons/tool-case.mjs:
lucide/dist/esm/icons/toolbox.mjs:
lucide/dist/esm/icons/tornado.mjs:
lucide/dist/esm/icons/torus.mjs:
lucide/dist/esm/icons/touchpad-off.mjs:
lucide/dist/esm/icons/touchpad.mjs:
lucide/dist/esm/icons/towel-rack.mjs:
lucide/dist/esm/icons/tower-control.mjs:
lucide/dist/esm/icons/toy-brick.mjs:
lucide/dist/esm/icons/tractor.mjs:
lucide/dist/esm/icons/traffic-cone.mjs:
lucide/dist/esm/icons/train-front-tunnel.mjs:
lucide/dist/esm/icons/train-front.mjs:
lucide/dist/esm/icons/train-track.mjs:
lucide/dist/esm/icons/tram-front.mjs:
lucide/dist/esm/icons/transgender.mjs:
lucide/dist/esm/icons/trash-2.mjs:
lucide/dist/esm/icons/trash.mjs:
lucide/dist/esm/icons/tree-deciduous.mjs:
lucide/dist/esm/icons/tree-palm.mjs:
lucide/dist/esm/icons/tree-pine.mjs:
lucide/dist/esm/icons/trending-down.mjs:
lucide/dist/esm/icons/trees.mjs:
lucide/dist/esm/icons/trending-up-down.mjs:
lucide/dist/esm/icons/trending-up.mjs:
lucide/dist/esm/icons/triangle-alert.mjs:
lucide/dist/esm/icons/triangle-dashed.mjs:
lucide/dist/esm/icons/triangle-right.mjs:
lucide/dist/esm/icons/triangle.mjs:
lucide/dist/esm/icons/trophy.mjs:
lucide/dist/esm/icons/truck-electric.mjs:
lucide/dist/esm/icons/truck.mjs:
lucide/dist/esm/icons/turkish-lira.mjs:
lucide/dist/esm/icons/turntable.mjs:
lucide/dist/esm/icons/turtle.mjs:
lucide/dist/esm/icons/tv-minimal-play.mjs:
lucide/dist/esm/icons/tv-minimal.mjs:
lucide/dist/esm/icons/tv.mjs:
lucide/dist/esm/icons/type-outline.mjs:
lucide/dist/esm/icons/type.mjs:
lucide/dist/esm/icons/umbrella-off.mjs:
lucide/dist/esm/icons/umbrella.mjs:
lucide/dist/esm/icons/underline.mjs:
lucide/dist/esm/icons/undo-dot.mjs:
lucide/dist/esm/icons/undo-2.mjs:
lucide/dist/esm/icons/undo.mjs:
lucide/dist/esm/icons/unfold-horizontal.mjs:
lucide/dist/esm/icons/unfold-vertical.mjs:
lucide/dist/esm/icons/ungroup.mjs:
lucide/dist/esm/icons/university.mjs:
lucide/dist/esm/icons/unlink.mjs:
lucide/dist/esm/icons/unlink-2.mjs:
lucide/dist/esm/icons/unplug.mjs:
lucide/dist/esm/icons/upload.mjs:
lucide/dist/esm/icons/usb.mjs:
lucide/dist/esm/icons/user-check.mjs:
lucide/dist/esm/icons/user-cog.mjs:
lucide/dist/esm/icons/user-key.mjs:
lucide/dist/esm/icons/user-lock.mjs:
lucide/dist/esm/icons/user-minus.mjs:
lucide/dist/esm/icons/user-pen.mjs:
lucide/dist/esm/icons/user-plus.mjs:
lucide/dist/esm/icons/user-round-arrow-left.mjs:
lucide/dist/esm/icons/user-round-cog.mjs:
lucide/dist/esm/icons/user-round-check.mjs:
lucide/dist/esm/icons/user-round-key.mjs:
lucide/dist/esm/icons/user-round-minus.mjs:
lucide/dist/esm/icons/user-round-pen.mjs:
lucide/dist/esm/icons/user-round-plus.mjs:
lucide/dist/esm/icons/user-round-search.mjs:
lucide/dist/esm/icons/user-round.mjs:
lucide/dist/esm/icons/user-round-x.mjs:
lucide/dist/esm/icons/user-search.mjs:
lucide/dist/esm/icons/user-star.mjs:
lucide/dist/esm/icons/user-x.mjs:
lucide/dist/esm/icons/user.mjs:
lucide/dist/esm/icons/users-round.mjs:
lucide/dist/esm/icons/users.mjs:
lucide/dist/esm/icons/utensils-crossed.mjs:
lucide/dist/esm/icons/utensils.mjs:
lucide/dist/esm/icons/utility-pole.mjs:
lucide/dist/esm/icons/van.mjs:
lucide/dist/esm/icons/variable.mjs:
lucide/dist/esm/icons/vault.mjs:
lucide/dist/esm/icons/vector-square.mjs:
lucide/dist/esm/icons/vegan.mjs:
lucide/dist/esm/icons/venetian-mask.mjs:
lucide/dist/esm/icons/venus-and-mars.mjs:
lucide/dist/esm/icons/venus.mjs:
lucide/dist/esm/icons/vibrate-off.mjs:
lucide/dist/esm/icons/vibrate.mjs:
lucide/dist/esm/icons/video.mjs:
lucide/dist/esm/icons/video-off.mjs:
lucide/dist/esm/icons/videotape.mjs:
lucide/dist/esm/icons/view.mjs:
lucide/dist/esm/icons/voicemail.mjs:
lucide/dist/esm/icons/volleyball.mjs:
lucide/dist/esm/icons/volume-1.mjs:
lucide/dist/esm/icons/volume-2.mjs:
lucide/dist/esm/icons/volume-off.mjs:
lucide/dist/esm/icons/volume-x.mjs:
lucide/dist/esm/icons/volume.mjs:
lucide/dist/esm/icons/vote.mjs:
lucide/dist/esm/icons/wallet-cards.mjs:
lucide/dist/esm/icons/wallet-minimal.mjs:
lucide/dist/esm/icons/wallet.mjs:
lucide/dist/esm/icons/wallpaper.mjs:
lucide/dist/esm/icons/wand-sparkles.mjs:
lucide/dist/esm/icons/wand.mjs:
lucide/dist/esm/icons/warehouse.mjs:
lucide/dist/esm/icons/watch.mjs:
lucide/dist/esm/icons/washing-machine.mjs:
lucide/dist/esm/icons/waves-arrow-down.mjs:
lucide/dist/esm/icons/waves-arrow-up.mjs:
lucide/dist/esm/icons/waves-horizontal.mjs:
lucide/dist/esm/icons/waves-vertical.mjs:
lucide/dist/esm/icons/waves-ladder.mjs:
lucide/dist/esm/icons/webcam.mjs:
lucide/dist/esm/icons/waypoints.mjs:
lucide/dist/esm/icons/webcam-off.mjs:
lucide/dist/esm/icons/webhook-off.mjs:
lucide/dist/esm/icons/webhook.mjs:
lucide/dist/esm/icons/weight.mjs:
lucide/dist/esm/icons/weight-tilde.mjs:
lucide/dist/esm/icons/wheat-off.mjs:
lucide/dist/esm/icons/wheat.mjs:
lucide/dist/esm/icons/whole-word.mjs:
lucide/dist/esm/icons/wifi-cog.mjs:
lucide/dist/esm/icons/wifi-high.mjs:
lucide/dist/esm/icons/wifi-low.mjs:
lucide/dist/esm/icons/wifi-off.mjs:
lucide/dist/esm/icons/wifi-pen.mjs:
lucide/dist/esm/icons/wifi-sync.mjs:
lucide/dist/esm/icons/wifi-zero.mjs:
lucide/dist/esm/icons/wifi.mjs:
lucide/dist/esm/icons/wind-arrow-down.mjs:
lucide/dist/esm/icons/wind.mjs:
lucide/dist/esm/icons/wine-off.mjs:
lucide/dist/esm/icons/wine.mjs:
lucide/dist/esm/icons/workflow.mjs:
lucide/dist/esm/icons/worm.mjs:
lucide/dist/esm/icons/wrench-off.mjs:
lucide/dist/esm/icons/wrench.mjs:
lucide/dist/esm/icons/x-line-top.mjs:
lucide/dist/esm/icons/x.mjs:
lucide/dist/esm/icons/zap-off.mjs:
lucide/dist/esm/icons/zap.mjs:
lucide/dist/esm/icons/zodiac-aquarius.mjs:
lucide/dist/esm/icons/zodiac-aries.mjs:
lucide/dist/esm/icons/zodiac-cancer.mjs:
lucide/dist/esm/icons/zodiac-capricorn.mjs:
lucide/dist/esm/icons/zodiac-gemini.mjs:
lucide/dist/esm/icons/zodiac-leo.mjs:
lucide/dist/esm/icons/zodiac-libra.mjs:
lucide/dist/esm/icons/zodiac-ophiuchus.mjs:
lucide/dist/esm/icons/zodiac-pisces.mjs:
lucide/dist/esm/icons/zodiac-sagittarius.mjs:
lucide/dist/esm/icons/zodiac-scorpio.mjs:
lucide/dist/esm/icons/zodiac-taurus.mjs:
lucide/dist/esm/icons/zodiac-virgo.mjs:
lucide/dist/esm/icons/zoom-in.mjs:
lucide/dist/esm/icons/zoom-out.mjs:
lucide/dist/esm/iconsAndAliases.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.24.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=/static/js/main.js.map
