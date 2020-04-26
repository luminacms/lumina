<x-formItem :label="__('core::field.type')">
	<x-input name="type" verify="required" :value="$point->type??''"/>
</x-formItem>

<x-formItem :label="__('core::field.count')">
	<x-input name="count" verify="required" :value="$point->count??''"/>
</x-formItem>

<x-formItem :label="__('core::field.oid')">
	<x-input name="oid" verify="required" :value="$point->oid??''"/>
</x-formItem>

<x-formItem :label="__('core::field.create_by')">
	<x-input name="create_by" verify="required" :value="$point->create_by??''"/>
</x-formItem>



<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
		<button class="layui-btn" lay-submit lay-filter="*">__('core::main.submit')</button>
		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>__('core::main.reset')</button>
	</div>
</x-formItem>

@push('script')
	<script>
		layui.use('form', function(){
			var form = layui.form
		})
	</script>
@endpush