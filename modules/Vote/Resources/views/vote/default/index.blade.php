@extends('vote::vote.default.layout')

@section('content')
    <div class="m-con container  mt-5 ">
        <div class="m-info  mt-1 mx-3 text-xs ">
            <div class="time my-3">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1560320089174"
                     class="icon inline-block align-middle" style="" viewBox="0 0 1024 1024" version="1.1" p-id="2043"
                     width="13" height="13">
                    <defs>
                        <style type="text/css" /></defs><path d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z m0 896c-212.032 0-384-171.968-384-384S299.968 128 512 128s384 171.968 384 384-171.968 384-384 384z m192-448h-128v-128a64 64 0 1 0-128 0v192a64 64 0 0 0 64 64h192c35.392 0 64-28.608 64-64s-28.608-64-64-64z" fill="#1296db" p-id="2044"/></svg>
                <span class="align-middle"> <span>离投票结束时间还有：</span><span id="j_countdonw"></span></span>
            </div>
            <div class="flex bg-gray-300  text-gray-500 rounded-sm">
                <div class="flex-1 text-center py-1">
                    <p>参与选手</p>
                    <p>{{ $vote->options->count() }}</p>
                </div>
                <div class="flex-1 text-center border-l border-r py-1">
                    <p>累计票数</p>
                    <p>{{ $vote->getTotalCount() }}</p>
                </div>
                <div class="flex-1 text-center py-1">
                    <p>访问人数</p>
                    <p>{{ $vote->count }}</p>
                </div>
            </div>
        </div>

        <div class="m-search border-gray-400 border mx-3 rounded-sm my-2">
            <div class="table w-full text-sm  ">
                <input id="keyword" type="text" class=" w-full table-cell border-r border-gray-300 p-1" placeholder="用户编号或用户昵称">
                <span class=" table-cell text-center text-gray-500">搜索</span>
            </div>
        </div>

        <div id="waterfall" class="w-11/12 m-auto" >

        </div>
        <div class=" text-sm text-center text-gray-500 hidden">暂无更多数据!</div>
    </div>
    </div>

@endsection

@push('script')
<script src="https://cdn.sxmgcm.cn/libs/waterfall/waterfall.rebuild.js"></script>
<script>
    layui.use('util', function(){
        var util = layui.util;

        var endTime = parseInt('{{ $vote->end_at->timestamp*1000 }}'),
            serverTime = parseInt('{{ now()->timestamp*1000 }}');

        util.countdown(endTime, serverTime, function(date, serverTime, timer){
            var str = date[0] + '天' + date[1] + '时' +  date[2] + '分' + date[3] + '秒';
            layui.$('#j_countdonw').html(str);
        });
    })
    window.onload = function () {
        let w = (window.innerWidth - 12) / 2
        var waterfall = new WaterFall({
            container: '#waterfall',
            pins: ".pin",
            loader: '#loader',
            gapHeight: 20,
            gapWidth: 7,
            pinWidth: w,
            threshold: 100
        });
        var page = 1
        waterfall.on("load", function () {
            $.ajax({
                url: '{{ route('vote.index', $vote->id) }}',
                type: 'get',
                data:{"sid": {{ isset($vote->subjects[0])?$vote->subjects[0]->id:0 }},'page':page},
                dataType: 'json',
                success: function (res) {
                    if(res.errcode == 0 && res.data.length != 0){
                        var data = res.data;
                        page++;
                        var arr = [];
                        for (var i = 0, len = data.length; i < len; i++) {
                            var item = data[i];
                            arr.push('<a class="pin" href="{{ route('vote.option', $vote->id) }}?sid='+item.subject_id+'&oid='+item.option_id+'"><img src="' + item['thumb'] + '" class="img" alt="' + item.title + '"> <p class="description border-b-1 border-solid border-gray-300 truncate">' + item.title + '</p><p class="text-center w-2/3 bg-red-500 py-1 my-1 m-auto text-white rounded-full">赞</p>              </a>')
                        }
                        // 调用 append 方法 检验是否所有的图片都具有高度后才会 append 进文档树中
                        waterfall.append(arr.join(''), '.img')
                    }else{
                        $('.hidden').show()
                    }
                },
                error: function (res) {
                    console.log(res)
                }
            })
        })
    }

</script>
@endpush
