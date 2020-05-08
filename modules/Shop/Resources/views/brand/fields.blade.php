

<x-formItem :label="__('core::main.name')">
	<x-input name="name" verify="required" :value="$brand->name??''"/>
</x-formItem>

<x-formItem :label="__('core::main.logo_src')">
	<x-input.imgs limit="4" name="logo_src" verify="required" :value="$brand->logo_src??''"/>
</x-formItem>

<x-formItem :label="__('core::main.description')">
	<x-input.textarea name="description" verify="required" :value="$brand->description??''"/>
</x-formItem>


<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
		<button class="layui-btn" lay-submit lay-filter="*">{{ __('core::main.submit') }}</button>
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
