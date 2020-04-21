@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => '列表管理', 'uri' => route('coupon.coupon-code.index')]
    ]" />
    
    <table class="layui-hide" id="data_couponcode_table" lay-filter="data_couponcode_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#data_couponcode_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route("coupon.coupon-code.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true"},{"field":"coupon_id","title":"coupon_id"},{"field":"code","title":"code"},{"field":"status","title":"status"},{"field":"owner_by","title":"owner_by"},{"field":"received_at","title":"received_at"},{"field":"used_at","title":"used_at"},{"field":"expired_at","title":"expired_at"},{"field":"created_at","title":"created_at","hide":"true"},{"field":"updated_at","title":"updated_at"}]]
            });

            //监听行工具事件
            table.on('toolbar(data_couponcode_table)', function(obj){
                var checked = table.checkStatus('data_couponcode_table');

                if(obj.event == 'create') {
                    var createModal = admin.openDrawer('{{ route("coupon.coupon-code.create", \request()->all()) }}', '新增数据', {
                        end: function(index, layero){
                            table.reload('data_game_table')
                        }
                    })
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            admin.request.post('{{ route("coupon.coupon-code.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_couponcode_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openDrawer('{{route("coupon.coupon-code.edit", "_id_")}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id, {
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
