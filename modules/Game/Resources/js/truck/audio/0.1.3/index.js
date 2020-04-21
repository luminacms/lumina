! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("Truck")) : "function" == typeof define && define.amd ? define("truck/audio@0.1.3", ["Truck"], t) : "object" == typeof exports ? exports["truck/audio@0.1.3"] = t(require("Truck")) : e["truck/audio@0.1.3"] = t(e.Truck)
}(this, function (e) {
    return function (e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var i = n[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(i.exports, i, i.exports, t), i.l = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.i = function (e) {
            return e
        }, t.d = function (e, n, o) {
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
        }, t.p = "https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/audio/0.1.3/", t(t.s = 10)
    }([function (e, t, n) {
        n(6);
        var o = n(4)(n(1), n(5), "data-v-636083e2", null);
        e.exports = o.exports
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(9);
        t.default = {
            mixins: [o.Maliang.mixin],
            name: "truck-audio",
            label: "音频",
            style: {
                width: "40px",
                height: "40px"
            },
            props: {
                src: {
                    type: String,
                    editer: {
                        type: "audio",
                        label: "音频文件路径"
                    },
                    default: "https://imagecdn.ymm56.com/ymmfile/explore-biz/ymm_1528269864676.mp3"
                },
                icon: {
                    type: String,
                    default: "",
                    editer: {
                        type: "image",
                        label: "音频图标"
                    }
                },
                autoplay: {
                    type: Boolean,
                    editer: {
                        type: "Boolean",
                        label: "自动播放"
                    },
                    default: !0
                },
                controls: {
                    type: Boolean,
                    editer: {
                        type: "Boolean",
                        label: "显示默认播放控件"
                    },
                    default: !1
                },
                loop: {
                    type: Boolean,
                    editer: {
                        type: "Boolean",
                        label: "循环播放"
                    },
                    default: !0
                }
            },
            data: function () {
                return {
                    meidiaErr: !1,
                    playing: !1,
                    inited: !1
                }
            },
            computed: {
                cSrc: function () {
                    return this.scopeGet("src")
                }
            },
            mounted: function () {
                this.initAudio()
            },
            methods: {
                initAudio: function () {
                    function e() {
                        t.play(), document.body.removeEventListener("touchstart", e), document.body.removeEventListener("click", e), window.setTimeout(function () {
                            t.inited = !0
                        }, 400)
                    }
                    if (!this.autoplay) return void(this.inited = !0);
                    if (window.navigator.userAgent.match(/android/i)) return this.play(), void(this.inited = !0);
                    var t = this;
                    document.body.addEventListener("touchstart", e), document.body.addEventListener("click", e)
                },
                tooglePlaying: function () {
                    this.inited && (this.playing ? this.pause() : this.play())
                },
                play: function (e) {
                    this.meidiaErr || (this.$refs.audio.currentTime = void 0 === e || null === e ? this.$refs.audio.currentTime : e, this.$refs.audio.play(), this.playing = !0)
                },
                pause: function () {
                    this.meidiaErr || (this.$refs.audio.pause(), this.playing = !1)
                },
                mute: function () {
                    this.$refs.audio.volume = 0
                },
                volume: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                    this.$refs.audio.volume = e
                }
            }
        }
    }, function (e, t, n) {
        t = e.exports = n(3)(), t.push([e.i, ".component[data-v-636083e2]{position:relative;width:100%;height:100%;top:0;left:0;overflow:hidden}.component audio[data-v-636083e2]{width:100%}.component .audio-icon[data-v-636083e2]{width:100%;border-radius:50%;height:100%;position:absolute;top:0;left:0}.component .audio-icon .icon[data-v-636083e2]{width:100%;height:100%}.component .media-err[data-v-636083e2]{position:absolute;left:0;right:0;top:0;bottom:0;width:100%;color:red;font-size:12px;background-color:rgba(0,0,0,.8)}.component .audio-rotate[data-v-636083e2]{animation:audioRotate 1s linear infinite}@keyframes audioRotate{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}", "", {
            version: 3,
            sources: ["/./src/index.vue"],
            names: [],
            mappings: "AACA,4BACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,MAAO,AACP,OAAQ,AACR,eAAiB,CAClB,AACD,kCACE,UAAY,CACb,AACD,wCACE,WAAY,AACZ,kBAAmB,AACnB,YAAa,AACb,kBAAmB,AACnB,MAAO,AACP,MAAQ,CACT,AACD,8CACE,WAAY,AACZ,WAAa,CACd,AACD,uCACE,kBAAmB,AACnB,OAAQ,AACR,QAAS,AACT,MAAO,AACP,SAAU,AACV,WAAY,AACZ,UAAY,AACZ,eAAgB,AAChB,+BAAkC,CACnC,AACD,0CACE,wCAA0C,CAC3C,AACD,uBACA,GACI,sBAAwB,CAC3B,AACD,GACI,uBAA0B,CAC7B,CACA",
            file: "index.vue",
            sourcesContent: ["\n.component[data-v-636083e2] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n.component audio[data-v-636083e2] {\n  width: 100%;\n}\n.component .audio-icon[data-v-636083e2] {\n  width: 100%;\n  border-radius: 50%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.component .audio-icon .icon[data-v-636083e2] {\n  width: 100%;\n  height: 100%;\n}\n.component .media-err[data-v-636083e2] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  color: #f00;\n  font-size: 12px;\n  background-color: rgba(0,0,0,0.8);\n}\n.component .audio-rotate[data-v-636083e2] {\n  animation: audioRotate 1s linear infinite;\n}\n@keyframes audioRotate {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}"],
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
                for (var o = {}, i = 0; i < this.length; i++) {
                    var r = this[i][0];
                    "number" == typeof r && (o[r] = !0)
                }
                for (i = 0; i < t.length; i++) {
                    var a = t[i];
                    "number" == typeof a[0] && o[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a))
                }
            }, e
        }
    }, function (e, t) {
        e.exports = function (e, t, n, o) {
            var i, r = e = e || {},
                a = typeof e.default;
            "object" !== a && "function" !== a || (i = e, r = e.default);
            var s = "function" == typeof r ? r.options : r;
            if (t && (s.render = t.render, s.staticRenderFns = t.staticRenderFns), n && (s._scopeId = n), o) {
                var u = Object.create(s.computed || null);
                Object.keys(o).forEach(function (e) {
                    var t = o[e];
                    u[e] = function () {
                        return t
                    }
                }), s.computed = u
            }
            return {
                esModule: i,
                exports: r,
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
                    on: {
                        click: e.tooglePlaying
                    }
                }, [e.cSrc ? n("audio", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.controls,
                        expression: "controls"
                    }],
                    ref: "audio",
                    attrs: {
                        src: e.cSrc,
                        controls: "",
                        loop: e.loop
                    },
                    on: {
                        error: function (t) {
                            e.meidiaErr = !0
                        }
                    }
                }) : e._e(), e._v(" "), n("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: !e.controls,
                        expression: "!controls"
                    }],
                    staticClass: "audio-icon",
                    class: {
                        "audio-rotate": e.playing
                    }
                }, [e.icon ? n("img", {
                    staticClass: "audio-icon",
                    class: {
                        "audio-cicle": e.playing
                    },
                    attrs: {
                        src: e.icon
                    }
                }) : n("svg", {
                    staticClass: "icon",
                    staticStyle: {
                        "vertical-align": "middle",
                        fill: "currentColor",
                        overflow: "hidden"
                    },
                    attrs: {
                        viewBox: "0 0 1024 1024",
                        version: "1.1",
                        xmlns: "http://www.w3.org/2000/svg",
                        "p-id": "1650"
                    }
                }, [n("path", {
                    attrs: {
                        d: "M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 117.76 0 227.84-38.4 320-110.08 10.24-7.68 12.8-23.04 5.12-35.84-7.68-10.24-23.04-12.8-35.84-5.12C719.36 939.52 616.96 972.8 512 972.8 256 972.8 51.2 768 51.2 512 51.2 256 256 51.2 512 51.2 768 51.2 972.8 256 972.8 512c0 87.04-25.6 171.52-69.12 243.2-7.68 12.8-2.56 28.16 7.68 33.28 12.8 7.68 28.16 2.56 33.28-7.68 51.2-79.36 76.8-174.08 76.8-271.36C1024 230.4 793.6 0 512 0zM714.24 458.24c-17.92-15.36-245.76-222.72-245.76-222.72-10.24-10.24-25.6-7.68-35.84 2.56-5.12 5.12-7.68 12.8-7.68 17.92 0 0 0 0 0 0 0 0 0 499.2 0 512 0 15.36 10.24 25.6 25.6 25.6 5.12 0 12.8-2.56 15.36-7.68 2.56-2.56 217.6-186.88 240.64-207.36 23.04-20.48 33.28-38.4 33.28-64C742.4 491.52 732.16 473.6 714.24 458.24zM680.96 535.04c-7.68 5.12-204.8 176.64-204.8 176.64l0-399.36c0 0 186.88 166.4 202.24 181.76C696.32 512 698.88 519.68 680.96 535.04z",
                        "p-id": "1651"
                    }
                })])]), e._v(" "), e.meidiaErr ? n("div", {
                    staticClass: "media-err"
                }, [e._v("资源错误")]) : e._e()])
            },
            staticRenderFns: []
        }
    }, function (e, t, n) {
        var o = n(2);
        "string" == typeof o && (o = [
            [e.i, o, ""]
        ]), o.locals && (e.exports = o.locals);
        n(7)("e1b15b16", o, !0)
    }, function (e, t, n) {
        function o(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t],
                    o = c[n.id];
                if (o) {
                    o.refs++;
                    for (var i = 0; i < o.parts.length; i++) o.parts[i](n.parts[i]);
                    for (; i < n.parts.length; i++) o.parts.push(r(n.parts[i]));
                    o.parts.length > n.parts.length && (o.parts.length = n.parts.length)
                } else {
                    for (var a = [], i = 0; i < n.parts.length; i++) a.push(r(n.parts[i]));
                    c[n.id] = {
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

        function r(e) {
            var t, n, o = document.querySelector('style[data-vue-ssr-id~="' + e.id + '"]');
            if (o) {
                if (A) return h;
                o.parentNode.removeChild(o)
            }
            if (m) {
                var r = f++;
                o = p || (p = i()), t = a.bind(null, o, r, !1), n = a.bind(null, o, r, !0)
            } else o = i(), t = s.bind(null, o), n = function () {
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

        function a(e, t, n, o) {
            var i = n ? "" : o.css;
            if (e.styleSheet) e.styleSheet.cssText = v(t, i);
            else {
                var r = document.createTextNode(i),
                    a = e.childNodes;
                a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(r, a[t]) : e.appendChild(r)
            }
        }

        function s(e, t) {
            var n = t.css,
                o = t.media,
                i = t.sourceMap;
            if (o && e.setAttribute("media", o), i && (n += "\n/*# sourceURL=" + i.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        var u = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !u) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var d = n(8),
            c = {},
            l = u && (document.head || document.getElementsByTagName("head")[0]),
            p = null,
            f = 0,
            A = !1,
            h = function () {},
            m = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        e.exports = function (e, t, n) {
            A = n;
            var i = d(e, t);
            return o(i),
                function (t) {
                    for (var n = [], r = 0; r < i.length; r++) {
                        var a = i[r],
                            s = c[a.id];
                        s.refs--, n.push(s)
                    }
                    t ? (i = d(e, t), o(i)) : i = [];
                    for (var r = 0; r < n.length; r++) {
                        var s = n[r];
                        if (0 === s.refs) {
                            for (var u = 0; u < s.parts.length; u++) s.parts[u]();
                            delete c[s.id]
                        }
                    }
                }
        };
        var v = function () {
            var e = [];
            return function (t, n) {
                return e[t] = n, e.filter(Boolean).join("\n")
            }
        }()
    }, function (e, t) {
        e.exports = function (e, t) {
            for (var n = [], o = {}, i = 0; i < t.length; i++) {
                var r = t[i],
                    a = r[0],
                    s = r[1],
                    u = r[2],
                    d = r[3],
                    c = {
                        id: e + ":" + i,
                        css: s,
                        media: u,
                        sourceMap: d
                    };
                o[a] ? o[a].parts.push(c) : n.push(o[a] = {
                    id: a,
                    parts: [c]
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
