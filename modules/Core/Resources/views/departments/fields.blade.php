<x-formItem label="部门名称">
    <x-input name="name" required :value="$department->name??''"></x-input>
</x-formItem>

<x-formItem label="父级栏目">
    <x-input.select name="parentid" :optionHtml="\Modules\Core\Models\Department::getOptionsHtml($department->parentid??'')" :value="$department->parentid??''" />
</x-formItem>


<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="department_form">{{__('core::main.submit')}}</button>
			<button type="reset" class="layui-btn layui-btn-primary">{{__('core::main.cancel')}}</button>
		</div>
    </div>
</div>

@push('script')
<script>
	layui.use(['form', 'element'], function(){
		var form = layui.form,
            element = layui.element;
		form.on('submit(department_form)', function(data){
			return true;
		});
	})
</script>
@endpush
