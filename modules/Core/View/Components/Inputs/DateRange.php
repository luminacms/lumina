<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class DateRange extends Component
{
    public $name;
    public $type;
    public $label;
    public $verify;
    public $value;
    public $min;
    public $max;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $type = 'date', $min = '1900-1-1', $max = '2999-12-31', $verify = '', $value = '')
    {
        $this->name = explode(',', $name);
        $this->type = $type;
        $this->verify = $verify;

        $this->value = $value ? explode(',', $value): [old($this->name[0]), old($this->name[1])];

        $this->iptkey = Str::random(6);
        $this->min = $min;
        $this->max = $max;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return  <<<'blade'
        <div
            class="layui-input-inline layui-form-daterange"
            data-options='{"type":"{{$type}}", "min": "{{$min}}", "max": "{{$max}}"}'
        >
            <input type="text" class="layui-input start_at" name="{{$name[0]}}" placeholder="开始日期" readonly value="{{$value[0] ?? ''}}">
            <span>-</span>
            <input type="text" class="layui-input end_at" name="{{$name[1]}}" placeholder="结束日期" readonly value="{{$value[1] ?? ''}}">
        </div>
        blade;
    }

}
