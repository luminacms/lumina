<x-input name="name" label="organization.name" :value="$organization->name??''" />

<x-input.select name="parentid" label="organization.parentid"
    :optionHtml="\Modules\Core\Models\Organization::getOptionsHtml($organization->parentid??'')" />

<x-input name="sort" label="sort" :value="$organization->sort ?? 50"/>

<div class="layui-form-item">
	<label for="permission">Permission</label>
	<div class="layui-input-block">
        @foreach(\Modules\Core\Models\Permission::where('guard_name', 'org')->get() as $_module)
            <input type="checkbox" name="permisson[]"
                title="{{ $_module->label }}"
                value="{{ $_module->name }}"
                @if(isset($organization)&&$organization->hasPermissionTo($_module->name, 'org'))checked @endif
            >
		@endforeach
	</div>
</div>

<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="component-form-demo1">{{__('main.submit')}}</button>
			<button type="reset" class="layui-btn layui-btn-primary">{{__('main.cancel')}}</button>
		</div>
    </div>
</div>

@push('script')
	<script>
		layui.use('form', function(){
			var form = layui.form
		})
	</script>
@endpush
