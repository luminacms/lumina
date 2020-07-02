<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class File extends Component
{
    public $name;
    public $type;
    public $label;
    public $verify;
    public $value;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $type = 'text', $verify = '', $value = '')
    {
        $this->name = $name;
        $this->type = $type;
        $this->verify = $verify;

        $this->value = $value ?: old($name);

        $this->iptkey = Str::random(6);
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return  <<<'blade'
            <div id="{{$iptkey}}" class="m-uploader file">
                <div class="file__picker layui-btn layui-btn-primary">选择文件</div>
                <span class="help-block">请上传zip,doc,docx,jpg,gif,png,jpeg,pdf格式文件，最大支持10M</span>
                <ul class="uploader__files" id="j_uploader_box"></ul>
                <input type="hidden"
                    name="{{$name}}"
                    @if($value)value="{{$value}}"@endif
                    class="layui-input"
                    @if($verify)lay-verify="{{$verify}}"@endif />
            </div>
            <script>
                layui.extend({
                    webuploader: 'extends/upload/webuploader/webuploader'
                }).use(['webuploader', 'element'], function(){
                    var $ = layui.jquery,
                        element = layui.element,
                        WebUploader = layui.webuploader;
                    var  _imgItem = '<li class="uploader__file" style="background-image: url(UPLOADEDFILE)"><div class="uploader__mask" style="display: none">' +
                        '<div class="mask__delete"><a href="javascript:;" class="j_delete"><i class="fa fa-close"></i></a></div>' +
                        '</div></li>',
                        $modelId = $('#{{ $iptkey }}'),
                        $imgbox = $modelId.find("#j_uploader_box"),
                        $iptVal = $modelId.find("input[name={{ $name }}]"),
                        $imgPicker = $modelId.find(".file__picker"),
                        totalCount = 9,
                        xtool = window.xtool,
                        fileIcon = {
                            'document': '{{ asset('/assets/imgs/file_icon/documents.png') }}',
                            'doc': '{{ asset('/assets/imgs/file_icon/doc.png') }}',
                            'pdf': '{{ asset('/assets/imgs/file_icon/pdf.png') }}',
                        }
                    var uploader = WebUploader.create({
                        auto: true,
                        swf: '{{ asset('js/Uploader.swf') }}',
                        server: '{{ url('interface/core/upload') }}',
                        pick: $imgPicker,
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'X-Requested-With': 'XMLHttpRequest'},
                        formData: {'_token': '{{ csrf_token() }}'},
                        fileNumLimit: totalCount,
                        accept: {
                            title: 'File',
                            extensions: 'zip,doc,docx,pdf',
                            mimeTypes: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/x-zip-compressed,application/x-compress'
                        }
                    });
                    uploader.on('fileQueued', function (file) {
                        var $li = $(
                            '<div id="' + file.id + '" class="file-item thumbnail">' +
                            '<img>' +
                            '<div class="info">' + file.name + '</div>' +
                            '</div>'
                            ),
                            _ext = xtool.getExt(file.name),
                            _icon = fileIcon[_ext] !== undefined ? fileIcon[_ext] : fileIcon.document
                            $img = $li.find('img');
                        var _html = '<li class="uploader__file" data-id="' + file.id + '" data-url="">' +
                            '<div class="thumb" style="background-image: url(' + _icon + ')"></div>' +
                            '<div class="fileinfo"><p class="name">'+file.name+'</p><p class="size">' + xtool.formatSize(file.size) + '</p></div><a href="javascript:;" class="j_delete"><i class="fa fa-trash"></i></a></div>' +
                            '</div><div class="layui-progress j_process" lay-filter="process_'+file.id+'"></div></li>';
                        $imgbox.append(_html)
                    });
                    // 文件上传过程中创建进度条实时显示。
                    uploader.on('uploadProgress', function (file, percentage) {
                        var $li = $('.uploader__file[data-id=' + file.id+']'),
                            $percent = $li.find('.j_process');
                        if(!$percent.find('.layui-progress-bar').length) {
                            $percent.html('<div class="layui-progress-bar  layui-bg-orange"></div>');
                        }
                        element.progress('process_'+file.id, percentage * 100 + '%');
                    });
                    uploader.on('uploadSuccess', function (file, response) {
                        var $li = $('.uploader__file[data-id=' + file.id+']'),
                            $percent = $li.find('.j_process');
                        $percent.find('.layui-progress-bar').removeClass('layui-bg-orange')
                        // 赋值
                        var _val = $iptVal.val();
                        _val = _val&&_val.length > 1 ? _val.split(',') : []
                        _val.push(response.data.url)
                        $iptVal.val(_.join(_val, ','))
                        // 隐藏上传button
                        var total = uploader.getStats()
                        if (total['successNum'] >= totalCount) {
                            // $picker.hide()
                        }
                        // $picker.hide()
                    });
                    uploader.on('uploadError', function (file) {
                        var $li = $('.uploader__file[data-id=' + file.id+']'),
                            $percent = $li.find('.j_process');
                        $percent.find('.layui-progress-bar').removeClass('layui-bg-orange').addClass('layui-bg-red')
                        layer.msg('上传失败');
                    });
                    uploader.on('uploadComplete', function (file) {
                        $('#' + file.id).find('.progress').remove();
                    });
                    // 图片操作层
                    $imgbox.on("mouseenter", ".uploader__file", function(){
                        $(this).find(".uploader__mask").show()
                    }).on("mouseleave", ".uploader__file", function(){
                        $(this).find(".uploader__mask").hide()
                    })
                    $imgbox.on("click", ".j_delete", function(){
                        var fileId = $(this).parents(".uploader__file").attr("data-id")
                        var url = $(this).parents(".uploader__file").attr("data-url")
                        $(this).parents(".uploader__file").remove();
                        uploader.removeFile(fileId)
                        var _val = $iptVal.val();
                        _val = _val.length>1?_val.split(','):[]
                        var _idx = _val.indexOf(url);
                        if(_idx > -1) {
                            _val.splice(_idx, 1);
                        }
                        $iptVal.val(_val)
                    })
                })
            </script>
        blade;
    }

}
