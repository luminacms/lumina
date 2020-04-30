@extends('core::layouts.blank')

@section('content')
    <script src="//cdn.jsdelivr.net/npm/xgplayer@1.1.7/browser/index.js" charset="utf-8"></script>
    <script src="//cdn.jsdelivr.net/npm/xgplayer-music/browser/index.js" charset="utf-8"></script>

    <div class="container mx-24 my-32">
        <a href="javascript:;" id="j_play">播放视频</a>
        <a href="javascript:;" id="j_play_music">播放音频</a>

    </div>

    <script>
        layui.use('layer', function(){
            $("#j_play").click(function(){
                layer.open({
                    type: 1,
                    title: false,
                    area: '800px',
                    closeBtn: 1,
                    shade: 0.8,
                    shadeClose: true,
                    content: '<div id="xgvideo" class="overflow-hidden"></div>',
                    success: function(layero, index){
                        var videoPlayer = new Player({
                            id: 'xgvideo',
                            fluid: true,
                            autoplay: true,
                            ignores: ['theme-default','cover','backward','forward','meta','next','prev', 'template'],
                            url: [{name:'',src:'https://cdn.xaweiju.com/media/a.mp4','poster': 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg'}]
                        });
                    }
                })
            })

            // 音频
            $("#j_play_music").click(function(){
                layer.open({
                    type: 1,
                    title: false,
                    area: '600px',
                    closeBtn: 1,
                    shade: 0.8,
                    shadeClose: true,
                    content: '<div id="xgmusic" class="overflow-hidden"></div>',
                    success: function(layero, index){
                        var audioPlayer = new Music({
                            id: 'xgmusic',
                            url: [
                                {
                                    src: 'https://cdn.xaweiju.com/media/bgm/bg1.mp3',
                                    name: 'song01',
                                    vid: '000001',
                                    poster: ''
                                }
                            ],
                            volume: 0.8,
                            width: '100%',
                            height: 50,
                            preloadNext: true
                        })
                    }
                })
            })

        })


    </script>
@endsection
