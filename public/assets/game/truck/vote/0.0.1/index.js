! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("$GP")) : "function" == typeof define && define.amd ? define(["$GP"], t) : "object" == typeof exports ? exports["vote@0.0.1index"] = t(require("$GP")) : e["vote@0.0.1index"] = t(e.$GP)
}("undefined" != typeof self ? self : this, function (e) {
    return function (e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function (e, n, o) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: o
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
        }, t.p = "__OSS_BUCKET____NAMESPACE__/__NAME__/__VERSION__/", t(t.s = 6)
    }([function (e, t) {
        function n(e, t) {
            var n = e[1] || "",
                r = e[3];
            if (!r) return n;
            if (t && "function" == typeof btoa) {
                var a = o(r);
                return [n].concat(r.sources.map(function (e) {
                    return "/*# sourceURL=" + r.sourceRoot + e + " */"
                })).concat([a]).join("\n")
            }
            return [n].join("\n")
        }

        function o(e) {
            return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e)))) + " */"
        }
        e.exports = function (e) {
            var t = [];
            return t.toString = function () {
                return this.map(function (t) {
                    var o = n(t, e);
                    return t[2] ? "@media " + t[2] + "{" + o + "}" : o
                }).join("")
            }, t.i = function (e, n) {
                "string" == typeof e && (e = [
                    [null, e, ""]
                ]);
                for (var o = {}, r = 0; r < this.length; r++) {
                    var a = this[r][0];
                    "number" == typeof a && (o[a] = !0)
                }
                for (r = 0; r < e.length; r++) {
                    var i = e[r];
                    "number" == typeof i[0] && o[i[0]] || (n && !i[2] ? i[2] = n : n && (i[2] = "(" + i[2] + ") and (" + n + ")"), t.push(i))
                }
            }, t
        }
    }, function (e, t, n) {
        "use strict";

        function o(e, t, n, o) {
            h = n, g = o || {};
            var a = Object(l.a)(e, t);
            return r(a),
                function (t) {
                    for (var n = [], o = 0; o < a.length; o++) {
                        var i = a[o],
                            c = f[i.id];
                        c.refs--, n.push(c)
                    }
                    t ? (a = Object(l.a)(e, t), r(a)) : a = [];
                    for (var o = 0; o < n.length; o++) {
                        var c = n[o];
                        if (0 === c.refs) {
                            for (var s = 0; s < c.parts.length; s++) c.parts[s]();
                            delete f[c.id]
                        }
                    }
                }
        }

        function r(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t],
                    o = f[n.id];
                if (o) {
                    o.refs++;
                    for (var r = 0; r < o.parts.length; r++) o.parts[r](n.parts[r]);
                    for (; r < n.parts.length; r++) o.parts.push(i(n.parts[r]));
                    o.parts.length > n.parts.length && (o.parts.length = n.parts.length)
                } else {
                    for (var a = [], r = 0; r < n.parts.length; r++) a.push(i(n.parts[r]));
                    f[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: a
                    }
                }
            }
        }

        function a() {
            var e = document.createElement("style");
            return e.type = "text/css", d.appendChild(e), e
        }

        function i(e) {
            var t, n, o = document.querySelector("style[" + _ + '~="' + e.id + '"]');
            if (o) {
                if (h) return v;
                o.parentNode.removeChild(o)
            }
            if (b) {
                var r = m++;
                o = p || (p = a()), t = c.bind(null, o, r, !1), n = c.bind(null, o, r, !0)
            } else o = a(), t = s.bind(null, o), n = function () {
                o.parentNode.removeChild(o)
            };
            return t(e),
                function (o) {
                    if (o) {
                        if (o.css === e.css && o.media === e.media && o.sourceMap === e.sourceMap) return;
                        t(e = o)
                    } else n()
                }
        }

        function c(e, t, n, o) {
            var r = n ? "" : o.css;
            if (e.styleSheet) e.styleSheet.cssText = y(t, r);
            else {
                var a = document.createTextNode(r),
                    i = e.childNodes;
                i[t] && e.removeChild(i[t]), i.length ? e.insertBefore(a, i[t]) : e.appendChild(a)
            }
        }

        function s(e, t) {
            var n = t.css,
                o = t.media,
                r = t.sourceMap;
            if (o && e.setAttribute("media", o), g.ssrId && e.setAttribute(_, t.id), r && (n += "\n/*# sourceURL=" + r.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = o;
        var l = n(2),
            u = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !u) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var f = {},
            d = u && (document.head || document.getElementsByTagName("head")[0]),
            p = null,
            m = 0,
            h = !1,
            v = function () {},
            g = null,
            _ = "data-vue-ssr-id",
            b = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase()),
            y = function () {
                var e = [];
                return function (t, n) {
                    return e[t] = n, e.filter(Boolean).join("\n")
                }
            }()
    }, function (e, t, n) {
        "use strict";

        function o(e, t) {
            for (var n = [], o = {}, r = 0; r < t.length; r++) {
                var a = t[r],
                    i = a[0],
                    c = a[1],
                    s = a[2],
                    l = a[3],
                    u = {
                        id: e + ":" + r,
                        css: c,
                        media: s,
                        sourceMap: l
                    };
                o[i] ? o[i].parts.push(u) : n.push(o[i] = {
                    id: i,
                    parts: [u]
                })
            }
            return n
        }
        t.a = o
    }, function (e, t, n) {
        "use strict";

        function o(e, t, n, o, r, a, i, c) {
            e = e || {};
            var s = typeof e.default;
            "object" !== s && "function" !== s || (e = e.default);
            var l = "function" == typeof e ? e.options : e;
            t && (l.render = t, l.staticRenderFns = n, l._compiled = !0), o && (l.functional = !0), a && (l._scopeId = a);
            var u;
            if (i ? (u = function (e) {
                    e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), r && r.call(this, e), e && e._registeredComponents && e._registeredComponents.add(i)
                }, l._ssrRegister = u) : r && (u = c ? function () {
                    r.call(this, this.$root.$options.shadowRoot)
                } : r), u)
                if (l.functional) {
                    l._injectStyles = u;
                    var f = l.render;
                    l.render = function (e, t) {
                        return u.call(t), f(e, t)
                    }
                } else {
                    var d = l.beforeCreate;
                    l.beforeCreate = d ? [].concat(d, u) : [u]
                } return {
                exports: e,
                options: l
            }
        }
        t.a = o
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9);
        t.default = {
            mixins: [o.VueExtend.mixin],
            name: "vote",
            label: "表单",
            style: {
                width: "300px",
                height: "300px"
            },
            stack: !1,
            childLimit: 9999,
            leaf: !1,
            formData: [],
            props: {
                form: {
                    type: Array,
                    default: function () {
                        return []
                    },
                    editor: {
                        label: "字段名称(多选)",
                        type: "checkbox",
                        defaultList: ["姓名", "电话", "公司名称", "邀请人", "邀请码", "参会人数"]
                    }
                },
                color: {
                    type: String,
                    default: "#000000",
                    editor: {
                        label: "文字颜色(十六进制/英文单词)",
                        type: "input"
                    }
                },
                btnImg: {
                    type: String,
                    default: "https://cdn.xaweiju.com/2020/03/xyyx/btn.png",
                    editor: {
                        label: "按钮背景图(256*68)",
                        type: "image"
                    }
                }
            },
            mounted: function () {
                console.log(this)
            },
            editorMethods: {},
            methods: {
                selectIpt: function (e) {
                    var t = void 0;
                    switch (e) {
                        case "姓名":
                            t = {
                                name: "name",
                                value: "",
                                icon: "&#xe63b;",
                                placeHolder: "请输入姓名",
                                type: "text"
                            };
                            break;
                        case "电话":
                            t = {
                                name: "mobile",
                                value: "",
                                icon: "&#xe792;",
                                placeHolder: "请输入电话",
                                type: "number"
                            };
                            break;
                        case "公司名称":
                            t = {
                                name: "field_2",
                                value: "",
                                icon: "&#xe6e6;",
                                placeHolder: "公司名称",
                                type: "text"
                            };
                            break;
                        case "邀请人":
                            t = {
                                name: "field_3",
                                value: "",
                                icon: "&#xe60b;",
                                placeHolder: "邀请人",
                                type: "text"
                            };
                            break;
                        case "邀请码":
                            t = {
                                name: "field_4",
                                value: "",
                                icon: "&#xe658;",
                                placeHolder: "邀请码",
                                type: "number"
                            };
                            break;
                        case "参会人数":
                            t = {
                                name: "field_5",
                                value: "",
                                icon: "&#xe65e;",
                                placeHolder: "参会人数",
                                type: "number"
                            }
                    }
                    return t
                },
                formSubmit: function () {
                    var e = {};
                    console.log(this);
                    for (var t = 0; t < this.formData.length; t++) {
                        if ("" != this.formData[t].value && "mobile" != this.formData[t].name) e[this.formData[t].name] = this.formData[t].value;
                        else {
                            if ("" == this.formData[t].value && "mobile" != this.formData[t].name) {
                                window.toast(this.formData[t].placeHolder);
                                break
                            }
                            if (11 != this.formData[t].value.length && "mobile" == this.formData[t].name) {
                                window.toast("手机格式不正确");
                                break
                            }
                            e[this.formData[t].name] = this.formData[t].value
                        }
                        if (t == this.formData.length - 1) {
                            e = Object.assign({
                                uid: window.location.href.split("?")[0]
                            }, e);
                            var n = document.head.querySelector('meta[name="csrf-token"]');
                            console.log(e), o.Server.fetch("http://192.168.10.1:8000/vote/submit", {
                                method: "POST",
                                body: JSON.stringify(e),
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "allication/json",
                                    "X-CSRF-TOKEN": null == n ? "" : n.content,
                                    "X-Requested-With": "XMLHttpRequest"
                                }
                            }).then(function (e) {
                                return console.log(e.json())
                            }).catch(function (e) {
                                return console.error("Error:", e)
                            }).then(function (e) {
                                console.log("Success:", e)
                            })
                        }
                    }
                },
                unescapeFontIconCode: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    return unescape(e.replace(/&#x/g, "%u").replace(/;/g, ""))
                }
            },
            computed: {
                formData: function () {
                    for (var e = [], t = 0; t < this.form.length; t++) {
                        var n = {};
                        n = Object.assign(n, this.selectIpt(this.form[t])), e.push(n)
                    }
                    return e
                }
            },
            watch: {
                deep: !0,
                immediate: !0,
                form: function (e, t) {}
            }
        }
    }, , function (e, t, n) {
        "use strict";

        function o(e) {
            n(7)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(4),
            a = n.n(r);
        for (var i in r) "default" !== i && function (e) {
            n.d(t, e, function () {
                return r[e]
            })
        }(i);
        var c = n(10),
            s = n(3),
            l = o,
            u = Object(s.a)(a.a, c.a, c.b, !1, l, "data-v-e3679cc0", null);
        t.default = u.exports
    }, function (e, t, n) {
        var o = n(8);
        "string" == typeof o && (o = [
            [e.i, o, ""]
        ]), o.locals && (e.exports = o.locals);
        var r = n(1).default;
        r("774ab38c", o, !0, {})
    }, function (e, t, n) {
        t = e.exports = n(0)(!1), t.push([e.i, '@font-face{font-family:iconfont;src:url("//at.alicdn.com/t/font_1737941_edmhpp1gxbo.eot");src:url("//at.alicdn.com/t/font_1737941_edmhpp1gxbo.eot?#iefix") format("embedded-opentype"),url("//at.alicdn.com/t/font_1737941_edmhpp1gxbo.woff2") format("woff2"),url("//at.alicdn.com/t/font_1737941_edmhpp1gxbo.woff") format("woff"),url("//at.alicdn.com/t/font_1737941_edmhpp1gxbo.ttf") format("truetype"),url("//at.alicdn.com/t/font_1737941_edmhpp1gxbo.svg#iconfont") format("svg")}.iconfont[data-v-e3679cc0]{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale}.component[data-v-e3679cc0]{width:100%;height:100%}.form[data-v-e3679cc0]{width:220px;margin:0 auto}.form .group[data-v-e3679cc0]{border-bottom:1px solid #fff;box-sizing:border-box;text-align:center}.form .group .conter[data-v-e3679cc0]{display:inline}.form .group .conter input[data-v-e3679cc0]{width:180px;border:none;height:30px;line-height:30px;margin:5px 0;background:none;outline:none}.formBtn[data-v-e3679cc0]{width:128px;height:34px;background-size:100% 100%;background-repeat:no-repeat;margin:0 auto;margin-top:20px}', ""])
    }, function (t, n) {
        t.exports = e
    }, function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
            return o
        }), n.d(t, "b", function () {
            return r
        });
        var o = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    staticClass: "component"
                }, [n("form", {
                    staticClass: "form",
                    style: {
                        color: e.color
                    },
                    attrs: {
                        action: "http://192.168.10.1:8000/vote/submit",
                        method: "post"
                    }
                }, [e._l(e.formData, function (t, o) {
                    return e.formData.length ? n("div", {
                        key: o,
                        staticClass: "group",
                        style: {
                            borderBottom: "1px solid " + e.color
                        }
                    }, [n("div", {
                        staticClass: "conter"
                    }, [n("i", {
                        staticClass: " iconfont"
                    }, [e._v(e._s(e.unescapeFontIconCode(t.icon)))]), e._v(" "), "checkbox" === t.type ? n("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.value,
                            expression: "item.value"
                        }],
                        style: {
                            color: e.color
                        },
                        attrs: {
                            placeholder: t.placeHolder,
                            type: "checkbox"
                        },
                        domProps: {
                            checked: Array.isArray(t.value) ? e._i(t.value, null) > -1 : t.value
                        },
                        on: {
                            change: function (n) {
                                var o = t.value,
                                    r = n.target,
                                    a = !!r.checked;
                                if (Array.isArray(o)) {
                                    var i = e._i(o, null);
                                    r.checked ? i < 0 && e.$set(t, "value", o.concat([null])) : i > -1 && e.$set(t, "value", o.slice(0, i).concat(o.slice(i + 1)))
                                } else e.$set(t, "value", a)
                            }
                        }
                    }) : "radio" === t.type ? n("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.value,
                            expression: "item.value"
                        }],
                        style: {
                            color: e.color
                        },
                        attrs: {
                            placeholder: t.placeHolder,
                            type: "radio"
                        },
                        domProps: {
                            checked: e._q(t.value, null)
                        },
                        on: {
                            change: function (n) {
                                return e.$set(t, "value", null)
                            }
                        }
                    }) : n("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.value,
                            expression: "item.value"
                        }],
                        style: {
                            color: e.color
                        },
                        attrs: {
                            placeholder: t.placeHolder,
                            type: t.type
                        },
                        domProps: {
                            value: t.value
                        },
                        on: {
                            input: function (n) {
                                n.target.composing || e.$set(t, "value", n.target.value)
                            }
                        }
                    })])]) : e._e()
                }), e._v(" "), e.formData.length ? n("div", {
                    staticClass: "formBtn",
                    style: {
                        backgroundImage: "url(" + e.btnImg + ")"
                    },
                    on: {
                        click: e.formSubmit
                    }
                }) : e._e()], 2)])
            },
            r = []
    }])
});
