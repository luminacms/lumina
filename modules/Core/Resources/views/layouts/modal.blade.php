@include('core::layouts._head')

@include('core::flash.default')
<x-card class="pt-4 min-h-screen">
    @yield('content')
</x-card>

@include('core::layouts._foot')
