<div class="layui-form-item">
	{!! form()->label("课程", null, ["class"=>"layui-form-label required"]) !!}
	<div class="layui-input-block">
		{!! form()->select("course_id", \Modules\Vod\Models\Course::getOptionsHtml($lesson->course_id ?? request('course_id'), 'title'), null, ["class"=>"layui-select","lay-verify"=>"required","lay-search"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("标题", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item layui-form-text">
	{!! form()->label("封面图", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block pt-2">
		{!! form()->img("cover", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("多媒体类型", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">

		<div class="layui-input-inline">
			{!! form()->select("type", \Modules\Vod\Models\Lesson::getTypes(), \Modules\Vod\Models\Lesson::TYPE_VIDEO, ["class"=>"layui-select","lay-verify"=>"required"]) !!}
		</div>
		{!! form()->label("多媒体时长", null, ["class"=>"layui-form-label"]) !!}
		<div class="layui-input-inline">
			{!! form()->time("length", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
		</div>
	</div>
</div>

<div class="layui-form-item layui-form-text">
	{!! form()->label("多媒体", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->media("media_src", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("付费模式", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-inline">
		{!! form()->select(
			"pay_type",
			\Modules\Vod\Models\Lesson::getPayTypes($lesson->pay_type ?? \Modules\Vod\Models\Lesson::PAY_TYPE_PARENT),
			null,
			["class"=>"layui-select","lay-verify"=>"required","lay-search"=>true,"lay-filter"=>"j_pay_type"]
		) !!}
	</div>
	<div class="hidden" id="j_price">
		{!! form()->label("价格", null, ["class"=>"layui-form-label hide"]) !!}
		<div class="layui-input-inline">
			{!! form()->number("price", null, ["class"=>"layui-input", "step" => 0.01]) !!}
		</div>
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("开课时间", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-inline">
		{!! form()->datetime("start_at", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("课程排序", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-inline">
		{!! form()->text("sort", null, ["class"=>"layui-input"]) !!}
	</div>
</div>

<div class="layui-form-item layui-form-text">
	{!! form()->label("课程简介", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->textarea("description", null, ["class"=>"layui-textarea"]) !!}
	</div>
</div>
<div class="layui-form-item layui-form-text">
	{!! form()->label("课程内容", null, ["class"=>"layui-form-label"]) !!}
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
			var form = layui.form,
				$price = $("#j_price");

			form.on('select(j_pay_type)', function(opt){
				console.log(opt)
				if(opt.value == 'self') {
					$price.show()
				}else{
					$price.hide()
				}
			})


		})
	</script>
@endpush