<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,minimal-ui">
    <meta name="referrer" content="no-referrer">
    <title>播放器</title>

</head>
<body>
<div id="mse"></div>
<script src="//cdn.jsdelivr.net/npm/xgplayer@1.1.7/browser/index.js" charset="utf-8"></script>
<script src="//cdn.jsdelivr.net/npm/xgplayer-music/browser/index.js" charset="utf-8"></script>
<script type="text/javascript">
    let player = new window.Music({
        id: 'mse',
        url: [
            {
                src: 'http://192.168.10.1:8000/storage/uploads/2019/7/23/tcDm4KL3Qsv1azF94RrlpqOk5Jnt2TwMSkDCgptx.mp3',
                name: 'song01',
                vid: '000001',
                poster: 'poster01.jpg'
            }
        ],
        volume: 0.8,
        width: window.innerWidth,
        height: 50
    });
</script>
</body>
</html>
