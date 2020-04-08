@extends('core::layouts.master')

@section('content')
    <div class="panel border-2">
        <div class="panel-hd">定时刷新组件</div>
        <div class="panel-bd">
            @widget('\Modules\Core\Widgets\DemoWidget')
        </div>
    </div>

@endsection
