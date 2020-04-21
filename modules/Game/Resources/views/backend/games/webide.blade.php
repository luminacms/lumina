@extends('game::backend.layouts.master')

@push('style')
    <style>
        #m-webide { min-width:320px; margin:0px auto 0 auto; background:white; border-radius:0px; padding:0px; overflow:hidden; }
        #webide__tree { float:left; width:319px; border-right:1px solid silver; overflow:auto; padding:0px 0; }
        #webide__content { margin-left:320px; }
        #data textarea { margin:0; padding:0; height:100%; width:100%; border:0; background:white; display:block; line-height:18px; resize:none; }
        #data, #code { font: normal normal normal 12px/18px 'Consolas', monospace !important; }

        #webide__tree .folder { background:url('{{ asset('assets/core/file_sprite.png') }}') right bottom no-repeat; }
        #webide__tree .file { background:url('{{ asset('assets/core/file_sprite.png') }}') 0 0 no-repeat; }
        #webide__tree .file-pdf { background-position: -32px 0 }
        #webide__tree .file-as { background-position: -36px 0 }
        #webide__tree .file-c { background-position: -72px -0px }
        #webide__tree .file-iso { background-position: -108px -0px }
        #webide__tree .file-htm, #webide__tree .file-html, #webide__tree .file-xml, #webide__tree .file-xsl { background-position: -126px -0px }
        #webide__tree .file-cf { background-position: -162px -0px }
        #webide__tree .file-cpp { background-position: -216px -0px }
        #webide__tree .file-cs { background-position: -236px -0px }
        #webide__tree .file-sql { background-position: -272px -0px }
        #webide__tree .file-xls, #webide__tree .file-xlsx { background-position: -362px -0px }
        #webide__tree .file-h { background-position: -488px -0px }
        #webide__tree .file-crt, #webide__tree .file-pem, #webide__tree .file-cer { background-position: -452px -18px }
        #webide__tree .file-php { background-position: -108px -18px }
        #webide__tree .file-jpg, #webide__tree .file-jpeg, #webide__tree .file-png, #webide__tree .file-gif, #webide__tree .file-bmp { background-position: -126px -18px }
        #webide__tree .file-ppt, #webide__tree .file-pptx { background-position: -144px -18px }
        #webide__tree .file-rb { background-position: -180px -18px }
        #webide__tree .file-text, #webide__tree .file-txt, #webide__tree .file-md, #webide__tree .file-log, #webide__tree .file-htaccess { background-position: -254px -18px }
        #webide__tree .file-doc, #webide__tree .file-docx { background-position: -362px -18px }
        #webide__tree .file-zip, #webide__tree .file-gz, #webide__tree .file-tar, #webide__tree .file-rar { background-position: -416px -18px }
        #webide__tree .file-js { background-position: -434px -18px }
        #webide__tree .file-css { background-position: -144px -0px }
        #webide__tree .file-fla { background-position: -398px -0px }
    </style>
@endpush
@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('game.games.index')],
       ]" />

    <div id="m-webide" role="main">
        <div id="webide__tree"></div>
        <div id="webide__content">
            <div class="content code" ><div id="code" style="width:100%;min-height:500px;"></div></div>
            <div class="content folder" style="display:none;"></div>
            <div class="content image" style="display:none; position:relative;"><img src="" alt="" style="display:block; position:absolute; left:50%; top:50%; padding:0; max-height:90%; max-width:90%;" /></div>
            {{--            <div class="content default" style="text-align:center;">Select a file from the tree.</div>--}}
        </div>
    </div>

    <div class="layui-form-item layui-layout-admin">
        <div class="layui-input-block">
            <div class="layui-footer z-50" style="left:0;">
                <button class="layui-btn" id="j_submit">提交</button>
            </div>
        </div>
    </div>

@endsection

