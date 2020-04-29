
layui.extend({
    // 第三方包
    jstree: 'libs/jstree/jstree.min',
    echarts: "libs/echarts.min",
    split: "libs/split.min",
    vue: "libs/vue.min",
    // 扩展包
    upload: "extends/upload/upload",
    autocomplete: "extends/autocomplete/autocomplete",
    formSelect: 'extends/formSelect/formSelect',
    wangEditor: 'extends/wangEditor/wangEditor',
    wangEditorLight: 'extends/wangEditor/wangEditor.light',
    circleProgress: 'extends/circle-progress',
    // 服务包
    pickerUser: 'modules/picker/picker_user',
}).define(["layer", "element"], function (exports) {
    var adminConfig = {
        version: '0.0.1',
        debug: true,
        container: 'lumina_app',
        MOD_NAME: 'admin',
        base: layui.cache.base, //记录静态资源所在路径
    }
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        $window = $(window),
        $body = $("body"),
        device = layui.device(),
        $container = $("#" + adminConfig.container),
        $appBody = $("#xapp_body"),

        showClas = "layui-show",
        hideClass = "layui-hide",
        activeClass = "layui-this",
        disabledClass = "layui-disabled",

        $navs = "#lumina_tabs",

        layNavs = "lay_lumina_tabs",
        v = "lumina-side-spread-sm",
        $tabsBody = "lumina-tabsbody-item",
        $flexible = "xapp_flexible",
        $fixibleOutIcon = "fa-outdent",
        $fixibleInIcon = "fa-indent",
        shrink_class = "lumina-side-shrink",
        xb_side_menu = "xb-system-side-menu";

    var Admin = {
        version: "0.0.1",
        escape: function (e) {
            return String(e || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
        },
        on: function (e, a) {
            return layui.onevent.call(this, adminConfig.MOD_NAME, e, a)
        },
        screen: function () {
            var e = $body.width();
            return e > 1200 ? 3 : e > 992 ? 2 : e > 768 ? 1 : 0
        },
        sideFlexible: function (e) {
            var i = $container,
                $bar = $("#" + $flexible),
                l = Admin.screen();

            var __shrink_class = device.mobile?shrink_class+'-m':shrink_class;
            if("spread" === e) {
                i.removeClass(__shrink_class)
                $bar.removeClass($fixibleInIcon).addClass($fixibleOutIcon);
                // l < 2 ? i.addClass(v) : i.removeClass(v);
                // i.removeClass(C)
            }else{
                i.addClass(__shrink_class)
                $bar.removeClass($fixibleOutIcon).addClass($fixibleInIcon);
            }
            layui.event.call(this, adminConfig.MOD_NAME, "side({*})", {
                status: e
            })
        },
        tabsPage: {},
        tabsBody: function (e) {
            return $appBody.find("." + $tabsBody).eq(e || 0)
        },
        tabsBodyChange: function (e, a) {
            a = a || {}, Admin.tabsBody(e).addClass(showClas).siblings().removeClass(showClas), AdminFunction.rollPage("auto", e), layui.event.call(this, adminConfig.MOD_NAME, "tabsPage({*})", {
                url: a.url,
                text: a.text
            })
        },
        resize: function (e) {
            var a = layui.router(),
                i = a.path.join("-");
            Admin.resizeFn[i] && (r.off("resize", Admin.resizeFn[i]), delete Admin.resizeFn[i]), "off" !== e && (e(), Admin.resizeFn[i] = e, r.on("resize", Admin.resizeFn[i]))
        },
        resizeFn: {},
        runResize: function () {
            var e = layui.router(),
                a = e.path.join("-");
            Admin.resizeFn[a] && Admin.resizeFn[a]()
        },
        delResize: function () {
            this.resize("off")
        },
        fullScreen: function () {
            var e = document.documentElement,
                a = e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen;
            "undefined" != typeof a && a && a.call(e)
        },
        exitScreen: function () {
            document.documentElement;
            document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
        }
    };
    var AdminFunction = Admin.events = {
        flexible: function (e) {
            var i = $container.hasClass(shrink_class) || $container.hasClass(shrink_class+'-m');
            Admin.sideFlexible(i ? "spread" : null)
        },
        message: function (e) {
            e.find(".layui-badge-dot").remove()
        },
        fullscreen: function (e) {
            var a = "fa-screen-full",
                i = "fa-screen-restore",
                t = e.children("i");
            t.hasClass(a) ? (Admin.fullScreen(), t.addClass(i).removeClass(a)) : (Admin.exitScreen(), t.addClass(a).removeClass(i))
        },
        back: function () {
            history.back()
        },
        setTheme: function (e) {
            var a = e.data("index");
            e.siblings(".layui-this").data("index");
            e.hasClass(y) || (e.addClass(y).siblings(".layui-this").removeClass(y), Admin.initTheme(a))
        },
        rollPage: function (e, i) {
            var t = $("#lumina_tabs"),
                n = t.children("li"),
                l = (t.prop("scrollWidth"), t.outerWidth()),
                s = parseFloat(t.css("left"));
            if ("left" === e) {
                if (!s && s <= 0) return;
                var r = -s - l;
                n.each(function (e, i) {
                    var n = $(i),
                        l = n.position().left;
                    if (l >= r) return t.css("left", -l), !1
                })
            } else "auto" === e ? ! function () {
                var e, r = n.eq(i);
                if (r[0]) {
                    if (e = r.position().left, e < -s) return t.css("left", -e);
                    if (e + r.outerWidth() >= l - s) {
                        var o = e + r.outerWidth() - (l - s);
                        n.each(function (e, i) {
                            var n = $(i),
                                l = n.position().left;
                            if (l + s > 0 && l - s > o) return t.css("left", -l), !1
                        })
                    }
                }
            }() : n.each(function (e, i) {
                var n = $(i),
                    r = n.position().left;
                if (r + n.outerWidth() >= l - s) return t.css("left", -r), !1
            })
        },
        leftPage: function () {
            AdminFunction.rollPage("left")
        },
        rightPage: function () {
            AdminFunction.rollPage()
        },
        refreshThisTab: function () {
            var e = ".lumina-iframe",
                i = $($navs + ">li").length;
            Admin.tabsPage.index >= i && (Admin.tabsPage.index = i - 1);
            var t = Admin.tabsBody(Admin.tabsPage.index).find(e);
            t[0].contentWindow.location.reload(!0)
        },
        openThisTab: function(){
            var _idx = $(this).data('idx') || Admin.tabsPage.index
            var _href = $($navs + ">li").eq(_idx).attr('lay-attr');
            window.parent.open(_href)
        },
        closeThisTabs: function () {
            var _idx = $(this).data('idx') || Admin.tabsPage.index
            _idx && $($navs + ">li").eq(_idx).find(".fa-close").trigger("click")
        },
        closeOtherTabs: function (isall) {
            var i = "xb-system-pagetabs-remove";
            var _idx = $(this).data('idx') || Admin.tabsPage.index
            if("all" === isall) {
                $($navs + ">li").each(function (idx, item) {
                    if(idx) {
                        $(item).find(".fa-close").trigger("click")
                    }
                });
            }else{
                $($navs + ">li").each(function (idx, item) {
                    if(idx != _idx && idx) {
                        $(item).find(".fa-close").trigger("click")
                    }
                });
            }
        },
        closeAllTabs: function () {
            AdminFunction.closeOtherTabs("all")
        },
        shade: function () {
            Admin.sideFlexible()
        }
    };
    Admin.on("tabsPage(setMenustatus)", function (e) {
        var i = e.url;
        var t = function (e) {
            return {
                list: e.children(".layui-nav-child"),
                a: e.children("*[lay-href]")
            }
        };
        var n = $("#" + xb_side_menu),
            l = "layui-nav-itemed",
            s = function (e) {
                e.each(function (e, n) {
                    var s = $(n),
                        r = t(s),
                        o = r.list.children("dd"),
                        u = i === r.a.attr("lay-href");
                    if (o.each(function (e, n) {
                        var s = $(n),
                            r = t(s),
                            o = r.list.children("dd"),
                            u = i === r.a.attr("lay-href");
                        if (o.each(function (e, n) {
                            var s = $(n),
                                r = t(s),
                                o = i === r.a.attr("lay-href");
                            if (o) {
                                var u = r.list[0] ? l : y;
                                return s.addClass(u).siblings().removeClass(u), !1
                            }
                        }), u) {
                            var d = r.list[0] ? l : activeClass;
                            return s.addClass(showClas).siblings().removeClass(showClas), !1
                        }
                    }), u) {
                        var d = r.list[0] ? l : activeClass;
                        return s.addClass(showClas).siblings().removeClass(showClas), !1
                    }
                })
            };
        n.find("." + activeClass).removeClass(activeClass), Admin.screen() < 2 && Admin.sideFlexible(), s(n.children("li"))
    });

    element.on("tab(" + layNavs + ")", function (e) {
        Admin.tabsPage.index = e.index
    });
    element.on("nav(lumina-system-side-menu)", function (e) {
        e.siblings(".layui-nav-child")[0] && $container.hasClass(shrink_class) && (Admin.sideFlexible("spread"), layer.close(e.data("index")));
        Admin.tabsPage.type = "nav"
    });
    element.on("nav(lumina-pagetabs-nav)", function (e) {
        var a = e.parent();
        a.removeClass(activeClass), a.parent().removeClass('layui-nav-itemed')
    });
    element.on("tabDelete(" + layNavs + ")", function (e) {
        var _index = $("#xapp_tabsheader>li .layui-this").index();
        e.index && Admin.tabsBody(e.index).remove();
        Admin.tabsBodyChange(_index)
        Admin.delResize()
    });

    $body.on("click", $navs + ">li", function () {
        var $self = $(this),
            _url = ($self.attr("lay-id"), $self.attr("lay-attr")),
            i = $self.index();
        Admin.tabsPage.type = "tab"
        Admin.tabsPage.index = i

        Admin.tabsBodyChange(i, {url: _url})
    });
    $body.on("click", "*[lay-href]", function () {
        var $this = $(this),
            _id = $this.parent("dd").data('id'),
            _href = $this.attr("lay-href"),
            _text = $this.attr("lay-text");
        layui.router();

        Admin.tabsPage.elem = $this;
        var frame = parent === self ? layui : top.layui;
        frame.admin.openTab(_href, _text || $this.text(), _id)
    });
    $body.on("click", "*[lumina-event]", function () {
        var e = $(this),
            i = e.attr("lumina-event");
        AdminFunction[i] && AdminFunction[i].call(this, e)
    });
    $body.on("mouseenter", "*[lay-tips]", function () {
        var e = $(this);
        if (!e.parent().hasClass("layui-nav-item") || $container.hasClass(shrink_class)) {
            var i = e.attr("lay-tips"),
                t = e.attr("lay-offset"),
                n = e.attr("lay-direction"),
                l = layer.tips(i, this, {
                    tips: n || 1,
                    time: -1,
                    success: function (e, a) {
                        t && e.css("margin-left", t + "px")
                    }
                });
            e.data("index", l)
        }
    }).on("mouseleave", "*[lay-tips]", function () {
        layer.close($(this).data("index"))
    });
    var _ = layui.data.resizeSystem = function () {
        layer.closeAll("tips"), _.lock || setTimeout(function () {
            Admin.sideFlexible(Admin.screen() < 2 ? "" : "spread"), delete _.lock
        }, 100), _.lock = !0
    };

    // 打开tab页面
    Admin.openTab = function(href, title, tabid){
        var hasOpened, _tabs = $($navs).find("li"),
            tabID = tabid || href.replace(location.origin, "");

        _tabs.each(function (idx) {
            var $this = $(this),
                _id = $this.attr("lay-id");
            _id === tabID && (hasOpened = !0, Admin.tabsPage.index = idx)
        })

        if (title = title || "新标签页") {
            if(!hasOpened){
                $appBody.append(['<div class="lumina-tabsbody-item layui-show">', '<iframe src="' + href + '" frameborder="0" class="lumina-iframe"></iframe>', "</div>"].join(""));
                Admin.tabsPage.index = _tabs.length;

                element.tabAdd(layNavs, {
                    title: "<span>" + title + "</span>",
                    id: tabID,
                    attr: href,
                    context: true
                })
            }
        } else {
            var u = Admin.tabsBody(Admin.tabsPage.index).find(".lumina-iframe");
            u[0].contentWindow.location.href = href
        }

        // window.location.hash = tabID
        element.tabChange(layNavs, tabID)
        Admin.tabsBodyChange(Admin.tabsPage.index, {
            url: href,
            text: title
        })
    }
    // Drawer 组件
    Admin.openModal = function(content, title, option){
        var frame = parent === self ? self : parent;
        var type = content.search(/^((https|http)?:\/\/)[^\s]+/) > -1 ? 2 : 1;
        return frame.layer.open($.extend({
            type: type,
            id: "lumina_drawer_right",
            anim: -1,
            title: title,
            closeBtn: 1,
            offset: "r",
            shade: .1,
            content: content,
            skin: "layui-anim layui-anim-rl layui-layer-adminRight",
            area: "800px"
        }, option))
    }

    // 全局请求
    Admin.request = {
        _handleException: function(jqXHR, textStatus, errorThrown){

        },
        _handleRes: function(res, cb){
            if(res.errcode != 0) {
                layer.msg(res.msg?res.msg:'未知错误,请刷新重试!');
                return false;
            }
            "function" == typeof cb && cb(res);
            return true;
        },
        ajax: function(option) {
            var self = this
            $.ajax({
                cache: option.cache || false,
                type: option.type,
                url: option.url,
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'Accept': 'application/json', 'X-Requested-With':'XMLHttpRequest'},
                data: option.data,
                dataType: option.dataType,
                success: function(res){
                    self._handleRes(res, option.success)
                },
                error: function(jqXHR, textStatus, errorThrown){
                    self._handleException(jqXHR, textStatus, errorThrown)
                }
            })
        },
        get: function(url, data, cb){
            var self = this
            $.ajax({
                url: url,
                type: 'get',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),'Accept': 'application/json', 'X-Requested-With':'XMLHttpRequest'},
                data: data,
                dataType: 'json',
                success: function(res){
                    self._handleRes(res, cb)
                },
                error: function(jqXHR, textStatus, errorThrown){
                    self._handleException(jqXHR, textStatus, errorThrown)
                }
            })
        },
        post: function(url, data, cb){
            var self = this
            $.ajax({
                url: url,
                type: 'post',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),'Accept': 'application/json', 'X-Requested-With':'XMLHttpRequest'},
                data: data,
                dataType: 'json',
                success: function(res){
                    self._handleRes(res, cb)
                },
                error: function(jqXHR, textStatus, errorThrown){
                    self._handleException(jqXHR, textStatus, errorThrown)
                }
            })
        }
    }

    // 全局加载
    var _loadHtml = ['<div id="g-alert"><div class="alert-bd" style="animation-delay: 1s;top:12px;">','<div class="bd shadow border rounded-lg">','<i class="fa fa-spinner fa-pulse mr-1"></i>'
        ,'<span>加载中...</span></div></div></div></div>'].join('');
    Admin.load = {
        show: function(){
            $("body").append(_loadHtml)
            // loading = parent.layer.load(2)
            // return true;
        },
        hide: function(){
            $("#g-alert").remove()
        }
    }

    // Admin.screen() < 2 && Admin.sideFlexible();
    $body.on("resize", layui.data.resizeSystem);
    exports("admin", Admin);
});
