"use strict";layui.extend({jstree:"libs/jstree/jstree.min",echarts:"libs/echarts.min",split:"libs/split.min",upload:"extends/upload/upload",autocomplete:"extends/autocomplete",formSelect:"extends/formSelect/formSelect",wangEditor:"extends/wangEditor/wangEditor",wangEditorLight:"extends/wangEditor/wangEditor.light",circleProgress:"extends/circle-progress",pickerUser:"modules/picker/picker_user"}).define(["layer","element"],function(e){var a="lumina_app",i="admin",c=(layui.cache.base,layui.jquery),s=layui.element,l=layui.layer,t=(c(window),c("body")),o=layui.device(),d=c("#"+a),u=c("#xapp_body"),f="layui-show",n="layui-this",h="#lumina_tabs",m="lay_lumina_tabs",p="fa-outdent",b="fa-indent",v="lumina-side-shrink",g={version:"0.0.1",escape:function(e){return String(e||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},on:function(e,a){return layui.onevent.call(this,i,e,a)},screen:function(){var e=t.width();return 1200<e?3:992<e?2:768<e?1:0},sideFlexible:function(e){var a=d,t=c("#xapp_flexible"),n=(g.screen(),o.mobile?v+"-m":v);"spread"===e?(a.removeClass(n),t.removeClass(b).addClass(p)):(a.addClass(n),t.removeClass(p).addClass(b)),layui.event.call(this,i,"side({*})",{status:e})},tabsPage:{},tabsBody:function(e){return u.find(".lumina-tabsbody-item").eq(e||0)},tabsBodyChange:function(e,a){a=a||{},g.tabsBody(e).addClass(f).siblings().removeClass(f),x.rollPage("auto",e),layui.event.call(this,i,"tabsPage({*})",{url:a.url,text:a.text})},resize:function(e){var a=layui.router().path.join("-");g.resizeFn[a]&&(r.off("resize",g.resizeFn[a]),delete g.resizeFn[a]),"off"!==e&&(e(),g.resizeFn[a]=e,r.on("resize",g.resizeFn[a]))},resizeFn:{},runResize:function(){var e=layui.router().path.join("-");g.resizeFn[e]&&g.resizeFn[e]()},delResize:function(){this.resize("off")},fullScreen:function(){var e=document.documentElement,a=e.requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen;void 0!==a&&a&&a.call(e)},exitScreen:function(){document.documentElement,document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()}},x=g.events={flexible:function(){var e=d.hasClass(v)||d.hasClass(v+"-m");g.sideFlexible(e?"spread":null)},message:function(e){e.find(".layui-badge-dot").remove()},fullscreen:function(e){var a="fa-screen-full",t="fa-screen-restore",n=e.children("i");n.hasClass(a)?(g.fullScreen(),n.addClass(t).removeClass(a)):(g.exitScreen(),n.addClass(a).removeClass(t))},back:function(){history.back()},setTheme:function(e){var a=e.data("index");e.siblings(".layui-this").data("index"),e.hasClass(y)||(e.addClass(y).siblings(".layui-this").removeClass(y),g.initTheme(a))},rollPage:function(e,t){var i=c("#lumina_tabs"),s=i.children("li"),l=(i.prop("scrollWidth"),i.outerWidth()),r=parseFloat(i.css("left"));if("left"===e){if(!r&&r<=0)return;var n=-r-l;s.each(function(e,a){var t=c(a).position().left;if(n<=t)return i.css("left",-t),!1})}else"auto"===e?function(){var e,a=s.eq(t);if(a[0]){if((e=a.position().left)<-r)return i.css("left",-e);if(e+a.outerWidth()>=l-r){var n=e+a.outerWidth()-(l-r);s.each(function(e,a){var t=c(a).position().left;if(0<t+r&&n<t-r)return i.css("left",-t),!1})}}}():s.each(function(e,a){var t=c(a),n=t.position().left;if(n+t.outerWidth()>=l-r)return i.css("left",-n),!1})},leftPage:function(){x.rollPage("left")},rightPage:function(){x.rollPage()},refreshThisTab:function(){var e=c(h+">li").length;g.tabsPage.index>=e&&(g.tabsPage.index=e-1),g.tabsBody(g.tabsPage.index).find(".lumina-iframe")[0].contentWindow.location.reload(!0)},openThisTab:function(){var e=c(this).data("idx")||g.tabsPage.index,a=c(h+">li").eq(e).attr("lay-attr");window.parent.open(a)},closeThisTabs:function(){var e=c(this).data("idx")||g.tabsPage.index;e&&c(h+">li").eq(e).find(".fa-close").trigger("click")},closeOtherTabs:function(e){var t=c(this).data("idx")||g.tabsPage.index;"all"===e?c(h+">li").each(function(e,a){e&&c(a).find(".fa-close").trigger("click")}):c(h+">li").each(function(e,a){e!=t&&e&&c(a).find(".fa-close").trigger("click")})},closeAllTabs:function(){x.closeOtherTabs("all")},shade:function(){g.sideFlexible()}};g.on("tabsPage(setMenustatus)",function(e){function l(e){return{list:e.children(".layui-nav-child"),a:e.children("*[lay-href]")}}var r=e.url,a=c("#xb-system-side-menu"),o="layui-nav-itemed";a.find("."+n).removeClass(n),g.screen()<2&&g.sideFlexible(),a.children("li").each(function(e,a){var t=c(a),n=l(t),i=n.list.children("dd"),s=r===n.a.attr("lay-href");if(i.each(function(e,a){var t=c(a),n=l(t),i=n.list.children("dd"),s=r===n.a.attr("lay-href");if(i.each(function(e,a){var t=c(a),n=l(t);if(r===n.a.attr("lay-href")){var i=n.list[0]?o:y;return t.addClass(i).siblings().removeClass(i),!1}}),s){n.list[0];return t.addClass(f).siblings().removeClass(f),!1}}),s){n.list[0];return t.addClass(f).siblings().removeClass(f),!1}})}),s.on("tab("+m+")",function(e){g.tabsPage.index=e.index}),s.on("nav(lumina-system-side-menu)",function(e){e.siblings(".layui-nav-child")[0]&&d.hasClass(v)&&(g.sideFlexible("spread"),l.close(e.data("index"))),g.tabsPage.type="nav"}),s.on("nav(lumina-pagetabs-nav)",function(e){var a=e.parent();a.removeClass(n),a.parent().removeClass("layui-nav-itemed")}),s.on("tabDelete("+m+")",function(e){var a=c("#xapp_tabsheader>li .layui-this").index();e.index&&g.tabsBody(e.index).remove(),g.tabsBodyChange(a),g.delResize()}),t.on("click",h+">li",function(){var e=c(this),a=(e.attr("lay-id"),e.attr("lay-attr")),t=e.index();g.tabsPage.type="tab",g.tabsPage.index=t,g.tabsBodyChange(t,{url:a})}),t.on("click","*[lay-href]",function(){var e=c(this),a=e.attr("lay-href"),t=e.attr("lay-text");layui.router(),g.tabsPage.elem=e,(parent===self?layui:top.layui).admin.openTabsPage(a,t||e.text())}),t.on("click","*[lumina-event]",function(){var e=c(this),a=e.attr("lumina-event");x[a]&&x[a].call(this,e)}),t.on("mouseenter","*[lay-tips]",function(){var e=c(this);if(!e.parent().hasClass("layui-nav-item")||d.hasClass(v)){var a=e.attr("lay-tips"),t=e.attr("lay-offset"),n=e.attr("lay-direction"),i=l.tips(a,this,{tips:n||1,time:-1,success:function(e){t&&e.css("margin-left",t+"px")}});e.data("index",i)}}).on("mouseleave","*[lay-tips]",function(){l.close(c(this).data("index"))});var C=layui.data.resizeSystem=function(){l.closeAll("tips"),C.lock||setTimeout(function(){g.sideFlexible(g.screen()<2?"":"spread"),delete C.lock},100),C.lock=!0};g.openTabsPage=function(e,a){var t,n=c(h).find("li"),i=e.replace(location.href,"");(n.each(function(e){c(this).attr("lay-id")===i&&(t=!0,g.tabsPage.index=e)}),a=a||"新标签页")?t||(u.append(['<div class="lumina-tabsbody-item layui-show">','<iframe src="'+e+'" frameborder="0" class="lumina-iframe"></iframe>',"</div>"].join("")),g.tabsPage.index=n.length,s.tabAdd(m,{title:"<span>"+a+"</span>",id:i,attr:e,context:!0})):g.tabsBody(g.tabsPage.index).find(".lumina-iframe")[0].contentWindow.location.href=e;s.tabChange(m,i),g.tabsBodyChange(g.tabsPage.index,{url:e,text:a})},g.openDrawer=function(e,a,t){var n=parent===self?self:parent,i=-1<e.search(/^((https|http)?:\/\/)[^\s]+/)?2:1;return n.layer.open(c.extend({type:i,id:"lumina_drawer_right",anim:-1,title:a,closeBtn:1,offset:"r",shade:.1,content:e,skin:"layui-anim layui-anim-rl layui-layer-adminRight",area:"800px"},t))},g.request={_handleException:function(){},_handleRes:function(e,a){return 0!=e.errcode?(l.msg(e.msg?e.msg:"未知错误,请刷新重试!"),!1):("function"==typeof a&&a(e),!0)},ajax:function(a){var n=this;c.ajax({cache:a.cache||!1,type:a.type,url:a.url,headers:{"X-CSRF-TOKEN":c('meta[name="csrf-token"]').attr("content"),Accept:"application/json","X-Requested-With":"XMLHttpRequest"},data:a.data,dataType:a.dataType,success:function(e){n._handleRes(e,a.success)},error:function(e,a,t){n._handleException(e,a,t)}})},get:function(e,a,t){var n=this;c.ajax({url:e,type:"get",headers:{"X-CSRF-TOKEN":c('meta[name="csrf-token"]').attr("content"),Accept:"application/json","X-Requested-With":"XMLHttpRequest"},data:a,dataType:"json",success:function(e){n._handleRes(e,t)},error:function(e,a,t){n._handleException(e,a,t)}})},post:function(e,a,t){var n=this;c.ajax({url:e,type:"post",headers:{"X-CSRF-TOKEN":c('meta[name="csrf-token"]').attr("content"),Accept:"application/json","X-Requested-With":"XMLHttpRequest"},data:a,dataType:"json",success:function(e){n._handleRes(e,t)},error:function(e,a,t){n._handleException(e,a,t)}})}};var F=['<div id="g-alert"><div class="alert-bd" style="animation-delay: 1s;top:12px;">','<div class="bd shadow border rounded-lg">','<i class="fa fa-spinner fa-pulse mr-1"></i>',"<span>加载中...</span></div></div></div></div>"].join("");g.load={show:function(){c("body").append(F)},hide:function(){c("#g-alert").remove()}},t.on("resize",layui.data.resizeSystem),e("admin",g)});