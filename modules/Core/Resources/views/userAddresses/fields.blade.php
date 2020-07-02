
@input(["name"=>"province","type"=>"text","value"=>$userAddress->province ?? ""])
@input(["name"=>"city","type"=>"text","value"=>$userAddress->city ?? ""])
@input(["name"=>"district","type"=>"text","value"=>$userAddress->district ?? ""])
@input(["name"=>"address","type"=>"text","value"=>$userAddress->address ?? ""])
@input(["name"=>"zip","type"=>"text","value"=>$userAddress->zip ?? ""])
@input(["name"=>"contact_name","type"=>"text","value"=>$userAddress->contact_name ?? ""])
@input(["name"=>"contact_phone","type"=>"text","value"=>$userAddress->contact_phone ?? ""])

<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="submit-form">{{__('core::main.submit')}}</button>
			<button type="reset" class="layui-btn layui-btn-primary">{{__('core::main.cancel')}}</button>
		</div>
    </div>
</div>
