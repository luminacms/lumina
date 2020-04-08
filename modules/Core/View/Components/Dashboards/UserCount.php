<?php

namespace Modules\Core\View\Components\Dashboards;

use Illuminate\Support\Arr;
use Illuminate\View\Component;

class UserCount extends Component
{
    public $model;
    public $action;
    public $method;
    public $method_addon = null;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        $text_colors = ['red', 'green', 'orange', 'gray'];
        $html = '';
        $html .= '<div class="layui-card">';
        $html .= '<div class="layui-card-header"> 工单数<span class="layui-badge layui-bg-blue zadmin-badge">年</span></div>';
        $html .= '<div class="layui-card-body zadmin-card-list">';
        $html .=  '<p class="zadmin-big-font font-bold text-'.Arr::random($text_colors).'-600">'.random_int(10000000, 99999999).'</p>';
        $html .=  '<p>总计访问量<span class="zadmin-span-color">88万 <i class="layui-inline layui-icon layui-icon-flag"></i></span></p>';
        $html .=  '</div></div>';

        return $html;
    }
}
