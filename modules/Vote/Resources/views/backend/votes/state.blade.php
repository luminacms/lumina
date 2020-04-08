@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '数据分析', 'uri' => route('backend.vote.votes.index')]
       ]" />

    <div class="clearfix w-4/6">
{{--        <div class="float-left w-1/2 px-2">--}}
{{--            <table class="layui-table">--}}
{{--                <thead><tr><th>图表</th></tr></thead>--}}
{{--                <tbody>--}}
{{--                    <tr><td></td></tr>--}}
{{--                </tbody>--}}
{{--            </table>--}}
{{--        </div>--}}
        <div class="float-left w-1/2 px-2" id="j_rank">
            <table id="rank_table"></table>
        </div>
    </div>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table;

            table.render({
                elem: '#rank_table',
                autoSort: true,
                toolbar: false,
                url: '{{ url("/interface/vote/".request('vote_id')."/rank") }}', //数据接口
                cols: [[ //表头
                    {title: '排行', width:80, templet: '<div>@{{ d.LAY_INDEX }}</div>'},
                    {'title': '缩略图', 'filed': 'thumb', 'templet': '<div><img src="@{{ d.thumb }}" width="25" height="25" class="cursor-pointer"/> </div>'},
                    {'title': '标题', 'field': 'title'},
                    {'title': '票数', 'field': 'count','sort': true}
                ]],
                done: function(){
                    layer.photos({
                        photos: '#j_rank'
                    });
                }
            });

        });
    </script>
@endpush
