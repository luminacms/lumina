
<x-formItem :label="__('core::field.title')">
    <x-input name="title" verify="required" :value="$coupon->title??''"/>
</x-formItem>

<x-formItem :label="__('core::field.type')">
    <x-input.select name="type" :options="Modules\Coupon\Models\Coupon::$typeMap" verify="required" :value="$coupon->type??''"/>
</x-formItem>

<x-formItem :label="__('core::field.range')">
<x-input.select name="range" :options="Modules\Coupon\Models\Coupon::$rangeMap" verify="required" :value="$coupon->type??''"/>
</x-formItem>

<x-formItem :label="__('core::field.expired_type')">
<x-input.select name="expired_type" :options="Modules\Coupon\Models\Coupon::$expiredtypeMap" verify="required" :value="$coupon->expired_type??''"/>
</x-formItem>

<x-formItem :label="__('core::field.start_at')">
<x-input.datetime name="start_at" verify="required" :value="$coupon->start_at??''"/>
</x-formItem>

<x-formItem :label="__('core::field.end_at')">
    <x-input.datetime name="end_at" verify="required" :value="$coupon->end_at??''"/>
</x-formItem>


<x-formItem :label="__('core::field.times')">
<x-input type="number" name="times" verify="required" :value="$coupon->times??''"/>
</x-formItem>

<x-formItem :label="__('core::field.desc')">
<x-input.meditor name="desc" verify="required" :value="$coupon->desc??''"/>
</x-formItem>

<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
		<button class="layui-btn" lay-submit>{{ __('main.submit') }}</button>
        <button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>{{ __('main.cancel') }}</button>
	</div>
</x-formItem>

@push('script')
	<script>
		layui.use('form', function(){
			var form = layui.form
		})
	</script>
@endpush
