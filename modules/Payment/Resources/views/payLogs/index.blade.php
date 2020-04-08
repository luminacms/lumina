@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('payment.logs.index')]
       ]" />

    <table class="layui-hide" id="data_paylog_table" lay-filter="data_paylog_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_paylog_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('payment.logs.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: [],
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true","fixed":"left"},
                    {"field":"driver","title":"driver"},
                    {"field":"request_id","title":"request_id"},
                    {"field":"gateway","title":"gateway"},
                    {"field":"endpoint","title":"endpoint"},
                    {"field":"type","title":"type"},
                    {"field":"create_ip","title":"create_ip"},
                    {"field":"created_at","title":"创建时间","fixed":"right"},
                    {"field":"updated_at","title":"更新时间","fixed":"right"}
                    ]]
            });

            //监听行工具事件
            table.on('toolbar(data_paylog_table)', function(obj){
                var checked = table.checkStatus('data_paylog_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ url("/payLogs/create") }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ url("/payLogs/_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_paylog_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{ url("/payLogs/_id_/edit") }}'.replace('_id_', checked.data[0].id), '新增数据')
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
