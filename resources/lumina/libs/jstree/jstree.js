(function(t) {
        "use strict";
        if (window.layui && layui.define) {
            layui.define(["jquery"], function(e) {
                e("jstree", t(layui.$))
            })
        } else if (typeof define === "function" && define.amd) {
            define(["jquery"], t)
        } else if (typeof module !== "undefined" && module.exports) {
            module.exports = t(require("jquery"))
        } else {
            t(jQuery)
        }
    }
)(function(O, S) {
    "use strict";
    layui.link(layui.cache.base + "libs/jstree/themes/style.css");
    if (O.jstree) {
        return
    }
    var s = 0
        , a = false
        , n = false
        , o = false
        , r = []
        , e = O("script:last").attr("src")
        , k = window.document;
    O.jstree = {
        version: "3.3.7",
        defaults: {
            plugins: []
        },
        plugins: {},
        path: e && e.indexOf("/") !== -1 ? e.replace(/\/[^\/]+$/, "") : "",
        idregex: /[\\:&!^|()\[\]<>@*'+~#";.,=\- \/${}%?`]/g,
        root: "#"
    };
    O.jstree.create = function(e, i) {
        var r = new O.jstree.core(++s)
            , t = i;
        i = O.extend(true, {}, O.jstree.defaults, i);
        if (t && t.plugins) {
            i.plugins = t.plugins
        }
        O.each(i.plugins, function(e, t) {
            if (e !== "core") {
                r = r.plugin(t, i[t])
            }
        });
        O(e).data("jstree", r);
        r.init(e, i);
        return r
    }
    ;
    O.jstree.destroy = function() {
        O(".jstree:jstree").jstree("destroy");
        O(k).off(".jstree")
    }
    ;
    O.jstree.core = function(e) {
        this._id = e;
        this._cnt = 0;
        this._wrk = null;
        this._data = {
            core: {
                themes: {
                    name: false,
                    dots: false,
                    icons: false,
                    ellipsis: false
                },
                selected: [],
                last_error: {},
                working: false,
                worker_queue: [],
                focused: null
            }
        }
    }
    ;
    O.jstree.reference = function(t) {
        var i = null
            , e = null;
        if (t && t.id && (!t.tagName || !t.nodeType)) {
            t = t.id
        }
        if (!e || !e.length) {
            try {
                e = O(t)
            } catch (e) {}
        }
        if (!e || !e.length) {
            try {
                e = O("#" + t.replace(O.jstree.idregex, "\\$&"))
            } catch (e) {}
        }
        if (e && e.length && (e = e.closest(".jstree")).length && (e = e.data("jstree"))) {
            i = e
        } else {
            O(".jstree").each(function() {
                var e = O(this).data("jstree");
                if (e && e._model.data[t]) {
                    i = e;
                    return false
                }
            })
        }
        return i
    }
    ;
    O.fn.jstree = function(i) {
        var r = typeof i === "string"
            , s = Array.prototype.slice.call(arguments, 1)
            , a = null;
        if (i === true && !this.length) {
            return false
        }
        this.each(function() {
            var e = O.jstree.reference(this)
                , t = r && e ? e[i] : null;
            a = r && t ? t.apply(e, s) : null;
            if (!e && !r && (i === S || O.isPlainObject(i))) {
                O.jstree.create(this, i)
            }
            if (e && !r || i === true) {
                a = e || false
            }
            if (a !== null && a !== S) {
                return false
            }
        });
        return a !== null && a !== S ? a : this
    }
    ;
    O.expr.pseudos.jstree = O.expr.createPseudo(function(e) {
        return function(e) {
            return O(e).hasClass("jstree") && O(e).data("jstree") !== S
        }
    });
    O.jstree.defaults.core = {
        data: false,
        strings: false,
        check_callback: false,
        error: O.noop,
        animation: 200,
        multiple: true,
        themes: {
            name: false,
            url: false,
            dir: false,
            dots: true,
            icons: true,
            ellipsis: false,
            stripes: false,
            variant: false,
            responsive: false
        },
        expand_selected_onload: true,
        worker: true,
        force_text: false,
        dblclick_toggle: true,
        loaded_state: false,
        restore_focus: true,
        keyboard: {
            "ctrl-space": function(e) {
                e.type = "click";
                O(e.currentTarget).trigger(e)
            },
            enter: function(e) {
                e.type = "click";
                O(e.currentTarget).trigger(e)
            },
            left: function(e) {
                e.preventDefault();
                if (this.is_open(e.currentTarget)) {
                    this.close_node(e.currentTarget)
                } else {
                    var t = this.get_parent(e.currentTarget);
                    if (t && t.id !== O.jstree.root) {
                        this.get_node(t, true).children(".jstree-anchor").focus()
                    }
                }
            },
            up: function(e) {
                e.preventDefault();
                var t = this.get_prev_dom(e.currentTarget);
                if (t && t.length) {
                    t.children(".jstree-anchor").focus()
                }
            },
            right: function(e) {
                e.preventDefault();
                if (this.is_closed(e.currentTarget)) {
                    this.open_node(e.currentTarget, function(e) {
                        this.get_node(e, true).children(".jstree-anchor").focus()
                    })
                } else if (this.is_open(e.currentTarget)) {
                    var t = this.get_node(e.currentTarget, true).children(".jstree-children")[0];
                    if (t) {
                        O(this._firstChild(t)).children(".jstree-anchor").focus()
                    }
                }
            },
            down: function(e) {
                e.preventDefault();
                var t = this.get_next_dom(e.currentTarget);
                if (t && t.length) {
                    t.children(".jstree-anchor").focus()
                }
            },
            "*": function(e) {
                this.open_all()
            },
            home: function(e) {
                e.preventDefault();
                var t = this._firstChild(this.get_container_ul()[0]);
                if (t) {
                    O(t).children(".jstree-anchor").filter(":visible").focus()
                }
            },
            end: function(e) {
                e.preventDefault();
                this.element.find(".jstree-anchor").filter(":visible").last().focus()
            },
            f2: function(e) {
                e.preventDefault();
                this.edit(e.currentTarget)
            }
        }
    };
    O.jstree.core.prototype = {
        plugin: function(e, t) {
            var i = O.jstree.plugins[e];
            if (i) {
                this._data[e] = {};
                i.prototype = this;
                return new i(t,this)
            }
            return this
        },
        init: function(e, t) {
            this._model = {
                data: {},
                changed: [],
                force_full_redraw: false,
                redraw_timeout: false,
                default_state: {
                    loaded: true,
                    opened: false,
                    selected: false,
                    disabled: false
                }
            };
            this._model.data[O.jstree.root] = {
                id: O.jstree.root,
                parent: null,
                parents: [],
                children: [],
                children_d: [],
                state: {
                    loaded: false
                }
            };
            this.element = O(e).addClass("jstree jstree-" + this._id);
            this.settings = t;
            this._data.core.ready = false;
            this._data.core.loaded = false;
            this._data.core.rtl = this.element.css("direction") === "rtl";
            this.element[this._data.core.rtl ? "addClass" : "removeClass"]("jstree-rtl");
            this.element.attr("role", "tree");
            if (this.settings.core.multiple) {
                this.element.attr("aria-multiselectable", true)
            }
            if (!this.element.attr("tabindex")) {
                this.element.attr("tabindex", "0")
            }
            this.bind();
            this.trigger("init");
            this._data.core.original_container_html = this.element.find(" > ul > li").clone(true);
            this._data.core.original_container_html.find("li").addBack().contents().filter(function() {
                return this.nodeType === 3 && (!this.nodeValue || /^\s+$/.test(this.nodeValue))
            }).remove();
            this.element.html("<" + "ul class='jstree-container-ul jstree-children' role='group'><" + "li id='j" + this._id + "_loading' class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='tree-item'><i class='jstree-icon jstree-ocl'></i><" + "a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
            this.element.attr("aria-activedescendant", "j" + this._id + "_loading");
            this._data.core.li_height = this.get_container_ul().children("li").first().outerHeight() || 24;
            this._data.core.node = this._create_prototype_node();
            this.trigger("loading");
            this.load_node(O.jstree.root)
        },
        destroy: function(e) {
            this.trigger("destroy");
            if (this._wrk) {
                try {
                    window.URL.revokeObjectURL(this._wrk);
                    this._wrk = null
                } catch (e) {}
            }
            if (!e) {
                this.element.empty()
            }
            this.teardown()
        },
        _create_prototype_node: function() {
            var e = k.createElement("LI"), t, i;
            e.setAttribute("role", "treeitem");
            t = k.createElement("I");
            t.className = "jstree-icon jstree-ocl";
            t.setAttribute("role", "presentation");
            e.appendChild(t);
            t = k.createElement("A");
            t.className = "jstree-anchor";
            t.setAttribute("href", "#");
            t.setAttribute("tabindex", "-1");
            i = k.createElement("I");
            i.className = "jstree-icon jstree-themeicon";
            i.setAttribute("role", "presentation");
            t.appendChild(i);
            e.appendChild(t);
            t = i = null;
            return e
        },
        _kbevent_to_func: function(e) {
            var t = {
                8: "Backspace",
                9: "Tab",
                13: "Return",
                19: "Pause",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "Print",
                45: "Insert",
                46: "Delete",
                96: "Numpad0",
                97: "Numpad1",
                98: "Numpad2",
                99: "Numpad3",
                100: "Numpad4",
                101: "Numpad5",
                102: "Numpad6",
                103: "Numpad7",
                104: "Numpad8",
                105: "Numpad9",
                "-13": "NumpadEnter",
                112: "F1",
                113: "F2",
                114: "F3",
                115: "F4",
                116: "F5",
                117: "F6",
                118: "F7",
                119: "F8",
                120: "F9",
                121: "F10",
                122: "F11",
                123: "F12",
                144: "Numlock",
                145: "Scrolllock",
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                61: "=",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                107: "+",
                109: "-",
                110: ".",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'",
                111: "/",
                106: "*",
                173: "-"
            };
            var i = [];
            if (e.ctrlKey) {
                i.push("ctrl")
            }
            if (e.altKey) {
                i.push("alt")
            }
            if (e.shiftKey) {
                i.push("shift")
            }
            i.push(t[e.which] || e.which);
            i = i.sort().join("-").toLowerCase();
            var r = this.settings.core.keyboard, s, a;
            for (s in r) {
                if (r.hasOwnProperty(s)) {
                    a = s;
                    if (a !== "-" && a !== "+") {
                        a = a.replace("--", "-MINUS").replace("+-", "-MINUS").replace("++", "-PLUS").replace("-+", "-PLUS");
                        a = a.split(/-|\+/).sort().join("-").replace("MINUS", "-").replace("PLUS", "+").toLowerCase()
                    }
                    if (a === i) {
                        return r[s]
                    }
                }
            }
            return null
        },
        teardown: function() {
            this.unbind();
            this.element.removeClass("jstree").removeData("jstree").find("[class^='jstree']").addBack().attr("class", function() {
                return this.className.replace(/jstree[^ ]*|$/gi, "")
            });
            this.element = null
        },
        bind: function() {
            var a = ""
                , n = null
                , t = 0;
            this.element.on("dblclick.jstree", function(e) {
                if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
                    return true
                }
                if (k.selection && k.selection.empty) {
                    k.selection.empty()
                } else {
                    if (window.getSelection) {
                        var t = window.getSelection();
                        try {
                            t.removeAllRanges();
                            t.collapse()
                        } catch (e) {}
                    }
                }
            }).on("mousedown.jstree", O.proxy(function(e) {
                if (e.target === this.element[0]) {
                    e.preventDefault();
                    t = +new Date
                }
            }, this)).on("mousedown.jstree", ".jstree-ocl", function(e) {
                e.preventDefault()
            }).on("click.jstree", ".jstree-ocl", O.proxy(function(e) {
                this.toggle_node(e.target)
            }, this)).on("dblclick.jstree", ".jstree-anchor", O.proxy(function(e) {
                if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
                    return true
                }
                if (this.settings.core.dblclick_toggle) {
                    this.toggle_node(e.target)
                }
            }, this)).on("click.jstree", ".jstree-anchor", O.proxy(function(e) {
                e.preventDefault();
                if (e.currentTarget !== k.activeElement) {
                    O(e.currentTarget).focus()
                }
                this.activate_node(e.currentTarget, e)
            }, this)).on("keydown.jstree", ".jstree-anchor", O.proxy(function(e) {
                if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
                    return true
                }
                if (this._data.core.rtl) {
                    if (e.which === 37) {
                        e.which = 39
                    } else if (e.which === 39) {
                        e.which = 37
                    }
                }
                var t = this._kbevent_to_func(e);
                if (t) {
                    var i = t.call(this, e);
                    if (i === false || i === true) {
                        return i
                    }
                }
            }, this)).on("load_node.jstree", O.proxy(function(e, t) {
                if (t.status) {
                    if (t.node.id === O.jstree.root && !this._data.core.loaded) {
                        this._data.core.loaded = true;
                        if (this._firstChild(this.get_container_ul()[0])) {
                            this.element.attr("aria-activedescendant", this._firstChild(this.get_container_ul()[0]).id)
                        }
                        this.trigger("loaded")
                    }
                    if (!this._data.core.ready) {
                        setTimeout(O.proxy(function() {
                            if (this.element && !this.get_container_ul().find(".jstree-loading").length) {
                                this._data.core.ready = true;
                                if (this._data.core.selected.length) {
                                    if (this.settings.core.expand_selected_onload) {
                                        var e = [], t, i;
                                        for (t = 0,
                                                 i = this._data.core.selected.length; t < i; t++) {
                                            e = e.concat(this._model.data[this._data.core.selected[t]].parents)
                                        }
                                        e = O.vakata.array_unique(e);
                                        for (t = 0,
                                                 i = e.length; t < i; t++) {
                                            this.open_node(e[t], false, 0)
                                        }
                                    }
                                    this.trigger("changed", {
                                        action: "ready",
                                        selected: this._data.core.selected
                                    })
                                }
                                this.trigger("ready")
                            }
                        }, this), 0)
                    }
                }
            }, this)).on("keypress.jstree", O.proxy(function(e) {
                if (e.target.tagName && e.target.tagName.toLowerCase() === "input") {
                    return true
                }
                if (n) {
                    clearTimeout(n)
                }
                n = setTimeout(function() {
                    a = ""
                }, 500);
                var i = String.fromCharCode(e.which).toLowerCase()
                    , t = this.element.find(".jstree-anchor").filter(":visible")
                    , r = t.index(k.activeElement) || 0
                    , s = false;
                a += i;
                if (a.length > 1) {
                    t.slice(r).each(O.proxy(function(e, t) {
                        if (O(t).text().toLowerCase().indexOf(a) === 0) {
                            O(t).focus();
                            s = true;
                            return false
                        }
                    }, this));
                    if (s) {
                        return
                    }
                    t.slice(0, r).each(O.proxy(function(e, t) {
                        if (O(t).text().toLowerCase().indexOf(a) === 0) {
                            O(t).focus();
                            s = true;
                            return false
                        }
                    }, this));
                    if (s) {
                        return
                    }
                }
                if (new RegExp("^" + i.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "+$").test(a)) {
                    t.slice(r + 1).each(O.proxy(function(e, t) {
                        if (O(t).text().toLowerCase().charAt(0) === i) {
                            O(t).focus();
                            s = true;
                            return false
                        }
                    }, this));
                    if (s) {
                        return
                    }
                    t.slice(0, r + 1).each(O.proxy(function(e, t) {
                        if (O(t).text().toLowerCase().charAt(0) === i) {
                            O(t).focus();
                            s = true;
                            return false
                        }
                    }, this));
                    if (s) {
                        return
                    }
                }
            }, this)).on("init.jstree", O.proxy(function() {
                var e = this.settings.core.themes;
                this._data.core.themes.dots = e.dots;
                this._data.core.themes.stripes = e.stripes;
                this._data.core.themes.icons = e.icons;
                this._data.core.themes.ellipsis = e.ellipsis;
                this.set_theme(e.name || "default", e.url);
                this.set_theme_variant(e.variant)
            }, this)).on("loading.jstree", O.proxy(function() {
                this[this._data.core.themes.dots ? "show_dots" : "hide_dots"]();
                this[this._data.core.themes.icons ? "show_icons" : "hide_icons"]();
                this[this._data.core.themes.stripes ? "show_stripes" : "hide_stripes"]();
                this[this._data.core.themes.ellipsis ? "show_ellipsis" : "hide_ellipsis"]()
            }, this)).on("blur.jstree", ".jstree-anchor", O.proxy(function(e) {
                this._data.core.focused = null;
                O(e.currentTarget).filter(".jstree-hovered").mouseleave();
                this.element.attr("tabindex", "0")
            }, this)).on("focus.jstree", ".jstree-anchor", O.proxy(function(e) {
                var t = this.get_node(e.currentTarget);
                if (t && t.id) {
                    this._data.core.focused = t.id
                }
                this.element.find(".jstree-hovered").not(e.currentTarget).mouseleave();
                O(e.currentTarget).mouseenter();
                this.element.attr("tabindex", "-1")
            }, this)).on("focus.jstree", O.proxy(function() {
                if (+new Date - t > 500 && !this._data.core.focused && this.settings.core.restore_focus) {
                    t = 0;
                    var e = this.get_node(this.element.attr("aria-activedescendant"), true);
                    if (e) {
                        e.find("> .jstree-anchor").focus()
                    }
                }
            }, this)).on("mouseenter.jstree", ".jstree-anchor", O.proxy(function(e) {
                this.hover_node(e.currentTarget)
            }, this)).on("mouseleave.jstree", ".jstree-anchor", O.proxy(function(e) {
                this.dehover_node(e.currentTarget)
            }, this))
        },
        unbind: function() {
            this.element.off(".jstree");
            O(k).off(".jstree-" + this._id)
        },
        trigger: function(e, t) {
            if (!t) {
                t = {}
            }
            t.instance = this;
            this.element.triggerHandler(e.replace(".jstree", "") + ".jstree", t)
        },
        get_container: function() {
            return this.element
        },
        get_container_ul: function() {
            return this.element.children(".jstree-children").first()
        },
        get_string: function(e) {
            var t = this.settings.core.strings;
            if (O.isFunction(t)) {
                return t.call(this, e)
            }
            if (t && t[e]) {
                return t[e]
            }
            return e
        },
        _firstChild: function(e) {
            e = e ? e.firstChild : null;
            while (e !== null && e.nodeType !== 1) {
                e = e.nextSibling
            }
            return e
        },
        _nextSibling: function(e) {
            e = e ? e.nextSibling : null;
            while (e !== null && e.nodeType !== 1) {
                e = e.nextSibling
            }
            return e
        },
        _previousSibling: function(e) {
            e = e ? e.previousSibling : null;
            while (e !== null && e.nodeType !== 1) {
                e = e.previousSibling
            }
            return e
        },
        get_node: function(e, t) {
            if (e && e.id) {
                e = e.id
            }
            if (e instanceof O && e.length && e[0].id) {
                e = e[0].id
            }
            var i;
            try {
                if (this._model.data[e]) {
                    e = this._model.data[e]
                } else if (typeof e === "string" && this._model.data[e.replace(/^#/, "")]) {
                    e = this._model.data[e.replace(/^#/, "")]
                } else if (typeof e === "string" && (i = O("#" + e.replace(O.jstree.idregex, "\\$&"), this.element)).length && this._model.data[i.closest(".jstree-node").attr("id")]) {
                    e = this._model.data[i.closest(".jstree-node").attr("id")]
                } else if ((i = this.element.find(e)).length && this._model.data[i.closest(".jstree-node").attr("id")]) {
                    e = this._model.data[i.closest(".jstree-node").attr("id")]
                } else if ((i = this.element.find(e)).length && i.hasClass("jstree")) {
                    e = this._model.data[O.jstree.root]
                } else {
                    return false
                }
                if (t) {
                    e = e.id === O.jstree.root ? this.element : O("#" + e.id.replace(O.jstree.idregex, "\\$&"), this.element)
                }
                return e
            } catch (e) {
                return false
            }
        },
        get_path: function(e, t, i) {
            e = e.parents ? e : this.get_node(e);
            if (!e || e.id === O.jstree.root || !e.parents) {
                return false
            }
            var r, s, a = [];
            a.push(i ? e.id : e.text);
            for (r = 0,
                     s = e.parents.length; r < s; r++) {
                a.push(i ? e.parents[r] : this.get_text(e.parents[r]))
            }
            a = a.reverse().slice(1);
            return t ? a.join(t) : a
        },
        get_next_dom: function(e, t) {
            var i;
            e = this.get_node(e, true);
            if (e[0] === this.element[0]) {
                i = this._firstChild(this.get_container_ul()[0]);
                while (i && i.offsetHeight === 0) {
                    i = this._nextSibling(i)
                }
                return i ? O(i) : false
            }
            if (!e || !e.length) {
                return false
            }
            if (t) {
                i = e[0];
                do {
                    i = this._nextSibling(i)
                } while (i && i.offsetHeight === 0);return i ? O(i) : false
            }
            if (e.hasClass("jstree-open")) {
                i = this._firstChild(e.children(".jstree-children")[0]);
                while (i && i.offsetHeight === 0) {
                    i = this._nextSibling(i)
                }
                if (i !== null) {
                    return O(i)
                }
            }
            i = e[0];
            do {
                i = this._nextSibling(i)
            } while (i && i.offsetHeight === 0);if (i !== null) {
                return O(i)
            }
            return e.parentsUntil(".jstree", ".jstree-node").nextAll(".jstree-node:visible").first()
        },
        get_prev_dom: function(e, t) {
            var i;
            e = this.get_node(e, true);
            if (e[0] === this.element[0]) {
                i = this.get_container_ul()[0].lastChild;
                while (i && i.offsetHeight === 0) {
                    i = this._previousSibling(i)
                }
                return i ? O(i) : false
            }
            if (!e || !e.length) {
                return false
            }
            if (t) {
                i = e[0];
                do {
                    i = this._previousSibling(i)
                } while (i && i.offsetHeight === 0);return i ? O(i) : false
            }
            i = e[0];
            do {
                i = this._previousSibling(i)
            } while (i && i.offsetHeight === 0);if (i !== null) {
                e = O(i);
                while (e.hasClass("jstree-open")) {
                    e = e.children(".jstree-children").first().children(".jstree-node:visible:last")
                }
                return e
            }
            i = e[0].parentNode.parentNode;
            return i && i.className && i.className.indexOf("jstree-node") !== -1 ? O(i) : false
        },
        get_parent: function(e) {
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            return e.parent
        },
        get_children_dom: function(e) {
            e = this.get_node(e, true);
            if (e[0] === this.element[0]) {
                return this.get_container_ul().children(".jstree-node")
            }
            if (!e || !e.length) {
                return false
            }
            return e.children(".jstree-children").children(".jstree-node")
        },
        is_parent: function(e) {
            e = this.get_node(e);
            return e && (e.state.loaded === false || e.children.length > 0)
        },
        is_loaded: function(e) {
            e = this.get_node(e);
            return e && e.state.loaded
        },
        is_loading: function(e) {
            e = this.get_node(e);
            return e && e.state && e.state.loading
        },
        is_open: function(e) {
            e = this.get_node(e);
            return e && e.state.opened
        },
        is_closed: function(e) {
            e = this.get_node(e);
            return e && this.is_parent(e) && !e.state.opened
        },
        is_leaf: function(e) {
            return !this.is_parent(e)
        },
        load_node: function(n, o) {
            var e, t, i, r, s;
            if (O.isArray(n)) {
                this._load_nodes(n.slice(), o);
                return true
            }
            n = this.get_node(n);
            if (!n) {
                if (o) {
                    o.call(this, n, false)
                }
                return false
            }
            if (n.state.loaded) {
                n.state.loaded = false;
                for (i = 0,
                         r = n.parents.length; i < r; i++) {
                    this._model.data[n.parents[i]].children_d = O.vakata.array_filter(this._model.data[n.parents[i]].children_d, function(e) {
                        return O.inArray(e, n.children_d) === -1
                    })
                }
                for (e = 0,
                         t = n.children_d.length; e < t; e++) {
                    if (this._model.data[n.children_d[e]].state.selected) {
                        s = true
                    }
                    delete this._model.data[n.children_d[e]]
                }
                if (s) {
                    this._data.core.selected = O.vakata.array_filter(this._data.core.selected, function(e) {
                        return O.inArray(e, n.children_d) === -1
                    })
                }
                n.children = [];
                n.children_d = [];
                if (s) {
                    this.trigger("changed", {
                        action: "load_node",
                        node: n,
                        selected: this._data.core.selected
                    })
                }
            }
            n.state.failed = false;
            n.state.loading = true;
            this.get_node(n, true).addClass("jstree-loading").attr("aria-busy", true);
            this._load_node(n, O.proxy(function(e) {
                n = this._model.data[n.id];
                n.state.loading = false;
                n.state.loaded = e;
                n.state.failed = !n.state.loaded;
                var t = this.get_node(n, true)
                    , i = 0
                    , r = 0
                    , s = this._model.data
                    , a = false;
                for (i = 0,
                         r = n.children.length; i < r; i++) {
                    if (s[n.children[i]] && !s[n.children[i]].state.hidden) {
                        a = true;
                        break
                    }
                }
                if (n.state.loaded && t && t.length) {
                    t.removeClass("jstree-closed jstree-open jstree-leaf");
                    if (!a) {
                        t.addClass("jstree-leaf")
                    } else {
                        if (n.id !== "#") {
                            t.addClass(n.state.opened ? "jstree-open" : "jstree-closed")
                        }
                    }
                }
                t.removeClass("jstree-loading").attr("aria-busy", false);
                this.trigger("load_node", {
                    node: n,
                    status: e
                });
                if (o) {
                    o.call(this, n, e)
                }
            }, this));
            return true
        },
        _load_nodes: function(e, t, i, r) {
            var s = true, a = function() {
                this._load_nodes(e, t, true)
            }, n = this._model.data, o, d, l = [];
            for (o = 0,
                     d = e.length; o < d; o++) {
                if (n[e[o]] && (!n[e[o]].state.loaded && !n[e[o]].state.failed || !i && r)) {
                    if (!this.is_loading(e[o])) {
                        this.load_node(e[o], a)
                    }
                    s = false
                }
            }
            if (s) {
                for (o = 0,
                         d = e.length; o < d; o++) {
                    if (n[e[o]] && n[e[o]].state.loaded) {
                        l.push(e[o])
                    }
                }
                if (t && !t.done) {
                    t.call(this, l);
                    t.done = true
                }
            }
        },
        load_all: function(e, t) {
            if (!e) {
                e = O.jstree.root
            }
            e = this.get_node(e);
            if (!e) {
                return false
            }
            var i = [], r = this._model.data, s = r[e.id].children_d, a, n;
            if (e.state && !e.state.loaded) {
                i.push(e.id)
            }
            for (a = 0,
                     n = s.length; a < n; a++) {
                if (r[s[a]] && r[s[a]].state && !r[s[a]].state.loaded) {
                    i.push(s[a])
                }
            }
            if (i.length) {
                this._load_nodes(i, function() {
                    this.load_all(e, t)
                })
            } else {
                if (t) {
                    t.call(this, e)
                }
                this.trigger("load_all", {
                    node: e
                })
            }
        },
        _load_node: function(s, a) {
            var e = this.settings.core.data, t;
            var n = function e() {
                return this.nodeType !== 3 && this.nodeType !== 8
            };
            if (!e) {
                if (s.id === O.jstree.root) {
                    return this._append_html_data(s, this._data.core.original_container_html.clone(true), function(e) {
                        a.call(this, e)
                    })
                } else {
                    return a.call(this, false)
                }
            }
            if (O.isFunction(e)) {
                return e.call(this, s, O.proxy(function(e) {
                    if (e === false) {
                        a.call(this, false)
                    } else {
                        this[typeof e === "string" ? "_append_html_data" : "_append_json_data"](s, typeof e === "string" ? O(O.parseHTML(e)).filter(n) : e, function(e) {
                            a.call(this, e)
                        })
                    }
                }, this))
            }
            if (typeof e === "object") {
                if (e.url) {
                    e = O.extend(true, {}, e);
                    if (O.isFunction(e.url)) {
                        e.url = e.url.call(this, s)
                    }
                    if (O.isFunction(e.data)) {
                        e.data = e.data.call(this, s)
                    }
                    return O.ajax(e).done(O.proxy(function(e, t, i) {
                        var r = i.getResponseHeader("Content-Type");
                        if (r && r.indexOf("json") !== -1 || typeof e === "object") {
                            return this._append_json_data(s, e, function(e) {
                                a.call(this, e)
                            })
                        }
                        if (r && r.indexOf("html") !== -1 || typeof e === "string") {
                            return this._append_html_data(s, O(O.parseHTML(e)).filter(n), function(e) {
                                a.call(this, e)
                            })
                        }
                        this._data.core.last_error = {
                            error: "ajax",
                            plugin: "core",
                            id: "core_04",
                            reason: "Could not load node",
                            data: JSON.stringify({
                                id: s.id,
                                xhr: i
                            })
                        };
                        this.settings.core.error.call(this, this._data.core.last_error);
                        return a.call(this, false)
                    }, this)).fail(O.proxy(function(e) {
                        this._data.core.last_error = {
                            error: "ajax",
                            plugin: "core",
                            id: "core_04",
                            reason: "Could not load node",
                            data: JSON.stringify({
                                id: s.id,
                                xhr: e
                            })
                        };
                        a.call(this, false);
                        this.settings.core.error.call(this, this._data.core.last_error)
                    }, this))
                }
                if (O.isArray(e)) {
                    t = O.extend(true, [], e)
                } else if (O.isPlainObject(e)) {
                    t = O.extend(true, {}, e)
                } else {
                    t = e
                }
                if (s.id === O.jstree.root) {
                    return this._append_json_data(s, t, function(e) {
                        a.call(this, e)
                    })
                } else {
                    this._data.core.last_error = {
                        error: "nodata",
                        plugin: "core",
                        id: "core_05",
                        reason: "Could not load node",
                        data: JSON.stringify({
                            id: s.id
                        })
                    };
                    this.settings.core.error.call(this, this._data.core.last_error);
                    return a.call(this, false)
                }
            }
            if (typeof e === "string") {
                if (s.id === O.jstree.root) {
                    return this._append_html_data(s, O(O.parseHTML(e)).filter(n), function(e) {
                        a.call(this, e)
                    })
                } else {
                    this._data.core.last_error = {
                        error: "nodata",
                        plugin: "core",
                        id: "core_06",
                        reason: "Could not load node",
                        data: JSON.stringify({
                            id: s.id
                        })
                    };
                    this.settings.core.error.call(this, this._data.core.last_error);
                    return a.call(this, false)
                }
            }
            return a.call(this, false)
        },
        _node_changed: function(e) {
            e = this.get_node(e);
            if (e && O.inArray(e.id, this._model.changed) === -1) {
                this._model.changed.push(e.id)
            }
        },
        _append_html_data: function(e, t, i) {
            e = this.get_node(e);
            e.children = [];
            e.children_d = [];
            var r = t.is("ul") ? t.children() : t, s = e.id, a = [], n = [], o = this._model.data, d = o[s], l = this._data.core.selected.length, c, h, f;
            r.each(O.proxy(function(e, t) {
                c = this._parse_model_from_html(O(t), s, d.parents.concat());
                if (c) {
                    a.push(c);
                    n.push(c);
                    if (o[c].children_d.length) {
                        n = n.concat(o[c].children_d)
                    }
                }
            }, this));
            d.children = a;
            d.children_d = n;
            for (h = 0,
                     f = d.parents.length; h < f; h++) {
                o[d.parents[h]].children_d = o[d.parents[h]].children_d.concat(n)
            }
            this.trigger("model", {
                nodes: n,
                parent: s
            });
            if (s !== O.jstree.root) {
                this._node_changed(s);
                this.redraw()
            } else {
                this.get_container_ul().children(".jstree-initial-node").remove();
                this.redraw(true)
            }
            if (this._data.core.selected.length !== l) {
                this.trigger("changed", {
                    action: "model",
                    selected: this._data.core.selected
                })
            }
            i.call(this, true)
        },
        _append_json_data: function(e, t, d, i) {
            if (this.element === null) {
                return
            }
            e = this.get_node(e);
            e.children = [];
            e.children_d = [];
            if (t.d) {
                t = t.d;
                if (typeof t === "string") {
                    t = JSON.parse(t)
                }
            }
            if (!O.isArray(t)) {
                t = [t]
            }
            var r = null
                , s = {
                df: this._model.default_state,
                dat: t,
                par: e.id,
                m: this._model.data,
                t_id: this._id,
                t_cnt: this._cnt,
                sel: this._data.core.selected
            }
                , j = this
                , a = function(e, l) {
                if (e.data) {
                    e = e.data
                }
                var t = e.dat, i = e.par, r = [], s = [], c = [], h = e.df, f = e.t_id, _ = e.t_cnt, u = e.m, a = u[i], n = e.sel, o, d, g, p, m = function(e, t, i) {
                    if (!i) {
                        i = []
                    } else {
                        i = i.concat()
                    }
                    if (t) {
                        i.unshift(t)
                    }
                    var r = e.id.toString(), s, a, n, o, d = {
                        id: r,
                        text: e.text || "",
                        icon: e.icon !== l ? e.icon : true,
                        parent: t,
                        parents: i,
                        children: e.children || [],
                        children_d: e.children_d || [],
                        data: e.data,
                        state: {},
                        li_attr: {
                            id: false
                        },
                        a_attr: {
                            href: "#"
                        },
                        original: false
                    };
                    for (s in h) {
                        if (h.hasOwnProperty(s)) {
                            d.state[s] = h[s]
                        }
                    }
                    if (e && e.data && e.data.jstree && e.data.jstree.icon) {
                        d.icon = e.data.jstree.icon
                    }
                    if (d.icon === l || d.icon === null || d.icon === "") {
                        d.icon = true
                    }
                    if (e && e.data) {
                        d.data = e.data;
                        if (e.data.jstree) {
                            for (s in e.data.jstree) {
                                if (e.data.jstree.hasOwnProperty(s)) {
                                    d.state[s] = e.data.jstree[s]
                                }
                            }
                        }
                    }
                    if (e && typeof e.state === "object") {
                        for (s in e.state) {
                            if (e.state.hasOwnProperty(s)) {
                                d.state[s] = e.state[s]
                            }
                        }
                    }
                    if (e && typeof e.li_attr === "object") {
                        for (s in e.li_attr) {
                            if (e.li_attr.hasOwnProperty(s)) {
                                d.li_attr[s] = e.li_attr[s]
                            }
                        }
                    }
                    if (!d.li_attr.id) {
                        d.li_attr.id = r
                    }
                    if (e && typeof e.a_attr === "object") {
                        for (s in e.a_attr) {
                            if (e.a_attr.hasOwnProperty(s)) {
                                d.a_attr[s] = e.a_attr[s]
                            }
                        }
                    }
                    if (e && e.children && e.children === true) {
                        d.state.loaded = false;
                        d.children = [];
                        d.children_d = []
                    }
                    u[d.id] = d;
                    for (s = 0,
                             a = d.children.length; s < a; s++) {
                        n = m(u[d.children[s]], d.id, i);
                        o = u[n];
                        d.children_d.push(n);
                        if (o.children_d.length) {
                            d.children_d = d.children_d.concat(o.children_d)
                        }
                    }
                    delete e.data;
                    delete e.children;
                    u[d.id].original = e;
                    if (d.state.selected) {
                        c.push(d.id)
                    }
                    return d.id
                }, v = function(e, t, i) {
                    if (!i) {
                        i = []
                    } else {
                        i = i.concat()
                    }
                    if (t) {
                        i.unshift(t)
                    }
                    var r = false, s, a, n, o, d;
                    do {
                        r = "j" + f + "_" + ++_
                    } while (u[r]);d = {
                        id: false,
                        text: typeof e === "string" ? e : "",
                        icon: typeof e === "object" && e.icon !== l ? e.icon : true,
                        parent: t,
                        parents: i,
                        children: [],
                        children_d: [],
                        data: null,
                        state: {},
                        li_attr: {
                            id: false
                        },
                        a_attr: {
                            href: "#"
                        },
                        original: false
                    };
                    for (s in h) {
                        if (h.hasOwnProperty(s)) {
                            d.state[s] = h[s]
                        }
                    }
                    if (e && e.id) {
                        d.id = e.id.toString()
                    }
                    if (e && e.text) {
                        d.text = e.text
                    }
                    if (e && e.data && e.data.jstree && e.data.jstree.icon) {
                        d.icon = e.data.jstree.icon
                    }
                    if (d.icon === l || d.icon === null || d.icon === "") {
                        d.icon = true
                    }
                    if (e && e.data) {
                        d.data = e.data;
                        if (e.data.jstree) {
                            for (s in e.data.jstree) {
                                if (e.data.jstree.hasOwnProperty(s)) {
                                    d.state[s] = e.data.jstree[s]
                                }
                            }
                        }
                    }
                    if (e && typeof e.state === "object") {
                        for (s in e.state) {
                            if (e.state.hasOwnProperty(s)) {
                                d.state[s] = e.state[s]
                            }
                        }
                    }
                    if (e && typeof e.li_attr === "object") {
                        for (s in e.li_attr) {
                            if (e.li_attr.hasOwnProperty(s)) {
                                d.li_attr[s] = e.li_attr[s]
                            }
                        }
                    }
                    if (d.li_attr.id && !d.id) {
                        d.id = d.li_attr.id.toString()
                    }
                    if (!d.id) {
                        d.id = r
                    }
                    if (!d.li_attr.id) {
                        d.li_attr.id = d.id
                    }
                    if (e && typeof e.a_attr === "object") {
                        for (s in e.a_attr) {
                            if (e.a_attr.hasOwnProperty(s)) {
                                d.a_attr[s] = e.a_attr[s]
                            }
                        }
                    }
                    if (e && e.children && e.children.length) {
                        for (s = 0,
                                 a = e.children.length; s < a; s++) {
                            n = v(e.children[s], d.id, i);
                            o = u[n];
                            d.children.push(n);
                            if (o.children_d.length) {
                                d.children_d = d.children_d.concat(o.children_d)
                            }
                        }
                        d.children_d = d.children_d.concat(d.children)
                    }
                    if (e && e.children && e.children === true) {
                        d.state.loaded = false;
                        d.children = [];
                        d.children_d = []
                    }
                    delete e.data;
                    delete e.children;
                    d.original = e;
                    u[d.id] = d;
                    if (d.state.selected) {
                        c.push(d.id)
                    }
                    return d.id
                };
                if (t.length && t[0].id !== l && t[0].parent !== l) {
                    for (d = 0,
                             g = t.length; d < g; d++) {
                        if (!t[d].children) {
                            t[d].children = []
                        }
                        if (!t[d].state) {
                            t[d].state = {}
                        }
                        u[t[d].id.toString()] = t[d]
                    }
                    for (d = 0,
                             g = t.length; d < g; d++) {
                        if (!u[t[d].parent.toString()]) {
                            if (typeof j !== "undefined") {
                                j._data.core.last_error = {
                                    error: "parse",
                                    plugin: "core",
                                    id: "core_07",
                                    reason: "Node with invalid parent",
                                    data: JSON.stringify({
                                        id: t[d].id.toString(),
                                        parent: t[d].parent.toString()
                                    })
                                };
                                j.settings.core.error.call(j, j._data.core.last_error)
                            }
                            continue
                        }
                        u[t[d].parent.toString()].children.push(t[d].id.toString());
                        a.children_d.push(t[d].id.toString())
                    }
                    for (d = 0,
                             g = a.children.length; d < g; d++) {
                        o = m(u[a.children[d]], i, a.parents.concat());
                        s.push(o);
                        if (u[o].children_d.length) {
                            s = s.concat(u[o].children_d)
                        }
                    }
                    for (d = 0,
                             g = a.parents.length; d < g; d++) {
                        u[a.parents[d]].children_d = u[a.parents[d]].children_d.concat(s)
                    }
                    p = {
                        cnt: _,
                        mod: u,
                        sel: n,
                        par: i,
                        dpc: s,
                        add: c
                    }
                } else {
                    for (d = 0,
                             g = t.length; d < g; d++) {
                        o = v(t[d], i, a.parents.concat());
                        if (o) {
                            r.push(o);
                            s.push(o);
                            if (u[o].children_d.length) {
                                s = s.concat(u[o].children_d)
                            }
                        }
                    }
                    a.children = r;
                    a.children_d = s;
                    for (d = 0,
                             g = a.parents.length; d < g; d++) {
                        u[a.parents[d]].children_d = u[a.parents[d]].children_d.concat(s)
                    }
                    p = {
                        cnt: _,
                        mod: u,
                        sel: n,
                        par: i,
                        dpc: s,
                        add: c
                    }
                }
                if (typeof window === "undefined" || typeof window.document === "undefined") {
                    postMessage(p)
                } else {
                    return p
                }
            }
                , n = function(e, t) {
                if (this.element === null) {
                    return
                }
                this._cnt = e.cnt;
                var i, r = this._model.data;
                for (i in r) {
                    if (r.hasOwnProperty(i) && r[i].state && r[i].state.loading && e.mod[i]) {
                        e.mod[i].state.loading = true
                    }
                }
                this._model.data = e.mod;
                if (t) {
                    var s, a = e.add, n = e.sel, o = this._data.core.selected.slice();
                    r = this._model.data;
                    if (n.length !== o.length || O.vakata.array_unique(n.concat(o)).length !== n.length) {
                        for (i = 0,
                                 s = n.length; i < s; i++) {
                            if (O.inArray(n[i], a) === -1 && O.inArray(n[i], o) === -1) {
                                r[n[i]].state.selected = false
                            }
                        }
                        for (i = 0,
                                 s = o.length; i < s; i++) {
                            if (O.inArray(o[i], n) === -1) {
                                r[o[i]].state.selected = true
                            }
                        }
                    }
                }
                if (e.add.length) {
                    this._data.core.selected = this._data.core.selected.concat(e.add)
                }
                this.trigger("model", {
                    nodes: e.dpc,
                    parent: e.par
                });
                if (e.par !== O.jstree.root) {
                    this._node_changed(e.par);
                    this.redraw()
                } else {
                    this.redraw(true)
                }
                if (e.add.length) {
                    this.trigger("changed", {
                        action: "model",
                        selected: this._data.core.selected
                    })
                }
                d.call(this, true)
            };
            if (this.settings.core.worker && window.Blob && window.URL && window.Worker) {
                try {
                    if (this._wrk === null) {
                        this._wrk = window.URL.createObjectURL(new window.Blob(["self.onmessage = " + a.toString()],{
                            type: "text/javascript"
                        }))
                    }
                    if (!this._data.core.working || i) {
                        this._data.core.working = true;
                        r = new window.Worker(this._wrk);
                        r.onmessage = O.proxy(function(e) {
                            n.call(this, e.data, true);
                            try {
                                r.terminate();
                                r = null
                            } catch (e) {}
                            if (this._data.core.worker_queue.length) {
                                this._append_json_data.apply(this, this._data.core.worker_queue.shift())
                            } else {
                                this._data.core.working = false
                            }
                        }, this);
                        if (!s.par) {
                            if (this._data.core.worker_queue.length) {
                                this._append_json_data.apply(this, this._data.core.worker_queue.shift())
                            } else {
                                this._data.core.working = false
                            }
                        } else {
                            r.postMessage(s)
                        }
                    } else {
                        this._data.core.worker_queue.push([e, t, d, true])
                    }
                } catch (e) {
                    n.call(this, a(s), false);
                    if (this._data.core.worker_queue.length) {
                        this._append_json_data.apply(this, this._data.core.worker_queue.shift())
                    } else {
                        this._data.core.working = false
                    }
                }
            } else {
                n.call(this, a(s), false)
            }
        },
        _parse_model_from_html: function(e, t, i) {
            if (!i) {
                i = []
            } else {
                i = [].concat(i)
            }
            if (t) {
                i.unshift(t)
            }
            var r, s, a = this._model.data, n = {
                id: false,
                text: false,
                icon: true,
                parent: t,
                parents: i,
                children: [],
                children_d: [],
                data: null,
                state: {},
                li_attr: {
                    id: false
                },
                a_attr: {
                    href: "#"
                },
                original: false
            }, o, d, l;
            for (o in this._model.default_state) {
                if (this._model.default_state.hasOwnProperty(o)) {
                    n.state[o] = this._model.default_state[o]
                }
            }
            d = O.vakata.attributes(e, true);
            O.each(d, function(e, t) {
                t = O.trim(t);
                if (!t.length) {
                    return true
                }
                n.li_attr[e] = t;
                if (e === "id") {
                    n.id = t.toString()
                }
            });
            d = e.children("a").first();
            if (d.length) {
                d = O.vakata.attributes(d, true);
                O.each(d, function(e, t) {
                    t = O.trim(t);
                    if (t.length) {
                        n.a_attr[e] = t
                    }
                })
            }
            d = e.children("a").first().length ? e.children("a").first().clone() : e.clone();
            d.children("ins, i, ul").remove();
            d = d.html();
            d = O("<div />").html(d);
            n.text = this.settings.core.force_text ? d.text() : d.html();
            d = e.data();
            n.data = d ? O.extend(true, {}, d) : null;
            n.state.opened = e.hasClass("jstree-open");
            n.state.selected = e.children("a").hasClass("jstree-clicked");
            n.state.disabled = e.children("a").hasClass("jstree-disabled");
            if (n.data && n.data.jstree) {
                for (o in n.data.jstree) {
                    if (n.data.jstree.hasOwnProperty(o)) {
                        n.state[o] = n.data.jstree[o]
                    }
                }
            }
            d = e.children("a").children(".jstree-themeicon");
            if (d.length) {
                n.icon = d.hasClass("jstree-themeicon-hidden") ? false : d.attr("rel")
            }
            if (n.state.icon !== S) {
                n.icon = n.state.icon
            }
            if (n.icon === S || n.icon === null || n.icon === "") {
                n.icon = true
            }
            d = e.children("ul").children("li");
            do {
                l = "j" + this._id + "_" + ++this._cnt
            } while (a[l]);n.id = n.li_attr.id ? n.li_attr.id.toString() : l;
            if (d.length) {
                d.each(O.proxy(function(e, t) {
                    r = this._parse_model_from_html(O(t), n.id, i);
                    s = this._model.data[r];
                    n.children.push(r);
                    if (s.children_d.length) {
                        n.children_d = n.children_d.concat(s.children_d)
                    }
                }, this));
                n.children_d = n.children_d.concat(n.children)
            } else {
                if (e.hasClass("jstree-closed")) {
                    n.state.loaded = false
                }
            }
            if (n.li_attr["class"]) {
                n.li_attr["class"] = n.li_attr["class"].replace("jstree-closed", "").replace("jstree-open", "")
            }
            if (n.a_attr["class"]) {
                n.a_attr["class"] = n.a_attr["class"].replace("jstree-clicked", "").replace("jstree-disabled", "")
            }
            a[n.id] = n;
            if (n.state.selected) {
                this._data.core.selected.push(n.id)
            }
            return n.id
        },
        _parse_model_from_flat_json: function(e, t, i) {
            if (!i) {
                i = []
            } else {
                i = i.concat()
            }
            if (t) {
                i.unshift(t)
            }
            var r = e.id.toString(), s = this._model.data, a = this._model.default_state, n, o, d, l, c = {
                id: r,
                text: e.text || "",
                icon: e.icon !== S ? e.icon : true,
                parent: t,
                parents: i,
                children: e.children || [],
                children_d: e.children_d || [],
                data: e.data,
                state: {},
                li_attr: {
                    id: false
                },
                a_attr: {
                    href: "#"
                },
                original: false
            };
            for (n in a) {
                if (a.hasOwnProperty(n)) {
                    c.state[n] = a[n]
                }
            }
            if (e && e.data && e.data.jstree && e.data.jstree.icon) {
                c.icon = e.data.jstree.icon
            }
            if (c.icon === S || c.icon === null || c.icon === "") {
                c.icon = true
            }
            if (e && e.data) {
                c.data = e.data;
                if (e.data.jstree) {
                    for (n in e.data.jstree) {
                        if (e.data.jstree.hasOwnProperty(n)) {
                            c.state[n] = e.data.jstree[n]
                        }
                    }
                }
            }
            if (e && typeof e.state === "object") {
                for (n in e.state) {
                    if (e.state.hasOwnProperty(n)) {
                        c.state[n] = e.state[n]
                    }
                }
            }
            if (e && typeof e.li_attr === "object") {
                for (n in e.li_attr) {
                    if (e.li_attr.hasOwnProperty(n)) {
                        c.li_attr[n] = e.li_attr[n]
                    }
                }
            }
            if (!c.li_attr.id) {
                c.li_attr.id = r
            }
            if (e && typeof e.a_attr === "object") {
                for (n in e.a_attr) {
                    if (e.a_attr.hasOwnProperty(n)) {
                        c.a_attr[n] = e.a_attr[n]
                    }
                }
            }
            if (e && e.children && e.children === true) {
                c.state.loaded = false;
                c.children = [];
                c.children_d = []
            }
            s[c.id] = c;
            for (n = 0,
                     o = c.children.length; n < o; n++) {
                d = this._parse_model_from_flat_json(s[c.children[n]], c.id, i);
                l = s[d];
                c.children_d.push(d);
                if (l.children_d.length) {
                    c.children_d = c.children_d.concat(l.children_d)
                }
            }
            delete e.data;
            delete e.children;
            s[c.id].original = e;
            if (c.state.selected) {
                this._data.core.selected.push(c.id)
            }
            return c.id
        },
        _parse_model_from_json: function(e, t, i) {
            if (!i) {
                i = []
            } else {
                i = i.concat()
            }
            if (t) {
                i.unshift(t)
            }
            var r = false, s, a, n, o, d = this._model.data, l = this._model.default_state, c;
            do {
                r = "j" + this._id + "_" + ++this._cnt
            } while (d[r]);c = {
                id: false,
                text: typeof e === "string" ? e : "",
                icon: typeof e === "object" && e.icon !== S ? e.icon : true,
                parent: t,
                parents: i,
                children: [],
                children_d: [],
                data: null,
                state: {},
                li_attr: {
                    id: false
                },
                a_attr: {
                    href: "#"
                },
                original: false
            };
            for (s in l) {
                if (l.hasOwnProperty(s)) {
                    c.state[s] = l[s]
                }
            }
            if (e && e.id) {
                c.id = e.id.toString()
            }
            if (e && e.text) {
                c.text = e.text
            }
            if (e && e.data && e.data.jstree && e.data.jstree.icon) {
                c.icon = e.data.jstree.icon
            }
            if (c.icon === S || c.icon === null || c.icon === "") {
                c.icon = true
            }
            if (e && e.data) {
                c.data = e.data;
                if (e.data.jstree) {
                    for (s in e.data.jstree) {
                        if (e.data.jstree.hasOwnProperty(s)) {
                            c.state[s] = e.data.jstree[s]
                        }
                    }
                }
            }
            if (e && typeof e.state === "object") {
                for (s in e.state) {
                    if (e.state.hasOwnProperty(s)) {
                        c.state[s] = e.state[s]
                    }
                }
            }
            if (e && typeof e.li_attr === "object") {
                for (s in e.li_attr) {
                    if (e.li_attr.hasOwnProperty(s)) {
                        c.li_attr[s] = e.li_attr[s]
                    }
                }
            }
            if (c.li_attr.id && !c.id) {
                c.id = c.li_attr.id.toString()
            }
            if (!c.id) {
                c.id = r
            }
            if (!c.li_attr.id) {
                c.li_attr.id = c.id
            }
            if (e && typeof e.a_attr === "object") {
                for (s in e.a_attr) {
                    if (e.a_attr.hasOwnProperty(s)) {
                        c.a_attr[s] = e.a_attr[s]
                    }
                }
            }
            if (e && e.children && e.children.length) {
                for (s = 0,
                         a = e.children.length; s < a; s++) {
                    n = this._parse_model_from_json(e.children[s], c.id, i);
                    o = d[n];
                    c.children.push(n);
                    if (o.children_d.length) {
                        c.children_d = c.children_d.concat(o.children_d)
                    }
                }
                c.children_d = c.children_d.concat(c.children)
            }
            if (e && e.children && e.children === true) {
                c.state.loaded = false;
                c.children = [];
                c.children_d = []
            }
            delete e.data;
            delete e.children;
            c.original = e;
            d[c.id] = c;
            if (c.state.selected) {
                this._data.core.selected.push(c.id)
            }
            return c.id
        },
        _redraw: function() {
            var e = this._model.force_full_redraw ? this._model.data[O.jstree.root].children.concat([]) : this._model.changed.concat([]), t = k.createElement("UL"), i, r, s, a = this._data.core.focused;
            for (r = 0,
                     s = e.length; r < s; r++) {
                i = this.redraw_node(e[r], true, this._model.force_full_redraw);
                if (i && this._model.force_full_redraw) {
                    t.appendChild(i)
                }
            }
            if (this._model.force_full_redraw) {
                t.className = this.get_container_ul()[0].className;
                t.setAttribute("role", "group");
                this.element.empty().append(t)
            }
            if (a !== null && this.settings.core.restore_focus) {
                i = this.get_node(a, true);
                if (i && i.length && i.children(".jstree-anchor")[0] !== k.activeElement) {
                    i.children(".jstree-anchor").focus()
                } else {
                    this._data.core.focused = null
                }
            }
            this._model.force_full_redraw = false;
            this._model.changed = [];
            this.trigger("redraw", {
                nodes: e
            })
        },
        redraw: function(e) {
            if (e) {
                this._model.force_full_redraw = true
            }
            this._redraw()
        },
        draw_children: function(e) {
            var t = this.get_node(e)
                , i = false
                , r = false
                , s = false
                , a = k;
            if (!t) {
                return false
            }
            if (t.id === O.jstree.root) {
                return this.redraw(true)
            }
            e = this.get_node(e, true);
            if (!e || !e.length) {
                return false
            }
            e.children(".jstree-children").remove();
            e = e[0];
            if (t.children.length && t.state.loaded) {
                s = a.createElement("UL");
                s.setAttribute("role", "group");
                s.className = "jstree-children";
                for (i = 0,
                         r = t.children.length; i < r; i++) {
                    s.appendChild(this.redraw_node(t.children[i], true, true))
                }
                e.appendChild(s)
            }
        },
        redraw_node: function(e, t, i, r) {
            var s = this.get_node(e)
                , a = false
                , n = false
                , o = false
                , d = false
                , l = false
                , c = false
                , h = ""
                , f = k
                , _ = this._model.data
                , u = false
                , g = false
                , p = null
                , m = 0
                , v = 0
                , j = false
                , y = false;
            if (!s) {
                return false
            }
            if (s.id === O.jstree.root) {
                return this.redraw(true)
            }
            t = t || s.children.length === 0;
            e = !k.querySelector ? k.getElementById(s.id) : this.element[0].querySelector("#" + ("0123456789".indexOf(s.id[0]) !== -1 ? "\\3" + s.id[0] + " " + s.id.substr(1).replace(O.jstree.idregex, "\\$&") : s.id.replace(O.jstree.idregex, "\\$&")));
            if (!e) {
                t = true;
                if (!i) {
                    a = s.parent !== O.jstree.root ? O("#" + s.parent.replace(O.jstree.idregex, "\\$&"), this.element)[0] : null;
                    if (a !== null && (!a || !_[s.parent].state.opened)) {
                        return false
                    }
                    n = O.inArray(s.id, a === null ? _[O.jstree.root].children : _[s.parent].children)
                }
            } else {
                e = O(e);
                if (!i) {
                    a = e.parent().parent()[0];
                    if (a === this.element[0]) {
                        a = null
                    }
                    n = e.index()
                }
                if (!t && s.children.length && !e.children(".jstree-children").length) {
                    t = true
                }
                if (!t) {
                    o = e.children(".jstree-children")[0]
                }
                u = e.children(".jstree-anchor")[0] === k.activeElement;
                e.remove()
            }
            e = this._data.core.node.cloneNode(true);
            h = "jstree-node ";
            for (d in s.li_attr) {
                if (s.li_attr.hasOwnProperty(d)) {
                    if (d === "id") {
                        continue
                    }
                    if (d !== "class") {
                        e.setAttribute(d, s.li_attr[d])
                    } else {
                        h += s.li_attr[d]
                    }
                }
            }
            if (!s.a_attr.id) {
                s.a_attr.id = s.id + "_anchor"
            }
            e.setAttribute("aria-selected", !!s.state.selected);
            e.setAttribute("aria-level", s.parents.length);
            e.setAttribute("aria-labelledby", s.a_attr.id);
            if (s.state.disabled) {
                e.setAttribute("aria-disabled", true)
            }
            for (d = 0,
                     l = s.children.length; d < l; d++) {
                if (!_[s.children[d]].state.hidden) {
                    j = true;
                    break
                }
            }
            if (s.parent !== null && _[s.parent] && !s.state.hidden) {
                d = O.inArray(s.id, _[s.parent].children);
                y = s.id;
                if (d !== -1) {
                    d++;
                    for (l = _[s.parent].children.length; d < l; d++) {
                        if (!_[_[s.parent].children[d]].state.hidden) {
                            y = _[s.parent].children[d]
                        }
                        if (y !== s.id) {
                            break
                        }
                    }
                }
            }
            if (s.state.hidden) {
                h += " jstree-hidden"
            }
            if (s.state.loading) {
                h += " jstree-loading"
            }
            if (s.state.loaded && !j) {
                h += " jstree-leaf"
            } else {
                h += s.state.opened && s.state.loaded ? " jstree-open" : " jstree-closed";
                e.setAttribute("aria-expanded", s.state.opened && s.state.loaded)
            }
            if (y === s.id) {
                h += " jstree-last"
            }
            e.id = s.id;
            e.className = h;
            h = (s.state.selected ? " jstree-clicked" : "") + (s.state.disabled ? " jstree-disabled" : "");
            for (l in s.a_attr) {
                if (s.a_attr.hasOwnProperty(l)) {
                    if (l === "href" && s.a_attr[l] === "#") {
                        continue
                    }
                    if (l !== "class") {
                        e.childNodes[1].setAttribute(l, s.a_attr[l])
                    } else {
                        h += " " + s.a_attr[l]
                    }
                }
            }
            if (h.length) {
                e.childNodes[1].className = "jstree-anchor " + h
            }
            if (s.icon && s.icon !== true || s.icon === false) {
                if (s.icon === false) {
                    e.childNodes[1].childNodes[0].className += " jstree-themeicon-hidden"
                } else if (s.icon.indexOf("/") === -1 && s.icon.indexOf(".") === -1) {
                    e.childNodes[1].childNodes[0].className += " " + s.icon + " jstree-themeicon-custom"
                } else {
                    e.childNodes[1].childNodes[0].style.backgroundImage = 'url("' + s.icon + '")';
                    e.childNodes[1].childNodes[0].style.backgroundPosition = "center center";
                    e.childNodes[1].childNodes[0].style.backgroundSize = "auto";
                    e.childNodes[1].childNodes[0].className += " jstree-themeicon-custom"
                }
            }
            if (this.settings.core.force_text) {
                e.childNodes[1].appendChild(f.createTextNode(s.text))
            } else {
                e.childNodes[1].innerHTML += s.text
            }
            if (t && s.children.length && (s.state.opened || r) && s.state.loaded) {
                c = f.createElement("UL");
                c.setAttribute("role", "group");
                c.className = "jstree-children";
                for (d = 0,
                         l = s.children.length; d < l; d++) {
                    c.appendChild(this.redraw_node(s.children[d], t, true))
                }
                e.appendChild(c)
            }
            if (o) {
                e.appendChild(o)
            }
            if (!i) {
                if (!a) {
                    a = this.element[0]
                }
                for (d = 0,
                         l = a.childNodes.length; d < l; d++) {
                    if (a.childNodes[d] && a.childNodes[d].className && a.childNodes[d].className.indexOf("jstree-children") !== -1) {
                        p = a.childNodes[d];
                        break
                    }
                }
                if (!p) {
                    p = f.createElement("UL");
                    p.setAttribute("role", "group");
                    p.className = "jstree-children";
                    a.appendChild(p)
                }
                a = p;
                if (n < a.childNodes.length) {
                    a.insertBefore(e, a.childNodes[n])
                } else {
                    a.appendChild(e)
                }
                if (u) {
                    m = this.element[0].scrollTop;
                    v = this.element[0].scrollLeft;
                    e.childNodes[1].focus();
                    this.element[0].scrollTop = m;
                    this.element[0].scrollLeft = v
                }
            }
            if (s.state.opened && !s.state.loaded) {
                s.state.opened = false;
                setTimeout(O.proxy(function() {
                    this.open_node(s.id, false, 0)
                }, this), 0)
            }
            return e
        },
        open_node: function(e, i, r) {
            var t, s, a, n;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         s = e.length; t < s; t++) {
                    this.open_node(e[t], i, r)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            r = r === S ? this.settings.core.animation : r;
            if (!this.is_closed(e)) {
                if (i) {
                    i.call(this, e, false)
                }
                return false
            }
            if (!this.is_loaded(e)) {
                if (this.is_loading(e)) {
                    return setTimeout(O.proxy(function() {
                        this.open_node(e, i, r)
                    }, this), 500)
                }
                this.load_node(e, function(e, t) {
                    return t ? this.open_node(e, i, r) : i ? i.call(this, e, false) : false
                })
            } else {
                a = this.get_node(e, true);
                n = this;
                if (a.length) {
                    if (r && a.children(".jstree-children").length) {
                        a.children(".jstree-children").stop(true, true)
                    }
                    if (e.children.length && !this._firstChild(a.children(".jstree-children")[0])) {
                        this.draw_children(e)
                    }
                    if (!r) {
                        this.trigger("before_open", {
                            node: e
                        });
                        a[0].className = a[0].className.replace("jstree-closed", "jstree-open");
                        a[0].setAttribute("aria-expanded", true)
                    } else {
                        this.trigger("before_open", {
                            node: e
                        });
                        a.children(".jstree-children").css("display", "none").end().removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded", true).children(".jstree-children").stop(true, true).slideDown(r, function() {
                            this.style.display = "";
                            if (n.element) {
                                n.trigger("after_open", {
                                    node: e
                                })
                            }
                        })
                    }
                }
                e.state.opened = true;
                if (i) {
                    i.call(this, e, true)
                }
                if (!a.length) {
                    this.trigger("before_open", {
                        node: e
                    })
                }
                this.trigger("open_node", {
                    node: e
                });
                if (!r || !a.length) {
                    this.trigger("after_open", {
                        node: e
                    })
                }
                return true
            }
        },
        _open_to: function(e) {
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            var t, i, r = e.parents;
            for (t = 0,
                     i = r.length; t < i; t += 1) {
                if (t !== O.jstree.root) {
                    this.open_node(r[t], false, 0)
                }
            }
            return O("#" + e.id.replace(O.jstree.idregex, "\\$&"), this.element)
        },
        close_node: function(e, t) {
            var i, r, s, a;
            if (O.isArray(e)) {
                e = e.slice();
                for (i = 0,
                         r = e.length; i < r; i++) {
                    this.close_node(e[i], t)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            if (this.is_closed(e)) {
                return false
            }
            t = t === S ? this.settings.core.animation : t;
            s = this;
            a = this.get_node(e, true);
            e.state.opened = false;
            this.trigger("close_node", {
                node: e
            });
            if (!a.length) {
                this.trigger("after_close", {
                    node: e
                })
            } else {
                if (!t) {
                    a[0].className = a[0].className.replace("jstree-open", "jstree-closed");
                    a.attr("aria-expanded", false).children(".jstree-children").remove();
                    this.trigger("after_close", {
                        node: e
                    })
                } else {
                    a.children(".jstree-children").attr("style", "display:block !important").end().removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded", false).children(".jstree-children").stop(true, true).slideUp(t, function() {
                        this.style.display = "";
                        a.children(".jstree-children").remove();
                        if (s.element) {
                            s.trigger("after_close", {
                                node: e
                            })
                        }
                    })
                }
            }
        },
        toggle_node: function(e) {
            var t, i;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         i = e.length; t < i; t++) {
                    this.toggle_node(e[t])
                }
                return true
            }
            if (this.is_closed(e)) {
                return this.open_node(e)
            }
            if (this.is_open(e)) {
                return this.close_node(e)
            }
        },
        open_all: function(e, i, r) {
            if (!e) {
                e = O.jstree.root
            }
            e = this.get_node(e);
            if (!e) {
                return false
            }
            var t = e.id === O.jstree.root ? this.get_container_ul() : this.get_node(e, true), s, a, n;
            if (!t.length) {
                for (s = 0,
                         a = e.children_d.length; s < a; s++) {
                    if (this.is_closed(this._model.data[e.children_d[s]])) {
                        this._model.data[e.children_d[s]].state.opened = true
                    }
                }
                return this.trigger("open_all", {
                    node: e
                })
            }
            r = r || t;
            n = this;
            t = this.is_closed(e) ? t.find(".jstree-closed").addBack() : t.find(".jstree-closed");
            t.each(function() {
                n.open_node(this, function(e, t) {
                    if (t && this.is_parent(e)) {
                        this.open_all(e, i, r)
                    }
                }, i || 0)
            });
            if (r.find(".jstree-closed").length === 0) {
                this.trigger("open_all", {
                    node: this.get_node(r)
                })
            }
        },
        close_all: function(e, t) {
            if (!e) {
                e = O.jstree.root
            }
            e = this.get_node(e);
            if (!e) {
                return false
            }
            var i = e.id === O.jstree.root ? this.get_container_ul() : this.get_node(e, true), r = this, s, a;
            if (i.length) {
                i = this.is_open(e) ? i.find(".jstree-open").addBack() : i.find(".jstree-open");
                O(i.get().reverse()).each(function() {
                    r.close_node(this, t || 0)
                })
            }
            for (s = 0,
                     a = e.children_d.length; s < a; s++) {
                this._model.data[e.children_d[s]].state.opened = false
            }
            this.trigger("close_all", {
                node: e
            })
        },
        is_disabled: function(e) {
            e = this.get_node(e);
            return e && e.state && e.state.disabled
        },
        enable_node: function(e) {
            var t, i;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         i = e.length; t < i; t++) {
                    this.enable_node(e[t])
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            e.state.disabled = false;
            this.get_node(e, true).children(".jstree-anchor").removeClass("jstree-disabled").attr("aria-disabled", false);
            this.trigger("enable_node", {
                node: e
            })
        },
        disable_node: function(e) {
            var t, i;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         i = e.length; t < i; t++) {
                    this.disable_node(e[t])
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            e.state.disabled = true;
            this.get_node(e, true).children(".jstree-anchor").addClass("jstree-disabled").attr("aria-disabled", true);
            this.trigger("disable_node", {
                node: e
            })
        },
        is_hidden: function(e) {
            e = this.get_node(e);
            return e.state.hidden === true
        },
        hide_node: function(e, t) {
            var i, r;
            if (O.isArray(e)) {
                e = e.slice();
                for (i = 0,
                         r = e.length; i < r; i++) {
                    this.hide_node(e[i], true)
                }
                if (!t) {
                    this.redraw()
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            if (!e.state.hidden) {
                e.state.hidden = true;
                this._node_changed(e.parent);
                if (!t) {
                    this.redraw()
                }
                this.trigger("hide_node", {
                    node: e
                })
            }
        },
        show_node: function(e, t) {
            var i, r;
            if (O.isArray(e)) {
                e = e.slice();
                for (i = 0,
                         r = e.length; i < r; i++) {
                    this.show_node(e[i], true)
                }
                if (!t) {
                    this.redraw()
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            if (e.state.hidden) {
                e.state.hidden = false;
                this._node_changed(e.parent);
                if (!t) {
                    this.redraw()
                }
                this.trigger("show_node", {
                    node: e
                })
            }
        },
        hide_all: function(e) {
            var t, i = this._model.data, r = [];
            for (t in i) {
                if (i.hasOwnProperty(t) && t !== O.jstree.root && !i[t].state.hidden) {
                    i[t].state.hidden = true;
                    r.push(t)
                }
            }
            this._model.force_full_redraw = true;
            if (!e) {
                this.redraw()
            }
            this.trigger("hide_all", {
                nodes: r
            });
            return r
        },
        show_all: function(e) {
            var t, i = this._model.data, r = [];
            for (t in i) {
                if (i.hasOwnProperty(t) && t !== O.jstree.root && i[t].state.hidden) {
                    i[t].state.hidden = false;
                    r.push(t)
                }
            }
            this._model.force_full_redraw = true;
            if (!e) {
                this.redraw()
            }
            this.trigger("show_all", {
                nodes: r
            });
            return r
        },
        activate_node: function(e, t) {
            if (this.is_disabled(e)) {
                return false
            }
            if (!t || typeof t !== "object") {
                t = {}
            }
            this._data.core.last_clicked = this._data.core.last_clicked && this._data.core.last_clicked.id !== S ? this.get_node(this._data.core.last_clicked.id) : null;
            if (this._data.core.last_clicked && !this._data.core.last_clicked.state.selected) {
                this._data.core.last_clicked = null
            }
            if (!this._data.core.last_clicked && this._data.core.selected.length) {
                this._data.core.last_clicked = this.get_node(this._data.core.selected[this._data.core.selected.length - 1])
            }
            if (!this.settings.core.multiple || !t.metaKey && !t.ctrlKey && !t.shiftKey || t.shiftKey && (!this._data.core.last_clicked || !this.get_parent(e) || this.get_parent(e) !== this._data.core.last_clicked.parent)) {
                if (!this.settings.core.multiple && (t.metaKey || t.ctrlKey || t.shiftKey) && this.is_selected(e)) {
                    this.deselect_node(e, false, t)
                } else {
                    this.deselect_all(true);
                    this.select_node(e, false, false, t);
                    this._data.core.last_clicked = this.get_node(e)
                }
            } else {
                if (t.shiftKey) {
                    var i = this.get_node(e).id, r = this._data.core.last_clicked.id, s = this.get_node(this._data.core.last_clicked.parent).children, a = false, n, o;
                    for (n = 0,
                             o = s.length; n < o; n += 1) {
                        if (s[n] === i) {
                            a = !a
                        }
                        if (s[n] === r) {
                            a = !a
                        }
                        if (!this.is_disabled(s[n]) && (a || s[n] === i || s[n] === r)) {
                            if (!this.is_hidden(s[n])) {
                                this.select_node(s[n], true, false, t)
                            }
                        } else {
                            this.deselect_node(s[n], true, t)
                        }
                    }
                    this.trigger("changed", {
                        action: "select_node",
                        node: this.get_node(e),
                        selected: this._data.core.selected,
                        event: t
                    })
                } else {
                    if (!this.is_selected(e)) {
                        this.select_node(e, false, false, t)
                    } else {
                        this.deselect_node(e, false, t)
                    }
                }
            }
            this.trigger("activate_node", {
                node: this.get_node(e),
                event: t
            })
        },
        hover_node: function(e) {
            e = this.get_node(e, true);
            if (!e || !e.length || e.children(".jstree-hovered").length) {
                return false
            }
            var t = this.element.find(".jstree-hovered")
                , i = this.element;
            if (t && t.length) {
                this.dehover_node(t)
            }
            e.children(".jstree-anchor").addClass("jstree-hovered");
            this.trigger("hover_node", {
                node: this.get_node(e)
            });
            setTimeout(function() {
                i.attr("aria-activedescendant", e[0].id)
            }, 0)
        },
        dehover_node: function(e) {
            e = this.get_node(e, true);
            if (!e || !e.length || !e.children(".jstree-hovered").length) {
                return false
            }
            e.children(".jstree-anchor").removeClass("jstree-hovered");
            this.trigger("dehover_node", {
                node: this.get_node(e)
            })
        },
        select_node: function(e, t, i, r) {
            var s, a, n, o;
            if (O.isArray(e)) {
                e = e.slice();
                for (a = 0,
                         n = e.length; a < n; a++) {
                    this.select_node(e[a], t, i, r)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            s = this.get_node(e, true);
            if (!e.state.selected) {
                e.state.selected = true;
                this._data.core.selected.push(e.id);
                if (!i) {
                    s = this._open_to(e)
                }
                if (s && s.length) {
                    s.attr("aria-selected", true).children(".jstree-anchor").addClass("jstree-clicked")
                }
                this.trigger("select_node", {
                    node: e,
                    selected: this._data.core.selected,
                    event: r
                });
                if (!t) {
                    this.trigger("changed", {
                        action: "select_node",
                        node: e,
                        selected: this._data.core.selected,
                        event: r
                    })
                }
            }
        },
        deselect_node: function(e, t, i) {
            var r, s, a;
            if (O.isArray(e)) {
                e = e.slice();
                for (r = 0,
                         s = e.length; r < s; r++) {
                    this.deselect_node(e[r], t, i)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            a = this.get_node(e, true);
            if (e.state.selected) {
                e.state.selected = false;
                this._data.core.selected = O.vakata.array_remove_item(this._data.core.selected, e.id);
                if (a.length) {
                    a.attr("aria-selected", false).children(".jstree-anchor").removeClass("jstree-clicked")
                }
                this.trigger("deselect_node", {
                    node: e,
                    selected: this._data.core.selected,
                    event: i
                });
                if (!t) {
                    this.trigger("changed", {
                        action: "deselect_node",
                        node: e,
                        selected: this._data.core.selected,
                        event: i
                    })
                }
            }
        },
        select_all: function(e) {
            var t = this._data.core.selected.concat([]), i, r;
            this._data.core.selected = this._model.data[O.jstree.root].children_d.concat();
            for (i = 0,
                     r = this._data.core.selected.length; i < r; i++) {
                if (this._model.data[this._data.core.selected[i]]) {
                    this._model.data[this._data.core.selected[i]].state.selected = true
                }
            }
            this.redraw(true);
            this.trigger("select_all", {
                selected: this._data.core.selected
            });
            if (!e) {
                this.trigger("changed", {
                    action: "select_all",
                    selected: this._data.core.selected,
                    old_selection: t
                })
            }
        },
        deselect_all: function(e) {
            var t = this._data.core.selected.concat([]), i, r;
            for (i = 0,
                     r = this._data.core.selected.length; i < r; i++) {
                if (this._model.data[this._data.core.selected[i]]) {
                    this._model.data[this._data.core.selected[i]].state.selected = false
                }
            }
            this._data.core.selected = [];
            this.element.find(".jstree-clicked").removeClass("jstree-clicked").parent().attr("aria-selected", false);
            this.trigger("deselect_all", {
                selected: this._data.core.selected,
                node: t
            });
            if (!e) {
                this.trigger("changed", {
                    action: "deselect_all",
                    selected: this._data.core.selected,
                    old_selection: t
                })
            }
        },
        is_selected: function(e) {
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            return e.state.selected
        },
        get_selected: function(e) {
            return e ? O.map(this._data.core.selected, O.proxy(function(e) {
                return this.get_node(e)
            }, this)) : this._data.core.selected.slice()
        },
        get_top_selected: function(e) {
            var t = this.get_selected(true), i = {}, r, s, a, n;
            for (r = 0,
                     s = t.length; r < s; r++) {
                i[t[r].id] = t[r]
            }
            for (r = 0,
                     s = t.length; r < s; r++) {
                for (a = 0,
                         n = t[r].children_d.length; a < n; a++) {
                    if (i[t[r].children_d[a]]) {
                        delete i[t[r].children_d[a]]
                    }
                }
            }
            t = [];
            for (r in i) {
                if (i.hasOwnProperty(r)) {
                    t.push(r)
                }
            }
            return e ? O.map(t, O.proxy(function(e) {
                return this.get_node(e)
            }, this)) : t
        },
        get_bottom_selected: function(e) {
            var t = this.get_selected(true), i = [], r, s;
            for (r = 0,
                     s = t.length; r < s; r++) {
                if (!t[r].children.length) {
                    i.push(t[r].id)
                }
            }
            return e ? O.map(i, O.proxy(function(e) {
                return this.get_node(e)
            }, this)) : i
        },
        get_state: function() {
            var e = {
                core: {
                    open: [],
                    loaded: [],
                    scroll: {
                        left: this.element.scrollLeft(),
                        top: this.element.scrollTop()
                    },
                    selected: []
                }
            }, t;
            for (t in this._model.data) {
                if (this._model.data.hasOwnProperty(t)) {
                    if (t !== O.jstree.root) {
                        if (this._model.data[t].state.loaded && this.settings.core.loaded_state) {
                            e.core.loaded.push(t)
                        }
                        if (this._model.data[t].state.opened) {
                            e.core.open.push(t)
                        }
                        if (this._model.data[t].state.selected) {
                            e.core.selected.push(t)
                        }
                    }
                }
            }
            return e
        },
        set_state: function(t, i) {
            if (t) {
                if (t.core && t.core.selected && t.core.initial_selection === S) {
                    t.core.initial_selection = this._data.core.selected.concat([]).sort().join(",")
                }
                if (t.core) {
                    var e, r, s, a, n;
                    if (t.core.loaded) {
                        if (!this.settings.core.loaded_state || !O.isArray(t.core.loaded) || !t.core.loaded.length) {
                            delete t.core.loaded;
                            this.set_state(t, i)
                        } else {
                            this._load_nodes(t.core.loaded, function(e) {
                                delete t.core.loaded;
                                this.set_state(t, i)
                            })
                        }
                        return false
                    }
                    if (t.core.open) {
                        if (!O.isArray(t.core.open) || !t.core.open.length) {
                            delete t.core.open;
                            this.set_state(t, i)
                        } else {
                            this._load_nodes(t.core.open, function(e) {
                                this.open_node(e, false, 0);
                                delete t.core.open;
                                this.set_state(t, i)
                            })
                        }
                        return false
                    }
                    if (t.core.scroll) {
                        if (t.core.scroll && t.core.scroll.left !== S) {
                            this.element.scrollLeft(t.core.scroll.left)
                        }
                        if (t.core.scroll && t.core.scroll.top !== S) {
                            this.element.scrollTop(t.core.scroll.top)
                        }
                        delete t.core.scroll;
                        this.set_state(t, i);
                        return false
                    }
                    if (t.core.selected) {
                        a = this;
                        if (t.core.initial_selection === S || t.core.initial_selection === this._data.core.selected.concat([]).sort().join(",")) {
                            this.deselect_all();
                            O.each(t.core.selected, function(e, t) {
                                a.select_node(t, false, true)
                            })
                        }
                        delete t.core.initial_selection;
                        delete t.core.selected;
                        this.set_state(t, i);
                        return false
                    }
                    for (n in t) {
                        if (t.hasOwnProperty(n) && n !== "core" && O.inArray(n, this.settings.plugins) === -1) {
                            delete t[n]
                        }
                    }
                    if (O.isEmptyObject(t.core)) {
                        delete t.core;
                        this.set_state(t, i);
                        return false
                    }
                }
                if (O.isEmptyObject(t)) {
                    t = null;
                    if (i) {
                        i.call(this)
                    }
                    this.trigger("set_state");
                    return false
                }
                return true
            }
            return false
        },
        refresh: function(e, t) {
            this._data.core.state = t === true ? {} : this.get_state();
            if (t && O.isFunction(t)) {
                this._data.core.state = t.call(this, this._data.core.state)
            }
            this._cnt = 0;
            this._model.data = {};
            this._model.data[O.jstree.root] = {
                id: O.jstree.root,
                parent: null,
                parents: [],
                children: [],
                children_d: [],
                state: {
                    loaded: false
                }
            };
            this._data.core.selected = [];
            this._data.core.last_clicked = null;
            this._data.core.focused = null;
            var i = this.get_container_ul()[0].className;
            if (!e) {
                this.element.html("<" + "ul class='" + i + "' role='group'><" + "li class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='treeitem' id='j" + this._id + "_loading'><i class='jstree-icon jstree-ocl'></i><" + "a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
                this.element.attr("aria-activedescendant", "j" + this._id + "_loading")
            }
            this.load_node(O.jstree.root, function(e, t) {
                if (t) {
                    this.get_container_ul()[0].className = i;
                    if (this._firstChild(this.get_container_ul()[0])) {
                        this.element.attr("aria-activedescendant", this._firstChild(this.get_container_ul()[0]).id)
                    }
                    this.set_state(O.extend(true, {}, this._data.core.state), function() {
                        this.trigger("refresh")
                    })
                }
                this._data.core.state = null
            })
        },
        refresh_node: function(t) {
            t = this.get_node(t);
            if (!t || t.id === O.jstree.root) {
                return false
            }
            var i = []
                , e = []
                , r = this._data.core.selected.concat([]);
            e.push(t.id);
            if (t.state.opened === true) {
                i.push(t.id)
            }
            this.get_node(t, true).find(".jstree-open").each(function() {
                e.push(this.id);
                i.push(this.id)
            });
            this._load_nodes(e, O.proxy(function(e) {
                this.open_node(i, false, 0);
                this.select_node(r);
                this.trigger("refresh_node", {
                    node: t,
                    nodes: e
                })
            }, this), false, true)
        },
        set_id: function(e, t) {
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            var i, r, s = this._model.data, a = e.id;
            t = t.toString();
            s[e.parent].children[O.inArray(e.id, s[e.parent].children)] = t;
            for (i = 0,
                     r = e.parents.length; i < r; i++) {
                s[e.parents[i]].children_d[O.inArray(e.id, s[e.parents[i]].children_d)] = t
            }
            for (i = 0,
                     r = e.children.length; i < r; i++) {
                s[e.children[i]].parent = t
            }
            for (i = 0,
                     r = e.children_d.length; i < r; i++) {
                s[e.children_d[i]].parents[O.inArray(e.id, s[e.children_d[i]].parents)] = t
            }
            i = O.inArray(e.id, this._data.core.selected);
            if (i !== -1) {
                this._data.core.selected[i] = t
            }
            i = this.get_node(e.id, true);
            if (i) {
                i.attr("id", t);
                if (this.element.attr("aria-activedescendant") === e.id) {
                    this.element.attr("aria-activedescendant", t)
                }
            }
            delete s[e.id];
            e.id = t;
            e.li_attr.id = t;
            s[t] = e;
            this.trigger("set_id", {
                node: e,
                new: e.id,
                old: a
            });
            return true
        },
        get_text: function(e) {
            e = this.get_node(e);
            return !e || e.id === O.jstree.root ? false : e.text
        },
        set_text: function(e, t) {
            var i, r;
            if (O.isArray(e)) {
                e = e.slice();
                for (i = 0,
                         r = e.length; i < r; i++) {
                    this.set_text(e[i], t)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            e.text = t;
            if (this.get_node(e, true).length) {
                this.redraw_node(e.id)
            }
            this.trigger("set_text", {
                obj: e,
                text: t
            });
            return true
        },
        get_json: function(e, t, i) {
            e = this.get_node(e || O.jstree.root);
            if (!e) {
                return false
            }
            if (t && t.flat && !i) {
                i = []
            }
            var r = {
                id: e.id,
                text: e.text,
                icon: this.get_icon(e),
                li_attr: O.extend(true, {}, e.li_attr),
                a_attr: O.extend(true, {}, e.a_attr),
                state: {},
                data: t && t.no_data ? false : O.extend(true, O.isArray(e.data) ? [] : {}, e.data)
            }, s, a;
            if (t && t.flat) {
                r.parent = e.parent
            } else {
                r.children = []
            }
            if (!t || !t.no_state) {
                for (s in e.state) {
                    if (e.state.hasOwnProperty(s)) {
                        r.state[s] = e.state[s]
                    }
                }
            } else {
                delete r.state
            }
            if (t && t.no_li_attr) {
                delete r.li_attr
            }
            if (t && t.no_a_attr) {
                delete r.a_attr
            }
            if (t && t.no_id) {
                delete r.id;
                if (r.li_attr && r.li_attr.id) {
                    delete r.li_attr.id
                }
                if (r.a_attr && r.a_attr.id) {
                    delete r.a_attr.id
                }
            }
            if (t && t.flat && e.id !== O.jstree.root) {
                i.push(r)
            }
            if (!t || !t.no_children) {
                for (s = 0,
                         a = e.children.length; s < a; s++) {
                    if (t && t.flat) {
                        this.get_json(e.children[s], t, i)
                    } else {
                        r.children.push(this.get_json(e.children[s], t))
                    }
                }
            }
            return t && t.flat ? i : e.id === O.jstree.root ? r.children : r
        },
        create_node: function(e, t, i, r, s) {
            if (e === null) {
                e = O.jstree.root
            }
            e = this.get_node(e);
            if (!e) {
                return false
            }
            i = i === S ? "last" : i;
            if (!i.toString().match(/^(before|after)$/) && !s && !this.is_loaded(e)) {
                return this.load_node(e, function() {
                    this.create_node(e, t, i, r, true)
                })
            }
            if (!t) {
                t = {
                    text: this.get_string("new_node")
                }
            }
            if (typeof t === "string") {
                t = {
                    text: t
                }
            } else {
                t = O.extend(true, {}, t)
            }
            if (t.text === S) {
                t.text = this.get_string("new_node")
            }
            var a, n, o, d;
            if (e.id === O.jstree.root) {
                if (i === "before") {
                    i = "first"
                }
                if (i === "after") {
                    i = "last"
                }
            }
            switch (i) {
                case "before":
                    a = this.get_node(e.parent);
                    i = O.inArray(e.id, a.children);
                    e = a;
                    break;
                case "after":
                    a = this.get_node(e.parent);
                    i = O.inArray(e.id, a.children) + 1;
                    e = a;
                    break;
                case "inside":
                case "first":
                    i = 0;
                    break;
                case "last":
                    i = e.children.length;
                    break;
                default:
                    if (!i) {
                        i = 0
                    }
                    break
            }
            if (i > e.children.length) {
                i = e.children.length
            }
            if (!t.id) {
                t.id = true
            }
            if (!this.check("create_node", t, e, i)) {
                this.settings.core.error.call(this, this._data.core.last_error);
                return false
            }
            if (t.id === true) {
                delete t.id
            }
            t = this._parse_model_from_json(t, e.id, e.parents.concat());
            if (!t) {
                return false
            }
            a = this.get_node(t);
            n = [];
            n.push(t);
            n = n.concat(a.children_d);
            this.trigger("model", {
                nodes: n,
                parent: e.id
            });
            e.children_d = e.children_d.concat(n);
            for (o = 0,
                     d = e.parents.length; o < d; o++) {
                this._model.data[e.parents[o]].children_d = this._model.data[e.parents[o]].children_d.concat(n)
            }
            t = a;
            a = [];
            for (o = 0,
                     d = e.children.length; o < d; o++) {
                a[o >= i ? o + 1 : o] = e.children[o]
            }
            a[i] = t.id;
            e.children = a;
            this.redraw_node(e, true);
            this.trigger("create_node", {
                node: this.get_node(t),
                parent: e.id,
                position: i
            });
            if (r) {
                r.call(this, this.get_node(t))
            }
            return t.id
        },
        rename_node: function(e, t) {
            var i, r, s;
            if (O.isArray(e)) {
                e = e.slice();
                for (i = 0,
                         r = e.length; i < r; i++) {
                    this.rename_node(e[i], t)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            s = e.text;
            if (!this.check("rename_node", e, this.get_parent(e), t)) {
                this.settings.core.error.call(this, this._data.core.last_error);
                return false
            }
            this.set_text(e, t);
            this.trigger("rename_node", {
                node: e,
                text: t,
                old: s
            });
            return true
        },
        delete_node: function(e) {
            var t, i, r, s, a, n, o, d, l, c, h, f;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         i = e.length; t < i; t++) {
                    this.delete_node(e[t])
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            r = this.get_node(e.parent);
            s = O.inArray(e.id, r.children);
            c = false;
            if (!this.check("delete_node", e, r, s)) {
                this.settings.core.error.call(this, this._data.core.last_error);
                return false
            }
            if (s !== -1) {
                r.children = O.vakata.array_remove(r.children, s)
            }
            a = e.children_d.concat([]);
            a.push(e.id);
            for (n = 0,
                     o = e.parents.length; n < o; n++) {
                this._model.data[e.parents[n]].children_d = O.vakata.array_filter(this._model.data[e.parents[n]].children_d, function(e) {
                    return O.inArray(e, a) === -1
                })
            }
            for (d = 0,
                     l = a.length; d < l; d++) {
                if (this._model.data[a[d]].state.selected) {
                    c = true;
                    break
                }
            }
            if (c) {
                this._data.core.selected = O.vakata.array_filter(this._data.core.selected, function(e) {
                    return O.inArray(e, a) === -1
                })
            }
            this.trigger("delete_node", {
                node: e,
                parent: r.id
            });
            if (c) {
                this.trigger("changed", {
                    action: "delete_node",
                    node: e,
                    selected: this._data.core.selected,
                    parent: r.id
                })
            }
            for (d = 0,
                     l = a.length; d < l; d++) {
                delete this._model.data[a[d]]
            }
            if (O.inArray(this._data.core.focused, a) !== -1) {
                this._data.core.focused = null;
                h = this.element[0].scrollTop;
                f = this.element[0].scrollLeft;
                if (r.id === O.jstree.root) {
                    if (this._model.data[O.jstree.root].children[0]) {
                        this.get_node(this._model.data[O.jstree.root].children[0], true).children(".jstree-anchor").focus()
                    }
                } else {
                    this.get_node(r, true).children(".jstree-anchor").focus()
                }
                this.element[0].scrollTop = h;
                this.element[0].scrollLeft = f
            }
            this.redraw_node(r, true);
            return true
        },
        check: function(e, t, i, r, s) {
            t = t && t.id ? t : this.get_node(t);
            i = i && i.id ? i : this.get_node(i);
            var a = e.match(/^move_node|copy_node|create_node$/i) ? i : t
                , n = this.settings.core.check_callback;
            if (e === "move_node" || e === "copy_node") {
                if ((!s || !s.is_multi) && (t.id === i.id || e === "move_node" && O.inArray(t.id, i.children) === r || O.inArray(i.id, t.children_d) !== -1)) {
                    this._data.core.last_error = {
                        error: "check",
                        plugin: "core",
                        id: "core_01",
                        reason: "Moving parent inside child",
                        data: JSON.stringify({
                            chk: e,
                            pos: r,
                            obj: t && t.id ? t.id : false,
                            par: i && i.id ? i.id : false
                        })
                    };
                    return false
                }
            }
            if (a && a.data) {
                a = a.data
            }
            if (a && a.functions && (a.functions[e] === false || a.functions[e] === true)) {
                if (a.functions[e] === false) {
                    this._data.core.last_error = {
                        error: "check",
                        plugin: "core",
                        id: "core_02",
                        reason: "Node data prevents function: " + e,
                        data: JSON.stringify({
                            chk: e,
                            pos: r,
                            obj: t && t.id ? t.id : false,
                            par: i && i.id ? i.id : false
                        })
                    }
                }
                return a.functions[e]
            }
            if (n === false || O.isFunction(n) && n.call(this, e, t, i, r, s) === false || n && n[e] === false) {
                this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_03",
                    reason: "User config for core.check_callback prevents function: " + e,
                    data: JSON.stringify({
                        chk: e,
                        pos: r,
                        obj: t && t.id ? t.id : false,
                        par: i && i.id ? i.id : false
                    })
                };
                return false
            }
            return true
        },
        last_error: function() {
            return this._data.core.last_error
        },
        move_node: function(e, t, i, r, s, a, n) {
            var o, d, l, c, h, f, _, u, g, p, m, v, j, y;
            t = this.get_node(t);
            i = i === S ? 0 : i;
            if (!t) {
                return false
            }
            if (!i.toString().match(/^(before|after)$/) && !s && !this.is_loaded(t)) {
                return this.load_node(t, function() {
                    this.move_node(e, t, i, r, true, false, n)
                })
            }
            if (O.isArray(e)) {
                if (e.length === 1) {
                    e = e[0]
                } else {
                    for (o = 0,
                             d = e.length; o < d; o++) {
                        if (g = this.move_node(e[o], t, i, r, s, false, n)) {
                            t = g;
                            i = "after"
                        }
                    }
                    this.redraw();
                    return true
                }
            }
            e = e && e.id ? e : this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            l = (e.parent || O.jstree.root).toString();
            h = !i.toString().match(/^(before|after)$/) || t.id === O.jstree.root ? t : this.get_node(t.parent);
            f = n ? n : this._model.data[e.id] ? this : O.jstree.reference(e.id);
            _ = !f || !f._id || this._id !== f._id;
            c = f && f._id && l && f._model.data[l] && f._model.data[l].children ? O.inArray(e.id, f._model.data[l].children) : -1;
            if (f && f._id) {
                e = f._model.data[e.id]
            }
            if (_) {
                if (g = this.copy_node(e, t, i, r, s, false, n)) {
                    if (f) {
                        f.delete_node(e)
                    }
                    return g
                }
                return false
            }
            if (t.id === O.jstree.root) {
                if (i === "before") {
                    i = "first"
                }
                if (i === "after") {
                    i = "last"
                }
            }
            switch (i) {
                case "before":
                    i = O.inArray(t.id, h.children);
                    break;
                case "after":
                    i = O.inArray(t.id, h.children) + 1;
                    break;
                case "inside":
                case "first":
                    i = 0;
                    break;
                case "last":
                    i = h.children.length;
                    break;
                default:
                    if (!i) {
                        i = 0
                    }
                    break
            }
            if (i > h.children.length) {
                i = h.children.length
            }
            if (!this.check("move_node", e, h, i, {
                core: true,
                origin: n,
                is_multi: f && f._id && f._id !== this._id,
                is_foreign: !f || !f._id
            })) {
                this.settings.core.error.call(this, this._data.core.last_error);
                return false
            }
            if (e.parent === h.id) {
                u = h.children.concat();
                g = O.inArray(e.id, u);
                if (g !== -1) {
                    u = O.vakata.array_remove(u, g);
                    if (i > g) {
                        i--
                    }
                }
                g = [];
                for (p = 0,
                         m = u.length; p < m; p++) {
                    g[p >= i ? p + 1 : p] = u[p]
                }
                g[i] = e.id;
                h.children = g;
                this._node_changed(h.id);
                this.redraw(h.id === O.jstree.root)
            } else {
                g = e.children_d.concat();
                g.push(e.id);
                for (p = 0,
                         m = e.parents.length; p < m; p++) {
                    u = [];
                    y = f._model.data[e.parents[p]].children_d;
                    for (v = 0,
                             j = y.length; v < j; v++) {
                        if (O.inArray(y[v], g) === -1) {
                            u.push(y[v])
                        }
                    }
                    f._model.data[e.parents[p]].children_d = u
                }
                f._model.data[l].children = O.vakata.array_remove_item(f._model.data[l].children, e.id);
                for (p = 0,
                         m = h.parents.length; p < m; p++) {
                    this._model.data[h.parents[p]].children_d = this._model.data[h.parents[p]].children_d.concat(g)
                }
                u = [];
                for (p = 0,
                         m = h.children.length; p < m; p++) {
                    u[p >= i ? p + 1 : p] = h.children[p]
                }
                u[i] = e.id;
                h.children = u;
                h.children_d.push(e.id);
                h.children_d = h.children_d.concat(e.children_d);
                e.parent = h.id;
                g = h.parents.concat();
                g.unshift(h.id);
                y = e.parents.length;
                e.parents = g;
                g = g.concat();
                for (p = 0,
                         m = e.children_d.length; p < m; p++) {
                    this._model.data[e.children_d[p]].parents = this._model.data[e.children_d[p]].parents.slice(0, y * -1);
                    Array.prototype.push.apply(this._model.data[e.children_d[p]].parents, g)
                }
                if (l === O.jstree.root || h.id === O.jstree.root) {
                    this._model.force_full_redraw = true
                }
                if (!this._model.force_full_redraw) {
                    this._node_changed(l);
                    this._node_changed(h.id)
                }
                if (!a) {
                    this.redraw()
                }
            }
            if (r) {
                r.call(this, e, h, i)
            }
            this.trigger("move_node", {
                node: e,
                parent: h.id,
                position: i,
                old_parent: l,
                old_position: c,
                is_multi: f && f._id && f._id !== this._id,
                is_foreign: !f || !f._id,
                old_instance: f,
                new_instance: this
            });
            return e.id
        },
        copy_node: function(e, t, i, r, s, a, n) {
            var o, d, l, c, h, f, _, u, g, p, m;
            t = this.get_node(t);
            i = i === S ? 0 : i;
            if (!t) {
                return false
            }
            if (!i.toString().match(/^(before|after)$/) && !s && !this.is_loaded(t)) {
                return this.load_node(t, function() {
                    this.copy_node(e, t, i, r, true, false, n)
                })
            }
            if (O.isArray(e)) {
                if (e.length === 1) {
                    e = e[0]
                } else {
                    for (o = 0,
                             d = e.length; o < d; o++) {
                        if (c = this.copy_node(e[o], t, i, r, s, true, n)) {
                            t = c;
                            i = "after"
                        }
                    }
                    this.redraw();
                    return true
                }
            }
            e = e && e.id ? e : this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            u = (e.parent || O.jstree.root).toString();
            g = !i.toString().match(/^(before|after)$/) || t.id === O.jstree.root ? t : this.get_node(t.parent);
            p = n ? n : this._model.data[e.id] ? this : O.jstree.reference(e.id);
            m = !p || !p._id || this._id !== p._id;
            if (p && p._id) {
                e = p._model.data[e.id]
            }
            if (t.id === O.jstree.root) {
                if (i === "before") {
                    i = "first"
                }
                if (i === "after") {
                    i = "last"
                }
            }
            switch (i) {
                case "before":
                    i = O.inArray(t.id, g.children);
                    break;
                case "after":
                    i = O.inArray(t.id, g.children) + 1;
                    break;
                case "inside":
                case "first":
                    i = 0;
                    break;
                case "last":
                    i = g.children.length;
                    break;
                default:
                    if (!i) {
                        i = 0
                    }
                    break
            }
            if (i > g.children.length) {
                i = g.children.length
            }
            if (!this.check("copy_node", e, g, i, {
                core: true,
                origin: n,
                is_multi: p && p._id && p._id !== this._id,
                is_foreign: !p || !p._id
            })) {
                this.settings.core.error.call(this, this._data.core.last_error);
                return false
            }
            _ = p ? p.get_json(e, {
                no_id: true,
                no_data: true,
                no_state: true
            }) : e;
            if (!_) {
                return false
            }
            if (_.id === true) {
                delete _.id
            }
            _ = this._parse_model_from_json(_, g.id, g.parents.concat());
            if (!_) {
                return false
            }
            c = this.get_node(_);
            if (e && e.state && e.state.loaded === false) {
                c.state.loaded = false
            }
            l = [];
            l.push(_);
            l = l.concat(c.children_d);
            this.trigger("model", {
                nodes: l,
                parent: g.id
            });
            for (h = 0,
                     f = g.parents.length; h < f; h++) {
                this._model.data[g.parents[h]].children_d = this._model.data[g.parents[h]].children_d.concat(l)
            }
            l = [];
            for (h = 0,
                     f = g.children.length; h < f; h++) {
                l[h >= i ? h + 1 : h] = g.children[h]
            }
            l[i] = c.id;
            g.children = l;
            g.children_d.push(c.id);
            g.children_d = g.children_d.concat(c.children_d);
            if (g.id === O.jstree.root) {
                this._model.force_full_redraw = true
            }
            if (!this._model.force_full_redraw) {
                this._node_changed(g.id)
            }
            if (!a) {
                this.redraw(g.id === O.jstree.root)
            }
            if (r) {
                r.call(this, c, g, i)
            }
            this.trigger("copy_node", {
                node: c,
                original: e,
                parent: g.id,
                position: i,
                old_parent: u,
                old_position: p && p._id && u && p._model.data[u] && p._model.data[u].children ? O.inArray(e.id, p._model.data[u].children) : -1,
                is_multi: p && p._id && p._id !== this._id,
                is_foreign: !p || !p._id,
                old_instance: p,
                new_instance: this
            });
            return c.id
        },
        cut: function(e) {
            if (!e) {
                e = this._data.core.selected.concat()
            }
            if (!O.isArray(e)) {
                e = [e]
            }
            if (!e.length) {
                return false
            }
            var t = [], i, r, s;
            for (r = 0,
                     s = e.length; r < s; r++) {
                i = this.get_node(e[r]);
                if (i && i.id && i.id !== O.jstree.root) {
                    t.push(i)
                }
            }
            if (!t.length) {
                return false
            }
            a = t;
            o = this;
            n = "move_node";
            this.trigger("cut", {
                node: e
            })
        },
        copy: function(e) {
            if (!e) {
                e = this._data.core.selected.concat()
            }
            if (!O.isArray(e)) {
                e = [e]
            }
            if (!e.length) {
                return false
            }
            var t = [], i, r, s;
            for (r = 0,
                     s = e.length; r < s; r++) {
                i = this.get_node(e[r]);
                if (i && i.id && i.id !== O.jstree.root) {
                    t.push(i)
                }
            }
            if (!t.length) {
                return false
            }
            a = t;
            o = this;
            n = "copy_node";
            this.trigger("copy", {
                node: e
            })
        },
        get_buffer: function() {
            return {
                mode: n,
                node: a,
                inst: o
            }
        },
        can_paste: function() {
            return n !== false && a !== false
        },
        paste: function(e, t) {
            e = this.get_node(e);
            if (!e || !n || !n.match(/^(copy_node|move_node)$/) || !a) {
                return false
            }
            if (this[n](a, e, t, false, false, false, o)) {
                this.trigger("paste", {
                    parent: e.id,
                    node: a,
                    mode: n
                })
            }
            a = false;
            n = false;
            o = false
        },
        clear_buffer: function() {
            a = false;
            n = false;
            o = false;
            this.trigger("clear_buffer")
        },
        edit: function(a, e, n) {
            var t, i, o, d, l, c, h, r, f, _ = false;
            a = this.get_node(a);
            if (!a) {
                return false
            }
            if (!this.check("edit", a, this.get_parent(a))) {
                this.settings.core.error.call(this, this._data.core.last_error);
                return false
            }
            f = a;
            e = typeof e === "string" ? e : a.text;
            this.set_text(a, "");
            a = this._open_to(a);
            f.text = e;
            t = this._data.core.rtl;
            i = this.element.width();
            this._data.core.focused = f.id;
            o = a.children(".jstree-anchor").focus();
            d = O("<span>");
            l = e;
            c = O("<" + "div />", {
                css: {
                    position: "absolute",
                    top: "-200px",
                    left: t ? "0px" : "-1000px",
                    visibility: "hidden"
                }
            }).appendTo(k.body);
            h = O("<" + "input />", {
                value: l,
                class: "jstree-rename-input",
                css: {
                    padding: "0",
                    border: "1px solid silver",
                    "box-sizing": "border-box",
                    display: "inline-block",
                    height: this._data.core.li_height + "px",
                    lineHeight: this._data.core.li_height + "px",
                    width: "150px"
                },
                blur: O.proxy(function(e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    var t = d.children(".jstree-rename-input"), i = t.val(), r = this.settings.core.force_text, s;
                    if (i === "") {
                        i = l
                    }
                    c.remove();
                    d.replaceWith(o);
                    d.remove();
                    l = r ? l : O("<div></div>").append(O.parseHTML(l)).html();
                    a = this.get_node(a);
                    this.set_text(a, l);
                    s = !!this.rename_node(a, r ? O("<div></div>").text(i).text() : O("<div></div>").append(O.parseHTML(i)).html());
                    if (!s) {
                        this.set_text(a, l)
                    }
                    this._data.core.focused = f.id;
                    setTimeout(O.proxy(function() {
                        var e = this.get_node(f.id, true);
                        if (e.length) {
                            this._data.core.focused = f.id;
                            e.children(".jstree-anchor").focus()
                        }
                    }, this), 0);
                    if (n) {
                        n.call(this, f, s, _)
                    }
                    h = null
                }, this),
                keydown: function(e) {
                    var t = e.which;
                    if (t === 27) {
                        _ = true;
                        this.value = l
                    }
                    if (t === 27 || t === 13 || t === 37 || t === 38 || t === 39 || t === 40 || t === 32) {
                        e.stopImmediatePropagation()
                    }
                    if (t === 27 || t === 13) {
                        e.preventDefault();
                        this.blur()
                    }
                },
                click: function(e) {
                    e.stopImmediatePropagation()
                },
                mousedown: function(e) {
                    e.stopImmediatePropagation()
                },
                keyup: function(e) {
                    h.width(Math.min(c.text("pW" + this.value).width(), i))
                },
                keypress: function(e) {
                    if (e.which === 13) {
                        return false
                    }
                }
            });
            r = {
                fontFamily: o.css("fontFamily") || "",
                fontSize: o.css("fontSize") || "",
                fontWeight: o.css("fontWeight") || "",
                fontStyle: o.css("fontStyle") || "",
                fontStretch: o.css("fontStretch") || "",
                fontVariant: o.css("fontVariant") || "",
                letterSpacing: o.css("letterSpacing") || "",
                wordSpacing: o.css("wordSpacing") || ""
            };
            d.attr("class", o.attr("class")).append(o.contents().clone()).append(h);
            o.replaceWith(d);
            c.css(r);
            h.css(r).width(Math.min(c.text("pW" + h[0].value).width(), i))[0].select();
            O(k).one("mousedown.jstree touchstart.jstree dnd_start.vakata", function(e) {
                if (h && e.target !== h) {
                    O(h).blur()
                }
            })
        },
        set_theme: function(e, t) {
            if (!e) {
                return false
            }
            if (t === true) {
                var i = this.settings.core.themes.dir;
                if (!i) {
                    i = O.jstree.path + "/themes"
                }
                t = i + "/" + e + "/style.css"
            }
            if (t && O.inArray(t, r) === -1) {
                O("head").append("<" + 'link rel="stylesheet" href="' + t + '" type="text/css" />');
                r.push(t)
            }
            if (this._data.core.themes.name) {
                this.element.removeClass("jstree-" + this._data.core.themes.name)
            }
            this._data.core.themes.name = e;
            this.element.addClass("jstree-" + e);
            this.element[this.settings.core.themes.responsive ? "addClass" : "removeClass"]("jstree-" + e + "-responsive");
            this.trigger("set_theme", {
                theme: e
            })
        },
        get_theme: function() {
            return this._data.core.themes.name
        },
        set_theme_variant: function(e) {
            if (this._data.core.themes.variant) {
                this.element.removeClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant)
            }
            this._data.core.themes.variant = e;
            if (e) {
                this.element.addClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant)
            }
        },
        get_theme_variant: function() {
            return this._data.core.themes.variant
        },
        show_stripes: function() {
            this._data.core.themes.stripes = true;
            this.get_container_ul().addClass("jstree-striped");
            this.trigger("show_stripes")
        },
        hide_stripes: function() {
            this._data.core.themes.stripes = false;
            this.get_container_ul().removeClass("jstree-striped");
            this.trigger("hide_stripes")
        },
        toggle_stripes: function() {
            if (this._data.core.themes.stripes) {
                this.hide_stripes()
            } else {
                this.show_stripes()
            }
        },
        show_dots: function() {
            this._data.core.themes.dots = true;
            this.get_container_ul().removeClass("jstree-no-dots");
            this.trigger("show_dots")
        },
        hide_dots: function() {
            this._data.core.themes.dots = false;
            this.get_container_ul().addClass("jstree-no-dots");
            this.trigger("hide_dots")
        },
        toggle_dots: function() {
            if (this._data.core.themes.dots) {
                this.hide_dots()
            } else {
                this.show_dots()
            }
        },
        show_icons: function() {
            this._data.core.themes.icons = true;
            this.get_container_ul().removeClass("jstree-no-icons");
            this.trigger("show_icons")
        },
        hide_icons: function() {
            this._data.core.themes.icons = false;
            this.get_container_ul().addClass("jstree-no-icons");
            this.trigger("hide_icons")
        },
        toggle_icons: function() {
            if (this._data.core.themes.icons) {
                this.hide_icons()
            } else {
                this.show_icons()
            }
        },
        show_ellipsis: function() {
            this._data.core.themes.ellipsis = true;
            this.get_container_ul().addClass("jstree-ellipsis");
            this.trigger("show_ellipsis")
        },
        hide_ellipsis: function() {
            this._data.core.themes.ellipsis = false;
            this.get_container_ul().removeClass("jstree-ellipsis");
            this.trigger("hide_ellipsis")
        },
        toggle_ellipsis: function() {
            if (this._data.core.themes.ellipsis) {
                this.hide_ellipsis()
            } else {
                this.show_ellipsis()
            }
        },
        set_icon: function(e, t) {
            var i, r, s, a;
            if (O.isArray(e)) {
                e = e.slice();
                for (i = 0,
                         r = e.length; i < r; i++) {
                    this.set_icon(e[i], t)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            a = e.icon;
            e.icon = t === true || t === null || t === S || t === "" ? true : t;
            s = this.get_node(e, true).children(".jstree-anchor").children(".jstree-themeicon");
            if (t === false) {
                s.removeClass("jstree-themeicon-custom " + a).css("background", "").removeAttr("rel");
                this.hide_icon(e)
            } else if (t === true || t === null || t === S || t === "") {
                s.removeClass("jstree-themeicon-custom " + a).css("background", "").removeAttr("rel");
                if (a === false) {
                    this.show_icon(e)
                }
            } else if (t.indexOf("/") === -1 && t.indexOf(".") === -1) {
                s.removeClass(a).css("background", "");
                s.addClass(t + " jstree-themeicon-custom").attr("rel", t);
                if (a === false) {
                    this.show_icon(e)
                }
            } else {
                s.removeClass(a).css("background", "");
                s.addClass("jstree-themeicon-custom").css("background", "url('" + t + "') center center no-repeat").attr("rel", t);
                if (a === false) {
                    this.show_icon(e)
                }
            }
            return true
        },
        get_icon: function(e) {
            e = this.get_node(e);
            return !e || e.id === O.jstree.root ? false : e.icon
        },
        hide_icon: function(e) {
            var t, i;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         i = e.length; t < i; t++) {
                    this.hide_icon(e[t])
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e === O.jstree.root) {
                return false
            }
            e.icon = false;
            this.get_node(e, true).children(".jstree-anchor").children(".jstree-themeicon").addClass("jstree-themeicon-hidden");
            return true
        },
        show_icon: function(e) {
            var t, i, r;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         i = e.length; t < i; t++) {
                    this.show_icon(e[t])
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e === O.jstree.root) {
                return false
            }
            r = this.get_node(e, true);
            e.icon = r.length ? r.children(".jstree-anchor").children(".jstree-themeicon").attr("rel") : true;
            if (!e.icon) {
                e.icon = true
            }
            r.children(".jstree-anchor").children(".jstree-themeicon").removeClass("jstree-themeicon-hidden");
            return true
        }
    };
    O.vakata = {};
    O.vakata.attributes = function(e, i) {
        e = O(e)[0];
        var r = i ? {} : [];
        if (e && e.attributes) {
            O.each(e.attributes, function(e, t) {
                if (O.inArray(t.name.toLowerCase(), ["style", "contenteditable", "hasfocus", "tabindex"]) !== -1) {
                    return
                }
                if (t.value !== null && O.trim(t.value) !== "") {
                    if (i) {
                        r[t.name] = t.value
                    } else {
                        r.push(t.name)
                    }
                }
            })
        }
        return r
    }
    ;
    O.vakata.array_unique = function(e) {
        var t = [], i, r, s, a = {};
        for (i = 0,
                 s = e.length; i < s; i++) {
            if (a[e[i]] === S) {
                t.push(e[i]);
                a[e[i]] = true
            }
        }
        return t
    }
    ;
    O.vakata.array_remove = function(e, t) {
        e.splice(t, 1);
        return e
    }
    ;
    O.vakata.array_remove_item = function(e, t) {
        var i = O.inArray(t, e);
        return i !== -1 ? O.vakata.array_remove(e, i) : e
    }
    ;
    O.vakata.array_filter = function(e, t, i, r, s) {
        if (e.filter) {
            return e.filter(t, i)
        }
        r = [];
        for (s in e) {
            if (~~s + "" === s + "" && s >= 0 && t.call(i, e[s], +s, e)) {
                r.push(e[s])
            }
        }
        return r
    }
    ;
    O.jstree.plugins.changed = function(e, a) {
        var n = [];
        this.trigger = function(e, t) {
            var i, r;
            if (!t) {
                t = {}
            }
            if (e.replace(".jstree", "") === "changed") {
                t.changed = {
                    selected: [],
                    deselected: []
                };
                var s = {};
                for (i = 0,
                         r = n.length; i < r; i++) {
                    s[n[i]] = 1
                }
                for (i = 0,
                         r = t.selected.length; i < r; i++) {
                    if (!s[t.selected[i]]) {
                        t.changed.selected.push(t.selected[i])
                    } else {
                        s[t.selected[i]] = 2
                    }
                }
                for (i = 0,
                         r = n.length; i < r; i++) {
                    if (s[n[i]] === 1) {
                        t.changed.deselected.push(n[i])
                    }
                }
                n = t.selected.slice()
            }
            a.trigger.call(this, e, t)
        }
        ;
        this.refresh = function(e, t) {
            n = [];
            return a.refresh.apply(this, arguments)
        }
    }
    ;
    var l = k.createElement("I");
    l.className = "jstree-icon jstree-checkbox";
    l.setAttribute("role", "presentation");
    O.jstree.defaults.checkbox = {
        visible: true,
        three_state: true,
        whole_node: true,
        keep_selected_style: true,
        cascade: "",
        tie_selection: true,
        cascade_to_disabled: true,
        cascade_to_hidden: true
    };
    O.jstree.plugins.checkbox = function(e, d) {
        this.bind = function() {
            d.bind.call(this);
            this._data.checkbox.uto = false;
            this._data.checkbox.selected = [];
            if (this.settings.checkbox.three_state) {
                this.settings.checkbox.cascade = "up+down+undetermined"
            }
            this.element.on("init.jstree", O.proxy(function() {
                this._data.checkbox.visible = this.settings.checkbox.visible;
                if (!this.settings.checkbox.keep_selected_style) {
                    this.element.addClass("jstree-checkbox-no-clicked")
                }
                if (this.settings.checkbox.tie_selection) {
                    this.element.addClass("jstree-checkbox-selection")
                }
            }, this)).on("loading.jstree", O.proxy(function() {
                this[this._data.checkbox.visible ? "show_checkboxes" : "hide_checkboxes"]()
            }, this));
            if (this.settings.checkbox.cascade.indexOf("undetermined") !== -1) {
                this.element.on("changed.jstree uncheck_node.jstree check_node.jstree uncheck_all.jstree check_all.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree", O.proxy(function() {
                    if (this._data.checkbox.uto) {
                        clearTimeout(this._data.checkbox.uto)
                    }
                    this._data.checkbox.uto = setTimeout(O.proxy(this._undetermined, this), 50)
                }, this))
            }
            if (!this.settings.checkbox.tie_selection) {
                this.element.on("model.jstree", O.proxy(function(e, t) {
                    var i = this._model.data, r = i[t.parent], s = t.nodes, a, n;
                    for (a = 0,
                             n = s.length; a < n; a++) {
                        i[s[a]].state.checked = i[s[a]].state.checked || i[s[a]].original && i[s[a]].original.state && i[s[a]].original.state.checked;
                        if (i[s[a]].state.checked) {
                            this._data.checkbox.selected.push(s[a])
                        }
                    }
                }, this))
            }
            if (this.settings.checkbox.cascade.indexOf("up") !== -1 || this.settings.checkbox.cascade.indexOf("down") !== -1) {
                this.element.on("model.jstree", O.proxy(function(e, t) {
                    var i = this._model.data, r = i[t.parent], s = t.nodes, a = [], n, o, d, l, c, h, f = this.settings.checkbox.cascade, _ = this.settings.checkbox.tie_selection;
                    if (f.indexOf("down") !== -1) {
                        if (r.state[_ ? "selected" : "checked"]) {
                            for (o = 0,
                                     d = s.length; o < d; o++) {
                                i[s[o]].state[_ ? "selected" : "checked"] = true
                            }
                            this._data[_ ? "core" : "checkbox"].selected = this._data[_ ? "core" : "checkbox"].selected.concat(s)
                        } else {
                            for (o = 0,
                                     d = s.length; o < d; o++) {
                                if (i[s[o]].state[_ ? "selected" : "checked"]) {
                                    for (l = 0,
                                             c = i[s[o]].children_d.length; l < c; l++) {
                                        i[i[s[o]].children_d[l]].state[_ ? "selected" : "checked"] = true
                                    }
                                    this._data[_ ? "core" : "checkbox"].selected = this._data[_ ? "core" : "checkbox"].selected.concat(i[s[o]].children_d)
                                }
                            }
                        }
                    }
                    if (f.indexOf("up") !== -1) {
                        for (o = 0,
                                 d = r.children_d.length; o < d; o++) {
                            if (!i[r.children_d[o]].children.length) {
                                a.push(i[r.children_d[o]].parent)
                            }
                        }
                        a = O.vakata.array_unique(a);
                        for (l = 0,
                                 c = a.length; l < c; l++) {
                            r = i[a[l]];
                            while (r && r.id !== O.jstree.root) {
                                n = 0;
                                for (o = 0,
                                         d = r.children.length; o < d; o++) {
                                    n += i[r.children[o]].state[_ ? "selected" : "checked"]
                                }
                                if (n === d) {
                                    r.state[_ ? "selected" : "checked"] = true;
                                    this._data[_ ? "core" : "checkbox"].selected.push(r.id);
                                    h = this.get_node(r, true);
                                    if (h && h.length) {
                                        h.attr("aria-selected", true).children(".jstree-anchor").addClass(_ ? "jstree-clicked" : "jstree-checked")
                                    }
                                } else {
                                    break
                                }
                                r = this.get_node(r.parent)
                            }
                        }
                    }
                    this._data[_ ? "core" : "checkbox"].selected = O.vakata.array_unique(this._data[_ ? "core" : "checkbox"].selected)
                }, this)).on(this.settings.checkbox.tie_selection ? "select_node.jstree" : "check_node.jstree", O.proxy(function(e, t) {
                    var i = this, r = t.node, s = this._model.data, a = this.get_node(r.parent), n, o, d, l, c = this.settings.checkbox.cascade, h = this.settings.checkbox.tie_selection, f = {}, _ = this._data[h ? "core" : "checkbox"].selected;
                    for (n = 0,
                             o = _.length; n < o; n++) {
                        f[_[n]] = true
                    }
                    if (c.indexOf("down") !== -1) {
                        var u = this._cascade_new_checked_state(r.id, true);
                        var g = r.children_d.concat(r.id);
                        for (n = 0,
                                 o = g.length; n < o; n++) {
                            if (u.indexOf(g[n]) > -1) {
                                f[g[n]] = true
                            } else {
                                delete f[g[n]]
                            }
                        }
                    }
                    if (c.indexOf("up") !== -1) {
                        while (a && a.id !== O.jstree.root) {
                            d = 0;
                            for (n = 0,
                                     o = a.children.length; n < o; n++) {
                                d += s[a.children[n]].state[h ? "selected" : "checked"]
                            }
                            if (d === o) {
                                a.state[h ? "selected" : "checked"] = true;
                                f[a.id] = true;
                                l = this.get_node(a, true);
                                if (l && l.length) {
                                    l.attr("aria-selected", true).children(".jstree-anchor").addClass(h ? "jstree-clicked" : "jstree-checked")
                                }
                            } else {
                                break
                            }
                            a = this.get_node(a.parent)
                        }
                    }
                    _ = [];
                    for (n in f) {
                        if (f.hasOwnProperty(n)) {
                            _.push(n)
                        }
                    }
                    this._data[h ? "core" : "checkbox"].selected = _
                }, this)).on(this.settings.checkbox.tie_selection ? "deselect_all.jstree" : "uncheck_all.jstree", O.proxy(function(e, t) {
                    var i = this.get_node(O.jstree.root), r = this._model.data, s, a, n;
                    for (s = 0,
                             a = i.children_d.length; s < a; s++) {
                        n = r[i.children_d[s]];
                        if (n && n.original && n.original.state && n.original.state.undetermined) {
                            n.original.state.undetermined = false
                        }
                    }
                }, this)).on(this.settings.checkbox.tie_selection ? "deselect_node.jstree" : "uncheck_node.jstree", O.proxy(function(e, t) {
                    var i = this, r = t.node, s = this.get_node(r, true), a, n, o, d = this.settings.checkbox.cascade, l = this.settings.checkbox.tie_selection, c = this._data[l ? "core" : "checkbox"].selected, h = {}, f = [], _ = r.children_d.concat(r.id);
                    if (d.indexOf("down") !== -1) {
                        var u = this._cascade_new_checked_state(r.id, false);
                        c = c.filter(function(e) {
                            return _.indexOf(e) === -1 || u.indexOf(e) > -1
                        })
                    }
                    if (d.indexOf("up") !== -1 && c.indexOf(r.id) === -1) {
                        for (a = 0,
                                 n = r.parents.length; a < n; a++) {
                            o = this._model.data[r.parents[a]];
                            o.state[l ? "selected" : "checked"] = false;
                            if (o && o.original && o.original.state && o.original.state.undetermined) {
                                o.original.state.undetermined = false
                            }
                            o = this.get_node(r.parents[a], true);
                            if (o && o.length) {
                                o.attr("aria-selected", false).children(".jstree-anchor").removeClass(l ? "jstree-clicked" : "jstree-checked")
                            }
                        }
                        c = c.filter(function(e) {
                            return r.parents.indexOf(e) === -1
                        })
                    }
                    this._data[l ? "core" : "checkbox"].selected = c
                }, this))
            }
            if (this.settings.checkbox.cascade.indexOf("up") !== -1) {
                this.element.on("delete_node.jstree", O.proxy(function(e, t) {
                    var i = this.get_node(t.parent), r = this._model.data, s, a, n, o, d = this.settings.checkbox.tie_selection;
                    while (i && i.id !== O.jstree.root && !i.state[d ? "selected" : "checked"]) {
                        n = 0;
                        for (s = 0,
                                 a = i.children.length; s < a; s++) {
                            n += r[i.children[s]].state[d ? "selected" : "checked"]
                        }
                        if (a > 0 && n === a) {
                            i.state[d ? "selected" : "checked"] = true;
                            this._data[d ? "core" : "checkbox"].selected.push(i.id);
                            o = this.get_node(i, true);
                            if (o && o.length) {
                                o.attr("aria-selected", true).children(".jstree-anchor").addClass(d ? "jstree-clicked" : "jstree-checked")
                            }
                        } else {
                            break
                        }
                        i = this.get_node(i.parent)
                    }
                }, this)).on("move_node.jstree", O.proxy(function(e, t) {
                    var i = t.is_multi, r = t.old_parent, s = this.get_node(t.parent), a = this._model.data, n, o, d, l, c, h = this.settings.checkbox.tie_selection;
                    if (!i) {
                        n = this.get_node(r);
                        while (n && n.id !== O.jstree.root && !n.state[h ? "selected" : "checked"]) {
                            o = 0;
                            for (d = 0,
                                     l = n.children.length; d < l; d++) {
                                o += a[n.children[d]].state[h ? "selected" : "checked"]
                            }
                            if (l > 0 && o === l) {
                                n.state[h ? "selected" : "checked"] = true;
                                this._data[h ? "core" : "checkbox"].selected.push(n.id);
                                c = this.get_node(n, true);
                                if (c && c.length) {
                                    c.attr("aria-selected", true).children(".jstree-anchor").addClass(h ? "jstree-clicked" : "jstree-checked")
                                }
                            } else {
                                break
                            }
                            n = this.get_node(n.parent)
                        }
                    }
                    n = s;
                    while (n && n.id !== O.jstree.root) {
                        o = 0;
                        for (d = 0,
                                 l = n.children.length; d < l; d++) {
                            o += a[n.children[d]].state[h ? "selected" : "checked"]
                        }
                        if (o === l) {
                            if (!n.state[h ? "selected" : "checked"]) {
                                n.state[h ? "selected" : "checked"] = true;
                                this._data[h ? "core" : "checkbox"].selected.push(n.id);
                                c = this.get_node(n, true);
                                if (c && c.length) {
                                    c.attr("aria-selected", true).children(".jstree-anchor").addClass(h ? "jstree-clicked" : "jstree-checked")
                                }
                            }
                        } else {
                            if (n.state[h ? "selected" : "checked"]) {
                                n.state[h ? "selected" : "checked"] = false;
                                this._data[h ? "core" : "checkbox"].selected = O.vakata.array_remove_item(this._data[h ? "core" : "checkbox"].selected, n.id);
                                c = this.get_node(n, true);
                                if (c && c.length) {
                                    c.attr("aria-selected", false).children(".jstree-anchor").removeClass(h ? "jstree-clicked" : "jstree-checked")
                                }
                            } else {
                                break
                            }
                        }
                        n = this.get_node(n.parent)
                    }
                }, this))
            }
        }
        ;
        this.get_undetermined = function(e) {
            if (this.settings.checkbox.cascade.indexOf("undetermined") === -1) {
                return []
            }
            var i, r, s, a, n = {}, o = this._model.data, t = this.settings.checkbox.tie_selection, d = this._data[t ? "core" : "checkbox"].selected, l = [], c = this, h = [];
            for (i = 0,
                     r = d.length; i < r; i++) {
                if (o[d[i]] && o[d[i]].parents) {
                    for (s = 0,
                             a = o[d[i]].parents.length; s < a; s++) {
                        if (n[o[d[i]].parents[s]] !== S) {
                            break
                        }
                        if (o[d[i]].parents[s] !== O.jstree.root) {
                            n[o[d[i]].parents[s]] = true;
                            l.push(o[d[i]].parents[s])
                        }
                    }
                }
            }
            this.element.find(".jstree-closed").not(":has(.jstree-children)").each(function() {
                var e = c.get_node(this), t;
                if (!e) {
                    return
                }
                if (!e.state.loaded) {
                    if (e.original && e.original.state && e.original.state.undetermined && e.original.state.undetermined === true) {
                        if (n[e.id] === S && e.id !== O.jstree.root) {
                            n[e.id] = true;
                            l.push(e.id)
                        }
                        for (s = 0,
                                 a = e.parents.length; s < a; s++) {
                            if (n[e.parents[s]] === S && e.parents[s] !== O.jstree.root) {
                                n[e.parents[s]] = true;
                                l.push(e.parents[s])
                            }
                        }
                    }
                } else {
                    for (i = 0,
                             r = e.children_d.length; i < r; i++) {
                        t = o[e.children_d[i]];
                        if (!t.state.loaded && t.original && t.original.state && t.original.state.undetermined && t.original.state.undetermined === true) {
                            if (n[t.id] === S && t.id !== O.jstree.root) {
                                n[t.id] = true;
                                l.push(t.id)
                            }
                            for (s = 0,
                                     a = t.parents.length; s < a; s++) {
                                if (n[t.parents[s]] === S && t.parents[s] !== O.jstree.root) {
                                    n[t.parents[s]] = true;
                                    l.push(t.parents[s])
                                }
                            }
                        }
                    }
                }
            });
            for (i = 0,
                     r = l.length; i < r; i++) {
                if (!o[l[i]].state[t ? "selected" : "checked"]) {
                    h.push(e ? o[l[i]] : l[i])
                }
            }
            return h
        }
        ;
        this._undetermined = function() {
            if (this.element === null) {
                return
            }
            var e = this.get_undetermined(false), t, i, r;
            this.element.find(".jstree-undetermined").removeClass("jstree-undetermined");
            for (t = 0,
                     i = e.length; t < i; t++) {
                r = this.get_node(e[t], true);
                if (r && r.length) {
                    r.children(".jstree-anchor").children(".jstree-checkbox").addClass("jstree-undetermined")
                }
            }
        }
        ;
        this.redraw_node = function(e, t, i, r) {
            e = d.redraw_node.apply(this, arguments);
            if (e) {
                var s, a, n = null, o = null;
                for (s = 0,
                         a = e.childNodes.length; s < a; s++) {
                    if (e.childNodes[s] && e.childNodes[s].className && e.childNodes[s].className.indexOf("jstree-anchor") !== -1) {
                        n = e.childNodes[s];
                        break
                    }
                }
                if (n) {
                    if (!this.settings.checkbox.tie_selection && this._model.data[e.id].state.checked) {
                        n.className += " jstree-checked"
                    }
                    o = l.cloneNode(false);
                    if (this._model.data[e.id].state.checkbox_disabled) {
                        o.className += " jstree-checkbox-disabled"
                    }
                    n.insertBefore(o, n.childNodes[0])
                }
            }
            if (!i && this.settings.checkbox.cascade.indexOf("undetermined") !== -1) {
                if (this._data.checkbox.uto) {
                    clearTimeout(this._data.checkbox.uto)
                }
                this._data.checkbox.uto = setTimeout(O.proxy(this._undetermined, this), 50)
            }
            return e
        }
        ;
        this.show_checkboxes = function() {
            this._data.core.themes.checkboxes = true;
            this.get_container_ul().removeClass("jstree-no-checkboxes")
        }
        ;
        this.hide_checkboxes = function() {
            this._data.core.themes.checkboxes = false;
            this.get_container_ul().addClass("jstree-no-checkboxes")
        }
        ;
        this.toggle_checkboxes = function() {
            if (this._data.core.themes.checkboxes) {
                this.hide_checkboxes()
            } else {
                this.show_checkboxes()
            }
        }
        ;
        this.is_undetermined = function(e) {
            e = this.get_node(e);
            var t = this.settings.checkbox.cascade, i, r, s = this.settings.checkbox.tie_selection, a = this._data[s ? "core" : "checkbox"].selected, n = this._model.data;
            if (!e || e.state[s ? "selected" : "checked"] === true || t.indexOf("undetermined") === -1 || t.indexOf("down") === -1 && t.indexOf("up") === -1) {
                return false
            }
            if (!e.state.loaded && e.original.state.undetermined === true) {
                return true
            }
            for (i = 0,
                     r = e.children_d.length; i < r; i++) {
                if (O.inArray(e.children_d[i], a) !== -1 || !n[e.children_d[i]].state.loaded && n[e.children_d[i]].original.state.undetermined) {
                    return true
                }
            }
            return false
        }
        ;
        this.disable_checkbox = function(e) {
            var t, i, r;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         i = e.length; t < i; t++) {
                    this.disable_checkbox(e[t])
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            r = this.get_node(e, true);
            if (!e.state.checkbox_disabled) {
                e.state.checkbox_disabled = true;
                if (r && r.length) {
                    r.children(".jstree-anchor").children(".jstree-checkbox").addClass("jstree-checkbox-disabled")
                }
                this.trigger("disable_checkbox", {
                    node: e
                })
            }
        }
        ;
        this.enable_checkbox = function(e) {
            var t, i, r;
            if (O.isArray(e)) {
                e = e.slice();
                for (t = 0,
                         i = e.length; t < i; t++) {
                    this.enable_checkbox(e[t])
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            r = this.get_node(e, true);
            if (e.state.checkbox_disabled) {
                e.state.checkbox_disabled = false;
                if (r && r.length) {
                    r.children(".jstree-anchor").children(".jstree-checkbox").removeClass("jstree-checkbox-disabled")
                }
                this.trigger("enable_checkbox", {
                    node: e
                })
            }
        }
        ;
        this.activate_node = function(e, t) {
            if (O(t.target).hasClass("jstree-checkbox-disabled")) {
                return false
            }
            if (this.settings.checkbox.tie_selection && (this.settings.checkbox.whole_node || O(t.target).hasClass("jstree-checkbox"))) {
                t.ctrlKey = true
            }
            if (this.settings.checkbox.tie_selection || !this.settings.checkbox.whole_node && !O(t.target).hasClass("jstree-checkbox")) {
                return d.activate_node.call(this, e, t)
            }
            if (this.is_disabled(e)) {
                return false
            }
            if (this.is_checked(e)) {
                this.uncheck_node(e, t)
            } else {
                this.check_node(e, t)
            }
            this.trigger("activate_node", {
                node: this.get_node(e)
            })
        }
        ;
        this._cascade_new_checked_state = function(e, t) {
            var i = this;
            var r = this.settings.checkbox.tie_selection;
            var s = this._model.data[e];
            var a = [];
            var n = [], o, d, l;
            if ((this.settings.checkbox.cascade_to_disabled || !s.state.disabled) && (this.settings.checkbox.cascade_to_hidden || !s.state.hidden)) {
                if (s.children) {
                    for (o = 0,
                             d = s.children.length; o < d; o++) {
                        var c = s.children[o];
                        l = i._cascade_new_checked_state(c, t);
                        a = a.concat(l);
                        if (l.indexOf(c) > -1) {
                            n.push(c)
                        }
                    }
                }
                var h = i.get_node(s, true);
                var f = n.length > 0 && n.length < s.children.length;
                if (s.original && s.original.state && s.original.state.undetermined) {
                    s.original.state.undetermined = f
                }
                if (f) {
                    s.state[r ? "selected" : "checked"] = false;
                    h.attr("aria-selected", false).children(".jstree-anchor").removeClass(r ? "jstree-clicked" : "jstree-checked")
                } else if (t && n.length === s.children.length) {
                    s.state[r ? "selected" : "checked"] = t;
                    a.push(s.id);
                    h.attr("aria-selected", true).children(".jstree-anchor").addClass(r ? "jstree-clicked" : "jstree-checked")
                } else {
                    s.state[r ? "selected" : "checked"] = false;
                    h.attr("aria-selected", false).children(".jstree-anchor").removeClass(r ? "jstree-clicked" : "jstree-checked")
                }
            } else {
                l = this.get_checked_descendants(e);
                if (s.state[r ? "selected" : "checked"]) {
                    l.push(s.id)
                }
                a = a.concat(l)
            }
            return a
        }
        ;
        this.get_checked_descendants = function(e) {
            var t = this;
            var i = t.settings.checkbox.tie_selection;
            var r = t._model.data[e];
            return r.children_d.filter(function(e) {
                return t._model.data[e].state[i ? "selected" : "checked"]
            })
        }
        ;
        this.check_node = function(e, t) {
            if (this.settings.checkbox.tie_selection) {
                return this.select_node(e, false, true, t)
            }
            var i, r, s, a;
            if (O.isArray(e)) {
                e = e.slice();
                for (r = 0,
                         s = e.length; r < s; r++) {
                    this.check_node(e[r], t)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            i = this.get_node(e, true);
            if (!e.state.checked) {
                e.state.checked = true;
                this._data.checkbox.selected.push(e.id);
                if (i && i.length) {
                    i.children(".jstree-anchor").addClass("jstree-checked")
                }
                this.trigger("check_node", {
                    node: e,
                    selected: this._data.checkbox.selected,
                    event: t
                })
            }
        }
        ;
        this.uncheck_node = function(e, t) {
            if (this.settings.checkbox.tie_selection) {
                return this.deselect_node(e, false, t)
            }
            var i, r, s;
            if (O.isArray(e)) {
                e = e.slice();
                for (i = 0,
                         r = e.length; i < r; i++) {
                    this.uncheck_node(e[i], t)
                }
                return true
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            s = this.get_node(e, true);
            if (e.state.checked) {
                e.state.checked = false;
                this._data.checkbox.selected = O.vakata.array_remove_item(this._data.checkbox.selected, e.id);
                if (s.length) {
                    s.children(".jstree-anchor").removeClass("jstree-checked")
                }
                this.trigger("uncheck_node", {
                    node: e,
                    selected: this._data.checkbox.selected,
                    event: t
                })
            }
        }
        ;
        this.check_all = function() {
            if (this.settings.checkbox.tie_selection) {
                return this.select_all()
            }
            var e = this._data.checkbox.selected.concat([]), t, i;
            this._data.checkbox.selected = this._model.data[O.jstree.root].children_d.concat();
            for (t = 0,
                     i = this._data.checkbox.selected.length; t < i; t++) {
                if (this._model.data[this._data.checkbox.selected[t]]) {
                    this._model.data[this._data.checkbox.selected[t]].state.checked = true
                }
            }
            this.redraw(true);
            this.trigger("check_all", {
                selected: this._data.checkbox.selected
            })
        }
        ;
        this.uncheck_all = function() {
            if (this.settings.checkbox.tie_selection) {
                return this.deselect_all()
            }
            var e = this._data.checkbox.selected.concat([]), t, i;
            for (t = 0,
                     i = this._data.checkbox.selected.length; t < i; t++) {
                if (this._model.data[this._data.checkbox.selected[t]]) {
                    this._model.data[this._data.checkbox.selected[t]].state.checked = false
                }
            }
            this._data.checkbox.selected = [];
            this.element.find(".jstree-checked").removeClass("jstree-checked");
            this.trigger("uncheck_all", {
                selected: this._data.checkbox.selected,
                node: e
            })
        }
        ;
        this.is_checked = function(e) {
            if (this.settings.checkbox.tie_selection) {
                return this.is_selected(e)
            }
            e = this.get_node(e);
            if (!e || e.id === O.jstree.root) {
                return false
            }
            return e.state.checked
        }
        ;
        this.get_checked = function(e) {
            if (this.settings.checkbox.tie_selection) {
                return this.get_selected(e)
            }
            return e ? O.map(this._data.checkbox.selected, O.proxy(function(e) {
                return this.get_node(e)
            }, this)) : this._data.checkbox.selected
        }
        ;
        this.get_top_checked = function(e) {
            if (this.settings.checkbox.tie_selection) {
                return this.get_top_selected(e)
            }
            var t = this.get_checked(true), i = {}, r, s, a, n;
            for (r = 0,
                     s = t.length; r < s; r++) {
                i[t[r].id] = t[r]
            }
            for (r = 0,
                     s = t.length; r < s; r++) {
                for (a = 0,
                         n = t[r].children_d.length; a < n; a++) {
                    if (i[t[r].children_d[a]]) {
                        delete i[t[r].children_d[a]]
                    }
                }
            }
            t = [];
            for (r in i) {
                if (i.hasOwnProperty(r)) {
                    t.push(r)
                }
            }
            return e ? O.map(t, O.proxy(function(e) {
                return this.get_node(e)
            }, this)) : t
        }
        ;
        this.get_bottom_checked = function(e) {
            if (this.settings.checkbox.tie_selection) {
                return this.get_bottom_selected(e)
            }
            var t = this.get_checked(true), i = [], r, s;
            for (r = 0,
                     s = t.length; r < s; r++) {
                if (!t[r].children.length) {
                    i.push(t[r].id)
                }
            }
            return e ? O.map(i, O.proxy(function(e) {
                return this.get_node(e)
            }, this)) : i
        }
        ;
        this.load_node = function(e, t) {
            var i, r, s, a, n, o;
            if (!O.isArray(e) && !this.settings.checkbox.tie_selection) {
                o = this.get_node(e);
                if (o && o.state.loaded) {
                    for (i = 0,
                             r = o.children_d.length; i < r; i++) {
                        if (this._model.data[o.children_d[i]].state.checked) {
                            n = true;
                            this._data.checkbox.selected = O.vakata.array_remove_item(this._data.checkbox.selected, o.children_d[i])
                        }
                    }
                }
            }
            return d.load_node.apply(this, arguments)
        }
        ;
        this.get_state = function() {
            var e = d.get_state.apply(this, arguments);
            if (this.settings.checkbox.tie_selection) {
                return e
            }
            e.checkbox = this._data.checkbox.selected.slice();
            return e
        }
        ;
        this.set_state = function(e, t) {
            var i = d.set_state.apply(this, arguments);
            if (i && e.checkbox) {
                if (!this.settings.checkbox.tie_selection) {
                    this.uncheck_all();
                    var r = this;
                    O.each(e.checkbox, function(e, t) {
                        r.check_node(t)
                    })
                }
                delete e.checkbox;
                this.set_state(e, t);
                return false
            }
            return i
        }
        ;
        this.refresh = function(e, t) {
            if (this.settings.checkbox.tie_selection) {
                this._data.checkbox.selected = []
            }
            return d.refresh.apply(this, arguments)
        }
    }
    ;
    O.jstree.defaults.conditionalselect = function() {
        return true
    }
    ;
    O.jstree.plugins.conditionalselect = function(e, i) {
        this.activate_node = function(e, t) {
            if (this.settings.conditionalselect.call(this, this.get_node(e), t)) {
                return i.activate_node.call(this, e, t)
            }
        }
    }
    ;
    O.jstree.defaults.contextmenu = {
        select_node: true,
        show_at_node: true,
        items: function(e, t) {
            return {
                create: {
                    separator_before: false,
                    separator_after: true,
                    _disabled: false,
                    label: "Create",
                    action: function(e) {
                        var i = O.jstree.reference(e.reference)
                            , t = i.get_node(e.reference);
                        i.create_node(t, {}, "last", function(t) {
                            try {
                                i.edit(t)
                            } catch (e) {
                                setTimeout(function() {
                                    i.edit(t)
                                }, 0)
                            }
                        })
                    }
                },
                rename: {
                    separator_before: false,
                    separator_after: false,
                    _disabled: false,
                    label: "Rename",
                    action: function(e) {
                        var t = O.jstree.reference(e.reference)
                            , i = t.get_node(e.reference);
                        t.edit(i)
                    }
                },
                remove: {
                    separator_before: false,
                    icon: false,
                    separator_after: false,
                    _disabled: false,
                    label: "Delete",
                    action: function(e) {
                        var t = O.jstree.reference(e.reference)
                            , i = t.get_node(e.reference);
                        if (t.is_selected(i)) {
                            t.delete_node(t.get_selected())
                        } else {
                            t.delete_node(i)
                        }
                    }
                },
                ccp: {
                    separator_before: true,
                    icon: false,
                    separator_after: false,
                    label: "Edit",
                    action: false,
                    submenu: {
                        cut: {
                            separator_before: false,
                            separator_after: false,
                            label: "Cut",
                            action: function(e) {
                                var t = O.jstree.reference(e.reference)
                                    , i = t.get_node(e.reference);
                                if (t.is_selected(i)) {
                                    t.cut(t.get_top_selected())
                                } else {
                                    t.cut(i)
                                }
                            }
                        },
                        copy: {
                            separator_before: false,
                            icon: false,
                            separator_after: false,
                            label: "Copy",
                            action: function(e) {
                                var t = O.jstree.reference(e.reference)
                                    , i = t.get_node(e.reference);
                                if (t.is_selected(i)) {
                                    t.copy(t.get_top_selected())
                                } else {
                                    t.copy(i)
                                }
                            }
                        },
                        paste: {
                            separator_before: false,
                            icon: false,
                            _disabled: function(e) {
                                return !O.jstree.reference(e.reference).can_paste()
                            },
                            separator_after: false,
                            label: "Paste",
                            action: function(e) {
                                var t = O.jstree.reference(e.reference)
                                    , i = t.get_node(e.reference);
                                t.paste(i)
                            }
                        }
                    }
                }
            }
        }
    };
    O.jstree.plugins.contextmenu = function(e, a) {
        this.bind = function() {
            a.bind.call(this);
            var i = 0, r = null, t, s;
            this.element.on("init.jstree loading.jstree ready.jstree", O.proxy(function() {
                this.get_container_ul().addClass("jstree-contextmenu")
            }, this)).on("contextmenu.jstree", ".jstree-anchor", O.proxy(function(e, t) {
                if (e.target.tagName.toLowerCase() === "input") {
                    return
                }
                e.preventDefault();
                i = e.ctrlKey ? +new Date : 0;
                if (t || r) {
                    i = +new Date + 1e4
                }
                if (r) {
                    clearTimeout(r)
                }
                if (!this.is_loading(e.currentTarget)) {
                    this.show_contextmenu(e.currentTarget, e.pageX, e.pageY, e)
                }
            }, this)).on("click.jstree", ".jstree-anchor", O.proxy(function(e) {
                if (this._data.contextmenu.visible && (!i || +new Date - i > 250)) {
                    O.vakata.context.hide()
                }
                i = 0
            }, this)).on("touchstart.jstree", ".jstree-anchor", function(e) {
                if (!e.originalEvent || !e.originalEvent.changedTouches || !e.originalEvent.changedTouches[0]) {
                    return
                }
                t = e.originalEvent.changedTouches[0].clientX;
                s = e.originalEvent.changedTouches[0].clientY;
                r = setTimeout(function() {
                    O(e.currentTarget).trigger("contextmenu", true)
                }, 750)
            }).on("touchmove.vakata.jstree", function(e) {
                if (r && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0] && (Math.abs(t - e.originalEvent.changedTouches[0].clientX) > 10 || Math.abs(s - e.originalEvent.changedTouches[0].clientY) > 10)) {
                    clearTimeout(r);
                    O.vakata.context.hide()
                }
            }).on("touchend.vakata.jstree", function(e) {
                if (r) {
                    clearTimeout(r)
                }
            });
            O(k).on("context_hide.vakata.jstree", O.proxy(function(e, t) {
                this._data.contextmenu.visible = false;
                O(t.reference).removeClass("jstree-context")
            }, this))
        }
        ;
        this.teardown = function() {
            if (this._data.contextmenu.visible) {
                O.vakata.context.hide()
            }
            a.teardown.call(this)
        }
        ;
        this.show_contextmenu = function(t, i, r, e) {
            t = this.get_node(t);
            if (!t || t.id === O.jstree.root) {
                return false
            }
            var s = this.settings.contextmenu
                , a = this.get_node(t, true)
                , n = a.children(".jstree-anchor")
                , o = false
                , d = false;
            if (s.show_at_node || i === S || r === S) {
                o = n.offset();
                i = o.left;
                r = o.top + this._data.core.li_height
            }
            if (this.settings.contextmenu.select_node && !this.is_selected(t)) {
                this.activate_node(t, e)
            }
            d = s.items;
            if (O.isFunction(d)) {
                d = d.call(this, t, O.proxy(function(e) {
                    this._show_contextmenu(t, i, r, e)
                }, this))
            }
            if (O.isPlainObject(d)) {
                this._show_contextmenu(t, i, r, d)
            }
        }
        ;
        this._show_contextmenu = function(e, t, i, r) {
            var s = this.get_node(e, true)
                , a = s.children(".jstree-anchor");
            O(k).one("context_show.vakata.jstree", O.proxy(function(e, t) {
                var i = "jstree-contextmenu jstree-" + this.get_theme() + "-contextmenu";
                O(t.element).addClass(i);
                a.addClass("jstree-context")
            }, this));
            this._data.contextmenu.visible = true;
            O.vakata.context.show(a, {
                x: t,
                y: i
            }, r);
            this.trigger("show_contextmenu", {
                node: e,
                x: t,
                y: i
            })
        }
    }
    ;
    (function(f) {
            var _ = false
                , u = {
                element: false,
                reference: false,
                position_x: 0,
                position_y: 0,
                items: [],
                html: "",
                is_visible: false
            };
            f.vakata.context = {
                settings: {
                    hide_onmouseleave: 0,
                    icons: true
                },
                _trigger: function(e) {
                    f(k).triggerHandler("context_" + e + ".vakata", {
                        reference: u.reference,
                        element: u.element,
                        position: {
                            x: u.position_x,
                            y: u.position_y
                        }
                    })
                },
                _execute: function(e) {
                    e = u.items[e];
                    return e && (!e._disabled || f.isFunction(e._disabled) && !e._disabled({
                        item: e,
                        reference: u.reference,
                        element: u.element
                    })) && e.action ? e.action.call(null, {
                        item: e,
                        reference: u.reference,
                        element: u.element,
                        position: {
                            x: u.position_x,
                            y: u.position_y
                        }
                    }) : false
                },
                _parse: function(e, t) {
                    if (!e) {
                        return false
                    }
                    if (!t) {
                        u.html = "";
                        u.items = []
                    }
                    var i = "", r = false, s;
                    if (t) {
                        i += "<" + "ul>"
                    }
                    f.each(e, function(e, t) {
                        if (!t) {
                            return true
                        }
                        u.items.push(t);
                        if (!r && t.separator_before) {
                            i += "<" + "li class='vakata-context-separator'><" + "a href='#' " + (f.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>"
                        }
                        r = false;
                        i += "<" + "li class='" + (t._class || "") + (t._disabled === true || f.isFunction(t._disabled) && t._disabled({
                            item: t,
                            reference: u.reference,
                            element: u.element
                        }) ? " vakata-contextmenu-disabled " : "") + "' " + (t.shortcut ? " data-shortcut='" + t.shortcut + "' " : "") + ">";
                        i += "<" + "a href='#' rel='" + (u.items.length - 1) + "' " + (t.title ? "title='" + t.title + "'" : "") + ">";
                        if (f.vakata.context.settings.icons) {
                            i += "<" + "i ";
                            if (t.icon) {
                                if (t.icon.indexOf("/") !== -1 || t.icon.indexOf(".") !== -1) {
                                    i += " style='background:url(\"" + t.icon + "\") center center no-repeat' "
                                } else {
                                    i += " class='" + t.icon + "' "
                                }
                            }
                            i += "><" + "/i><" + "span class='vakata-contextmenu-sep'>&#160;<" + "/span>"
                        }
                        i += (f.isFunction(t.label) ? t.label({
                            item: e,
                            reference: u.reference,
                            element: u.element
                        }) : t.label) + (t.shortcut ? ' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-' + t.shortcut + '">' + (t.shortcut_label || "") + "</span>" : "") + "<" + "/a>";
                        if (t.submenu) {
                            s = f.vakata.context._parse(t.submenu, true);
                            if (s) {
                                i += s
                            }
                        }
                        i += "<" + "/li>";
                        if (t.separator_after) {
                            i += "<" + "li class='vakata-context-separator'><" + "a href='#' " + (f.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>";
                            r = true
                        }
                    });
                    i = i.replace(/<li class\='vakata-context-separator'\><\/li\>$/, "");
                    if (t) {
                        i += "</ul>"
                    }
                    if (!t) {
                        u.html = i;
                        f.vakata.context._trigger("parse")
                    }
                    return i.length > 10 ? i : false
                },
                _show_submenu: function(e) {
                    e = f(e);
                    if (!e.length || !e.children("ul").length) {
                        return
                    }
                    var t = e.children("ul")
                        , i = e.offset().left
                        , r = i + e.outerWidth()
                        , s = e.offset().top
                        , a = t.width()
                        , n = t.height()
                        , o = f(window).width() + f(window).scrollLeft()
                        , d = f(window).height() + f(window).scrollTop();
                    if (_) {
                        e[r - (a + 10 + e.outerWidth()) < 0 ? "addClass" : "removeClass"]("vakata-context-left")
                    } else {
                        e[r + a > o && i > o - r ? "addClass" : "removeClass"]("vakata-context-right")
                    }
                    if (s + n + 10 > d) {
                        t.css("bottom", "-1px")
                    }
                    if (e.hasClass("vakata-context-right")) {
                        if (i < a) {
                            t.css("margin-right", i - a)
                        }
                    } else {
                        if (o - r < a) {
                            t.css("margin-left", o - r - a)
                        }
                    }
                    t.show()
                },
                show: function(e, t, i) {
                    var r, s, a, n, o, d, l, c, h = true;
                    if (u.element && u.element.length) {
                        u.element.width("")
                    }
                    switch (h) {
                        case !t && !e:
                            return false;
                        case !!t && !!e:
                            u.reference = e;
                            u.position_x = t.x;
                            u.position_y = t.y;
                            break;
                        case !t && !!e:
                            u.reference = e;
                            r = e.offset();
                            u.position_x = r.left + e.outerHeight();
                            u.position_y = r.top;
                            break;
                        case !!t && !e:
                            u.position_x = t.x;
                            u.position_y = t.y;
                            break
                    }
                    if (!!e && !i && f(e).data("vakata_contextmenu")) {
                        i = f(e).data("vakata_contextmenu")
                    }
                    if (f.vakata.context._parse(i)) {
                        u.element.html(u.html)
                    }
                    if (u.items.length) {
                        u.element.appendTo(k.body);
                        s = u.element;
                        a = u.position_x;
                        n = u.position_y;
                        o = s.width();
                        d = s.height();
                        l = f(window).width() + f(window).scrollLeft();
                        c = f(window).height() + f(window).scrollTop();
                        if (_) {
                            a -= s.outerWidth() - f(e).outerWidth();
                            if (a < f(window).scrollLeft() + 20) {
                                a = f(window).scrollLeft() + 20
                            }
                        }
                        if (a + o + 20 > l) {
                            a = l - (o + 20)
                        }
                        if (n + d + 20 > c) {
                            n = c - (d + 20)
                        }
                        u.element.css({
                            left: a,
                            top: n
                        }).show().find("a").first().focus().parent().addClass("vakata-context-hover");
                        u.is_visible = true;
                        f.vakata.context._trigger("show")
                    }
                },
                hide: function() {
                    if (u.is_visible) {
                        u.element.hide().find("ul").hide().end().find(":focus").blur().end().detach();
                        u.is_visible = false;
                        f.vakata.context._trigger("hide")
                    }
                }
            };
            f(function() {
                _ = f(k.body).css("direction") === "rtl";
                var t = false;
                u.element = f("<ul class='vakata-context'></ul>");
                u.element.on("mouseenter", "li", function(e) {
                    e.stopImmediatePropagation();
                    if (f.contains(this, e.relatedTarget)) {
                        return
                    }
                    if (t) {
                        clearTimeout(t)
                    }
                    u.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end();
                    f(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover");
                    f.vakata.context._show_submenu(this)
                }).on("mouseleave", "li", function(e) {
                    if (f.contains(this, e.relatedTarget)) {
                        return
                    }
                    f(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")
                }).on("mouseleave", function(e) {
                    f(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
                    if (f.vakata.context.settings.hide_onmouseleave) {
                        t = setTimeout(function(e) {
                            return function() {
                                f.vakata.context.hide()
                            }
                        }(this), f.vakata.context.settings.hide_onmouseleave)
                    }
                }).on("click", "a", function(e) {
                    e.preventDefault();
                    if (!f(this).blur().parent().hasClass("vakata-context-disabled") && f.vakata.context._execute(f(this).attr("rel")) !== false) {
                        f.vakata.context.hide()
                    }
                }).on("keydown", "a", function(e) {
                    var t = null;
                    switch (e.which) {
                        case 13:
                        case 32:
                            e.type = "click";
                            e.preventDefault();
                            f(e.currentTarget).trigger(e);
                            break;
                        case 37:
                            if (u.is_visible) {
                                u.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus();
                                e.stopImmediatePropagation();
                                e.preventDefault()
                            }
                            break;
                        case 38:
                            if (u.is_visible) {
                                t = u.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first();
                                if (!t.length) {
                                    t = u.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()
                                }
                                t.addClass("vakata-context-hover").children("a").focus();
                                e.stopImmediatePropagation();
                                e.preventDefault()
                            }
                            break;
                        case 39:
                            if (u.is_visible) {
                                u.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus();
                                e.stopImmediatePropagation();
                                e.preventDefault()
                            }
                            break;
                        case 40:
                            if (u.is_visible) {
                                t = u.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first();
                                if (!t.length) {
                                    t = u.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()
                                }
                                t.addClass("vakata-context-hover").children("a").focus();
                                e.stopImmediatePropagation();
                                e.preventDefault()
                            }
                            break;
                        case 27:
                            f.vakata.context.hide();
                            e.preventDefault();
                            break;
                        default:
                            break
                    }
                }).on("keydown", function(e) {
                    e.preventDefault();
                    var t = u.element.find(".vakata-contextmenu-shortcut-" + e.which).parent();
                    if (t.parent().not(".vakata-context-disabled")) {
                        t.click()
                    }
                });
                f(k).on("mousedown.vakata.jstree", function(e) {
                    if (u.is_visible && u.element[0] !== e.target && !f.contains(u.element[0], e.target)) {
                        f.vakata.context.hide()
                    }
                }).on("context_show.vakata.jstree", function(e, t) {
                    u.element.find("li:has(ul)").children("a").addClass("vakata-context-parent");
                    if (_) {
                        u.element.addClass("vakata-context-rtl").css("direction", "rtl")
                    }
                    u.element.find("ul").hide().end()
                })
            })
        }
    )(O);
    O.jstree.defaults.dnd = {
        copy: true,
        open_timeout: 500,
        is_draggable: true,
        check_while_dragging: true,
        always_copy: false,
        inside_pos: 0,
        drag_selection: true,
        touch: true,
        large_drop_target: false,
        large_drag_target: false,
        use_html5: false
    };
    var d, c;
    O.jstree.plugins.dnd = function(e, o) {
        this.init = function(e, t) {
            o.init.call(this, e, t);
            this.settings.dnd.use_html5 = this.settings.dnd.use_html5 && "draggable"in k.createElement("span")
        }
        ;
        this.bind = function() {
            o.bind.call(this);
            this.element.on(this.settings.dnd.use_html5 ? "dragstart.jstree" : "mousedown.jstree touchstart.jstree", this.settings.dnd.large_drag_target ? ".jstree-node" : ".jstree-anchor", O.proxy(function(e) {
                if (this.settings.dnd.large_drag_target && O(e.target).closest(".jstree-node")[0] !== e.currentTarget) {
                    return true
                }
                if (e.type === "touchstart" && (!this.settings.dnd.touch || this.settings.dnd.touch === "selected" && !O(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").hasClass("jstree-clicked"))) {
                    return true
                }
                var t = this.get_node(e.target)
                    , i = this.is_selected(t) && this.settings.dnd.drag_selection ? this.get_top_selected().length : 1
                    , r = i > 1 ? i + " " + this.get_string("nodes") : this.get_text(e.currentTarget);
                if (this.settings.core.force_text) {
                    r = O.vakata.html.escape(r)
                }
                if (t && t.id && t.id !== O.jstree.root && (e.which === 1 || e.type === "touchstart" || e.type === "dragstart") && (this.settings.dnd.is_draggable === true || O.isFunction(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, i > 1 ? this.get_top_selected(true) : [t], e))) {
                    d = {
                        jstree: true,
                        origin: this,
                        obj: this.get_node(t, true),
                        nodes: i > 1 ? this.get_top_selected() : [t.id]
                    };
                    c = e.currentTarget;
                    if (this.settings.dnd.use_html5) {
                        O.vakata.dnd._trigger("start", e, {
                            helper: O(),
                            element: c,
                            data: d
                        })
                    } else {
                        this.element.trigger("mousedown.jstree");
                        return O.vakata.dnd.start(e, d, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + " jstree-" + this.get_theme() + "-" + this.get_theme_variant() + " " + (this.settings.core.themes.responsive ? " jstree-dnd-responsive" : "") + '"><i class="jstree-icon jstree-er"></i>' + r + '<ins class="jstree-copy" style="display:none;">+</ins></div>')
                    }
                }
            }, this));
            if (this.settings.dnd.use_html5) {
                this.element.on("dragover.jstree", function(e) {
                    e.preventDefault();
                    O.vakata.dnd._trigger("move", e, {
                        helper: O(),
                        element: c,
                        data: d
                    });
                    return false
                }).on("drop.jstree", O.proxy(function(e) {
                    e.preventDefault();
                    O.vakata.dnd._trigger("stop", e, {
                        helper: O(),
                        element: c,
                        data: d
                    });
                    return false
                }, this))
            }
        }
        ;
        this.redraw_node = function(e, t, i, r) {
            e = o.redraw_node.apply(this, arguments);
            if (e && this.settings.dnd.use_html5) {
                if (this.settings.dnd.large_drag_target) {
                    e.setAttribute("draggable", true)
                } else {
                    var s, a, n = null;
                    for (s = 0,
                             a = e.childNodes.length; s < a; s++) {
                        if (e.childNodes[s] && e.childNodes[s].className && e.childNodes[s].className.indexOf("jstree-anchor") !== -1) {
                            n = e.childNodes[s];
                            break
                        }
                    }
                    if (n) {
                        n.setAttribute("draggable", true)
                    }
                }
            }
            return e
        }
    }
    ;
    O(function() {
        var w = false
            , C = false
            , A = false
            , T = false
            , N = O('<div id="jstree-marker">&#160;</div>').hide();
        O(k).on("dragover.vakata.jstree", function(e) {
            if (c) {
                O.vakata.dnd._trigger("move", e, {
                    helper: O(),
                    element: c,
                    data: d
                })
            }
        }).on("drop.vakata.jstree", function(e) {
            if (c) {
                O.vakata.dnd._trigger("stop", e, {
                    helper: O(),
                    element: c,
                    data: d
                });
                c = null;
                d = null
            }
        }).on("dnd_start.vakata.jstree", function(e, t) {
            w = false;
            A = false;
            if (!t || !t.data || !t.data.jstree) {
                return
            }
            N.appendTo(k.body)
        }).on("dnd_move.vakata.jstree", function(e, i) {
            var r = i.event.target !== A.target;
            if (T) {
                if (!i.event || i.event.type !== "dragover" || r) {
                    clearTimeout(T)
                }
            }
            if (!i || !i.data || !i.data.jstree) {
                return
            }
            if (i.event.target.id && i.event.target.id === "jstree-marker") {
                return
            }
            A = i.event;
            var s = O.jstree.reference(i.event.target), a = false, n = false, t = false, o, d, l, c, h, f, _, u, g, p, m, v, j, y, k, x, b;
            if (s && s._data && s._data.dnd) {
                N.attr("class", "jstree-" + s.get_theme() + (s.settings.core.themes.responsive ? " jstree-dnd-responsive" : ""));
                x = i.data.origin && (i.data.origin.settings.dnd.always_copy || i.data.origin.settings.dnd.copy && (i.event.metaKey || i.event.ctrlKey));
                i.helper.children().attr("class", "jstree-" + s.get_theme() + " jstree-" + s.get_theme() + "-" + s.get_theme_variant() + " " + (s.settings.core.themes.responsive ? " jstree-dnd-responsive" : "")).find(".jstree-copy").first()[x ? "show" : "hide"]();
                if ((i.event.target === s.element[0] || i.event.target === s.get_container_ul()[0]) && s.get_container_ul().children().length === 0) {
                    u = true;
                    for (g = 0,
                             p = i.data.nodes.length; g < p; g++) {
                        u = u && s.check(i.data.origin && (i.data.origin.settings.dnd.always_copy || i.data.origin.settings.dnd.copy && (i.event.metaKey || i.event.ctrlKey)) ? "copy_node" : "move_node", i.data.origin && i.data.origin !== s ? i.data.origin.get_node(i.data.nodes[g]) : i.data.nodes[g], O.jstree.root, "last", {
                            dnd: true,
                            ref: s.get_node(O.jstree.root),
                            pos: "i",
                            origin: i.data.origin,
                            is_multi: i.data.origin && i.data.origin !== s,
                            is_foreign: !i.data.origin
                        });
                        if (!u) {
                            break
                        }
                    }
                    if (u) {
                        w = {
                            ins: s,
                            par: O.jstree.root,
                            pos: "last"
                        };
                        N.hide();
                        i.helper.find(".jstree-icon").first().removeClass("jstree-er").addClass("jstree-ok");
                        if (i.event.originalEvent && i.event.originalEvent.dataTransfer) {
                            i.event.originalEvent.dataTransfer.dropEffect = x ? "copy" : "move"
                        }
                        return
                    }
                } else {
                    a = s.settings.dnd.large_drop_target ? O(i.event.target).closest(".jstree-node").children(".jstree-anchor") : O(i.event.target).closest(".jstree-anchor");
                    if (a && a.length && a.parent().is(".jstree-closed, .jstree-open, .jstree-leaf")) {
                        n = a.offset();
                        t = (i.event.pageY !== S ? i.event.pageY : i.event.originalEvent.pageY) - n.top;
                        c = a.outerHeight();
                        if (t < c / 3) {
                            _ = ["b", "i", "a"]
                        } else if (t > c - c / 3) {
                            _ = ["a", "i", "b"]
                        } else {
                            _ = t > c / 2 ? ["i", "a", "b"] : ["i", "b", "a"]
                        }
                        O.each(_, function(e, t) {
                            switch (t) {
                                case "b":
                                    d = n.left - 6;
                                    l = n.top;
                                    h = s.get_parent(a);
                                    f = a.parent().index();
                                    break;
                                case "i":
                                    y = s.settings.dnd.inside_pos;
                                    k = s.get_node(a.parent());
                                    d = n.left - 2;
                                    l = n.top + c / 2 + 1;
                                    h = k.id;
                                    f = y === "first" ? 0 : y === "last" ? k.children.length : Math.min(y, k.children.length);
                                    break;
                                case "a":
                                    d = n.left - 6;
                                    l = n.top + c;
                                    h = s.get_parent(a);
                                    f = a.parent().index() + 1;
                                    break
                            }
                            u = true;
                            for (g = 0,
                                     p = i.data.nodes.length; g < p; g++) {
                                m = i.data.origin && (i.data.origin.settings.dnd.always_copy || i.data.origin.settings.dnd.copy && (i.event.metaKey || i.event.ctrlKey)) ? "copy_node" : "move_node";
                                v = f;
                                if (m === "move_node" && t === "a" && (i.data.origin && i.data.origin === s) && h === s.get_parent(i.data.nodes[g])) {
                                    j = s.get_node(h);
                                    if (v > O.inArray(i.data.nodes[g], j.children)) {
                                        v -= 1
                                    }
                                }
                                u = u && (s && s.settings && s.settings.dnd && s.settings.dnd.check_while_dragging === false || s.check(m, i.data.origin && i.data.origin !== s ? i.data.origin.get_node(i.data.nodes[g]) : i.data.nodes[g], h, v, {
                                    dnd: true,
                                    ref: s.get_node(a.parent()),
                                    pos: t,
                                    origin: i.data.origin,
                                    is_multi: i.data.origin && i.data.origin !== s,
                                    is_foreign: !i.data.origin
                                }));
                                if (!u) {
                                    if (s && s.last_error) {
                                        C = s.last_error()
                                    }
                                    break
                                }
                            }
                            if (t === "i" && a.parent().is(".jstree-closed") && s.settings.dnd.open_timeout) {
                                if (!i.event || i.event.type !== "dragover" || r) {
                                    if (T) {
                                        clearTimeout(T)
                                    }
                                    T = setTimeout(function(e, t) {
                                        return function() {
                                            e.open_node(t)
                                        }
                                    }(s, a), s.settings.dnd.open_timeout)
                                }
                            }
                            if (u) {
                                b = s.get_node(h, true);
                                if (!b.hasClass(".jstree-dnd-parent")) {
                                    O(".jstree-dnd-parent").removeClass("jstree-dnd-parent");
                                    b.addClass("jstree-dnd-parent")
                                }
                                w = {
                                    ins: s,
                                    par: h,
                                    pos: t === "i" && y === "last" && f === 0 && !s.is_loaded(k) ? "last" : f
                                };
                                N.css({
                                    left: d + "px",
                                    top: l + "px"
                                }).show();
                                i.helper.find(".jstree-icon").first().removeClass("jstree-er").addClass("jstree-ok");
                                if (i.event.originalEvent && i.event.originalEvent.dataTransfer) {
                                    i.event.originalEvent.dataTransfer.dropEffect = x ? "copy" : "move"
                                }
                                C = {};
                                _ = true;
                                return false
                            }
                        });
                        if (_ === true) {
                            return
                        }
                    }
                }
            }
            O(".jstree-dnd-parent").removeClass("jstree-dnd-parent");
            w = false;
            i.helper.find(".jstree-icon").removeClass("jstree-ok").addClass("jstree-er");
            if (i.event.originalEvent && i.event.originalEvent.dataTransfer) {}
            N.hide()
        }).on("dnd_scroll.vakata.jstree", function(e, t) {
            if (!t || !t.data || !t.data.jstree) {
                return
            }
            N.hide();
            w = false;
            A = false;
            t.helper.find(".jstree-icon").first().removeClass("jstree-ok").addClass("jstree-er")
        }).on("dnd_stop.vakata.jstree", function(e, t) {
            O(".jstree-dnd-parent").removeClass("jstree-dnd-parent");
            if (T) {
                clearTimeout(T)
            }
            if (!t || !t.data || !t.data.jstree) {
                return
            }
            N.hide().detach();
            var i, r, s = [];
            if (w) {
                for (i = 0,
                         r = t.data.nodes.length; i < r; i++) {
                    s[i] = t.data.origin ? t.data.origin.get_node(t.data.nodes[i]) : t.data.nodes[i]
                }
                w.ins[t.data.origin && (t.data.origin.settings.dnd.always_copy || t.data.origin.settings.dnd.copy && (t.event.metaKey || t.event.ctrlKey)) ? "copy_node" : "move_node"](s, w.par, w.pos, false, false, false, t.data.origin)
            } else {
                i = O(t.event.target).closest(".jstree");
                if (i.length && C && C.error && C.error === "check") {
                    i = i.jstree(true);
                    if (i) {
                        i.settings.core.error.call(this, C)
                    }
                }
            }
            A = false;
            w = false
        }).on("keyup.jstree keydown.jstree", function(e, t) {
            t = O.vakata.dnd._get();
            if (t && t.data && t.data.jstree) {
                if (e.type === "keyup" && e.which === 27) {
                    if (T) {
                        clearTimeout(T)
                    }
                    w = false;
                    C = false;
                    A = false;
                    T = false;
                    N.hide().detach();
                    O.vakata.dnd._clean()
                } else {
                    t.helper.find(".jstree-copy").first()[t.data.origin && (t.data.origin.settings.dnd.always_copy || t.data.origin.settings.dnd.copy && (e.metaKey || e.ctrlKey)) ? "show" : "hide"]();
                    if (A) {
                        A.metaKey = e.metaKey;
                        A.ctrlKey = e.ctrlKey;
                        O.vakata.dnd._trigger("move", A)
                    }
                }
            }
        })
    });
    (function(h) {
            h.vakata.html = {
                div: h("<div />"),
                escape: function(e) {
                    return h.vakata.html.div.text(e).html()
                },
                strip: function(e) {
                    return h.vakata.html.div.empty().append(h.parseHTML(e)).text()
                }
            };
            var f = {
                element: false,
                target: false,
                is_down: false,
                is_drag: false,
                helper: false,
                helper_w: 0,
                data: false,
                init_x: 0,
                init_y: 0,
                scroll_l: 0,
                scroll_t: 0,
                scroll_e: false,
                scroll_i: false,
                is_touch: false
            };
            h.vakata.dnd = {
                settings: {
                    scroll_speed: 10,
                    scroll_proximity: 20,
                    helper_left: 5,
                    helper_top: 10,
                    threshold: 5,
                    threshold_touch: 10
                },
                _trigger: function(e, t, i) {
                    if (i === S) {
                        i = h.vakata.dnd._get()
                    }
                    i.event = t;
                    h(k).triggerHandler("dnd_" + e + ".vakata", i)
                },
                _get: function() {
                    return {
                        data: f.data,
                        element: f.element,
                        helper: f.helper
                    }
                },
                _clean: function() {
                    if (f.helper) {
                        f.helper.remove()
                    }
                    if (f.scroll_i) {
                        clearInterval(f.scroll_i);
                        f.scroll_i = false
                    }
                    f = {
                        element: false,
                        target: false,
                        is_down: false,
                        is_drag: false,
                        helper: false,
                        helper_w: 0,
                        data: false,
                        init_x: 0,
                        init_y: 0,
                        scroll_l: 0,
                        scroll_t: 0,
                        scroll_e: false,
                        scroll_i: false,
                        is_touch: false
                    };
                    h(k).off("mousemove.vakata.jstree touchmove.vakata.jstree", h.vakata.dnd.drag);
                    h(k).off("mouseup.vakata.jstree touchend.vakata.jstree", h.vakata.dnd.stop)
                },
                _scroll: function(e) {
                    if (!f.scroll_e || !f.scroll_l && !f.scroll_t) {
                        if (f.scroll_i) {
                            clearInterval(f.scroll_i);
                            f.scroll_i = false
                        }
                        return false
                    }
                    if (!f.scroll_i) {
                        f.scroll_i = setInterval(h.vakata.dnd._scroll, 100);
                        return false
                    }
                    if (e === true) {
                        return false
                    }
                    var t = f.scroll_e.scrollTop()
                        , i = f.scroll_e.scrollLeft();
                    f.scroll_e.scrollTop(t + f.scroll_t * h.vakata.dnd.settings.scroll_speed);
                    f.scroll_e.scrollLeft(i + f.scroll_l * h.vakata.dnd.settings.scroll_speed);
                    if (t !== f.scroll_e.scrollTop() || i !== f.scroll_e.scrollLeft()) {
                        h.vakata.dnd._trigger("scroll", f.scroll_e)
                    }
                },
                start: function(e, t, i) {
                    if (e.type === "touchstart" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
                        e.pageX = e.originalEvent.changedTouches[0].pageX;
                        e.pageY = e.originalEvent.changedTouches[0].pageY;
                        e.target = k.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset)
                    }
                    if (f.is_drag) {
                        h.vakata.dnd.stop({})
                    }
                    try {
                        e.currentTarget.unselectable = "on";
                        e.currentTarget.onselectstart = function() {
                            return false
                        }
                        ;
                        if (e.currentTarget.style) {
                            e.currentTarget.style.touchAction = "none";
                            e.currentTarget.style.msTouchAction = "none";
                            e.currentTarget.style.MozUserSelect = "none"
                        }
                    } catch (e) {}
                    f.init_x = e.pageX;
                    f.init_y = e.pageY;
                    f.data = t;
                    f.is_down = true;
                    f.element = e.currentTarget;
                    f.target = e.target;
                    f.is_touch = e.type === "touchstart";
                    if (i !== false) {
                        f.helper = h("<div id='vakata-dnd'></div>").html(i).css({
                            display: "block",
                            margin: "0",
                            padding: "0",
                            position: "absolute",
                            top: "-2000px",
                            lineHeight: "16px",
                            zIndex: "10000"
                        })
                    }
                    h(k).on("mousemove.vakata.jstree touchmove.vakata.jstree", h.vakata.dnd.drag);
                    h(k).on("mouseup.vakata.jstree touchend.vakata.jstree", h.vakata.dnd.stop);
                    return false
                },
                drag: function(i) {
                    if (i.type === "touchmove" && i.originalEvent && i.originalEvent.changedTouches && i.originalEvent.changedTouches[0]) {
                        i.pageX = i.originalEvent.changedTouches[0].pageX;
                        i.pageY = i.originalEvent.changedTouches[0].pageY;
                        i.target = k.elementFromPoint(i.originalEvent.changedTouches[0].pageX - window.pageXOffset, i.originalEvent.changedTouches[0].pageY - window.pageYOffset)
                    }
                    if (!f.is_down) {
                        return
                    }
                    if (!f.is_drag) {
                        if (Math.abs(i.pageX - f.init_x) > (f.is_touch ? h.vakata.dnd.settings.threshold_touch : h.vakata.dnd.settings.threshold) || Math.abs(i.pageY - f.init_y) > (f.is_touch ? h.vakata.dnd.settings.threshold_touch : h.vakata.dnd.settings.threshold)) {
                            if (f.helper) {
                                f.helper.appendTo(k.body);
                                f.helper_w = f.helper.outerWidth()
                            }
                            f.is_drag = true;
                            h(f.target).one("click.vakata", false);
                            h.vakata.dnd._trigger("start", i)
                        } else {
                            return
                        }
                    }
                    var e = false
                        , t = false
                        , r = false
                        , s = false
                        , a = false
                        , n = false
                        , o = false
                        , d = false
                        , l = false
                        , c = false;
                    f.scroll_t = 0;
                    f.scroll_l = 0;
                    f.scroll_e = false;
                    h(h(i.target).parentsUntil("body").addBack().get().reverse()).filter(function() {
                        return /^auto|scroll$/.test(h(this).css("overflow")) && (this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth)
                    }).each(function() {
                        var e = h(this)
                            , t = e.offset();
                        if (this.scrollHeight > this.offsetHeight) {
                            if (t.top + e.height() - i.pageY < h.vakata.dnd.settings.scroll_proximity) {
                                f.scroll_t = 1
                            }
                            if (i.pageY - t.top < h.vakata.dnd.settings.scroll_proximity) {
                                f.scroll_t = -1
                            }
                        }
                        if (this.scrollWidth > this.offsetWidth) {
                            if (t.left + e.width() - i.pageX < h.vakata.dnd.settings.scroll_proximity) {
                                f.scroll_l = 1
                            }
                            if (i.pageX - t.left < h.vakata.dnd.settings.scroll_proximity) {
                                f.scroll_l = -1
                            }
                        }
                        if (f.scroll_t || f.scroll_l) {
                            f.scroll_e = h(this);
                            return false
                        }
                    });
                    if (!f.scroll_e) {
                        e = h(k);
                        t = h(window);
                        r = e.height();
                        s = t.height();
                        a = e.width();
                        n = t.width();
                        o = e.scrollTop();
                        d = e.scrollLeft();
                        if (r > s && i.pageY - o < h.vakata.dnd.settings.scroll_proximity) {
                            f.scroll_t = -1
                        }
                        if (r > s && s - (i.pageY - o) < h.vakata.dnd.settings.scroll_proximity) {
                            f.scroll_t = 1
                        }
                        if (a > n && i.pageX - d < h.vakata.dnd.settings.scroll_proximity) {
                            f.scroll_l = -1
                        }
                        if (a > n && n - (i.pageX - d) < h.vakata.dnd.settings.scroll_proximity) {
                            f.scroll_l = 1
                        }
                        if (f.scroll_t || f.scroll_l) {
                            f.scroll_e = e
                        }
                    }
                    if (f.scroll_e) {
                        h.vakata.dnd._scroll(true)
                    }
                    if (f.helper) {
                        l = parseInt(i.pageY + h.vakata.dnd.settings.helper_top, 10);
                        c = parseInt(i.pageX + h.vakata.dnd.settings.helper_left, 10);
                        if (r && l + 25 > r) {
                            l = r - 50
                        }
                        if (a && c + f.helper_w > a) {
                            c = a - (f.helper_w + 2)
                        }
                        f.helper.css({
                            left: c + "px",
                            top: l + "px"
                        })
                    }
                    h.vakata.dnd._trigger("move", i);
                    return false
                },
                stop: function(e) {
                    if (e.type === "touchend" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
                        e.pageX = e.originalEvent.changedTouches[0].pageX;
                        e.pageY = e.originalEvent.changedTouches[0].pageY;
                        e.target = k.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset)
                    }
                    if (f.is_drag) {
                        if (e.target !== f.target) {
                            h(f.target).off("click.vakata")
                        }
                        h.vakata.dnd._trigger("stop", e)
                    } else {
                        if (e.type === "touchend" && e.target === f.target) {
                            var t = setTimeout(function() {
                                h(e.target).click()
                            }, 100);
                            h(e.target).one("click", function() {
                                if (t) {
                                    clearTimeout(t)
                                }
                            })
                        }
                    }
                    h.vakata.dnd._clean();
                    return false
                }
            }
        }
    )(O);
    O.jstree.defaults.massload = null;
    O.jstree.plugins.massload = function(e, h) {
        this.init = function(e, t) {
            this._data.massload = {};
            h.init.call(this, e, t)
        }
        ;
        this._load_nodes = function(a, n, o, d) {
            var e = this.settings.massload, t = JSON.stringify(a), i = [], r = this._model.data, s, l, c;
            if (!o) {
                for (s = 0,
                         l = a.length; s < l; s++) {
                    if (!r[a[s]] || (!r[a[s]].state.loaded && !r[a[s]].state.failed || d)) {
                        i.push(a[s]);
                        c = this.get_node(a[s], true);
                        if (c && c.length) {
                            c.addClass("jstree-loading").attr("aria-busy", true)
                        }
                    }
                }
                this._data.massload = {};
                if (i.length) {
                    if (O.isFunction(e)) {
                        return e.call(this, i, O.proxy(function(e) {
                            var t, i;
                            if (e) {
                                for (t in e) {
                                    if (e.hasOwnProperty(t)) {
                                        this._data.massload[t] = e[t]
                                    }
                                }
                            }
                            for (t = 0,
                                     i = a.length; t < i; t++) {
                                c = this.get_node(a[t], true);
                                if (c && c.length) {
                                    c.removeClass("jstree-loading").attr("aria-busy", false)
                                }
                            }
                            h._load_nodes.call(this, a, n, o, d)
                        }, this))
                    }
                    if (typeof e === "object" && e && e.url) {
                        e = O.extend(true, {}, e);
                        if (O.isFunction(e.url)) {
                            e.url = e.url.call(this, i)
                        }
                        if (O.isFunction(e.data)) {
                            e.data = e.data.call(this, i)
                        }
                        return O.ajax(e).done(O.proxy(function(e, t, i) {
                            var r, s;
                            if (e) {
                                for (r in e) {
                                    if (e.hasOwnProperty(r)) {
                                        this._data.massload[r] = e[r]
                                    }
                                }
                            }
                            for (r = 0,
                                     s = a.length; r < s; r++) {
                                c = this.get_node(a[r], true);
                                if (c && c.length) {
                                    c.removeClass("jstree-loading").attr("aria-busy", false)
                                }
                            }
                            h._load_nodes.call(this, a, n, o, d)
                        }, this)).fail(O.proxy(function(e) {
                            h._load_nodes.call(this, a, n, o, d)
                        }, this))
                    }
                }
            }
            return h._load_nodes.call(this, a, n, o, d)
        }
        ;
        this._load_node = function(e, t) {
            var i = this._data.massload[e.id], r = null, s;
            if (i) {
                r = this[typeof i === "string" ? "_append_html_data" : "_append_json_data"](e, typeof i === "string" ? O(O.parseHTML(i)).filter(function() {
                    return this.nodeType !== 3
                }) : i, function(e) {
                    t.call(this, e)
                });
                s = this.get_node(e.id, true);
                if (s && s.length) {
                    s.removeClass("jstree-loading").attr("aria-busy", false)
                }
                delete this._data.massload[e.id];
                return r
            }
            return h._load_node.call(this, e, t)
        }
    }
    ;
    O.jstree.defaults.search = {
        ajax: false,
        fuzzy: false,
        case_sensitive: false,
        show_only_matches: false,
        show_only_matches_children: false,
        close_opened_onclear: true,
        search_leaves_only: false,
        search_callback: false
    };
    O.jstree.plugins.search = function(e, o) {
        this.bind = function() {
            o.bind.call(this);
            this._data.search.str = "";
            this._data.search.dom = O();
            this._data.search.res = [];
            this._data.search.opn = [];
            this._data.search.som = false;
            this._data.search.smc = false;
            this._data.search.hdn = [];
            this.element.on("search.jstree", O.proxy(function(e, t) {
                if (this._data.search.som && t.res.length) {
                    var i = this._model.data, r, s, a = [], n, o;
                    for (r = 0,
                             s = t.res.length; r < s; r++) {
                        if (i[t.res[r]] && !i[t.res[r]].state.hidden) {
                            a.push(t.res[r]);
                            a = a.concat(i[t.res[r]].parents);
                            if (this._data.search.smc) {
                                for (n = 0,
                                         o = i[t.res[r]].children_d.length; n < o; n++) {
                                    if (i[i[t.res[r]].children_d[n]] && !i[i[t.res[r]].children_d[n]].state.hidden) {
                                        a.push(i[t.res[r]].children_d[n])
                                    }
                                }
                            }
                        }
                    }
                    a = O.vakata.array_remove_item(O.vakata.array_unique(a), O.jstree.root);
                    this._data.search.hdn = this.hide_all(true);
                    this.show_node(a, true);
                    this.redraw(true)
                }
            }, this)).on("clear_search.jstree", O.proxy(function(e, t) {
                if (this._data.search.som && t.res.length) {
                    this.show_node(this._data.search.hdn, true);
                    this.redraw(true)
                }
            }, this))
        }
        ;
        this.search = function(r, e, t, i, s, a) {
            if (r === false || O.trim(r.toString()) === "") {
                return this.clear_search()
            }
            i = this.get_node(i);
            i = i && i.id ? i.id : null;
            r = r.toString();
            var n = this.settings.search, o = n.ajax ? n.ajax : false, d = this._model.data, l = null, c = [], h = [], f, _;
            if (this._data.search.res.length && !s) {
                this.clear_search()
            }
            if (t === S) {
                t = n.show_only_matches
            }
            if (a === S) {
                a = n.show_only_matches_children
            }
            if (!e && o !== false) {
                if (O.isFunction(o)) {
                    return o.call(this, r, O.proxy(function(e) {
                        if (e && e.d) {
                            e = e.d
                        }
                        this._load_nodes(!O.isArray(e) ? [] : O.vakata.array_unique(e), function() {
                            this.search(r, true, t, i, s, a)
                        })
                    }, this), i)
                } else {
                    o = O.extend({}, o);
                    if (!o.data) {
                        o.data = {}
                    }
                    o.data.str = r;
                    if (i) {
                        o.data.inside = i
                    }
                    if (this._data.search.lastRequest) {
                        this._data.search.lastRequest.abort()
                    }
                    this._data.search.lastRequest = O.ajax(o).fail(O.proxy(function() {
                        this._data.core.last_error = {
                            error: "ajax",
                            plugin: "search",
                            id: "search_01",
                            reason: "Could not load search parents",
                            data: JSON.stringify(o)
                        };
                        this.settings.core.error.call(this, this._data.core.last_error)
                    }, this)).done(O.proxy(function(e) {
                        if (e && e.d) {
                            e = e.d
                        }
                        this._load_nodes(!O.isArray(e) ? [] : O.vakata.array_unique(e), function() {
                            this.search(r, true, t, i, s, a)
                        })
                    }, this));
                    return this._data.search.lastRequest
                }
            }
            if (!s) {
                this._data.search.str = r;
                this._data.search.dom = O();
                this._data.search.res = [];
                this._data.search.opn = [];
                this._data.search.som = t;
                this._data.search.smc = a
            }
            l = new O.vakata.search(r,true,{
                caseSensitive: n.case_sensitive,
                fuzzy: n.fuzzy
            });
            O.each(d[i ? i : O.jstree.root].children_d, function(e, t) {
                var i = d[t];
                if (i.text && !i.state.hidden && (!n.search_leaves_only || i.state.loaded && i.children.length === 0) && (n.search_callback && n.search_callback.call(this, r, i) || !n.search_callback && l.search(i.text).isMatch)) {
                    c.push(t);
                    h = h.concat(i.parents)
                }
            });
            if (c.length) {
                h = O.vakata.array_unique(h);
                for (f = 0,
                         _ = h.length; f < _; f++) {
                    if (h[f] !== O.jstree.root && d[h[f]] && this.open_node(h[f], null, 0) === true) {
                        this._data.search.opn.push(h[f])
                    }
                }
                if (!s) {
                    this._data.search.dom = O(this.element[0].querySelectorAll("#" + O.map(c, function(e) {
                        return "0123456789".indexOf(e[0]) !== -1 ? "\\3" + e[0] + " " + e.substr(1).replace(O.jstree.idregex, "\\$&") : e.replace(O.jstree.idregex, "\\$&")
                    }).join(", #")));
                    this._data.search.res = c
                } else {
                    this._data.search.dom = this._data.search.dom.add(O(this.element[0].querySelectorAll("#" + O.map(c, function(e) {
                        return "0123456789".indexOf(e[0]) !== -1 ? "\\3" + e[0] + " " + e.substr(1).replace(O.jstree.idregex, "\\$&") : e.replace(O.jstree.idregex, "\\$&")
                    }).join(", #"))));
                    this._data.search.res = O.vakata.array_unique(this._data.search.res.concat(c))
                }
                this._data.search.dom.children(".jstree-anchor").addClass("jstree-search")
            }
            this.trigger("search", {
                nodes: this._data.search.dom,
                str: r,
                res: this._data.search.res,
                show_only_matches: t
            })
        }
        ;
        this.clear_search = function() {
            if (this.settings.search.close_opened_onclear) {
                this.close_node(this._data.search.opn, 0)
            }
            this.trigger("clear_search", {
                nodes: this._data.search.dom,
                str: this._data.search.str,
                res: this._data.search.res
            });
            if (this._data.search.res.length) {
                this._data.search.dom = O(this.element[0].querySelectorAll("#" + O.map(this._data.search.res, function(e) {
                    return "0123456789".indexOf(e[0]) !== -1 ? "\\3" + e[0] + " " + e.substr(1).replace(O.jstree.idregex, "\\$&") : e.replace(O.jstree.idregex, "\\$&")
                }).join(", #")));
                this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search")
            }
            this._data.search.str = "";
            this._data.search.res = [];
            this._data.search.opn = [];
            this._data.search.dom = O()
        }
        ;
        this.redraw_node = function(e, t, i, r) {
            e = o.redraw_node.apply(this, arguments);
            if (e) {
                if (O.inArray(e.id, this._data.search.res) !== -1) {
                    var s, a, n = null;
                    for (s = 0,
                             a = e.childNodes.length; s < a; s++) {
                        if (e.childNodes[s] && e.childNodes[s].className && e.childNodes[s].className.indexOf("jstree-anchor") !== -1) {
                            n = e.childNodes[s];
                            break
                        }
                    }
                    if (n) {
                        n.className += " jstree-search"
                    }
                }
            }
            return e
        }
    }
    ;
    (function(i) {
            i.vakata.search = function(p, e, m) {
                m = m || {};
                m = i.extend({}, i.vakata.search.defaults, m);
                if (m.fuzzy !== false) {
                    m.fuzzy = true
                }
                p = m.caseSensitive ? p : p.toLowerCase();
                var v = m.location, s = m.distance, j = m.threshold, y = p.length, k, x, b, t;
                if (y > 32) {
                    m.fuzzy = false
                }
                if (m.fuzzy) {
                    k = 1 << y - 1;
                    x = function() {
                        var e = {}
                            , t = 0;
                        for (t = 0; t < y; t++) {
                            e[p.charAt(t)] = 0
                        }
                        for (t = 0; t < y; t++) {
                            e[p.charAt(t)] |= 1 << y - t - 1
                        }
                        return e
                    }();
                    b = function(e, t) {
                        var i = e / y
                            , r = Math.abs(v - t);
                        if (!s) {
                            return r ? 1 : i
                        }
                        return i + r / s
                    }
                }
                t = function(e) {
                    e = m.caseSensitive ? e : e.toLowerCase();
                    if (p === e || e.indexOf(p) !== -1) {
                        return {
                            isMatch: true,
                            score: 0
                        }
                    }
                    if (!m.fuzzy) {
                        return {
                            isMatch: false,
                            score: 1
                        }
                    }
                    var t, i, r = e.length, s = j, a = e.indexOf(p, v), n, o, d = y + r, l, c, h, f, _, u = 1, g = [];
                    if (a !== -1) {
                        s = Math.min(b(0, a), s);
                        a = e.lastIndexOf(p, v + y);
                        if (a !== -1) {
                            s = Math.min(b(0, a), s)
                        }
                    }
                    a = -1;
                    for (t = 0; t < y; t++) {
                        n = 0;
                        o = d;
                        while (n < o) {
                            if (b(t, v + o) <= s) {
                                n = o
                            } else {
                                d = o
                            }
                            o = Math.floor((d - n) / 2 + n)
                        }
                        d = o;
                        c = Math.max(1, v - o + 1);
                        h = Math.min(v + o, r) + y;
                        f = new Array(h + 2);
                        f[h + 1] = (1 << t) - 1;
                        for (i = h; i >= c; i--) {
                            _ = x[e.charAt(i - 1)];
                            if (t === 0) {
                                f[i] = (f[i + 1] << 1 | 1) & _
                            } else {
                                f[i] = (f[i + 1] << 1 | 1) & _ | ((l[i + 1] | l[i]) << 1 | 1) | l[i + 1]
                            }
                            if (f[i] & k) {
                                u = b(t, i - 1);
                                if (u <= s) {
                                    s = u;
                                    a = i - 1;
                                    g.push(a);
                                    if (a > v) {
                                        c = Math.max(1, 2 * v - a)
                                    } else {
                                        break
                                    }
                                }
                            }
                        }
                        if (b(t + 1, v) > s) {
                            break
                        }
                        l = f
                    }
                    return {
                        isMatch: a >= 0,
                        score: u
                    }
                }
                ;
                return e === true ? {
                    search: t
                } : t(e)
            }
            ;
            i.vakata.search.defaults = {
                location: 0,
                distance: 100,
                threshold: .6,
                fuzzy: false,
                caseSensitive: false
            }
        }
    )(O);
    O.jstree.defaults.sort = function(e, t) {
        return this.get_text(e) > this.get_text(t) ? 1 : -1
    }
    ;
    O.jstree.plugins.sort = function(e, t) {
        this.bind = function() {
            t.bind.call(this);
            this.element.on("model.jstree", O.proxy(function(e, t) {
                this.sort(t.parent, true)
            }, this)).on("rename_node.jstree create_node.jstree", O.proxy(function(e, t) {
                this.sort(t.parent || t.node.parent, false);
                this.redraw_node(t.parent || t.node.parent, true)
            }, this)).on("move_node.jstree copy_node.jstree", O.proxy(function(e, t) {
                this.sort(t.parent, false);
                this.redraw_node(t.parent, true)
            }, this))
        }
        ;
        this.sort = function(e, t) {
            var i, r;
            e = this.get_node(e);
            if (e && e.children && e.children.length) {
                e.children.sort(O.proxy(this.settings.sort, this));
                if (t) {
                    for (i = 0,
                             r = e.children_d.length; i < r; i++) {
                        this.sort(e.children_d[i], false)
                    }
                }
            }
        }
    }
    ;
    var h = false;
    O.jstree.defaults.state = {
        key: "jstree",
        events: "changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree",
        ttl: false,
        filter: false,
        preserve_loaded: false
    };
    O.jstree.plugins.state = function(e, t) {
        this.bind = function() {
            t.bind.call(this);
            var i = O.proxy(function() {
                this.element.on(this.settings.state.events, O.proxy(function() {
                    if (h) {
                        clearTimeout(h)
                    }
                    h = setTimeout(O.proxy(function() {
                        this.save_state()
                    }, this), 100)
                }, this));
                this.trigger("state_ready")
            }, this);
            this.element.on("ready.jstree", O.proxy(function(e, t) {
                this.element.one("restore_state.jstree", i);
                if (!this.restore_state()) {
                    i()
                }
            }, this))
        }
        ;
        this.save_state = function() {
            var e = this.get_state();
            if (!this.settings.state.preserve_loaded) {
                delete e.core.loaded
            }
            var t = {
                state: e,
                ttl: this.settings.state.ttl,
                sec: +new Date
            };
            O.vakata.storage.set(this.settings.state.key, JSON.stringify(t))
        }
        ;
        this.restore_state = function() {
            var i = O.vakata.storage.get(this.settings.state.key);
            if (!!i) {
                try {
                    i = JSON.parse(i)
                } catch (e) {
                    return false
                }
            }
            if (!!i && i.ttl && i.sec && +new Date - i.sec > i.ttl) {
                return false
            }
            if (!!i && i.state) {
                i = i.state
            }
            if (!!i && O.isFunction(this.settings.state.filter)) {
                i = this.settings.state.filter.call(this, i)
            }
            if (!!i) {
                if (!this.settings.state.preserve_loaded) {
                    delete i.core.loaded
                }
                this.element.one("set_state.jstree", function(e, t) {
                    t.instance.trigger("restore_state", {
                        state: O.extend(true, {}, i)
                    })
                });
                this.set_state(i);
                return true
            }
            return false
        }
        ;
        this.clear_state = function() {
            return O.vakata.storage.del(this.settings.state.key)
        }
    }
    ;
    (function(e, t) {
            e.vakata.storage = {
                set: function(e, t) {
                    return window.localStorage.setItem(e, t)
                },
                get: function(e) {
                    return window.localStorage.getItem(e)
                },
                del: function(e) {
                    return window.localStorage.removeItem(e)
                }
            }
        }
    )(O);
    O.jstree.defaults.types = {
        default: {}
    };
    O.jstree.defaults.types[O.jstree.root] = {};
    O.jstree.plugins.types = function(e, c) {
        this.init = function(e, t) {
            var i, r;
            if (t && t.types && t.types["default"]) {
                for (i in t.types) {
                    if (i !== "default" && i !== O.jstree.root && t.types.hasOwnProperty(i)) {
                        for (r in t.types["default"]) {
                            if (t.types["default"].hasOwnProperty(r) && t.types[i][r] === S) {
                                t.types[i][r] = t.types["default"][r]
                            }
                        }
                    }
                }
            }
            c.init.call(this, e, t);
            this._model.data[O.jstree.root].type = O.jstree.root
        }
        ;
        this.refresh = function(e, t) {
            c.refresh.call(this, e, t);
            this._model.data[O.jstree.root].type = O.jstree.root
        }
        ;
        this.bind = function() {
            this.element.on("model.jstree", O.proxy(function(e, t) {
                var i = this._model.data, r = t.nodes, s = this.settings.types, a, n, o = "default", d;
                for (a = 0,
                         n = r.length; a < n; a++) {
                    o = "default";
                    if (i[r[a]].original && i[r[a]].original.type && s[i[r[a]].original.type]) {
                        o = i[r[a]].original.type
                    }
                    if (i[r[a]].data && i[r[a]].data.jstree && i[r[a]].data.jstree.type && s[i[r[a]].data.jstree.type]) {
                        o = i[r[a]].data.jstree.type
                    }
                    i[r[a]].type = o;
                    if (i[r[a]].icon === true && s[o].icon !== S) {
                        i[r[a]].icon = s[o].icon
                    }
                    if (s[o].li_attr !== S && typeof s[o].li_attr === "object") {
                        for (d in s[o].li_attr) {
                            if (s[o].li_attr.hasOwnProperty(d)) {
                                if (d === "id") {
                                    continue
                                } else if (i[r[a]].li_attr[d] === S) {
                                    i[r[a]].li_attr[d] = s[o].li_attr[d]
                                } else if (d === "class") {
                                    i[r[a]].li_attr["class"] = s[o].li_attr["class"] + " " + i[r[a]].li_attr["class"]
                                }
                            }
                        }
                    }
                    if (s[o].a_attr !== S && typeof s[o].a_attr === "object") {
                        for (d in s[o].a_attr) {
                            if (s[o].a_attr.hasOwnProperty(d)) {
                                if (d === "id") {
                                    continue
                                } else if (i[r[a]].a_attr[d] === S) {
                                    i[r[a]].a_attr[d] = s[o].a_attr[d]
                                } else if (d === "href" && i[r[a]].a_attr[d] === "#") {
                                    i[r[a]].a_attr["href"] = s[o].a_attr["href"]
                                } else if (d === "class") {
                                    i[r[a]].a_attr["class"] = s[o].a_attr["class"] + " " + i[r[a]].a_attr["class"]
                                }
                            }
                        }
                    }
                }
                i[O.jstree.root].type = O.jstree.root
            }, this));
            c.bind.call(this)
        }
        ;
        this.get_json = function(e, t, i) {
            var r, s, a = this._model.data, n = t ? O.extend(true, {}, t, {
                no_id: false
            }) : {}, o = c.get_json.call(this, e, n, i);
            if (o === false) {
                return false
            }
            if (O.isArray(o)) {
                for (r = 0,
                         s = o.length; r < s; r++) {
                    o[r].type = o[r].id && a[o[r].id] && a[o[r].id].type ? a[o[r].id].type : "default";
                    if (t && t.no_id) {
                        delete o[r].id;
                        if (o[r].li_attr && o[r].li_attr.id) {
                            delete o[r].li_attr.id
                        }
                        if (o[r].a_attr && o[r].a_attr.id) {
                            delete o[r].a_attr.id
                        }
                    }
                }
            } else {
                o.type = o.id && a[o.id] && a[o.id].type ? a[o.id].type : "default";
                if (t && t.no_id) {
                    o = this._delete_ids(o)
                }
            }
            return o
        }
        ;
        this._delete_ids = function(e) {
            if (O.isArray(e)) {
                for (var t = 0, i = e.length; t < i; t++) {
                    e[t] = this._delete_ids(e[t])
                }
                return e
            }
            delete e.id;
            if (e.li_attr && e.li_attr.id) {
                delete e.li_attr.id
            }
            if (e.a_attr && e.a_attr.id) {
                delete e.a_attr.id
            }
            if (e.children && O.isArray(e.children)) {
                e.children = this._delete_ids(e.children)
            }
            return e
        }
        ;
        this.check = function(e, t, i, r, s) {
            if (c.check.call(this, e, t, i, r, s) === false) {
                return false
            }
            t = t && t.id ? t : this.get_node(t);
            i = i && i.id ? i : this.get_node(i);
            var a = t && t.id ? s && s.origin ? s.origin : O.jstree.reference(t.id) : null, n, o, d, l;
            a = a && a._model && a._model.data ? a._model.data : null;
            switch (e) {
                case "create_node":
                case "move_node":
                case "copy_node":
                    if (e !== "move_node" || O.inArray(t.id, i.children) === -1) {
                        n = this.get_rules(i);
                        if (n.max_children !== S && n.max_children !== -1 && n.max_children === i.children.length) {
                            this._data.core.last_error = {
                                error: "check",
                                plugin: "types",
                                id: "types_01",
                                reason: "max_children prevents function: " + e,
                                data: JSON.stringify({
                                    chk: e,
                                    pos: r,
                                    obj: t && t.id ? t.id : false,
                                    par: i && i.id ? i.id : false
                                })
                            };
                            return false
                        }
                        if (n.valid_children !== S && n.valid_children !== -1 && O.inArray(t.type || "default", n.valid_children) === -1) {
                            this._data.core.last_error = {
                                error: "check",
                                plugin: "types",
                                id: "types_02",
                                reason: "valid_children prevents function: " + e,
                                data: JSON.stringify({
                                    chk: e,
                                    pos: r,
                                    obj: t && t.id ? t.id : false,
                                    par: i && i.id ? i.id : false
                                })
                            };
                            return false
                        }
                        if (a && t.children_d && t.parents) {
                            o = 0;
                            for (d = 0,
                                     l = t.children_d.length; d < l; d++) {
                                o = Math.max(o, a[t.children_d[d]].parents.length)
                            }
                            o = o - t.parents.length + 1
                        }
                        if (o <= 0 || o === S) {
                            o = 1
                        }
                        do {
                            if (n.max_depth !== S && n.max_depth !== -1 && n.max_depth < o) {
                                this._data.core.last_error = {
                                    error: "check",
                                    plugin: "types",
                                    id: "types_03",
                                    reason: "max_depth prevents function: " + e,
                                    data: JSON.stringify({
                                        chk: e,
                                        pos: r,
                                        obj: t && t.id ? t.id : false,
                                        par: i && i.id ? i.id : false
                                    })
                                };
                                return false
                            }
                            i = this.get_node(i.parent);
                            n = this.get_rules(i);
                            o++
                        } while (i)
                    }
                    break
            }
            return true
        }
        ;
        this.get_rules = function(e) {
            e = this.get_node(e);
            if (!e) {
                return false
            }
            var t = this.get_type(e, true);
            if (t.max_depth === S) {
                t.max_depth = -1
            }
            if (t.max_children === S) {
                t.max_children = -1
            }
            if (t.valid_children === S) {
                t.valid_children = -1
            }
            return t
        }
        ;
        this.get_type = function(e, t) {
            e = this.get_node(e);
            return !e ? false : t ? O.extend({
                type: e.type
            }, this.settings.types[e.type]) : e.type
        }
        ;
        this.set_type = function(e, t) {
            var i = this._model.data, r, s, a, n, o, d, l, c;
            if (O.isArray(e)) {
                e = e.slice();
                for (s = 0,
                         a = e.length; s < a; s++) {
                    this.set_type(e[s], t)
                }
                return true
            }
            r = this.settings.types;
            e = this.get_node(e);
            if (!r[t] || !e) {
                return false
            }
            l = this.get_node(e, true);
            if (l && l.length) {
                c = l.children(".jstree-anchor")
            }
            n = e.type;
            o = this.get_icon(e);
            e.type = t;
            if (o === true || !r[n] || r[n].icon !== S && o === r[n].icon) {
                this.set_icon(e, r[t].icon !== S ? r[t].icon : true)
            }
            if (r[n] && r[n].li_attr !== S && typeof r[n].li_attr === "object") {
                for (d in r[n].li_attr) {
                    if (r[n].li_attr.hasOwnProperty(d)) {
                        if (d === "id") {
                            continue
                        } else if (d === "class") {
                            i[e.id].li_attr["class"] = (i[e.id].li_attr["class"] || "").replace(r[n].li_attr[d], "");
                            if (l) {
                                l.removeClass(r[n].li_attr[d])
                            }
                        } else if (i[e.id].li_attr[d] === r[n].li_attr[d]) {
                            i[e.id].li_attr[d] = null;
                            if (l) {
                                l.removeAttr(d)
                            }
                        }
                    }
                }
            }
            if (r[n] && r[n].a_attr !== S && typeof r[n].a_attr === "object") {
                for (d in r[n].a_attr) {
                    if (r[n].a_attr.hasOwnProperty(d)) {
                        if (d === "id") {
                            continue
                        } else if (d === "class") {
                            i[e.id].a_attr["class"] = (i[e.id].a_attr["class"] || "").replace(r[n].a_attr[d], "");
                            if (c) {
                                c.removeClass(r[n].a_attr[d])
                            }
                        } else if (i[e.id].a_attr[d] === r[n].a_attr[d]) {
                            if (d === "href") {
                                i[e.id].a_attr[d] = "#";
                                if (c) {
                                    c.attr("href", "#")
                                }
                            } else {
                                delete i[e.id].a_attr[d];
                                if (c) {
                                    c.removeAttr(d)
                                }
                            }
                        }
                    }
                }
            }
            if (r[t].li_attr !== S && typeof r[t].li_attr === "object") {
                for (d in r[t].li_attr) {
                    if (r[t].li_attr.hasOwnProperty(d)) {
                        if (d === "id") {
                            continue
                        } else if (i[e.id].li_attr[d] === S) {
                            i[e.id].li_attr[d] = r[t].li_attr[d];
                            if (l) {
                                if (d === "class") {
                                    l.addClass(r[t].li_attr[d])
                                } else {
                                    l.attr(d, r[t].li_attr[d])
                                }
                            }
                        } else if (d === "class") {
                            i[e.id].li_attr["class"] = r[t].li_attr[d] + " " + i[e.id].li_attr["class"];
                            if (l) {
                                l.addClass(r[t].li_attr[d])
                            }
                        }
                    }
                }
            }
            if (r[t].a_attr !== S && typeof r[t].a_attr === "object") {
                for (d in r[t].a_attr) {
                    if (r[t].a_attr.hasOwnProperty(d)) {
                        if (d === "id") {
                            continue
                        } else if (i[e.id].a_attr[d] === S) {
                            i[e.id].a_attr[d] = r[t].a_attr[d];
                            if (c) {
                                if (d === "class") {
                                    c.addClass(r[t].a_attr[d])
                                } else {
                                    c.attr(d, r[t].a_attr[d])
                                }
                            }
                        } else if (d === "href" && i[e.id].a_attr[d] === "#") {
                            i[e.id].a_attr["href"] = r[t].a_attr["href"];
                            if (c) {
                                c.attr("href", r[t].a_attr["href"])
                            }
                        } else if (d === "class") {
                            i[e.id].a_attr["class"] = r[t].a_attr["class"] + " " + i[e.id].a_attr["class"];
                            if (c) {
                                c.addClass(r[t].a_attr[d])
                            }
                        }
                    }
                }
            }
            return true
        }
    }
    ;
    O.jstree.defaults.unique = {
        case_sensitive: false,
        trim_whitespace: false,
        duplicate: function(e, t) {
            return e + " (" + t + ")"
        }
    };
    O.jstree.plugins.unique = function(e, g) {
        this.check = function(e, t, i, r, s) {
            if (g.check.call(this, e, t, i, r, s) === false) {
                return false
            }
            t = t && t.id ? t : this.get_node(t);
            i = i && i.id ? i : this.get_node(i);
            if (!i || !i.children) {
                return true
            }
            var a = e === "rename_node" ? r : t.text, n = [], o = this.settings.unique.case_sensitive, d = this.settings.unique.trim_whitespace, l = this._model.data, c, h, f;
            for (c = 0,
                     h = i.children.length; c < h; c++) {
                f = l[i.children[c]].text;
                if (!o) {
                    f = f.toLowerCase()
                }
                if (d) {
                    f = f.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                }
                n.push(f)
            }
            if (!o) {
                a = a.toLowerCase()
            }
            if (d) {
                a = a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            }
            switch (e) {
                case "delete_node":
                    return true;
                case "rename_node":
                    f = t.text || "";
                    if (!o) {
                        f = f.toLowerCase()
                    }
                    if (d) {
                        f = f.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                    }
                    c = O.inArray(a, n) === -1 || t.text && f === a;
                    if (!c) {
                        this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_01",
                            reason: "Child with name " + a + " already exists. Preventing: " + e,
                            data: JSON.stringify({
                                chk: e,
                                pos: r,
                                obj: t && t.id ? t.id : false,
                                par: i && i.id ? i.id : false
                            })
                        }
                    }
                    return c;
                case "create_node":
                    c = O.inArray(a, n) === -1;
                    if (!c) {
                        this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_04",
                            reason: "Child with name " + a + " already exists. Preventing: " + e,
                            data: JSON.stringify({
                                chk: e,
                                pos: r,
                                obj: t && t.id ? t.id : false,
                                par: i && i.id ? i.id : false
                            })
                        }
                    }
                    return c;
                case "copy_node":
                    c = O.inArray(a, n) === -1;
                    if (!c) {
                        this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_02",
                            reason: "Child with name " + a + " already exists. Preventing: " + e,
                            data: JSON.stringify({
                                chk: e,
                                pos: r,
                                obj: t && t.id ? t.id : false,
                                par: i && i.id ? i.id : false
                            })
                        }
                    }
                    return c;
                case "move_node":
                    c = t.parent === i.id && (!s || !s.is_multi) || O.inArray(a, n) === -1;
                    if (!c) {
                        this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_03",
                            reason: "Child with name " + a + " already exists. Preventing: " + e,
                            data: JSON.stringify({
                                chk: e,
                                pos: r,
                                obj: t && t.id ? t.id : false,
                                par: i && i.id ? i.id : false
                            })
                        }
                    }
                    return c
            }
            return true
        }
        ;
        this.create_node = function(e, t, i, r, s) {
            if (!t || t.text === S) {
                if (e === null) {
                    e = O.jstree.root
                }
                e = this.get_node(e);
                if (!e) {
                    return g.create_node.call(this, e, t, i, r, s)
                }
                i = i === S ? "last" : i;
                if (!i.toString().match(/^(before|after)$/) && !s && !this.is_loaded(e)) {
                    return g.create_node.call(this, e, t, i, r, s)
                }
                if (!t) {
                    t = {}
                }
                var a, n, o, d, l, c = this._model.data, h = this.settings.unique.case_sensitive, f = this.settings.unique.trim_whitespace, _ = this.settings.unique.duplicate, u;
                n = a = this.get_string("new_node");
                o = [];
                for (d = 0,
                         l = e.children.length; d < l; d++) {
                    u = c[e.children[d]].text;
                    if (!h) {
                        u = u.toLowerCase()
                    }
                    if (f) {
                        u = u.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                    }
                    o.push(u)
                }
                d = 1;
                u = n;
                if (!h) {
                    u = u.toLowerCase()
                }
                if (f) {
                    u = u.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                }
                while (O.inArray(u, o) !== -1) {
                    n = _.call(this, a, ++d).toString();
                    u = n;
                    if (!h) {
                        u = u.toLowerCase()
                    }
                    if (f) {
                        u = u.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                    }
                }
                t.text = n
            }
            return g.create_node.call(this, e, t, i, r, s)
        }
    }
    ;
    var f = k.createElement("DIV");
    f.setAttribute("unselectable", "on");
    f.setAttribute("role", "presentation");
    f.className = "jstree-wholerow";
    f.innerHTML = "&#160;";
    O.jstree.plugins.wholerow = function(e, a) {
        this.bind = function() {
            a.bind.call(this);
            this.element.on("ready.jstree set_state.jstree", O.proxy(function() {
                this.hide_dots()
            }, this)).on("init.jstree loading.jstree ready.jstree", O.proxy(function() {
                this.get_container_ul().addClass("jstree-wholerow-ul")
            }, this)).on("deselect_all.jstree", O.proxy(function(e, t) {
                this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked")
            }, this)).on("changed.jstree", O.proxy(function(e, t) {
                this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked");
                var i = false, r, s;
                for (r = 0,
                         s = t.selected.length; r < s; r++) {
                    i = this.get_node(t.selected[r], true);
                    if (i && i.length) {
                        i.children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                    }
                }
            }, this)).on("open_node.jstree", O.proxy(function(e, t) {
                this.get_node(t.node, true).find(".jstree-clicked").parent().children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
            }, this)).on("hover_node.jstree dehover_node.jstree", O.proxy(function(e, t) {
                if (e.type === "hover_node" && this.is_disabled(t.node)) {
                    return
                }
                this.get_node(t.node, true).children(".jstree-wholerow")[e.type === "hover_node" ? "addClass" : "removeClass"]("jstree-wholerow-hovered")
            }, this)).on("contextmenu.jstree", ".jstree-wholerow", O.proxy(function(e) {
                if (this._data.contextmenu) {
                    e.preventDefault();
                    var t = O.Event("contextmenu", {
                        metaKey: e.metaKey,
                        ctrlKey: e.ctrlKey,
                        altKey: e.altKey,
                        shiftKey: e.shiftKey,
                        pageX: e.pageX,
                        pageY: e.pageY
                    });
                    O(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(t)
                }
            }, this)).on("click.jstree", ".jstree-wholerow", function(e) {
                e.stopImmediatePropagation();
                var t = O.Event("click", {
                    metaKey: e.metaKey,
                    ctrlKey: e.ctrlKey,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey
                });
                O(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(t).focus()
            }).on("dblclick.jstree", ".jstree-wholerow", function(e) {
                e.stopImmediatePropagation();
                var t = O.Event("dblclick", {
                    metaKey: e.metaKey,
                    ctrlKey: e.ctrlKey,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey
                });
                O(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(t).focus()
            }).on("click.jstree", ".jstree-leaf > .jstree-ocl", O.proxy(function(e) {
                e.stopImmediatePropagation();
                var t = O.Event("click", {
                    metaKey: e.metaKey,
                    ctrlKey: e.ctrlKey,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey
                });
                O(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(t).focus()
            }, this)).on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", O.proxy(function(e) {
                e.stopImmediatePropagation();
                if (!this.is_disabled(e.currentTarget)) {
                    this.hover_node(e.currentTarget)
                }
                return false
            }, this)).on("mouseleave.jstree", ".jstree-node", O.proxy(function(e) {
                this.dehover_node(e.currentTarget)
            }, this))
        }
        ;
        this.teardown = function() {
            if (this.settings.wholerow) {
                this.element.find(".jstree-wholerow").remove()
            }
            a.teardown.call(this)
        }
        ;
        this.redraw_node = function(e, t, i, r) {
            e = a.redraw_node.apply(this, arguments);
            if (e) {
                var s = f.cloneNode(true);
                if (O.inArray(e.id, this._data.core.selected) !== -1) {
                    s.className += " jstree-wholerow-clicked"
                }
                if (this._data.core.focused && this._data.core.focused === e.id) {
                    s.className += " jstree-wholerow-hovered"
                }
                e.insertBefore(s, e.childNodes[0])
            }
            return e
        }
    }
    ;
    if (window.customElements && Object && Object.create) {
        var t = Object.create(HTMLElement.prototype);
        t.createdCallback = function() {
            var e = {
                core: {},
                plugins: []
            }, t;
            for (t in O.jstree.plugins) {
                if (O.jstree.plugins.hasOwnProperty(t) && this.attributes[t]) {
                    e.plugins.push(t);
                    if (this.getAttribute(t) && JSON.parse(this.getAttribute(t))) {
                        e[t] = JSON.parse(this.getAttribute(t))
                    }
                }
            }
            for (t in O.jstree.defaults.core) {
                if (O.jstree.defaults.core.hasOwnProperty(t) && this.attributes[t]) {
                    e.core[t] = JSON.parse(this.getAttribute(t)) || this.getAttribute(t)
                }
            }
            O(this).jstree(e)
        }
        ;
        try {
            window.customElements.define("vakata-jstree", function() {}, {
                prototype: t
            })
        } catch (e) {}
    }
    return O.jstree
});
