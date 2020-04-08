@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('mall.product-category.index')]
       ]" />

    <table class="layui-hide" lay-filter="product_category_table">
        <thead>
        <tr>
            <th lay-data="{type:'checkbox', fixed: 'left'}"></th>
            <th lay-data="{field:'id', width:80, fixed: 'left'}">ID</th>
            <th lay-data="{field:'name', width:350}">名称</th>
            <th lay-data="{field:'path'}">路径</th>
            <th lay-data="{field:'level',width:80}">深度</th>
            <th lay-data="{field:'order',width:80}">排序</th>
            <th lay-data="{field:'updated_at'}">更新时间</th>
            <th lay-data="{toolbar: '#department_toolbar',fixed: 'right',width:150}">操作</th>
        </tr>
        </thead>
        <tbody>
            {!! \Modules\Mall\Models\ProductCategory::getTableHtml() !!}
        </tbody>
    </table>
@endsection


@push('script')
    <script type="text/html" id="data_table_toolbar">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
    <script>
        layui.use(['table'], function(){
            var table = layui.table

            table.init('product_category_table', {
                height: 'full-100',
                limit: 999999
            });

            //监听行工具事件
            table.on('toolbar(product_category_table)', function(obj){
                var checked = table.checkStatus('product_category_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ route('mall.product-category.create') }}', '新增数据')
                    return true;
                }

                if(_.indexOf(['delete', 'update'], obj.event) > -1 && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('mall.product-category.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_qlpost_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{route('mall.product-category.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '新增数据')
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
