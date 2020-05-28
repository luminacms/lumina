"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}layui.define("form",function(e){function n(){var i=this,e=i.config,a=e.id||i.index;return n.that[a]=i,{config:n.config[a]=e,reload:function(e){i.reload.call(i,e)},getChecked:function(){return i.getChecked.call(i)},setChecked:function(e){return i.setChecked.call(i,e)}}}function a(e){var i=this;i.index=++t.index,i.config=x.extend({},i.config,t.config,e),i.render()}var x=layui.$,i=layui.form,r="tree",t={config:{},index:layui[r]?layui[r].index+1e4:0,set:function(e){var i=this;return i.config=x.extend({},i.config,e),i},on:function(e,i){return layui.onevent.call(this,r,e,i)}},b="layui-hide",c="layui-disabled",w="layui-tree-set",T="layui-tree-iconClick",L="fa-plus-square-o",q="fa-minus-square-o",N="layui-tree-entry",o="layui-tree-main",m="layui-tree-txt",S="layui-tree-pack",A="layui-tree-spread",F="layui-tree-setLineShort",I="layui-tree-showLine",H="layui-tree-lineExtend";a.prototype.config={data:[],showCheckbox:!1,showLine:!0,accordion:!1,onlyIconControl:!1,isJump:!1,edit:!1,text:{defaultNodeName:"未命名",none:"无数据"}},a.prototype.reload=function(e){var a=this;layui.each(e,function(e,i){i.constructor===Array&&delete a.config[e]}),a.config=x.extend(!0,{},a.config,e),a.render()},a.prototype.render=function(){var e=this,i=e.config,a=x('<div class="layui-tree'+(i.showCheckbox?" layui-form":"")+(i.showLine?" layui-tree-line":"")+'" lay-filter="LAY-tree-'+e.index+'"></div>');e.tree(a);var n=i.elem=x(i.elem);if(n[0]){if(i.showSearch&&a.prepend('<input type="text" class="layui-input layui-tree-search" placeholder="请输入关键字进行过滤">'),e.key=i.id||e.index,e.elem=a,e.elemNone=x('<div class="layui-tree-emptyText">'+i.text.none+"</div>"),n.html(e.elem),0==e.elem.find(".layui-tree-set").length)return e.elem.append(e.elemNone);i.drag&&e.drag(),i.showCheckbox&&e.renderForm("checkbox"),e.elem.find(".layui-tree-set").each(function(){var e=x(this);e.parent(".layui-tree-pack")[0]||e.addClass("layui-tree-setHide"),!e.next()[0]&&e.parents(".layui-tree-pack").eq(1).hasClass("layui-tree-lineExtend")&&e.addClass(F),e.next()[0]||e.parents(".layui-tree-set").eq(0).next()[0]||e.addClass(F)}),e.events()}},a.prototype.renderForm=function(e){i.render(e,"LAY-tree-"+this.index)},a.prototype.tree=function(t,e){var l=this,d=l.config,i=e||d.data;layui.each(i,function(e,i){var a=i.children&&0<i.children.length,n=x('<div class="layui-tree-pack" '+(i.spread?'style="display: block;"':"")+'"></div>'),r=x(['<div data-id="'+i.id+'" class="layui-tree-set'+(i.spread?" layui-tree-spread":"")+(i.checked?" layui-tree-checkedFirst":"")+'">',"<div "+(d.drag&&!i.fixed?'draggable="true"':"")+' class="layui-tree-entry">','<div class="layui-tree-main">',d.showLine?a?'<span class="layui-tree-iconClick layui-tree-icon"><i class="fa '+(i.spread?"fa-minus-square-o":"fa-plus-square-o")+'"></i></span>':'<span class="layui-tree-iconClick"><i class="fa fa-file"></i></span>':'<span class="layui-tree-iconClick"><i class="layui-tree-iconArrow '+(a?"":b)+'"></i></span>',d.showCheckbox?'<input type="checkbox" name="layuiTreeCheck" lay-skin="primary" '+(i.disabled?"disabled":"")+'  value="'+i.id+'">':"",d.isJump&&i.href?'<a href="'+i.href+'" target="_blank" class="'+m+'">'+(i.text||i.label||d.text.defaultNodeName)+"</a>":'<span class="'+m+(i.disabled?" "+c:"")+'">'+(i.text||i.label||d.text.defaultNodeName)+"</span>","</div>",function(){if(!d.edit)return"";var a={add:'<i class="fa fa-add-1"  data-type="add"></i>',update:'<i class="fa fa-edit" data-type="update"></i>',del:'<i class="fa fa-delete" data-type="del"></i>'},n=['<div class="layui-btn-group layui-tree-btnGroup">'];return!0===d.edit&&(d.edit=["update","del"]),"object"===_typeof(d.edit)?(layui.each(d.edit,function(e,i){n.push(a[i]||"")}),n.join("")+"</div>"):void 0}(),"</div></div>"].join(""));a&&(r.append(n),l.tree(n,i.children)),t.append(r),r.prev("."+w)[0]&&r.prev().children(".layui-tree-pack").addClass("layui-tree-showLine"),a||r.parent(".layui-tree-pack").addClass("layui-tree-lineExtend"),l.spread(r,i),d.showCheckbox&&l.checkClick(r,i),d.edit&&l.operate(r,i)})},a.prototype.spread=function(r,e){var t=this.config,i=r.children("."+N),a=i.children("."+o),n=i.find("."+T),l=i.find("."+m),d=t.onlyIconControl?n:a,s="";d.on("click",function(e){var i,a=r.children("."+S),n=d.children(".fa")[0]?d.children(".fa"):d.find(".layui-tree-icon").children(".fa");a[0]?r.hasClass(A)?(r.removeClass(A),a.slideUp(200),n.removeClass(q).addClass(L)):(r.addClass(A),a.slideDown(200),n.addClass(q).removeClass(L),t.accordion&&((i=r.siblings("."+w)).removeClass(A),i.children("."+S).slideUp(200),i.find(".layui-tree-icon").children(".fa").removeClass(q).addClass(L))):s="normal"}),l.on("click",function(){x(this).hasClass(c)||(s=r.hasClass(A)?t.onlyIconControl?"open":"close":t.onlyIconControl?"close":"open",t.click&&t.click({elem:r,state:s,data:e}))})},a.prototype.setCheckbox=function(e,i,a){this.config;var l=a.prop("checked");"object"!==_typeof(i.children)&&!e.find("."+S)[0]||e.find("."+S).find('input[name="layuiTreeCheck"]').each(function(){this.disabled||(this.checked=l)});!function e(i){var a,n,r,t;i.parents("."+w)[0]&&(r=(n=i.parent("."+S)).parent(),t=n.prev().find('input[name="layuiTreeCheck"]'),l?t.prop("checked",l):(n.find('input[name="layuiTreeCheck"]').each(function(){this.checked&&(a=!0)}),a||t.prop("checked",!1)),e(r))}(e),this.renderForm("checkbox")},a.prototype.checkClick=function(n,r){var t=this,l=t.config;n.children("."+N).children("."+o).on("click",'input[name="layuiTreeCheck"]+',function(e){layui.stope(e);var i=x(this).prev(),a=i.prop("checked");i.prop("disabled")||(t.setCheckbox(n,r,i),l.oncheck&&l.oncheck({elem:n,checked:a,data:r}))})},a.prototype.operate=function(f,p){var y=this,C=y.config,e=f.children("."+N),v=e.children("."+o);e.children(".layui-tree-btnGroup").on("click",".fa",function(e){layui.stope(e);var i,a,n=x(this).data("type"),r=f.children("."+S),t={data:p,type:n,elem:f};if("add"==n){r[0]||(C.showLine?(v.find("."+T).addClass("layui-tree-icon"),v.find("."+T).children(".fa").addClass(L).removeClass("fa-file")):v.find(".layui-tree-iconArrow").removeClass(b),f.append('<div class="layui-tree-pack"></div>'));var l,d,s,c=C.operate&&C.operate(t),o={};if(o.text=C.text.defaultNodeName,o.id=c,y.tree(f.children("."+S),[o]),C.showLine&&(r[0]?(r.hasClass(H)||r.addClass(H),f.find("."+S).each(function(){x(this).children("."+w).last().addClass(F)}),r.children("."+w).last().prev().hasClass(F)?r.children("."+w).last().prev().removeClass(F):r.children("."+w).last().removeClass(F),!f.parent("."+S)[0]&&f.next()[0]&&r.children("."+w).last().removeClass(F)):(l=f.siblings("."+w),d=1,s=f.parent("."+S),layui.each(l,function(e,i){x(i).children("."+S)[0]||(d=0)}),1==d?(l.children("."+S).addClass(I),l.children("."+S).children("."+w).removeClass(F),f.children("."+S).addClass(I),s.removeClass(H),s.children("."+w).last().children("."+S).children("."+w).last().addClass(F)):f.children("."+S).children("."+w).addClass(F))),!C.showCheckbox)return;v.find('input[name="layuiTreeCheck"]')[0].checked&&(f.children("."+S).children("."+w).last().find('input[name="layuiTreeCheck"]')[0].checked=!0),y.renderForm("checkbox")}else if("update"==n){var h=v.children("."+m).html();v.children("."+m).html(""),v.append('<input type="text" class="layui-tree-editInput">'),v.children(".layui-tree-editInput").val(h).focus();var u=function(e){var i=(i=e.val().trim())||C.text.defaultNodeName;e.remove(),v.children("."+m).html(i),t.data.text=i,C.operate&&C.operate(t)};v.children(".layui-tree-editInput").blur(function(){u(x(this))}),v.children(".layui-tree-editInput").on("keydown",function(e){13===e.keyCode&&(e.preventDefault(),u(x(this)))})}else{if(C.operate&&C.operate(t),t.status="remove",!f.prev("."+w)[0]&&!f.next("."+w)[0]&&!f.parent("."+S)[0])return f.remove(),void y.elem.append(y.elemNone);f.siblings("."+w).children("."+N)[0]?(C.showCheckbox&&function e(i){var a,n,r,t,l;i.parents("."+w)[0]&&(a=i.siblings("."+w).children("."+N),r=(n=i.parent("."+S).prev()).find('input[name="layuiTreeCheck"]')[0],t=1,(l=0)==r.checked&&(a.each(function(e,i){var a=x(i).find('input[name="layuiTreeCheck"]')[0];0!=a.checked||a.disabled||(t=0),a.disabled||(l=1)}),1==t&&1==l&&(r.checked=!0,y.renderForm("checkbox"),e(n.parent("."+w)))))}(f),C.showLine&&(l=f.siblings("."+w),d=1,s=f.parent("."+S),layui.each(l,function(e,i){x(i).children("."+S)[0]||(d=0)}),1==d?(r[0]||(s.removeClass(H),l.children("."+S).addClass(I),l.children("."+S).children("."+w).removeClass(F)),f.next()[0]?s.children("."+w).last().children("."+S).children("."+w).last().addClass(F):f.prev().children("."+S).children("."+w).last().addClass(F),f.next()[0]||f.parents("."+w)[1]||f.parents("."+w).eq(0).next()[0]||f.prev("."+w).addClass(F)):!f.next()[0]&&f.hasClass(F)&&f.prev().addClass(F))):(i=f.parent("."+S).prev(),C.showLine?(i.find("."+T).removeClass("layui-tree-icon"),i.find("."+T).children(".fa").removeClass(q).addClass("fa-file"),(a=i.parents("."+S).eq(0)).addClass(H),a.children("."+w).each(function(){x(this).children("."+S).children("."+w).last().addClass(F)})):i.find(".layui-tree-iconArrow").addClass(b),f.parents("."+w).eq(0).removeClass(A),f.parent("."+S).remove()),f.remove()}})},a.prototype.drag=function(){var k=this,g=k.config;k.elem.on("dragstart","."+N,function(){var e=x(this).parent("."+w),i=e.parents("."+w)[0]?e.parents("."+w).eq(0):"未找到父节点";g.dragstart&&g.dragstart(e,i)}),k.elem.on("dragend","."+N,function(e){var s,c,i,o,h,u,f=(e=e||event).clientY,p=x(this).parent("."+w),y=p.height(),C=p.offset().top,a=k.elem.find("."+w),v=k.elem.height()+k.elem.offset().top-13,n=p.parents("."+w)[0],r=p.next()[0];n&&(s=p.parent("."+S),c=p.parents("."+w).eq(0),i=c.parent("."+S),o=c.offset().top,h=p.siblings(),u=c.children("."+S).children("."+w).length);function m(d){var a;n||r||k.elem.children("."+w).last().children("."+S).children("."+w).last().addClass(F),n?1==u?(g.showLine?(d.find("."+T).removeClass("layui-tree-icon"),d.find("."+T).children(".fa").removeClass(q).addClass("fa-file"),i.addClass(H),i.children("."+w).children("."+S).each(function(){x(this).children("."+w).last().addClass(F)})):d.find(".layui-tree-iconArrow").addClass(b),d.children("."+S).remove(),d.removeClass(A)):(g.showLine&&(a=1,layui.each(h,function(e,i){x(i).children("."+S)[0]||(a=0)}),1==a?(p.children("."+S)[0]||(s.removeClass(H),h.children("."+S).addClass(I),h.children("."+S).children("."+w).removeClass(F)),s.children("."+w).last().children("."+S).children("."+w).last().addClass(F),r||d.parents("."+w)[0]||d.next()[0]||s.children("."+w).last().addClass(F)):!r&&p.hasClass(F)&&s.children("."+w).last().addClass(F)),g.showCheckbox&&function e(i){if(i){if(!i.parents("."+w)[0])return}else if(!d[0])return;var a=i?i.siblings().children("."+N):h.children("."+N),n=i?i.parent("."+S).prev():s.prev(),r=n.find('input[name="layuiTreeCheck"]')[0],t=1,l=0;0==r.checked&&(a.each(function(e,i){var a=x(i).find('input[name="layuiTreeCheck"]')[0];0!=a.checked||a.disabled||(t=0),a.disabled||(l=1)}),1==t&&1==l&&(r.checked=!0,k.renderForm("checkbox"),e(n.parent("."+w)||d)))}()):p.removeClass("layui-tree-setHide")}a.each(function(){if(0!=x(this).height()){if(C<f&&f<C+y)return void(g.dragend&&g.dragend("drag error"));if(1==u&&o<f&&f<C+y)return void(g.dragend&&g.dragend("drag error"));var e,i,a,n,r,t,l,d=x(this).offset().top;if(d<f&&f<d+15)return x(this).children("."+S)[0]||(g.showLine?(x(this).find("."+T).eq(0).addClass("layui-tree-icon"),x(this).find("."+T).eq(0).children(".fa").addClass(L).removeClass("fa-file")):x(this).find(".layui-tree-iconArrow").removeClass(b),x(this).append('<div class="layui-tree-pack"></div>')),x(this).children("."+S).append(p),m(c),g.showLine&&(e=x(this).children("."+S).children("."+w),p.children("."+S).children("."+w).last().addClass(F),1==e.length?(t=x(this).siblings("."+w),l=1,i=x(this).parent("."+S),layui.each(t,function(e,i){x(i).children("."+S)[0]||(l=0)}),1==l?(t.children("."+S).addClass(I),t.children("."+S).children("."+w).removeClass(F),x(this).children("."+S).addClass(I),i.removeClass(H),i.children("."+w).last().children("."+S).children("."+w).last().addClass(F).removeClass("layui-tree-setHide")):x(this).children("."+S).children("."+w).addClass(F).removeClass("layui-tree-setHide")):(p.prev("."+w).hasClass(F)?(p.prev("."+w).removeClass(F),p.addClass(F)):(p.removeClass("layui-tree-setLineShort layui-tree-setHide"),p.children("."+S)[0]?p.prev("."+w).children("."+S).children("."+w).last().removeClass(F):p.siblings("."+w).find("."+S).each(function(){x(this).children("."+w).last().addClass(F)})),x(this).next()[0]||p.addClass(F))),g.showCheckbox&&x(this).children("."+N).find('input[name="layuiTreeCheck"]')[0].checked&&p.children("."+N).find('input[name="layuiTreeCheck"]+').click(),g.dragend&&g.dragend("drag success",p,x(this)),!1;if(f<d)return x(this).before(p),m(c),g.showLine&&(a=p.children("."+S),r=(n=x(this).parents("."+w).eq(0)).children("."+S).children("."+w).last(),a[0]?(p.removeClass(F),a.children("."+w).last().removeClass(F),t=p.siblings("."+w),l=1,layui.each(t,function(e,i){x(i).children("."+S)[0]||(l=0)}),1==l?n[0]&&(t.children("."+S).addClass(I),t.children("."+S).children("."+w).removeClass(F),r.children("."+S).children("."+w).last().addClass(F).removeClass(I)):p.children("."+S).children("."+w).last().addClass(F),!n.parent("."+S)[0]&&n.next()[0]&&r.removeClass(F)):(n.hasClass(H)||n.addClass(H),n.find("."+S).each(function(){x(this).children("."+w).last().addClass(F)})),n[0]||(p.addClass("layui-tree-setHide"),p.children("."+S).children("."+w).last().removeClass(F))),n[0]&&g.showCheckbox&&n.children("."+N).find('input[name="layuiTreeCheck"]')[0].checked&&p.children("."+N).find('input[name="layuiTreeCheck"]+').click(),g.dragend&&g.dragend("拖拽成功，插入目标节点上方",p,x(this)),!1;if(v<f)return k.elem.children("."+w).last().children("."+S).addClass(I),k.elem.append(p),m(c),p.prev().children("."+S).children("."+w).last().removeClass(F),p.addClass("layui-tree-setHide"),p.children("."+S).children("."+w).last().addClass(F),g.dragend&&g.dragend("拖拽成功，插入最外层节点",p,k.elem),!1}})})},a.prototype.events=function(){var r=this,t=r.config,e=r.elem.find(".layui-tree-checkedFirst");layui.each(e,function(e,i){x(i).children("."+N).find('input[name="layuiTreeCheck"]+').trigger("click")}),r.elem.find(".layui-tree-search").on("keyup",function(){var e=x(this),i=e.val(),a=e.nextAll(),n=[];a.find("."+m).each(function(){var e=x(this).parents("."+N);-1!=x(this).html().indexOf(i)&&(n.push(x(this).parent()),function e(i){i.addClass("layui-tree-searchShow"),i.parent("."+S)[0]&&e(i.parent("."+S).parent("."+w))}(e.parent("."+w)))}),a.find("."+N).each(function(){var e=x(this).parent("."+w);e.hasClass("layui-tree-searchShow")||e.addClass(b)}),0==a.find(".layui-tree-searchShow").length&&r.elem.append(r.elemNone),t.onsearch&&t.onsearch({elem:n})}),r.elem.find(".layui-tree-search").on("keydown",function(){x(this).nextAll().find("."+N).each(function(){x(this).parent("."+w).removeClass("layui-tree-searchShow "+b)}),x(".layui-tree-emptyText")[0]&&x(".layui-tree-emptyText").remove()})},a.prototype.getChecked=function(){var e=this.config,i=[],a=[];this.elem.find(".layui-form-checked").each(function(){i.push(x(this).prev()[0].value)});return function r(e,t){layui.each(e,function(e,n){layui.each(i,function(e,i){if(n.id==i){var a=x.extend({},n);return delete a.children,t.push(a),n.children&&(a.children=[],r(n.children,a.children)),!0}})})}(x.extend({},e.data),a),a},a.prototype.setChecked=function(t){this.config;this.elem.find("."+w).each(function(e,i){var a=x(this).data("id"),n=x(i).children("."+N).find('input[name="layuiTreeCheck"]'),r=n.next();if("number"==typeof t){if(a==t)return n[0].checked||r.click(),!1}else-1!=x.inArray(a,t)&&(n[0].checked||r.click())})},n.that={},n.config={},t.reload=function(e,i){var a=n.that[e];return a.reload(i),n.call(a)},t.getChecked=function(e){return n.that[e].getChecked()},t.setChecked=function(e,i){return n.that[e].setChecked(i)},t.render=function(e){var i=new a(e);return n.call(i)},e(r,t)});