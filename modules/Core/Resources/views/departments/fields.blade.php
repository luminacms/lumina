
<x-input.select label="组织" name="oid" :optionHtml="\Modules\Core\Models\Organization::getOptionsHtml($department->oid??'')" required :value="$department->oid??''" />
<x-input label="部门名称" name="name" required :value="$department->name??''"></x-input>
<x-input.select label="父级栏目" name="parentid" :optionHtml="\Modules\Core\Models\Department::getOptionsHtml($department->parentid??'')" :value="$department->parentid??''" />

<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="department_form">{{__('main.submit')}}</button>
			<button type="reset" class="layui-btn layui-btn-primary">{{__('main.cancel')}}</button>
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
