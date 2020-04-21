! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("Truck")) : "function" == typeof define && define.amd ? define("truck/video@0.1.7", ["Truck"], t) : "object" == typeof exports ? exports["truck/video@0.1.7"] = t(require("Truck")) : e["truck/video@0.1.7"] = t(e.Truck)
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
        }, t.p = "https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/video/0.1.7/", t(t.s = 10)
    }([function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(9);
        t.default = {
            mixins: [r.Maliang.mixin],
            name: "truck-video",
            label: "视频",
            style: {
                height: "200px",
                width: "300px"
            },
            props: {
                type: {
                    type: String,
                    default: "code",
                    editer: {
                        label: "数据源",
                        type: "enum",
                        defaultList: {
                            code: "视频网站代码",
                            url: "url或本地上传"
                        }
                    }
                },
                videoContent: {
                    type: String,
                    default: "",
                    editer: {
                        type: "text",
                        label: "视频文件代码",
                        work: function () {
                            return "code" == this.type
                        }
                    }
                },
                src: {
                    type: String,
                    default: "",
                    editer: {
                        type: "video",
                        label: "视频路径",
                        desc: "目前只支持.mp4格式的视频",
                        work: function () {
                            return "url" == this.type
                        }
                    }
                },
                poster: {
                    type: String,
                    default: "",
                    editer: {
                        type: "image",
                        label: "封面图",
                        work: function () {
                            return "url" == this.type
                        }
                    }
                },
                controls: {
                    type: Boolean,
                    default: !0,
                    editer: {
                        label: "显示播放控件",
                        type: "boolean",
                        work: function () {
                            return "url" == this.type
                        }
                    }
                },
                autoplay: {
                    type: Boolean,
                    default: !1,
                    editer: {
                        label: "自动播放",
                        type: "boolean",
                        desc: "捕获用户首次触摸操作以后才会真正自动播放",
                        work: function () {
                            return "url" == this.type
                        }
                    }
                },
                loop: {
                    type: Boolean,
                    default: !1,
                    editer: {
                        label: "循环播放",
                        type: "boolean",
                        work: function () {
                            return "url" == this.type
                        }
                    }
                },
                errFn: {
                    type: [Function, Array],
                    default: function () {
                        return []
                    },
                    editer: {
                        label: "视频出错回调",
                        type: "function",
                        work: function () {
                            return "url" == this.type
                        }
                    }
                }
            },
            data: function () {
                return {
                    meidiaErr: !1,
                    playing: !1
                }
            },
            mounted: function () {
                this.initVideo()
            },
            methods: {
                vedioErr: function (e) {
                    this.meidiaErr = !0, this.oncallExecute(this.errFn, [e])
                },
                initVideo: function () {
                    function e(n) {
                        t.play(), document.body.removeEventListener("click", e)
                    }
                    var t = this;
                    this.autoplay && document.body.addEventListener("click", e)
                },
                tooglePlaying: function () {
                    this.playing ? this.pause() : this.play()
                },
                play: function (e) {
                    this.meidiaErr || (this.$refs.video.currentTime = void 0 === e || null === e ? this.$refs.video.currentTime : e, this.$refs.video.play(), this.playing = !0)
                },
                pause: function () {
                    this.meidiaErr || (this.$refs.video.pause(), this.playing = !1)
                },
                mute: function () {
                    this.$refs.video.volume = 0
                },
                volume: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                    this.$refs.video.volume = e
                }
            }
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            n(6)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(0),
            i = n.n(o);
        for (var a in o)["default", "default"].indexOf(a) < 0 && function (e) {
            n.d(t, e, function () {
                return o[e]
            })
        }(a);
        var s = n(5),
            u = n(4),
            c = r,
            d = n.i(u.a)(i.a, s.a, s.b, !1, c, "data-v-cdbcb5ac", null);
        t.default = d.exports
    }, function (e, t, n) {
        t = e.exports = n(3)(), t.push([e.i, ".component[data-v-cdbcb5ac]{width:100%;height:100%;overflow:hidden;position:relative}.component .content[data-v-cdbcb5ac]{width:100%;height:100%;position:absolute}.component .content[data-v-cdbcb5ac] iframe,.component video[data-v-cdbcb5ac]{position:absolute;width:100%;height:100%;max-height:100%}", ""])
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
    }, function (e, t, n) {
        "use strict";

        function r(e, t, n, r, o, i, a, s) {
            e = e || {};
            var u = typeof e.default;
            "object" !== u && "function" !== u || (e = e.default);
            var c = "function" == typeof e ? e.options : e;
            t && (c.render = t, c.staticRenderFns = n, c._compiled = !0), r && (c.functional = !0), i && (c._scopeId = i);
            var d;
            if (a ? (d = function (e) {
                    e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), o && o.call(this, e), e && e._registeredComponents && e._registeredComponents.add(a)
                }, c._ssrRegister = d) : o && (d = s ? function () {
                    o.call(this, this.$root.$options.shadowRoot)
                } : o), d)
                if (c.functional) {
                    c._injectStyles = d;
                    var l = c.render;
                    c.render = function (e, t) {
                        return d.call(t), l(e, t)
                    }
                } else {
                    var f = c.beforeCreate;
                    c.beforeCreate = f ? [].concat(f, d) : [d]
                } return {
                exports: e,
                options: c
            }
        }
        t.a = r
    }, function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
            return r
        }), n.d(t, "b", function () {
            return o
        });
        var r = function () {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("div", {
                    staticClass: "component"
                }, ["code" === e.type ? [n("div", {
                    staticClass: "content",
                    domProps: {
                        innerHTML: e._s(e.videoContent)
                    }
                })] : e._e(), e._v(" "), "url" === e.type ? [n("video", {
                    ref: "video",
                    attrs: {
                        controls: e.controls,
                        loop: e.loop,
                        preload: "auto",
                        autoplay: e.autoplay,
                        poster: e.poster,
                        src: e.src
                    },
                    on: {
                        error: e.vedioErr
                    }
                }, [e._v("\n      您的浏览器不支持播放该视频。\n    ")])] : e._e()], 2)
            },
            o = []
    }, function (e, t, n) {
        var r = n(2);
        "string" == typeof r && (r = [
            [e.i, r, ""]
        ]), r.locals && (e.exports = r.locals);
        var o = n(7).default;
        o("6e5aae96", r, !0, {})
    }, function (e, t, n) {
        "use strict";

        function r(e, t, r, i) {
            v = r, m = i || {};
            var a = n.i(c.a)(e, t);
            return o(a),
                function (t) {
                    for (var r = [], i = 0; i < a.length; i++) {
                        var s = a[i],
                            u = l[s.id];
                        u.refs--, r.push(u)
                    }
                    t ? (a = n.i(c.a)(e, t), o(a)) : a = [];
                    for (var i = 0; i < r.length; i++) {
                        var u = r[i];
                        if (0 === u.refs) {
                            for (var d = 0; d < u.parts.length; d++) u.parts[d]();
                            delete l[u.id]
                        }
                    }
                }
        }

        function o(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t],
                    r = l[n.id];
                if (r) {
                    r.refs++;
                    for (var o = 0; o < r.parts.length; o++) r.parts[o](n.parts[o]);
                    for (; o < n.parts.length; o++) r.parts.push(a(n.parts[o]));
                    r.parts.length > n.parts.length && (r.parts.length = n.parts.length)
                } else {
                    for (var i = [], o = 0; o < n.parts.length; o++) i.push(a(n.parts[o]));
                    l[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: i
                    }
                }
            }
        }

        function i() {
            var e = document.createElement("style");
            return e.type = "text/css", f.appendChild(e), e
        }

        function a(e) {
            var t, n, r = document.querySelector("style[" + b + '~="' + e.id + '"]');
            if (r) {
                if (v) return y;
                r.parentNode.removeChild(r)
            }
            if (g) {
                var o = h++;
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
            if (e.styleSheet) e.styleSheet.cssText = _(t, o);
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
            if (r && e.setAttribute("media", r), m.ssrId && e.setAttribute(b, t.id), o && (n += "\n/*# sourceURL=" + o.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = r;
        var c = n(8),
            d = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !d) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var l = {},
            f = d && (document.head || document.getElementsByTagName("head")[0]),
            p = null,
            h = 0,
            v = !1,
            y = function () {},
            m = null,
            b = "data-vue-ssr-id",
            g = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase()),
            _ = function () {
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
                    d = {
                        id: e + ":" + o,
                        css: s,
                        media: u,
                        sourceMap: c
                    };
                r[a] ? r[a].parts.push(d) : n.push(r[a] = {
                    id: a,
                    parts: [d]
                })
            }
            return n
        }
        t.a = r
    }, function (e, t) {
        e.exports = Truck
    }, function (e, t, n) {
        e.exports = n(1)
    }])
});
//# sourceMappingURL=index.js.map
