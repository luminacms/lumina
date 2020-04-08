
<div class="layui-form-item">
	<label for="create_by" class="layui-form-label">{{ __("field.create_by") }}</label>
	<div class="layui-input-block">
		<input type="number" name="create_by" id="create_by" value="{{ $productbrand->create_by ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="name" class="layui-form-label">{{ __("field.name") }}</label>
	<div class="layui-input-block">
		<input type="text" name="name" id="name" value="{{ $productbrand->name ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="status" class="layui-form-label">{{ __("field.status") }}</label>
	<div class="layui-input-block">
		<input type="text" name="status" id="status" value="{{ $productbrand->status ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="logo_src" class="layui-form-label">{{ __("field.logo_src") }}</label>
	<div class="layui-input-block">
		<input type="text" name="logo_src" id="logo_src" value="{{ $productbrand->logo_src ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="description" class="layui-form-label">{{ __("field.description") }}</label>
	<div class="layui-input-block">
		<input type="text" name="description" id="description" value="{{ $productbrand->description ?? "" }}" class="layui-input">
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