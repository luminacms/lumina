"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(a){function n(){this.v=h.version}function d(){a.console&&console.error}var e,y=document,h={modules:{},status:{},timeout:10,event:{},version:"2.2.0"},m=(e=y.currentScript?y.currentScript.src:function(){for(var e,t=y.scripts,i=t.length-1,n=i;0<n;n--)if("interactive"===t[n].readyState){e=t[n].src;break}return e||t[i].src}()).substring(0,e.lastIndexOf("/")+1),g="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),v={laydate:"packages/laydate/laydate",laypage:"packages/laypage",layer:"packages/layer",laytpl:"packages/laytpl",form:"packages/form",tree:"packages/tree",table:"packages/table",element:"packages/element",rate:"packages/rate",colorpicker:"packages/colorpicker",slider:"packages/slider",carousel:"packages/carousel",flow:"packages/flow",util:"packages/util",code:"packages/code/code",dropdown:"packages/dropdown",transfer:"packages/transfer"};n.prototype.cache=h,n.prototype.define=function(e,n){function t(){function i(e,t){layui[e]=t,h.status[e]=!0}return"function"==typeof n&&n(function(e,t){i(e,t),h.callback[e]=function(){n(i)}}),this}var i=this;return"function"==typeof e&&(n=e,e=[]),layui["layui.all"]||!layui["layui.all"]&&layui["layui.mobile"]?t.call(i):(i.use(e,t),i)},n.prototype.use=function(i,e,t){function n(e,t){var i="PLaySTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/;"load"!==e.type&&!i.test((e.currentTarget||e.srcElement).readyState)||(h.modules[s]=t,l.removeChild(p),function e(){if(++c>1e3*h.timeout/4)return d();h.status[s]?a():setTimeout(e,4)}())}function a(){t.push(layui[s]),1<i.length?o.use(i.slice(1),e,t):"function"==typeof e&&e.apply(layui,t)}var o=this,r=h.dir=h.dir?h.dir:m,l=y.getElementsByTagName("head")[0];i="string"==typeof i?[i]:i,window.jQuery&&jQuery.fn.on&&(o.each(i,function(e,t){"jquery"===t&&i.splice(e,1)}),layui.jquery=layui.$=jQuery);var s=i[0],c=0;if(t=t||[],h.host=h.host||(r.match(/\/\/([\s\S]+?)\//)||["//"+location.host+"/"])[0],0===i.length||layui["layui.all"]&&v[s]||!layui["layui.all"]&&layui["layui.mobile"]&&v[s])return a(),o;var u,f=(v[s]?r:!/^\{\/\}/.test(o.modules[s])&&h.base||"")+(o.modules[s]||s)+".js";if(f=f.replace(/^\{\/\}/,""),!h.modules[s]&&layui[s]&&(h.modules[s]=f),h.modules[s])!function e(){if(++c>1e3*h.timeout/4)return d();"string"==typeof h.modules[s]&&h.status[s]?a():setTimeout(e,4)}();else{var p=y.createElement("script");p.async=!0,p.charset="utf-8",p.src=f+((u=!0===h.version?h.v||(new Date).getTime():h.version||"")?"?v="+u:""),l.appendChild(p),!p.attachEvent||p.attachEvent.toString&&p.attachEvent.toString().indexOf("[native code")<0||g?p.addEventListener("load",function(e){n(e,f)},!1):p.attachEvent("onreadystatechange",function(e){n(e,f)}),h.modules[s]=f}return o},n.prototype.getStyle=function(e,t){var i=e.currentStyle?e.currentStyle:a.getComputedStyle(e,null);return i[i.getPropertyValue?"getPropertyValue":"getAttribute"](t)},n.prototype.link=function(e,t,i){var n=this,a=y.createElement("link"),o=y.getElementsByTagName("head")[0];"string"==typeof t&&(i=t);var r=(i||e).replace(/\.|\//g,""),l=a.id="layuicss-"+r,s=0;return a.rel="stylesheet",a.href=e+(h.debug?"?v="+(new Date).getTime():""),a.media="all",y.getElementById(l)||o.appendChild(a),"function"!=typeof t||function e(){if(++s>1e3*h.timeout/100)return d();1989===parseInt(n.getStyle(y.getElementById(l),"width"))?t():setTimeout(e,100)}(),n},h.callback={},n.prototype.factory=function(e){if(layui[e])return"function"==typeof h.callback[e]?h.callback[e]:null},n.prototype.addcss=function(e,t,i){return layui.link(h.base+e,t,i)},n.prototype.img=function(e,t,i){var n=new Image;if(n.src=e,n.complete)return t(n);n.onload=function(){n.onload=null,"function"==typeof t&&t(n)},n.onerror=function(e){n.onerror=null,"function"==typeof i&&i(e)}},n.prototype.config=function(e){for(var t in e=e||{})h[t]=e[t];return this},n.prototype.modules=function(){var e={};for(var t in v)e[t]=v[t];return e}(),n.prototype.extend=function(e){for(var t in e=e||{})this[t]||this.modules[t]||(this.modules[t]=e[t]);return this},n.prototype.router=function(e){var i={path:[],search:{},hash:((e=e||location.hash).match(/[^#](#.*$)/)||[])[1]||""};return/^#\//.test(e)&&(e=e.replace(/^#\//,""),i.href="/"+e,e=e.replace(/([^#])(#.*$)/,"$1").split("/")||[],this.each(e,function(e,t){/^\w+=/.test(t)?(t=t.split("="),i.search[t[0]]=t[1]):i.path.push(t)})),i},n.prototype.data=function(e,t,i){if(e=e||"layui",i=i||localStorage,a.JSON&&a.JSON.parse){if(null===t)return delete i[e];t="object"===_typeof(t)?t:{key:t};try{var n=JSON.parse(i[e])}catch(e){n={}}return"value"in t&&(n[t.key]=t.value),t.remove&&delete n[t.key],i[e]=JSON.stringify(n),t.key?n[t.key]:n}},n.prototype.sessionData=function(e,t){return this.data(e,t,sessionStorage)},n.prototype.device=function(e){function t(e){var t=new RegExp(e+"/([^\\s\\_\\-]+)");return(e=(i.match(t)||[])[1])||!1}var i=navigator.userAgent.toLowerCase(),n={os:/windows/.test(i)?"windows":/linux/.test(i)?"linux":/iphone|ipod|ipad|ios/.test(i)?"ios":/mac/.test(i)?"mac":void 0,ie:!!(a.ActiveXObject||"ActiveXObject"in a)&&((i.match(/msie\s(\d+)/)||[])[1]||"11"),weixin:t("micromessenger")};return e&&!n[e]&&(n[e]=t(e)),n.android=/android/.test(i),n.ios="ios"===n.os,n.mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)),n},n.prototype.hint=function(){return{error:d}},n.prototype.each=function(e,t){var i;if("function"!=typeof t)return this;if((e=e||[]).constructor===Object){for(i in e)if(t.call(e[i],i,e[i]))break}else for(i=0;i<e.length&&!t.call(e[i],i,e[i]);i++);return this},n.prototype.sort=function(e,o,t){var i=JSON.parse(JSON.stringify(e||[]));return o&&(i.sort(function(e,t){var i=/^-?\d+$/,n=e[o],a=t[o];return i.test(n)&&(n=parseFloat(n)),i.test(a)&&(a=parseFloat(a)),n&&!a?1:!n&&a?-1:a<n?1:n<a?-1:0}),t&&i.reverse()),i},n.prototype.stope=function(t){t=t||a.event;try{t.stopPropagation()}catch(e){t.cancelBubble=!0}},n.prototype.onevent=function(e,t,i){return"string"!=typeof e||"function"!=typeof i?this:n.event(e,t,null,i)},n.prototype.event=n.event=function(e,t,i,n){function a(e,t){!1===(t&&t.call(o,i))&&null===r&&(r=!1)}var o=this,r=null,l=t.match(/\((.*)\)$/)||[],s=(e+"."+t).replace(l[0],""),c=l[1]||"";return n?(h.event[s]=h.event[s]||{},h.event[s][c]=[n],this):(layui.each(h.event[s],function(e,t){"{*}"!==c?(""===e&&layui.each(t,a),c&&e===c&&layui.each(t,a)):layui.each(t,a)}),r)},a.layui=new n}(window),function(f){f.layui&&layui.define;function t(e){var t=this;t.index=++y.index,t.config=p.extend({},t.config,d.config,e),document.body?t.creat():setTimeout(function(){t.creat()},30)}var p,u,e,i,d={getPath:(e=document.currentScript?document.currentScript.src:function(){for(var e,t=document.scripts,i=t.length-1,n=i;0<n;n--)if("interactive"===t[n].readyState){e=t[n].src;break}return e||t[i].src}()).substring(0,e.lastIndexOf("/")+1),config:{},end:{},minIndex:0,minLeft:[],btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"],getStyle:function(e,t){var i=e.currentStyle?e.currentStyle:f.getComputedStyle(e,null);return i[i.getPropertyValue?"getPropertyValue":"getAttribute"](t)},link:function(e,t,i){if(y.path){var n=document.getElementsByTagName("head")[0],a=document.createElement("link");"string"==typeof t&&(i=t);var o="layuicss-"+(i||e).replace(/\.|\//g,"");a.rel="stylesheet",a.href=y.path+e,a.id=o,document.getElementById(o)||n.appendChild(a)}}},y={v:"3.1.1",ie:(i=navigator.userAgent.toLowerCase(),!!(f.ActiveXObject||"ActiveXObject"in f)&&((i.match(/msie\s(\d+)/)||[])[1]||"11")),index:f.layer&&f.layer.v?1e5:0,path:d.getPath,config:function(e){return e=e||{},y.cache=d.config=p.extend({},d.config,e),y.path=d.config.path||y.path,"string"==typeof e.extend&&(e.extend=[e.extend]),d.config.path&&y.ready(),e.extend,this},ready:function(){return this},alert:function(e,t,i){var n="function"==typeof t;return n&&(i=t),y.open(p.extend({content:e,yes:i},n?{}:t))},confirm:function(e,t,i,n){var a="function"==typeof t;return a&&(n=i,i=t),y.open(p.extend({content:e,btn:d.btn,yes:i,btn2:n},a?{}:t))},msg:function(e,t,i){var n="function"==typeof t,a=d.config.skin,o=(a?a+" "+a+"-msg":"")||"layui-layer-msg",r=c.anim.length-1;return n&&(i=t),y.open(p.extend({content:e,time:3e3,shade:!1,skin:o,title:!1,closeBtn:!1,btn:!1,resize:!1,end:i},n&&!d.config.skin?{skin:o+" layui-layer-hui",anim:r}:(-1!==(t=t||{}).icon&&(void 0!==t.icon||d.config.skin)||(t.skin=o+" "+(t.skin||"layui-layer-hui")),t)))},load:function(e,t){return y.open(p.extend({type:3,icon:e||1,resize:!1,shade:.01},t))},tips:function(e,t,i){return y.open(p.extend({type:4,content:[e,t],closeBtn:!1,time:3e3,shade:!1,resize:!1,fixed:!1,maxWidth:210},i))}};t.pt=t.prototype;var c=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];c.anim=["layer-anim-00","layer-anim-01","layer-anim-02","layer-anim-03","layer-anim-04","layer-anim-05","layer-anim-06"],t.pt.config={type:0,shade:.3,fixed:!0,move:c[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,anim:0,isOutAnim:!0,icon:-1,moveType:1,resize:!0,scrollbar:!0,tips:2},t.pt.vessel=function(e,t){var i,n=this.index,a=this.config,o=a.zIndex+n,r="object"===_typeof(a.title),l=a.maxmin&&(1===a.type||2===a.type),s=a.title?'<div class="layui-layer-title" style="'+(r?a.title[1]:"")+'">'+(r?a.title[0]:a.title)+"</div>":"";return a.zIndex=o,t([a.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+n+'" times="'+n+'" style="z-index:'+(o-1)+'; "></div>':"",'<div class="'+c[0]+" layui-layer-"+d.type[a.type]+(0!=a.type&&2!=a.type||a.shade?"":" layui-layer-border")+" "+(a.skin||"")+'" id="'+c[0]+n+'" type="'+d.type[a.type]+'" times="'+n+'" showtime="'+a.time+'" conType="'+(e?"object":"string")+'" style="z-index: '+o+"; width:"+a.area[0]+";height:"+a.area[1]+(a.fixed?"":";position:absolute;")+'">'+(e&&2!=a.type?"":s)+'<div id="'+(a.id||"")+'" class="layui-layer-content'+(0==a.type&&-1!==a.icon?" layui-layer-padding":"")+(3==a.type?" layui-layer-loading"+a.icon:"")+'">'+(0==a.type&&-1!==a.icon?'<i class="layui-layer-ico layui-layer-ico'+a.icon+'"></i>':"")+((1!=a.type||!e)&&a.content||"")+'</div><span class="layui-layer-setwin">'+(i=l?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"",a.closeBtn&&(i+='<a class="layui-layer-ico '+c[7]+" "+c[7]+(a.title?a.closeBtn:4==a.type?"1":"2")+'" href="javascript:;"></a>'),i)+"</span>"+(a.btn?function(){var e="";"string"==typeof a.btn&&(a.btn=[a.btn]);for(var t=0,i=a.btn.length;t<i;t++)e+='<a class="'+c[6]+t+'">'+a.btn[t]+"</a>";return'<div class="'+c[6]+" layui-layer-btn-"+(a.btnAlign||"")+'">'+e+"</div>"}():"")+(a.resize?'<span class="layui-layer-resize"></span>':"")+"</div>"],s,p('<div class="layui-layer-move"></div>')),this},t.pt.creat=function(){var n=this,a=n.config,o=n.index,r="object"===_typeof(s=a.content),l=p("body");if(!a.id||!p("#"+a.id)[0]){switch("string"==typeof a.area&&(a.area="auto"===a.area?["",""]:[a.area,""]),a.shift&&(a.anim=a.shift),6==y.ie&&(a.fixed=!1),a.type){case 0:a.btn="btn"in a?a.btn:d.btn[0],y.closeAll("dialog");break;case 2:var s=a.content=r?a.content:[a.content||"","auto"];a.content='<iframe scrolling="'+(a.content[1]||"auto")+'" allowtransparency="true" id="'+c[4]+o+'" name="'+c[4]+o+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+a.content[0]+'"></iframe>';break;case 3:delete a.title,delete a.closeBtn,-1===a.icon&&a.icon,y.closeAll("loading");break;case 4:r||(a.content=[a.content,"body"]),a.follow=a.content[1],a.content=a.content[0]+'<i class="layui-layer-TipsG"></i>',delete a.title,a.tips="object"===_typeof(a.tips)?a.tips:[a.tips,!0],a.tipsMore||y.closeAll("tips")}if(n.vessel(r,function(e,t,i){l.append(e[0]),r?2==a.type||4==a.type?p("body").append(e[1]):s.parents("."+c[0])[0]||(s.data("display",s.css("display")).show().addClass("layui-layer-wrap").wrap(e[1]),p("#"+c[0]+o).find("."+c[5]).before(t)):l.append(e[1]),p(".layui-layer-move")[0]||l.append(d.moveElem=i),n.layero=p("#"+c[0]+o),a.scrollbar||c.html.css("overflow","hidden").attr("layer-full",o)}).auto(o),p("#layui-layer-shade"+n.index).css({"background-color":a.shade[1]||"#000",opacity:a.shade[0]||a.shade}),2==a.type&&6==y.ie&&n.layero.find("iframe").attr("src",s[0]),4==a.type?n.tips():n.offset(),a.fixed&&u.on("resize",function(){n.offset(),(/^\d+%$/.test(a.area[0])||/^\d+%$/.test(a.area[1]))&&n.auto(o),4==a.type&&n.tips()}),a.time<=0||setTimeout(function(){y.close(n.index)},a.time),n.move().callback(),c.anim[a.anim]){var e="layer-anim "+c.anim[a.anim];n.layero.addClass(e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){p(this).removeClass(e)})}a.isOutAnim&&n.layero.data("isOutAnim",!0)}},t.pt.auto=function(e){var t=this.config,i=p("#"+c[0]+e);""===t.area[0]&&0<t.maxWidth&&(y.ie&&y.ie<8&&t.btn&&i.width(i.innerWidth()),i.outerWidth()>t.maxWidth&&i.width(t.maxWidth));function n(e){(e=i.find(e)).height(a[1]-o-r-2*(0|parseFloat(e.css("padding-top"))))}var a=[i.innerWidth(),i.innerHeight()],o=i.find(c[1]).outerHeight()||0,r=i.find("."+c[6]).outerHeight()||0;switch(t.type){case 2:n("iframe");break;default:""===t.area[1]?0<t.maxHeight&&i.outerHeight()>t.maxHeight?(a[1]=t.maxHeight,n("."+c[5])):t.fixed&&a[1]>=u.height()&&(a[1]=u.height(),n("."+c[5])):n("."+c[5])}return this},t.pt.offset=function(){var e=this,t=e.config,i=e.layero,n=[i.outerWidth(),i.outerHeight()],a="object"===_typeof(t.offset);e.offsetTop=(u.height()-n[1])/2,e.offsetLeft=(u.width()-n[0])/2,a?(e.offsetTop=t.offset[0],e.offsetLeft=t.offset[1]||e.offsetLeft):"auto"!==t.offset&&("t"===t.offset?e.offsetTop=0:"r"===t.offset?e.offsetLeft=u.width()-n[0]:"b"===t.offset?e.offsetTop=u.height()-n[1]:"l"===t.offset?e.offsetLeft=0:"lt"===t.offset?(e.offsetTop=0,e.offsetLeft=0):"lb"===t.offset?(e.offsetTop=u.height()-n[1],e.offsetLeft=0):"rt"===t.offset?(e.offsetTop=0,e.offsetLeft=u.width()-n[0]):"rb"===t.offset?(e.offsetTop=u.height()-n[1],e.offsetLeft=u.width()-n[0]):e.offsetTop=t.offset),t.fixed||(e.offsetTop=/%$/.test(e.offsetTop)?u.height()*parseFloat(e.offsetTop)/100:parseFloat(e.offsetTop),e.offsetLeft=/%$/.test(e.offsetLeft)?u.width()*parseFloat(e.offsetLeft)/100:parseFloat(e.offsetLeft),e.offsetTop+=u.scrollTop(),e.offsetLeft+=u.scrollLeft()),i.attr("minLeft")&&(e.offsetTop=u.height()-(i.find(c[1]).outerHeight()||0),e.offsetLeft=i.css("left")),i.css({top:e.offsetTop,left:e.offsetLeft})},t.pt.tips=function(){var e=this.config,t=this.layero,i=[t.outerWidth(),t.outerHeight()],n=p(e.follow);n[0]||(n=p("body"));var a={width:n.outerWidth(),height:n.outerHeight(),top:n.offset().top,left:n.offset().left},o=t.find(".layui-layer-TipsG"),r=e.tips[0];e.tips[1]||o.remove(),a.autoLeft=function(){0<a.left+i[0]-u.width()?(a.tipLeft=a.left+a.width-i[0],o.css({right:12,left:"auto"})):a.tipLeft=a.left},a.where=[function(){a.autoLeft(),a.tipTop=a.top-i[1]-10,o.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",e.tips[1])},function(){a.tipLeft=a.left+a.width+10,a.tipTop=a.top,o.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",e.tips[1])},function(){a.autoLeft(),a.tipTop=a.top+a.height+10,o.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",e.tips[1])},function(){a.tipLeft=a.left-i[0]-10,a.tipTop=a.top,o.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",e.tips[1])}],a.where[r-1](),1===r?a.top-(u.scrollTop()+i[1]+16)<0&&a.where[2]():2===r?0<u.width()-(a.left+a.width+i[0]+16)||a.where[3]():3===r?0<a.top-u.scrollTop()+a.height+i[1]+16-u.height()&&a.where[0]():4===r&&0<i[0]+16-a.left&&a.where[1](),t.find("."+c[5]).css({"background-color":e.tips[1],"padding-right":e.closeBtn?"30px":""}),t.css({left:a.tipLeft-(e.fixed?u.scrollLeft():0),top:a.tipTop-(e.fixed?u.scrollTop():0)})},t.pt.move=function(){var r=this,l=r.config,e=p(document),s=r.layero,t=s.find(l.move),i=s.find(".layui-layer-resize"),c={};return l.move&&t.css("cursor","move"),t.on("mousedown",function(e){e.preventDefault(),l.move&&(c.moveStart=!0,c.offset=[e.clientX-parseFloat(s.css("left")),e.clientY-parseFloat(s.css("top"))],d.moveElem.css("cursor","move").show())}),i.on("mousedown",function(e){e.preventDefault(),c.resizeStart=!0,c.offset=[e.clientX,e.clientY],c.area=[s.outerWidth(),s.outerHeight()],d.moveElem.css("cursor","se-resize").show()}),e.on("mousemove",function(e){if(c.moveStart){var t=e.clientX-c.offset[0],i=e.clientY-c.offset[1],n="fixed"===s.css("position");if(e.preventDefault(),c.stX=n?0:u.scrollLeft(),c.stY=n?0:u.scrollTop(),!l.moveOut){var a=u.width()-s.outerWidth()+c.stX,o=u.height()-s.outerHeight()+c.stY;t<c.stX&&(t=c.stX),a<t&&(t=a),i<c.stY&&(i=c.stY),o<i&&(i=o)}s.css({left:t,top:i})}if(l.resize&&c.resizeStart){t=e.clientX-c.offset[0],i=e.clientY-c.offset[1];e.preventDefault(),y.style(r.index,{width:c.area[0]+t,height:c.area[1]+i}),c.isResize=!0,l.resizing&&l.resizing(s)}}).on("mouseup",function(e){c.moveStart&&(delete c.moveStart,d.moveElem.hide(),l.moveEnd&&l.moveEnd(s)),c.resizeStart&&(delete c.resizeStart,d.moveElem.hide())}),r},t.pt.callback=function(){var t=this,i=t.layero,n=t.config;t.openLayer(),n.success&&(2==n.type?i.find("iframe").on("load",function(){n.success(i,t.index)}):n.success(i,t.index)),6==y.ie&&t.IE6(i),i.find("."+c[6]).children("a").on("click",function(){var e=p(this).index();0===e?n.yes?n.yes(t.index,i):n.btn1?n.btn1(t.index,i):y.close(t.index):!1===(n["btn"+(e+1)]&&n["btn"+(e+1)](t.index,i))||y.close(t.index)}),i.find("."+c[7]).on("click",function(){!1===(n.cancel&&n.cancel(t.index,i))||y.close(t.index)}),n.shadeClose&&p("#layui-layer-shade"+t.index).on("click",function(){y.close(t.index)}),i.find(".layui-layer-min").on("click",function(){!1===(n.min&&n.min(i))||y.min(t.index,n)}),i.find(".layui-layer-max").on("click",function(){p(this).hasClass("layui-layer-maxmin")?(y.restore(t.index),n.restore&&n.restore(i)):(y.full(t.index,n),setTimeout(function(){n.full&&n.full(i)},100))}),n.end&&(d.end[t.index]=n.end)},d.reselect=function(){p.each(p("select"),function(e,t){var i=p(this);i.parents("."+c[0])[0]||1==i.attr("layer")&&p("."+c[0]).length<1&&i.removeAttr("layer").show(),i=null})},t.pt.IE6=function(e){p("select").each(function(e,t){var i=p(this);i.parents("."+c[0])[0]||"none"===i.css("display")||i.attr({layer:"1"}).hide(),i=null})},t.pt.openLayer=function(){y.zIndex=this.config.zIndex,y.setTop=function(e){return y.zIndex=parseInt(e[0].style.zIndex),e.on("mousedown",function(){y.zIndex++,e.css("z-index",y.zIndex+1)}),y.zIndex}},d.record=function(e){var t=[e.width(),e.height(),e.position().top,e.position().left+parseFloat(e.css("margin-left"))];e.find(".layui-layer-max").addClass("layui-layer-maxmin"),e.attr({area:t})},d.rescollbar=function(e){c.html.attr("layer-full")==e&&(c.html[0].style.removeProperty?c.html[0].style.removeProperty("overflow"):c.html[0].style.removeAttribute("overflow"),c.html.removeAttr("layer-full"))},(f.layer=y).getChildFrame=function(e,t){return t=t||p("."+c[4]).attr("times"),p("#"+c[0]+t).find("iframe").contents().find(e)},y.getFrameIndex=function(e){return p("#"+e).parents("."+c[4]).attr("times")},y.iframeAuto=function(e){if(e){var t=y.getChildFrame("html",e).outerHeight(),i=p("#"+c[0]+e),n=i.find(c[1]).outerHeight()||0,a=i.find("."+c[6]).outerHeight()||0;i.css({height:t+n+a}),i.find("iframe").css({height:t})}},y.iframeSrc=function(e,t){p("#"+c[0]+e).find("iframe").attr("src",t)},y.style=function(e,t,i){var n=p("#"+c[0]+e),a=n.find(".layui-layer-content"),o=n.attr("type"),r=n.find(c[1]).outerHeight()||0,l=n.find("."+c[6]).outerHeight()||0;n.attr("minLeft");o!==d.type[3]&&o!==d.type[4]&&(i||(parseFloat(t.width)<=260&&(t.width=260),parseFloat(t.height)-r-l<=64&&(t.height=64+r+l)),n.css(t),l=n.find("."+c[6]).outerHeight(),o===d.type[2]?n.find("iframe").css({height:parseFloat(t.height)-r-l}):a.css({height:parseFloat(t.height)-r-l-parseFloat(a.css("padding-top"))-parseFloat(a.css("padding-bottom"))}))},y.min=function(e,t){var i=p("#"+c[0]+e),n=i.find(c[1]).outerHeight()||0,a=i.attr("minLeft")||181*d.minIndex+"px",o=i.css("position");d.record(i),d.minLeft[0]&&(a=d.minLeft[0],d.minLeft.shift()),i.attr("position",o),y.style(e,{width:180,height:n,left:a,top:u.height()-n,position:"fixed",overflow:"hidden"},!0),i.find(".layui-layer-min").hide(),"page"===i.attr("type")&&i.find(c[4]).hide(),d.rescollbar(e),i.attr("minLeft")||d.minIndex++,i.attr("minLeft",a)},y.restore=function(e){var t=p("#"+c[0]+e),i=t.find(c[1]).outerHeight()||0,n=t.attr("area").split(",");t.attr("type");y.style(e,{width:parseFloat(n[0]),height:parseFloat(n[1]),top:parseFloat(n[2]),left:parseFloat(n[3]),position:t.attr("position"),overflow:"visible"},!0),p("#layui-layer-iframe"+e).css("height",parseFloat(n[1])-i),t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),t.find(".layui-layer-min").show(),"page"===t.attr("type")&&t.find(c[4]).show(),d.rescollbar(e)},y.full=function(t){var e,i=p("#"+c[0]+t),n=i.find(c[1]).outerHeight()||0;d.record(i),c.html.attr("layer-full")||c.html.css("overflow","hidden").attr("layer-full",t),clearTimeout(e),e=setTimeout(function(){var e="fixed"===i.css("position");y.style(t,{top:e?0:u.scrollTop(),left:e?0:u.scrollLeft(),width:u.width(),height:u.height()},!0),p("#layui-layer-iframe"+t).css("height",u.height()-n),i.find(".layui-layer-min").hide()},100)},y.title=function(e,t){p("#"+c[0]+(t||y.index)).find(c[1]).html(e)},y.close=function(n){var a=p("#"+c[0]+n),o=a.attr("type");if(a[0]){var r="layui-layer-wrap",e=function(){if(o===d.type[1]&&"object"===a.attr("conType")){a.children(":not(."+c[5]+")").remove();for(var e=a.find("."+r),t=0;t<2;t++)e.unwrap();e.css("display",e.data("display")).removeClass(r)}else{if(o===d.type[2])try{var i=p("#"+c[4]+n)[0];i.contentWindow.document.write(""),i.contentWindow.close(),a.find("."+c[5])[0].removeChild(i)}catch(e){}a[0].innerHTML="",a.remove()}"function"==typeof d.end[n]&&d.end[n](),delete d.end[n]};a.data("isOutAnim")&&a.addClass("layer-anim layer-anim-close"),p("#layui-layer-moves, #layui-layer-shade"+n).remove(),6==y.ie&&d.reselect(),d.rescollbar(n),a.attr("minLeft")&&(d.minIndex--,d.minLeft.push(a.attr("minLeft"))),y.ie&&y.ie<10||!a.data("isOutAnim")?e():setTimeout(function(){e()},200)}},y.closeAll=function(i){p.each(p("."+c[0]),function(){var e=p(this),t=i?e.attr("type")===i:1;t&&y.close(e.attr("times")),t=null})};function h(e){return n.skin?" "+n.skin+" "+n.skin+"-"+e:""}var n=y.cache||{};y.prompt=function(i,n){var e="";if("function"==typeof(i=i||{})&&(n=i),i.area){var t=i.area;e='style="width: '+t[0]+"; height: "+t[1]+';"',delete i.area}var a,o=2==i.formType?'<textarea class="layui-layer-input"'+e+"></textarea>":'<input type="'+(1==i.formType?"password":"text")+'" class="layui-layer-input">',r=i.success;return delete i.success,y.open(p.extend({type:1,btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],content:o,skin:"layui-layer-prompt"+h("prompt"),maxWidth:u.width(),success:function(e){(a=e.find(".layui-layer-input")).val(i.value||"").focus(),"function"==typeof r&&r(e)},resize:!1,yes:function(e){var t=a.val();""===t?a.focus():t.length>(i.maxlength||500)?y.tips("&#x6700;&#x591A;&#x8F93;&#x5165;"+(i.maxlength||500)+"&#x4E2A;&#x5B57;&#x6570;",a,{tips:1}):n&&n(t,e,a)}},i))},y.tab=function(a){var n=(a=a||{}).tab||{},o="layui-this",i=a.success;return delete a.success,y.open(p.extend({type:1,skin:"layui-layer-tab"+h("tab"),resize:!1,title:function(){var e=n.length,t=1,i="";if(0<e)for(i='<span class="'+o+'">'+n[0].title+"</span>";t<e;t++)i+="<span>"+n[t].title+"</span>";return i}(),content:'<ul class="layui-layer-tabmain">'+function(){var e=n.length,t=1,i="";if(0<e)for(i='<li class="layui-layer-tabli '+o+'">'+(n[0].content||"no content")+"</li>";t<e;t++)i+='<li class="layui-layer-tabli">'+(n[t].content||"no  content")+"</li>";return i}()+"</ul>",success:function(e){var t=e.find(".layui-layer-title").children(),n=e.find(".layui-layer-tabmain").children();t.on("mousedown",function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0;var t=p(this),i=t.index();t.addClass(o).siblings().removeClass(o),n.eq(i).show().siblings().hide(),"function"==typeof a.change&&a.change(i)}),"function"==typeof i&&i(e)}},a))},y.photos=function(a,e,t){var i={};if((a=a||{}).photos){var n=a.photos.constructor===Object,o=n?a.photos:{},r=o.data||[],l=o.start||0;i.imgIndex=1+(0|l),a.img=a.img||"img";var s=a.success;if(delete a.success,n){if(0===r.length)return y.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")}else{var c=p(a.photos),u=function(){r=[],c.find(a.img).each(function(e){var t=p(this);t.attr("layer-index",e),r.push({alt:t.attr("alt"),pid:t.attr("layer-pid"),src:t.attr("layer-src")||t.attr("src"),thumb:t.attr("src")})})};if(u(),0===r.length)return;if(e||c.on("click",a.img,function(){var e=p(this).attr("layer-index");y.photos(p.extend(a,{photos:{start:e,data:r,tab:a.tab},full:a.full}),!0),u()}),!e)return}i.imgprev=function(e){i.imgIndex--,i.imgIndex<1&&(i.imgIndex=r.length),i.tabimg(e)},i.imgnext=function(e,t){i.imgIndex++,i.imgIndex>r.length&&(i.imgIndex=1,t)||i.tabimg(e)},i.keyup=function(e){if(!i.end){var t=e.keyCode;e.preventDefault(),37===t?i.imgprev(!0):39===t?i.imgnext(!0):27===t&&y.close(i.index)}},i.tabimg=function(e){if(!(r.length<=1))return o.start=i.imgIndex-1,y.close(i.index),y.photos(a,!0,e)},i.event=function(){i.bigimg.hover(function(){i.imgsee.show()},function(){i.imgsee.hide()}),i.bigimg.find(".layui-layer-imgprev").on("click",function(e){e.preventDefault(),i.imgprev()}),i.bigimg.find(".layui-layer-imgnext").on("click",function(e){e.preventDefault(),i.imgnext()}),p(document).on("keyup",i.keyup)},i.loadi=y.load(1,{shade:!("shade"in a)&&.9,scrollbar:!1}),function(e,t,i){var n=new Image;if(n.src=e,n.complete)return t(n);n.onload=function(){n.onload=null,t(n)},n.onerror=function(e){n.onerror=null,i(e)}}(r[l].src,function(n){y.close(i.loadi),i.index=y.open(p.extend({type:1,id:"layui-layer-photos",area:function(){var e=[n.width,n.height],t=[p(f).width()-100,p(f).height()-100];if(!a.full&&(e[0]>t[0]||e[1]>t[1])){var i=[e[0]/t[0],e[1]/t[1]];i[1]<i[0]?(e[0]=e[0]/i[0],e[1]=e[1]/i[0]):i[0]<i[1]&&(e[0]=e[0]/i[1],e[1]=e[1]/i[1])}return[e[0]+"px",e[1]+"px"]}(),title:!1,shade:.9,shadeClose:!0,closeBtn:!1,move:".layui-layer-phimg img",moveType:1,scrollbar:!1,moveOut:!0,isOutAnim:!1,skin:"layui-layer-photos"+h("photos"),content:'<div class="layui-layer-phimg"><img src="'+r[l].src+'" alt="'+(r[l].alt||"")+'" layer-pid="'+r[l].pid+'"><div class="layui-layer-imgsee">'+(1<r.length?'<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>':"")+'<div class="layui-layer-imgbar" style="display:'+(t?"block":"")+'"><span class="layui-layer-imgtit"><a href="javascript:;">'+(r[l].alt||"")+"</a><em>"+i.imgIndex+"/"+r.length+"</em></span></div></div></div>",success:function(e){i.bigimg=e.find(".layui-layer-phimg"),i.imgsee=e.find(".layui-layer-imguide,.layui-layer-imgbar"),i.event(e),a.tab&&a.tab(r[l],e),"function"==typeof s&&s(e)},end:function(){i.end=!0,p(document).off("keyup",i.keyup)}},a))},function(){y.close(i.loadi),y.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;",{time:3e4,btn:["&#x4E0B;&#x4E00;&#x5F20;","&#x4E0D;&#x770B;&#x4E86;"],yes:function(){1<r.length&&i.imgnext(!0,!0)}})})}},d.run=function(e){u=(p=e)(f),c.html=p("html"),y.open=function(e){return new t(e).index}},f.layui&&layui.define?(y.ready(),layui.define("jquery",function(e){y.path=layui.cache.dir,d.run(layui.$),e("layer",f.layer=y)})):"function"==typeof define&&define.amd?define([],function(){return d.run(f.jQuery),y}):(d.run(f.jQuery),y.ready())}(window),layui.define(["jquery"],function(e){var f=layui.$;e("util",{loadJs:function(e,t){var i=document.createElement("script");i.setAttribute("type","text/javascript"),i.setAttribute("src",e),document.getElementsByTagName("head")[0].appendChild(i),/msie/.test(window.navigator.userAgent.toLowerCase())?i.onreadystatechange=function(){"loaded"!=this.readyState&&"complete"!=this.readyState||t()}:/gecko/.test(window.navigator.userAgent.toLowerCase())?i.onload=function(){t()}:t()},fixbar:function(t){var e,i,n="layui-fixbar",a="layui-fixbar-top",o=f(document),r=f("body");(t=f.extend({showHeight:200},t)).bar1=!0===t.bar1?"&#xe606;":t.bar1,t.bar2=!0===t.bar2?"&#xe607;":t.bar2,t.bgcolor=t.bgcolor?"background-color:"+t.bgcolor:"";function l(){o.scrollTop()>=t.showHeight?e||(u.show(),e=1):e&&(u.hide(),e=0)}var s=[t.bar1,t.bar2,"&#xe604;"],c=f(['<ul class="'+n+'">',t.bar1?'<li class="fa" lay-type="bar1" style="'+t.bgcolor+'">'+s[0]+"</li>":"",t.bar2?'<li class="fa" lay-type="bar2" style="'+t.bgcolor+'">'+s[1]+"</li>":"",'<li class="fa '+a+'" lay-type="top" style="'+t.bgcolor+'">'+s[2]+"</li>","</ul>"].join("")),u=c.find("."+a);f("."+n)[0]||("object"===_typeof(t.css)&&c.css(t.css),r.append(c),l(),c.find("li").on("click",function(){var e=f(this).attr("lay-type");"top"===e&&f("html,body").animate({scrollTop:0},200),t.click&&t.click.call(this,e)}),o.on("scroll",function(){clearTimeout(i),i=setTimeout(function(){l()},100)}))},countdown:function(e,t,i){var n=this,a="function"==typeof t,o=new Date(e).getTime(),r=new Date(!t||a?(new Date).getTime():t).getTime(),l=o-r,s=[Math.floor(l/864e5),Math.floor(l/36e5)%24,Math.floor(l/6e4)%60,Math.floor(l/1e3)%60];a&&(i=t);var c=setTimeout(function(){n.countdown(e,r+1e3,i)},1e3);return i&&i(0<l?s:[0,0,0,0],t,c),l<=0&&clearTimeout(c),c},timeAgo:function(e,t){var i=this,n=[[],[]],a=(new Date).getTime()-new Date(e).getTime();return 6912e5<a?(a=new Date(e),n[0][0]=i.digit(a.getFullYear(),4),n[0][1]=i.digit(a.getMonth()+1),n[0][2]=i.digit(a.getDate()),t||(n[1][0]=i.digit(a.getHours()),n[1][1]=i.digit(a.getMinutes()),n[1][2]=i.digit(a.getSeconds())),n[0].join("-")+" "+n[1].join(":")):864e5<=a?(a/1e3/60/60/24|0)+"天前":36e5<=a?(a/1e3/60/60|0)+"小时前":12e4<=a?(a/1e3/60|0)+"分钟前":a<0?"未来":"刚刚"},digit:function(e,t){var i="";t=t||2;for(var n=(e=String(e)).length;n<t;n++)i+="0";return e<Math.pow(10,t)?i+(0|e):e},toDateString:function(e,t){var i=this,n=new Date(e||new Date),a=[i.digit(n.getFullYear(),4),i.digit(n.getMonth()+1),i.digit(n.getDate())],o=[i.digit(n.getHours()),i.digit(n.getMinutes()),i.digit(n.getSeconds())];return(t=t||"yyyy-MM-dd HH:mm:ss").replace(/yyyy/g,a[0]).replace(/MM/g,a[1]).replace(/dd/g,a[2]).replace(/HH/g,o[0]).replace(/mm/g,o[1]).replace(/ss/g,o[2])},escape:function(e){return String(e||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},formatSize:function(e){if(null==e||""==e)return"0 Bytes";var t,i=new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"),n=parseFloat(e);t=Math.floor(Math.log(n)/Math.log(1024));var a=n/Math.pow(1024,t);return(a=a.toFixed(2))+i[t]},getExtension:function(e){var t=e.lastIndexOf(".");return t<0?"":e.substr(t+1,e.length)},toRmb:function(e){var t=99999999999.99,i="壹",n="贰",a="叁",o="拾",r="佰",l="仟",s="万",c="亿",u="角",f="分";if(""==(e=e.toString()))return alert("转换内容不能为空!"),"";if(null!=e.match(/[^,.\d]/))return alert("输入有误,请输入小数点和纯数字!"),"";if(null==e.match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/))return alert("输入有误,请输入小数点和纯数字!"),"";if(e=(e=e.replace(/,/g,"")).replace(/^0+/,""),Number(e)>t)return alert("对不起,你输入的数字太大了!最大数字为99999999999.99！"),"";if(t=1<(t=e.split(".")).length?(e=t[0],(t=t[1]).substr(0,2)):(e=t[0],""),i=new Array("零",i,n,a,"肆","伍","陆","柒","捌","玖"),o=new Array("",o,r,l),s=new Array("",s,c),f=new Array(u,f),u="",0<Number(e)){for(r=c=0;r<e.length;r++)n=(a=e.length-r-1)/4,a%=4,"0"==(l=e.substr(r,1))?c++:(0<c&&(u+=i[0]),c=0,u+=i[Number(l)]+o[a]),0==a&&c<4&&(u+=s[n]);u+="元"}if(""!=t)for(r=0;r<t.length;r++)"0"!=(l=t.substr(r,1))&&(u+=i[Number(l)]+f[r]);return""==u&&(u="零元"),t.length<2&&(u+="整"),u}})}),layui.define(function(e){function t(e){this.tpl=e}var o={open:"{{",close:"}}"},r=function(e,t,i){var n=["#([\\s\\S])+?","([^{#}])*?"][e||0];return c((t||"")+o.open+n+o.close+(i||""))},l=function(e){return String(e||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},s=function(e,t){var i="Laytpl Error：";return"undefined"==typeof console||_typeof(console),i+e},c=function(e){return new RegExp(e,"g")};t.pt=t.prototype,window.errors=0,t.pt.parse=function(e,t){var i=e,n=c("^"+o.open+"#",""),a=c(o.close+"$","");e='"use strict";var view = "'+(e=e.replace(/\s+|\r|\t|\n/g," ").replace(c(o.open+"#"),o.open+"# ").replace(c(o.close+"}"),"} "+o.close).replace(/\\/g,"\\\\").replace(c(o.open+"!(.+?)!"+o.close),function(e){return e=e.replace(c("^"+o.open+"!"),"").replace(c("!"+o.close),"").replace(c(o.open+"|"+o.close),function(e){return e.replace(/(.)/g,"\\$1")})}).replace(/(?="|')/g,"\\").replace(r(),function(e){return'";'+(e=e.replace(n,"").replace(a,"")).replace(/\\/g,"")+';view+="'}).replace(r(1),function(e){var t='"+(';return e.replace(/\s/g,"")===o.open+o.close?"":(e=e.replace(c(o.open+"|"+o.close),""),/^=/.test(e)&&(e=e.replace(/^=/,""),t='"+_escape_('),t+e.replace(/\\/g,"")+')+"')}))+'";return view;';try{return this.cache=e=new Function("d, _escape_",e),e(t,l)}catch(e){return delete this.cache,s(e,i)}},t.pt.render=function(e,t){var i;return e?(i=this.cache?this.cache(e,l):this.parse(this.tpl,e),t?void t(i):i):s("no data")};function i(e){return"string"!=typeof e?s("Template not found"):new t(e)}i.config=function(e){for(var t in e=e||{})o[t]=e[t]},i.v="1.2.0",e("laytpl",i)});