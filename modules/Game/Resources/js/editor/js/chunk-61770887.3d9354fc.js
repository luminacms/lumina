(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61770887"],{"0446":function(t,e,n){},2747:function(t,e,n){"use strict";var o=n("f7ab"),i=n.n(o),a=n("5880");e["a"]={replace:!0,data:function(){return{title:"",size:"small",Visible:!0}},computed:Object(a["mapState"])({Config:function(t){return t.Config},RootNodeInfo:function(t){return t.RootNodeInfo},Metadata:function(t){return t.Metadata},demoMode:function(t){return t.setting.demoMode}}),beforeCreated:function(){},created:function(){this.ema=i.a.getProxy()},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},activated:function(){},deactivated:function(){},beforDestroy:function(){},destroyed:function(){this.ema.dispose()},methods:{bindEvent:function(t,e){this.$options.name||console.warn("绑定事件的组件不存在组件名称",t),this.ema.bind("".concat(this.$options.name,".").concat(t),e)},openDialog:function(t){this.ema.fire("Dialogs.push",t)},close:function(){this.ema.fire("Dialogs.close",this.$options.name)}}}},c254:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:t.title,width:"80%",center:!0,visible:t.Visible,modal:!0},on:{"update:visible":function(e){t.Visible=e},close:t.close}},[n("el-input",{ref:"nameinput",staticClass:"scriptName",staticStyle:{width:"400px","margin-bottom":"16px"},attrs:{size:"mini",placeholder:"请输入内容"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}},[n("template",{slot:"prepend"},[t._v("名称")])],2),n("div",{staticClass:"editScript"},[n("code-editor",{attrs:{ctype:"javascript",ctrls:!0,options:{},contents:t.content},on:{ctrls:t.save,"update:contents":function(e){t.content=e}}})],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){e.stopPropagation(),t.close(e)}}},[t._v("关 闭")]),n("el-button",{on:{click:function(e){e.stopPropagation(),t.saveTemp(t.content)}}},[t._v("保存到脚本库")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){e.stopPropagation(),t.save(t.content)}}},[t._v("确 定")])],1)],1)},i=[],a=n("a34a"),s=n.n(a),c=n("2747"),r=n("fb4e"),u=n("c455");function f(t,e,n,o,i,a,s){try{var c=t[a](s),r=c.value}catch(u){return void n(u)}c.done?e(r):Promise.resolve(r).then(o,i)}function d(t){return function(){var e=this,n=arguments;return new Promise(function(o,i){var a=t.apply(e,n);function s(t){f(a,o,i,s,c,"next",t)}function c(t){f(a,o,i,s,c,"throw",t)}s(void 0)})}}var l={mixins:[c["a"]],name:"d-editScript",components:{CodeEditor:r["a"]},data:function(){return{categoryId:6,runtimeOnly:!1,title:"脚本编辑",content:"",name:""}},computed:{},mounted:function(){var t=this;this.$nextTick(function(){t.$refs["nameinput"].focus()})},methods:{save:function(t){if(this.name)this.$message({type:"success",message:"已保存"}),this.saveContent({content:this.content,name:this.name,runtimeOnly:this.runtimeOnly});else{var e=this;this.$alert("请修改脚本名称").then(function(){e.$refs["nameinput"].focus()})}},saveTemp:function(){var t=d(s.a.mark(function t(e){var n,o=this;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!this.demoMode){t.next=2;break}return t.abrupt("return",this.$alert("您处在 demo 模式下，不能保存数据哦"));case 2:return t.next=4,this.$confirm("确定要将此脚本保存到脚本库中么，保存后可供下次使用（默认只对当前登陆用户可见，可至管理后台修改）。").catch(function(t){return!1});case 4:if(n=t.sent,n){t.next=7;break}return t.abrupt("return");case 7:Object(u["a"])({url:"editor/resources/save",method:"post",needLoading:!1,data:{categoryId:this.categoryId,content:e,name:this.name,visibilitylevel:0}}).then(function(t){if(!t.data.data.id)throw new Error;o.$message({type:"success",message:"脚本保存成功"})}).catch(function(t){console.log(t),o.$message({type:"error",message:"脚本添加失败"})});case 8:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}},p=l,m=(n("d05d"),n("2877")),h=Object(m["a"])(p,o,i,!1,null,"7acc8138",null);e["default"]=h.exports},d05d:function(t,e,n){"use strict";var o=n("0446"),i=n.n(o);i.a}}]);