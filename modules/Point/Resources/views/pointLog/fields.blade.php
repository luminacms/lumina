<x-formItem :label="__('core::field.model_type')">
	<x-input name="model_type" verify="required" :value="$pointLog->model_type??''"/>
</x-formItem>

<x-formItem :label="__('core::field.model_id')">
	<x-input name="model_id" verify="required" :value="$pointLog->model_id??''"/>
</x-formItem>

<x-formItem :label="__('core::field.type')">
	<x-input name="type" verify="required" :value="$pointLog->type??''"/>
</x-formItem>

<x-formItem :label="__('core::field.status')">
	<x-input name="status" verify="required" :value="$pointLog->status??''"/>
</x-formItem>

<x-formItem :label="__('core::field.count')">
	<x-input name="count" verify="required" :value="$pointLog->count??''"/>
</x-formItem>

<x-formItem :label="__('core::field.left_count')">
	<x-input name="left_count" verify="required" :value="$pointLog->left_count??''"/>
</x-formItem>

<x-formItem :label="__('core::field.desc')">
	<x-input name="desc" verify="required" :value="$pointLog->desc??''"/>
</x-formItem>

<x-formItem :label="__('core::field.oid')">
	<x-input name="oid" verify="required" :value="$pointLog->oid??''"/>
</x-formItem>

<x-formItem :label="__('core::field.create_by')">
	<x-input name="create_by" verify="required" :value="$pointLog->create_by??''"/>
</x-formItem>

<x-formItem :label="__('core::field.trace_ip')">
	<x-input name="trace_ip" verify="required" :value="$pointLog->trace_ip??''"/>
</x-formItem>

<x-formItem :label="__('core::field.trace_agent')">
	<x-input name="trace_agent" verify="required" :value="$pointLog->trace_agent??''"/>
</x-formItem>

<x-formItem :label="__('core::field.point_id')">
	<x-input name="point_id" verify="required" :value="$pointLog->point_id??''"/>
</x-formItem>

<x-formItem :label="__('core::field.point_type')">
	<x-input name="point_type" verify="required" :value="$pointLog->point_type??''"/>
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