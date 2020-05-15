@include('core::layouts._head')

<div id="lumina_app">
    @include('core::flash.default')

    <x-card class="m-4" style="min-height:500px;">
        @yield('submenu')
        @yield('content')
    </x-card>
</div>

@include('core::layouts._foot')
