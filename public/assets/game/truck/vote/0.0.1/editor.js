! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["vote@0.0.1editor"] = t() : e["vote@0.0.1editor"] = t()
}("undefined" != typeof self ? self : this, function () {
    return function (e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function (e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, t.n = function (e) {
            var n = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "__OSS_BUCKET____NAMESPACE__/__NAME__/__VERSION__/", t(t.s = 11)
    }([function (e, t) {
        function n(e, t) {
            var n = e[1] || "",
                o = e[3];
            if (!o) return n;
            if (t && "function" == typeof btoa) {
                var i = r(o);
                return [n].concat(o.sources.map(function (e) {
                    return "/*# sourceURL=" + o.sourceRoot + e + " */"
                })).concat([i]).join("\n")
            }
            return [n].join("\n")
        }

        function r(e) {
            return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e)))) + " */"
        }
        e.exports = function (e) {
            var t = [];
            return t.toString = function () {
                return this.map(function (t) {
                    var r = n(t, e);
                    return t[2] ? "@media " + t[2] + "{" + r + "}" : r
                }).join("")
            }, t.i = function (e, n) {
                "string" == typeof e && (e = [
                    [null, e, ""]
                ]);
                for (var r = {}, o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    "number" == typeof i && (r[i] = !0)
                }
                for (o = 0; o < e.length; o++) {
                    var a = e[o];
                    "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), t.push(a))
                }
            }, t
        }
    }, function (e, t, n) {
        "use strict";

        function r(e, t, n, r) {
            v = n, m = r || {};
            var i = Object(c.a)(e, t);
            return o(i),
                function (t) {
                    for (var n = [], r = 0; r < i.length; r++) {
                        var a = i[r],
                            s = d[a.id];
                        s.refs--, n.push(s)
                    }
                    t ? (i = Object(c.a)(e, t), o(i)) : i = [];
                    for (var r = 0; r < n.length; r++) {
                        var s = n[r];
                        if (0 === s.refs) {
                            for (var u = 0; u < s.parts.length; u++) s.parts[u]();
                            delete d[s.id]
                        }
                    }
                }
        }

        function o(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t],
                    r = d[n.id];
                if (r) {
                    r.refs++;
                    for (var o = 0; o < r.parts.length; o++) r.parts[o](n.parts[o]);
                    for (; o < n.parts.length; o++) r.parts.push(a(n.parts[o]));
                    r.parts.length > n.parts.length && (r.parts.length = n.parts.length)
                } else {
                    for (var i = [], o = 0; o < n.parts.length; o++) i.push(a(n.parts[o]));
                    d[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: i
                    }
                }
            }
        }

        function i() {
            var e = document.createElement("style");
            return e.type = "text/css", l.appendChild(e), e
        }

        function a(e) {
            var t, n, r = document.querySelector("style[" + g + '~="' + e.id + '"]');
            if (r) {
                if (v) return h;
                r.parentNode.removeChild(r)
            }
            if (y) {
                var o = _++;
                r = p || (p = i()), t = s.bind(null, r, o, !1), n = s.bind(null, r, o, !0)
            } else r = i(), t = u.bind(null, r), n = function () {
                r.parentNode.removeChild(r)
            };
            return t(e),
                function (r) {
                    if (r) {
                        if (r.css === e.css && r.media === e.media && r.sourceMap === e.sourceMap) return;
                        t(e = r)
                    } else n()
                }
        }

        function s(e, t, n, r) {
            var o = n ? "" : r.css;
            if (e.styleSheet) e.styleSheet.cssText = b(t, o);
            else {
                var i = document.createTextNode(o),
                    a = e.childNodes;
                a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i)
            }
        }

        function u(e, t) {
            var n = t.css,
                r = t.media,
                o = t.sourceMap;
            if (r && e.setAttribute("media", r), m.ssrId && e.setAttribute(g, t.id), o && (n += "\n/*# sourceURL=" + o.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = r;
        var c = n(2),
            f = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !f) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var d = {},
            l = f && (document.head || document.getElementsByTagName("head")[0]),
            p = null,
            _ = 0,
            v = !1,
            h = function () {},
            m = null,
            g = "data-vue-ssr-id",
            y = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase()),
            b = function () {
                var e = [];
                return function (t, n) {
                    return e[t] = n, e.filter(Boolean).join("\n")
                }
            }()
    }, function (e, t, n) {
        "use strict";

        function r(e, t) {
            for (var n = [], r = {}, o = 0; o < t.length; o++) {
                var i = t[o],
                    a = i[0],
                    s = i[1],
                    u = i[2],
                    c = i[3],
                    f = {
                        id: e + ":" + o,
                        css: s,
                        media: u,
                        sourceMap: c
                    };
                r[a] ? r[a].parts.push(f) : n.push(r[a] = {
                    id: a,
                    parts: [f]
                })
            }
            return n
        }
        t.a = r
    }, function (e, t, n) {
        "use strict";

        function r(e, t, n, r, o, i, a, s) {
            e = e || {};
            var u = typeof e.default;
            "object" !== u && "function" !== u || (e = e.default);
            var c = "function" == typeof e ? e.options : e;
            t && (c.render = t, c.staticRenderFns = n, c._compiled = !0), r && (c.functional = !0), i && (c._scopeId = i);
            var f;
            if (a ? (f = function (e) {
                    e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), o && o.call(this, e), e && e._registeredComponents && e._registeredComponents.add(a)
                }, c._ssrRegister = f) : o && (f = s ? function () {
                    o.call(this, this.$root.$options.shadowRoot)
                } : o), f)
                if (c.functional) {
                    c._injectStyles = f;
                    var d = c.render;
                    c.render = function (e, t) {
                        return f.call(t), d(e, t)
                    }
                } else {
                    var l = c.beforeCreate;
                    c.beforeCreate = l ? [].concat(l, f) : [f]
                } return {
                exports: e,
                options: c
            }
        }
        t.a = r
    }, , function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = {
            name: "maliangeditor",
            props: {
                componentInfo: {
                    type: [Object],
                    default: function () {
                        return {}
                    }
                }
            },
            data: function () {
                return {
                    usedatasource: !1
                }
            },
            computed: {},
            watch: {
                componentInfo: {
                    handler: function (e) {
                        console.log(e)
                    },
                    deep: !0
                }
            },
            mounted: function () {},
            methods: {}
        }
    }, , , , , , function (e, t, n) {
        "use strict";

        function r(e) {
            n(12)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(5),
            i = n.n(o);
        for (var a in o) "default" !== a && function (e) {
            n.d(t, e, function () {
                return o[e]
            })
        }(a);
        var s = n(14),
            u = n(3),
            c = r,
            f = Object(u.a)(i.a, s.a, s.b, !1, c, "data-v-b5545886", null);
        t.default = f.exports
    }, function (e, t, n) {
        var r = n(13);
        "string" == typeof r && (r = [
            [e.i, r, ""]
        ]), r.locals && (e.exports = r.locals);
        var o = n(1).default;
        o("206c40a0", r, !0, {})
    }, function (e, t, n) {
        t = e.exports = n(0)(!1), t.push([e.i, "", ""])
    }, function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
            return r
        }), n.d(t, "b", function () {
            return o
        });
        var r = function () {
                var e = this,
                    t = e.$createElement;
                return (e._self._c || t)("div", {
                    staticClass: "component-editor"
                }, [e._v("\n  你可以在这里自己开发属性编辑器，扩展更高级的功能\n")])
            },
            o = []
    }])
});
