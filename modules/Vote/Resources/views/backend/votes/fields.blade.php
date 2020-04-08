<div class="layui-form-item">
	{!! form()->label("标题", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("类型", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->select("type", Modules\Vote\Models\Vote::getTypes(), null, ["class"=>"layui-form-select","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("报名时间", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-inline">
		{!! form()->datetime("start_at", null, ["class"=>"layui-form-input","lay-verify"=>"required"]) !!}
	</div>
	<div class="layui-form-mid">-</div>
	<div class="layui-input-inline">
		{!! form()->datetime("end_at", null, ["class"=>"layui-form-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("投票/答题规则", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-inline">
		{!! form()->select("rule", Modules\Vote\Models\Vote::getRules(), null, ['class' => 'layui-select']) !!}
	</div>
	<div class="layui-input-inline">
		{!! form()->number("rule_times", null, ['class' => 'layui-input', 'placeholder' => '一天可以投几次']) !!}
	</div>
</div>

<div class="layui-form-item layui-form-text">
	{!! form()->label("活动规则", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->mide("content", null, ['class' => 'layui-textarea']) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("附加字段", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("addon_fields", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>


<div class="layui-form-item">
	{!! form()->label("通知地址", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("notice_webhook", null, ["class"=>"layui-input"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("通知频率", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-inline">
		{!! form()->number("notice_interval", null, ["class"=>"layui-input"]) !!}
	</div>
	<div class="layui-form-mid">单位（小时）</div>
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
