layui.extend({
    webuploader: 'extends/upload/webuploader/webuploader'
}).define(['webuploader', 'admin'], function (exports) {
    "use strict";
    var $ = layui.jquery,
        layer = layui.layer,
        admin = layui.admin,
        WebUploader = layui.webuploader,

        //字符常量
        MOD_NAME = 'upload',

        //外部接口
        Upload = {
            config: {},
            set: function (options) {
                var self = this;
                self.config = $.extend({}, self.config, options);
                return self;
            },
            on: function (events, callback) {
                return layui.onevent.call(this, MOD_NAME, events, callback);
            },
            open: function() {

            }
        },
        //构造器
        Class = function (options) {
            var self = this;
            self.uploadObj = {};
            self.uploadFiles = [];
            self.config = $.extend({}, self.config, Upload.config, options);
            self.render();
        };

    //默认配置
    Class.prototype.config = {
        fileNumLimit: 9,
        imgVal: '.img_val'
    };

    //评分渲染
    Class.prototype.render = function () {
        var _config = this.config,
            self = this,
            _dialogObj,
            _dialogTab,
            tabType = 0,
            _dialogHtml = '<div id="uploader">' +
                '                <div class="queueList">' +
                '                    <div id="dndArea" class="placeholder">' +
                '                        <div id="filePicker"></div>' +
                '                        <p>或将照片拖到这里，单次最多可选300张</p>' +
                '                    </div>' +
                '                </div>' +
                '                <div class="statusBar" style="display:none;">' +
                '                    <div class="progress">' +
                '                        <span class="text">0%</span>' +
                '                        <span class="percentage"></span>' +
                '                    </div><div class="info"></div>' +
                '                </div>' +
                '            </div>',
            _pushContentHtml = ['<div class="p-4"><input type="text" placeholder="请输入网络图片地址" id="push_img" class="border w-full h-12 px-4"></div>'].join('')
        // 注册样式
        // layui.link(layui.cache.base + "extends/upload/upload.css")
            // var ele = parent === self ? layer : parent.layer;
        self.$el = $(this);
        _dialogObj = layer.tab({
            area: ['660px', '535px'],
            skin: 'm-upload-dialog layui-layer-tab',
            tab: [{
                title: '图片上传',
                content: _dialogHtml,
            }, {
                title: '网络图片',
                content: _pushContentHtml
            }, {
                title: '相册',
                content: '内容3'
            }],
            btn: ['确认使用', '取消'],
            yes: function(index, layero){
                if (tabType == 0) {
                    // 本地上传
                    self.done(_dialogObj, index);
                } else if(tabType == 1) {
                    // 远程下载
                    var $_img = $("#push_img").val();
                    admin.request.post(_config.url, {'type': 'fetch', 'url': $_img}, function(res){
                        self.uploadFiles.push(res.data.url);
                        self.done(_dialogObj, index);
                    })
                }else if(tabType == 2){
                    // 相册原则
                    self.done(_dialogObj, index);
                }

            },
            btn2: function(index, layero){
                return true;
            },
            success: function (layero, index) {
                // tab 切换监听
                _dialogTab = layero.find('.layui-layer-title').children();
                _dialogTab.on('mousedown', function(e){
                    tabType = layero.find('.layui-this').index()
                })
                // 初始化上传组件
                self.uploadFiles = []
                self.uploadObj = WebUploader.create({
                    pick: {
                        id: '#filePicker',
                        label: '点击选择图片'
                    },
                    auto: true,
                    dnd: '#dndArea',
                    paste: '#uploader',
                    swf: layui.cache.base + '/extends/upload/webuploader/Uploader.swf',
                    server: _config.url,
                    headers: $.extend({'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'X-Requested-With': 'XMLHttpRequest'}, _config.headers),
                    fileNumLimit: 9,
                    fileSizeLimit: 209715200,    // 200 M
                    fileSingleSizeLimit: 52428800,    // 50 M
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                    }
                });
                self.events();
                self.uploadObj.refresh();
            }
        });
    };

    //事件处理
    Class.prototype.events = function (layero) {
        var self = this,
            uploader = self.uploadObj,
            options = self.config;

        var $wrap = $('#uploader'),

            // 图片容器
            $queue = $( '<ul class="filelist"></ul>' )
                .appendTo( $wrap.find( '.queueList' ) ),

            // 状态栏，包括进度和控制按钮
            $statusBar = $wrap.find( '.statusBar' ),

            // 文件总体选择信息。
            $info = $statusBar.find( '.info' ),

            // 上传按钮
            $upload = $wrap.find( '.uploadBtn' ),

            // 没选择文件之前的内容。
            $placeHolder = $wrap.find( '.placeholder' ),

            $progress = $statusBar.find( '.progress' ).hide(),

            // 添加的文件数量
            fileCount = 0,

            // 添加的文件总大小
            fileSize = 0,

            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,

            // 缩略图大小
            thumbnailWidth = 110 * ratio,
            thumbnailHeight = 110 * ratio,

            // 可能有pedding, ready, uploading, confirm, done.
            state = 'pedding',

            // 所有文件的进度信息，key为file id
            percentages = {},

            supportTransition = (function(){
                var s = document.createElement('p').style,
                    r = 'transition' in s ||
                        'WebkitTransition' in s ||
                        'MozTransition' in s ||
                        'msTransition' in s ||
                        'OTransition' in s;
                s = null;
                return r;
            })();

        uploader.onUploadProgress = function( file, percentage ) {
            var $li = $('#'+file.id),
                $percent = $li.find('.progress span');

            $percent.css( 'width', percentage * 100 + '%' );
            percentages[ file.id ][ 1 ] = percentage;
            updateTotalProgress();
        };

        uploader.onFileQueued = function( file ) {
            fileCount++;
            fileSize += file.size;

            if ( fileCount === 1 ) {
                $placeHolder.addClass( 'element-invisible' );
                $statusBar.show();
            }

            addFile( file );
            setState( 'ready' );
            updateTotalProgress();
        };

        uploader.onFileDequeued = function( file ) {
            fileCount--;
            fileSize -= file.size;

            if ( !fileCount ) {
                setState( 'pedding' );
            }

            removeFile( file );
            updateTotalProgress();

        };

        uploader.onUploadSuccess = function(file, response) {
            if(response.errcode == 0){
                self.uploadFiles.push(response.data.url)
            }
        }

        uploader.on( 'all', function( type ) {
            var stats;
            switch( type ) {
                case 'uploadFinished':
                    setState( 'confirm' );
                    break;

                case 'startUpload':
                    setState( 'uploading' );
                    break;

                case 'stopUpload':
                    setState( 'paused' );
                    break;

            }
        });

        uploader.onError = function( code ) {
            layer.msg( 'Eroor: ' + code );
        };

        function removeFile( file ) {
            var $li = $('#'+file.id);

            delete percentages[ file.id ];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }

        function updateTotalProgress() {
            var loaded = 0,
                total = 0,
                spans = $progress.children(),
                percent;

            $.each( percentages, function( k, v ) {
                total += v[ 0 ];
                loaded += v[ 0 ] * v[ 1 ];
            } );

            percent = total ? loaded / total : 0;

            spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
            spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
            updateStatus();
        }

        function updateStatus() {
            var text = '', stats;

            if ( state === 'ready' ) {
                text = '选中' + fileCount + '张图片，共' +
                    WebUploader.formatSize( fileSize ) + '。';
            } else if ( state === 'confirm' ) {
                stats = uploader.getStats();
                if ( stats.uploadFailNum ) {
                    text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                        stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                }

            } else {
                stats = uploader.getStats();
                text = '共' + fileCount + '张（' +
                    WebUploader.formatSize( fileSize )  +
                    '），已上传' + stats.successNum + '张';

                if ( stats.uploadFailNum ) {
                    text += '，失败' + stats.uploadFailNum + '张';
                }
            }

            $info.html( text );
        }

        function setState( val ) {
            var file, stats;

            if ( val === state ) {
                return;
            }

            $upload.removeClass( 'state-' + state );
            $upload.addClass( 'state-' + val );
            state = val;

            switch ( state ) {
                case 'pedding':
                    $placeHolder.removeClass( 'element-invisible' );
                    $queue.hide();
                    $statusBar.addClass( 'element-invisible' );
                    uploader.refresh();
                    break;

                case 'ready':
                    $placeHolder.addClass( 'element-invisible' );
                    $queue.show();
                    $statusBar.removeClass('element-invisible');
                    uploader.refresh();
                    break;

                case 'uploading':
                    $progress.show();
                    $upload.text( '暂停上传' );
                    break;

                case 'paused':
                    $progress.show();
                    $upload.text( '继续上传' );
                    break;

                case 'confirm':
                    $progress.hide();
                    $upload.text( '开始上传' ).addClass( 'disabled' );

                    stats = uploader.getStats();
                    if ( stats.successNum && !stats.uploadFailNum ) {
                        setState( 'finish' );
                        return;
                    }
                    break;
                case 'finish':
                    stats = uploader.getStats();
                    if ( !stats.successNum ) {
                        // 没有成功的图片，重设
                        state = 'done';
                        location.reload();
                    }
                    break;
            }

            updateStatus();
        }

        function addFile( file ) {
            var $li = $( '<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span></span></p>' +
                '</li>' ),
                text = '',
                $btns = $('<div class="file-panel">' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
                $prgress = $li.find('p.progress span'),
                $wrap = $li.find( 'p.imgWrap' ),
                $info = $('<p class="error"></p>'),

                showError = function( code ) {
                    switch( code ) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;

                        case 'interrupt':
                            text = '上传暂停';
                            break;

                        default:
                            text = '上传失败，请重试';
                            break;
                    }

                    $info.text( text ).appendTo( $li );
                };

            if ( file.getStatus() === 'invalid' ) {
                showError( file.statusText );
            } else {
                // @todo lazyload
                $wrap.text( '预览中' );
                uploader.makeThumb( file, function( error, src ) {
                    if ( error ) {
                        $wrap.text( '不能预览' );
                        return;
                    }

                    var img = $('<img src="'+src+'">');
                    $wrap.empty().append( img );
                }, thumbnailWidth, thumbnailHeight );

                percentages[ file.id ] = [ file.size, 0 ];
                file.rotation = 0;
            }

            file.on('statuschange', function( cur, prev ) {
                if ( prev === 'progress' ) {
                    $prgress.hide().width(0);
                } else if ( prev === 'queued' ) {
                    $li.off( 'mouseenter mouseleave' );
                    $btns.remove();
                }

                // 成功
                if ( cur === 'error' || cur === 'invalid' ) {
                    console.log( file.statusText );
                    showError( file.statusText );
                    percentages[ file.id ][ 1 ] = 1;
                } else if ( cur === 'interrupt' ) {
                    showError( 'interrupt' );
                } else if ( cur === 'queued' ) {
                    percentages[ file.id ][ 1 ] = 0;
                } else if ( cur === 'progress' ) {
                    $info.remove();
                    $prgress.css('display', 'block');
                } else if ( cur === 'complete' ) {
                    $li.append( '<span class="success"></span>' );
                }

                $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
            });

            $li.on( 'mouseenter', function() {
                $btns.stop().animate({height: 30});
            });

            $li.on( 'mouseleave', function() {
                $btns.stop().animate({height: 0});
            });

            $btns.on( 'click', 'span', function() {
                var index = $(this).index(),
                    deg;

                switch ( index ) {
                    case 0:
                        uploader.removeFile( file );
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
                        file.rotation -= 90;
                        break;
                }

                if ( supportTransition ) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $wrap.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                    // use jquery animate to rotation
                    // $({
                    //     rotation: rotation
                    // }).animate({
                    //     rotation: file.rotation
                    // }, {
                    //     easing: 'linear',
                    //     step: function( now ) {
                    //         now = now * Math.PI / 180;

                    //         var cos = Math.cos( now ),
                    //             sin = Math.sin( now );

                    //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                    //     }
                    // });
                }


            });

            $li.appendTo( $queue );
        }

        $upload.on('click', function() {
            if ( $(this).hasClass( 'disabled' ) ) {
                return false;
            }

            if ( state === 'ready' ) {
                uploader.upload();
            } else if ( state === 'paused' ) {
                uploader.upload();
            } else if ( state === 'uploading' ) {
                uploader.stop();
            }
        });

        $info.on( 'click', '.retry', function() {
            uploader.retry();
        } );

        $info.on( 'click', '.ignore', function() {
            alert( 'todo' );
        } );

        $upload.addClass( 'state-' + state );
        updateTotalProgress();
    };

    Class.prototype.done = function(_dialogObj, index){
        var self = this,
            uploadFiles = self.uploadFiles;

        if(uploadFiles.length < 1) {
            layer.msg('请选择图片', {icon:5});
        }else{
            layer.close(_dialogObj)
            self.$el.next(self.config.imgVal).val(self.uploadFiles[0]);
            typeof self.config.done === 'function' && self.config.done(self.uploadFiles, self.$el);
        }
    }


    Upload.render = function (options) {
        return new Class(options);
    }
    exports(MOD_NAME, Upload);
})
