@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('querylist.ql-rules.index')]
       ]" />

    <table class="layui-hide" id="data_qlrule_table" lay-filter="data_qlrule_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element','admin'], function(){
            var table = layui.table,
                admin = layui.admin,
                admin = layui.admin,
                element = layui.element;

            table.render({
                elem: '#data_qlrule_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('querylist.ql-rules.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                action: [{'text': '开始采集', 'event': 'startQuery'}],
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                cols: [
                    [{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true","fixed":"left"},{"field":"type","title":"type"},{"field":"title","title":"title"},{"field":"url","title":"url"},{"field":"rules","title":"rules"},{"field":"created_at","title":"创建时间","fixed":"right"},{"field":"updated_at","title":"更新时间","fixed":"right"}]]
            });

            //监听行工具事件
            table.on('toolbar(data_qlrule_table)', function(obj){
                var checked = table.checkStatus('data_qlrule_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ route('querylist.ql-rules.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            admin.request.post('{{ route('querylist.ql-rules.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_qlrule_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{route('querylist.ql-rules.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '修改数据')
                        return true;
                    }
                }

                if(obj.event == 'startQuery') {
                    var $_queryUrl = '{{route('querylist.query', '_id_')}}'.replace('_id_', checked.data[0].id);
                    admin.request.get($_queryUrl, {}, function(res) {
                        if(res.errcode == 0) {
                            parent.layer.msg('采集成功')
                        }
                    })
                    return true;
                }
            });

        });
    </script>
@endpush
