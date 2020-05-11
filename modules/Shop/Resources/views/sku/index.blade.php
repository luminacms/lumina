@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('shop.sku.index')]
    ]" />

    <table class="layui-hide" id="data_sku_table" lay-filter="data_sku_table"></table>
@endsection


@push('script')
    <script type="text/html" id="sku_attrvals">
        @{{# layui.each(d.attrs, function(index, item){ }}
            <span class="layui-badge">@{{ item.value }}</span>
        @{{# }); }}
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                tableName = 'data_sku_table',
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#' + tableName,
                url: '{!! URL::full() !!}',
                autoShow: '{{ route("shop.sku.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true"},
                    {"field":"sku_id","title":"skuId"},
                    ,{"field":"stock","title":"stock"},
                    {"field":"attrs","title":"attrs","templet": "#sku_attrvals"},
                    {"field":"thumb","title":"thumb"},{"field":"pics","title":"pics"},{"field":"price_fee","title":"price_fee"},{"field":"market_price_fee","title":"market_price_fee"},{"field":"weight","title":"weight"},{"field":"status","title":"status"},{"field":"create_by","title":"create_by"},{"field":"created_at","title":"created_at","hide":"true"},{"field":"updated_at","title":"updated_at"}]]
            });

            //events
            table.on('toolbar('+tableName+')', function(obj){
                var checked = table.checkStatus(tableName);

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("shop.sku.create", \request()->all()) }}', '{{ __("core::main.create") }}', {
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
                            admin.request.post('{{ route("shop.sku.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('{{ __("core::main.delete_success") }}');
                                table.reload(tableName)
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openModal('{{route("shop.sku.edit", "_id_")}}'.replace('_id_', checked.data[0].id), 'Edit#'+checked.data[0].id, {
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
