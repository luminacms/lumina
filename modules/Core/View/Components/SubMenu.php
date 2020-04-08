<?php

namespace Modules\Core\View\Components;

use Illuminate\View\Component;

class SubMenu extends Component
{
    public $items;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($items)
    {
        $this->items = $items;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return <<<'blade'
        @section('submenu')
            <div class="hd layui-tab-brief" id="J_subtitle">
                <ul class="layui-tab-title">
                    @foreach($items as $item)
                        @continue(isset($item['auth']) && !$item['auth'])
                        @if(isset($item['right'])&&$item['right'])
                            <li class="pull-right {{ isset($item['on'])&&$item['on']?"layui-this":(isset($item['uri'])&&$item['uri']==URL::current()?'layui-this':'')  }}">
                                @if(isset($item['uri']))
                                    <a lay-href="{{ isset($item['uri'])?$item['uri']:'javascript:;' }}" class="layui-btn layui-btn-normal layui-btn-sm">{{ $item['name'] }}</a>
                                @elseif(isset($item['url']))
                                    <a href="{{ isset($item['url'])?$item['url']:'javascript:;' }}" class="layui-btn layui-btn-normal layui-btn-sm">{{ $item['name'] }}</a>
                                @endif
                            </li>
                        @else
                            <li {{ isset($item['on'])&&$item['on']?"class=layui-this":(isset($item['uri'])&&$item['uri']==URL::current()?'class=layui-this':'')  }}>
                                @if(isset($item['uri']))
                                    <a lay-href="{{ isset($item['uri'])?$item['uri']:'javascript:;' }}">{{ $item['name'] }}</a>
                                @elseif(isset($item['url']))
                                    <a href="{{ isset($item['url'])?$item['url']:'javascript:;' }}">{{ $item['name'] }}</a>
                                @endif
                            </li>
                        @endif
                    @endforeach
                </ul>
            </div>
        @endsection
        blade;
    }
}
