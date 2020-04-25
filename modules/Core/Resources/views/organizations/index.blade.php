@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('core.organizations.index')]
       ]" />

    <table class="layui-hide" id="data_organization_table" lay-filter="data_organization_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element', 'laytpl'], function(){
            var table = layui.table,
                admin = parent.layui == layui?layui.admin:parent.layui.admin,
                laytpl = layui.laytpl,
                element = layui.element;

            table.render({
                elem: '#data_organization_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('core.organizations.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                export: {url: '{{ URL::full() }}', can: true, all: true},
                page: true,
                height: 'full-100',
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"oid","title":"oid","width":300},
                    {"field":"name","title":"name"},
                    {"field":"role","title":"角色"},
                    {"field":"created_at","title":"创建时间","fixed":"right"},
                    {"field":"updated_at","title":"更新时间","hide":"ture"}
                    ]]
            });

            //监听行工具事件
            table.on('toolbar(data_organization_table)', function(obj){
                var checked = table.checkStatus('data_organization_table');

                if(obj.event == 'create') {
                    admin.openTab('{{ route('core.organizations.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            admin.request.post('{{ route('core.organizations.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_qlpost_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        admin.openTab('{{route('core.organizations.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '更新数据')
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
