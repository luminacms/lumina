

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ env('APP_NAME', '后台管理系统') }}</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="author" content="jory|jorycn@163.com">
    @stack('style')

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
    <script>
        window.msg = {message: '{{ session('message') }}', errors: @json($errors->all())}
        window.userinfo = {!! json_encode(Auth::guest()?[]:Auth::user()) !!}
    </script>
</head>
<body>
@include('core::flash.default')

@yield('content')


@stack('script')
</body>
</html>
