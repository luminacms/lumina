<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta name="author" content="XDoc" />
    <link rel="shortcut icon" href="{{asset('favicon.ico')}}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="renderer" content="webkit" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') - {{wiki_config('SITE_NAME','XDoc')}}</title>
    <!-- Bootstrap -->
    <link href="{{asset('assets/doc/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/doc/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
    <link href="{{asset('assets/doc/styles/styles.css')}}" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="{{asset('assets/doc/bootstrap/js/html5shiv.min.js')}}"></script>
    <script src="{{asset('assets/doc/bootstrap/js/respond.min.js')}}"></script>
    <![endif]-->
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="{{asset('assets/doc/scripts/jquery.min.js')}}"></script>
    @yield('styles')
</head>
<body>
<div class="manual-reader">
    <header class="navbar navbar-static-top smart-nav" role="banner">
        <div class="container">
            <div class="navbar-header col-sm-12 col-md-6 col-lg-5">
                <a href="{{route('doc.index')}}" class="navbar-brand">{{wiki_config('SITE_NAME','XDoc')}}</a>
                <div class="searchbar pull-left visible-lg-inline-block visible-md-inline-block">
                    <form class="form-inline" action="{{route('doc.search.search')}}" method="get">
                        <input class="form-control" name="keyword" type="search" placeholder="请输入关键词...">
                        <button class="search-btn">
                            <i class="fa fa-search"></i>
                        </button>
                    </form>
                </div>
                <div class="btn-group dropdown-menu-right pull-right slidebar visible-xs-inline-block visible-sm-inline-block">
                    <a href="{{route('project.edit')}}" title="创建项目" class="btn btn-default dropdown-toggle hidden-lg"><i class="fa fa-plus"></i></a>
                </div>
            </div>
        </div>
    </header>
    <div class="container member">
        <div class="row">
            <div class="page-left visible-lg-inline-block visible-md-inline-block">
                <ul class="menu">
                    <li{!! (isset($member_projects) ? ' class="active"' : '') !!}><a href="{{route('member.projects')}}" class="item"><i class="fa fa-sitemap"></i> 我的项目</a> </li>

                    @if(isset($member->group_level) and $member->group_level === 0)
                        <li{!! (isset($member_setting) ? ' class="active"' : '') !!}><a href="{{route('member.setting')}}" class="item"><i class="fa fa-gear"></i> 开发配置</a> </li>
                        <li{!! (isset($setting_site) ? ' class="active"' : '') !!}><a href="{{route('setting.site')}}" class="item"><i class="fa fa-cogs"></i> 网站设置</a> </li>
                        <li{!! (isset($member_users) ? ' class="active"' : '') !!}><a href="{{route('member.users')}}" class="item"><i class="fa fa-group"></i> 用户管理</a> </li>
                    @endif
                    {{--                <li><a href="{{route('runapi.index')}}" class="item"><i class="fa fa-wrench"></i> 接口工具</a> </li>--}}
                </ul>
            </div>
            <div class="page-right">
                @yield('content')
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="{{asset('assets/doc/bootstrap/js/bootstrap.min.js')}}" type="text/javascript"></script>
<script type="text/javascript" src="{{asset('assets/doc/scripts/jquery.form.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/doc/layer/layer.js')}}"></script>
<script src="{{asset('assets/doc/scripts/scripts.js')}}" type="text/javascript"></script>
@yield('scripts')
</body>
</html>
