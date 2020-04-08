<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="author" content="XDoc" />
        <link rel="shortcut icon" href="{{asset('favicon.ico')}}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>服务器异常 - {{wiki_config('SITE_NAME','XDoc')}}</title>
        <link href="{{asset('assets/doc/fonts/lato-100.css')}}" rel="stylesheet" type="text/css">
        <style type="text/css">
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                color: #B0BEC5;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 72px;
                margin-bottom: 40px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">HTTP 503 ： 服务器异常</div>
            </div>
        </div>
    </body>
</html>
