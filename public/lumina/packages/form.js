"use strict";layui.define(["laydate","upload","admin"],function(e){function a(){this.config={verify:{required:[/[\S]+/,"必填项不能为空"],phone:[/^1\d{10}$/,"请输入正确的手机号"],email:[/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,"邮箱格式不正确"],url:[/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/,"链接格式不正确"],number:function(e){if(!e||isNaN(e))return"只能填写数字"},date:[/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/,"日期格式不正确"],identity:[/(^\d{15}$)|(^\d{17}(x|X|\d)$)/,"请输入正确的身份证号"]}}}var b=layui.$,r=layui.laydate,c=layui.upload,h=layui.layer,v=layui.admin,n=layui.hint(),p=layui.device(),C="form",y=".layui-form",_="layui-this",w="layui-hide",L="layui-disabled";a.prototype.set=function(e){return b.extend(!0,this.config,e),this},a.prototype.verify=function(e){return b.extend(!0,this.config.verify,e),this},a.prototype.on=function(e,a){return layui.onevent.call(this,C,e,a)},a.prototype.val=function(e,t){b(y+'[lay-filter="'+e+'"]').each(function(e,a){var n=b(this);layui.each(t,function(e,a){var t,i=n.find('[name="'+e+'"]');i[0]&&("checkbox"===(t=i[0].type)?i[0].checked=a:"radio"===t?i.each(function(){this.value===a&&(this.checked=!0)}):i.val(a))})}),m.render(null,e)},a.prototype.render=function(e,a){var t=b(y+(a?'[lay-filter="'+a+'"]':"")),i={select:function(){function v(e,a){b(e.target).parent().hasClass(g)&&!a||(b("."+m).removeClass(m+"ed "+m+"up"),p&&x&&p.val(x)),p=null}function h(i,e,a){var s,t,n,o,l,r=b(this),d=i.find("."+g),c=d.find("input"),u=i.find("dl"),f=u.children("dd"),h=this.selectedIndex;e||(t=function(){var e=i.offset().top+i.outerHeight()+5-T.scrollTop(),a=u.outerHeight();h=r[0].selectedIndex,i.addClass(m+"ed"),f.removeClass(w),s=null,f.eq(h).addClass(_).siblings().removeClass(_),e+a>T.height()&&a<=e&&i.addClass(m+"up"),o()},n=function(e){i.removeClass(m+"ed "+m+"up"),c.blur(),s=null,e||l(c.val(),function(e){var a=r[0].selectedIndex;e&&(x=b(r[0].options[a]).html(),0===a&&x===c.attr("placeholder")&&(x=""),c.val(x||""))})},o=function(){var e,a,t,i=u.children("dd."+_);i[0]&&(e=i.position().top,a=u.height(),t=i.height(),a<e&&u.scrollTop(e+u.scrollTop()-a+t-5),e<0&&u.scrollTop(e+u.scrollTop()-5))},d.on("click",function(e){i.hasClass(m+"ed")?n():(v(e,!0),t()),u.find("."+k).remove()}),d.find(".layui-edge").on("click",function(){c.focus()}),c.on("keyup",function(e){9===e.keyCode&&t()}).on("keydown",function(l){var e=l.keyCode;9===e&&n();function r(i,n){l.preventDefault();var e=function(){var e=u.children("dd."+_);if(u.children("dd."+w)[0]&&"next"===i){var a=u.children("dd:not(."+w+",."+L+")"),t=a.eq(0).index();if(0<=t&&t<e.index()&&!a.hasClass(_))return a.eq(0).prev()[0]?a.eq(0).prev():u.children(":last")}return n&&n[0]?n:s&&s[0]?s:e}(),a=e[i](),t=e[i]("dd:not(."+w+")");return a[0]?(s=e[i](),t[0]&&!t.hasClass(L)||!s[0]?(t.addClass(_).siblings().removeClass(_),void o()):r(i,s)):s=null}38===e&&r("prev"),40===e&&r("next"),13===e&&(l.preventDefault(),u.children("dd."+_).trigger("click"))}),l=function(i,e,n){var l=0;layui.each(f,function(){var e=b(this),a=e.text(),t=-1===a.indexOf(i);(""===i||"blur"===n?i!==a:t)&&l++,"keyup"===n&&e[t?"addClass":"removeClass"](w)});var a=l===f.length;return e(a),a},a&&c.on("keyup",function(e){var a=this.value,t=e.keyCode;if(9===t||13===t||37===t||38===t||39===t||40===t)return!1;l(a,function(e){e?u.find("."+k)[0]||u.append('<p class="'+k+'">无匹配项</p>'):u.find("."+k).remove()},"keyup"),""===a&&u.find("."+k).remove(),o()}).on("blur",function(e){var a=r[0].selectedIndex;p=c,x=b(r[0].options[a]).html(),0===a&&x===c.attr("placeholder")&&(x=""),setTimeout(function(){l(c.val(),function(e){x||c.val("")},"blur")},200)}),f.on("click",function(){var e=b(this),a=e.attr("lay-value"),t=r.attr("lay-filter");return e.hasClass(L)||(e.hasClass("layui-select-tips")?c.val(""):(c.val(e.text()),e.addClass(_)),e.siblings().removeClass(_),r.val(a).removeClass("layui-form-danger"),layui.event.call(this,C,"select("+t+")",{elem:r[0],value:a,othis:i}),n(!0)),!1}),i.find("dl>dt").on("click",function(e){return!1}),b(document).off("click",v).on("click",v))}var p,y="请选择",m="layui-form-select",g="layui-select-title",k="layui-select-none",x="",e=t.find("select");e.each(function(e,a){var t=b(this),i=t.next("."+m),n=this.disabled,l=a.value,r=b(a.options[a.selectedIndex]),s=a.options[0];if("string"==typeof t.attr("lay-ignore"))return t.show();var o,d,c="string"==typeof t.attr("lay-search"),u=s&&!s.value&&s.innerHTML||y,f=b(['<div class="'+(c?"":"layui-unselect ")+m,(n?" layui-select-disabled":"")+'">','<div class="'+g+'">','<input type="text" placeholder="'+u+'" value="'+(l?r.html():"")+'"'+(c?"":" readonly")+' class="layui-input'+(c?"":" layui-unselect")+(n?" "+L:"")+'">','<i class="layui-edge"></i></div>','<dl class="fa fa-circle-o'+(t.find("optgroup")[0]?" layui-select-group":"")+'">',(o=t.find("*"),d=[],layui.each(o,function(e,a){0!==e||a.value?"optgroup"===a.tagName.toLowerCase()?d.push("<dt>"+a.label+"</dt>"):d.push('<dd lay-value="'+a.value+'" class="'+(l===a.value?_:"")+(a.disabled?" "+L:"")+'">'+a.innerHTML+"</dd>"):d.push('<dd lay-value="" class="layui-select-tips">'+(a.innerHTML||y)+"</dd>")}),0===d.length&&d.push('<dd lay-value="" class="'+L+'">没有选项</dd>'),d.join("")+"</dl>"),"</div>"].join(""));i[0]&&i.remove(),t.after(f),h.call(this,f,n,c)})},checkbox:function(){var c={checkbox:["layui-form-checkbox","layui-form-checked","checkbox"],_switch:["layui-form-switch","layui-form-onswitch","switch"]},e=t.find("input[type=checkbox]");e.each(function(e,a){var t=b(this),i=t.attr("lay-skin"),n=(t.attr("lay-text")||"").split("|"),l=this.disabled;"switch"===i&&(i="_"+i);var r=c[i]||c.checkbox;if("string"==typeof t.attr("lay-ignore"))return t.show();var s,o=t.next("."+r[0]),d=b(['<div class="layui-unselect '+r[0],a.checked?" "+r[1]:"",l?" layui-checkbox-disbaled "+L:"",'"',i?' lay-skin="'+i+'"':"",">",(s={checkbox:[a.title.replace(/\s/g,"")?"<span>"+a.title+"</span>":"",'<i class="fa fa-check"></i>'].join(""),_switch:"<em>"+((a.checked?n[0]:n[1])||"")+"</em><i></i>"})[i]||s.checkbox,"</div>"].join(""));o[0]&&o.remove(),t.after(d),function(t,i){var n=b(this);t.on("click",function(){var e=n.attr("lay-filter"),a=(n.attr("lay-text")||"").split("|");n[0].disabled||(n[0].checked?(n[0].checked=!1,t.removeClass(i[1]).find("em").text(a[1])):(n[0].checked=!0,t.addClass(i[1]).find("em").text(a[0])),layui.event.call(n[0],C,i[2]+"("+e+")",{elem:n[0],value:n[0].value,othis:t}))})}.call(this,d,r)})},radio:function(){var o="layui-form-radio",e=t.find("input[type=radio]");e.each(function(e,a){var t=b(this),i=t.next("."+o),n=this.disabled;if("string"==typeof t.attr("lay-ignore"))return t.show();i[0]&&i.remove();var l,r=b(['<div class="layui-unselect '+o,a.checked?" "+o+"ed":"",(n?" layui-radio-disbaled "+L:"")+'">','<i class="fa '+(a.checked?"fa-dot-circle-o":"fa-circle-o")+'"></i>',"<div>"+(l=a.title||"","string"==typeof t.next().attr("lay-radio")&&(l=t.next().html(),t.next().remove()),l)+"</div>","</div>"].join(""));t.after(r),function(n){var l=b(this),r="fa-circle-o",s="fa-dot-circle-o";n.on("click",function(){var e=l[0].name,a=l.parents(y),t=l.attr("lay-filter"),i=a.find("input[name="+e.replace(/(\.|#|\[|\])/g,"\\$1")+"]");l[0].disabled||(layui.each(i,function(){var e=b(this).next("."+o);this.checked=!1,e.removeClass(o+"ed"),e.find(".fa").removeClass(s).addClass(r)}),l[0].checked=!0,n.addClass(o+"ed"),n.find(".fa").addClass(s).removeClass(r),layui.event.call(l[0],C,"radio("+t+")",{elem:l[0],value:l[0].value,othis:n}))})}.call(this,r)})},img:function(){var e=t.find(".layui-form-img"),d='<li class="uploader__file" style="background-image: url(UPLOADEDFILE)"><div class="uploader__mask" style="display: none"><div class="mask__delete"><a href="javascript:;" class="j_delete" data-id="UPLOADEDFILE"><i class="fa fa-close"></i></a></div></div></li>';e.each(function(e,a){var t=b(this),i=t.data("limit")||1,n=b(['<div class="m-uploader clearfix">','<ul class="uploader__files"></ul>','<div class="img__picker" data-limit="'+i+'" ></div>',"</div>"].join(""));0<t.find(".m-uploader").length||(t.append(n),function(a){var i=b(this),n=a.parents(".m-uploader").find(".uploader__files"),l=a,r=i.find("input[type=hidden]"),s=i.attr("lay-filter"),o=i.data("limit");a.on("click",function(){c.render({url:"/interface/core/upload",fileNumLimit:o,done:function(e){if(1==o)n.append(d.replace(new RegExp(/(UPLOADEDFILE)/g),e[0])),r.val(e[0]),l.hide();else{var t=r.val();if((t=1<t.length?t.split(","):[]).length>=o)return;b.each(e,function(e,a){t.push(a),t.length>=o&&l.hide(),n.append(d.replace(new RegExp(/(UPLOADEDFILE)/g),a))}),r.val(t.join(","))}n.on("mouseenter",".uploader__file",function(){b(this).find(".uploader__mask").show()}).on("mouseleave",".uploader__file",function(){b(this).find(".uploader__mask").hide()}),n.on("click",".j_delete",function(){var e,a,t;1==o?(n.remove(),l.show(),r.val("")):(b(this).parents(".uploader__file").remove(),e=b(this).attr("data-id"),-1<(t=(a=1<(a=r.val()).length?a.split(","):[]).indexOf(e))&&a.splice(t,1),l.show(),r.val(a))}),layui.event.call(i[0],C,"img("+s+")",{elem:i[0],value:r.val(),othis:a})}})})}.call(this,n.find(".img__picker")))})},date:function(){t.find(".layui-form-date").each(function(e,a){r.render({elem:a,type:b(a).attr("date-type")||"date"})}),t.find(".layui-form-daterange").each(function(e,a){var t=b(this),i="",n="",l=t.data("options"),i=r.render({elem:t.find(".start_at")[0],min:l.min||"1900-1-1",max:l.max||"2999-12-31",type:l.type||"date",value:t.find(".start_at")[0].value,done:function(e,a){n.config.min=lay.extend({},a,{month:a.month-1})}}),n=r.render({elem:t.find(".end_at")[0],min:l.min||"1900-1-1",max:l.max||"2999-12-31",type:l.type||"date",value:t.find(".end_at")[0].value,done:function(e,a){i.config.max=lay.extend({},a,{month:a.month-1})}})})}};return e?i[e]?i[e]():n.error("不支持的"+e+"表单渲染"):layui.each(i,function(e,a){a()}),this};function t(){var e=b(this),d=m.config.verify,c=null,u="layui-form-danger",i={},a=e.parents(y),t=a.find("*[lay-verify]"),n=e.parents("form")[0],l=a.find("input,select,textarea"),r=e.attr("lay-filter"),s=e.hasClass("J_ajax");if(layui.each(t,function(e,l){var r=b(this),a=r.attr("lay-verify").split("|"),s=r.attr("lay-verType"),o=r.val();if(r.removeClass(u),layui.each(a,function(e,a){var t="",i="function"==typeof d[a];if(d[a]){var n=i?t=d[a](o,l):!d[a][0].test(o),t=t||d[a][1];if(n)return"tips"===s?h.tips(t,"string"==typeof r.attr("lay-ignore")||"select"!==l.tagName.toLowerCase()&&!/^checkbox|radio$/.test(l.type)?r:r.next(),{tips:1}):"alert"===s?h.alert(t,{title:"提示",shadeClose:!0}):h.msg(t,{icon:5,shift:6}),p.android||p.ios||l.focus(),r.addClass(u),c=!0}}),c)return c}),c)return!1;var o={};layui.each(l,function(e,a){var t;a.name=(a.name||"").replace(/^\s*|\s*&/,""),a.name&&(/^.*\[\]$/.test(a.name)&&(t=a.name.match(/^(.*)\[\]$/g)[0],o[t]=0|o[t],a.name=a.name.replace(/^(.*)\[\]$/,"$1["+o[t]+++"]")),/^checkbox|radio$/.test(a.type)&&!a.checked||(i[a.name]=a.value))});var f=e.parents("form");return s?(v.request.ajax({type:f.attr("method"),url:f.attr("action"),data:i,success:function(e){if(0==e.errcode)return h.msg(e.msg),e.data.redirect?void setTimeout(function(){v.openTab(e.data.redirect,"列表")},1500):(parent.layer&&setTimeout(function(){parent.layer.close(parent.layer.getFrameIndex(window.name))},1500),f[0].reset(),layui.event.call(this,C,"submit("+r+")",{elem:this,form:n,field:i}));h.alert(e.msg,{title:"提示",shadeClose:!0})}}),!1):layui.event.call(this,C,"submit("+r+")",{elem:this,form:n,field:i})}var m=new a,i=b("body"),T=b(window);m.render(),i.on("reset",y,function(){var e=b(this).attr("lay-filter");setTimeout(function(){m.render(null,e)},50)}),i.on("submit",y,t).on("click","*[lay-submit]",t),i.on("click","*[lay-submit-cancel]",function(){parent.layer.close(parent.layer.getFrameIndex(window.name))}),e(C,m)});