@extends('core::layouts.master')

@section('content')
    @include('core::includes.layout.submenu', [
        'items' => [
            ['name' => '列表管理', 'uri' => route('payment.transaction.index')],
            ['name' => '文档', 'uri' => route('core.doc', ['path'=>urlencode(module_path('payment').'/docs.md')]), 'right'=>true],
        ]
    ])

    <table class="layui-hide" id="data_paytransaction_table" lay-filter="data_paytransaction_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_paytransaction_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('payment.transaction.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: [],
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true",hide: true},
                    {"field":"transaction_id","title":"交易ID",'width':250},
                    {"field":"status","title":"状态",templet: "<div><a href=\"javascript:;\" lay-event=\"refresh\" title=\"更新状态\">@{{ d.status_label }}</a></div>", 'width': 100, downoff: true},
                    {"field":"buyer_id","title":"支付方账号",'width':200},
                    {"field":"total_fee","title":"支付金额(元)",width: 150,templet:'<div><span class="text-red-600 font-bold text-2xl">@{{ d.total_fee || 0 }}</span><em class="mx-1">/</em><span>@{{ d.pre_total_fee }}</span></div>'},
                    {"field":"pay_driver","title":"支付方式"},
                    {"field":"pay_gateway","title":"支付网关"},
                    {"field":"model_type","title":"model_type", width: 250,hide: true},
                    {"field":"model_order_id","title":"订单号",'width':200,hide: true},
                    {"field":"pay_channel","title":"支付渠道", hide: true},
                    {"field":"fee_type","title":"币种",hide: true},
                    {"field":"expired_at","title":"expired_at",hide: true},
                    {"field":"transaction_code","title":"对方交易ID"},
                    {"field":"create_ip","title":"create_ip"},
                    {"field":"created_at","title":"创建时间"},
                    {"field":"updated_at","title":"更新时间",hide: true},
                    {"field":"payment_at","title":"支付时间","fixed":"right",width: 150},
                ]]
            });

            //监听行工具事件
            table.on('toolbar(data_paytransaction_table)', function(obj){
                var checked = table.checkStatus('data_paytransaction_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ url("/payTransactions/create") }}', '新增数据')
                    return true;
                }

                if(obj.event == 'delete' || obj.event == 'update') {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ url("/payTransactions/:id") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_paytransaction_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{ url("/payTransactions/:id/edit") }}'.replace('_id_', checked.data[0].id), '新增数据')
                        return true;
                    }
                }
            });

            table.on('tool(data_paytransaction_table)', function(obj) {
                if(obj.event == 'refresh') {
                    parent.layui.admin.request.post('{{ route('payment.sync', '_id_') }}'.replace('_id_', obj.data.id), {}, function(res){
                        layer.msg('更新成功');
                        table.reload('data_paytransaction_table')
                    })
                }
            })

        });
    </script>
@endpush
