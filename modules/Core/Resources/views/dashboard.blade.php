@extends('core::layouts.blank')

@section('content')
    <style>
        .home-index{background-color: #fff;padding: 20px 15px;}
        .muted {color: rgba(0,0,0,.45);font-weight: 400;}
        .day-text{line-height:20px;font-size: 12px;}
        .user-info .title{font-size: 20px;margin-top: 10px;margin-bottom: 5px;}
    </style>
    <div class="home-index shadow">
        <p class="day-text muted flex" id="j_quote"></p>
        <div class="header-content">
            <div class="user-info">
                <?php  $_hour = now()->hour;$_tip = $_hour < 9 ? '早上好' : ($_hour <= 11 ? '上午好' : ($_hour <= 13 ? '中午好' : ($_hour <= 20 ? '下午好' : '晚上好'))) ?>
                <div class="title">{{ $_tip }}，{{ auth()->user()->name ?? 'SuperMan'}}，祝你开心每一天！</div>
{{--                <div class="team muted">资深工程师 | 某某公司－某某某事业群－某某平台部－某某技术部－BM</div>--}}
            </div>
        </div>
    </div>

    <div class="layui-fluid">
        @section('dashboard')

        <div class="flex space-x-4">
            <div class="w-8/12">
                <x-card title="日程" class="shadow">
                    <x-calendar />
                </x-card>
            </div>
            <div class="w-4/12">
                <x-card title="服务器信息">
                    <table class="layui-table">
                        <tbody>
                            <tr><td>服务器IP地址</td><td>{{ $_SERVER['SERVER_NAME'] }}</td></tr>
                            <tr><td>服务器域名</td><td>{{ $_SERVER['HTTP_HOST'] }}</td></tr>
                            <tr><td>服务器端口</td><td>{{ $_SERVER['SERVER_PORT'] }}</td></tr>
                            <tr><td>服务器操作系统</td><td>{{ $_SERVER['HTTP_USER_AGENT'] }}</td></tr>
                            <tr><td>PHP版本</td><td>{{ PHP_VERSION }}</td></tr>
                            <tr><td>获取Zend版本</td><td>{{ Zend_Version() }}</td></tr>
                            <tr><td>Laravel版本</td><td>{{ app()->version() }}</td></tr>
                            <tr><td>最大上传限制</td><td>{{ get_cfg_var ("upload_max_filesize")?get_cfg_var ("upload_max_filesize"):"不允许" }}</td></tr>
                            <tr><td>最大执行时间</td><td>{{ get_cfg_var("max_execution_time")."秒 " }}</td></tr>
                            <tr><td>脚本运行占用最大内存</td><td>{{ get_cfg_var ("memory_limit")?get_cfg_var("memory_limit"):"无"}}</td></tr>
                            <tr><td>服务器当前时间</td><td>{{ now() }}</td></tr>
                        </tbody>
                    </table>
                </x-card>
            </div>
        </div>

        @show
    </div>

@endsection

@push('script')
    <script>
        $(function(){
            reloadQuote();
            function reloadQuote()
            {
                var $_html = '<a class="muted cursor-pointer" title="更新一条" id="j_quote_reload"><i class="anticon anticon-reload hand"><svg viewBox="64 64 896 896" data-icon="reload" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 0 1 655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 0 1 279 755.2a342.16 342.16 0 0 1-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 0 1 109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"></path></svg></i></a>';
                $.get('https://v1.hitokoto.cn/?c=d&encode=json', function(res){
                    $_html = '『'+res.hitokoto+'』 —— 《'+res.from+'》'+$_html;
                    $("#j_quote").html($_html)

                    $("#j_quote").one("click", "#j_quote_reload", reloadQuote)
                })
            }
        })
    </script>
@endpush

