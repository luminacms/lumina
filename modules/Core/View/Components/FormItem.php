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
        $_ipt = '';
        switch($this->type){
            case 'submit':
                $_ipt = $this->renderSubmitItem();
                break;
            case 'inline':
                $_ipt = $this->renderInlineItem();
                break;
            default:
                $_ipt = <<<'blade'
                    <div {{ $attributes->merge(["class" => "layui-form-item"]) }}>
                        <label for="name" class="layui-form-label">{{$label}}</label>
                        <div class="layui-input-block">{{$slot}}</div>
                    </div>
                blade;
            break;
        }
        return $_ipt;
    }

    private function renderInlineItem()
    {
        return <<<'blade'
            <div {{ $attributes->merge(["class" => "layui-form-item"]) }}>
                <div class="layui-inline">
                    <label for="name" class="layui-form-label">{{$label}}</label>
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
