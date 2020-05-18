@include('core::layouts._head')

<div id="lumina_app" class="">
    @include('core::flash.default')

    <div class="g-layout-horizontal m-4">
        <div id="splitLeft" class="split p-6" style="width: calc(15% - 3px);">
            @yield('leftside')
        </div>
        <div id="splitRight" class="split p-6" style="width: calc(85% - 3px);">
                @yield('submenu')
                @yield('content')
        </div>
    </div>
</div>


<script>
    layui.use(['admin', 'split'], function(){
        var split = layui.split;
        var splitInt = split(['#splitLeft', '#splitRight'], {
            sizes: [15, 85],
            minSize: [15, 800, 300],
            gutterSize: 6,
            direction: 'horizontal',
        })
        $(document).on("dblclick", ".gutter-horizontal", function(){
            splitInt.collapse(0)
        })
    })
</script>

@include('core::layouts._foot')


