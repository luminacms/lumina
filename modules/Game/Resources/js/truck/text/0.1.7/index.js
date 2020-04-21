! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("Truck")) : "function" == typeof define && define.amd ? define("truck/text@0.1.7", ["Truck"], e) : "object" == typeof exports ? exports["truck/text@0.1.7"] = e(require("Truck")) : t["truck/text@0.1.7"] = e(t.Truck)
}(this, function (t) {
    return function (t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.i = function (t) {
            return t
        }, e.d = function (t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, e.n = function (t) {
            var n = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/text/0.1.7/", e(e.s = 5)
    }([function (t, e, n) {
        var r = n(2)(n(1), n(3), null, null);
        t.exports = r.exports
    }, function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(4);
        e.default = {
            mixins: [r.Maliang.mixin],
            name: "txt",
            label: "文本",
            style: {},
            props: {
                text: {
                    type: [String, Number],
                    editer: {
                        type: "text",
                        label: "文字内容",
                        desc: "具体的内容数据"
                    },
                    default: "文字内容"
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
                cText: function () {
                    return this.scopeGet("text").replace(/<(script|object|iframe).+?>/gi, "").replace(/<\/(script|object|iframe)>/gi, "")
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
                jump: function (t) {
                    window.location.href = t
                }
            }
        }
    }, function (t, e) {
        t.exports = function (t, e, n, r) {
            var o, c = t = t || {},
                u = typeof t.default;
            "object" !== u && "function" !== u || (o = t, c = t.default);
            var i = "function" == typeof c ? c.options : c;
            if (e && (i.render = e.render, i.staticRenderFns = e.staticRenderFns), n && (i._scopeId = n), r) {
                var s = Object.create(i.computed || null);
                Object.keys(r).forEach(function (t) {
                    var e = r[t];
                    s[t] = function () {
                        return e
                    }
                }), i.computed = s
            }
            return {
                esModule: o,
                exports: c,
                options: i
            }
        }
    }, function (t, e) {
        t.exports = {
            render: function () {
                var t = this,
                    e = t.$createElement;
                return (t._self._c || e)("div", {
                    staticClass: "component",
                    domProps: {
                        innerHTML: t._s(t.cText)
                    },
                    on: {
                        click: t.onClick
                    }
                })
            },
            staticRenderFns: []
        }
    }, function (t, e) {
        t.exports = Truck
    }, function (t, e, n) {
        t.exports = n(0)
    }])
});
//# sourceMappingURL=index.js.map
