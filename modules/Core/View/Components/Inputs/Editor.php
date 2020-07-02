<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Editor extends Component
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
        <textarea name="{{$name}}" id="{{$iptkey}}" class="layui-textarea" style="min-height: 350px;">{{$value}}</textarea>
        <script>
            layui.use(['admin', 'wangEditor'], function(){
                var $self = $("#{{$iptkey}}");
                var editor = new wangEditor("{{$iptkey}}");
                editor.onchange = function () {
                    $self.val(this.$txt.html())
                }
                editor.create()
                $self.val(editor.$txt.html())
            })
        </script>
        blade;
    }

}
