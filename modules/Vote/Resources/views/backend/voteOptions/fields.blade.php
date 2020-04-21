<div class="layui-form-item">
	{!! form()->label("title", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item float-left" style="width: 128px;">
	{!! form()->label("封面图", null, ["class"=>"layui-form-label w-full text-left"]) !!}
	{!! form()->img("thumb", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
</div>

<div class="layui-form-item">
	{!! form()->label("cheat_count", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("cheat_count", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
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
