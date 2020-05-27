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
            <x-input.select name="brand_id" :value="$spu->brand_id??''" :options="\Modules\Shop\Models\Brand::all()->mapWithKeys(function($item){
                return [$item['id'] => $item['name']];
            })->toArray()"  search required />
        </x-formItem>

        <x-formItem :label="__('core::main.name')" required >
            <x-input name="name" :value="$spu->name??''" required placeholder="需清晰描述所售商品，包含品牌信息、商品名称、商品规格，最多30个汉字" />
        </x-formItem>

        <x-formItem label="推荐语">
            <x-input name="description" :value="$spu->description??''" placeholder="描述商品推荐的卖点，将在用户端展示，限8~50个汉字" />
        </x-formItem>

        <x-formItem label="库存扣减方式" required>
            <x-input.radio name="deduct_stock_type" class="radio" :options="['1' => '下单减库存', '2' => '付款减库存']" value="1"/>
        </x-formItem>
        <x-formItem label="支付方式" required>
            <x-input.radio name="pay_type" class="radio" :options="Modules\Shop\Models\Spu::$pay_types" value="1"/>
        </x-formItem>
        {{-- <x-formItem label="同店商品推荐" required>
            <x-input.radio name="" class="radio" :options="['1'=>'系统推荐', '2'=>'手动配置']" value="1"/>
        </x-formItem> --}}

        <x-formItem :label="__('core::main.thumb')">
            <x-input.imgs name="thumb"  :value="$spu->thumb??''"/>
        </x-formItem>

        <x-formItem label="主图">
            <x-input.imgs limit="9" name="pic_url" :value="$spu->pic_url??''"/>
        </x-formItem>

        <x-formItem label="规格">
            <div class="layui-tab-item layui-show">
                @if($_type==\Modules\Shop\Models\Spu::TYPE_SINGLE)
                    <div class="border border-gray-500">
                        <x-formItem label="SKU" required inline>
                            <x-input name="sku[0][uid]" required :value="$spu->sku[0]->uid??''" placeholder="全局唯一"/>
                            库存：<x-input type="number" name="sku[0][stock]" required :value="$spu->sku[0]->stock??''" />
                            重量(kg)：<x-input type="number" name="sku[0][weight]" required :value="$spu->sku[0]->weight??''" />
                        </x-formItem>
                        <x-formItem :label="__('core::main.price_fee')" inline required>
                            <x-input type="number" name="sku[0][price_fee]" required :value="$spu->sku[0]->price_fee??''"/>
                            划线价：<x-input type="number" name="sku[0][market_price_fee]" required :value="$spu->sku[0]->price_fee??''"/>
                        </x-formItem>
                    </div>
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
