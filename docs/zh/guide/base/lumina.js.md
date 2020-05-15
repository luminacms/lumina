前端这块要感谢layui提供完善的ui解决方案，lumina.js是基于layui进行深度开发和维护的一个js架构。
具体使用可参见layui官方文档
这里主要提一下不同的地方：
1. 核心文件变更
• lumina.js合并layer.js，所以在使用的时候可全局使用layer，无需再引入
• lumina.js对layui原本结构重新设计，有第三方扩展的时候需要注意
2. gulp工程化集成
// 开发模式会删除旧的lumina.js工程文件，不进行压缩，即时监听文件并拷贝到外部目录下
gulp build_dev
// 发布命令会删除旧的lumina.js工程目录，对所有css,js进行压缩混合处理，如果不想要进行压缩处理，js文件以.min.js结尾，脚本就会跳过该文件
gulp build_dist
3.  集成自主包
 3.1 上传组件
3.2 集成wangEdit
3.3 请求封装
lumina.js封装了jquery ajax请求，结合lumina接口相应统一处理异常及csrf验证和其他laravel需要的请求头
// 请求代码示例
layui.use('admin', function(){
    var request = layui.admin.request
  
  request.ajax(option)
  request.get(url, data, cb)
  request.post(url, data, cb)
})
3.4 tab页面管理
• html代码格式
<a lay-href="XX" lay-text="title" >内容管理</a>
• js触发模式
layui.use('admin', function(){
    var admin = layui.admin
  
  admin.openTabsPage(href, title)
})
3.5 Drawer组件
layui.use('admin', function(){
    var admin = layui.admin
  
  // option具体参数参考layer参数
  admin.openDrawer(content, title, option)
})
你在blade模板中不必担心如何调用，lumina已经封装成组件了，给出js的方式只是为了你能更好的使用lumina：
<x-input name="username" verify="required" />
<x-input.date name="date" verify="required" />
<x-input.rate name="rate" verify="required" />
<x-input.select name="select" :options="\Modules\Core\Models\Role::getTypes()"  value="module"/>
<x-input.radio name="radio" :options="\Modules\Core\Models\Role::getTypes()"  value="module"/>
<x-input.checkbox name="checkbox" :options="\Modules\Core\Models\Role::getTypes()"  value="module"/>
<x-input.imgs name="imgs" verify="required" />
<x-input.file name="file" verify="required" />
<x-input.media name="media" verify="required" />
<x-input.editor name="editor" verify="required" />
<x-input.meditor name="meditor" verify="required" />
