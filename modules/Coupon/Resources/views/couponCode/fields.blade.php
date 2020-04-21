<x-formItem :label="__('core::field.coupon_id')">
	<x-input name="coupon_id" verify="required" :value="$couponCode->coupon_id??''"/>
</x-formItem>

<x-formItem :label="__('core::field.code')">
	<x-input name="code" verify="required" :value="$couponCode->code??''"/>
</x-formItem>

<x-formItem :label="__('core::field.status')">
	<x-input name="status" verify="required" :value="$couponCode->status??''"/>
</x-formItem>

<x-formItem :label="__('core::field.owner_by')">
	<x-input name="owner_by" verify="required" :value="$couponCode->owner_by??''"/>
</x-formItem>

<x-formItem :label="__('core::field.received_at')">
	<x-input name="received_at" verify="required" :value="$couponCode->received_at??''"/>
</x-formItem>

<x-formItem :label="__('core::field.used_at')">
	<x-input name="used_at" verify="required" :value="$couponCode->used_at??''"/>
</x-formItem>

<x-formItem :label="__('core::field.expired_at')">
	<x-input name="expired_at" verify="required" :value="$couponCode->expired_at??''"/>
</x-formItem>



<x-formItem class="layui-layout-admin">
	<div class="layui-footer z-50 shadow" style="left:0;">
		<button class="layui-btn" lay-submit>提交</button>
		<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>重置</button>
	</div>
</x-formItem>

@push('script')
	<script>
		layui.use('form', function(){
			var form = layui.form
		})
	</script>
@endpush