@push('script')
    <script src="https://cdn.sxmgcm.cn/libs/require.js"></script>
    <script src="https://cdn.sxmgcm.cn/libs/require.config.js"></script>
    <script>
        require(['vs/editor/editor.main', 'jstree'], function(monaco, template) {

            var INTERFACE_FILE = '/interface/core',
                $tree = $("#m-webide").find("#webide__tree"),
                $content = $("#m-webide").find("#webide__content"),
                fileID,
                vsEditor = monaco.editor.create(document.getElementById('code'), {
                    value: '请选择文件',
                    language: 'php',
                    automaticLayout: true,
                    readOnly: false,
                    theme: "vs-dark",
                });

            $.ajaxSetup({headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
            $("#j_submit").click(function(e){
                e.preventDefault();
                var _content = vsEditor.getValue();
                $.post(INTERFACE_FILE + '/file', {'data': _content, 'id': fileID}, function(res){
                    layer.msg('提交成功')
                })
                return false;
            })


            function renderIdeContent(d) {
                $content.show();
                $content.find(".code").show();

                var _type = d.data.type;
                _type = _type=='js'?'javascript':_type;
                _type = _type=='htm'?'html':_type;


                monaco.editor.setModelLanguage(vsEditor.getModel(), _type)
                vsEditor.setValue(d.data.content);

                // switch(d.type) {
                //     case 'text':
                //     case 'txt':
                //     case 'md':
                //     case 'htaccess':
                //     case 'log':
                //     case 'sql':
                //     case 'php':
                //     case 'js':
                //     case 'json':
                //     case 'css':
                //     case 'html':
                //     case 'log':
                //         $content.show();
                //         $content.find(".code").show();
                //         break;
                //     case 'png':
                //     case 'jpg':
                //     case 'jpeg':
                //     case 'bmp':
                //     case 'gif':
                //         $('#data .image img').one('load', function () { $(this).css({'marginTop':'-' + $(this).height()/2 + 'px','marginLeft':'-' + $(this).width()/2 + 'px'}); }).attr('src',d.content);
                //         $('#data .image').show();
                //         break;
                //     default:
                //         $content.show();
                //         break;
                // }
            }

            $tree.jstree({
                'core' : {
                    'data' : {
                        'url' : INTERFACE_FILE +'/file',
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        'data' : function (node) {
                            return { 'type' : 'webide', 'path': '{{ $gamePath }}'};
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
                        tmp.create.label = "新建";
                        tmp.create.submenu = {
                            "create_folder" : {
                                "separator_after"	: true,
                                "label"				: "文件夹",
                                "action"			: function (data) {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);
                                    inst.create_node(obj, { type : "default" }, "last", function (new_node) {
                                        setTimeout(function () { inst.edit(new_node); },0);
                                    });
                                }
                            },
                            "create_file" : {
                                "label"				: "文件",
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
                        tmp.rename.label = '重命名';
                        tmp.remove.label = '删除';
                        tmp.ccp = false
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
                    $.post(INTERFACE_FILE+'/file/delete', { 'id' : data.node.id })
                        .done(function(d){
                            if(d.errcode == 0){
                                data.instance.set_id(data.node, d.id);
                            }else{
                                alert(d.msg);
                            }
                            data.instance.refresh();
                        })
                        .fail(function () {
                            data.instance.refresh();
                        });
                })
                .on('create_node.jstree', function (e, data) {
                    $.post(INTERFACE_FILE+'/file/create', { 'type' : data.node.type, 'id' : data.node.parent, 'text' : data.node.text })
                        .done(function (d) {
                            if(d.errcode == 0){
                                data.instance.set_id(data.node, d.data.id);
                            }else{
                                alert(d.msg);
                                data.instance.refresh();
                            }
                        })
                        .fail(function () {
                            data.instance.refresh();
                        });
                })
                .on('rename_node.jstree', function (e, data) {
                    $.post(INTERFACE_FILE+'/file/rename', { 'id' : data.node.id, 'text' : data.text })
                        .done(function (d) {
                            if(d.errcode == 0) {
                                data.instance.set_id(data.node, d.data.id);
                            }else{
                                data.instance.refresh();
                            }
                        })
                        .fail(function () {
                            data.instance.refresh();
                        });
                })
                // .on('move_node.jstree', function (e, data) {
                //     $.get('?operation=move_node', { 'id' : data.node.id, 'parent' : data.parent })
                //         .done(function (d) {
                //             //data.instance.load_node(data.parent);
                //             data.instance.refresh();
                //         })
                //         .fail(function () {
                //             data.instance.refresh();
                //         });
                // })
                // .on('copy_node.jstree', function (e, data) {
                //     $.get('?operation=copy_node', { 'id' : data.original.id, 'parent' : data.parent })
                //         .done(function (d) {
                //             //data.instance.load_node(data.parent);
                //             data.instance.refresh();
                //         })
                //         .fail(function () {
                //             data.instance.refresh();
                //         });
                // })
                .on('changed.jstree', function (e, data) {
                    if(data && data.selected && data.selected.length) {
                        fileID = data.selected.join(':');
                        $.post(INTERFACE_FILE + '/file/get', {'id': fileID}, function (res) {
                            if(res.data.type) {
                                $content.hide();
                                renderIdeContent(res);
                            }
                        });
                    }else {
                        $content.show();
                        $content.find('.content.default').show();
                    }
                });

            $(window).resize(function () {
                var h = Math.max($(window).height() - 0, 420);

                $('#m-webide, #webide__tree, #tree, #webide__content, #webide__content .content,#code').height(h).filter('.default').css('lineHeight', h + 'px');
            }).resize();

        })
    </script>
@endpush
