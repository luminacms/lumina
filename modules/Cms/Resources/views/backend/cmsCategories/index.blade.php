@extends('core::layouts.master')


@section('content')
    <x-submenu :items="[
        ['name' => '部门列表', 'uri' => route('backend.cms.cms-categories.index')]
    ]" />

    <table class="layui-hide" lay-filter="category_table">
        <thead>
        <tr>
            <th lay-data="{type:'checkbox', fixed: 'left'}"></th>
            <th lay-data="{field:'id', width:80, fixed: 'left'}">ID</th>
            <th lay-data="{field:'name', width:350}">名称</th>
            <th lay-data="{field:'path'}">路径</th>
            <th lay-data="{field:'level',width:80}">深度</th>
            <th lay-data="{field:'order',width:80}">排序</th>
            <th lay-data="{field:'updated_at'}">更新时间</th>
        </tr>
        </thead>
        <tbody>
        {!! \Modules\Cms\Models\CmsCategory::getTableHtml('name', 'posts') !!}
        </tbody>
    </table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element', 'jstree'], function(){
            var table = layui.table,
                $ = layui.jquery,
                admin = layui.admin,
                jstree = layui.jstree,
                element = layui.element;

            //转换静态表格
            table.init('category_table', {
                height: 'full-100',
                limit: 999999
            });

            //监听行工具事件
            table.on('toolbar(category_table)', function(obj){
                var checked = table.checkStatus('category_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ route('backend.cms.cms-categories.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('backend.cms.cms-categories.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_qlpost_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{route('backend.cms.cms-categories.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '新增数据')
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
