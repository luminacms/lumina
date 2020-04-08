@include('core::layouts._head')

<div id="lumina_app">
    <div class="layui-row layui-col-space10 layui-card">
        <div class="layui-tab layui-tab-brief">
            @yield('submenu')
            <div class="layui-tab-content g-layout-vertical">
                <div id="splitTop" class="split">
                    @yield('content')
                </div>
                <div id="splitDown" class="split" style="position: fixed;bottom:0;height: 150px;">
                    @yield('downside')
                </div>
            </div>
        </div>
    </div>
</div>



@stack('script')
<script>
    layui.extend({
        split: "lib/extend/split"
    }).use('split', function(){
        var split = layui.split;
        split(['#splitTop', '#splitDown'], {
            sizes: [85, 15],
            minSize: [500, 120, 300],
            gutterSize: 10,
            direction: 'vertical',
        })
    })
</script>

</body>
</html>

