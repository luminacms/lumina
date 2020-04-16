! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("Truck")) : "function" == typeof define && define.amd ? define("truck/button@0.1.6", ["Truck"], t) : "object" == typeof exports ? exports["truck/button@0.1.6"] = t(require("Truck")) : e["truck/button@0.1.6"] = t(e.Truck)
}(this, function (e) {
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
        return t.m = e, t.c = n, t.i = function (e) {
            return e
        }, t.d = function (e, n, r) {
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
        }, t.p = "https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/button/0.1.6/", t(t.s = 10)
    }([function (e, t, n) {
        n(6);
        var r = n(4)(n(1), n(5), "data-v-22b855f4", null);
        e.exports = r.exports
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(9);
        t.default = {
            mixins: [r.Maliang.mixin],
            name: "btn",
            label: "按钮",
            style: {
                width: "100px",
                height: "40px"
            },
            props: {
                text: {
                    type: String,
                    default: "输入文字",
                    editer: {
                        label: "按钮文字",
                        type: "String"
                    }
                },
                type: {
                    type: String,
                    default: "default",
                    editer: {
                        type: "enum",
                        defaultList: ["none", "default", "danger", "primary"]
                    }
                },
                click: {
                    type: Array,
                    default: function () {
                        return []
                    },
                    editer: {
                        label: "点击事件",
                        type: "function"
                    }
                }
            },
            computed: {
                ctext: function () {
                    return this.scopeGet("text")
                }
            },
            editerMethods: {
                jump: {
                    label: "网页跳转",
                    params: [{
                        label: "跳转地址",
                        desc: "参数详细说明：跳转路径 可以是 https 和 ymm 等协议开头的任意链接",
                        type: "string",
                        default: "https://www.baidu.com"
                    }]
                }
            },
            methods: {
                onClick: function () {
                    this.oncallExecute(this.click)
                },
                jump: function (e) {
                    window.location.href = e
                }
            }
        }
    }, function (e, t, n) {
        t = e.exports = n(3)(), t.push([e.i, ".component[data-v-22b855f4]{width:100%;height:100%;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center}.component.default[data-v-22b855f4]{color:#5a5a5a;border:1px solid #5a5a5a;border-radius:3px}.component.danger[data-v-22b855f4]{color:#fff;background-color:#ef4f4f;border:1px solid #ef4f4f;border-radius:3px}.component.primary[data-v-22b855f4]{color:#fff;background-color:#fc8700;border:1px solid #fc8700;border-radius:3px}", "", {
            version: 3,
            sources: ["/./src/index.vue"],
            names: [],
            mappings: "AACA,4BACE,WAAY,AACZ,YAAa,AACb,oBAAqB,AACrB,yBAA0B,AAC1B,uBAAyB,CAC1B,AACD,oCACE,cAAe,AACf,yBAA0B,AAC1B,iBAAmB,CACpB,AACD,mCACE,WAAY,AACZ,yBAA0B,AAC1B,yBAA0B,AAC1B,iBAAmB,CACpB,AACD,oCACE,WAAY,AACZ,yBAA0B,AAC1B,yBAA0B,AAC1B,iBAAmB,CACpB",
            file: "index.vue",
            sourcesContent: ["\n.component[data-v-22b855f4] {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  -webkit-box-align: center;\n  -webkit-box-pack: center;\n}\n.component.default[data-v-22b855f4] {\n  color: #5a5a5a;\n  border: 1px solid #5a5a5a;\n  border-radius: 3px;\n}\n.component.danger[data-v-22b855f4] {\n  color: #fff;\n  background-color: #ef4f4f;\n  border: 1px solid #ef4f4f;\n  border-radius: 3px;\n}\n.component.primary[data-v-22b855f4] {\n  color: #fff;\n  background-color: #fc8700;\n  border: 1px solid #fc8700;\n  border-radius: 3px;\n}"],
            sourceRoot: "webpack://"
        }])
    }, function (e, t) {
        e.exports = function () {
            var e = [];
            return e.toString = function () {
                for (var e = [], t = 0; t < this.length; t++) {
                    var n = this[t];
                    n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
                }
                return e.join("")
            }, e.i = function (t, n) {
                "string" == typeof t && (t = [
                    [null, t, ""]
                ]);
                for (var r = {}, o = 0; o < this.length; o++) {
                    var i = this[o][0];
                    "number" == typeof i && (r[i] = !0)
                }
                for (o = 0; o < t.length; o++) {
                    var a = t[o];
                    "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a))
                }
            }, e
        }
    }, function (e, t) {
        e.exports = function (e, t, n, r) {
            var o, i = e = e || {},
                a = typeof e.default;
            "object" !== a && "function" !== a || (o = e, i = e.default);
            var s = "function" == typeof i ? i.options : i;
            if (t && (s.render = t.render, s.staticRenderFns = t.staticRenderFns), n && (s._scopeId = n), r) {
                var c = Object.create(s.computed || null);
                Object.keys(r).forEach(function (e) {
                    var t = r[e];
                    c[e] = function () {
                        return t
                    }
                }), s.computed = c
            }
            return {
                esModule: o,
                exports: i,
                options: s
            }
        }
    }, function (e, t) {
        e.exports = {
            render: function () {
                var e = this,
                    t = e.$createElement;
                return (e._self._c || t)("div", {
                    staticClass: "component",
                    class: [e.type],
                    on: {
                        click: e.onClick
                    }
                }, [e._v("\n  " + e._s(e.ctext) + "\n")])
            },
            staticRenderFns: []
        }
    }, function (e, t, n) {
        var r = n(2);
        "string" == typeof r && (r = [
            [e.i, r, ""]
        ]), r.locals && (e.exports = r.locals);
        n(7)("5f1a114c", r, !0)
    }, function (e, t, n) {
        function r(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t],
                    r = f[n.id];
                if (r) {
                    r.refs++;
                    for (var o = 0; o < r.parts.length; o++) r.parts[o](n.parts[o]);
                    for (; o < n.parts.length; o++) r.parts.push(i(n.parts[o]));
                    r.parts.length > n.parts.length && (r.parts.length = n.parts.length)
                } else {
                    for (var a = [], o = 0; o < n.parts.length; o++) a.push(i(n.parts[o]));
                    f[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: a
                    }
                }
            }
        }

        function o() {
            var e = document.createElement("style");
            return e.type = "text/css", d.appendChild(e), e
        }

        function i(e) {
            var t, n, r = document.querySelector('style[data-vue-ssr-id~="' + e.id + '"]');
            if (r) {
                if (A) return b;
                r.parentNode.removeChild(r)
            }
            if (h) {
                var i = l++;
                r = p || (p = o()), t = a.bind(null, r, i, !1), n = a.bind(null, r, i, !0)
            } else r = o(), t = s.bind(null, r), n = function () {
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

        function a(e, t, n, r) {
            var o = n ? "" : r.css;
            if (e.styleSheet) e.styleSheet.cssText = m(t, o);
            else {
                var i = document.createTextNode(o),
                    a = e.childNodes;
                a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i)
            }
        }

        function s(e, t) {
            var n = t.css,
                r = t.media,
                o = t.sourceMap;
            if (r && e.setAttribute("media", r), o && (n += "\n/*# sourceURL=" + o.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        var c = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !c) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var u = n(8),
            f = {},
            d = c && (document.head || document.getElementsByTagName("head")[0]),
            p = null,
            l = 0,
            A = !1,
            b = function () {},
            h = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        e.exports = function (e, t, n) {
            A = n;
            var o = u(e, t);
            return r(o),
                function (t) {
                    for (var n = [], i = 0; i < o.length; i++) {
                        var a = o[i],
                            s = f[a.id];
                        s.refs--, n.push(s)
                    }
                    t ? (o = u(e, t), r(o)) : o = [];
                    for (var i = 0; i < n.length; i++) {
                        var s = n[i];
                        if (0 === s.refs) {
                            for (var c = 0; c < s.parts.length; c++) s.parts[c]();
                            delete f[s.id]
                        }
                    }
                }
        };
        var m = function () {
            var e = [];
            return function (t, n) {
                return e[t] = n, e.filter(Boolean).join("\n")
            }
        }()
    }, function (e, t) {
        e.exports = function (e, t) {
            for (var n = [], r = {}, o = 0; o < t.length; o++) {
                var i = t[o],
                    a = i[0],
                    s = i[1],
                    c = i[2],
                    u = i[3],
                    f = {
                        id: e + ":" + o,
                        css: s,
                        media: c,
                        sourceMap: u
                    };
                r[a] ? r[a].parts.push(f) : n.push(r[a] = {
                    id: a,
                    parts: [f]
                })
            }
            return n
        }
    }, function (e, t) {
        e.exports = Truck
    }, function (e, t, n) {
        e.exports = n(0)
    }])
});
//# sourceMappingURL=index.js.map
