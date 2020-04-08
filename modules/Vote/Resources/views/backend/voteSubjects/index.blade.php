@extends('vote::backend.layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('backend.vote.vote-subjects.index')]
       ]" />

    <div class="clearfix">
    <div class="float-left w-2/6">
    {{ form()->open(['route' => 'backend.vote.vote-subjects.store']) }}

            <a href="javascript:;" id="j_addSubject" class="layui-btn layui-btn-sm block mb-4">添加主题</a>

            <div id="j_box"></div>

        <div class="layui-form-item layui-layout-admin">
            <div class="layui-input-block">
                <div class="layui-footer z-50" style="left:0;">
                    <button class="layui-btn" lay-submit lay-filter="component-form-demo1">提交</button>
                </div>
            </div>
        </div>

    <input type="hidden" name="vote_id" value="{{ request('vote_id') }}">
    {{ form()->close() }}
    </div>

    <div class="float-left w-2/6 pl-16">
        <h2>{{ $vote->title }}</h2>
        <div>活动时间：{{ $vote->start_at }}~{{ $vote->end_at }}</div>
    </div>
    </div>

@endsection


@push('script')
    <script type="text/html" id="tpl_option_tpl">
        <li class="m-4 border p-2 clearfix">
            <div class="float-left w-16 h-16">
                @{{# if(d.option.thumb !== undefined){ }}
                <div class="img__picker on overflow-hidden" id="j_img_picker_@{{ d._optIdx }}">
                    <img src="@{{ d.option.thumb }}" alt="">
                </div>
                @{{# }else{ }}
                <div class="img__picker overflow-hidden" id="j_img_picker_@{{ d._optIdx }}"></div>
                @{{# } }}
                <input type="hidden" name="subject[@{{ d.idx }}][option][@{{ d._optIdx }}][thumb]"  class="img_val form-control" value="@{{ d.option.thumb || '' }}">
                <input type="hidden" name="subject[@{{ d.idx }}][option][@{{ d._optIdx }}][option_id]"  class="form-control" value="@{{ d.option.option_id || '' }}">
            </div>
            <input type="text" name="subject[@{{ d.idx }}][option][@{{ d._optIdx }}][title]" value="@{{ d.option.title || '' }}" class="border float-left ml-6 mt-4">
        </li>
    </script>
    <script type="text/html" id="tpl_subject_tpl">
        <div class="border mb-2 j_subject_item" data-id="@{{ d.idx }}">
            <div class="layui-colla-item w-full">
                <h2 class="layui-colla-title">1.
                    <input type="text"  name="subject[@{{ d.idx }}][title]" class="border" value="@{{ d.subject.title || '' }}">
                    <input type="hidden"  name="subject[@{{ d.idx }}][subject_id]" value="@{{ d.subject.subject_id || '' }}">
                    <a href="javascript:;" class="absolute right-0 layui-btn layui-btn-sm mt-2 mr-4 j_add_option" data-idx="@{{ d.idx }}">添加选项</a>
                </h2>
                <div class="layui-colla-content layui-show">
                    <ul class="j_options"></ul>
                </div>
            </div>
        </div>
    </script>
    <script>
        layui.use(['element','admin','laytpl','upload'], function(){

            var $box = $("#j_box"),
                element = layui.element,
                upload = layui.upload,
                admin = layui.admin,
                laytpl = layui.laytpl;

            var vote = {

                renderSubject: function(subjects){
                    $.each(subjects, function(i, n) {
                        var _subject_idx = $box.find(".j_subject_item").length
                        $box.append(laytpl($("#tpl_subject_tpl").html()).render({
                            'idx': _subject_idx,
                            'subject': n
                        }))
                        var _subject = $box.find('.j_subject_item[data-id="'+_subject_idx+'"]'),
                            _option_wrap = _subject.find('.j_options');

                        $.each(n.options, function(i, n){
                            var  _option_idx = _option_wrap.find("li").length;
                            _option_wrap.append(laytpl($("#tpl_option_tpl").html()).render({
                                'idx': _subject_idx,
                                '_optIdx': _option_idx,
                                'option': n
                            }))
                            updateOption('#j_img_picker_'+_option_idx);
                        })
                    })
                },
                pullVoteData: function(){
                    var self = this
                    admin.load.show()
                    admin.request.get('/interface/vote/{{ request('vote_id') }}', {}, function(res) {
                        self.renderSubject(res.data.subjects)
                        admin.load.hide()
                    })
                },
                init: function(){
                    this.pullVoteData();
                }
            }
            vote.init();

            function updateRender(){
                // element.render('collapse');
            }
            function updateOption($el){
                $($el).click(function(){
                    var $self = $(this)
                    upload.render({
                        elem: $el,
                        url: '{{ url('/interface/core/upload') }}',
                        done: function(res, el){
                            $self.addClass("on").html('<img src="'+res[0]+'" />')
                            $($el).next('.img_val').val(res[0])
                        }
                    });
                })
            }

            $("#j_addSubject").click(function(){
                var _idx = $box.find(".j_subject_item").length
                $box.append(laytpl($("#tpl_subject_tpl").html()).render({
                    'idx': _idx,
                    'subject': {}
                }))
                updateRender();
            })
            $(document).on("click", "#j_box .j_add_option", function(){
                var _idx = $(this).data('idx'),
                     _optIdx = $(".j_options>li").length,
                     $_option_wrap = $(this).parents('.j_subject_item').find('.j_options');
                $_option_wrap.append(laytpl($("#tpl_option_tpl").html()).render({
                    'idx': _idx,
                    '_optIdx': _optIdx,
                    'option': {}
                }))
                updateOption('#j_img_picker_'+_optIdx);
            })
        });
    </script>
@endpush
