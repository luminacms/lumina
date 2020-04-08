@extends('vote::vote.default.layout')

@section('content')

    <style>
        .m-myC #choose{display: none;}
        .m-myC canvas{width: 100%;border: 1px solid #000000;}
        .m-myC #upload{display: block;margin: 10px;height: 60px;text-align: center;line-height: 60px;cursor: pointer;}
        .m-myC .touch{background-color: #ddd;}
        .m-myC .img-list{margin: 10px 5px;}
        .m-myC .img-list li{position: relative;display: inline-block;width: 100px;height: 100px;margin: 5px 5px 20px 5px;border: 1px solid rgb(100, 149, 198);background: #fff no-repeat center;background-size: cover;}
        .m-myC .progress{position: absolute;width: 100%;height: 20px;line-height: 20px;bottom: 0;left: 0;background-color: rgba(100, 149, 198, .5);}
        .m-myC .progress span{display: block;width: 0;height: 100%;background-color: rgb(100, 149, 198);text-align: center;color: #FFF;font-size: 13px;}
        .m-myC .size{position: absolute;width: 100%;height: 15px;line-height: 15px;bottom: -18px;text-align: center;font-size: 13px;color: #666;}
        .m-myC .tips{display: block;text-align: center;font-size: 13px;margin: 10px;color: #999;}
        .m-myC .pic-list{margin: 10px;line-height: 18px;font-size: 13px;}
        .m-myC .pic-list a{display: block;margin: 10px 0;}
        .m-myC  .pic-list a img{vertical-align: middle;max-width: 30px;max-height: 30px;margin: -4px 0 0 10px;}
        .m-myC .text{height:100px;line-height:25px;}
        .m-myC input{text-indent: 10px;}
        .m-myC textarea{text-indent: 10px;}
    </style>

    <div class="m-myC p-3 bg-white pb-24">
        {{ form()->open(['route' => ['vote.apply', $vote], 'type' => 'post']) }}
        <input type="file" id="choose" accept="image/*" multiple>

        <div class="text-sm">只能上传一张图片</div>
        <a href="javascript:;" id="upload">上传</a>
        <input type="hidden" name="thumb" class="j_img">
        <!-- <span class="tips">只允许上传jpg、png及gif</span> -->
        <ul class="img-list"></ul>
        <textarea name="profile" id="" cols="30" rows="10" class="text min-w-full  break-all rounded bg-gray-200" placeholder="说两句吧...."></textarea>

        <div class="text-sm text-left mt-3">填写一下联系方式为方便后续与您联系</div>
        <input type="text" name="name" class="my-3 w-full bg-gray-200 text-gray-600 border border-solid border-gray-300 h-8" placeholder="您的姓名">
        <input type="number" maxlength="11" name="mobile" class="w-full bg-gray-200 text-gray-600 border border-solid border-gray-300 h-8" placeholder="您的手机号">

        <input type="submit" class="j-btn w-2/3 m-auto h-10 leading-loose text-white bg-red-500 mt-3 text-center rounded-full pt-2" value="提交">

        {{ form()->close() }}
    </div>

@endsection

@push('script')
    <script>
        layui.extend({
            'mupload': 'mobile/mupload',
        }).use('mupload', function(){
            var mupload = layui.mupload;

            $("#upload").on("click", function () {
                var $self = $(this)
                mupload.render({
                    elem: '#choose',
                    url: '{{ url("interface/core/upload") }}',
                    done: function(res) {
                        $self.next('.j_img').val(res)
                    }
                });
            })
        })

    </script>
@endpush

