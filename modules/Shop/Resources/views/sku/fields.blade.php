<x-formItem :label="__('core::main.uid')">
	<x-input name="uid" verify="required" :value="$sku->uid??''"/>
</x-formItem>

<x-formItem :label="__('core::main.spu_id')">
	<x-input name="spu_id" verify="required" :value="$sku->spu_id??''"/>
</x-formItem>

<x-formItem :label="__('core::main.stock')">
	<x-input name="stock" verify="required" :value="$sku->stock??''"/>
</x-formItem>

<x-formItem :label="__('core::main.attrs')">
	<x-input name="attrs" verify="required" :value="$sku->attrs??''"/>
</x-formItem>

<x-formItem :label="__('core::main.thumb')">
	<x-input name="thumb" verify="required" :value="$sku->thumb??''"/>
</x-formItem>

<x-formItem :label="__('core::main.pics')">
	<x-input name="pics" verify="required" :value="$sku->pics??''"/>
</x-formItem>

<x-formItem :label="__('core::main.price_fee')">
	<x-input name="price_fee" verify="required" :value="$sku->price_fee??''"/>
</x-formItem>

<x-formItem :label="__('core::main.market_price_fee')">
	<x-input name="market_price_fee" verify="required" :value="$sku->market_price_fee??''"/>
</x-formItem>

<x-formItem :label="__('core::main.weight')">
	<x-input name="weight" verify="required" :value="$sku->weight??''"/>
</x-formItem>

<x-formItem :label="__('core::main.status')">
	<x-input name="status" verify="required" :value="$sku->status??''"/>
</x-formItem>

<x-formItem :label="__('core::main.create_by')">
	<x-input name="create_by" verify="required" :value="$sku->create_by??''"/>
</x-formItem>



<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
		<button class="layui-btn J_ajax" lay-submit>{{ __('core::main.submit') }}</button>
		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>{{ __('core::main.reset') }}</button>
	</div>
</x-formItem>

@push('script')
	<script>
		layui.use('form', function(){
			var form = layui.form
		})
	</script>
@endpush