<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ option('CORE_GLOBAL_TITLE', 'Lumina') }}</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="author" content="jory|jorycn@163.com">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo e(config('core.lumina_js_cdn')) ?>/style/lumina.css">
    <link rel="stylesheet" href="{{ mix('css/core.css') }}" media="all">

    @stack('style')

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
    <script src="<?php echo e(config('core.lumina_js_cdn')) ?>/lumina.js"></script>
    <script>
        window.userinfo = {!! json_encode(Auth::guest()?[]:Auth::user()->only(['userid','name','email','mobile','last_login_at'])) !!}
        layui.config({base: "<?php echo e(config('core.lumina_js_cdn')) ?>/"}).extend({
            admin: 'modules/admin'
        }).use(['admin']);
    </script>
</head>
<body class="@yield('body')">
