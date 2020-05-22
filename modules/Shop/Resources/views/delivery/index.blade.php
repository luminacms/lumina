@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('shop.delivery.index')]
    ]" />

    <table class="layui-hide" id="data_delivery_table" lay-filter="data_delivery_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                tableName = 'data_delivery_table',
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#' + tableName,
                url: '{!! URL::full() !!}',
                toolbar: ['create', 'delete'],
                autoShow: '{{ route("shop.delivery.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true"},{"field":"name","title":"name"},{"field":"type","title":"type"},{"field":"created_at","title":"created_at","hide":"true"},{"field":"updated_at","title":"updated_at"}]]
            });

            //events
            table.on('toolbar('+tableName+')', function(obj){
                var checked = table.checkStatus(tableName);

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("shop.delivery.create", \request()->all()) }}', '{{ __("core::main.create") }}', {
                        area: '1000px',
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
                            admin.request.post('{{ route("shop.delivery.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('{{ __("core::main.delete_success") }}');
                                table.reload(tableName)
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openModal('{{route("shop.delivery.edit", "_id_")}}'.replace('_id_', checked.data[0].id), 'Edit#'+checked.data[0].id, {
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
