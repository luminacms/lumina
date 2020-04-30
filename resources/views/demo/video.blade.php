<!DOCTYPE html>
<html>

<head>
    <title>xgplayer</title>
    <meta charset="utf-8">
    <meta name="description" content="ChimePlayer Demo">
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=1">
    <meta name="mobile-web-app-capable" content="yes">
    <style>
        *{margin: 0;padding: 0}
        body,html{
            width: 100%;height: 100%;
        }
    </style>
</head>
<body>
<div id="xgvideo"></div>
<script src="//cdn.jsdelivr.net/npm/xgplayer@1.1.7/browser/index.js" charset="utf-8"></script>
<script>
    // 配置变化则销毁现有播放器，并重建新的播放器
    var videoPlayer = new Player({
        id: 'xgvideo',
        fluid: true,
        autoplay: true,
        playsinline: true,
        ignores: ['theme-default','cover','backward','forward','meta','next','prev', 'template'],
        url: [{name:'',src:'https://cdn.xaweiju.com/media/a.mp4','poster': 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg'}]
    });
    try {
        WeixinJSBridge && WeixinJsBridge.invoke('getNetworkType', {}, function () {
            videoPlayer.play();
        })
    } catch (e) {
        console.warn('不支持WeixinJSBridge')
    }
</script>
</body>

</html>
