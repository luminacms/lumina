@extends('vote::vote.default.layout')

@section('content')
<div class="info">
    <div class="con px-2 py-3" >
        <div class="tt text-sm border-b-2 text-2xl">{{ $option->title }}</div>

        <!-- datainfo -->

        <div class="m-info text-sm my-5 mb-10">
{{--            <p class="name text-sm truncate my-3">张飞</p>--}}
            <img src="{{ $option->thumb }}" alt="" class="w-full">
            <p class="intro p-3 text-base">{{ $option->description }}</p>

            <a class="bg-red-500 px-5 py-2 cursor-pointer m w-24 block" id="j_submit">赞</a>
        </div>
    </div>
</div>

@endsection

@push('script')
    <script>
        layui.extend({
            'submit': 'modules/Vote/submit'
        }).use(['layer', 'submit'], function(){
            var submit = layui.submit;

            submit.render({
                elem: '#j_submit',
                url: "{{ route('vote.submit', $vote->id) }}",
                data: {
                    '_token': '{{ csrf_token() }}',
                    'vid': {{ $option->vote_id }},
                    'sid': {{ $option->subject_id }},
                    'oid': {{ $option->id }}
                },
                done: function(res) {
                    if(res.errcode == 0) {
                        layer.msg('提交成功')
                    }else{
                        layer.msg('您已经提交过了')
                    }
                }
            });
        })
    </script>
@endpush
