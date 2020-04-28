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
                url: '{!! URL::full() !!}',
                autoShow: '{{ route("coupon.coupon-code.show", "_id_") }}',
                where: {'orderBy': 'updated_at', 'sortedBy': 'desc'},
                export: {url: '{{ route("coupon.coupon-code.export", ["coupon_id" => request("coupon_id")]) }}', can: true, all: true},
                page: true,
                canSearch: true,
                toolbar: [],
                action: [{'text': '生成优惠码', 'event': 'makeCode'}],
                height: 'full-100',
                filters: [
                    {'name': 'status', "value":"{{ request('status') }}", "options": {"wait":"待领取","received":"已领取","used":"已使用","expired":"已过期"}}
                ],
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"code","title":"code",width:350},
                    {"field":"status","title":"状态"},
                    {"field":"owner_by_name","title":"领取人"},
                    {"field":"received_at","title":"领取时间"},
                    {"field":"used_at","title":"使用时间"},
                    {"field":"used_tag","title":"使用标记"},
                    {"field":"expired_at","title":"过期时间"},
                    {"field":"created_at","title":"创建时间"},
                ]]
            });

            //监听行工具事件
            table.on('toolbar(data_couponcode_table)', function(obj){
                var checked = table.checkStatus('data_couponcode_table');

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("coupon.coupon-code.create", \request()->all()) }}', '新增数据', {
                        end: function(index, layero){
                            table.reload('data_couponcode_table')
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
                        var createModal = admin.openModal('{{route("coupon.coupon-code.edit", "_id_")}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload('data_game_table')
                            }
                        })
                        return true;
                    }
                }

                // 生成优惠码
                if(obj.event == 'makeCode'){
                    layer.prompt({
                        value: '1',
                        title: '请输入生成优惠码数量'
                    }, function(value, index, elem){
                        layer.close(index);
                        admin.request.post('{{ route("coupon.coupon-code.make") }}', {'number': value, 'coupon_id': '{{ request("coupon_id") }}'}, function(res){
                            table.reload('data_couponcode_table')
                        })
                    });
                }
            });

        });
    </script>
@endpush
