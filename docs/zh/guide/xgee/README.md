# 快速生成器

```php

安装生成器：
composer require xbhub/laravel-xgee --dev
以下需要按步骤生成
// step1:生成model,migrate,repository,policy
php artisan biu:make-model Post --fillable=string:title,text:content --module=Ticket
// step2:生成数据库，在此步之前可自行修改migrate和model内的fillable字段
php artisan migrate
// step3:生成controller,request,resource
php artisan biu:make-controller Post --module=Ticket
// step4:生成视图['create', 'edit', 'fields', 'index'];
php artisan biu:make-view Post --module=Ticket
以上步骤已经完成了一套curd，下面配置好路由和后台菜单就跑起来了~
// 添加资源路由：
Route::resource('post', 'PostController');
// 配置后台菜单，打开module.json => 添加menus选项
"menus": [
  ...
    {"name": "ticket_post", "icon": "", "label": "内容管理", "route": "ticket.post.index"}
  ...
]

```


接下来，你就可以在菜单中找到刚才配置的路由，点开路由看到下图说明一切顺利~
到此，一套CURD就结束了！lumina有很多内置的字段，请参考：

```html
<script>
    layui.use(['table', 'element'], function(){
    var table = layui.table,
        element = layui.element;
    table.render({
        elem: '#data_post_table', // 表格渲染div
        url: '{{ URL::full() }}', // 列表接口
        autoShow: '{{ route("ticket.post.show", ":id") }}', // 自动详情接口，不配置则关闭
        where: {'orderBy': 'created_at', 'sortedBy': 'desc'}, // 初始化查询接口参数
        page: true, // 分页
        canSearch: true, // 字段搜索
        toolbar: 'default', // 工具栏
        height: 'full-110', // 默认表格高度自适应全屏
        action: [{'text': '推送到微信', 'event': 'pushWx'}], // 自定义行事件
        export: {url: '{{ URL::full() }}', can: true, all: true}, // 数据导出权限及接口配置
        cols: [[
            {"type":"checkbox","fixed":"left"},
            {"field":"id","title":"id","sort":"true"},
            {"field":"title","title":"title"},
            {"field":"content","title":"content"},
            {"field":"create_by","title":"create_by"},
            {"field":"created_at","title":"created_at","hide":"true"},
            {"field":"updated_at","title":"updated_at"}]]
    });
    //监听行工具事件
    table.on('toolbar(data_post_table)', function(obj){
        var checked = table.checkStatus('data_post_table');
        if(obj.event == 'create') {
            parent.layui.admin.openTabsPage('{{ route('ticket.post.create') }}', '新增数据')
            return true;
        }
        if(_.indexOf(['delete', 'update'], obj.event) > -1 && checked.data.length >0 ) {
            if(checked.data.length !== 1) {
                layer.msg('请选择一条数据!');
                return false;
            }
            if(obj.event === 'delete') {
                layer.confirm('真的删除行么', function(index){
                    parent.layui.admin.request.post('{{ route('ticket.post.destroy', ['id'=>':id']) }}'.replace(':id', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                        layer.msg('删除成功');
                        table.reload('data_post_table')
                    })
                    layer.close(index);
                });
            }else if(obj.event === 'update') {
                parent.layui.admin.openTabsPage('{{route('ticket.post.edit', ['id'=>':id'])}}'.replace(':id', checked.data[0].id), '修改数据#'+checked.data[0].id)
                return true;
            }
        }
    });
});
</script>
```


表格扩展功能
autoShow
系统会默认开启autoShow，当然，你也可以关闭。

```js
table.render({
    ...
    autoShow: '{{ route("ticket.post.show", ":id") }}',
    ...
});
autoShow开启后，表格固定最后一栏会出现一个小眼睛，可查看当前行数据的详情；
autoShow使用了lumina封装的toTable方法，toTable方法也支持关联查询显示：
$user = $this->repository->with('address')->find($id);
$user = $this->repository->with([
  'organizations:name,oid',
  'departments:name,level',
  'address:user_id,province,city,address,contact_name,contact_phone'
])->find($id);
自定义事件
table.render({
    ...
    action: [{'text': '推送到微信', 'event': 'pushWx'}],
    ...
});
添加自定义事件后可监听table的toolbar子事件，做出相应的操作反馈
下载
table.render({
    ...
    export: {url: '{{ 下载对应路由 }}', can: true, all: true},
    ...
});

```

这里开放了下载选中和下载全部的权限控制，你可以通过policy控制具体权限。
下载的后端代码需要自己写，但你也不必担心，lumina已为你提供了toAjaxExport方法，使用事例如下：
return $this->toAjaxExport(new PostExport());
PostExport就是Maatwebsite创建的可下载的数据表格文本对象，具体请查看Maatwebsite/Laravel-Excel文档
【链接】
