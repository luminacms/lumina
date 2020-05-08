
<x-formItem :label="__('core::main.name')">
	<x-input name="name" verify="required" :value="$category->name??''"/>
</x-formItem>

<x-formItem label="父级栏目">
    <x-input.select name="parentid" :optionHtml="\Modules\Shop\Models\Category::getOptionsHtml($category->parentid??'')" :value="$category->parentid??''" />
</x-formItem>

<x-formItem :label="__('core::main.thumb')">
	<x-input.imgs name="thumb" :value="$category->thumb??''"/>
</x-formItem>

<x-formItem :label="__('core::main.sort')">
	<x-input name="sort" :value="$category->sort??''"/>
</x-formItem>




<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
		<button class="layui-btn J_ajax" lay-submit>{{ __('core::main.submit') }}</button>
		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>{{ __('core::main.reset') }}</button>
	</div>
</x-formItem>

@push('script')
	<script>
		layui.use('form', function(){
			var form = layui.form
		})
	</script>
@endpush
