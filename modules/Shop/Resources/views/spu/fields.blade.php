<?php
    $_type = $spu->type ?? request('type', \Modules\Shop\Models\Spu::TYPE_SINGLE);
?>
<div class="layui-tab2 j_attrwrap" lay-filter="spu_attr">
    <ul class="layui-tab-title">
        <li {{ $_type=='1'?'class=layui-this':''}} lay-id="single"><a href="{{ route('shop.spu.create', ['type' => \Modules\Shop\Models\Spu::TYPE_SINGLE]) }}" class="block">单规格</a></li>
        <li {{ $_type=='2'?'class=layui-this':''}} lay-id="multiple"><a href="{{ route('shop.spu.create', ['type' => \Modules\Shop\Models\Spu::TYPE_MULTIPLE]) }}" class="block">多规格</a></li>
    </ul>
    <div class="layui-tab-content pt-12">

        <x-formItem :label="__('core::main.brand_id')" required>
            <x-input.select name="brand_id" verify="required" :value="$spu->brand_id??''" :options="\Modules\Shop\Models\Brand::all()->mapWithKeys(function($item){
                return [$item['id'] => $item['name']];
            })->toArray()"  search />
        </x-formItem>

        <x-formItem :label="__('core::main.category_id')">
            <x-input.select name="category_id" :optionHtml="\Modules\Shop\Models\Category::getOptionsHtml($spu->category_id??'')" :value="$spu->category_id??''" />
        </x-formItem>

        <x-formItem :label="__('core::main.name')">
            <x-input name="name" verify="required" :value="$spu->name??''"/>
        </x-formItem>

        <x-formItem :label="__('core::main.description')">
            <x-input name="description" verify="required" :value="$spu->description??''"/>
        </x-formItem>

        <x-formItem :label="__('core::main.thumb')">
            <x-input.imgs name="thumb"  :value="$spu->thumb??''"/>
        </x-formItem>

        <x-formItem :label="__('core::main.pic_url')">
            <x-input.imgs limit="9" name="pic_url" :value="$spu->pic_url??''"/>
        </x-formItem>

      <div class="layui-tab-item layui-show">
            @if($_type==\Modules\Shop\Models\Spu::TYPE_SINGLE)
                <x-formItem label="SKU">
                    <x-input name="sku[0][uid]" verify="required" :value="$spu->sku[0]->uid??''"/>
                </x-formItem>
                <x-formItem :label="__('core::main.price_fee')" inline>
                    <x-input type="number" name="sku[0][price_fee]" verify="required" :value="$spu->sku[0]->price_fee??''"/>
                    划线价：<x-input type="number" name="sku[0][market_price_fee]" verify="required" :value="$spu->sku[0]->price_fee??''"/>
                </x-formItem>
                <x-formItem :label="__('core::main.stock')">
                    <x-input type="number" name="sku[0][stock]" verify="required" :value="$spu->sku[0]->stock??''"/>
                </x-formItem>
            @else
                @include('shop::spu._multiple')
            @endif
      </div>
    </div>
</div>

<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
        <button class="layui-btn J_ajax" lay-submit>提交</button>
        <input type="hidden" name="type" value="{{ $_type }}">
		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>重置</button>
	</div>
</x-formItem>


<script>
    layui.use(['form', 'element'], function(){

    })
</script>
