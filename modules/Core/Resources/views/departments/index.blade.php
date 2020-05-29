@extends('core::layouts.master')


@section('content')
    <x-submenu :items="[
        ['name' => '部门列表', 'uri' => route('core.departments.index')]
    ]" />

    <table class="layui-hide" id="department_table" lay-filter="department_table"></tbody>
    </table>
@endsection


@push('script')

    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                $ = layui.jquery,
                tableName = 'department_table',
                admin = parent.layui == layui?layui.admin:parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#' + tableName,
                url: '{!! URL::full() !!}',
                treeMode: true,
                cols: [[
                    {"type":"checkbox"},
                    {"field":"id","title":"ID", "width":100},
                    {"field":"name","title":"name"},
                    {"field":"path","title":"path"},
                    {"field":"level","title":"level"},
                    {"field":"parentid","title":"parentid"},
                    {"field":"created_at","title":"created_at"},
                    {"field":"updated_at","title":"updated_at"}
                ]]
            });

            //监听行工具事件
            table.on('toolbar(department_table)', function(obj){
                var checked = table.checkStatus('department_table');

                if(obj.event == 'create') {
                    admin.openTab('{{ route('core.departments.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete'|| obj.event == 'update')) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            admin.request.post('{{ route('core.departments.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_qlpost_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        console.log(222)
                        admin.openTab('{{route('core.departments.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '新增数据')
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
