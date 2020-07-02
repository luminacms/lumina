<?php

namespace Modules\Core\View\Components;

use Illuminate\View\Component;

class Calendar extends Component
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
        $html = '<div id="lumina_canlendar"></div>';
        $html .= '<script src="'.mix('js/calendar.js').'"></script>';
        return $html;
    }
}
