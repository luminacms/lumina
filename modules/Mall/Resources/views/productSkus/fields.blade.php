
<div class="layui-form-item">
	<label for="spu_id" class="layui-form-label">{{ __("field.spu_id") }}</label>
	<div class="layui-input-block">
		<input type="number" name="spu_id" id="spu_id" value="{{ $productsku->spu_id ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="attrs" class="layui-form-label">{{ __("field.attrs") }}</label>
	<div class="layui-input-block">
		<textarea name="attrs" id="attrs" class="layui-input">{{ $productsku->attrs ?? "" }}</textarea>
</div>
</div>

<div class="layui-form-item">
	<label for="thumb" class="layui-form-label">{{ __("field.thumb") }}</label>
	<div class="layui-input-block">
		<input type="text" name="thumb" id="thumb" value="{{ $productsku->thumb ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="pics" class="layui-form-label">{{ __("field.pics") }}</label>
	<div class="layui-input-block">
		<textarea name="pics" id="pics" class="layui-input">{{ $productsku->pics ?? "" }}</textarea>
</div>
</div>

<div class="layui-form-item">
	<label for="price_fee" class="layui-form-label">{{ __("field.price_fee") }}</label>
	<div class="layui-input-block">
		<input type="number" name="price_fee" id="price_fee" value="{{ $productsku->price_fee ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="market_price_fee" class="layui-form-label">{{ __("field.market_price_fee") }}</label>
	<div class="layui-input-block">
		<input type="number" name="market_price_fee" id="market_price_fee" value="{{ $productsku->market_price_fee ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="status" class="layui-form-label">{{ __("field.status") }}</label>
	<div class="layui-input-block">
		<input type="text" name="status" id="status" value="{{ $productsku->status ?? "" }}" class="layui-input">
</div>
</div>

<div class="layui-form-item">
	<label for="create_by" class="layui-form-label">{{ __("field.create_by") }}</label>
	<div class="layui-input-block">
		<input type="number" name="create_by" id="create_by" value="{{ $productsku->create_by ?? "" }}" class="layui-input">
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
