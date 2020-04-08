<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Rate extends Component
{
    public $name;
    public $type;
    public $label;
    public $verify;
    public $value;

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
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        $_ipt = <<<'blade'
            <div id="{{$iptkey}}"></div>
            <input type="hidden"
                name="{{$name}}"
                @if($value)value="{{$value}}"@endif
                class="layui-input"
                @if($verify)lay-verify="{{$verify}}"@endif />
        <script>
            layui.use('rate', function(){
                var rate = layui.rate,
                    $ = layui.jquery;
                var $rate = $("#{{$iptkey}}").next("[name={{ $name }}]")
                window.rateobj = rate.render({
                    elem: '#{{$iptkey}}',
                    value: '{{ $value }}',
                    text: true,
                    setText: function(value){ //自定义文本的回调
                        var arrs = {'1': '极差','2': '差','3': '中等','4': '好','5': '极好'};
                        // this.span.text(arrs[value] || ( value + "星"));
                        this.span.text( value + "星");
                        $rate.val(value)
                    }
                });
            })
        </script>
        blade;
        return '<x-formItem label="'.$this->label.'">'.$_ipt.'</x-formItem>';
    }

}
