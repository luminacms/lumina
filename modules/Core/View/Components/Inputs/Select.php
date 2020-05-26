<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Select extends Component
{
    public $name;
    public $options;
    public $type;
    public $label;
    public $verify;
    public $value;
    public $search;
    public $optionHtml;
    public $isSimpleOption; //是否是简单options, 无键值即是

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $options = [], $verify = '', $value = '', $search = '', $optionHtml = '')
    {
        $this->name = $name;
        $this->options = array_merge(['' => ''], $options);
        $this->verify = $verify;
        $this->isSimpleOption = array_values($options) == $options;

        $this->value = $value ?? old($name);
        $this->search = $search;
        $this->optionHtml = $optionHtml;

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
            <select {{$attributes}}
                id="{{$iptkey}}"
                name="{{$name}}"
                @if($search)lay-search @endif
                @if($verify)lay-verify="{{$verify}}" @endif >
                @if($optionHtml)
                    {!! $optionHtml !!}
                @else
                    @foreach($options as $_k=>$_opt)
                        @if(!$isSimpleOption)
                            <option value="{{$_k}}" @if($value==$_k)selected @endif>{{$_opt}}</option>
                        @else
                            <option value="{{$_opt}}" @if($value==$_opt)selected @endif>{{$_opt}}</option>
                        @endif
                    @endforeach
                @endif
            </select>
        blade;
    }

}
