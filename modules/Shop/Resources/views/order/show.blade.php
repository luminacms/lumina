@extends('core::layouts.blank')

@section('content')
    <div class="container m-4 mx-auto">
        <x-card title="订单详情">
            <h1 class="text-xl font-bold mb-2">订单号：{{ $order->order_id }}</h1>
            <div>订单状态：{{ Modules\Shop\Models\Order::$status[$order->status] ?? '-' }}</div>
            <hr />
            <div class="flex">
                <div class="w-1/3">支付方式：</div>
                <div class="w-1/3">下单时间：{{ $order->created_at ?? '-' }}</div>
                {{-- <div class="w-1/3">承诺发货时间：2020/05/22 10:37:34</div> --}}
            </div>
            <div class="flex">
                <div class="w-1/3">付款时间：{{ $order->payed_at ?? '-' }} </div>
                <div class="w-1/3">完成时间: {{ $order->payed_at ?? '-' }}</div>
            </div>
            <div class="flex">
                <div class="w-1/3">发货时间：{{ $order->delivery_at ?? '-'}}</div>
                <div class="w-1/3">物流单号：{{ $order->express_no ?? '-' }}</div>
                <div class="w-1/3">物流公司: {{ $order->express_company ?? '-' }}</div>
            </div>
        </x-card>

        <x-card title="商品信息">
            <table class="layui-table">
                <thead>
                    <tr>
                        <th>商品信息</th>
                        <th>单价（元）</th>
                        <th>数量（件）</th>
                        <th>商品总价（元）</th>
                        <th>优惠信息</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($order->skus as $sku)
                    <tr>
                        <td>
                            <div class="flex">
                                <div style="width:75px;height:75px;background-size:100% 100%;background-image: url({{ $sku->spu->thumb ?? '/assets/empty.jpg' }});"></div>
                                <div class="flex-1 ml-2">
                                    <a href="">{{ $sku->spu->name }}</a>
                                    <div>规格：{{ $sku->specVals->implode('value', '|') }}</div>
                                    <div>SKU：{{ $sku->uid }}</div>
                                </div>
                            </div>
                        </td>
                        <td>¥{{ $sku->pivot->price_fee }}</td>
                        <td>{{ $sku->pivot->number }}</td>
                        <td>¥{{ $sku->pivot->subtotal }}</td>
                        <td>无优惠</td>
                    </tr>
                    @endforeach
                </tbody>

                <tfoot>
                    <tr>
                        <td colspan="6" align="right">
                            合计：￥{{ $order->pre_total_fee }},
                            实付款：￥<strong class="text-red-600">{{ $order->total_fee }}</strong>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </x-card>

        <x-card title="收货信息">
            <div class="flex">
                <div class="w-1/2">收货人：{{ Arr::get($order->address, 'contact_name') }}</div>
                <div class="w-1/2">联系方式：{{ Arr::get($order->address, 'contact_phone') }}</div>
            </div>
            <div class="flex">
                <div class="w-1/2">收货地址：{{ $order->address->getMergeName(' ') ?? '' }}{{ Arr::get($order->address, 'address') }}</div>
                <div class="w-1/2">用户留言：{{ Arr::get($order, 'msg') }}</div>
            </div>
        </x-card>

        {{-- <x-card title="用户信息">
            <div class="flex">
                <div class="w-1/3">货到付款拒收率（含取消）50.00 %</div>
                <div class="w-1/3">历史货到付款订单数 2</div>
                <div class="w-1/3">订单投诉率 0%</div>
            </div>
        </x-card> --}}

        <x-card title="物流信息">
            <x-slot name="btns">
                @can('shipping', $order)
                    <a class="j_shipping cursor-pointer hover:underline">{{ $order->status === Modules\Shop\Models\Order::STATUS_SHIPPING ? '修改物流' : '发货' }}</a>
                @endcan
            </x-slot>

            <x-card title="发货" id="j_shipping_box" style="display: none">
                <x-form method="post" :action="route('shop.order.shipping')">
                    <x-formItem label="物流公司" required>
                        <x-input.select name="express_company" :options="Modules\Core\Utils\KuaiDi::numCode()->pluck('name')->all()" search required :value="$order->express_company??''" />
                    </x-formItem>
                    <x-formItem label="物流单号" required>
                        <x-input name="express_no" required :value="$order->express_no ?? ''" />
                    </x-formItem>

                    <x-formItem>
                        <input type="hidden" name="order_id" value="{{ $order->order_id }}">
                        <button type="submit" lay-submit class="layui-btn" lay-filter="*">提交</button>
                    </x-formItem>
                </x-form>
            </x-card>

            @if($order->express_no && $express = Modules\Core\Utils\KuaiDi::search($order->express_no, $order->express_company))
                <div class="mb-4">
                    <div>物流公司：{{ $order->express_company }}</div>
                    <div>运单号码：{{ $order->express_no }}</div>
                </div>
                <ul class="layui-timeline">
                    @if(isset($express['data']))
                        @foreach($express['data'] as $_item)
                        <li class="layui-timeline-item">
                            <i class="layui-icon layui-timeline-axis fa fa-check-circle @if(!$loop->first)text-gray-600 @endif"></i>
                            <div class="layui-timeline-content layui-text">
                                <h4 class="layui-timeline-title mb-2 @if($loop->first)font-bold @endif">{{ $_item['context'] }}</h4>
                                <small>{{ $_item['time'] }}</small>
                            </div>
                        </li>
                        @endforeach
                    @else
                        <div>{{ $express['message'] ?? '未查询到快递信息' }}</div>
                    @endif
                </ul>
            @else
                <div>暂无物流信息</div>
            @endif
        </x-card>
    </div>

    {{-- <x-formItem class="layui-layout-admin">
        <div class="layui-footer z-50 shadow" style="left:0;">
            <button class="layui-btn J_ajax" lay-submit>{{ __('core::main.submit') }}</button>
            <button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>{{ __('core::main.reset') }}</button>
        </div>
    </x-formItem> --}}
@endsection

@push('script')

<script>
    layui.use('form', function(){

        var form = layui.form

        $(".j_shipping").click(function(){
        layer.open({
            type: 1,
            title: '发货',
            area: ['800px', '500px'],
            content: $("#j_shipping_box")
        })
    })
    })

</script>

@endpush
