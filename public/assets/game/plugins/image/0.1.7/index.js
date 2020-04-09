! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("Truck")) : "function" == typeof define && define.amd ? define("image@0.1.7", ["Truck"], t) : "object" == typeof exports ? exports["image@0.1.7"] = t(require("Truck")) : e["image@0.1.7"] = t(e.Truck)
}(this, function (e) {
    return function (e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
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
        }, t.p = "https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/image/0.1.7/", t(t.s = 10)
    }([function (e, t, n) {
        n(6);
        var r = n(4)(n(1), n(5), "data-v-747104a7", null);
        e.exports = r.exports
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(9);
        t.default = {
            mixins: [r.Maliang.mixin],
            name: "image",
            label: "图片",
            style: {
                width: "320px",
                height: "200px"
            },
            props: {
                url: {
                    type: String,
                    editer: {
                        type: "image",
                        label: "图片",
                        desc: "图片地址信息"
                    },
                    default: "https://ymmtest.oss-cn-hangzhou.aliyuncs.com/ymmfile/explore-biz/ymm_1528188057605.png"
                },
                mode: {
                    type: String,
                    default: "widthFix",
                    editer: {
                        type: "enum",
                        label: "填充模式",
                        defaultList: {
                            scaleToFill: "拉伸",
                            aspectFit: "适应",
                            widthFix: "固定宽度",
                            heightFix: "固定高度"
                        }
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
                cUrl: function () {
                    return this.scopeGet("url")
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
        t = e.exports = n(3)(), t.push([e.i, ".component[data-v-747104a7]{vertical-align:bottom;display:block;width:100%;height:100%}.component.scaleToFill>img[data-v-747104a7]{width:100%;height:100%}.component.aspectFit>img[data-v-747104a7]{max-width:100%;max-height:100%}.component.widthFix[data-v-747104a7]{overflow:hidden}.component.widthFix>img[data-v-747104a7]{width:100%}.component.heightFix[data-v-747104a7]{overflow:hidden}.component.heightFix>img[data-v-747104a7]{height:100%}", "", {
            version: 3,
            sources: ["/./src/index.vue"],
            names: [],
            mappings: "AACA,4BACE,sBAAuB,AACvB,cAAe,AACf,WAAY,AACZ,WAAa,CACd,AACD,4CACE,WAAY,AACZ,WAAa,CACd,AACD,0CACE,eAAgB,AAChB,eAAiB,CAClB,AACD,qCACE,eAAiB,CAClB,AACD,yCACE,UAAY,CACb,AACD,sCACE,eAAiB,CAClB,AACD,0CACE,WAAa,CACd",
            file: "index.vue",
            sourcesContent: ["\n.component[data-v-747104a7] {\n  vertical-align: bottom;\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.component.scaleToFill > img[data-v-747104a7] {\n  width: 100%;\n  height: 100%;\n}\n.component.aspectFit > img[data-v-747104a7] {\n  max-width: 100%;\n  max-height: 100%;\n}\n.component.widthFix[data-v-747104a7] {\n  overflow: hidden;\n}\n.component.widthFix > img[data-v-747104a7] {\n  width: 100%;\n}\n.component.heightFix[data-v-747104a7] {\n  overflow: hidden;\n}\n.component.heightFix > img[data-v-747104a7] {\n  height: 100%;\n}"],
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
                for (var r = {}, i = 0; i < this.length; i++) {
                    var o = this[i][0];
                    "number" == typeof o && (r[o] = !0)
                }
                for (i = 0; i < t.length; i++) {
                    var a = t[i];
                    "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a))
                }
            }, e
        }
    }, function (e, t) {
        e.exports = function (e, t, n, r) {
            var i, o = e = e || {},
                a = typeof e.default;
            "object" !== a && "function" !== a || (i = e, o = e.default);
            var s = "function" == typeof o ? o.options : o;
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
                esModule: i,
                exports: o,
                options: s
            }
        }
    }, function (e, t) {
        e.exports = {
            render: function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    staticClass: "component",
                    class: [e.mode]
                }, [e.cUrl ? n("img", {
                    attrs: {
                        src: e.cUrl
                    },
                    on: {
                        click: e.onClick
                    }
                }) : e._e()])
            },
            staticRenderFns: []
        }
    }, function (e, t, n) {
        var r = n(2);
        "string" == typeof r && (r = [
            [e.i, r, ""]
        ]), r.locals && (e.exports = r.locals);
        n(7)("1f33d6f2", r, !0)
    }, function (e, t, n) {
        function r(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t],
                    r = d[n.id];
                if (r) {
                    r.refs++;
                    for (var i = 0; i < r.parts.length; i++) r.parts[i](n.parts[i]);
                    for (; i < n.parts.length; i++) r.parts.push(o(n.parts[i]));
                    r.parts.length > n.parts.length && (r.parts.length = n.parts.length)
                } else {
                    for (var a = [], i = 0; i < n.parts.length; i++) a.push(o(n.parts[i]));
                    d[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: a
                    }
                }
            }
        }

        function i() {
            var e = document.createElement("style");
            return e.type = "text/css", l.appendChild(e), e
        }

        function o(e) {
            var t, n, r = document.querySelector('style[data-vue-ssr-id~="' + e.id + '"]');
            if (r) {
                if (h) return m;
                r.parentNode.removeChild(r)
            }
            if (v) {
                var o = f++;
                r = p || (p = i()), t = a.bind(null, r, o, !1), n = a.bind(null, r, o, !0)
            } else r = i(), t = s.bind(null, r), n = function () {
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
            var i = n ? "" : r.css;
            if (e.styleSheet) e.styleSheet.cssText = g(t, i);
            else {
                var o = document.createTextNode(i),
                    a = e.childNodes;
                a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(o, a[t]) : e.appendChild(o)
            }
        }

        function s(e, t) {
            var n = t.css,
                r = t.media,
                i = t.sourceMap;
            if (r && e.setAttribute("media", r), i && (n += "\n/*# sourceURL=" + i.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        var c = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !c) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var u = n(8),
            d = {},
            l = c && (document.head || document.getElementsByTagName("head")[0]),
            p = null,
            f = 0,
            h = !1,
            m = function () {},
            v = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        e.exports = function (e, t, n) {
            h = n;
            var i = u(e, t);
            return r(i),
                function (t) {
                    for (var n = [], o = 0; o < i.length; o++) {
                        var a = i[o],
                            s = d[a.id];
                        s.refs--, n.push(s)
                    }
                    t ? (i = u(e, t), r(i)) : i = [];
                    for (var o = 0; o < n.length; o++) {
                        var s = n[o];
                        if (0 === s.refs) {
                            for (var c = 0; c < s.parts.length; c++) s.parts[c]();
                            delete d[s.id]
                        }
                    }
                }
        };
        var g = function () {
            var e = [];
            return function (t, n) {
                return e[t] = n, e.filter(Boolean).join("\n")
            }
        }()
    }, function (e, t) {
        e.exports = function (e, t) {
            for (var n = [], r = {}, i = 0; i < t.length; i++) {
                var o = t[i],
                    a = o[0],
                    s = o[1],
                    c = o[2],
                    u = o[3],
                    d = {
                        id: e + ":" + i,
                        css: s,
                        media: c,
                        sourceMap: u
                    };
                r[a] ? r[a].parts.push(d) : n.push(r[a] = {
                    id: a,
                    parts: [d]
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
