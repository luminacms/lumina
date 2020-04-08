<x-input name="name" required :value="$permission->name??''"/>
<x-input name="label" required :value="$permission->name??''"/>
<x-input.select name="guard_name" required :options="['web' => 'web', 'org' => 'org']" :value="$permission->guard_name??'web'" />

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
