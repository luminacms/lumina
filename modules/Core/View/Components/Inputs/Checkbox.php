<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Checkbox extends Component
{
    public $name;
    public $options;
    public $type;
    public $label;
    public $verify;
    public $value;
    public $selected;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $options, $type = 'text', $verify = null, $value = null, $selected = null)
    {
        $this->name = $name;
        $this->type = $type;
        $this->options = $options ?? [];
        $this->verify = $verify;
        $this->value = $value ?? old($name);
        $this->selected = $selected;

        $this->iptkey = Str::random(6);
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return <<<'blade'
            @foreach($options as $_k=>$_opt)
            <input id="{{$iptkey}}" type="checkbox"
                name="{{$name}}"
                title="{{$_opt}}"
                @if($selected==$_k)checked @endif
                value="{{$_k}}" />
            @endforeach
        blade;
    }

}
