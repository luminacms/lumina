<div class="layui-form-item">
	{!! form()->label("title", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("slug", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("slug", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("seo_keyword", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("seo_keyword", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("seo_desc", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("seo_desc", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("create_by", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("create_by", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
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
