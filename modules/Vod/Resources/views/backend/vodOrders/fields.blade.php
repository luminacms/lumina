<div class="layui-form-item">
	{!! form()->label("order_id", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("order_id", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("create_by", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("create_by", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("type", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("type", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("model_id", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("model_id", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("status", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("status", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("price", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("price", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("expired_at", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("expired_at", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("payed_at", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("payed_at", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("created_at_ip", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("created_at_ip", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("oid", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("oid", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
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