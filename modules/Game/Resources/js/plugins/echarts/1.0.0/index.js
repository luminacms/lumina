! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("$GP")) : "function" == typeof define && define.amd ? define(["$GP"], e) : "object" == typeof exports ? exports["echarts@1.0.0index"] = e(require("$GP")) : t["echarts@1.0.0index"] = e(t.$GP)
}("undefined" != typeof self ? self : this, function (t) {
    return function (t) {
        function e(i) {
            if (n[i]) return n[i].exports;
            var r = n[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.d = function (t, n, i) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: i
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
        }, e.p = "https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/2c0b/echarts/1.0.0/", e(e.s = 156)
    }([function (t, e) {
        function n(t, e) {
            "createCanvas" === t && (J = null), $[t] = e
        }

        function i(t) {
            if (null == t || "object" != typeof t) return t;
            var e = t,
                n = G.call(t);
            if ("[object Array]" === n) {
                if (!z(t)) {
                    e = [];
                    for (var r = 0, a = t.length; r < a; r++) e[r] = i(t[r])
                }
            } else if (W[n]) {
                if (!z(t)) {
                    var o = t.constructor;
                    if (t.constructor.from) e = o.from(t);
                    else {
                        e = new o(t.length);
                        for (var r = 0, a = t.length; r < a; r++) e[r] = i(t[r])
                    }
                }
            } else if (!H[n] && !z(t) && !A(t)) {
                e = {};
                for (var s in t) t.hasOwnProperty(s) && (e[s] = i(t[s]))
            }
            return e
        }

        function r(t, e, n) {
            if (!S(e) || !S(t)) return n ? i(e) : t;
            for (var a in e)
                if (e.hasOwnProperty(a)) {
                    var o = t[a],
                        s = e[a];
                    !S(s) || !S(o) || x(s) || x(o) || A(s) || A(o) || M(s) || M(o) || z(s) || z(o) ? !n && a in t || (t[a] = i(e[a], !0)) : r(o, s, n)
                } return t
        }

        function a(t, e) {
            for (var n = t[0], i = 1, a = t.length; i < a; i++) n = r(n, t[i], e);
            return n
        }

        function o(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }

        function s(t, e, n) {
            for (var i in e) e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);
            return t
        }

        function l() {
            return J || (J = K().getContext("2d")), J
        }

        function u(t, e) {
            if (t) {
                if (t.indexOf) return t.indexOf(e);
                for (var n = 0, i = t.length; n < i; n++)
                    if (t[n] === e) return n
            }
            return -1
        }

        function c(t, e) {
            function n() {}
            var i = t.prototype;
            n.prototype = e.prototype, t.prototype = new n;
            for (var r in i) i.hasOwnProperty(r) && (t.prototype[r] = i[r]);
            t.prototype.constructor = t, t.superClass = e
        }

        function h(t, e, n) {
            t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, s(t, e, n)
        }

        function d(t) {
            if (t) return "string" != typeof t && "number" == typeof t.length
        }

        function f(t, e, n) {
            if (t && e)
                if (t.forEach && t.forEach === U) t.forEach(e, n);
                else if (t.length === +t.length)
                for (var i = 0, r = t.length; i < r; i++) e.call(n, t[i], i, t);
            else
                for (var a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t)
        }

        function p(t, e, n) {
            if (t && e) {
                if (t.map && t.map === X) return t.map(e, n);
                for (var i = [], r = 0, a = t.length; r < a; r++) i.push(e.call(n, t[r], r, t));
                return i
            }
        }

        function g(t, e, n, i) {
            if (t && e) {
                if (t.reduce && t.reduce === Z) return t.reduce(e, n, i);
                for (var r = 0, a = t.length; r < a; r++) n = e.call(i, n, t[r], r, t);
                return n
            }
        }

        function v(t, e, n) {
            if (t && e) {
                if (t.filter && t.filter === Y) return t.filter(e, n);
                for (var i = [], r = 0, a = t.length; r < a; r++) e.call(n, t[r], r, t) && i.push(t[r]);
                return i
            }
        }

        function m(t, e, n) {
            if (t && e)
                for (var i = 0, r = t.length; i < r; i++)
                    if (e.call(n, t[i], i, t)) return t[i]
        }

        function y(t, e) {
            var n = q.call(arguments, 2);
            return function () {
                return t.apply(e, n.concat(q.call(arguments)))
            }
        }

        function _(t) {
            var e = q.call(arguments, 1);
            return function () {
                return t.apply(this, e.concat(q.call(arguments)))
            }
        }

        function x(t) {
            return "[object Array]" === G.call(t)
        }

        function b(t) {
            return "function" == typeof t
        }

        function w(t) {
            return "[object String]" === G.call(t)
        }

        function S(t) {
            var e = typeof t;
            return "function" === e || !!t && "object" === e
        }

        function M(t) {
            return !!H[G.call(t)]
        }

        function T(t) {
            return !!W[G.call(t)]
        }

        function A(t) {
            return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument
        }

        function C(t) {
            return t !== t
        }

        function I(t) {
            for (var e = 0, n = arguments.length; e < n; e++)
                if (null != arguments[e]) return arguments[e]
        }

        function D(t, e) {
            return null != t ? t : e
        }

        function k(t, e, n) {
            return null != t ? t : null != e ? e : n
        }

        function O() {
            return Function.call.apply(q, arguments)
        }

        function P(t) {
            if ("number" == typeof t) return [t, t, t, t];
            var e = t.length;
            return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t
        }

        function L(t, e) {
            if (!t) throw new Error(e)
        }

        function E(t) {
            return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        }

        function R(t) {
            t[Q] = !0
        }

        function z(t) {
            return t[Q]
        }

        function N(t) {
            function e(t, e) {
                n ? i.set(t, e) : i.set(e, t)
            }
            var n = x(t);
            this.data = {};
            var i = this;
            t instanceof N ? t.each(e) : t && f(t, e)
        }

        function B(t) {
            return new N(t)
        }

        function F(t, e) {
            for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) n[i] = t[i];
            var r = t.length;
            for (i = 0; i < e.length; i++) n[i + r] = e[i];
            return n
        }

        function V() {}
        var H = {
                "[object Function]": 1,
                "[object RegExp]": 1,
                "[object Date]": 1,
                "[object Error]": 1,
                "[object CanvasGradient]": 1,
                "[object CanvasPattern]": 1,
                "[object Image]": 1,
                "[object Canvas]": 1
            },
            W = {
                "[object Int8Array]": 1,
                "[object Uint8Array]": 1,
                "[object Uint8ClampedArray]": 1,
                "[object Int16Array]": 1,
                "[object Uint16Array]": 1,
                "[object Int32Array]": 1,
                "[object Uint32Array]": 1,
                "[object Float32Array]": 1,
                "[object Float64Array]": 1
            },
            G = Object.prototype.toString,
            j = Array.prototype,
            U = j.forEach,
            Y = j.filter,
            q = j.slice,
            X = j.map,
            Z = j.reduce,
            $ = {},
            K = function () {
                return $.createCanvas()
            };
        $.createCanvas = function () {
            return document.createElement("canvas")
        };
        var J, Q = "__ec_primitive__";
        N.prototype = {
            constructor: N,
            get: function (t) {
                return this.data.hasOwnProperty(t) ? this.data[t] : null
            },
            set: function (t, e) {
                return this.data[t] = e
            },
            each: function (t, e) {
                void 0 !== e && (t = y(t, e));
                for (var n in this.data) this.data.hasOwnProperty(n) && t(this.data[n], n)
            },
            removeKey: function (t) {
                delete this.data[t]
            }
        }, e.$override = n, e.clone = i, e.merge = r, e.mergeAll = a, e.extend = o, e.defaults = s, e.createCanvas = K, e.getContext = l, e.indexOf = u, e.inherits = c, e.mixin = h, e.isArrayLike = d, e.each = f, e.map = p, e.reduce = g, e.filter = v, e.find = m, e.bind = y, e.curry = _, e.isArray = x, e.isFunction = b, e.isString = w, e.isObject = S, e.isBuiltInObject = M, e.isTypedArray = T, e.isDom = A, e.eqNaN = C, e.retrieve = I, e.retrieve2 = D, e.retrieve3 = k, e.slice = O, e.normalizeCssArray = P, e.assert = L, e.trim = E, e.setAsPrimitive = R, e.isPrimitive = z, e.createHashMap = B, e.concatArray = F, e.noop = V
    }, function (t, e, n) {
        function i(t) {
            return t instanceof Array ? t : null == t ? [] : [t]
        }

        function r(t, e, n) {
            if (t) {
                t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
                for (var i = 0, r = n.length; i < r; i++) {
                    var a = n[i];
                    !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a])
                }
            }
        }

        function a(t) {
            return !S(t) || M(t) || t instanceof Date ? t : t.value
        }

        function o(t) {
            return S(t) && !(t instanceof Array)
        }

        function s(t, e) {
            e = (e || []).slice();
            var n = x.map(t || [], function (t, e) {
                return {
                    exist: t
                }
            });
            return w(e, function (t, i) {
                if (S(t)) {
                    for (var r = 0; r < n.length; r++)
                        if (!n[r].option && null != t.id && n[r].exist.id === t.id + "") return n[r].option = t, void(e[i] = null);
                    for (var r = 0; r < n.length; r++) {
                        var a = n[r].exist;
                        if (!(n[r].option || null != a.id && null != t.id || null == t.name || c(t) || c(a) || a.name !== t.name + "")) return n[r].option = t, void(e[i] = null)
                    }
                }
            }), w(e, function (t, e) {
                if (S(t)) {
                    for (var i = 0; i < n.length; i++) {
                        var r = n[i].exist;
                        if (!n[i].option && !c(r) && null == t.id) {
                            n[i].option = t;
                            break
                        }
                    }
                    i >= n.length && n.push({
                        option: t
                    })
                }
            }), n
        }

        function l(t) {
            var e = x.createHashMap();
            w(t, function (t, n) {
                var i = t.exist;
                i && e.set(i.id, t)
            }), w(t, function (t, n) {
                var i = t.option;
                x.assert(!i || null == i.id || !e.get(i.id) || e.get(i.id) === t, "id duplicates: " + (i && i.id)), i && null != i.id && e.set(i.id, t), !t.keyInfo && (t.keyInfo = {})
            }), w(t, function (t, n) {
                var i = t.exist,
                    r = t.option,
                    a = t.keyInfo;
                if (S(r)) {
                    if (a.name = null != r.name ? r.name + "" : i ? i.name : T + n, i) a.id = i.id;
                    else if (null != r.id) a.id = r.id + "";
                    else {
                        var o = 0;
                        do {
                            a.id = "\0" + a.name + "\0" + o++
                        } while (e.get(a.id))
                    }
                    e.set(a.id, t)
                }
            })
        }

        function u(t) {
            var e = t.name;
            return !(!e || !e.indexOf(T))
        }

        function c(t) {
            return S(t) && t.id && 0 === (t.id + "").indexOf("\0_ec_\0")
        }

        function h(t, e) {
            function n(t, e, n) {
                for (var r = 0, a = t.length; r < a; r++)
                    for (var o = t[r].seriesId, s = i(t[r].dataIndex), l = n && n[o], u = 0, c = s.length; u < c; u++) {
                        var h = s[u];
                        l && l[h] ? l[h] = null : (e[o] || (e[o] = {}))[h] = 1
                    }
            }

            function r(t, e) {
                var n = [];
                for (var i in t)
                    if (t.hasOwnProperty(i) && null != t[i])
                        if (e) n.push(+i);
                        else {
                            var a = r(t[i], !0);
                            a.length && n.push({
                                seriesId: i,
                                dataIndex: a
                            })
                        } return n
            }
            var a = {},
                o = {};
            return n(t || [], a), n(e || [], o, a), [r(a), r(o)]
        }

        function d(t, e) {
            return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? x.isArray(e.dataIndex) ? x.map(e.dataIndex, function (e) {
                return t.indexOfRawIndex(e)
            }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? x.isArray(e.name) ? x.map(e.name, function (e) {
                return t.indexOfName(e)
            }) : t.indexOfName(e.name) : void 0
        }

        function f() {
            var t = "__\0ec_inner_" + C++ + "_" + Math.random().toFixed(5);
            return function (e) {
                return e[t] || (e[t] = {})
            }
        }

        function p(t, e, n) {
            if (x.isString(e)) {
                var i = {};
                i[e + "Index"] = 0, e = i
            }
            var r = n && n.defaultMainType;
            !r || g(e, r + "Index") || g(e, r + "Id") || g(e, r + "Name") || (e[r + "Index"] = 0);
            var a = {};
            return w(e, function (i, r) {
                var i = e[r];
                if ("dataIndex" === r || "dataIndexInside" === r) return void(a[r] = i);
                var o = r.match(/^(\w+)(Index|Id|Name)$/) || [],
                    s = o[1],
                    l = (o[2] || "").toLowerCase();
                if (!(!s || !l || null == i || "index" === l && "none" === i || n && n.includeMainTypes && x.indexOf(n.includeMainTypes, s) < 0)) {
                    var u = {
                        mainType: s
                    };
                    "index" === l && "all" === i || (u[l] = i);
                    var c = t.queryComponents(u);
                    a[s + "Models"] = c, a[s + "Model"] = c[0]
                }
            }), a
        }

        function g(t, e) {
            return t && t.hasOwnProperty(e)
        }

        function v(t, e, n) {
            t.setAttribute ? t.setAttribute(e, n) : t[e] = n
        }

        function m(t, e) {
            return t.getAttribute ? t.getAttribute(e) : t[e]
        }

        function y(t) {
            return "auto" === t ? b.domSupported ? "html" : "richText" : t || "html"
        }

        function _(t, e) {
            var n = x.createHashMap(),
                i = [];
            return x.each(t, function (t) {
                var r = e(t);
                (n.get(r) || (i.push(r), n.set(r, []))).push(t)
            }), {
                keys: i,
                buckets: n
            }
        }
        var x = n(0),
            b = n(8),
            w = x.each,
            S = x.isObject,
            M = x.isArray,
            T = "series\0",
            A = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"],
            C = 0;
        e.normalizeToArray = i, e.defaultEmphasis = r, e.TEXT_STYLE_OPTIONS = A, e.getDataItemValue = a, e.isDataItemOption = o, e.mappingToExists = s, e.makeIdAndName = l, e.isNameSpecified = u, e.isIdInner = c, e.compressBatches = h, e.queryDataIndex = d, e.makeInner = f, e.parseFinder = p, e.setAttribute = v, e.getAttribute = m, e.getTooltipRenderMode = y, e.groupData = _
    }, function (t, e, n) {
        function i(t) {
            return ot.extend(t)
        }

        function r(t, e) {
            return nt.extendFromString(t, e)
        }

        function a(t, e) {
            Rt[t] = e
        }

        function o(t) {
            if (Rt.hasOwnProperty(t)) return Rt[t]
        }

        function s(t, e, n, i) {
            var r = nt.createFromString(t, e);
            return n && ("center" === i && (n = u(n, r.getBoundingRect())), c(r, n)), r
        }

        function l(t, e, n) {
            var i = new lt({
                style: {
                    image: t,
                    x: e.x,
                    y: e.y,
                    width: e.width,
                    height: e.height
                },
                onload: function (t) {
                    if ("center" === n) {
                        var r = {
                            width: t.width,
                            height: t.height
                        };
                        i.setStyle(u(e, r))
                    }
                }
            });
            return i
        }

        function u(t, e) {
            var n, i = e.width / e.height,
                r = t.height * i;
            return r <= t.width ? n = t.height : (r = t.width, n = r / i), {
                x: t.x + t.width / 2 - r / 2,
                y: t.y + t.height / 2 - n / 2,
                width: r,
                height: n
            }
        }

        function c(t, e) {
            if (t.applyTransform) {
                var n = t.getBoundingRect(),
                    i = n.calculateTransform(e);
                t.applyTransform(i)
            }
        }

        function h(t) {
            return Tt.subPixelOptimizeLine(t.shape, t.shape, t.style), t
        }

        function d(t) {
            return Tt.subPixelOptimizeRect(t.shape, t.shape, t.style), t
        }

        function f(t) {
            return null != t && "none" !== t
        }

        function p(t) {
            if ("string" != typeof t) return t;
            var e = Bt.get(t);
            return e || (e = it.lift(t, -.1), Ft < 1e4 && (Bt.set(t, e), Ft++)), e
        }

        function g(t) {
            if (t.__hoverStlDirty) {
                t.__hoverStlDirty = !1;
                var e = t.__hoverStl;
                if (!e) return void(t.__cachedNormalStl = t.__cachedNormalZ2 = null);
                var n = t.__cachedNormalStl = {};
                t.__cachedNormalZ2 = t.z2;
                var i = t.style;
                for (var r in e) null != e[r] && (n[r] = i[r]);
                n.fill = i.fill, n.stroke = i.stroke
            }
        }

        function v(t) {
            var e = t.__hoverStl;
            if (e && !t.__highlighted) {
                var n = t.__zr,
                    i = t.useHoverLayer && n && "canvas" === n.painter.type;
                if (t.__highlighted = i ? "layer" : "plain", !(t.isGroup || !n && t.useHoverLayer)) {
                    var r = t,
                        a = t.style;
                    i && (r = n.addHover(t), a = r.style), F(a), i || g(r), a.extendFrom(e), m(a, e, "fill"), m(a, e, "stroke"), B(a), i || (t.dirty(!1), t.z2 += Dt)
                }
            }
        }

        function m(t, e, n) {
            !f(e[n]) && f(t[n]) && (t[n] = p(t[n]))
        }

        function y(t) {
            var e = t.__highlighted;
            if (e && (t.__highlighted = !1, !t.isGroup))
                if ("layer" === e) t.__zr && t.__zr.removeHover(t);
                else {
                    var n = t.style,
                        i = t.__cachedNormalStl;
                    i && (F(n), t.setStyle(i), B(n));
                    var r = t.__cachedNormalZ2;
                    null != r && t.z2 - r === Dt && (t.z2 = r)
                }
        }

        function _(t, e, n) {
            var i, r = Pt,
                a = Pt;
            t.__highlighted && (r = Ot, i = !0), e(t, n), t.__highlighted && (a = Ot, i = !0), t.isGroup && t.traverse(function (t) {
                !t.isGroup && e(t, n)
            }), i && t.__highDownOnUpdate && t.__highDownOnUpdate(r, a)
        }

        function x(t, e) {
            e = t.__hoverStl = !1 !== e && (t.hoverStyle || e || {}), t.__hoverStlDirty = !0, t.__highlighted && (t.__cachedNormalStl = null, y(t), v(t))
        }

        function b(t) {
            !T(this, t) && !this.__highByOuter && _(this, v)
        }

        function w(t) {
            !T(this, t) && !this.__highByOuter && _(this, y)
        }

        function S(t) {
            this.__highByOuter |= 1 << (t || 0), _(this, v)
        }

        function M(t) {
            !(this.__highByOuter &= ~(1 << (t || 0))) && _(this, y)
        }

        function T(t, e) {
            return t.__highDownSilentOnTouch && e.zrByTouch
        }

        function A(t, e) {
            C(t, !0), _(t, x, e)
        }

        function C(t, e) {
            var n = !1 === e;
            if (t.__highDownSilentOnTouch = t.highDownSilentOnTouch, t.__highDownOnUpdate = t.highDownOnUpdate, !n || t.__highDownDispatcher) {
                var i = n ? "off" : "on";
                t[i]("mouseover", b)[i]("mouseout", w), t[i]("emphasis", S)[i]("normal", M), t.__highByOuter = t.__highByOuter || 0, t.__highDownDispatcher = !n
            }
        }

        function I(t) {
            return !(!t || !t.__highDownDispatcher)
        }

        function D(t) {
            var e = Et[t];
            return null == e && Lt <= 32 && (e = Et[t] = Lt++), e
        }

        function k(t, e, n, i, r, a, o) {
            r = r || It;
            var s, l = r.labelFetcher,
                u = r.labelDataIndex,
                c = r.labelDimIndex,
                h = n.getShallow("show"),
                d = i.getShallow("show");
            (h || d) && (l && (s = l.getFormattedLabel(u, "normal", null, c)), null == s && (s = et.isFunction(r.defaultText) ? r.defaultText(u, r) : r.defaultText));
            var f = h ? s : null,
                p = d ? et.retrieve2(l ? l.getFormattedLabel(u, "emphasis", null, c) : null, s) : null;
            null == f && null == p || (P(t, n, a, r), P(e, i, o, r, !0)), t.text = f, e.text = p
        }

        function O(t, e, n) {
            var i = t.style;
            e && (F(i), t.setStyle(e), B(i)), i = t.__hoverStl, n && i && (F(i), et.extend(i, n), B(i))
        }

        function P(t, e, n, i, r) {
            return E(t, e, i, r), n && et.extend(t, n), t
        }

        function L(t, e, n) {
            var i, r = {
                isRectText: !0
            };
            !1 === n ? i = !0 : r.autoColor = n, E(t, e, r, i)
        }

        function E(t, e, n, i) {
            if (n = n || It, n.isRectText) {
                var r;
                n.getTextPosition ? r = n.getTextPosition(e, i) : "outside" === (r = e.getShallow("position") || (i ? null : "inside")) && (r = "top"), t.textPosition = r, t.textOffset = e.getShallow("offset");
                var a = e.getShallow("rotate");
                null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = et.retrieve2(e.getShallow("distance"), i ? null : 5)
            }
            var o, s = e.ecModel,
                l = s && s.option.textStyle,
                u = R(e);
            if (u) {
                o = {};
                for (var c in u)
                    if (u.hasOwnProperty(c)) {
                        var h = e.getModel(["rich", c]);
                        z(o[c] = {}, h, l, n, i)
                    }
            }
            return t.rich = o, z(t, e, l, n, i, !0), n.forceRich && !n.textStyle && (n.textStyle = {}), t
        }

        function R(t) {
            for (var e; t && t !== t.ecModel;) {
                var n = (t.option || It).rich;
                if (n) {
                    e = e || {};
                    for (var i in n) n.hasOwnProperty(i) && (e[i] = 1)
                }
                t = t.parentModel
            }
            return e
        }

        function z(t, e, n, i, r, a) {
            n = !r && n || It, t.textFill = N(e.getShallow("color"), i) || n.color, t.textStroke = N(e.getShallow("textBorderColor"), i) || n.textBorderColor, t.textStrokeWidth = et.retrieve2(e.getShallow("textBorderWidth"), n.textBorderWidth), r || (a && (t.insideRollbackOpt = i, B(t)), null == t.textFill && (t.textFill = i.autoColor)), t.fontStyle = e.getShallow("fontStyle") || n.fontStyle, t.fontWeight = e.getShallow("fontWeight") || n.fontWeight, t.fontSize = e.getShallow("fontSize") || n.fontSize, t.fontFamily = e.getShallow("fontFamily") || n.fontFamily, t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && i.disableBox || (t.textBackgroundColor = N(e.getShallow("backgroundColor"), i), t.textPadding = e.getShallow("padding"), t.textBorderColor = N(e.getShallow("borderColor"), i), t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow("textShadowColor") || n.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || n.textShadowBlur, t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || n.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || n.textShadowOffsetY
        }

        function N(t, e) {
            return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null
        }

        function B(t) {
            var e, n = t.textPosition,
                i = t.insideRollbackOpt;
            if (i && null == t.textFill) {
                var r = i.autoColor,
                    a = i.isRectText,
                    o = i.useInsideStyle,
                    s = !1 !== o && (!0 === o || a && n && "string" == typeof n && n.indexOf("inside") >= 0),
                    l = !s && null != r;
                (s || l) && (e = {
                    textFill: t.textFill,
                    textStroke: t.textStroke,
                    textStrokeWidth: t.textStrokeWidth
                }), s && (t.textFill = "#fff", null == t.textStroke && (t.textStroke = r, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), l && (t.textFill = r)
            }
            t.insideRollback = e
        }

        function F(t) {
            var e = t.insideRollback;
            e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, t.insideRollback = null)
        }

        function V(t, e) {
            var n = e || e.getModel("textStyle");
            return et.trim([t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif"].join(" "))
        }

        function H(t, e, n, i, r, a) {
            if ("function" == typeof r && (a = r, r = null), i && i.isAnimationEnabled()) {
                var o = t ? "Update" : "",
                    s = i.getShallow("animationDuration" + o),
                    l = i.getShallow("animationEasing" + o),
                    u = i.getShallow("animationDelay" + o);
                "function" == typeof u && (u = u(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), "function" == typeof s && (s = s(r)), s > 0 ? e.animateTo(n, s, u || 0, l, a, !!a) : (e.stopAnimation(), e.attr(n), a && a())
            } else e.stopAnimation(), e.attr(n), a && a()
        }

        function W(t, e, n, i, r) {
            H(!0, t, e, n, i, r)
        }

        function G(t, e, n, i, r) {
            H(!1, t, e, n, i, r)
        }

        function j(t, e) {
            for (var n = rt.identity([]); t && t !== e;) rt.mul(n, t.getLocalTransform(), n), t = t.parent;
            return n
        }

        function U(t, e, n) {
            return e && !et.isArrayLike(e) && (e = st.getLocalTransform(e)), n && (e = rt.invert([], e)), at.applyTransform([], t, e)
        }

        function Y(t, e, n) {
            var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),
                r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),
                a = ["left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0];
            return a = U(a, e, n), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top"
        }

        function q(t, e, n, i) {
            function r(t) {
                var e = {
                    position: at.clone(t.position),
                    rotation: t.rotation
                };
                return t.shape && (e.shape = et.extend({}, t.shape)), e
            }
            if (t && e) {
                var a = function (t) {
                    var e = {};
                    return t.traverse(function (t) {
                        !t.isGroup && t.anid && (e[t.anid] = t)
                    }), e
                }(t);
                e.traverse(function (t) {
                    if (!t.isGroup && t.anid) {
                        var e = a[t.anid];
                        if (e) {
                            var i = r(t);
                            t.attr(r(e)), W(t, i, n, t.dataIndex)
                        }
                    }
                })
            }
        }

        function X(t, e) {
            return et.map(t, function (t) {
                var n = t[0];
                n = At(n, e.x), n = Ct(n, e.x + e.width);
                var i = t[1];
                return i = At(i, e.y), i = Ct(i, e.y + e.height), [n, i]
            })
        }

        function Z(t, e) {
            var n = At(t.x, e.x),
                i = Ct(t.x + t.width, e.x + e.width),
                r = At(t.y, e.y),
                a = Ct(t.y + t.height, e.y + e.height);
            if (i >= n && a >= r) return {
                x: n,
                y: r,
                width: i - n,
                height: a - r
            }
        }

        function $(t, e, n) {
            e = et.extend({
                rectHover: !0
            }, e);
            var i = e.style = {
                strokeNoScale: !0
            };
            if (n = n || {
                    x: -1,
                    y: -1,
                    width: 2,
                    height: 2
                }, t) return 0 === t.indexOf("image://") ? (i.image = t.slice(8), et.defaults(i, n), new lt(e)) : s(t.replace("path://", ""), e, n, "center")
        }

        function K(t, e, n, i, r) {
            for (var a = 0, o = r[r.length - 1]; a < r.length; a++) {
                var s = r[a];
                if (J(t, e, n, i, s[0], s[1], o[0], o[1])) return !0;
                o = s
            }
        }

        function J(t, e, n, i, r, a, o, s) {
            var l = n - t,
                u = i - e,
                c = o - r,
                h = s - a,
                d = Q(c, h, l, u);
            if (tt(d)) return !1;
            var f = t - r,
                p = e - a,
                g = Q(f, p, l, u) / d;
            if (g < 0 || g > 1) return !1;
            var v = Q(f, p, c, h) / d;
            return !(v < 0 || v > 1)
        }

        function Q(t, e, n, i) {
            return t * i - n * e
        }

        function tt(t) {
            return t <= 1e-6 && t >= -1e-6
        }
        var et = n(0),
            nt = n(114),
            it = n(36),
            rt = n(20),
            at = n(7),
            ot = n(6),
            st = n(104),
            lt = n(70);
        e.Image = lt;
        var ut = n(35);
        e.Group = ut;
        var ct = n(72);
        e.Text = ct;
        var ht = n(118);
        e.Circle = ht;
        var dt = n(204);
        e.Sector = dt;
        var ft = n(205);
        e.Ring = ft;
        var pt = n(120);
        e.Polygon = pt;
        var gt = n(122);
        e.Polyline = gt;
        var vt = n(123);
        e.Rect = vt;
        var mt = n(124);
        e.Line = mt;
        var yt = n(208);
        e.BezierCurve = yt;
        var _t = n(209);
        e.Arc = _t;
        var xt = n(210);
        e.CompoundPath = xt;
        var bt = n(125);
        e.LinearGradient = bt;
        var wt = n(211);
        e.RadialGradient = wt;
        var St = n(9);
        e.BoundingRect = St;
        var Mt = n(212);
        e.IncrementalDisplayable = Mt;
        var Tt = n(73),
            At = Math.max,
            Ct = Math.min,
            It = {},
            Dt = 1,
            kt = {
                color: "textFill",
                textBorderColor: "textStroke",
                textBorderWidth: "textStrokeWidth"
            },
            Ot = "emphasis",
            Pt = "normal",
            Lt = 1,
            Et = {},
            Rt = {},
            zt = nt.mergePath,
            Nt = Tt.subPixelOptimize,
            Bt = et.createHashMap(),
            Ft = 0;
        a("circle", ht), a("sector", dt), a("ring", ft), a("polygon", pt), a("polyline", gt), a("rect", vt), a("line", mt), a("bezierCurve", yt), a("arc", _t), e.Z2_EMPHASIS_LIFT = Dt, e.CACHED_LABEL_STYLE_PROPERTIES = kt, e.extendShape = i, e.extendPath = r, e.registerShape = a, e.getShapeClass = o, e.makePath = s, e.makeImage = l, e.mergePath = zt, e.resizePath = c, e.subPixelOptimizeLine = h, e.subPixelOptimizeRect = d, e.subPixelOptimize = Nt, e.setElementHoverStyle = x, e.setHoverStyle = A, e.setAsHighDownDispatcher = C, e.isHighDownDispatcher = I, e.getHighlightDigit = D, e.setLabelStyle = k, e.modifyLabelStyle = O, e.setTextStyle = P, e.setText = L, e.getFont = V, e.updateProps = W, e.initProps = G, e.getTransform = j, e.applyTransform = U, e.transformDirection = Y, e.groupTransition = q, e.clipPointsByRect = X, e.clipRectByRect = Z, e.createIcon = $, e.linePolygonIntersect = K, e.lineLineIntersect = J
    }, function (t, e, n) {
        function i(t, e) {
            return function (n, i, r) {
                if (!e && this._disposed) return void this.id;
                n = n && n.toLowerCase(), nt.prototype[t].call(this, n, i, r)
            }
        }

        function r() {
            nt.call(this)
        }

        function a(t, e, n) {
            function i(t, e) {
                return t.__prio - e.__prio
            }
            n = n || {}, "string" == typeof e && (e = Yt[e]), this.id, this.group, this._dom = t;
            var a = this._zr = K.init(t, {
                renderer: n.renderer || "canvas",
                devicePixelRatio: n.devicePixelRatio,
                width: n.width,
                height: n.height
            });
            this._throttledZrFlush = vt(J.bind(a.flush, a), 17);
            var e = J.clone(e);
            e && st(e, !0), this._theme = e, this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new at;
            var o = this._api = S(this);
            et(Ut, i), et(Wt, i), this._scheduler = new xt(this, o, Wt, Ut), nt.call(this, this._ecEventProcessor = new M), this._messageCenter = new r, this._initEvents(), this.resize = J.bind(this.resize, this), this._pendingActions = [], a.animation.on("frame", this._onframe, this), f(a, this), J.setAsPrimitive(this)
        }

        function o(t, e, n) {
            if (this._disposed) return void this.id;
            var i, r = this._model,
                a = this._coordSysMgr.getCoordinateSystems();
            e = pt.parseFinder(r, e);
            for (var o = 0; o < a.length; o++) {
                var s = a[o];
                if (s[t] && null != (i = s[t](r, e, n))) return i
            }
        }

        function s(t) {
            var e = t._model,
                n = t._scheduler;
            n.restorePipelines(e), n.prepareStageTasks(), p(t, "component", e, n), p(t, "chart", e, n), n.plan()
        }

        function l(t, e, n, i, r) {
            function a(i) {
                i && i.__alive && i[e] && i[e](i.__model, o, t._api, n)
            }
            var o = t._model;
            if (!i) return void Tt(t._componentsViews.concat(t._chartsViews), a);
            var s = {};
            s[i + "Id"] = n[i + "Id"], s[i + "Index"] = n[i + "Index"], s[i + "Name"] = n[i + "Name"];
            var l = {
                mainType: i,
                query: s
            };
            r && (l.subType = r);
            var u = n.excludeSeriesId;
            null != u && (u = J.createHashMap(pt.normalizeToArray(u))), o && o.eachComponent(l, function (e) {
                u && null != u.get(e.id) || a(t["series" === i ? "_chartsMap" : "_componentsMap"][e.__viewId])
            }, t)
        }

        function u(t, e) {
            var n = t._chartsMap,
                i = t._scheduler;
            e.eachSeries(function (t) {
                i.updateStreamModes(t, n[t.__viewId])
            })
        }

        function c(t, e) {
            var n = t.type,
                i = t.escapeConnect,
                r = Vt[n],
                a = r.actionInfo,
                o = (a.update || "update").split(":"),
                u = o.pop();
            o = null != o[0] && It(o[0]), this[Et] = !0;
            var c = [t],
                h = !1;
            t.batch && (h = !0, c = J.map(t.batch, function (e) {
                return e = J.defaults(J.extend({}, e), t), e.batch = null, e
            }));
            var d, f = [],
                p = "highlight" === n || "downplay" === n;
            Tt(c, function (t) {
                d = r.action(t, this._model, this._api), d = d || J.extend({}, t), d.type = a.event || d.type, f.push(d), p ? l(this, u, t, "series") : o && l(this, u, t, o.main, o.sub)
            }, this), "none" === u || p || o || (this[Rt] ? (s(this), Bt.update.call(this, t), this[Rt] = !1) : Bt[u].call(this, t)), d = h ? {
                type: a.event || n,
                escapeConnect: i,
                batch: f
            } : f[0], this[Et] = !1, !e && this._messageCenter.trigger(d.type, d)
        }

        function h(t) {
            for (var e = this._pendingActions; e.length;) {
                var n = e.shift();
                c.call(this, n, t)
            }
        }

        function d(t) {
            !t && this.trigger("updated")
        }

        function f(t, e) {
            t.on("rendered", function () {
                e.trigger("rendered"), !t.animation.isFinished() || e[Rt] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished")
            })
        }

        function p(t, e, n, i) {
            function r(t) {
                var e = "_ec_" + t.id + "_" + t.type,
                    r = s[e];
                if (!r) {
                    var c = It(t.type);
                    r = new(a ? ht.getClass(c.main, c.sub) : dt.getClass(c.sub)), r.init(n, u), s[e] = r, o.push(r), l.add(r.group)
                }
                t.__viewId = r.__id = e, r.__alive = !0, r.__model = t, r.group.__ecComponentInfo = {
                    mainType: t.mainType,
                    index: t.componentIndex
                }, !a && i.prepareView(r, t, n, u)
            }
            for (var a = "component" === e, o = a ? t._componentsViews : t._chartsViews, s = a ? t._componentsMap : t._chartsMap, l = t._zr, u = t._api, c = 0; c < o.length; c++) o[c].__alive = !1;
            a ? n.eachComponent(function (t, e) {
                "series" !== t && r(e)
            }) : n.eachSeries(r);
            for (var c = 0; c < o.length;) {
                var h = o[c];
                h.__alive ? c++ : (!a && h.renderTask.dispose(), l.remove(h.group), h.dispose(n, u), o.splice(c, 1), delete s[h.__id], h.__id = h.group.__ecComponentInfo = null)
            }
        }

        function g(t) {
            t.clearColorPalette(), t.eachSeries(function (t) {
                t.clearColorPalette()
            })
        }

        function v(t, e, n, i) {
            m(t, e, n, i), Tt(t._chartsViews, function (t) {
                t.__alive = !1
            }), y(t, e, n, i), Tt(t._chartsViews, function (t) {
                t.__alive || t.remove(e, n)
            })
        }

        function m(t, e, n, i, r) {
            Tt(r || t._componentsViews, function (t) {
                var r = t.__model;
                t.render(r, e, n, i), w(r, t)
            })
        }

        function y(t, e, n, i, r) {
            var a, o = t._scheduler;
            e.eachSeries(function (e) {
                var n = t._chartsMap[e.__viewId];
                n.__alive = !0;
                var s = n.renderTask;
                o.updatePayload(s, i), r && r.get(e.uid) && s.dirty(), a |= s.perform(o.getPerformArgs(s)), n.group.silent = !!e.get("silent"), w(e, n), b(e, n)
            }), o.unfinished |= a, x(t, e), yt(t._zr.dom, e)
        }

        function _(t, e) {
            Tt(jt, function (n) {
                n(t, e)
            })
        }

        function x(t, e) {
            var n = t._zr,
                i = n.storage,
                r = 0;
            i.traverse(function (t) {
                r++
            }), r > e.get("hoverLayerThreshold") && !tt.node && e.eachSeries(function (e) {
                if (!e.preventUsingHoverLayer) {
                    var n = t._chartsMap[e.__viewId];
                    n.__alive && n.group.traverse(function (t) {
                        t.useHoverLayer = !0
                    })
                }
            })
        }

        function b(t, e) {
            var n = t.get("blendMode") || null;
            e.group.traverse(function (t) {
                t.isGroup || t.style.blend !== n && t.setStyle("blend", n), t.eachPendingDisplayable && t.eachPendingDisplayable(function (t) {
                    t.setStyle("blend", n)
                })
            })
        }

        function w(t, e) {
            var n = t.get("z"),
                i = t.get("zlevel");
            e.group.traverse(function (t) {
                "group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i))
            })
        }

        function S(t) {
            var e = t._coordSysMgr;
            return J.extend(new rt(t), {
                getCoordinateSystems: J.bind(e.getCoordinateSystems, e),
                getComponentByElement: function (e) {
                    for (; e;) {
                        var n = e.__ecComponentInfo;
                        if (null != n) return t._model.getComponent(n.mainType, n.index);
                        e = e.parent
                    }
                }
            })
        }

        function M() {
            this.eventInfo
        }

        function T(t) {
            function e(t, e) {
                for (var i = 0; i < t.length; i++) {
                    t[i][n] = e
                }
            }
            var n = "__connectUpdateStatus";
            Tt(Ht, function (i, r) {
                t._messageCenter.on(r, function (i) {
                    if (Zt[t.group] && 0 !== t[n]) {
                        if (i && i.escapeConnect) return;
                        var r = t.makeActionFromEvent(i),
                            a = [];
                        Tt(Xt, function (e) {
                            e !== t && e.group === t.group && a.push(e)
                        }), e(a, 0), Tt(a, function (t) {
                            1 !== t[n] && t.dispatchAction(r)
                        }), e(a, 2)
                    }
                })
            })
        }

        function A(t, e, n) {
            var i = k(t);
            if (i) return i;
            var r = new a(t, e, n);
            return r.id = "ec_" + $t++, Xt[r.id] = r, pt.setAttribute(t, Jt, r.id), T(r), r
        }

        function C(t) {
            if (J.isArray(t)) {
                var e = t;
                t = null, Tt(e, function (e) {
                    null != e.group && (t = e.group)
                }), t = t || "g_" + Kt++, Tt(e, function (e) {
                    e.group = t
                })
            }
            return Zt[t] = !0, t
        }

        function I(t) {
            Zt[t] = !1
        }

        function D(t) {
            "string" == typeof t ? t = Xt[t] : t instanceof a || (t = k(t)), t instanceof a && !t.isDisposed() && t.dispose()
        }

        function k(t) {
            return Xt[pt.getAttribute(t, Jt)]
        }

        function O(t) {
            return Xt[t]
        }

        function P(t, e) {
            Yt[t] = e
        }

        function L(t) {
            Gt.push(t)
        }

        function E(t, e) {
            H(Wt, t, e, kt)
        }

        function R(t) {
            jt.push(t)
        }

        function z(t, e, n) {
            "function" == typeof e && (n = e, e = "");
            var i = Ct(t) ? t.type : [t, t = {
                event: e
            }][0];
            t.event = (t.event || i).toLowerCase(), e = t.event, Mt(zt.test(i) && zt.test(e)), Vt[i] || (Vt[i] = {
                action: n,
                actionInfo: t
            }), Ht[e] = i
        }

        function N(t, e) {
            at.register(t, e)
        }

        function B(t) {
            var e = at.get(t);
            if (e) return e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice()
        }

        function F(t, e) {
            H(Ut, t, e, Ot, "layout")
        }

        function V(t, e) {
            H(Ut, t, e, Pt, "visual")
        }

        function H(t, e, n, i, r) {
            (At(e) || Ct(e)) && (n = e, e = i);
            var a = xt.wrapStageHandler(n, r);
            return a.__prio = e, a.__raw = n, t.push(a), a
        }

        function W(t, e) {
            qt[t] = e
        }

        function G(t) {
            return ut.extend(t)
        }

        function j(t) {
            return ht.extend(t)
        }

        function U(t) {
            return ct.extend(t)
        }

        function Y(t) {
            return dt.extend(t)
        }

        function q(t) {
            J.$override("createCanvas", t)
        }

        function X(t, e, n) {
            St.registerMap(t, e, n)
        }

        function Z(t) {
            var e = St.retrieveMap(t);
            return e && e[0] && {
                geoJson: e[0].geoJSON,
                specialAreas: e[0].specialAreas
            }
        }
        var $ = n(4),
            K = ($.__DEV__, n(101)),
            J = n(0),
            Q = n(36),
            tt = n(8),
            et = n(68),
            nt = n(34),
            it = n(113),
            rt = n(128),
            at = n(75),
            ot = n(216),
            st = n(217),
            lt = n(219),
            ut = n(13),
            ct = n(76),
            ht = n(129),
            dt = n(78),
            ft = n(2),
            pt = n(1),
            gt = n(52),
            vt = gt.throttle,
            mt = n(221),
            yt = n(222),
            _t = n(223),
            xt = n(224),
            bt = n(225),
            wt = n(226);
        n(227);
        var St = n(228),
            Mt = J.assert,
            Tt = J.each,
            At = J.isFunction,
            Ct = J.isObject,
            It = ut.parseClassType,
            Dt = {
                zrender: "4.1.1"
            },
            kt = 1e3,
            Ot = 1e3,
            Pt = 3e3,
            Lt = {
                PROCESSOR: {
                    FILTER: kt,
                    SERIES_FILTER: 800,
                    STATISTIC: 5e3
                },
                VISUAL: {
                    LAYOUT: Ot,
                    PROGRESSIVE_LAYOUT: 1100,
                    GLOBAL: 2e3,
                    CHART: Pt,
                    POST_CHART_LAYOUT: 3500,
                    COMPONENT: 4e3,
                    BRUSH: 5e3
                }
            },
            Et = "__flagInMainProcess",
            Rt = "__optionUpdated",
            zt = /^[a-zA-Z0-9_]+$/;
        r.prototype.on = i("on", !0), r.prototype.off = i("off", !0), r.prototype.one = i("one", !0), J.mixin(r, nt);
        var Nt = a.prototype;
        Nt._onframe = function () {
            if (!this._disposed) {
                var t = this._scheduler;
                if (this[Rt]) {
                    var e = this[Rt].silent;
                    this[Et] = !0, s(this), Bt.update.call(this), this[Et] = !1, this[Rt] = !1, h.call(this, e), d.call(this, e)
                } else if (t.unfinished) {
                    var n = 1,
                        i = this._model,
                        r = this._api;
                    t.unfinished = !1;
                    do {
                        var a = +new Date;
                        t.performSeriesTasks(i), t.performDataProcessorTasks(i), u(this, i), t.performVisualTasks(i), y(this, this._model, r, "remain"), n -= +new Date - a
                    } while (n > 0 && t.unfinished);
                    t.unfinished || this._zr.flush()
                }
            }
        }, Nt.getDom = function () {
            return this._dom
        }, Nt.getZr = function () {
            return this._zr
        }, Nt.setOption = function (t, e, n) {
            if (this._disposed) return void this.id;
            var i;
            if (Ct(e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[Et] = !0, !this._model || e) {
                var r = new ot(this._api),
                    a = this._theme,
                    o = this._model = new it;
                o.scheduler = this._scheduler, o.init(null, null, a, r)
            }
            this._model.setOption(t, Gt), n ? (this[Rt] = {
                silent: i
            }, this[Et] = !1) : (s(this), Bt.update.call(this), this._zr.flush(), this[Rt] = !1, this[Et] = !1, h.call(this, i), d.call(this, i))
        }, Nt.setTheme = function () {
            console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0")
        }, Nt.getModel = function () {
            return this._model
        }, Nt.getOption = function () {
            return this._model && this._model.getOption()
        }, Nt.getWidth = function () {
            return this._zr.getWidth()
        }, Nt.getHeight = function () {
            return this._zr.getHeight()
        }, Nt.getDevicePixelRatio = function () {
            return this._zr.painter.dpr || window.devicePixelRatio || 1
        }, Nt.getRenderedCanvas = function (t) {
            if (tt.canvasSupported) {
                t = t || {}, t.pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor");
                return this._zr.painter.getRenderedCanvas(t)
            }
        }, Nt.getSvgDataUrl = function () {
            if (tt.svgSupported) {
                var t = this._zr,
                    e = t.storage.getDisplayList();
                return J.each(e, function (t) {
                    t.stopAnimation(!0)
                }), t.painter.pathToDataUrl()
            }
        }, Nt.getDataURL = function (t) {
            if (this._disposed) return void this.id;
            t = t || {};
            var e = t.excludeComponents,
                n = this._model,
                i = [],
                r = this;
            Tt(e, function (t) {
                n.eachComponent({
                    mainType: t
                }, function (t) {
                    var e = r._componentsMap[t.__viewId];
                    e.group.ignore || (i.push(e), e.group.ignore = !0)
                })
            });
            var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
            return Tt(i, function (t) {
                t.group.ignore = !1
            }), a
        }, Nt.getConnectedDataURL = function (t) {
            if (this._disposed) return void this.id;
            if (tt.canvasSupported) {
                var e = this.group,
                    n = Math.min,
                    i = Math.max;
                if (Zt[e]) {
                    var r = 1 / 0,
                        a = 1 / 0,
                        o = -1 / 0,
                        s = -1 / 0,
                        l = [],
                        u = t && t.pixelRatio || 1;
                    J.each(Xt, function (u, c) {
                        if (u.group === e) {
                            var h = u.getRenderedCanvas(J.clone(t)),
                                d = u.getDom().getBoundingClientRect();
                            r = n(d.left, r), a = n(d.top, a), o = i(d.right, o), s = i(d.bottom, s), l.push({
                                dom: h,
                                left: d.left,
                                top: d.top
                            })
                        }
                    }), r *= u, a *= u, o *= u, s *= u;
                    var c = o - r,
                        h = s - a,
                        d = J.createCanvas();
                    d.width = c, d.height = h;
                    var f = K.init(d);
                    return t.connectedBackgroundColor && f.add(new ft.Rect({
                        shape: {
                            x: 0,
                            y: 0,
                            width: c,
                            height: h
                        },
                        style: {
                            fill: t.connectedBackgroundColor
                        }
                    })), Tt(l, function (t) {
                        var e = new ft.Image({
                            style: {
                                x: t.left * u - r,
                                y: t.top * u - a,
                                image: t.dom
                            }
                        });
                        f.add(e)
                    }), f.refreshImmediately(), d.toDataURL("image/" + (t && t.type || "png"))
                }
                return this.getDataURL(t)
            }
        }, Nt.convertToPixel = J.curry(o, "convertToPixel"), Nt.convertFromPixel = J.curry(o, "convertFromPixel"), Nt.containPixel = function (t, e) {
            if (this._disposed) return void this.id;
            var n, i = this._model;
            return t = pt.parseFinder(i, t), J.each(t, function (t, i) {
                i.indexOf("Models") >= 0 && J.each(t, function (t) {
                    var r = t.coordinateSystem;
                    if (r && r.containPoint) n |= !!r.containPoint(e);
                    else if ("seriesModels" === i) {
                        var a = this._chartsMap[t.__viewId];
                        a && a.containPoint && (n |= a.containPoint(e, t))
                    }
                }, this)
            }, this), !!n
        }, Nt.getVisual = function (t, e) {
            var n = this._model;
            t = pt.parseFinder(n, t, {
                defaultMainType: "series"
            });
            var i = t.seriesModel,
                r = i.getData(),
                a = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? r.indexOfRawIndex(t.dataIndex) : null;
            return null != a ? r.getItemVisual(a, e) : r.getVisual(e)
        }, Nt.getViewOfComponentModel = function (t) {
            return this._componentsMap[t.__viewId]
        }, Nt.getViewOfSeriesModel = function (t) {
            return this._chartsMap[t.__viewId]
        };
        var Bt = {
            prepareAndUpdate: function (t) {
                s(this), Bt.update.call(this, t)
            },
            update: function (t) {
                var e = this._model,
                    n = this._api,
                    i = this._zr,
                    r = this._coordSysMgr,
                    a = this._scheduler;
                if (e) {
                    a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, n), a.performDataProcessorTasks(e, t), u(this, e), r.update(e, n), g(e), a.performVisualTasks(e, t), v(this, e, n, t);
                    var o = e.get("backgroundColor") || "transparent";
                    if (tt.canvasSupported) i.setBackgroundColor(o);
                    else {
                        var s = Q.parse(o);
                        o = Q.stringify(s, "rgb"), 0 === s[3] && (o = "transparent")
                    }
                    _(e, n)
                }
            },
            updateTransform: function (t) {
                var e = this._model,
                    n = this,
                    i = this._api;
                if (e) {
                    var r = [];
                    e.eachComponent(function (a, o) {
                        var s = n.getViewOfComponentModel(o);
                        if (s && s.__alive)
                            if (s.updateTransform) {
                                var l = s.updateTransform(o, e, i, t);
                                l && l.update && r.push(s)
                            } else r.push(s)
                    });
                    var a = J.createHashMap();
                    e.eachSeries(function (r) {
                        var o = n._chartsMap[r.__viewId];
                        if (o.updateTransform) {
                            var s = o.updateTransform(r, e, i, t);
                            s && s.update && a.set(r.uid, 1)
                        } else a.set(r.uid, 1)
                    }), g(e), this._scheduler.performVisualTasks(e, t, {
                        setDirty: !0,
                        dirtyMap: a
                    }), y(n, e, i, t, a), _(e, this._api)
                }
            },
            updateView: function (t) {
                var e = this._model;
                e && (dt.markUpdateMethod(t, "updateView"), g(e), this._scheduler.performVisualTasks(e, t, {
                    setDirty: !0
                }), v(this, this._model, this._api, t), _(e, this._api))
            },
            updateVisual: function (t) {
                Bt.update.call(this, t)
            },
            updateLayout: function (t) {
                Bt.update.call(this, t)
            }
        };
        Nt.resize = function (t) {
            if (this._disposed) return void this.id;
            this._zr.resize(t);
            var e = this._model;
            if (this._loadingFX && this._loadingFX.resize(), e) {
                var n = e.resetOption("media"),
                    i = t && t.silent;
                this[Et] = !0, n && s(this), Bt.update.call(this), this[Et] = !1, h.call(this, i), d.call(this, i)
            }
        }, Nt.showLoading = function (t, e) {
            if (this._disposed) return void this.id;
            if (Ct(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), qt[t]) {
                var n = qt[t](this._api, e),
                    i = this._zr;
                this._loadingFX = n, i.add(n)
            }
        }, Nt.hideLoading = function () {
            if (this._disposed) return void this.id;
            this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null
        }, Nt.makeActionFromEvent = function (t) {
            var e = J.extend({}, t);
            return e.type = Ht[t.type], e
        }, Nt.dispatchAction = function (t, e) {
            if (this._disposed) return void this.id;
            if (Ct(e) || (e = {
                    silent: !!e
                }), Vt[t.type] && this._model) {
                if (this[Et]) return void this._pendingActions.push(t);
                c.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : !1 !== e.flush && tt.browser.weChat && this._throttledZrFlush(), h.call(this, e.silent), d.call(this, e.silent)
            }
        }, Nt.appendData = function (t) {
            if (this._disposed) return void this.id;
            var e = t.seriesIndex;
            this.getModel().getSeriesByIndex(e).appendData(t), this._scheduler.unfinished = !0
        }, Nt.on = i("on", !1), Nt.off = i("off", !1), Nt.one = i("one", !1);
        var Ft = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
        Nt._initEvents = function () {
            Tt(Ft, function (t) {
                var e = function (e) {
                    var n, i = this.getModel(),
                        r = e.target;
                    if ("globalout" === t) n = {};
                    else if (r && null != r.dataIndex) {
                        var a = r.dataModel || i.getSeriesByIndex(r.seriesIndex);
                        n = a && a.getDataParams(r.dataIndex, r.dataType, r) || {}
                    } else r && r.eventData && (n = J.extend({}, r.eventData));
                    if (n) {
                        var o = n.componentType,
                            s = n.componentIndex;
                        "markLine" !== o && "markPoint" !== o && "markArea" !== o || (o = "series", s = n.seriesIndex);
                        var l = o && null != s && i.getComponent(o, s),
                            u = l && this["series" === l.mainType ? "_chartsMap" : "_componentsMap"][l.__viewId];
                        n.event = e, n.type = t, this._ecEventProcessor.eventInfo = {
                            targetEl: r,
                            packedEvent: n,
                            model: l,
                            view: u
                        }, this.trigger(t, n)
                    }
                };
                e.zrEventfulCallAtLast = !0, this._zr.on(t, e, this)
            }, this), Tt(Ht, function (t, e) {
                this._messageCenter.on(e, function (t) {
                    this.trigger(e, t)
                }, this)
            }, this)
        }, Nt.isDisposed = function () {
            return this._disposed
        }, Nt.clear = function () {
            if (this._disposed) return void this.id;
            this.setOption({
                series: []
            }, !0)
        }, Nt.dispose = function () {
            if (this._disposed) return void this.id;
            this._disposed = !0, pt.setAttribute(this.getDom(), Jt, "");
            var t = this._api,
                e = this._model;
            Tt(this._componentsViews, function (n) {
                n.dispose(e, t)
            }), Tt(this._chartsViews, function (n) {
                n.dispose(e, t)
            }), this._zr.dispose(), delete Xt[this.id]
        }, J.mixin(a, nt), M.prototype = {
            constructor: M,
            normalizeQuery: function (t) {
                var e = {},
                    n = {},
                    i = {};
                if (J.isString(t)) {
                    var r = It(t);
                    e.mainType = r.main || null, e.subType = r.sub || null
                } else {
                    var a = ["Index", "Name", "Id"],
                        o = {
                            name: 1,
                            dataIndex: 1,
                            dataType: 1
                        };
                    J.each(t, function (t, r) {
                        for (var s = !1, l = 0; l < a.length; l++) {
                            var u = a[l],
                                c = r.lastIndexOf(u);
                            if (c > 0 && c === r.length - u.length) {
                                var h = r.slice(0, c);
                                "data" !== h && (e.mainType = h, e[u.toLowerCase()] = t, s = !0)
                            }
                        }
                        o.hasOwnProperty(r) && (n[r] = t, s = !0), s || (i[r] = t)
                    })
                }
                return {
                    cptQuery: e,
                    dataQuery: n,
                    otherQuery: i
                }
            },
            filter: function (t, e, n) {
                function i(t, e, n, i) {
                    return null == t[n] || e[i || n] === t[n]
                }
                var r = this.eventInfo;
                if (!r) return !0;
                var a = r.targetEl,
                    o = r.packedEvent,
                    s = r.model,
                    l = r.view;
                if (!s || !l) return !0;
                var u = e.cptQuery,
                    c = e.dataQuery;
                return i(u, s, "mainType") && i(u, s, "subType") && i(u, s, "index", "componentIndex") && i(u, s, "name") && i(u, s, "id") && i(c, o, "name") && i(c, o, "dataIndex") && i(c, o, "dataType") && (!l.filterForExposedEvent || l.filterForExposedEvent(t, e.otherQuery, a, o))
            },
            afterTrigger: function () {
                this.eventInfo = null
            }
        };
        var Vt = {},
            Ht = {},
            Wt = [],
            Gt = [],
            jt = [],
            Ut = [],
            Yt = {},
            qt = {},
            Xt = {},
            Zt = {},
            $t = new Date - 0,
            Kt = new Date - 0,
            Jt = "_echarts_instance_",
            Qt = I;
        V(2e3, mt), L(st), E(900, lt), W("default", _t), z({
            type: "highlight",
            event: "highlight",
            update: "highlight"
        }, J.noop), z({
            type: "downplay",
            event: "downplay",
            update: "downplay"
        }, J.noop), P("light", bt), P("dark", wt);
        var te = {};
        e.version = "4.4.0", e.dependencies = Dt, e.PRIORITY = Lt, e.init = A, e.connect = C, e.disConnect = I, e.disconnect = Qt, e.dispose = D, e.getInstanceByDom = k, e.getInstanceById = O, e.registerTheme = P, e.registerPreprocessor = L, e.registerProcessor = E, e.registerPostUpdate = R, e.registerAction = z, e.registerCoordinateSystem = N, e.getCoordinateSystemDimensions = B, e.registerLayout = F, e.registerVisual = V, e.registerLoading = W, e.extendComponentModel = G, e.extendComponentView = j, e.extendSeriesModel = U, e.extendChartView = Y, e.setCanvasCreator = q, e.registerMap = X, e.getMap = Z, e.dataTool = te;
        var ee = n(231);
        ! function () {
            for (var t in ee) ee.hasOwnProperty(t) && (e[t] = ee[t])
        }()
    }, function (t, e, n) {
        (function (t) {
            var n;
            "undefined" != typeof window ? n = window.__DEV__ : void 0 !== t && (n = t.__DEV__), void 0 === n && (n = !0);
            var i = n;
            e.__DEV__ = i
        }).call(e, n(100))
    }, function (t, e, n) {
        function i(t) {
            return t.replace(/^\s+|\s+$/g, "")
        }

        function r(t, e, n, i) {
            var r = e[1] - e[0],
                a = n[1] - n[0];
            if (0 === r) return 0 === a ? n[0] : (n[0] + n[1]) / 2;
            if (i)
                if (r > 0) {
                    if (t <= e[0]) return n[0];
                    if (t >= e[1]) return n[1]
                } else {
                    if (t >= e[0]) return n[0];
                    if (t <= e[1]) return n[1]
                }
            else {
                if (t === e[0]) return n[0];
                if (t === e[1]) return n[1]
            }
            return (t - e[0]) / r * a + n[0]
        }

        function a(t, e) {
            switch (t) {
                case "center":
                case "middle":
                    t = "50%";
                    break;
                case "left":
                case "top":
                    t = "0%";
                    break;
                case "right":
                case "bottom":
                    t = "100%"
            }
            return "string" == typeof t ? i(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? NaN : +t
        }

        function o(t, e, n) {
            return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), n ? t : +t
        }

        function s(t) {
            return t.sort(function (t, e) {
                return t - e
            }), t
        }

        function l(t) {
            if (t = +t, isNaN(t)) return 0;
            for (var e = 1, n = 0; Math.round(t * e) / e !== t;) e *= 10, n++;
            return n
        }

        function u(t) {
            var e = t.toString(),
                n = e.indexOf("e");
            if (n > 0) {
                var i = +e.slice(n + 1);
                return i < 0 ? -i : 0
            }
            var r = e.indexOf(".");
            return r < 0 ? 0 : e.length - 1 - r
        }

        function c(t, e) {
            var n = Math.log,
                i = Math.LN10,
                r = Math.floor(n(t[1] - t[0]) / i),
                a = Math.round(n(Math.abs(e[1] - e[0])) / i),
                o = Math.min(Math.max(-r + a, 0), 20);
            return isFinite(o) ? o : 20
        }

        function h(t, e, n) {
            if (!t[e]) return 0;
            var i = b.reduce(t, function (t, e) {
                return t + (isNaN(e) ? 0 : e)
            }, 0);
            if (0 === i) return 0;
            for (var r = Math.pow(10, n), a = b.map(t, function (t) {
                    return (isNaN(t) ? 0 : t) / i * r * 100
                }), o = 100 * r, s = b.map(a, function (t) {
                    return Math.floor(t)
                }), l = b.reduce(s, function (t, e) {
                    return t + e
                }, 0), u = b.map(a, function (t, e) {
                    return t - s[e]
                }); l < o;) {
                for (var c = Number.NEGATIVE_INFINITY, h = null, d = 0, f = u.length; d < f; ++d) u[d] > c && (c = u[d], h = d);
                ++s[h], u[h] = 0, ++l
            }
            return s[e] / r
        }

        function d(t) {
            var e = 2 * Math.PI;
            return (t % e + e) % e
        }

        function f(t) {
            return t > -w && t < w
        }

        function p(t) {
            if (t instanceof Date) return t;
            if ("string" == typeof t) {
                var e = S.exec(t);
                if (!e) return new Date(NaN);
                if (e[8]) {
                    var n = +e[4] || 0;
                    return "Z" !== e[8].toUpperCase() && (n -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, n, +(e[5] || 0), +e[6] || 0, +e[7] || 0))
                }
                return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0)
            }
            return null == t ? new Date(NaN) : new Date(Math.round(t))
        }

        function g(t) {
            return Math.pow(10, v(t))
        }

        function v(t) {
            return Math.floor(Math.log(t) / Math.LN10)
        }

        function m(t, e) {
            var n, i = v(t),
                r = Math.pow(10, i),
                a = t / r;
            return n = e ? a < 1.5 ? 1 : a < 2.5 ? 2 : a < 4 ? 3 : a < 7 ? 5 : 10 : a < 1 ? 1 : a < 2 ? 2 : a < 3 ? 3 : a < 5 ? 5 : 10, t = n * r, i >= -20 ? +t.toFixed(i < 0 ? -i : 0) : t
        }

        function y(t, e) {
            var n = (t.length - 1) * e + 1,
                i = Math.floor(n),
                r = +t[i - 1],
                a = n - i;
            return a ? r + a * (t[i] - r) : r
        }

        function _(t) {
            function e(t, n, i) {
                return t.interval[i] < n.interval[i] || t.interval[i] === n.interval[i] && (t.close[i] - n.close[i] == (i ? -1 : 1) || !i && e(t, n, 1))
            }
            t.sort(function (t, n) {
                return e(t, n, 0) ? -1 : 1
            });
            for (var n = -1 / 0, i = 1, r = 0; r < t.length;) {
                for (var a = t[r].interval, o = t[r].close, s = 0; s < 2; s++) a[s] <= n && (a[s] = n, o[s] = s ? 1 : 1 - i), n = a[s], i = o[s];
                a[0] === a[1] && o[0] * o[1] != 1 ? t.splice(r, 1) : r++
            }
            return t
        }

        function x(t) {
            return t - parseFloat(t) >= 0
        }
        var b = n(0),
            w = 1e-4,
            S = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
        e.linearMap = r, e.parsePercent = a, e.round = o, e.asc = s, e.getPrecision = l, e.getPrecisionSafe = u, e.getPixelPrecision = c, e.getPercentWithPrecision = h, e.MAX_SAFE_INTEGER = 9007199254740991, e.remRadian = d, e.isRadianAroundZero = f, e.parseDate = p, e.quantity = g, e.nice = m, e.quantile = y, e.reformIntervals = _, e.isNumeric = x
    }, function (t, e, n) {
        function i(t) {
            r.call(this, t), this.path = null
        }
        var r = n(47),
            a = n(0),
            o = n(49),
            s = n(198),
            l = n(109),
            u = l.prototype.getCanvasPattern,
            c = Math.abs,
            h = new o(!0);
        i.prototype = {
            constructor: i,
            type: "path",
            __dirtyPath: !0,
            strokeContainThreshold: 5,
            segmentIgnoreThreshold: 0,
            subPixelOptimize: !1,
            brush: function (t, e) {
                var n = this.style,
                    i = this.path || h,
                    r = n.hasStroke(),
                    a = n.hasFill(),
                    o = n.fill,
                    s = n.stroke,
                    l = a && !!o.colorStops,
                    c = r && !!s.colorStops,
                    d = a && !!o.image,
                    f = r && !!s.image;
                if (n.bind(t, this, e), this.setTransform(t), this.__dirty) {
                    var p;
                    l && (p = p || this.getBoundingRect(), this._fillGradient = n.getGradient(t, o, p)), c && (p = p || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, s, p))
                }
                l ? t.fillStyle = this._fillGradient : d && (t.fillStyle = u.call(o, t)), c ? t.strokeStyle = this._strokeGradient : f && (t.strokeStyle = u.call(s, t));
                var g = n.lineDash,
                    v = n.lineDashOffset,
                    m = !!t.setLineDash,
                    y = this.getGlobalScale();
                if (i.setScale(y[0], y[1], this.segmentIgnoreThreshold), this.__dirtyPath || g && !m && r ? (i.beginPath(t), g && !m && (i.setLineDash(g), i.setLineDashOffset(v)), this.buildPath(i, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), a)
                    if (null != n.fillOpacity) {
                        var _ = t.globalAlpha;
                        t.globalAlpha = n.fillOpacity * n.opacity, i.fill(t), t.globalAlpha = _
                    } else i.fill(t);
                if (g && m && (t.setLineDash(g), t.lineDashOffset = v), r)
                    if (null != n.strokeOpacity) {
                        var _ = t.globalAlpha;
                        t.globalAlpha = n.strokeOpacity * n.opacity, i.stroke(t), t.globalAlpha = _
                    } else i.stroke(t);
                g && m && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
            },
            buildPath: function (t, e, n) {},
            createPathProxy: function () {
                this.path = new o
            },
            getBoundingRect: function () {
                var t = this._rect,
                    e = this.style,
                    n = !t;
                if (n) {
                    var i = this.path;
                    i || (i = this.path = new o), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), t = i.getBoundingRect()
                }
                if (this._rect = t, e.hasStroke()) {
                    var r = this._rectWithStroke || (this._rectWithStroke = t.clone());
                    if (this.__dirty || n) {
                        r.copy(t);
                        var a = e.lineWidth,
                            s = e.strokeNoScale ? this.getLineScale() : 1;
                        e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), s > 1e-10 && (r.width += a / s, r.height += a / s, r.x -= a / s / 2, r.y -= a / s / 2)
                    }
                    return r
                }
                return t
            },
            contain: function (t, e) {
                var n = this.transformCoordToLocal(t, e),
                    i = this.getBoundingRect(),
                    r = this.style;
                if (t = n[0], e = n[1], i.contain(t, e)) {
                    var a = this.path.data;
                    if (r.hasStroke()) {
                        var o = r.lineWidth,
                            l = r.strokeNoScale ? this.getLineScale() : 1;
                        if (l > 1e-10 && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), s.containStroke(a, o / l, t, e))) return !0
                    }
                    if (r.hasFill()) return s.contain(a, t, e)
                }
                return !1
            },
            dirty: function (t) {
                null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = this.__dirtyText = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
            },
            animateShape: function (t) {
                return this.animate("shape", t)
            },
            attrKV: function (t, e) {
                "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : r.prototype.attrKV.call(this, t, e)
            },
            setShape: function (t, e) {
                var n = this.shape;
                if (n) {
                    if (a.isObject(t))
                        for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
                    else n[t] = e;
                    this.dirty(!0)
                }
                return this
            },
            getLineScale: function () {
                var t = this.transform;
                return t && c(t[0] - 1) > 1e-10 && c(t[3] - 1) > 1e-10 ? Math.sqrt(c(t[0] * t[3] - t[2] * t[1])) : 1
            }
        }, i.extend = function (t) {
            var e = function (e) {
                i.call(this, e), t.style && this.style.extendFrom(t.style, !1);
                var n = t.shape;
                if (n) {
                    this.shape = this.shape || {};
                    var r = this.shape;
                    for (var a in n) !r.hasOwnProperty(a) && n.hasOwnProperty(a) && (r[a] = n[a])
                }
                t.init && t.init.call(this, e)
            };
            a.inherits(e, i);
            for (var n in t) "style" !== n && "shape" !== n && (e.prototype[n] = t[n]);
            return e
        }, a.inherits(i, r);
        var d = i;
        t.exports = d
    }, function (t, e) {
        function n(t, e) {
            var n = new S(2);
            return null == t && (t = 0), null == e && (e = 0), n[0] = t, n[1] = e, n
        }

        function i(t, e) {
            return t[0] = e[0], t[1] = e[1], t
        }

        function r(t) {
            var e = new S(2);
            return e[0] = t[0], e[1] = t[1], e
        }

        function a(t, e, n) {
            return t[0] = e, t[1] = n, t
        }

        function o(t, e, n) {
            return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t
        }

        function s(t, e, n, i) {
            return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t
        }

        function l(t, e, n) {
            return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t
        }

        function u(t) {
            return Math.sqrt(c(t))
        }

        function c(t) {
            return t[0] * t[0] + t[1] * t[1]
        }

        function h(t, e, n) {
            return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t
        }

        function d(t, e, n) {
            return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t
        }

        function f(t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }

        function p(t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t
        }

        function g(t, e) {
            var n = u(e);
            return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t
        }

        function v(t, e) {
            return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
        }

        function m(t, e) {
            return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
        }

        function y(t, e) {
            return t[0] = -e[0], t[1] = -e[1], t
        }

        function _(t, e, n, i) {
            return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t
        }

        function x(t, e, n) {
            var i = e[0],
                r = e[1];
            return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t
        }

        function b(t, e, n) {
            return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t
        }

        function w(t, e, n) {
            return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t
        }
        var S = "undefined" == typeof Float32Array ? Array : Float32Array,
            M = u,
            T = c,
            A = v,
            C = m;
        e.create = n, e.copy = i, e.clone = r, e.set = a, e.add = o, e.scaleAndAdd = s, e.sub = l, e.len = u, e.length = M, e.lenSquare = c, e.lengthSquare = T, e.mul = h, e.div = d, e.dot = f, e.scale = p, e.normalize = g, e.distance = v, e.dist = A, e.distanceSquare = m, e.distSquare = C, e.negate = y, e.lerp = _, e.applyTransform = x, e.min = b, e.max = w
    }, function (t, e) {
        var n = {};
        n = "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? {
            browser: {},
            os: {},
            node: !1,
            wxa: !0,
            canvasSupported: !0,
            svgSupported: !1,
            touchEventsSupported: !0,
            domSupported: !1
        } : "undefined" == typeof document && "undefined" != typeof self ? {
            browser: {},
            os: {},
            node: !1,
            worker: !0,
            canvasSupported: !0,
            domSupported: !1
        } : "undefined" == typeof navigator ? {
            browser: {},
            os: {},
            node: !0,
            worker: !1,
            canvasSupported: !0,
            svgSupported: !0,
            domSupported: !1
        } : function (t) {
            var e = {},
                n = {},
                i = t.match(/Firefox\/([\d.]+)/),
                r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
                a = t.match(/Edge\/([\d.]+)/),
                o = /micromessenger/i.test(t);
            return i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), a && (n.edge = !0, n.version = a[1]), o && (n.weChat = !0), {
                browser: n,
                os: e,
                node: !1,
                canvasSupported: !!document.createElement("canvas").getContext,
                svgSupported: "undefined" != typeof SVGRect,
                touchEventsSupported: "ontouchstart" in window && !n.ie && !n.edge,
                pointerEventsSupported: "onpointerdown" in window && (n.edge || n.ie && n.version >= 11),
                domSupported: "undefined" != typeof document
            }
        }(navigator.userAgent);
        var i = n;
        t.exports = i
    }, function (t, e, n) {
        function i(t, e, n, i) {
            n < 0 && (t += n, n = -n), i < 0 && (e += i, i = -i), this.x = t, this.y = e, this.width = n, this.height = i
        }
        var r = n(7),
            a = n(20),
            o = r.applyTransform,
            s = Math.min,
            l = Math.max;
        i.prototype = {
            constructor: i,
            union: function (t) {
                var e = s(t.x, this.x),
                    n = s(t.y, this.y);
                this.width = l(t.x + t.width, this.x + this.width) - e, this.height = l(t.y + t.height, this.y + this.height) - n, this.x = e, this.y = n
            },
            applyTransform: function () {
                var t = [],
                    e = [],
                    n = [],
                    i = [];
                return function (r) {
                    if (r) {
                        t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this.height, o(t, t, r), o(e, e, r), o(n, n, r), o(i, i, r), this.x = s(t[0], e[0], n[0], i[0]), this.y = s(t[1], e[1], n[1], i[1]);
                        var a = l(t[0], e[0], n[0], i[0]),
                            u = l(t[1], e[1], n[1], i[1]);
                        this.width = a - this.x, this.height = u - this.y
                    }
                }
            }(),
            calculateTransform: function (t) {
                var e = this,
                    n = t.width / e.width,
                    i = t.height / e.height,
                    r = a.create();
                return a.translate(r, r, [-e.x, -e.y]), a.scale(r, r, [n, i]), a.translate(r, r, [t.x, t.y]), r
            },
            intersect: function (t) {
                if (!t) return !1;
                t instanceof i || (t = i.create(t));
                var e = this,
                    n = e.x,
                    r = e.x + e.width,
                    a = e.y,
                    o = e.y + e.height,
                    s = t.x,
                    l = t.x + t.width,
                    u = t.y,
                    c = t.y + t.height;
                return !(r < s || l < n || o < u || c < a)
            },
            contain: function (t, e) {
                var n = this;
                return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height
            },
            clone: function () {
                return new i(this.x, this.y, this.width, this.height)
            },
            copy: function (t) {
                this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
            },
            plain: function () {
                return {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                }
            }
        }, i.create = function (t) {
            return new i(t.x, t.y, t.width, t.height)
        };
        var u = i;
        t.exports = u
    }, function (t, e, n) {
        function i(t) {
            return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""))
        }

        function r(t, e) {
            return t = (t || "").toLowerCase().replace(/-(.)/g, function (t, e) {
                return e.toUpperCase()
            }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t
        }

        function a(t) {
            return null == t ? "" : (t + "").replace(y, function (t, e) {
                return _[e]
            })
        }

        function o(t, e, n) {
            p.isArray(e) || (e = [e]);
            var i = e.length;
            if (!i) return "";
            for (var r = e[0].$vars || [], o = 0; o < r.length; o++) {
                var s = x[o];
                t = t.replace(b(s), b(s, 0))
            }
            for (var l = 0; l < i; l++)
                for (var u = 0; u < r.length; u++) {
                    var c = e[l][r[u]];
                    t = t.replace(b(x[u], l), n ? a(c) : c)
                }
            return t
        }

        function s(t, e, n) {
            return p.each(e, function (e, i) {
                t = t.replace("{" + i + "}", n ? a(e) : e)
            }), t
        }

        function l(t, e) {
            t = p.isString(t) ? {
                color: t,
                extraCssText: e
            } : t || {};
            var n = t.color,
                i = t.type,
                e = t.extraCssText,
                r = t.renderMode || "html",
                o = t.markerId || "X";
            return n ? "html" === r ? "subItem" === i ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + a(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + a(n) + ";" + (e || "") + '"></span>' : {
                renderMode: r,
                content: "{marker" + o + "|}  ",
                style: {
                    color: n
                }
            } : ""
        }

        function u(t, e) {
            return t += "", "0000".substr(0, e - t.length) + t
        }

        function c(t, e, n) {
            "week" !== t && "month" !== t && "quarter" !== t && "half-year" !== t && "year" !== t || (t = "MM-dd\nyyyy");
            var i = v.parseDate(e),
                r = n ? "UTC" : "",
                a = i["get" + r + "FullYear"](),
                o = i["get" + r + "Month"]() + 1,
                s = i["get" + r + "Date"](),
                l = i["get" + r + "Hours"](),
                c = i["get" + r + "Minutes"](),
                h = i["get" + r + "Seconds"](),
                d = i["get" + r + "Milliseconds"]();
            return t = t.replace("MM", u(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", u(s, 2)).replace("d", s).replace("hh", u(l, 2)).replace("h", l).replace("mm", u(c, 2)).replace("m", c).replace("ss", u(h, 2)).replace("s", h).replace("SSS", u(d, 3))
        }

        function h(t) {
            return t ? t.charAt(0).toUpperCase() + t.substr(1) : t
        }

        function d(t) {
            return g.getBoundingRect(t.text, t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich, t.truncate)
        }

        function f(t, e, n, i, r, a, o, s) {
            return g.getBoundingRect(t, e, n, i, r, s, a, o)
        }
        var p = n(0),
            g = n(16),
            v = n(5),
            m = p.normalizeCssArray,
            y = /([&<>"'])/g,
            _ = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            },
            x = ["a", "b", "c", "d", "e", "f", "g"],
            b = function (t, e) {
                return "{" + t + (null == e ? "" : e) + "}"
            },
            w = g.truncateText;
        e.addCommas = i, e.toCamelCase = r, e.normalizeCssArray = m, e.encodeHTML = a, e.formatTpl = o, e.formatTplSimple = s, e.getTooltipMarker = l, e.formatTime = c, e.capitalFirst = h, e.truncateText = w, e.getTextBoundingRect = d, e.getTextRect = f
    }, function (t, e, n) {
        var i = n(65)("wks"),
            r = n(44),
            a = n(15).Symbol,
            o = "function" == typeof a;
        (t.exports = function (t) {
            return i[t] || (i[t] = o && a[t] || (o ? a : r)("Symbol." + t))
        }).store = i
    }, function (t, e, n) {
        function i(t, e, n) {
            this.parentModel = e, this.ecModel = n, this.option = t
        }

        function r(t, e, n) {
            for (var i = 0; i < e.length && (!e[i] || null != (t = t && "object" == typeof t ? t[e[i]] : null)); i++);
            return null == t && n && (t = n.get(e)), t
        }

        function a(t, e) {
            var n = y(t).getParent;
            return n ? n.call(t, e) : t.parentModel
        }
        var o = n(0),
            s = n(8),
            l = n(1),
            u = l.makeInner,
            c = n(17),
            h = c.enableClassExtend,
            d = c.enableClassCheck,
            f = n(195),
            p = n(196),
            g = n(197),
            v = n(213),
            m = o.mixin,
            y = u();
        i.prototype = {
            constructor: i,
            init: null,
            mergeOption: function (t) {
                o.merge(this.option, t, !0)
            },
            get: function (t, e) {
                return null == t ? this.option : r(this.option, this.parsePath(t), !e && a(this, t))
            },
            getShallow: function (t, e) {
                var n = this.option,
                    i = null == n ? n : n[t],
                    r = !e && a(this, t);
                return null == i && r && (i = r.getShallow(t)), i
            },
            getModel: function (t, e) {
                var n, o = null == t ? this.option : r(this.option, t = this.parsePath(t));
                return e = e || (n = a(this, t)) && n.getModel(t), new i(o, e, this.ecModel)
            },
            isEmpty: function () {
                return null == this.option
            },
            restoreData: function () {},
            clone: function () {
                return new(0, this.constructor)(o.clone(this.option))
            },
            setReadOnly: function (t) {},
            parsePath: function (t) {
                return "string" == typeof t && (t = t.split(".")), t
            },
            customizeGetParent: function (t) {
                y(this).getParent = t
            },
            isAnimationEnabled: function () {
                if (!s.node) {
                    if (null != this.option.animation) return !!this.option.animation;
                    if (this.parentModel) return this.parentModel.isAnimationEnabled()
                }
            }
        }, h(i), d(i), m(i, f), m(i, p), m(i, g), m(i, v);
        var _ = i;
        t.exports = _
    }, function (t, e, n) {
        function i(t) {
            var e = [];
            return r.each(g.getClassesByMainType(t), function (t) {
                e = e.concat(t.prototype.dependencies || [])
            }), e = r.map(e, function (t) {
                return u(t).main
            }), "dataset" !== t && r.indexOf(e, "dataset") <= 0 && e.unshift("dataset"), e
        }
        var r = n(0),
            a = n(12),
            o = n(50),
            s = n(17),
            l = s.enableClassManagement,
            u = s.parseClassType,
            c = n(1),
            h = c.makeInner,
            d = n(14),
            f = n(214),
            p = h(),
            g = a.extend({
                type: "component",
                id: "",
                name: "",
                mainType: "",
                subType: "",
                componentIndex: 0,
                defaultOption: null,
                ecModel: null,
                dependentModels: [],
                uid: null,
                layoutMode: null,
                $constructor: function (t, e, n, i) {
                    a.call(this, t, e, n, i), this.uid = o.getUID("ec_cpt_model")
                },
                init: function (t, e, n, i) {
                    this.mergeDefaultAndTheme(t, n)
                },
                mergeDefaultAndTheme: function (t, e) {
                    var n = this.layoutMode,
                        i = n ? d.getLayoutParams(t) : {},
                        a = e.getTheme();
                    r.merge(t, a.get(this.mainType)), r.merge(t, this.getDefaultOption()), n && d.mergeLayoutParam(t, i, n)
                },
                mergeOption: function (t, e) {
                    r.merge(this.option, t, !0);
                    var n = this.layoutMode;
                    n && d.mergeLayoutParam(this.option, t, n)
                },
                optionUpdated: function (t, e) {},
                getDefaultOption: function () {
                    var t = p(this);
                    if (!t.defaultOption) {
                        for (var e = [], n = this.constructor; n;) {
                            var i = n.prototype.defaultOption;
                            i && e.push(i), n = n.superClass
                        }
                        for (var a = {}, o = e.length - 1; o >= 0; o--) a = r.merge(a, e[o], !0);
                        t.defaultOption = a
                    }
                    return t.defaultOption
                },
                getReferringComponents: function (t) {
                    return this.ecModel.queryComponents({
                        mainType: t,
                        index: this.get(t + "Index", !0),
                        id: this.get(t + "Id", !0)
                    })
                }
            });
        l(g, {
            registerWhenExtend: !0
        }), o.enableSubTypeDefaulter(g), o.enableTopologicalTravel(g, i), r.mixin(g, f);
        var v = g;
        t.exports = v
    }, function (t, e, n) {
        function i(t, e, n, i, r) {
            var a = 0,
                o = 0;
            null == i && (i = 1 / 0), null == r && (r = 1 / 0);
            var s = 0;
            e.eachChild(function (l, u) {
                var c, h, d = l.position,
                    f = l.getBoundingRect(),
                    p = e.childAt(u + 1),
                    g = p && p.getBoundingRect();
                if ("horizontal" === t) {
                    var v = f.width + (g ? -g.x + f.x : 0);
                    c = a + v, c > i || l.newline ? (a = 0, c = v, o += s + n, s = f.height) : s = Math.max(s, f.height)
                } else {
                    var m = f.height + (g ? -g.y + f.y : 0);
                    h = o + m, h > r || l.newline ? (a += s + n, o = 0, h = m, s = f.width) : s = Math.max(s, f.width)
                }
                l.newline || (d[0] = a, d[1] = o, "horizontal" === t ? a = c + n : o = h + n)
            })
        }

        function r(t, e, n) {
            var i = e.width,
                r = e.height,
                a = p(t.x, i),
                o = p(t.y, r),
                s = p(t.x2, i),
                l = p(t.y2, r);
            return (isNaN(a) || isNaN(parseFloat(t.x))) && (a = 0), (isNaN(s) || isNaN(parseFloat(t.x2))) && (s = i), (isNaN(o) || isNaN(parseFloat(t.y))) && (o = 0), (isNaN(l) || isNaN(parseFloat(t.y2))) && (l = r), n = g.normalizeCssArray(n || 0), {
                width: Math.max(s - a - n[1] - n[3], 0),
                height: Math.max(l - o - n[0] - n[2], 0)
            }
        }

        function a(t, e, n) {
            n = g.normalizeCssArray(n || 0);
            var i = e.width,
                r = e.height,
                a = p(t.left, i),
                o = p(t.top, r),
                s = p(t.right, i),
                l = p(t.bottom, r),
                u = p(t.width, i),
                c = p(t.height, r),
                h = n[2] + n[0],
                f = n[1] + n[3],
                v = t.aspect;
            switch (isNaN(u) && (u = i - s - f - a), isNaN(c) && (c = r - l - h - o), null != v && (isNaN(u) && isNaN(c) && (v > i / r ? u = .8 * i : c = .8 * r), isNaN(u) && (u = v * c), isNaN(c) && (c = u / v)), isNaN(a) && (a = i - s - u - f), isNaN(o) && (o = r - l - c - h), t.left || t.right) {
                case "center":
                    a = i / 2 - u / 2 - n[3];
                    break;
                case "right":
                    a = i - u - f
            }
            switch (t.top || t.bottom) {
                case "middle":
                case "center":
                    o = r / 2 - c / 2 - n[0];
                    break;
                case "bottom":
                    o = r - c - h
            }
            a = a || 0, o = o || 0, isNaN(u) && (u = i - f - a - (s || 0)), isNaN(c) && (c = r - h - o - (l || 0));
            var m = new d(a + n[3], o + n[0], u, c);
            return m.margin = n, m
        }

        function o(t, e, n, i, r) {
            var o = !r || !r.hv || r.hv[0],
                s = !r || !r.hv || r.hv[1],
                l = r && r.boundingMode || "all";
            if (o || s) {
                var u;
                if ("raw" === l) u = "group" === t.type ? new d(0, 0, +e.width || 0, +e.height || 0) : t.getBoundingRect();
                else if (u = t.getBoundingRect(), t.needLocalTransform()) {
                    var c = t.getLocalTransform();
                    u = u.clone(), u.applyTransform(c)
                }
                e = a(h.defaults({
                    width: u.width,
                    height: u.height
                }, e), n, i);
                var f = t.position,
                    p = o ? e.x - u.x : 0,
                    g = s ? e.y - u.y : 0;
                t.attr("position", "raw" === l ? [p, g] : [f[0] + p, f[1] + g])
            }
        }

        function s(t, e) {
            return null != t[y[e][0]] || null != t[y[e][1]] && null != t[y[e][2]]
        }

        function l(t, e, n) {
            function i(n, i) {
                var o = {},
                    l = 0,
                    u = {},
                    c = 0;
                if (v(n, function (e) {
                        u[e] = t[e]
                    }), v(n, function (t) {
                        r(e, t) && (o[t] = u[t] = e[t]), a(o, t) && l++, a(u, t) && c++
                    }), s[i]) return a(e, n[1]) ? u[n[2]] = null : a(e, n[2]) && (u[n[1]] = null), u;
                if (2 !== c && l) {
                    if (l >= 2) return o;
                    for (var h = 0; h < n.length; h++) {
                        var d = n[h];
                        if (!r(o, d) && r(t, d)) {
                            o[d] = t[d];
                            break
                        }
                    }
                    return o
                }
                return u
            }

            function r(t, e) {
                return t.hasOwnProperty(e)
            }

            function a(t, e) {
                return null != t[e] && "auto" !== t[e]
            }

            function o(t, e, n) {
                v(t, function (t) {
                    e[t] = n[t]
                })
            }!h.isObject(n) && (n = {});
            var s = n.ignoreSize;
            !h.isArray(s) && (s = [s, s]);
            var l = i(y[0], 0),
                u = i(y[1], 1);
            o(y[0], t, l), o(y[1], t, u)
        }

        function u(t) {
            return c({}, t)
        }

        function c(t, e) {
            return e && t && v(m, function (n) {
                e.hasOwnProperty(n) && (t[n] = e[n])
            }), t
        }
        var h = n(0),
            d = n(9),
            f = n(5),
            p = f.parsePercent,
            g = n(10),
            v = h.each,
            m = ["left", "right", "top", "bottom", "width", "height"],
            y = [
                ["width", "left", "right"],
                ["height", "top", "bottom"]
            ],
            _ = i,
            x = h.curry(i, "vertical"),
            b = h.curry(i, "horizontal");
        e.LOCATION_PARAMS = m, e.HV_NAMES = y, e.box = _, e.vbox = x, e.hbox = b, e.getAvailableSize = r, e.getLayoutRect = a, e.positionElement = o, e.sizeCalculable = s, e.mergeLayoutParam = l, e.getLayoutParams = u, e.copyLayoutParams = c
    }, function (t, e) {
        var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }, function (t, e, n) {
        function i(t, e) {
            R[t] = e
        }

        function r(t, e) {
            e = e || E;
            var n = t + ":" + e;
            if (k[n]) return k[n];
            for (var i = (t + "").split("\n"), r = 0, a = 0, o = i.length; a < o; a++) r = Math.max(m(i[a], e).width, r);
            return O > P && (O = 0, k = {}), O++, k[n] = r, r
        }

        function a(t, e, n, i, r, a, l, u) {
            return l ? s(t, e, n, i, r, a, l, u) : o(t, e, n, i, r, a, u)
        }

        function o(t, e, n, i, a, o, s) {
            var c = y(t, e, a, o, s),
                h = r(t, e);
            a && (h += a[1] + a[3]);
            var d = c.outerHeight,
                f = l(0, h, n),
                p = u(0, d, i),
                g = new w(f, p, h, d);
            return g.lineHeight = c.lineHeight, g
        }

        function s(t, e, n, i, r, a, o, s) {
            var c = _(t, {
                    rich: o,
                    truncate: s,
                    font: e,
                    textAlign: n,
                    textPadding: r,
                    textLineHeight: a
                }),
                h = c.outerWidth,
                d = c.outerHeight,
                f = l(0, h, n),
                p = u(0, d, i);
            return new w(f, p, h, d)
        }

        function l(t, e, n) {
            return "right" === n ? t -= e : "center" === n && (t -= e / 2), t
        }

        function u(t, e, n) {
            return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t
        }

        function c(t, e, n) {
            var i = e.textPosition,
                r = e.textDistance,
                a = n.x,
                o = n.y,
                s = n.height,
                l = n.width,
                u = s / 2,
                c = "left",
                h = "top";
            switch (i) {
                case "left":
                    a -= r, o += u, c = "right", h = "middle";
                    break;
                case "right":
                    a += r + l, o += u, h = "middle";
                    break;
                case "top":
                    a += l / 2, o -= r, c = "center", h = "bottom";
                    break;
                case "bottom":
                    a += l / 2, o += s + r, c = "center";
                    break;
                case "inside":
                    a += l / 2, o += u, c = "center", h = "middle";
                    break;
                case "insideLeft":
                    a += r, o += u, h = "middle";
                    break;
                case "insideRight":
                    a += l - r, o += u, c = "right", h = "middle";
                    break;
                case "insideTop":
                    a += l / 2, o += r, c = "center";
                    break;
                case "insideBottom":
                    a += l / 2, o += s - r, c = "center", h = "bottom";
                    break;
                case "insideTopLeft":
                    a += r, o += r;
                    break;
                case "insideTopRight":
                    a += l - r, o += r, c = "right";
                    break;
                case "insideBottomLeft":
                    a += r, o += s - r, h = "bottom";
                    break;
                case "insideBottomRight":
                    a += l - r, o += s - r, c = "right", h = "bottom"
            }
            return t = t || {}, t.x = a, t.y = o, t.textAlign = c, t.textVerticalAlign = h, t
        }

        function h(t, e, n) {
            return c({}, {
                textPosition: t,
                textDistance: n
            }, e)
        }

        function d(t, e, n, i, r) {
            if (!e) return "";
            var a = (t + "").split("\n");
            r = f(e, n, i, r);
            for (var o = 0, s = a.length; o < s; o++) a[o] = p(a[o], r);
            return a.join("\n")
        }

        function f(t, e, n, i) {
            i = A({}, i), i.font = e;
            var n = C(n, "...");
            i.maxIterations = C(i.maxIterations, 2);
            var a = i.minChar = C(i.minChar, 0);
            i.cnCharWidth = r("国", e);
            var o = i.ascCharWidth = r("a", e);
            i.placeholder = C(i.placeholder, "");
            for (var s = t = Math.max(0, t - 1), l = 0; l < a && s >= o; l++) s -= o;
            var u = r(n, e);
            return u > s && (n = "", u = 0), s = t - u, i.ellipsis = n, i.ellipsisWidth = u, i.contentWidth = s, i.containerWidth = t, i
        }

        function p(t, e) {
            var n = e.containerWidth,
                i = e.font,
                a = e.contentWidth;
            if (!n) return "";
            var o = r(t, i);
            if (o <= n) return t;
            for (var s = 0;; s++) {
                if (o <= a || s >= e.maxIterations) {
                    t += e.ellipsis;
                    break
                }
                var l = 0 === s ? g(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
                t = t.substr(0, l), o = r(t, i)
            }
            return "" === t && (t = e.placeholder), t
        }

        function g(t, e, n, i) {
            for (var r = 0, a = 0, o = t.length; a < o && r < e; a++) {
                var s = t.charCodeAt(a);
                r += 0 <= s && s <= 127 ? n : i
            }
            return a
        }

        function v(t) {
            return r("国", t)
        }

        function m(t, e) {
            return R.measureText(t, e)
        }

        function y(t, e, n, i, r) {
            null != t && (t += "");
            var a = C(i, v(e)),
                o = t ? t.split("\n") : [],
                s = o.length * a,
                l = s;
            if (n && (l += n[0] + n[2]), t && r) {
                var u = r.outerHeight,
                    c = r.outerWidth;
                if (null != u && l > u) t = "", o = [];
                else if (null != c)
                    for (var h = f(c - (n ? n[1] + n[3] : 0), e, r.ellipsis, {
                            minChar: r.minChar,
                            placeholder: r.placeholder
                        }), d = 0, g = o.length; d < g; d++) o[d] = p(o[d], h)
            }
            return {
                lines: o,
                height: s,
                outerHeight: l,
                lineHeight: a
            }
        }

        function _(t, e) {
            var n = {
                lines: [],
                width: 0,
                height: 0
            };
            if (null != t && (t += ""), !t) return n;
            for (var i, a = L.lastIndex = 0; null != (i = L.exec(t));) {
                var o = i.index;
                o > a && x(n, t.substring(a, o)), x(n, i[2], i[1]), a = L.lastIndex
            }
            a < t.length && x(n, t.substring(a, t.length));
            var s = n.lines,
                l = 0,
                u = 0,
                c = [],
                h = e.textPadding,
                f = e.truncate,
                p = f && f.outerWidth,
                g = f && f.outerHeight;
            h && (null != p && (p -= h[1] + h[3]), null != g && (g -= h[0] + h[2]));
            for (var m = 0; m < s.length; m++) {
                for (var y = s[m], _ = 0, b = 0, w = 0; w < y.tokens.length; w++) {
                    var M = y.tokens[w],
                        T = M.styleName && e.rich[M.styleName] || {},
                        A = M.textPadding = T.textPadding,
                        D = M.font = T.font || e.font,
                        k = M.textHeight = C(T.textHeight, v(D));
                    if (A && (k += A[0] + A[2]), M.height = k, M.lineHeight = I(T.textLineHeight, e.textLineHeight, k), M.textAlign = T && T.textAlign || e.textAlign, M.textVerticalAlign = T && T.textVerticalAlign || "middle", null != g && l + M.lineHeight > g) return {
                        lines: [],
                        width: 0,
                        height: 0
                    };
                    M.textWidth = r(M.text, D);
                    var O = T.textWidth,
                        P = null == O || "auto" === O;
                    if ("string" == typeof O && "%" === O.charAt(O.length - 1)) M.percentWidth = O, c.push(M), O = 0;
                    else {
                        if (P) {
                            O = M.textWidth;
                            var E = T.textBackgroundColor,
                                R = E && E.image;
                            R && (R = S.findExistImage(R), S.isImageReady(R) && (O = Math.max(O, R.width * k / R.height)))
                        }
                        var z = A ? A[1] + A[3] : 0;
                        O += z;
                        var N = null != p ? p - b : null;
                        null != N && N < O && (!P || N < z ? (M.text = "", M.textWidth = O = 0) : (M.text = d(M.text, N - z, D, f.ellipsis, {
                            minChar: f.minChar
                        }), M.textWidth = r(M.text, D), O = M.textWidth + z))
                    }
                    b += M.width = O, T && (_ = Math.max(_, M.lineHeight))
                }
                y.width = b, y.lineHeight = _, l += _, u = Math.max(u, b)
            }
            n.outerWidth = n.width = C(e.textWidth, u), n.outerHeight = n.height = C(e.textHeight, l), h && (n.outerWidth += h[1] + h[3], n.outerHeight += h[0] + h[2]);
            for (var m = 0; m < c.length; m++) {
                var M = c[m],
                    B = M.percentWidth;
                M.width = parseInt(B, 10) / 100 * u
            }
            return n
        }

        function x(t, e, n) {
            for (var i = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {
                var s = r[o],
                    l = {
                        styleName: n,
                        text: s,
                        isLineHolder: !s && !i
                    };
                if (o) a.push({
                    tokens: [l]
                });
                else {
                    var u = (a[a.length - 1] || (a[0] = {
                            tokens: []
                        })).tokens,
                        c = u.length;
                    1 === c && u[0].isLineHolder ? u[0] = l : (s || !c || i) && u.push(l)
                }
            }
        }

        function b(t) {
            var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ");
            return e && D(e) || t.textFont || t.font
        }
        var w = n(9),
            S = n(71),
            M = n(0),
            T = M.getContext,
            A = M.extend,
            C = M.retrieve2,
            I = M.retrieve3,
            D = M.trim,
            k = {},
            O = 0,
            P = 5e3,
            L = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
            E = "12px sans-serif",
            R = {};
        R.measureText = function (t, e) {
            var n = T();
            return n.font = e || E, n.measureText(t)
        }, e.DEFAULT_FONT = E, e.$override = i, e.getWidth = r, e.getBoundingRect = a, e.adjustTextX = l, e.adjustTextY = u, e.calculateTextPosition = c, e.adjustTextPositionOnRect = h, e.truncateText = d, e.getLineHeight = v, e.measureText = m, e.parsePlainText = y, e.parseRichText = _, e.makeFont = b
    }, function (t, e, n) {
        function i(t) {
            var e = {
                main: "",
                sub: ""
            };
            return t && (t = t.split(f), e.main = t[0] || "", e.sub = t[1] || ""), e
        }

        function r(t) {
            d.assert(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal')
        }

        function a(t, e) {
            t.$constructor = t, t.extend = function (t) {
                var e = this,
                    n = function () {
                        t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments)
                    };
                return d.extend(n.prototype, t), n.extend = this.extend, n.superCall = s, n.superApply = l, d.inherits(n, this), n.superClass = e, n
            }
        }

        function o(t) {
            var e = ["__\0is_clz", g++, Math.random().toFixed(3)].join("_");
            t.prototype[e] = !0, t.isInstance = function (t) {
                return !(!t || !t[e])
            }
        }

        function s(t, e) {
            var n = d.slice(arguments, 2);
            return this.superClass.prototype[e].apply(t, n)
        }

        function l(t, e, n) {
            return this.superClass.prototype[e].apply(t, n)
        }

        function u(t, e) {
            function n(t) {
                var e = a[t.main];
                return e && e[p] || (e = a[t.main] = {}, e[p] = !0), e
            }
            e = e || {};
            var a = {};
            if (t.registerClass = function (t, e) {
                    if (e)
                        if (r(e), e = i(e), e.sub) {
                            if (e.sub !== p) {
                                var o = n(e);
                                o[e.sub] = t
                            }
                        } else a[e.main] = t;
                    return t
                }, t.getClass = function (t, e, n) {
                    var i = a[t];
                    if (i && i[p] && (i = e ? i[e] : null), n && !i) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
                    return i
                }, t.getClassesByMainType = function (t) {
                    t = i(t);
                    var e = [],
                        n = a[t.main];
                    return n && n[p] ? d.each(n, function (t, n) {
                        n !== p && e.push(t)
                    }) : e.push(n), e
                }, t.hasClass = function (t) {
                    return t = i(t), !!a[t.main]
                }, t.getAllClassMainTypes = function () {
                    var t = [];
                    return d.each(a, function (e, n) {
                        t.push(n)
                    }), t
                }, t.hasSubTypes = function (t) {
                    t = i(t);
                    var e = a[t.main];
                    return e && e[p]
                }, t.parseClassType = i, e.registerWhenExtend) {
                var o = t.extend;
                o && (t.extend = function (e) {
                    var n = o.call(this, e);
                    return t.registerClass(n, e.type)
                })
            }
            return t
        }

        function c(t, e) {}
        var h = n(4),
            d = (h.__DEV__, n(0)),
            f = ".",
            p = "___EC__COMPONENT__CONTAINER___",
            g = 0;
        e.parseClassType = i, e.enableClassExtend = a, e.enableClassCheck = o, e.enableClassManagement = u, e.setReadOnly = c
    }, function (t, e, n) {
        var i = n(30),
            r = n(93),
            a = n(61),
            o = Object.defineProperty;
        e.f = n(23) ? Object.defineProperty : function (t, e, n) {
            if (i(t), e = a(e, !0), i(n), r) try {
                return o(t, e, n)
            } catch (t) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (t[e] = n.value), t
        }
    }, function (t, e) {
        var n = {}.hasOwnProperty;
        t.exports = function (t, e) {
            return n.call(t, e)
        }
    }, function (t, e) {
        function n() {
            var t = new h(6);
            return i(t), t
        }

        function i(t) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
        }

        function r(t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
        }

        function a(t, e, n) {
            var i = e[0] * n[0] + e[2] * n[1],
                r = e[1] * n[0] + e[3] * n[1],
                a = e[0] * n[2] + e[2] * n[3],
                o = e[1] * n[2] + e[3] * n[3],
                s = e[0] * n[4] + e[2] * n[5] + e[4],
                l = e[1] * n[4] + e[3] * n[5] + e[5];
            return t[0] = i, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t
        }

        function o(t, e, n) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], t
        }

        function s(t, e, n) {
            var i = e[0],
                r = e[2],
                a = e[4],
                o = e[1],
                s = e[3],
                l = e[5],
                u = Math.sin(n),
                c = Math.cos(n);
            return t[0] = i * c + o * u, t[1] = -i * u + o * c, t[2] = r * c + s * u, t[3] = -r * u + c * s, t[4] = c * a + u * l, t[5] = c * l - u * a, t
        }

        function l(t, e, n) {
            var i = n[0],
                r = n[1];
            return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, t[5] = e[5] * r, t
        }

        function u(t, e) {
            var n = e[0],
                i = e[2],
                r = e[4],
                a = e[1],
                o = e[3],
                s = e[5],
                l = n * o - a * i;
            return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, t[4] = (i * s - o * r) * l, t[5] = (a * r - n * s) * l, t) : null
        }

        function c(t) {
            var e = n();
            return r(e, t), e
        }
        var h = "undefined" == typeof Float32Array ? Array : Float32Array;
        e.create = n, e.identity = i, e.copy = r, e.mul = a, e.translate = o, e.rotate = s, e.scale = l, e.invert = u, e.clone = c
    }, function (t, e) {
        var n = t.exports = {
            version: "2.5.7"
        };
        "number" == typeof __e && (__e = n)
    }, function (t, e, n) {
        var i = n(18),
            r = n(32);
        t.exports = n(23) ? function (t, e, n) {
            return i.f(t, e, r(1, n))
        } : function (t, e, n) {
            return t[e] = n, t
        }
    }, function (t, e, n) {
        t.exports = !n(43)(function () {
            return 7 != Object.defineProperty({}, "a", {
                get: function () {
                    return 7
                }
            }).a
        })
    }, function (t, e, n) {
        var i = n(170),
            r = n(59);
        t.exports = function (t) {
            return i(r(t))
        }
    }, function (t, e, n) {
        function i(t, e, n, i) {
            return n = n || {}, i || !f.canvasSupported ? r(t, e, n) : f.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : r(t, e, n), n
        }

        function r(t, e, n) {
            if (t.getBoundingClientRect && f.domSupported) {
                var i = e.clientX,
                    r = e.clientY;
                if ("CANVAS" === t.nodeName.toUpperCase()) {
                    var s = t.getBoundingClientRect();
                    return n.zrX = i - s.left, void(n.zrY = r - s.top)
                }
                var l = t[y] || (t[y] = {}),
                    u = o(a(t, l), l);
                if (u) return u(_, i, r), n.zrX = _[0], void(n.zrY = _[1])
            }
            n.zrX = n.zrY = 0
        }

        function a(t, e) {
            var n = e.markers;
            if (n) return n;
            n = e.markers = [];
            for (var i = ["left", "right"], r = ["top", "bottom"], a = 0; a < 4; a++) {
                var o = document.createElement("div"),
                    s = o.style,
                    l = a % 2,
                    u = (a >> 1) % 2;
                s.cssText = ["position:absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "width:0", "height:0", i[l] + ":0", r[u] + ":0", i[1 - l] + ":auto", r[1 - u] + ":auto", ""].join("!important;"), t.appendChild(o), n.push(o)
            }
            return n
        }

        function o(t, e) {
            for (var n = e.transformer, i = e.srcCoords, r = !0, a = [], o = [], s = 0; s < 4; s++) {
                var l = t[s].getBoundingClientRect(),
                    u = 2 * s,
                    c = l.left,
                    h = l.top;
                a.push(c, h), r &= i && c === i[u] && h === i[u + 1], o.push(t[s].offsetLeft, t[s].offsetTop)
            }
            return r ? n : (e.srcCoords = a, e.transformer = g(a, o))
        }

        function s(t, e, n) {
            if (e = e || window.event, null != e.zrX) return e;
            var r = e.type;
            if (r && r.indexOf("touch") >= 0) {
                var a = "touchend" !== r ? e.targetTouches[0] : e.changedTouches[0];
                a && i(t, a, e, n)
            } else i(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
            var o = e.button;
            return null == e.which && void 0 !== o && m.test(e.type) && (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
        }

        function l(t, e, n) {
            v ? t.addEventListener(e, n) : t.attachEvent("on" + e, n)
        }

        function u(t, e, n) {
            v ? t.removeEventListener(e, n) : t.detachEvent("on" + e, n)
        }

        function c(t) {
            return 2 === t.which || 3 === t.which
        }

        function h(t) {
            return t.which > 1
        }
        var d = n(34);
        e.Dispatcher = d;
        var f = n(8),
            p = n(184),
            g = p.buildTransformer,
            v = "undefined" != typeof window && !!window.addEventListener,
            m = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            y = "___zrEVENTSAVED",
            _ = [],
            x = v ? function (t) {
                t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
            } : function (t) {
                t.returnValue = !1, t.cancelBubble = !0
            };
        e.clientToLocal = i, e.normalizeEvent = s, e.addEventListener = l, e.removeEventListener = u, e.stop = x, e.isMiddleOrRightButtonOnMouseUpDown = c, e.notLeftMouse = h
    }, function (t, e, n) {
        function i(t) {
            return t > -w && t < w
        }

        function r(t) {
            return t > w || t < -w
        }

        function a(t, e, n, i, r) {
            var a = 1 - r;
            return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n)
        }

        function o(t, e, n, i, r) {
            var a = 1 - r;
            return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r)
        }

        function s(t, e, n, r, a, o) {
            var s = r + 3 * (e - n) - t,
                l = 3 * (n - 2 * e + t),
                u = 3 * (e - t),
                c = t - a,
                h = l * l - 3 * s * u,
                d = l * u - 9 * s * c,
                f = u * u - 3 * l * c,
                p = 0;
            if (i(h) && i(d))
                if (i(l)) o[0] = 0;
                else {
                    var g = -u / l;
                    g >= 0 && g <= 1 && (o[p++] = g)
                }
            else {
                var v = d * d - 4 * h * f;
                if (i(v)) {
                    var m = d / h,
                        g = -l / s + m,
                        y = -m / 2;
                    g >= 0 && g <= 1 && (o[p++] = g), y >= 0 && y <= 1 && (o[p++] = y)
                } else if (v > 0) {
                    var _ = b(v),
                        w = h * l + 1.5 * s * (-d + _),
                        S = h * l + 1.5 * s * (-d - _);
                    w = w < 0 ? -x(-w, T) : x(w, T), S = S < 0 ? -x(-S, T) : x(S, T);
                    var g = (-l - (w + S)) / (3 * s);
                    g >= 0 && g <= 1 && (o[p++] = g)
                } else {
                    var A = (2 * h * l - 3 * s * d) / (2 * b(h * h * h)),
                        C = Math.acos(A) / 3,
                        I = b(h),
                        D = Math.cos(C),
                        g = (-l - 2 * I * D) / (3 * s),
                        y = (-l + I * (D + M * Math.sin(C))) / (3 * s),
                        k = (-l + I * (D - M * Math.sin(C))) / (3 * s);
                    g >= 0 && g <= 1 && (o[p++] = g), y >= 0 && y <= 1 && (o[p++] = y), k >= 0 && k <= 1 && (o[p++] = k)
                }
            }
            return p
        }

        function l(t, e, n, a, o) {
            var s = 6 * n - 12 * e + 6 * t,
                l = 9 * e + 3 * a - 3 * t - 9 * n,
                u = 3 * e - 3 * t,
                c = 0;
            if (i(l)) {
                if (r(s)) {
                    var h = -u / s;
                    h >= 0 && h <= 1 && (o[c++] = h)
                }
            } else {
                var d = s * s - 4 * l * u;
                if (i(d)) o[0] = -s / (2 * l);
                else if (d > 0) {
                    var f = b(d),
                        h = (-s + f) / (2 * l),
                        p = (-s - f) / (2 * l);
                    h >= 0 && h <= 1 && (o[c++] = h), p >= 0 && p <= 1 && (o[c++] = p)
                }
            }
            return c
        }

        function u(t, e, n, i, r, a) {
            var o = (e - t) * r + t,
                s = (n - e) * r + e,
                l = (i - n) * r + n,
                u = (s - o) * r + o,
                c = (l - s) * r + s,
                h = (c - u) * r + u;
            a[0] = t, a[1] = o, a[2] = u, a[3] = h, a[4] = h, a[5] = c, a[6] = l, a[7] = i
        }

        function c(t, e, n, i, r, o, s, l, u, c, h) {
            var d, f, p, g, v, m = .005,
                y = 1 / 0;
            A[0] = u, A[1] = c;
            for (var x = 0; x < 1; x += .05) C[0] = a(t, n, r, s, x), C[1] = a(e, i, o, l, x), (g = _(A, C)) < y && (d = x, y = g);
            y = 1 / 0;
            for (var w = 0; w < 32 && !(m < S); w++) f = d - m, p = d + m, C[0] = a(t, n, r, s, f), C[1] = a(e, i, o, l, f), g = _(C, A), f >= 0 && g < y ? (d = f, y = g) : (I[0] = a(t, n, r, s, p), I[1] = a(e, i, o, l, p), v = _(I, A), p <= 1 && v < y ? (d = p, y = v) : m *= .5);
            return h && (h[0] = a(t, n, r, s, d), h[1] = a(e, i, o, l, d)), b(y)
        }

        function h(t, e, n, i) {
            var r = 1 - i;
            return r * (r * t + 2 * i * e) + i * i * n
        }

        function d(t, e, n, i) {
            return 2 * ((1 - i) * (e - t) + i * (n - e))
        }

        function f(t, e, n, a, o) {
            var s = t - 2 * e + n,
                l = 2 * (e - t),
                u = t - a,
                c = 0;
            if (i(s)) {
                if (r(l)) {
                    var h = -u / l;
                    h >= 0 && h <= 1 && (o[c++] = h)
                }
            } else {
                var d = l * l - 4 * s * u;
                if (i(d)) {
                    var h = -l / (2 * s);
                    h >= 0 && h <= 1 && (o[c++] = h)
                } else if (d > 0) {
                    var f = b(d),
                        h = (-l + f) / (2 * s),
                        p = (-l - f) / (2 * s);
                    h >= 0 && h <= 1 && (o[c++] = h), p >= 0 && p <= 1 && (o[c++] = p)
                }
            }
            return c
        }

        function p(t, e, n) {
            var i = t + n - 2 * e;
            return 0 === i ? .5 : (t - e) / i
        }

        function g(t, e, n, i, r) {
            var a = (e - t) * i + t,
                o = (n - e) * i + e,
                s = (o - a) * i + a;
            r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = n
        }

        function v(t, e, n, i, r, a, o, s, l) {
            var u, c = .005,
                d = 1 / 0;
            A[0] = o, A[1] = s;
            for (var f = 0; f < 1; f += .05) {
                C[0] = h(t, n, r, f), C[1] = h(e, i, a, f);
                var p = _(A, C);
                p < d && (u = f, d = p)
            }
            d = 1 / 0;
            for (var g = 0; g < 32 && !(c < S); g++) {
                var v = u - c,
                    m = u + c;
                C[0] = h(t, n, r, v), C[1] = h(e, i, a, v);
                var p = _(C, A);
                if (v >= 0 && p < d) u = v, d = p;
                else {
                    I[0] = h(t, n, r, m), I[1] = h(e, i, a, m);
                    var y = _(I, A);
                    m <= 1 && y < d ? (u = m, d = y) : c *= .5
                }
            }
            return l && (l[0] = h(t, n, r, u), l[1] = h(e, i, a, u)), b(d)
        }
        var m = n(7),
            y = m.create,
            _ = m.distSquare,
            x = Math.pow,
            b = Math.sqrt,
            w = 1e-8,
            S = 1e-4,
            M = b(3),
            T = 1 / 3,
            A = y(),
            C = y(),
            I = y();
        e.cubicAt = a, e.cubicDerivativeAt = o, e.cubicRootAt = s, e.cubicExtrema = l, e.cubicSubdivide = u, e.cubicProjectPoint = c, e.quadraticAt = h, e.quadraticDerivativeAt = d, e.quadraticRootAt = f, e.quadraticExtremum = p, e.quadraticSubdivide = g, e.quadraticProjectPoint = v
    }, function (t, e, n) {
        function i(t, e) {
            w.isInstance(t) || (t = w.seriesDataToSource(t)), this._source = t;
            var n = this._data = t.data,
                i = t.sourceFormat;
            i === M && (this._offset = 0, this._dimSize = e, this._data = n);
            var r = D[i === T ? i + "_" + t.seriesLayoutBy : i];
            p(this, r)
        }

        function r() {
            return this._data.length
        }

        function a(t) {
            return this._data[t]
        }

        function o(t) {
            for (var e = 0; e < t.length; e++) this._data.push(t[e])
        }

        function s(t, e, n, i) {
            return null != n ? t[n] : t
        }

        function l(t, e, n, i) {
            return u(t[i], this._dimensionInfos[e])
        }

        function u(t, e) {
            var n = e && e.type;
            if ("ordinal" === n) {
                var i = e && e.ordinalMeta;
                return i ? i.parseAndCollect(t) : t
            }
            return "time" === n && "number" != typeof t && null != t && "-" !== t && (t = +b(t)), null == t || "" === t ? NaN : +t
        }

        function c(t, e, n) {
            if (t) {
                var i = t.getRawDataItem(e);
                if (null != i) {
                    var r, a, o = t.getProvider().getSource().sourceFormat,
                        s = t.getDimensionInfo(n);
                    return s && (r = s.name, a = s.index), k[o](i, e, a, r)
                }
            }
        }

        function h(t, e, n) {
            if (t) {
                var i = t.getProvider().getSource().sourceFormat;
                if (i === A || i === C) {
                    var r = t.getRawDataItem(e);
                    return i !== A || v(r) || (r = null), r ? r[n] : void 0
                }
            }
        }
        var d = n(4),
            f = (d.__DEV__, n(0)),
            p = (f.isTypedArray, f.extend),
            g = (f.assert, f.each),
            v = f.isObject,
            m = n(1),
            y = m.getDataItemValue,
            _ = m.isDataItemOption,
            x = n(5),
            b = x.parseDate,
            w = n(37),
            S = n(38),
            M = S.SOURCE_FORMAT_TYPED_ARRAY,
            T = S.SOURCE_FORMAT_ARRAY_ROWS,
            A = S.SOURCE_FORMAT_ORIGINAL,
            C = S.SOURCE_FORMAT_OBJECT_ROWS,
            I = i.prototype;
        I.pure = !1, I.persistent = !0, I.getSource = function () {
            return this._source
        };
        var D = {
                arrayRows_column: {
                    pure: !0,
                    count: function () {
                        return Math.max(0, this._data.length - this._source.startIndex)
                    },
                    getItem: function (t) {
                        return this._data[t + this._source.startIndex]
                    },
                    appendData: o
                },
                arrayRows_row: {
                    pure: !0,
                    count: function () {
                        var t = this._data[0];
                        return t ? Math.max(0, t.length - this._source.startIndex) : 0
                    },
                    getItem: function (t) {
                        t += this._source.startIndex;
                        for (var e = [], n = this._data, i = 0; i < n.length; i++) {
                            var r = n[i];
                            e.push(r ? r[t] : null)
                        }
                        return e
                    },
                    appendData: function () {
                        throw new Error('Do not support appendData when set seriesLayoutBy: "row".')
                    }
                },
                objectRows: {
                    pure: !0,
                    count: r,
                    getItem: a,
                    appendData: o
                },
                keyedColumns: {
                    pure: !0,
                    count: function () {
                        var t = this._source.dimensionsDefine[0].name,
                            e = this._data[t];
                        return e ? e.length : 0
                    },
                    getItem: function (t) {
                        for (var e = [], n = this._source.dimensionsDefine, i = 0; i < n.length; i++) {
                            var r = this._data[n[i].name];
                            e.push(r ? r[t] : null)
                        }
                        return e
                    },
                    appendData: function (t) {
                        var e = this._data;
                        g(t, function (t, n) {
                            for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) i.push(t[r])
                        })
                    }
                },
                original: {
                    count: r,
                    getItem: a,
                    appendData: o
                },
                typedArray: {
                    persistent: !1,
                    pure: !0,
                    count: function () {
                        return this._data ? this._data.length / this._dimSize : 0
                    },
                    getItem: function (t, e) {
                        t -= this._offset, e = e || [];
                        for (var n = this._dimSize * t, i = 0; i < this._dimSize; i++) e[i] = this._data[n + i];
                        return e
                    },
                    appendData: function (t) {
                        this._data = t
                    },
                    clean: function () {
                        this._offset += this.count(), this._data = null
                    }
                }
            },
            k = {
                arrayRows: s,
                objectRows: function (t, e, n, i) {
                    return null != n ? t[i] : t
                },
                keyedColumns: s,
                original: function (t, e, n, i) {
                    var r = y(t);
                    return null != n && r instanceof Array ? r[n] : r
                },
                typedArray: s
            },
            O = {
                arrayRows: l,
                objectRows: function (t, e, n, i) {
                    return u(t[e], this._dimensionInfos[e])
                },
                keyedColumns: l,
                original: function (t, e, n, i) {
                    var r = t && (null == t.value ? t : t.value);
                    return !this._rawData.pure && _(t) && (this.hasItemOption = !0), u(r instanceof Array ? r[i] : r, this._dimensionInfos[e])
                },
                typedArray: function (t, e, n, i) {
                    return t[i]
                }
            };
        e.DefaultDataProvider = i, e.defaultDimValueGetters = O, e.retrieveRawValue = c, e.retrieveRawAttr = h
    }, function (t, e, n) {
        function i(t, e, n) {
            n = n || {};
            var i, r, a, o, u = n.byIndex,
                c = n.stackedCoordDimension,
                h = !(!t || !t.get("stack"));
            if (s(e, function (t, n) {
                    l(t) && (e[n] = t = {
                        name: t
                    }), h && !t.isExtraCoord && (u || i || !t.ordinalMeta || (i = t), r || "ordinal" === t.type || "time" === t.type || c && c !== t.coordDim || (r = t))
                }), !r || u || i || (u = !0), r) {
                a = "__\0ecstackresult", o = "__\0ecstackedover", i && (i.createInvertedIndices = !0);
                var d = r.coordDim,
                    f = r.type,
                    p = 0;
                s(e, function (t) {
                    t.coordDim === d && p++
                }), e.push({
                    name: a,
                    coordDim: d,
                    coordDimIndex: p,
                    type: f,
                    isExtraCoord: !0,
                    isCalculationCoord: !0
                }), p++, e.push({
                    name: o,
                    coordDim: o,
                    coordDimIndex: p,
                    type: f,
                    isExtraCoord: !0,
                    isCalculationCoord: !0
                })
            }
            return {
                stackedDimension: r && r.name,
                stackedByDimension: i && i.name,
                isStackedByIndex: u,
                stackedOverDimension: o,
                stackResultDimension: a
            }
        }

        function r(t, e) {
            return !!e && e === t.getCalculationInfo("stackedDimension")
        }

        function a(t, e) {
            return r(t, e) ? t.getCalculationInfo("stackResultDimension") : e
        }
        var o = n(0),
            s = o.each,
            l = o.isString;
        e.enableDataStack = i, e.isDimensionStacked = r, e.getStackedDimension = a
    }, function (t, e, n) {
        function i(t, e) {
            var n, i, a, o = t.type,
                s = e.getMin(),
                l = e.getMax(),
                u = null != s,
                c = null != l,
                h = t.getExtent();
            "ordinal" === o ? n = e.getCategories().length : (i = e.get("boundaryGap"), g.isArray(i) || (i = [i || 0, i || 0]), "boolean" == typeof i[0] && (i = [0, 0]), i[0] = _.parsePercent(i[0], 1), i[1] = _.parsePercent(i[1], 1), a = h[1] - h[0] || Math.abs(h[0])), null == s && (s = "ordinal" === o ? n ? 0 : NaN : h[0] - i[0] * a), null == l && (l = "ordinal" === o ? n ? n - 1 : NaN : h[1] + i[1] * a), "dataMin" === s ? s = h[0] : "function" == typeof s && (s = s({
                min: h[0],
                max: h[1]
            })), "dataMax" === l ? l = h[1] : "function" == typeof l && (l = l({
                min: h[0],
                max: h[1]
            })), (null == s || !isFinite(s)) && (s = NaN), (null == l || !isFinite(l)) && (l = NaN), t.setBlank(g.eqNaN(s) || g.eqNaN(l) || "ordinal" === o && !t.getOrdinalMeta().categories.length), e.getNeedCrossZero() && (s > 0 && l > 0 && !u && (s = 0), s < 0 && l < 0 && !c && (l = 0));
            var d = e.ecModel;
            if (d && "time" === o) {
                var f, p = b("bar", d);
                if (g.each(p, function (t) {
                        f |= t.getBaseAxis() === e.axis
                    }), f) {
                    var v = w(p),
                        m = r(s, l, e, v);
                    s = m.min, l = m.max
                }
            }
            return [s, l]
        }

        function r(t, e, n, i) {
            var r = n.axis.getExtent(),
                a = r[1] - r[0],
                o = S(i, n.axis);
            if (void 0 === o) return {
                min: t,
                max: e
            };
            var s = 1 / 0;
            g.each(o, function (t) {
                s = Math.min(t.offset, s)
            });
            var l = -1 / 0;
            g.each(o, function (t) {
                l = Math.max(t.offset + t.width, l)
            }), s = Math.abs(s), l = Math.abs(l);
            var u = s + l,
                c = e - t,
                h = 1 - (s + l) / a,
                d = c / h - c;
            return e += d * (l / u), t -= d * (s / u), {
                min: t,
                max: e
            }
        }

        function a(t, e) {
            var n = i(t, e),
                r = null != e.getMin(),
                a = null != e.getMax(),
                o = e.get("splitNumber");
            "log" === t.type && (t.base = e.get("logBase"));
            var s = t.type;
            t.setExtent(n[0], n[1]), t.niceExtent({
                splitNumber: o,
                fixMin: r,
                fixMax: a,
                minInterval: "interval" === s || "time" === s ? e.get("minInterval") : null,
                maxInterval: "interval" === s || "time" === s ? e.get("maxInterval") : null
            });
            var l = e.get("interval");
            null != l && t.setInterval && t.setInterval(l)
        }

        function o(t, e) {
            if (e = e || t.get("type")) switch (e) {
                case "category":
                    return new v(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [1 / 0, -1 / 0]);
                case "value":
                    return new m;
                default:
                    return (y.getClass(e) || m).create(t)
            }
        }

        function s(t) {
            var e = t.scale.getExtent(),
                n = e[0],
                i = e[1];
            return !(n > 0 && i > 0 || n < 0 && i < 0)
        }

        function l(t) {
            var e = t.getLabelModel().get("formatter"),
                n = "category" === t.type ? t.scale.getExtent()[0] : null;
            return "string" == typeof e ? e = function (e) {
                return function (n) {
                    return n = t.scale.getLabel(n), e.replace("{value}", null != n ? n : "")
                }
            }(e) : "function" == typeof e ? function (i, r) {
                return null != n && (r = i - n), e(u(t, i), r)
            } : function (e) {
                return t.scale.getLabel(e)
            }
        }

        function u(t, e) {
            return "category" === t.type ? t.scale.getLabel(e) : e
        }

        function c(t) {
            var e = t.model,
                n = t.scale;
            if (e.get("axisLabel.show") && !n.isBlank()) {
                var i, r, a = "category" === t.type,
                    o = n.getExtent();
                a ? r = n.count() : (i = n.getTicks(), r = i.length);
                var s, u = t.getLabelModel(),
                    c = l(t),
                    d = 1;
                r > 40 && (d = Math.ceil(r / 40));
                for (var f = 0; f < r; f += d) {
                    var p = i ? i[f] : o[0] + f,
                        g = c(p),
                        v = u.getTextRect(g),
                        m = h(v, u.get("rotate") || 0);
                    s ? s.union(m) : s = m
                }
                return s
            }
        }

        function h(t, e) {
            var n = e * Math.PI / 180,
                i = t.plain(),
                r = i.width,
                a = i.height,
                o = r * Math.cos(n) + a * Math.sin(n),
                s = r * Math.sin(n) + a * Math.cos(n);
            return new M(i.x, i.y, o, s)
        }

        function d(t) {
            var e = t.get("interval");
            return null == e ? "auto" : e
        }

        function f(t) {
            return "category" === t.type && 0 === d(t.getLabelModel())
        }
        var p = n(4),
            g = (p.__DEV__, n(0)),
            v = n(234),
            m = n(84),
            y = n(53),
            _ = n(5),
            x = n(134),
            b = x.prepareLayoutBarSeries,
            w = x.makeColumnLayout,
            S = x.retrieveColumnLayout,
            M = n(9);
        n(235), n(236), e.getScaleExtent = i, e.niceScaleExtent = a, e.createScaleByModel = o, e.ifAxisCrossZero = s, e.makeLabelFormatter = l, e.getAxisRawValue = u, e.estimateLabelUnionRect = c, e.getOptionCategoryInterval = d, e.shouldShowAllLabels = f
    }, function (t, e, n) {
        var i = n(31);
        t.exports = function (t) {
            if (!i(t)) throw TypeError(t + " is not an object!");
            return t
        }
    }, function (t, e) {
        t.exports = function (t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        }
    }, function (t, e) {
        t.exports = function (t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e
            }
        }
    }, function (t, e) {
        t.exports = {}
    }, function (t, e) {
        function n(t, e) {
            var n = t._$eventProcessor;
            return null != e && n && n.normalizeQuery && (e = n.normalizeQuery(e)), e
        }

        function i(t, e, i, r, a, o) {
            var s = t._$handlers;
            if ("function" == typeof i && (a = r, r = i, i = null), !r || !e) return t;
            i = n(t, i), s[e] || (s[e] = []);
            for (var l = 0; l < s[e].length; l++)
                if (s[e][l].h === r) return t;
            var u = {
                    h: r,
                    one: o,
                    query: i,
                    ctx: a || t,
                    callAtLast: r.zrEventfulCallAtLast
                },
                c = s[e].length - 1,
                h = s[e][c];
            return h && h.callAtLast ? s[e].splice(c, 0, u) : s[e].push(u), t
        }
        var r = Array.prototype.slice,
            a = function (t) {
                this._$handlers = {}, this._$eventProcessor = t
            };
        a.prototype = {
            constructor: a,
            one: function (t, e, n, r) {
                return i(this, t, e, n, r, !0)
            },
            on: function (t, e, n, r) {
                return i(this, t, e, n, r, !1)
            },
            isSilent: function (t) {
                var e = this._$handlers;
                return !e[t] || !e[t].length
            },
            off: function (t, e) {
                var n = this._$handlers;
                if (!t) return this._$handlers = {}, this;
                if (e) {
                    if (n[t]) {
                        for (var i = [], r = 0, a = n[t].length; r < a; r++) n[t][r].h !== e && i.push(n[t][r]);
                        n[t] = i
                    }
                    n[t] && 0 === n[t].length && delete n[t]
                } else delete n[t];
                return this
            },
            trigger: function (t) {
                var e = this._$handlers[t],
                    n = this._$eventProcessor;
                if (e) {
                    var i = arguments,
                        a = i.length;
                    a > 3 && (i = r.call(i, 1));
                    for (var o = e.length, s = 0; s < o;) {
                        var l = e[s];
                        if (n && n.filter && null != l.query && !n.filter(t, l.query)) s++;
                        else {
                            switch (a) {
                                case 1:
                                    l.h.call(l.ctx);
                                    break;
                                case 2:
                                    l.h.call(l.ctx, i[1]);
                                    break;
                                case 3:
                                    l.h.call(l.ctx, i[1], i[2]);
                                    break;
                                default:
                                    l.h.apply(l.ctx, i)
                            }
                            l.one ? (e.splice(s, 1), o--) : s++
                        }
                    }
                }
                return n && n.afterTrigger && n.afterTrigger(t), this
            },
            triggerWithContext: function (t) {
                var e = this._$handlers[t],
                    n = this._$eventProcessor;
                if (e) {
                    var i = arguments,
                        a = i.length;
                    a > 4 && (i = r.call(i, 1, i.length - 1));
                    for (var o = i[i.length - 1], s = e.length, l = 0; l < s;) {
                        var u = e[l];
                        if (n && n.filter && null != u.query && !n.filter(t, u.query)) l++;
                        else {
                            switch (a) {
                                case 1:
                                    u.h.call(o);
                                    break;
                                case 2:
                                    u.h.call(o, i[1]);
                                    break;
                                case 3:
                                    u.h.call(o, i[1], i[2]);
                                    break;
                                default:
                                    u.h.apply(o, i)
                            }
                            u.one ? (e.splice(l, 1), s--) : l++
                        }
                    }
                }
                return n && n.afterTrigger && n.afterTrigger(t), this
            }
        };
        var o = a;
        t.exports = o
    }, function (t, e, n) {
        var i = n(0),
            r = n(103),
            a = n(9),
            o = function (t) {
                t = t || {}, r.call(this, t);
                for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                this._children = [], this.__storage = null, this.__dirty = !0
            };
        o.prototype = {
            constructor: o,
            isGroup: !0,
            type: "group",
            silent: !1,
            children: function () {
                return this._children.slice()
            },
            childAt: function (t) {
                return this._children[t]
            },
            childOfName: function (t) {
                for (var e = this._children, n = 0; n < e.length; n++)
                    if (e[n].name === t) return e[n]
            },
            childCount: function () {
                return this._children.length
            },
            add: function (t) {
                return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
            },
            addBefore: function (t, e) {
                if (t && t !== this && t.parent !== this && e && e.parent === this) {
                    var n = this._children,
                        i = n.indexOf(e);
                    i >= 0 && (n.splice(i, 0, t), this._doAdd(t))
                }
                return this
            },
            _doAdd: function (t) {
                t.parent && t.parent.remove(t), t.parent = this;
                var e = this.__storage,
                    n = this.__zr;
                e && e !== t.__storage && (e.addToStorage(t), t instanceof o && t.addChildrenToStorage(e)), n && n.refresh()
            },
            remove: function (t) {
                var e = this.__zr,
                    n = this.__storage,
                    r = this._children,
                    a = i.indexOf(r, t);
                return a < 0 ? this : (r.splice(a, 1), t.parent = null, n && (n.delFromStorage(t), t instanceof o && t.delChildrenFromStorage(n)), e && e.refresh(), this)
            },
            removeAll: function () {
                var t, e, n = this._children,
                    i = this.__storage;
                for (e = 0; e < n.length; e++) t = n[e], i && (i.delFromStorage(t), t instanceof o && t.delChildrenFromStorage(i)), t.parent = null;
                return n.length = 0, this
            },
            eachChild: function (t, e) {
                for (var n = this._children, i = 0; i < n.length; i++) {
                    var r = n[i];
                    t.call(e, r, i)
                }
                return this
            },
            traverse: function (t, e) {
                for (var n = 0; n < this._children.length; n++) {
                    var i = this._children[n];
                    t.call(e, i), "group" === i.type && i.traverse(t, e)
                }
                return this
            },
            addChildrenToStorage: function (t) {
                for (var e = 0; e < this._children.length; e++) {
                    var n = this._children[e];
                    t.addToStorage(n), n instanceof o && n.addChildrenToStorage(t)
                }
            },
            delChildrenFromStorage: function (t) {
                for (var e = 0; e < this._children.length; e++) {
                    var n = this._children[e];
                    t.delFromStorage(n), n instanceof o && n.delChildrenFromStorage(t)
                }
            },
            dirty: function () {
                return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
            },
            getBoundingRect: function (t) {
                for (var e = null, n = new a(0, 0, 0, 0), i = t || this._children, r = [], o = 0; o < i.length; o++) {
                    var s = i[o];
                    if (!s.ignore && !s.invisible) {
                        var l = s.getBoundingRect(),
                            u = s.getLocalTransform(r);
                        u ? (n.copy(l), n.applyTransform(u), e = e || n.clone(), e.union(n)) : (e = e || l.clone(), e.union(l))
                    }
                }
                return e || n
            }
        }, i.inherits(o, r);
        var s = o;
        t.exports = s
    }, function (t, e, n) {
        function i(t) {
            return t = Math.round(t), t < 0 ? 0 : t > 255 ? 255 : t
        }

        function r(t) {
            return t = Math.round(t), t < 0 ? 0 : t > 360 ? 360 : t
        }

        function a(t) {
            return t < 0 ? 0 : t > 1 ? 1 : t
        }

        function o(t) {
            return i(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10))
        }

        function s(t) {
            return a(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t))
        }

        function l(t, e, n) {
            return n < 0 ? n += 1 : n > 1 && (n -= 1), 6 * n < 1 ? t + (e - t) * n * 6 : 2 * n < 1 ? e : 3 * n < 2 ? t + (e - t) * (2 / 3 - n) * 6 : t
        }

        function u(t, e, n) {
            return t + (e - t) * n
        }

        function c(t, e, n, i, r) {
            return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t
        }

        function h(t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }

        function d(t, e) {
            A && h(A, e), A = T.put(t, A || e.slice())
        }

        function f(t, e) {
            if (t) {
                e = e || [];
                var n = T.get(t);
                if (n) return h(e, n);
                t += "";
                var i = t.replace(/ /g, "").toLowerCase();
                if (i in M) return h(e, M[i]), d(t, e), e;
                if ("#" !== i.charAt(0)) {
                    var r = i.indexOf("("),
                        a = i.indexOf(")");
                    if (-1 !== r && a + 1 === i.length) {
                        var l = i.substr(0, r),
                            u = i.substr(r + 1, a - (r + 1)).split(","),
                            f = 1;
                        switch (l) {
                            case "rgba":
                                if (4 !== u.length) return void c(e, 0, 0, 0, 1);
                                f = s(u.pop());
                            case "rgb":
                                return 3 !== u.length ? void c(e, 0, 0, 0, 1) : (c(e, o(u[0]), o(u[1]), o(u[2]), f), d(t, e), e);
                            case "hsla":
                                return 4 !== u.length ? void c(e, 0, 0, 0, 1) : (u[3] = s(u[3]), p(u, e), d(t, e), e);
                            case "hsl":
                                return 3 !== u.length ? void c(e, 0, 0, 0, 1) : (p(u, e), d(t, e), e);
                            default:
                                return
                        }
                    }
                    c(e, 0, 0, 0, 1)
                } else {
                    if (4 === i.length) {
                        var g = parseInt(i.substr(1), 16);
                        return g >= 0 && g <= 4095 ? (c(e, (3840 & g) >> 4 | (3840 & g) >> 8, 240 & g | (240 & g) >> 4, 15 & g | (15 & g) << 4, 1), d(t, e), e) : void c(e, 0, 0, 0, 1)
                    }
                    if (7 === i.length) {
                        var g = parseInt(i.substr(1), 16);
                        return g >= 0 && g <= 16777215 ? (c(e, (16711680 & g) >> 16, (65280 & g) >> 8, 255 & g, 1), d(t, e), e) : void c(e, 0, 0, 0, 1)
                    }
                }
            }
        }

        function p(t, e) {
            var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360,
                r = s(t[1]),
                a = s(t[2]),
                o = a <= .5 ? a * (r + 1) : a + r - a * r,
                u = 2 * a - o;
            return e = e || [], c(e, i(255 * l(u, o, n + 1 / 3)), i(255 * l(u, o, n)), i(255 * l(u, o, n - 1 / 3)), 1), 4 === t.length && (e[3] = t[3]), e
        }

        function g(t) {
            if (t) {
                var e, n, i = t[0] / 255,
                    r = t[1] / 255,
                    a = t[2] / 255,
                    o = Math.min(i, r, a),
                    s = Math.max(i, r, a),
                    l = s - o,
                    u = (s + o) / 2;
                if (0 === l) e = 0, n = 0;
                else {
                    n = u < .5 ? l / (s + o) : l / (2 - s - o);
                    var c = ((s - i) / 6 + l / 2) / l,
                        h = ((s - r) / 6 + l / 2) / l,
                        d = ((s - a) / 6 + l / 2) / l;
                    i === s ? e = d - h : r === s ? e = 1 / 3 + c - d : a === s && (e = 2 / 3 + h - c), e < 0 && (e += 1), e > 1 && (e -= 1)
                }
                var f = [360 * e, n, u];
                return null != t[3] && f.push(t[3]), f
            }
        }

        function v(t, e) {
            var n = f(t);
            if (n) {
                for (var i = 0; i < 3; i++) n[i] = e < 0 ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0, n[i] > 255 ? n[i] = 255 : t[i] < 0 && (n[i] = 0);
                return w(n, 4 === n.length ? "rgba" : "rgb")
            }
        }

        function m(t) {
            var e = f(t);
            if (e) return ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1)
        }

        function y(t, e, n) {
            if (e && e.length && t >= 0 && t <= 1) {
                n = n || [];
                var r = t * (e.length - 1),
                    o = Math.floor(r),
                    s = Math.ceil(r),
                    l = e[o],
                    c = e[s],
                    h = r - o;
                return n[0] = i(u(l[0], c[0], h)), n[1] = i(u(l[1], c[1], h)), n[2] = i(u(l[2], c[2], h)), n[3] = a(u(l[3], c[3], h)), n
            }
        }

        function _(t, e, n) {
            if (e && e.length && t >= 0 && t <= 1) {
                var r = t * (e.length - 1),
                    o = Math.floor(r),
                    s = Math.ceil(r),
                    l = f(e[o]),
                    c = f(e[s]),
                    h = r - o,
                    d = w([i(u(l[0], c[0], h)), i(u(l[1], c[1], h)), i(u(l[2], c[2], h)), a(u(l[3], c[3], h))], "rgba");
                return n ? {
                    color: d,
                    leftIndex: o,
                    rightIndex: s,
                    value: r
                } : d
            }
        }

        function x(t, e, n, i) {
            if (t = f(t)) return t = g(t), null != e && (t[0] = r(e)), null != n && (t[1] = s(n)), null != i && (t[2] = s(i)), w(p(t), "rgba")
        }

        function b(t, e) {
            if ((t = f(t)) && null != e) return t[3] = a(e), w(t, "rgba")
        }

        function w(t, e) {
            if (t && t.length) {
                var n = t[0] + "," + t[1] + "," + t[2];
                return "rgba" !== e && "hsva" !== e && "hsla" !== e || (n += "," + t[3]), e + "(" + n + ")"
            }
        }
        var S = n(106),
            M = {
                transparent: [0, 0, 0, 0],
                aliceblue: [240, 248, 255, 1],
                antiquewhite: [250, 235, 215, 1],
                aqua: [0, 255, 255, 1],
                aquamarine: [127, 255, 212, 1],
                azure: [240, 255, 255, 1],
                beige: [245, 245, 220, 1],
                bisque: [255, 228, 196, 1],
                black: [0, 0, 0, 1],
                blanchedalmond: [255, 235, 205, 1],
                blue: [0, 0, 255, 1],
                blueviolet: [138, 43, 226, 1],
                brown: [165, 42, 42, 1],
                burlywood: [222, 184, 135, 1],
                cadetblue: [95, 158, 160, 1],
                chartreuse: [127, 255, 0, 1],
                chocolate: [210, 105, 30, 1],
                coral: [255, 127, 80, 1],
                cornflowerblue: [100, 149, 237, 1],
                cornsilk: [255, 248, 220, 1],
                crimson: [220, 20, 60, 1],
                cyan: [0, 255, 255, 1],
                darkblue: [0, 0, 139, 1],
                darkcyan: [0, 139, 139, 1],
                darkgoldenrod: [184, 134, 11, 1],
                darkgray: [169, 169, 169, 1],
                darkgreen: [0, 100, 0, 1],
                darkgrey: [169, 169, 169, 1],
                darkkhaki: [189, 183, 107, 1],
                darkmagenta: [139, 0, 139, 1],
                darkolivegreen: [85, 107, 47, 1],
                darkorange: [255, 140, 0, 1],
                darkorchid: [153, 50, 204, 1],
                darkred: [139, 0, 0, 1],
                darksalmon: [233, 150, 122, 1],
                darkseagreen: [143, 188, 143, 1],
                darkslateblue: [72, 61, 139, 1],
                darkslategray: [47, 79, 79, 1],
                darkslategrey: [47, 79, 79, 1],
                darkturquoise: [0, 206, 209, 1],
                darkviolet: [148, 0, 211, 1],
                deeppink: [255, 20, 147, 1],
                deepskyblue: [0, 191, 255, 1],
                dimgray: [105, 105, 105, 1],
                dimgrey: [105, 105, 105, 1],
                dodgerblue: [30, 144, 255, 1],
                firebrick: [178, 34, 34, 1],
                floralwhite: [255, 250, 240, 1],
                forestgreen: [34, 139, 34, 1],
                fuchsia: [255, 0, 255, 1],
                gainsboro: [220, 220, 220, 1],
                ghostwhite: [248, 248, 255, 1],
                gold: [255, 215, 0, 1],
                goldenrod: [218, 165, 32, 1],
                gray: [128, 128, 128, 1],
                green: [0, 128, 0, 1],
                greenyellow: [173, 255, 47, 1],
                grey: [128, 128, 128, 1],
                honeydew: [240, 255, 240, 1],
                hotpink: [255, 105, 180, 1],
                indianred: [205, 92, 92, 1],
                indigo: [75, 0, 130, 1],
                ivory: [255, 255, 240, 1],
                khaki: [240, 230, 140, 1],
                lavender: [230, 230, 250, 1],
                lavenderblush: [255, 240, 245, 1],
                lawngreen: [124, 252, 0, 1],
                lemonchiffon: [255, 250, 205, 1],
                lightblue: [173, 216, 230, 1],
                lightcoral: [240, 128, 128, 1],
                lightcyan: [224, 255, 255, 1],
                lightgoldenrodyellow: [250, 250, 210, 1],
                lightgray: [211, 211, 211, 1],
                lightgreen: [144, 238, 144, 1],
                lightgrey: [211, 211, 211, 1],
                lightpink: [255, 182, 193, 1],
                lightsalmon: [255, 160, 122, 1],
                lightseagreen: [32, 178, 170, 1],
                lightskyblue: [135, 206, 250, 1],
                lightslategray: [119, 136, 153, 1],
                lightslategrey: [119, 136, 153, 1],
                lightsteelblue: [176, 196, 222, 1],
                lightyellow: [255, 255, 224, 1],
                lime: [0, 255, 0, 1],
                limegreen: [50, 205, 50, 1],
                linen: [250, 240, 230, 1],
                magenta: [255, 0, 255, 1],
                maroon: [128, 0, 0, 1],
                mediumaquamarine: [102, 205, 170, 1],
                mediumblue: [0, 0, 205, 1],
                mediumorchid: [186, 85, 211, 1],
                mediumpurple: [147, 112, 219, 1],
                mediumseagreen: [60, 179, 113, 1],
                mediumslateblue: [123, 104, 238, 1],
                mediumspringgreen: [0, 250, 154, 1],
                mediumturquoise: [72, 209, 204, 1],
                mediumvioletred: [199, 21, 133, 1],
                midnightblue: [25, 25, 112, 1],
                mintcream: [245, 255, 250, 1],
                mistyrose: [255, 228, 225, 1],
                moccasin: [255, 228, 181, 1],
                navajowhite: [255, 222, 173, 1],
                navy: [0, 0, 128, 1],
                oldlace: [253, 245, 230, 1],
                olive: [128, 128, 0, 1],
                olivedrab: [107, 142, 35, 1],
                orange: [255, 165, 0, 1],
                orangered: [255, 69, 0, 1],
                orchid: [218, 112, 214, 1],
                palegoldenrod: [238, 232, 170, 1],
                palegreen: [152, 251, 152, 1],
                paleturquoise: [175, 238, 238, 1],
                palevioletred: [219, 112, 147, 1],
                papayawhip: [255, 239, 213, 1],
                peachpuff: [255, 218, 185, 1],
                peru: [205, 133, 63, 1],
                pink: [255, 192, 203, 1],
                plum: [221, 160, 221, 1],
                powderblue: [176, 224, 230, 1],
                purple: [128, 0, 128, 1],
                red: [255, 0, 0, 1],
                rosybrown: [188, 143, 143, 1],
                royalblue: [65, 105, 225, 1],
                saddlebrown: [139, 69, 19, 1],
                salmon: [250, 128, 114, 1],
                sandybrown: [244, 164, 96, 1],
                seagreen: [46, 139, 87, 1],
                seashell: [255, 245, 238, 1],
                sienna: [160, 82, 45, 1],
                silver: [192, 192, 192, 1],
                skyblue: [135, 206, 235, 1],
                slateblue: [106, 90, 205, 1],
                slategray: [112, 128, 144, 1],
                slategrey: [112, 128, 144, 1],
                snow: [255, 250, 250, 1],
                springgreen: [0, 255, 127, 1],
                steelblue: [70, 130, 180, 1],
                tan: [210, 180, 140, 1],
                teal: [0, 128, 128, 1],
                thistle: [216, 191, 216, 1],
                tomato: [255, 99, 71, 1],
                turquoise: [64, 224, 208, 1],
                violet: [238, 130, 238, 1],
                wheat: [245, 222, 179, 1],
                white: [255, 255, 255, 1],
                whitesmoke: [245, 245, 245, 1],
                yellow: [255, 255, 0, 1],
                yellowgreen: [154, 205, 50, 1]
            },
            T = new S(20),
            A = null,
            C = y,
            I = _;
        e.parse = f, e.lift = v, e.toHex = m, e.fastLerp = y, e.fastMapToColor = C, e.lerp = _, e.mapToColor = I, e.modifyHSL = x, e.modifyAlpha = b, e.stringify = w
    }, function (t, e, n) {
        function i(t) {
            this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === p ? {} : []), this.sourceFormat = t.sourceFormat || d, this.seriesLayoutBy = t.seriesLayoutBy || h, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && a(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount
        }
        var r = n(0),
            a = r.createHashMap,
            o = r.isTypedArray,
            s = n(17),
            l = s.enableClassCheck,
            u = n(38),
            c = u.SOURCE_FORMAT_ORIGINAL,
            h = u.SERIES_LAYOUT_BY_COLUMN,
            d = u.SOURCE_FORMAT_UNKNOWN,
            f = u.SOURCE_FORMAT_TYPED_ARRAY,
            p = u.SOURCE_FORMAT_KEYED_COLUMNS;
        i.seriesDataToSource = function (t) {
            return new i({
                data: t,
                sourceFormat: o(t) ? f : c,
                fromDataset: !1
            })
        }, l(i);
        var g = i;
        t.exports = g
    }, function (t, e) {
        e.SOURCE_FORMAT_ORIGINAL = "original", e.SOURCE_FORMAT_ARRAY_ROWS = "arrayRows", e.SOURCE_FORMAT_OBJECT_ROWS = "objectRows", e.SOURCE_FORMAT_KEYED_COLUMNS = "keyedColumns", e.SOURCE_FORMAT_UNKNOWN = "unknown", e.SOURCE_FORMAT_TYPED_ARRAY = "typedArray", e.SERIES_LAYOUT_BY_COLUMN = "column", e.SERIES_LAYOUT_BY_ROW = "row"
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        e.__esModule = !0;
        var r = n(242),
            a = i(r),
            o = n(248),
            s = i(o),
            l = "function" == typeof s.default && "symbol" == typeof a.default ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof s.default && t.constructor === s.default && t !== s.default.prototype ? "symbol" : typeof t
            };
        e.default = "function" == typeof s.default && "symbol" === l(a.default) ? function (t) {
            return void 0 === t ? "undefined" : l(t)
        } : function (t) {
            return t && "function" == typeof s.default && t.constructor === s.default && t !== s.default.prototype ? "symbol" : void 0 === t ? "undefined" : l(t)
        }
    }, function (t, e) {
        function n(t, e) {
            var n = t[1] || "",
                r = t[3];
            if (!r) return n;
            if (e && "function" == typeof btoa) {
                var a = i(r);
                return [n].concat(r.sources.map(function (t) {
                    return "/*# sourceURL=" + r.sourceRoot + t + " */"
                })).concat([a]).join("\n")
            }
            return [n].join("\n")
        }

        function i(t) {
            return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t)))) + " */"
        }
        t.exports = function (t) {
            var e = [];
            return e.toString = function () {
                return this.map(function (e) {
                    var i = n(e, t);
                    return e[2] ? "@media " + e[2] + "{" + i + "}" : i
                }).join("")
            }, e.i = function (t, n) {
                "string" == typeof t && (t = [
                    [null, t, ""]
                ]);
                for (var i = {}, r = 0; r < this.length; r++) {
                    var a = this[r][0];
                    "number" == typeof a && (i[a] = !0)
                }
                for (r = 0; r < t.length; r++) {
                    var o = t[r];
                    "number" == typeof o[0] && i[o[0]] || (n && !o[2] ? o[2] = n : n && (o[2] = "(" + o[2] + ") and (" + n + ")"), e.push(o))
                }
            }, e
        }
    }, function (t, e, n) {
        "use strict";

        function i(t, e, n, i) {
            g = n, m = i || {};
            var a = Object(u.a)(t, e);
            return r(a),
                function (e) {
                    for (var n = [], i = 0; i < a.length; i++) {
                        var o = a[i],
                            s = h[o.id];
                        s.refs--, n.push(s)
                    }
                    e ? (a = Object(u.a)(t, e), r(a)) : a = [];
                    for (var i = 0; i < n.length; i++) {
                        var s = n[i];
                        if (0 === s.refs) {
                            for (var l = 0; l < s.parts.length; l++) s.parts[l]();
                            delete h[s.id]
                        }
                    }
                }
        }

        function r(t) {
            for (var e = 0; e < t.length; e++) {
                var n = t[e],
                    i = h[n.id];
                if (i) {
                    i.refs++;
                    for (var r = 0; r < i.parts.length; r++) i.parts[r](n.parts[r]);
                    for (; r < n.parts.length; r++) i.parts.push(o(n.parts[r]));
                    i.parts.length > n.parts.length && (i.parts.length = n.parts.length)
                } else {
                    for (var a = [], r = 0; r < n.parts.length; r++) a.push(o(n.parts[r]));
                    h[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: a
                    }
                }
            }
        }

        function a() {
            var t = document.createElement("style");
            return t.type = "text/css", d.appendChild(t), t
        }

        function o(t) {
            var e, n, i = document.querySelector("style[" + y + '~="' + t.id + '"]');
            if (i) {
                if (g) return v;
                i.parentNode.removeChild(i)
            }
            if (_) {
                var r = p++;
                i = f || (f = a()), e = s.bind(null, i, r, !1), n = s.bind(null, i, r, !0)
            } else i = a(), e = l.bind(null, i), n = function () {
                i.parentNode.removeChild(i)
            };
            return e(t),
                function (i) {
                    if (i) {
                        if (i.css === t.css && i.media === t.media && i.sourceMap === t.sourceMap) return;
                        e(t = i)
                    } else n()
                }
        }

        function s(t, e, n, i) {
            var r = n ? "" : i.css;
            if (t.styleSheet) t.styleSheet.cssText = x(e, r);
            else {
                var a = document.createTextNode(r),
                    o = t.childNodes;
                o[e] && t.removeChild(o[e]), o.length ? t.insertBefore(a, o[e]) : t.appendChild(a)
            }
        }

        function l(t, e) {
            var n = e.css,
                i = e.media,
                r = e.sourceMap;
            if (i && t.setAttribute("media", i), m.ssrId && t.setAttribute(y, e.id), r && (n += "\n/*# sourceURL=" + r.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */"), t.styleSheet) t.styleSheet.cssText = n;
            else {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(n))
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = i;
        var u = n(57),
            c = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !c) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var h = {},
            d = c && (document.head || document.getElementsByTagName("head")[0]),
            f = null,
            p = 0,
            g = !1,
            v = function () {},
            m = null,
            y = "data-vue-ssr-id",
            _ = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase()),
            x = function () {
                var t = [];
                return function (e, n) {
                    return t[e] = n, t.filter(Boolean).join("\n")
                }
            }()
    }, function (t, e) {
        t.exports = !0
    }, function (t, e) {
        t.exports = function (t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        }
    }, function (t, e) {
        var n = 0,
            i = Math.random();
        t.exports = function (t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + i).toString(36))
        }
    }, function (t, e) {
        var n = 1;
        "undefined" != typeof window && (n = Math.max(window.devicePixelRatio || 1, 1));
        var i = n;
        e.debugMode = 0, e.devicePixelRatio = i
    }, function (t, e) {
        var n = {
            NONE: 0,
            STYLE_BIND: 1,
            PLAIN_TEXT: 2
        };
        e.ContextCachedBy = n, e.WILL_BE_RESTORED = 9
    }, function (t, e, n) {
        function i(t) {
            t = t || {}, o.call(this, t);
            for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
            this.style = new a(t.style, this), this._rect = null, this.__clipPaths = null
        }
        var r = n(0),
            a = n(69),
            o = n(103),
            s = n(192);
        i.prototype = {
            constructor: i,
            type: "displayable",
            __dirty: !0,
            invisible: !1,
            z: 0,
            z2: 0,
            zlevel: 0,
            draggable: !1,
            dragging: !1,
            silent: !1,
            culling: !1,
            cursor: "pointer",
            rectHover: !1,
            progressive: !1,
            incremental: !1,
            globalScaleRatio: 1,
            beforeBrush: function (t) {},
            afterBrush: function (t) {},
            brush: function (t, e) {},
            getBoundingRect: function () {},
            contain: function (t, e) {
                return this.rectContain(t, e)
            },
            traverse: function (t, e) {
                t.call(e, this)
            },
            rectContain: function (t, e) {
                var n = this.transformCoordToLocal(t, e);
                return this.getBoundingRect().contain(n[0], n[1])
            },
            dirty: function () {
                this.__dirty = this.__dirtyText = !0, this._rect = null, this.__zr && this.__zr.refresh()
            },
            animateStyle: function (t) {
                return this.animate("style", t)
            },
            attrKV: function (t, e) {
                "style" !== t ? o.prototype.attrKV.call(this, t, e) : this.style.set(e)
            },
            setStyle: function (t, e) {
                return this.style.set(t, e), this.dirty(!1), this
            },
            useStyle: function (t) {
                return this.style = new a(t, this), this.dirty(!1), this
            },
            calculateTextPosition: null
        }, r.inherits(i, o), r.mixin(i, s);
        var l = i;
        t.exports = l
    }, function (t, e, n) {
        function i(t) {
            for (var e = 0; e < t.length; e++) t[e][1] || (t[e][1] = t[e][0]);
            return function (e, n, i) {
                for (var a = {}, o = 0; o < t.length; o++) {
                    var s = t[o][1];
                    if (!(n && r.indexOf(n, s) >= 0 || i && r.indexOf(i, s) < 0)) {
                        var l = e.getShallow(s);
                        null != l && (a[t[o][0]] = l)
                    }
                }
                return a
            }
        }
        var r = n(0);
        t.exports = i
    }, function (t, e, n) {
        var i = n(26),
            r = n(7),
            a = n(115),
            o = n(9),
            s = n(45),
            l = s.devicePixelRatio,
            u = {
                M: 1,
                L: 2,
                C: 3,
                Q: 4,
                A: 5,
                Z: 6,
                R: 7
            },
            c = [],
            h = [],
            d = [],
            f = [],
            p = Math.min,
            g = Math.max,
            v = Math.cos,
            m = Math.sin,
            y = Math.sqrt,
            _ = Math.abs,
            x = "undefined" != typeof Float32Array,
            b = function (t) {
                this._saveData = !t, this._saveData && (this.data = []), this._ctx = null
            };
        b.prototype = {
            constructor: b,
            _xi: 0,
            _yi: 0,
            _x0: 0,
            _y0: 0,
            _ux: 0,
            _uy: 0,
            _len: 0,
            _lineDash: null,
            _dashOffset: 0,
            _dashIdx: 0,
            _dashSum: 0,
            setScale: function (t, e, n) {
                n = n || 0, this._ux = _(n / l / t) || 0, this._uy = _(n / l / e) || 0
            },
            getContext: function () {
                return this._ctx
            },
            beginPath: function (t) {
                return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
            },
            moveTo: function (t, e) {
                return this.addData(u.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this
            },
            lineTo: function (t, e) {
                var n = _(t - this._xi) > this._ux || _(e - this._yi) > this._uy || this._len < 5;
                return this.addData(u.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), n && (this._xi = t, this._yi = e), this
            },
            bezierCurveTo: function (t, e, n, i, r, a) {
                return this.addData(u.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), this._xi = r, this._yi = a, this
            },
            quadraticCurveTo: function (t, e, n, i) {
                return this.addData(u.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), this._xi = n, this._yi = i, this
            },
            arc: function (t, e, n, i, r, a) {
                return this.addData(u.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), this._xi = v(r) * n + t, this._yi = m(r) * n + e, this
            },
            arcTo: function (t, e, n, i, r) {
                return this._ctx && this._ctx.arcTo(t, e, n, i, r), this
            },
            rect: function (t, e, n, i) {
                return this._ctx && this._ctx.rect(t, e, n, i), this.addData(u.R, t, e, n, i), this
            },
            closePath: function () {
                this.addData(u.Z);
                var t = this._ctx,
                    e = this._x0,
                    n = this._y0;
                return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, this._yi = n, this
            },
            fill: function (t) {
                t && t.fill(), this.toStatic()
            },
            stroke: function (t) {
                t && t.stroke(), this.toStatic()
            },
            setLineDash: function (t) {
                if (t instanceof Array) {
                    this._lineDash = t, this._dashIdx = 0;
                    for (var e = 0, n = 0; n < t.length; n++) e += t[n];
                    this._dashSum = e
                }
                return this
            },
            setLineDashOffset: function (t) {
                return this._dashOffset = t, this
            },
            len: function () {
                return this._len
            },
            setData: function (t) {
                var e = t.length;
                this.data && this.data.length === e || !x || (this.data = new Float32Array(e));
                for (var n = 0; n < e; n++) this.data[n] = t[n];
                this._len = e
            },
            appendPath: function (t) {
                t instanceof Array || (t = [t]);
                for (var e = t.length, n = 0, i = this._len, r = 0; r < e; r++) n += t[r].len();
                x && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
                for (var r = 0; r < e; r++)
                    for (var a = t[r].data, o = 0; o < a.length; o++) this.data[i++] = a[o];
                this._len = i
            },
            addData: function (t) {
                if (this._saveData) {
                    var e = this.data;
                    this._len + arguments.length > e.length && (this._expandData(), e = this.data);
                    for (var n = 0; n < arguments.length; n++) e[this._len++] = arguments[n];
                    this._prevCmd = t
                }
            },
            _expandData: function () {
                if (!(this.data instanceof Array)) {
                    for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
                    this.data = t
                }
            },
            _needsDash: function () {
                return this._lineDash
            },
            _dashedLineTo: function (t, e) {
                var n, i, r = this._dashSum,
                    a = this._dashOffset,
                    o = this._lineDash,
                    s = this._ctx,
                    l = this._xi,
                    u = this._yi,
                    c = t - l,
                    h = e - u,
                    d = y(c * c + h * h),
                    f = l,
                    v = u,
                    m = o.length;
                for (c /= d, h /= d, a < 0 && (a = r + a), a %= r, f -= a * c, v -= a * h; c > 0 && f <= t || c < 0 && f >= t || 0 === c && (h > 0 && v <= e || h < 0 && v >= e);) i = this._dashIdx, n = o[i], f += c * n, v += h * n, this._dashIdx = (i + 1) % m, c > 0 && f < l || c < 0 && f > l || h > 0 && v < u || h < 0 && v > u || s[i % 2 ? "moveTo" : "lineTo"](c >= 0 ? p(f, t) : g(f, t), h >= 0 ? p(v, e) : g(v, e));
                c = f - t, h = v - e, this._dashOffset = -y(c * c + h * h)
            },
            _dashedBezierTo: function (t, e, n, r, a, o) {
                var s, l, u, c, h, d = this._dashSum,
                    f = this._dashOffset,
                    p = this._lineDash,
                    g = this._ctx,
                    v = this._xi,
                    m = this._yi,
                    _ = i.cubicAt,
                    x = 0,
                    b = this._dashIdx,
                    w = p.length,
                    S = 0;
                for (f < 0 && (f = d + f), f %= d, s = 0; s < 1; s += .1) l = _(v, t, n, a, s + .1) - _(v, t, n, a, s), u = _(m, e, r, o, s + .1) - _(m, e, r, o, s), x += y(l * l + u * u);
                for (; b < w && !((S += p[b]) > f); b++);
                for (s = (S - f) / x; s <= 1;) c = _(v, t, n, a, s), h = _(m, e, r, o, s), b % 2 ? g.moveTo(c, h) : g.lineTo(c, h), s += p[b] / x, b = (b + 1) % w;
                b % 2 != 0 && g.lineTo(a, o), l = a - c, u = o - h, this._dashOffset = -y(l * l + u * u)
            },
            _dashedQuadraticTo: function (t, e, n, i) {
                var r = n,
                    a = i;
                n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, n, i, r, a)
            },
            toStatic: function () {
                var t = this.data;
                t instanceof Array && (t.length = this._len, x && (this.data = new Float32Array(t)))
            },
            getBoundingRect: function () {
                c[0] = c[1] = d[0] = d[1] = Number.MAX_VALUE, h[0] = h[1] = f[0] = f[1] = -Number.MAX_VALUE;
                for (var t = this.data, e = 0, n = 0, i = 0, s = 0, l = 0; l < t.length;) {
                    var p = t[l++];
                    switch (1 === l && (e = t[l], n = t[l + 1], i = e, s = n), p) {
                        case u.M:
                            i = t[l++], s = t[l++], e = i, n = s, d[0] = i, d[1] = s, f[0] = i, f[1] = s;
                            break;
                        case u.L:
                            a.fromLine(e, n, t[l], t[l + 1], d, f), e = t[l++], n = t[l++];
                            break;
                        case u.C:
                            a.fromCubic(e, n, t[l++], t[l++], t[l++], t[l++], t[l], t[l + 1], d, f), e = t[l++], n = t[l++];
                            break;
                        case u.Q:
                            a.fromQuadratic(e, n, t[l++], t[l++], t[l], t[l + 1], d, f), e = t[l++], n = t[l++];
                            break;
                        case u.A:
                            var g = t[l++],
                                y = t[l++],
                                _ = t[l++],
                                x = t[l++],
                                b = t[l++],
                                w = t[l++] + b;
                            l += 1;
                            var S = 1 - t[l++];
                            1 === l && (i = v(b) * _ + g, s = m(b) * x + y), a.fromArc(g, y, _, x, b, w, S, d, f), e = v(w) * _ + g, n = m(w) * x + y;
                            break;
                        case u.R:
                            i = e = t[l++], s = n = t[l++];
                            var M = t[l++],
                                T = t[l++];
                            a.fromLine(i, s, i + M, s + T, d, f);
                            break;
                        case u.Z:
                            e = i, n = s
                    }
                    r.min(c, c, d), r.max(h, h, f)
                }
                return 0 === l && (c[0] = c[1] = h[0] = h[1] = 0), new o(c[0], c[1], h[0] - c[0], h[1] - c[1])
            },
            rebuildPath: function (t) {
                for (var e, n, i, r, a, o, s = this.data, l = this._ux, c = this._uy, h = this._len, d = 0; d < h;) {
                    var f = s[d++];
                    switch (1 === d && (i = s[d], r = s[d + 1], e = i, n = r), f) {
                        case u.M:
                            e = i = s[d++], n = r = s[d++], t.moveTo(i, r);
                            break;
                        case u.L:
                            a = s[d++], o = s[d++], (_(a - i) > l || _(o - r) > c || d === h - 1) && (t.lineTo(a, o), i = a, r = o);
                            break;
                        case u.C:
                            t.bezierCurveTo(s[d++], s[d++], s[d++], s[d++], s[d++], s[d++]), i = s[d - 2], r = s[d - 1];
                            break;
                        case u.Q:
                            t.quadraticCurveTo(s[d++], s[d++], s[d++], s[d++]), i = s[d - 2], r = s[d - 1];
                            break;
                        case u.A:
                            var p = s[d++],
                                g = s[d++],
                                y = s[d++],
                                x = s[d++],
                                b = s[d++],
                                w = s[d++],
                                S = s[d++],
                                M = s[d++],
                                T = y > x ? y : x,
                                A = y > x ? 1 : y / x,
                                C = y > x ? x / y : 1,
                                I = Math.abs(y - x) > .001,
                                D = b + w;
                            I ? (t.translate(p, g), t.rotate(S), t.scale(A, C), t.arc(0, 0, T, b, D, 1 - M), t.scale(1 / A, 1 / C), t.rotate(-S), t.translate(-p, -g)) : t.arc(p, g, T, b, D, 1 - M), 1 === d && (e = v(b) * y + p, n = m(b) * x + g), i = v(D) * y + p, r = m(D) * x + g;
                            break;
                        case u.R:
                            e = i = s[d], n = r = s[d + 1], t.rect(s[d++], s[d++], s[d++], s[d++]);
                            break;
                        case u.Z:
                            t.closePath(), i = e, r = n
                    }
                }
            }
        }, b.CMD = u;
        var w = b;
        t.exports = w
    }, function (t, e, n) {
        function i(t) {
            return [t || "", u++, Math.random().toFixed(5)].join("_")
        }

        function r(t) {
            var e = {};
            return t.registerSubTypeDefaulter = function (t, n) {
                t = l(t), e[t.main] = n
            }, t.determineSubType = function (n, i) {
                var r = i.type;
                if (!r) {
                    var a = l(n).main;
                    t.hasSubTypes(n) && e[a] && (r = e[a](i))
                }
                return r
            }, t
        }

        function a(t, e) {
            function n(t) {
                var n = {},
                    a = [];
                return o.each(t, function (s) {
                    var l = i(n, s),
                        u = l.originalDeps = e(s),
                        c = r(u, t);
                    l.entryCount = c.length, 0 === l.entryCount && a.push(s), o.each(c, function (t) {
                        o.indexOf(l.predecessor, t) < 0 && l.predecessor.push(t);
                        var e = i(n, t);
                        o.indexOf(e.successor, t) < 0 && e.successor.push(s)
                    })
                }), {
                    graph: n,
                    noEntryList: a
                }
            }

            function i(t, e) {
                return t[e] || (t[e] = {
                    predecessor: [],
                    successor: []
                }), t[e]
            }

            function r(t, e) {
                var n = [];
                return o.each(t, function (t) {
                    o.indexOf(e, t) >= 0 && n.push(t)
                }), n
            }
            t.topologicalTravel = function (t, e, i, r) {
                function a(t) {
                    0 === --u[t].entryCount && c.push(t)
                }

                function s(t) {
                    h[t] = !0, a(t)
                }
                if (t.length) {
                    var l = n(e),
                        u = l.graph,
                        c = l.noEntryList,
                        h = {};
                    for (o.each(t, function (t) {
                            h[t] = !0
                        }); c.length;) {
                        var d = c.pop(),
                            f = u[d],
                            p = !!h[d];
                        p && (i.call(r, d, f.originalDeps.slice()), delete h[d]), o.each(f.successor, p ? s : a)
                    }
                    o.each(h, function () {
                        throw new Error("Circle dependency may exists")
                    })
                }
            }
        }
        var o = n(0),
            s = n(17),
            l = s.parseClassType,
            u = 0;
        e.getUID = i, e.enableSubTypeDefaulter = r, e.enableTopologicalTravel = a
    }, function (t, e, n) {
        function i(t) {
            var e = t.option.source,
                n = N;
            if (I(e)) n = B;
            else if (T(e)) {
                0 === e.length && (n = E);
                for (var i = 0, r = e.length; i < r; i++) {
                    var a = e[i];
                    if (null != a) {
                        if (T(a)) {
                            n = E;
                            break
                        }
                        if (C(a)) {
                            n = R;
                            break
                        }
                    }
                }
            } else if (C(e)) {
                for (var o in e)
                    if (e.hasOwnProperty(o) && D(e[o])) {
                        n = z;
                        break
                    }
            } else if (null != e) throw new Error("Invalid data");
            V(t).sourceFormat = n
        }

        function r(t) {
            return V(t).source
        }

        function a(t) {
            V(t).datasetMap = w()
        }

        function o(t) {
            var e = t.option,
                n = e.data,
                i = I(n) ? B : L,
                r = !1,
                a = e.seriesLayoutBy,
                o = e.sourceHeader,
                l = e.dimensions,
                u = d(t);
            if (u) {
                var c = u.option;
                n = c.source, i = V(u).sourceFormat, r = !0, a = a || c.seriesLayoutBy, null == o && (o = c.sourceHeader), l = l || c.dimensions
            }
            var f = s(n, i, a, o, l),
                p = e.encode;
            !p && u && (p = h(t, u, n, i, a, f)), V(t).source = new O({
                data: n,
                fromDataset: r,
                seriesLayoutBy: a,
                sourceFormat: i,
                dimensionsDefine: f.dimensionsDefine,
                startIndex: f.startIndex,
                dimensionsDetectCount: f.dimensionsDetectCount,
                encodeDefine: p
            })
        }

        function s(t, e, n, i, r) {
            if (!t) return {
                dimensionsDefine: l(r)
            };
            var a, o, s;
            if (e === E) "auto" === i || null == i ? u(function (t) {
                null != t && "-" !== t && (A(t) ? null == o && (o = 1) : o = 0)
            }, n, t, 10) : o = i ? 1 : 0, r || 1 !== o || (r = [], u(function (t, e) {
                r[e] = null != t ? t : ""
            }, n, t)), a = r ? r.length : n === F ? t.length : t[0] ? t[0].length : null;
            else if (e === R) r || (r = c(t), s = !0);
            else if (e === z) r || (r = [], s = !0, S(t, function (t, e) {
                r.push(e)
            }));
            else if (e === L) {
                var h = y(t[0]);
                a = T(h) && h.length || 1
            }
            var d;
            return s && S(r, function (t, e) {
                "name" === (C(t) ? t.name : t) && (d = e)
            }), {
                startIndex: o,
                dimensionsDefine: l(r),
                dimensionsDetectCount: a,
                potentialNameDimIndex: d
            }
        }

        function l(t) {
            if (t) {
                var e = w();
                return M(t, function (t, n) {
                    if (t = k({}, C(t) ? t : {
                            name: t
                        }), null == t.name) return t;
                    t.name += "", null == t.displayName && (t.displayName = t.name);
                    var i = e.get(t.name);
                    return i ? t.name += "-" + i.count++ : e.set(t.name, {
                        count: 1
                    }), t
                })
            }
        }

        function u(t, e, n, i) {
            if (null == i && (i = 1 / 0), e === F)
                for (var r = 0; r < n.length && r < i; r++) t(n[r] ? n[r][0] : null, r);
            else
                for (var a = n[0] || [], r = 0; r < a.length && r < i; r++) t(a[r], r)
        }

        function c(t) {
            for (var e, n = 0; n < t.length && !(e = t[n++]););
            if (e) {
                var i = [];
                return S(e, function (t, e) {
                    i.push(e)
                }), i
            }
        }

        function h(t, e, n, i, r, a) {
            var o = x(t),
                s = {},
                l = [],
                u = [],
                c = t.subType,
                h = w(["pie", "map", "funnel"]),
                d = w(["line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot"]);
            if (o && null != d.get(c)) {
                var f = t.ecModel,
                    g = V(f).datasetMap,
                    v = e.uid + "_" + r,
                    m = g.get(v) || g.set(v, {
                        categoryWayDim: 1,
                        valueWayDim: 0
                    });
                S(o.coordSysDims, function (t) {
                    if (null == o.firstCategoryDimIndex) {
                        var e = m.valueWayDim++;
                        s[t] = e, u.push(e)
                    } else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0);
                    else {
                        var e = m.categoryWayDim++;
                        s[t] = e, u.push(e)
                    }
                })
            } else if (null != h.get(c)) {
                for (var y, _ = 0; _ < 5 && null == y; _++) p(n, i, r, a.dimensionsDefine, a.startIndex, _) || (y = _);
                if (null != y) {
                    s.value = y;
                    var b = a.potentialNameDimIndex || Math.max(y - 1, 0);
                    u.push(b), l.push(b)
                }
            }
            return l.length && (s.itemName = l), u.length && (s.seriesName = u), s
        }

        function d(t) {
            var e = t.option;
            if (!e.data) return t.ecModel.getComponent("dataset", e.datasetIndex || 0)
        }

        function f(t, e) {
            return p(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e)
        }

        function p(t, e, n, i, r, a) {
            function o(t) {
                return (null == t || !isFinite(t) || "" === t) && (!(!A(t) || "-" === t) || void 0)
            }
            var s;
            if (I(t)) return !1;
            var l;
            if (i && (l = i[a], l = C(l) ? l.name : l), e === E)
                if (n === F) {
                    for (var u = t[a], c = 0; c < (u || []).length && c < 5; c++)
                        if (null != (s = o(u[r + c]))) return s
                } else
                    for (var c = 0; c < t.length && c < 5; c++) {
                        var h = t[r + c];
                        if (h && null != (s = o(h[a]))) return s
                    } else if (e === R) {
                        if (!l) return;
                        for (var c = 0; c < t.length && c < 5; c++) {
                            var d = t[c];
                            if (d && null != (s = o(d[l]))) return s
                        }
                    } else if (e === z) {
                if (!l) return;
                var u = t[l];
                if (!u || I(u)) return !1;
                for (var c = 0; c < u.length && c < 5; c++)
                    if (null != (s = o(u[c]))) return s
            } else if (e === L)
                for (var c = 0; c < t.length && c < 5; c++) {
                    var d = t[c],
                        f = y(d);
                    if (!T(f)) return !1;
                    if (null != (s = o(f[a]))) return s
                }
            return !1
        }
        var g = n(4),
            v = (g.__DEV__, n(1)),
            m = v.makeInner,
            y = v.getDataItemValue,
            _ = n(127),
            x = _.getCoordSysDefineBySeries,
            b = n(0),
            w = b.createHashMap,
            S = b.each,
            M = b.map,
            T = b.isArray,
            A = b.isString,
            C = b.isObject,
            I = b.isTypedArray,
            D = b.isArrayLike,
            k = b.extend,
            O = (b.assert, n(37)),
            P = n(38),
            L = P.SOURCE_FORMAT_ORIGINAL,
            E = P.SOURCE_FORMAT_ARRAY_ROWS,
            R = P.SOURCE_FORMAT_OBJECT_ROWS,
            z = P.SOURCE_FORMAT_KEYED_COLUMNS,
            N = P.SOURCE_FORMAT_UNKNOWN,
            B = P.SOURCE_FORMAT_TYPED_ARRAY,
            F = P.SERIES_LAYOUT_BY_ROW,
            V = m();
        e.detectSourceFormat = i, e.getSource = r, e.resetSourceDefaulter = a, e.prepareSource = o, e.guessOrdinal = f
    }, function (t, e) {
        function n(t, e, n) {
            function i() {
                c = (new Date).getTime(), h = null, t.apply(o, s || [])
            }
            var r, a, o, s, l, u = 0,
                c = 0,
                h = null;
            e = e || 0;
            var d = function () {
                r = (new Date).getTime(), o = this, s = arguments;
                var t = l || e,
                    d = l || n;
                l = null, a = r - (d ? u : c) - t, clearTimeout(h), d ? h = setTimeout(i, t) : a >= 0 ? i() : h = setTimeout(i, -a), u = r
            };
            return d.clear = function () {
                h && (clearTimeout(h), h = null)
            }, d.debounceNextCall = function (t) {
                l = t
            }, d
        }

        function i(t, e, i, r) {
            var l = t[e];
            if (l) {
                var u = l[a] || l,
                    c = l[s];
                if (l[o] !== i || c !== r) {
                    if (null == i || !r) return t[e] = u;
                    l = t[e] = n(u, i, "debounce" === r), l[a] = u, l[s] = r, l[o] = i
                }
                return l
            }
        }

        function r(t, e) {
            var n = t[e];
            n && n[a] && (t[e] = n[a])
        }
        var a = "\0__throttleOriginMethod",
            o = "\0__throttleRate",
            s = "\0__throttleType";
        e.throttle = n, e.createOrUpdate = i, e.clear = r
    }, function (t, e, n) {
        function i(t) {
            this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this, arguments)
        }
        var r = n(17);
        i.prototype.parse = function (t) {
            return t
        }, i.prototype.getSetting = function (t) {
            return this._setting[t]
        }, i.prototype.contain = function (t) {
            var e = this._extent;
            return t >= e[0] && t <= e[1]
        }, i.prototype.normalize = function (t) {
            var e = this._extent;
            return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0])
        }, i.prototype.scale = function (t) {
            var e = this._extent;
            return t * (e[1] - e[0]) + e[0]
        }, i.prototype.unionExtent = function (t) {
            var e = this._extent;
            t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1])
        }, i.prototype.unionExtentFromData = function (t, e) {
            this.unionExtent(t.getApproximateExtent(e))
        }, i.prototype.getExtent = function () {
            return this._extent.slice()
        }, i.prototype.setExtent = function (t, e) {
            var n = this._extent;
            isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e)
        }, i.prototype.isBlank = function () {
            return this._isBlank
        }, i.prototype.setBlank = function (t) {
            this._isBlank = t
        }, i.prototype.getLabel = null, r.enableClassExtend(i), r.enableClassManagement(i, {
            registerWhenExtend: !0
        });
        var a = i;
        t.exports = a
    }, function (t, e, n) {
        function i(t, e) {
            if ("image" !== this.type) {
                var n = this.style,
                    i = this.shape;
                i && "line" === i.symbolType ? n.stroke = t : this.__isEmptyBrush ? (n.stroke = t, n.fill = e || "#fff") : (n.fill && (n.fill = t), n.stroke && (n.stroke = t)), this.dirty(!1)
            }
        }

        function r(t, e, n, r, a, l, u) {
            var c = 0 === t.indexOf("empty");
            c && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
            var h;
            return h = 0 === t.indexOf("image://") ? o.makeImage(t.slice(8), new s(e, n, r, a), u ? "center" : "cover") : 0 === t.indexOf("path://") ? o.makePath(t.slice(7), {}, new s(e, n, r, a), u ? "center" : "cover") : new m({
                shape: {
                    symbolType: t,
                    x: e,
                    y: n,
                    width: r,
                    height: a
                }
            }), h.__isEmptyBrush = c, h.setColor = i, h.setColor(l), h
        }
        var a = n(0),
            o = n(2),
            s = n(9),
            l = n(16),
            u = l.calculateTextPosition,
            c = o.extendShape({
                type: "triangle",
                shape: {
                    cx: 0,
                    cy: 0,
                    width: 0,
                    height: 0
                },
                buildPath: function (t, e) {
                    var n = e.cx,
                        i = e.cy,
                        r = e.width / 2,
                        a = e.height / 2;
                    t.moveTo(n, i - a), t.lineTo(n + r, i + a), t.lineTo(n - r, i + a), t.closePath()
                }
            }),
            h = o.extendShape({
                type: "diamond",
                shape: {
                    cx: 0,
                    cy: 0,
                    width: 0,
                    height: 0
                },
                buildPath: function (t, e) {
                    var n = e.cx,
                        i = e.cy,
                        r = e.width / 2,
                        a = e.height / 2;
                    t.moveTo(n, i - a), t.lineTo(n + r, i), t.lineTo(n, i + a), t.lineTo(n - r, i), t.closePath()
                }
            }),
            d = o.extendShape({
                type: "pin",
                shape: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                buildPath: function (t, e) {
                    var n = e.x,
                        i = e.y,
                        r = e.width / 5 * 3,
                        a = Math.max(r, e.height),
                        o = r / 2,
                        s = o * o / (a - o),
                        l = i - a + o + s,
                        u = Math.asin(s / o),
                        c = Math.cos(u) * o,
                        h = Math.sin(u),
                        d = Math.cos(u),
                        f = .6 * o,
                        p = .7 * o;
                    t.moveTo(n - c, l + s), t.arc(n, l, o, Math.PI - u, 2 * Math.PI + u), t.bezierCurveTo(n + c - h * f, l + s + d * f, n, i - p, n, i), t.bezierCurveTo(n, i - p, n - c + h * f, l + s + d * f, n - c, l + s), t.closePath()
                }
            }),
            f = o.extendShape({
                type: "arrow",
                shape: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                buildPath: function (t, e) {
                    var n = e.height,
                        i = e.width,
                        r = e.x,
                        a = e.y,
                        o = i / 3 * 2;
                    t.moveTo(r, a), t.lineTo(r + o, a + n), t.lineTo(r, a + n / 4 * 3), t.lineTo(r - o, a + n), t.lineTo(r, a), t.closePath()
                }
            }),
            p = {
                line: o.Line,
                rect: o.Rect,
                roundRect: o.Rect,
                square: o.Rect,
                circle: o.Circle,
                diamond: h,
                pin: d,
                arrow: f,
                triangle: c
            },
            g = {
                line: function (t, e, n, i, r) {
                    r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2
                },
                rect: function (t, e, n, i, r) {
                    r.x = t, r.y = e, r.width = n, r.height = i
                },
                roundRect: function (t, e, n, i, r) {
                    r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4
                },
                square: function (t, e, n, i, r) {
                    var a = Math.min(n, i);
                    r.x = t, r.y = e, r.width = a, r.height = a
                },
                circle: function (t, e, n, i, r) {
                    r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2
                },
                diamond: function (t, e, n, i, r) {
                    r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i
                },
                pin: function (t, e, n, i, r) {
                    r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i
                },
                arrow: function (t, e, n, i, r) {
                    r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i
                },
                triangle: function (t, e, n, i, r) {
                    r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i
                }
            },
            v = {};
        a.each(p, function (t, e) {
            v[e] = new t
        });
        var m = o.extendShape({
            type: "symbol",
            shape: {
                symbolType: "",
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            calculateTextPosition: function (t, e, n) {
                var i = u(t, e, n),
                    r = this.shape;
                return r && "pin" === r.symbolType && "inside" === e.textPosition && (i.y = n.y + .4 * n.height), i
            },
            buildPath: function (t, e, n) {
                var i = e.symbolType;
                if ("none" !== i) {
                    var r = v[i];
                    r || (i = "rect", r = v[i]), g[i](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, n)
                }
            }
        });
        e.createSymbol = r
    }, function (t, e, n) {
        "use strict";

        function i(t, e, n, i, r, a, o, s) {
            t = t || {};
            var l = typeof t.default;
            "object" !== l && "function" !== l || (t = t.default);
            var u = "function" == typeof t ? t.options : t;
            e && (u.render = e, u.staticRenderFns = n, u._compiled = !0), i && (u.functional = !0), a && (u._scopeId = a);
            var c;
            if (o ? (c = function (t) {
                    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), r && r.call(this, t), t && t._registeredComponents && t._registeredComponents.add(o)
                }, u._ssrRegister = c) : r && (c = s ? function () {
                    r.call(this, this.$root.$options.shadowRoot)
                } : r), c)
                if (u.functional) {
                    u._injectStyles = c;
                    var h = u.render;
                    u.render = function (t, e) {
                        return c.call(e), h(t, e)
                    }
                } else {
                    var d = u.beforeCreate;
                    u.beforeCreate = d ? [].concat(d, c) : [c]
                } return {
                exports: t,
                options: u
            }
        }
        e.a = i
    }, function (t, e, n) {
        function i(t, e) {
            var n = {
                axesInfo: {},
                seriesInvolved: !1,
                coordSysAxesInfo: {},
                coordSysMap: {}
            };
            return r(n, t, e), n.seriesInvolved && o(n, t), n
        }

        function r(t, e, n) {
            var i = e.getComponent("tooltip"),
                r = e.getComponent("axisPointer"),
                o = r.get("link", !0) || [],
                l = [];
            v(n.getCoordinateSystems(), function (n) {
                function u(i, u, c) {
                    var p = c.model.getModel("axisPointer", r),
                        v = p.get("show");
                    if (v && ("auto" !== v || i || d(p))) {
                        null == u && (u = p.get("triggerTooltip")), p = i ? a(c, g, r, e, i, u) : p;
                        var m = p.get("snap"),
                            y = f(c.model),
                            _ = u || m || "category" === c.type,
                            x = t.axesInfo[y] = {
                                key: y,
                                axis: c,
                                coordSys: n,
                                axisPointerModel: p,
                                triggerTooltip: u,
                                involveSeries: _,
                                snap: m,
                                useHandle: d(p),
                                seriesModels: []
                            };
                        h[y] = x, t.seriesInvolved |= _;
                        var b = s(o, c);
                        if (null != b) {
                            var w = l[b] || (l[b] = {
                                axesInfo: {}
                            });
                            w.axesInfo[y] = x, w.mapper = o[b].mapper, x.linkGroup = w
                        }
                    }
                }
                if (n.axisPointerEnabled) {
                    var c = f(n.model),
                        h = t.coordSysAxesInfo[c] = {};
                    t.coordSysMap[c] = n;
                    var p = n.model,
                        g = p.getModel("tooltip", i);
                    if (v(n.getAxes(), m(u, !1, null)), n.getTooltipAxes && i && g.get("show")) {
                        var y = "axis" === g.get("trigger"),
                            _ = "cross" === g.get("axisPointer.type"),
                            x = n.getTooltipAxes(g.get("axisPointer.axis"));
                        (y || _) && v(x.baseAxes, m(u, !_ || "cross", y)), _ && v(x.otherAxes, m(u, "cross", !1))
                    }
                }
            })
        }

        function a(t, e, n, i, r, a) {
            var o = e.getModel("axisPointer"),
                s = {};
            v(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], function (t) {
                s[t] = p.clone(o.get(t))
            }), s.snap = "category" !== t.type && !!a, "cross" === o.get("type") && (s.type = "line");
            var l = s.label || (s.label = {});
            if (null == l.show && (l.show = !1), "cross" === r) {
                var u = o.get("label.show");
                if (l.show = null == u || u, !a) {
                    var c = s.lineStyle = o.get("crossStyle");
                    c && p.defaults(l, c.textStyle)
                }
            }
            return t.model.getModel("axisPointer", new g(s, n, i))
        }

        function o(t, e) {
            e.eachSeries(function (e) {
                var n = e.coordinateSystem,
                    i = e.get("tooltip.trigger", !0),
                    r = e.get("tooltip.show", !0);
                n && "none" !== i && !1 !== i && "item" !== i && !1 !== r && !1 !== e.get("axisPointer.show", !0) && v(t.coordSysAxesInfo[f(n.model)], function (t) {
                    var i = t.axis;
                    n.getAxis(i.dim) === i && (t.seriesModels.push(e), null == t.seriesDataCount && (t.seriesDataCount = 0), t.seriesDataCount += e.getData().count())
                })
            }, this)
        }

        function s(t, e) {
            for (var n = e.model, i = e.dim, r = 0; r < t.length; r++) {
                var a = t[r] || {};
                if (l(a[i + "AxisId"], n.id) || l(a[i + "AxisIndex"], n.componentIndex) || l(a[i + "AxisName"], n.name)) return r
            }
        }

        function l(t, e) {
            return "all" === t || p.isArray(t) && p.indexOf(t, e) >= 0 || t === e
        }

        function u(t) {
            var e = c(t);
            if (e) {
                var n = e.axisPointerModel,
                    i = e.axis.scale,
                    r = n.option,
                    a = n.get("status"),
                    o = n.get("value");
                null != o && (o = i.parse(o));
                var s = d(n);
                null == a && (r.status = s ? "show" : "hide");
                var l = i.getExtent().slice();
                l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), r.value = o, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show")
            }
        }

        function c(t) {
            var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
            return e && e.axesInfo[f(t)]
        }

        function h(t) {
            var e = c(t);
            return e && e.axisPointerModel
        }

        function d(t) {
            return !!t.get("handle.show")
        }

        function f(t) {
            return t.type + "||" + t.id
        }
        var p = n(0),
            g = n(12),
            v = p.each,
            m = p.curry;
        e.collect = i, e.fixValue = u, e.getAxisInfo = c, e.getAxisPointerModel = h, e.makeKey = f
    }, function (t, e, n) {
        "use strict";

        function i(t, e) {
            for (var n = [], i = {}, r = 0; r < e.length; r++) {
                var a = e[r],
                    o = a[0],
                    s = a[1],
                    l = a[2],
                    u = a[3],
                    c = {
                        id: t + ":" + r,
                        css: s,
                        media: l,
                        sourceMap: u
                    };
                i[o] ? i[o].parts.push(c) : n.push(i[o] = {
                    id: o,
                    parts: [c]
                })
            }
            return n
        }
        e.a = i
    }, function (t, e) {
        var n = Math.ceil,
            i = Math.floor;
        t.exports = function (t) {
            return isNaN(t = +t) ? 0 : (t > 0 ? i : n)(t)
        }
    }, function (t, e) {
        t.exports = function (t) {
            if (void 0 == t) throw TypeError("Can't call method on  " + t);
            return t
        }
    }, function (t, e, n) {
        var i = n(15),
            r = n(21),
            a = n(92),
            o = n(22),
            s = n(19),
            l = function (t, e, n) {
                var u, c, h, d = t & l.F,
                    f = t & l.G,
                    p = t & l.S,
                    g = t & l.P,
                    v = t & l.B,
                    m = t & l.W,
                    y = f ? r : r[e] || (r[e] = {}),
                    _ = y.prototype,
                    x = f ? i : p ? i[e] : (i[e] || {}).prototype;
                f && (n = e);
                for (u in n)(c = !d && x && void 0 !== x[u]) && s(y, u) || (h = c ? x[u] : n[u], y[u] = f && "function" != typeof x[u] ? n[u] : v && c ? a(h, i) : m && x[u] == h ? function (t) {
                    var e = function (e, n, i) {
                        if (this instanceof t) {
                            switch (arguments.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(e);
                                case 2:
                                    return new t(e, n)
                            }
                            return new t(e, n, i)
                        }
                        return t.apply(this, arguments)
                    };
                    return e.prototype = t.prototype, e
                }(h) : g && "function" == typeof h ? a(Function.call, h) : h, g && ((y.virtual || (y.virtual = {}))[u] = h, t & l.R && _ && !_[u] && o(_, u, h)))
            };
        l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, t.exports = l
    }, function (t, e, n) {
        var i = n(31);
        t.exports = function (t, e) {
            if (!i(t)) return t;
            var n, r;
            if (e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;
            if ("function" == typeof (n = t.valueOf) && !i(r = n.call(t))) return r;
            if (!e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function (t, e, n) {
        var i = n(97),
            r = n(66);
        t.exports = Object.keys || function (t) {
            return i(t, r)
        }
    }, function (t, e) {
        var n = {}.toString;
        t.exports = function (t) {
            return n.call(t).slice(8, -1)
        }
    }, function (t, e, n) {
        var i = n(65)("keys"),
            r = n(44);
        t.exports = function (t) {
            return i[t] || (i[t] = r(t))
        }
    }, function (t, e, n) {
        var i = n(21),
            r = n(15),
            a = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});
        (t.exports = function (t, e) {
            return a[t] || (a[t] = void 0 !== e ? e : {})
        })("versions", []).push({
            version: i.version,
            mode: n(42) ? "pure" : "global",
            copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
        })
    }, function (t, e) {
        t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }, function (t, e, n) {
        var i = n(18).f,
            r = n(19),
            a = n(11)("toStringTag");
        t.exports = function (t, e, n) {
            t && !r(t = n ? t : t.prototype, a) && i(t, a, {
                configurable: !0,
                value: e
            })
        }
    }, function (t, e) {
        function n(t) {
            for (var e = 0; t >= c;) e |= 1 & t, t >>= 1;
            return t + e
        }

        function i(t, e, n, i) {
            var a = e + 1;
            if (a === n) return 1;
            if (i(t[a++], t[e]) < 0) {
                for (; a < n && i(t[a], t[a - 1]) < 0;) a++;
                r(t, e, a)
            } else
                for (; a < n && i(t[a], t[a - 1]) >= 0;) a++;
            return a - e
        }

        function r(t, e, n) {
            for (n--; e < n;) {
                var i = t[e];
                t[e++] = t[n], t[n--] = i
            }
        }

        function a(t, e, n, i, r) {
            for (i === e && i++; i < n; i++) {
                for (var a, o = t[i], s = e, l = i; s < l;) a = s + l >>> 1, r(o, t[a]) < 0 ? l = a : s = a + 1;
                var u = i - s;
                switch (u) {
                    case 3:
                        t[s + 3] = t[s + 2];
                    case 2:
                        t[s + 2] = t[s + 1];
                    case 1:
                        t[s + 1] = t[s];
                        break;
                    default:
                        for (; u > 0;) t[s + u] = t[s + u - 1], u--
                }
                t[s] = o
            }
        }

        function o(t, e, n, i, r, a) {
            var o = 0,
                s = 0,
                l = 1;
            if (a(t, e[n + r]) > 0) {
                for (s = i - r; l < s && a(t, e[n + r + l]) > 0;) o = l, (l = 1 + (l << 1)) <= 0 && (l = s);
                l > s && (l = s), o += r, l += r
            } else {
                for (s = r + 1; l < s && a(t, e[n + r - l]) <= 0;) o = l, (l = 1 + (l << 1)) <= 0 && (l = s);
                l > s && (l = s);
                var u = o;
                o = r - l, l = r - u
            }
            for (o++; o < l;) {
                var c = o + (l - o >>> 1);
                a(t, e[n + c]) > 0 ? o = c + 1 : l = c
            }
            return l
        }

        function s(t, e, n, i, r, a) {
            var o = 0,
                s = 0,
                l = 1;
            if (a(t, e[n + r]) < 0) {
                for (s = r + 1; l < s && a(t, e[n + r - l]) < 0;) o = l, (l = 1 + (l << 1)) <= 0 && (l = s);
                l > s && (l = s);
                var u = o;
                o = r - l, l = r - u
            } else {
                for (s = i - r; l < s && a(t, e[n + r + l]) >= 0;) o = l, (l = 1 + (l << 1)) <= 0 && (l = s);
                l > s && (l = s), o += r, l += r
            }
            for (o++; o < l;) {
                var c = o + (l - o >>> 1);
                a(t, e[n + c]) < 0 ? l = c : o = c + 1
            }
            return l
        }

        function l(t, e) {
            function n(t, e) {
                c[g] = t, d[g] = e, g += 1
            }

            function i() {
                for (; g > 1;) {
                    var t = g - 2;
                    if (t >= 1 && d[t - 1] <= d[t] + d[t + 1] || t >= 2 && d[t - 2] <= d[t] + d[t - 1]) d[t - 1] < d[t + 1] && t--;
                    else if (d[t] > d[t + 1]) break;
                    a(t)
                }
            }

            function r() {
                for (; g > 1;) {
                    var t = g - 2;
                    t > 0 && d[t - 1] < d[t + 1] && t--, a(t)
                }
            }

            function a(n) {
                var i = c[n],
                    r = d[n],
                    a = c[n + 1],
                    h = d[n + 1];
                d[n] = r + h, n === g - 3 && (c[n + 1] = c[n + 2], d[n + 1] = d[n + 2]), g--;
                var f = s(t[a], t, i, r, 0, e);
                i += f, 0 !== (r -= f) && 0 !== (h = o(t[i + r - 1], t, a, h, h - 1, e)) && (r <= h ? l(i, r, a, h) : u(i, r, a, h))
            }

            function l(n, i, r, a) {
                var l = 0;
                for (l = 0; l < i; l++) v[l] = t[n + l];
                var u = 0,
                    c = r,
                    d = n;
                if (t[d++] = t[c++], 0 != --a) {
                    if (1 === i) {
                        for (l = 0; l < a; l++) t[d + l] = t[c + l];
                        return void(t[d + a] = v[u])
                    }
                    for (var p, g, m, y = f;;) {
                        p = 0, g = 0, m = !1;
                        do {
                            if (e(t[c], v[u]) < 0) {
                                if (t[d++] = t[c++], g++, p = 0, 0 == --a) {
                                    m = !0;
                                    break
                                }
                            } else if (t[d++] = v[u++], p++, g = 0, 1 == --i) {
                                m = !0;
                                break
                            }
                        } while ((p | g) < y);
                        if (m) break;
                        do {
                            if (0 !== (p = s(t[c], v, u, i, 0, e))) {
                                for (l = 0; l < p; l++) t[d + l] = v[u + l];
                                if (d += p, u += p, (i -= p) <= 1) {
                                    m = !0;
                                    break
                                }
                            }
                            if (t[d++] = t[c++], 0 == --a) {
                                m = !0;
                                break
                            }
                            if (0 !== (g = o(v[u], t, c, a, 0, e))) {
                                for (l = 0; l < g; l++) t[d + l] = t[c + l];
                                if (d += g, c += g, 0 === (a -= g)) {
                                    m = !0;
                                    break
                                }
                            }
                            if (t[d++] = v[u++], 1 == --i) {
                                m = !0;
                                break
                            }
                            y--
                        } while (p >= h || g >= h);
                        if (m) break;
                        y < 0 && (y = 0), y += 2
                    }
                    if (f = y, f < 1 && (f = 1), 1 === i) {
                        for (l = 0; l < a; l++) t[d + l] = t[c + l];
                        t[d + a] = v[u]
                    } else {
                        if (0 === i) throw new Error;
                        for (l = 0; l < i; l++) t[d + l] = v[u + l]
                    }
                } else
                    for (l = 0; l < i; l++) t[d + l] = v[u + l]
            }

            function u(n, i, r, a) {
                var l = 0;
                for (l = 0; l < a; l++) v[l] = t[r + l];
                var u = n + i - 1,
                    c = a - 1,
                    d = r + a - 1,
                    p = 0,
                    g = 0;
                if (t[d--] = t[u--], 0 != --i) {
                    if (1 === a) {
                        for (d -= i, u -= i, g = d + 1, p = u + 1, l = i - 1; l >= 0; l--) t[g + l] = t[p + l];
                        return void(t[d] = v[c])
                    }
                    for (var m = f;;) {
                        var y = 0,
                            _ = 0,
                            x = !1;
                        do {
                            if (e(v[c], t[u]) < 0) {
                                if (t[d--] = t[u--], y++, _ = 0, 0 == --i) {
                                    x = !0;
                                    break
                                }
                            } else if (t[d--] = v[c--], _++, y = 0, 1 == --a) {
                                x = !0;
                                break
                            }
                        } while ((y | _) < m);
                        if (x) break;
                        do {
                            if (0 !== (y = i - s(v[c], t, n, i, i - 1, e))) {
                                for (d -= y, u -= y, i -= y, g = d + 1, p = u + 1, l = y - 1; l >= 0; l--) t[g + l] = t[p + l];
                                if (0 === i) {
                                    x = !0;
                                    break
                                }
                            }
                            if (t[d--] = v[c--], 1 == --a) {
                                x = !0;
                                break
                            }
                            if (0 !== (_ = a - o(t[u], v, 0, a, a - 1, e))) {
                                for (d -= _, c -= _, a -= _, g = d + 1, p = c + 1, l = 0; l < _; l++) t[g + l] = v[p + l];
                                if (a <= 1) {
                                    x = !0;
                                    break
                                }
                            }
                            if (t[d--] = t[u--], 0 == --i) {
                                x = !0;
                                break
                            }
                            m--
                        } while (y >= h || _ >= h);
                        if (x) break;
                        m < 0 && (m = 0), m += 2
                    }
                    if (f = m, f < 1 && (f = 1), 1 === a) {
                        for (d -= i, u -= i, g = d + 1, p = u + 1, l = i - 1; l >= 0; l--) t[g + l] = t[p + l];
                        t[d] = v[c]
                    } else {
                        if (0 === a) throw new Error;
                        for (p = d - (a - 1), l = 0; l < a; l++) t[p + l] = v[l]
                    }
                } else
                    for (p = d - (a - 1), l = 0; l < a; l++) t[p + l] = v[l]
            }
            var c, d, f = h,
                p = 0,
                g = 0;
            p = t.length;
            var v = [];
            c = [], d = [], this.mergeRuns = i, this.forceMergeRuns = r, this.pushRun = n
        }

        function u(t, e, r, o) {
            r || (r = 0), o || (o = t.length);
            var s = o - r;
            if (!(s < 2)) {
                var u = 0;
                if (s < c) return u = i(t, r, o, e), void a(t, r, o, r + u, e);
                var h = new l(t, e),
                    d = n(s);
                do {
                    if ((u = i(t, r, o, e)) < d) {
                        var f = s;
                        f > d && (f = d), a(t, r, r + f, r + u, e), u = f
                    }
                    h.pushRun(r, u), h.mergeRuns(), s -= u, r += u
                } while (0 !== s);
                h.forceMergeRuns()
            }
        }
        var c = 32,
            h = 7;
        t.exports = u
    }, function (t, e, n) {
        function i(t, e, n) {
            var i = null == e.x ? 0 : e.x,
                r = null == e.x2 ? 1 : e.x2,
                a = null == e.y ? 0 : e.y,
                o = null == e.y2 ? 0 : e.y2;
            return e.global || (i = i * n.width + n.x, r = r * n.width + n.x, a = a * n.height + n.y, o = o * n.height + n.y), i = isNaN(i) ? 0 : i, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o, t.createLinearGradient(i, a, r, o)
        }

        function r(t, e, n) {
            var i = n.width,
                r = n.height,
                a = Math.min(i, r),
                o = null == e.x ? .5 : e.x,
                s = null == e.y ? .5 : e.y,
                l = null == e.r ? .5 : e.r;
            return e.global || (o = o * i + n.x, s = s * r + n.y, l *= a), t.createRadialGradient(o, s, 0, o, s, l)
        }
        var a = n(108),
            o = n(46),
            s = o.ContextCachedBy,
            l = [
                ["shadowBlur", 0],
                ["shadowOffsetX", 0],
                ["shadowOffsetY", 0],
                ["shadowColor", "#000"],
                ["lineCap", "butt"],
                ["lineJoin", "miter"],
                ["miterLimit", 10]
            ],
            u = function (t) {
                this.extendFrom(t, !1)
            };
        u.prototype = {
            constructor: u,
            fill: "#000",
            stroke: null,
            opacity: 1,
            fillOpacity: null,
            strokeOpacity: null,
            lineDash: null,
            lineDashOffset: 0,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            lineWidth: 1,
            strokeNoScale: !1,
            text: null,
            font: null,
            textFont: null,
            fontStyle: null,
            fontWeight: null,
            fontSize: null,
            fontFamily: null,
            textTag: null,
            textFill: "#000",
            textStroke: null,
            textWidth: null,
            textHeight: null,
            textStrokeWidth: 0,
            textLineHeight: null,
            textPosition: "inside",
            textRect: null,
            textOffset: null,
            textAlign: null,
            textVerticalAlign: null,
            textDistance: 5,
            textShadowColor: "transparent",
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
            textBoxShadowColor: "transparent",
            textBoxShadowBlur: 0,
            textBoxShadowOffsetX: 0,
            textBoxShadowOffsetY: 0,
            transformText: !1,
            textRotation: 0,
            textOrigin: null,
            textBackgroundColor: null,
            textBorderColor: null,
            textBorderWidth: 0,
            textBorderRadius: 0,
            textPadding: null,
            rich: null,
            truncate: null,
            blend: null,
            bind: function (t, e, n) {
                var i = this,
                    r = n && n.style,
                    o = !r || t.__attrCachedBy !== s.STYLE_BIND;
                t.__attrCachedBy = s.STYLE_BIND;
                for (var u = 0; u < l.length; u++) {
                    var c = l[u],
                        h = c[0];
                    (o || i[h] !== r[h]) && (t[h] = a(t, h, i[h] || c[1]))
                }
                if ((o || i.fill !== r.fill) && (t.fillStyle = i.fill), (o || i.stroke !== r.stroke) && (t.strokeStyle = i.stroke), (o || i.opacity !== r.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), (o || i.blend !== r.blend) && (t.globalCompositeOperation = i.blend || "source-over"), this.hasStroke()) {
                    var d = i.lineWidth;
                    t.lineWidth = d / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1)
                }
            },
            hasFill: function () {
                var t = this.fill;
                return null != t && "none" !== t
            },
            hasStroke: function () {
                var t = this.stroke;
                return null != t && "none" !== t && this.lineWidth > 0
            },
            extendFrom: function (t, e) {
                if (t)
                    for (var n in t) !t.hasOwnProperty(n) || !0 !== e && (!1 === e ? this.hasOwnProperty(n) : null == t[n]) || (this[n] = t[n])
            },
            set: function (t, e) {
                "string" == typeof t ? this[t] = e : this.extendFrom(t, !0)
            },
            clone: function () {
                var t = new this.constructor;
                return t.extendFrom(this, !0), t
            },
            getGradient: function (t, e, n) {
                for (var a = "radial" === e.type ? r : i, o = a(t, e, n), s = e.colorStops, l = 0; l < s.length; l++) o.addColorStop(s[l].offset, s[l].color);
                return o
            }
        };
        for (var c = u.prototype, h = 0; h < l.length; h++) {
            var d = l[h];
            d[0] in c || (c[d[0]] = d[1])
        }
        u.getGradient = c.getGradient;
        var f = u;
        t.exports = f
    }, function (t, e, n) {
        function i(t) {
            r.call(this, t)
        }
        var r = n(47),
            a = n(9),
            o = n(0),
            s = n(71);
        i.prototype = {
            constructor: i,
            type: "image",
            brush: function (t, e) {
                var n = this.style,
                    i = n.image;
                n.bind(t, this, e);
                var r = this._image = s.createOrUpdateImage(i, this._image, this, this.onload);
                if (r && s.isImageReady(r)) {
                    var a = n.x || 0,
                        o = n.y || 0,
                        l = n.width,
                        u = n.height,
                        c = r.width / r.height;
                    if (null == l && null != u ? l = u * c : null == u && null != l ? u = l / c : null == l && null == u && (l = r.width, u = r.height), this.setTransform(t), n.sWidth && n.sHeight) {
                        var h = n.sx || 0,
                            d = n.sy || 0;
                        t.drawImage(r, h, d, n.sWidth, n.sHeight, a, o, l, u)
                    } else if (n.sx && n.sy) {
                        var h = n.sx,
                            d = n.sy,
                            f = l - h,
                            p = u - d;
                        t.drawImage(r, h, d, f, p, a, o, l, u)
                    } else t.drawImage(r, a, o, l, u);
                    null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
                }
            },
            getBoundingRect: function () {
                var t = this.style;
                return this._rect || (this._rect = new a(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect
            }
        }, o.inherits(i, r);
        var l = i;
        t.exports = l
    }, function (t, e, n) {
        function i(t) {
            if ("string" == typeof t) {
                var e = l.get(t);
                return e && e.image
            }
            return t
        }

        function r(t, e, n, i, r) {
            if (t) {
                if ("string" == typeof t) {
                    if (e && e.__zrImageSrc === t || !n) return e;
                    var s = l.get(t),
                        u = {
                            hostEl: n,
                            cb: i,
                            cbPayload: r
                        };
                    return s ? (e = s.image, !o(e) && s.pending.push(u)) : (e = new Image, e.onload = e.onerror = a, l.put(t, e.__cachedImgObj = {
                        image: e,
                        pending: [u]
                    }), e.src = e.__zrImageSrc = t), e
                }
                return t
            }
            return e
        }

        function a() {
            var t = this.__cachedImgObj;
            this.onload = this.onerror = this.__cachedImgObj = null;
            for (var e = 0; e < t.pending.length; e++) {
                var n = t.pending[e],
                    i = n.cb;
                i && i(this, n.cbPayload), n.hostEl.dirty()
            }
            t.pending.length = 0
        }

        function o(t) {
            return t && t.width && t.height
        }
        var s = n(106),
            l = new s(50);
        e.findExistImage = i, e.createOrUpdateImage = r, e.isImageReady = o
    }, function (t, e, n) {
        var i = n(47),
            r = n(0),
            a = n(16),
            o = n(111),
            s = n(46),
            l = s.ContextCachedBy,
            u = function (t) {
                i.call(this, t)
            };
        u.prototype = {
            constructor: u,
            type: "text",
            brush: function (t, e) {
                var n = this.style;
                this.__dirty && o.normalizeTextStyle(n, !0), n.fill = n.stroke = n.shadowBlur = n.shadowColor = n.shadowOffsetX = n.shadowOffsetY = null;
                var i = n.text;
                if (null != i && (i += ""), !o.needDrawText(i, n)) return void(t.__attrCachedBy = l.NONE);
                this.setTransform(t), o.renderText(this, t, i, n, null, e), this.restoreTransform(t)
            },
            getBoundingRect: function () {
                var t = this.style;
                if (this.__dirty && o.normalizeTextStyle(t, !0), !this._rect) {
                    var e = t.text;
                    null != e ? e += "" : e = "";
                    var n = a.getBoundingRect(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich);
                    if (n.x += t.x || 0, n.y += t.y || 0, o.getStroke(t.textStroke, t.textStrokeWidth)) {
                        var i = t.textStrokeWidth;
                        n.x -= i / 2, n.y -= i / 2, n.width += i, n.height += i
                    }
                    this._rect = n
                }
                return this._rect
            }
        }, r.inherits(u, i);
        var c = u;
        t.exports = c
    }, function (t, e) {
        function n(t, e, n) {
            var i = n && n.lineWidth;
            if (e && i) {
                var o = e.x1,
                    s = e.x2,
                    l = e.y1,
                    u = e.y2;
                a(2 * o) === a(2 * s) ? t.x1 = t.x2 = r(o, i, !0) : (t.x1 = o, t.x2 = s), a(2 * l) === a(2 * u) ? t.y1 = t.y2 = r(l, i, !0) : (t.y1 = l, t.y2 = u)
            }
        }

        function i(t, e, n) {
            var i = n && n.lineWidth;
            if (e && i) {
                var a = e.x,
                    o = e.y,
                    s = e.width,
                    l = e.height;
                t.x = r(a, i, !0), t.y = r(o, i, !0), t.width = Math.max(r(a + s, i, !1) - t.x, 0 === s ? 0 : 1), t.height = Math.max(r(o + l, i, !1) - t.y, 0 === l ? 0 : 1)
            }
        }

        function r(t, e, n) {
            var i = a(2 * t);
            return (i + a(e)) % 2 == 0 ? i / 2 : (i + (n ? 1 : -1)) / 2
        }
        var a = Math.round;
        e.subPixelOptimizeLine = n, e.subPixelOptimizeRect = i, e.subPixelOptimize = r
    }, function (t, e) {
        var n = function (t) {
            this.colorStops = t || []
        };
        n.prototype = {
            constructor: n,
            addColorStop: function (t, e) {
                this.colorStops.push({
                    offset: t,
                    color: e
                })
            }
        };
        var i = n;
        t.exports = i
    }, function (t, e, n) {
        function i() {
            this._coordinateSystems = []
        }
        var r = n(0),
            a = {};
        i.prototype = {
            constructor: i,
            create: function (t, e) {
                var n = [];
                r.each(a, function (i, r) {
                    var a = i.create(t, e);
                    n = n.concat(a || [])
                }), this._coordinateSystems = n
            },
            update: function (t, e) {
                r.each(this._coordinateSystems, function (n) {
                    n.update && n.update(t, e)
                })
            },
            getCoordinateSystems: function () {
                return this._coordinateSystems.slice()
            }
        }, i.register = function (t, e) {
            a[t] = e
        }, i.get = function (t) {
            return a[t]
        };
        var o = i;
        t.exports = o
    }, function (t, e, n) {
        function i(t) {
            var e = t.name;
            _.isNameSpecified(t) || (t.name = r(t) || e)
        }

        function r(t) {
            var e = t.getRawData(),
                n = e.mapDimension("seriesName", !0),
                i = [];
            return d.each(n, function (t) {
                var n = e.getDimensionInfo(t);
                n.displayName && i.push(n.displayName)
            }), i.join(" ")
        }

        function a(t) {
            return t.model.getRawData().count()
        }

        function o(t) {
            var e = t.model;
            return e.setData(e.getRawData().cloneShallow()), s
        }

        function s(t, e) {
            t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData)
        }

        function l(t, e) {
            d.each(t.CHANGABLE_METHODS, function (n) {
                t.wrapMethod(n, d.curry(u, e))
            })
        }

        function u(t) {
            var e = c(t);
            e && e.setOutputEnd(this.count())
        }

        function c(t) {
            var e = (t.ecModel || {}).scheduler,
                n = e && e.getPipeline(t.uid);
            if (n) {
                var i = n.currentTask;
                if (i) {
                    var r = i.agentStubMap;
                    r && (i = r.get(t.uid))
                }
                return i
            }
        }
        var h = n(4),
            d = (h.__DEV__, n(0)),
            f = n(8),
            p = n(10),
            g = p.formatTime,
            v = p.encodeHTML,
            m = p.addCommas,
            y = p.getTooltipMarker,
            _ = n(1),
            x = n(13),
            b = n(126),
            w = n(220),
            S = n(14),
            M = S.getLayoutParams,
            T = S.mergeLayoutParam,
            A = n(77),
            C = A.createTask,
            I = n(51),
            D = I.prepareSource,
            k = I.getSource,
            O = n(27),
            P = O.retrieveRawValue,
            L = _.makeInner(),
            E = x.extend({
                type: "series.__base__",
                seriesIndex: 0,
                coordinateSystem: null,
                defaultOption: null,
                legendDataProvider: null,
                visualColorAccessPath: "itemStyle.color",
                visualBorderColorAccessPath: "itemStyle.borderColor",
                layoutMode: null,
                init: function (t, e, n, r) {
                    this.seriesIndex = this.componentIndex, this.dataTask = C({
                        count: a,
                        reset: o
                    }), this.dataTask.context = {
                        model: this
                    }, this.mergeDefaultAndTheme(t, n), D(this);
                    var s = this.getInitialData(t, n);
                    l(s, this), this.dataTask.context.data = s, L(this).dataBeforeProcessed = s, i(this)
                },
                mergeDefaultAndTheme: function (t, e) {
                    var n = this.layoutMode,
                        i = n ? M(t) : {},
                        r = this.subType;
                    x.hasClass(r) && (r += "Series"), d.merge(t, e.getTheme().get(this.subType)), d.merge(t, this.getDefaultOption()), _.defaultEmphasis(t, "label", ["show"]), this.fillDataTextStyle(t.data), n && T(t, i, n)
                },
                mergeOption: function (t, e) {
                    t = d.merge(this.option, t, !0), this.fillDataTextStyle(t.data);
                    var n = this.layoutMode;
                    n && T(this.option, t, n), D(this);
                    var r = this.getInitialData(t, e);
                    l(r, this), this.dataTask.dirty(), this.dataTask.context.data = r, L(this).dataBeforeProcessed = r, i(this)
                },
                fillDataTextStyle: function (t) {
                    if (t && !d.isTypedArray(t))
                        for (var e = ["show"], n = 0; n < t.length; n++) t[n] && t[n].label && _.defaultEmphasis(t[n], "label", e)
                },
                getInitialData: function () {},
                appendData: function (t) {
                    this.getRawData().appendData(t.data)
                },
                getData: function (t) {
                    var e = c(this);
                    if (e) {
                        var n = e.context.data;
                        return null == t ? n : n.getLinkedData(t)
                    }
                    return L(this).data
                },
                setData: function (t) {
                    var e = c(this);
                    if (e) {
                        var n = e.context;
                        n.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), n.outputData = t, e !== this.dataTask && (n.data = t)
                    }
                    L(this).data = t
                },
                getSource: function () {
                    return k(this)
                },
                getRawData: function () {
                    return L(this).dataBeforeProcessed
                },
                getBaseAxis: function () {
                    var t = this.coordinateSystem;
                    return t && t.getBaseAxis && t.getBaseAxis()
                },
                formatTooltip: function (t, e, n, i) {
                    function r(t) {
                        return {
                            renderMode: i,
                            content: v(m(t)),
                            style: l
                        }
                    }
                    var a = this;
                    i = i || "html";
                    var o = "html" === i ? "<br/>" : "\n",
                        s = "richText" === i,
                        l = {},
                        u = 0,
                        c = this.getData(),
                        h = c.mapDimension("defaultedTooltip", !0),
                        f = h.length,
                        p = this.getRawValue(t),
                        x = d.isArray(p),
                        b = c.getItemVisual(t, "color");
                    d.isObject(b) && b.colorStops && (b = (b.colorStops[0] || {}).color), b = b || "transparent";
                    var w = f > 1 || x && !f ? function (n) {
                            function r(t, n) {
                                var r = c.getDimensionInfo(n);
                                if (r && !1 !== r.otherDims.tooltip) {
                                    var h = r.type,
                                        d = "sub" + a.seriesIndex + "at" + u,
                                        p = y({
                                            color: b,
                                            type: "subItem",
                                            renderMode: i,
                                            markerId: d
                                        }),
                                        _ = "string" == typeof p ? p : p.content,
                                        x = (o ? _ + v(r.displayName || "-") + ": " : "") + v("ordinal" === h ? t + "" : "time" === h ? e ? "" : g("yyyy/MM/dd hh:mm:ss", t) : m(t));
                                    x && f.push(x), s && (l[d] = b, ++u)
                                }
                            }
                            var o = d.reduce(n, function (t, e, n) {
                                    var i = c.getDimensionInfo(n);
                                    return t |= i && !1 !== i.tooltip && null != i.displayName
                                }, 0),
                                f = [];
                            h.length ? d.each(h, function (e) {
                                r(P(c, t, e), e)
                            }) : d.each(n, r);
                            var p = o ? s ? "\n" : "<br/>" : "",
                                _ = p + f.join(p || ", ");
                            return {
                                renderMode: i,
                                content: _,
                                style: l
                            }
                        }(p) : r(f ? P(c, t, h[0]) : x ? p[0] : p),
                        S = w.content,
                        M = a.seriesIndex + "at" + u,
                        T = y({
                            color: b,
                            type: "item",
                            renderMode: i,
                            markerId: M
                        });
                    l[M] = b, ++u;
                    var A = c.getName(t),
                        C = this.name;
                    _.isNameSpecified(this) || (C = ""), C = C ? v(C) + (e ? ": " : o) : "";
                    var I = "string" == typeof T ? T : T.content;
                    return {
                        html: e ? I + C + S : C + I + (A ? v(A) + ": " + S : S),
                        markers: l
                    }
                },
                isAnimationEnabled: function () {
                    if (f.node) return !1;
                    var t = this.getShallow("animation");
                    return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t
                },
                restoreData: function () {
                    this.dataTask.dirty()
                },
                getColorFromPalette: function (t, e, n) {
                    var i = this.ecModel,
                        r = b.getColorFromPalette.call(this, t, e, n);
                    return r || (r = i.getColorFromPalette(t, e, n)), r
                },
                coordDimToDataDim: function (t) {
                    return this.getRawData().mapDimension(t, !0)
                },
                getProgressive: function () {
                    return this.get("progressive")
                },
                getProgressiveThreshold: function () {
                    return this.get("progressiveThreshold")
                },
                getAxisTooltipData: null,
                getTooltipPosition: null,
                pipeTask: null,
                preventIncremental: null,
                pipelineContext: null
            });
        d.mixin(E, w), d.mixin(E, b);
        var R = E;
        t.exports = R
    }, function (t, e, n) {
        function i(t) {
            return new r(t)
        }

        function r(t) {
            t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0, this.context
        }

        function a(t, e, n, i, r, a) {
            h.reset(n, i, r, a), t._callingProgress = e, t._callingProgress({
                start: n,
                end: i,
                count: i - n,
                next: h.next
            }, t.context)
        }

        function o(t, e) {
            t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null;
            var n, i;
            !e && t._reset && (n = t._reset(t.context), n && n.progress && (i = n.forceFirstProgress, n = n.progress), l(n) && !n.length && (n = null)), t._progress = n, t._modBy = t._modDataCount = null;
            var r = t._downstream;
            return r && r.dirty(), i
        }
        var s = n(0),
            l = (s.assert, s.isArray),
            u = n(4),
            c = (u.__DEV__, r.prototype);
        c.perform = function (t) {
            function e(t) {
                return !(t >= 1) && (t = 1), t
            }
            var n = this._upstream,
                i = t && t.skip;
            if (this._dirty && n) {
                var r = this.context;
                r.data = r.outputData = n.context.outputData
            }
            this.__pipeline && (this.__pipeline.currentTask = this);
            var s;
            this._plan && !i && (s = this._plan(this.context));
            var u = e(this._modBy),
                c = this._modDataCount || 0,
                h = e(t && t.modBy),
                d = t && t.modDataCount || 0;
            u === h && c === d || (s = "reset");
            var f;
            (this._dirty || "reset" === s) && (this._dirty = !1, f = o(this, i)), this._modBy = h, this._modDataCount = d;
            var p = t && t.step;
            if (this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {
                var g = this._dueIndex,
                    v = Math.min(null != p ? this._dueIndex + p : 1 / 0, this._dueEnd);
                if (!i && (f || g < v)) {
                    var m = this._progress;
                    if (l(m))
                        for (var y = 0; y < m.length; y++) a(this, m[y], g, v, h, d);
                    else a(this, m, g, v, h, d)
                }
                this._dueIndex = v;
                var _ = null != this._settedOutputEnd ? this._settedOutputEnd : v;
                this._outputDueEnd = _
            } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
            return this.unfinished()
        };
        var h = function () {
            function t() {
                return i < n ? i++ : null
            }

            function e() {
                var t = i % o * r + Math.ceil(i / o),
                    e = i >= n ? null : t < a ? t : i;
                return i++, e
            }
            var n, i, r, a, o, s = {
                reset: function (l, u, c, h) {
                    i = l, n = u, r = c, a = h, o = Math.ceil(a / r), s.next = r > 1 && a > 0 ? e : t
                }
            };
            return s
        }();
        c.dirty = function () {
            this._dirty = !0, this._onDirty && this._onDirty(this.context)
        }, c.unfinished = function () {
            return this._progress && this._dueIndex < this._dueEnd
        }, c.pipe = function (t) {
            (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty())
        }, c.dispose = function () {
            this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0)
        }, c.getUpstream = function () {
            return this._upstream
        }, c.getDownstream = function () {
            return this._downstream
        }, c.setOutputEnd = function (t) {
            this._outputDueEnd = this._settedOutputEnd = t
        }, e.createTask = i
    }, function (t, e, n) {
        function i() {
            this.group = new c, this.uid = h.getUID("viewChart"), this.renderTask = v({
                plan: o,
                reset: s
            }), this.renderTask.context = {
                view: this
            }
        }

        function r(t, e, n) {
            if (t && (t.trigger(e, n), t.isGroup && !p.isHighDownDispatcher(t)))
                for (var i = 0, a = t.childCount(); i < a; i++) r(t.childAt(i), e, n)
        }

        function a(t, e, n) {
            var i = f.queryDataIndex(t, e),
                a = e && null != e.highlightKey ? p.getHighlightDigit(e.highlightKey) : null;
            null != i ? u(f.normalizeToArray(i), function (e) {
                r(t.getItemGraphicEl(e), n, a)
            }) : t.eachItemGraphicEl(function (t) {
                r(t, n, a)
            })
        }

        function o(t) {
            return _(t.model)
        }

        function s(t) {
            var e = t.model,
                n = t.ecModel,
                i = t.api,
                r = t.payload,
                a = e.pipelineContext.progressiveRender,
                o = t.view,
                s = r && y(r).updateMethod,
                l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
            return "render" !== l && o[l](e, n, i, r), b[l]
        }
        var l = n(0),
            u = l.each,
            c = n(35),
            h = n(50),
            d = n(17),
            f = n(1),
            p = n(2),
            g = n(77),
            v = g.createTask,
            m = n(79),
            y = f.makeInner(),
            _ = m();
        i.prototype = {
            type: "chart",
            init: function (t, e) {},
            render: function (t, e, n, i) {},
            highlight: function (t, e, n, i) {
                a(t.getData(), i, "emphasis")
            },
            downplay: function (t, e, n, i) {
                a(t.getData(), i, "normal")
            },
            remove: function (t, e) {
                this.group.removeAll()
            },
            dispose: function () {},
            incrementalPrepareRender: null,
            incrementalRender: null,
            updateTransform: null,
            filterForExposedEvent: null
        };
        var x = i.prototype;
        x.updateView = x.updateLayout = x.updateVisual = function (t, e, n, i) {
            this.render(t, e, n, i)
        }, d.enableClassExtend(i, ["dispose"]), d.enableClassManagement(i, {
            registerWhenExtend: !0
        }), i.markUpdateMethod = function (t, e) {
            y(t).updateMethod = e
        };
        var b = {
                incrementalPrepareRender: {
                    progress: function (t, e) {
                        e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload)
                    }
                },
                render: {
                    forceFirstProgress: !0,
                    progress: function (t, e) {
                        e.view.render(e.model, e.ecModel, e.api, e.payload)
                    }
                }
            },
            w = i;
        t.exports = w
    }, function (t, e, n) {
        function i() {
            var t = a();
            return function (e) {
                var n = t(e),
                    i = e.pipelineContext,
                    r = n.large,
                    a = n.progressiveRender,
                    o = n.large = i.large,
                    s = n.progressiveRender = i.progressiveRender;
                return !!(r ^ o || a ^ s) && "reset"
            }
        }
        var r = n(1),
            a = r.makeInner;
        t.exports = i
    }, function (t, e, n) {
        function i(t, e, n) {
            n = n || {}, y.isInstance(t) || (t = y.seriesDataToSource(t));
            var i, a = e.get("coordinateSystem"),
                u = g.get(a),
                c = m(e);
            c && (i = o.map(c.coordSysDims, function (t) {
                var e = {
                        name: t
                    },
                    n = c.axisMap.get(t);
                if (n) {
                    var i = n.get("type");
                    e.type = d(i)
                }
                return e
            })), i || (i = u && (u.getDimensionsInfo ? u.getDimensionsInfo() : u.dimensions.slice()) || ["x", "y"]);
            var h, f, p = l(t, {
                coordDimensions: i,
                generateCoord: n.generateCoord
            });
            c && o.each(p, function (t, e) {
                var n = t.coordDim,
                    i = c.categoryAxisMap.get(n);
                i && (null == h && (h = e), t.ordinalMeta = i.getOrdinalMeta()), null != t.otherDims.itemName && (f = !0)
            }), f || null == h || (p[h].otherDims.itemName = 0);
            var v = x(e, p),
                _ = new s(p, e);
            _.setCalculationInfo(v);
            var b = null != h && r(t) ? function (t, e, n, i) {
                return i === h ? n : this.defaultDimValueGetter(t, e, n, i)
            } : null;
            return _.hasItemOption = !1, _.initData(t, null, b), _
        }

        function r(t) {
            if (t.sourceFormat === c) {
                var e = a(t.data || []);
                return null != e && !o.isArray(p(e))
            }
        }

        function a(t) {
            for (var e = 0; e < t.length && null == t[e];) e++;
            return t[e]
        }
        var o = n(0),
            s = n(81),
            l = n(83),
            u = n(38),
            c = u.SOURCE_FORMAT_ORIGINAL,
            h = n(82),
            d = h.getDimensionTypeByAxis,
            f = n(1),
            p = f.getDataItemValue,
            g = n(75),
            v = n(127),
            m = v.getCoordSysDefineBySeries,
            y = n(37),
            _ = n(28),
            x = _.enableDataStack,
            b = i;
        t.exports = b
    }, function (t, e, n) {
        function i(t) {
            return t._rawCount > 65535 ? k : P
        }

        function r(t) {
            var e = t.constructor;
            return e === Array ? t.slice() : new e(t)
        }

        function a(t, e) {
            m.each(L.concat(e.__wrappedMethods || []), function (n) {
                e.hasOwnProperty(n) && (t[n] = e[n])
            }), t.__wrappedMethods = e.__wrappedMethods, m.each(E, function (n) {
                t[n] = m.clone(e[n])
            }), t._calculationInfo = m.extend(e._calculationInfo)
        }

        function o(t, e, n, i, r) {
            var a = D[e.type],
                o = i - 1,
                s = e.name,
                l = t[s][o];
            if (l && l.length < n) {
                for (var u = new a(Math.min(r - o * n, n)), c = 0; c < l.length; c++) u[c] = l[c];
                t[s][o] = u
            }
            for (var h = i * n; h < r; h += n) t[s].push(new a(Math.min(r - h, n)))
        }

        function s(t) {
            var e = t._invertedIndicesMap;
            m.each(e, function (n, i) {
                var r = t._dimensionInfos[i],
                    a = r.ordinalMeta;
                if (a) {
                    n = e[i] = new O(a.categories.length);
                    for (var o = 0; o < n.length; o++) n[o] = C;
                    for (var o = 0; o < t._count; o++) n[t.get(i, o)] = o
                }
            })
        }

        function l(t, e, n) {
            var i;
            if (null != e) {
                var r = t._chunkSize,
                    a = Math.floor(n / r),
                    o = n % r,
                    s = t.dimensions[e],
                    l = t._storage[s][a];
                if (l) {
                    i = l[o];
                    var u = t._dimensionInfos[s].ordinalMeta;
                    u && u.categories.length && (i = u.categories[i])
                }
            }
            return i
        }

        function u(t) {
            return t
        }

        function c(t) {
            return t < this._count && t >= 0 ? this._indices[t] : -1
        }

        function h(t, e) {
            var n = t._idList[e];
            return null == n && (n = l(t, t._idDimIdx, e)), null == n && (n = I + e), n
        }

        function d(t) {
            return m.isArray(t) || (t = [t]), t
        }

        function f(t, e) {
            var n = t.dimensions,
                i = new R(m.map(n, t.getDimensionInfo, t), t.hostModel);
            a(i, t);
            for (var r = i._storage = {}, o = t._storage, s = 0; s < n.length; s++) {
                var l = n[s];
                o[l] && (m.indexOf(e, l) >= 0 ? (r[l] = p(o[l]), i._rawExtent[l] = g(), i._extent[l] = null) : r[l] = o[l])
            }
            return i
        }

        function p(t) {
            for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = r(t[n]);
            return e
        }

        function g() {
            return [1 / 0, -1 / 0]
        }
        var v = n(4),
            m = (v.__DEV__, n(0)),
            y = n(12),
            _ = n(233),
            x = n(37),
            b = n(27),
            w = b.defaultDimValueGetters,
            S = b.DefaultDataProvider,
            M = n(82),
            T = M.summarizeDimensions,
            A = m.isObject,
            C = -1,
            I = "e\0\0",
            D = {
                float: "undefined" == typeof Float64Array ? Array : Float64Array,
                int: "undefined" == typeof Int32Array ? Array : Int32Array,
                ordinal: Array,
                number: Array,
                time: Array
            },
            k = "undefined" == typeof Uint32Array ? Array : Uint32Array,
            O = "undefined" == typeof Int32Array ? Array : Int32Array,
            P = "undefined" == typeof Uint16Array ? Array : Uint16Array,
            L = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"],
            E = ["_extent", "_approximateExtent", "_rawExtent"],
            R = function (t, e) {
                t = t || ["x", "y"];
                for (var n = {}, i = [], r = {}, a = 0; a < t.length; a++) {
                    var o = t[a];
                    m.isString(o) && (o = {
                        name: o
                    });
                    var s = o.name;
                    o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), o.otherDims = o.otherDims || {}, i.push(s), n[s] = o, o.index = a, o.createInvertedIndices && (r[s] = [])
                }
                this.dimensions = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = T(this), this._invertedIndicesMap = r, this._calculationInfo = {}, this.userOutput = this._dimensionsSummary.userOutput
            },
            z = R.prototype;
        z.type = "list", z.hasItemOption = !0, z.getDimension = function (t) {
            return "number" != typeof t && (isNaN(t) || this._dimensionInfos.hasOwnProperty(t)) || (t = this.dimensions[t]), t
        }, z.getDimensionInfo = function (t) {
            return this._dimensionInfos[this.getDimension(t)]
        }, z.getDimensionsOnCoord = function () {
            return this._dimensionsSummary.dataDimsOnCoord.slice()
        }, z.mapDimension = function (t, e) {
            var n = this._dimensionsSummary;
            if (null == e) return n.encodeFirstDimNotExtra[t];
            var i = n.encode[t];
            return !0 === e ? (i || []).slice() : i && i[e]
        }, z.initData = function (t, e, n) {
            (x.isInstance(t) || m.isArrayLike(t)) && (t = new S(t, this.dimensions.length)), this._rawData = t, this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], this._nameRepeatCount = {}, n || (this.hasItemOption = !1), this.defaultDimValueGetter = w[this._rawData.getSource().sourceFormat], this._dimValueGetter = n = n || this.defaultDimValueGetter, this._dimValueGetterArrayRows = w.arrayRows, this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1)
        }, z.getProvider = function () {
            return this._rawData
        }, z.appendData = function (t) {
            var e = this._rawData,
                n = this.count();
            e.appendData(t);
            var i = e.count();
            e.persistent || (i += n), this._initDataFromProvider(n, i)
        }, z.appendValues = function (t, e) {
            for (var n = this._chunkSize, i = this._storage, r = this.dimensions, a = r.length, l = this._rawExtent, u = this.count(), c = u + Math.max(t.length, e ? e.length : 0), h = this._chunkCount, d = 0; d < a; d++) {
                var f = r[d];
                l[f] || (l[f] = g()), i[f] || (i[f] = []), o(i, this._dimensionInfos[f], n, h, c), this._chunkCount = i[f].length
            }
            for (var p = new Array(a), v = u; v < c; v++) {
                for (var m = v - u, y = Math.floor(v / n), _ = v % n, x = 0; x < a; x++) {
                    var f = r[x],
                        b = this._dimValueGetterArrayRows(t[m] || p, f, m, x);
                    i[f][y][_] = b;
                    var w = l[f];
                    b < w[0] && (w[0] = b), b > w[1] && (w[1] = b)
                }
                e && (this._nameList[v] = e[m])
            }
            this._rawCount = this._count = c, this._extent = {}, s(this)
        }, z._initDataFromProvider = function (t, e) {
            if (!(t >= e)) {
                for (var n, i = this._chunkSize, r = this._rawData, a = this._storage, l = this.dimensions, u = l.length, c = this._dimensionInfos, h = this._nameList, d = this._idList, f = this._rawExtent, p = this._nameRepeatCount = {}, v = this._chunkCount, m = 0; m < u; m++) {
                    var y = l[m];
                    f[y] || (f[y] = g());
                    var _ = c[y];
                    0 === _.otherDims.itemName && (n = this._nameDimIdx = m), 0 === _.otherDims.itemId && (this._idDimIdx = m), a[y] || (a[y] = []), o(a, _, i, v, e), this._chunkCount = a[y].length
                }
                for (var x = new Array(u), b = t; b < e; b++) {
                    x = r.getItem(b, x);
                    for (var w = Math.floor(b / i), S = b % i, M = 0; M < u; M++) {
                        var y = l[M],
                            T = a[y][w],
                            A = this._dimValueGetter(x, y, b, M);
                        T[S] = A;
                        var C = f[y];
                        A < C[0] && (C[0] = A), A > C[1] && (C[1] = A)
                    }
                    if (!r.pure) {
                        var I = h[b];
                        if (x && null == I)
                            if (null != x.name) h[b] = I = x.name;
                            else if (null != n) {
                            var D = l[n],
                                k = a[D][w];
                            if (k) {
                                I = k[S];
                                var O = c[D].ordinalMeta;
                                O && O.categories.length && (I = O.categories[I])
                            }
                        }
                        var P = null == x ? null : x.id;
                        null == P && null != I && (p[I] = p[I] || 0, P = I, p[I] > 0 && (P += "__ec__" + p[I]), p[I]++), null != P && (d[b] = P)
                    }
                }!r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, s(this)
            }
        }, z.count = function () {
            return this._count
        }, z.getIndices = function () {
            var t, e = this._indices;
            if (e) {
                var n = e.constructor,
                    r = this._count;
                if (n === Array) {
                    t = new n(r);
                    for (var a = 0; a < r; a++) t[a] = e[a]
                } else t = new n(e.buffer, 0, r)
            } else
                for (var n = i(this), t = new n(this.count()), a = 0; a < t.length; a++) t[a] = a;
            return t
        }, z.get = function (t, e) {
            if (!(e >= 0 && e < this._count)) return NaN;
            var n = this._storage;
            if (!n[t]) return NaN;
            e = this.getRawIndex(e);
            var i = Math.floor(e / this._chunkSize),
                r = e % this._chunkSize;
            return n[t][i][r]
        }, z.getByRawIndex = function (t, e) {
            if (!(e >= 0 && e < this._rawCount)) return NaN;
            var n = this._storage[t];
            if (!n) return NaN;
            var i = Math.floor(e / this._chunkSize),
                r = e % this._chunkSize;
            return n[i][r]
        }, z._getFast = function (t, e) {
            var n = Math.floor(e / this._chunkSize),
                i = e % this._chunkSize;
            return this._storage[t][n][i]
        }, z.getValues = function (t, e) {
            var n = [];
            m.isArray(t) || (e = t, t = this.dimensions);
            for (var i = 0, r = t.length; i < r; i++) n.push(this.get(t[i], e));
            return n
        }, z.hasValue = function (t) {
            for (var e = this._dimensionsSummary.dataDimsOnCoord, n = 0, i = e.length; n < i; n++)
                if (isNaN(this.get(e[n], t))) return !1;
            return !0
        }, z.getDataExtent = function (t) {
            t = this.getDimension(t);
            var e = this._storage[t],
                n = g();
            if (!e) return n;
            var i, r = this.count(),
                a = !this._indices;
            if (a) return this._rawExtent[t].slice();
            if (i = this._extent[t]) return i.slice();
            i = n;
            for (var o = i[0], s = i[1], l = 0; l < r; l++) {
                var u = this._getFast(t, this.getRawIndex(l));
                u < o && (o = u), u > s && (s = u)
            }
            return i = [o, s], this._extent[t] = i, i
        }, z.getApproximateExtent = function (t) {
            return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t)
        }, z.setApproximateExtent = function (t, e) {
            e = this.getDimension(e), this._approximateExtent[e] = t.slice()
        }, z.getCalculationInfo = function (t) {
            return this._calculationInfo[t]
        }, z.setCalculationInfo = function (t, e) {
            A(t) ? m.extend(this._calculationInfo, t) : this._calculationInfo[t] = e
        }, z.getSum = function (t) {
            var e = this._storage[t],
                n = 0;
            if (e)
                for (var i = 0, r = this.count(); i < r; i++) {
                    var a = this.get(t, i);
                    isNaN(a) || (n += a)
                }
            return n
        }, z.getMedian = function (t) {
            var e = [];
            this.each(t, function (t, n) {
                isNaN(t) || e.push(t)
            });
            var n = [].concat(e).sort(function (t, e) {
                    return t - e
                }),
                i = this.count();
            return 0 === i ? 0 : i % 2 == 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2
        }, z.rawIndexOf = function (t, e) {
            var n = t && this._invertedIndicesMap[t],
                i = n[e];
            return null == i || isNaN(i) ? C : i
        }, z.indexOfName = function (t) {
            for (var e = 0, n = this.count(); e < n; e++)
                if (this.getName(e) === t) return e;
            return -1
        }, z.indexOfRawIndex = function (t) {
            if (!this._indices) return t;
            if (t >= this._rawCount || t < 0) return -1;
            var e = this._indices,
                n = e[t];
            if (null != n && n < this._count && n === t) return t;
            for (var i = 0, r = this._count - 1; i <= r;) {
                var a = (i + r) / 2 | 0;
                if (e[a] < t) i = a + 1;
                else {
                    if (!(e[a] > t)) return a;
                    r = a - 1
                }
            }
            return -1
        }, z.indicesOfNearest = function (t, e, n) {
            var i = this._storage,
                r = i[t],
                a = [];
            if (!r) return a;
            null == n && (n = 1 / 0);
            for (var o = Number.MAX_VALUE, s = -1, l = 0, u = this.count(); l < u; l++) {
                var c = e - this.get(t, l),
                    h = Math.abs(c);
                c <= n && h <= o && ((h < o || c >= 0 && s < 0) && (o = h, s = c, a.length = 0), a.push(l))
            }
            return a
        }, z.getRawIndex = u, z.getRawDataItem = function (t) {
            if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));
            for (var e = [], n = 0; n < this.dimensions.length; n++) {
                var i = this.dimensions[n];
                e.push(this.get(i, t))
            }
            return e
        }, z.getName = function (t) {
            var e = this.getRawIndex(t);
            return this._nameList[e] || l(this, this._nameDimIdx, e) || ""
        }, z.getId = function (t) {
            return h(this, this.getRawIndex(t))
        }, z.each = function (t, e, n, i) {
            "use strict";
            if (this._count) {
                "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = m.map(d(t), this.getDimension, this);
                for (var r = t.length, a = 0; a < this.count(); a++) switch (r) {
                    case 0:
                        e.call(n, a);
                        break;
                    case 1:
                        e.call(n, this.get(t[0], a), a);
                        break;
                    case 2:
                        e.call(n, this.get(t[0], a), this.get(t[1], a), a);
                        break;
                    default:
                        for (var o = 0, s = []; o < r; o++) s[o] = this.get(t[o], a);
                        s[o] = a, e.apply(n, s)
                }
            }
        }, z.filterSelf = function (t, e, n, r) {
            "use strict";
            if (this._count) {
                "function" == typeof t && (r = n, n = e, e = t, t = []), n = n || r || this, t = m.map(d(t), this.getDimension, this);
                for (var a = this.count(), o = i(this), s = new o(a), l = [], h = t.length, f = 0, p = t[0], g = 0; g < a; g++) {
                    var v, y = this.getRawIndex(g);
                    if (0 === h) v = e.call(n, g);
                    else if (1 === h) {
                        var _ = this._getFast(p, y);
                        v = e.call(n, _, g)
                    } else {
                        for (var x = 0; x < h; x++) l[x] = this._getFast(p, y);
                        l[x] = g, v = e.apply(n, l)
                    }
                    v && (s[f++] = y)
                }
                return f < a && (this._indices = s), this._count = f, this._extent = {}, this.getRawIndex = this._indices ? c : u, this
            }
        }, z.selectRange = function (t) {
            "use strict";
            if (this._count) {
                var e = [];
                for (var n in t) t.hasOwnProperty(n) && e.push(n);
                var r = e.length;
                if (r) {
                    var a = this.count(),
                        o = i(this),
                        s = new o(a),
                        l = 0,
                        h = e[0],
                        d = t[h][0],
                        f = t[h][1],
                        p = !1;
                    if (!this._indices) {
                        var g = 0;
                        if (1 === r) {
                            for (var v = this._storage[e[0]], m = 0; m < this._chunkCount; m++)
                                for (var y = v[m], _ = Math.min(this._count - m * this._chunkSize, this._chunkSize), x = 0; x < _; x++) {
                                    var b = y[x];
                                    (b >= d && b <= f || isNaN(b)) && (s[l++] = g), g++
                                }
                            p = !0
                        } else if (2 === r) {
                            for (var v = this._storage[h], w = this._storage[e[1]], S = t[e[1]][0], M = t[e[1]][1], m = 0; m < this._chunkCount; m++)
                                for (var y = v[m], T = w[m], _ = Math.min(this._count - m * this._chunkSize, this._chunkSize), x = 0; x < _; x++) {
                                    var b = y[x],
                                        A = T[x];
                                    (b >= d && b <= f || isNaN(b)) && (A >= S && A <= M || isNaN(A)) && (s[l++] = g), g++
                                }
                            p = !0
                        }
                    }
                    if (!p)
                        if (1 === r)
                            for (var x = 0; x < a; x++) {
                                var C = this.getRawIndex(x),
                                    b = this._getFast(h, C);
                                (b >= d && b <= f || isNaN(b)) && (s[l++] = C)
                            } else
                                for (var x = 0; x < a; x++) {
                                    for (var I = !0, C = this.getRawIndex(x), m = 0; m < r; m++) {
                                        var D = e[m],
                                            b = this._getFast(n, C);
                                        (b < t[D][0] || b > t[D][1]) && (I = !1)
                                    }
                                    I && (s[l++] = this.getRawIndex(x))
                                }
                    return l < a && (this._indices = s), this._count = l, this._extent = {}, this.getRawIndex = this._indices ? c : u, this
                }
            }
        }, z.mapArray = function (t, e, n, i) {
            "use strict";
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
            var r = [];
            return this.each(t, function () {
                r.push(e && e.apply(this, arguments))
            }, n), r
        }, z.map = function (t, e, n, i) {
            "use strict";
            n = n || i || this, t = m.map(d(t), this.getDimension, this);
            var r = f(this, t);
            r._indices = this._indices, r.getRawIndex = r._indices ? c : u;
            for (var a = r._storage, o = [], s = this._chunkSize, l = t.length, h = this.count(), p = [], g = r._rawExtent, v = 0; v < h; v++) {
                for (var y = 0; y < l; y++) p[y] = this.get(t[y], v);
                p[l] = v;
                var _ = e && e.apply(n, p);
                if (null != _) {
                    "object" != typeof _ && (o[0] = _, _ = o);
                    for (var x = this.getRawIndex(v), b = Math.floor(x / s), w = x % s, S = 0; S < _.length; S++) {
                        var M = t[S],
                            T = _[S],
                            A = g[M],
                            C = a[M];
                        C && (C[b][w] = T), T < A[0] && (A[0] = T), T > A[1] && (A[1] = T)
                    }
                }
            }
            return r
        }, z.downSample = function (t, e, n, r) {
            for (var a = f(this, [t]), o = a._storage, s = [], l = Math.floor(1 / e), u = o[t], h = this.count(), d = this._chunkSize, p = a._rawExtent[t], g = new(i(this))(h), v = 0, m = 0; m < h; m += l) {
                l > h - m && (l = h - m, s.length = l);
                for (var y = 0; y < l; y++) {
                    var _ = this.getRawIndex(m + y),
                        x = Math.floor(_ / d),
                        b = _ % d;
                    s[y] = u[x][b]
                }
                var w = n(s),
                    S = this.getRawIndex(Math.min(m + r(s, w) || 0, h - 1)),
                    M = Math.floor(S / d),
                    T = S % d;
                u[M][T] = w, w < p[0] && (p[0] = w), w > p[1] && (p[1] = w), g[v++] = S
            }
            return a._count = v, a._indices = g, a.getRawIndex = c, a
        }, z.getItemModel = function (t) {
            var e = this.hostModel;
            return new y(this.getRawDataItem(t), e, e && e.ecModel)
        }, z.diff = function (t) {
            var e = this;
            return new _(t ? t.getIndices() : [], this.getIndices(), function (e) {
                return h(t, e)
            }, function (t) {
                return h(e, t)
            })
        }, z.getVisual = function (t) {
            var e = this._visual;
            return e && e[t]
        }, z.setVisual = function (t, e) {
            if (A(t))
                for (var n in t) t.hasOwnProperty(n) && this.setVisual(n, t[n]);
            else this._visual = this._visual || {}, this._visual[t] = e
        }, z.setLayout = function (t, e) {
            if (A(t))
                for (var n in t) t.hasOwnProperty(n) && this.setLayout(n, t[n]);
            else this._layout[t] = e
        }, z.getLayout = function (t) {
            return this._layout[t]
        }, z.getItemLayout = function (t) {
            return this._itemLayouts[t]
        }, z.setItemLayout = function (t, e, n) {
            this._itemLayouts[t] = n ? m.extend(this._itemLayouts[t] || {}, e) : e
        }, z.clearItemLayouts = function () {
            this._itemLayouts.length = 0
        }, z.getItemVisual = function (t, e, n) {
            var i = this._itemVisuals[t],
                r = i && i[e];
            return null != r || n ? r : this.getVisual(e)
        }, z.setItemVisual = function (t, e, n) {
            var i = this._itemVisuals[t] || {},
                r = this.hasItemVisual;
            if (this._itemVisuals[t] = i, A(e))
                for (var a in e) e.hasOwnProperty(a) && (i[a] = e[a], r[a] = !0);
            else i[e] = n, r[e] = !0
        }, z.clearAllVisual = function () {
            this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {}
        };
        var N = function (t) {
            t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType
        };
        z.setItemGraphicEl = function (t, e) {
            var n = this.hostModel;
            e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, "group" === e.type && e.traverse(N, e)), this._graphicEls[t] = e
        }, z.getItemGraphicEl = function (t) {
            return this._graphicEls[t]
        }, z.eachItemGraphicEl = function (t, e) {
            m.each(this._graphicEls, function (n, i) {
                n && t && t.call(e, n, i)
            })
        }, z.cloneShallow = function (t) {
            if (!t) {
                var e = m.map(this.dimensions, this.getDimensionInfo, this);
                t = new R(e, this.hostModel)
            }
            if (t._storage = this._storage, a(t, this), this._indices) {
                var n = this._indices.constructor;
                t._indices = new n(this._indices)
            } else t._indices = null;
            return t.getRawIndex = t._indices ? c : u, t
        }, z.wrapMethod = function (t, e) {
            var n = this[t];
            "function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function () {
                var t = n.apply(this, arguments);
                return e.apply(this, [t].concat(m.slice(arguments)))
            })
        }, z.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], z.CHANGABLE_METHODS = ["filterSelf", "selectRange"];
        var B = R;
        t.exports = B
    }, function (t, e, n) {
        function i(t) {
            var e = {},
                n = e.encode = {},
                i = u(),
                a = [],
                s = [],
                c = e.userOutput = {
                    dimensionNames: t.dimensions.slice(),
                    encode: {}
                };
            l(t.dimensions, function (e) {
                var l = t.getDimensionInfo(e),
                    u = l.coordDim;
                if (u) {
                    var d = l.coordDimIndex;
                    r(n, u)[d] = e, l.isExtraCoord || (i.set(u, 1), o(l.type) && (a[0] = e), r(c.encode, u)[d] = l.index), l.defaultTooltip && s.push(e)
                }
                h.each(function (t, e) {
                    var i = r(n, e),
                        a = l.otherDims[e];
                    null != a && !1 !== a && (i[a] = l.name)
                })
            });
            var d = [],
                f = {};
            i.each(function (t, e) {
                var i = n[e];
                f[e] = i[0], d = d.concat(i)
            }), e.dataDimsOnCoord = d, e.encodeFirstDimNotExtra = f;
            var p = n.label;
            p && p.length && (a = p.slice());
            var g = n.tooltip;
            return g && g.length ? s = g.slice() : s.length || (s = a.slice()), n.defaultedLabel = a, n.defaultedTooltip = s, e
        }

        function r(t, e) {
            return t.hasOwnProperty(e) || (t[e] = []), t[e]
        }

        function a(t) {
            return "category" === t ? "ordinal" : "time" === t ? "time" : "float"
        }

        function o(t) {
            return !("ordinal" === t || "time" === t)
        }
        var s = n(0),
            l = s.each,
            u = s.createHashMap,
            c = (s.assert, n(4)),
            h = (c.__DEV__, u(["tooltip", "label", "itemName", "itemId", "seriesName"]));
        e.OTHER_DIMENSIONS = h, e.summarizeDimensions = i, e.getDimensionTypeByAxis = a
    }, function (t, e, n) {
        function i(t, e) {
            return e = e || {}, r(e.coordDimensions || [], t, {
                dimsDef: e.dimensionsDefine || t.dimensionsDefine,
                encodeDef: e.encodeDefine || t.encodeDefine,
                dimCount: e.dimensionsCount,
                generateCoord: e.generateCoord,
                generateCoordCount: e.generateCoordCount
            })
        }
        var r = n(131);
        t.exports = i
    }, function (t, e, n) {
        var i = n(5),
            r = n(10),
            a = n(53),
            o = n(133),
            s = i.round,
            l = a.extend({
                type: "interval",
                _interval: 0,
                _intervalPrecision: 2,
                setExtent: function (t, e) {
                    var n = this._extent;
                    isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e))
                },
                unionExtent: function (t) {
                    var e = this._extent;
                    t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), l.prototype.setExtent.call(this, e[0], e[1])
                },
                getInterval: function () {
                    return this._interval
                },
                setInterval: function (t) {
                    this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = o.getIntervalPrecision(t)
                },
                getTicks: function () {
                    return o.intervalScaleGetTicks(this._interval, this._extent, this._niceExtent, this._intervalPrecision)
                },
                getLabel: function (t, e) {
                    if (null == t) return "";
                    var n = e && e.precision;
                    return null == n ? n = i.getPrecisionSafe(t) || 0 : "auto" === n && (n = this._intervalPrecision), t = s(t, n, !0), r.addCommas(t)
                },
                niceTicks: function (t, e, n) {
                    t = t || 5;
                    var i = this._extent,
                        r = i[1] - i[0];
                    if (isFinite(r)) {
                        r < 0 && (r = -r, i.reverse());
                        var a = o.intervalScaleNiceTicks(i, t, e, n);
                        this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent
                    }
                },
                niceExtent: function (t) {
                    var e = this._extent;
                    if (e[0] === e[1])
                        if (0 !== e[0]) {
                            var n = e[0];
                            t.fixMax ? e[0] -= n / 2 : (e[1] += n / 2, e[0] -= n / 2)
                        } else e[1] = 1;
                    var i = e[1] - e[0];
                    isFinite(i) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
                    var r = this._interval;
                    t.fixMin || (e[0] = s(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = s(Math.ceil(e[1] / r) * r))
                }
            });
        l.create = function () {
            return new l
        };
        var u = l;
        t.exports = u
    }, function (t, e, n) {
        e.f = n(11)
    }, function (t, e, n) {
        var i = n(15),
            r = n(21),
            a = n(42),
            o = n(85),
            s = n(18).f;
        t.exports = function (t) {
            var e = r.Symbol || (r.Symbol = a ? {} : i.Symbol || {});
            "_" == t.charAt(0) || t in e || s(e, t, {
                value: o.f(t)
            })
        }
    }, function (t, e) {
        e.f = {}.propertyIsEnumerable
    }, function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(159),
            r = n(160),
            a = function (t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        n(269), n(286), n(292), n(302), n(303), n(314), e.default = {
            mixins: [i.VueExtend.mixin],
            name: "truck-echarts",
            data: function () {
                return {
                    chartType: "line"
                }
            },
            components: {
                "v-chart": a.default
            },
            props: {
                chartTitle: {
                    type: String,
                    editor: {
                        ignore: !0
                    },
                    default: "图表"
                },
                chartColors: {
                    type: Array,
                    editor: {
                        ignore: !0
                    }
                },
                chartCategories: {
                    type: Array,
                    editor: {
                        ignore: !0
                    }
                },
                chartSeries: {
                    type: Array,
                    editor: {
                        ignore: !0
                    }
                },
                chartLegends: {
                    type: Array,
                    editor: {
                        ignore: !0
                    }
                }
            },
            computed: {
                chartOption: function () {
                    return {
                        title: {
                            text: this.chartTitle,
                            x: "center",
                            y: 0
                        },
                        color: this.chartColors,
                        legend: {
                            data: this.chartLegends,
                            y: 30
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: !1,
                            data: this.chartCategories
                        },
                        yAxis: {
                            type: "value"
                        },
                        series: this.chartSeries
                    }
                }
            },
            methods: {}
        }
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(163),
            a = i(r),
            o = n(3),
            s = i(o),
            l = n(241),
            u = i(l),
            c = n(267),
            h = ["legendselectchanged", "legendselected", "legendunselected", "legendscroll", "datazoom", "datarangeselected", "timelinechanged", "timelineplaychanged", "restore", "dataviewchanged", "magictypechanged", "geoselectchanged", "geoselected", "geounselected", "pieselectchanged", "pieselected", "pieunselected", "mapselectchanged", "mapselected", "mapunselected", "axisareaselected", "focusnodeadjacency", "unfocusnodeadjacency", "brush", "brushselected", "rendered", "finished", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"],
            d = ["theme", "initOptions", "autoresize"],
            f = ["manualUpdate", "watchShallow"];
        e.default = {
            props: {
                options: Object,
                theme: [String, Object],
                initOptions: Object,
                group: String,
                autoresize: Boolean,
                watchShallow: Boolean,
                manualUpdate: Boolean
            },
            data: function () {
                return {
                    lastArea: 0
                }
            },
            watch: {
                group: function (t) {
                    this.chart.group = t
                }
            },
            methods: {
                mergeOptions: function (t, e, n) {
                    this.manualUpdate && (this.manualOptions = t), this.chart ? this.delegateMethod("setOption", t, e, n) : this.init()
                },
                appendData: function (t) {
                    this.delegateMethod("appendData", t)
                },
                resize: function (t) {
                    this.delegateMethod("resize", t)
                },
                dispatchAction: function (t) {
                    this.delegateMethod("dispatchAction", t)
                },
                convertToPixel: function (t, e) {
                    return this.delegateMethod("convertToPixel", t, e)
                },
                convertFromPixel: function (t, e) {
                    return this.delegateMethod("convertFromPixel", t, e)
                },
                containPixel: function (t, e) {
                    return this.delegateMethod("containPixel", t, e)
                },
                showLoading: function (t, e) {
                    this.delegateMethod("showLoading", t, e)
                },
                hideLoading: function () {
                    this.delegateMethod("hideLoading")
                },
                getDataURL: function (t) {
                    return this.delegateMethod("getDataURL", t)
                },
                getConnectedDataURL: function (t) {
                    return this.delegateMethod("getConnectedDataURL", t)
                },
                clear: function () {
                    this.delegateMethod("clear")
                },
                dispose: function () {
                    this.delegateMethod("dispose")
                },
                delegateMethod: function (t) {
                    var e;
                    this.chart || this.init();
                    for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
                    return (e = this.chart)[t].apply(e, (0, a.default)(i))
                },
                delegateGet: function (t) {
                    return this.chart || this.init(), this.chart[t]()
                },
                getArea: function () {
                    return this.$el.offsetWidth * this.$el.offsetHeight
                },
                init: function () {
                    var t = this;
                    if (!this.chart) {
                        var e = s.default.init(this.$el, this.theme, this.initOptions);
                        this.group && (e.group = this.group), e.setOption(this.manualOptions || this.options || {}, !0), h.forEach(function (n) {
                            e.on(n, function (e) {
                                t.$emit(n, e)
                            })
                        }), this.autoresize && (this.lastArea = this.getArea(), this.__resizeHandler = (0, u.default)(function () {
                            0 === t.lastArea ? (t.mergeOptions({}, !0), t.resize(), t.mergeOptions(t.options || t.manualOptions || {}, !0)) : t.resize(), t.lastArea = t.getArea()
                        }, 100, {
                            leading: !0
                        }), (0, c.addListener)(this.$el, this.__resizeHandler)), Object.defineProperties(this, {
                            width: {
                                configurable: !0,
                                get: function () {
                                    return t.delegateGet("getWidth")
                                }
                            },
                            height: {
                                configurable: !0,
                                get: function () {
                                    return t.delegateGet("getHeight")
                                }
                            },
                            isDisposed: {
                                configurable: !0,
                                get: function () {
                                    return !!t.delegateGet("isDisposed")
                                }
                            },
                            computedOptions: {
                                configurable: !0,
                                get: function () {
                                    return t.delegateGet("getOption")
                                }
                            }
                        }), this.chart = e
                    }
                },
                initOptionsWatcher: function () {
                    var t = this;
                    this.__unwatchOptions && (this.__unwatchOptions(), this.__unwatchOptions = null), this.manualUpdate || (this.__unwatchOptions = this.$watch("options", function (e, n) {
                        !t.chart && e ? t.init() : t.chart.setOption(e, e !== n)
                    }, {
                        deep: !this.watchShallow
                    }))
                },
                destroy: function () {
                    this.autoresize && (0, c.removeListener)(this.$el, this.__resizeHandler), this.dispose(), this.chart = null
                },
                refresh: function () {
                    this.chart && (this.destroy(), this.init())
                }
            },
            created: function () {
                var t = this;
                this.initOptionsWatcher(), d.forEach(function (e) {
                    t.$watch(e, function () {
                        t.refresh()
                    }, {
                        deep: !0
                    })
                }), f.forEach(function (e) {
                    t.$watch(e, function () {
                        t.initOptionsWatcher(), t.refresh()
                    })
                })
            },
            mounted: function () {
                this.options && this.init()
            },
            activated: function () {
                this.autoresize && this.chart && this.chart.resize()
            },
            destroyed: function () {
                this.chart && this.destroy()
            },
            connect: function (t) {
                "string" != typeof t && (t = t.map(function (t) {
                    return t.chart
                })), s.default.connect(t)
            },
            disconnect: function (t) {
                s.default.disConnect(t)
            },
            registerMap: function (t, e, n) {
                s.default.registerMap(t, e, n)
            },
            registerTheme: function (t, e) {
                s.default.registerTheme(t, e)
            },
            graphic: s.default.graphic
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(166)(!0);
        n(91)(String, "String", function (t) {
            this._t = String(t), this._i = 0
        }, function () {
            var t, e = this._t,
                n = this._i;
            return n >= e.length ? {
                value: void 0,
                done: !0
            } : (t = i(e, n), this._i += t.length, {
                value: t,
                done: !1
            })
        })
    }, function (t, e, n) {
        "use strict";
        var i = n(42),
            r = n(60),
            a = n(95),
            o = n(22),
            s = n(33),
            l = n(168),
            u = n(67),
            c = n(174),
            h = n(11)("iterator"),
            d = !([].keys && "next" in [].keys()),
            f = function () {
                return this
            };
        t.exports = function (t, e, n, p, g, v, m) {
            l(n, e, p);
            var y, _, x, b = function (t) {
                    if (!d && t in T) return T[t];
                    switch (t) {
                        case "keys":
                        case "values":
                            return function () {
                                return new n(this, t)
                            }
                    }
                    return function () {
                        return new n(this, t)
                    }
                },
                w = e + " Iterator",
                S = "values" == g,
                M = !1,
                T = t.prototype,
                A = T[h] || T["@@iterator"] || g && T[g],
                C = A || b(g),
                I = g ? S ? b("entries") : C : void 0,
                D = "Array" == e ? T.entries || A : A;
            if (D && (x = c(D.call(new t))) !== Object.prototype && x.next && (u(x, w, !0), i || "function" == typeof x[h] || o(x, h, f)), S && A && "values" !== A.name && (M = !0, C = function () {
                    return A.call(this)
                }), i && !m || !d && !M && T[h] || o(T, h, C), s[e] = C, s[w] = f, g)
                if (y = {
                        values: S ? C : b("values"),
                        keys: v ? C : b("keys"),
                        entries: I
                    }, m)
                    for (_ in y) _ in T || a(T, _, y[_]);
                else r(r.P + r.F * (d || M), e, y);
            return y
        }
    }, function (t, e, n) {
        var i = n(167);
        t.exports = function (t, e, n) {
            if (i(t), void 0 === e) return t;
            switch (n) {
                case 1:
                    return function (n) {
                        return t.call(e, n)
                    };
                case 2:
                    return function (n, i) {
                        return t.call(e, n, i)
                    };
                case 3:
                    return function (n, i, r) {
                        return t.call(e, n, i, r)
                    }
            }
            return function () {
                return t.apply(e, arguments)
            }
        }
    }, function (t, e, n) {
        t.exports = !n(23) && !n(43)(function () {
            return 7 != Object.defineProperty(n(94)("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        })
    }, function (t, e, n) {
        var i = n(31),
            r = n(15).document,
            a = i(r) && i(r.createElement);
        t.exports = function (t) {
            return a ? r.createElement(t) : {}
        }
    }, function (t, e, n) {
        t.exports = n(22)
    }, function (t, e, n) {
        var i = n(30),
            r = n(169),
            a = n(66),
            o = n(64)("IE_PROTO"),
            s = function () {},
            l = function () {
                var t, e = n(94)("iframe"),
                    i = a.length;
                for (e.style.display = "none", n(173).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write("<script>document.F=Object<\/script>"), t.close(), l = t.F; i--;) delete l.prototype[a[i]];
                return l()
            };
        t.exports = Object.create || function (t, e) {
            var n;
            return null !== t ? (s.prototype = i(t), n = new s, s.prototype = null, n[o] = t) : n = l(), void 0 === e ? n : r(n, e)
        }
    }, function (t, e, n) {
        var i = n(19),
            r = n(24),
            a = n(171)(!1),
            o = n(64)("IE_PROTO");
        t.exports = function (t, e) {
            var n, s = r(t),
                l = 0,
                u = [];
            for (n in s) n != o && i(s, n) && u.push(n);
            for (; e.length > l;) i(s, n = e[l++]) && (~a(u, n) || u.push(n));
            return u
        }
    }, function (t, e, n) {
        var i = n(58),
            r = Math.min;
        t.exports = function (t) {
            return t > 0 ? r(i(t), 9007199254740991) : 0
        }
    }, function (t, e, n) {
        var i = n(59);
        t.exports = function (t) {
            return Object(i(t))
        }
    }, function (t, e) {
        var n;
        n = function () {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (t) {
            "object" == typeof window && (n = window)
        }
        t.exports = n
    }, function (t, e, n) {
        function i(t, e) {
            var n = new _(l(), t, e);
            return y[n.id] = n, n
        }

        function r(t) {
            if (t) t.dispose();
            else {
                for (var e in y) y.hasOwnProperty(e) && y[e].dispose();
                y = {}
            }
            return this
        }

        function a(t) {
            return y[t]
        }

        function o(t, e) {
            m[t] = e
        }

        function s(t) {
            delete y[t]
        }
        var l = n(102),
            u = n(8),
            c = n(0),
            h = n(182),
            d = n(186),
            f = n(190),
            p = n(193),
            g = n(194),
            v = !u.canvasSupported,
            m = {
                canvas: f
            },
            y = {},
            _ = function (t, e, n) {
                n = n || {}, this.dom = e, this.id = t;
                var i = this,
                    r = new d,
                    a = n.renderer;
                if (v) {
                    if (!m.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
                    a = "vml"
                } else a && m[a] || (a = "canvas");
                var o = new m[a](e, r, n, t);
                this.storage = r, this.painter = o;
                var s = u.node || u.worker ? null : new g(o.getViewportRoot());
                this.handler = new h(r, o, s, o.root), this.animation = new p({
                    stage: {
                        update: c.bind(this.flush, this)
                    }
                }), this.animation.start(), this._needsRefresh;
                var l = r.delFromStorage,
                    f = r.addToStorage;
                r.delFromStorage = function (t) {
                    l.call(r, t), t && t.removeSelfFromZr(i)
                }, r.addToStorage = function (t) {
                    f.call(r, t), t.addSelfToZr(i)
                }
            };
        _.prototype = {
            constructor: _,
            getId: function () {
                return this.id
            },
            add: function (t) {
                this.storage.addRoot(t), this._needsRefresh = !0
            },
            remove: function (t) {
                this.storage.delRoot(t), this._needsRefresh = !0
            },
            configLayer: function (t, e) {
                this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0
            },
            setBackgroundColor: function (t) {
                this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0
            },
            refreshImmediately: function () {
                this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh(), this._needsRefresh = this._needsRefreshHover = !1
            },
            refresh: function () {
                this._needsRefresh = !0
            },
            flush: function () {
                var t;
                this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately()), t && this.trigger("rendered")
            },
            addHover: function (t, e) {
                if (this.painter.addHover) {
                    var n = this.painter.addHover(t, e);
                    return this.refreshHover(), n
                }
            },
            removeHover: function (t) {
                this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover())
            },
            clearHover: function () {
                this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
            },
            refreshHover: function () {
                this._needsRefreshHover = !0
            },
            refreshHoverImmediately: function () {
                this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
            },
            resize: function (t) {
                t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize()
            },
            clearAnimation: function () {
                this.animation.clear()
            },
            getWidth: function () {
                return this.painter.getWidth()
            },
            getHeight: function () {
                return this.painter.getHeight()
            },
            pathToImage: function (t, e) {
                return this.painter.pathToImage(t, e)
            },
            setCursorStyle: function (t) {
                this.handler.setCursorStyle(t)
            },
            findHover: function (t, e) {
                return this.handler.findHover(t, e)
            },
            on: function (t, e, n) {
                this.handler.on(t, e, n)
            },
            off: function (t, e) {
                this.handler.off(t, e)
            },
            trigger: function (t, e) {
                this.handler.trigger(t, e)
            },
            clear: function () {
                this.storage.delRoot(), this.painter.clear()
            },
            dispose: function () {
                this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, s(this.id)
            }
        }, e.version = "4.1.1", e.init = i, e.dispose = r, e.getInstance = a, e.registerPainter = o
    }, function (t, e) {
        function n() {
            return i++
        }
        var i = 2311;
        t.exports = n
    }, function (t, e, n) {
        var i = n(102),
            r = n(34),
            a = n(104),
            o = n(187),
            s = n(0),
            l = function (t) {
                a.call(this, t), r.call(this, t), o.call(this, t), this.id = t.id || i()
            };
        l.prototype = {
            type: "element",
            name: "",
            __zr: null,
            ignore: !1,
            clipPath: null,
            isGroup: !1,
            drift: function (t, e) {
                switch (this.draggable) {
                    case "horizontal":
                        e = 0;
                        break;
                    case "vertical":
                        t = 0
                }
                var n = this.transform;
                n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.dirty(!1)
            },
            beforeUpdate: function () {},
            afterUpdate: function () {},
            update: function () {
                this.updateTransform()
            },
            traverse: function (t, e) {},
            attrKV: function (t, e) {
                if ("position" === t || "scale" === t || "origin" === t) {
                    if (e) {
                        var n = this[t];
                        n || (n = this[t] = []), n[0] = e[0], n[1] = e[1]
                    }
                } else this[t] = e
            },
            hide: function () {
                this.ignore = !0, this.__zr && this.__zr.refresh()
            },
            show: function () {
                this.ignore = !1, this.__zr && this.__zr.refresh()
            },
            attr: function (t, e) {
                if ("string" == typeof t) this.attrKV(t, e);
                else if (s.isObject(t))
                    for (var n in t) t.hasOwnProperty(n) && this.attrKV(n, t[n]);
                return this.dirty(!1), this
            },
            setClipPath: function (t) {
                var e = this.__zr;
                e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1)
            },
            removeClipPath: function () {
                var t = this.clipPath;
                t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1))
            },
            addSelfToZr: function (t) {
                this.__zr = t;
                var e = this.animators;
                if (e)
                    for (var n = 0; n < e.length; n++) t.animation.addAnimator(e[n]);
                this.clipPath && this.clipPath.addSelfToZr(t)
            },
            removeSelfFromZr: function (t) {
                this.__zr = null;
                var e = this.animators;
                if (e)
                    for (var n = 0; n < e.length; n++) t.animation.removeAnimator(e[n]);
                this.clipPath && this.clipPath.removeSelfFromZr(t)
            }
        }, s.mixin(l, o), s.mixin(l, a), s.mixin(l, r);
        var u = l;
        t.exports = u
    }, function (t, e, n) {
        function i(t) {
            return t > s || t < -s
        }
        var r = n(20),
            a = n(7),
            o = r.identity,
            s = 5e-5,
            l = function (t) {
                t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null
            },
            u = l.prototype;
        u.transform = null, u.needLocalTransform = function () {
            return i(this.rotation) || i(this.position[0]) || i(this.position[1]) || i(this.scale[0] - 1) || i(this.scale[1] - 1)
        };
        var c = [];
        u.updateTransform = function () {
            var t = this.parent,
                e = t && t.transform,
                n = this.needLocalTransform(),
                i = this.transform;
            if (!n && !e) return void(i && o(i));
            i = i || r.create(), n ? this.getLocalTransform(i) : o(i), e && (n ? r.mul(i, t.transform, i) : r.copy(i, t.transform)), this.transform = i;
            var a = this.globalScaleRatio;
            if (null != a && 1 !== a) {
                this.getGlobalScale(c);
                var s = c[0] < 0 ? -1 : 1,
                    l = c[1] < 0 ? -1 : 1,
                    u = ((c[0] - s) * a + s) / c[0] || 0,
                    h = ((c[1] - l) * a + l) / c[1] || 0;
                i[0] *= u, i[1] *= u, i[2] *= h, i[3] *= h
            }
            this.invTransform = this.invTransform || r.create(), r.invert(this.invTransform, i)
        }, u.getLocalTransform = function (t) {
            return l.getLocalTransform(this, t)
        }, u.setTransform = function (t) {
            var e = this.transform,
                n = t.dpr || 1;
            e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0)
        }, u.restoreTransform = function (t) {
            var e = t.dpr || 1;
            t.setTransform(e, 0, 0, e, 0, 0)
        };
        var h = [],
            d = r.create();
        u.setLocalTransform = function (t) {
            if (t) {
                var e = t[0] * t[0] + t[1] * t[1],
                    n = t[2] * t[2] + t[3] * t[3],
                    r = this.position,
                    a = this.scale;
                i(e - 1) && (e = Math.sqrt(e)), i(n - 1) && (n = Math.sqrt(n)), t[0] < 0 && (e = -e), t[3] < 0 && (n = -n), r[0] = t[4], r[1] = t[5], a[0] = e, a[1] = n, this.rotation = Math.atan2(-t[1] / n, t[0] / e)
            }
        }, u.decomposeTransform = function () {
            if (this.transform) {
                var t = this.parent,
                    e = this.transform;
                t && t.transform && (r.mul(h, t.invTransform, e), e = h);
                var n = this.origin;
                n && (n[0] || n[1]) && (d[4] = n[0], d[5] = n[1], r.mul(h, e, d), h[4] -= n[0], h[5] -= n[1], e = h), this.setLocalTransform(e)
            }
        }, u.getGlobalScale = function (t) {
            var e = this.transform;
            return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t)
        }, u.transformCoordToLocal = function (t, e) {
            var n = [t, e],
                i = this.invTransform;
            return i && a.applyTransform(n, n, i), n
        }, u.transformCoordToGlobal = function (t, e) {
            var n = [t, e],
                i = this.transform;
            return i && a.applyTransform(n, n, i), n
        }, l.getLocalTransform = function (t, e) {
            e = e || [], o(e);
            var n = t.origin,
                i = t.scale || [1, 1],
                a = t.rotation || 0,
                s = t.position || [0, 0];
            return n && (e[4] -= n[0], e[5] -= n[1]), r.scale(e, e, i), a && r.rotate(e, e, a), n && (e[4] += n[0], e[5] += n[1]), e[4] += s[0], e[5] += s[1], e
        };
        var f = l;
        t.exports = f
    }, function (t, e, n) {
        function i(t, e) {
            return t[e]
        }

        function r(t, e, n) {
            t[e] = n
        }

        function a(t, e, n) {
            return (e - t) * n + t
        }

        function o(t, e, n) {
            return n > .5 ? e : t
        }

        function s(t, e, n, i, r) {
            var o = t.length;
            if (1 === r)
                for (var s = 0; s < o; s++) i[s] = a(t[s], e[s], n);
            else
                for (var l = o && t[0].length, s = 0; s < o; s++)
                    for (var u = 0; u < l; u++) i[s][u] = a(t[s][u], e[s][u], n)
        }

        function l(t, e, n) {
            var i = t.length,
                r = e.length;
            if (i !== r) {
                if (i > r) t.length = r;
                else
                    for (var a = i; a < r; a++) t.push(1 === n ? e[a] : x.call(e[a]))
            }
            for (var o = t[0] && t[0].length, a = 0; a < t.length; a++)
                if (1 === n) isNaN(t[a]) && (t[a] = e[a]);
                else
                    for (var s = 0; s < o; s++) isNaN(t[a][s]) && (t[a][s] = e[a][s])
        }

        function u(t, e, n) {
            if (t === e) return !0;
            var i = t.length;
            if (i !== e.length) return !1;
            if (1 === n) {
                for (var r = 0; r < i; r++)
                    if (t[r] !== e[r]) return !1
            } else
                for (var a = t[0].length, r = 0; r < i; r++)
                    for (var o = 0; o < a; o++)
                        if (t[r][o] !== e[r][o]) return !1;
            return !0
        }

        function c(t, e, n, i, r, a, o, s, l) {
            var u = t.length;
            if (1 === l)
                for (var c = 0; c < u; c++) s[c] = h(t[c], e[c], n[c], i[c], r, a, o);
            else
                for (var d = t[0].length, c = 0; c < u; c++)
                    for (var f = 0; f < d; f++) s[c][f] = h(t[c][f], e[c][f], n[c][f], i[c][f], r, a, o)
        }

        function h(t, e, n, i, r, a, o) {
            var s = .5 * (n - t),
                l = .5 * (i - e);
            return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e
        }

        function d(t) {
            if (_(t)) {
                var e = t.length;
                if (_(t[0])) {
                    for (var n = [], i = 0; i < e; i++) n.push(x.call(t[i]));
                    return n
                }
                return x.call(t)
            }
            return t
        }

        function f(t) {
            return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
        }

        function p(t) {
            var e = t[t.length - 1].value;
            return _(e && e[0]) ? 2 : 1
        }

        function g(t, e, n, i, r, d) {
            var g = t._getter,
                y = t._setter,
                x = "spline" === e,
                b = i.length;
            if (b) {
                var w, S = i[0].value,
                    M = _(S),
                    T = !1,
                    A = !1,
                    C = M ? p(i) : 0;
                i.sort(function (t, e) {
                    return t.time - e.time
                }), w = i[b - 1].time;
                for (var I = [], D = [], k = i[0].value, O = !0, P = 0; P < b; P++) {
                    I.push(i[P].time / w);
                    var L = i[P].value;
                    if (M && u(L, k, C) || !M && L === k || (O = !1), k = L, "string" == typeof L) {
                        var E = m.parse(L);
                        E ? (L = E, T = !0) : A = !0
                    }
                    D.push(L)
                }
                if (d || !O) {
                    for (var R = D[b - 1], P = 0; P < b - 1; P++) M ? l(D[P], R, C) : !isNaN(D[P]) || isNaN(R) || A || T || (D[P] = R);
                    M && l(g(t._target, r), R, C);
                    var z, N, B, F, V, H, W = 0,
                        G = 0;
                    if (T) var j = [0, 0, 0, 0];
                    var U = function (t, e) {
                            var n;
                            if (e < 0) n = 0;
                            else if (e < G) {
                                for (z = Math.min(W + 1, b - 1), n = z; n >= 0 && !(I[n] <= e); n--);
                                n = Math.min(n, b - 2)
                            } else {
                                for (n = W; n < b && !(I[n] > e); n++);
                                n = Math.min(n - 1, b - 2)
                            }
                            W = n, G = e;
                            var i = I[n + 1] - I[n];
                            if (0 !== i)
                                if (N = (e - I[n]) / i, x)
                                    if (F = D[n], B = D[0 === n ? n : n - 1], V = D[n > b - 2 ? b - 1 : n + 1], H = D[n > b - 3 ? b - 1 : n + 2], M) c(B, F, V, H, N, N * N, N * N * N, g(t, r), C);
                                    else {
                                        var l;
                                        if (T) l = c(B, F, V, H, N, N * N, N * N * N, j, 1), l = f(j);
                                        else {
                                            if (A) return o(F, V, N);
                                            l = h(B, F, V, H, N, N * N, N * N * N)
                                        }
                                        y(t, r, l)
                                    }
                            else if (M) s(D[n], D[n + 1], N, g(t, r), C);
                            else {
                                var l;
                                if (T) s(D[n], D[n + 1], N, j, 1), l = f(j);
                                else {
                                    if (A) return o(D[n], D[n + 1], N);
                                    l = a(D[n], D[n + 1], N)
                                }
                                y(t, r, l)
                            }
                        },
                        Y = new v({
                            target: t._target,
                            life: w,
                            loop: t._loop,
                            delay: t._delay,
                            onframe: U,
                            ondestroy: n
                        });
                    return e && "spline" !== e && (Y.easing = e), Y
                }
            }
        }
        var v = n(188),
            m = n(36),
            y = n(0),
            _ = y.isArrayLike,
            x = Array.prototype.slice,
            b = function (t, e, n, a) {
                this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || i, this._setter = a || r, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
            };
        b.prototype = {
            when: function (t, e) {
                var n = this._tracks;
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        if (!n[i]) {
                            n[i] = [];
                            var r = this._getter(this._target, i);
                            if (null == r) continue;
                            0 !== t && n[i].push({
                                time: 0,
                                value: d(r)
                            })
                        }
                        n[i].push({
                            time: t,
                            value: e[i]
                        })
                    } return this
            },
            during: function (t) {
                return this._onframeList.push(t), this
            },
            pause: function () {
                for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
                this._paused = !0
            },
            resume: function () {
                for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
                this._paused = !1
            },
            isPaused: function () {
                return !!this._paused
            },
            _doneCallback: function () {
                this._tracks = {}, this._clipList.length = 0;
                for (var t = this._doneList, e = t.length, n = 0; n < e; n++) t[n].call(this)
            },
            start: function (t, e) {
                var n, i = this,
                    r = 0,
                    a = function () {
                        --r || i._doneCallback()
                    };
                for (var o in this._tracks)
                    if (this._tracks.hasOwnProperty(o)) {
                        var s = g(this, t, a, this._tracks[o], o, e);
                        s && (this._clipList.push(s), r++, this.animation && this.animation.addClip(s), n = s)
                    } if (n) {
                    var l = n.onframe;
                    n.onframe = function (t, e) {
                        l(t, e);
                        for (var n = 0; n < i._onframeList.length; n++) i._onframeList[n](t, e)
                    }
                }
                return r || this._doneCallback(), this
            },
            stop: function (t) {
                for (var e = this._clipList, n = this.animation, i = 0; i < e.length; i++) {
                    var r = e[i];
                    t && r.onframe(this._target, 1), n && n.removeClip(r)
                }
                e.length = 0
            },
            delay: function (t) {
                return this._delay = t, this
            },
            done: function (t) {
                return t && this._doneList.push(t), this
            },
            getClips: function () {
                return this._clipList
            }
        };
        var w = b;
        t.exports = w
    }, function (t, e) {
        var n = function () {
                this.head = null, this.tail = null, this._len = 0
            },
            i = n.prototype;
        i.insert = function (t) {
            var e = new r(t);
            return this.insertEntry(e), e
        }, i.insertEntry = function (t) {
            this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++
        }, i.remove = function (t) {
            var e = t.prev,
                n = t.next;
            e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, this._len--
        }, i.len = function () {
            return this._len
        }, i.clear = function () {
            this.head = this.tail = null, this._len = 0
        };
        var r = function (t) {
                this.value = t, this.next, this.prev
            },
            a = function (t) {
                this._list = new n, this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null
            },
            o = a.prototype;
        o.put = function (t, e) {
            var n = this._list,
                i = this._map,
                a = null;
            if (null == i[t]) {
                var o = n.len(),
                    s = this._lastRemovedEntry;
                if (o >= this._maxSize && o > 0) {
                    var l = n.head;
                    n.remove(l), delete i[l.key], a = l.value, this._lastRemovedEntry = l
                }
                s ? s.value = e : s = new r(e), s.key = t, n.insertEntry(s), i[t] = s
            }
            return a
        }, o.get = function (t) {
            var e = this._map[t],
                n = this._list;
            if (null != e) return e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value
        }, o.clear = function () {
            this._list.clear(), this._map = {}
        };
        var s = a;
        t.exports = s
    }, function (t, e, n) {
        var i = n(45),
            r = i.debugMode,
            a = function () {};
        1 === r && (a = console.error);
        var o = a;
        t.exports = o
    }, function (t, e) {
        function n(t, e, n) {
            return i.hasOwnProperty(e) ? n *= t.dpr : n
        }
        var i = {
            shadowBlur: 1,
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            textShadowBlur: 1,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1,
            textBoxShadowBlur: 1,
            textBoxShadowOffsetX: 1,
            textBoxShadowOffsetY: 1
        };
        t.exports = n
    }, function (t, e) {
        var n = function (t, e) {
            this.image = t, this.repeat = e, this.type = "pattern"
        };
        n.prototype.getCanvasPattern = function (t) {
            return t.createPattern(this.image, this.repeat || "repeat")
        };
        var i = n;
        t.exports = i
    }, function (t, e) {
        var n = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {
            setTimeout(t, 16)
        };
        t.exports = n
    }, function (t, e, n) {
        function i(t) {
            return r(t), M(t.rich, r), t
        }

        function r(t) {
            if (t) {
                t.font = I.makeFont(t);
                var e = t.textAlign;
                "middle" === e && (e = "center"), t.textAlign = null == e || z[e] ? e : "left";
                var n = t.textVerticalAlign || t.textBaseline;
                "center" === n && (n = "middle"), t.textVerticalAlign = null == n || N[n] ? n : "top";
                t.textPadding && (t.textPadding = T(t.textPadding))
            }
        }

        function a(t, e, n, i, r, a) {
            i.rich ? s(t, e, n, i, r, a) : o(t, e, n, i, r, a)
        }

        function o(t, e, n, i, r, a) {
            "use strict";
            var o, s = h(i),
                l = !1,
                c = e.__attrCachedBy === L.PLAIN_TEXT;
            a !== E ? (a && (o = a.style, l = !s && c && o), e.__attrCachedBy = s ? L.NONE : L.PLAIN_TEXT) : c && (e.__attrCachedBy = L.NONE);
            var f = i.font || R;
            l && f === (o.font || R) || (e.font = f);
            var g = t.__computedFont;
            t.__styleFont !== f && (t.__styleFont = f, g = t.__computedFont = e.font);
            var y = i.textPadding,
                x = i.textLineHeight,
                b = t.__textCotentBlock;
            b && !t.__dirtyText || (b = t.__textCotentBlock = I.parsePlainText(n, g, y, x, i.truncate));
            var w = b.outerHeight,
                S = b.lines,
                M = b.lineHeight,
                T = p(V, t, i, r),
                A = T.baseX,
                C = T.baseY,
                D = T.textAlign || "left",
                k = T.textVerticalAlign;
            u(e, i, r, A, C);
            var P = I.adjustTextY(C, w, k),
                z = A,
                N = P;
            if (s || y) {
                var F = I.getWidth(n, g),
                    H = F;
                y && (H += y[1] + y[3]);
                var W = I.adjustTextX(A, H, D);
                s && d(t, e, i, W, P, H, w), y && (z = _(A, D, y), N += y[0])
            }
            e.textAlign = D, e.textBaseline = "middle", e.globalAlpha = i.opacity || 1;
            for (var G = 0; G < B.length; G++) {
                var j = B[G],
                    U = j[0],
                    Y = j[1],
                    q = i[U];
                l && q === o[U] || (e[Y] = O(e, Y, q || j[2]))
            }
            N += M / 2;
            var X = i.textStrokeWidth,
                Z = l ? o.textStrokeWidth : null,
                $ = !l || X !== Z,
                K = !l || $ || i.textStroke !== o.textStroke,
                J = v(i.textStroke, X),
                Q = m(i.textFill);
            if (J && ($ && (e.lineWidth = X), K && (e.strokeStyle = J)), Q && (l && i.textFill === o.textFill || (e.fillStyle = Q)), 1 === S.length) J && e.strokeText(S[0], z, N), Q && e.fillText(S[0], z, N);
            else
                for (var G = 0; G < S.length; G++) J && e.strokeText(S[G], z, N), Q && e.fillText(S[G], z, N), N += M
        }

        function s(t, e, n, i, r, a) {
            a !== E && (e.__attrCachedBy = L.NONE);
            var o = t.__textCotentBlock;
            o && !t.__dirtyText || (o = t.__textCotentBlock = I.parseRichText(n, i)), l(t, e, o, i, r)
        }

        function l(t, e, n, i, r) {
            var a = n.width,
                o = n.outerWidth,
                s = n.outerHeight,
                l = i.textPadding,
                f = p(V, t, i, r),
                g = f.baseX,
                v = f.baseY,
                m = f.textAlign,
                y = f.textVerticalAlign;
            u(e, i, r, g, v);
            var _ = I.adjustTextX(g, o, m),
                x = I.adjustTextY(v, s, y),
                b = _,
                w = x;
            l && (b += l[3], w += l[0]);
            var S = b + a;
            h(i) && d(t, e, i, _, x, o, s);
            for (var M = 0; M < n.lines.length; M++) {
                for (var T, A = n.lines[M], C = A.tokens, D = C.length, k = A.lineHeight, O = A.width, P = 0, L = b, E = S, R = D - 1; P < D && (T = C[P], !T.textAlign || "left" === T.textAlign);) c(t, e, T, i, k, w, L, "left"), O -= T.width, L += T.width, P++;
                for (; R >= 0 && (T = C[R], "right" === T.textAlign);) c(t, e, T, i, k, w, E, "right"), O -= T.width, E -= T.width, R--;
                for (L += (a - (L - b) - (S - E) - O) / 2; P <= R;) T = C[P], c(t, e, T, i, k, w, L + T.width / 2, "center"), L += T.width, P++;
                w += k
            }
        }

        function u(t, e, n, i, r) {
            if (n && e.textRotation) {
                var a = e.textOrigin;
                "center" === a ? (i = n.width / 2 + n.x, r = n.height / 2 + n.y) : a && (i = a[0] + n.x, r = a[1] + n.y), t.translate(i, r), t.rotate(-e.textRotation), t.translate(-i, -r)
            }
        }

        function c(t, e, n, i, r, a, o, s) {
            var l = i.rich[n.styleName] || {};
            l.text = n.text;
            var u = n.textVerticalAlign,
                c = a + r / 2;
            "top" === u ? c = a + n.height / 2 : "bottom" === u && (c = a + r - n.height / 2), !n.isLineHolder && h(l) && d(t, e, l, "right" === s ? o - n.width : "center" === s ? o - n.width / 2 : o, c - n.height / 2, n.width, n.height);
            var f = n.textPadding;
            f && (o = _(o, s, f), c -= n.height / 2 - f[2] - n.textHeight / 2), g(e, "shadowBlur", S(l.textShadowBlur, i.textShadowBlur, 0)), g(e, "shadowColor", l.textShadowColor || i.textShadowColor || "transparent"), g(e, "shadowOffsetX", S(l.textShadowOffsetX, i.textShadowOffsetX, 0)), g(e, "shadowOffsetY", S(l.textShadowOffsetY, i.textShadowOffsetY, 0)), g(e, "textAlign", s), g(e, "textBaseline", "middle"), g(e, "font", n.font || R);
            var p = v(l.textStroke || i.textStroke, x),
                y = m(l.textFill || i.textFill),
                x = w(l.textStrokeWidth, i.textStrokeWidth);
            p && (g(e, "lineWidth", x), g(e, "strokeStyle", p), e.strokeText(n.text, o, c)), y && (g(e, "fillStyle", y), e.fillText(n.text, o, c))
        }

        function h(t) {
            return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor)
        }

        function d(t, e, n, i, r, a, o) {
            var s = n.textBackgroundColor,
                l = n.textBorderWidth,
                u = n.textBorderColor,
                c = A(s);
            if (g(e, "shadowBlur", n.textBoxShadowBlur || 0), g(e, "shadowColor", n.textBoxShadowColor || "transparent"), g(e, "shadowOffsetX", n.textBoxShadowOffsetX || 0), g(e, "shadowOffsetY", n.textBoxShadowOffsetY || 0), c || l && u) {
                e.beginPath();
                var h = n.textBorderRadius;
                h ? D.buildPath(e, {
                    x: i,
                    y: r,
                    width: a,
                    height: o,
                    r: h
                }) : e.rect(i, r, a, o), e.closePath()
            }
            if (c)
                if (g(e, "fillStyle", s), null != n.fillOpacity) {
                    var d = e.globalAlpha;
                    e.globalAlpha = n.fillOpacity * n.opacity, e.fill(), e.globalAlpha = d
                } else e.fill();
            else if (C(s)) {
                var p = s.image;
                p = k.createOrUpdateImage(p, null, t, f, s), p && k.isImageReady(p) && e.drawImage(p, i, r, a, o)
            }
            if (l && u)
                if (g(e, "lineWidth", l), g(e, "strokeStyle", u), null != n.strokeOpacity) {
                    var d = e.globalAlpha;
                    e.globalAlpha = n.strokeOpacity * n.opacity, e.stroke(), e.globalAlpha = d
                } else e.stroke()
        }

        function f(t, e) {
            e.image = t
        }

        function p(t, e, n, i) {
            var r = n.x || 0,
                a = n.y || 0,
                o = n.textAlign,
                s = n.textVerticalAlign;
            if (i) {
                var l = n.textPosition;
                if (l instanceof Array) r = i.x + y(l[0], i.width), a = i.y + y(l[1], i.height);
                else {
                    var u = e && e.calculateTextPosition ? e.calculateTextPosition(F, n, i) : I.calculateTextPosition(F, n, i);
                    r = u.x, a = u.y, o = o || u.textAlign, s = s || u.textVerticalAlign
                }
                var c = n.textOffset;
                c && (r += c[0], a += c[1])
            }
            return t = t || {}, t.baseX = r, t.baseY = a, t.textAlign = o, t.textVerticalAlign = s, t
        }

        function g(t, e, n) {
            return t[e] = O(t, e, n), t[e]
        }

        function v(t, e) {
            return null == t || e <= 0 || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
        }

        function m(t) {
            return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
        }

        function y(t, e) {
            return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
        }

        function _(t, e, n) {
            return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3]
        }

        function x(t, e) {
            return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding)
        }
        var b = n(0),
            w = b.retrieve2,
            S = b.retrieve3,
            M = b.each,
            T = b.normalizeCssArray,
            A = b.isString,
            C = b.isObject,
            I = n(16),
            D = n(112),
            k = n(71),
            O = n(108),
            P = n(46),
            L = P.ContextCachedBy,
            E = P.WILL_BE_RESTORED,
            R = I.DEFAULT_FONT,
            z = {
                left: 1,
                right: 1,
                center: 1
            },
            N = {
                top: 1,
                bottom: 1,
                middle: 1
            },
            B = [
                ["textShadowBlur", "shadowBlur", 0],
                ["textShadowOffsetX", "shadowOffsetX", 0],
                ["textShadowOffsetY", "shadowOffsetY", 0],
                ["textShadowColor", "shadowColor", "transparent"]
            ],
            F = {},
            V = {};
        e.normalizeTextStyle = i, e.renderText = a, e.getStroke = v, e.getFill = m, e.parsePercent = y, e.needDrawText = x
    }, function (t, e) {
        function n(t, e) {
            var n, i, r, a, o = e.x,
                s = e.y,
                l = e.width,
                u = e.height,
                c = e.r;
            l < 0 && (o += l, l = -l), u < 0 && (s += u, u = -u), "number" == typeof c ? n = i = r = a = c : c instanceof Array ? 1 === c.length ? n = i = r = a = c[0] : 2 === c.length ? (n = r = c[0], i = a = c[1]) : 3 === c.length ? (n = c[0], i = a = c[1], r = c[2]) : (n = c[0], i = c[1], r = c[2], a = c[3]) : n = i = r = a = 0;
            var h;
            n + i > l && (h = n + i, n *= l / h, i *= l / h), r + a > l && (h = r + a, r *= l / h, a *= l / h), i + r > u && (h = i + r, i *= u / h, r *= u / h), n + a > u && (h = n + a, n *= u / h, a *= u / h), t.moveTo(o + n, s), t.lineTo(o + l - i, s), 0 !== i && t.arc(o + l - i, s + i, i, -Math.PI / 2, 0), t.lineTo(o + l, s + u - r), 0 !== r && t.arc(o + l - r, s + u - r, r, 0, Math.PI / 2), t.lineTo(o + a, s + u), 0 !== a && t.arc(o + a, s + u - a, a, Math.PI / 2, Math.PI), t.lineTo(o, s + n), 0 !== n && t.arc(o + n, s + n, n, Math.PI, 1.5 * Math.PI)
        }
        e.buildPath = n
    }, function (t, e, n) {
        function i(t, e) {
            if (e) {
                var n = e.seiresIndex,
                    i = e.seriesId,
                    r = e.seriesName;
                return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r
            }
        }

        function r(t, e) {
            var n = t.color && !t.colorLayer;
            d(e, function (e, i) {
                "colorLayer" === i && n || C.hasClass(i) || ("object" == typeof e ? t[i] = t[i] ? w(t[i], e, !1) : b(e) : null == t[i] && (t[i] = e))
            })
        }

        function a(t) {
            t = t, this.option = {}, this.option[P] = 1, this._componentsMap = _({
                series: []
            }), this._seriesIndices, this._seriesIndicesMap, r(t, this._theme.option), w(t, I, !1), this.mergeOption(t)
        }

        function o(t, e) {
            g(e) || (e = e ? [e] : []);
            var n = {};
            return d(e, function (e) {
                n[e] = (t.get(e) || []).slice()
            }), n
        }

        function s(t, e, n) {
            return e.type ? e.type : n ? n.subType : C.determineSubType(t, e)
        }

        function l(t, e) {
            t._seriesIndicesMap = _(t._seriesIndices = p(e, function (t) {
                return t.componentIndex
            }) || [])
        }

        function u(t, e) {
            return e.hasOwnProperty("subType") ? f(t, function (t) {
                return t.subType === e.subType
            }) : t
        }
        var c = n(4),
            h = (c.__DEV__, n(0)),
            d = h.each,
            f = h.filter,
            p = h.map,
            g = h.isArray,
            v = h.indexOf,
            m = h.isObject,
            y = h.isString,
            _ = h.createHashMap,
            x = h.assert,
            b = h.clone,
            w = h.merge,
            S = h.extend,
            M = h.mixin,
            T = n(1),
            A = n(12),
            C = n(13),
            I = n(215),
            D = n(126),
            k = n(51),
            O = k.resetSourceDefaulter,
            P = "\0_ec_inner",
            L = A.extend({
                init: function (t, e, n, i) {
                    n = n || {}, this.option = null, this._theme = new A(n), this._optionManager = i
                },
                setOption: function (t, e) {
                    x(!(P in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null)
                },
                resetOption: function (t) {
                    var e = !1,
                        n = this._optionManager;
                    if (!t || "recreate" === t) {
                        var i = n.mountOption("recreate" === t);
                        this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : a.call(this, i), e = !0
                    }
                    if ("timeline" !== t && "media" !== t || this.restoreData(), !t || "recreate" === t || "timeline" === t) {
                        var r = n.getTimelineOption(this);
                        r && (this.mergeOption(r), e = !0)
                    }
                    if (!t || "recreate" === t || "media" === t) {
                        var o = n.getMediaOption(this, this._api);
                        o.length && d(o, function (t) {
                            this.mergeOption(t, e = !0)
                        }, this)
                    }
                    return e
                },
                mergeOption: function (t) {
                    function e(e, r) {
                        var a = T.normalizeToArray(t[e]),
                            u = T.mappingToExists(i.get(e), a);
                        T.makeIdAndName(u), d(u, function (t, n) {
                            var i = t.option;
                            m(i) && (t.keyInfo.mainType = e, t.keyInfo.subType = s(e, i, t.exist))
                        });
                        var c = o(i, r);
                        n[e] = [], i.set(e, []), d(u, function (t, r) {
                            var a = t.exist,
                                o = t.option;
                            if (x(m(o) || a, "Empty component definition"), o) {
                                var s = C.getClass(e, t.keyInfo.subType, !0);
                                if (a && a instanceof s) a.name = t.keyInfo.name, a.mergeOption(o, this), a.optionUpdated(o, !1);
                                else {
                                    var l = S({
                                        dependentModels: c,
                                        componentIndex: r
                                    }, t.keyInfo);
                                    a = new s(o, this, this, l), S(a, l), a.init(o, this, this, l), a.optionUpdated(null, !0)
                                }
                            } else a.mergeOption({}, this), a.optionUpdated({}, !1);
                            i.get(e)[r] = a, n[e][r] = a.option
                        }, this), "series" === e && l(this, i.get("series"))
                    }
                    var n = this.option,
                        i = this._componentsMap,
                        r = [];
                    O(this), d(t, function (t, e) {
                        null != t && (C.hasClass(e) ? e && r.push(e) : n[e] = null == n[e] ? b(t) : w(n[e], t, !0))
                    }), C.topologicalTravel(r, C.getAllClassMainTypes(), e, this), this._seriesIndicesMap = _(this._seriesIndices = this._seriesIndices || [])
                },
                getOption: function () {
                    var t = b(this.option);
                    return d(t, function (e, n) {
                        if (C.hasClass(n)) {
                            for (var e = T.normalizeToArray(e), i = e.length - 1; i >= 0; i--) T.isIdInner(e[i]) && e.splice(i, 1);
                            t[n] = e
                        }
                    }), delete t[P], t
                },
                getTheme: function () {
                    return this._theme
                },
                getComponent: function (t, e) {
                    var n = this._componentsMap.get(t);
                    if (n) return n[e || 0]
                },
                queryComponents: function (t) {
                    var e = t.mainType;
                    if (!e) return [];
                    var n = t.index,
                        i = t.id,
                        r = t.name,
                        a = this._componentsMap.get(e);
                    if (!a || !a.length) return [];
                    var o;
                    if (null != n) g(n) || (n = [n]), o = f(p(n, function (t) {
                        return a[t]
                    }), function (t) {
                        return !!t
                    });
                    else if (null != i) {
                        var s = g(i);
                        o = f(a, function (t) {
                            return s && v(i, t.id) >= 0 || !s && t.id === i
                        })
                    } else if (null != r) {
                        var l = g(r);
                        o = f(a, function (t) {
                            return l && v(r, t.name) >= 0 || !l && t.name === r
                        })
                    } else o = a.slice();
                    return u(o, t)
                },
                findComponents: function (t) {
                    var e = t.query,
                        n = t.mainType,
                        i = function (t) {
                            var e = n + "Index",
                                i = n + "Id",
                                r = n + "Name";
                            return !t || null == t[e] && null == t[i] && null == t[r] ? null : {
                                mainType: n,
                                index: t[e],
                                id: t[i],
                                name: t[r]
                            }
                        }(e),
                        r = i ? this.queryComponents(i) : this._componentsMap.get(n);
                    return function (e) {
                        return t.filter ? f(e, t.filter) : e
                    }(u(r, t))
                },
                eachComponent: function (t, e, n) {
                    var i = this._componentsMap;
                    if ("function" == typeof t) n = e, e = t, i.each(function (t, i) {
                        d(t, function (t, r) {
                            e.call(n, i, t, r)
                        })
                    });
                    else if (y(t)) d(i.get(t), e, n);
                    else if (m(t)) {
                        var r = this.findComponents(t);
                        d(r, e, n)
                    }
                },
                getSeriesByName: function (t) {
                    var e = this._componentsMap.get("series");
                    return f(e, function (e) {
                        return e.name === t
                    })
                },
                getSeriesByIndex: function (t) {
                    return this._componentsMap.get("series")[t]
                },
                getSeriesByType: function (t) {
                    var e = this._componentsMap.get("series");
                    return f(e, function (e) {
                        return e.subType === t
                    })
                },
                getSeries: function () {
                    return this._componentsMap.get("series").slice()
                },
                getSeriesCount: function () {
                    return this._componentsMap.get("series").length
                },
                eachSeries: function (t, e) {
                    d(this._seriesIndices, function (n) {
                        var i = this._componentsMap.get("series")[n];
                        t.call(e, i, n)
                    }, this)
                },
                eachRawSeries: function (t, e) {
                    d(this._componentsMap.get("series"), t, e)
                },
                eachSeriesByType: function (t, e, n) {
                    d(this._seriesIndices, function (i) {
                        var r = this._componentsMap.get("series")[i];
                        r.subType === t && e.call(n, r, i)
                    }, this)
                },
                eachRawSeriesByType: function (t, e, n) {
                    return d(this.getSeriesByType(t), e, n)
                },
                isSeriesFiltered: function (t) {
                    return null == this._seriesIndicesMap.get(t.componentIndex)
                },
                getCurrentSeriesIndices: function () {
                    return (this._seriesIndices || []).slice()
                },
                filterSeries: function (t, e) {
                    l(this, f(this._componentsMap.get("series"), t, e))
                },
                restoreData: function (t) {
                    var e = this._componentsMap;
                    l(this, e.get("series"));
                    var n = [];
                    e.each(function (t, e) {
                        n.push(e)
                    }), C.topologicalTravel(n, C.getAllClassMainTypes(), function (n, r) {
                        d(e.get(n), function (e) {
                            ("series" !== n || !i(e, t)) && e.restoreData()
                        })
                    })
                }
            });
        M(L, D);
        var E = L;
        t.exports = E
    }, function (t, e, n) {
        function i(t, e, n, i, r, a, o, s, l, u, c) {
            var h = l * (g / 180),
                v = p(h) * (t - n) / 2 + f(h) * (e - i) / 2,
                _ = -1 * f(h) * (t - n) / 2 + p(h) * (e - i) / 2,
                x = v * v / (o * o) + _ * _ / (s * s);
            x > 1 && (o *= d(x), s *= d(x));
            var b = (r === a ? -1 : 1) * d((o * o * (s * s) - o * o * (_ * _) - s * s * (v * v)) / (o * o * (_ * _) + s * s * (v * v))) || 0,
                w = b * o * _ / s,
                S = b * -s * v / o,
                M = (t + n) / 2 + p(h) * w - f(h) * S,
                T = (e + i) / 2 + f(h) * w + p(h) * S,
                A = y([1, 0], [(v - w) / o, (_ - S) / s]),
                C = [(v - w) / o, (_ - S) / s],
                I = [(-1 * v - w) / o, (-1 * _ - S) / s],
                D = y(C, I);
            m(C, I) <= -1 && (D = g), m(C, I) >= 1 && (D = 0), 0 === a && D > 0 && (D -= 2 * g), 1 === a && D < 0 && (D += 2 * g), c.addData(u, M, T, o, s, A, D, h, a)
        }

        function r(t) {
            if (!t) return new c;
            for (var e, n = 0, r = 0, a = n, o = r, s = new c, l = c.CMD, u = t.match(_), h = 0; h < u.length; h++) {
                for (var d, f = u[h], p = f.charAt(0), g = f.match(x) || [], v = g.length, m = 0; m < v; m++) g[m] = parseFloat(g[m]);
                for (var y = 0; y < v;) {
                    var b, w, S, M, T, A, C, I = n,
                        D = r;
                    switch (p) {
                        case "l":
                            n += g[y++], r += g[y++], d = l.L, s.addData(d, n, r);
                            break;
                        case "L":
                            n = g[y++], r = g[y++], d = l.L, s.addData(d, n, r);
                            break;
                        case "m":
                            n += g[y++], r += g[y++], d = l.M, s.addData(d, n, r), a = n, o = r, p = "l";
                            break;
                        case "M":
                            n = g[y++], r = g[y++], d = l.M, s.addData(d, n, r), a = n, o = r, p = "L";
                            break;
                        case "h":
                            n += g[y++], d = l.L, s.addData(d, n, r);
                            break;
                        case "H":
                            n = g[y++], d = l.L, s.addData(d, n, r);
                            break;
                        case "v":
                            r += g[y++], d = l.L, s.addData(d, n, r);
                            break;
                        case "V":
                            r = g[y++], d = l.L, s.addData(d, n, r);
                            break;
                        case "C":
                            d = l.C, s.addData(d, g[y++], g[y++], g[y++], g[y++], g[y++], g[y++]), n = g[y - 2], r = g[y - 1];
                            break;
                        case "c":
                            d = l.C, s.addData(d, g[y++] + n, g[y++] + r, g[y++] + n, g[y++] + r, g[y++] + n, g[y++] + r), n += g[y - 2], r += g[y - 1];
                            break;
                        case "S":
                            b = n, w = r;
                            var k = s.len(),
                                O = s.data;
                            e === l.C && (b += n - O[k - 4], w += r - O[k - 3]), d = l.C, I = g[y++], D = g[y++], n = g[y++], r = g[y++], s.addData(d, b, w, I, D, n, r);
                            break;
                        case "s":
                            b = n, w = r;
                            var k = s.len(),
                                O = s.data;
                            e === l.C && (b += n - O[k - 4], w += r - O[k - 3]), d = l.C, I = n + g[y++], D = r + g[y++], n += g[y++], r += g[y++], s.addData(d, b, w, I, D, n, r);
                            break;
                        case "Q":
                            I = g[y++], D = g[y++], n = g[y++], r = g[y++], d = l.Q, s.addData(d, I, D, n, r);
                            break;
                        case "q":
                            I = g[y++] + n, D = g[y++] + r, n += g[y++], r += g[y++], d = l.Q, s.addData(d, I, D, n, r);
                            break;
                        case "T":
                            b = n, w = r;
                            var k = s.len(),
                                O = s.data;
                            e === l.Q && (b += n - O[k - 4], w += r - O[k - 3]), n = g[y++], r = g[y++], d = l.Q, s.addData(d, b, w, n, r);
                            break;
                        case "t":
                            b = n, w = r;
                            var k = s.len(),
                                O = s.data;
                            e === l.Q && (b += n - O[k - 4], w += r - O[k - 3]), n += g[y++], r += g[y++], d = l.Q, s.addData(d, b, w, n, r);
                            break;
                        case "A":
                            S = g[y++], M = g[y++], T = g[y++], A = g[y++], C = g[y++], I = n, D = r, n = g[y++], r = g[y++], d = l.A, i(I, D, n, r, A, C, S, M, T, d, s);
                            break;
                        case "a":
                            S = g[y++], M = g[y++], T = g[y++], A = g[y++], C = g[y++], I = n, D = r, n += g[y++], r += g[y++], d = l.A, i(I, D, n, r, A, C, S, M, T, d, s)
                    }
                }
                "z" !== p && "Z" !== p || (d = l.Z, s.addData(d), n = a, r = o), e = d
            }
            return s.toStatic(), s
        }

        function a(t, e) {
            var n = r(t);
            return e = e || {}, e.buildPath = function (t) {
                if (t.setData) {
                    t.setData(n.data);
                    var e = t.getContext();
                    e && t.rebuildPath(e)
                } else {
                    var e = t;
                    n.rebuildPath(e)
                }
            }, e.applyTransform = function (t) {
                h(n, t), this.dirty(!0)
            }, e
        }

        function o(t, e) {
            return new u(a(t, e))
        }

        function s(t, e) {
            return u.extend(a(t, e))
        }

        function l(t, e) {
            for (var n = [], i = t.length, r = 0; r < i; r++) {
                var a = t[r];
                a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), n.push(a.path)
            }
            var o = new u(e);
            return o.createPathProxy(), o.buildPath = function (t) {
                t.appendPath(n);
                var e = t.getContext();
                e && t.rebuildPath(e)
            }, o
        }
        var u = n(6),
            c = n(49),
            h = n(203),
            d = Math.sqrt,
            f = Math.sin,
            p = Math.cos,
            g = Math.PI,
            v = function (t) {
                return Math.sqrt(t[0] * t[0] + t[1] * t[1])
            },
            m = function (t, e) {
                return (t[0] * e[0] + t[1] * e[1]) / (v(t) * v(e))
            },
            y = function (t, e) {
                return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(m(t, e))
            },
            _ = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
            x = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
        e.createFromString = o, e.extendFromString = s, e.mergePath = l
    }, function (t, e, n) {
        function i(t, e, n) {
            if (0 !== t.length) {
                var i, r = t[0],
                    a = r[0],
                    o = r[0],
                    s = r[1],
                    l = r[1];
                for (i = 1; i < t.length; i++) r = t[i], a = c(a, r[0]), o = h(o, r[0]), s = c(s, r[1]), l = h(l, r[1]);
                e[0] = a, e[1] = s, n[0] = o, n[1] = l
            }
        }

        function r(t, e, n, i, r, a) {
            r[0] = c(t, n), r[1] = c(e, i), a[0] = h(t, n), a[1] = h(e, i)
        }

        function a(t, e, n, i, r, a, o, s, l, d) {
            var f, p = u.cubicExtrema,
                g = u.cubicAt,
                v = p(t, n, r, o, y);
            for (l[0] = 1 / 0, l[1] = 1 / 0, d[0] = -1 / 0, d[1] = -1 / 0, f = 0; f < v; f++) {
                var m = g(t, n, r, o, y[f]);
                l[0] = c(m, l[0]), d[0] = h(m, d[0])
            }
            for (v = p(e, i, a, s, _), f = 0; f < v; f++) {
                var x = g(e, i, a, s, _[f]);
                l[1] = c(x, l[1]), d[1] = h(x, d[1])
            }
            l[0] = c(t, l[0]), d[0] = h(t, d[0]), l[0] = c(o, l[0]), d[0] = h(o, d[0]), l[1] = c(e, l[1]), d[1] = h(e, d[1]), l[1] = c(s, l[1]), d[1] = h(s, d[1])
        }

        function o(t, e, n, i, r, a, o, s) {
            var l = u.quadraticExtremum,
                d = u.quadraticAt,
                f = h(c(l(t, n, r), 1), 0),
                p = h(c(l(e, i, a), 1), 0),
                g = d(t, n, r, f),
                v = d(e, i, a, p);
            o[0] = c(t, r, g), o[1] = c(e, a, v), s[0] = h(t, r, g), s[1] = h(e, a, v)
        }

        function s(t, e, n, i, r, a, o, s, u) {
            var c = l.min,
                h = l.max,
                y = Math.abs(r - a);
            if (y % p < 1e-4 && y > 1e-4) return s[0] = t - n, s[1] = e - i, u[0] = t + n, void(u[1] = e + i);
            if (g[0] = f(r) * n + t, g[1] = d(r) * i + e, v[0] = f(a) * n + t, v[1] = d(a) * i + e, c(s, g, v), h(u, g, v), r %= p, r < 0 && (r += p), a %= p, a < 0 && (a += p), r > a && !o ? a += p : r < a && o && (r += p), o) {
                var _ = a;
                a = r, r = _
            }
            for (var x = 0; x < a; x += Math.PI / 2) x > r && (m[0] = f(x) * n + t, m[1] = d(x) * i + e, c(s, m, s), h(u, m, u))
        }
        var l = n(7),
            u = n(26),
            c = Math.min,
            h = Math.max,
            d = Math.sin,
            f = Math.cos,
            p = 2 * Math.PI,
            g = l.create(),
            v = l.create(),
            m = l.create(),
            y = [],
            _ = [];
        e.fromPoints = i, e.fromLine = r, e.fromCubic = a, e.fromQuadratic = o, e.fromArc = s
    }, function (t, e) {
        function n(t) {
            return t %= i, t < 0 && (t += i), t
        }
        var i = 2 * Math.PI;
        e.normalizeRadian = n
    }, function (t, e) {
        function n(t, e, n, i, r, a) {
            if (a > e && a > i || a < e && a < i) return 0;
            if (i === e) return 0;
            var o = i < e ? 1 : -1,
                s = (a - e) / (i - e);
            1 !== s && 0 !== s || (o = i < e ? .5 : -.5);
            var l = s * (n - t) + t;
            return l === r ? 1 / 0 : l > r ? o : 0
        }
        t.exports = n
    }, function (t, e, n) {
        var i = n(6),
            r = i.extend({
                type: "circle",
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 0
                },
                buildPath: function (t, e, n) {
                    n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0)
                }
            });
        t.exports = r
    }, function (t, e, n) {
        function i(t) {
            return r.browser.ie && r.browser.version >= 11 ? function () {
                var e, n = this.__clipPaths,
                    i = this.style;
                if (n)
                    for (var r = 0; r < n.length; r++) {
                        var o = n[r],
                            s = o && o.shape,
                            l = o && o.type;
                        if (s && ("sector" === l && s.startAngle === s.endAngle || "rect" === l && (!s.width || !s.height))) {
                            for (var u = 0; u < a.length; u++) a[u][2] = i[a[u][0]], i[a[u][0]] = a[u][1];
                            e = !0;
                            break
                        }
                    }
                if (t.apply(this, arguments), e)
                    for (var u = 0; u < a.length; u++) i[a[u][0]] = a[u][2]
            } : t
        }
        var r = n(8),
            a = [
                ["shadowBlur", 0],
                ["shadowColor", "#000"],
                ["shadowOffsetX", 0],
                ["shadowOffsetY", 0]
            ];
        t.exports = i
    }, function (t, e, n) {
        var i = n(6),
            r = n(121),
            a = i.extend({
                type: "polygon",
                shape: {
                    points: null,
                    smooth: !1,
                    smoothConstraint: null
                },
                buildPath: function (t, e) {
                    r.buildPath(t, e, !0)
                }
            });
        t.exports = a
    }, function (t, e, n) {
        function i(t, e, n) {
            var i = e.points,
                o = e.smooth;
            if (i && i.length >= 2) {
                if (o && "spline" !== o) {
                    var s = a(i, o, n, e.smoothConstraint);
                    t.moveTo(i[0][0], i[0][1]);
                    for (var l = i.length, u = 0; u < (n ? l : l - 1); u++) {
                        var c = s[2 * u],
                            h = s[2 * u + 1],
                            d = i[(u + 1) % l];
                        t.bezierCurveTo(c[0], c[1], h[0], h[1], d[0], d[1])
                    }
                } else {
                    "spline" === o && (i = r(i, n)), t.moveTo(i[0][0], i[0][1]);
                    for (var u = 1, f = i.length; u < f; u++) t.lineTo(i[u][0], i[u][1])
                }
                n && t.closePath()
            }
        }
        var r = n(206),
            a = n(207);
        e.buildPath = i
    }, function (t, e, n) {
        var i = n(6),
            r = n(121),
            a = i.extend({
                type: "polyline",
                shape: {
                    points: null,
                    smooth: !1,
                    smoothConstraint: null
                },
                style: {
                    stroke: "#000",
                    fill: null
                },
                buildPath: function (t, e) {
                    r.buildPath(t, e, !1)
                }
            });
        t.exports = a
    }, function (t, e, n) {
        var i = n(6),
            r = n(112),
            a = n(73),
            o = a.subPixelOptimizeRect,
            s = {},
            l = i.extend({
                type: "rect",
                shape: {
                    r: 0,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                buildPath: function (t, e) {
                    var n, i, a, l;
                    this.subPixelOptimize ? (o(s, e, this.style), n = s.x, i = s.y, a = s.width, l = s.height, s.r = e.r, e = s) : (n = e.x, i = e.y, a = e.width, l = e.height), e.r ? r.buildPath(t, e) : t.rect(n, i, a, l), t.closePath()
                }
            });
        t.exports = l
    }, function (t, e, n) {
        var i = n(6),
            r = n(73),
            a = r.subPixelOptimizeLine,
            o = {},
            s = i.extend({
                type: "line",
                shape: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0,
                    percent: 1
                },
                style: {
                    stroke: "#000",
                    fill: null
                },
                buildPath: function (t, e) {
                    var n, i, r, s;
                    this.subPixelOptimize ? (a(o, e, this.style), n = o.x1, i = o.y1, r = o.x2, s = o.y2) : (n = e.x1, i = e.y1, r = e.x2, s = e.y2);
                    var l = e.percent;
                    0 !== l && (t.moveTo(n, i), l < 1 && (r = n * (1 - l) + r * l, s = i * (1 - l) + s * l), t.lineTo(r, s))
                },
                pointAt: function (t) {
                    var e = this.shape;
                    return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t]
                }
            });
        t.exports = s
    }, function (t, e, n) {
        var i = n(0),
            r = n(74),
            a = function (t, e, n, i, a, o) {
                this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, this.y2 = null == i ? 0 : i, this.type = "linear", this.global = o || !1, r.call(this, a)
            };
        a.prototype = {
            constructor: a
        }, i.inherits(a, r);
        var o = a;
        t.exports = o
    }, function (t, e, n) {
        function i(t, e) {
            for (var n = t.length, i = 0; i < n; i++)
                if (t[i].length > e) return t[i];
            return t[n - 1]
        }
        var r = n(1),
            a = r.makeInner,
            o = r.normalizeToArray,
            s = a(),
            l = {
                clearColorPalette: function () {
                    s(this).colorIdx = 0, s(this).colorNameMap = {}
                },
                getColorFromPalette: function (t, e, n) {
                    e = e || this;
                    var r = s(e),
                        a = r.colorIdx || 0,
                        l = r.colorNameMap = r.colorNameMap || {};
                    if (l.hasOwnProperty(t)) return l[t];
                    var u = o(this.get("color", !0)),
                        c = this.get("colorLayer", !0),
                        h = null != n && c ? i(c, n) : u;
                    if ((h = h || u) && h.length) {
                        var d = h[a];
                        return t && (l[t] = d), r.colorIdx = (a + 1) % h.length, d
                    }
                }
            };
        t.exports = l
    }, function (t, e, n) {
        function i(t) {
            var e = t.get("coordinateSystem"),
                n = {
                    coordSysName: e,
                    coordSysDims: [],
                    axisMap: s(),
                    categoryAxisMap: s()
                },
                i = u[e];
            if (i) return i(t, n, n.axisMap, n.categoryAxisMap), n
        }

        function r(t) {
            return "category" === t.get("type")
        }
        var a = n(4),
            o = (a.__DEV__, n(0)),
            s = o.createHashMap,
            l = (o.retrieve, o.each),
            u = {
                cartesian2d: function (t, e, n, i) {
                    var a = t.getReferringComponents("xAxis")[0],
                        o = t.getReferringComponents("yAxis")[0];
                    e.coordSysDims = ["x", "y"], n.set("x", a), n.set("y", o), r(a) && (i.set("x", a), e.firstCategoryDimIndex = 0), r(o) && (i.set("y", o), e.firstCategoryDimIndex = 1)
                },
                singleAxis: function (t, e, n, i) {
                    var a = t.getReferringComponents("singleAxis")[0];
                    e.coordSysDims = ["single"], n.set("single", a), r(a) && (i.set("single", a), e.firstCategoryDimIndex = 0)
                },
                polar: function (t, e, n, i) {
                    var a = t.getReferringComponents("polar")[0],
                        o = a.findAxisModel("radiusAxis"),
                        s = a.findAxisModel("angleAxis");
                    e.coordSysDims = ["radius", "angle"], n.set("radius", o), n.set("angle", s), r(o) && (i.set("radius", o), e.firstCategoryDimIndex = 0), r(s) && (i.set("angle", s), e.firstCategoryDimIndex = 1)
                },
                geo: function (t, e, n, i) {
                    e.coordSysDims = ["lng", "lat"]
                },
                parallel: function (t, e, n, i) {
                    var a = t.ecModel,
                        o = a.getComponent("parallel", t.get("parallelIndex")),
                        s = e.coordSysDims = o.dimensions.slice();
                    l(o.parallelAxisIndex, function (t, o) {
                        var l = a.getComponent("parallelAxis", t),
                            u = s[o];
                        n.set(u, l), r(l) && null == e.firstCategoryDimIndex && (i.set(u, l), e.firstCategoryDimIndex = o)
                    })
                }
            };
        e.getCoordSysDefineBySeries = i
    }, function (t, e, n) {
        function i(t) {
            r.each(a, function (e) {
                this[e] = r.bind(t[e], t)
            }, this)
        }
        var r = n(0),
            a = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"],
            o = i;
        t.exports = o
    }, function (t, e, n) {
        var i = n(35),
            r = n(50),
            a = n(17),
            o = function () {
                this.group = new i, this.uid = r.getUID("viewComponent")
            };
        o.prototype = {
            constructor: o,
            init: function (t, e) {},
            render: function (t, e, n, i) {},
            dispose: function () {},
            filterForExposedEvent: null
        };
        var s = o.prototype;
        s.updateView = s.updateLayout = s.updateVisual = function (t, e, n, i) {}, a.enableClassExtend(o), a.enableClassManagement(o, {
            registerWhenExtend: !0
        });
        var l = o;
        t.exports = l
    }, function (t, e) {
        var n = {
            legend: {
                selector: {
                    all: "全选",
                    inverse: "反选"
                }
            },
            toolbox: {
                brush: {
                    title: {
                        rect: "矩形选择",
                        polygon: "圈选",
                        lineX: "横向选择",
                        lineY: "纵向选择",
                        keep: "保持选择",
                        clear: "清除选择"
                    }
                },
                dataView: {
                    title: "数据视图",
                    lang: ["数据视图", "关闭", "刷新"]
                },
                dataZoom: {
                    title: {
                        zoom: "区域缩放",
                        back: "区域缩放还原"
                    }
                },
                magicType: {
                    title: {
                        line: "切换为折线图",
                        bar: "切换为柱状图",
                        stack: "切换为堆叠",
                        tiled: "切换为平铺"
                    }
                },
                restore: {
                    title: "还原"
                },
                saveAsImage: {
                    title: "保存为图片",
                    lang: ["右键另存为图片"]
                }
            },
            series: {
                typeNames: {
                    pie: "饼图",
                    bar: "柱状图",
                    line: "折线图",
                    scatter: "散点图",
                    effectScatter: "涟漪散点图",
                    radar: "雷达图",
                    tree: "树图",
                    treemap: "矩形树图",
                    boxplot: "箱型图",
                    candlestick: "K线图",
                    k: "K线图",
                    heatmap: "热力图",
                    map: "地图",
                    parallel: "平行坐标图",
                    lines: "线图",
                    graph: "关系图",
                    sankey: "桑基图",
                    funnel: "漏斗图",
                    gauge: "仪表盘图",
                    pictorialBar: "象形柱图",
                    themeRiver: "主题河流图",
                    sunburst: "旭日图"
                }
            },
            aria: {
                general: {
                    withTitle: "这是一个关于“{title}”的图表。",
                    withoutTitle: "这是一个图表，"
                },
                series: {
                    single: {
                        prefix: "",
                        withName: "图表类型是{seriesType}，表示{seriesName}。",
                        withoutName: "图表类型是{seriesType}。"
                    },
                    multiple: {
                        prefix: "它由{seriesCount}个图表系列组成。",
                        withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
                        withoutName: "第{seriesId}个系列是一个{seriesType}，",
                        separator: {
                            middle: "；",
                            end: "。"
                        }
                    }
                },
                data: {
                    allData: "其数据是——",
                    partialData: "其中，前{displayCnt}项是——",
                    withName: "{name}的数据是{value}",
                    withoutName: "{value}",
                    separator: {
                        middle: "，",
                        end: ""
                    }
                }
            }
        };
        t.exports = n
    }, function (t, e, n) {
        function i(t, e, n) {
            function i(t, e, n) {
                null != x.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, _.set(e, !0))
            }
            y.isInstance(e) || (e = y.seriesDataToSource(e)), n = n || {}, t = (t || []).slice();
            for (var o = (n.dimsDef || []).slice(), p = s(n.encodeDef), v = s(), _ = s(), b = [], w = r(e, t, o, n.dimCount), S = 0; S < w; S++) {
                var M = o[S] = h({}, d(o[S]) ? o[S] : {
                        name: o[S]
                    }),
                    T = M.name,
                    A = b[S] = {
                        otherDims: {}
                    };
                null != T && null == v.get(T) && (A.name = A.displayName = T, v.set(T, S)), null != M.type && (A.type = M.type), null != M.displayName && (A.displayName = M.displayName)
            }
            p.each(function (t, e) {
                if (t = g(t).slice(), 1 === t.length && !u(t[0]) && t[0] < 0) return void p.set(e, !1);
                var n = p.set(e, []);
                l(t, function (t, r) {
                    u(t) && (t = v.get(t)), null != t && t < w && (n[r] = t, i(b[t], e, r))
                })
            });
            var C = 0;
            l(t, function (t, e) {
                var n, t, r, a;
                if (u(t)) n = t, t = {};
                else {
                    n = t.name;
                    var o = t.ordinalMeta;
                    t.ordinalMeta = null, t = f(t), t.ordinalMeta = o, r = t.dimsDef, a = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null
                }
                var s = p.get(n);
                if (!1 !== s) {
                    var s = g(s);
                    if (!s.length)
                        for (var h = 0; h < (r && r.length || 1); h++) {
                            for (; C < b.length && null != b[C].coordDim;) C++;
                            C < b.length && s.push(C++)
                        }
                    l(s, function (e, o) {
                        var s = b[e];
                        if (i(c(s, t), n, o), null == s.name && r) {
                            var l = r[o];
                            !d(l) && (l = {
                                name: l
                            }), s.name = s.displayName = l.name, s.defaultTooltip = l.defaultTooltip
                        }
                        a && c(s.otherDims, a)
                    })
                }
            });
            var I = n.generateCoord,
                D = n.generateCoordCount,
                k = null != D;
            D = I ? D || 1 : 0;
            for (var O = I || "value", P = 0; P < w; P++) {
                var A = b[P] = b[P] || {};
                null == A.coordDim && (A.coordDim = a(O, _, k), A.coordDimIndex = 0, (!I || D <= 0) && (A.isExtraCoord = !0), D--), null == A.name && (A.name = a(A.coordDim, v)), null == A.type && m(e, P, A.name) && (A.type = "ordinal")
            }
            return b
        }

        function r(t, e, n, i) {
            var r = Math.max(t.dimensionsDetectCount || 1, e.length, n.length, i || 0);
            return l(e, function (t) {
                var e = t.dimsDef;
                e && (r = Math.max(r, e.length))
            }), r
        }

        function a(t, e, n) {
            if (n || null != e.get(t)) {
                for (var i = 0; null != e.get(t + i);) i++;
                t += i
            }
            return e.set(t, !0), t
        }
        var o = n(0),
            s = o.createHashMap,
            l = o.each,
            u = o.isString,
            c = o.defaults,
            h = o.extend,
            d = o.isObject,
            f = o.clone,
            p = n(1),
            g = p.normalizeToArray,
            v = n(51),
            m = v.guessOrdinal,
            y = n(37),
            _ = n(82),
            x = _.OTHER_DIMENSIONS,
            b = i;
        t.exports = b
    }, function (t, e, n) {
        function i(t) {
            this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this._map
        }

        function r(t) {
            return t._map || (t._map = s(t.categories))
        }

        function a(t) {
            return l(t) && null != t.value ? t.value : t + ""
        }
        var o = n(0),
            s = o.createHashMap,
            l = o.isObject,
            u = o.map;
        i.createByAxisModel = function (t) {
            var e = t.option,
                n = e.data,
                r = n && u(n, a);
            return new i({
                categories: r,
                needCollect: !r,
                deduplication: !1 !== e.dedplication
            })
        };
        var c = i.prototype;
        c.getOrdinal = function (t) {
            return r(this).get(t)
        }, c.parseAndCollect = function (t) {
            var e, n = this._needCollect;
            if ("string" != typeof t && !n) return t;
            if (n && !this._deduplication) return e = this.categories.length, this.categories[e] = t, e;
            var i = r(this);
            return e = i.get(t), null == e && (n ? (e = this.categories.length, this.categories[e] = t, i.set(t, e)) : e = NaN), e
        };
        var h = i;
        t.exports = h
    }, function (t, e, n) {
        function i(t, e, n, i) {
            var a = {},
                s = t[1] - t[0],
                c = a.interval = l.nice(s / e, !0);
            null != n && c < n && (c = a.interval = n), null != i && c > i && (c = a.interval = i);
            var h = a.intervalPrecision = r(c);
            return o(a.niceTickExtent = [u(Math.ceil(t[0] / c) * c, h), u(Math.floor(t[1] / c) * c, h)], t), a
        }

        function r(t) {
            return l.getPrecisionSafe(t) + 2
        }

        function a(t, e, n) {
            t[e] = Math.max(Math.min(t[e], n[1]), n[0])
        }

        function o(t, e) {
            !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), a(t, 0, e), a(t, 1, e), t[0] > t[1] && (t[0] = t[1])
        }

        function s(t, e, n, i) {
            var r = [];
            if (!t) return r;
            e[0] < n[0] && r.push(e[0]);
            for (var a = n[0]; a <= n[1] && (r.push(a), (a = u(a + t, i)) !== r[r.length - 1]);)
                if (r.length > 1e4) return [];
            return e[1] > (r.length ? r[r.length - 1] : n[1]) && r.push(e[1]), r
        }
        var l = n(5),
            u = l.round;
        e.intervalScaleNiceTicks = i, e.getIntervalPrecision = r, e.fixExtent = o, e.intervalScaleGetTicks = s
    }, function (t, e, n) {
        function i(t) {
            return t.get("stack") || x + t.seriesIndex
        }

        function r(t) {
            return t.dim + t.index
        }

        function a(t) {
            var e = [],
                n = t.axis;
            if ("category" === n.type) {
                for (var i = n.getBandWidth(), r = 0; r < t.count; r++) e.push(p.defaults({
                    bandWidth: i,
                    axisKey: "axis0",
                    stackId: x + r
                }, t));
                for (var a = l(e), o = [], r = 0; r < t.count; r++) {
                    var s = a.axis0[x + r];
                    s.offsetCenter = s.offset + s.width / 2, o.push(s)
                }
                return o
            }
        }

        function o(t, e) {
            var n = [];
            return e.eachSeriesByType(t, function (t) {
                h(t) && !d(t) && n.push(t)
            }), n
        }

        function s(t) {
            var e = [];
            return p.each(t, function (t) {
                var n = t.getData(),
                    a = t.coordinateSystem,
                    o = a.getBaseAxis(),
                    s = o.getExtent(),
                    l = "category" === o.type ? o.getBandWidth() : Math.abs(s[1] - s[0]) / n.count(),
                    u = v(t.get("barWidth"), l),
                    c = v(t.get("barMaxWidth"), l),
                    h = t.get("barGap"),
                    d = t.get("barCategoryGap");
                e.push({
                    bandWidth: l,
                    barWidth: u,
                    barMaxWidth: c,
                    barGap: h,
                    barCategoryGap: d,
                    axisKey: r(o),
                    stackId: i(t)
                })
            }), l(e)
        }

        function l(t) {
            var e = {};
            p.each(t, function (t, n) {
                var i = t.axisKey,
                    r = t.bandWidth,
                    a = e[i] || {
                        bandWidth: r,
                        remainedWidth: r,
                        autoWidthCount: 0,
                        categoryGap: "20%",
                        gap: "30%",
                        stacks: {}
                    },
                    o = a.stacks;
                e[i] = a;
                var s = t.stackId;
                o[s] || a.autoWidthCount++, o[s] = o[s] || {
                    width: 0,
                    maxWidth: 0
                };
                var l = t.barWidth;
                l && !o[s].width && (o[s].width = l, l = Math.min(a.remainedWidth, l), a.remainedWidth -= l);
                var u = t.barMaxWidth;
                u && (o[s].maxWidth = u);
                var c = t.barGap;
                null != c && (a.gap = c);
                var h = t.barCategoryGap;
                null != h && (a.categoryGap = h)
            });
            var n = {};
            return p.each(e, function (t, e) {
                n[e] = {};
                var i = t.stacks,
                    r = t.bandWidth,
                    a = v(t.categoryGap, r),
                    o = v(t.gap, 1),
                    s = t.remainedWidth,
                    l = t.autoWidthCount,
                    u = (s - a) / (l + (l - 1) * o);
                u = Math.max(u, 0), p.each(i, function (t, e) {
                    var n = t.maxWidth;
                    n && n < u && (n = Math.min(n, s), t.width && (n = Math.min(n, t.width)), s -= n, t.width = n, l--)
                }), u = (s - a) / (l + (l - 1) * o), u = Math.max(u, 0);
                var c, h = 0;
                p.each(i, function (t, e) {
                    t.width || (t.width = u), c = t, h += t.width * (1 + o)
                }), c && (h -= c.width * o);
                var d = -h / 2;
                p.each(i, function (t, i) {
                    n[e][i] = n[e][i] || {
                        bandWidth: r,
                        offset: d,
                        width: t.width
                    }, d += t.width * (1 + o)
                })
            }), n
        }

        function u(t, e, n) {
            if (t && e) {
                var a = t[r(e)];
                return null != a && null != n && (a = a[i(n)]), a
            }
        }

        function c(t, e) {
            var n = o(t, e),
                a = s(n),
                l = {},
                u = {};
            p.each(n, function (t) {
                var e = t.getData(),
                    n = t.coordinateSystem,
                    o = n.getBaseAxis(),
                    s = i(t),
                    c = a[r(o)][s],
                    h = c.offset,
                    d = c.width,
                    p = n.getOtherAxis(o),
                    g = t.get("barMinHeight") || 0;
                l[s] = l[s] || [], u[s] = u[s] || [], e.setLayout({
                    bandWidth: c.bandWidth,
                    offset: h,
                    size: d
                });
                for (var v = e.mapDimension(p.dim), m = e.mapDimension(o.dim), _ = y(e, v), x = p.isHorizontal(), b = f(o, p, _), w = 0, S = e.count(); w < S; w++) {
                    var M = e.get(v, w),
                        T = e.get(m, w);
                    if (!isNaN(M) && !isNaN(T)) {
                        var A = M >= 0 ? "p" : "n",
                            C = b;
                        _ && (l[s][T] || (l[s][T] = {
                            p: b,
                            n: b
                        }), C = l[s][T][A]);
                        var I, D, k, O;
                        if (x) {
                            var P = n.dataToPoint([M, T]);
                            I = C, D = P[1] + h, k = P[0] - b, O = d, Math.abs(k) < g && (k = (k < 0 ? -1 : 1) * g), _ && (l[s][T][A] += k)
                        } else {
                            var P = n.dataToPoint([T, M]);
                            I = P[0] + h, D = C, k = d, O = P[1] - b, Math.abs(O) < g && (O = (O <= 0 ? -1 : 1) * g), _ && (l[s][T][A] += O)
                        }
                        e.setItemLayout(w, {
                            x: I,
                            y: D,
                            width: k,
                            height: O
                        })
                    }
                }
            }, this)
        }

        function h(t) {
            return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type
        }

        function d(t) {
            return t.pipelineContext && t.pipelineContext.large
        }

        function f(t, e, n) {
            return e.toGlobalCoord(e.dataToCoord(0))
        }
        var p = n(0),
            g = n(5),
            v = g.parsePercent,
            m = n(28),
            y = m.isDimensionStacked,
            _ = n(79),
            x = "__ec_stack_",
            b = "undefined" != typeof Float32Array ? Float32Array : Array,
            w = {
                seriesType: "bar",
                plan: _(),
                reset: function (t) {
                    function e(t, e) {
                        for (var n, s = t.count, u = new b(2 * s), h = new b(s), d = [], v = [], m = 0, y = 0; null != (n = t.next());) v[p] = e.get(o, n), v[1 - p] = e.get(l, n), d = i.dataToPoint(v, null, d), u[m++] = d[0], u[m++] = d[1], h[y++] = n;
                        e.setLayout({
                            largePoints: u,
                            largeDataIndices: h,
                            barWidth: g,
                            valueAxisStart: f(r, a, !1),
                            valueAxisHorizontal: c
                        })
                    }
                    if (h(t) && d(t)) {
                        var n = t.getData(),
                            i = t.coordinateSystem,
                            r = i.getBaseAxis(),
                            a = i.getOtherAxis(r),
                            o = n.mapDimension(a.dim),
                            l = n.mapDimension(r.dim),
                            c = a.isHorizontal(),
                            p = c ? 0 : 1,
                            g = u(s([t]), r, t).width;
                        return g > .5 || (g = .5), {
                            progress: e
                        }
                    }
                }
            };
        e.getLayoutOnAxis = a, e.prepareLayoutBarSeries = o, e.makeColumnLayout = s, e.retrieveColumnLayout = u, e.layout = c, e.largeLayout = w
    }, function (t, e, n) {
        var i = n(0),
            r = {
                getMin: function (t) {
                    var e = this.option,
                        n = t || null == e.rangeStart ? e.min : e.rangeStart;
                    return this.axis && null != n && "dataMin" !== n && "function" != typeof n && !i.eqNaN(n) && (n = this.axis.scale.parse(n)), n
                },
                getMax: function (t) {
                    var e = this.option,
                        n = t || null == e.rangeEnd ? e.max : e.rangeEnd;
                    return this.axis && null != n && "dataMax" !== n && "function" != typeof n && !i.eqNaN(n) && (n = this.axis.scale.parse(n)), n
                },
                getNeedCrossZero: function () {
                    var t = this.option;
                    return null == t.rangeStart && null == t.rangeEnd && !t.scale
                },
                getCoordSysModel: i.noop,
                setRange: function (t, e) {
                    this.option.rangeStart = t, this.option.rangeEnd = e
                },
                resetRange: function () {
                    this.option.rangeStart = this.option.rangeEnd = null
                }
            };
        t.exports = r
    }, function (t, e, n) {
        function i(t, e) {
            var n = t[1] - t[0],
                i = e,
                r = n / i / 2;
            t[0] += r, t[1] -= r
        }

        function r(t, e, n, i, r) {
            function a(t, e) {
                return h ? t > e : t < e
            }
            var s = e.length;
            if (t.onBand && !i && s) {
                var l, u = t.getExtent();
                if (1 === s) e[0].coord = u[0], l = e[1] = {
                    coord: u[0]
                };
                else {
                    var c = e[1].coord - e[0].coord;
                    o(e, function (t) {
                        t.coord -= c / 2;
                        var e = e || 0;
                        e % 2 > 0 && (t.coord -= c / (2 * (e + 1)))
                    }), l = {
                        coord: e[s - 1].coord + c
                    }, e.push(l)
                }
                var h = u[0] > u[1];
                a(e[0].coord, u[0]) && (r ? e[0].coord = u[0] : e.shift()), r && a(u[0], e[0].coord) && e.unshift({
                    coord: u[0]
                }), a(u[1], l.coord) && (r ? l.coord = u[1] : e.pop()), r && a(l.coord, u[1]) && e.push({
                    coord: u[1]
                })
            }
        }
        var a = n(0),
            o = a.each,
            s = a.map,
            l = n(5),
            u = l.linearMap,
            c = l.getPixelPrecision,
            h = n(240),
            d = h.createAxisTicks,
            f = h.createAxisLabels,
            p = h.calculateCategoryInterval,
            g = [0, 1],
            v = function (t, e, n) {
                this.dim = t, this.scale = e, this._extent = n || [0, 0], this.inverse = !1, this.onBand = !1
            };
        v.prototype = {
            constructor: v,
            contain: function (t) {
                var e = this._extent,
                    n = Math.min(e[0], e[1]),
                    i = Math.max(e[0], e[1]);
                return t >= n && t <= i
            },
            containData: function (t) {
                return this.contain(this.dataToCoord(t))
            },
            getExtent: function () {
                return this._extent.slice()
            },
            getPixelPrecision: function (t) {
                return c(t || this.scale.getExtent(), this._extent)
            },
            setExtent: function (t, e) {
                var n = this._extent;
                n[0] = t, n[1] = e
            },
            dataToCoord: function (t, e) {
                var n = this._extent,
                    r = this.scale;
                return t = r.normalize(t), this.onBand && "ordinal" === r.type && (n = n.slice(), i(n, r.count())), u(t, g, n, e)
            },
            coordToData: function (t, e) {
                var n = this._extent,
                    r = this.scale;
                this.onBand && "ordinal" === r.type && (n = n.slice(), i(n, r.count()));
                var a = u(t, n, g, e);
                return this.scale.scale(a)
            },
            pointToData: function (t, e) {},
            getTicksCoords: function (t) {
                t = t || {};
                var e = t.tickModel || this.getTickModel(),
                    n = d(this, e),
                    i = n.ticks,
                    a = s(i, function (t) {
                        return {
                            coord: this.dataToCoord(t),
                            tickValue: t
                        }
                    }, this),
                    o = e.get("alignWithLabel");
                return r(this, a, n.tickCategoryInterval, o, t.clamp), a
            },
            getViewLabels: function () {
                return f(this).labels
            },
            getLabelModel: function () {
                return this.model.getModel("axisLabel")
            },
            getTickModel: function () {
                return this.model.getModel("axisTick")
            },
            getBandWidth: function () {
                var t = this._extent,
                    e = this.scale.getExtent(),
                    n = e[1] - e[0] + (this.onBand ? 1 : 0);
                0 === n && (n = 1);
                var i = Math.abs(t[1] - t[0]);
                return Math.abs(i) / n
            },
            isHorizontal: null,
            getRotate: null,
            calculateCategoryInterval: function () {
                return p(this)
            }
        };
        var m = v;
        t.exports = m
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            var e = void 0 === t ? "undefined" : (0, a.default)(t);
            return null != t && ("object" == e || "function" == e)
        }
        var r = n(39),
            a = function (t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        t.exports = i
    }, function (t, e) {
        e.f = Object.getOwnPropertySymbols
    }, function (t, e, n) {
        var i = n(97),
            r = n(66).concat("length", "prototype");
        e.f = Object.getOwnPropertyNames || function (t) {
            return i(t, r)
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(39),
            r = function (t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i),
            a = n(260),
            o = "object" == ("undefined" == typeof self ? "undefined" : (0, r.default)(self)) && self && self.Object === Object && self,
            s = a || o || Function("return this")();
        t.exports = s
    }, function (t, e, n) {
        "use strict";
        var i = n(140),
            r = i.Symbol;
        t.exports = r
    }, function (t, e, n) {
        function i(t, e, n) {
            c.Group.call(this), this.updateData(t, e, n)
        }

        function r(t) {
            return [t[0] / 2, t[1] / 2]
        }

        function a(t, e) {
            this.parent.drift(t, e)
        }

        function o(t, e) {
            if (!this.incremental && !this.useHoverLayer)
                if ("emphasis" === e) {
                    var n = this.__symbolOriginalScale,
                        i = n[1] / n[0],
                        r = {
                            scale: [Math.max(1.1 * n[0], n[0] + 3), Math.max(1.1 * n[1], n[1] + 3 * i)]
                        };
                    this.animateTo(r, 400, "elasticOut")
                } else "normal" === e && this.animateTo({
                    scale: this.__symbolOriginalScale
                }, 400, "elasticOut")
        }
        var s = n(0),
            l = n(54),
            u = l.createSymbol,
            c = n(2),
            h = n(5),
            d = h.parsePercent,
            f = n(143),
            p = f.getDefaultLabel,
            g = i.prototype,
            v = i.getSymbolSize = function (t, e) {
                var n = t.getItemVisual(e, "symbolSize");
                return n instanceof Array ? n.slice() : [+n, +n]
            };
        g._createSymbol = function (t, e, n, i, o) {
            this.removeAll();
            var s = e.getItemVisual(n, "color"),
                l = u(t, -1, -1, 2, 2, s, o);
            l.attr({
                z2: 100,
                culling: !0,
                scale: r(i)
            }), l.drift = a, this._symbolType = t, this.add(l)
        }, g.stopSymbolAnimation = function (t) {
            this.childAt(0).stopAnimation(t)
        }, g.getSymbolPath = function () {
            return this.childAt(0)
        }, g.getScale = function () {
            return this.childAt(0).scale
        }, g.highlight = function () {
            this.childAt(0).trigger("emphasis")
        }, g.downplay = function () {
            this.childAt(0).trigger("normal")
        }, g.setZ = function (t, e) {
            var n = this.childAt(0);
            n.zlevel = t, n.z = e
        }, g.setDraggable = function (t) {
            var e = this.childAt(0);
            e.draggable = t, e.cursor = t ? "move" : e.cursor
        }, g.updateData = function (t, e, n) {
            this.silent = !1;
            var i = t.getItemVisual(e, "symbol") || "circle",
                a = t.hostModel,
                o = v(t, e),
                s = i !== this._symbolType;
            if (s) {
                var l = t.getItemVisual(e, "symbolKeepAspect");
                this._createSymbol(i, t, e, o, l)
            } else {
                var u = this.childAt(0);
                u.silent = !1, c.updateProps(u, {
                    scale: r(o)
                }, a, e)
            }
            if (this._updateCommon(t, e, o, n), s) {
                var u = this.childAt(0),
                    h = n && n.fadeIn,
                    d = {
                        scale: u.scale.slice()
                    };
                h && (d.style = {
                    opacity: u.style.opacity
                }), u.scale = [0, 0], h && (u.style.opacity = 0), c.initProps(u, d, a, e)
            }
            this._seriesModel = a
        };
        var m = ["itemStyle"],
            y = ["emphasis", "itemStyle"],
            _ = ["label"],
            x = ["emphasis", "label"];
        g._updateCommon = function (t, e, n, i) {
            function a(e, n) {
                return O ? t.getName(e) : p(t, e)
            }
            var l = this.childAt(0),
                u = t.hostModel,
                h = t.getItemVisual(e, "color");
            "image" !== l.type && l.useStyle({
                strokeNoScale: !0
            });
            var f = i && i.itemStyle,
                g = i && i.hoverItemStyle,
                v = i && i.symbolRotate,
                b = i && i.symbolOffset,
                w = i && i.labelModel,
                S = i && i.hoverLabelModel,
                M = i && i.hoverAnimation,
                T = i && i.cursorStyle;
            if (!i || t.hasItemOption) {
                var A = i && i.itemModel ? i.itemModel : t.getItemModel(e);
                f = A.getModel(m).getItemStyle(["color"]), g = A.getModel(y).getItemStyle(), v = A.getShallow("symbolRotate"), b = A.getShallow("symbolOffset"), w = A.getModel(_), S = A.getModel(x), M = A.getShallow("hoverAnimation"), T = A.getShallow("cursor")
            } else g = s.extend({}, g);
            var C = l.style;
            l.attr("rotation", (v || 0) * Math.PI / 180 || 0), b && l.attr("position", [d(b[0], n[0]), d(b[1], n[1])]), T && l.attr("cursor", T), l.setColor(h, i && i.symbolInnerColor), l.setStyle(f);
            var I = t.getItemVisual(e, "opacity");
            null != I && (C.opacity = I);
            var D = t.getItemVisual(e, "liftZ"),
                k = l.__z2Origin;
            null != D ? null == k && (l.__z2Origin = l.z2, l.z2 += D) : null != k && (l.z2 = k, l.__z2Origin = null);
            var O = i && i.useNameLabel;
            c.setLabelStyle(C, g, w, S, {
                labelFetcher: u,
                labelDataIndex: e,
                defaultText: a,
                isRectText: !0,
                autoColor: h
            }), l.__symbolOriginalScale = r(n), l.hoverStyle = g, l.highDownOnUpdate = M && u.isAnimationEnabled() ? o : null, c.setHoverStyle(l)
        }, g.fadeOut = function (t, e) {
            var n = this.childAt(0);
            this.silent = n.silent = !0, !(e && e.keepLabel) && (n.style.text = null), c.updateProps(n, {
                style: {
                    opacity: 0
                },
                scale: [0, 0]
            }, this._seriesModel, this.dataIndex, t)
        }, s.inherits(i, c.Group);
        var b = i;
        t.exports = b
    }, function (t, e, n) {
        function i(t, e) {
            var n = t.mapDimension("defaultedLabel", !0),
                i = n.length;
            if (1 === i) return a(t, e, n[0]);
            if (i) {
                for (var r = [], o = 0; o < n.length; o++) {
                    var s = a(t, e, n[o]);
                    r.push(s)
                }
                return r.join(" ")
            }
        }
        var r = n(27),
            a = r.retrieveRawValue;
        e.getDefaultLabel = i
    }, function (t, e, n) {
        function i(t, e, n) {
            var i, a = t.getBaseAxis(),
                o = t.getOtherAxis(a),
                l = r(o, n),
                c = a.dim,
                h = o.dim,
                d = e.mapDimension(h),
                f = e.mapDimension(c),
                p = "x" === h || "radius" === h ? 1 : 0,
                g = u(t.dimensions, function (t) {
                    return e.mapDimension(t)
                }),
                v = e.getCalculationInfo("stackResultDimension");
            return (i |= s(e, g[0])) && (g[0] = v), (i |= s(e, g[1])) && (g[1] = v), {
                dataDimsForPoint: g,
                valueStart: l,
                valueAxisDim: h,
                baseAxisDim: c,
                stacked: !!i,
                valueDim: d,
                baseDim: f,
                baseDataOffset: p,
                stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
            }
        }

        function r(t, e) {
            var n = 0,
                i = t.scale.getExtent();
            return "start" === e ? n = i[0] : "end" === e ? n = i[1] : i[0] > 0 ? n = i[0] : i[1] < 0 && (n = i[1]), n
        }

        function a(t, e, n, i) {
            var r = NaN;
            t.stacked && (r = n.get(n.getCalculationInfo("stackedOverDimension"), i)), isNaN(r) && (r = t.valueStart);
            var a = t.baseDataOffset,
                o = [];
            return o[a] = n.get(t.baseDim, i), o[1 - a] = r, e.dataToPoint(o)
        }
        var o = n(28),
            s = o.isDimensionStacked,
            l = n(0),
            u = l.map;
        e.prepareDataCoordInfo = i, e.getStackedOnPoint = a
    }, function (t, e, n) {
        function i(t, e, n) {
            var i = t.getArea(),
                r = t.getBaseAxis().isHorizontal(),
                a = i.x,
                s = i.y,
                l = i.width,
                u = i.height,
                c = n.get("lineStyle.width") || 2;
            a -= c / 2, s -= c / 2, l += c, u += c;
            var h = new o.Rect({
                shape: {
                    x: a,
                    y: s,
                    width: l,
                    height: u
                }
            });
            return e && (h.shape[r ? "width" : "height"] = 0, o.initProps(h, {
                shape: {
                    width: l,
                    height: u
                }
            }, n)), h
        }

        function r(t, e, n) {
            var i = t.getArea(),
                r = new o.Sector({
                    shape: {
                        cx: l(t.cx, 1),
                        cy: l(t.cy, 1),
                        r0: l(i.r0, 1),
                        r: l(i.r, 1),
                        startAngle: i.startAngle,
                        endAngle: i.endAngle,
                        clockwise: i.clockwise
                    }
                });
            return e && (r.shape.endAngle = i.startAngle, o.initProps(r, {
                shape: {
                    endAngle: i.endAngle
                }
            }, n)), r
        }

        function a(t, e, n) {
            return t ? "polar" === t.type ? r(t, e, n) : "cartesian2d" === t.type ? i(t, e, n) : null : null
        }
        var o = n(2),
            s = n(5),
            l = s.round;
        e.createGridClipPath = i, e.createPolarClipPath = r, e.createClipPath = a
    }, function (t, e, n) {
        var i = n(3),
            r = n(0),
            a = n(2);
        n(147), n(284), i.extendComponentView({
            type: "grid",
            render: function (t, e) {
                this.group.removeAll(), t.get("show") && this.group.add(new a.Rect({
                    shape: t.coordinateSystem.getRect(),
                    style: r.defaults({
                        fill: t.get("backgroundColor")
                    }, t.getItemStyle()),
                    silent: !0,
                    z2: -1
                }))
            }
        }), i.registerPreprocessor(function (t) {
            t.xAxis && t.yAxis && !t.grid && (t.grid = {})
        })
    }, function (t, e, n) {
        function i(t, e, n) {
            return t.getCoordSysModel() === e
        }

        function r(t, e, n) {
            this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(t, e, n), this.model = t
        }

        function a(t, e, n, i) {
            function r(t) {
                return t.dim + "_" + t.index
            }
            n.getAxesOnZeroOf = function () {
                return a ? [a] : []
            };
            var a, s = t[e],
                l = n.model,
                u = l.get("axisLine.onZero"),
                c = l.get("axisLine.onZeroAxisIndex");
            if (u) {
                if (null != c) o(s[c]) && (a = s[c]);
                else
                    for (var h in s)
                        if (s.hasOwnProperty(h) && o(s[h]) && !i[r(s[h])]) {
                            a = s[h];
                            break
                        } a && (i[r(a)] = !0)
            }
        }

        function o(t) {
            return t && "category" !== t.type && "time" !== t.type && x(t)
        }

        function s(t, e) {
            var n = t.getExtent(),
                i = n[0] + n[1];
            t.toGlobalCoord = "x" === t.dim ? function (t) {
                return t + e
            } : function (t) {
                return i - t + e
            }, t.toLocalCoord = "x" === t.dim ? function (t) {
                return t - e
            } : function (t) {
                return i - t + e
            }
        }

        function l(t, e) {
            return p(D, function (e) {
                return t.getReferringComponents(e)[0]
            })
        }

        function u(t) {
            return "cartesian2d" === t.get("coordinateSystem")
        }
        var c = n(4),
            h = (c.__DEV__, n(0)),
            d = h.isObject,
            f = h.each,
            p = h.map,
            g = h.indexOf,
            v = (h.retrieve, n(14)),
            m = v.getLayoutRect,
            y = n(29),
            _ = y.createScaleByModel,
            x = y.ifAxisCrossZero,
            b = y.niceScaleExtent,
            w = y.estimateLabelUnionRect,
            S = n(278),
            M = n(280),
            T = n(75),
            A = n(28),
            C = A.getStackedDimension;
        n(281);
        var I = r.prototype;
        I.type = "grid", I.axisPointerEnabled = !0, I.getRect = function () {
            return this._rect
        }, I.update = function (t, e) {
            var n = this._axesMap;
            this._updateScale(t, this.model), f(n.x, function (t) {
                b(t.scale, t.model)
            }), f(n.y, function (t) {
                b(t.scale, t.model)
            });
            var i = {};
            f(n.x, function (t) {
                a(n, "y", t, i)
            }), f(n.y, function (t) {
                a(n, "x", t, i)
            }), this.resize(this.model, e)
        }, I.resize = function (t, e, n) {
            function i() {
                f(a, function (t) {
                    var e = t.isHorizontal(),
                        n = e ? [0, r.width] : [0, r.height],
                        i = t.inverse ? 1 : 0;
                    t.setExtent(n[i], n[1 - i]), s(t, e ? r.x : r.y)
                })
            }
            var r = m(t.getBoxLayoutParams(), {
                width: e.getWidth(),
                height: e.getHeight()
            });
            this._rect = r;
            var a = this._axesList;
            i(), !n && t.get("containLabel") && (f(a, function (t) {
                if (!t.model.get("axisLabel.inside")) {
                    var e = w(t);
                    if (e) {
                        var n = t.isHorizontal() ? "height" : "width",
                            i = t.model.get("axisLabel.margin");
                        r[n] -= e[n] + i, "top" === t.position ? r.y += e.height + i : "left" === t.position && (r.x += e.width + i)
                    }
                }
            }), i())
        }, I.getAxis = function (t, e) {
            var n = this._axesMap[t];
            if (null != n) {
                if (null == e)
                    for (var i in n)
                        if (n.hasOwnProperty(i)) return n[i];
                return n[e]
            }
        }, I.getAxes = function () {
            return this._axesList.slice()
        }, I.getCartesian = function (t, e) {
            if (null != t && null != e) {
                var n = "x" + t + "y" + e;
                return this._coordsMap[n]
            }
            d(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
            for (var i = 0, r = this._coordsList; i < r.length; i++)
                if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e) return r[i]
        }, I.getCartesians = function () {
            return this._coordsList.slice()
        }, I.convertToPixel = function (t, e, n) {
            var i = this._findConvertTarget(t, e);
            return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null
        }, I.convertFromPixel = function (t, e, n) {
            var i = this._findConvertTarget(t, e);
            return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null
        }, I._findConvertTarget = function (t, e) {
            var n, i, r = e.seriesModel,
                a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0],
                o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0],
                s = e.gridModel,
                l = this._coordsList;
            if (r) n = r.coordinateSystem, g(l, n) < 0 && (n = null);
            else if (a && o) n = this.getCartesian(a.componentIndex, o.componentIndex);
            else if (a) i = this.getAxis("x", a.componentIndex);
            else if (o) i = this.getAxis("y", o.componentIndex);
            else if (s) {
                var u = s.coordinateSystem;
                u === this && (n = this._coordsList[0])
            }
            return {
                cartesian: n,
                axis: i
            }
        }, I.containPoint = function (t) {
            var e = this._coordsList[0];
            if (e) return e.containPoint(t)
        }, I._initCartesian = function (t, e, n) {
            function r(n) {
                return function (r, l) {
                    if (i(r, t, e)) {
                        var u = r.get("position");
                        "x" === n ? "top" !== u && "bottom" !== u && (u = a.bottom ? "top" : "bottom") : "left" !== u && "right" !== u && (u = a.left ? "right" : "left"), a[u] = !0;
                        var c = new M(n, _(r), [0, 0], r.get("type"), u),
                            h = "category" === c.type;
                        c.onBand = h && r.get("boundaryGap"), c.inverse = r.get("inverse"), r.axis = c, c.model = r, c.grid = this, c.index = l, this._axesList.push(c), o[n][l] = c, s[n]++
                    }
                }
            }
            var a = {
                    left: !1,
                    right: !1,
                    top: !1,
                    bottom: !1
                },
                o = {
                    x: {},
                    y: {}
                },
                s = {
                    x: 0,
                    y: 0
                };
            if (e.eachComponent("xAxis", r("x"), this), e.eachComponent("yAxis", r("y"), this), !s.x || !s.y) return this._axesMap = {}, void(this._axesList = []);
            this._axesMap = o, f(o.x, function (e, n) {
                f(o.y, function (i, r) {
                    var a = "x" + n + "y" + r,
                        o = new S(a);
                    o.grid = this, o.model = t, this._coordsMap[a] = o, this._coordsList.push(o), o.addAxis(e), o.addAxis(i)
                }, this)
            }, this)
        }, I._updateScale = function (t, e) {
            function n(t, e, n) {
                f(t.mapDimension(e.dim, !0), function (n) {
                    e.scale.unionExtentFromData(t, C(t, n))
                })
            }
            f(this._axesList, function (t) {
                t.scale.setExtent(1 / 0, -1 / 0)
            }), t.eachSeries(function (r) {
                if (u(r)) {
                    var a = l(r, t),
                        o = a[0],
                        s = a[1];
                    if (!i(o, e, t) || !i(s, e, t)) return;
                    var c = this.getCartesian(o.componentIndex, s.componentIndex),
                        h = r.getData(),
                        d = c.getAxis("x"),
                        f = c.getAxis("y");
                    "list" === h.type && (n(h, d, r), n(h, f, r))
                }
            }, this)
        }, I.getTooltipAxes = function (t) {
            var e = [],
                n = [];
            return f(this.getCartesians(), function (i) {
                var r = null != t && "auto" !== t ? i.getAxis(t) : i.getBaseAxis(),
                    a = i.getOtherAxis(r);
                g(e, r) < 0 && e.push(r), g(n, a) < 0 && n.push(a)
            }), {
                baseAxes: e,
                otherAxes: n
            }
        };
        var D = ["xAxis", "yAxis"];
        r.create = function (t, e) {
            var n = [];
            return t.eachComponent("grid", function (i, a) {
                var o = new r(i, t, e);
                o.name = "grid_" + a, o.resize(i, e, !0), i.coordinateSystem = o, n.push(o)
            }), t.eachSeries(function (e) {
                if (u(e)) {
                    var n = l(e, t),
                        i = n[0],
                        r = n[1],
                        a = i.getCoordSysModel(),
                        o = a.coordinateSystem;
                    e.coordinateSystem = o.getCartesian(i.componentIndex, r.componentIndex)
                }
            }), n
        }, r.dimensions = r.prototype.dimensions = S.prototype.dimensions, T.register("cartesian2d", r);
        var k = r;
        t.exports = k
    }, function (t, e, n) {
        function i(t, e) {
            return e.type || (e.data ? "category" : "value")
        }
        var r = n(0),
            a = n(13),
            o = n(282),
            s = n(135),
            l = a.extend({
                type: "cartesian2dAxis",
                axis: null,
                init: function () {
                    l.superApply(this, "init", arguments), this.resetRange()
                },
                mergeOption: function () {
                    l.superApply(this, "mergeOption", arguments), this.resetRange()
                },
                restoreData: function () {
                    l.superApply(this, "restoreData", arguments), this.resetRange()
                },
                getCoordSysModel: function () {
                    return this.ecModel.queryComponents({
                        mainType: "grid",
                        index: this.option.gridIndex,
                        id: this.option.gridId
                    })[0]
                }
            });
        r.merge(l.prototype, s);
        var u = {
            offset: 0
        };
        o("x", l, i, u), o("y", l, i, u);
        var c = l;
        t.exports = c
    }, function (t, e, n) {
        function i(t, e, n, i) {
            var r, a, o = x(n - t.rotation),
                s = i[0] > i[1],
                l = "start" === e && !s || "start" !== e && s;
            return _(o - I / 2) ? (a = l ? "bottom" : "top", r = "center") : _(o - 1.5 * I) ? (a = l ? "top" : "bottom", r = "center") : (a = "middle", r = o < 1.5 * I && o > I / 2 ? l ? "left" : "right" : l ? "right" : "left"), {
                rotation: o,
                textAlign: r,
                textVerticalAlign: a
            }
        }

        function r(t, e, n) {
            if (!C(t.axis)) {
                var i = t.get("axisLabel.showMinLabel"),
                    r = t.get("axisLabel.showMaxLabel");
                e = e || [], n = n || [];
                var s = e[0],
                    l = e[1],
                    u = e[e.length - 1],
                    c = e[e.length - 2],
                    h = n[0],
                    d = n[1],
                    f = n[n.length - 1],
                    p = n[n.length - 2];
                !1 === i ? (a(s), a(h)) : o(s, l) && (i ? (a(l), a(d)) : (a(s), a(h))), !1 === r ? (a(u), a(f)) : o(c, u) && (r ? (a(c), a(p)) : (a(u), a(f)))
            }
        }

        function a(t) {
            t && (t.ignore = !0)
        }

        function o(t, e, n) {
            var i = t && t.getBoundingRect().clone(),
                r = e && e.getBoundingRect().clone();
            if (i && r) {
                var a = S.identity([]);
                return S.rotate(a, a, -t.rotation), i.applyTransform(S.mul([], a, t.getLocalTransform())), r.applyTransform(S.mul([], a, e.getLocalTransform())), i.intersect(r)
            }
        }

        function s(t) {
            return "middle" === t || "center" === t
        }

        function l(t, e, n) {
            var i = e.axis;
            if (e.get("axisTick.show") && !i.scale.isBlank()) {
                for (var r = e.getModel("axisTick"), a = r.getModel("lineStyle"), o = r.get("length"), s = i.getTicksCoords(), l = [], u = [], c = t._transform, h = [], f = 0; f < s.length; f++) {
                    var p = s[f].coord;
                    l[0] = p, l[1] = 0, u[0] = p, u[1] = n.tickDirection * o, c && (T(l, l, c), T(u, u, c));
                    var g = new v.Line({
                        anid: "tick_" + s[f].tickValue,
                        subPixelOptimize: !0,
                        shape: {
                            x1: l[0],
                            y1: l[1],
                            x2: u[0],
                            y2: u[1]
                        },
                        style: d(a.getLineStyle(), {
                            stroke: e.get("axisLine.lineStyle.color")
                        }),
                        z2: 2,
                        silent: !0
                    });
                    t.group.add(g), h.push(g)
                }
                return h
            }
        }

        function u(t, e, n) {
            var i = e.axis;
            if (h(n.axisLabelShow, e.get("axisLabel.show")) && !i.scale.isBlank()) {
                var r = e.getModel("axisLabel"),
                    a = r.get("margin"),
                    o = i.getViewLabels(),
                    s = (h(n.labelRotate, r.get("rotate")) || 0) * I / 180,
                    l = P(n.rotation, s, n.labelDirection),
                    u = e.getCategories && e.getCategories(!0),
                    c = [],
                    d = L(e),
                    f = e.get("triggerEvent");
                return p(o, function (o, s) {
                    var h = o.tickValue,
                        p = o.formattedLabel,
                        g = o.rawLabel,
                        y = r;
                    u && u[h] && u[h].textStyle && (y = new m(u[h].textStyle, r, e.ecModel));
                    var _ = y.getTextColor() || e.get("axisLine.lineStyle.color"),
                        x = i.dataToCoord(h),
                        b = [x, n.labelOffset + n.labelDirection * a],
                        w = new v.Text({
                            anid: "label_" + h,
                            position: b,
                            rotation: l.rotation,
                            silent: d,
                            z2: 10
                        });
                    v.setTextStyle(w.style, y, {
                        text: p,
                        textAlign: y.getShallow("align", !0) || l.textAlign,
                        textVerticalAlign: y.getShallow("verticalAlign", !0) || y.getShallow("baseline", !0) || l.textVerticalAlign,
                        textFill: "function" == typeof _ ? _("category" === i.type ? g : "value" === i.type ? h + "" : h, s) : _
                    }), f && (w.eventData = O(e), w.eventData.targetType = "axisLabel", w.eventData.value = g), t._dumbGroup.add(w), w.updateTransform(), c.push(w), t.group.add(w), w.decomposeTransform()
                }), c
            }
        }
        var c = n(0),
            h = c.retrieve,
            d = c.defaults,
            f = c.extend,
            p = c.each,
            g = n(10),
            v = n(2),
            m = n(12),
            y = n(5),
            _ = y.isRadianAroundZero,
            x = y.remRadian,
            b = n(54),
            w = b.createSymbol,
            S = n(20),
            M = n(7),
            T = M.applyTransform,
            A = n(29),
            C = A.shouldShowAllLabels,
            I = Math.PI,
            D = function (t, e) {
                this.opt = e, this.axisModel = t, d(e, {
                    labelOffset: 0,
                    nameDirection: 1,
                    tickDirection: 1,
                    labelDirection: 1,
                    silent: !0
                }), this.group = new v.Group;
                var n = new v.Group({
                    position: e.position.slice(),
                    rotation: e.rotation
                });
                n.updateTransform(), this._transform = n.transform, this._dumbGroup = n
            };
        D.prototype = {
            constructor: D,
            hasBuilder: function (t) {
                return !!k[t]
            },
            add: function (t) {
                k[t].call(this)
            },
            getGroup: function () {
                return this.group
            }
        };
        var k = {
                axisLine: function () {
                    var t = this.opt,
                        e = this.axisModel;
                    if (e.get("axisLine.show")) {
                        var n = this.axisModel.axis.getExtent(),
                            i = this._transform,
                            r = [n[0], 0],
                            a = [n[1], 0];
                        i && (T(r, r, i), T(a, a, i));
                        var o = f({
                            lineCap: "round"
                        }, e.getModel("axisLine.lineStyle").getLineStyle());
                        this.group.add(new v.Line({
                            anid: "line",
                            subPixelOptimize: !0,
                            shape: {
                                x1: r[0],
                                y1: r[1],
                                x2: a[0],
                                y2: a[1]
                            },
                            style: o,
                            strokeContainThreshold: t.strokeContainThreshold || 5,
                            silent: !0,
                            z2: 1
                        }));
                        var s = e.get("axisLine.symbol"),
                            l = e.get("axisLine.symbolSize"),
                            u = e.get("axisLine.symbolOffset") || 0;
                        if ("number" == typeof u && (u = [u, u]), null != s) {
                            "string" == typeof s && (s = [s, s]), "string" != typeof l && "number" != typeof l || (l = [l, l]);
                            var c = l[0],
                                h = l[1];
                            p([{
                                rotate: t.rotation + Math.PI / 2,
                                offset: u[0],
                                r: 0
                            }, {
                                rotate: t.rotation - Math.PI / 2,
                                offset: u[1],
                                r: Math.sqrt((r[0] - a[0]) * (r[0] - a[0]) + (r[1] - a[1]) * (r[1] - a[1]))
                            }], function (e, n) {
                                if ("none" !== s[n] && null != s[n]) {
                                    var i = w(s[n], -c / 2, -h / 2, c, h, o.stroke, !0),
                                        a = e.r + e.offset,
                                        l = [r[0] + a * Math.cos(t.rotation), r[1] - a * Math.sin(t.rotation)];
                                    i.attr({
                                        rotation: e.rotate,
                                        position: l,
                                        silent: !0,
                                        z2: 11
                                    }), this.group.add(i)
                                }
                            }, this)
                        }
                    }
                },
                axisTickLabel: function () {
                    var t = this.axisModel,
                        e = this.opt,
                        n = l(this, t, e);
                    r(t, u(this, t, e), n)
                },
                axisName: function () {
                    var t = this.opt,
                        e = this.axisModel,
                        n = h(t.axisName, e.get("name"));
                    if (n) {
                        var r, a = e.get("nameLocation"),
                            o = t.nameDirection,
                            l = e.getModel("nameTextStyle"),
                            u = e.get("nameGap") || 0,
                            c = this.axisModel.axis.getExtent(),
                            d = c[0] > c[1] ? -1 : 1,
                            p = ["start" === a ? c[0] - d * u : "end" === a ? c[1] + d * u : (c[0] + c[1]) / 2, s(a) ? t.labelOffset + o * u : 0],
                            m = e.get("nameRotate");
                        null != m && (m = m * I / 180);
                        var y;
                        s(a) ? r = P(t.rotation, null != m ? m : t.rotation, o) : (r = i(t, a, m || 0, c), null != (y = t.axisNameAvailableWidth) && (y = Math.abs(y / Math.sin(r.rotation)), !isFinite(y) && (y = null)));
                        var _ = l.getFont(),
                            x = e.get("nameTruncate", !0) || {},
                            b = x.ellipsis,
                            w = h(t.nameTruncateMaxWidth, x.maxWidth, y),
                            S = null != b && null != w ? g.truncateText(n, w, _, b, {
                                minChar: 2,
                                placeholder: x.placeholder
                            }) : n,
                            M = e.get("tooltip", !0),
                            T = e.mainType,
                            A = {
                                componentType: T,
                                name: n,
                                $vars: ["name"]
                            };
                        A[T + "Index"] = e.componentIndex;
                        var C = new v.Text({
                            anid: "name",
                            __fullText: n,
                            __truncatedText: S,
                            position: p,
                            rotation: r.rotation,
                            silent: L(e),
                            z2: 1,
                            tooltip: M && M.show ? f({
                                content: n,
                                formatter: function () {
                                    return n
                                },
                                formatterParams: A
                            }, M) : null
                        });
                        v.setTextStyle(C.style, l, {
                            text: S,
                            textFont: _,
                            textFill: l.getTextColor() || e.get("axisLine.lineStyle.color"),
                            textAlign: l.get("align") || r.textAlign,
                            textVerticalAlign: l.get("verticalAlign") || r.textVerticalAlign
                        }), e.get("triggerEvent") && (C.eventData = O(e), C.eventData.targetType = "axisName", C.eventData.name = n), this._dumbGroup.add(C), C.updateTransform(), this.group.add(C), C.decomposeTransform()
                    }
                }
            },
            O = D.makeAxisEventDataBase = function (t) {
                var e = {
                    componentType: t.mainType,
                    componentIndex: t.componentIndex
                };
                return e[t.mainType + "Index"] = t.componentIndex, e
            },
            P = D.innerTextLayout = function (t, e, n) {
                var i, r, a = x(e - t);
                return _(a) ? (r = n > 0 ? "top" : "bottom", i = "center") : _(a - I) ? (r = n > 0 ? "bottom" : "top", i = "center") : (r = "middle", i = a > 0 && a < I ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), {
                    rotation: a,
                    textAlign: i,
                    textVerticalAlign: r
                }
            },
            L = D.isLabelSilent = function (t) {
                var e = t.get("tooltip");
                return t.get("silent") || !(t.get("triggerEvent") || e && e.show)
            },
            E = D;
        t.exports = E
    }, function (t, e, n) {
        function i(t, e, n, i, a, o) {
            var u = l.getAxisPointerClass(t.axisPointerClass);
            if (u) {
                var c = s.getAxisPointerModel(e);
                c ? (t._axisPointer || (t._axisPointer = new u)).render(e, c, i, o) : r(t, i)
            }
        }

        function r(t, e, n) {
            var i = t._axisPointer;
            i && i.dispose(e, n), t._axisPointer = null
        }
        var a = n(4),
            o = (a.__DEV__, n(3)),
            s = n(56),
            l = o.extendComponentView({
                type: "axis",
                _axisPointer: null,
                axisPointerClass: null,
                render: function (t, e, n, r) {
                    this.axisPointerClass && s.fixValue(t), l.superApply(this, "render", arguments), i(this, t, e, n, r, !0)
                },
                updateAxisPointer: function (t, e, n, r, a) {
                    i(this, t, e, n, r, !1)
                },
                remove: function (t, e) {
                    var n = this._axisPointer;
                    n && n.remove(e), l.superApply(this, "remove", arguments)
                },
                dispose: function (t, e) {
                    r(this, e), l.superApply(this, "dispose", arguments)
                }
            }),
            u = [];
        l.registerAxisPointerClass = function (t, e) {
            u[t] = e
        }, l.getAxisPointerClass = function (t) {
            return t && u[t]
        };
        var c = l;
        t.exports = c
    }, function (t, e, n) {
        function i(t, e, n) {
            n = n || {};
            var i = t.coordinateSystem,
                a = e.axis,
                o = {},
                s = a.getAxesOnZeroOf()[0],
                l = a.position,
                u = s ? "onZero" : l,
                c = a.dim,
                h = i.getRect(),
                d = [h.x, h.x + h.width, h.y, h.y + h.height],
                f = {
                    left: 0,
                    right: 1,
                    top: 0,
                    bottom: 1,
                    onZero: 2
                },
                p = e.get("offset") || 0,
                g = "x" === c ? [d[2] - p, d[3] + p] : [d[0] - p, d[1] + p];
            if (s) {
                var v = s.toGlobalCoord(s.dataToCoord(0));
                g[f.onZero] = Math.max(Math.min(v, g[1]), g[0])
            }
            o.position = ["y" === c ? g[f[u]] : d[0], "x" === c ? g[f[u]] : d[3]], o.rotation = Math.PI / 2 * ("x" === c ? 0 : 1);
            var m = {
                top: -1,
                bottom: 1,
                left: -1,
                right: 1
            };
            o.labelDirection = o.tickDirection = o.nameDirection = m[l], o.labelOffset = s ? g[f[l]] - g[f.onZero] : 0, e.get("axisTick.inside") && (o.tickDirection = -o.tickDirection), r.retrieve(n.labelInside, e.get("axisLabel.inside")) && (o.labelDirection = -o.labelDirection);
            var y = e.get("axisLabel.rotate");
            return o.labelRotate = "top" === u ? -y : y, o.z2 = 1, o
        }
        var r = n(0);
        e.layout = i
    }, function (t, e, n) {
        function i(t, e) {
            var n, i = [],
                o = t.seriesIndex;
            if (null == o || !(n = e.getSeriesByIndex(o))) return {
                point: []
            };
            var s = n.getData(),
                l = a.queryDataIndex(s, t);
            if (null == l || l < 0 || r.isArray(l)) return {
                point: []
            };
            var u = s.getItemGraphicEl(l),
                c = n.coordinateSystem;
            if (n.getTooltipPosition) i = n.getTooltipPosition(l) || [];
            else if (c && c.dataToPoint) i = c.dataToPoint(s.getValues(r.map(c.dimensions, function (t) {
                return s.mapDimension(t)
            }), l, !0)) || [];
            else if (u) {
                var h = u.getBoundingRect().clone();
                h.applyTransform(u.transform), i = [h.x + h.width / 2, h.y + h.height / 2]
            }
            return {
                point: i,
                el: u
            }
        }
        var r = n(0),
            a = n(1);
        t.exports = i
    }, function (t, e, n) {
        function i(t, e, n) {
            if (!h.node) {
                var i = e.getZr();
                p(i).records || (p(i).records = {}), r(i, e);
                (p(i).records[t] || (p(i).records[t] = {})).handler = n
            }
        }

        function r(t, e) {
            function n(n, i) {
                t.on(n, function (n) {
                    var r = l(e);
                    g(p(t).records, function (t) {
                        t && i(t, n, r.dispatchAction)
                    }), a(r.pendings, e)
                })
            }
            p(t).initialized || (p(t).initialized = !0, n("click", c.curry(s, "click")), n("mousemove", c.curry(s, "mousemove")), n("globalout", o))
        }

        function a(t, e) {
            var n, i = t.showTip.length,
                r = t.hideTip.length;
            i ? n = t.showTip[i - 1] : r && (n = t.hideTip[r - 1]), n && (n.dispatchAction = null, e.dispatchAction(n))
        }

        function o(t, e, n) {
            t.handler("leave", null, n)
        }

        function s(t, e, n, i) {
            e.handler(t, n, i)
        }

        function l(t) {
            var e = {
                    showTip: [],
                    hideTip: []
                },
                n = function (i) {
                    var r = e[i.type];
                    r ? r.push(i) : (i.dispatchAction = n, t.dispatchAction(i))
                };
            return {
                dispatchAction: n,
                pendings: e
            }
        }

        function u(t, e) {
            if (!h.node) {
                var n = e.getZr();
                (p(n).records || {})[t] && (p(n).records[t] = null)
            }
        }
        var c = n(0),
            h = n(8),
            d = n(1),
            f = d.makeInner,
            p = f(),
            g = c.each;
        e.register = i, e.unregister = u
    }, function (t, e, n) {
        function i(t) {
            var e, n = t.get("type"),
                i = t.getModel(n + "Style");
            return "line" === n ? (e = i.getLineStyle(), e.fill = null) : "shadow" === n && (e = i.getAreaStyle(), e.stroke = null), e
        }

        function r(t, e, n, i, r) {
            var s = n.get("value"),
                l = o(s, e.axis, e.ecModel, n.get("seriesDataIndices"), {
                    precision: n.get("label.precision"),
                    formatter: n.get("label.formatter")
                }),
                u = n.getModel("label"),
                c = g.normalizeCssArray(u.get("padding") || 0),
                h = u.getFont(),
                d = p.getBoundingRect(l, h),
                f = r.position,
                v = d.width + c[1] + c[3],
                m = d.height + c[0] + c[2],
                y = r.align;
            "right" === y && (f[0] -= v), "center" === y && (f[0] -= v / 2);
            var _ = r.verticalAlign;
            "bottom" === _ && (f[1] -= m), "middle" === _ && (f[1] -= m / 2), a(f, v, m, i);
            var x = u.get("backgroundColor");
            x && "auto" !== x || (x = e.get("axisLine.lineStyle.color")), t.label = {
                shape: {
                    x: 0,
                    y: 0,
                    width: v,
                    height: m,
                    r: u.get("borderRadius")
                },
                position: f.slice(),
                style: {
                    text: l,
                    textFont: h,
                    textFill: u.getTextColor(),
                    textPosition: "inside",
                    textPadding: c,
                    fill: x,
                    stroke: u.get("borderColor") || "transparent",
                    lineWidth: u.get("borderWidth") || 0,
                    shadowBlur: u.get("shadowBlur"),
                    shadowColor: u.get("shadowColor"),
                    shadowOffsetX: u.get("shadowOffsetX"),
                    shadowOffsetY: u.get("shadowOffsetY")
                },
                z2: 10
            }
        }

        function a(t, e, n, i) {
            var r = i.getWidth(),
                a = i.getHeight();
            t[0] = Math.min(t[0] + e, r) - e, t[1] = Math.min(t[1] + n, a) - n, t[0] = Math.max(t[0], 0), t[1] = Math.max(t[1], 0)
        }

        function o(t, e, n, i, r) {
            t = e.scale.parse(t);
            var a = e.scale.getLabel(t, {
                    precision: r.precision
                }),
                o = r.formatter;
            if (o) {
                var s = {
                    value: m.getAxisRawValue(e, t),
                    axisDimension: e.dim,
                    axisIndex: e.index,
                    seriesData: []
                };
                d.each(i, function (t) {
                    var e = n.getSeriesByIndex(t.seriesIndex),
                        i = t.dataIndexInside,
                        r = e && e.getDataParams(i);
                    r && s.seriesData.push(r)
                }), d.isString(o) ? a = o.replace("{value}", a) : d.isFunction(o) && (a = o(s))
            }
            return a
        }

        function s(t, e, n) {
            var i = v.create();
            return v.rotate(i, i, n.rotation), v.translate(i, i, n.position), f.applyTransform([t.dataToCoord(e), (n.labelOffset || 0) + (n.labelDirection || 1) * (n.labelMargin || 0)], i)
        }

        function l(t, e, n, i, a, o) {
            var l = y.innerTextLayout(n.rotation, 0, n.labelDirection);
            n.labelMargin = a.get("label.margin"), r(e, i, a, o, {
                position: s(i.axis, t, n),
                align: l.textAlign,
                verticalAlign: l.textVerticalAlign
            })
        }

        function u(t, e, n) {
            return n = n || 0, {
                x1: t[n],
                y1: t[1 - n],
                x2: e[n],
                y2: e[1 - n]
            }
        }

        function c(t, e, n) {
            return n = n || 0, {
                x: t[n],
                y: t[1 - n],
                width: e[n],
                height: e[1 - n]
            }
        }

        function h(t, e, n, i, r, a) {
            return {
                cx: t,
                cy: e,
                r0: n,
                r: i,
                startAngle: r,
                endAngle: a,
                clockwise: !0
            }
        }
        var d = n(0),
            f = n(2),
            p = n(16),
            g = n(10),
            v = n(20),
            m = n(29),
            y = n(149);
        e.buildElStyle = i, e.buildLabelElOption = r, e.getValueLabel = o, e.getTransformedPosition = s, e.buildCartesianSingleLabelElOption = l, e.makeLineShape = u, e.makeRectShape = c, e.makeSectorShape = h
    }, , function (t, e, n) {
        "use strict";

        function i(t) {
            n(157)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(88),
            a = n.n(r);
        for (var o in r) "default" !== o && function (t) {
            n.d(e, t, function () {
                return r[t]
            })
        }(o);
        var s = n(320),
            l = n(55),
            u = i,
            c = Object(l.a)(a.a, s.a, s.b, !1, u, "data-v-24fe2500", null);
        e.default = c.exports
    }, function (t, e, n) {
        var i = n(158);
        "string" == typeof i && (i = [
            [t.i, i, ""]
        ]), i.locals && (t.exports = i.locals);
        var r = n(41).default;
        r("22a9469c", i, !0, {})
    }, function (t, e, n) {
        e = t.exports = n(40)(!1), e.push([t.i, ".truck-echarts[data-v-24fe2500]{width:100%;height:100%;font-size:20px;text-align:center}.echarts[data-v-24fe2500]{width:100%}", ""])
    }, function (e, n) {
        e.exports = t
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            n(161)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = n(89),
            a = n.n(r);
        for (var o in r) "default" !== o && function (t) {
            n.d(e, t, function () {
                return r[t]
            })
        }(o);
        var s = n(268),
            l = n(55),
            u = i,
            c = Object(l.a)(a.a, s.a, s.b, !1, u, null, null);
        e.default = c.exports
    }, function (t, e, n) {
        var i = n(162);
        "string" == typeof i && (i = [
            [t.i, i, ""]
        ]), i.locals && (t.exports = i.locals);
        var r = n(41).default;
        r("3d53930c", i, !0, {})
    }, function (t, e, n) {
        e = t.exports = n(40)(!1), e.push([t.i, ".echarts{width:600px;height:400px}", ""])
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0;
        var i = n(164),
            r = function (t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(i);
        e.default = function (t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                return n
            }
            return (0, r.default)(t)
        }
    }, function (t, e, n) {
        t.exports = {
            default: n(165),
            __esModule: !0
        }
    }, function (t, e, n) {
        n(90), n(175), t.exports = n(21).Array.from
    }, function (t, e, n) {
        var i = n(58),
            r = n(59);
        t.exports = function (t) {
            return function (e, n) {
                var a, o, s = String(r(e)),
                    l = i(n),
                    u = s.length;
                return l < 0 || l >= u ? t ? "" : void 0 : (a = s.charCodeAt(l), a < 55296 || a > 56319 || l + 1 === u || (o = s.charCodeAt(l + 1)) < 56320 || o > 57343 ? t ? s.charAt(l) : a : t ? s.slice(l, l + 2) : o - 56320 + (a - 55296 << 10) + 65536)
            }
        }
    }, function (t, e) {
        t.exports = function (t) {
            if ("function" != typeof t) throw TypeError(t + " is not a function!");
            return t
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(96),
            r = n(32),
            a = n(67),
            o = {};
        n(22)(o, n(11)("iterator"), function () {
            return this
        }), t.exports = function (t, e, n) {
            t.prototype = i(o, {
                next: r(1, n)
            }), a(t, e + " Iterator")
        }
    }, function (t, e, n) {
        var i = n(18),
            r = n(30),
            a = n(62);
        t.exports = n(23) ? Object.defineProperties : function (t, e) {
            r(t);
            for (var n, o = a(e), s = o.length, l = 0; s > l;) i.f(t, n = o[l++], e[n]);
            return t
        }
    }, function (t, e, n) {
        var i = n(63);
        t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
            return "String" == i(t) ? t.split("") : Object(t)
        }
    }, function (t, e, n) {
        var i = n(24),
            r = n(98),
            a = n(172);
        t.exports = function (t) {
            return function (e, n, o) {
                var s, l = i(e),
                    u = r(l.length),
                    c = a(o, u);
                if (t && n != n) {
                    for (; u > c;)
                        if ((s = l[c++]) != s) return !0
                } else
                    for (; u > c; c++)
                        if ((t || c in l) && l[c] === n) return t || c || 0;
                return !t && -1
            }
        }
    }, function (t, e, n) {
        var i = n(58),
            r = Math.max,
            a = Math.min;
        t.exports = function (t, e) {
            return t = i(t), t < 0 ? r(t + e, 0) : a(t, e)
        }
    }, function (t, e, n) {
        var i = n(15).document;
        t.exports = i && i.documentElement
    }, function (t, e, n) {
        var i = n(19),
            r = n(99),
            a = n(64)("IE_PROTO"),
            o = Object.prototype;
        t.exports = Object.getPrototypeOf || function (t) {
            return t = r(t), i(t, a) ? t[a] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? o : null
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(92),
            r = n(60),
            a = n(99),
            o = n(176),
            s = n(177),
            l = n(98),
            u = n(178),
            c = n(179);
        r(r.S + r.F * !n(181)(function (t) {
            Array.from(t)
        }), "Array", {
            from: function (t) {
                var e, n, r, h, d = a(t),
                    f = "function" == typeof this ? this : Array,
                    p = arguments.length,
                    g = p > 1 ? arguments[1] : void 0,
                    v = void 0 !== g,
                    m = 0,
                    y = c(d);
                if (v && (g = i(g, p > 2 ? arguments[2] : void 0, 2)), void 0 == y || f == Array && s(y))
                    for (e = l(d.length), n = new f(e); e > m; m++) u(n, m, v ? g(d[m], m) : d[m]);
                else
                    for (h = y.call(d), n = new f; !(r = h.next()).done; m++) u(n, m, v ? o(h, g, [r.value, m], !0) : r.value);
                return n.length = m, n
            }
        })
    }, function (t, e, n) {
        var i = n(30);
        t.exports = function (t, e, n, r) {
            try {
                return r ? e(i(n)[0], n[1]) : e(n)
            } catch (e) {
                var a = t.return;
                throw void 0 !== a && i(a.call(t)), e
            }
        }
    }, function (t, e, n) {
        var i = n(33),
            r = n(11)("iterator"),
            a = Array.prototype;
        t.exports = function (t) {
            return void 0 !== t && (i.Array === t || a[r] === t)
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(18),
            r = n(32);
        t.exports = function (t, e, n) {
            e in t ? i.f(t, e, r(0, n)) : t[e] = n
        }
    }, function (t, e, n) {
        var i = n(180),
            r = n(11)("iterator"),
            a = n(33);
        t.exports = n(21).getIteratorMethod = function (t) {
            if (void 0 != t) return t[r] || t["@@iterator"] || a[i(t)]
        }
    }, function (t, e, n) {
        var i = n(63),
            r = n(11)("toStringTag"),
            a = "Arguments" == i(function () {
                return arguments
            }()),
            o = function (t, e) {
                try {
                    return t[e]
                } catch (t) {}
            };
        t.exports = function (t) {
            var e, n, s;
            return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = o(e = Object(t), r)) ? n : a ? i(e) : "Object" == (s = i(e)) && "function" == typeof e.callee ? "Arguments" : s
        }
    }, function (t, e, n) {
        var i = n(11)("iterator"),
            r = !1;
        try {
            var a = [7][i]();
            a.return = function () {
                r = !0
            }, Array.from(a, function () {
                throw 2
            })
        } catch (t) {}
        t.exports = function (t, e) {
            if (!e && !r) return !1;
            var n = !1;
            try {
                var a = [7],
                    o = a[i]();
                o.next = function () {
                    return {
                        done: n = !0
                    }
                }, a[i] = function () {
                    return o
                }, t(a)
            } catch (t) {}
            return n
        }
    }, function (t, e, n) {
        function i(t, e, n) {
            return {
                type: t,
                event: n,
                target: e.target,
                topTarget: e.topTarget,
                cancelBubble: !1,
                offsetX: n.zrX,
                offsetY: n.zrY,
                gestureEvent: n.gestureEvent,
                pinchX: n.pinchX,
                pinchY: n.pinchY,
                pinchScale: n.pinchScale,
                wheelDelta: n.zrDelta,
                zrByTouch: n.zrByTouch,
                which: n.which,
                stop: r
            }
        }

        function r(t) {
            h.stop(this.event)
        }

        function a() {}

        function o(t, e, n) {
            if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
                for (var i, r = t; r;) {
                    if (r.clipPath && !r.clipPath.contain(e, n)) return !1;
                    r.silent && (i = !0), r = r.parent
                }
                return !i || f
            }
            return !1
        }
        var s = n(0),
            l = n(7),
            u = n(183),
            c = n(34),
            h = n(25),
            d = n(185),
            f = "silent";
        a.prototype.dispose = function () {};
        var p = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
            g = function (t, e, n, i) {
                c.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new a, this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, this._gestureMgr, u.call(this), this.setHandlerProxy(n)
            };
        g.prototype = {
            constructor: g,
            setHandlerProxy: function (t) {
                this.proxy && this.proxy.dispose(), t && (s.each(p, function (e) {
                    t.on && t.on(e, this[e], this)
                }, this), t.handler = this), this.proxy = t
            },
            mousemove: function (t) {
                var e = t.zrX,
                    n = t.zrY,
                    i = this._hovered,
                    r = i.target;
                r && !r.__zr && (i = this.findHover(i.x, i.y), r = i.target);
                var a = this._hovered = this.findHover(e, n),
                    o = a.target,
                    s = this.proxy;
                s.setCursor && s.setCursor(o ? o.cursor : "default"), r && o !== r && this.dispatchToElement(i, "mouseout", t), this.dispatchToElement(a, "mousemove", t), o && o !== r && this.dispatchToElement(a, "mouseover", t)
            },
            mouseout: function (t) {
                this.dispatchToElement(this._hovered, "mouseout", t);
                var e, n = t.toElement || t.relatedTarget;
                do {
                    n = n && n.parentNode
                } while (n && 9 !== n.nodeType && !(e = n === this.painterRoot));
                !e && this.trigger("globalout", {
                    event: t
                })
            },
            resize: function (t) {
                this._hovered = {}
            },
            dispatch: function (t, e) {
                var n = this[t];
                n && n.call(this, e)
            },
            dispose: function () {
                this.proxy.dispose(), this.storage = this.proxy = this.painter = null
            },
            setCursorStyle: function (t) {
                var e = this.proxy;
                e.setCursor && e.setCursor(t)
            },
            dispatchToElement: function (t, e, n) {
                t = t || {};
                var r = t.target;
                if (!r || !r.silent) {
                    for (var a = "on" + e, o = i(e, t, n); r && (r[a] && (o.cancelBubble = r[a].call(r, o)), r.trigger(e, o), r = r.parent, !o.cancelBubble););
                    o.cancelBubble || (this.trigger(e, o), this.painter && this.painter.eachOtherLayer(function (t) {
                        "function" == typeof t[a] && t[a].call(t, o), t.trigger && t.trigger(e, o)
                    }))
                }
            },
            findHover: function (t, e, n) {
                for (var i = this.storage.getDisplayList(), r = {
                        x: t,
                        y: e
                    }, a = i.length - 1; a >= 0; a--) {
                    var s;
                    if (i[a] !== n && !i[a].ignore && (s = o(i[a], t, e)) && (!r.topTarget && (r.topTarget = i[a]), s !== f)) {
                        r.target = i[a];
                        break
                    }
                }
                return r
            },
            processGesture: function (t, e) {
                this._gestureMgr || (this._gestureMgr = new d);
                var n = this._gestureMgr;
                "start" === e && n.clear();
                var i = n.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
                if ("end" === e && n.clear(), i) {
                    var r = i.type;
                    t.gestureEvent = r, this.dispatchToElement({
                        target: i.target
                    }, r, i.event)
                }
            }
        }, s.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
            g.prototype[t] = function (e) {
                var n = this.findHover(e.zrX, e.zrY),
                    i = n.target;
                if ("mousedown" === t) this._downEl = i, this._downPoint = [e.zrX, e.zrY], this._upEl = i;
                else if ("mouseup" === t) this._upEl = i;
                else if ("click" === t) {
                    if (this._downEl !== this._upEl || !this._downPoint || l.dist(this._downPoint, [e.zrX, e.zrY]) > 4) return;
                    this._downPoint = null
                }
                this.dispatchToElement(n, t, e)
            }
        }), s.mixin(g, c), s.mixin(g, u);
        var v = g;
        t.exports = v
    }, function (t, e) {
        function n() {
            this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this)
        }

        function i(t, e) {
            return {
                target: t,
                topTarget: e && e.topTarget
            }
        }
        n.prototype = {
            constructor: n,
            _dragStart: function (t) {
                var e = t.target;
                e && e.draggable && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(i(e, t), "dragstart", t.event))
            },
            _drag: function (t) {
                var e = this._draggingTarget;
                if (e) {
                    var n = t.offsetX,
                        r = t.offsetY,
                        a = n - this._x,
                        o = r - this._y;
                    this._x = n, this._y = r, e.drift(a, o, t), this.dispatchToElement(i(e, t), "drag", t.event);
                    var s = this.findHover(n, r, e).target,
                        l = this._dropTarget;
                    this._dropTarget = s, e !== s && (l && s !== l && this.dispatchToElement(i(l, t), "dragleave", t.event), s && s !== l && this.dispatchToElement(i(s, t), "dragenter", t.event))
                }
            },
            _dragEnd: function (t) {
                var e = this._draggingTarget;
                e && (e.dragging = !1), this.dispatchToElement(i(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(i(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null
            }
        };
        var r = n;
        t.exports = r
    }, function (t, e) {
        function n(t, e, i, a, o, s) {
            var l = a + "-" + o,
                u = t.length;
            if (s.hasOwnProperty(l)) return s[l];
            if (1 === e) {
                var c = Math.round(Math.log((1 << u) - 1 & ~o) / r);
                return t[i][c]
            }
            for (var h = a | 1 << i, d = i + 1; a & 1 << d;) d++;
            for (var f = 0, p = 0, g = 0; p < u; p++) {
                var v = 1 << p;
                v & o || (f += (g % 2 ? -1 : 1) * t[i][p] * n(t, e - 1, d, h, o | v, s), g++)
            }
            return s[l] = f, f
        }

        function i(t, e) {
            var i = [
                    [t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1]],
                    [0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1]],
                    [t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3]],
                    [0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3]],
                    [t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5]],
                    [0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5]],
                    [t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7]],
                    [0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7]]
                ],
                r = {},
                a = n(i, 8, 0, 0, 0, r);
            if (0 !== a) {
                for (var o = [], s = 0; s < 8; s++)
                    for (var l = 0; l < 8; l++) null == o[l] && (o[l] = 0), o[l] += ((s + l) % 2 ? -1 : 1) * n(i, 7, 0 === s ? 1 : 0, 1 << s, 1 << l, r) / a * e[s];
                return function (t, e, n) {
                    var i = e * o[6] + n * o[7] + 1;
                    t[0] = (e * o[0] + n * o[1] + o[2]) / i, t[1] = (e * o[3] + n * o[4] + o[5]) / i
                }
            }
        }
        var r = Math.log(2);
        e.buildTransformer = i
    }, function (t, e, n) {
        function i(t) {
            var e = t[1][0] - t[0][0],
                n = t[1][1] - t[0][1];
            return Math.sqrt(e * e + n * n)
        }

        function r(t) {
            return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]
        }
        var a = n(25),
            o = function () {
                this._track = []
            };
        o.prototype = {
            constructor: o,
            recognize: function (t, e, n) {
                return this._doTrack(t, e, n), this._recognize(t)
            },
            clear: function () {
                return this._track.length = 0, this
            },
            _doTrack: function (t, e, n) {
                var i = t.touches;
                if (i) {
                    for (var r = {
                            points: [],
                            touches: [],
                            target: e,
                            event: t
                        }, o = 0, s = i.length; o < s; o++) {
                        var l = i[o],
                            u = a.clientToLocal(n, l, {});
                        r.points.push([u.zrX, u.zrY]), r.touches.push(l)
                    }
                    this._track.push(r)
                }
            },
            _recognize: function (t) {
                for (var e in s)
                    if (s.hasOwnProperty(e)) {
                        var n = s[e](this._track, t);
                        if (n) return n
                    }
            }
        };
        var s = {
                pinch: function (t, e) {
                    var n = t.length;
                    if (n) {
                        var a = (t[n - 1] || {}).points,
                            o = (t[n - 2] || {}).points || a;
                        if (o && o.length > 1 && a && a.length > 1) {
                            var s = i(a) / i(o);
                            !isFinite(s) && (s = 1), e.pinchScale = s;
                            var l = r(a);
                            return e.pinchX = l[0], e.pinchY = l[1], {
                                type: "pinch",
                                target: t[0].target,
                                event: e
                            }
                        }
                    }
                }
            },
            l = o;
        t.exports = l
    }, function (t, e, n) {
        function i(t, e) {
            return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel
        }
        var r = n(0),
            a = n(8),
            o = n(35),
            s = n(68),
            l = function () {
                this._roots = [], this._displayList = [], this._displayListLen = 0
            };
        l.prototype = {
            constructor: l,
            traverse: function (t, e) {
                for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e)
            },
            getDisplayList: function (t, e) {
                return e = e || !1, t && this.updateDisplayList(e), this._displayList
            },
            updateDisplayList: function (t) {
                this._displayListLen = 0;
                for (var e = this._roots, n = this._displayList, r = 0, o = e.length; r < o; r++) this._updateAndAddDisplayable(e[r], null, t);
                n.length = this._displayListLen, a.canvasSupported && s(n, i)
            },
            _updateAndAddDisplayable: function (t, e, n) {
                if (!t.ignore || n) {
                    t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
                    var i = t.clipPath;
                    if (i) {
                        e = e ? e.slice() : [];
                        for (var r = i, a = t; r;) r.parent = a, r.updateTransform(), e.push(r), a = r, r = r.clipPath
                    }
                    if (t.isGroup) {
                        for (var o = t._children, s = 0; s < o.length; s++) {
                            var l = o[s];
                            t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, n)
                        }
                        t.__dirty = !1
                    } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t
                }
            },
            addRoot: function (t) {
                t.__storage !== this && (t instanceof o && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t))
            },
            delRoot: function (t) {
                if (null == t) {
                    for (var e = 0; e < this._roots.length; e++) {
                        var n = this._roots[e];
                        n instanceof o && n.delChildrenFromStorage(this)
                    }
                    return this._roots = [], this._displayList = [], void(this._displayListLen = 0)
                }
                if (t instanceof Array)
                    for (var e = 0, i = t.length; e < i; e++) this.delRoot(t[e]);
                else {
                    var a = r.indexOf(this._roots, t);
                    a >= 0 && (this.delFromStorage(t), this._roots.splice(a, 1), t instanceof o && t.delChildrenFromStorage(this))
                }
            },
            addToStorage: function (t) {
                return t && (t.__storage = this, t.dirty(!1)), this
            },
            delFromStorage: function (t) {
                return t && (t.__storage = null), this
            },
            dispose: function () {
                this._renderList = this._roots = null
            },
            displayableSortFunc: i
        };
        var u = l;
        t.exports = u
    }, function (t, e, n) {
        function i(t, e, n, i, a, o, s, l) {
            function h() {
                --f || o && o()
            }
            u(i) ? (o = a, a = i, i = 0) : c(a) ? (o = a, a = "linear", i = 0) : c(i) ? (o = i, i = 0) : c(n) ? (o = n, n = 500) : n || (n = 500), t.stopAnimation(), r(t, "", t, e, n, i, l);
            var d = t.animators.slice(),
                f = d.length;
            f || o && o();
            for (var p = 0; p < d.length; p++) d[p].done(h).start(a, s)
        }

        function r(t, e, n, i, o, s, l) {
            var u = {},
                c = 0;
            for (var f in i) i.hasOwnProperty(f) && (null != n[f] ? h(i[f]) && !d(i[f]) ? r(t, e ? e + "." + f : f, n[f], i[f], o, s, l) : (l ? (u[f] = n[f], a(t, e, f, i[f])) : u[f] = i[f], c++) : null == i[f] || l || a(t, e, f, i[f]));
            c > 0 && t.animate(e, !1).when(null == o ? 500 : o, u).delay(s || 0)
        }

        function a(t, e, n, i) {
            if (e) {
                var r = {};
                r[e] = {}, r[e][n] = i, t.attr(r)
            } else t.attr(n, i)
        }
        var o = n(105),
            s = n(107),
            l = n(0),
            u = l.isString,
            c = l.isFunction,
            h = l.isObject,
            d = l.isArrayLike,
            f = l.indexOf,
            p = function () {
                this.animators = []
            };
        p.prototype = {
            constructor: p,
            animate: function (t, e) {
                var n, i = !1,
                    r = this,
                    a = this.__zr;
                if (t) {
                    var l = t.split("."),
                        u = r;
                    i = "shape" === l[0];
                    for (var c = 0, h = l.length; c < h; c++) u && (u = u[l[c]]);
                    u && (n = u)
                } else n = r;
                if (!n) return void s('Property "' + t + '" is not existed in element ' + r.id);
                var d = r.animators,
                    p = new o(n, e);
                return p.during(function (t) {
                    r.dirty(i)
                }).done(function () {
                    d.splice(f(d, p), 1)
                }), d.push(p), a && a.animation.addAnimator(p), p
            },
            stopAnimation: function (t) {
                for (var e = this.animators, n = e.length, i = 0; i < n; i++) e[i].stop(t);
                return e.length = 0, this
            },
            animateTo: function (t, e, n, r, a, o) {
                i(this, t, e, n, r, a, o)
            },
            animateFrom: function (t, e, n, r, a, o) {
                i(this, t, e, n, r, a, o, !0)
            }
        };
        var g = p;
        t.exports = g
    }, function (t, e, n) {
        function i(t) {
            this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null != t.loop && t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1
        }
        var r = n(189);
        i.prototype = {
            constructor: i,
            step: function (t, e) {
                if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) return void(this._pausedTime += e);
                var n = (t - this._startTime - this._pausedTime) / this._life;
                if (!(n < 0)) {
                    n = Math.min(n, 1);
                    var i = this.easing,
                        a = "string" == typeof i ? r[i] : i,
                        o = "function" == typeof a ? a(n) : n;
                    return this.fire("frame", o), 1 === n ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null
                }
            },
            restart: function (t) {
                var e = (t - this._startTime - this._pausedTime) % this._life;
                this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1
            },
            fire: function (t, e) {
                t = "on" + t, this[t] && this[t](this._target, e)
            },
            pause: function () {
                this._paused = !0
            },
            resume: function () {
                this._paused = !1
            }
        };
        var a = i;
        t.exports = a
    }, function (t, e) {
        var n = {
                linear: function (t) {
                    return t
                },
                quadraticIn: function (t) {
                    return t * t
                },
                quadraticOut: function (t) {
                    return t * (2 - t)
                },
                quadraticInOut: function (t) {
                    return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
                },
                cubicIn: function (t) {
                    return t * t * t
                },
                cubicOut: function (t) {
                    return --t * t * t + 1
                },
                cubicInOut: function (t) {
                    return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                },
                quarticIn: function (t) {
                    return t * t * t * t
                },
                quarticOut: function (t) {
                    return 1 - --t * t * t * t
                },
                quarticInOut: function (t) {
                    return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
                },
                quinticIn: function (t) {
                    return t * t * t * t * t
                },
                quinticOut: function (t) {
                    return --t * t * t * t * t + 1
                },
                quinticInOut: function (t) {
                    return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                },
                sinusoidalIn: function (t) {
                    return 1 - Math.cos(t * Math.PI / 2)
                },
                sinusoidalOut: function (t) {
                    return Math.sin(t * Math.PI / 2)
                },
                sinusoidalInOut: function (t) {
                    return .5 * (1 - Math.cos(Math.PI * t))
                },
                exponentialIn: function (t) {
                    return 0 === t ? 0 : Math.pow(1024, t - 1)
                },
                exponentialOut: function (t) {
                    return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                },
                exponentialInOut: function (t) {
                    return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                },
                circularIn: function (t) {
                    return 1 - Math.sqrt(1 - t * t)
                },
                circularOut: function (t) {
                    return Math.sqrt(1 - --t * t)
                },
                circularInOut: function (t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                },
                elasticIn: function (t) {
                    var e, n = .1;
                    return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4))
                },
                elasticOut: function (t) {
                    var e, n = .1;
                    return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1)
                },
                elasticInOut: function (t) {
                    var e, n = .1;
                    return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), (t *= 2) < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1)
                },
                backIn: function (t) {
                    var e = 1.70158;
                    return t * t * ((e + 1) * t - e)
                },
                backOut: function (t) {
                    var e = 1.70158;
                    return --t * t * ((e + 1) * t + e) + 1
                },
                backInOut: function (t) {
                    var e = 2.5949095;
                    return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
                },
                bounceIn: function (t) {
                    return 1 - n.bounceOut(1 - t)
                },
                bounceOut: function (t) {
                    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                },
                bounceInOut: function (t) {
                    return t < .5 ? .5 * n.bounceIn(2 * t) : .5 * n.bounceOut(2 * t - 1) + .5
                }
            },
            i = n;
        t.exports = i
    }, function (t, e, n) {
        function i(t) {
            return parseInt(t, 10)
        }

        function r(t) {
            return !!t && (!!t.__builtin__ || "function" == typeof t.resize && "function" == typeof t.refresh)
        }

        function a(t, e, n) {
            return _.copy(t.getBoundingRect()), t.transform && _.applyTransform(t.transform), x.width = e, x.height = n, !_.intersect(x)
        }

        function o(t, e) {
            if (t === e) return !1;
            if (!t || !e || t.length !== e.length) return !0;
            for (var n = 0; n < t.length; n++)
                if (t[n] !== e[n]) return !0;
            return !1
        }

        function s(t, e) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e)
            }
        }

        function l(t, e) {
            var n = document.createElement("div");
            return n.style.cssText = ["position:relative", "overflow:hidden", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", n
        }
        var u = n(45),
            c = u.devicePixelRatio,
            h = n(0),
            d = n(107),
            f = n(9),
            p = n(68),
            g = n(191),
            v = n(110),
            m = n(70),
            y = n(8),
            _ = new f(0, 0, 0, 0),
            x = new f(0, 0, 0, 0),
            b = function (t, e, n) {
                this.type = "canvas";
                var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
                this._opts = n = h.extend({}, n || {}), this.dpr = n.devicePixelRatio || c, this._singleCanvas = i, this.root = t;
                var r = t.style;
                r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;
                var a = this._zlevelList = [],
                    o = this._layers = {};
                if (this._layerConfig = {}, this._needsManuallyCompositing = !1, i) {
                    var s = t.width,
                        u = t.height;
                    null != n.width && (s = n.width), null != n.height && (u = n.height), this.dpr = n.devicePixelRatio || 1, t.width = s * this.dpr, t.height = u * this.dpr, this._width = s, this._height = u;
                    var d = new g(t, this, this.dpr);
                    d.__builtin__ = !0, d.initContext(), o[314159] = d, d.zlevel = 314159, a.push(314159), this._domRoot = t
                } else {
                    this._width = this._getSize(0), this._height = this._getSize(1);
                    var f = this._domRoot = l(this._width, this._height);
                    t.appendChild(f)
                }
                this._hoverlayer = null, this._hoverElements = []
            };
        b.prototype = {
            constructor: b,
            getType: function () {
                return "canvas"
            },
            isSingleCanvas: function () {
                return this._singleCanvas
            },
            getViewportRoot: function () {
                return this._domRoot
            },
            getViewportRootOffset: function () {
                var t = this.getViewportRoot();
                if (t) return {
                    offsetLeft: t.offsetLeft || 0,
                    offsetTop: t.offsetTop || 0
                }
            },
            refresh: function (t) {
                var e = this.storage.getDisplayList(!0),
                    n = this._zlevelList;
                this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);
                for (var i = 0; i < n.length; i++) {
                    var r = n[i],
                        a = this._layers[r];
                    if (!a.__builtin__ && a.refresh) {
                        var o = 0 === i ? this._backgroundColor : null;
                        a.refresh(o)
                    }
                }
                return this.refreshHover(), this
            },
            addHover: function (t, e) {
                if (!t.__hoverMir) {
                    var n = new t.constructor({
                        style: t.style,
                        shape: t.shape,
                        z: t.z,
                        z2: t.z2,
                        silent: t.silent
                    });
                    return n.__from = t, t.__hoverMir = n, e && n.setStyle(e), this._hoverElements.push(n), n
                }
            },
            removeHover: function (t) {
                var e = t.__hoverMir,
                    n = this._hoverElements,
                    i = h.indexOf(n, e);
                i >= 0 && n.splice(i, 1), t.__hoverMir = null
            },
            clearHover: function (t) {
                for (var e = this._hoverElements, n = 0; n < e.length; n++) {
                    var i = e[n].__from;
                    i && (i.__hoverMir = null)
                }
                e.length = 0
            },
            refreshHover: function () {
                var t = this._hoverElements,
                    e = t.length,
                    n = this._hoverlayer;
                if (n && n.clear(), e) {
                    p(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer(1e5));
                    var i = {};
                    n.ctx.save();
                    for (var r = 0; r < e;) {
                        var a = t[r],
                            o = a.__from;
                        o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, n, !0, i))) : (t.splice(r, 1), o.__hoverMir = null, e--)
                    }
                    n.ctx.restore()
                }
            },
            getHoverLayer: function () {
                return this.getLayer(1e5)
            },
            _paintList: function (t, e, n) {
                if (this._redrawId === n) {
                    e = e || !1, this._updateLayerStatus(t);
                    var i = this._doPaintList(t, e);
                    if (this._needsManuallyCompositing && this._compositeManually(), !i) {
                        var r = this;
                        v(function () {
                            r._paintList(t, e, n)
                        })
                    }
                }
            },
            _compositeManually: function () {
                var t = this.getLayer(314159).ctx,
                    e = this._domRoot.width,
                    n = this._domRoot.height;
                t.clearRect(0, 0, e, n), this.eachBuiltinLayer(function (i) {
                    i.virtual && t.drawImage(i.dom, 0, 0, e, n)
                })
            },
            _doPaintList: function (t, e) {
                for (var n = [], i = 0; i < this._zlevelList.length; i++) {
                    var r = this._zlevelList[i],
                        a = this._layers[r];
                    a.__builtin__ && a !== this._hoverlayer && (a.__dirty || e) && n.push(a)
                }
                for (var o = !0, s = 0; s < n.length; s++) {
                    var a = n[s],
                        l = a.ctx,
                        u = {};
                    l.save();
                    var c = e ? a.__startIndex : a.__drawIndex,
                        d = !e && a.incremental && Date.now,
                        f = d && Date.now(),
                        p = a.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
                    if (a.__startIndex === a.__endIndex) a.clear(!1, p);
                    else if (c === a.__startIndex) {
                        var g = t[c];
                        g.incremental && g.notClear && !e || a.clear(!1, p)
                    } - 1 === c && (console.error("For some unknown reason. drawIndex is -1"), c = a.__startIndex);
                    for (var v = c; v < a.__endIndex; v++) {
                        var m = t[v];
                        if (this._doPaintEl(m, a, e, u), m.__dirty = m.__dirtyText = !1, d) {
                            if (Date.now() - f > 15) break
                        }
                    }
                    a.__drawIndex = v, a.__drawIndex < a.__endIndex && (o = !1), u.prevElClipPaths && l.restore(), l.restore()
                }
                return y.wxa && h.each(this._layers, function (t) {
                    t && t.ctx && t.ctx.draw && t.ctx.draw()
                }), o
            },
            _doPaintEl: function (t, e, n, i) {
                var r = e.ctx,
                    l = t.transform;
                if ((e.__dirty || n) && !t.invisible && 0 !== t.style.opacity && (!l || l[0] || l[3]) && (!t.culling || !a(t, this._width, this._height))) {
                    var u = t.__clipPaths,
                        c = i.prevElClipPaths;
                    c && !o(u, c) || (c && (r.restore(), i.prevElClipPaths = null, i.prevEl = null), u && (r.save(), s(u, r), i.prevElClipPaths = u)), t.beforeBrush && t.beforeBrush(r), t.brush(r, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(r)
                }
            },
            getLayer: function (t, e) {
                this._singleCanvas && !this._needsManuallyCompositing && (t = 314159);
                var n = this._layers[t];
                return n || (n = new g("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, this._layerConfig[t] && h.merge(n, this._layerConfig[t], !0), e && (n.virtual = e), this.insertLayer(t, n), n.initContext()), n
            },
            insertLayer: function (t, e) {
                var n = this._layers,
                    i = this._zlevelList,
                    a = i.length,
                    o = null,
                    s = -1,
                    l = this._domRoot;
                if (n[t]) return void d("ZLevel " + t + " has been used already");
                if (!r(e)) return void d("Layer of zlevel " + t + " is not valid");
                if (a > 0 && t > i[0]) {
                    for (s = 0; s < a - 1 && !(i[s] < t && i[s + 1] > t); s++);
                    o = n[i[s]]
                }
                if (i.splice(s + 1, 0, t), n[t] = e, !e.virtual)
                    if (o) {
                        var u = o.dom;
                        u.nextSibling ? l.insertBefore(e.dom, u.nextSibling) : l.appendChild(e.dom)
                    } else l.firstChild ? l.insertBefore(e.dom, l.firstChild) : l.appendChild(e.dom)
            },
            eachLayer: function (t, e) {
                var n, i, r = this._zlevelList;
                for (i = 0; i < r.length; i++) n = r[i], t.call(e, this._layers[n], n)
            },
            eachBuiltinLayer: function (t, e) {
                var n, i, r, a = this._zlevelList;
                for (r = 0; r < a.length; r++) i = a[r], n = this._layers[i], n.__builtin__ && t.call(e, n, i)
            },
            eachOtherLayer: function (t, e) {
                var n, i, r, a = this._zlevelList;
                for (r = 0; r < a.length; r++) i = a[r], n = this._layers[i], n.__builtin__ || t.call(e, n, i)
            },
            getLayers: function () {
                return this._layers
            },
            _updateLayerStatus: function (t) {
                function e(t) {
                    r && (r.__endIndex !== t && (r.__dirty = !0), r.__endIndex = t)
                }
                if (this.eachBuiltinLayer(function (t, e) {
                        t.__dirty = t.__used = !1
                    }), this._singleCanvas)
                    for (var n = 1; n < t.length; n++) {
                        var i = t[n];
                        if (i.zlevel !== t[n - 1].zlevel || i.incremental) {
                            this._needsManuallyCompositing = !0;
                            break
                        }
                    }
                for (var r = null, a = 0, n = 0; n < t.length; n++) {
                    var o, i = t[n],
                        s = i.zlevel;
                    i.incremental ? (o = this.getLayer(s + .001, this._needsManuallyCompositing), o.incremental = !0, a = 1) : o = this.getLayer(s + (a > 0 ? .01 : 0), this._needsManuallyCompositing), o.__builtin__ || d("ZLevel " + s + " has been used by unkown layer " + o.id), o !== r && (o.__used = !0, o.__startIndex !== n && (o.__dirty = !0), o.__startIndex = n, o.incremental ? o.__drawIndex = -1 : o.__drawIndex = n, e(n), r = o), i.__dirty && (o.__dirty = !0, o.incremental && o.__drawIndex < 0 && (o.__drawIndex = n))
                }
                e(n), this.eachBuiltinLayer(function (t, e) {
                    !t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex)
                })
            },
            clear: function () {
                return this.eachBuiltinLayer(this._clearLayer), this
            },
            _clearLayer: function (t) {
                t.clear()
            },
            setBackgroundColor: function (t) {
                this._backgroundColor = t
            },
            configLayer: function (t, e) {
                if (e) {
                    var n = this._layerConfig;
                    n[t] ? h.merge(n[t], e, !0) : n[t] = e;
                    for (var i = 0; i < this._zlevelList.length; i++) {
                        var r = this._zlevelList[i];
                        if (r === t || r === t + .01) {
                            var a = this._layers[r];
                            h.merge(a, n[t], !0)
                        }
                    }
                }
            },
            delLayer: function (t) {
                var e = this._layers,
                    n = this._zlevelList,
                    i = e[t];
                i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(h.indexOf(n, t), 1))
            },
            resize: function (t, e) {
                if (this._domRoot.style) {
                    var n = this._domRoot;
                    n.style.display = "none";
                    var i = this._opts;
                    if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), e = this._getSize(1), n.style.display = "", this._width !== t || e !== this._height) {
                        n.style.width = t + "px", n.style.height = e + "px";
                        for (var r in this._layers) this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);
                        h.each(this._progressiveLayers, function (n) {
                            n.resize(t, e)
                        }), this.refresh(!0)
                    }
                    this._width = t, this._height = e
                } else {
                    if (null == t || null == e) return;
                    this._width = t, this._height = e, this.getLayer(314159).resize(t, e)
                }
                return this
            },
            clearLayer: function (t) {
                var e = this._layers[t];
                e && e.clear()
            },
            dispose: function () {
                this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
            },
            getRenderedCanvas: function (t) {
                if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[314159].dom;
                var e = new g("image", this, t.pixelRatio || this.dpr);
                if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {
                    this.refresh();
                    var n = e.dom.width,
                        i = e.dom.height,
                        r = e.ctx;
                    this.eachLayer(function (t) {
                        t.__builtin__ ? r.drawImage(t.dom, 0, 0, n, i) : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx), e.ctx.restore())
                    })
                } else
                    for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
                        var l = o[s];
                        this._doPaintEl(l, e, !0, a)
                    }
                return e.dom
            },
            getWidth: function () {
                return this._width
            },
            getHeight: function () {
                return this._height
            },
            _getSize: function (t) {
                var e = this._opts,
                    n = ["width", "height"][t],
                    r = ["clientWidth", "clientHeight"][t],
                    a = ["paddingLeft", "paddingTop"][t],
                    o = ["paddingRight", "paddingBottom"][t];
                if (null != e[n] && "auto" !== e[n]) return parseFloat(e[n]);
                var s = this.root,
                    l = document.defaultView.getComputedStyle(s);
                return (s[r] || i(l[n]) || i(s.style[n])) - (i(l[a]) || 0) - (i(l[o]) || 0) | 0
            },
            pathToImage: function (t, e) {
                e = e || this.dpr;
                var n = document.createElement("canvas"),
                    i = n.getContext("2d"),
                    r = t.getBoundingRect(),
                    a = t.style,
                    o = a.shadowBlur * e,
                    s = a.shadowOffsetX * e,
                    l = a.shadowOffsetY * e,
                    u = a.hasStroke() ? a.lineWidth : 0,
                    c = Math.max(u / 2, -s + o),
                    h = Math.max(u / 2, s + o),
                    d = Math.max(u / 2, -l + o),
                    f = Math.max(u / 2, l + o),
                    p = r.width + c + h,
                    g = r.height + d + f;
                n.width = p * e, n.height = g * e, i.scale(e, e), i.clearRect(0, 0, p, g), i.dpr = e;
                var v = {
                    position: t.position,
                    rotation: t.rotation,
                    scale: t.scale
                };
                t.position = [c - r.x, d - r.y], t.rotation = 0, t.scale = [1, 1], t.updateTransform(), t && t.brush(i);
                var y = m,
                    _ = new y({
                        style: {
                            x: 0,
                            y: 0,
                            image: n
                        }
                    });
                return null != v.position && (_.position = t.position = v.position), null != v.rotation && (_.rotation = t.rotation = v.rotation), null != v.scale && (_.scale = t.scale = v.scale), _
            }
        };
        var w = b;
        t.exports = w
    }, function (t, e, n) {
        function i() {
            return !1
        }

        function r(t, e, n) {
            var i = a.createCanvas(),
                r = e.getWidth(),
                o = e.getHeight(),
                s = i.style;
            return s && (s.position = "absolute", s.left = 0, s.top = 0, s.width = r + "px", s.height = o + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = o * n, i
        }
        var a = n(0),
            o = n(45),
            s = o.devicePixelRatio,
            l = n(69),
            u = n(109),
            c = function (t, e, n) {
                var o;
                n = n || s, "string" == typeof t ? o = r(t, e, n) : a.isObject(t) && (o = t, t = o.id), this.id = t, this.dom = o;
                var l = o.style;
                l && (o.onselectstart = i, l["-webkit-user-select"] = "none", l["user-select"] = "none", l["-webkit-touch-callout"] = "none", l["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", l.padding = 0, l.margin = 0, l["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = n
            };
        c.prototype = {
            constructor: c,
            __dirty: !0,
            __used: !1,
            __drawIndex: 0,
            __startIndex: 0,
            __endIndex: 0,
            incremental: !1,
            getElementCount: function () {
                return this.__endIndex - this.__startIndex
            },
            initContext: function () {
                this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
            },
            createBackBuffer: function () {
                var t = this.dpr;
                this.domBack = r("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 !== t && this.ctxBack.scale(t, t)
            },
            resize: function (t, e) {
                var n = this.dpr,
                    i = this.dom,
                    r = i.style,
                    a = this.domBack;
                r && (r.width = t + "px", r.height = e + "px"), i.width = t * n, i.height = e * n, a && (a.width = t * n, a.height = e * n, 1 !== n && this.ctxBack.scale(n, n))
            },
            clear: function (t, e) {
                var n = this.dom,
                    i = this.ctx,
                    r = n.width,
                    a = n.height,
                    e = e || this.clearColor,
                    o = this.motionBlur && !t,
                    s = this.lastFrameAlpha,
                    c = this.dpr;
                if (o && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(n, 0, 0, r / c, a / c)), i.clearRect(0, 0, r, a), e && "transparent" !== e) {
                    var h;
                    e.colorStops ? (h = e.__canvasGradient || l.getGradient(i, e, {
                        x: 0,
                        y: 0,
                        width: r,
                        height: a
                    }), e.__canvasGradient = h) : e.image && (h = u.prototype.getCanvasPattern.call(e, i)), i.save(), i.fillStyle = h || e, i.fillRect(0, 0, r, a), i.restore()
                }
                if (o) {
                    var d = this.domBack;
                    i.save(), i.globalAlpha = s, i.drawImage(d, 0, 0, r, a), i.restore()
                }
            }
        };
        var h = c;
        t.exports = h
    }, function (t, e, n) {
        var i = n(111),
            r = n(9),
            a = n(46),
            o = a.WILL_BE_RESTORED,
            s = new r,
            l = function () {};
        l.prototype = {
            constructor: l,
            drawRectText: function (t, e) {
                var n = this.style;
                e = n.textRect || e, this.__dirty && i.normalizeTextStyle(n, !0);
                var r = n.text;
                if (null != r && (r += ""), i.needDrawText(r, n)) {
                    t.save();
                    var a = this.transform;
                    n.transformText ? this.setTransform(t) : a && (s.copy(e), s.applyTransform(a), e = s), i.renderText(this, t, r, n, e, o), t.restore()
                }
            }
        };
        var u = l;
        t.exports = u
    }, function (t, e, n) {
        var i = n(0),
            r = n(25),
            a = r.Dispatcher,
            o = n(110),
            s = n(105),
            l = function (t) {
                t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {}, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, a.call(this)
            };
        l.prototype = {
            constructor: l,
            addClip: function (t) {
                this._clips.push(t)
            },
            addAnimator: function (t) {
                t.animation = this;
                for (var e = t.getClips(), n = 0; n < e.length; n++) this.addClip(e[n])
            },
            removeClip: function (t) {
                var e = i.indexOf(this._clips, t);
                e >= 0 && this._clips.splice(e, 1)
            },
            removeAnimator: function (t) {
                for (var e = t.getClips(), n = 0; n < e.length; n++) this.removeClip(e[n]);
                t.animation = null
            },
            _update: function () {
                for (var t = (new Date).getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n.length, r = [], a = [], o = 0; o < i; o++) {
                    var s = n[o],
                        l = s.step(t, e);
                    l && (r.push(l), a.push(s))
                }
                for (var o = 0; o < i;) n[o]._needsRemove ? (n[o] = n[i - 1], n.pop(), i--) : o++;
                i = r.length;
                for (var o = 0; o < i; o++) a[o].fire(r[o]);
                this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update()
            },
            _startLoop: function () {
                function t() {
                    e._running && (o(t), !e._paused && e._update())
                }
                var e = this;
                this._running = !0, o(t)
            },
            start: function () {
                this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
            },
            stop: function () {
                this._running = !1
            },
            pause: function () {
                this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
            },
            resume: function () {
                this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
            },
            clear: function () {
                this._clips = []
            },
            isFinished: function () {
                return !this._clips.length
            },
            animate: function (t, e) {
                e = e || {};
                var n = new s(t, e.loop, e.getter, e.setter);
                return this.addAnimator(n), n
            }
        }, i.mixin(l, a);
        var u = l;
        t.exports = u
    }, function (t, e, n) {
        function i(t) {
            return "mousewheel" === t && p.browser.firefox ? "DOMMouseScroll" : t
        }

        function r(t) {
            t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function () {
                t._touching = !1
            }, 700)
        }

        function a(t) {
            var e = t.pointerType;
            return "pen" === e || "touch" === e
        }

        function o(t) {
            function e(t, e) {
                return function () {
                    if (!e._touching) return t.apply(e, arguments)
                }
            }
            d.each(v, function (e) {
                t._handlers[e] = d.bind(_[e], t)
            }), d.each(y, function (e) {
                t._handlers[e] = d.bind(_[e], t)
            }), d.each(g, function (n) {
                t._handlers[n] = e(_[n], t)
            })
        }

        function s(t) {
            function e(e, n) {
                d.each(e, function (e) {
                    u(t, i(e), n._handlers[e])
                }, n)
            }
            f.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._handlers = {}, o(this), p.pointerEventsSupported ? e(y, this) : (p.touchEventsSupported && e(v, this), e(g, this))
        }
        var l = n(25),
            u = l.addEventListener,
            c = l.removeEventListener,
            h = l.normalizeEvent,
            d = n(0),
            f = n(34),
            p = n(8),
            g = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
            v = ["touchstart", "touchend", "touchmove"],
            m = {
                pointerdown: 1,
                pointerup: 1,
                pointermove: 1,
                pointerout: 1
            },
            y = d.map(g, function (t) {
                var e = t.replace("mouse", "pointer");
                return m[e] ? e : t
            }),
            _ = {
                mousemove: function (t) {
                    t = h(this.dom, t), this.trigger("mousemove", t)
                },
                mouseout: function (t) {
                    t = h(this.dom, t);
                    var e = t.toElement || t.relatedTarget;
                    if (e !== this.dom)
                        for (; e && 9 !== e.nodeType;) {
                            if (e === this.dom) return;
                            e = e.parentNode
                        }
                    this.trigger("mouseout", t)
                },
                touchstart: function (t) {
                    t = h(this.dom, t), t.zrByTouch = !0, this._lastTouchMoment = new Date, this.handler.processGesture(this, t, "start"), _.mousemove.call(this, t), _.mousedown.call(this, t), r(this)
                },
                touchmove: function (t) {
                    t = h(this.dom, t), t.zrByTouch = !0, this.handler.processGesture(this, t, "change"), _.mousemove.call(this, t), r(this)
                },
                touchend: function (t) {
                    t = h(this.dom, t), t.zrByTouch = !0, this.handler.processGesture(this, t, "end"), _.mouseup.call(this, t), +new Date - this._lastTouchMoment < 300 && _.click.call(this, t), r(this)
                },
                pointerdown: function (t) {
                    _.mousedown.call(this, t)
                },
                pointermove: function (t) {
                    a(t) || _.mousemove.call(this, t)
                },
                pointerup: function (t) {
                    _.mouseup.call(this, t)
                },
                pointerout: function (t) {
                    a(t) || _.mouseout.call(this, t)
                }
            };
        d.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
            _[t] = function (e) {
                e = h(this.dom, e), this.trigger(t, e)
            }
        });
        var x = s.prototype;
        x.dispose = function () {
            for (var t = g.concat(v), e = 0; e < t.length; e++) {
                var n = t[e];
                c(this.dom, i(n), this._handlers[n])
            }
        }, x.setCursor = function (t) {
            this.dom.style && (this.dom.style.cursor = t || "default")
        }, d.mixin(s, f);
        var b = s;
        t.exports = b
    }, function (t, e, n) {
        var i = n(48),
            r = i([
                ["lineWidth", "width"],
                ["stroke", "color"],
                ["opacity"],
                ["shadowBlur"],
                ["shadowOffsetX"],
                ["shadowOffsetY"],
                ["shadowColor"]
            ]),
            a = {
                getLineStyle: function (t) {
                    var e = r(this, t);
                    return e.lineDash = this.getLineDash(e.lineWidth), e
                },
                getLineDash: function (t) {
                    null == t && (t = 1);
                    var e = this.get("type"),
                        n = Math.max(t, 2),
                        i = 4 * t;
                    return "solid" !== e && null != e && ("dashed" === e ? [i, i] : [n, n])
                }
            };
        t.exports = a
    }, function (t, e, n) {
        var i = n(48),
            r = i([
                ["fill", "color"],
                ["shadowBlur"],
                ["shadowOffsetX"],
                ["shadowOffsetY"],
                ["opacity"],
                ["shadowColor"]
            ]),
            a = {
                getAreaStyle: function (t, e) {
                    return r(this, t, e)
                }
            };
        t.exports = a
    }, function (t, e, n) {
        var i = n(16),
            r = n(2),
            a = ["textStyle", "color"],
            o = {
                getTextColor: function (t) {
                    var e = this.ecModel;
                    return this.getShallow("color") || (!t && e ? e.get(a) : null)
                },
                getFont: function () {
                    return r.getFont({
                        fontStyle: this.getShallow("fontStyle"),
                        fontWeight: this.getShallow("fontWeight"),
                        fontSize: this.getShallow("fontSize"),
                        fontFamily: this.getShallow("fontFamily")
                    }, this.ecModel)
                },
                getTextRect: function (t) {
                    return i.getBoundingRect(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"))
                }
            };
        t.exports = o
    }, function (t, e, n) {
        function i(t, e) {
            return Math.abs(t - e) < w
        }

        function r() {
            var t = M[0];
            M[0] = M[1], M[1] = t
        }

        function a(t, e, n, i, a, o, s, l, u, c) {
            if (c > e && c > i && c > o && c > l || c < e && c < i && c < o && c < l) return 0;
            var h = y.cubicRootAt(e, i, o, l, c, S);
            if (0 === h) return 0;
            for (var d, f, p = 0, g = -1, v = 0; v < h; v++) {
                var m = S[v],
                    _ = 0 === m || 1 === m ? .5 : 1;
                y.cubicAt(t, n, a, s, m) < u || (g < 0 && (g = y.cubicExtrema(e, i, o, l, M), M[1] < M[0] && g > 1 && r(), d = y.cubicAt(e, i, o, l, M[0]), g > 1 && (f = y.cubicAt(e, i, o, l, M[1]))), 2 === g ? m < M[0] ? p += d < e ? _ : -_ : m < M[1] ? p += f < d ? _ : -_ : p += l < f ? _ : -_ : m < M[0] ? p += d < e ? _ : -_ : p += l < d ? _ : -_)
            }
            return p
        }

        function o(t, e, n, i, r, a, o, s) {
            if (s > e && s > i && s > a || s < e && s < i && s < a) return 0;
            var l = y.quadraticRootAt(e, i, a, s, S);
            if (0 === l) return 0;
            var u = y.quadraticExtremum(e, i, a);
            if (u >= 0 && u <= 1) {
                for (var c = 0, h = y.quadraticAt(e, i, a, u), d = 0; d < l; d++) {
                    var f = 0 === S[d] || 1 === S[d] ? .5 : 1,
                        p = y.quadraticAt(t, n, r, S[d]);
                    p < o || (S[d] < u ? c += h < e ? f : -f : c += a < h ? f : -f)
                }
                return c
            }
            var f = 0 === S[0] || 1 === S[0] ? .5 : 1,
                p = y.quadraticAt(t, n, r, S[0]);
            return p < o ? 0 : a < e ? f : -f
        }

        function s(t, e, n, i, r, a, o, s) {
            if ((s -= e) > n || s < -n) return 0;
            var l = Math.sqrt(n * n - s * s);
            S[0] = -l, S[1] = l;
            var u = Math.abs(i - r);
            if (u < 1e-4) return 0;
            if (u % b < 1e-4) {
                i = 0, r = b;
                var c = a ? 1 : -1;
                return o >= S[0] + t && o <= S[1] + t ? c : 0
            }
            if (a) {
                var l = i;
                i = m(r), r = m(l)
            } else i = m(i), r = m(r);
            i > r && (r += b);
            for (var h = 0, d = 0; d < 2; d++) {
                var f = S[d];
                if (f + t > o) {
                    var p = Math.atan2(s, f),
                        c = a ? 1 : -1;
                    p < 0 && (p = b + p), (p >= i && p <= r || p + b >= i && p + b <= r) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (c = -c), h += c)
                }
            }
            return h
        }

        function l(t, e, n, r, l) {
            for (var u = 0, c = 0, h = 0, v = 0, m = 0, y = 0; y < t.length;) {
                var b = t[y++];
                switch (b === x.M && y > 1 && (n || (u += _(c, h, v, m, r, l))), 1 === y && (c = t[y], h = t[y + 1], v = c, m = h), b) {
                    case x.M:
                        v = t[y++], m = t[y++], c = v, h = m;
                        break;
                    case x.L:
                        if (n) {
                            if (d.containStroke(c, h, t[y], t[y + 1], e, r, l)) return !0
                        } else u += _(c, h, t[y], t[y + 1], r, l) || 0;
                        c = t[y++], h = t[y++];
                        break;
                    case x.C:
                        if (n) {
                            if (f.containStroke(c, h, t[y++], t[y++], t[y++], t[y++], t[y], t[y + 1], e, r, l)) return !0
                        } else u += a(c, h, t[y++], t[y++], t[y++], t[y++], t[y], t[y + 1], r, l) || 0;
                        c = t[y++], h = t[y++];
                        break;
                    case x.Q:
                        if (n) {
                            if (p.containStroke(c, h, t[y++], t[y++], t[y], t[y + 1], e, r, l)) return !0
                        } else u += o(c, h, t[y++], t[y++], t[y], t[y + 1], r, l) || 0;
                        c = t[y++], h = t[y++];
                        break;
                    case x.A:
                        var w = t[y++],
                            S = t[y++],
                            M = t[y++],
                            T = t[y++],
                            A = t[y++],
                            C = t[y++];
                        y += 1;
                        var I = 1 - t[y++],
                            D = Math.cos(A) * M + w,
                            k = Math.sin(A) * T + S;
                        y > 1 ? u += _(c, h, D, k, r, l) : (v = D, m = k);
                        var O = (r - w) * T / M + w;
                        if (n) {
                            if (g.containStroke(w, S, T, A, A + C, I, e, O, l)) return !0
                        } else u += s(w, S, T, A, A + C, I, O, l);
                        c = Math.cos(A + C) * M + w, h = Math.sin(A + C) * T + S;
                        break;
                    case x.R:
                        v = c = t[y++], m = h = t[y++];
                        var P = t[y++],
                            L = t[y++],
                            D = v + P,
                            k = m + L;
                        if (n) {
                            if (d.containStroke(v, m, D, m, e, r, l) || d.containStroke(D, m, D, k, e, r, l) || d.containStroke(D, k, v, k, e, r, l) || d.containStroke(v, k, v, m, e, r, l)) return !0
                        } else u += _(D, m, D, k, r, l), u += _(v, k, v, m, r, l);
                        break;
                    case x.Z:
                        if (n) {
                            if (d.containStroke(c, h, v, m, e, r, l)) return !0
                        } else u += _(c, h, v, m, r, l);
                        c = v, h = m
                }
            }
            return n || i(h, m) || (u += _(c, h, v, m, r, l) || 0), 0 !== u
        }

        function u(t, e, n) {
            return l(t, 0, !1, e, n)
        }

        function c(t, e, n, i) {
            return l(t, e, !0, n, i)
        }
        var h = n(49),
            d = n(199),
            f = n(200),
            p = n(201),
            g = n(202),
            v = n(116),
            m = v.normalizeRadian,
            y = n(26),
            _ = n(117),
            x = h.CMD,
            b = 2 * Math.PI,
            w = 1e-4,
            S = [-1, -1, -1],
            M = [-1, -1];
        e.contain = u, e.containStroke = c
    }, function (t, e) {
        function n(t, e, n, i, r, a, o) {
            if (0 === r) return !1;
            var s = r,
                l = 0,
                u = t;
            if (o > e + s && o > i + s || o < e - s && o < i - s || a > t + s && a > n + s || a < t - s && a < n - s) return !1;
            if (t === n) return Math.abs(a - t) <= s / 2;
            l = (e - i) / (t - n), u = (t * i - n * e) / (t - n);
            var c = l * a - o + u;
            return c * c / (l * l + 1) <= s / 2 * s / 2
        }
        e.containStroke = n
    }, function (t, e, n) {
        function i(t, e, n, i, a, o, s, l, u, c, h) {
            if (0 === u) return !1;
            var d = u;
            return !(h > e + d && h > i + d && h > o + d && h > l + d || h < e - d && h < i - d && h < o - d && h < l - d || c > t + d && c > n + d && c > a + d && c > s + d || c < t - d && c < n - d && c < a - d && c < s - d) && r.cubicProjectPoint(t, e, n, i, a, o, s, l, c, h, null) <= d / 2
        }
        var r = n(26);
        e.containStroke = i
    }, function (t, e, n) {
        function i(t, e, n, i, r, o, s, l, u) {
            if (0 === s) return !1;
            var c = s;
            return !(u > e + c && u > i + c && u > o + c || u < e - c && u < i - c && u < o - c || l > t + c && l > n + c && l > r + c || l < t - c && l < n - c && l < r - c) && a(t, e, n, i, r, o, l, u, null) <= c / 2
        }
        var r = n(26),
            a = r.quadraticProjectPoint;
        e.containStroke = i
    }, function (t, e, n) {
        function i(t, e, n, i, r, s, l, u, c) {
            if (0 === l) return !1;
            var h = l;
            u -= t, c -= e;
            var d = Math.sqrt(u * u + c * c);
            if (d - h > n || d + h < n) return !1;
            if (Math.abs(i - r) % o < 1e-4) return !0;
            if (s) {
                var f = i;
                i = a(r), r = a(f)
            } else i = a(i), r = a(r);
            i > r && (r += o);
            var p = Math.atan2(c, u);
            return p < 0 && (p += o), p >= i && p <= r || p + o >= i && p + o <= r
        }
        var r = n(116),
            a = r.normalizeRadian,
            o = 2 * Math.PI;
        e.containStroke = i
    }, function (t, e, n) {
        function i(t, e) {
            var n, i, r, a, h, d, f = t.data,
                p = s.M,
                g = s.C,
                v = s.L,
                m = s.R,
                y = s.A,
                _ = s.Q;
            for (r = 0, a = 0; r < f.length;) {
                switch (n = f[r++], a = r, i = 0, n) {
                    case p:
                    case v:
                        i = 1;
                        break;
                    case g:
                        i = 3;
                        break;
                    case _:
                        i = 2;
                        break;
                    case y:
                        var x = e[4],
                            b = e[5],
                            w = u(e[0] * e[0] + e[1] * e[1]),
                            S = u(e[2] * e[2] + e[3] * e[3]),
                            M = c(-e[1] / S, e[0] / w);
                        f[r] *= w, f[r++] += x, f[r] *= S, f[r++] += b, f[r++] *= w, f[r++] *= S, f[r++] += M, f[r++] += M, r += 2, a = r;
                        break;
                    case m:
                        d[0] = f[r++], d[1] = f[r++], o(d, d, e), f[a++] = d[0], f[a++] = d[1], d[0] += f[r++], d[1] += f[r++], o(d, d, e), f[a++] = d[0], f[a++] = d[1]
                }
                for (h = 0; h < i; h++) {
                    var d = l[h];
                    d[0] = f[r++], d[1] = f[r++], o(d, d, e), f[a++] = d[0], f[a++] = d[1]
                }
            }
        }
        var r = n(49),
            a = n(7),
            o = a.applyTransform,
            s = r.CMD,
            l = [
                [],
                [],
                []
            ],
            u = Math.sqrt,
            c = Math.atan2;
        t.exports = i
    }, function (t, e, n) {
        var i = n(6),
            r = n(119),
            a = i.extend({
                type: "sector",
                shape: {
                    cx: 0,
                    cy: 0,
                    r0: 0,
                    r: 0,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    clockwise: !0
                },
                brush: r(i.prototype.brush),
                buildPath: function (t, e) {
                    var n = e.cx,
                        i = e.cy,
                        r = Math.max(e.r0 || 0, 0),
                        a = Math.max(e.r, 0),
                        o = e.startAngle,
                        s = e.endAngle,
                        l = e.clockwise,
                        u = Math.cos(o),
                        c = Math.sin(o);
                    t.moveTo(u * r + n, c * r + i), t.lineTo(u * a + n, c * a + i), t.arc(n, i, a, o, s, !l), t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), t.closePath()
                }
            });
        t.exports = a
    }, function (t, e, n) {
        var i = n(6),
            r = i.extend({
                type: "ring",
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 0,
                    r0: 0
                },
                buildPath: function (t, e) {
                    var n = e.cx,
                        i = e.cy,
                        r = 2 * Math.PI;
                    t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0)
                }
            });
        t.exports = r
    }, function (t, e, n) {
        function i(t, e, n, i, r, a, o) {
            var s = .5 * (n - t),
                l = .5 * (i - e);
            return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e
        }

        function r(t, e) {
            for (var n = t.length, r = [], a = 0, s = 1; s < n; s++) a += o(t[s - 1], t[s]);
            var l = a / 2;
            l = l < n ? n : l;
            for (var s = 0; s < l; s++) {
                var u, c, h, d = s / (l - 1) * (e ? n : n - 1),
                    f = Math.floor(d),
                    p = d - f,
                    g = t[f % n];
                e ? (u = t[(f - 1 + n) % n], c = t[(f + 1) % n], h = t[(f + 2) % n]) : (u = t[0 === f ? f : f - 1], c = t[f > n - 2 ? n - 1 : f + 1], h = t[f > n - 3 ? n - 1 : f + 2]);
                var v = p * p,
                    m = p * v;
                r.push([i(u[0], g[0], c[0], h[0], p, v, m), i(u[1], g[1], c[1], h[1], p, v, m)])
            }
            return r
        }
        var a = n(7),
            o = a.distance;
        t.exports = r
    }, function (t, e, n) {
        function i(t, e, n, i) {
            var r, d, f, p, g = [],
                v = [],
                m = [],
                y = [];
            if (i) {
                f = [1 / 0, 1 / 0], p = [-1 / 0, -1 / 0];
                for (var _ = 0, x = t.length; _ < x; _++) a(f, f, t[_]), o(p, p, t[_]);
                a(f, f, i[0]), o(p, p, i[1])
            }
            for (var _ = 0, x = t.length; _ < x; _++) {
                var b = t[_];
                if (n) r = t[_ ? _ - 1 : x - 1], d = t[(_ + 1) % x];
                else {
                    if (0 === _ || _ === x - 1) {
                        g.push(c(t[_]));
                        continue
                    }
                    r = t[_ - 1], d = t[_ + 1]
                }
                h(v, d, r), s(v, v, e);
                var w = l(b, r),
                    S = l(b, d),
                    M = w + S;
                0 !== M && (w /= M, S /= M), s(m, v, -w), s(y, v, S);
                var T = u([], b, m),
                    A = u([], b, y);
                i && (o(T, T, f), a(T, T, p), o(A, A, f), a(A, A, p)), g.push(T), g.push(A)
            }
            return n && g.push(g.shift()), g
        }
        var r = n(7),
            a = r.min,
            o = r.max,
            s = r.scale,
            l = r.distance,
            u = r.add,
            c = r.clone,
            h = r.sub;
        t.exports = i
    }, function (t, e, n) {
        function i(t, e, n) {
            var i = t.cpx2,
                r = t.cpy2;
            return null === i || null === r ? [(n ? d : c)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? d : c)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(n ? h : u)(t.x1, t.cpx1, t.x2, e), (n ? h : u)(t.y1, t.cpy1, t.y2, e)]
        }
        var r = n(6),
            a = n(7),
            o = n(26),
            s = o.quadraticSubdivide,
            l = o.cubicSubdivide,
            u = o.quadraticAt,
            c = o.cubicAt,
            h = o.quadraticDerivativeAt,
            d = o.cubicDerivativeAt,
            f = [],
            p = r.extend({
                type: "bezier-curve",
                shape: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0,
                    cpx1: 0,
                    cpy1: 0,
                    percent: 1
                },
                style: {
                    stroke: "#000",
                    fill: null
                },
                buildPath: function (t, e) {
                    var n = e.x1,
                        i = e.y1,
                        r = e.x2,
                        a = e.y2,
                        o = e.cpx1,
                        u = e.cpy1,
                        c = e.cpx2,
                        h = e.cpy2,
                        d = e.percent;
                    0 !== d && (t.moveTo(n, i), null == c || null == h ? (d < 1 && (s(n, o, r, d, f), o = f[1], r = f[2], s(i, u, a, d, f), u = f[1], a = f[2]), t.quadraticCurveTo(o, u, r, a)) : (d < 1 && (l(n, o, c, r, d, f), o = f[1], c = f[2], r = f[3], l(i, u, h, a, d, f), u = f[1], h = f[2], a = f[3]), t.bezierCurveTo(o, u, c, h, r, a)))
                },
                pointAt: function (t) {
                    return i(this.shape, t, !1)
                },
                tangentAt: function (t) {
                    var e = i(this.shape, t, !0);
                    return a.normalize(e, e)
                }
            });
        t.exports = p
    }, function (t, e, n) {
        var i = n(6),
            r = i.extend({
                type: "arc",
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 0,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    clockwise: !0
                },
                style: {
                    stroke: "#000",
                    fill: null
                },
                buildPath: function (t, e) {
                    var n = e.cx,
                        i = e.cy,
                        r = Math.max(e.r, 0),
                        a = e.startAngle,
                        o = e.endAngle,
                        s = e.clockwise,
                        l = Math.cos(a),
                        u = Math.sin(a);
                    t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, a, o, !s)
                }
            });
        t.exports = r
    }, function (t, e, n) {
        var i = n(6),
            r = i.extend({
                type: "compound",
                shape: {
                    paths: null
                },
                _updatePathDirty: function () {
                    for (var t = this.__dirtyPath, e = this.shape.paths, n = 0; n < e.length; n++) t = t || e[n].__dirtyPath;
                    this.__dirtyPath = t, this.__dirty = this.__dirty || t
                },
                beforeBrush: function () {
                    this._updatePathDirty();
                    for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++) t[n].path || t[n].createPathProxy(), t[n].path.setScale(e[0], e[1], t[n].segmentIgnoreThreshold)
                },
                buildPath: function (t, e) {
                    for (var n = e.paths || [], i = 0; i < n.length; i++) n[i].buildPath(t, n[i].shape, !0)
                },
                afterBrush: function () {
                    for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1
                },
                getBoundingRect: function () {
                    return this._updatePathDirty(), i.prototype.getBoundingRect.call(this)
                }
            });
        t.exports = r
    }, function (t, e, n) {
        var i = n(0),
            r = n(74),
            a = function (t, e, n, i, a) {
                this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, this.type = "radial", this.global = a || !1, r.call(this, i)
            };
        a.prototype = {
            constructor: a
        }, i.inherits(a, r);
        var o = a;
        t.exports = o
    }, function (t, e, n) {
        function i(t) {
            o.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0
        }
        var r = n(0),
            a = r.inherits,
            o = n(47),
            s = n(9);
        i.prototype.incremental = !0, i.prototype.clearDisplaybles = function () {
            this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1
        }, i.prototype.addDisplayable = function (t, e) {
            e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty()
        }, i.prototype.addDisplayables = function (t, e) {
            e = e || !1;
            for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e)
        }, i.prototype.eachPendingDisplayable = function (t) {
            for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
            for (var e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e])
        }, i.prototype.update = function () {
            this.updateTransform();
            for (var t = this._cursor; t < this._displayables.length; t++) {
                var e = this._displayables[t];
                e.parent = this, e.update(), e.parent = null
            }
            for (var t = 0; t < this._temporaryDisplayables.length; t++) {
                var e = this._temporaryDisplayables[t];
                e.parent = this, e.update(), e.parent = null
            }
        }, i.prototype.brush = function (t, e) {
            for (var n = this._cursor; n < this._displayables.length; n++) {
                var i = this._displayables[n];
                i.beforeBrush && i.beforeBrush(t), i.brush(t, n === this._cursor ? null : this._displayables[n - 1]), i.afterBrush && i.afterBrush(t)
            }
            this._cursor = n;
            for (var n = 0; n < this._temporaryDisplayables.length; n++) {
                var i = this._temporaryDisplayables[n];
                i.beforeBrush && i.beforeBrush(t), i.brush(t, 0 === n ? null : this._temporaryDisplayables[n - 1]), i.afterBrush && i.afterBrush(t)
            }
            this._temporaryDisplayables = [], this.notClear = !0
        };
        var l = [];
        i.prototype.getBoundingRect = function () {
            if (!this._rect) {
                for (var t = new s(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
                    var n = this._displayables[e],
                        i = n.getBoundingRect().clone();
                    n.needLocalTransform() && i.applyTransform(n.getLocalTransform(l)), t.union(i)
                }
                this._rect = t
            }
            return this._rect
        }, i.prototype.contain = function (t, e) {
            var n = this.transformCoordToLocal(t, e);
            if (this.getBoundingRect().contain(n[0], n[1]))
                for (var i = 0; i < this._displayables.length; i++) {
                    var r = this._displayables[i];
                    if (r.contain(t, e)) return !0
                }
            return !1
        }, a(i, o);
        var u = i;
        t.exports = u
    }, function (t, e, n) {
        var i = n(48),
            r = i([
                ["fill", "color"],
                ["stroke", "borderColor"],
                ["lineWidth", "borderWidth"],
                ["opacity"],
                ["shadowBlur"],
                ["shadowOffsetX"],
                ["shadowOffsetY"],
                ["shadowColor"],
                ["textPosition"],
                ["textAlign"]
            ]),
            a = {
                getItemStyle: function (t, e) {
                    var n = r(this, t, e),
                        i = this.getBorderLineDash();
                    return i && (n.lineDash = i), n
                },
                getBorderLineDash: function () {
                    var t = this.get("borderType");
                    return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1]
                }
            };
        t.exports = a
    }, function (t, e) {
        var n = {
            getBoxLayoutParams: function () {
                return {
                    left: this.get("left"),
                    top: this.get("top"),
                    right: this.get("right"),
                    bottom: this.get("bottom"),
                    width: this.get("width"),
                    height: this.get("height")
                }
            }
        };
        t.exports = n
    }, function (t, e) {
        var n = "";
        "undefined" != typeof navigator && (n = navigator.platform || "");
        var i = {
            color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
            gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
            textStyle: {
                fontFamily: n.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: "normal"
            },
            blendMode: null,
            animation: "auto",
            animationDuration: 1e3,
            animationDurationUpdate: 300,
            animationEasing: "exponentialOut",
            animationEasingUpdate: "cubicOut",
            animationThreshold: 2e3,
            progressiveThreshold: 3e3,
            progressive: 400,
            hoverLayerThreshold: 3e3,
            useUTC: !1
        };
        t.exports = i
    }, function (t, e, n) {
        function i(t) {
            this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption
        }

        function r(t, e, n) {
            var i, r, a = [],
                o = [],
                s = t.timeline;
            if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), t.media) {
                r = r || {};
                var l = t.media;
                d(l, function (t) {
                    t && t.option && (t.query ? o.push(t) : i || (i = t))
                })
            }
            return r || (r = t), r.timeline || (r.timeline = s), d([r].concat(a).concat(u.map(o, function (t) {
                return t.option
            })), function (t) {
                d(e, function (e) {
                    e(t, n)
                })
            }), {
                baseOption: r,
                timelineOptions: a,
                mediaDefault: i,
                mediaList: o
            }
        }

        function a(t, e, n) {
            var i = {
                    width: e,
                    height: n,
                    aspectratio: e / n
                },
                r = !0;
            return u.each(t, function (t, e) {
                var n = e.match(v);
                if (n && n[1] && n[2]) {
                    var a = n[1],
                        s = n[2].toLowerCase();
                    o(i[s], t, a) || (r = !1)
                }
            }), r
        }

        function o(t, e, n) {
            return "min" === n ? t >= e : "max" === n ? t <= e : t === e
        }

        function s(t, e) {
            return t.join(",") === e.join(",")
        }

        function l(t, e) {
            e = e || {}, d(e, function (e, n) {
                if (null != e) {
                    var i = t[n];
                    if (h.hasClass(n)) {
                        e = c.normalizeToArray(e), i = c.normalizeToArray(i);
                        var r = c.mappingToExists(i, e);
                        t[n] = p(r, function (t) {
                            return t.option && t.exist ? g(t.exist, t.option, !0) : t.exist || t.option
                        })
                    } else t[n] = g(i, e, !0)
                }
            })
        }
        var u = n(0),
            c = n(1),
            h = n(13),
            d = u.each,
            f = u.clone,
            p = u.map,
            g = u.merge,
            v = /^(min|max)?(.+)$/;
        i.prototype = {
            constructor: i,
            setOption: function (t, e) {
                t && u.each(c.normalizeToArray(t.series), function (t) {
                    t && t.data && u.isTypedArray(t.data) && u.setAsPrimitive(t.data)
                }), t = f(t);
                var n = this._optionBackup,
                    i = r.call(this, t, e, !n);
                this._newBaseOption = i.baseOption, n ? (l(n.baseOption, i.baseOption), i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i
            },
            mountOption: function (t) {
                var e = this._optionBackup;
                return this._timelineOptions = p(e.timelineOptions, f), this._mediaList = p(e.mediaList, f), this._mediaDefault = f(e.mediaDefault), this._currentMediaIndices = [], f(t ? e.baseOption : this._newBaseOption)
            },
            getTimelineOption: function (t) {
                var e, n = this._timelineOptions;
                if (n.length) {
                    var i = t.getComponent("timeline");
                    i && (e = f(n[i.getCurrentIndex()], !0))
                }
                return e
            },
            getMediaOption: function (t) {
                var e = this._api.getWidth(),
                    n = this._api.getHeight(),
                    i = this._mediaList,
                    r = this._mediaDefault,
                    o = [],
                    l = [];
                if (!i.length && !r) return l;
                for (var u = 0, c = i.length; u < c; u++) a(i[u].query, e, n) && o.push(u);
                return !o.length && r && (o = [-1]), o.length && !s(o, this._currentMediaIndices) && (l = p(o, function (t) {
                    return f(-1 === t ? r.option : i[t].option)
                })), this._currentMediaIndices = o, l
            }
        };
        var m = i;
        t.exports = m
    }, function (t, e, n) {
        function i(t, e) {
            e = e.split(",");
            for (var n = t, i = 0; i < e.length && null != (n = n && n[e[i]]); i++);
            return n
        }

        function r(t, e, n, i) {
            e = e.split(",");
            for (var r, a = t, o = 0; o < e.length - 1; o++) r = e[o], null == a[r] && (a[r] = {}), a = a[r];
            (i || null == a[e[o]]) && (a[e[o]] = n)
        }

        function a(t) {
            l(p, function (e) {
                e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]])
            })
        }

        function o(t, e) {
            h(t, e), t.series = f(t.series), l(t.series, function (t) {
                if (c(t)) {
                    var e = t.type;
                    if ("line" === e) null != t.clipOverflow && (t.clip = t.clipOverflow);
                    else if ("pie" === e || "gauge" === e) null != t.clockWise && (t.clockwise = t.clockWise);
                    else if ("gauge" === e) {
                        var n = i(t, "pointer.color");
                        null != n && r(t, "itemStyle.color", n)
                    }
                    a(t)
                }
            }), t.dataRange && (t.visualMap = t.dataRange), l(g, function (e) {
                var n = t[e];
                n && (u(n) || (n = [n]), l(n, function (t) {
                    a(t)
                }))
            })
        }
        var s = n(0),
            l = s.each,
            u = s.isArray,
            c = s.isObject,
            h = n(218),
            d = n(1),
            f = d.normalizeToArray,
            p = [
                ["x", "left"],
                ["y", "top"],
                ["x2", "right"],
                ["y2", "bottom"]
            ],
            g = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"];
        t.exports = o
    }, function (t, e, n) {
        function i(t) {
            var e = t && t.itemStyle;
            if (e)
                for (var n = 0, i = v.length; n < i; n++) {
                    var r = v[n],
                        a = e.normal,
                        o = e.emphasis;
                    a && a[r] && (t[r] = t[r] || {}, t[r].normal ? d.merge(t[r].normal, a[r]) : t[r].normal = a[r], a[r] = null), o && o[r] && (t[r] = t[r] || {}, t[r].emphasis ? d.merge(t[r].emphasis, o[r]) : t[r].emphasis = o[r], o[r] = null)
                }
        }

        function r(t, e, n) {
            if (t && t[e] && (t[e].normal || t[e].emphasis)) {
                var i = t[e].normal,
                    r = t[e].emphasis;
                i && (n ? (t[e].normal = t[e].emphasis = null, d.defaults(t[e], i)) : t[e] = i), r && (t.emphasis = t.emphasis || {}, t.emphasis[e] = r)
            }
        }

        function a(t) {
            r(t, "itemStyle"), r(t, "lineStyle"), r(t, "areaStyle"), r(t, "label"), r(t, "labelLine"), r(t, "upperLabel"), r(t, "edgeLabel")
        }

        function o(t, e) {
            var n = g(t) && t[e],
                i = g(n) && n.textStyle;
            if (i)
                for (var r = 0, a = f.TEXT_STYLE_OPTIONS.length; r < a; r++) {
                    var e = f.TEXT_STYLE_OPTIONS[r];
                    i.hasOwnProperty(e) && (n[e] = i[e])
                }
        }

        function s(t) {
            t && (a(t), o(t, "label"), t.emphasis && o(t.emphasis, "label"))
        }

        function l(t) {
            if (g(t)) {
                i(t), a(t), o(t, "label"), o(t, "upperLabel"), o(t, "edgeLabel"), t.emphasis && (o(t.emphasis, "label"), o(t.emphasis, "upperLabel"), o(t.emphasis, "edgeLabel"));
                var e = t.markPoint;
                e && (i(e), s(e));
                var n = t.markLine;
                n && (i(n), s(n));
                var l = t.markArea;
                l && s(l);
                var u = t.data;
                if ("graph" === t.type) {
                    u = u || t.nodes;
                    var c = t.links || t.edges;
                    if (c && !d.isTypedArray(c))
                        for (var h = 0; h < c.length; h++) s(c[h]);
                    d.each(t.categories, function (t) {
                        a(t)
                    })
                }
                if (u && !d.isTypedArray(u))
                    for (var h = 0; h < u.length; h++) s(u[h]);
                var e = t.markPoint;
                if (e && e.data)
                    for (var f = e.data, h = 0; h < f.length; h++) s(f[h]);
                var n = t.markLine;
                if (n && n.data)
                    for (var p = n.data, h = 0; h < p.length; h++) d.isArray(p[h]) ? (s(p[h][0]), s(p[h][1])) : s(p[h]);
                "gauge" === t.type ? (o(t, "axisLabel"), o(t, "title"), o(t, "detail")) : "treemap" === t.type ? (r(t.breadcrumb, "itemStyle"), d.each(t.levels, function (t) {
                    a(t)
                })) : "tree" === t.type && a(t.leaves)
            }
        }

        function u(t) {
            return d.isArray(t) ? t : t ? [t] : []
        }

        function c(t) {
            return (d.isArray(t) ? t[0] : t) || {}
        }

        function h(t, e) {
            p(u(t.series), function (t) {
                g(t) && l(t)
            });
            var n = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
            e && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), p(n, function (e) {
                p(u(t[e]), function (t) {
                    t && (o(t, "axisLabel"), o(t.axisPointer, "label"))
                })
            }), p(u(t.parallel), function (t) {
                var e = t && t.parallelAxisDefault;
                o(e, "axisLabel"), o(e && e.axisPointer, "label")
            }), p(u(t.calendar), function (t) {
                r(t, "itemStyle"), o(t, "dayLabel"), o(t, "monthLabel"), o(t, "yearLabel")
            }), p(u(t.radar), function (t) {
                o(t, "name")
            }), p(u(t.geo), function (t) {
                g(t) && (s(t), p(u(t.regions), function (t) {
                    s(t)
                }))
            }), p(u(t.timeline), function (t) {
                s(t), r(t, "label"), r(t, "itemStyle"), r(t, "controlStyle", !0);
                var e = t.data;
                d.isArray(e) && d.each(e, function (t) {
                    d.isObject(t) && (r(t, "label"), r(t, "itemStyle"))
                })
            }), p(u(t.toolbox), function (t) {
                r(t, "iconStyle"), p(t.feature, function (t) {
                    r(t, "iconStyle")
                })
            }), o(c(t.axisPointer), "label"), o(c(t.tooltip).axisPointer, "label")
        }
        var d = n(0),
            f = n(1),
            p = d.each,
            g = d.isObject,
            v = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
        t.exports = h
    }, function (t, e, n) {
        function i(t) {
            var e = o();
            t.eachSeries(function (t) {
                var n = t.get("stack");
                if (n) {
                    var i = e.get(n) || e.set(n, []),
                        r = t.getData(),
                        a = {
                            stackResultDimension: r.getCalculationInfo("stackResultDimension"),
                            stackedOverDimension: r.getCalculationInfo("stackedOverDimension"),
                            stackedDimension: r.getCalculationInfo("stackedDimension"),
                            stackedByDimension: r.getCalculationInfo("stackedByDimension"),
                            isStackedByIndex: r.getCalculationInfo("isStackedByIndex"),
                            data: r,
                            seriesModel: t
                        };
                    if (!a.stackedDimension || !a.isStackedByIndex && !a.stackedByDimension) return;
                    i.length && r.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), i.push(a)
                }
            }), e.each(r)
        }

        function r(t) {
            s(t, function (e, n) {
                var i = [],
                    r = [NaN, NaN],
                    a = [e.stackResultDimension, e.stackedOverDimension],
                    o = e.data,
                    s = e.isStackedByIndex,
                    l = o.map(a, function (a, l, u) {
                        var c = o.get(e.stackedDimension, u);
                        if (isNaN(c)) return r;
                        var h, d;
                        s ? d = o.getRawIndex(u) : h = o.get(e.stackedByDimension, u);
                        for (var f = NaN, p = n - 1; p >= 0; p--) {
                            var g = t[p];
                            if (s || (d = g.data.rawIndexOf(g.stackedByDimension, h)), d >= 0) {
                                var v = g.data.getByRawIndex(g.stackResultDimension, d);
                                if (c >= 0 && v > 0 || c <= 0 && v < 0) {
                                    c += v, f = v;
                                    break
                                }
                            }
                        }
                        return i[0] = c, i[1] = f, i
                    });
                o.hostModel.setData(l), e.data = l
            })
        }
        var a = n(0),
            o = a.createHashMap,
            s = a.each;
        t.exports = i
    }, function (t, e, n) {
        var i = n(27),
            r = i.retrieveRawValue,
            a = n(10),
            o = a.getTooltipMarker,
            s = a.formatTpl,
            l = n(1),
            u = l.getTooltipRenderMode,
            c = /\{@(.+?)\}/g,
            h = {
                getDataParams: function (t, e) {
                    var n = this.getData(e),
                        i = this.getRawValue(t, e),
                        r = n.getRawIndex(t),
                        a = n.getName(t),
                        s = n.getRawDataItem(t),
                        l = n.getItemVisual(t, "color"),
                        c = n.getItemVisual(t, "borderColor"),
                        h = this.ecModel.getComponent("tooltip"),
                        d = h && h.get("renderMode"),
                        f = u(d),
                        p = this.mainType,
                        g = "series" === p,
                        v = n.userOutput;
                    return {
                        componentType: p,
                        componentSubType: this.subType,
                        componentIndex: this.componentIndex,
                        seriesType: g ? this.subType : null,
                        seriesIndex: this.seriesIndex,
                        seriesId: g ? this.id : null,
                        seriesName: g ? this.name : null,
                        name: a,
                        dataIndex: r,
                        data: s,
                        dataType: e,
                        value: i,
                        color: l,
                        borderColor: c,
                        dimensionNames: v ? v.dimensionNames : null,
                        encode: v ? v.encode : null,
                        marker: o({
                            color: l,
                            renderMode: f
                        }),
                        $vars: ["seriesName", "name", "value"]
                    }
                },
                getFormattedLabel: function (t, e, n, i, a) {
                    e = e || "normal";
                    var o = this.getData(n),
                        l = o.getItemModel(t),
                        u = this.getDataParams(t, n);
                    null != i && u.value instanceof Array && (u.value = u.value[i]);
                    var h = l.get("normal" === e ? [a || "label", "formatter"] : [e, a || "label", "formatter"]);
                    if ("function" == typeof h) return u.status = e, u.dimensionIndex = i, h(u);
                    if ("string" == typeof h) {
                        return s(h, u).replace(c, function (e, n) {
                            var i = n.length;
                            return "[" === n.charAt(0) && "]" === n.charAt(i - 1) && (n = +n.slice(1, i - 1)), r(o, t, n)
                        })
                    }
                },
                getRawValue: function (t, e) {
                    return r(this.getData(e), t)
                },
                formatTooltip: function () {}
            };
        t.exports = h
    }, function (t, e, n) {
        var i = n(74),
            r = {
                createOnAllSeries: !0,
                performRawSeries: !0,
                reset: function (t, e) {
                    var n = t.getData(),
                        r = (t.visualColorAccessPath || "itemStyle.color").split("."),
                        a = t.get(r) || t.getColorFromPalette(t.name, null, e.getSeriesCount());
                    n.setVisual("color", a);
                    var o = (t.visualBorderColorAccessPath || "itemStyle.borderColor").split("."),
                        s = t.get(o);
                    if (n.setVisual("borderColor", s), !e.isSeriesFiltered(t)) {
                        "function" != typeof a || a instanceof i || n.each(function (e) {
                            n.setItemVisual(e, "color", a(t.getDataParams(e)))
                        });
                        var l = function (t, e) {
                            var n = t.getItemModel(e),
                                i = n.get(r, !0),
                                a = n.get(o, !0);
                            null != i && t.setItemVisual(e, "color", i), null != a && t.setItemVisual(e, "borderColor", a)
                        };
                        return {
                            dataEach: n.hasItemOption ? l : null
                        }
                    }
                }
            };
        t.exports = r
    }, function (t, e, n) {
        function i(t, e) {
            function n(t, e) {
                if ("string" != typeof t) return t;
                var n = t;
                return r.each(e, function (t, e) {
                    n = n.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t)
                }), n
            }

            function i(t) {
                var e = l.get(t);
                if (null == e) {
                    for (var n = t.split("."), i = a.aria, r = 0; r < n.length; ++r) i = i[n[r]];
                    return i
                }
                return e
            }

            function o(t) {
                return a.series.typeNames[t] || "自定义图"
            }
            var l = e.getModel("aria");
            if (l.get("show")) {
                if (l.get("description")) return void t.setAttribute("aria-label", l.get("description"));
                var u = 0;
                e.eachSeries(function (t, e) {
                    ++u
                }, this);
                var c, h = l.get("data.maxCount") || 10,
                    d = l.get("series.maxCount") || 10,
                    f = Math.min(u, d);
                if (!(u < 1)) {
                    var p = function () {
                        var t = e.getModel("title").option;
                        return t && t.length && (t = t[0]), t && t.text
                    }();
                    c = p ? n(i("general.withTitle"), {
                        title: p
                    }) : i("general.withoutTitle");
                    var g = [];
                    c += n(i(u > 1 ? "series.multiple.prefix" : "series.single.prefix"), {
                        seriesCount: u
                    }), e.eachSeries(function (t, e) {
                        if (e < f) {
                            var r, a = t.get("name"),
                                l = "series." + (u > 1 ? "multiple" : "single") + ".";
                            r = i(a ? l + "withName" : l + "withoutName"), r = n(r, {
                                seriesId: t.seriesIndex,
                                seriesName: t.get("name"),
                                seriesType: o(t.subType)
                            });
                            var c = t.getData();
                            window.data = c, c.count() > h ? r += n(i("data.partialData"), {
                                displayCnt: h
                            }) : r += i("data.allData");
                            for (var d = [], p = 0; p < c.count(); p++)
                                if (p < h) {
                                    var v = c.getName(p),
                                        m = s(c, p);
                                    d.push(n(i(v ? "data.withName" : "data.withoutName"), {
                                        name: v,
                                        value: m
                                    }))
                                } r += d.join(i("data.separator.middle")) + i("data.separator.end"), g.push(r)
                        }
                    }), c += g.join(i("series.multiple.separator.middle")) + i("series.multiple.separator.end"), t.setAttribute("aria-label", c)
                }
            }
        }
        var r = n(0),
            a = n(130),
            o = n(27),
            s = o.retrieveRawValue;
        t.exports = i
    }, function (t, e, n) {
        function i(t, e) {
            e = e || {}, r.defaults(e, {
                text: "loading",
                color: "#c23531",
                textColor: "#000",
                maskColor: "rgba(255, 255, 255, 0.8)",
                zlevel: 0
            });
            var n = new a.Rect({
                    style: {
                        fill: e.maskColor
                    },
                    zlevel: e.zlevel,
                    z: 1e4
                }),
                i = new a.Arc({
                    shape: {
                        startAngle: -o / 2,
                        endAngle: -o / 2 + .1,
                        r: 10
                    },
                    style: {
                        stroke: e.color,
                        lineCap: "round",
                        lineWidth: 5
                    },
                    zlevel: e.zlevel,
                    z: 10001
                }),
                s = new a.Rect({
                    style: {
                        fill: "none",
                        text: e.text,
                        textPosition: "right",
                        textDistance: 10,
                        textFill: e.textColor
                    },
                    zlevel: e.zlevel,
                    z: 10001
                });
            i.animateShape(!0).when(1e3, {
                endAngle: 3 * o / 2
            }).start("circularInOut"), i.animateShape(!0).when(1e3, {
                startAngle: 3 * o / 2
            }).delay(300).start("circularInOut");
            var l = new a.Group;
            return l.add(i), l.add(s), l.add(n), l.resize = function () {
                var e = t.getWidth() / 2,
                    r = t.getHeight() / 2;
                i.setShape({
                    cx: e,
                    cy: r
                });
                var a = i.shape.r;
                s.setShape({
                    x: e - a,
                    y: r - a,
                    width: 2 * a,
                    height: 2 * a
                }), n.setShape({
                    x: 0,
                    y: 0,
                    width: t.getWidth(),
                    height: t.getHeight()
                })
            }, l.resize(), l
        }
        var r = n(0),
            a = n(2),
            o = Math.PI;
        t.exports = i
    }, function (t, e, n) {
        function i(t, e, n, i) {
            this.ecInstance = t, this.api = e, this.unfinished;
            var n = this._dataProcessorHandlers = n.slice(),
                i = this._visualHandlers = i.slice();
            this._allHandlers = n.concat(i), this._stageTaskMap = w()
        }

        function r(t, e, n, i, r) {
            function a(t, e) {
                return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id))
            }
            r = r || {};
            var o;
            _(e, function (e, s) {
                if (!r.visualType || r.visualType === e.visualType) {
                    var l = t._stageTaskMap.get(e.uid),
                        u = l.seriesTaskMap,
                        c = l.overallTask;
                    if (c) {
                        var h, d = c.agentStubMap;
                        d.each(function (t) {
                            a(r, t) && (t.dirty(), h = !0)
                        }), h && c.dirty(), L(c, i);
                        var f = t.getPerformArgs(c, r.block);
                        d.each(function (t) {
                            t.perform(f)
                        }), o |= c.perform(f)
                    } else u && u.each(function (s, l) {
                        a(r, s) && s.dirty();
                        var u = t.getPerformArgs(s, r.block);
                        u.skip = !e.performRawSeries && n.isSeriesFiltered(s.context.model), L(s, i), o |= s.perform(u)
                    })
                }
            }), t.unfinished |= o
        }

        function a(t, e, n, i, r) {
            function a(n) {
                var a = n.uid,
                    s = o.get(a) || o.set(a, T({
                        plan: h,
                        reset: d,
                        count: p
                    }));
                s.context = {
                    model: n,
                    ecModel: i,
                    api: r,
                    useClearVisual: e.isVisual && !e.isLayout,
                    plan: e.plan,
                    reset: e.reset,
                    scheduler: t
                }, g(t, n, s)
            }
            var o = n.seriesTaskMap || (n.seriesTaskMap = w()),
                s = e.seriesType,
                l = e.getTargetSeries;
            e.createOnAllSeries ? i.eachRawSeries(a) : s ? i.eachRawSeriesByType(s, a) : l && l(i, r).each(a);
            var u = t._pipelineMap;
            o.each(function (t, e) {
                u.get(e) || (t.dispose(), o.removeKey(e))
            })
        }

        function o(t, e, n, i, r) {
            function a(e) {
                var n = e.uid,
                    i = u.get(n);
                i || (i = u.set(n, T({
                    reset: l,
                    onDirty: c
                })), o.dirty()), i.context = {
                    model: e,
                    overallProgress: f,
                    modifyOutputEnd: p
                }, i.agent = o, i.__block = f, g(t, e, i)
            }
            var o = n.overallTask = n.overallTask || T({
                reset: s
            });
            o.context = {
                ecModel: i,
                api: r,
                overallReset: e.overallReset,
                scheduler: t
            };
            var u = o.agentStubMap = o.agentStubMap || w(),
                h = e.seriesType,
                d = e.getTargetSeries,
                f = !0,
                p = e.modifyOutputEnd;
            h ? i.eachRawSeriesByType(h, a) : d ? d(i, r).each(a) : (f = !1, _(i.getSeries(), a));
            var v = t._pipelineMap;
            u.each(function (t, e) {
                v.get(e) || (t.dispose(), o.dirty(), u.removeKey(e))
            })
        }

        function s(t) {
            t.overallReset(t.ecModel, t.api, t.payload)
        }

        function l(t, e) {
            return t.overallProgress && u
        }

        function u() {
            this.agent.dirty(), this.getDownstream().dirty()
        }

        function c() {
            this.agent && this.agent.dirty()
        }

        function h(t) {
            return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload)
        }

        function d(t) {
            t.useClearVisual && t.data.clearAllVisual();
            var e = t.resetDefines = O(t.reset(t.model, t.ecModel, t.api, t.payload));
            return e.length > 1 ? x(e, function (t, e) {
                return f(e)
            }) : E
        }

        function f(t) {
            return function (e, n) {
                var i = n.data,
                    r = n.resetDefines[t];
                if (r && r.dataEach)
                    for (var a = e.start; a < e.end; a++) r.dataEach(i, a);
                else r && r.progress && r.progress(e, i)
            }
        }

        function p(t) {
            return t.data.count()
        }

        function g(t, e, n) {
            var i = e.uid,
                r = t._pipelineMap.get(i);
            !r.head && (r.head = n), r.tail && r.tail.pipe(n), r.tail = n, n.__idxInPipeline = r.count++, n.__pipeline = r
        }

        function v(t) {
            R = null;
            try {
                t(z, N)
            } catch (t) {}
            return R
        }

        function m(t, e) {
            for (var n in e.prototype) t[n] = S
        }
        var y = n(0),
            _ = y.each,
            x = y.map,
            b = y.isFunction,
            w = y.createHashMap,
            S = y.noop,
            M = n(77),
            T = M.createTask,
            A = n(50),
            C = A.getUID,
            I = n(113),
            D = n(128),
            k = n(1),
            O = k.normalizeToArray,
            P = i.prototype;
        P.restoreData = function (t, e) {
            t.restoreData(e), this._stageTaskMap.each(function (t) {
                var e = t.overallTask;
                e && e.dirty()
            })
        }, P.getPerformArgs = function (t, e) {
            if (t.__pipeline) {
                var n = this._pipelineMap.get(t.__pipeline.id),
                    i = n.context,
                    r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex,
                    a = r ? n.step : null,
                    o = i && i.modDataCount;
                return {
                    step: a,
                    modBy: null != o ? Math.ceil(o / a) : null,
                    modDataCount: o
                }
            }
        }, P.getPipeline = function (t) {
            return this._pipelineMap.get(t)
        }, P.updateStreamModes = function (t, e) {
            var n = this._pipelineMap.get(t.uid),
                i = t.getData(),
                r = i.count(),
                a = n.progressiveEnabled && e.incrementalPrepareRender && r >= n.threshold,
                o = t.get("large") && r >= t.get("largeThreshold"),
                s = "mod" === t.get("progressiveChunkMode") ? r : null;
            t.pipelineContext = n.context = {
                progressiveRender: a,
                modDataCount: s,
                large: o
            }
        }, P.restorePipelines = function (t) {
            var e = this,
                n = e._pipelineMap = w();
            t.eachSeries(function (t) {
                var i = t.getProgressive(),
                    r = t.uid;
                n.set(r, {
                    id: r,
                    head: null,
                    tail: null,
                    threshold: t.getProgressiveThreshold(),
                    progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
                    blockIndex: -1,
                    step: Math.round(i || 700),
                    count: 0
                }), g(e, t, t.dataTask)
            })
        }, P.prepareStageTasks = function () {
            var t = this._stageTaskMap,
                e = this.ecInstance.getModel(),
                n = this.api;
            _(this._allHandlers, function (i) {
                var r = t.get(i.uid) || t.set(i.uid, []);
                i.reset && a(this, i, r, e, n), i.overallReset && o(this, i, r, e, n)
            }, this)
        }, P.prepareView = function (t, e, n, i) {
            var r = t.renderTask,
                a = r.context;
            a.model = e, a.ecModel = n, a.api = i, r.__block = !t.incrementalPrepareRender, g(this, e, r)
        }, P.performDataProcessorTasks = function (t, e) {
            r(this, this._dataProcessorHandlers, t, e, {
                block: !0
            })
        }, P.performVisualTasks = function (t, e, n) {
            r(this, this._visualHandlers, t, e, n)
        }, P.performSeriesTasks = function (t) {
            var e;
            t.eachSeries(function (t) {
                e |= t.dataTask.perform()
            }), this.unfinished |= e
        }, P.plan = function () {
            this._pipelineMap.each(function (t) {
                var e = t.tail;
                do {
                    if (e.__block) {
                        t.blockIndex = e.__idxInPipeline;
                        break
                    }
                    e = e.getUpstream()
                } while (e)
            })
        };
        var L = P.updatePayload = function (t, e) {
                "remain" !== e && (t.context.payload = e)
            },
            E = f(0);
        i.wrapStageHandler = function (t, e) {
            return b(t) && (t = {
                overallReset: t,
                seriesType: v(t)
            }), t.uid = C("stageHandler"), e && (t.visualType = e), t
        };
        var R, z = {},
            N = {};
        m(z, I), m(N, D), z.eachSeriesByType = z.eachRawSeriesByType = function (t) {
            R = t
        }, z.eachComponent = function (t) {
            "series" === t.mainType && t.subType && (R = t.subType)
        };
        var B = i;
        t.exports = B
    }, function (t, e) {
        var n = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
            i = {
                color: n,
                colorLayer: [
                    ["#37A2DA", "#ffd85c", "#fd7b5f"],
                    ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"],
                    ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], n
                ]
            };
        t.exports = i
    }, function (t, e) {
        var n = function () {
                return {
                    axisLine: {
                        lineStyle: {
                            color: "#eee"
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: "#eee"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#eee"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                            color: "#aaa"
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: "#eee"
                        }
                    }
                }
            },
            i = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42"],
            r = {
                color: i,
                backgroundColor: "#333",
                tooltip: {
                    axisPointer: {
                        lineStyle: {
                            color: "#eee"
                        },
                        crossStyle: {
                            color: "#eee"
                        }
                    }
                },
                legend: {
                    textStyle: {
                        color: "#eee"
                    }
                },
                textStyle: {
                    color: "#eee"
                },
                title: {
                    textStyle: {
                        color: "#eee"
                    }
                },
                toolbox: {
                    iconStyle: {
                        normal: {
                            borderColor: "#eee"
                        }
                    }
                },
                dataZoom: {
                    textStyle: {
                        color: "#eee"
                    }
                },
                visualMap: {
                    textStyle: {
                        color: "#eee"
                    }
                },
                timeline: {
                    lineStyle: {
                        color: "#eee"
                    },
                    itemStyle: {
                        normal: {
                            color: i[1]
                        }
                    },
                    label: {
                        normal: {
                            textStyle: {
                                color: "#eee"
                            }
                        }
                    },
                    controlStyle: {
                        normal: {
                            color: "#eee",
                            borderColor: "#eee"
                        }
                    }
                },
                timeAxis: n(),
                logAxis: n(),
                valueAxis: n(),
                categoryAxis: n(),
                line: {
                    symbol: "circle"
                },
                graph: {
                    color: i
                },
                gauge: {
                    title: {
                        textStyle: {
                            color: "#eee"
                        }
                    }
                },
                candlestick: {
                    itemStyle: {
                        normal: {
                            color: "#FD1050",
                            color0: "#0CF49B",
                            borderColor: "#FD1050",
                            borderColor0: "#0CF49B"
                        }
                    }
                }
            };
        r.categoryAxis.splitLine.show = !1;
        var a = r;
        t.exports = a
    }, function (t, e, n) {
        var i = n(13),
            r = n(129),
            a = n(51),
            o = a.detectSourceFormat,
            s = n(38),
            l = s.SERIES_LAYOUT_BY_COLUMN;
        i.extend({
            type: "dataset",
            defaultOption: {
                seriesLayoutBy: l,
                sourceHeader: null,
                dimensions: null,
                source: null
            },
            optionUpdated: function () {
                o(this)
            }
        }), r.extend({
            type: "dataset"
        })
    }, function (t, e, n) {
        var i = n(4),
            r = (i.__DEV__, n(0)),
            a = r.createHashMap,
            o = r.isString,
            s = r.isArray,
            l = r.each,
            u = (r.assert, n(229)),
            c = u.parseXML,
            h = a(),
            d = {
                registerMap: function (t, e, n) {
                    var i;
                    return s(e) ? i = e : e.svg ? i = [{
                        type: "svg",
                        source: e.svg,
                        specialAreas: e.specialAreas
                    }] : (e.geoJson && !e.features && (n = e.specialAreas, e = e.geoJson), i = [{
                        type: "geoJSON",
                        source: e,
                        specialAreas: n
                    }]), l(i, function (t) {
                        var e = t.type;
                        "geoJson" === e && (e = t.type = "geoJSON"), (0, f[e])(t)
                    }), h.set(t, i)
                },
                retrieveMap: function (t) {
                    return h.get(t)
                }
            },
            f = {
                geoJSON: function (t) {
                    var e = t.source;
                    t.geoJSON = o(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")() : e
                },
                svg: function (t) {
                    t.svgXML = c(t.source)
                }
            };
        t.exports = d
    }, function (t, e, n) {
        function i(t) {
            if (k(t)) {
                t = (new DOMParser).parseFromString(t, "text/xml")
            }
            for (9 === t.nodeType && (t = t.firstChild);
                "svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType;) t = t.nextSibling;
            return t
        }

        function r() {
            this._defs = {}, this._root = null, this._isDefine = !1, this._isText = !1
        }

        function a(t, e) {
            for (var n = t.firstChild; n;) {
                if (1 === n.nodeType) {
                    var i = n.getAttribute("offset");
                    i = i.indexOf("%") > 0 ? parseInt(i, 10) / 100 : i ? parseFloat(i) : 0;
                    var r = n.getAttribute("stop-color") || "#000000";
                    e.addColorStop(i, r)
                }
                n = n.nextSibling
            }
        }

        function o(t, e) {
            t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), P(e.__inheritedStyle, t.__inheritedStyle))
        }

        function s(t) {
            for (var e = L(t).split(R), n = [], i = 0; i < e.length; i += 2) {
                var r = parseFloat(e[i]),
                    a = parseFloat(e[i + 1]);
                n.push([r, a])
            }
            return n
        }

        function l(t, e, n, i) {
            var r = e.__inheritedStyle || {},
                a = "text" === e.type;
            if (1 === t.nodeType && (c(t, e), O(r, h(t)), !i))
                for (var o in B)
                    if (B.hasOwnProperty(o)) {
                        var s = t.getAttribute(o);
                        null != s && (r[B[o]] = s)
                    } var l = a ? "textFill" : "fill",
                d = a ? "textStroke" : "stroke";
            e.style = e.style || new T;
            var f = e.style;
            null != r.fill && f.set(l, u(r.fill, n)), null != r.stroke && f.set(d, u(r.stroke, n)), E(["lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize"], function (t) {
                var e = "lineWidth" === t && a ? "textStrokeWidth" : t;
                null != r[t] && f.set(e, parseFloat(r[t]))
            }), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), "alphabetic" === r.textBaseline && (r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), "end" === r.textAlign && (r.textAlign = "right"), E(["lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline"], function (t) {
                null != r[t] && f.set(t, r[t])
            }), r.lineDash && (e.style.lineDash = L(r.lineDash).split(R)), f[d] && "none" !== f[d] && (e[d] = !0), e.__inheritedStyle = r
        }

        function u(t, e) {
            var n = e && t && t.match(F);
            if (n) {
                return e[L(n[1])]
            }
            return t
        }

        function c(t, e) {
            var n = t.getAttribute("transform");
            if (n) {
                n = n.replace(/,/g, " ");
                var i = null,
                    r = [];
                n.replace(V, function (t, e, n) {
                    r.push(e, n)
                });
                for (var a = r.length - 1; a > 0; a -= 2) {
                    var o = r[a],
                        s = r[a - 1];
                    switch (i = i || A.create(), s) {
                        case "translate":
                            o = L(o).split(R), A.translate(i, i, [parseFloat(o[0]), parseFloat(o[1] || 0)]);
                            break;
                        case "scale":
                            o = L(o).split(R), A.scale(i, i, [parseFloat(o[0]), parseFloat(o[1] || o[0])]);
                            break;
                        case "rotate":
                            o = L(o).split(R), A.rotate(i, i, parseFloat(o[0]));
                            break;
                        case "skew":
                            o = L(o).split(R), console.warn("Skew transform is not supported yet");
                            break;
                        case "matrix":
                            var o = L(o).split(R);
                            i[0] = parseFloat(o[0]), i[1] = parseFloat(o[1]), i[2] = parseFloat(o[2]), i[3] = parseFloat(o[3]), i[4] = parseFloat(o[4]), i[5] = parseFloat(o[5])
                    }
                }
                e.setLocalTransform(i)
            }
        }

        function h(t) {
            var e = t.getAttribute("style"),
                n = {};
            if (!e) return n;
            var i = {};
            H.lastIndex = 0;
            for (var r; null != (r = H.exec(e));) i[r[1]] = r[2];
            for (var a in B) B.hasOwnProperty(a) && null != i[a] && (n[B[a]] = i[a]);
            return n
        }

        function d(t, e, n) {
            var i = e / t.width,
                r = n / t.height,
                a = Math.min(i, r);
            return {
                scale: [a, a],
                position: [-(t.x + t.width / 2) * a + e / 2, -(t.y + t.height / 2) * a + n / 2]
            }
        }

        function f(t, e) {
            return (new r).parse(t, e)
        }
        var p = n(35),
            g = n(70),
            v = n(72),
            m = n(118),
            y = n(123),
            _ = n(230),
            x = n(124),
            b = n(6),
            w = n(120),
            S = n(122),
            M = n(125),
            T = n(69),
            A = n(20),
            C = n(114),
            I = C.createFromString,
            D = n(0),
            k = D.isString,
            O = D.extend,
            P = D.defaults,
            L = D.trim,
            E = D.each,
            R = /[\s,]+/;
        r.prototype.parse = function (t, e) {
            e = e || {};
            var n = i(t);
            if (!n) throw new Error("Illegal svg");
            var r = new p;
            this._root = r;
            var a = n.getAttribute("viewBox") || "",
                o = parseFloat(n.getAttribute("width") || e.width),
                s = parseFloat(n.getAttribute("height") || e.height);
            isNaN(o) && (o = null), isNaN(s) && (s = null), l(n, r, null, !0);
            for (var u = n.firstChild; u;) this._parseNode(u, r), u = u.nextSibling;
            var c, h;
            if (a) {
                var f = L(a).split(R);
                f.length >= 4 && (c = {
                    x: parseFloat(f[0] || 0),
                    y: parseFloat(f[1] || 0),
                    width: parseFloat(f[2]),
                    height: parseFloat(f[3])
                })
            }
            if (c && null != o && null != s && (h = d(c, o, s), !e.ignoreViewBox)) {
                var g = r;
                r = new p, r.add(g), g.scale = h.scale.slice(), g.position = h.position.slice()
            }
            return e.ignoreRootClip || null == o || null == s || r.setClipPath(new y({
                shape: {
                    x: 0,
                    y: 0,
                    width: o,
                    height: s
                }
            })), {
                root: r,
                width: o,
                height: s,
                viewBoxRect: c,
                viewBoxTransform: h
            }
        }, r.prototype._parseNode = function (t, e) {
            var n = t.nodeName.toLowerCase();
            "defs" === n ? this._isDefine = !0 : "text" === n && (this._isText = !0);
            var i;
            if (this._isDefine) {
                var r = N[n];
                if (r) {
                    var a = r.call(this, t),
                        o = t.getAttribute("id");
                    o && (this._defs[o] = a)
                }
            } else {
                var r = z[n];
                r && (i = r.call(this, t, e), e.add(i))
            }
            for (var s = t.firstChild; s;) 1 === s.nodeType && this._parseNode(s, i), 3 === s.nodeType && this._isText && this._parseText(s, i), s = s.nextSibling;
            "defs" === n ? this._isDefine = !1 : "text" === n && (this._isText = !1)
        }, r.prototype._parseText = function (t, e) {
            if (1 === t.nodeType) {
                var n = t.getAttribute("dx") || 0,
                    i = t.getAttribute("dy") || 0;
                this._textX += parseFloat(n), this._textY += parseFloat(i)
            }
            var r = new v({
                style: {
                    text: t.textContent,
                    transformText: !0
                },
                position: [this._textX || 0, this._textY || 0]
            });
            o(e, r), l(t, r, this._defs);
            var a = r.style.fontSize;
            a && a < 9 && (r.style.fontSize = 9, r.scale = r.scale || [1, 1], r.scale[0] *= a / 9, r.scale[1] *= a / 9);
            var s = r.getBoundingRect();
            return this._textX += s.width, e.add(r), r
        };
        var z = {
                g: function (t, e) {
                    var n = new p;
                    return o(e, n), l(t, n, this._defs), n
                },
                rect: function (t, e) {
                    var n = new y;
                    return o(e, n), l(t, n, this._defs), n.setShape({
                        x: parseFloat(t.getAttribute("x") || 0),
                        y: parseFloat(t.getAttribute("y") || 0),
                        width: parseFloat(t.getAttribute("width") || 0),
                        height: parseFloat(t.getAttribute("height") || 0)
                    }), n
                },
                circle: function (t, e) {
                    var n = new m;
                    return o(e, n), l(t, n, this._defs), n.setShape({
                        cx: parseFloat(t.getAttribute("cx") || 0),
                        cy: parseFloat(t.getAttribute("cy") || 0),
                        r: parseFloat(t.getAttribute("r") || 0)
                    }), n
                },
                line: function (t, e) {
                    var n = new x;
                    return o(e, n), l(t, n, this._defs), n.setShape({
                        x1: parseFloat(t.getAttribute("x1") || 0),
                        y1: parseFloat(t.getAttribute("y1") || 0),
                        x2: parseFloat(t.getAttribute("x2") || 0),
                        y2: parseFloat(t.getAttribute("y2") || 0)
                    }), n
                },
                ellipse: function (t, e) {
                    var n = new _;
                    return o(e, n), l(t, n, this._defs), n.setShape({
                        cx: parseFloat(t.getAttribute("cx") || 0),
                        cy: parseFloat(t.getAttribute("cy") || 0),
                        rx: parseFloat(t.getAttribute("rx") || 0),
                        ry: parseFloat(t.getAttribute("ry") || 0)
                    }), n
                },
                polygon: function (t, e) {
                    var n = t.getAttribute("points");
                    n && (n = s(n));
                    var i = new w({
                        shape: {
                            points: n || []
                        }
                    });
                    return o(e, i), l(t, i, this._defs), i
                },
                polyline: function (t, e) {
                    var n = new b;
                    o(e, n), l(t, n, this._defs);
                    var i = t.getAttribute("points");
                    return i && (i = s(i)), new S({
                        shape: {
                            points: i || []
                        }
                    })
                },
                image: function (t, e) {
                    var n = new g;
                    return o(e, n), l(t, n, this._defs), n.setStyle({
                        image: t.getAttribute("xlink:href"),
                        x: t.getAttribute("x"),
                        y: t.getAttribute("y"),
                        width: t.getAttribute("width"),
                        height: t.getAttribute("height")
                    }), n
                },
                text: function (t, e) {
                    var n = t.getAttribute("x") || 0,
                        i = t.getAttribute("y") || 0,
                        r = t.getAttribute("dx") || 0,
                        a = t.getAttribute("dy") || 0;
                    this._textX = parseFloat(n) + parseFloat(r), this._textY = parseFloat(i) + parseFloat(a);
                    var s = new p;
                    return o(e, s), l(t, s, this._defs), s
                },
                tspan: function (t, e) {
                    var n = t.getAttribute("x"),
                        i = t.getAttribute("y");
                    null != n && (this._textX = parseFloat(n)), null != i && (this._textY = parseFloat(i));
                    var r = t.getAttribute("dx") || 0,
                        a = t.getAttribute("dy") || 0,
                        s = new p;
                    return o(e, s), l(t, s, this._defs), this._textX += r, this._textY += a, s
                },
                path: function (t, e) {
                    var n = t.getAttribute("d") || "",
                        i = I(n);
                    return o(e, i), l(t, i, this._defs), i
                }
            },
            N = {
                lineargradient: function (t) {
                    var e = parseInt(t.getAttribute("x1") || 0, 10),
                        n = parseInt(t.getAttribute("y1") || 0, 10),
                        i = parseInt(t.getAttribute("x2") || 10, 10),
                        r = parseInt(t.getAttribute("y2") || 0, 10),
                        o = new M(e, n, i, r);
                    return a(t, o), o
                },
                radialgradient: function (t) {}
            },
            B = {
                fill: "fill",
                stroke: "stroke",
                "stroke-width": "lineWidth",
                opacity: "opacity",
                "fill-opacity": "fillOpacity",
                "stroke-opacity": "strokeOpacity",
                "stroke-dasharray": "lineDash",
                "stroke-dashoffset": "lineDashOffset",
                "stroke-linecap": "lineCap",
                "stroke-linejoin": "lineJoin",
                "stroke-miterlimit": "miterLimit",
                "font-family": "fontFamily",
                "font-size": "fontSize",
                "font-style": "fontStyle",
                "font-weight": "fontWeight",
                "text-align": "textAlign",
                "alignment-baseline": "textBaseline"
            },
            F = /url\(\s*#(.*?)\)/,
            V = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g,
            H = /([^\s:;]+)\s*:\s*([^:;]+)/g;
        e.parseXML = i, e.makeViewBoxTransform = d, e.parseSVG = f
    }, function (t, e, n) {
        var i = n(6),
            r = i.extend({
                type: "ellipse",
                shape: {
                    cx: 0,
                    cy: 0,
                    rx: 0,
                    ry: 0
                },
                buildPath: function (t, e) {
                    var n = .5522848,
                        i = e.cx,
                        r = e.cy,
                        a = e.rx,
                        o = e.ry,
                        s = a * n,
                        l = o * n;
                    t.moveTo(i - a, r), t.bezierCurveTo(i - a, r - l, i - s, r - o, i, r - o), t.bezierCurveTo(i + s, r - o, i + a, r - l, i + a, r), t.bezierCurveTo(i + a, r + l, i + s, r + o, i, r + o), t.bezierCurveTo(i - s, r + o, i - a, r + l, i - a, r), t.closePath()
                }
            });
        t.exports = r
    }, function (t, e, n) {
        var i = n(101);
        e.zrender = i;
        var r = n(20);
        e.matrix = r;
        var a = n(7);
        e.vector = a;
        var o = n(0),
            s = n(36);
        e.color = s;
        var l = n(2),
            u = n(5);
        e.number = u;
        var c = n(10);
        e.format = c;
        var h = n(52);
        h.throttle;
        e.throttle = h.throttle;
        var d = n(232);
        e.helper = d;
        var f = n(237);
        e.parseGeoJSON = f;
        var p = n(81);
        e.List = p;
        var g = n(12);
        e.Model = g;
        var v = n(136);
        e.Axis = v;
        var m = n(8);
        e.env = m;
        var y = f,
            _ = {};
        o.each(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge"], function (t) {
            _[t] = o[t]
        });
        var x = {};
        o.each(["extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle", "setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform", "clipPointsByRect", "clipRectByRect", "registerShape", "getShapeClass", "Group", "Image", "Text", "Circle", "Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable", "CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect"], function (t) {
            x[t] = l[t]
        }), e.parseGeoJson = y, e.util = _, e.graphic = x
    }, function (t, e, n) {
        function i(t) {
            return s(t.getSource(), t)
        }

        function r(t, e) {
            var n = e;
            c.isInstance(e) || (n = new c(e), o.mixin(n, u));
            var i = l.createScaleByModel(n);
            return i.setExtent(t[0], t[1]), l.niceScaleExtent(i, n), i
        }

        function a(t) {
            o.mixin(t, u)
        }
        var o = n(0),
            s = n(80),
            l = n(29),
            u = n(135),
            c = n(12),
            h = n(14);
        h.getLayoutRect;
        e.getLayoutRect = h.getLayoutRect;
        var d = n(28),
            f = d.enableDataStack,
            p = d.isDimensionStacked,
            g = d.getStackedDimension,
            v = n(131);
        e.completeDimensions = v;
        var m = n(83);
        e.createDimensions = m;
        var y = n(54);
        e.createSymbol = y.createSymbol;
        var _ = {
            isDimensionStacked: p,
            enableDataStack: f,
            getStackedDimension: g
        };
        e.createList = i, e.dataStack = _, e.createScale = r, e.mixinAxisModelCommonMethods = a
    }, function (t, e) {
        function n(t) {
            return t
        }

        function i(t, e, i, r, a) {
            this._old = t, this._new = e, this._oldKeyGetter = i || n, this._newKeyGetter = r || n, this.context = a
        }

        function r(t, e, n, i, r) {
            for (var a = 0; a < t.length; a++) {
                var o = "_ec_" + r[i](t[a], a),
                    s = e[o];
                null == s ? (n.push(o), e[o] = a) : (s.length || (e[o] = s = [s]), s.push(a))
            }
        }
        i.prototype = {
            constructor: i,
            add: function (t) {
                return this._add = t, this
            },
            update: function (t) {
                return this._update = t, this
            },
            remove: function (t) {
                return this._remove = t, this
            },
            execute: function () {
                var t, e = this._old,
                    n = this._new,
                    i = {},
                    a = {},
                    o = [],
                    s = [];
                for (r(e, i, o, "_oldKeyGetter", this), r(n, a, s, "_newKeyGetter", this), t = 0; t < e.length; t++) {
                    var l = o[t],
                        u = a[l];
                    if (null != u) {
                        var c = u.length;
                        c ? (1 === c && (a[l] = null), u = u.unshift()) : a[l] = null, this._update && this._update(u, t)
                    } else this._remove && this._remove(t)
                }
                for (var t = 0; t < s.length; t++) {
                    var l = s[t];
                    if (a.hasOwnProperty(l)) {
                        var u = a[l];
                        if (null == u) continue;
                        if (u.length)
                            for (var h = 0, c = u.length; h < c; h++) this._add && this._add(u[h]);
                        else this._add && this._add(u)
                    }
                }
            }
        };
        var a = i;
        t.exports = a
    }, function (t, e, n) {
        var i = n(0),
            r = n(53),
            a = n(132),
            o = r.prototype,
            s = r.extend({
                type: "ordinal",
                init: function (t, e) {
                    t && !i.isArray(t) || (t = new a({
                        categories: t
                    })), this._ordinalMeta = t, this._extent = e || [0, t.categories.length - 1]
                },
                parse: function (t) {
                    return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t)
                },
                contain: function (t) {
                    return t = this.parse(t), o.contain.call(this, t) && null != this._ordinalMeta.categories[t]
                },
                normalize: function (t) {
                    return o.normalize.call(this, this.parse(t))
                },
                scale: function (t) {
                    return Math.round(o.scale.call(this, t))
                },
                getTicks: function () {
                    for (var t = [], e = this._extent, n = e[0]; n <= e[1];) t.push(n), n++;
                    return t
                },
                getLabel: function (t) {
                    if (!this.isBlank()) return this._ordinalMeta.categories[t]
                },
                count: function () {
                    return this._extent[1] - this._extent[0] + 1
                },
                unionExtentFromData: function (t, e) {
                    this.unionExtent(t.getApproximateExtent(e))
                },
                getOrdinalMeta: function () {
                    return this._ordinalMeta
                },
                niceTicks: i.noop,
                niceExtent: i.noop
            });
        s.create = function () {
            return new s
        };
        var l = s;
        t.exports = l
    }, function (t, e, n) {
        var i = n(0),
            r = n(5),
            a = n(10),
            o = n(133),
            s = n(84),
            l = s.prototype,
            u = Math.ceil,
            c = Math.floor,
            h = function (t, e, n, i) {
                for (; n < i;) {
                    var r = n + i >>> 1;
                    t[r][1] < e ? n = r + 1 : i = r
                }
                return n
            },
            d = s.extend({
                type: "time",
                getLabel: function (t) {
                    var e = this._stepLvl,
                        n = new Date(t);
                    return a.formatTime(e[0], n, this.getSetting("useUTC"))
                },
                niceExtent: function (t) {
                    var e = this._extent;
                    if (e[0] === e[1] && (e[0] -= 864e5, e[1] += 864e5), e[1] === -1 / 0 && e[0] === 1 / 0) {
                        var n = new Date;
                        e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - 864e5
                    }
                    this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
                    var i = this._interval;
                    t.fixMin || (e[0] = r.round(c(e[0] / i) * i)), t.fixMax || (e[1] = r.round(u(e[1] / i) * i))
                },
                niceTicks: function (t, e, n) {
                    t = t || 10;
                    var i = this._extent,
                        a = i[1] - i[0],
                        s = a / t;
                    null != e && s < e && (s = e), null != n && s > n && (s = n);
                    var l = f.length,
                        d = h(f, s, 0, l),
                        p = f[Math.min(d, l - 1)],
                        g = p[1];
                    if ("year" === p[0]) {
                        var v = a / g;
                        g *= r.nice(v / t, !0)
                    }
                    var m = this.getSetting("useUTC") ? 0 : 60 * new Date(+i[0] || +i[1]).getTimezoneOffset() * 1e3,
                        y = [Math.round(u((i[0] - m) / g) * g + m), Math.round(c((i[1] - m) / g) * g + m)];
                    o.fixExtent(y, i), this._stepLvl = p, this._interval = g, this._niceExtent = y
                },
                parse: function (t) {
                    return +r.parseDate(t)
                }
            });
        i.each(["contain", "normalize"], function (t) {
            d.prototype[t] = function (e) {
                return l[t].call(this, this.parse(e))
            }
        });
        var f = [
            ["hh:mm:ss", 1e3],
            ["hh:mm:ss", 5e3],
            ["hh:mm:ss", 1e4],
            ["hh:mm:ss", 15e3],
            ["hh:mm:ss", 3e4],
            ["hh:mm\nMM-dd", 6e4],
            ["hh:mm\nMM-dd", 3e5],
            ["hh:mm\nMM-dd", 6e5],
            ["hh:mm\nMM-dd", 9e5],
            ["hh:mm\nMM-dd", 18e5],
            ["hh:mm\nMM-dd", 36e5],
            ["hh:mm\nMM-dd", 72e5],
            ["hh:mm\nMM-dd", 216e5],
            ["hh:mm\nMM-dd", 432e5],
            ["MM-dd\nyyyy", 864e5],
            ["MM-dd\nyyyy", 1728e5],
            ["MM-dd\nyyyy", 2592e5],
            ["MM-dd\nyyyy", 3456e5],
            ["MM-dd\nyyyy", 432e6],
            ["MM-dd\nyyyy", 5184e5],
            ["week", 6048e5],
            ["MM-dd\nyyyy", 864e6],
            ["week", 12096e5],
            ["week", 18144e5],
            ["month", 26784e5],
            ["week", 36288e5],
            ["month", 53568e5],
            ["week", 6048e6],
            ["quarter", 8208e6],
            ["month", 107136e5],
            ["month", 13392e6],
            ["half-year", 16416e6],
            ["month", 214272e5],
            ["month", 26784e6],
            ["year", 32832e6]
        ];
        d.create = function (t) {
            return new d({
                useUTC: t.ecModel.get("useUTC")
            })
        };
        var p = d;
        t.exports = p
    }, function (t, e, n) {
        function i(t, e) {
            return h(t, c(e))
        }
        var r = n(0),
            a = n(53),
            o = n(5),
            s = n(84),
            l = a.prototype,
            u = s.prototype,
            c = o.getPrecisionSafe,
            h = o.round,
            d = Math.floor,
            f = Math.ceil,
            p = Math.pow,
            g = Math.log,
            v = a.extend({
                type: "log",
                base: 10,
                $constructor: function () {
                    a.apply(this, arguments), this._originalScale = new s
                },
                getTicks: function () {
                    var t = this._originalScale,
                        e = this._extent,
                        n = t.getExtent();
                    return r.map(u.getTicks.call(this), function (r) {
                        var a = o.round(p(this.base, r));
                        return a = r === e[0] && t.__fixMin ? i(a, n[0]) : a, a = r === e[1] && t.__fixMax ? i(a, n[1]) : a
                    }, this)
                },
                getLabel: u.getLabel,
                scale: function (t) {
                    return t = l.scale.call(this, t), p(this.base, t)
                },
                setExtent: function (t, e) {
                    var n = this.base;
                    t = g(t) / g(n), e = g(e) / g(n), u.setExtent.call(this, t, e)
                },
                getExtent: function () {
                    var t = this.base,
                        e = l.getExtent.call(this);
                    e[0] = p(t, e[0]), e[1] = p(t, e[1]);
                    var n = this._originalScale,
                        r = n.getExtent();
                    return n.__fixMin && (e[0] = i(e[0], r[0])), n.__fixMax && (e[1] = i(e[1], r[1])), e
                },
                unionExtent: function (t) {
                    this._originalScale.unionExtent(t);
                    var e = this.base;
                    t[0] = g(t[0]) / g(e), t[1] = g(t[1]) / g(e), l.unionExtent.call(this, t)
                },
                unionExtentFromData: function (t, e) {
                    this.unionExtent(t.getApproximateExtent(e))
                },
                niceTicks: function (t) {
                    t = t || 10;
                    var e = this._extent,
                        n = e[1] - e[0];
                    if (!(n === 1 / 0 || n <= 0)) {
                        var i = o.quantity(n),
                            r = t / n * i;
                        for (r <= .5 && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0;) i *= 10;
                        var a = [o.round(f(e[0] / i) * i), o.round(d(e[1] / i) * i)];
                        this._interval = i, this._niceExtent = a
                    }
                },
                niceExtent: function (t) {
                    u.niceExtent.call(this, t);
                    var e = this._originalScale;
                    e.__fixMin = t.fixMin, e.__fixMax = t.fixMax
                }
            });
        r.each(["contain", "normalize"], function (t) {
            v.prototype[t] = function (e) {
                return e = g(e) / g(this.base), l[t].call(this, e)
            }
        }), v.create = function () {
            return new v
        };
        var m = v;
        t.exports = m
    }, function (t, e, n) {
        function i(t) {
            if (!t.UTF8Encoding) return t;
            var e = t.UTF8Scale;
            null == e && (e = 1024);
            for (var n = t.features, i = 0; i < n.length; i++)
                for (var a = n[i], o = a.geometry, s = o.coordinates, l = o.encodeOffsets, u = 0; u < s.length; u++) {
                    var c = s[u];
                    if ("Polygon" === o.type) s[u] = r(c, l[u], e);
                    else if ("MultiPolygon" === o.type)
                        for (var h = 0; h < c.length; h++) {
                            var d = c[h];
                            c[h] = r(d, l[u][h], e)
                        }
                }
            return t.UTF8Encoding = !1, t
        }

        function r(t, e, n) {
            for (var i = [], r = e[0], a = e[1], o = 0; o < t.length; o += 2) {
                var s = t.charCodeAt(o) - 64,
                    l = t.charCodeAt(o + 1) - 64;
                s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), s += r, l += a, r = s, a = l, i.push([s / n, l / n])
            }
            return i
        }

        function a(t) {
            return i(t), o.map(o.filter(t.features, function (t) {
                return t.geometry && t.properties && t.geometry.coordinates.length > 0
            }), function (t) {
                var e = t.properties,
                    n = t.geometry,
                    i = n.coordinates,
                    r = [];
                "Polygon" === n.type && r.push({
                    type: "polygon",
                    exterior: i[0],
                    interiors: i.slice(1)
                }), "MultiPolygon" === n.type && o.each(i, function (t) {
                    t[0] && r.push({
                        type: "polygon",
                        exterior: t[0],
                        interiors: t.slice(1)
                    })
                });
                var a = new s(e.name, r, e.cp);
                return a.properties = e, a
            })
        }
        var o = n(0),
            s = n(238);
        t.exports = a
    }, function (t, e, n) {
        function i(t, e, n) {
            if (this.name = t, this.geometries = e, n) n = [n[0], n[1]];
            else {
                var i = this.getBoundingRect();
                n = [i.x + i.width / 2, i.y + i.height / 2]
            }
            this.center = n
        }
        var r = n(9),
            a = n(115),
            o = n(7),
            s = n(239);
        i.prototype = {
            constructor: i,
            properties: null,
            getBoundingRect: function () {
                var t = this._rect;
                if (t) return t;
                for (var e = Number.MAX_VALUE, n = [e, e], i = [-e, -e], s = [], l = [], u = this.geometries, c = 0; c < u.length; c++)
                    if ("polygon" === u[c].type) {
                        var h = u[c].exterior;
                        a.fromPoints(h, s, l), o.min(n, n, s), o.max(i, i, l)
                    } return 0 === c && (n[0] = n[1] = i[0] = i[1] = 0), this._rect = new r(n[0], n[1], i[0] - n[0], i[1] - n[1])
            },
            contain: function (t) {
                var e = this.getBoundingRect(),
                    n = this.geometries;
                if (!e.contain(t[0], t[1])) return !1;
                t: for (var i = 0, r = n.length; i < r; i++)
                    if ("polygon" === n[i].type) {
                        var a = n[i].exterior,
                            o = n[i].interiors;
                        if (s.contain(a, t[0], t[1])) {
                            for (var l = 0; l < (o ? o.length : 0); l++)
                                if (s.contain(o[l])) continue t;
                            return !0
                        }
                    }
                return !1
            },
            transformTo: function (t, e, n, i) {
                var a = this.getBoundingRect(),
                    s = a.width / a.height;
                n ? i || (i = n / s) : n = s * i;
                for (var l = new r(t, e, n, i), u = a.calculateTransform(l), c = this.geometries, h = 0; h < c.length; h++)
                    if ("polygon" === c[h].type) {
                        for (var d = c[h].exterior, f = c[h].interiors, p = 0; p < d.length; p++) o.applyTransform(d[p], d[p], u);
                        for (var g = 0; g < (f ? f.length : 0); g++)
                            for (var p = 0; p < f[g].length; p++) o.applyTransform(f[g][p], f[g][p], u)
                    } a = this._rect, a.copy(l), this.center = [a.x + a.width / 2, a.y + a.height / 2]
            },
            cloneShallow: function (t) {
                null == t && (t = this.name);
                var e = new i(t, this.geometries, this.center);
                return e._rect = this._rect, e.transformTo = null, e
            }
        };
        var l = i;
        t.exports = l
    }, function (t, e, n) {
        function i(t, e) {
            return Math.abs(t - e) < o
        }

        function r(t, e, n) {
            var r = 0,
                o = t[0];
            if (!o) return !1;
            for (var s = 1; s < t.length; s++) {
                var l = t[s];
                r += a(o[0], o[1], l[0], l[1], e, n), o = l
            }
            var u = t[0];
            return i(o[0], u[0]) && i(o[1], u[1]) || (r += a(o[0], o[1], u[0], u[1], e, n)), 0 !== r
        }
        var a = n(117),
            o = 1e-8;
        e.contain = r
    }, function (t, e, n) {
        function i(t) {
            return "category" === t.type ? a(t) : l(t)
        }

        function r(t, e) {
            return "category" === t.type ? s(t, e) : {
                ticks: t.scale.getTicks()
            }
        }

        function a(t) {
            var e = t.getLabelModel(),
                n = o(t, e);
            return !e.get("show") || t.scale.isBlank() ? {
                labels: [],
                labelCategoryInterval: n.labelCategoryInterval
            } : n
        }

        function o(t, e) {
            var n = u(t, "labels"),
                i = S(e),
                r = c(n, i);
            if (r) return r;
            var a, o;
            return m.isFunction(i) ? a = v(t, i) : (o = "auto" === i ? d(t) : i, a = g(t, o)), h(n, i, {
                labels: a,
                labelCategoryInterval: o
            })
        }

        function s(t, e) {
            var n = u(t, "ticks"),
                i = S(e),
                r = c(n, i);
            if (r) return r;
            var a, s;
            if (e.get("show") && !t.scale.isBlank() || (a = []), m.isFunction(i)) a = v(t, i, !0);
            else if ("auto" === i) {
                var l = o(t, t.getLabelModel());
                s = l.labelCategoryInterval, a = m.map(l.labels, function (t) {
                    return t.tickValue
                })
            } else s = i, a = g(t, s, !0);
            return h(n, i, {
                ticks: a,
                tickCategoryInterval: s
            })
        }

        function l(t) {
            var e = t.scale.getTicks(),
                n = w(t);
            return {
                labels: m.map(e, function (e, i) {
                    return {
                        formattedLabel: n(e, i),
                        rawLabel: t.scale.getLabel(e),
                        tickValue: e
                    }
                })
            }
        }

        function u(t, e) {
            return T(t)[e] || (T(t)[e] = [])
        }

        function c(t, e) {
            for (var n = 0; n < t.length; n++)
                if (t[n].key === e) return t[n].value
        }

        function h(t, e, n) {
            return t.push({
                key: e,
                value: n
            }), n
        }

        function d(t) {
            var e = T(t).autoInterval;
            return null != e ? e : T(t).autoInterval = t.calculateCategoryInterval()
        }

        function f(t) {
            var e = p(t),
                n = w(t),
                i = (e.axisRotate - e.labelRotate) / 180 * Math.PI,
                r = t.scale,
                a = r.getExtent(),
                o = r.count();
            if (a[1] - a[0] < 1) return 0;
            var s = 1;
            o > 40 && (s = Math.max(1, Math.floor(o / 40)));
            for (var l = a[0], u = t.dataToCoord(l + 1) - t.dataToCoord(l), c = Math.abs(u * Math.cos(i)), h = Math.abs(u * Math.sin(i)), d = 0, f = 0; l <= a[1]; l += s) {
                var g = 0,
                    v = 0,
                    m = y.getBoundingRect(n(l), e.font, "center", "top");
                g = 1.3 * m.width, v = 1.3 * m.height, d = Math.max(d, g, 7), f = Math.max(f, v, 7)
            }
            var _ = d / c,
                x = f / h;
            isNaN(_) && (_ = 1 / 0), isNaN(x) && (x = 1 / 0);
            var b = Math.max(0, Math.floor(Math.min(_, x))),
                S = T(t.model),
                M = S.lastAutoInterval,
                A = S.lastTickCount;
            return null != M && null != A && Math.abs(M - b) <= 1 && Math.abs(A - o) <= 1 && M > b ? b = M : (S.lastTickCount = o, S.lastAutoInterval = b), b
        }

        function p(t) {
            var e = t.getLabelModel();
            return {
                axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
                labelRotate: e.get("rotate") || 0,
                font: e.getFont()
            }
        }

        function g(t, e, n) {
            function i(t) {
                l.push(n ? t : {
                    formattedLabel: r(t),
                    rawLabel: a.getLabel(t),
                    tickValue: t
                })
            }
            var r = w(t),
                a = t.scale,
                o = a.getExtent(),
                s = t.getLabelModel(),
                l = [],
                u = Math.max((e || 0) + 1, 1),
                c = o[0],
                h = a.count();
            0 !== c && u > 1 && h / u > 2 && (c = Math.round(Math.ceil(c / u) * u));
            var d = M(t),
                f = s.get("showMinLabel") || d,
                p = s.get("showMaxLabel") || d;
            f && c !== o[0] && i(o[0]);
            for (var g = c; g <= o[1]; g += u) i(g);
            return p && g - u !== o[1] && i(o[1]), l
        }

        function v(t, e, n) {
            var i = t.scale,
                r = w(t),
                a = [];
            return m.each(i.getTicks(), function (t) {
                var o = i.getLabel(t);
                e(t, o) && a.push(n ? t : {
                    formattedLabel: r(t),
                    rawLabel: o,
                    tickValue: t
                })
            }), a
        }
        var m = n(0),
            y = n(16),
            _ = n(1),
            x = _.makeInner,
            b = n(29),
            w = b.makeLabelFormatter,
            S = b.getOptionCategoryInterval,
            M = b.shouldShowAllLabels,
            T = x();
        e.createAxisLabels = i, e.createAxisTicks = r, e.calculateCategoryInterval = f
    }, function (t, e, n) {
        "use strict";

        function i(t, e, n) {
            function i(e) {
                var n = y,
                    i = _;
                return y = _ = void 0, M = e, b = t.apply(i, n)
            }

            function c(t) {
                return M = t, w = setTimeout(f, e), T ? i(t) : b
            }

            function h(t) {
                var n = t - S,
                    i = t - M,
                    r = e - n;
                return A ? u(r, x - i) : r
            }

            function d(t) {
                var n = t - S,
                    i = t - M;
                return void 0 === S || n >= e || n < 0 || A && i >= x
            }

            function f() {
                var t = a();
                if (d(t)) return p(t);
                w = setTimeout(f, h(t))
            }

            function p(t) {
                return w = void 0, C && y ? i(t) : (y = _ = void 0, b)
            }

            function g() {
                void 0 !== w && clearTimeout(w), M = 0, y = S = _ = w = void 0
            }

            function v() {
                return void 0 === w ? b : p(a())
            }

            function m() {
                var t = a(),
                    n = d(t);
                if (y = arguments, _ = this, S = t, n) {
                    if (void 0 === w) return c(S);
                    if (A) return clearTimeout(w), w = setTimeout(f, e), i(S)
                }
                return void 0 === w && (w = setTimeout(f, e)), b
            }
            var y, _, x, b, w, S, M = 0,
                T = !1,
                A = !1,
                C = !0;
            if ("function" != typeof t) throw new TypeError(s);
            return e = o(e) || 0, r(n) && (T = !!n.leading, A = "maxWait" in n, x = A ? l(o(n.maxWait) || 0, e) : x, C = "trailing" in n ? !!n.trailing : C), m.cancel = g, m.flush = v, m
        }
        var r = n(137),
            a = n(259),
            o = n(261),
            s = "Expected a function",
            l = Math.max,
            u = Math.min;
        t.exports = i
    }, function (t, e, n) {
        t.exports = {
            default: n(243),
            __esModule: !0
        }
    }, function (t, e, n) {
        n(90), n(244), t.exports = n(85).f("iterator")
    }, function (t, e, n) {
        n(245);
        for (var i = n(15), r = n(22), a = n(33), o = n(11)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), l = 0; l < s.length; l++) {
            var u = s[l],
                c = i[u],
                h = c && c.prototype;
            h && !h[o] && r(h, o, u), a[u] = a.Array
        }
    }, function (t, e, n) {
        "use strict";
        var i = n(246),
            r = n(247),
            a = n(33),
            o = n(24);
        t.exports = n(91)(Array, "Array", function (t, e) {
            this._t = o(t), this._i = 0, this._k = e
        }, function () {
            var t = this._t,
                e = this._k,
                n = this._i++;
            return !t || n >= t.length ? (this._t = void 0, r(1)) : "keys" == e ? r(0, n) : "values" == e ? r(0, t[n]) : r(0, [n, t[n]])
        }, "values"), a.Arguments = a.Array, i("keys"), i("values"), i("entries")
    }, function (t, e) {
        t.exports = function () {}
    }, function (t, e) {
        t.exports = function (t, e) {
            return {
                value: e,
                done: !!t
            }
        }
    }, function (t, e, n) {
        t.exports = {
            default: n(249),
            __esModule: !0
        }
    }, function (t, e, n) {
        n(250), n(256), n(257), n(258), t.exports = n(21).Symbol
    }, function (t, e, n) {
        "use strict";
        var i = n(15),
            r = n(19),
            a = n(23),
            o = n(60),
            s = n(95),
            l = n(251).KEY,
            u = n(43),
            c = n(65),
            h = n(67),
            d = n(44),
            f = n(11),
            p = n(85),
            g = n(86),
            v = n(252),
            m = n(253),
            y = n(30),
            _ = n(31),
            x = n(24),
            b = n(61),
            w = n(32),
            S = n(96),
            M = n(254),
            T = n(255),
            A = n(18),
            C = n(62),
            I = T.f,
            D = A.f,
            k = M.f,
            O = i.Symbol,
            P = i.JSON,
            L = P && P.stringify,
            E = f("_hidden"),
            R = f("toPrimitive"),
            z = {}.propertyIsEnumerable,
            N = c("symbol-registry"),
            B = c("symbols"),
            F = c("op-symbols"),
            V = Object.prototype,
            H = "function" == typeof O,
            W = i.QObject,
            G = !W || !W.prototype || !W.prototype.findChild,
            j = a && u(function () {
                return 7 != S(D({}, "a", {
                    get: function () {
                        return D(this, "a", {
                            value: 7
                        }).a
                    }
                })).a
            }) ? function (t, e, n) {
                var i = I(V, e);
                i && delete V[e], D(t, e, n), i && t !== V && D(V, e, i)
            } : D,
            U = function (t) {
                var e = B[t] = S(O.prototype);
                return e._k = t, e
            },
            Y = H && "symbol" == typeof O.iterator ? function (t) {
                return "symbol" == typeof t
            } : function (t) {
                return t instanceof O
            },
            q = function (t, e, n) {
                return t === V && q(F, e, n), y(t), e = b(e, !0), y(n), r(B, e) ? (n.enumerable ? (r(t, E) && t[E][e] && (t[E][e] = !1), n = S(n, {
                    enumerable: w(0, !1)
                })) : (r(t, E) || D(t, E, w(1, {})), t[E][e] = !0), j(t, e, n)) : D(t, e, n)
            },
            X = function (t, e) {
                y(t);
                for (var n, i = v(e = x(e)), r = 0, a = i.length; a > r;) q(t, n = i[r++], e[n]);
                return t
            },
            Z = function (t, e) {
                return void 0 === e ? S(t) : X(S(t), e)
            },
            $ = function (t) {
                var e = z.call(this, t = b(t, !0));
                return !(this === V && r(B, t) && !r(F, t)) && (!(e || !r(this, t) || !r(B, t) || r(this, E) && this[E][t]) || e)
            },
            K = function (t, e) {
                if (t = x(t), e = b(e, !0), t !== V || !r(B, e) || r(F, e)) {
                    var n = I(t, e);
                    return !n || !r(B, e) || r(t, E) && t[E][e] || (n.enumerable = !0), n
                }
            },
            J = function (t) {
                for (var e, n = k(x(t)), i = [], a = 0; n.length > a;) r(B, e = n[a++]) || e == E || e == l || i.push(e);
                return i
            },
            Q = function (t) {
                for (var e, n = t === V, i = k(n ? F : x(t)), a = [], o = 0; i.length > o;) !r(B, e = i[o++]) || n && !r(V, e) || a.push(B[e]);
                return a
            };
        H || (O = function () {
            if (this instanceof O) throw TypeError("Symbol is not a constructor!");
            var t = d(arguments.length > 0 ? arguments[0] : void 0),
                e = function (n) {
                    this === V && e.call(F, n), r(this, E) && r(this[E], t) && (this[E][t] = !1), j(this, t, w(1, n))
                };
            return a && G && j(V, t, {
                configurable: !0,
                set: e
            }), U(t)
        }, s(O.prototype, "toString", function () {
            return this._k
        }), T.f = K, A.f = q, n(139).f = M.f = J, n(87).f = $, n(138).f = Q, a && !n(42) && s(V, "propertyIsEnumerable", $, !0), p.f = function (t) {
            return U(f(t))
        }), o(o.G + o.W + o.F * !H, {
            Symbol: O
        });
        for (var tt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; tt.length > et;) f(tt[et++]);
        for (var nt = C(f.store), it = 0; nt.length > it;) g(nt[it++]);
        o(o.S + o.F * !H, "Symbol", {
            for: function (t) {
                return r(N, t += "") ? N[t] : N[t] = O(t)
            },
            keyFor: function (t) {
                if (!Y(t)) throw TypeError(t + " is not a symbol!");
                for (var e in N)
                    if (N[e] === t) return e
            },
            useSetter: function () {
                G = !0
            },
            useSimple: function () {
                G = !1
            }
        }), o(o.S + o.F * !H, "Object", {
            create: Z,
            defineProperty: q,
            defineProperties: X,
            getOwnPropertyDescriptor: K,
            getOwnPropertyNames: J,
            getOwnPropertySymbols: Q
        }), P && o(o.S + o.F * (!H || u(function () {
            var t = O();
            return "[null]" != L([t]) || "{}" != L({
                a: t
            }) || "{}" != L(Object(t))
        })), "JSON", {
            stringify: function (t) {
                for (var e, n, i = [t], r = 1; arguments.length > r;) i.push(arguments[r++]);
                if (n = e = i[1], (_(e) || void 0 !== t) && !Y(t)) return m(e) || (e = function (t, e) {
                    if ("function" == typeof n && (e = n.call(this, t, e)), !Y(e)) return e
                }), i[1] = e, L.apply(P, i)
            }
        }), O.prototype[R] || n(22)(O.prototype, R, O.prototype.valueOf), h(O, "Symbol"), h(Math, "Math", !0), h(i.JSON, "JSON", !0)
    }, function (t, e, n) {
        var i = n(44)("meta"),
            r = n(31),
            a = n(19),
            o = n(18).f,
            s = 0,
            l = Object.isExtensible || function () {
                return !0
            },
            u = !n(43)(function () {
                return l(Object.preventExtensions({}))
            }),
            c = function (t) {
                o(t, i, {
                    value: {
                        i: "O" + ++s,
                        w: {}
                    }
                })
            },
            h = function (t, e) {
                if (!r(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
                if (!a(t, i)) {
                    if (!l(t)) return "F";
                    if (!e) return "E";
                    c(t)
                }
                return t[i].i
            },
            d = function (t, e) {
                if (!a(t, i)) {
                    if (!l(t)) return !0;
                    if (!e) return !1;
                    c(t)
                }
                return t[i].w
            },
            f = function (t) {
                return u && p.NEED && l(t) && !a(t, i) && c(t), t
            },
            p = t.exports = {
                KEY: i,
                NEED: !1,
                fastKey: h,
                getWeak: d,
                onFreeze: f
            }
    }, function (t, e, n) {
        var i = n(62),
            r = n(138),
            a = n(87);
        t.exports = function (t) {
            var e = i(t),
                n = r.f;
            if (n)
                for (var o, s = n(t), l = a.f, u = 0; s.length > u;) l.call(t, o = s[u++]) && e.push(o);
            return e
        }
    }, function (t, e, n) {
        var i = n(63);
        t.exports = Array.isArray || function (t) {
            return "Array" == i(t)
        }
    }, function (t, e, n) {
        var i = n(24),
            r = n(139).f,
            a = {}.toString,
            o = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
            s = function (t) {
                try {
                    return r(t)
                } catch (t) {
                    return o.slice()
                }
            };
        t.exports.f = function (t) {
            return o && "[object Window]" == a.call(t) ? s(t) : r(i(t))
        }
    }, function (t, e, n) {
        var i = n(87),
            r = n(32),
            a = n(24),
            o = n(61),
            s = n(19),
            l = n(93),
            u = Object.getOwnPropertyDescriptor;
        e.f = n(23) ? u : function (t, e) {
            if (t = a(t), e = o(e, !0), l) try {
                return u(t, e)
            } catch (t) {}
            if (s(t, e)) return r(!i.f.call(t, e), t[e])
        }
    }, function (t, e) {}, function (t, e, n) {
        n(86)("asyncIterator")
    }, function (t, e, n) {
        n(86)("observable")
    }, function (t, e, n) {
        "use strict";
        var i = n(140),
            r = function () {
                return i.Date.now()
            };
        t.exports = r
    }, function (t, e, n) {
        "use strict";
        (function (e) {
            var i = n(39),
                r = function (t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }(i),
                a = "object" == (void 0 === e ? "undefined" : (0, r.default)(e)) && e && e.Object === Object && e;
            t.exports = a
        }).call(e, n(100))
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            if ("number" == typeof t) return t;
            if (a(t)) return o;
            if (r(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = r(e) ? e + "" : e
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(s, "");
            var n = u.test(t);
            return n || c.test(t) ? h(t.slice(2), n ? 2 : 8) : l.test(t) ? o : +t
        }
        var r = n(137),
            a = n(262),
            o = NaN,
            s = /^\s+|\s+$/g,
            l = /^[-+]0x[0-9a-f]+$/i,
            u = /^0b[01]+$/i,
            c = /^0o[0-7]+$/i,
            h = parseInt;
        t.exports = i
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return "symbol" == (void 0 === t ? "undefined" : (0, a.default)(t)) || s(t) && o(t) == l
        }
        var r = n(39),
            a = function (t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r),
            o = n(263),
            s = n(266),
            l = "[object Symbol]";
        t.exports = i
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return null == t ? void 0 === t ? l : s : u && u in Object(t) ? a(t) : o(t)
        }
        var r = n(141),
            a = n(264),
            o = n(265),
            s = "[object Null]",
            l = "[object Undefined]",
            u = r ? r.toStringTag : void 0;
        t.exports = i
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            var e = o.call(t, l),
                n = t[l];
            try {
                t[l] = void 0;
                var i = !0
            } catch (t) {}
            var r = s.call(t);
            return i && (e ? t[l] = n : delete t[l]), r
        }
        var r = n(141),
            a = Object.prototype,
            o = a.hasOwnProperty,
            s = a.toString,
            l = r ? r.toStringTag : void 0;
        t.exports = i
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return a.call(t)
        }
        var r = Object.prototype,
            a = r.toString;
        t.exports = i
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return null != t && "object" == (void 0 === t ? "undefined" : (0, a.default)(t))
        }
        var r = n(39),
            a = function (t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(r);
        t.exports = i
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return m || (m = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t) {
                return setTimeout(t, 16)
            }).bind(window)), m(t)
        }

        function r(t) {
            y || (y = (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (t) {
                clearTimeout(t)
            }).bind(window)), y(t)
        }

        function a(t) {
            var e = document.createElement("style");
            return e.type = "text/css", e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t)), (document.querySelector("head") || document.body).appendChild(e), e
        }

        function o(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = document.createElement(t);
            return Object.keys(e).forEach(function (t) {
                n[t] = e[t]
            }), n
        }

        function s(t, e, n) {
            return (window.getComputedStyle(t, n || null) || {
                display: "none"
            })[e]
        }

        function l(t) {
            if (!document.documentElement.contains(t)) return {
                detached: !0,
                rendered: !1
            };
            for (var e = t; e !== document;) {
                if ("none" === s(e, "display")) return {
                    detached: !1,
                    rendered: !1
                };
                e = e.parentNode
            }
            return {
                detached: !1,
                rendered: !0
            }
        }

        function u(t, e) {
            if (t.__resize_mutation_handler__ || (t.__resize_mutation_handler__ = d.bind(t)), !t.__resize_listeners__)
                if (t.__resize_listeners__ = [], window.ResizeObserver) {
                    var n = t.offsetWidth,
                        i = t.offsetHeight,
                        r = new ResizeObserver(function () {
                            (t.__resize_observer_triggered__ || (t.__resize_observer_triggered__ = !0, t.offsetWidth !== n || t.offsetHeight !== i)) && p(t)
                        }),
                        o = l(t),
                        s = o.detached,
                        u = o.rendered;
                    t.__resize_observer_triggered__ = !1 === s && !1 === u, t.__resize_observer__ = r, r.observe(t)
                } else if (t.attachEvent && t.addEventListener) t.__resize_legacy_resize_handler__ = function () {
                p(t)
            }, t.attachEvent("onresize", t.__resize_legacy_resize_handler__), document.addEventListener("DOMSubtreeModified", t.__resize_mutation_handler__);
            else if (x || (b = a(_)), g(t), t.__resize_rendered__ = l(t).rendered, window.MutationObserver) {
                var c = new MutationObserver(t.__resize_mutation_handler__);
                c.observe(document, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                }), t.__resize_mutation_observer__ = c
            }
            t.__resize_listeners__.push(e), x++
        }

        function c(t, e) {
            if (t.detachEvent && t.removeEventListener) return t.detachEvent("onresize", t.__resize_legacy_resize_handler__), void document.removeEventListener("DOMSubtreeModified", t.__resize_mutation_handler__);
            var n = t.__resize_listeners__;
            n && (n.splice(n.indexOf(e), 1), n.length || (t.__resize_observer__ ? (t.__resize_observer__.unobserve(t), t.__resize_observer__.disconnect(), t.__resize_observer__ = null) : (t.__resize_mutation_observer__ && (t.__resize_mutation_observer__.disconnect(), t.__resize_mutation_observer__ = null), t.removeEventListener("scroll", f), t.removeChild(t.__resize_triggers__.triggers), t.__resize_triggers__ = null), t.__resize_listeners__ = null), !--x && b && b.parentNode.removeChild(b))
        }

        function h(t) {
            var e = t.__resize_last__,
                n = e.width,
                i = e.height,
                r = t.offsetWidth,
                a = t.offsetHeight;
            return r !== n || a !== i ? {
                width: r,
                height: a
            } : null
        }

        function d() {
            var t = l(this),
                e = t.rendered,
                n = t.detached;
            e !== this.__resize_rendered__ && (!n && this.__resize_triggers__ && (v(this), this.addEventListener("scroll", f, !0)), this.__resize_rendered__ = e, p(this))
        }

        function f() {
            var t = this;
            v(this), this.__resize_raf__ && r(this.__resize_raf__), this.__resize_raf__ = i(function () {
                var e = h(t);
                e && (t.__resize_last__ = e, p(t))
            })
        }

        function p(t) {
            t && t.__resize_listeners__ && t.__resize_listeners__.forEach(function (e) {
                e.call(t)
            })
        }

        function g(t) {
            var e = s(t, "position");
            e && "static" !== e || (t.style.position = "relative"), t.__resize_old_position__ = e, t.__resize_last__ = {};
            var n = o("div", {
                    className: "resize-triggers"
                }),
                i = o("div", {
                    className: "resize-expand-trigger"
                }),
                r = o("div"),
                a = o("div", {
                    className: "resize-contract-trigger"
                });
            i.appendChild(r), n.appendChild(i), n.appendChild(a), t.appendChild(n), t.__resize_triggers__ = {
                triggers: n,
                expand: i,
                expandChild: r,
                contract: a
            }, v(t), t.addEventListener("scroll", f, !0), t.__resize_last__ = {
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        }

        function v(t) {
            var e = t.__resize_triggers__,
                n = e.expand,
                i = e.expandChild,
                r = e.contract,
                a = r.scrollWidth,
                o = r.scrollHeight,
                s = n.offsetWidth,
                l = n.offsetHeight,
                u = n.scrollWidth,
                c = n.scrollHeight;
            r.scrollLeft = a, r.scrollTop = o, i.style.width = s + 1 + "px", i.style.height = l + 1 + "px", n.scrollLeft = u, n.scrollTop = c
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var m = null,
            y = null,
            _ = '.resize-triggers{visibility:hidden;opacity:0}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:"";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}',
            x = 0,
            b = null;
        e.addListener = u, e.removeListener = c
    }, function (t, e, n) {
        "use strict";
        n.d(e, "a", function () {
            return i
        }), n.d(e, "b", function () {
            return r
        });
        var i = function () {
                var t = this,
                    e = t.$createElement;
                return (t._self._c || e)("div", {
                    staticClass: "echarts"
                })
            },
            r = []
    }, function (t, e, n) {
        var i = n(3);
        n(270), n(271);
        var r = n(275),
            a = n(276),
            o = n(277);
        n(146), i.registerVisual(r("line", "circle", "line")), i.registerLayout(a("line")), i.registerProcessor(i.PRIORITY.PROCESSOR.STATISTIC, o("line"))
    }, function (t, e, n) {
        var i = n(4),
            r = (i.__DEV__, n(80)),
            a = n(76),
            o = a.extend({
                type: "series.line",
                dependencies: ["grid", "polar"],
                getInitialData: function (t, e) {
                    return r(this.getSource(), this)
                },
                defaultOption: {
                    zlevel: 0,
                    z: 2,
                    coordinateSystem: "cartesian2d",
                    legendHoverLink: !0,
                    hoverAnimation: !0,
                    clip: !0,
                    label: {
                        position: "top"
                    },
                    lineStyle: {
                        width: 2,
                        type: "solid"
                    },
                    step: !1,
                    smooth: !1,
                    smoothMonotone: null,
                    symbol: "emptyCircle",
                    symbolSize: 4,
                    symbolRotate: null,
                    showSymbol: !0,
                    showAllSymbol: "auto",
                    connectNulls: !1,
                    sampling: "none",
                    animationEasing: "linear",
                    progressive: 0,
                    hoverLayerThreshold: 1 / 0
                }
            });
        t.exports = o
    }, function (t, e, n) {
        function i(t, e) {
            if (t.length === e.length) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n],
                        r = e[n];
                    if (i[0] !== r[0] || i[1] !== r[1]) return
                }
                return !0
            }
        }

        function r(t) {
            return "number" == typeof t ? t : t ? .5 : 0
        }

        function a(t, e, n) {
            if (!n.valueDim) return [];
            for (var i = [], r = 0, a = e.count(); r < a; r++) i.push(M(n, t, e, r));
            return i
        }

        function o(t, e, n) {
            for (var i = e.getBaseAxis(), r = "x" === i.dim || "radius" === i.dim ? 0 : 1, a = [], o = 0; o < t.length - 1; o++) {
                var s = t[o + 1],
                    l = t[o];
                a.push(l);
                var u = [];
                switch (n) {
                    case "end":
                        u[r] = s[r], u[1 - r] = l[1 - r], a.push(u);
                        break;
                    case "middle":
                        var c = (l[r] + s[r]) / 2,
                            h = [];
                        u[r] = h[r] = c, u[1 - r] = l[1 - r], h[1 - r] = s[1 - r], a.push(u), a.push(h);
                        break;
                    default:
                        u[r] = l[r], u[1 - r] = s[1 - r], a.push(u)
                }
            }
            return t[o] && a.push(t[o]), a
        }

        function s(t, e) {
            var n = t.getVisual("visualMeta");
            if (n && n.length && t.count() && "cartesian2d" === e.type) {
                for (var i, r, a = n.length - 1; a >= 0; a--) {
                    var o = n[a].dimension,
                        s = t.dimensions[o],
                        l = t.getDimensionInfo(s);
                    if ("x" === (i = l && l.coordDim) || "y" === i) {
                        r = n[a];
                        break
                    }
                }
                if (r) {
                    var u = e.getAxis(i),
                        c = d.map(r.stops, function (t) {
                            return {
                                coord: u.toGlobalCoord(u.dataToCoord(t.value)),
                                color: t.color
                            }
                        }),
                        h = c.length,
                        f = r.outerColors.slice();
                    h && c[0].coord > c[h - 1].coord && (c.reverse(), f.reverse());
                    var p = c[0].coord - 10,
                        g = c[h - 1].coord + 10,
                        m = g - p;
                    if (m < .001) return "transparent";
                    d.each(c, function (t) {
                        t.offset = (t.coord - p) / m
                    }), c.push({
                        offset: h ? c[h - 1].offset : .5,
                        color: f[1] || "transparent"
                    }), c.unshift({
                        offset: h ? c[0].offset : .5,
                        color: f[0] || "transparent"
                    });
                    var y = new v.LinearGradient(0, 0, 0, 0, c, !0);
                    return y[i] = p, y[i + "2"] = g, y
                }
            }
        }

        function l(t, e, n) {
            var i = t.get("showAllSymbol"),
                r = "auto" === i;
            if (!i || r) {
                var a = n.getAxesByScale("ordinal")[0];
                if (a && (!r || !u(a, e))) {
                    var o = e.mapDimension(a.dim),
                        s = {};
                    return d.each(a.getViewLabels(), function (t) {
                            s[t.tickValue] = 1
                        }),
                        function (t) {
                            return !s.hasOwnProperty(e.get(o, t))
                        }
                }
            }
        }

        function u(t, e) {
            var n = t.getExtent(),
                i = Math.abs(n[1] - n[0]) / t.scale.count();
            isNaN(i) && (i = 0);
            for (var r = e.count(), a = Math.max(1, Math.round(r / 5)), o = 0; o < r; o += a)
                if (1.5 * p.getSymbolSize(e, o)[t.isHorizontal() ? 1 : 0] > i) return !1;
            return !0
        }

        function c(t, e, n) {
            if ("cartesian2d" === t.type) {
                var i = t.getBaseAxis().isHorizontal(),
                    r = A(t, e, n);
                if (!n.get("clip", !0)) {
                    var a = r.shape,
                        o = Math.max(a.width, a.height);
                    i ? (a.y -= o, a.height += 2 * o) : (a.x -= o, a.width += 2 * o)
                }
                return r
            }
            return C(t, e, n)
        }
        var h = n(4),
            d = (h.__DEV__, n(0)),
            f = n(272),
            p = n(142),
            g = n(273),
            v = n(2),
            m = n(1),
            y = n(274),
            _ = y.Polyline,
            x = y.Polygon,
            b = n(78),
            w = n(144),
            S = w.prepareDataCoordInfo,
            M = w.getStackedOnPoint,
            T = n(145),
            A = T.createGridClipPath,
            C = T.createPolarClipPath,
            I = b.extend({
                type: "line",
                init: function () {
                    var t = new v.Group,
                        e = new f;
                    this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t
                },
                render: function (t, e, n) {
                    var u = t.coordinateSystem,
                        h = this.group,
                        f = t.getData(),
                        p = t.getModel("lineStyle"),
                        g = t.getModel("areaStyle"),
                        v = f.mapArray(f.getItemLayout),
                        m = "polar" === u.type,
                        y = this._coordSys,
                        _ = this._symbolDraw,
                        x = this._polyline,
                        b = this._polygon,
                        w = this._lineGroup,
                        M = t.get("animation"),
                        T = !g.isEmpty(),
                        A = g.get("origin"),
                        C = S(u, f, A),
                        I = a(u, f, C),
                        D = t.get("showSymbol"),
                        k = D && !m && l(t, f, u),
                        O = this._data;
                    O && O.eachItemGraphicEl(function (t, e) {
                        t.__temp && (h.remove(t), O.setItemGraphicEl(e, null))
                    }), D || _.remove(), h.add(w);
                    var P, L = !m && t.get("step");
                    u && u.getArea && (P = u.getArea(), null != P.width ? (P.x -= .1, P.y -= .1, P.width += .2, P.height += .2) : P.r0 && (P.r0 -= .5, P.r1 += .5)), x && y.type === u.type && L === this._step ? (T && !b ? b = this._newPolygon(v, I, u, M) : b && !T && (w.remove(b), b = this._polygon = null), w.setClipPath(c(u, !1, t)), D && _.updateData(f, {
                        isIgnore: k,
                        clipShape: P
                    }), f.eachItemGraphicEl(function (t) {
                        t.stopAnimation(!0)
                    }), i(this._stackedOnPoints, I) && i(this._points, v) || (M ? this._updateAnimation(f, I, u, n, L, A) : (L && (v = o(v, u, L), I = o(I, u, L)), x.setShape({
                        points: v
                    }), b && b.setShape({
                        points: v,
                        stackedOnPoints: I
                    })))) : (D && _.updateData(f, {
                        isIgnore: k,
                        clipShape: P
                    }), L && (v = o(v, u, L), I = o(I, u, L)), x = this._newPolyline(v, u, M), T && (b = this._newPolygon(v, I, u, M)), w.setClipPath(c(u, !0, t)));
                    var E = s(f, u) || f.getVisual("color");
                    x.useStyle(d.defaults(p.getLineStyle(), {
                        fill: "none",
                        stroke: E,
                        lineJoin: "bevel"
                    }));
                    var R = t.get("smooth");
                    if (R = r(t.get("smooth")), x.setShape({
                            smooth: R,
                            smoothMonotone: t.get("smoothMonotone"),
                            connectNulls: t.get("connectNulls")
                        }), b) {
                        var z = f.getCalculationInfo("stackedOnSeries"),
                            N = 0;
                        b.useStyle(d.defaults(g.getAreaStyle(), {
                            fill: E,
                            opacity: .7,
                            lineJoin: "bevel"
                        })), z && (N = r(z.get("smooth"))), b.setShape({
                            smooth: R,
                            stackedOnSmooth: N,
                            smoothMonotone: t.get("smoothMonotone"),
                            connectNulls: t.get("connectNulls")
                        })
                    }
                    this._data = f, this._coordSys = u, this._stackedOnPoints = I, this._points = v, this._step = L, this._valueOrigin = A
                },
                dispose: function () {},
                highlight: function (t, e, n, i) {
                    var r = t.getData(),
                        a = m.queryDataIndex(r, i);
                    if (!(a instanceof Array) && null != a && a >= 0) {
                        var o = r.getItemGraphicEl(a);
                        if (!o) {
                            var s = r.getItemLayout(a);
                            if (!s) return;
                            o = new p(r, a), o.position = s, o.setZ(t.get("zlevel"), t.get("z")), o.ignore = isNaN(s[0]) || isNaN(s[1]), o.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o)
                        }
                        o.highlight()
                    } else b.prototype.highlight.call(this, t, e, n, i)
                },
                downplay: function (t, e, n, i) {
                    var r = t.getData(),
                        a = m.queryDataIndex(r, i);
                    if (null != a && a >= 0) {
                        var o = r.getItemGraphicEl(a);
                        o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay())
                    } else b.prototype.downplay.call(this, t, e, n, i)
                },
                _newPolyline: function (t) {
                    var e = this._polyline;
                    return e && this._lineGroup.remove(e), e = new _({
                        shape: {
                            points: t
                        },
                        silent: !0,
                        z2: 10
                    }), this._lineGroup.add(e), this._polyline = e, e
                },
                _newPolygon: function (t, e) {
                    var n = this._polygon;
                    return n && this._lineGroup.remove(n), n = new x({
                        shape: {
                            points: t,
                            stackedOnPoints: e
                        },
                        silent: !0
                    }), this._lineGroup.add(n), this._polygon = n, n
                },
                _updateAnimation: function (t, e, n, i, r, a) {
                    var s = this._polyline,
                        l = this._polygon,
                        u = t.hostModel,
                        c = g(this._data, t, this._stackedOnPoints, e, this._coordSys, n, this._valueOrigin, a),
                        h = c.current,
                        d = c.stackedOnCurrent,
                        f = c.next,
                        p = c.stackedOnNext;
                    r && (h = o(c.current, n, r), d = o(c.stackedOnCurrent, n, r), f = o(c.next, n, r), p = o(c.stackedOnNext, n, r)), s.shape.__points = c.current, s.shape.points = h, v.updateProps(s, {
                        shape: {
                            points: f
                        }
                    }, u), l && (l.setShape({
                        points: h,
                        stackedOnPoints: d
                    }), v.updateProps(l, {
                        shape: {
                            points: f,
                            stackedOnPoints: p
                        }
                    }, u));
                    for (var m = [], y = c.status, _ = 0; _ < y.length; _++) {
                        if ("=" === y[_].cmd) {
                            var x = t.getItemGraphicEl(y[_].idx1);
                            x && m.push({
                                el: x,
                                ptIdx: _
                            })
                        }
                    }
                    s.animators && s.animators.length && s.animators[0].during(function () {
                        for (var t = 0; t < m.length; t++) {
                            m[t].el.attr("position", s.shape.__points[m[t].ptIdx])
                        }
                    })
                },
                remove: function (t) {
                    var e = this.group,
                        n = this._data;
                    this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function (t, i) {
                        t.__temp && (e.remove(t), n.setItemGraphicEl(i, null))
                    }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null
                }
            });
        t.exports = I
    }, function (t, e, n) {
        function i(t) {
            this.group = new s.Group, this._symbolCtor = t || l
        }

        function r(t, e, n, i) {
            return e && !isNaN(e[0]) && !isNaN(e[1]) && !(i.isIgnore && i.isIgnore(n)) && !(i.clipShape && !i.clipShape.contain(e[0], e[1])) && "none" !== t.getItemVisual(n, "symbol")
        }

        function a(t) {
            return null == t || c(t) || (t = {
                isIgnore: t
            }), t || {}
        }

        function o(t) {
            var e = t.hostModel;
            return {
                itemStyle: e.getModel("itemStyle").getItemStyle(["color"]),
                hoverItemStyle: e.getModel("emphasis.itemStyle").getItemStyle(),
                symbolRotate: e.get("symbolRotate"),
                symbolOffset: e.get("symbolOffset"),
                hoverAnimation: e.get("hoverAnimation"),
                labelModel: e.getModel("label"),
                hoverLabelModel: e.getModel("emphasis.label"),
                cursorStyle: e.get("cursor")
            }
        }
        var s = n(2),
            l = n(142),
            u = n(0),
            c = u.isObject,
            h = i.prototype;
        h.updateData = function (t, e) {
            e = a(e);
            var n = this.group,
                i = t.hostModel,
                l = this._data,
                u = this._symbolCtor,
                c = o(t);
            l || n.removeAll(), t.diff(l).add(function (i) {
                var a = t.getItemLayout(i);
                if (r(t, a, i, e)) {
                    var o = new u(t, i, c);
                    o.attr("position", a), t.setItemGraphicEl(i, o), n.add(o)
                }
            }).update(function (a, o) {
                var h = l.getItemGraphicEl(o),
                    d = t.getItemLayout(a);
                if (!r(t, d, a, e)) return void n.remove(h);
                h ? (h.updateData(t, a, c), s.updateProps(h, {
                    position: d
                }, i)) : (h = new u(t, a), h.attr("position", d)), n.add(h), t.setItemGraphicEl(a, h)
            }).remove(function (t) {
                var e = l.getItemGraphicEl(t);
                e && e.fadeOut(function () {
                    n.remove(e)
                })
            }).execute(), this._data = t
        }, h.isPersistent = function () {
            return !0
        }, h.updateLayout = function () {
            var t = this._data;
            t && t.eachItemGraphicEl(function (e, n) {
                var i = t.getItemLayout(n);
                e.attr("position", i)
            })
        }, h.incrementalPrepareUpdate = function (t) {
            this._seriesScope = o(t), this._data = null, this.group.removeAll()
        }, h.incrementalUpdate = function (t, e, n) {
            function i(t) {
                t.isGroup || (t.incremental = t.useHoverLayer = !0)
            }
            n = a(n);
            for (var o = t.start; o < t.end; o++) {
                var s = e.getItemLayout(o);
                if (r(e, s, o, n)) {
                    var l = new this._symbolCtor(e, o, this._seriesScope);
                    l.traverse(i), l.attr("position", s), this.group.add(l), e.setItemGraphicEl(o, l)
                }
            }
        }, h.remove = function (t) {
            var e = this.group,
                n = this._data;
            n && t ? n.eachItemGraphicEl(function (t) {
                t.fadeOut(function () {
                    e.remove(t)
                })
            }) : e.removeAll()
        };
        var d = i;
        t.exports = d
    }, function (t, e, n) {
        function i(t, e) {
            var n = [];
            return e.diff(t).add(function (t) {
                n.push({
                    cmd: "+",
                    idx: t
                })
            }).update(function (t, e) {
                n.push({
                    cmd: "=",
                    idx: e,
                    idx1: t
                })
            }).remove(function (t) {
                n.push({
                    cmd: "-",
                    idx: t
                })
            }).execute(), n
        }

        function r(t, e, n, r, a, l, u, c) {
            for (var h = i(t, e), d = [], f = [], p = [], g = [], v = [], m = [], y = [], _ = o(a, e, u), x = o(l, t, c), b = 0; b < h.length; b++) {
                var w = h[b],
                    S = !0;
                switch (w.cmd) {
                    case "=":
                        var M = t.getItemLayout(w.idx),
                            T = e.getItemLayout(w.idx1);
                        (isNaN(M[0]) || isNaN(M[1])) && (M = T.slice()), d.push(M), f.push(T), p.push(n[w.idx]), g.push(r[w.idx1]), y.push(e.getRawIndex(w.idx1));
                        break;
                    case "+":
                        var A = w.idx;
                        d.push(a.dataToPoint([e.get(_.dataDimsForPoint[0], A), e.get(_.dataDimsForPoint[1], A)])), f.push(e.getItemLayout(A).slice()), p.push(s(_, a, e, A)), g.push(r[A]), y.push(e.getRawIndex(A));
                        break;
                    case "-":
                        var A = w.idx,
                            C = t.getRawIndex(A);
                        C !== A ? (d.push(t.getItemLayout(A)), f.push(l.dataToPoint([t.get(x.dataDimsForPoint[0], A), t.get(x.dataDimsForPoint[1], A)])), p.push(n[A]), g.push(s(x, l, t, A)), y.push(C)) : S = !1
                }
                S && (v.push(w), m.push(m.length))
            }
            m.sort(function (t, e) {
                return y[t] - y[e]
            });
            for (var I = [], D = [], k = [], O = [], P = [], b = 0; b < m.length; b++) {
                var A = m[b];
                I[b] = d[A], D[b] = f[A], k[b] = p[A], O[b] = g[A], P[b] = v[A]
            }
            return {
                current: I,
                next: D,
                stackedOnCurrent: k,
                stackedOnNext: O,
                status: P
            }
        }
        var a = n(144),
            o = a.prepareDataCoordInfo,
            s = a.getStackedOnPoint;
        t.exports = r
    }, function (t, e, n) {
        function i(t) {
            return isNaN(t[0]) || isNaN(t[1])
        }

        function r(t, e, n, i, r, s, l, u, c, h, d) {
            return "none" !== h && h ? a.apply(this, arguments) : o.apply(this, arguments)
        }

        function a(t, e, n, r, a, o, s, l, u, c, h) {
            for (var d = 0, f = n, g = 0; g < r; g++) {
                var y = e[f];
                if (f >= a || f < 0) break;
                if (i(y)) {
                    if (h) {
                        f += o;
                        continue
                    }
                    break
                }
                if (f === n) t[o > 0 ? "moveTo" : "lineTo"](y[0], y[1]);
                else if (u > 0) {
                    var _ = e[d],
                        x = "y" === c ? 1 : 0,
                        b = (y[x] - _[x]) * u;
                    p(v, _), v[x] = _[x] + b, p(m, y), m[x] = y[x] - b, t.bezierCurveTo(v[0], v[1], m[0], m[1], y[0], y[1])
                } else t.lineTo(y[0], y[1]);
                d = f, f += o
            }
            return g
        }

        function o(t, e, n, r, a, o, s, l, c, y, _) {
            for (var x = 0, b = n, w = 0; w < r; w++) {
                var S = e[b];
                if (b >= a || b < 0) break;
                if (i(S)) {
                    if (_) {
                        b += o;
                        continue
                    }
                    break
                }
                if (b === n) t[o > 0 ? "moveTo" : "lineTo"](S[0], S[1]), p(v, S);
                else if (c > 0) {
                    var M = b + o,
                        T = e[M];
                    if (_)
                        for (; T && i(e[M]);) M += o, T = e[M];
                    var A = .5,
                        C = e[x],
                        T = e[M];
                    if (!T || i(T)) p(m, S);
                    else {
                        i(T) && !_ && (T = S), u.sub(g, T, C);
                        var I, D;
                        if ("x" === y || "y" === y) {
                            var k = "x" === y ? 0 : 1;
                            I = Math.abs(S[k] - C[k]), D = Math.abs(S[k] - T[k])
                        } else I = u.dist(S, C), D = u.dist(S, T);
                        A = D / (D + I), f(m, S, g, -c * (1 - A))
                    }
                    h(v, v, l), d(v, v, s), h(m, m, l), d(m, m, s), t.bezierCurveTo(v[0], v[1], m[0], m[1], S[0], S[1]), f(v, S, g, c * A)
                } else t.lineTo(S[0], S[1]);
                x = b, b += o
            }
            return w
        }

        function s(t, e) {
            var n = [1 / 0, 1 / 0],
                i = [-1 / 0, -1 / 0];
            if (e)
                for (var r = 0; r < t.length; r++) {
                    var a = t[r];
                    a[0] < n[0] && (n[0] = a[0]), a[1] < n[1] && (n[1] = a[1]), a[0] > i[0] && (i[0] = a[0]), a[1] > i[1] && (i[1] = a[1])
                }
            return {
                min: e ? n : i,
                max: e ? i : n
            }
        }
        var l = n(6),
            u = n(7),
            c = n(119),
            h = u.min,
            d = u.max,
            f = u.scaleAndAdd,
            p = u.copy,
            g = [],
            v = [],
            m = [],
            y = l.extend({
                type: "ec-polyline",
                shape: {
                    points: [],
                    smooth: 0,
                    smoothConstraint: !0,
                    smoothMonotone: null,
                    connectNulls: !1
                },
                style: {
                    fill: null,
                    stroke: "#000"
                },
                brush: c(l.prototype.brush),
                buildPath: function (t, e) {
                    var n = e.points,
                        a = 0,
                        o = n.length,
                        l = s(n, e.smoothConstraint);
                    if (e.connectNulls) {
                        for (; o > 0 && i(n[o - 1]); o--);
                        for (; a < o && i(n[a]); a++);
                    }
                    for (; a < o;) a += r(t, n, a, o, o, 1, l.min, l.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1
                }
            }),
            _ = l.extend({
                type: "ec-polygon",
                shape: {
                    points: [],
                    stackedOnPoints: [],
                    smooth: 0,
                    stackedOnSmooth: 0,
                    smoothConstraint: !0,
                    smoothMonotone: null,
                    connectNulls: !1
                },
                brush: c(l.prototype.brush),
                buildPath: function (t, e) {
                    var n = e.points,
                        a = e.stackedOnPoints,
                        o = 0,
                        l = n.length,
                        u = e.smoothMonotone,
                        c = s(n, e.smoothConstraint),
                        h = s(a, e.smoothConstraint);
                    if (e.connectNulls) {
                        for (; l > 0 && i(n[l - 1]); l--);
                        for (; o < l && i(n[o]); o++);
                    }
                    for (; o < l;) {
                        var d = r(t, n, o, l, l, 1, c.min, c.max, e.smooth, u, e.connectNulls);
                        r(t, a, o + d - 1, d, l, -1, h.min, h.max, e.stackedOnSmooth, u, e.connectNulls), o += d + 1, t.closePath()
                    }
                }
            });
        e.Polyline = y, e.Polygon = _
    }, function (t, e, n) {
        function i(t, e, n) {
            return {
                seriesType: t,
                performRawSeries: !0,
                reset: function (t, i, r) {
                    function o(e, n) {
                        if (f) {
                            var i = t.getRawValue(n),
                                r = t.getDataParams(n);
                            h && e.setItemVisual(n, "symbol", l(i, r)), d && e.setItemVisual(n, "symbolSize", u(i, r))
                        }
                        if (e.hasItemOption) {
                            var a = e.getItemModel(n),
                                o = a.getShallow("symbol", !0),
                                s = a.getShallow("symbolSize", !0),
                                c = a.getShallow("symbolKeepAspect", !0);
                            null != o && e.setItemVisual(n, "symbol", o), null != s && e.setItemVisual(n, "symbolSize", s), null != c && e.setItemVisual(n, "symbolKeepAspect", c)
                        }
                    }
                    var s = t.getData(),
                        l = t.get("symbol"),
                        u = t.get("symbolSize"),
                        c = t.get("symbolKeepAspect"),
                        h = a(l),
                        d = a(u),
                        f = h || d,
                        p = !h && l ? l : e,
                        g = d ? null : u;
                    if (s.setVisual({
                            legendSymbol: n || p,
                            symbol: p,
                            symbolSize: g,
                            symbolKeepAspect: c
                        }), !i.isSeriesFiltered(t)) return {
                        dataEach: s.hasItemOption || f ? o : null
                    }
                }
            }
        }
        var r = n(0),
            a = r.isFunction;
        t.exports = i
    }, function (t, e, n) {
        function i(t) {
            return {
                seriesType: t,
                plan: o(),
                reset: function (t) {
                    function e(t, e) {
                        for (var n = t.end - t.start, r = o && new Float32Array(n * u), a = t.start, l = 0, c = [], h = []; a < t.end; a++) {
                            var d;
                            if (1 === u) {
                                var f = e.get(s[0], a);
                                d = !isNaN(f) && i.dataToPoint(f, null, h)
                            } else {
                                var f = c[0] = e.get(s[0], a),
                                    p = c[1] = e.get(s[1], a);
                                d = !isNaN(f) && !isNaN(p) && i.dataToPoint(c, null, h)
                            }
                            o ? (r[l++] = d ? d[0] : NaN, r[l++] = d ? d[1] : NaN) : e.setItemLayout(a, d && d.slice() || [NaN, NaN])
                        }
                        o && e.setLayout("symbolPoints", r)
                    }
                    var n = t.getData(),
                        i = t.coordinateSystem,
                        r = t.pipelineContext,
                        o = r.large;
                    if (i) {
                        var s = a(i.dimensions, function (t) {
                                return n.mapDimension(t)
                            }).slice(0, 2),
                            u = s.length,
                            c = n.getCalculationInfo("stackResultDimension");
                        return l(n, s[0]) && (s[0] = c), l(n, s[1]) && (s[1] = c), u && {
                            progress: e
                        }
                    }
                }
            }
        }
        var r = n(0),
            a = r.map,
            o = n(79),
            s = n(28),
            l = s.isDimensionStacked;
        t.exports = i
    }, function (t, e) {
        function n(t) {
            return {
                seriesType: t,
                modifyOutputEnd: !0,
                reset: function (t, e, n) {
                    var a = t.getData(),
                        o = t.get("sampling"),
                        s = t.coordinateSystem;
                    if ("cartesian2d" === s.type && o) {
                        var l = s.getBaseAxis(),
                            u = s.getOtherAxis(l),
                            c = l.getExtent(),
                            h = c[1] - c[0],
                            d = Math.round(a.count() / h);
                        if (d > 1) {
                            var f;
                            "string" == typeof o ? f = i[o] : "function" == typeof o && (f = o), f && t.setData(a.downSample(a.mapDimension(u.dim), 1 / d, f, r))
                        }
                    }
                }
            }
        }
        var i = {
                average: function (t) {
                    for (var e = 0, n = 0, i = 0; i < t.length; i++) isNaN(t[i]) || (e += t[i], n++);
                    return 0 === n ? NaN : e / n
                },
                sum: function (t) {
                    for (var e = 0, n = 0; n < t.length; n++) e += t[n] || 0;
                    return e
                },
                max: function (t) {
                    for (var e = -1 / 0, n = 0; n < t.length; n++) t[n] > e && (e = t[n]);
                    return isFinite(e) ? e : NaN
                },
                min: function (t) {
                    for (var e = 1 / 0, n = 0; n < t.length; n++) t[n] < e && (e = t[n]);
                    return isFinite(e) ? e : NaN
                },
                nearest: function (t) {
                    return t[0]
                }
            },
            r = function (t, e) {
                return Math.round(t.length / 2)
            };
        t.exports = n
    }, function (t, e, n) {
        function i(t) {
            o.call(this, t)
        }
        var r = n(0),
            a = n(9),
            o = n(279);
        i.prototype = {
            constructor: i,
            type: "cartesian2d",
            dimensions: ["x", "y"],
            getBaseAxis: function () {
                return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
            },
            containPoint: function (t) {
                var e = this.getAxis("x"),
                    n = this.getAxis("y");
                return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]))
            },
            containData: function (t) {
                return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1])
            },
            dataToPoint: function (t, e, n) {
                var i = this.getAxis("x"),
                    r = this.getAxis("y");
                return n = n || [], n[0] = i.toGlobalCoord(i.dataToCoord(t[0])), n[1] = r.toGlobalCoord(r.dataToCoord(t[1])), n
            },
            clampData: function (t, e) {
                var n = this.getAxis("x").scale,
                    i = this.getAxis("y").scale,
                    r = n.getExtent(),
                    a = i.getExtent(),
                    o = n.parse(t[0]),
                    s = i.parse(t[1]);
                return e = e || [], e[0] = Math.min(Math.max(Math.min(r[0], r[1]), o), Math.max(r[0], r[1])), e[1] = Math.min(Math.max(Math.min(a[0], a[1]), s), Math.max(a[0], a[1])), e
            },
            pointToData: function (t, e) {
                var n = this.getAxis("x"),
                    i = this.getAxis("y");
                return e = e || [], e[0] = n.coordToData(n.toLocalCoord(t[0])), e[1] = i.coordToData(i.toLocalCoord(t[1])), e
            },
            getOtherAxis: function (t) {
                return this.getAxis("x" === t.dim ? "y" : "x")
            },
            getArea: function () {
                var t = this.getAxis("x").getGlobalExtent(),
                    e = this.getAxis("y").getGlobalExtent(),
                    n = Math.min(t[0], t[1]),
                    i = Math.min(e[0], e[1]),
                    r = Math.max(t[0], t[1]) - n,
                    o = Math.max(e[0], e[1]) - i;
                return new a(n, i, r, o)
            }
        }, r.inherits(i, o);
        var s = i;
        t.exports = s
    }, function (t, e, n) {
        function i(t) {
            return this._axes[t]
        }
        var r = n(0),
            a = function (t) {
                this._axes = {}, this._dimList = [], this.name = t || ""
            };
        a.prototype = {
            constructor: a,
            type: "cartesian",
            getAxis: function (t) {
                return this._axes[t]
            },
            getAxes: function () {
                return r.map(this._dimList, i, this)
            },
            getAxesByScale: function (t) {
                return t = t.toLowerCase(), r.filter(this.getAxes(), function (e) {
                    return e.scale.type === t
                })
            },
            addAxis: function (t) {
                var e = t.dim;
                this._axes[e] = t, this._dimList.push(e)
            },
            dataToCoord: function (t) {
                return this._dataCoordConvert(t, "dataToCoord")
            },
            coordToData: function (t) {
                return this._dataCoordConvert(t, "coordToData")
            },
            _dataCoordConvert: function (t, e) {
                for (var n = this._dimList, i = t instanceof Array ? [] : {}, r = 0; r < n.length; r++) {
                    var a = n[r],
                        o = this._axes[a];
                    i[a] = o[e](t[a])
                }
                return i
            }
        };
        var o = a;
        t.exports = o
    }, function (t, e, n) {
        var i = n(0),
            r = n(136),
            a = function (t, e, n, i, a) {
                r.call(this, t, e, n), this.type = i || "value", this.position = a || "bottom"
            };
        a.prototype = {
            constructor: a,
            index: 0,
            getAxesOnZeroOf: null,
            model: null,
            isHorizontal: function () {
                var t = this.position;
                return "top" === t || "bottom" === t
            },
            getGlobalExtent: function (t) {
                var e = this.getExtent();
                return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), e
            },
            getOtherAxis: function () {
                this.grid.getOtherAxis()
            },
            pointToData: function (t, e) {
                return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e)
            },
            toLocalCoord: null,
            toGlobalCoord: null
        }, i.inherits(a, r);
        var o = a;
        t.exports = o
    }, function (t, e, n) {
        n(148);
        var i = n(13),
            r = i.extend({
                type: "grid",
                dependencies: ["xAxis", "yAxis"],
                layoutMode: "box",
                coordinateSystem: null,
                defaultOption: {
                    show: !1,
                    zlevel: 0,
                    z: 0,
                    left: "10%",
                    top: 60,
                    right: "10%",
                    bottom: 60,
                    containLabel: !1,
                    backgroundColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    borderColor: "#ccc"
                }
            });
        t.exports = r
    }, function (t, e, n) {
        function i(t, e, n, i) {
            r.each(h, function (o) {
                e.extend({
                    type: t + "Axis." + o,
                    mergeDefaultAndTheme: function (e, i) {
                        var a = this.layoutMode,
                            s = a ? l(e) : {},
                            c = i.getTheme();
                        r.merge(e, c.get(o + "Axis")), r.merge(e, this.getDefaultOption()), e.type = n(t, e), a && u(e, s, a)
                    },
                    optionUpdated: function () {
                        "category" === this.option.type && (this.__ordinalMeta = c.createByAxisModel(this))
                    },
                    getCategories: function (t) {
                        var e = this.option;
                        if ("category" === e.type) return t ? e.data : this.__ordinalMeta.categories
                    },
                    getOrdinalMeta: function () {
                        return this.__ordinalMeta
                    },
                    defaultOption: r.mergeAll([{}, a[o + "Axis"], i], !0)
                })
            }), o.registerSubTypeDefaulter(t + "Axis", r.curry(n, t))
        }
        var r = n(0),
            a = n(283),
            o = n(13),
            s = n(14),
            l = s.getLayoutParams,
            u = s.mergeLayoutParam,
            c = n(132),
            h = ["value", "category", "time", "log"];
        t.exports = i
    }, function (t, e, n) {
        var i = n(0),
            r = {
                show: !0,
                zlevel: 0,
                z: 0,
                inverse: !1,
                name: "",
                nameLocation: "end",
                nameRotate: null,
                nameTruncate: {
                    maxWidth: null,
                    ellipsis: "...",
                    placeholder: "."
                },
                nameTextStyle: {},
                nameGap: 15,
                silent: !1,
                triggerEvent: !1,
                tooltip: {
                    show: !1
                },
                axisPointer: {},
                axisLine: {
                    show: !0,
                    onZero: !0,
                    onZeroAxisIndex: null,
                    lineStyle: {
                        color: "#333",
                        width: 1,
                        type: "solid"
                    },
                    symbol: ["none", "none"],
                    symbolSize: [10, 15]
                },
                axisTick: {
                    show: !0,
                    inside: !1,
                    length: 5,
                    lineStyle: {
                        width: 1
                    }
                },
                axisLabel: {
                    show: !0,
                    inside: !1,
                    rotate: 0,
                    showMinLabel: null,
                    showMaxLabel: null,
                    margin: 8,
                    fontSize: 12
                },
                splitLine: {
                    show: !0,
                    lineStyle: {
                        color: ["#ccc"],
                        width: 1,
                        type: "solid"
                    }
                },
                splitArea: {
                    show: !1,
                    areaStyle: {
                        color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
                    }
                }
            },
            a = {};
        a.categoryAxis = i.merge({
            boundaryGap: !0,
            deduplication: null,
            splitLine: {
                show: !1
            },
            axisTick: {
                alignWithLabel: !1,
                interval: "auto"
            },
            axisLabel: {
                interval: "auto"
            }
        }, r), a.valueAxis = i.merge({
            boundaryGap: [0, 0],
            splitNumber: 5
        }, r), a.timeAxis = i.defaults({
            scale: !0,
            min: "dataMin",
            max: "dataMax"
        }, a.valueAxis), a.logAxis = i.defaults({
            scale: !0,
            logBase: 10
        }, a.valueAxis);
        var o = a;
        t.exports = o
    }, function (t, e, n) {
        n(148), n(285)
    }, function (t, e, n) {
        var i = n(0),
            r = n(2),
            a = n(149),
            o = n(150),
            s = n(151),
            l = ["axisLine", "axisTickLabel", "axisName"],
            u = ["splitArea", "splitLine"],
            c = o.extend({
                type: "cartesianAxis",
                axisPointerClass: "CartesianAxisPointer",
                render: function (t, e, n, o) {
                    this.group.removeAll();
                    var h = this._axisGroup;
                    if (this._axisGroup = new r.Group, this.group.add(this._axisGroup), t.get("show")) {
                        var d = t.getCoordSysModel(),
                            f = s.layout(d, t),
                            p = new a(t, f);
                        i.each(l, p.add, p), this._axisGroup.add(p.getGroup()), i.each(u, function (e) {
                            t.get(e + ".show") && this["_" + e](t, d)
                        }, this), r.groupTransition(h, this._axisGroup, t), c.superCall(this, "render", t, e, n, o)
                    }
                },
                remove: function () {
                    this._splitAreaColors = null
                },
                _splitLine: function (t, e) {
                    var n = t.axis;
                    if (!n.scale.isBlank()) {
                        var a = t.getModel("splitLine"),
                            o = a.getModel("lineStyle"),
                            s = o.get("color");
                        s = i.isArray(s) ? s : [s];
                        for (var l = e.coordinateSystem.getRect(), u = n.isHorizontal(), c = 0, h = n.getTicksCoords({
                                tickModel: a
                            }), d = [], f = [], p = o.getLineStyle(), g = 0; g < h.length; g++) {
                            var v = n.toGlobalCoord(h[g].coord);
                            u ? (d[0] = v, d[1] = l.y, f[0] = v, f[1] = l.y + l.height) : (d[0] = l.x, d[1] = v, f[0] = l.x + l.width, f[1] = v);
                            var m = c++ % s.length,
                                y = h[g].tickValue;
                            this._axisGroup.add(new r.Line({
                                anid: null != y ? "line_" + h[g].tickValue : null,
                                subPixelOptimize: !0,
                                shape: {
                                    x1: d[0],
                                    y1: d[1],
                                    x2: f[0],
                                    y2: f[1]
                                },
                                style: i.defaults({
                                    stroke: s[m]
                                }, p),
                                silent: !0
                            }))
                        }
                    }
                },
                _splitArea: function (t, e) {
                    var n = t.axis;
                    if (!n.scale.isBlank()) {
                        var a = t.getModel("splitArea"),
                            o = a.getModel("areaStyle"),
                            s = o.get("color"),
                            l = e.coordinateSystem.getRect(),
                            u = n.getTicksCoords({
                                tickModel: a,
                                clamp: !0
                            });
                        if (u.length) {
                            var c = s.length,
                                h = this._splitAreaColors,
                                d = i.createHashMap(),
                                f = 0;
                            if (h)
                                for (var p = 0; p < u.length; p++) {
                                    var g = h.get(u[p].tickValue);
                                    if (null != g) {
                                        f = (g + (c - 1) * p) % c;
                                        break
                                    }
                                }
                            var v = n.toGlobalCoord(u[0].coord),
                                m = o.getAreaStyle();
                            s = i.isArray(s) ? s : [s];
                            for (var p = 1; p < u.length; p++) {
                                var y, _, x, b, w = n.toGlobalCoord(u[p].coord);
                                n.isHorizontal() ? (y = v, _ = l.y, x = w - y, b = l.height, v = y + x) : (y = l.x, _ = v, x = l.width, b = w - _, v = _ + b);
                                var S = u[p - 1].tickValue;
                                null != S && d.set(S, f), this._axisGroup.add(new r.Rect({
                                    anid: null != S ? "area_" + S : null,
                                    shape: {
                                        x: y,
                                        y: _,
                                        width: x,
                                        height: b
                                    },
                                    style: i.defaults({
                                        fill: s[f]
                                    }, m),
                                    silent: !0
                                })), f = (f + 1) % c
                            }
                            this._splitAreaColors = d
                        }
                    }
                }
            });
        c.extend({
            type: "xAxis"
        }), c.extend({
            type: "yAxis"
        })
    }, function (t, e, n) {
        var i = n(3),
            r = n(0),
            a = n(134),
            o = a.layout,
            s = a.largeLayout;
        n(147), n(287), n(289), n(146), i.registerLayout(i.PRIORITY.VISUAL.LAYOUT, r.curry(o, "bar")), i.registerLayout(i.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, s), i.registerVisual({
            seriesType: "bar",
            reset: function (t) {
                t.getData().setVisual("legendSymbol", "roundRect")
            }
        })
    }, function (t, e, n) {
        var i = n(288),
            r = i.extend({
                type: "series.bar",
                dependencies: ["grid", "polar"],
                brushSelector: "rect",
                getProgressive: function () {
                    return !!this.get("large") && this.get("progressive")
                },
                getProgressiveThreshold: function () {
                    var t = this.get("progressiveThreshold"),
                        e = this.get("largeThreshold");
                    return e > t && (t = e), t
                },
                defaultOption: {
                    clip: !0
                }
            });
        t.exports = r
    }, function (t, e, n) {
        var i = n(76),
            r = n(80),
            a = i.extend({
                type: "series.__base_bar__",
                getInitialData: function (t, e) {
                    return r(this.getSource(), this)
                },
                getMarkerPosition: function (t) {
                    var e = this.coordinateSystem;
                    if (e) {
                        var n = e.dataToPoint(e.clampData(t)),
                            i = this.getData(),
                            r = i.getLayout("offset"),
                            a = i.getLayout("size");
                        return n[e.getBaseAxis().isHorizontal() ? 0 : 1] += r + a / 2, n
                    }
                    return [NaN, NaN]
                },
                defaultOption: {
                    zlevel: 0,
                    z: 2,
                    coordinateSystem: "cartesian2d",
                    legendHoverLink: !0,
                    barMinHeight: 0,
                    barMinAngle: 0,
                    large: !1,
                    largeThreshold: 400,
                    progressive: 3e3,
                    progressiveChunkMode: "mod",
                    itemStyle: {},
                    emphasis: {}
                }
            });
        t.exports = a
    }, function (t, e, n) {
        function i(t, e) {
            var n = t.getArea && t.getArea();
            if ("cartesian2d" === t.type) {
                var i = t.getBaseAxis();
                if ("category" !== i.type || !i.onBand) {
                    var r = e.getLayout("bandWidth");
                    i.isHorizontal() ? (n.x -= r, n.width += 2 * r) : (n.y -= r, n.height += 2 * r)
                }
            }
            return n
        }

        function r(t, e, n) {
            n.style.text = null, p.updateProps(n, {
                shape: {
                    width: 0
                }
            }, e, t, function () {
                n.parent && n.parent.remove(n)
            })
        }

        function a(t, e, n) {
            n.style.text = null, p.updateProps(n, {
                shape: {
                    r: n.shape.r0
                }
            }, e, t, function () {
                n.parent && n.parent.remove(n)
            })
        }

        function o(t, e, n, i, r, a, o, s) {
            var l = e.getItemVisual(n, "color"),
                u = e.getItemVisual(n, "opacity"),
                c = i.getModel("itemStyle"),
                h = i.getModel("emphasis.itemStyle").getBarItemStyle();
            s || t.setShape("r", c.get("barBorderRadius") || 0), t.useStyle(f.defaults({
                fill: l,
                opacity: u
            }, c.getBarItemStyle()));
            var d = i.getShallow("cursor");
            d && t.attr("cursor", d);
            var g = o ? r.height > 0 ? "bottom" : "top" : r.width > 0 ? "left" : "right";
            s || v(t.style, h, i, l, a, n, g), p.setHoverStyle(t, h)
        }

        function s(t, e) {
            var n = t.get(M) || 0;
            return Math.min(n, Math.abs(e.width), Math.abs(e.height))
        }

        function l(t, e, n) {
            var i = t.getData(),
                r = [],
                a = i.getLayout("valueAxisHorizontal") ? 1 : 0;
            r[1 - a] = i.getLayout("valueAxisStart");
            var o = new P({
                shape: {
                    points: i.getLayout("largePoints")
                },
                incremental: !!n,
                __startPoint: r,
                __baseDimIdx: a,
                __largeDataIndices: i.getLayout("largeDataIndices"),
                __barWidth: i.getLayout("barWidth")
            });
            e.add(o), c(o, t, i), o.seriesIndex = t.seriesIndex, t.get("silent") || (o.on("mousedown", L), o.on("mousemove", L))
        }

        function u(t, e, n) {
            var i = t.__baseDimIdx,
                r = 1 - i,
                a = t.shape.points,
                o = t.__largeDataIndices,
                s = Math.abs(t.__barWidth / 2),
                l = t.__startPoint[r];
            T[0] = e, T[1] = n;
            for (var u = T[i], c = T[1 - i], h = u - s, d = u + s, f = 0, p = a.length / 2; f < p; f++) {
                var g = 2 * f,
                    v = a[g + i],
                    m = a[g + r];
                if (v >= h && v <= d && (l <= m ? c >= l && c <= m : c >= m && c <= l)) return o[f]
            }
            return -1
        }

        function c(t, e, n) {
            var i = n.getVisual("borderColor") || n.getVisual("color"),
                r = e.getModel("itemStyle").getItemStyle(["color", "borderColor"]);
            t.useStyle(r), t.style.fill = null, t.style.stroke = i, t.style.lineWidth = n.getLayout("barWidth")
        }
        var h = n(4),
            d = (h.__DEV__, n(3)),
            f = n(0),
            p = n(2),
            g = n(290),
            v = g.setLabel,
            m = n(12),
            y = n(291),
            _ = n(6),
            x = n(52),
            b = x.throttle,
            w = n(145),
            S = w.createClipPath,
            M = ["itemStyle", "barBorderWidth"],
            T = [0, 0];
        f.extend(m.prototype, y);
        var A = d.extendChartView({
                type: "bar",
                render: function (t, e, n) {
                    this._updateDrawMode(t);
                    var i = t.get("coordinateSystem");
                    return "cartesian2d" !== i && "polar" !== i || (this._isLargeDraw ? this._renderLarge(t, e, n) : this._renderNormal(t, e, n)), this.group
                },
                incrementalPrepareRender: function (t, e, n) {
                    this._clear(), this._updateDrawMode(t)
                },
                incrementalRender: function (t, e, n, i) {
                    this._incrementalRenderLarge(t, e)
                },
                _updateDrawMode: function (t) {
                    var e = t.pipelineContext.large;
                    (null == this._isLargeDraw || e ^ this._isLargeDraw) && (this._isLargeDraw = e, this._clear())
                },
                _renderNormal: function (t, e, n) {
                    var s, l = this.group,
                        u = t.getData(),
                        c = this._data,
                        h = t.coordinateSystem,
                        d = h.getBaseAxis();
                    "cartesian2d" === h.type ? s = d.isHorizontal() : "polar" === h.type && (s = "angle" === d.dim);
                    var f = t.isAnimationEnabled() ? t : null,
                        g = t.get("clip", !0),
                        v = i(h, u);
                    l.removeClipPath(), u.diff(c).add(function (e) {
                        if (u.hasValue(e)) {
                            var n = u.getItemModel(e),
                                i = O[h.type](u, e, n);
                            if (g) {
                                if (D[h.type](v, i)) return void l.remove(r)
                            }
                            var r = k[h.type](u, e, n, i, s, f);
                            u.setItemGraphicEl(e, r), l.add(r), o(r, u, e, n, i, t, s, "polar" === h.type)
                        }
                    }).update(function (e, n) {
                        var i = c.getItemGraphicEl(n);
                        if (!u.hasValue(e)) return void l.remove(i);
                        var r = u.getItemModel(e),
                            a = O[h.type](u, e, r);
                        if (g) {
                            if (D[h.type](v, a)) return void l.remove(i)
                        }
                        i ? p.updateProps(i, {
                            shape: a
                        }, f, e) : i = k[h.type](u, e, r, a, s, f, !0), u.setItemGraphicEl(e, i), l.add(i), o(i, u, e, r, a, t, s, "polar" === h.type)
                    }).remove(function (t) {
                        var e = c.getItemGraphicEl(t);
                        "cartesian2d" === h.type ? e && r(t, f, e) : e && a(t, f, e)
                    }).execute(), this._data = u
                },
                _renderLarge: function (t, e, n) {
                    this._clear(), l(t, this.group);
                    var i = t.get("clip", !0) ? S(t.coordinateSystem, !1, t) : null;
                    i ? this.group.setClipPath(i) : this.group.removeClipPath()
                },
                _incrementalRenderLarge: function (t, e) {
                    l(e, this.group, !0)
                },
                dispose: f.noop,
                remove: function (t) {
                    this._clear(t)
                },
                _clear: function (t) {
                    var e = this.group,
                        n = this._data;
                    t && t.get("animation") && n && !this._isLargeDraw ? n.eachItemGraphicEl(function (e) {
                        "sector" === e.type ? a(e.dataIndex, t, e) : r(e.dataIndex, t, e)
                    }) : e.removeAll(), this._data = null
                }
            }),
            C = Math.max,
            I = Math.min,
            D = {
                cartesian2d: function (t, e) {
                    var n = e.width < 0 ? -1 : 1,
                        i = e.height < 0 ? -1 : 1;
                    n < 0 && (e.x += e.width, e.width = -e.width), i < 0 && (e.y += e.height, e.height = -e.height);
                    var r = C(e.x, t.x),
                        a = I(e.x + e.width, t.x + t.width),
                        o = C(e.y, t.y),
                        s = I(e.y + e.height, t.y + t.height);
                    e.x = r, e.y = o, e.width = a - r, e.height = s - o;
                    var l = e.width < 0 || e.height < 0;
                    return n < 0 && (e.x += e.width, e.width = -e.width), i < 0 && (e.y += e.height, e.height = -e.height), l
                },
                polar: function (t) {
                    return !1
                }
            },
            k = {
                cartesian2d: function (t, e, n, i, r, a, o) {
                    var s = new p.Rect({
                        shape: f.extend({}, i)
                    });
                    if (a) {
                        var l = s.shape,
                            u = r ? "height" : "width",
                            c = {};
                        l[u] = 0, c[u] = i[u], p[o ? "updateProps" : "initProps"](s, {
                            shape: c
                        }, a, e)
                    }
                    return s
                },
                polar: function (t, e, n, i, r, a, o) {
                    var s = i.startAngle < i.endAngle,
                        l = new p.Sector({
                            shape: f.defaults({
                                clockwise: s
                            }, i)
                        });
                    if (a) {
                        var u = l.shape,
                            c = r ? "r" : "endAngle",
                            h = {};
                        u[c] = r ? 0 : i.startAngle, h[c] = i[c], p[o ? "updateProps" : "initProps"](l, {
                            shape: h
                        }, a, e)
                    }
                    return l
                }
            },
            O = {
                cartesian2d: function (t, e, n) {
                    var i = t.getItemLayout(e),
                        r = s(n, i),
                        a = i.width > 0 ? 1 : -1,
                        o = i.height > 0 ? 1 : -1;
                    return {
                        x: i.x + a * r / 2,
                        y: i.y + o * r / 2,
                        width: i.width - a * r,
                        height: i.height - o * r
                    }
                },
                polar: function (t, e, n) {
                    var i = t.getItemLayout(e);
                    return {
                        cx: i.cx,
                        cy: i.cy,
                        r0: i.r0,
                        r: i.r,
                        startAngle: i.startAngle,
                        endAngle: i.endAngle
                    }
                }
            },
            P = _.extend({
                type: "largeBar",
                shape: {
                    points: []
                },
                buildPath: function (t, e) {
                    for (var n = e.points, i = this.__startPoint, r = this.__baseDimIdx, a = 0; a < n.length; a += 2) i[r] = n[a + r], t.moveTo(i[0], i[1]), t.lineTo(n[a], n[a + 1])
                }
            }),
            L = b(function (t) {
                var e = this,
                    n = u(e, t.offsetX, t.offsetY);
                e.dataIndex = n >= 0 ? n : null
            }, 30, !1);
        t.exports = A
    }, function (t, e, n) {
        function i(t, e, n, i, o, l, u) {
            var c = n.getModel("label"),
                h = n.getModel("emphasis.label");
            a.setLabelStyle(t, e, c, h, {
                labelFetcher: o,
                labelDataIndex: l,
                defaultText: s(o.getData(), l),
                isRectText: !0,
                autoColor: i
            }), r(t), r(e)
        }

        function r(t, e) {
            "outside" === t.textPosition && (t.textPosition = e)
        }
        var a = n(2),
            o = n(143),
            s = o.getDefaultLabel;
        e.setLabel = i
    }, function (t, e, n) {
        var i = n(48),
            r = i([
                ["fill", "color"],
                ["stroke", "borderColor"],
                ["lineWidth", "borderWidth"],
                ["stroke", "barBorderColor"],
                ["lineWidth", "barBorderWidth"],
                ["opacity"],
                ["shadowBlur"],
                ["shadowOffsetX"],
                ["shadowOffsetY"],
                ["shadowColor"]
            ]),
            a = {
                getBarItemStyle: function (t) {
                    var e = r(this, t);
                    if (this.getBorderLineDash) {
                        var n = this.getBorderLineDash();
                        n && (e.lineDash = n)
                    }
                    return e
                }
            };
        t.exports = a
    }, function (t, e, n) {
        var i = n(3),
            r = n(0);
        n(293), n(296);
        var a = n(297),
            o = n(298),
            s = n(299),
            l = n(301);
        a("pie", [{
            type: "pieToggleSelect",
            event: "pieselectchanged",
            method: "toggleSelected"
        }, {
            type: "pieSelect",
            event: "pieselected",
            method: "select"
        }, {
            type: "pieUnSelect",
            event: "pieunselected",
            method: "unSelect"
        }]), i.registerVisual(o("pie")), i.registerLayout(r.curry(s, "pie")), i.registerProcessor(l("pie"))
    }, function (t, e, n) {
        var i = n(3),
            r = n(294),
            a = n(0),
            o = n(1),
            s = n(5),
            l = s.getPercentWithPrecision,
            u = n(295),
            c = n(27),
            h = c.retrieveRawAttr,
            d = i.extendSeriesModel({
                type: "series.pie",
                init: function (t) {
                    d.superApply(this, "init", arguments), this.legendDataProvider = function () {
                        return this.getRawData()
                    }, this.updateSelectedMap(this._createSelectableList()), this._defaultLabelLine(t)
                },
                mergeOption: function (t) {
                    d.superCall(this, "mergeOption", t), this.updateSelectedMap(this._createSelectableList())
                },
                getInitialData: function (t, e) {
                    return r(this, ["value"])
                },
                _createSelectableList: function () {
                    for (var t = this.getRawData(), e = t.mapDimension("value"), n = [], i = 0, r = t.count(); i < r; i++) n.push({
                        name: t.getName(i),
                        value: t.get(e, i),
                        selected: h(t, i, "selected")
                    });
                    return n
                },
                getDataParams: function (t) {
                    var e = this.getData(),
                        n = d.superCall(this, "getDataParams", t),
                        i = [];
                    return e.each(e.mapDimension("value"), function (t) {
                        i.push(t)
                    }), n.percent = l(i, t, e.hostModel.get("percentPrecision")), n.$vars.push("percent"), n
                },
                _defaultLabelLine: function (t) {
                    o.defaultEmphasis(t, "labelLine", ["show"]);
                    var e = t.labelLine,
                        n = t.emphasis.labelLine;
                    e.show = e.show && t.label.show, n.show = n.show && t.emphasis.label.show
                },
                defaultOption: {
                    zlevel: 0,
                    z: 2,
                    legendHoverLink: !0,
                    hoverAnimation: !0,
                    center: ["50%", "50%"],
                    radius: [0, "75%"],
                    clockwise: !0,
                    startAngle: 90,
                    minAngle: 0,
                    minShowLabelAngle: 0,
                    selectedOffset: 10,
                    hoverOffset: 10,
                    avoidLabelOverlap: !0,
                    percentPrecision: 2,
                    stillShowZeroSum: !0,
                    label: {
                        rotate: !1,
                        show: !0,
                        position: "outer"
                    },
                    labelLine: {
                        show: !0,
                        length: 15,
                        length2: 15,
                        smooth: !1,
                        lineStyle: {
                            width: 1,
                            type: "solid"
                        }
                    },
                    itemStyle: {
                        borderWidth: 1
                    },
                    animationType: "expansion",
                    animationTypeUpdate: "transition",
                    animationEasing: "cubicOut"
                }
            });
        a.mixin(d, u);
        var f = d;
        t.exports = f
    }, function (t, e, n) {
        function i(t, e, n) {
            e = l(e) && {
                coordDimensions: e
            } || s({}, e);
            var i = t.getSource(),
                o = r(i, e),
                u = new a(o, t);
            return u.initData(i, n), u
        }
        var r = n(83),
            a = n(81),
            o = n(0),
            s = o.extend,
            l = o.isArray;
        t.exports = i
    }, function (t, e, n) {
        var i = n(0),
            r = {
                updateSelectedMap: function (t) {
                    this._targetList = i.isArray(t) ? t.slice() : [], this._selectTargetMap = i.reduce(t || [], function (t, e) {
                        return t.set(e.name, e), t
                    }, i.createHashMap())
                },
                select: function (t, e) {
                    var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
                    "single" === this.get("selectedMode") && this._selectTargetMap.each(function (t) {
                        t.selected = !1
                    }), n && (n.selected = !0)
                },
                unSelect: function (t, e) {
                    var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
                    n && (n.selected = !1)
                },
                toggleSelected: function (t, e) {
                    var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
                    if (null != n) return this[n.selected ? "unSelect" : "select"](t, e), n.selected
                },
                isSelected: function (t, e) {
                    var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
                    return n && n.selected
                }
            };
        t.exports = r
    }, function (t, e, n) {
        function i(t, e, n, i) {
            var a = e.getData(),
                o = this.dataIndex,
                s = a.getName(o),
                l = e.get("selectedOffset");
            i.dispatchAction({
                type: "pieToggleSelect",
                from: t,
                name: s,
                seriesId: e.id
            }), a.each(function (t) {
                r(a.getItemGraphicEl(t), a.getItemLayout(t), e.isSelected(a.getName(t)), l, n)
            })
        }

        function r(t, e, n, i, r) {
            var a = (e.startAngle + e.endAngle) / 2,
                o = Math.cos(a),
                s = Math.sin(a),
                l = n ? i : 0,
                u = [o * l, s * l];
            r ? t.animate().when(200, {
                position: u
            }).start("bounceOut") : t.attr("position", u)
        }

        function a(t, e) {
            s.Group.call(this);
            var n = new s.Sector({
                    z2: 2
                }),
                i = new s.Polyline,
                r = new s.Text;
            this.add(n), this.add(i), this.add(r), this.updateData(t, e, !0)
        }
        var o = n(0),
            s = n(2),
            l = n(78),
            u = a.prototype;
        u.updateData = function (t, e, n) {
            var i = this.childAt(0),
                a = this.childAt(1),
                l = this.childAt(2),
                u = t.hostModel,
                c = t.getItemModel(e),
                h = t.getItemLayout(e),
                d = o.extend({}, h);
            d.label = null;
            var f = u.getShallow("animationTypeUpdate");
            if (n) {
                i.setShape(d);
                "scale" === u.getShallow("animationType") ? (i.shape.r = h.r0, s.initProps(i, {
                    shape: {
                        r: h.r
                    }
                }, u, e)) : (i.shape.endAngle = h.startAngle, s.updateProps(i, {
                    shape: {
                        endAngle: h.endAngle
                    }
                }, u, e))
            } else "expansion" === f ? i.setShape(d) : s.updateProps(i, {
                shape: d
            }, u, e);
            var p = t.getItemVisual(e, "color");
            i.useStyle(o.defaults({
                lineJoin: "bevel",
                fill: p
            }, c.getModel("itemStyle").getItemStyle())), i.hoverStyle = c.getModel("emphasis.itemStyle").getItemStyle();
            var g = c.getShallow("cursor");
            g && i.attr("cursor", g), r(this, t.getItemLayout(e), u.isSelected(null, e), u.get("selectedOffset"), u.get("animation"));
            var v = !n && "transition" === f;
            this._updateLabel(t, e, v), this.highDownOnUpdate = c.get("hoverAnimation") && u.isAnimationEnabled() ? function (t, e) {
                "emphasis" === e ? (a.ignore = a.hoverIgnore, l.ignore = l.hoverIgnore, i.stopAnimation(!0), i.animateTo({
                    shape: {
                        r: h.r + u.get("hoverOffset")
                    }
                }, 300, "elasticOut")) : (a.ignore = a.normalIgnore, l.ignore = l.normalIgnore, i.stopAnimation(!0), i.animateTo({
                    shape: {
                        r: h.r
                    }
                }, 300, "elasticOut"))
            } : null, s.setHoverStyle(this)
        }, u._updateLabel = function (t, e, n) {
            var i = this.childAt(1),
                r = this.childAt(2),
                a = t.hostModel,
                o = t.getItemModel(e),
                l = t.getItemLayout(e),
                u = l.label,
                c = t.getItemVisual(e, "color");
            if (!u || isNaN(u.x) || isNaN(u.y)) return void(r.ignore = r.normalIgnore = r.hoverIgnore = i.ignore = i.normalIgnore = i.hoverIgnore = !0);
            var h = {
                    points: u.linePoints || [
                        [u.x, u.y],
                        [u.x, u.y],
                        [u.x, u.y]
                    ]
                },
                d = {
                    x: u.x,
                    y: u.y
                };
            n ? (s.updateProps(i, {
                shape: h
            }, a, e), s.updateProps(r, {
                style: d
            }, a, e)) : (i.attr({
                shape: h
            }), r.attr({
                style: d
            })), r.attr({
                rotation: u.rotation,
                origin: [u.x, u.y],
                z2: 10
            });
            var f = o.getModel("label"),
                p = o.getModel("emphasis.label"),
                g = o.getModel("labelLine"),
                v = o.getModel("emphasis.labelLine"),
                c = t.getItemVisual(e, "color");
            s.setLabelStyle(r.style, r.hoverStyle = {}, f, p, {
                labelFetcher: t.hostModel,
                labelDataIndex: e,
                defaultText: t.getName(e),
                autoColor: c,
                useInsideStyle: !!u.inside
            }, {
                textAlign: u.textAlign,
                textVerticalAlign: u.verticalAlign,
                opacity: t.getItemVisual(e, "opacity")
            }), r.ignore = r.normalIgnore = !f.get("show"), r.hoverIgnore = !p.get("show"), i.ignore = i.normalIgnore = !g.get("show"), i.hoverIgnore = !v.get("show"), i.setStyle({
                stroke: c,
                opacity: t.getItemVisual(e, "opacity")
            }), i.setStyle(g.getModel("lineStyle").getLineStyle()), i.hoverStyle = v.getModel("lineStyle").getLineStyle();
            var m = g.get("smooth");
            m && !0 === m && (m = .4), i.setShape({
                smooth: m
            })
        }, o.inherits(a, s.Group);
        var c = l.extend({
                type: "pie",
                init: function () {
                    var t = new s.Group;
                    this._sectorGroup = t
                },
                render: function (t, e, n, r) {
                    if (!r || r.from !== this.uid) {
                        var s = t.getData(),
                            l = this._data,
                            u = this.group,
                            c = e.get("animation"),
                            h = !l,
                            d = t.get("animationType"),
                            f = t.get("animationTypeUpdate"),
                            p = o.curry(i, this.uid, t, c, n),
                            g = t.get("selectedMode");
                        if (s.diff(l).add(function (t) {
                                var e = new a(s, t);
                                h && "scale" !== d && e.eachChild(function (t) {
                                    t.stopAnimation(!0)
                                }), g && e.on("click", p), s.setItemGraphicEl(t, e), u.add(e)
                            }).update(function (t, e) {
                                var n = l.getItemGraphicEl(e);
                                h || "transition" === f || n.eachChild(function (t) {
                                    t.stopAnimation(!0)
                                }), n.updateData(s, t), n.off("click"), g && n.on("click", p), u.add(n), s.setItemGraphicEl(t, n)
                            }).remove(function (t) {
                                var e = l.getItemGraphicEl(t);
                                u.remove(e)
                            }).execute(), c && s.count() > 0 && (h ? "scale" !== d : "transition" !== f)) {
                            for (var v = s.getItemLayout(0), m = 1; isNaN(v.startAngle) && m < s.count(); ++m) v = s.getItemLayout(m);
                            var y = Math.max(n.getWidth(), n.getHeight()) / 2,
                                _ = o.bind(u.removeClipPath, u);
                            u.setClipPath(this._createClipPath(v.cx, v.cy, y, v.startAngle, v.clockwise, _, t, h))
                        } else u.removeClipPath();
                        this._data = s
                    }
                },
                dispose: function () {},
                _createClipPath: function (t, e, n, i, r, a, o, l) {
                    var u = new s.Sector({
                        shape: {
                            cx: t,
                            cy: e,
                            r0: 0,
                            r: n,
                            startAngle: i,
                            endAngle: i,
                            clockwise: r
                        }
                    });
                    return (l ? s.initProps : s.updateProps)(u, {
                        shape: {
                            endAngle: i + (r ? 1 : -1) * Math.PI * 2
                        }
                    }, o, a), u
                },
                containPoint: function (t, e) {
                    var n = e.getData(),
                        i = n.getItemLayout(0);
                    if (i) {
                        var r = t[0] - i.cx,
                            a = t[1] - i.cy,
                            o = Math.sqrt(r * r + a * a);
                        return o <= i.r && o >= i.r0
                    }
                }
            }),
            h = c;
        t.exports = h
    }, function (t, e, n) {
        function i(t, e) {
            a.each(e, function (e) {
                e.update = "updateView", r.registerAction(e, function (n, i) {
                    var r = {};
                    return i.eachComponent({
                        mainType: "series",
                        subType: t,
                        query: n
                    }, function (t) {
                        t[e.method] && t[e.method](n.name, n.dataIndex);
                        var i = t.getData();
                        i.each(function (e) {
                            var n = i.getName(e);
                            r[n] = t.isSelected(n) || !1
                        })
                    }), {
                        name: n.name,
                        selected: r,
                        seriesId: n.seriesId
                    }
                })
            })
        }
        var r = n(3),
            a = n(0);
        t.exports = i
    }, function (t, e, n) {
        function i(t) {
            return {
                getTargetSeries: function (e) {
                    var n = {},
                        i = a();
                    return e.eachSeriesByType(t, function (t) {
                        t.__paletteScope = n, i.set(t.uid, t)
                    }), i
                },
                reset: function (t, e) {
                    var n = t.getRawData(),
                        i = {},
                        r = t.getData();
                    r.each(function (t) {
                        var e = r.getRawIndex(t);
                        i[e] = t
                    }), n.each(function (e) {
                        var a, o = i[e],
                            s = null != o && r.getItemVisual(o, "color", !0),
                            l = null != o && r.getItemVisual(o, "borderColor", !0);
                        if (s && l || (a = n.getItemModel(e)), s) n.setItemVisual(e, "color", s);
                        else {
                            var u = a.get("itemStyle.color") || t.getColorFromPalette(n.getName(e) || e + "", t.__paletteScope, n.count());
                            n.setItemVisual(e, "color", u), null != o && r.setItemVisual(o, "color", u)
                        }
                        if (l) n.setItemVisual(e, "borderColor", l);
                        else {
                            var c = a.get("itemStyle.borderColor");
                            n.setItemVisual(e, "borderColor", c), null != o && r.setItemVisual(o, "borderColor", c)
                        }
                    })
                }
            }
        }
        var r = n(0),
            a = r.createHashMap;
        t.exports = i
    }, function (t, e, n) {
        function i(t, e, n, i) {
            e.eachSeriesByType(t, function (t) {
                var e = t.getData(),
                    i = e.mapDimension("value"),
                    r = t.get("center"),
                    h = t.get("radius");
                l.isArray(h) || (h = [0, h]), l.isArray(r) || (r = [r, r]);
                var d = n.getWidth(),
                    f = n.getHeight(),
                    p = Math.min(d, f),
                    g = a(r[0], d),
                    v = a(r[1], f),
                    m = a(h[0], p / 2),
                    y = a(h[1], p / 2),
                    _ = -t.get("startAngle") * c,
                    x = t.get("minAngle") * c,
                    b = 0;
                e.each(i, function (t) {
                    !isNaN(t) && b++
                });
                var w = e.getSum(i),
                    S = Math.PI / (w || b) * 2,
                    M = t.get("clockwise"),
                    T = t.get("roseType"),
                    A = t.get("stillShowZeroSum"),
                    C = e.getDataExtent(i);
                C[0] = 0;
                var I = u,
                    D = 0,
                    k = _,
                    O = M ? 1 : -1;
                if (e.each(i, function (t, n) {
                        var i;
                        if (isNaN(t)) return void e.setItemLayout(n, {
                            angle: NaN,
                            startAngle: NaN,
                            endAngle: NaN,
                            clockwise: M,
                            cx: g,
                            cy: v,
                            r0: m,
                            r: T ? NaN : y
                        });
                        i = "area" !== T ? 0 === w && A ? S : t * S : u / b, i < x ? (i = x, I -= x) : D += t;
                        var r = k + O * i;
                        e.setItemLayout(n, {
                            angle: i,
                            startAngle: k,
                            endAngle: r,
                            clockwise: M,
                            cx: g,
                            cy: v,
                            r0: m,
                            r: T ? o(t, C, [m, y]) : y
                        }), k = r
                    }), I < u && b)
                    if (I <= .001) {
                        var P = u / b;
                        e.each(i, function (t, n) {
                            if (!isNaN(t)) {
                                var i = e.getItemLayout(n);
                                i.angle = P, i.startAngle = _ + O * n * P, i.endAngle = _ + O * (n + 1) * P
                            }
                        })
                    } else S = I / D, k = _, e.each(i, function (t, n) {
                        if (!isNaN(t)) {
                            var i = e.getItemLayout(n),
                                r = i.angle === x ? x : t * S;
                            i.startAngle = k, i.endAngle = k + O * r, k += O * r
                        }
                    });
                s(t, y, d, f)
            })
        }
        var r = n(5),
            a = r.parsePercent,
            o = r.linearMap,
            s = n(300),
            l = n(0),
            u = 2 * Math.PI,
            c = Math.PI / 180;
        t.exports = i
    }, function (t, e, n) {
        function i(t, e, n, i, r, a, o) {
            function s(e, n) {
                for (var i = e; i >= 0 && (t[i].y -= n, !(i > 0 && t[i].y > t[i - 1].y + t[i - 1].height)); i--);
            }

            function l(t, e, n, i, r, a) {
                for (var o = e ? Number.MAX_VALUE : 0, s = 0, l = t.length; s < l; s++) {
                    var u = Math.abs(t[s].y - i),
                        c = t[s].len,
                        h = t[s].len2,
                        d = u < r + c ? Math.sqrt((r + c + h) * (r + c + h) - u * u) : Math.abs(t[s].x - n);
                    e && d >= o && (d = o - 10), !e && d <= o && (d = o + 10), t[s].x = n + d * a, o = d
                }
            }
            t.sort(function (t, e) {
                return t.y - e.y
            });
            for (var u, c = 0, h = t.length, d = [], f = [], p = 0; p < h; p++) u = t[p].y - c, u < 0 && function (e, n, i, r) {
                for (var a = e; a < n; a++)
                    if (t[a].y += i, a > e && a + 1 < n && t[a + 1].y > t[a].y + t[a].height) return void s(a, i / 2);
                s(n - 1, i / 2)
            }(p, h, -u), c = t[p].y + t[p].height;
            o - c < 0 && s(h - 1, c - o);
            for (var p = 0; p < h; p++) t[p].y >= n ? f.push(t[p]) : d.push(t[p]);
            l(d, !1, e, n, i, r), l(f, !0, e, n, i, r)
        }

        function r(t, e, n, r, o, s) {
            for (var l = [], u = [], c = 0; c < t.length; c++) a(t[c]) || (t[c].x < e ? l.push(t[c]) : u.push(t[c]));
            i(u, e, n, r, 1, o, s), i(l, e, n, r, -1, o, s);
            for (var c = 0; c < t.length; c++)
                if (!a(t[c])) {
                    var h = t[c].linePoints;
                    if (h) {
                        var d = h[1][0] - h[2][0];
                        t[c].x < e ? h[2][0] = t[c].x + 3 : h[2][0] = t[c].x - 3, h[1][1] = h[2][1] = t[c].y, h[1][0] = h[2][0] + d
                    }
                }
        }

        function a(t) {
            return "center" === t.position
        }

        function o(t, e, n, i, a) {
            var o, u, c = t.getData(),
                h = [],
                d = !1,
                f = (t.get("minShowLabelAngle") || 0) * l;
            c.each(function (n) {
                var i = c.getItemLayout(n),
                    r = c.getItemModel(n),
                    a = r.getModel("label"),
                    l = a.get("position") || r.get("emphasis.label.position"),
                    p = r.getModel("labelLine"),
                    g = p.get("length"),
                    v = p.get("length2");
                if (!(i.angle < f)) {
                    var m, y, _, x, b = (i.startAngle + i.endAngle) / 2,
                        w = Math.cos(b),
                        S = Math.sin(b);
                    o = i.cx, u = i.cy;
                    var M = "inside" === l || "inner" === l;
                    if ("center" === l) m = i.cx, y = i.cy, x = "center";
                    else {
                        var T = (M ? (i.r + i.r0) / 2 * w : i.r * w) + o,
                            A = (M ? (i.r + i.r0) / 2 * S : i.r * S) + u;
                        if (m = T + 3 * w, y = A + 3 * S, !M) {
                            var C = T + w * (g + e - i.r),
                                I = A + S * (g + e - i.r),
                                D = C + (w < 0 ? -1 : 1) * v,
                                k = I;
                            m = D + (w < 0 ? -5 : 5), y = k, _ = [
                                [T, A],
                                [C, I],
                                [D, k]
                            ]
                        }
                        x = M ? "center" : w > 0 ? "left" : "right"
                    }
                    var O, P = a.getFont(),
                        L = a.get("rotate");
                    O = "number" == typeof L ? L * (Math.PI / 180) : L ? w < 0 ? -b + Math.PI : -b : 0;
                    var E = t.getFormattedLabel(n, "normal") || c.getName(n),
                        R = s.getBoundingRect(E, P, x, "top");
                    d = !!O, i.label = {
                        x: m,
                        y: y,
                        position: l,
                        height: R.height,
                        len: g,
                        len2: v,
                        linePoints: _,
                        textAlign: x,
                        verticalAlign: "middle",
                        rotation: O,
                        inside: M
                    }, M || h.push(i.label)
                }
            }), !d && t.get("avoidLabelOverlap") && r(h, o, u, e, n, i)
        }
        var s = n(16),
            l = Math.PI / 180;
        t.exports = o
    }, function (t, e) {
        function n(t) {
            return {
                seriesType: t,
                reset: function (t, e) {
                    var n = e.findComponents({
                        mainType: "legend"
                    });
                    if (n && n.length) {
                        var i = t.getData();
                        i.filterSelf(function (t) {
                            for (var e = i.getName(t), r = 0; r < n.length; r++)
                                if (!n[r].isSelected(e)) return !1;
                            return !0
                        })
                    }
                }
            }
        }
        t.exports = n
    }, function (t, e, n) {
        var i = n(0),
            r = n(3),
            a = n(2),
            o = n(14),
            s = o.getLayoutRect;
        r.extendComponentModel({
            type: "title",
            layoutMode: {
                type: "box",
                ignoreSize: !0
            },
            defaultOption: {
                zlevel: 0,
                z: 6,
                show: !0,
                text: "",
                target: "blank",
                subtext: "",
                subtarget: "blank",
                left: 0,
                top: 0,
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "#ccc",
                borderWidth: 0,
                padding: 5,
                itemGap: 10,
                textStyle: {
                    fontSize: 18,
                    fontWeight: "bolder",
                    color: "#333"
                },
                subtextStyle: {
                    color: "#aaa"
                }
            }
        }), r.extendComponentView({
            type: "title",
            render: function (t, e, n) {
                if (this.group.removeAll(), t.get("show")) {
                    var r = this.group,
                        o = t.getModel("textStyle"),
                        l = t.getModel("subtextStyle"),
                        u = t.get("textAlign"),
                        c = i.retrieve2(t.get("textBaseline"), t.get("textVerticalAlign")),
                        h = new a.Text({
                            style: a.setTextStyle({}, o, {
                                text: t.get("text"),
                                textFill: o.getTextColor()
                            }, {
                                disableBox: !0
                            }),
                            z2: 10
                        }),
                        d = h.getBoundingRect(),
                        f = t.get("subtext"),
                        p = new a.Text({
                            style: a.setTextStyle({}, l, {
                                text: f,
                                textFill: l.getTextColor(),
                                y: d.height + t.get("itemGap"),
                                textVerticalAlign: "top"
                            }, {
                                disableBox: !0
                            }),
                            z2: 10
                        }),
                        g = t.get("link"),
                        v = t.get("sublink"),
                        m = t.get("triggerEvent", !0);
                    h.silent = !g && !m, p.silent = !v && !m, g && h.on("click", function () {
                        window.open(g, "_" + t.get("target"))
                    }), v && p.on("click", function () {
                        window.open(v, "_" + t.get("subtarget"))
                    }), h.eventData = p.eventData = m ? {
                        componentType: "title",
                        componentIndex: t.componentIndex
                    } : null, r.add(h), f && r.add(p);
                    var y = r.getBoundingRect(),
                        _ = t.getBoxLayoutParams();
                    _.width = y.width, _.height = y.height;
                    var x = s(_, {
                        width: n.getWidth(),
                        height: n.getHeight()
                    }, t.get("padding"));
                    u || (u = t.get("left") || t.get("right"), "middle" === u && (u = "center"), "right" === u ? x.x += x.width : "center" === u && (x.x += x.width / 2)), c || (c = t.get("top") || t.get("bottom"), "center" === c && (c = "middle"), "bottom" === c ? x.y += x.height : "middle" === c && (x.y += x.height / 2), c = c || "top"), r.attr("position", [x.x, x.y]);
                    var b = {
                        textAlign: u,
                        textVerticalAlign: c
                    };
                    h.setStyle(b), p.setStyle(b), y = r.getBoundingRect();
                    var w = x.margin,
                        S = t.getItemStyle(["color", "opacity"]);
                    S.fill = t.get("backgroundColor");
                    var M = new a.Rect({
                        shape: {
                            x: y.x - w[3],
                            y: y.y - w[0],
                            width: y.width + w[1] + w[3],
                            height: y.height + w[0] + w[2],
                            r: t.get("borderRadius")
                        },
                        style: S,
                        subPixelOptimize: !0,
                        silent: !0
                    });
                    r.add(M)
                }
            }
        })
    }, function (t, e, n) {
        var i = n(3);
        n(304), n(310), n(311), i.registerAction({
            type: "showTip",
            event: "showTip",
            update: "tooltip:manuallyShowTip"
        }, function () {}), i.registerAction({
            type: "hideTip",
            event: "hideTip",
            update: "tooltip:manuallyHideTip"
        }, function () {})
    }, function (t, e, n) {
        var i = n(3),
            r = n(0),
            a = n(56),
            o = n(305);
        n(306), n(307), n(308), i.registerPreprocessor(function (t) {
            if (t) {
                (!t.axisPointer || 0 === t.axisPointer.length) && (t.axisPointer = {});
                var e = t.axisPointer.link;
                e && !r.isArray(e) && (t.axisPointer.link = [e])
            }
        }), i.registerProcessor(i.PRIORITY.PROCESSOR.STATISTIC, function (t, e) {
            t.getComponent("axisPointer").coordSysAxesInfo = a.collect(t, e)
        }), i.registerAction({
            type: "updateAxisPointer",
            event: "updateAxisPointer",
            update: ":updateAxisPointer"
        }, o)
    }, function (t, e, n) {
        function i(t, e, n) {
            var i = t.currTrigger,
                a = [t.x, t.y],
                g = t,
                v = t.dispatchAction || p.bind(n.dispatchAction, n),
                m = e.getComponent("axisPointer").coordSysAxesInfo;
            if (m) {
                f(a) && (a = y({
                    seriesIndex: g.seriesIndex,
                    dataIndex: g.dataIndex
                }, e).point);
                var b = f(a),
                    w = g.axesInfo,
                    S = m.axesInfo,
                    M = "leave" === i || f(a),
                    T = {},
                    A = {},
                    C = {
                        list: [],
                        map: {}
                    },
                    I = {
                        showPointer: x(o, A),
                        showTooltip: x(s, C)
                    };
                _(m.coordSysMap, function (t, e) {
                    var n = b || t.containPoint(a);
                    _(m.coordSysAxesInfo[e], function (t, e) {
                        var i = t.axis,
                            o = h(w, t);
                        if (!M && n && (!w || o)) {
                            var s = o && o.value;
                            null != s || b || (s = i.pointToData(a)), null != s && r(t, s, I, !1, T)
                        }
                    })
                });
                var D = {};
                return _(S, function (t, e) {
                    var n = t.linkGroup;
                    n && !A[e] && _(n.axesInfo, function (e, i) {
                        var r = A[i];
                        if (e !== t && r) {
                            var a = r.value;
                            n.mapper && (a = t.axis.scale.parse(n.mapper(a, d(e), d(t)))), D[t.key] = a
                        }
                    })
                }), _(D, function (t, e) {
                    r(S[e], t, I, !0, T)
                }), l(A, S, T), u(C, a, t, v), c(S, v, n), T
            }
        }

        function r(t, e, n, i, r) {
            var o = t.axis;
            if (!o.scale.isBlank() && o.containData(e)) {
                if (!t.involveSeries) return void n.showPointer(t, e);
                var s = a(e, t),
                    l = s.payloadBatch,
                    u = s.snapToValue;
                l[0] && null == r.seriesIndex && p.extend(r, l[0]), !i && t.snap && o.containData(u) && null != u && (e = u), n.showPointer(t, e, l, r), n.showTooltip(t, s, u)
            }
        }

        function a(t, e) {
            var n = e.axis,
                i = n.dim,
                r = t,
                a = [],
                o = Number.MAX_VALUE,
                s = -1;
            return _(e.seriesModels, function (e, l) {
                var u, c, h = e.getData().mapDimension(i, !0);
                if (e.getAxisTooltipData) {
                    var d = e.getAxisTooltipData(h, t, n);
                    c = d.dataIndices, u = d.nestestValue
                } else {
                    if (c = e.getData().indicesOfNearest(h[0], t, "category" === n.type ? .5 : null), !c.length) return;
                    u = e.getData().get(h[0], c[0])
                }
                if (null != u && isFinite(u)) {
                    var f = t - u,
                        p = Math.abs(f);
                    p <= o && ((p < o || f >= 0 && s < 0) && (o = p, s = f, r = u, a.length = 0), _(c, function (t) {
                        a.push({
                            seriesIndex: e.seriesIndex,
                            dataIndexInside: t,
                            dataIndex: e.getData().getRawIndex(t)
                        })
                    }))
                }
            }), {
                payloadBatch: a,
                snapToValue: r
            }
        }

        function o(t, e, n, i) {
            t[e.key] = {
                value: n,
                payloadBatch: i
            }
        }

        function s(t, e, n, i) {
            var r = n.payloadBatch,
                a = e.axis,
                o = a.model,
                s = e.axisPointerModel;
            if (e.triggerTooltip && r.length) {
                var l = e.coordSys.model,
                    u = m.makeKey(l),
                    c = t.map[u];
                c || (c = t.map[u] = {
                    coordSysId: l.id,
                    coordSysIndex: l.componentIndex,
                    coordSysType: l.type,
                    coordSysMainType: l.mainType,
                    dataByAxis: []
                }, t.list.push(c)), c.dataByAxis.push({
                    axisDim: a.dim,
                    axisIndex: o.componentIndex,
                    axisType: o.type,
                    axisId: o.id,
                    value: i,
                    valueLabelOpt: {
                        precision: s.get("label.precision"),
                        formatter: s.get("label.formatter")
                    },
                    seriesDataIndices: r.slice()
                })
            }
        }

        function l(t, e, n) {
            var i = n.axesInfo = [];
            _(e, function (e, n) {
                var r = e.axisPointerModel.option,
                    a = t[n];
                a ? (!e.useHandle && (r.status = "show"), r.value = a.value, r.seriesDataIndices = (a.payloadBatch || []).slice()) : !e.useHandle && (r.status = "hide"), "show" === r.status && i.push({
                    axisDim: e.axis.dim,
                    axisIndex: e.axis.model.componentIndex,
                    value: r.value
                })
            })
        }

        function u(t, e, n, i) {
            if (f(e) || !t.list.length) return void i({
                type: "hideTip"
            });
            var r = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
            i({
                type: "showTip",
                escapeConnect: !0,
                x: e[0],
                y: e[1],
                tooltipOption: n.tooltipOption,
                position: n.position,
                dataIndexInside: r.dataIndexInside,
                dataIndex: r.dataIndex,
                seriesIndex: r.seriesIndex,
                dataByCoordSys: t.list
            })
        }

        function c(t, e, n) {
            var i = n.getZr(),
                r = b(i).axisPointerLastHighlights || {},
                a = b(i).axisPointerLastHighlights = {};
            _(t, function (t, e) {
                var n = t.axisPointerModel.option;
                "show" === n.status && _(n.seriesDataIndices, function (t) {
                    var e = t.seriesIndex + " | " + t.dataIndex;
                    a[e] = t
                })
            });
            var o = [],
                s = [];
            p.each(r, function (t, e) {
                !a[e] && s.push(t)
            }), p.each(a, function (t, e) {
                !r[e] && o.push(t)
            }), s.length && n.dispatchAction({
                type: "downplay",
                escapeConnect: !0,
                batch: s
            }), o.length && n.dispatchAction({
                type: "highlight",
                escapeConnect: !0,
                batch: o
            })
        }

        function h(t, e) {
            for (var n = 0; n < (t || []).length; n++) {
                var i = t[n];
                if (e.axis.dim === i.axisDim && e.axis.model.componentIndex === i.axisIndex) return i
            }
        }

        function d(t) {
            var e = t.axis.model,
                n = {},
                i = n.axisDim = t.axis.dim;
            return n.axisIndex = n[i + "AxisIndex"] = e.componentIndex, n.axisName = n[i + "AxisName"] = e.name, n.axisId = n[i + "AxisId"] = e.id, n
        }

        function f(t) {
            return !t || null == t[0] || isNaN(t[0]) || null == t[1] || isNaN(t[1])
        }
        var p = n(0),
            g = n(1),
            v = g.makeInner,
            m = n(56),
            y = n(152),
            _ = p.each,
            x = p.curry,
            b = v();
        t.exports = i
    }, function (t, e, n) {
        var i = n(3),
            r = i.extendComponentModel({
                type: "axisPointer",
                coordSysAxesInfo: null,
                defaultOption: {
                    show: "auto",
                    triggerOn: null,
                    zlevel: 0,
                    z: 50,
                    type: "line",
                    snap: !1,
                    triggerTooltip: !0,
                    value: null,
                    status: null,
                    link: [],
                    animation: null,
                    animationDurationUpdate: 200,
                    lineStyle: {
                        color: "#aaa",
                        width: 1,
                        type: "solid"
                    },
                    shadowStyle: {
                        color: "rgba(150,150,150,0.3)"
                    },
                    label: {
                        show: !0,
                        formatter: null,
                        precision: "auto",
                        margin: 3,
                        color: "#fff",
                        padding: [5, 7, 5, 7],
                        backgroundColor: "auto",
                        borderColor: null,
                        borderWidth: 0,
                        shadowBlur: 3,
                        shadowColor: "#aaa"
                    },
                    handle: {
                        show: !1,
                        icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
                        size: 45,
                        margin: 50,
                        color: "#333",
                        shadowBlur: 3,
                        shadowColor: "#aaa",
                        shadowOffsetX: 0,
                        shadowOffsetY: 2,
                        throttle: 40
                    }
                }
            }),
            a = r;
        t.exports = a
    }, function (t, e, n) {
        var i = n(3),
            r = n(153),
            a = i.extendComponentView({
                type: "axisPointer",
                render: function (t, e, n) {
                    var i = e.getComponent("tooltip"),
                        a = t.get("triggerOn") || i && i.get("triggerOn") || "mousemove|click";
                    r.register("axisPointer", n, function (t, e, n) {
                        "none" !== a && ("leave" === t || a.indexOf(t) >= 0) && n({
                            type: "updateAxisPointer",
                            currTrigger: t,
                            x: e && e.offsetX,
                            y: e && e.offsetY
                        })
                    })
                },
                remove: function (t, e) {
                    r.unregister(e.getZr(), "axisPointer"), a.superApply(this._model, "remove", arguments)
                },
                dispose: function (t, e) {
                    r.unregister("axisPointer", e), a.superApply(this._model, "dispose", arguments)
                }
            }),
            o = a;
        t.exports = o
    }, function (t, e, n) {
        function i(t, e) {
            var n = {};
            return n[e.dim + "AxisIndex"] = e.index, t.getCartesian(n)
        }

        function r(t) {
            return "x" === t.dim ? 0 : 1
        }
        var a = n(309),
            o = n(154),
            s = n(151),
            l = n(150),
            u = a.extend({
                makeElOption: function (t, e, n, r, a) {
                    var l = n.axis,
                        u = l.grid,
                        h = r.get("type"),
                        d = i(u, l).getOtherAxis(l).getGlobalExtent(),
                        f = l.toGlobalCoord(l.dataToCoord(e, !0));
                    if (h && "none" !== h) {
                        var p = o.buildElStyle(r),
                            g = c[h](l, f, d);
                        g.style = p, t.graphicKey = g.type, t.pointer = g
                    }
                    var v = s.layout(u.model, n);
                    o.buildCartesianSingleLabelElOption(e, t, v, n, r, a)
                },
                getHandleTransform: function (t, e, n) {
                    var i = s.layout(e.axis.grid.model, e, {
                        labelInside: !1
                    });
                    return i.labelMargin = n.get("handle.margin"), {
                        position: o.getTransformedPosition(e.axis, t, i),
                        rotation: i.rotation + (i.labelDirection < 0 ? Math.PI : 0)
                    }
                },
                updateHandleTransform: function (t, e, n, r) {
                    var a = n.axis,
                        o = a.grid,
                        s = a.getGlobalExtent(!0),
                        l = i(o, a).getOtherAxis(a).getGlobalExtent(),
                        u = "x" === a.dim ? 0 : 1,
                        c = t.position;
                    c[u] += e[u], c[u] = Math.min(s[1], c[u]), c[u] = Math.max(s[0], c[u]);
                    var h = (l[1] + l[0]) / 2,
                        d = [h, h];
                    d[u] = c[u];
                    var f = [{
                        verticalAlign: "middle"
                    }, {
                        align: "center"
                    }];
                    return {
                        position: c,
                        rotation: t.rotation,
                        cursorPoint: d,
                        tooltipOption: f[u]
                    }
                }
            }),
            c = {
                line: function (t, e, n) {
                    return {
                        type: "Line",
                        subPixelOptimize: !0,
                        shape: o.makeLineShape([e, n[0]], [e, n[1]], r(t))
                    }
                },
                shadow: function (t, e, n) {
                    var i = Math.max(1, t.getBandWidth()),
                        a = n[1] - n[0];
                    return {
                        type: "Rect",
                        shape: o.makeRectShape([e - i / 2, n[0]], [i, a], r(t))
                    }
                }
            };
        l.registerAxisPointerClass("CartesianAxisPointer", u);
        var h = u;
        t.exports = h
    }, function (t, e, n) {
        function i() {}

        function r(t, e, n, i) {
            a(m(n).lastProp, i) || (m(n).lastProp = i, e ? h.updateProps(n, i, t) : (n.stopAnimation(), n.attr(i)))
        }

        function a(t, e) {
            if (u.isObject(t) && u.isObject(e)) {
                var n = !0;
                return u.each(e, function (e, i) {
                    n = n && a(t[i], e)
                }), !!n
            }
            return t === e
        }

        function o(t, e) {
            t[e.get("label.show") ? "show" : "hide"]()
        }

        function s(t) {
            return {
                position: t.position.slice(),
                rotation: t.rotation || 0
            }
        }

        function l(t, e, n) {
            var i = e.get("z"),
                r = e.get("zlevel");
            t && t.traverse(function (t) {
                "group" !== t.type && (null != i && (t.z = i), null != r && (t.zlevel = r), t.silent = n)
            })
        }
        var u = n(0),
            c = n(17),
            h = n(2),
            d = n(56),
            f = n(25),
            p = n(52),
            g = n(1),
            v = g.makeInner,
            m = v(),
            y = u.clone,
            _ = u.bind;
        i.prototype = {
            _group: null,
            _lastGraphicKey: null,
            _handle: null,
            _dragging: !1,
            _lastValue: null,
            _lastStatus: null,
            _payloadInfo: null,
            animationThreshold: 15,
            render: function (t, e, n, i) {
                var a = e.get("value"),
                    o = e.get("status");
                if (this._axisModel = t, this._axisPointerModel = e, this._api = n, i || this._lastValue !== a || this._lastStatus !== o) {
                    this._lastValue = a, this._lastStatus = o;
                    var s = this._group,
                        c = this._handle;
                    if (!o || "hide" === o) return s && s.hide(), void(c && c.hide());
                    s && s.show(), c && c.show();
                    var d = {};
                    this.makeElOption(d, a, t, e, n);
                    var f = d.graphicKey;
                    f !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = f;
                    var p = this._moveAnimation = this.determineAnimation(t, e);
                    if (s) {
                        var g = u.curry(r, e, p);
                        this.updatePointerEl(s, d, g, e), this.updateLabelEl(s, d, g, e)
                    } else s = this._group = new h.Group, this.createPointerEl(s, d, t, e), this.createLabelEl(s, d, t, e), n.getZr().add(s);
                    l(s, e, !0), this._renderHandle(a)
                }
            },
            remove: function (t) {
                this.clear(t)
            },
            dispose: function (t) {
                this.clear(t)
            },
            determineAnimation: function (t, e) {
                var n = e.get("animation"),
                    i = t.axis,
                    r = "category" === i.type,
                    a = e.get("snap");
                if (!a && !r) return !1;
                if ("auto" === n || null == n) {
                    var o = this.animationThreshold;
                    if (r && i.getBandWidth() > o) return !0;
                    if (a) {
                        var s = d.getAxisInfo(t).seriesDataCount,
                            l = i.getExtent();
                        return Math.abs(l[0] - l[1]) / s > o
                    }
                    return !1
                }
                return !0 === n
            },
            makeElOption: function (t, e, n, i, r) {},
            createPointerEl: function (t, e, n, i) {
                var r = e.pointer;
                if (r) {
                    var a = m(t).pointerEl = new h[r.type](y(e.pointer));
                    t.add(a)
                }
            },
            createLabelEl: function (t, e, n, i) {
                if (e.label) {
                    var r = m(t).labelEl = new h.Rect(y(e.label));
                    t.add(r), o(r, i)
                }
            },
            updatePointerEl: function (t, e, n) {
                var i = m(t).pointerEl;
                i && e.pointer && (i.setStyle(e.pointer.style), n(i, {
                    shape: e.pointer.shape
                }))
            },
            updateLabelEl: function (t, e, n, i) {
                var r = m(t).labelEl;
                r && (r.setStyle(e.label.style), n(r, {
                    shape: e.label.shape,
                    position: e.label.position
                }), o(r, i))
            },
            _renderHandle: function (t) {
                if (!this._dragging && this.updateHandleTransform) {
                    var e = this._axisPointerModel,
                        n = this._api.getZr(),
                        i = this._handle,
                        r = e.getModel("handle"),
                        a = e.get("status");
                    if (!r.get("show") || !a || "hide" === a) return i && n.remove(i), void(this._handle = null);
                    var o;
                    this._handle || (o = !0, i = this._handle = h.createIcon(r.get("icon"), {
                        cursor: "move",
                        draggable: !0,
                        onmousemove: function (t) {
                            f.stop(t.event)
                        },
                        onmousedown: _(this._onHandleDragMove, this, 0, 0),
                        drift: _(this._onHandleDragMove, this),
                        ondragend: _(this._onHandleDragEnd, this)
                    }), n.add(i)), l(i, e, !1);
                    var s = ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
                    i.setStyle(r.getItemStyle(null, s));
                    var c = r.get("size");
                    u.isArray(c) || (c = [c, c]), i.attr("scale", [c[0] / 2, c[1] / 2]), p.createOrUpdate(this, "_doDispatchAxisPointer", r.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, o)
                }
            },
            _moveHandleToValue: function (t, e) {
                r(this._axisPointerModel, !e && this._moveAnimation, this._handle, s(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)))
            },
            _onHandleDragMove: function (t, e) {
                var n = this._handle;
                if (n) {
                    this._dragging = !0;
                    var i = this.updateHandleTransform(s(n), [t, e], this._axisModel, this._axisPointerModel);
                    this._payloadInfo = i, n.stopAnimation(), n.attr(s(i)), m(n).lastProp = null, this._doDispatchAxisPointer()
                }
            },
            _doDispatchAxisPointer: function () {
                if (this._handle) {
                    var t = this._payloadInfo,
                        e = this._axisModel;
                    this._api.dispatchAction({
                        type: "updateAxisPointer",
                        x: t.cursorPoint[0],
                        y: t.cursorPoint[1],
                        tooltipOption: t.tooltipOption,
                        axesInfo: [{
                            axisDim: e.axis.dim,
                            axisIndex: e.componentIndex
                        }]
                    })
                }
            },
            _onHandleDragEnd: function (t) {
                if (this._dragging = !1, this._handle) {
                    var e = this._axisPointerModel.get("value");
                    this._moveHandleToValue(e), this._api.dispatchAction({
                        type: "hideTip"
                    })
                }
            },
            getHandleTransform: null,
            updateHandleTransform: null,
            clear: function (t) {
                this._lastValue = null, this._lastStatus = null;
                var e = t.getZr(),
                    n = this._group,
                    i = this._handle;
                e && n && (this._lastGraphicKey = null, n && e.remove(n), i && e.remove(i), this._group = null, this._handle = null, this._payloadInfo = null)
            },
            doClear: function () {},
            buildLabel: function (t, e, n) {
                return n = n || 0, {
                    x: t[n],
                    y: t[1 - n],
                    width: e[n],
                    height: e[1 - n]
                }
            }
        }, i.prototype.constructor = i, c.enableClassExtend(i);
        var x = i;
        t.exports = x
    }, function (t, e, n) {
        var i = n(3),
            r = i.extendComponentModel({
                type: "tooltip",
                dependencies: ["axisPointer"],
                defaultOption: {
                    zlevel: 0,
                    z: 60,
                    show: !0,
                    showContent: !0,
                    trigger: "item",
                    triggerOn: "mousemove|click",
                    alwaysShowContent: !1,
                    displayMode: "single",
                    renderMode: "auto",
                    confine: !1,
                    showDelay: 0,
                    hideDelay: 100,
                    transitionDuration: .4,
                    enterable: !1,
                    backgroundColor: "rgba(50,50,50,0.7)",
                    borderColor: "#333",
                    borderRadius: 4,
                    borderWidth: 0,
                    padding: 5,
                    extraCssText: "",
                    axisPointer: {
                        type: "line",
                        axis: "auto",
                        animation: "auto",
                        animationDurationUpdate: 200,
                        animationEasingUpdate: "exponentialOut",
                        crossStyle: {
                            color: "#999",
                            width: 1,
                            type: "dashed",
                            textStyle: {}
                        }
                    },
                    textStyle: {
                        color: "#fff",
                        fontSize: 14
                    }
                }
            });
        t.exports = r
    }, function (t, e, n) {
        function i(t) {
            for (var e = t.pop(); t.length;) {
                var n = t.pop();
                n && (_.isInstance(n) && (n = n.get("tooltip", !0)), "string" == typeof n && (n = {
                    formatter: n
                }), e = new _(n, e, e.ecModel))
            }
            return e
        }

        function r(t, e) {
            return t.dispatchAction || c.bind(e.dispatchAction, e)
        }

        function a(t, e, n, i, r, a, o) {
            var s = n.getOuterSize(),
                l = s.width,
                u = s.height;
            return null != a && (t + l + a > i ? t -= l + a : t += a), null != o && (e + u + o > r ? e -= u + o : e += o), [t, e]
        }

        function o(t, e, n, i, r) {
            var a = n.getOuterSize(),
                o = a.width,
                s = a.height;
            return t = Math.min(t + o, i) - o, e = Math.min(e + s, r) - s, t = Math.max(t, 0), e = Math.max(e, 0), [t, e]
        }

        function s(t, e, n) {
            var i = n[0],
                r = n[1],
                a = 0,
                o = 0,
                s = e.width,
                l = e.height;
            switch (t) {
                case "inside":
                    a = e.x + s / 2 - i / 2, o = e.y + l / 2 - r / 2;
                    break;
                case "top":
                    a = e.x + s / 2 - i / 2, o = e.y - r - 5;
                    break;
                case "bottom":
                    a = e.x + s / 2 - i / 2, o = e.y + l + 5;
                    break;
                case "left":
                    a = e.x - i - 5, o = e.y + l / 2 - r / 2;
                    break;
                case "right":
                    a = e.x + s + 5, o = e.y + l / 2 - r / 2
            }
            return [a, o]
        }

        function l(t) {
            return "center" === t || "middle" === t
        }
        var u = n(3),
            c = n(0),
            h = n(8),
            d = n(312),
            f = n(313),
            p = n(10),
            g = n(5),
            v = n(2),
            m = n(152),
            y = n(14),
            _ = n(12),
            x = n(153),
            b = n(29),
            w = n(154),
            S = n(1),
            M = S.getTooltipRenderMode,
            T = c.bind,
            A = c.each,
            C = g.parsePercent,
            I = new v.Rect({
                shape: {
                    x: -1,
                    y: -1,
                    width: 2,
                    height: 2
                }
            }),
            D = u.extendComponentView({
                type: "tooltip",
                init: function (t, e) {
                    if (!h.node) {
                        var n = t.getComponent("tooltip"),
                            i = n.get("renderMode");
                        this._renderMode = M(i);
                        var r;
                        "html" === this._renderMode ? (r = new d(e.getDom(), e), this._newLine = "<br/>") : (r = new f(e), this._newLine = "\n"), this._tooltipContent = r
                    }
                },
                render: function (t, e, n) {
                    if (!h.node) {
                        this.group.removeAll(), this._tooltipModel = t, this._ecModel = e, this._api = n, this._lastDataByCoordSys = null, this._alwaysShowContent = t.get("alwaysShowContent");
                        var i = this._tooltipContent;
                        i.update(), i.setEnterable(t.get("enterable")), this._initGlobalListener(), this._keepShow()
                    }
                },
                _initGlobalListener: function () {
                    var t = this._tooltipModel,
                        e = t.get("triggerOn");
                    x.register("itemTooltip", this._api, T(function (t, n, i) {
                        "none" !== e && (e.indexOf(t) >= 0 ? this._tryShow(n, i) : "leave" === t && this._hide(i))
                    }, this))
                },
                _keepShow: function () {
                    var t = this._tooltipModel,
                        e = this._ecModel,
                        n = this._api;
                    if (null != this._lastX && null != this._lastY && "none" !== t.get("triggerOn")) {
                        var i = this;
                        clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function () {
                            !n.isDisposed() && i.manuallyShowTip(t, e, n, {
                                x: i._lastX,
                                y: i._lastY
                            })
                        })
                    }
                },
                manuallyShowTip: function (t, e, n, i) {
                    if (i.from !== this.uid && !h.node) {
                        var a = r(i, n);
                        this._ticket = "";
                        var o = i.dataByCoordSys;
                        if (i.tooltip && null != i.x && null != i.y) {
                            var s = I;
                            s.position = [i.x, i.y], s.update(), s.tooltip = i.tooltip, this._tryShow({
                                offsetX: i.x,
                                offsetY: i.y,
                                target: s
                            }, a)
                        } else if (o) this._tryShow({
                            offsetX: i.x,
                            offsetY: i.y,
                            position: i.position,
                            event: {},
                            dataByCoordSys: i.dataByCoordSys,
                            tooltipOption: i.tooltipOption
                        }, a);
                        else if (null != i.seriesIndex) {
                            if (this._manuallyAxisShowTip(t, e, n, i)) return;
                            var l = m(i, e),
                                u = l.point[0],
                                c = l.point[1];
                            null != u && null != c && this._tryShow({
                                offsetX: u,
                                offsetY: c,
                                position: i.position,
                                target: l.el,
                                event: {}
                            }, a)
                        } else null != i.x && null != i.y && (n.dispatchAction({
                            type: "updateAxisPointer",
                            x: i.x,
                            y: i.y
                        }), this._tryShow({
                            offsetX: i.x,
                            offsetY: i.y,
                            position: i.position,
                            target: n.getZr().findHover(i.x, i.y).target,
                            event: {}
                        }, a))
                    }
                },
                manuallyHideTip: function (t, e, n, i) {
                    var a = this._tooltipContent;
                    !this._alwaysShowContent && this._tooltipModel && a.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = null, i.from !== this.uid && this._hide(r(i, n))
                },
                _manuallyAxisShowTip: function (t, e, n, r) {
                    var a = r.seriesIndex,
                        o = r.dataIndex,
                        s = e.getComponent("axisPointer").coordSysAxesInfo;
                    if (null != a && null != o && null != s) {
                        var l = e.getSeriesByIndex(a);
                        if (l) {
                            var u = l.getData(),
                                t = i([u.getItemModel(o), l, (l.coordinateSystem || {}).model, t]);
                            if ("axis" === t.get("trigger")) return n.dispatchAction({
                                type: "updateAxisPointer",
                                seriesIndex: a,
                                dataIndex: o,
                                position: r.position
                            }), !0
                        }
                    }
                },
                _tryShow: function (t, e) {
                    var n = t.target;
                    if (this._tooltipModel) {
                        this._lastX = t.offsetX, this._lastY = t.offsetY;
                        var i = t.dataByCoordSys;
                        i && i.length ? this._showAxisTooltip(i, t) : n && null != n.dataIndex ? (this._lastDataByCoordSys = null, this._showSeriesItemTooltip(t, n, e)) : n && n.tooltip ? (this._lastDataByCoordSys = null, this._showComponentItemTooltip(t, n, e)) : (this._lastDataByCoordSys = null, this._hide(e))
                    }
                },
                _showOrMove: function (t, e) {
                    var n = t.get("showDelay");
                    e = c.bind(e, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(e, n) : e()
                },
                _showAxisTooltip: function (t, e) {
                    var n = this._ecModel,
                        r = this._tooltipModel,
                        a = [e.offsetX, e.offsetY],
                        o = [],
                        s = [],
                        l = i([e.tooltipOption, r]),
                        u = this._renderMode,
                        h = this._newLine,
                        d = {};
                    A(t, function (t) {
                        A(t.dataByAxis, function (t) {
                            var e = n.getComponent(t.axisDim + "Axis", t.axisIndex),
                                i = t.value,
                                r = [];
                            if (e && null != i) {
                                var a = w.getValueLabel(i, e.axis, n, t.seriesDataIndices, t.valueLabelOpt);
                                c.each(t.seriesDataIndices, function (o) {
                                    var l = n.getSeriesByIndex(o.seriesIndex),
                                        h = o.dataIndexInside,
                                        f = l && l.getDataParams(h);
                                    if (f.axisDim = t.axisDim, f.axisIndex = t.axisIndex, f.axisType = t.axisType, f.axisId = t.axisId, f.axisValue = b.getAxisRawValue(e.axis, i), f.axisValueLabel = a, f) {
                                        s.push(f);
                                        var p, g = l.formatTooltip(h, !0, null, u);
                                        if (c.isObject(g)) {
                                            p = g.html;
                                            var v = g.markers;
                                            c.merge(d, v)
                                        } else p = g;
                                        r.push(p)
                                    }
                                });
                                var l = a;
                                "html" !== u ? o.push(r.join(h)) : o.push((l ? p.encodeHTML(l) + h : "") + r.join(h))
                            }
                        })
                    }, this), o.reverse(), o = o.join(this._newLine + this._newLine);
                    var f = e.position;
                    this._showOrMove(l, function () {
                        this._updateContentNotChangedOnAxis(t) ? this._updatePosition(l, f, a[0], a[1], this._tooltipContent, s) : this._showTooltipContent(l, o, s, Math.random(), a[0], a[1], f, void 0, d)
                    })
                },
                _showSeriesItemTooltip: function (t, e, n) {
                    var r = this._ecModel,
                        a = e.seriesIndex,
                        o = r.getSeriesByIndex(a),
                        s = e.dataModel || o,
                        l = e.dataIndex,
                        u = e.dataType,
                        h = s.getData(),
                        d = i([h.getItemModel(l), s, o && (o.coordinateSystem || {}).model, this._tooltipModel]),
                        f = d.get("trigger");
                    if (null == f || "item" === f) {
                        var p, g, v = s.getDataParams(l, u),
                            m = s.formatTooltip(l, !1, u, this._renderMode);
                        c.isObject(m) ? (p = m.html, g = m.markers) : (p = m, g = null);
                        var y = "item_" + s.name + "_" + l;
                        this._showOrMove(d, function () {
                            this._showTooltipContent(d, p, v, y, t.offsetX, t.offsetY, t.position, t.target, g)
                        }), n({
                            type: "showTip",
                            dataIndexInside: l,
                            dataIndex: h.getRawIndex(l),
                            seriesIndex: a,
                            from: this.uid
                        })
                    }
                },
                _showComponentItemTooltip: function (t, e, n) {
                    var i = e.tooltip;
                    if ("string" == typeof i) {
                        var r = i;
                        i = {
                            content: r,
                            formatter: r
                        }
                    }
                    var a = new _(i, this._tooltipModel, this._ecModel),
                        o = a.get("content"),
                        s = Math.random();
                    this._showOrMove(a, function () {
                        this._showTooltipContent(a, o, a.get("formatterParams") || {}, s, t.offsetX, t.offsetY, t.position, e)
                    }), n({
                        type: "showTip",
                        from: this.uid
                    })
                },
                _showTooltipContent: function (t, e, n, i, r, a, o, s, l) {
                    if (this._ticket = "", t.get("showContent") && t.get("show")) {
                        var u = this._tooltipContent,
                            c = t.get("formatter");
                        o = o || t.get("position");
                        var h = e;
                        if (c && "string" == typeof c) h = p.formatTpl(c, n, !0);
                        else if ("function" == typeof c) {
                            var d = T(function (e, i) {
                                e === this._ticket && (u.setContent(i, l, t), this._updatePosition(t, o, r, a, u, n, s))
                            }, this);
                            this._ticket = i, h = c(n, i, d)
                        }
                        u.setContent(h, l, t), u.show(t), this._updatePosition(t, o, r, a, u, n, s)
                    }
                },
                _updatePosition: function (t, e, n, i, r, u, h) {
                    var d = this._api.getWidth(),
                        f = this._api.getHeight();
                    e = e || t.get("position");
                    var p = r.getSize(),
                        g = t.get("align"),
                        v = t.get("verticalAlign"),
                        m = h && h.getBoundingRect().clone();
                    if (h && m.applyTransform(h.transform), "function" == typeof e && (e = e([n, i], u, r.el, m, {
                            viewSize: [d, f],
                            contentSize: p.slice()
                        })), c.isArray(e)) n = C(e[0], d), i = C(e[1], f);
                    else if (c.isObject(e)) {
                        e.width = p[0], e.height = p[1];
                        var _ = y.getLayoutRect(e, {
                            width: d,
                            height: f
                        });
                        n = _.x, i = _.y, g = null, v = null
                    } else if ("string" == typeof e && h) {
                        var x = s(e, m, p);
                        n = x[0], i = x[1]
                    } else {
                        var x = a(n, i, r, d, f, g ? null : 20, v ? null : 20);
                        n = x[0], i = x[1]
                    }
                    if (g && (n -= l(g) ? p[0] / 2 : "right" === g ? p[0] : 0), v && (i -= l(v) ? p[1] / 2 : "bottom" === v ? p[1] : 0), t.get("confine")) {
                        var x = o(n, i, r, d, f);
                        n = x[0], i = x[1]
                    }
                    r.moveTo(n, i)
                },
                _updateContentNotChangedOnAxis: function (t) {
                    var e = this._lastDataByCoordSys,
                        n = !!e && e.length === t.length;
                    return n && A(e, function (e, i) {
                        var r = e.dataByAxis || {},
                            a = t[i] || {},
                            o = a.dataByAxis || [];
                        (n &= r.length === o.length) && A(r, function (t, e) {
                            var i = o[e] || {},
                                r = t.seriesDataIndices || [],
                                a = i.seriesDataIndices || [];
                            (n &= t.value === i.value && t.axisType === i.axisType && t.axisId === i.axisId && r.length === a.length) && A(r, function (t, e) {
                                var i = a[e];
                                n &= t.seriesIndex === i.seriesIndex && t.dataIndex === i.dataIndex
                            })
                        })
                    }), this._lastDataByCoordSys = t, !!n
                },
                _hide: function (t) {
                    this._lastDataByCoordSys = null, t({
                        type: "hideTip",
                        from: this.uid
                    })
                },
                dispose: function (t, e) {
                    h.node || (this._tooltipContent.hide(), x.unregister("itemTooltip", e))
                }
            });
        t.exports = D
    }, function (t, e, n) {
        function i(t) {
            var e = "left " + t + "s cubic-bezier(0.23, 1, 0.32, 1),top " + t + "s cubic-bezier(0.23, 1, 0.32, 1)";
            return s.map(p, function (t) {
                return t + "transition:" + e
            }).join(";")
        }

        function r(t) {
            var e = [],
                n = t.get("fontSize"),
                i = t.getTextColor();
            return i && e.push("color:" + i), e.push("font:" + t.getFont()), n && e.push("line-height:" + Math.round(3 * n / 2) + "px"), d(["decoration", "align"], function (n) {
                var i = t.get(n);
                i && e.push("text-" + n + ":" + i)
            }), e.join(";")
        }

        function a(t) {
            var e = [],
                n = t.get("transitionDuration"),
                a = t.get("backgroundColor"),
                o = t.getModel("textStyle"),
                s = t.get("padding");
            return n && e.push(i(n)), a && (c.canvasSupported ? e.push("background-Color:" + a) : (e.push("background-Color:#" + l.toHex(a)), e.push("filter:alpha(opacity=70)"))), d(["width", "color", "radius"], function (n) {
                var i = "border-" + n,
                    r = f(i),
                    a = t.get(r);
                null != a && e.push(i + ":" + a + ("color" === n ? "" : "px"))
            }), e.push(r(o)), null != s && e.push("padding:" + h.normalizeCssArray(s).join("px ") + "px"), e.join(";") + ";"
        }

        function o(t, e) {
            if (c.wxa) return null;
            var n = document.createElement("div"),
                i = this._zr = e.getZr();
            this.el = n, this._x = e.getWidth() / 2, this._y = e.getHeight() / 2, t.appendChild(n), this._container = t, this._show = !1, this._hideTimeout;
            var r = this;
            n.onmouseenter = function () {
                r._enterable && (clearTimeout(r._hideTimeout), r._show = !0), r._inContent = !0
            }, n.onmousemove = function (e) {
                if (e = e || window.event, !r._enterable) {
                    var n = i.handler;
                    u.normalizeEvent(t, e, !0), n.dispatch("mousemove", e)
                }
            }, n.onmouseleave = function () {
                r._enterable && r._show && r.hideLater(r._hideDelay), r._inContent = !1
            }
        }
        var s = n(0),
            l = n(36),
            u = n(25),
            c = n(8),
            h = n(10),
            d = s.each,
            f = h.toCamelCase,
            p = ["", "-webkit-", "-moz-", "-o-"];
        o.prototype = {
            constructor: o,
            _enterable: !0,
            update: function () {
                var t = this._container,
                    e = t.currentStyle || document.defaultView.getComputedStyle(t),
                    n = t.style;
                "absolute" !== n.position && "absolute" !== e.position && (n.position = "relative")
            },
            show: function (t) {
                clearTimeout(this._hideTimeout);
                var e = this.el;
                e.style.cssText = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + a(t) + ";left:" + this._x + "px;top:" + this._y + "px;" + (t.get("extraCssText") || ""), e.style.display = e.innerHTML ? "block" : "none", e.style.pointerEvents = this._enterable ? "auto" : "none", this._show = !0
            },
            setContent: function (t) {
                this.el.innerHTML = null == t ? "" : t
            },
            setEnterable: function (t) {
                this._enterable = t
            },
            getSize: function () {
                var t = this.el;
                return [t.clientWidth, t.clientHeight]
            },
            moveTo: function (t, e) {
                var n, i = this._zr;
                i && i.painter && (n = i.painter.getViewportRootOffset()) && (t += n.offsetLeft, e += n.offsetTop);
                var r = this.el.style;
                r.left = t + "px", r.top = e + "px", this._x = t, this._y = e
            },
            hide: function () {
                this.el.style.display = "none", this._show = !1
            },
            hideLater: function (t) {
                !this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(s.bind(this.hide, this), t)) : this.hide())
            },
            isShow: function () {
                return this._show
            },
            getOuterSize: function () {
                var t = this.el.clientWidth,
                    e = this.el.clientHeight;
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    var n = document.defaultView.getComputedStyle(this.el);
                    n && (t += parseInt(n.borderLeftWidth, 10) + parseInt(n.borderRightWidth, 10), e += parseInt(n.borderTopWidth, 10) + parseInt(n.borderBottomWidth, 10))
                }
                return {
                    width: t,
                    height: e
                }
            }
        };
        var g = o;
        t.exports = g
    }, function (t, e, n) {
        function i(t) {
            this._zr = t.getZr(), this._show = !1, this._hideTimeout
        }
        var r = n(0),
            a = n(72);
        i.prototype = {
            constructor: i,
            _enterable: !0,
            update: function () {},
            show: function (t) {
                this._hideTimeout && clearTimeout(this._hideTimeout), this.el.attr("show", !0), this._show = !0
            },
            setContent: function (t, e, n) {
                this.el && this._zr.remove(this.el);
                for (var i = {}, r = t, o = r.indexOf("{marker"); o >= 0;) {
                    var s = r.indexOf("|}"),
                        l = r.substr(o + "{marker".length, s - o - "{marker".length);
                    l.indexOf("sub") > -1 ? i["marker" + l] = {
                        textWidth: 4,
                        textHeight: 4,
                        textBorderRadius: 2,
                        textBackgroundColor: e[l],
                        textOffset: [3, 0]
                    } : i["marker" + l] = {
                        textWidth: 10,
                        textHeight: 10,
                        textBorderRadius: 5,
                        textBackgroundColor: e[l]
                    }, r = r.substr(s + 1), o = r.indexOf("{marker")
                }
                this.el = new a({
                    style: {
                        rich: i,
                        text: t,
                        textLineHeight: 20,
                        textBackgroundColor: n.get("backgroundColor"),
                        textBorderRadius: n.get("borderRadius"),
                        textFill: n.get("textStyle.color"),
                        textPadding: n.get("padding")
                    },
                    z: n.get("z")
                }), this._zr.add(this.el);
                var u = this;
                this.el.on("mouseover", function () {
                    u._enterable && (clearTimeout(u._hideTimeout), u._show = !0), u._inContent = !0
                }), this.el.on("mouseout", function () {
                    u._enterable && u._show && u.hideLater(u._hideDelay), u._inContent = !1
                })
            },
            setEnterable: function (t) {
                this._enterable = t
            },
            getSize: function () {
                var t = this.el.getBoundingRect();
                return [t.width, t.height]
            },
            moveTo: function (t, e) {
                this.el && this.el.attr("position", [t, e])
            },
            hide: function () {
                this.el && this.el.hide(), this._show = !1
            },
            hideLater: function (t) {
                !this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(r.bind(this.hide, this), t)) : this.hide())
            },
            isShow: function () {
                return this._show
            },
            getOuterSize: function () {
                var t = this.getSize();
                return {
                    width: t[0],
                    height: t[1]
                }
            }
        };
        var o = i;
        t.exports = o
    }, function (t, e, n) {
        var i = n(3);
        n(315), n(316), n(317);
        var r = n(319),
            a = n(13);
        i.registerProcessor(i.PRIORITY.PROCESSOR.SERIES_FILTER, r), a.registerSubTypeDefaulter("legend", function () {
            return "plain"
        })
    }, function (t, e, n) {
        var i = n(3),
            r = n(0),
            a = n(12),
            o = n(1),
            s = o.isNameSpecified,
            l = n(130),
            u = l.legend.selector,
            c = {
                all: {
                    type: "all",
                    title: r.clone(u.all)
                },
                inverse: {
                    type: "inverse",
                    title: r.clone(u.inverse)
                }
            },
            h = i.extendComponentModel({
                type: "legend.plain",
                dependencies: ["series"],
                layoutMode: {
                    type: "box",
                    ignoreSize: !0
                },
                init: function (t, e, n) {
                    this.mergeDefaultAndTheme(t, n), t.selected = t.selected || {}, this._updateSelector(t)
                },
                mergeOption: function (t) {
                    h.superCall(this, "mergeOption", t), this._updateSelector(t)
                },
                _updateSelector: function (t) {
                    var e = t.selector;
                    !0 === e && (e = t.selector = ["all", "inverse"]), r.isArray(e) && r.each(e, function (t, n) {
                        r.isString(t) && (t = {
                            type: t
                        }), e[n] = r.merge(t, c[t.type])
                    })
                },
                optionUpdated: function () {
                    this._updateData(this.ecModel);
                    var t = this._data;
                    if (t[0] && "single" === this.get("selectedMode")) {
                        for (var e = !1, n = 0; n < t.length; n++) {
                            var i = t[n].get("name");
                            if (this.isSelected(i)) {
                                this.select(i), e = !0;
                                break
                            }
                        }!e && this.select(t[0].get("name"))
                    }
                },
                _updateData: function (t) {
                    var e = [],
                        n = [];
                    t.eachRawSeries(function (i) {
                        var r = i.name;
                        n.push(r);
                        var a;
                        if (i.legendDataProvider) {
                            var o = i.legendDataProvider(),
                                l = o.mapArray(o.getName);
                            t.isSeriesFiltered(i) || (n = n.concat(l)), l.length ? e = e.concat(l) : a = !0
                        } else a = !0;
                        a && s(i) && e.push(i.name)
                    }), this._availableNames = n;
                    var i = this.get("data") || e,
                        o = r.map(i, function (t) {
                            return "string" != typeof t && "number" != typeof t || (t = {
                                name: t
                            }), new a(t, this, this.ecModel)
                        }, this);
                    this._data = o
                },
                getData: function () {
                    return this._data
                },
                select: function (t) {
                    var e = this.option.selected;
                    if ("single" === this.get("selectedMode")) {
                        var n = this._data;
                        r.each(n, function (t) {
                            e[t.get("name")] = !1
                        })
                    }
                    e[t] = !0
                },
                unSelect: function (t) {
                    "single" !== this.get("selectedMode") && (this.option.selected[t] = !1)
                },
                toggleSelected: function (t) {
                    var e = this.option.selected;
                    e.hasOwnProperty(t) || (e[t] = !0), this[e[t] ? "unSelect" : "select"](t)
                },
                allSelect: function () {
                    var t = this._data,
                        e = this.option.selected;
                    r.each(t, function (t) {
                        e[t.get("name", !0)] = !0
                    })
                },
                inverseSelect: function () {
                    var t = this._data,
                        e = this.option.selected;
                    r.each(t, function (t) {
                        var n = t.get("name", !0);
                        e.hasOwnProperty(n) || (e[n] = !0), e[n] = !e[n]
                    })
                },
                isSelected: function (t) {
                    var e = this.option.selected;
                    return !(e.hasOwnProperty(t) && !e[t]) && r.indexOf(this._availableNames, t) >= 0
                },
                getOrient: function () {
                    return "vertical" === this.get("orient") ? {
                        index: 1,
                        name: "vertical"
                    } : {
                        index: 0,
                        name: "horizontal"
                    }
                },
                defaultOption: {
                    zlevel: 0,
                    z: 4,
                    show: !0,
                    orient: "horizontal",
                    left: "center",
                    top: 0,
                    align: "auto",
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: "#ccc",
                    borderRadius: 0,
                    borderWidth: 0,
                    padding: 5,
                    itemGap: 10,
                    itemWidth: 25,
                    itemHeight: 14,
                    inactiveColor: "#ccc",
                    inactiveBorderColor: "#ccc",
                    itemStyle: {
                        borderWidth: 0
                    },
                    textStyle: {
                        color: "#333"
                    },
                    selectedMode: !0,
                    selector: !1,
                    selectorLabel: {
                        show: !0,
                        borderRadius: 10,
                        padding: [3, 5, 3, 5],
                        fontSize: 12,
                        fontFamily: " sans-serif",
                        color: "#666",
                        borderWidth: 1,
                        borderColor: "#666"
                    },
                    emphasis: {
                        selectorLabel: {
                            show: !0,
                            color: "#eee",
                            backgroundColor: "#666"
                        }
                    },
                    selectorPosition: "auto",
                    selectorItemGap: 7,
                    selectorButtonGap: 10,
                    tooltip: {
                        show: !1
                    }
                }
            }),
            d = h;
        t.exports = d
    }, function (t, e, n) {
        function i(t, e, n) {
            var i, r = {},
                o = "toggleSelected" === t;
            return n.eachComponent("legend", function (n) {
                o && null != i ? n[i ? "select" : "unSelect"](e.name) : "allSelect" === t || "inverseSelect" === t ? n[t]() : (n[t](e.name), i = n.isSelected(e.name));
                var s = n.getData();
                a.each(s, function (t) {
                    var e = t.get("name");
                    if ("\n" !== e && "" !== e) {
                        var i = n.isSelected(e);
                        r.hasOwnProperty(e) ? r[e] = r[e] && i : r[e] = i
                    }
                })
            }), "allSelect" === t || "inverseSelect" === t ? {
                selected: r
            } : {
                name: e.name,
                selected: r
            }
        }
        var r = n(3),
            a = n(0);
        r.registerAction("legendToggleSelect", "legendselectchanged", a.curry(i, "toggleSelected")), r.registerAction("legendAllSelect", "legendselectall", a.curry(i, "allSelect")), r.registerAction("legendInverseSelect", "legendinverseselect", a.curry(i, "inverseSelect")), r.registerAction("legendSelect", "legendselected", a.curry(i, "select")), r.registerAction("legendUnSelect", "legendunselected", a.curry(i, "unSelect"))
    }, function (t, e, n) {
        function i(t, e, n, i, r, a) {
            var o;
            return "line" !== e && e.indexOf("empty") < 0 ? (o = n.getItemStyle(), t.style.stroke = i, a || (o.stroke = r)) : o = n.getItemStyle(["borderWidth", "borderColor"]), t.setStyle(o)
        }

        function r(t, e) {
            e.dispatchAction({
                type: "legendToggleSelect",
                name: t
            })
        }

        function a(t, e, n, i) {
            var r = n.getZr().storage.getDisplayList()[0];
            r && r.useHoverLayer || n.dispatchAction({
                type: "highlight",
                seriesName: t,
                name: e,
                excludeSeriesId: i
            })
        }

        function o(t, e, n, i) {
            var r = n.getZr().storage.getDisplayList()[0];
            r && r.useHoverLayer || n.dispatchAction({
                type: "downplay",
                seriesName: t,
                name: e,
                excludeSeriesId: i
            })
        }
        var s = n(4),
            l = (s.__DEV__, n(3)),
            u = n(0),
            c = n(54),
            h = c.createSymbol,
            d = n(2),
            f = n(318),
            p = f.makeBackground,
            g = n(14),
            v = u.curry,
            m = u.each,
            y = d.Group,
            _ = l.extendComponentView({
                type: "legend.plain",
                newlineDisabled: !1,
                init: function () {
                    this.group.add(this._contentGroup = new y), this._backgroundEl, this.group.add(this._selectorGroup = new y), this._isFirstRender = !0
                },
                getContentGroup: function () {
                    return this._contentGroup
                },
                getSelectorGroup: function () {
                    return this._selectorGroup
                },
                render: function (t, e, n) {
                    var i = this._isFirstRender;
                    if (this._isFirstRender = !1, this.resetInner(), t.get("show", !0)) {
                        var r = t.get("align"),
                            a = t.get("orient");
                        r && "auto" !== r || (r = "right" === t.get("left") && "vertical" === a ? "right" : "left");
                        var o = t.get("selector", !0),
                            s = t.get("selectorPosition", !0);
                        !o || s && "auto" !== s || (s = "horizontal" === a ? "end" : "start"), this.renderInner(r, t, e, n, o, a, s);
                        var l = t.getBoxLayoutParams(),
                            c = {
                                width: n.getWidth(),
                                height: n.getHeight()
                            },
                            h = t.get("padding"),
                            d = g.getLayoutRect(l, c, h),
                            f = this.layoutInner(t, r, d, i, o, s),
                            v = g.getLayoutRect(u.defaults({
                                width: f.width,
                                height: f.height
                            }, l), c, h);
                        this.group.attr("position", [v.x - f.x, v.y - f.y]), this.group.add(this._backgroundEl = p(f, t))
                    }
                },
                resetInner: function () {
                    this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), this.getSelectorGroup().removeAll()
                },
                renderInner: function (t, e, n, i, s, l, c) {
                    var h = this.getContentGroup(),
                        d = u.createHashMap(),
                        f = e.get("selectedMode"),
                        p = [];
                    n.eachRawSeries(function (t) {
                        !t.get("legendHoverLink") && p.push(t.id)
                    }), m(e.getData(), function (s, l) {
                        var u = s.get("name");
                        if (!this.newlineDisabled && ("" === u || "\n" === u)) return void h.add(new y({
                            newline: !0
                        }));
                        var c = n.getSeriesByName(u)[0];
                        if (!d.get(u))
                            if (c) {
                                var g = c.getData(),
                                    m = g.getVisual("color"),
                                    _ = g.getVisual("borderColor");
                                "function" == typeof m && (m = m(c.getDataParams(0))), "function" == typeof _ && (_ = _(c.getDataParams(0)));
                                var x = g.getVisual("legendSymbol") || "roundRect",
                                    b = g.getVisual("symbol"),
                                    w = this._createItem(u, l, s, e, x, b, t, m, _, f);
                                w.on("click", v(r, u, i)).on("mouseover", v(a, c.name, null, i, p)).on("mouseout", v(o, c.name, null, i, p)), d.set(u, !0)
                            } else n.eachRawSeries(function (n) {
                                if (!d.get(u) && n.legendDataProvider) {
                                    var c = n.legendDataProvider(),
                                        h = c.indexOfName(u);
                                    if (h < 0) return;
                                    var g = c.getItemVisual(h, "color"),
                                        m = c.getItemVisual(h, "borderColor");
                                    this._createItem(u, l, s, e, "roundRect", null, t, g, m, f).on("click", v(r, u, i)).on("mouseover", v(a, null, u, i, p)).on("mouseout", v(o, null, u, i, p)), d.set(u, !0)
                                }
                            }, this)
                    }, this), s && this._createSelector(s, e, i, l, c)
                },
                _createSelector: function (t, e, n, i, r) {
                    function a(t) {
                        var i = t.type,
                            r = new d.Text({
                                style: {
                                    x: 0,
                                    y: 0,
                                    align: "center",
                                    verticalAlign: "middle"
                                },
                                onclick: function () {
                                    n.dispatchAction({
                                        type: "all" === i ? "legendAllSelect" : "legendInverseSelect"
                                    })
                                }
                            });
                        o.add(r);
                        var a = e.getModel("selectorLabel"),
                            s = e.getModel("emphasis.selectorLabel");
                        d.setLabelStyle(r.style, r.hoverStyle = {}, a, s, {
                            defaultText: t.title,
                            isRectText: !1
                        }), d.setHoverStyle(r)
                    }
                    var o = this.getSelectorGroup();
                    m(t, function (t) {
                        a(t)
                    })
                },
                _createItem: function (t, e, n, r, a, o, s, l, c, f) {
                    var p = r.get("itemWidth"),
                        g = r.get("itemHeight"),
                        v = r.get("inactiveColor"),
                        m = r.get("inactiveBorderColor"),
                        _ = r.get("symbolKeepAspect"),
                        x = r.getModel("itemStyle"),
                        b = r.isSelected(t),
                        w = new y,
                        S = n.getModel("textStyle"),
                        M = n.get("icon"),
                        T = n.getModel("tooltip"),
                        A = T.parentModel;
                    a = M || a;
                    var C = h(a, 0, 0, p, g, b ? l : v, null == _ || _);
                    if (w.add(i(C, a, x, c, m, b)), !M && o && (o !== a || "none" === o)) {
                        var I = .8 * g;
                        "none" === o && (o = "circle");
                        var D = h(o, (p - I) / 2, (g - I) / 2, I, I, b ? l : v, null == _ || _);
                        w.add(i(D, o, x, c, m, b))
                    }
                    var k = "left" === s ? p + 5 : -5,
                        O = s,
                        P = r.get("formatter"),
                        L = t;
                    "string" == typeof P && P ? L = P.replace("{name}", null != t ? t : "") : "function" == typeof P && (L = P(t)), w.add(new d.Text({
                        style: d.setTextStyle({}, S, {
                            text: L,
                            x: k,
                            y: g / 2,
                            textFill: b ? S.getTextColor() : v,
                            textAlign: O,
                            textVerticalAlign: "middle"
                        })
                    }));
                    var E = new d.Rect({
                        shape: w.getBoundingRect(),
                        invisible: !0,
                        tooltip: T.get("show") ? u.extend({
                            content: t,
                            formatter: A.get("formatter", !0) || function () {
                                return t
                            },
                            formatterParams: {
                                componentType: "legend",
                                legendIndex: r.componentIndex,
                                name: t,
                                $vars: ["name"]
                            }
                        }, T.option) : null
                    });
                    return w.add(E), w.eachChild(function (t) {
                        t.silent = !0
                    }), E.silent = !f, this.getContentGroup().add(w), d.setHoverStyle(w), w.__legendDataIndex = e, w
                },
                layoutInner: function (t, e, n, i, r, a) {
                    var o = this.getContentGroup(),
                        s = this.getSelectorGroup();
                    g.box(t.get("orient"), o, t.get("itemGap"), n.width, n.height);
                    var l = o.getBoundingRect(),
                        u = [-l.x, -l.y];
                    if (r) {
                        g.box("horizontal", s, t.get("selectorItemGap", !0));
                        var c = s.getBoundingRect(),
                            h = [-c.x, -c.y],
                            d = t.get("selectorButtonGap", !0),
                            f = t.getOrient().index,
                            p = 0 === f ? "width" : "height",
                            v = 0 === f ? "height" : "width",
                            m = 0 === f ? "y" : "x";
                        "end" === a ? h[f] += l[p] + d : u[f] += c[p] + d, h[1 - f] += l[v] / 2 - c[v] / 2, s.attr("position", h), o.attr("position", u);
                        var y = {
                            x: 0,
                            y: 0
                        };
                        return y[p] = l[p] + d + c[p], y[v] = Math.max(l[v], c[v]), y[m] = Math.min(0, c[m] + h[1 - f]), y
                    }
                    return o.attr("position", u), this.group.getBoundingRect()
                },
                remove: function () {
                    this.getContentGroup().removeAll(), this._isFirstRender = !0
                }
            });
        t.exports = _
    }, function (t, e, n) {
        function i(t, e, n) {
            var i = e.getBoxLayoutParams(),
                r = e.get("padding"),
                a = {
                    width: n.getWidth(),
                    height: n.getHeight()
                },
                u = o(i, a, r);
            s(e.get("orient"), t, e.get("itemGap"), u.width, u.height), l(t, i, a, r)
        }

        function r(t, e) {
            var n = u.normalizeCssArray(e.get("padding")),
                i = e.getItemStyle(["color", "opacity"]);
            i.fill = e.get("backgroundColor");
            var t = new c.Rect({
                shape: {
                    x: t.x - n[3],
                    y: t.y - n[0],
                    width: t.width + n[1] + n[3],
                    height: t.height + n[0] + n[2],
                    r: e.get("borderRadius")
                },
                style: i,
                silent: !0,
                z2: -1
            });
            return t
        }
        var a = n(14),
            o = a.getLayoutRect,
            s = a.box,
            l = a.positionElement,
            u = n(10),
            c = n(2);
        e.layout = i, e.makeBackground = r
    }, function (t, e) {
        function n(t) {
            var e = t.findComponents({
                mainType: "legend"
            });
            e && e.length && t.filterSeries(function (t) {
                for (var n = 0; n < e.length; n++)
                    if (!e[n].isSelected(t.name)) return !1;
                return !0
            })
        }
        t.exports = n
    }, function (t, e, n) {
        "use strict";
        n.d(e, "a", function () {
            return i
        }), n.d(e, "b", function () {
            return r
        });
        var i = function () {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "component truck-echarts"
                }, [n("v-chart", {
                    ref: "echart",
                    attrs: {
                        options: t.chartOption,
                        "auto-resize": !0
                    }
                })], 1)
            },
            r = []
    }])
});
