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
    public $muIpt = false;

    public $iptkey;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($name, $label = null, $type = 'text', $verify = null, $value = null)
    {
        $this->name = $name;
        $this->type = $type;
        $this->verify = $verify;
        $this->label = $label ?? __('main.'.$name);
        $this->value = $value ?? old($name);

        $this->iptkey = Str::random(6);
        $this->muIpt = Str::contains(';', $name) ? explode(';', $name) : false;
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
            @if($muIpt=='false')
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
                    @if($value)value="{{$value}}"@endif
                    class="layui-input"
                    id="{{$iptkey}}"
                    readonly
                    lay-key="{{$iptkey}}"
                    @if($verify)lay-verify="{{$verify}}"@endif />
                <input type="hidden" name="{{$muIpt[0]}}" class="start_at"/>
                <input type="hidden" name="{{$muIpt[1]}}" class="end_at"/>
            @endif
            </div>
            <script>
            layui.use('laydate', function(){
                var muIpt = '{{$muIpt}}',
                    muIptWrap = $("#{{$iptkey}}_wrap")
                layui.laydate.render({
                    elem: '#{{$iptkey}}',
                    type: 'date',
                    format: 'yyyy-MM-dd',
                    range: '~',
                    done: function(value, date, endDate){
                        var _val = value.split('~')
                        if(muIpt != 'false') {
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
