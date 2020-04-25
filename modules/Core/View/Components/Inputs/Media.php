<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Media extends Component
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
    public function __construct($name, $type = 'text', $verify = null, $value = null)
    {
        $this->name = $name;
        $this->type = $type;
        $this->verify = $verify;

        $this->value = $value ?? old($name);

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
        <div id="{{ $iptkey }}" class="m-uploader file">
            <div class="file__picker layui-btn layui-btn-primary">选择文件</div>
            <span class="help-block">请上传mp3,mp4格式文件，最大支持500M</span>
            <ul class="uploader__files" id="j_uploader_box">
                @if($value)
                @foreach(explode(',', $value) as $_val)
                <li class="uploader__file" data-id="{{ $_val }}" data-url="{{ $_val }}">
                    <div class="thumb" style="background-image: url({{ asset('/assets/imgs/file_icon/mov.png') }})"></div>
                    <div class="fileinfo">
                        <p class="name">{{ $_val }}</p>
                        <p><a href="javascript:;" data-uri="{{ $_val }}" class="J_player" data-type="mp4">预览</a></p>
                    </div>
                    <a href="javascript:;" class="j_delete"><i class="fa fa-trash"></i></a>
                </li>
                @endforeach
                @endif
            </ul>
            <input type="hidden"
                name="{{$name}}"
                @if($value)value="{{$value}}"@endif
                class="layui-input"
                @if($verify)lay-verify="{{$verify}}"@endif />
        </div>
        <script>
            layui.extend({
                uploadmedia: "extends/upload/upload_media",
            }).use(['uploadmedia', 'element'], function(){
                var $ = layui.jquery,
                    xtool = window.xtool,
                    layer = layui.layer,
                    element = layui.element,
                    uploadmedia = layui.uploadmedia,
                    $modelId = $('#{{ $iptkey }}'),
                    $imgbox = $modelId.find("#j_uploader_box"),
                    $iptVal = $modelId.find("input[name={{ $name }}]"),
                    $imgPicker = $modelId.find(".file__picker"),
                    fileIcon = {
                        'mp3': '{{ asset('/assets/imgs/file_icon/mp3.png') }}',
                        'mp4': '{{ asset('/assets/imgs/file_icon/mov.png') }}',
                    };
                var upload_limit = 2;
                $imgPicker.click(function(){
                    uploadmedia.render({
                        elem: $imgPicker,
                        url: '/interface/core/upload',
                        fileNumLimit: upload_limit,
                        done: function (res, $el) {
                            var _path = res[0];
                            var _file = xtool.parseURL(_path);
                            var _ext = xtool.getExt(res[0]);
                            var _icon = fileIcon[_ext] !== undefined ? fileIcon[_ext] : fileIcon.document
                            var PLAYER = '<p><a href="javascript:;" data-uri="'+_path+'" class="J_player" data-type="'+_ext+'">预览</a></p>'
                            var _html = '<li class="uploader__file" data-id="' + _path + '" data-url="'+_path+'">' +
                                '<div class="thumb" style="background-image: url(' + _icon + ')"></div>' +
                                '<div class="fileinfo"><p class="name">'+_file.file+'</p>'+PLAYER+'</div><a href="javascript:;" class="j_delete"><i class="fa fa-trash"></i></a></div>' +
                                '</div></li>';
                            if(upload_limit == 1) {
                                $imgbox.html(_html)
                                // $imgbox.append(_imgItem.replace('UPLOADEDFILE', res[0]))
                                $iptVal.val(res[0])
                                // $imgPicker.hide()
                            }else{
                                $imgbox.append(_html)
                                var _val = $iptVal.val()
                                _val = _val.length>1?_val.split(','):[]
                                if(_val.length >= upload_limit) return;
                                $.each(res, function(i, n){
                                    _val.push(n)
                                    if(_val.length >= upload_limit) {
                                        // 数量限制
                                        // $imgPicker.hide();
                                    }
                                    // $imgbox.append(_imgItem.replace(new RegExp(/(UPLOADEDFILE)/g), n))
                                })
                                $iptVal.val(_val.join(','))
                                element.render('media')
                            }
                        }
                    })
                })
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
                    var _val = $iptVal.val();
                    _val = _val&&_val.length>1?_val.split(','):[]
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
