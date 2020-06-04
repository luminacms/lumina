
<div class="layui-tab2 j_attrwrap" lay-filter="spu_attr">

        <x-formItem label="已选择">
            <?php
                $category_id = isset($spu) ? $spu->category_id : request('category_id');
                $fullPath = Modules\Shop\Models\Category::getParents($category_id);
            ?>
            <div style="line-height: 37px;" class="font-bold">{{ $fullPath->implode('name', ' > ') }}</div>
            <input type="hidden" name="category_id" value="{{ $category_id }}">
        </x-formItem>

        <x-formItem :label="__('core::main.brand_id')" required>
            <x-input.select name="brand_id" :value="$spu->brand_id??''" :options="\Modules\Shop\Models\Brand::getOptions()"  search required />
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
        <x-formItem label="运费选择" required>
            <x-input.select name="delivery_id" class="radio" :options="Modules\Shop\Models\Delivery::getOptions('id', 'name')" search required :value="$spu->delivery_id??''"/>
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
                @include('shop::spu._multiple')
            </div>
        </x-formItem>

        <x-formItem label="内容" required>
            <x-input.editor name="content" required />
        </x-formItem>

</div>

<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
        <button class="layui-btn J_ajax" lay-submit lay-filter="*">提交</button>
		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>取消</button>
	</div>
</x-formItem>


<script>
    layui.use(['form', 'element'], function(){

    })
</script>
