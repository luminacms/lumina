@include('core::layouts._head')

@section('body', 'h-full')
<div id="lumina_app" class="min-h-screen">
    @include('core::flash.default')
    <x-card class="h-full">
        @yield('submenu')
        @yield('content')
    </x-card>
</div>

@include('core::layouts._foot')
