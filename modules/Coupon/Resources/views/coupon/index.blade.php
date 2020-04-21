@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => __('core::main.table_list'), 'uri' => route('coupon.coupon.index')]
    ]" />

    <table class="layui-hide" id="data_coupon_table" lay-filter="data_coupon_table"></table>
@endsection


@push('script')
    <script type="text/html" id="tpl_title">
        <a lay-href="{{ route('coupon.coupon-code.index') }}?coupon_id=@{{ d.id }}" class="cursor-pointer mr-1" title="优惠码管理"><span class="layui-badge layui-bg-black">@{{ d.code_count }}</span></a>
        @{{ d.title }}
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#data_coupon_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route("coupon.coupon.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: ['create', 'delete'],
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"uid","title":"uid"},
                    {"field":"title","title":"title",templet: "#tpl_title"},
                    {"field":"type","title":"type"},{"field":"range","title":"range"},{"field":"expired_type","title":"expired_type"},{"field":"expired_hours","title":"expired_hours"},{"field":"start_at","title":"start_at"},{"field":"end_at","title":"end_at"},{"field":"times","title":"times"},{"field":"desc","title":"desc"},{"field":"status","title":"status"},{"field":"create_by","title":"create_by"},{"field":"created_at","title":"created_at","hide":"true"},{"field":"updated_at","title":"updated_at"}]]
            });

            //监听行工具事件
            table.on('toolbar(data_coupon_table)', function(obj){
                var checked = table.checkStatus('data_coupon_table');

                if(obj.event == 'create') {
                    var createModal = admin.openDrawer('{{ route("coupon.coupon.create", \request()->all()) }}', '{{ __("core::main.create") }}', {
                        end: function(index, layero){
                            table.reload('data_game_table')
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
                            admin.request.post('{{ route("coupon.coupon.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('{{ __("core::main.delete_success") }}');
                                table.reload('data_coupon_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openDrawer('{{route("coupon.coupon.edit", "_id_")}}'.replace('_id_', checked.data[0].id), 'Edit#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload('data_game_table')
                            }
                        })
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
