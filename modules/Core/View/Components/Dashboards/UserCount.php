<?php

namespace Modules\Core\View\Components\Dashboards;

use Livewire\Component;

class UserCount extends Component
{

    public $name = 'jory';

    public function change()
    {
        $this->name = 'Jorycn';
    }
    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return <<<'blade'
            <div class="layui-card loading" wire:poll wire:loading.class="foo">
                <div class="layui-card-header"> {{ $name }}工单数<span class="layui-badge layui-bg-blue zadmin-badge">年</span></div>
                <div class="layui-card-body zadmin-card-list">
                    <p class="zadmin-big-font font-bold text-{{ Arr::random(['red', 'green', 'orange', 'gray']) }}-600">{{ random_int(10000000, 99999999) }}</p>
                    <p wire:click="change">总计访问量<span class="zadmin-span-color">88万 <i class="layui-inline layui-icon layui-icon-flag"></i></span></p>
                </div>
            </div>
        blade;
    }
}
