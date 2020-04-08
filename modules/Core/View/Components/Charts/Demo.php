<?php

namespace Modules\Core\View\Components\Charts;

use Illuminate\View\Component;
use Modules\Core\View\Charts\DemoChart;

class Demo extends Component
{

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
        $chart = new DemoChart;

        $chartId = 'chart_'.time();
        $chart->labels(['One', 'Two', 'Three', 'Four2'])->load(url('/chart/dataset?type=bar&chart='.urlencode(get_class($chart))));

        $html = '<div id="'.$chartId.'">'.$chart->container().'</div>';
        $html .= '<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>';
        $html .= '<script src="https://cdn.jsdelivr.net/npm/echarts@4.4.0/dist/echarts.min.js"></script>';
        $html .= '<script>var app = new Vue({el: "#'.$chartId.'"});</script>';

        $html .= $chart->script();
        $html .= '<script>
            var original_api_url = '.$chart->id.'_api_url;
            setInterval(function(){
                '.$chart->id.'_refresh(original_api_url + "&date_start=2019-01-01&date_end=2019-12-31");
            }, 100000);
        </script>';

        return $html;
    }
}
