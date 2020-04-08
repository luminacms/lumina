@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('querylist.ql-posts.index')]
       ]" />

    <table class="layui-hide" id="data_qlpost_table" lay-filter="data_qlpost_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_qlpost_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('querylist.ql-posts.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true","fixed":"left",width:120},
                    {"field":"title","title":"title",width:350},
                    {"field":"author","title":"author"},
                    {"field":"post_at","title":"post_at"},
                    {"field":"fields","title":"fields"},
                    {"field":"content","title":"content"},
                    {"field":"created_at","title":"创建时间","fixed":"right"},
                    {"field":"updated_at","title":"更新时间","fixed":"right"}
                    ]]
            });

            //监听行工具事件
            table.on('toolbar(data_qlpost_table)', function(obj){
                var checked = table.checkStatus('data_qlpost_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ route('querylist.ql-posts.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('querylist.ql-posts.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_qlpost_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{route('querylist.ql-posts.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '新增数据')
                        return true;
                    }
                }
            });

        });
    </script>
@endpush