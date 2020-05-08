@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('shop.category.index')]
    ]" />

    <table class="layui-hide" id="data_category_table" lay-filter="data_category_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                tableName = 'data_category_table',
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#' + tableName,
                url: '{!! URL::full() !!}',
                autoShow: '{{ route("shop.category.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true"},{"field":"create_by","title":"create_by"},{"field":"status","title":"status"},{"field":"name","title":"name"},{"field":"thumb","title":"thumb"},{"field":"oid","title":"oid"},{"field":"sort","title":"sort"},{"field":"parentid","title":"parentid"},{"field":"path","title":"path"},{"field":"level","title":"level"},{"field":"created_at","title":"created_at","hide":"true"},{"field":"updated_at","title":"updated_at"}]]
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
