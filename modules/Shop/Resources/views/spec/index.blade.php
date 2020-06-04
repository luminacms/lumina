@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('shop.spec.index')]
    ]" />

    <table class="layui-hide" id="data_spec_table" lay-filter="data_spec_table"></table>
@endsection


@push('script')
    <script type="text/html" id="tpl_action">
        <a class="layui-btn layui-btn-xs" lay-event="show">查看</a>
    </script>

    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                tableName = 'data_spec_table',
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#' + tableName,
                url: '{!! URL::full() !!}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true"},
                    {"field":"name","title":"name"},
                    {"field":"description","title":"description"},
                    {"field":"oid","title":"oid"},
                    {"field":"status","title":"status"},
                    {"field":"create_by","title":"create_by"},
                    {"field":"created_at","title":"created_at","hide":"true"},
                    {"field":"updated_at","title":"updated_at"},
                    {"title":"操作","fixed":"right","templet":"#tpl_action"}
                ]]
            });

            //events
            table.on('toolbar('+tableName+')', function(obj){
                var checked = table.checkStatus(tableName);

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("shop.spec.create", \request()->all()) }}', '{{ __("core::main.create") }}', {
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
                            admin.request.post('{{ route("shop.spec.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('{{ __("core::main.delete_success") }}');
                                table.reload(tableName)
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openModal('{{route("shop.spec.edit", "_id_")}}'.replace('_id_', checked.data[0].id), 'Edit#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload(tableName)
                            }
                        })
                        return true;
                    }
                }
            });

            table.on('tool('+tableName+')', function(obj) {
                if(obj.event === 'show') {
                    admin.openModal('{{ route("shop.spec.show", "_id_") }}'.replace('_id_', obj.data.id), '{{ __("core::main.show") }}')
                    return;
                }
            })

        });
    </script>
@endpush
