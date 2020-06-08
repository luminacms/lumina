@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('shop.order.index')]
    ]" />

    <table class="layui-hide" id="data_order_table" lay-filter="data_order_table"></table>
@endsection


@push('script')
    <script type="text/html" id="tpl_order_show">
        <a lay-event="orderShow">@{{ d.order_id }}</a>
    </script>
    <script type="text/html" id="tpl_order_origin">
        @{{# if(d.origin == 1){ }}
            <span class="layui-badge bg-black">抖音</span>
        @{{# }else{ }}
            <span class="layui-badge">自营</span>
        @{{# } }}
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                tableName = 'data_order_table',
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#' + tableName,
                url: '{!! URL::full() !!}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                toolbar: [],
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"order_id","title":"order_id","templet":"#tpl_order_show","width":180},
                    {"field":"status","title":"status"},
                    {"field":"origin","title":"来源","templet":"#tpl_order_origin"},
                    {"field":"pre_total_fee","title":"pre_total_fee"},
                    {"field":"total_fee","title":"total_fee"},
                    {"field":"expired_at","title":"expired_at"},
                    {"field":"payed_at","title":"payed_at"},
                    {"field":"express_company","title":"express_company"},
                    {"field":"express_no","title":"express_no"},
                    {"field":"delivery_at","title":"delivery_at"},
                    {"field":"receipt_at","title":"receipt_at"},
                    {"field":"create_by","title":"create_by"},
                    {"field":"created_at_ip","title":"created_at_ip"},
                    {"field":"created_at","title":"created_at","hide":"true"},
                    {"field":"updated_at","title":"updated_at"}]]
            });

            //events
            table.on('toolbar('+tableName+')', function(obj){
                var checked = table.checkStatus(tableName);

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("shop.order.create", \request()->all()) }}', '{{ __("core::main.create") }}', {
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
                            admin.request.post('{{ route("shop.order.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('{{ __("core::main.delete_success") }}');
                                table.reload(tableName)
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openModal('{{route("shop.order.edit", "_id_")}}'.replace('_id_', checked.data[0].id), 'Edit#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload(tableName)
                            }
                        })
                        return true;
                    }
                }
            });

            table.on('tool('+tableName+')', function(obj){
                if(obj.event === 'orderShow') {
                    admin.openTab('{{ route("shop.order.show", "_id_") }}'.replace('_id_', obj.data.order_id), '订单详情')
                }
            })

        });
    </script>
@endpush
