<?php

namespace Modules\Core\View\Components\Inputs;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Color extends Component
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
            <input type="text"
                name="{{$name}}"
                @if($value)value="{{$value}}"@endif
                class="layui-input"
                id="{{$iptkey}}"
                readonly
                lay-key="{{$iptkey}}"
                @if($verify)lay-verify="{{$verify}}"@endif />
            <script>
            layui.use('laydate', function(){
                layui.laydate.render({
                    elem: '#{{$iptkey}}',
                    type: 'date',
                    format: 'yyyy-MM-dd',
                    range: true
                });
            })
            </script>
        blade;
        return '<x-formItem label="'.$this->label.'">'.$_ipt.'</x-formItem>';
    }

}
