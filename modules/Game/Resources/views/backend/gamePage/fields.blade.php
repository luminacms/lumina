<x-formItem label="title">
    <x-input name="title" required :value="$gamePage->title??''"/>
</x-formItem>

<x-formItem label="mode">
@if(!request('mode'))
    <x-input.select name="mode" :options="Modules\Game\Models\GamePage::getModes()" :value="$gamePage->mode??Modules\Game\Models\GamePage::MODE_SOURCE" required />
@else
    <x-input name="mode" :value="$gamePage->mode??request('mode')" readonly />
@endif
</x-formItem>

<x-formItem label="oauth">
    <x-input.select name="oauth" :options="\Modules\Core\Models\UserSocialite::getDrivers()" :value="$gamePage->oauth??''"/>
</x-formItem>

<x-formItem label="活动有效期">
    <x-input.dateRange type="datetime" name="start_at,end_at" required :label="__('game::field.name')" :value="isset($game)?$gamePage->start_at.','.$gamePage->end_at:''"/>
</x-formItem>

<x-formItem label="cover">
    <x-input.imgs name="cover" tip="建议188*340" :value="$gamePage->cover??''"/>
</x-formItem>

<x-formItem label="share_img">
    <x-input.imgs name="share_img" tip="建议220*220" :value="$gamePage->share_img??''"/>
</x-formItem>

<x-formItem label="desc">
    <x-input.meditor  name="desc" :value="$gamePage->desc??''"/>
</x-formItem>

<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
        <div class="layui-footer z-50 shadow" style="left:0;">
            <input type="hidden" name="game_id" value="{{ $gamePage->game_id ?? get_params('game_id') }}">
            <input type="hidden" name="oid" value="{{ $gamePage->oid ?? 1 }}">
			<button class="layui-btn J_ajax" lay-submit>提交</button>
			<button type="reset" class="layui-btn layui-btn-primary" lay-submit-cancel>取消</button>
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
