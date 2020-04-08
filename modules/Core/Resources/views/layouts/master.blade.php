@include('core::layouts._head')

<div id="lumina_app" class="min-h-screen">
    @include('core::flash.default')

    <x-card class="m-2">
        @yield('submenu')
        @yield('content')
    </x-card>
</div>

@include('core::layouts._foot')
