<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Radio extends Component
{
    public $name;
    public $options;
    public $type;
    public $label;
    public $verify;
    public $value;
    public $search;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $options, $label = null, $type = 'text', $verify = null, $value = null, $search = null)
    {
        $this->name = $name;
        $this->type = $type;
        $this->options = $options ?? [];
        $this->verify = $verify;

        $this->value = $value ?? old($name);
        $this->search = $search;

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
            @foreach($options as $_k=>$_opt)
            <input type="radio"
                {{ $attributes }}
                name="{{$name}}"
                title="{{$_opt}}"
                @if($value==$_k)checked @endif
                value="{{$_k}}" />
            @endforeach
        blade;
    }

}
