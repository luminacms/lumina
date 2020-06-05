<?php

namespace Modules\Core\View\Components;

use Illuminate\View\Component;

class Region extends Component
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
        $_ipt = <<<'blade'
            <div class="layui-region flex">
                <input type="hidden" name="_data" value='{!! json_encode(Modules\Core\Models\Region::getSimpleTree()) !!}'>
                <div class="w-1/3 px-2">
                    <select name="shop[province_id]" lay-filter="province" data-province required>
                        <option value="">请选择省份</option>
                    </select>
                </div>
                <div class="w-1/3 px-2">
                <select name="shop[city_id]" lay-filter="city" data-city required>
                    <option value="">请选择城市</option>
                </select>
                </div>
                <div class="w-1/3 px-2">
                <select name="shop[region_id]" lay-filter="region" data-region required>
                    <option value="">请选择地区</option>
                </select>
                </div>
            </div>
        blade;
        return $_ipt;
    }


}
