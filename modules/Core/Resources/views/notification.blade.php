@extends('core::layouts.master')

@section('content')
    <div class="layui-card">
        <div class="layui-tab layui-tab-brief" lay-filter="tab_notify">
            <ul class="layui-tab-title">
                <li class="layui-this">未读消息</li>
                <li>全部消息</li>
            </ul>
            <div class="layui-tab-content">

                <div class="layui-tab-item layui-show">
                    <table id="notice_table" lay-filter="notice_table"></table>
                </div>
            </div>
        </div>
    </div>

@endsection

@push('script')
    <script type="text/html" id="tpl_data">
        @{{# var $_level = {'info': 'text-blue-600', 'success': 'text-green-600', 'danger': 'text-red-600', 'warning': 'text-yellow-600'} }}
        <div><i class="fa fa-info-circle text-xl @{{ $_level[d.data.level] }}"></i><span>【@{{ d.data.module }}】@{{ d.data.content }}</span></div>
    </script>
    <script>
        layui.use(['table', 'element', 'admin'], function(){
            var admin = layui.admin,
                element = layui.element,
                TYPE = 'unread',
                currentUrl = '{{ URL::full() }}',
                table = layui.table;

            table.render({
                elem: "#notice_table",
                url: currentUrl,
                where: {'type': TYPE},
                page: true,
                action: [{'event': 'markread', 'text': '标记已读'}],
                toolbar: ['delete'],
                cols: [[
                    {type: "checkbox", fixed: "left"},
                    {field: 'data', title: '内容', templet: '#tpl_data', width: 800},
                    {field: 'read_at', 'title': '阅读时间', width: 150},
                    {field: 'created_at', 'title': '创建时间', width: 150},
                ]],
                skin: "line"
            });
            table.on('toolbar(notice_table)', function(obj) {
                var checked = table.checkStatus('notice_table');

                if(checked.data.length < 1) {
                    layer.msg('请选择操作的数据!');
                    return false;
                }

                var ids = checked.data.map(function (item) {
                    return item.id;
                });
                if(obj.event == "markread") {
                    admin.request.post('/interface/core/notification/markread', {'ids': ids}, function(res) {
                        layer.msg('操作成功');
                        table.reload("notice_table", {
                            url: currentUrl,
                            where: {'type': TYPE},
                            page: {curr: 1}
                        })
                    })
                }else if(obj.event == 'delete') {
                    admin.request.post('/interface/core/notification/delete', {'ids': ids}, function(res) {
                        layer.msg('操作成功');
                        table.reload("notice_table", {
                            url: currentUrl,
                            where: {'type': TYPE},
                            page: {curr: 1}
                        })
                    })
                }
            })

            element.on('tab(tab_notify)', function(data){
                TYPE = data.index == 1?'all':'unread'
                table.reload("notice_table", {
                    url: currentUrl,
                    where: {'type': TYPE},
                    page: {curr: 1}
                })
            });
        })
    </script>
@endpush
