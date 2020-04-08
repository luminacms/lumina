<style>
    .account-stat{overflow:hidden; color:#666;}
    .account-stat .account-stat-btn{width:100%; overflow:hidden;}
    .account-stat .account-stat-btn > div{text-align:center; margin-bottom:5px;margin-right:2%; float:left;width:23%; height:80px; padding-top:10px;font-size:16px; border-left:1px #DDD solid;}
    .account-stat .account-stat-btn > div:first-child{border-left:0;}
    .account-stat .account-stat-btn > div span{display:block; font-size:30px; font-weight:bold}
</style>

<nav class="menu" data-ride="menu">
    <ul id="treeMenu" class="tree tree-menu" data-ride="tree">
        <li><a href="#"><i class="fa fa-home m-r-md"></i>首页</a></li>
        <li class="open">
            <a href="#"><i class="fa fa-android m-r-md"></i>自动回复</a>
            <ul>
                <li><a href="{{ route('backend.wechat.msg.index', ['type'=>'MSG','msg_type'=>'TEXT']) }}">文字回复</a></li>
                <li><a href="{{ route('backend.wechat.msg.index', ['type'=>'MSG','msg_type'=>'NEW']) }}">图文回复</a></li>
                <li><a href="{{ route('backend.wechat.msg.index', ['type'=>'MSG','msg_type'=>'VOICE']) }}">音乐回复</a></li>
                <li><a href="{{ route('backend.wechat.msg.index', ['type'=>'MSG','msg_type'=>'IMAGE']) }}">图片回复</a></li>
                <li><a href="{{ route('backend.wechat.msg.index', ['type'=>'MSG','msg_type'=>'VIDEO']) }}">视频回复</a></li>
                <li><a href="{{ route('backend.wechat.msg.index', ['type'=>'MSG','msg_type'=>'TEXT']) }}">系统回复</a></li>
                <li><a href="{{ route('backend.wechat.msg.index', ['type'=>'MSG','msg_type'=>'TEXT']) }}">自定义回复</a></li>
            </ul>
        </li>
        <li class="open"><a href="#"><i class="fa fa-database m-r-md"></i>素材管理</a>
            <ul>
                <li><a href="{{ route('backend.wechat.msg.index') }}">图文素材</a></li>
                <li><a href="">音频素材</a></li>
                <li><a href="">视频素材</a></li>
            </ul>
        </li>
        <li>
            <a href="#"><i class="fa fa-tasks"></i>状态</a>
            <ul>
                <li>
                    <a href="#"><i class="fa fa-circle-blank"></i>已就绪</a>
                    <ul>
                        <li><a href="#">已取消</a></li>
                        <li><a href="#">已关闭</a></li>
                    </ul>
                </li>
                <li><a href="#"><i class="fa fa-play-sign"></i>进行中</a></li>
                <li><a href="#"><i class="fa fa-ok-sign"></i>已完成</a></li>
            </ul>
        </li>
    </ul>
</nav>