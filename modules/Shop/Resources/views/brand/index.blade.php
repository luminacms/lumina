@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('shop.brand.index')]
    ]" />

    <table class="layui-hide" id="data_brand_table" lay-filter="data_brand_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#data_brand_table',
                url: '{!! URL::full() !!}',
                autoShow: '{{ route("shop.brand.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true"},{"field":"create_by","title":"create_by"},{"field":"name","title":"name"},{"field":"logo_src","title":"logo_src"},{"field":"description","title":"description"},{"field":"oid","title":"oid"},{"field":"status","title":"status"},{"field":"created_at","title":"created_at","hide":"true"},{"field":"updated_at","title":"updated_at"}]]
            });

            //events
            table.on('toolbar(data_brand_table)', function(obj){
                var checked = table.checkStatus('data_brand_table');

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("shop.brand.create", \request()->all()) }}', '{{ __("core::main.create") }}', {
                        end: function(index, layero){
                            table.reload('data_brand_table')
                        }
                    })
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg(__('core::main.table_select_multiple'));
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('{{ __("core::main.table_delete_tip") }}', function(index){
                            admin.request.post('{{ route("shop.brand.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('{{ __("core::main.delete_success") }}');
                                table.reload('data_brand_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openModal('{{route("shop.brand.edit", "_id_")}}'.replace('_id_', checked.data[0].id), 'Edit#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload('data_brand_table')
                            }
                        })
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
