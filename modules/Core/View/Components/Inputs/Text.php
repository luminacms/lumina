<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Text extends Component
{
    public $name;
    public $type;
    public $label;
    public $verify;
    public $value;
    public $required;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $type = 'text', $verify = '', $value = '', $required = '')
    {
        $this->name = $name;
        $this->type = $type;
        $this->verify = $required ? implode('|', array_filter(array_merge(explode('|', $verify), ['required']))) : '';

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
            <input {{$attributes->merge(['class'=>'layui-input'])}}
                type="{{$type}}"
                name="{{$name}}"
                @if($value)value="{{$value}}"@endif
                @if($verify)lay-verify="{{$verify}}"@endif
            />
        blade;
    }

}
