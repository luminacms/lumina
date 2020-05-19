
<x-formItem :label="__('core::main.pre_total_fee')">
	<x-input name="pre_total_fee" verify="required" :value="$order->pre_total_fee??''"/>
</x-formItem>

<x-formItem :label="__('core::main.total_fee')">
	<x-input name="total_fee" verify="required" :value="$order->total_fee??''"/>
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
