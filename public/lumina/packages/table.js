"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}layui.define(["admin","laytpl","laypage","form","dropdown"],function(e){function r(){var t=this,e=t.config,a=e.id||e.index;return a&&(r.that[a]=t,r.config[a]=e),{reload:function(e){t.reload.call(t,e)},setColsWidth:function(){t.setColsWidth.call(t)},resize:function(){t.resize.call(t)},config:e}}function i(e){var t=r.config[e];return t||p.error("The ID option was not found in the table instance"),t||null}function t(e){return['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ','{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>',"<thead>","{{# layui.each(d.data.cols, function(i1, item1){ }}","<tr>","{{# layui.each(item1, function(i2, item2){ }}",'{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}','{{# if(item2.fixed === "right"){ right = true; } }}',(e=e||{}).fixed&&"right"!==e.fixed?'{{# if(item2.fixed && item2.fixed !== "right"){ }}':"right"===e.fixed?'{{# if(item2.fixed === "right"){ }}':"","{{# var isSort = !(item2.colGroup) && item2.sort; }}",'<th data-field="{{ item2.field||i2 }}" data-key="{{d.index}}-{{i1}}-{{i2}}" {{# if( item2.parentKey){ }}data-parentkey="{{ item2.parentKey }}"{{# } }} {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} {{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}} {{# if(item2.unresize || item2.colGroup){ }}data-unresize="true"{{# } }} class="{{# if(item2.hide){ }}layui-hide{{# } }}{{# if(isSort){ }} layui-unselect{{# } }}{{# if(!item2.field){ }} layui-table-col-special{{# } }}">','<div class="layui-table-cell laytable-cell-',"{{# if(item2.colGroup){ }}","group","{{# } else { }}","{{d.index}}-{{i1}}-{{i2}}",'{{# if(item2.type !== "normal"){ }}'," laytable-cell-{{ item2.type }}","{{# } }}","{{# } }}",'" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>','{{# if(item2.type === "checkbox"){ }}','<input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>',"{{# } else { }}",'<span>{{item2.title||""}}</span>',"{{# if(isSort){ }}",'<span class="layui-table-sort layui-inline"><i class="layui-edge fa-sort-asc" title="升序"></i><i class="layui-edge fa-sort-desc" title="降序"></i></span>',"{{# } }}","{{# } }}","</div>","</th>",e.fixed?"{{# }; }}":"","{{# }); }}","</tr>","{{# }); }}","</thead>","</table>"].join("")}function a(e){H="",this.index=++w.index,this.config=v.extend({},this.config,w.config,e),this.render()}var v=layui.$,g=layui.laytpl,d=layui.laypage,h=layui.layer,f=layui.form,y=layui.dropdown,p=layui.hint(),m=layui.admin,b=layui.device(),l=!1,x=null,k=null,w={config:{checkName:"LAY_CHECKED",indexName:"LAY_TABLE_INDEX"},cache:{},index:layui.table?layui.table.index+1e4:0,set:function(e){var t=this;return t.config=v.extend({},t.config,e),t},on:function(e,t){return layui.onevent.call(this,C,e,t)}},C="table",T="layui-hide",c="layui-none",o="layui-table-view",s=".layui-table-header",S=".layui-table-body",A=".layui-table-sort",L="layui-table-edit",W="layui-table-hover",n=['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ','{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>',"<tbody></tbody>","</table>"].join(""),u=['<div class="layui-form layui-border-box {{d.VIEW_CLASS}}" lay-filter="LAY-table-{{d.index}}" lay-id="{{ d.data.id }}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">',"{{# if(d.data.toolbar){ }}",'<div class="layui-table-tool">','<div class="layui-table-tool-temp"></div>','<div class="layui-table-tool-self"></div>',"</div>","{{# } }}",'<div class="layui-table-box">',"{{# if(d.data.loading){ }}",'<div class="layui-table-init" style="background-color: #fff;">','<i class="fa fa-spin fa-spinner"></i>',"</div>","{{# } }}","{{# var left, right; }}",'<div class="layui-table-header">',t(),"</div>",'<div class="layui-table-body layui-table-main">',n,"</div>","{{# if(left){ }}",'<div class="layui-table-fixed layui-table-fixed-l">','<div class="layui-table-header">',t({fixed:!0}),"</div>",'<div class="layui-table-body">',n,"</div>","</div>","{{# }; }}","{{# if(right){ }}",'<div class="layui-table-fixed layui-table-fixed-r">','<div class="layui-table-header">',t({fixed:"right"}),'<div class="layui-table-mend"></div>',"</div>",'<div class="layui-table-body">',n,"</div>","</div>","{{# }; }}","</div>","{{# if(d.data.totalRow){ }}",'<div class="layui-table-total">','<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ','{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>','<tbody><tr><td><div class="layui-table-cell" style="visibility: hidden;">Total</div></td></tr></tbody>',"</table>","</div>","{{# } }}","{{# if(d.data.page){ }}",'<div class="layui-table-page">','<div id="layui-table-page{{d.index}}"></div>',"</div>","{{# } }}","<style>","{{# layui.each(d.data.cols, function(i1, item1){","layui.each(item1, function(i2, item2){ }}",".laytable-cell-{{d.index}}-{{i1}}-{{i2}}{ ","{{# if(item2.width){ }}","width: {{item2.width}}px;","{{# } }}"," }","{{# });","}); }}","</style>","</div>"].join(""),_=v(window),E=v(document),H="";a.prototype.config={limit:15,loading:!0,cellMinWidth:80,defaultToolbar:["filter","exports"],action:null,autoSort:!1,canSearch:!0,autoShow:null,autoShowWidth:"800px",autoShowWidthMobile:"300px",toolbar:"default",searchFields:null,lineHeight:null,height:"full-100",page:!0,hasRefresh:!0,export:{url:null,can:!1,all:!1},text:{none:"无数据"}},a.prototype.render=function(){var e=this,t=e.config;if(t.elem=v(t.elem),t.where=t.where||{},t.id=t.id||t.elem.attr("id")||e.index,t.elem.addClass("loading"),t.request=v.extend({pageName:"page",limitName:"limit"},t.request),t.response=v.extend({statusName:"errcode",statusCode:0,msgName:"msg",dataName:"data",countName:"total"},t.response),"object"===_typeof(t.page)&&(t.limit=t.page.limit||t.limit,t.limits=t.page.limits||t.limits,e.page=t.page.curr=t.page.curr||1,delete t.page.elem,delete t.page.jump),!t.elem[0])return e;t.height&&/^full-\d+$/.test(t.height)&&(e.fullHeightGap=t.height.split("-")[1],t.height=_.height()-e.fullHeightGap),e.setInit();var a=t.elem,i=a.next("."+o),l=e.elem=v(g(u).render({VIEW_CLASS:o,data:t,index:e.index}));if(t.index=e.index,i[0]&&i.remove(),a.after(l),e.layTool=l.find(".layui-table-tool"),e.layBox=l.find(".layui-table-box"),e.layHeader=l.find(s),e.layMain=l.find(".layui-table-main"),e.layBody=l.find(S),e.layFixed=l.find(".layui-table-fixed"),e.layFixLeft=l.find(".layui-table-fixed-l"),e.layFixRight=l.find(".layui-table-fixed-r"),e.layTotal=l.find(".layui-table-total"),e.layPage=l.find(".layui-table-page"),e.renderToolbar(),e.renderFilter(),e.fullSize(),1<t.cols.length){var n=e.layFixed.find(s).find("th");n.height(e.layHeader.height()-1-parseFloat(n.css("padding-top"))-parseFloat(n.css("padding-bottom")))}e.pullData(e.page),e.events()},a.prototype.initOpts=function(e){var t=this.config;e.checkbox&&(e.type="checkbox"),e.space&&(e.type="space"),e.type||(e.type="normal"),"normal"!==e.type&&(e.unresize=!0,e.width=e.width||{checkbox:48,radio:48,space:15,numbers:40}[e.type]),t.autoShow&&!l&&(l=!0,t.cols[0].push({title:"#",toolbar:"<div><a class='px-1 cursor-pointer' lay-event='show'><i class='fa fa-eye'></i></a></div>",fixed:"right",width:50,downoff:!0}))},a.prototype.setInit=function(e){var t=this,o=t.config;if(o.clientWidth=o.width||function e(t){var a,i;a=(t=t||o.elem.parent()).width();try{i="none"===t.css("display")}catch(e){}return!t[0]||a&&!i?a:e(t.parent())}(),"width"===e)return o.clientWidth;layui.each(o.cols,function(n,e){layui.each(e,function(a,i){if(i){if(i.key=n+"-"+a,i.hide=i.hide||!1,i.colGroup||1<i.colspan){var l=0;layui.each(o.cols[n+1],function(e,t){t.HAS_PARENT||1<l&&l==i.colspan||(t.HAS_PARENT=!0,t.parentKey=n+"-"+a,l+=parseInt(1<t.colspan?t.colspan:1))}),i.colGroup=!0}t.initOpts(i)}else e.splice(a,1)})})},a.prototype.renderFilter=function(){var l=this,e=l.config,n=['<div class="layui-inline filterbox pull-right cursor-pointer">','<div class="layui-btn-dropdown" data-toggle="dropdown">','<i class="fa fa-filter" title="筛选"></i>','<ul class="layui-dropdown-menu" data-name="{{ d.name }}">{{ d.actionItems }}</ul>',"</div></div></div>"].join("");if(x){var t=l.layTool.find(".layui-table-tool-temp"),a="";v.each(k,function(e,t){a+='<span lay-event="clearFilter" data-name="'+e+'" class="layui-badge-rim mr-2 border-red-600">'+t.label+"："+t.val+'<i class="fa fa-trash text-error ml-1"></i></span>'}),t.append(['<div class="layui-inline filterbox pull-right cursor-pointer">',a,"<div>"].join(""))}e.filters&&(v.each(e.filters,function(e,t){var a=l.layHeader.find("th[data-field="+t.name+"]"),i="";v.each(t.options,function(e,t){i+='<li><a lay-event="'+e+'">'+t+"</a></li>"}),a.find(".layui-table-cell").append(g(n).render({actionItems:i,name:t.name}))}),y.render())},a.prototype.renderToolbar=function(){var e=this,i=e.config,l={create:{title:"新增",layEvent:"create",icon:"fa-plus"},update:{title:"更新",layEvent:"update",icon:"fa-edit"},delete:{title:"删除",layEvent:"delete",icon:"fa-trash"}},n=['<div class="layui-inline tool px-3 py-1 mr-2" lay-event="LAYTABLE_REFRESH"><i class="fa fa-refresh"></i></div>'],t=e.layTool.find(".layui-table-tool-temp");if("default"===i.toolbar)layui.each(l,function(e,t){n.push('<div class="layui-inline tool px-3 py-1" title="'+t.title+'" lay-event="'+t.layEvent+'"><i class="fa '+t.icon+'"></i></div>')}),t.html(n.join(""));else if("object"===_typeof(i.toolbar))layui.each(i.toolbar,function(e,t){var a=l[t];a&&n.push('<div class="layui-inline tool px-3 py-1" title="'+a.title+'" lay-event="'+a.layEvent+'"><i class="fa '+a.icon+'"></i></div>')}),t.html(n.join(""));else if("string"==typeof i.toolbar){var a=v(i.toolbar).html()||"";a&&t.html(g(a).render(i))}if(i.action){var o="",r=['<div class="layui-inline tool ml-2 px-3 py-1" data-toggle="dropdown"><div class="layui-btn-dropdown">','<i class="fa fa-ellipsis-v px-2"></i>','<ul class="layui-dropdown-menu">{{ d.actionItems }}</ul>',"</div></div></div>"].join("");v.each(i.action,function(e,t){o+='<li><a lay-event="'+t.event+'">'+t.text+"</a></li>"}),t.append(g(r).render({actionItems:o})),y.render()}var d={filter:{title:"筛选列",layEvent:"LAYTABLE_COLS",icon:"fa-list-ul"},exports:{title:"导出",layEvent:"LAYTABLE_EXPORT",icon:"fa-download"}},c=[];if("object"===_typeof(i.defaultToolbar)&&layui.each(i.defaultToolbar,function(e,t){var a=d[t];a&&("exports"!==t||i.export.can)&&c.push('<div class="layui-inline tool px-3 py-1" title="'+a.title+'" lay-event="'+a.layEvent+'"><i class="fa '+a.icon+'"></i></div>')}),e.layTool.find(".layui-table-tool-self").html(c.join("")),i.canSearch){var s='<div class="layui-table-tool-search"><form class="layui-form"><input type="text" name="wd" value="'+(i.where.search||"")+'"><button lay-submit lay-filter="*" data-table="'+i.id+'" class="fa fa-search"></button></form></div>';if(e.layTool.prepend(s),e.layTool.find(".layui-table-tool-temp").css("marginLeft","265px"),i.where.search){var u=e.layTool.find(".layui-table-tool-search input[name=wd]"),h=u.val();u.val("").focus().val(h),e.layTool.find("form").append('<button class="j_cancel fa fa-close mr-6" lay-submit lay-filter="*" data-table="'+i.id+'" data-type="cancel"></button>')}else e.layTool.find("form .j_cancel").remove()}},a.prototype.setParentCol=function(e,t){var a=this.config,i=this.layHeader.find('th[data-key="'+a.index+"-"+t+'"]'),l=parseInt(i.attr("colspan"))||0;if(i[0]){var n=t.split("-"),o=a.cols[n[0]][n[1]];e?l--:l++,i.attr("colspan",l),i[l<1?"addClass":"removeClass"](T),o.colspan=l,o.hide=l<1;var r=i.data("parentkey");r&&this.setParentCol(e,r)}},a.prototype.setColsPatch=function(){var a=this,e=a.config;layui.each(e.cols,function(e,t){layui.each(t,function(e,t){t.hide&&a.setParentCol(t.hide,t.parentKey)})})},a.prototype.setColsWidth=function(){var i=this,o=i.config,a=0,r=0,d=0,c=0,s=i.setInit("width");i.eachCols(function(e,t){t.hide||a++}),s=s-("line"===o.skin||"nob"===o.skin?2:a+1)-i.getScrollWidth(i.layMain[0])-1;function e(n){layui.each(o.cols,function(e,l){layui.each(l,function(e,t){var a=0,i=t.minWidth||o.cellMinWidth;t?t.colGroup||t.hide||(n?d&&d<i&&(r--,a=i):(a=t.width||0,/\d+%$/.test(a)?(a=Math.floor(parseFloat(a)/100*s))<i&&(a=i):a||(t.width=a=0,r++)),t.hide&&(a=0),c+=a):l.splice(e,1)})}),c<s&&r&&(d=(s-c)/r)}e(),e(!0),i.autoColNums=r,i.eachCols(function(e,t){var a=t.minWidth||o.cellMinWidth;t.colGroup||t.hide||(0===t.width?i.getCssRule(o.index+"-"+t.key,function(e){e.style.width=Math.floor(a<=d?d:a)+"px"}):/\d+%$/.test(t.width)&&i.getCssRule(o.index+"-"+t.key,function(e){e.style.width=Math.floor(parseFloat(t.width)/100*s)+"px"}))});var l=i.layMain.width()-i.getScrollWidth(i.layMain[0])-i.layMain.children("table").outerWidth();if(i.autoColNums&&-a<=l&&l<=a){var n=function e(t){return!(t=t||i.layHeader.eq(0).find("thead th:last-child")).data("field")&&t.prev()[0]?e(t.prev()):t}(),t=n.data("key");i.getCssRule(t,function(e){var t=e.style.width||n.outerWidth();e.style.width=parseFloat(t)+l+"px",0<i.layMain.height()-i.layMain.prop("clientHeight")&&(e.style.width=parseFloat(e.style.width)-1+"px")})}i.loading(!0)},a.prototype.resize=function(){this.fullSize(),this.setColsWidth(),this.scrollPatch()},a.prototype.reload=function(e){var t=this;t.config.data&&t.config.data.constructor===Array&&delete t.config.data,t.config=v.extend({},t.config,e),t.render()},a.prototype.page=1,a.prototype.pullData=function(t){var a=this,i=a.config,e=i.request,l=i.response;if(a.startTime=(new Date).getTime(),i.url){var n={};n[e.pageName]=t,n[e.limitName]=i.limit;var o=v.extend(n,i.where);i.contentType&&0==i.contentType.indexOf("application/json")&&(o=JSON.stringify(o)),m.request.ajax({type:i.method||"get",url:i.url,contentType:i.contentType,data:o,dataType:"json",headers:i.headers||{},success:function(e){"function"==typeof i.parseData&&(e=i.parseData(e)||e),e[l.statusName]!=l.statusCode?(a.renderForm(),a.layMain.html('<div class="'+c+'">'+(e[l.msgName]||"返回的数据不符合规范，正确的成功状态码 ("+l.statusName+") 应为："+l.statusCode)+"</div>")):(a.renderData(e,t,e.meta?e.meta[l.countName]:e.data.length),i.time=(new Date).getTime()-a.startTime+" ms"),a.setColsWidth(),a.renderDone(e,t,e[l.countName])},error:function(e,t){a.layMain.html('<div class="'+c+'">数据接口请求异常：'+t+"</div>"),a.renderForm(),a.setColsWidth()}})}else if(i.data&&i.data.constructor===Array){var r={},d=t*i.limit-i.limit;r[l.dataName]=i.data.concat().splice(d,i.limit),r[l.countName]=i.data.length,a.renderData(r,t,i.data.length),a.setColsWidth(),a.renderDone(r,t,r[l.countName])}},a.prototype.renderDone=function(e,t,a){var i=this.config;if(i.where.orderBy){var l=this.layHeader.find("[data-field="+i.where.orderBy+"]").find(".layui-table-sort");0<l.length&&l.attr("lay-sort",i.where.sortedBy)}"function"==typeof i.done&&i.done(e,t,a)},a.prototype.eachCols=function(e){return w.eachCols(null,e,this.config.cols),this},a.prototype.renderData=function(e,t,a,i){var y,l=this,p=l.config,n=e[p.response.dataName]||[],o=[],r=[],m=[];if(l.key=p.id||p.index,w.cache[l.key]=n,l.layPage[0==a||0===n.length&&1==t?"addClass":"removeClass"](T),0===n.length)return l.renderForm(),l.layFixed.remove(),l.layMain.find("tbody").html(""),l.layMain.find("."+c).remove(),l.layMain.append('<div class="'+c+'">'+p.text.none+"</div>");layui.each(n,function(d,c){var s=[],u=[],h=[],f=d+p.limit*(t-1)+1;0!==c.length&&(l.eachCols(function(e,a){var t=a.field||e,i=p.index+"-"+a.key,l=c[t];if(null==l&&(l=""),!a.colGroup){var n,o,r=['<td data-field="'+t+'" data-key="'+i+'" '+(o=[],a.edit&&o.push('data-edit="'+a.edit+'"'),a.align&&o.push('align="'+a.align+'"'),a.templet&&o.push('data-content="'+l+'"'),a.toolbar&&o.push('data-off="true"'),a.event&&o.push('lay-event="'+a.event+'"'),a.style&&o.push('style="'+a.style+'"'),a.minWidth&&o.push('data-minwidth="'+a.minWidth+'"'),a.downoff&&o.push('data-downoff="true"'),o.join(" "))+' class="'+(n=[],a.hide&&n.push(T),a.field||n.push("layui-table-col-special"),n.join(" "))+'"><div '+(p.lineHeight?'style="height: '+p.lineHeight+"px;line-height: "+p.lineHeight+'px;"':"")+' class="layui-table-cell laytable-cell-'+("normal"===a.type?i:i+" laytable-cell-"+a.type)+'">'+function(){var e=v.extend(!0,{LAY_INDEX:f},c),t=w.config.checkName;switch(a.type){case"checkbox":return'<input type="checkbox" name="layTableCheckbox" data-id="'+e.id+'" lay-skin="primary" '+(a[t]?(c[t]=a[t],a[t]?"checked":""):e[t]?"checked":"")+">";case"radio":return e[t]&&(y=d),'<input type="radio" name="layTableRadio_'+p.index+'" '+(e[t]?"checked":"")+' lay-type="layTableRadio">';case"numbers":return f}return a.toolbar?g(v(a.toolbar).html()||"").render(e):a.templet?"function"==typeof a.templet?a.templet(e):g(v(a.templet).html()||String(l)).render(e):l}(),"</div></td>"].join("");s.push(r),a.fixed&&"right"!==a.fixed&&u.push(r),"right"===a.fixed&&h.push(r)}}),o.push('<tr data-index="'+d+'">'+s.join("")+"</tr>"),r.push('<tr data-index="'+d+'">'+u.join("")+"</tr>"),m.push('<tr data-index="'+d+'">'+h.join("")+"</tr>"))}),l.layBody.scrollTop(0),l.layMain.find("."+c).remove(),l.layMain.find("tbody").html(o.join("")),l.layFixLeft.find("tbody").html(r.join("")),l.layFixRight.find("tbody").html(m.join("")),l.renderForm(),"number"==typeof y&&l.setThisRowChecked(y),l.syncCheckAll(),l.haveInit?l.scrollPatch():setTimeout(function(){l.scrollPatch()},50),l.haveInit=!0,h.close(l.tipsIndex),p.HAS_SET_COLS_PATCH||l.setColsPatch(),p.HAS_SET_COLS_PATCH=!0,l.renderTotal(n),p.page&&(p.page=v.extend({elem:"layui-table-page"+p.index,count:a,limit:p.limit,limits:p.limits||[15,50,200,500],groups:3,layout:["prev","page","next","skip","count","limit"],prev:'<i class="fa fa-angle-left"></i>',next:'<i class="fa fa-angle-right"></i>',jump:function(e,t){t||(l.page=e.curr,p.limit=e.limit,l.pullData(e.curr))}},p.page),p.page.count=a,d.render(p.page))},a.prototype.renderTotal=function(e){var t=this,d=t.config,c={};if(d.totalRow){layui.each(e,function(e,l){0!==l.length&&t.eachCols(function(e,t){var a=t.field||e,i=l[a];t.totalRow&&(c[a]=(c[a]||0)+(parseFloat(i)||0))})});var s=[];t.eachCols(function(e,t){var a,i,l,n,o=t.field||e,r=['<td data-field="'+o+'" data-key="'+d.index+"-"+t.key+'" '+(n=[],t.align&&n.push('align="'+t.align+'"'),t.style&&n.push('style="'+t.style+'"'),t.minWidth&&n.push('data-minwidth="'+t.minWidth+'"'),n.join(" "))+' class="'+(l=[],t.hide&&l.push(T),t.field||l.push("layui-table-col-special"),l.join(" "))+'">','<div class="layui-table-cell laytable-cell-'+(i=d.index+"-"+t.key,"normal"===t.type?i:i+" laytable-cell-"+t.type)+'">'+(a=t.totalRowText||"",t.totalRow&&parseFloat(c[o]).toFixed(2)||a),"</div></td>"].join("");s.push(r)}),t.layTotal.find("tbody").html("<tr>"+s.join("")+"</tr>")}},a.prototype.getColElem=function(e,t){var a=this.config;return e.eq(0).find(".laytable-cell-"+a.index+"-"+t+":eq(0)")},a.prototype.renderForm=function(e){f.render(e,"LAY-table-"+this.index)},a.prototype.setThisRowChecked=function(e){this.config;var t="layui-table-click";this.layBody.find('tr[data-index="'+e+'"]').addClass(t).siblings("tr").removeClass(t)},a.prototype.sort=function(l,e,t,a){var i,n=this,o={},r=n.config,d=r.elem.attr("lay-filter"),c=w.cache[n.key];"string"==typeof l&&n.layHeader.find("th").each(function(e,t){var a=v(this),i=a.data("field");if(i===l)return l=a,s=i,!1});try{var s=s||l.data("field"),u=l.data("key");if(n.sortKey&&!t&&s===n.sortKey.field&&e===n.sortKey.sort)return;var h=n.layHeader.find("th .laytable-cell-"+u).find(A);n.layHeader.find("th").find(A).removeAttr("lay-sort"),h.attr("lay-sort",e||null),n.layFixed.find("th")}catch(e){return p.error("Table modules: Did not match to field")}if(n.sortKey={field:s,sort:e},!r.autoSort)return r=v.extend(r,{where:{orderBy:s,sortedBy:e}}),n.reload(r),!1;"asc"===e?i=layui.sort(c,s):"desc"===e?i=layui.sort(c,s,!0):(i=layui.sort(c,w.config.indexName),delete n.sortKey),o[r.response.dataName]=i||c,n.renderData(o,n.page,n.count,!0),a&&layui.event.call(l,C,"sort("+d+")",{field:s,type:e})},a.prototype.loading=function(e){var t=this;t.config.loading&&(e?(t.layInit&&t.layInit.remove(),delete t.layInit,t.layBox.find(".layui-table-init").remove()):(t.layInit=v(['<div class="layui-table-init">','<i class="fa fa-spinner fa-spin"></i>',"</div>"].join("")),t.layBox.append(t.layInit)))},a.prototype.setCheckData=function(e,t){var a=this.config,i=w.cache[this.key];i[e]&&i[e].constructor!==Array&&(i[e][a.checkName]=t)},a.prototype.syncCheckAll=function(){function e(a){return t.eachCols(function(e,t){"checkbox"===t.type&&(t[i.checkName]=a)}),a}var t=this,i=t.config,a=t.layHeader.find('input[name="layTableCheckbox"]');a[0]&&(w.checkStatus(t.key).isAll?(a[0].checked||(a.prop("checked",!0),t.renderForm("checkbox")),e(!0)):(a[0].checked&&(a.prop("checked",!1),t.renderForm("checkbox")),e(!1)))},a.prototype.getCssRule=function(a,i){var e=this.elem.find("style")[0],t=e.sheet||e.styleSheet||{},l=t.cssRules||t.rules;layui.each(l,function(e,t){if(t.selectorText===".laytable-cell-"+a)return i(t),!0})},a.prototype.fullSize=function(){var e,t=this,a=t.config,i=a.height;t.fullHeightGap&&((i=_.height()-t.fullHeightGap)<135&&(i=135),t.elem.css("height",i)),i&&(e=parseFloat(i)-(t.layHeader.outerHeight()||38),a.toolbar&&(e-=t.layTool.outerHeight()||50),a.totalRow&&(e-=t.layTotal.outerHeight()||40),a.page&&(e=e-(t.layPage.outerHeight()||41)-2),t.layMain.css("height",e))},a.prototype.getScrollWidth=function(e){var t=0;return e?t=e.offsetWidth-e.clientWidth:((e=document.createElement("div")).style.width="100px",e.style.height="100px",e.style.overflowY="scroll",document.body.appendChild(e),t=e.offsetWidth-e.clientWidth,document.body.removeChild(e)),t},a.prototype.scrollPatch=function(){function e(e){if(i&&l){if(!(e=e.eq(0)).find(".layui-table-patch")[0]){var t=v('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>');t.find("div").css({width:i}),e.find("tr").append(t)}}else e.find(".layui-table-patch").remove()}var t=this,a=t.layMain.children("table"),i=t.layMain.width()-t.layMain.prop("clientWidth"),l=t.layMain.height()-t.layMain.prop("clientHeight"),n=(t.getScrollWidth(t.layMain[0]),a.outerWidth()-t.layMain.width());e(t.layHeader),e(t.layTotal);var o=t.layMain.height()-l;t.layFixed.find(S).css("height",a.height()>=o?o:"auto"),t.layFixRight[0<n?"removeClass":"addClass"](T),t.layFixRight.css("right",i-1)},a.prototype.events=function(){var n,r=this,d=r.config,l=v("body"),o={},e=r.layHeader.find("th"),c=".layui-table-cell",s=d.elem.attr("lay-filter");r.layTool.on("click","*[lay-event]",function(e){function t(e){var t=v(e.list),a=v('<ul class="layui-table-tool-panel"></ul>');a.html(t),d.height&&a.css("max-height",d.height-(r.layTool.outerHeight()||50)),l.find(".layui-table-tool-panel")[0]||l.append(a),r.renderForm(),a.on("click",function(e){layui.stope(e)}),e.done&&e.done(a,t)}var a,i,l=v(this),n=l.attr("lay-event");switch(layui.stope(e),E.trigger("table.tool.panel.remove"),h.close(r.tipsIndex),n){case"LAYTABLE_COLS":t({list:(i=[],r.eachCols(function(e,t){t.field&&"normal"==t.type&&i.push('<li><input type="checkbox" name="'+t.field+'" data-key="'+t.key+'" data-parentkey="'+(t.parentKey||"")+'" lay-skin="primary" '+(t.hide?"":"checked")+' title="'+(t.title||t.field)+'" lay-filter="LAY_TABLE_TOOL_COLS"></li>')}),i.join("")),done:function(){f.on("checkbox(LAY_TABLE_TOOL_COLS)",function(e){var t=v(e.elem),l=this.checked,n=t.data("key"),o=t.data("parentkey");layui.each(d.cols,function(i,e){layui.each(e,function(e,t){if(i+"-"+e===n){var a=t.hide;t.hide=!l,r.elem.find('*[data-key="'+d.index+"-"+n+'"]')[l?"removeClass":"addClass"](T),a!=t.hide&&r.setParentCol(!l,o),r.resize()}})})})}});break;case"LAYTABLE_EXPORT":t({list:(a=[],d.export.can&&a.push('<li data-type="checked">导出选中</li>'),d.export.all&&a.push('<li data-type="all">导出全部</li>'),a.join("")),done:function(e,t){var l=!1;t.on("click",function(){var e=v(this).data("type"),a=v(this),t=void 0;if(!0===l)return!1;if("checked"===e){var i=w.checkStatus(d.id);if(i.data.length<1)return h.msg("请选择需要下载的数据"),!1;t=i.data.map(function(e){return e.id}).join(",")}else"all"===e&&(t="all");l=!0,a.append('<i class="fa fa-spinner fa-spin ml-1"></i>'),m.request.ajax({url:d.export.url,type:"post",data:{ids:t},cache:!1,success:function(e){var t=document.createElement("a");t.href=e.data.file,t.download=e.data.name,parent.document.body.appendChild(t),t.click(),parent.document.body.removeChild(t),l=!1,a.find("i").remove()}})})}});break;case"LAYTABLE_REFRESH":d.hasRefresh?r.reload(d):location.reload();break;case"clearFilter":var o=l.data("name");delete x[o],delete k[o],l.parents(".filterbox ").remove(),r.reload(v.extend(d,{where:x}))}layui.event.call(this,C,"toolbar("+s+")",v.extend({event:n,config:d},{}))}),e.on("mousemove",function(e){var t=v(this),a=t.offset().left,i=e.clientX-a;t.data("unresize")||o.resizeStart||(o.allowResize=t.width()-i<=10,l.css("cursor",o.allowResize?"col-resize":""))}).on("mouseleave",function(){v(this);o.resizeStart||l.css("cursor","")}).on("mousedown",function(e){var a=v(this);if(o.allowResize){var t=a.data("key");e.preventDefault(),o.resizeStart=!0,o.offset=[e.clientX,e.clientY],r.getCssRule(t,function(e){var t=e.style.width||a.outerWidth();o.rule=e,o.ruleWidth=parseFloat(t),o.minWidth=a.data("minwidth")||d.cellMinWidth})}}),E.on("mousemove",function(e){if(o.resizeStart){if(e.preventDefault(),o.rule){var t=o.ruleWidth+e.clientX-o.offset[0];t<o.minWidth&&(t=o.minWidth),o.rule.style.width=t+"px",h.close(r.tipsIndex)}n=1}}).on("mouseup",function(e){o.resizeStart&&(o={},l.css("cursor",""),r.scrollPatch()),2===n&&(n=null)}),e.on("click",function(e){var t,a=v(this),i=a.find(A),l=i.attr("lay-sort");if(!i[0]||1===n)return n=2;t="asc"===l?"desc":"desc"===l?null:"asc",r.sort(a,t,null,!0)}).find(A+" .layui-edge ").on("click",function(e){var t=v(this),a=t.index(),i=t.parents("th").eq(0).data("field");layui.stope(e),0===a?r.sort(i,"asc",null,!0):r.sort(i,"desc",null,!0)});function u(e){var t=v(this).parents("tr").eq(0).data("index"),l=r.layBody.find('tr[data-index="'+t+'"]'),n=w.cache[r.key][t];return v.extend({tr:l,data:w.clearCacheKey(n),del:function(){w.cache[r.key][t]=[],l.remove(),r.scrollPatch()},update:function(e){e=e||{},layui.each(e,function(a,e){if(a in n){var i,t=l.children('td[data-field="'+a+'"]');n[a]=e,r.eachCols(function(e,t){t.field==a&&t.templet&&(i=t.templet)}),t.children(c).html(i?"function"==typeof i?i(n):g(v(i).html()||e).render(n):e),t.data("content",e)}})}},e)}r.elem.on("click",'input[name="layTableCheckbox"]+',function(){var e=v(this).prev(),t=r.layBody.find('input[name="layTableCheckbox"]'),a=e.parents("tr").eq(0).data("index"),i=e[0].checked,l="layTableAllChoose"===e.attr("lay-filter");l?(t.each(function(e,t){t.checked=i,r.setCheckData(e,i)}),r.syncCheckAll(),r.renderForm("checkbox")):(r.setCheckData(a,i),r.syncCheckAll()),layui.event.call(e[0],C,"checkbox("+s+")",u.call(e[0],{checked:i,type:l?"all":"one"}))}),r.elem.on("click",'input[lay-type="layTableRadio"]+',function(){var e=v(this).prev(),t=e[0].checked,a=w.cache[r.key],i=e.parents("tr").eq(0).data("index");layui.each(a,function(e,t){i===e?t.LAY_CHECKED=!0:delete t.LAY_CHECKED}),r.setThisRowChecked(i),layui.event.call(this,C,"radio("+s+")",u.call(this,{checked:t}))}),r.layBody.on("mouseenter","tr",function(){var e=v(this).index();r.layBody.find("tr:eq("+e+")").addClass(W)}).on("mouseleave","tr",function(){var e=v(this).index();r.layBody.find("tr:eq("+e+")").removeClass(W)}).on("click",".layui-table-fixed-r tr",function(){t.call(this,"row")}).on("dblclick","tr",function(){t.call(this,"rowDouble")});var t=function(e){var t=v(this);layui.event.call(this,C,e+"("+s+")",u.call(t.children("td")[0]))};r.layBody.on("change","."+L,function(){var e=v(this),t=this.value,a=e.parent().data("field"),i=e.parents("tr").eq(0).data("index");w.cache[r.key][i][a]=t,layui.event.call(this,C,"edit("+s+")",u.call(this,{value:t,field:a}))}).on("blur","."+L,function(){var a,e,t=v(this),i=t.parent().data("field"),l=t.parents("tr").eq(0).data("index"),n=w.cache[r.key][l];r.eachCols(function(e,t){t.field==i&&t.templet&&(a=t.templet)}),t.siblings(c).html((e=this.value,a?function(){return"function"==typeof a?a(n):g(v(a).html()||this.value).render(n)}():e)),t.parent().data("content",this.value),t.remove()}),r.layBody.on("click","td",function(e){var t=v(this),a=(t.data("field"),t.data("edit")),i=t.children(c);if(!t.data("off")&&a){var l=v('<input class="layui-input '+L+'">');return l[0].value=t.data("content")||i.text(),t.find("."+L)[0]||t.append(l),l.focus(),void layui.stope(e)}}).on("mouseenter","td",function(){a.call(this)}).on("mouseleave","td",function(){a.call(this,"hide")});var i="layui-table-grid-down",a=function(e){var t=v(this),a=t.children(c);if(e)t.find(".layui-table-grid-down").remove();else if(!t.data("downoff")&&a.prop("scrollWidth")>a.outerWidth()){if(a.find("."+i)[0])return;t.append('<div class="'+i+'"><i class="fa fa-down"></i></div>')}};r.layBody.on("click","."+i,function(e){var t=v(this).parent().children(c);r.tipsIndex=h.tips(['<div class="layui-table-tips-main" style="margin-top: -'+(t.height()+16)+"px;"+("sm"===d.size?"padding: 4px 15px; font-size: 12px;":"lg"===d.size?"padding: 14px 15px;":"")+'">',t.html(),"</div>",'<i class="fa layui-table-tips-c fa-close"></i>'].join(""),t[0],{tips:[3,""],time:-1,anim:-1,maxWidth:b.ios||b.android?300:r.elem.width()/2,isOutAnim:!1,skin:"layui-table-tips",success:function(e,t){e.find(".layui-table-tips-c").on("click",function(){h.close(t)})}}),layui.stope(e)}),r.layBody.on("click","*[lay-event]",function(){var e=v(this),t=e.attr("lay-event"),a=e.parents("tr").eq(0).data("index"),i=u.call(this,{event:t});d.autoShow&&"show"==t?v.ajax({type:"get",url:d.autoShow.replace("_id_",i.data.id),success:function(e){m.openModal(e,"详情#"+i.data.id,{shadeClose:!0,area:b.mobile?d.autoShowWidthMobile:d.autoShowWidth})},error:function(){h.msg("网络错误，请刷新重试!")}}):layui.event.call(this,C,"tool("+s+")",i),r.setThisRowChecked(a)}),r.layMain.on("scroll",function(){var e=v(this),t=e.scrollLeft(),a=e.scrollTop();r.layHeader.scrollLeft(t),r.layTotal.scrollLeft(t),r.layFixed.find(S).scrollTop(a),h.close(r.tipsIndex)}),E.on("click",function(){E.trigger("table.remove.tool.panel")}),E.on("table.remove.tool.panel",function(){v(".layui-table-tool-panel").remove()}),_.on("resize",function(){r.resize()}),d.canSearch&&f.on("submit(*)",function(e){var t=e.field.wd,a=v(e.elem).attr("data-type"),i=v(e.elem).attr("data-table");return"cancel"==a?w.reload(i,{where:v.extend(d.where,{search:""}),page:{curr:1}}):H!=t||0<t.length?(H=t,w.reload(i,{where:v.extend(d.where,{search:e.field.wd,searchFields:d.searchFields}),page:{curr:1}})):h.msg("请输入关键字"),!1}),d.filters&&r.layHeader.on("click","*[lay-event]",function(){var e=v(this),t=e.parents("ul").data("name"),a=e.parents(".layui-table-cell").find("span").text(),i=e.attr("lay-event"),l={},n={};l[t]=i,n[t]={label:a,val:e.text()},x=v.extend(x,l),k=v.extend(k,n),d=v.extend(d,{where:x}),r.reload(d)})},w.init=function(a,i){i=i||{};var e=v(a?'table[lay-filter="'+a+'"]':".layui-table[lay-data]"),r="Table element property lay-data configuration item has a syntax error: ";return e.each(function(){var e=v(this),t=e.attr("lay-data");try{t=new Function("return "+t)()}catch(e){p.error(r+t)}var n=[],o=v.extend({elem:this,cols:[],data:[],id:a,hasRefresh:!1,skin:e.attr("lay-skin"),size:e.attr("lay-size"),even:"string"==typeof e.attr("lay-even")},w.config,i,t);a&&e.hide(),e.find("thead>tr").each(function(l){o.cols[l]=[],v(this).children().each(function(e){var t=v(this),a=t.attr("lay-data");try{a=new Function("return "+a)()}catch(e){return p.error(r+a)}var i=v.extend({title:t.text(),colspan:t.attr("colspan")||0,rowspan:t.attr("rowspan")||0},a);i.colspan<2&&n.push(i),o.cols[l].push(i)})}),e.find("tbody>tr").each(function(e){var i=v(this),l={};i.children("td").each(function(e,t){var a=v(this),i=a.data("field");if(i)return l[i]=a.html()}),layui.each(n,function(e,t){var a=i.children("td").eq(e);l[t.field]=a.html()}),o.data[e]=l}),w.render(o)}),this},r.that={},r.config={},w.eachCols=function(e,i,l){var t=r.config[e]||{},n=[],o=0;l=v.extend(!0,[],l||t.cols),layui.each(l,function(t,e){layui.each(e,function(e,a){if(a.colGroup){var i=0;o++,a.CHILD_COLS=[],layui.each(l[t+1],function(e,t){t.PARENT_COL_INDEX||1<i&&i==a.colspan||(t.PARENT_COL_INDEX=o,a.CHILD_COLS.push(t),i+=parseInt(1<t.colspan?t.colspan:1))})}a.PARENT_COL_INDEX||n.push(a)})});!function a(e){layui.each(e||n,function(e,t){if(t.CHILD_COLS)return a(t.CHILD_COLS);"function"==typeof i&&i(e,t)})}()},w.checkStatus=function(e){var a=0,i=0,l=[],t=w.cache[e]||[];return layui.each(t,function(e,t){t.constructor!==Array?t[w.config.checkName]&&(a++,l.push(w.clearCacheKey(t))):i++}),{data:l,isAll:!!t.length&&a===t.length-i}},w.setChecked=function(e,t,a){i(e)&&((w.cache[e]||[])[t][options.checkName]=a)},w.resize=function(e){if(e){if(!i(e))return;r.that[e].resize()}else layui.each(r.that,function(){this.resize()})},w.reload=function(e,t){t=t||{};var a=i(e);if(a)return t.data&&t.data.constructor===Array&&delete a.data,w.render(v.extend(!0,{},a,t))},w.render=function(e){var t=new a(e);return r.call(t)},w.clearCacheKey=function(e){return delete(e=v.extend({},e))[w.config.checkName],delete e[w.config.indexName],e},w.init(),e(C,w)});