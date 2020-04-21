<div class="layui-form-item">
	{!! form()->label("标题", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("title", null, ["class"=>"layui-input"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("栏目", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->select("category_id", \Modules\Cms\Models\CmsCategory::getOptionsHtml($post->category_id??'', 'name'),null,["lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item layui-form-text">
	{!! form()->label("内容", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->ide("content", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>


<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="component-form-demo1">提交</button>
			<button type="reset" class="layui-btn layui-btn-primary">取消</button>
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
