
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdn.sxmgcm.cn/libs/tailwind/1.0.4/tailwindcss.min.css">
    <style>
        html{background-color:#fff;}
        body{overflow-x:hidden;color:#444;font-size:14px;font-family:helvetica neue,arial,sans-serif;}

        #waterfall{position:relative;margin-bottom:100px;min-height:500px;}
        .pin{position:absolute;width:47.5%;background-color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);font-size:9pt;transition:opacity .4s ease-in-out;}
        .pin img{display:block;margin:0 auto;width:100%;}
        .description{display:block;overflow:hidden;margin:10px 0;padding:0 1pc;word-wrap:break-word;line-height:1.35em;}
        .m-info{box-sizing:border-box;}
        .m-con{box-sizing:border-box;margin-bottom:3rem;padding:0 1px 0 5px;}
        .text{height:100px;line-height:25px;}

        .m-rankC{box-sizing: border-box;}
        .m-rankC .pos{width: 53px;height: 30px;display: inline-block;text-align: center;font-size: 17px;color: #ddd}
        .m-rankC .list{padding-bottom: 2.5rem}



        footer a{line-height:2.5rem;}


        /**

 @Name: layer
 @Author: 贤心

 **/

        /* *html{background-image: url(about:blank); background-attachment: fixed;} */
        html #layuicss-layer{display: none; position: absolute; width: 1989px;}

        /* common */
        .layui-layer-shade, .layui-layer{position:fixed; _position:absolute; pointer-events: auto;}
        .layui-layer-shade{top:0; left:0; width:100%; height:100%; _height:expression(document.body.offsetHeight+"px");}
        .layui-layer{-webkit-overflow-scrolling: touch;}
        .layui-layer{top:150px; left: 0; margin:0; padding:0; background-color:#fff; -webkit-background-clip: content; border-radius: 2px; box-shadow: 1px 1px 50px rgba(0,0,0,.3);}
        .layui-layer-close{position:absolute;}
        .layui-layer-content{position:relative;}
        .layui-layer-border{border: 1px solid #B2B2B2; border: 1px solid rgba(0,0,0,.1); box-shadow: 1px 1px 5px rgba(0,0,0,.2);}
        .layui-layer-load{background:url(/imgs/layui/loading-1.gif) #eee center center no-repeat;}
        .layui-layer-ico{ background:url(/imgs/layui/icon.png) no-repeat;}
        .layui-layer-dialog .layui-layer-ico,
        .layui-layer-setwin a,
        .layui-layer-btn a{display:inline-block; *display:inline; *zoom:1; vertical-align:top;}

        .layui-layer-move{display: none; position: fixed; *position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; cursor: move; opacity: 0; filter:alpha(opacity=0); background-color: #fff; z-index: 2147483647;}
        .layui-layer-resize{position: absolute; width: 15px; height: 15px; right: 0; bottom: 0; cursor: se-resize;}

        /* 动画 */
        .layer-anim{-webkit-animation-fill-mode: both; animation-fill-mode: both; -webkit-animation-duration:.3s; animation-duration:.3s;}

        @-webkit-keyframes layer-bounceIn { /* 默认 */
            0% {opacity: 0; -webkit-transform: scale(.5); transform: scale(.5)}
            100% {opacity: 1; -webkit-transform: scale(1); transform: scale(1)}
        }
        @keyframes layer-bounceIn {
            0% {opacity: 0; -webkit-transform: scale(.5); -ms-transform: scale(.5); transform: scale(.5)}
            100% {opacity: 1; -webkit-transform: scale(1); -ms-transform: scale(1); transform: scale(1)}
        }
        .layer-anim-00{-webkit-animation-name: layer-bounceIn;animation-name: layer-bounceIn}

        @-webkit-keyframes layer-zoomInDown{0%{opacity:0;-webkit-transform:scale(.1) translateY(-2000px);transform:scale(.1) translateY(-2000px);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}60%{opacity:1;-webkit-transform:scale(.475) translateY(60px);transform:scale(.475) translateY(60px);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes layer-zoomInDown{0%{opacity:0;-webkit-transform:scale(.1) translateY(-2000px);-ms-transform:scale(.1) translateY(-2000px);transform:scale(.1) translateY(-2000px);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}60%{opacity:1;-webkit-transform:scale(.475) translateY(60px);-ms-transform:scale(.475) translateY(60px);transform:scale(.475) translateY(60px);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}.layer-anim-01{-webkit-animation-name:layer-zoomInDown;animation-name:layer-zoomInDown}

        @-webkit-keyframes layer-fadeInUpBig{0%{opacity:0;-webkit-transform:translateY(2000px);transform:translateY(2000px)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes layer-fadeInUpBig{0%{opacity:0;-webkit-transform:translateY(2000px);-ms-transform:translateY(2000px);transform:translateY(2000px)}100%{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}}.layer-anim-02{-webkit-animation-name:layer-fadeInUpBig;animation-name:layer-fadeInUpBig}

        @-webkit-keyframes layer-zoomInLeft{0%{opacity:0;-webkit-transform:scale(.1) translateX(-2000px);transform:scale(.1) translateX(-2000px);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}60%{opacity:1;-webkit-transform:scale(.475) translateX(48px);transform:scale(.475) translateX(48px);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}@keyframes layer-zoomInLeft{0%{opacity:0;-webkit-transform:scale(.1) translateX(-2000px);-ms-transform:scale(.1) translateX(-2000px);transform:scale(.1) translateX(-2000px);-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}60%{opacity:1;-webkit-transform:scale(.475) translateX(48px);-ms-transform:scale(.475) translateX(48px);transform:scale(.475) translateX(48px);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}}.layer-anim-03{-webkit-animation-name:layer-zoomInLeft;animation-name:layer-zoomInLeft}

        @-webkit-keyframes layer-rollIn{0%{opacity:0;-webkit-transform:translateX(-100%) rotate(-120deg);transform:translateX(-100%) rotate(-120deg)}100%{opacity:1;-webkit-transform:translateX(0px) rotate(0deg);transform:translateX(0px) rotate(0deg)}}@keyframes layer-rollIn{0%{opacity:0;-webkit-transform:translateX(-100%) rotate(-120deg);-ms-transform:translateX(-100%) rotate(-120deg);transform:translateX(-100%) rotate(-120deg)}100%{opacity:1;-webkit-transform:translateX(0px) rotate(0deg);-ms-transform:translateX(0px) rotate(0deg);transform:translateX(0px) rotate(0deg)}}.layer-anim-04{-webkit-animation-name:layer-rollIn;animation-name:layer-rollIn}

        @keyframes layer-fadeIn{0%{opacity:0}100%{opacity:1}}.layer-anim-05{-webkit-animation-name:layer-fadeIn;animation-name:layer-fadeIn}

        @-webkit-keyframes layer-shake{0%,100%{-webkit-transform:translateX(0);transform:translateX(0)}10%,30%,50%,70%,90%{-webkit-transform:translateX(-10px);transform:translateX(-10px)}20%,40%,60%,80%{-webkit-transform:translateX(10px);transform:translateX(10px)}}@keyframes layer-shake{0%,100%{-webkit-transform:translateX(0);-ms-transform:translateX(0);transform:translateX(0)}10%,30%,50%,70%,90%{-webkit-transform:translateX(-10px);-ms-transform:translateX(-10px);transform:translateX(-10px)}20%,40%,60%,80%{-webkit-transform:translateX(10px);-ms-transform:translateX(10px);transform:translateX(10px)}}.layer-anim-06{-webkit-animation-name:layer-shake;animation-name:layer-shake}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}

        /* 标题栏 */
        .layui-layer-title{padding:0 80px 0 20px; height:42px; line-height:42px; border-bottom:1px solid #eee; font-size:14px; color:#333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; background-color: #F8F8F8; border-radius: 2px 2px 0 0;}
        .layui-layer-setwin{position:absolute; right:15px; *right:0; top:15px; font-size:0; line-height: initial;}
        .layui-layer-setwin a{position:relative; width: 16px; height:16px; margin-left:10px; font-size:12px; _overflow:hidden;}
        .layui-layer-setwin .layui-layer-min cite{position:absolute; width:14px; height:2px; left:0; top:50%; margin-top:-1px; background-color:#2E2D3C; cursor:pointer; _overflow:hidden;}
        .layui-layer-setwin .layui-layer-min:hover cite{background-color:#2D93CA; }
        .layui-layer-setwin .layui-layer-max{background-position:-32px -40px;}
        .layui-layer-setwin .layui-layer-max:hover{background-position:-16px -40px;}
        .layui-layer-setwin .layui-layer-maxmin{background-position:-65px -40px;}
        .layui-layer-setwin .layui-layer-maxmin:hover{background-position:-49px -40px;}
        .layui-layer-setwin .layui-layer-close1{background-position: 1px -40px; cursor: pointer;}
        .layui-layer-setwin .layui-layer-close1:hover{opacity:0.7;}
        .layui-layer-setwin .layui-layer-close2{position:absolute; right:-28px; top:-28px; width:30px; height:30px;  margin-left:0; background-position:-149px -31px; *right:-18px; _display:none;}
        .layui-layer-setwin .layui-layer-close2:hover{ background-position:-180px -31px;}

        /* 按钮栏 */
        .layui-layer-btn{text-align: right; padding: 0 15px 12px; pointer-events: auto; user-select: none; -webkit-user-select: none;}
        .layui-layer-btn a{height: 28px; line-height: 28px; margin: 5px 5px 0; padding: 0 15px; border: 1px solid #dedede; background-color:#fff; color: #333; border-radius: 2px; font-weight:400; cursor:pointer; text-decoration: none;}
        .layui-layer-btn a:hover{opacity: 0.9; text-decoration: none;}
        .layui-layer-btn a:active{opacity: 0.8;}
        .layui-layer-btn .layui-layer-btn0{border-color: #1E9FFF; background-color: #1E9FFF; color:#fff !important;}
        .layui-layer-btn-l{text-align: left;}
        .layui-layer-btn-c{text-align: center;}

        /* 定制化 */
        .layui-layer-dialog{min-width:260px;}
        .layui-layer-dialog .layui-layer-content{position: relative; padding:20px; line-height:24px; word-break: break-all; overflow:hidden; font-size:14px; overflow-x: hidden; overflow-y:auto;}
        .layui-layer-dialog .layui-layer-content .layui-layer-ico{position:absolute; top:16px; left:15px; _left:-40px; width:30px; height:30px;}
        .layui-layer-ico1{background-position:-30px 0 }
        .layui-layer-ico2{background-position:-60px 0;}
        .layui-layer-ico3{background-position:-90px 0;}
        .layui-layer-ico4{background-position:-120px 0;}
        .layui-layer-ico5{background-position:-150px 0;}
        .layui-layer-ico6{background-position:-180px 0;}
        .layui-layer-rim{border:6px solid #8D8D8D; border:6px solid rgba(0,0,0,.3); border-radius:5px; box-shadow: none;}
        .layui-layer-msg{min-width:180px; border:1px solid #D3D4D3; box-shadow: none;}
        .layui-layer-hui{min-width:100px;  background-color: #000; filter:alpha(opacity=60); background-color: rgba(0,0,0,0.6); color: #fff; border:none;}
        .layui-layer-hui .layui-layer-content{padding:12px 25px; text-align:center;}
        .layui-layer-dialog .layui-layer-padding{padding: 20px 20px 20px 55px; text-align: left;}
        .layui-layer-page .layui-layer-content{position:relative; overflow:auto;}
        .layui-layer-page .layui-layer-btn,.layui-layer-iframe .layui-layer-btn{padding-top:10px;}
        .layui-layer-nobg{background:none;}
        .layui-layer-iframe iframe{display: block; width: 100%;}

        .layui-layer-loading{border-radius:100%; background:none;  box-shadow:none;  border:none;}
        .layui-layer-loading .layui-layer-content{width:60px; height:24px; background:url(/imgs/core/loading-0.gif) no-repeat;}
        .layui-layer-loading .layui-layer-loading1{width:37px; height:37px; background:url(/imgs/core/loading-1.gif) no-repeat;}
        .layui-layer-loading .layui-layer-loading2, .layui-layer-ico16{width:32px; height:32px; background:url(/imgs/core/loading-2.gif) no-repeat;}
        .layui-layer-tips{background: none; box-shadow:none; border:none;}
        .layui-layer-tips .layui-layer-content{position: relative; line-height: 22px; min-width: 12px; padding: 8px 15px; font-size: 12px; _float:left; border-radius: 2px; box-shadow: 1px 1px 3px rgba(0,0,0,.2); background-color: #000; color: #fff;}
        .layui-layer-tips .layui-layer-close{right:-2px; top:-1px;}
        .layui-layer-tips i.layui-layer-TipsG{ position:absolute;  width:0; height:0; border-width:8px; border-color:transparent; border-style:dashed; *overflow:hidden;}
        .layui-layer-tips i.layui-layer-TipsT, .layui-layer-tips i.layui-layer-TipsB{left:5px; border-right-style:solid; border-right-color: #000;}
        .layui-layer-tips i.layui-layer-TipsT{bottom:-8px;}
        .layui-layer-tips i.layui-layer-TipsB{top:-8px;}
        .layui-layer-tips i.layui-layer-TipsR, .layui-layer-tips i.layui-layer-TipsL{top: 5px; border-bottom-style:solid; border-bottom-color: #000;}
        .layui-layer-tips i.layui-layer-TipsR{left:-8px;}
        .layui-layer-tips i.layui-layer-TipsL{right:-8px;}

        /* skin */
        .layui-layer-lan[type="dialog"]{min-width:280px;}
        .layui-layer-lan .layui-layer-title{background:#4476A7; color:#fff; border: none;}
        .layui-layer-lan .layui-layer-btn{padding: 5px 10px 10px; text-align: right; border-top:1px solid #E9E7E7}
        .layui-layer-lan .layui-layer-btn a{background: #fff; border-color: #E9E7E7; color: #333;}
        .layui-layer-lan .layui-layer-btn .layui-layer-btn1{background:#C9C5C5;}
        .layui-layer-molv .layui-layer-title{background: #009f95; color:#fff; border: none;}
        .layui-layer-molv .layui-layer-btn a{background: #009f95; border-color: #009f95;}
        .layui-layer-molv .layui-layer-btn .layui-layer-btn1{background:#92B8B1;}


        /**

         @Name: layer拓展样式

         */

        .layui-layer-iconext{background:url(/imgs/layui/icon-ext.png) no-repeat;}

        /* prompt模式 */
        .layui-layer-prompt .layui-layer-input{display: block; width: 230px; height: 36px; margin: 0 auto; line-height: 30px; padding-left: 10px; border: 1px solid #e6e6e6; color: #333;}
        .layui-layer-prompt textarea.layui-layer-input{width: 300px; height: 100px; line-height: 20px; padding: 6px 10px;}
        .layui-layer-prompt .layui-layer-content{padding: 20px;}
        .layui-layer-prompt .layui-layer-btn{padding-top: 0;}

        /* tab模式 */
        .layui-layer-tab{box-shadow:1px 1px 50px rgba(0,0,0,.4);}
        .layui-layer-tab .layui-layer-title{padding-left:0; overflow: visible;}
        .layui-layer-tab .layui-layer-title span{position:relative; float:left; min-width:80px; max-width:260px; padding:0 20px; text-align:center; cursor:default; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; cursor: pointer;}
        .layui-layer-tab .layui-layer-title span.layui-this{height: 43px; border-left: 1px solid #eee; border-right: 1px solid #eee; background-color: #fff; z-index: 10;}
        .layui-layer-tab .layui-layer-title span:first-child{border-left:none;}
        .layui-layer-tabmain{line-height:24px; clear:both;}
        .layui-layer-tabmain .layui-layer-tabli{display:none;}
        .layui-layer-tabmain .layui-layer-tabli.layui-this{display: block;}

        /* photo模式 */
        .layui-layer-photos{-webkit-animation-duration: .8s; animation-duration: .8s;}
        .layui-layer-photos .layui-layer-content{overflow:hidden; text-align: center;}
        .layui-layer-photos .layui-layer-phimg img{position: relative; width:100%; display: inline-block; *display:inline; *zoom:1; vertical-align:top;}
        .layui-layer-imguide,.layui-layer-imgbar{display:none;}
        .layui-layer-imgprev, .layui-layer-imgnext{position:absolute; top:50%; width:27px; _width:44px; height:44px;  margin-top:-22px; outline:none;blr:expression(this.onFocus=this.blur());}
        .layui-layer-imgprev{left:10px; background-position:-5px -5px; _background-position:-70px -5px;}
        .layui-layer-imgprev:hover{background-position:-33px -5px; _background-position:-120px -5px;}
        .layui-layer-imgnext{right:10px; _right:8px; background-position:-5px -50px; _background-position:-70px -50px;}
        .layui-layer-imgnext:hover{background-position:-33px -50px; _background-position:-120px -50px;}
        .layui-layer-imgbar{position:absolute; left:0; bottom:0; width:100%; height:32px; line-height:32px; background-color:rgba(0,0,0,.8); background-color:#000\9; filter:Alpha(opacity=80); color:#fff; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; font-size:0;}
        .layui-layer-imgtit{/*position:absolute; left:20px;*/}
        .layui-layer-imgtit *{display:inline-block; *display:inline; *zoom:1; vertical-align:top; font-size:12px;}
        .layui-layer-imgtit a{max-width:65%;  text-overflow: ellipsis; overflow: hidden; white-space: nowrap; color:#fff;}
        .layui-layer-imgtit a:hover{color:#fff; text-decoration:underline;}
        .layui-layer-imgtit em{padding-left:10px; font-style: normal;}

        /* 关闭动画 */
        @-webkit-keyframes layer-bounceOut {
            100% {opacity: 0; -webkit-transform: scale(.7); transform: scale(.7)}
            30% {-webkit-transform: scale(1.05); transform: scale(1.05)}
            0% {-webkit-transform: scale(1); transform: scale(1);}
        }
        @keyframes layer-bounceOut {
            100% {opacity: 0; -webkit-transform: scale(.7); -ms-transform: scale(.7); transform: scale(.7);}
            30% {-webkit-transform: scale(1.05); -ms-transform: scale(1.05); transform: scale(1.05);}
            0% {-webkit-transform: scale(1); -ms-transform: scale(1);transform: scale(1);}
        }
        .layer-anim-close{-webkit-animation-name: layer-bounceOut; animation-name: layer-bounceOut; -webkit-animation-fill-mode: both; animation-fill-mode: both; -webkit-animation-duration:.2s; animation-duration:.2s;}

        @media screen and (max-width: 1100px) {
            .layui-layer-iframe{overflow-y: auto; -webkit-overflow-scrolling: touch;}
        }

    </style>
    @stack('style')
    <script src="https://cdn.sxmgcm.cn/libs/jquery/jquery.min.js"></script>
    <script src="{{ config('core.static')=='1'?asset('static').'/':'https://cdn.sxmgcm.cn/lumina/' }}lumina.js"></script>
    <script>
        $.ajaxSetup({'headers': {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}})
        layui.config({base: '{{ config('core.static')=='1'?asset('static').'/':'https://cdn.sxmgcm.cn/lumina/' }}'})
    </script>
</head>

<body>

@include('core::flash.default')
@include('vote::vote.default._head')

<div class="app">
    @yield('content')
</div>

@include('vote::vote.default._foot')

@stack('script')
</body>
</html>

