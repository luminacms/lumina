
<x-formItem :label="__('core::field.title')">
    <x-input name="title" verify="required" :value="$coupon->title??''"/>
</x-formItem>

<x-formItem :label="__('core::field.type')" inline>
    <x-input.select name="type" :options="Modules\Coupon\Models\Coupon::$typeMap" verify="required" :value="$coupon->type??''" lay-filter="couponType" />

    <x-input name="type_value" class="hidden" />
</x-formItem>

<x-formItem :label="__('core::field.range')">
<x-input.select name="range" :options="Modules\Coupon\Models\Coupon::$rangeMap" verify="required" :value="$coupon->type??''"/>
</x-formItem>

<x-formItem :label="__('core::field.expired_type')">
<x-input.select name="expired_type" :options="Modules\Coupon\Models\Coupon::$expiredtypeMap" verify="required" :value="$coupon->expired_type??''"/>
</x-formItem>

<x-formItem label="有效期">
    <x-input.dateRange type="datetime" name="start_at,end_at" :value="$coupon->start_at??'',$coupon->end_at??''" min="0"/>
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

            form.on("select(couponType)", function(res){
                var _valIpt = res.othis.parent("div").find('input[name=type_value]'),
                    _placeHolderMap = {'pb': '满减金额', 'discount': '几折'};
                res.value != 'default' ? _valIpt.attr("placeholder", (_placeHolderMap[res.value] || '')).removeClass("hidden") : _valIpt.val('').addClass("hidden")
            })
		})
	</script>
@endpush
