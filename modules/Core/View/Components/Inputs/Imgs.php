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
    public function __construct($name, $label = '', $type = 'text', $verify = '', $value = '', $limit = 1)
    {
        $this->name = $name;
        $this->type = $type;
        $this->verify = $verify;

        $this->value = $value ?: old($name);
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
            <div class="layui-form-img" lay-filter="ximg" data-limit="{{$limit}}">
                <input type="hidden"
                    name="{{$name}}"
                    @if($value)value="{{$value}}"@endif
                    class="layui-input"
                    @if($verify)lay-verify="{{$verify}}"@endif />
            </div>
        blade;
    }

}
