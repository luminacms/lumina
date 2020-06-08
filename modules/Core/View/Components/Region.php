<?php

namespace Modules\Core\View\Components;

use Illuminate\View\Component;

class Region extends Component
{

    public $name;
    public $required;
    public $mode; // id || text  返回地市的id或者纯文本

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name = 'province,city,region', $required = '', $mode = 'id')
    {
        $this->name = explode(',', $name);
        $this->required = $required ? 'required' : '';
        $this->mode = $mode;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        $_ipt = <<<'blade'
            <div class="layui-region flex" data-mode="{{$mode}}">
                <input type="hidden" name="_data" value='{!! json_encode(Modules\Core\Models\Region::getSimpleTree()) !!}'>
                <div class="w-1/3 pr-2">
                    <select name="{{$name[0]}}" lay-filter="province" data-province required>
                        <option value="">请选择省份</option>
                    </select>
                </div>
                <div class="w-1/3 pr-2" style="display:none">
                    <select name="{{$name[1]}}" lay-filter="city" data-city required> </select>
                </div>
                <div class="w-1/3" style="display:none">
                    <select name="{{$name[2]}}" lay-filter="region" data-region required></select>
                </div>
            </div>
        blade;
        return $_ipt;
    }


}
