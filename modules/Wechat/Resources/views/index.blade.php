@extends('wechat::layouts.master')

@section('wechat_content')
    @parent
    @submenu([
        [
            ['name' => '公众号管理', 'uri'=>route('backend.wechat.index')],
            ['name' => '添加', 'uri'=>'', 'right'=>true, 'modal'=>'lg'],
            ['name' => '模拟器', 'uri'=>route('backend.wechat.emulator'), 'modal' => 'lg', 'right' =>true, 'style'=>'margin-right: 5px;background-color:transparent;color:#000;']
       ]" />

    <div class="page-header">
        <h4><i class="fa fa-comments"></i> 公众号信息</h4>
    </div>
    <div class="panel panel-default">
        <div class="panel-body">
            <div class="clearfix">
                <div class="col-sm-7">
                    <p>
                        <strong>asdasd</strong>
                        <span class="label label-success" style="display:inline-block; margin-right:10px;">服务号</span>
                        <span class="text-success"><i class="fa fa-check-circle"></i> 成功接入</span>
                    </p>
                    <p><strong>接口地址： </strong> <a href="javascript:;" style="color:#66667C;" class="">{{ url('/wechat/callback?aid=123123') }}</a></p>
                    <p><strong>　Token： </strong> <a href="javascript:;" title="点击复制Token" style="color:#66667C;" class="">123123</a></p>
                </div>
                <div class="col-sm-5 text-right">
                    <img src="http://ws.daqinwang.cc/uploads/qrcode_10.jpg?time=1542158805" class="img-responsive img-thumbnail" width="75" height="75" onerror="this.src='static/imgs/gw-wx.gif'">
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default" id="scroll">
        <div class="panel-heading">
            今日关键指标
        </div>
        <div class="account-stat">
            <div class="account-stat-btn">
                <div>今日新关注<span>0</span></div>
                <div>今日取消关注<span>0</span></div>
                <div>今日净增关注<span>0</span></div>
                <div>累积关注<span>8</span></div>
            </div>
        </div>
    </div>
    <div class="page-header">
        <h4><i class="fa fa-android"></i> 基本回复统计情况</h4>
    </div>
    <div class="panel panel-default" style="padding:1em;">
        <nav role="navigation" class="navbar navbar-default navbar-static-top" id="clear" style="margin: -1em -1em 1em -1em;">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a href="javascript:;" class="navbar-brand">模块命中次数趋势图</a>
                </div>
                <ul class="nav navbar-nav nav-btns">
                    <li class="" id="basic"><a href="javascript:;">文字回复</a></li>
                    <li id="news" class="active"><a href="javascript:;">图文回复</a></li>
                    <li id="music" class=""><a href="javascript:;">音乐回复</a></li>
                    <li id="images"><a href="javascript:;">图片回复</a></li>
                    <li id="voice"><a href="javascript:;">语音回复</a></li>
                    <li id="video"><a href="javascript:;">视频回复</a></li>
                    <li id="userapi"><a href="javascript:;">自定义接口回复</a></li>
                    <li class="dropdown">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">其他模块 <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="account-stat">
            <div class="account-stat-btn">
                <div>总回复规则数<span id="rule">2</span></div>
                <div>今日命中次数<span id="today">0</span></div>
                <div>本月命中次数<span id="month">0</span></div>
                <div>
                    <a href="./web.php?c=platform&amp;a=reply&amp;do=display&amp;m=news" id="show" style="display:block; margin:5px 0;"><i class="fa fa-search"></i> 查看回复规则</a>
                    <a href="./web.php?c=platform&amp;a=reply&amp;do=post&amp;m=news" id="add" style="display:block;"><i class="fa fa-plus"></i> 新增回复规则</a>
                </div>
            </div>
        </div>

        <div style="margin-top:20px;">
            <canvas id="myChart" height="253" style="width: 950px; height: 253px;" width="950"></canvas>
        </div>
    </div>
@endsection
