<div class="layui-form-item">
	{!! form()->label("课程标题", null, ["class"=>"layui-form-label required"]) !!}
	<div class="layui-input-block">
		{!! form()->text("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("父级课程", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->select("parentid", \Modules\Vod\Models\Course::getOptionsHtml($course->parentid ?? 0, 'title'),null, ["class"=>"layui-select","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("价格", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-inline">
		{!! form()->text("price", null, ["class"=>"layui-input"]) !!}
	</div>
</div>

<div class="layui-form-item layui-form-text">
	{!! form()->label("封面图", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block pt-2">
		{!! form()->img("cover", null, ["lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item layui-form-text">
    {!! form()->label("视频封面", null, ["class"=>"layui-form-label"]) !!}
    <div class="layui-input-block">
        {!! form()->media("cover_video", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
    </div>
</div>

<div class="layui-form-item layui-form-text">
	{!! form()->label("课程简介", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->textarea("description", null, ["class"=>"layui-textarea"]) !!}
	</div>
</div>
<div class="layui-form-item layui-form-text">
	{!! form()->label("课程详情", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->ide("content", null, ["lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50 shadow" style="left:0;">
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
