<?php

namespace Modules\Core\View\Components;

use Illuminate\Support\Arr;
use Illuminate\View\Component;

class FormItem extends Component
{

    public $label;
    public $type;
    public $required;
    public $inline;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($label = '', $type = '', $inline = 'false', $required = '')
    {
        $this->label = $label;
        $this->type = $type;
        $this->inline = $inline;
        $this->required = $required ? 'required' : '';
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        $_ipt = '';

        if($this->type == 'submit') {
            $_ipt = $this->renderSubmitItem();
        }else if($this->inline !== 'false' || $this->type == 'inline') {
            $_ipt = $this->renderInlineItem();
        }else{
            $_ipt = <<<'blade'
            <div {{ $attributes->merge(["class" => "layui-form-item"]) }}>
                <label for="name" class="layui-form-label {{$required}}">{{$label}}</label>
                <div class="layui-input-block">{{$slot}}</div>
            </div>
            blade;
        }
        return $_ipt;
    }

    private function renderInlineItem()
    {
        return <<<'blade'
            <div {{ $attributes->merge(["class" => "layui-form-item"]) }}>
                <label for="name" class="layui-form-label {{$required ?? ''}}">{{$label}}</label>
                <div class="layui-input-block">
                    <div class="layui-input-inline">{{$slot}}</div>
                </div>
            </div>
        blade;
    }

    private function renderSubmitItem()
    {
        return <<<'blade'
        <div {{ $attributes->merge(["class" => "layui-layout-admin"]) }}>
            <div class="layui-footer z-50" style="left: 0;">
                {{$slot}}
            </div>
        </div>
        blade;
    }
}
