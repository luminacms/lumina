<?php

namespace Modules\Core\View\Components;

use Illuminate\View\Component;

class Card extends Component
{
    public $title;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($title = '')
    {
        $this->title = $title;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return <<<'blade'
        <div {{ $attributes->merge(['class' => 'layui-card']) }} role="card">
            @if($title)<div class="layui-card-header">{{ $title }}</div>@endif
            <div class="layui-card-body">{{ $slot }}</div>
        </div>
        blade;
    }
}
