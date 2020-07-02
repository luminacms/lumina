<x-formItem label="{{ __('core::main.name') }}">
<x-input name="name" :value="$user->name??''" label="name" required></x-input>
</x-formItem>

<x-formItem label="{{ __('core::main.department') }}">
<x-input.select name="department" :value="$user->department??''" :optionHtml="\Modules\Core\Models\Department::getOptionsHtml(isset($user->departments[0])?$user->departments[0]->id:0)" label="department" required>
</x-input.select>
</x-formItem>

<x-formItem label="{{ __('core::main.mobile') }}">
<x-input name="mobile" :value="$user->mobile??''" label="mobile" required></x-input>
</x-formItem>

<x-formItem label="{{ __('core::main.email') }}">
<x-input type="email" name="email" :value="$user->email??''" label="email" required></x-input>
</x-formItem>

<x-formItem label="{{ __('core::main.password') }}">
<x-input type="password" name="password" label="password" required></x-input>
</x-formItem>


<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="component-form-demo1">{{__('core::main.submit')}}</button>
			<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>{{__('core::main.cancel')}}</button>
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
