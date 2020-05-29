layui.extend({
    codemirror: 'lib/extend/codemirror/codemirror.min'
}).define(['jstree', 'codemirror'], function (exports) {
    "use strict";
    var $ = layui.jquery,
        layer = layui.layer,
        jstree = layui.jstree,
        codemirror = layui.codemirror,

        //字符常量
        MOD_NAME = 'webide',

        //外部接口
        WebIDE = {
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
            self.loading = null;
            self.config = $.extend({}, self.config, WebIDE.config, options);
            layui.link(layui.cache.base + 'lib/extend/codemirror/codemirror.css');

            self.render();
        };

    //默认配置
    Class.prototype.config = {
        inrterface_file:  '/interface/core',
        tree_elem: '#webide__tree',
        content_elem: '#webide__content',
    };

    //评分渲染
    Class.prototype.render = function () {
        var self = this,
            _config = self.config,
            $tree = $(_config.elem).find(_config.tree_elem),
            $content = $(_config.elem).find(_config.content_elem),
            content_html = {
                default: '<div class="content default" style="text-align:center;">Select a file from the tree.</div>',
                code: '<div class="content code"><textarea id="code" readonly="readonly"></textarea></div>',
                folder: '<div class="content folder"></div>',
                image: '<div class="content image" style="position:relative;"><img src="" alt="" style="display:block; position:absolute; left:50%; top:50%; padding:0; max-height:90%; max-width:90%;" /></div>\n',
            }

        $tree.jstree({
                'core' : {
                    'data' : {
                        'url' : _config.inrterface_file +'/file',
                        'data' : function (node) {
                            console.log(node)
                            return { 'id' : node.id };
                        }
                    },
                    'check_callback' : function(o, n, p, i, m) {
                        if(m && m.dnd && m.pos !== 'i') { return false; }
                        if(o === "move_node" || o === "copy_node") {
                            if(this.get_node(n).parent === this.get_node(p).id) { return false; }
                        }
                        return true;
                    },
                    'force_text' : true,
                    'themes' : {
                        'responsive' : false,
                        'variant' : 'small',
                        'stripes' : true
                    }
                },
                'sort' : function(a, b) {
                    return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
                },
                'contextmenu' : {
                    'items' : function(node) {
                        var tmp = $.jstree.defaults.contextmenu.items();
                        delete tmp.create.action;
                        tmp.create.label = "New";
                        tmp.create.submenu = {
                            "create_folder" : {
                                "separator_after"	: true,
                                "label"				: "Folder",
                                "action"			: function (data) {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);
                                    inst.create_node(obj, { type : "default" }, "last", function (new_node) {
                                        setTimeout(function () { inst.edit(new_node); },0);
                                    });
                                }
                            },
                            "create_file" : {
                                "label"				: "File",
                                "action"			: function (data) {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);
                                    inst.create_node(obj, { type : "file" }, "last", function (new_node) {
                                        setTimeout(function () { inst.edit(new_node); },0);
                                    });
                                }
                            }
                        };
                        if(this.get_type(node) === "file") {
                            delete tmp.create;
                        }
                        return tmp;
                    }
                },
                'types' : {
                    'default' : { 'icon' : 'folder' },
                    'file' : { 'valid_children' : [], 'icon' : 'file' }
                },
                'unique' : {
                    'duplicate' : function (name, counter) {
                        return name + ' ' + counter;
                    }
                },
                'plugins' : ['state','dnd','sort','types','contextmenu','unique']
            })
            .on('delete_node.jstree', function (e, data) {
                $.get('?operation=delete_node', { 'id' : data.node.id })
                    .fail(function () {
                        data.instance.refresh();
                    });
            })
            .on('create_node.jstree', function (e, data) {
                $.get('?operation=create_node', { 'type' : data.node.type, 'id' : data.node.parent, 'text' : data.node.text })
                    .done(function (d) {
                        data.instance.set_id(data.node, d.id);
                    })
                    .fail(function () {
                        data.instance.refresh();
                    });
            })
            .on('rename_node.jstree', function (e, data) {
                $.get('?operation=rename_node', { 'id' : data.node.id, 'text' : data.text })
                    .done(function (d) {
                        data.instance.set_id(data.node, d.id);
                    })
                    .fail(function () {
                        data.instance.refresh();
                    });
            })
            .on('move_node.jstree', function (e, data) {
                $.get('?operation=move_node', { 'id' : data.node.id, 'parent' : data.parent })
                    .done(function (d) {
                        //data.instance.load_node(data.parent);
                        data.instance.refresh();
                    })
                    .fail(function () {
                        data.instance.refresh();
                    });
            })
            .on('copy_node.jstree', function (e, data) {
                $.get('?operation=copy_node', { 'id' : data.original.id, 'parent' : data.parent })
                    .done(function (d) {
                        //data.instance.load_node(data.parent);
                        data.instance.refresh();
                    })
                    .fail(function () {
                        data.instance.refresh();
                    });
            })
            .on('changed.jstree', function (e, data) {
                if(data && data.selected && data.selected.length) {
                    self.loading = layer.load();
                    $.post(_config.inrterface_file + '/file/get', {'id': data.selected.join(':')}, function (res) {
                        layer.close(self.loading)
                        if(res.errcode == 0 && res.data.type) {
                            var d = res.data;
                            $content.hide();
                            switch(d.type) {
                                case 'text':
                                case 'txt':
                                case 'md':
                                case 'htaccess':
                                case 'log':
                                case 'sql':
                                case 'php':
                                case 'js':
                                case 'json':
                                case 'css':
                                case 'html':
                                    $content.html(content_html.code).show();
                                    $content.find("#code").val(d.content);
                                    self.renderCode()
                                    break;
                                case 'png':
                                case 'jpg':
                                case 'jpeg':
                                case 'bmp':
                                case 'gif':
                                    $('#data .image img').one('load', function () { $(this).css({'marginTop':'-' + $(this).height()/2 + 'px','marginLeft':'-' + $(this).width()/2 + 'px'}); }).attr('src',d.content);
                                    $('#data .image').show();
                                    break;
                                default:
                                    $content.html(content_html.default).show();
                                    break;
                            }
                        }
                    });
                }else {
                    $content.hide();
                    $content.html(content_html.default).show();
                }
            });
    }

    Class.prototype.renderCode = function() {
        var $content = $(this.config.elem).find("#code");
        var editor = CodeMirror.fromTextArea($("#code")[0], {
            lineNumbers: true,
            lineWrapping: true,
            mode: "text/html"
        });
    }
    Class.prototype.done = function(_dialogObj){
        var self = this;
    }


    WebIDE.render = function (options) {
        return new Class(options);
    }
    exports(MOD_NAME, WebIDE);
})
