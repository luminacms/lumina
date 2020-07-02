<x-input name="driver" :value="$role->driver??''"/>
<x-input name="userid" :value="$role->userid??''"/>
<x-input name="oid" :value="$role->oid??''"/>
<x-input name="openid" :value="$role->openid??''"/>
<x-input name="anonymous_openid" :value="$role->anonymous_openid??''"/>
<x-input name="token" :value="$role->token??''"/>
<x-input name="nickname" :value="$role->nickname??''"/>
<x-input name="avatar" :value="$role->avatar??''"/>
<x-input name="gender" :value="$role->gender??''"/>
<x-input name="country" :value="$role->country??''"/>
<x-input name="province" :value="$role->province??''"/>
<x-input name="city" :value="$role->city??''"/>

<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="component-form-demo1">{{__('core::main.submit')}}</button>
			<button type="reset" class="layui-btn layui-btn-primary">{{__('core::main.cancel')}}</button>
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
