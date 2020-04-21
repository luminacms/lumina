<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Imgs extends Component
{
    public $name;
    public $type;
    public $label;
    public $verify;
    public $value;
    public $limit;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $label = null, $type = 'text', $verify = null, $value = null, $limit = 1)
    {
        $this->name = $name;
        $this->type = $type;
        $this->verify = $verify;

        $this->value = $value ?? old($name);
        $this->limit = $limit;

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
            <div class="J_form_wrap m-uploader clearfix" id="{{$iptkey}}">
                <!--用来存放文件信息-->
                <ul class="uploader__files J_form_box" id="j_uploader_box"></ul>
                <div data-id="{{$iptkey}}_picker" class="J_form_img img__picker" data-limit="{{$limit}}"></div>
            </div>
            <input type="hidden"
                name="{{$name}}"
                @if($value)value="{{$value}}"@endif
                class="layui-input J_form_val"
                @if($verify)lay-verify="{{$verify}}"@endif />
        blade;
    }

}
