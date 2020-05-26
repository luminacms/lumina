<?php
    $_type = $spu->type ?? request('type', \Modules\Shop\Models\Spu::TYPE_SINGLE);
?>
<div class="layui-tab2 j_attrwrap" lay-filter="spu_attr">
    <ul class="layui-tab-title">
        <li {{ $_type=='1'?'class=layui-this':''}} lay-id="single"><a href="{{ route('shop.spu.create', request()->merge(['type' => \Modules\Shop\Models\Spu::TYPE_SINGLE])->all()) }}" class="block">单规格</a></li>
        <li {{ $_type=='2'?'class=layui-this':''}} lay-id="multiple"><a href="{{ route('shop.spu.create', request()->merge(['type' => \Modules\Shop\Models\Spu::TYPE_MULTIPLE])->all()) }}" class="block">多规格</a></li>
    </ul>
    <div class="layui-tab-content pt-12">

        <x-formItem label="已选择">
            <?php
                $category_id = isset($spu) ? $spu->category_id : request('category_id');
                $fullPath = Modules\Shop\Models\Category::getParents($category_id);
            ?>
            <div style="line-height: 37px;" class="font-bold">{{ $fullPath->implode('name', ' > ') }}</div>
            <input type="hidden" name="category_id" value="{{ $category_id }}">
        </x-formItem>

        <x-formItem :label="__('core::main.brand_id')" required>
            <x-input.select name="brand_id" verify="required" :value="$spu->brand_id??''" :options="\Modules\Shop\Models\Brand::all()->mapWithKeys(function($item){
                return [$item['id'] => $item['name']];
            })->toArray()"  search />
        </x-formItem>

        <x-formItem :label="__('core::main.name')" required >
            <x-input name="name" :value="$spu->name??''" required />
        </x-formItem>

        <x-formItem :label="__('core::main.description')">
            <x-input name="description" :value="$spu->description??''"/>
        </x-formItem>



        <x-formItem label="库存扣减方式">
            <x-input.radio name="deduct_stock_type" class="radio" :options="['1' => '下单减库存', '2' => '付款减库存']" value="1"/>
        </x-formItem>

        <x-formItem :label="__('core::main.thumb')">
            <x-input.imgs name="thumb"  :value="$spu->thumb??''"/>
        </x-formItem>

        <x-formItem label="主图">
            <x-input.imgs limit="9" name="pic_url" :value="$spu->pic_url??''"/>
        </x-formItem>

        <x-formItem label="规格">
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
        </x-formItem>

        <x-formItem label="内容" required>
            <x-input.editor name="content" required />
        </x-formItem>
    </div>
</div>

<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
        <button class="layui-btn J_ajax" lay-submit>提交</button>
        <input type="hidden" name="type" value="{{ $_type }}">
		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>取消</button>
	</div>
</x-formItem>


<script>
    layui.use(['form', 'element'], function(){

    })
</script>
