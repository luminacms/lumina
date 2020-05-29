layui.extend({
    webuploader: 'lib/upload/webuploader/webuploader'
}).define(['util', 'webuploader'], function (exports) {
    "use strict";
    var $ = layui.jquery,
        layer = layui.layer,
        util = layui.util,
        WebUploader = layui.webuploader,

        //字符常量
        MOD_NAME = 'fileUpload',

        //外部接口
        exportClass = {
            config: {},
            set: function (options) {
                var self = this;
                self.config = $.extend({}, self.config, options);
                return self;
            },
            on: function (events, callback) {
                return layui.onevent.call(this, MOD_NAME, events, callback);
            }
        },
        //构造器
        Class = function (options) {
            var self = this;
            self.uploadObj = {};
            self.uploadFiles = [];
            self.config = $.extend({}, self.config, exportClass.config, options);
            self.render();
        };

    //默认配置
    Class.prototype.config = {
        modelId: '',
        fileIcon: {
            'document': layui.cache.base + '/lib/upload/imgs/documents.png',
            'doc': layui.cache.base + '/lib/upload/imgs/doc.png',
            'pdf': layui.cache.base + '/lib/upload/imgs/pdf.png',
        }
    };

    //评分渲染
    Class.prototype.render = function () {
        var _config = this.config,
            self = this;
        // 注册样式
        layui.link(layui.cache.base + 'lib/upload/upload.css')
        self.uploadObj = WebUploader.create({
            pick: _config.elem,
            auto: true,
            swf: layui.cache.base + '/lib/upload/webuploader/Uploader.swf',
            server: _config.url,
            headers: $.extend({'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 'X-Requested-With': 'XMLHttpRequest'}, _config.headers),
            fileNumLimit: 1,
            accept: {
                title: 'File',
                extensions: 'zip,doc,docx,jpg,gif,png,jpeg,pdf',
            }
        })
        self.events();
    };

    //事件处理
    Class.prototype.events = function (layero) {
        var uploader = this.uploadObj,
            self = this,
            config = self.config,
            $modelBox = $('#'+config.modelId),
            $fileListBox = $modelBox.find(".uploader__files");


        uploader.on('fileQueued', function (file) {
            // var $li = $(
            //     '<div id="' + file.id + '" class="file-item thumbnail">' +
            //     '<img>' +
            //     '<div class="info">' + file.name + '</div>' +
            //     '</div>'
            //     ),
            //     $img = $li.find('img');

            // $list为容器jQuery实例
            // $fileListBox.append($li);
        });
        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<p class="progress"><span></span></p>')
                    .appendTo($li)
                    .find('span');
            }

            $percent.css('width', percentage * 100 + '%');
        });
        uploader.on('uploadSuccess', function (file, response) {
            $('#' + file.id).addClass('upload-state-done');

            var _icon = '', _filetype = file.type
            var _ext = util.getExtension(file.name)

            _icon = config.fileIcon[_ext] !== undefined ? config.fileIcon[_ext] : config.fileIcon.document

            if (response.errcode == 0) {
                var _html = '<li class="uploader__file" data-id="' + file.id + '" data-url="' + response.url + '">' +
                    '<div class="thumb" style="background-image: url(' + _icon + ')"></div>' +
                    '<div class="fileinfo"><p class="name">' + file.name + '</p><p class="size">' + util.formatSize(file.size) + '</p></div><a href="javascript:;" class="j_delete"><i class="fa fa-delete"></i></a></div>' +
                    '</div></li>';
                $fileListBox.append(_html)
            }else{

            }

            // var _val = $key.val();
            //
            // _val = _val.length > 1 ? _val.split(',') : []
            // _val.push(response.url)
            //
            // $key.val(_.join(_val, ','))
            //
            // // 隐藏上传button
            // var total = uploader.getStats()
            // if (total['successNum'] >= totalCount) {
            //     // $picker.hide()
            // }
            // // $picker.hide()
            // $loading.hide();
        });
        uploader.on('uploadError', function (file) {
            var $li = $('#' + file.id),
                $error = $li.find('div.error');

            // 避免重复创建
            if (!$error.length) {
                $error = $('<div class="error"></div>').appendTo($li);
            }

            $error.text('上传失败');
        });
        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').remove();
        });
    };

    Class.prototype.done = function(_dialogObj){
        var self = this,
            uploadFiles = self.uploadFiles;

        if(uploadFiles.length < 1) {
            layer.msg('请选择图片', {icon:5});
        }else{
            layer.close(_dialogObj)
            typeof self.config.done === 'function' && self.config.done(self.uploadFiles);
        }
    }

    exportClass.render = function (options) {
        return new Class(options);
    }
    exports(MOD_NAME, exportClass);
})
