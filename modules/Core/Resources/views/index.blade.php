@extends('core::layouts.blank')

@section('content')
    <div class="layui-layout layui-layout-admin">
        <div class="layui-header">
            <!-- 头部区域 -->
            <ul class="layui-nav layui-layout-left">
                <li class="layui-nav-item lumina-flexible px-2" lay-unselect>
                    <a href="javascript:;" lumina-event="flexible" title="侧边伸缩">
                        <i class="fa fa-outdent" id="xapp_flexible"></i>
                    </a>
                </li>
{{--                <li class="layui-nav-item layui-hide-xs" lay-unselect>--}}
{{--                    <a href="/" target="_blank" title="前台">--}}
{{--                        <i class="fa fa-website"></i>--}}
{{--                    </a>--}}
{{--                </li>--}}
{{--                <li class="layui-nav-item layui-hide-xs" lay-unselect>--}}
{{--                    <a href="">控制台</a>--}}
{{--                </li>--}}
            </ul>
            <ul class="layui-nav layui-layout-right" lay-filter="lumina-layout-right">
                @if(auth()->user()->hasRole('SUPER'))
                <li class="layui-nav-item hidden lg:inline-block">
                    <a>{{ auth()->org()->name??''  }}</a>
                    <dl class="layui-nav-child">
                        @foreach(\Modules\Core\Models\Organization::all() as $_org)
                            <dd><a class="dropdown-item" href="{{ route('dashboard', $_org->oid) }}">{{ $_org->name }}</a></dd>
                        @endforeach
                    </dl>
                </li>
                @endif
                <li class="layui-nav-item layui-hide-xs" lay-unselect>
                    <a href="javascript:;" lumina-event="fullscreen">
                        <i class="fa fa-arrows-alt"></i>
                    </a>
                </li>
                <li class="layui-nav-item" lay-unselect>
                    <a lumina-event="message" lay-text="消息中心" lay-href="{{ route('core.notification.index') }}">
                        <i class="fa fa-bell"></i>
                        <span class="layui-badge" style="display: none;" id="j_notice"></span>
                    </a>
                </li>
{{--                <li class="layui-nav-item layui-hide-xs" lay-unselect>--}}
{{--                    <a href="javascript:;" lumina-event="theme">--}}
{{--                    <i class="fa fa-theme"></i>--}}
{{--                    </a>--}}
{{--                </li>--}}
                <li class="layui-nav-item" lay-unselect>
                    <a href="javascript:;">
                        <cite>{{ Auth::user()->getName() }}</cite>
                    </a>
                    <dl class="layui-nav-child">
                        <dd><a lay-href="{{ route('core.user.profile') }}">基本资料</a></dd>
                        <dd><a lay-href="{{ route('core.user.resetpasswd') }}">修改密码</a></dd>
                        <hr>
                        <dd style="text-align: center;">
                            <a class="dropdown-item" href="javascript:;" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                退出
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        </dd>
                    </dl>
                </li>
                <li class="layui-nav-item layui-hide-xs" lay-unselect>
                    <a href="javascript:;"><i class="fa fa-bars"></i></a>
                </li>
            </ul>
        </div>

        <!-- 侧边菜单 -->
        <div class="layui-side layui-side-menu">
            <div class="layui-side-scroll">
                <div class="layui-logo">
                    <a href="/" target="__blank">Lumina</a>
                </div>

                @inject('menu', 'Modules\Core\Services\MenuService')
                <ul class="layui-nav layui-nav-tree" lay-shrink="all" id="xb-system-side-menu" lay-filter="lumina-system-side-menu">
                    {!! $menu->make() !!}
                </ul>
            </div>
        </div>

        <!-- 页面标签 -->
        <div class="lumina-pagetabs" id="xapp_tabs">
            <div class="fa lumina-tabs-control fa-angle-double-left" lumina-event="leftPage"></div>
            <div class="fa lumina-tabs-control fa-angle-double-right" lumina-event="rightPage"></div>
            <div class="layui-tab" lay-unauto lay-allowClose="true" lay-filter="lay_lumina_tabs">
                <ul class="layui-tab-title" id="lumina_tabs">
                    <li lay-id="core/dashboard'" lay-attr="{{ route('core.dashboard', auth()->oid()) }}" class="layui-this"><i class="fa fa-home"></i></li>
                </ul>
            </div>
        </div>


        <!-- 主体内容 -->
        <div class="layui-body" id="xapp_body">
            <div class="lumina-tabsbody-item layui-show">
                <iframe src="{{ route('core.dashboard', auth()->oid()) }}" frameborder="0" class="lumina-iframe" id="mainFrame"></iframe>
            </div>
        </div>

    </div>
@endsection

@push('script')
    <script>
    layui.use(['jquery', 'util'], function(){
        var $ = layui.jquery,
            util = layui.util,
            _now = Number('{{ now()->timestamp }}000'),
            $_notify = $("#j_notice"),
            $now = $("#j_now");

        reloadNotice();
        function reloadNotice() {
            // admin.request.get('/interface/core/notification/count', {}, function(res) {
            //     if(res.data.count > 0) {
            //         $_notify.show().text(res.data.count)
            //     }else{
            //         $_notify.hide()
            //     }
            // })
        }

        setInterval(reloadNotice, 5000);
        setInterval(function(){
            _now = _now + 1000
            $now.text(util.toDateString(_now, 'yyyy-MM-dd HH:mm:ss'))
        }, 1000)

    })
    </script>
@endpush
