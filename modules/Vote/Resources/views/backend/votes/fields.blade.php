<x-formItem label="标题">
    <x-input name="title" required :value="$vote->title ?? ''"/>
</x-formItem>

<x-formItem label="type">
<x-input.select name="type" required :options="Modules\Vote\Models\Vote::getTypes()" :value="$vote->type ?? ''"/>
</x-formItem>

<x-formItem label="有效期">
    <x-input.dateRange type="datetime" name="start_at,end_at" :value="($vote->title ? $vote->start_at.','.$vote->end_at:'')" />
</x-formItem>

<x-formItem label="投票/答题规则">
    <x-input.select name="rule" label="投票/答题规则" required :options="Modules\Vote\Models\Vote::getRules()" :value="$vote->rule ?? ''"/>
</x-formItem>

<x-formItem label="一天可以投几次">
    <x-input type="number" name="rule_times" label="一天可以投几次" required :value="$vote->title ?? ''"/>
</x-formItem>

<x-formItem label="活动规则">
    <x-input.meditor name="content" label="活动规则" :value="$vote->content ?? ''"/>
</x-formItem>

{{-- <x-input name="notice_webhook" label="通知地址" :value="$vote->notice_webhook ?? ''"/>

<x-input name="notice_interval" label="通知频率" :value="$vote->notice_interval ?? ''"/> --}}

<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
		<div class="layui-footer z-50" style="left:0;">
			<button class="layui-btn" lay-submit lay-filter="component-form-demo1">提交</button>
			<button type="reset" class="layui-btn layui-btn-primary">取消</button>
		</div>
    </div>
</div>
