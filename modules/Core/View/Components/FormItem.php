<?php

namespace Modules\Core\View\Components;

use Illuminate\View\Component;

class FormItem extends Component
{

    public $label;
    public $type;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label = '', $type = '')
    {
        $this->label = $label;
        $this->type = $type;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return
        $this->type != 'submit' ? <<<'blade'
            <div {{ $attributes->merge(["class" => "layui-form-item"]) }}>
                <label for="name" class="layui-form-label">{{$label}}</label>
                <div class="layui-input-block">
                    {{$slot}}
                </div>
            </div>
        blade
        : <<<'blade'
        <div {{ $attributes->merge(["class" => "layui-layout-admin"]) }}>
            <div class="layui-footer z-50" style="left: 0;">
                {{$slot}}
            </div>
        </div>
        blade;
    }
}
