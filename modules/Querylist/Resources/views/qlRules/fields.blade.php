
<div class="layui-form-item">
	{!! form()->label("type", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->select('type', ['simple' => '简单'],null, ["class"=>"layui-select"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("title", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

<div class="layui-form-item">
	{!! form()->label("url", null, ["class"=>"layui-form-label"]) !!}
	<div class="layui-input-block">
		{!! form()->text("url", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
	</div>
</div>

@if(isset($qlRule))
    <?php $_rule = json_decode($qlRule->rules, true) ?>
<div class="border-blue-500 border-b-2"></div>
<div class="clearfix py-6">
	<h2 class="text-2xl py-4">列表规则</h2>
	<div class="float-left w-2/12">
		<div class="layui-card">
			<div class="layui-card-body px-4">
				<div class="layui-form-item">
					{!! form()->textarea('rules[list]',$_rule['list'],['class'=>'layui-textarea', 'id'=>'list_rule_val']) !!}
				</div>
			</div>
		</div>
	</div>
	<div class="float-left w-1/12">
		<a class="layui-btn layui-btn-normal mt-12" id="j_list_test" href="javascript:;">测试</a>
	</div>
	<div class="float-left w-9/12">
		<div class="panel">
			<div class="panel-body">
				<tablle id="j_list_table"></tablle>
			</div>
		</div>
	</div>
</div>

<div class="border-blue-500 border-b-2"></div>
<div class="clearfix py-6">
	<h2 class="text-2xl py-4">内容规则</h2>
	<div class="float-left w-2/12">
		<div class="layui-card">
			<div class="layui-card-head">列表规则</div>
			<div class="layui-card-body px-4">
				<div class="layui-form-item">
					{!! form()->textarea('rules[body]',$_rule['body'],['class'=>'layui-textarea', 'id'=>'body_rule_val']) !!}
				</div>
			</div>
		</div>
	</div>
	<div class="float-left w-1/12">
		<a class="layui-btn layui-btn-normal mt-12" id="j_body_test" href="javascript:;">测试</a>
	</div>
	<div class="float-left w-9/12">
		<div class="panel">
			<div class="panel-body">
				<tablle id="j_body_table" lay-filter="j_body_table"></tablle>
			</div>
		</div>
	</div>
</div>

@endif

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
		layui.use(['form', 'table', 'admin'], function(){
			var form = layui.form,
				admin = layui.admin,
				table = layui.table;

			var interface_test = '{{ url('/interface/querylist/rules/'.($qlRule->id??0).'/test') }}'
			var interface_restore = '{{ url('/interface/querylist/rules/'.($qlRule->id??0).'/restore') }}'
			$("#j_list_test").click(function(){
				var url = $("input[name=url]").val();
				var rule = $("#list_rule_val").val();

				admin.load.show();
				admin.request.post(interface_test, {'url': url, 'rules[list]': rule}, function(res) {
					admin.load.hide();

					table.render({
						elem: "#j_list_table",
						toolbar: false,
						height: 300,
						cols: [[{'field': 'title', 'title': '采集列表','templet': '<div><a href="@{{ d.link }}" target="_blank">@{{ d.title }}</a></div>'}]],
						data: res.data
					});
				})

				return false;
			})
			$("#j_body_test").click(function(){
				var url = $("input[name=url]").val();
				var ruleList = $("#list_rule_val").val();
				var ruleBody = $("#body_rule_val").val();

				admin.load.show();
				admin.request.post(interface_test, {'url': url, 'rules[list]': ruleList, 'rules[body]': ruleBody}, function(res) {
					admin.load.hide();
					table.render({
						elem: "#j_body_table",
						toolbar: [],
						canSearch: false,
						action: [{'text': '保留所选', 'event': 'restorePost'}],
						height: 300,
						page: false,
						cols: [[
								{'checkbox': true},
								{'field': 'title', 'title': '标题','width': 450},
								{'field':'content','title': '内容'}
							]],
						data: res.data
					});
				})

				return false;
			})

			table.on('toolbar(j_body_table)', function(obj){
				var checked = table.checkStatus('j_body_table');
				if(obj.event == 'restorePost') {
					var ids = [];
					$.each(checked.data, function(i, n){
						ids.push(n.id)
					})
					admin.request.post(interface_restore, {'ids': ids}, function(res) {
						layer.msg('已保存'+res.data+'数据')
					})
				}
			})
		})
	</script>
@endpush
