<style>
.fr{float: right;}
.clearfloat{zoom: 1;}
.clearfloat:after{display: block;clear: both;content: "";visibility: hidden;height: 0;}
.place-div label{font-weight: 400;font-size: 1.4rem;}
.place-div input[type=checkbox]{margin-right: .3rem;}
.place-div > div{width: 100%;padding: 10px 30px;}
.place-div .checkbtn{background-color: #fbfbfb;text-align: right;}
.place-div .checkbtn img{height: 10px;margin-left: 3px;}
.place-div .checkbtn .ri{border-right: none;}
.place-div .checkbtn a{height: 30px;line-height: 30px;display: inline-block;width: 60px;text-align: center;}
.place-div .smallplace .ratio{color: red;}
.place-div .smallplace label{padding-right: 10px;text-align: left;width: auto;float: left;cursor: pointer;}
.place-div .smallplace .citys{width: auto;background-color: #fff;position: absolute;top: 35px;border: 1px solid #ccc;z-index: 100;visibility: hidden;}
.place-div .smallplace .citys > i.jt{width: 0;height: 0;border-left: 8px solid transparent;border-right: 8px solid transparent;border-bottom: 10px solid #ccc;position: absolute;top: -10px;left: 20px;}
.place-div .smallplace .citys > i.jt i{width: 0;height: 0;border-left: 8px solid transparent;border-right: 8px solid transparent;border-bottom: 10px solid #fff;position: absolute;top: 2px;left: -8px;}
.place-div .smallplace .citys .row-div{min-width: 250px;padding: 10px;box-sizing: border-box;}
.place-div .smallplace .citys .row-div label span{max-width: 175px;white-space: nowrap;vertical-align: middle;font-size: 1.4rem;}
.place-div .smallplace .place-tooltips:hover .citys{visibility: visible;}
.place-div .smallplace p{float: left;width: auto;margin: 2px 0;}
.place-div .smallplace > div{float: left;width: 170px;margin: 0;padding-bottom: 10px;padding-top: 5px;position: relative;}
.show-place-div{margin-left: 85px;font-size: 15px;}
.show-place-div .smallplace label{min-width: 105px;width: auto;}
.show-place-div .smallplace input{margin-left: 0;}
.show-place-div .smallplace .citys .row-div p{margin: 5px 0 10px 0;}
</style>

<x-formItem label="模板名称">
    <x-input name="name" required :value="$delivery->name ?? ''"/>
</x-formItem>
<x-formItem label="模板名称">
    <x-input.radio name="type" :options="['1' => '按件数', '2' => '按重量']" :value="$delivery->type ?? '1'" lay-filter="deliveryType"/>
</x-formItem>

<x-formItem label="配送区域及运费">
    <table class="layui-table">
        <thead>
            <tr>
                <th width="42%">可配送区域</th>
                <th>
                    <span class="first">首件 (个)</span>
                </th>
                <th>运费 (元)</th>
                <th>
                    <span class="additional">续件 (个)</span>
                </th>
                <th>续费 (元)</th>
            </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
            <tr>
                <td colspan="5" class="am-text-left">
                    <a class="add-region am-btn am-btn-default am-btn-xs" id="deliveryHandle" href="javascript:;">
                        <i class="iconfont icon-dingwei"></i>
                        点击添加可配送区域和运费
                    </a>
                </td>
            </tr>
        </tfoot>
    </table>
</x-formItem>


<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
		<button class="layui-btn J_ajax" lay-submit>{{ __('core::main.submit') }}</button>
		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>{{ __('core::main.reset') }}</button>
	</div>
</x-formItem>

@push('script')
<script>
    layui.extend(
        {'delivery': 'modules/shop/delivery'}
    ).use(['element', 'form', 'delivery'], function(){

        var form = layui.form,
            delivery = layui.delivery;

        delivery.render({
            elem: '#deliveryHandle',
            data: @json(Modules\Shop\Models\Region::regionCache()),
            value: @json($delivery->rules ?? [])
        })

        form.on('radio(deliveryType)', function(item){
            var $first = $('.first')
                , $additional = $('.additional');
            if (item.value == '2')
                $first.text('首重 (Kg)') && $additional.text('续重 (Kg)');
            else
                $first.text('首件 (个)') && $additional.text('续件 (个)');
        })

    })
</script>
@endpush
