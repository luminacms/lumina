<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset=utf-8>
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name=viewport content="width=device-width,initial-scale=1">
    <meta name=csrf-token content="{{ csrf_token() }}">
    <meta name=author content=jory|jorycn@163.com>
    <title>Calendar</title>

</head>

<body>

    <div class="wrap" style="width:1000px;margin:0 auto;">
        <div id=lumina_canlendar></div>
    </div>

    <script src="{{ mix('core/calendar.js', 'dist') }}"></script>
</body>

</html>
