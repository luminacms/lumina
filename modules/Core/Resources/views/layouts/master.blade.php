@include('core::layouts._head')

<div id="lumina_app">
    @include('core::flash.default')

    <x-card class="m-3">
        @yield('submenu')
        @yield('content')
    </x-card>
</div>

@include('core::layouts._foot')
