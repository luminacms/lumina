@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('shop.category.index')]
    ]" />

    <table id="data_category_table" lay-filter="data_category_table" class="layui-table"></table>
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
                treeMode: true,
                cols: [[
                    {"field":"id","title":"ID", "width":100},
                    {"field":"name","title":"name"},
                    {"field":"path","title":"path"},
                    {"field":"level","title":"level"},
                    {"field":"parentid","title":"parentid"},
                    {"field":"created_at","title":"created_at"},
                    {"field":"updated_at","title":"updated_at"}
                ]]
            });

            // table.render({
            //     elem: '#' + tableName,
            //     url: '{!! URL::full() !!}',
            //     icon_field: 'name',
            //     is_checkbox: true,
            //     cols: [
            //         {"field":"id","title":"ID", "width":100},
            //         {"field":"name","title":"name"},
            //         {"field":"path","title":"path"},
            //         {"field":"level","title":"level"},
            //         {"field":"created_at","title":"created_at"},
            //         {"field":"updated_at","title":"updated_at"}
            //     ]
            // });

            // table.render({
            //     elem: '#' + tableName,
            //     url: '{!! URL::full() !!}',
            //     cols: [[
            //         {"type":"checkbox","fixed":"left"},
            //         {"field":"id","title":"ID", "width":100},
            //         {"field":"name","title":"name"},
            //         {"field":"path","title":"path"},
            //         {"field":"level","title":"level"},
            //         {"field":"created_at","title":"created_at"},
            //         {"field":"updated_at","title":"updated_at"}]]
            // });

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
