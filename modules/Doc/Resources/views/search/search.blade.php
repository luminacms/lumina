<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta name="author" content="XDoc" />
    <link rel="shortcut icon" href="{{asset('favicon.ico')}}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
    <meta name="renderer" content="webkit" >
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> 显示"{{$keyword}}"的搜索结果 - {{wiki_config('SITE_NAME','XDoc')}}</title>

    <!-- Bootstrap -->
    <link href="{{asset('assets/doc/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/doc/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/doc/styles/styles.css')}}" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="{{asset('assets/doc/bootstrap/js/html5shiv.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/doc/bootstrap/js/respond.min.js')}}" type="text/javascript"></script>
    <![endif]-->
    <script src="{{asset('assets/doc/scripts/jquery.min.js')}}" type="text/javascript"></script>
</head>
<body>
<div class="manual-reader manual-search-reader">
    <header class="navbar navbar-static-top smart-nav navbar-fixed-top" role="banner">
        <div class="container">
            <div class="navbar-header">
                <a href="{{route('doc.index')}}" class="navbar-brand">{{wiki_config('SITE_NAME','XDoc')}}</a>
                <div class="searchbar pull-left visible-lg-inline-block visible-md-inline-block">
                    <form class="form-inline" action="{{route('doc.search.search')}}" method="get">
                        <input class="form-control" name="keyword" type="search" placeholder="请输入关键词..." value="{{ $keyword }}">
                        <button class="search-btn">
                            <i class="fa fa-search"></i>
                        </button>
                    </form>
                </div>
                @include('doc::widget.usermenu')
            </div>

            <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
                <ul class="nav navbar-nav navbar-right">
                    @if(isset($member))
                        <li>
                            <a href="{{route('logout')}}" title="退出登录">
                                <i class="fa fa-sign-out"></i>
                            </a>
                        </li>
                        <li>
                            <a href="{{route('member.projects')}}" class="img" title="个人中心">
                                <img src="{{$member->headimgurl?$member->headimgurl:asset('/static/images/middle.gif')}}" class="img-circle" style="width: 43px;">
                            </a>
                        </li>
                    @else
                        <li>
                            <a href="{{route('login')}}" title="用户登录">登录</a>
                        </li>
                        @if(wiki_config("ENABLED_REGISTER"))
                            <li>
                                <a href="{{route('account.register')}}" title="用户登录">注册</a>
                            </li>
                        @endif
                    @endif
                </ul>
            </nav>
        </div>
    </header>
    <div class="container smart-container">
        <div class="search-head">
            <strong class="search-title">显示"{{$keyword}}"的搜索结果</strong>
        </div>
        <div class="row">

            @if(count($lists) > 0 && empty($lists) === false)
                <ul class="project-box">
                    @foreach($lists as $item)
                        @include('doc::widget.project',(array)$item)
                    @endforeach
                </ul>
                <div class="clearfix"></div>
                <div class="manual-page">
                    <?php echo $lists->render();?>
                </div>
            @else
                <div class="search-body">
                    <img src="{{asset('assets/doc/images/empty.png')}}" alt="暂无相关搜索结果" class="empty-image">
                    <span class= "empty-text">暂无相关搜索结果</span>
                </div>
            @endif
        </div>
        <div class="clearfix"></div>
    </div>
@include('doc::widget.footer')
</div>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="{{asset('assets/doc/bootstrap/js/bootstrap.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/doc/scripts/scripts.js')}}" type="text/javascript"></script>


</body>
</html>
