<!-- footer -->
<footer>
    <div class="flex fixed bottom-0 left-0 w-full h-10 text-center bg-blue-500 text-white">
        <a class="flex-1 h-10 " href="{{ route('vote.index', $vote->id) }}">首页</a>
        <a class="flex-1" href="{{ route('vote.rule', $vote->id) }}">规则</a>
        <a class="flex-1" href="{{ route('vote.rank', $vote->id) }}">排行</a>
        <a class="flex-1"href="{{ route('vote.apply', $vote->id) }}">我的</a>
    </div>
</footer>