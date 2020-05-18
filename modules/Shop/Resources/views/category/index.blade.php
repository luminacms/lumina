@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('shop.category.index')]
    ]" />

    <table class="layui-hide" lay-filter="data_category_table">
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
            {!! \Modules\Shop\Models\Category::getTableHtml() !!}
        </tbody>
    </table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                tableName = 'data_category_table',
                admin = parent.layui.admin,
                element = layui.element;

            table.init(tableName, {
                height: 'full-110',
                limit: 999999
            });

            //events
            table.on('toolbar('+tableName+')', function(obj){
                var checked = table.checkStatus(tableName);

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("shop.category.create", \request()->all()) }}', '{{ __("core::main.create") }}', {
                        end: function(index, layero){
                            //table.reload(tableName)
                        }
                    })
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('{{ __("core::main.table_select_multiple") }}');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('{{ __("core::main.table_delete_tip") }}', function(index){
                            admin.request.post('{{ route("shop.category.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('{{ __("core::main.delete_success") }}');
                                table.reload(tableName)
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openModal('{{route("shop.category.edit", "_id_")}}'.replace('_id_', checked.data[0].id), 'Edit#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload(tableName)
                            }
                        })
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
