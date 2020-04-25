<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class DateRange extends Component
{
    public $name;
    public $type;
    public $label;
    public $verify;
    public $value;
    public $min;
    public $max;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $type = 'date', $min = '1900-1-1', $max = '2999-12-31', $verify = null, $value = null)
    {
        $this->name = explode(',', $name);
        $this->type = $type;
        $this->verify = $verify;

        $this->value = $value ? explode(',', $value) : [old($this->name[0]), old($this->name[1])];

        $this->iptkey = Str::random(6);
        $this->min = $min;
        $this->max = $max;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return  <<<'blade'
        <div class="layui-input-inline">
            <input type="text" class="layui-input" name="{{$name[0]}}" placeholder="开始日期" id="j_start_at" readonly>
            <span>-</span>
            <input type="text" class="layui-input" name="{{$name[0]}}" placeholder="结束日期" id="j_start_end" readonly>
        </div>
        <script>
        layui.use(['laydate'], function(){
            var laydate = layui.laydate;

            var insStart = laydate.render({
              elem: '#j_start_at',
              min: '{{$min}}',
              max: '{{$max}}',
              type: '{{$type}}',
              value: '{{$value[0] ?? ''}}',
              done: function(value, date){
                insEnd.config.min = lay.extend({}, date, {
                  month: date.month - 1
                });
              }
            });
            var insEnd = laydate.render({
              elem: '#j_start_end',
              min: '{{$min}}',
              max: '{{$max}}',
              type: '{{$type}}',
              value: '{{$value[1] ?? ''}}',
              done: function(value, date){
                insStart.config.max = lay.extend({}, date, {
                  month: date.month - 1
                });
              }
            });
          });
        </script>
        blade;
    }

}
