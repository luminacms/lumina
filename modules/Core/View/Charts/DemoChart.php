<?php

namespace Modules\Core\View\Charts;

use Illuminate\Support\Arr;
use ConsoleTVs\Charts\Classes\Echarts\Chart;

class DemoChart extends Chart
{
    /**
     * Initializes the chart.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();


        $this->theme('light'); // default,dark,light

        $this->displayLegend(true); //Show or hide the chart legend.
        $this->displayAxes(true); // Display the chart axes.

        $this->tooltip(true); // Show or hide the tooltip.
        $this->minimalist(false); //Show the minimalistic.

        // $this->export(false); //ALlow to export the chart.
    }

    /**
     * datasets
     *
     * @return void
     */
    public function getDataset()
    {
        $type = request('type');

        $_data_array = [
            [1, 2, 3, 4],
            [4, 3, 2, 1],
            [4, 6, 2, 1],
            [4,5,6,7]
        ];
        $this->dataset('售出', $type, Arr::random($_data_array));
        $this->dataset('进入', $type, Arr::random($_data_array));

        return $this->api();
    }

}
