<x-input name="title" required :value="$gamePage->title??''"/>

@if(!request('mode'))
    <x-input.select name="mode" :options="Modules\Game\Models\GamePage::getModes()" :value="$gamePage->mode??Modules\Game\Models\GamePage::MODE_SOURCE" required />
@else
    <x-input name="mode" :value="$gamePage->mode??request('mode')" readonly />
@endif

<x-input.select name="oauth" :options="\Modules\Core\Models\UserSocialite::getDrivers()" :value="$gamePage->oauth??''"/>

<x-input.dateTimeRange name="start_at;end_at" required :label="__('game::field.name')" :value="isset($game)?$gamePage->start_at.';'.$gamePage->end_at:''"/>

<x-input.imgs name="cover" tip="建议188*340" :value="$gamePage->cover??''"/>

<x-input.imgs name="share_img" tip="建议220*220" :value="$gamePage->share_img??''"/>

<x-input.textarea  name="desc" :value="$gamePage->desc??''"/>


<div class="layui-form-item layui-layout-admin">
    <div class="layui-input-block">
        <div class="layui-footer z-50 shadow" style="left:0;">
            <input type="hidden" name="game_id" value="{{ $gamePage->game_id ?? request('game_id') }}">
            <input type="hidden" name="oid" value="{{ $gamePage->oid ?? 1 }}">
			<button class="layui-btn" lay-submit lay-ajax="true">提交</button>
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