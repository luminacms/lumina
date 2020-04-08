<div class="layui-form-item">
	{!! form()->label("title", '标题', ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("origin", '来源', ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("origin", null, ["class"=>"layui-input"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("post_at", '发布时间', ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->date("post_at", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>


<div class="layui-form-item">
	{!! form()->label("content", '内容', ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->ide("content", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>


<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="component-form-demo1">提交</button>
			<button type="reset" class="layui-btn layui-btn-primary">重置</button>
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
