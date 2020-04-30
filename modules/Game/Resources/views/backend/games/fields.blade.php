<x-formItem label="活动标题">
    <x-input name="name" />
</x-formItem>

<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn J_ajax" lay-submit>提交</button>
			<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>取消</button>
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
