<?php

namespace Modules\Core\View\Components;

use Illuminate\View\Component;

class Form extends Component
{
    public $model;
    public $action;
    public $method;
    public $method_addon = '';

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($action, $model = '', $method = 'GET')
    {
        if($this->model) return;
        $this->model = $model;
        $this->action = $action;
        if(!in_array(strtoupper($method), ['GET', 'POST'])){
            $this->method = 'POST';
            $this->method_addon = strtoupper($method);
        }else{
            $this->method = $method;
        }
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return <<<'blade'
        <form method="{{$method}}" action="{{$action}}" accept-charset="UTF-8" {{$attributes}} class="layui-form">
            @if($method_addon)<input name="_method" type="hidden" value="{{$method_addon}}" />@endif
            <input name="_token" type="hidden" value="{{csrf_token()}}"></input>
            {{$slot}}
        </form>
        blade;
    }
}
