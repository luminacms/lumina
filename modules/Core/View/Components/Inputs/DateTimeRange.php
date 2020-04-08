<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;
use Nwidart\Modules\Facades\Module;

class DateTimeRange extends Component
{
    public $name;
    public $type;
    public $label;
    public $verify;
    public $value;

    // 多个input框模式
    public $muIpt = false;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $label = null, $type = 'text', $verify = null, $value = null)
    {
        $this->iptkey = Str::random(6);

        $this->name = $name;
        $this->type = $type;
        $this->verify = $verify;
        $this->label = $label ?? __('main.'.$name);

        $this->muIpt = Str::contains($name, ';') ? explode(';', $name) : [];
        $this->value = (!empty($this->muIpt) ? explode(';', $value):$value) ?? old($name);
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        $_ipt = <<<'blade'
            <div id="{{$iptkey}}_wrap">
            @if(empty($muIpt))
                <input type="text"
                    name="{{$name}}"
                    @if($value)value="{{$value}}"@endif
                    class="layui-input"
                    id="{{$iptkey}}"
                    readonly
                    lay-key="{{$iptkey}}"
                    @if($verify)lay-verify="{{$verify}}"@endif />
            @else
                <input type="text"
                    @if(!empty($value))value="{{implode(' ~ ', $value)}}"@endif
                    class="layui-input"
                    id="{{$iptkey}}"
                    readonly
                    lay-key="{{$iptkey}}"
                    @if($verify)lay-verify="{{$verify}}"@endif />
                <input type="hidden" name="{{$muIpt[0]}}" class="start_at" value="{{$value[0]??''}}" />
                <input type="hidden" name="{{$muIpt[1]}}" class="end_at" value="{{$value[1]??''}}" />
            @endif
            </div>
            <script>
            layui.use('laydate', function(){
                var muIpt = '{{empty($muIpt)?0:1}}',
                    muIptWrap = $("#{{$iptkey}}_wrap")
                layui.laydate.render({
                    elem: '#{{$iptkey}}',
                    type: 'datetime',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    range: '~',
                    done: function(value, date, endDate){
                        var _val = value.split('~')
                        if(muIpt != '0') {
                            muIptWrap.find(".start_at").val(_val[0])
                            muIptWrap.find(".end_at").val(_val[1])
                        }
                    }
                });
            })
            </script>
        blade;
        return '<x-formItem label="'.$this->label.'">'.$_ipt.'</x-formItem>';
    }

}
