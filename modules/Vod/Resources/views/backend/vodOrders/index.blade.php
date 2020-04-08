@extends('vod::backend.layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('vod.vod-orders.index')]
       ]" />

    <table class="layui-hide" id="data_vodorder_table" lay-filter="data_vodorder_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_vodorder_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('vod.vod-orders.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                action: [{'text': '交易详情', 'event': 'payTransaction'}],
                export: {url: '{{ route("vod.vod-orders.export") }}', can: true, all: true},  // 数据导出，can:导出权限, all：导出全部权限
                page: true,
                canSearch: true,
                toolbar: [],
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true","fixed":"left","width":80},
                    {"field":"order_id","title":"订单号", width: 250},
                    {"field":"status","title":"状态",templet: "<div><a href=\"javascript:;\" lay-event=\"refresh\" title=\"更新状态\">@{{ d.status_label }}</a></div>", 'width': 100, downoff: true},
                    {"field":"create_by","title":"创建人",width:150},
                    {"field":"model_type","title":"类型", templet: "<div>@{{ d.model_type=='lesson'?'课节':'专栏' }}#@{{ d.model_id }}</div>"},
                    {"field":"price","title":"售价"},
                    {"field":"expired_at","title":"expired_at"},
                    {"field":"payed_at","title":"付款时间"},
                    {"field":"created_at_ip","title":"下单IP"},
                    {"field":"created_at","title":"创建时间",width:150},
                    {"field":"updated_at","title":"更新时间","fixed":"right",width:150}
                    ]]
            });

            //监听行工具事件
            table.on('toolbar(data_vodorder_table)', function(obj){
                var checked = table.checkStatus('data_vodorder_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ route('vod.vod-orders.create') }}', '新增数据')
                    return true;
                }

                if(_.indexOf(['delete', 'update', 'payTransaction'], obj.event) > -1 && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('vod.vod-orders.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_vodorder_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{route('vod.vod-orders.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id)
                        return true;
                    }else if(obj.event === 'payTransaction') {
                        parent.layer.open({
                            type: 2,
                            shadeClose: true,
                            maxmin: true,
                            area: ['1000px', '600px'],
                            content: '{{ route('payment.detail') }}?model_order_id='+checked.data[0].order_id+'&model_type={{ urlencode((new \Modules\Vod\Models\VodOrder())->getMorphClass()) }}'
                        })
                    }
                }
            });

            table.on('tool(data_vodorder_table)', function(obj) {
                if(obj.event == 'refresh') {
                    parent.layui.admin.request.post('{{ route('vod.vod-orders.refresh', '_id_') }}'.replace('_id_', obj.data.id), {}, function(res){
                        layer.msg('更新成功');
                        table.reload('data_vodorder_table')
                    })
                }
            })

        });
    </script>
@endpush
