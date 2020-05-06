<!DOCTYPE html>
<html lang="en">

<head>
    <title>Lumina</title>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.20.0/themes/prism-tomorrow.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo e(config('core.lumina_js_cdn')) ?>/style/lumina.css">
    <link rel="stylesheet" href="{{ mix('css/core.css') }}" media="all">

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
    <script src="<?php echo e(config('core.lumina_js_cdn')) ?>/lumina.js"></script>
    <script>
        window.userinfo = {!! json_encode(Auth::guest()?[]:Auth::user()->only(['userid','name','email','mobile','last_login_at'])) !!}
        layui.config({base: "<?php echo e(config('core.lumina_js_cdn')) ?>/"}).extend({
            admin: 'modules/admin'
        }).use(['admin']);
    </script>
    <!-- Theme CSS -->
    <style>

        /*! * Template Name: devAid - Bootstrpa 4 Theme for developers * Version: 2.0 * Author: Xiaoying Riley * Copyright: 3rd Wave Media * Twitter: @3rdwave_themes * License: Creative Commons Attribution 3.0 License * Website: https://themes.3rdwavemedia.com/*//* ======= Base =======*/body{font-family: 'Lato', arial, sans-serif;color: #444;font-size: 16px;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
        h1, h2, h3, h4, h5, h6{font-family: 'Montserrat', sans-serif;color: #50c8c9;}
        a{color: #50c8c9;-webkit-transition: all 0.4s ease-in-out;-moz-transition: all 0.4s ease-in-out;-ms-transition: all 0.4s ease-in-out;-o-transition: all 0.4s ease-in-out;}
        a:hover{text-decoration: underline;color: #36afb0;}
        .btn, a.btn{-webkit-transition: all 0.4s ease-in-out;-moz-transition: all 0.4s ease-in-out;-ms-transition: all 0.4s ease-in-out;-o-transition: all 0.4s ease-in-out;font-family: 'Montserrat', arial, sans-serif;padding: 8px 16px;font-weight: bold;}
        .btn .svg-inline--fa, a.btn .svg-inline--fa{margin-right: 5px;}
        .btn:focus, a.btn:focus{color: #fff;}
        a.btn-cta-primary, .btn-cta-primary{background: #1e6162;border: 1px solid #1e6162;color: #fff;font-weight: 600;text-transform: uppercase;}
        a.btn-cta-primary:hover, .btn-cta-primary:hover{background: #184e4e;border: 1px solid #184e4e;color: #fff;}
        a.btn-cta-secondary, .btn-cta-secondary{background: #ffbe57;border: 1px solid #ffbe57;color: #fff;font-weight: 600;text-transform: uppercase;}
        a.btn-cta-secondary:hover, .btn-cta-secondary:hover{background: #ffb43e;border: 1px solid #ffb43e;color: #fff;}
        .text-highlight{color: #1e6162;}
        .offset-header{padding-top: 90px;}
        pre code{font-size: 16px;}
        .sub-title{font-weight: 600}
        /* ======= Header =======*/.header{padding: 10px 0;background: #50c8c9;color: #fff;position: fixed;width: 100%;}
        .header.navbar-fixed-top{background: #fff;z-index: 9999;-webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);-moz-box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);}
        .header.navbar-fixed-top .logo a{color: #50c8c9;}
        .header .logo{margin: 0;font-size: 26px;padding-top: 10px;}
        .header .logo a{color: #fff;}
        .header .logo a:hover{text-decoration: none;}
        .header .main-nav .navbar-collapse{padding: 0;}
        .header .main-nav .navbar-toggler{margin-right: 0;margin-top: 0;background: none;float: right;margin-top: 8px;margin-bottom: 8px;padding: 8px 8px;right: 10px;top: 10px;background: #1e6162;}
        .header .main-nav .navbar-toggler:focus{outline: none;}
        .header .main-nav .navbar-toggler .icon-bar{display: block;background-color: #fff;height: 2px;width: 22px;-webkit-border-radius: 1px;-moz-border-radius: 1px;-ms-border-radius: 1px;-o-border-radius: 1px;border-radius: 1px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;}
        .header .main-nav .navbar-toggler .icon-bar + .icon-bar{margin-top: 4px;}
        .header .main-nav .navbar-toggler:hover .icon-bar{background-color: #fff;}
        .header .main-nav .nav .nav-item{font-weight: bold;margin-right: 30px;font-family: 'Montserrat', sans-serif;}
        .header .main-nav .nav .nav-item .nav-link{color: #247575;-webkit-transition: none;-moz-transition: none;-ms-transition: none;-o-transition: none;font-size: 14px;padding: 15px 10px;}
        .header .main-nav .nav .nav-item .nav-link.active{color: #50c8c9;background: none;}
        .header .main-nav .nav .nav-item .nav-link:hover{color: #1e6162;background: none;}
        .header .main-nav .nav .nav-item .nav-link:focus{outline: none;background: none;}
        .header .main-nav .nav .nav-item .nav-link:active{outline: none;background: none;}
        .header .main-nav .nav .nav-item.last{margin-right: 0;}
        .title{font-weight: 900;font-size: 18px;margin-bottom: 6px;}
        /* ======= Promo Section =======*/.promo{background: #50c8c9;color: #fff;padding-top: 250px;}
        .promo .title{font-size: 98px;color: #1e6162;margin-top: 0;}
        .promo .title .highlight{color: #ffbe57;}
        .promo .intro{font-size: 23px;max-width: 680px;margin: 0 auto;margin-bottom: 30px;}
        .promo .btns .btn{margin-right: 15px;font-size: 18px;padding: 8px 30px;}
        .promo .meta{margin-top: 120px;margin-bottom: 30px;color: #2a8889;}
        .promo .meta li{margin-right: 15px;}
        .promo .meta a{color: #2a8889;}
        .promo .meta a:hover{color: #1e6162;}
        .promo .social-media{background: #309b9c;padding: 2px 0;margin: 0 auto;}
        .promo .social-media li{margin-top: 15px;}
        .promo .social-media li.facebook-like{margin-top: 0;position: relative;top: -5px;}
        /* ======= About Section =======*/.about{padding: 80px 0;background: #f5f5f5;}
        .about .title{color: #1e6162;margin-top: 0;margin-bottom: 60px;font-weight: 900;}
        .about .intro{max-width: 800px;margin: 0 auto;margin-bottom: 60px;}
        .about .item{position: relative;margin-bottom: 30px;}
        .about .item .icon-holder{position: absolute;left: 30px;top: 0;}
        .about .item .icon-holder .svg-inline--fa{font-size: 24px;color: #1e6162;}
        .about .item .content{padding-left: 60px;}
        .about .item .content .sub-title{margin-top: 0;color: #1e6162;font-size: 18px;}
        /* ======= Features Section =======*/.features{padding: 80px 0;background: #50c8c9;color: #fff;}
        .features .title{color: #1e6162;margin-top: 0;margin-bottom: 30px;}
        .features a{color: #1e6162;}
        .features a:hover{color: #123b3b;}
        .features .feature-list li{margin-bottom: 10px;color: #1e6162;}
        .features .feature-list li .svg-inline--fa{margin-right: 5px;color: #fff;}
        /* ======= Docs Section =======*/.docs{padding: 80px 0;background: #f5f5f5;}
        .docs .title{color: #1e6162;margin-top: 0;margin-bottom: 30px;}
        .docs .docs-inner{max-width: 800px;background: #fff;padding: 30px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-ms-border-radius: 4px;-o-border-radius: 4px;border-radius: 4px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;margin: 0 auto;}
        .docs .block{margin-bottom: 60px;}
        .docs .code-block{margin: 30px inherit;}
        .docs .code-block pre[class*="language-"]{-webkit-border-radius: 4px;-moz-border-radius: 4px;-ms-border-radius: 4px;-o-border-radius: 4px;border-radius: 4px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;}
        /* ======= License Section =======*/.license{padding: 80px 0;background: #f5f5f5;}
        .license .title{margin-top: 0;margin-bottom: 30px;color: #1e6162;}
        .license .license-inner{max-width: 800px;background: #fff;padding: 30px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-ms-border-radius: 4px;-o-border-radius: 4px;border-radius: 4px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;margin: 0 auto;}
        .license .info{max-width: 760px;margin: 0 auto;}
        .license .cta-container{max-width: 540px;margin: 0 auto;margin-top: 60px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-ms-border-radius: 4px;-o-border-radius: 4px;border-radius: 4px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;}
        .license .cta-container .speech-bubble{background: #ecf9f9;color: #1e6162;padding: 30px;margin-bottom: 30px;position: relative;-webkit-border-radius: 4px;-moz-border-radius: 4px;-ms-border-radius: 4px;-o-border-radius: 4px;border-radius: 4px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;}
        .license .cta-container .speech-bubble:after{position: absolute;left: 50%;bottom: -10px;margin-left: -10px;content: "";display: inline-block;width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #ecf9f9;}
        .license .cta-container .icon-holder{margin-bottom: 15px;}
        .license .cta-container .icon-holder .svg-inline--fa{font-size: 56px;}
        .license .cta-container .intro{margin-bottom: 30px;}
        /* ======= Contact Section =======*/.contact{padding: 80px 0;background: #50c8c9;color: #fff;}
        .contact .contact-inner{max-width: 760px;margin: 0 auto;}
        .contact .title{color: #1e6162;margin-top: 0;margin-bottom: 30px;}
        .contact .intro{margin-bottom: 60px;}
        .contact a{color: #1e6162;}
        .contact a:hover{color: #123b3b;}
        .contact .author-message{position: relative;margin-bottom: 60px;}
        .contact .author-message .profile{position: absolute;left: 30px;top: 15px;width: 100px;height: 100px;}
        .contact .author-message .profile img{-webkit-border-radius: 50%;-moz-border-radius: 50%;-ms-border-radius: 50%;-o-border-radius: 50%;border-radius: 50%;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;}
        .contact .author-message .speech-bubble{margin-left: 155px;background: #44c4c5;color: #1e6162;padding: 30px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-ms-border-radius: 4px;-o-border-radius: 4px;border-radius: 4px;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;position: relative;}
        .contact .author-message .speech-bubble .sub-title{color: #1e6162;font-size: 16px;margin-top: 0;margin-bottom: 30px;}
        .contact .author-message .speech-bubble a{color: #fff;}
        .contact .author-message .speech-bubble:after{position: absolute;left: -10px;top: 60px;content: "";display: inline-block;width: 0;height: 0;border-top: 10px solid transparent;border-bottom: 10px solid transparent;border-right: 10px solid #44c4c5;}
        .contact .author-message .speech-bubble .source{margin-top: 30px;}
        .contact .author-message .speech-bubble .source a{color: #1e6162;}
        .contact .author-message .speech-bubble .source .title{color: #309b9c;}
        .contact .info .sub-title{color: #36afb0;margin-bottom: 30px;margin-top: 0;}
        .contact .social-icons{list-style: none;padding: 10px 0;margin-bottom: 0;display: inline-block;margin: 0 auto;}
        .contact .social-icons li{float: left;}
        .contact .social-icons li.last{margin-right: 0;}
        .contact .social-icons a{display: inline-block;background: #309b9c;width: 48px;height: 48px;text-align: center;font-size: 24px;-webkit-border-radius: 50%;-moz-border-radius: 50%;-ms-border-radius: 50%;-o-border-radius: 50%;border-radius: 50%;-moz-background-clip: padding;-webkit-background-clip: padding-box;background-clip: padding-box;margin-right: 8px;float: left;}
        .contact .social-icons a:hover{background: #ffaa24;}
        .contact .social-icons a .svg-inline--fa{color: #fff;text-align: center;margin-top: 8px;}
        /* ======= Footer =======*/.footer{padding: 15px 0;background: #123b3b;color: #fff;}
        .footer .copyright{-webkit-opacity: 0.8;-moz-opacity: 0.8;opacity: 0.8;}
        .footer .fa-heart{color: #fb866a;}
        @media (max-width: 767px){.header .main-nav .navbar-collapse{border-top: none;-webkit-box-shadow: none;-moz-box-shadow: none;box-shadow: none;width: 100%;left: 0;top: 60px;position: absolute;background: #fff;}
        .header .main-nav .navbar-collapse .navbar-nav{margin-left: 10px;}
        .header.navbar-fixed-top{height: 70px;}
        .promo .btns .btn{margin-right: 0;clear: both;display: block;margin-bottom: 30px;}
        .promo .title{font-size: 66px;}
        .promo .meta{margin-top: 60px;}
        .promo .meta li{float: none;display: block;margin-bottom: 5px;}
        .contact .author-message{text-align: center;}
        .contact .author-message .profile{position: static;margin: 0 auto;margin-bottom: 30px;}
        .contact .author-message .speech-bubble{margin-left: 0;}
        .contact .author-message .speech-bubble:after{display: none;}
        .contact .social-icons a{width: 36px;height: 36px;margin-right: 2px;font-size: 18px;}
        .contact .social-icons a .svg-inline--fa{margin-top: 7px;}}


    </style>
</head>

<body data-spy="scroll">
    <!-- ******HEADER****** -->
    <header id="header" class="header">
        <div class="container">
            <h1 class="logo float-left">
                <a class="scrollto" href="#promo">
                    <span class="logo-title">Lumina</span>
                </a>
            </h1>
            <!--//logo-->
            <nav id="main-nav" class="main-nav navbar-expand-md float-right" role="navigation">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!--//nav-toggle-->

                <div class="navbar-collapse collapse" id="navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="nav-item sr-only"><a class="nav-link scrollto" href="#promo">Home</a></li>
                        <li class="nav-item"><a class="nav-link scrollto" href="#about">关于Lumina</a></li>
                        <li class="nav-item"><a class="nav-link scrollto" href="#start">体验</a></li>
                        <li class="nav-item last"><a class="nav-link scrollto" href="#contact">联系我</a></li>
                    </ul>
                    <!--//nav-->
                </div>
                <!--//navabr-collapse-->
            </nav>
            <!--//main-nav-->
        </div>
    </header>
    <!--//header-->

    <!-- ******PROMO****** -->
    <section id="promo" class="promo section offset-header">
        <div class="container text-center">
            <h2 class="title">Lumina</h2>
            <p class="intro">十年老兵的最后一个CMS</p>
            {{-- <div class="btns">
                <a class="btn btn-cta-secondary" href="https://themes.3rdwavemedia.com/" target="_blank">Demo</a>
                <a class="btn btn-cta-primary" href="https://gitee.com/wdcms/wdcms" target="_blank">Download</a>
            </div> --}}
            <ul class="meta list-inline">
                <li class="list-inline-item"><a href="https://gitee.com/wdcms/wdcms" target="_blank">Gitee</a></li>
                <li class="list-inline-item"><a href="https://www.yuque.com/xbhub/lumina" target="_blank">文档</a></li>
            </ul>
            <!--//meta-->
        </div>
        <!--//container-->
        <div class="social-media">
            <div class="social-media-inner container text-center">

            </div>
        </div>
    </section>
    <!--//promo-->

    <!-- ******ABOUT****** -->
    <section id="about" class="about section">
        <div class="container">
            <h2 class="title text-center">做了什么</h2>
            <div class="row">
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa fa-heart"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">SASS设计</h3>
                        <p>基于Laravel强大的Guard设计，可多组织切换。配合Option配置模块，可继承父级组织配置文件。为店铺分销，站群，父子站提供良好基础！</p>
                    </div>
                </div>
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa fa-cubes"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">代码生成器（XGEE）</h3>
                        <p>为lumina而生的生成器，轻松生成符合lumina设计规范的代码。<a href="https://gitee.com/xbhub/laravel-xgee" target="_blank">查看</a></p>
                    </div>
                    <!--//content-->
                </div>
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa fa-magic"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">Lumina.js</h3>
                        <p>深度定制layui，融合laravel7组件系统。强化版CURD表格，整合搜索，排序，导出，自动浏览等功能。<a href=""https://www.jsdelivr.com/package/npm/lumina.js" target="_blank">查看</a></p>
                    </div>
                    <!--//content-->
                </div>

                <div class="clearfix visible-md"></div>

                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa fa-users"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">社交系统</h3>
                        <p>内置社交化登陆，轻松实现市面大多数社交软件授权登陆。分离式数据库设计，可轻松实现多社交账号绑定。</p>
                    </div>
                    <!--//content-->
                </div>
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa fa-dollar"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">交易系统</h3>
                        <p>内置支付引擎，目前已接入微信、支付宝、头条支付。少量配置即可接入交易系统，统一交易号对接支付API，统一回调事件、日志、订单状态处理！</p>
                    </div>
                    <!--//content-->
                </div>
                <!--//item-->

                <!--//item-->
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa fa-bell"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">营销系统</h3>
                        <p>第一个开源的lumina模块，打造在线H5制作最强体验！</p>
                    </div>
                    <!--//content-->
                </div>
                <!--//item-->
            </div>
            <!--//row-->
        </div>
        <!--//container-->
    </section>
    <!--//about-->

    <!-- ******FEATURES****** -->
    <section id="features" class="features section">
        <div class="container text-center">
            <h2 class="title">还会做哪些</h2>
            <ul class="feature-list list-unstyled">
                <li>报名，投票，问卷等表单引擎（90%）</li>
                <li>电商（秒杀，团购，分销，代理）解决方案（40%）</li>
                <li>视频点播，直播解决方案（待进行）</li>
                <li>...</li>
            </ul>
        </div>
        <!--//container-->
    </section>
    <!--//features-->

    <section id="start" class="section my-24" style="font-size:12px;">
        <div class="container text-center">
            <h2 class="title text-center">Lumina.js Table示例</h2>
            <table  id="user_depart_table" lay-filter="user_depart_table"></table>
        </div>
        <!--//container-->
    </section>


    <!-- ******DOCS****** -->
    <section id="start" class="docs section">
        <div class="container">
            <div class="docs-inner">
                <h2 class="title text-center">提前感受下lumina的设计魅力</h2>
                <div class="block">
                    <h3 class="sub-title">1、XGEE生成器</h3>
                    <div class="code-block">
                        <!--//Use Prismjs - http://prismjs.com/index.html#basic-usage -->
                        <pre>
                            <code class="language-markup">
// step1:生成model,migrate,repository,policy
php artisan biu:make-model Post --fillable=string:title,text:content --module=Ticket

// step2:生成数据库，在此步之前可自行修改migrate和model内的fillable字段
php artisan migrate

// step3:生成controller,request,resource
php artisan biu:make-controller Post --module=Ticket

// step4:生成视图['create', 'edit', 'fields', 'index'];
php artisan biu:make-view Post --module=Ticket

以上步骤已经完成了一套curd，下面配置好路由和后台菜单就跑起来了~

// 添加资源路由：
Route::resource('post', 'PostController');

// 配置后台菜单，打开module.json => 添加menus选项
"menus": [
...
{"name": "ticket_post", "icon": "", "label": "内容管理", "route": "ticket.post.index"}
...
]
                            </code>
                        </pre>
                    </div>
                </div>


                <div class="block">
                    <h3 class="sub-title">2、树结构</h3>
                    <div class="code-block">
                        <!--//Use Prismjs - http://prismjs.com/index.html#basic-usage -->
                        <pre>
                            <code class="language-markup">

// step1: 表设计
Schema::create('core_departments', function(Blueprint $table) {
    ...

    $table->pathtree();

    ...
});
// step2: 使用HasPathTree
use HasPathTree;

step3: enjoy (HasPathTree会自动维护数结构，更多树方法请查看源代码)

                            </code>
                        </pre>
                    </div>
                </div>


            </div>
            <!--//docs-inner-->
        </div>
        <!--//container-->
    </section>
    <!--//features-->

    <!-- ******CONTACT****** -->
    <section id="contact" class="contact section has-pattern">
        <div class="container">
            <div class="contact-inner">
                <h2 class="title  text-center">联系我</h2>
                <p class="intro  text-center">
                    <i class="fa fa-wechat mr-2"></i>jorycn<br/>
                    <i class="fa fa-envelope mr-2"></i>jorycn@163.com
                </p>
            </div>
            <!--//contact-inner-->
        </div>
        <!--//container-->
    </section>
    <!--//contact-->

    <!-- ******FOOTER****** -->
    <footer class="footer">
        <div class="container text-center">
            <!--/* This template is released under the Creative Commons Attribution 3.0 License. Please keep the attribution link below when using for your own project. Thank you for your support. :) If you'd like to use the template without the attribution, you can buy the commercial license via our website: themes.3rdwavemedia.com */-->
            <small class="copyright">Designed with <i class="fa fa-heart"></i> by <a
                    href="https://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</a> for developers</small>
        </div>
        <!--//container-->
    </footer>
    <!--//footer-->

    <!-- Javascript -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery.easing@1.4.1/jquery.easing.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery.scrollto@2.1.2/jquery.scrollTo.min.js">
    </script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/prismjs@1.20.0/prism.min.js"></script>

    <script>
        layui.use(['table', 'element', 'admin'], function(){
            var table = layui.table,
                admin = layui.admin,
                element = layui.element;

            var currentUrl = '{!! URL::full() !!}',
                $department_tree = $("#depart_tree"),
                $role_tree = $("#role_tree"),
                depart_id = 0,
                $title = $("#J_subtitle").find("li.layui-this > a")
                role_id = '';

            table.render({
                elem: '#user_depart_table',
                url: '{!! URL::full() !!}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                autoShow: '{{ route('core.users.show', '_id_') }}',
                page: true,
                canSearch: true,
                toolbar: 'default',
                action: [{'text': '自定义事件1', 'event': 'event1'},{'text': '自定义事件2', 'event': 'event2'}], // 自定义方法
                height: '450',
                export: {url: '{{ url('/interface/core/users/export') }}', can: true, all: true},
                cols: [
                    [
                        {"type":"checkbox",width:80,"fixed":"left"},
                        {"field":"id","title":"ID",width:80,"fixed":"left","sort": true},
                        {"field":"name","title":"name",width: 250},
                        {"field":"mobile","title":"电话",width: 250},
                        {"field":"email","title":"email"},
                        {"field":"updated_at","title":"更新时间",width:160}
                    ]
                ]
            });


            //监听行工具事件
            table.on('toolbar(user_depart_table)', function(obj){
                var checked = table.checkStatus('user_depart_table');

                layer.msg(obj.event)

            });
        });
    </script>
    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            /* ======= Scrollspy ======= */
            $('body').scrollspy({
                target: '#header',
                offset: 400
            });

            /* ======= Fixed header when scrolled ======= */

            $(window).bind('scroll', function () {
                if ($(window).scrollTop() > 50) {
                    $('#header').addClass('navbar-fixed-top');
                } else {
                    $('#header').removeClass('navbar-fixed-top');
                }
            });

            /* ======= ScrollTo ======= */
            $('a.scrollto').on('click', function (e) {

                //store hash
                var target = this.hash;

                e.preventDefault();

                $('body').scrollTo(target, 800, {
                    offset: -70,
                    'axis': 'y',
                    easing: 'easeOutQuad'
                });
                //Collapse mobile menu after clicking
                if ($('.navbar-collapse').hasClass('show')) {
                    $('.navbar-collapse').removeClass('show');
                }

            });

        });

    </script>


</body>

</html>
