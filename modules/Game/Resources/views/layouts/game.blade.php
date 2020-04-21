<!DOCTYPE html>
<html lang="en" data-dpr="2" style="font-size: 75px;">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', '西安微聚')</title>
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta http-equiv="cleartype" content="on">
    <meta name="author" content="xbhub|jorycn@163.com">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://cdn.sxmgcm.cn/libs/flexible/flexible.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/zepto@1.2.0/dist/zepto.min.js"></script>
    <script>
        $.ajaxSettings.beforeSend = function(xhr,request){xhr.setRequestHeader("X-CSRF-TOKEN", $('meta[name="csrf-token"]').attr('content'));}
        $.ajaxSettings.error = function(xhr, errorType, error){console.error(error)}
        window.userinfo = {!! json_encode(!auth()->guest()?auth()->user():[]) !!}
    </script>
    <script src="{{ mix('game/head.js', 'dist') }}"></script>

    @if(strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false)
        <script src="{{ mix('wechat/wxjssdk.js', 'dist') }}" type="text/javascript" charset="utf-8"></script>
    @endif
    @stack('style')
</head>
<body>

@yield('content')

@stack('script')

<script src="{{ mix('game/foot.js', 'dist') }}"></script>
</body>
</html>
