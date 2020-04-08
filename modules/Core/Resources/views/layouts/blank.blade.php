@include('core::layouts._head')

<div id="lumina_app">
    @include('core::flash.default')
    @yield('content')
</div>

@include('core::layouts._foot')

