<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class MEditor extends Component
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
        <textarea name="{{$name}}" id="{{$iptkey}}" class="layui-textarea" style="min-height: 150px;">{{$value}}</textarea>
        <script>
            layui.use(['admin', 'wangEditorLight'], function(){
                var $ = layui.jquery,
                    wangEditorLight = layui.wangEditorLight;
                var editor = new wangEditorLight("{{$iptkey}}");
                var $editor_value = $("textarea[name=content]");
                editor.onchange = function () {
                    // 监控变化，同步更新到 textarea
                    $editor_value.val(this.$txt.html())
                }
                editor.create()
                // 初始化 textarea 的值
                $editor_value.val(editor.$txt.html())
            })
        </script>
        blade;
    }

}
