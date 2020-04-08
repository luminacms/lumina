@extends('core::dashboard')

@section('dashboard')

    <div class="layui-row layui-col-space15">
        <div class="layui-col-sm6 layui-col-md3">
            <x-userCount />
        </div>
        <div class="layui-col-sm6 layui-col-md3">
            <div class="layui-card">
                <div class="layui-card-header">
                    工单数
                    <span class="layui-badge layui-bg-cyan zadmin-badge">月</span>
                </div>
                <div class="layui-card-body zadmin-card-list">
                    <p class="zadmin-big-font">33,555</p>
                    <p>
                        新下载
                        <span class="zadmin-span-color">10% <i class="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="layui-col-sm6 layui-col-md3">
            <div class="layui-card">
                <div class="layui-card-header">
                    工单数
                    <span class="layui-badge layui-bg-green zadmin-badge">周</span>
                </div>
                <div class="layui-card-body zadmin-card-list">

                    <p class="zadmin-big-font">999,666</p>
                    <p>
                        总收入
                        <span class="zadmin-span-color">*** <i class="layui-inline layui-icon layui-icon-dollar"></i></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="layui-col-sm6 layui-col-md3">
            <div class="layui-card">
                <div class="layui-card-header">
                    工单数
                    <span class="layui-badge layui-bg-orange zadmin-badge">日</span>
                </div>
                <div class="layui-card-body zadmin-card-list">

                    <p class="zadmin-big-font">66,666</p>
                    <p>
                        最近一个月
                        <span class="zadmin-span-color">15% <i class="layui-inline layui-icon layui-icon-user"></i></span>
                    </p>
                </div>
            </div>
        </div>

    </div>

    @parent
@endsection

@push('script')
    <script>
        layui.use(['admin', 'echarts', 'element'], function(){
            var echarts = layui.echarts,
                element = layui.element;
        })

    </script>
@endpush

