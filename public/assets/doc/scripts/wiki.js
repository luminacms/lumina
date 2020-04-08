
$(document).ready(function () {

    var width = $(window).width()-300;
    var height = $(window).height();


    $(".editormd-body").css('width',width + 'px').css('height',height + 'px');
    $("#tree-root .nav-item-content").css('height', (height - 100) + 'px');



    $(window).resize(function(){
        height = $(window).height();
        width = $(window).width()-300;
        var barHeight = $(".editormd-toolbar").height();
        $(".editormd-body").css('width',width + 'px').css('height',height + 'px');
        $("#tree-root .nav-item-content").css('margin-top',barHeight + 'px').css('height', (height - 100) + 'px');

    });

    $("#create-document").click(function () {
        openCreateCatalogDialog();
    });

    $("#create-document").tooltip({placement:"auto",placement : "left"});
    //弹出提示
    $("[data-toggle='tooltip']").tooltip();



});

(function (win) {

    win.isEditorChange = false;

    var $btn = $("#btn-action");
    var winTop = $(win.top || win), docTop = $(win.top.document);
    var $then = $("#create-wiki");
    var formError = $then.find('#error-message');
    var layerIndex;
    $then.on('shown.bs.modal',function () {
        $then.find("input[name='documentName']").focus();

    });
    $then.on("hidden.bs.modal",function () {
        $btn.button('reset');
    });


    //初始化编辑器
    win.editor = editormd("editormd", {
        path : "/assets/doc/editormd/lib/",
        placeholder: "本编辑器支持Markdown编辑，左边编写，右边预览",
        imageUpload: true,
        imageFormats: ["jpg", "jpeg", "gif", "png", "JPG", "JPEG", "GIF", "PNG"],
        imageUploadURL: "/upload",
        fileUpload: true,
        htmlDecode : true,
        fileUploadURL : '/upload',
        tocStartLevel : 1,
        tocm : true,
        disabledKeyMaps: ['F10', 'F11'],
        toolbarIcons : [ "back","save", "template","|", "h1", "h2","h3" ,"h4","bold", "hr", "italic","quote","list-ul","list-ol","link","reference-link","image","file","code","html-entities","preformatted-text","code-block","table","||","undo","redo","history","fullscreen","preview"],
        // toolbarIcons: 'full',
        toolbarIconsClass : {
            bold : "fa-bold"
        } ,
        toolbarIconTexts :{
            bold : 'a'
        },
        toolbarCustomIcons:{
            back : '<a href="javascript:;" title="返回"> <i class="fa fa-mail-reply" name="back"></i></a>',
            save : '<a href="javascript:;" title="保存" id="markdown-save" class="disabled"> <i class="fa fa-save" name="save"></i></a>',
            history : '<a href="javascript:;" title="历史版本"> <i class="fa fa-history" name="history"></i></a>',
            template : '<a href="javascript:;" title="模板"> <i class="fa fa-tachometer" name="template"></i></a>'
        },
        toolbarHandlers :{
            /**
             * @param {Object}      cm         CodeMirror对象
             * @param {Object}      icon       图标按钮jQuery元素对象
             * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
             * @param {String}      selection  编辑器选中的文本
             */
            back : function (cm, icon, cursor, selection) {
                if(document.referer){
                    window.history.back();
                }else{
                    window.location = '/doc/member/projects';
                }

                return false;
            },
            save : function (cm, icon, cursor, selection) {
                if($("#markdown-save").hasClass('change')) {
                    $("#form-editormd").submit();
                }
            },
            history :function (cm, icon, cursor, selection) {
                var doc_id = $("#documentId").val();
                if(!doc_id){
                    layer.msg('当前文档暂无历史版本');
                }else{
                    layer.open({
                        type: 2,
                        title: '历史版本',
                        shadeClose: true,
                        shade: 0.8,
                        area: ['700px','80%'],
                        content: '/doc/docs/history/'+doc_id,
                        end : function () {
                           // alert("a")
                            if(window.SelectedId){
                                var selected = {node:{
                                    id : window.SelectedId
                                }};
                                window.loadDocument(selected);
                                window.SelectedId = null;
                            }
                        }
                    });
                }
            },
            template : function(cm, icon, cursor, selection) {
                $("#template-modal").modal('show');
            }
        },
        lang : {
            name        : "zh-cn",
            description : "开源在线Markdown编辑器<br/>Open source online Markdown editor.",
            tocTitle    : "目录",
            toolbar     : {
                undo             : "撤销（Ctrl+Z）",
                redo             : "重做（Ctrl+Y）",
                bold             : "粗体",
                del              : "删除线",
                italic           : "斜体",
                quote            : "引用",
                ucwords          : "将每个单词首字母转成大写",
                uppercase        : "将所选转换成大写",
                lowercase        : "将所选转换成小写",
                h1               : "标题1",
                h2               : "标题2",
                h3               : "标题3",
                h4               : "标题4",
                h5               : "标题5",
                h6               : "标题6",
                "list-ul"        : "无序列表",
                "list-ol"        : "有序列表",
                hr               : "横线",
                link             : "链接",
                "reference-link" : "引用链接",
                image            : "添加图片",
                file             : "添加文件",
                code             : "行内代码",
                "preformatted-text" : "预格式文本 / 代码块（缩进风格）",
                "code-block"     : "代码块（多语言风格）",
                table            : "添加表格",
                datetime         : "日期时间",
                emoji            : "Emoji表情",
                "html-entities"  : "HTML实体字符",
                pagebreak        : "插入分页符",
                "goto-line"      : "跳转到行",
                watch            : "关闭实时预览",
                unwatch          : "开启实时预览",
                preview          : "全窗口预览HTML",
                fullscreen       : "全屏",
                clear            : "清空",
                search           : "搜索",
                help             : "使用帮助",
                info             : "关于" + editormd.title
            },
            buttons : {
                enter  : "确定",
                cancel : "取消",
                close  : "关闭"
            },
            dialog : {
                link : {
                    title    : "添加链接",
                    url      : "链接地址",
                    urlTitle : "链接标题",
                    urlEmpty : "错误：请填写链接地址。"
                },
                referenceLink : {
                    title    : "添加引用链接",
                    name     : "引用名称",
                    url      : "链接地址",
                    urlId    : "链接ID",
                    urlTitle : "链接标题",
                    nameEmpty: "错误：引用链接的名称不能为空。",
                    idEmpty  : "错误：请填写引用链接的ID。",
                    urlEmpty : "错误：请填写引用链接的URL地址。"
                },
                image : {
                    title    : "添加图片",
                    url      : "图片地址",
                    link     : "图片链接",
                    alt      : "图片描述",
                    uploadButton     : "本地上传",
                    imageURLEmpty    : "错误：图片地址不能为空。",
                    uploadFileEmpty  : "错误：上传的图片不能为空。",
                    formatNotAllowed : "错误：只允许上传图片文件，允许上传的图片文件格式有："
                },
                file : {
                    title   : "添加文件",
                    url     : "文件地址",
                    alt     : "文件说明",
                    uploadButton : "本地上传",
                    fileURLEmpty    : "错误：文件地址不能为空。",
                    uploadFileEmpty  : "错误：上传的文件不能为空。"
                },
                preformattedText : {
                    title             : "添加预格式文本或代码块",
                    emptyAlert        : "错误：请填写预格式文本或代码的内容。"
                },
                codeBlock : {
                    title             : "添加代码块",
                    selectLabel       : "代码语言：",
                    selectDefaultText : "请选择代码语言",
                    otherLanguage     : "其他语言",
                    unselectedLanguageAlert : "错误：请选择代码所属的语言类型。",
                    codeEmptyAlert    : "错误：请填写代码内容。"
                },
                htmlEntities : {
                    title : "HTML 实体字符"
                },
                help : {
                    title : "使用帮助"
                }
            }
        },
        onpreviewing: function() {
            this.fullscreen();
        },
        onpreviewed: function() {
            this.fullscreenExit();
        },
        onload : function () {
            editor.setToolbarAutoFixed(false);
            var index ;
            $(".editormd-menu>li>a").hover(function () {
                var title = $(this).attr('title');
                index = layer.tips(title,this,{
                    tips : 3
                });
            },function () {
                layer.close(index);
            });
            if(window.CONFIG.selected){
                window.loadDocument(window.CONFIG.selected);
            }
            initJsTree();

            var keyMap = {
                "Ctrl-S": function(cm) {
                    if($("#markdown-save").hasClass('change')) {
                        $("#form-editormd").submit();
                    }
                },
                "Ctrl-A": function(cm) { // default Ctrl-A selectAll
                    // custom
                    cm.execCommand("selectAll");
                }
            };
            this.addKeyMap(keyMap);
        },
        onchange : function () {
            if(win.isEditorChange) {
                win.isEditorChange = false;
            }else{
                $("#markdown-save").removeClass('disabled').addClass('change');
            }
        }
    });

    /**
     * 打开文档创建窗口
     * @param node
     */
    win.openCreateCatalogDialog = function (node) {
        var doc_id = node ? node.id : 0;

        $then.find("input[name='id']").val('');
        $then.find("input[name='parentid']").val(doc_id);
        $then.find("input[name='documentName']").val('');
        formError.text('');

        $then.modal({ show : true });
    };

    win.deleteDocumentDialog = function (node) {
        var index = layer.confirm('你确定要删除该文档吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){

            $.post("/docs/delete/" + node.id).done(function (res) {
                layer.close(index);
                if(res.errcode == 0){
                    win.treeCatalog.delete_node(node);
                    win.editor.clear();
                }else{
                    layer.msg("删除失败",{icon : 2})
                }
            }).fail(function () {
                layer.close(index);
               layer.msg("删除失败",{icon : 2})
            });

        });
    };

    win.editDocumentDialog = function (node) {
        var doc_id = node ? node.id : 0;
        var text = node ? node.text : '';
        var parentid = node && node.parent != '#' ? node.parent : 0;

        $then.find("input[name='id']").val(doc_id);
        $then.find("input[name='parentid']").val(parentid);
        $then.find("input[name='documentName']").val(text);
        formError.text('');

        $then.modal({ show : true });
    };

    win.getSiblingSort = function (node) {
        var data = [];

        for(key in node.children){
            var index = data.length;

            data[index] = {
                "id" : node.children[key],
                "sort" : key,
                "parent" : node.id
            };
        }
        return data;
    };
    //加载指定的文档
    win.loadDocument = function (selected) {
        var index = layer.load(1, {
            shade: [0.1,'#fff'] //0.1透明度的白色背景
        });

        $.get("/doc/docs/content/" + selected.node.id + '?dataType=json').done(function (data) {
            win.isEditorChange = true;
            layer.close(index);
            $("#documentId").val(selected.node.id);
            window.editor.clear();
            if(data.errcode == 0 && data.data.doc.content){
                window.editor.insertValue(data.data.doc.content);
                window.editor.setCursor({line:0, ch:0});
            }else if(data.errcode != 0){
                layer.msg("文档加载失败");
            }
        }).fail(function () {
            layer.close(index);
            layer.msg("文档加载失败");
        });
    };
    /**
     * 实现添加文档
     */
    $then.find("#form-document").ajaxForm({
        type : "post",
        dataType : "json",
        beforeSubmit : function (formData, jqForm, options) {
            var name = $(jqForm).find("input[name='documentName']").val();
            var id = $(jqForm).find("input[name='id']").val();
            var node = win.treeCatalog.get_node(id);
            if(name == ""){
                formError.text('文档名称不能为空');
                return false;
            }
            if(node && node.text == name){
                $then.modal('hide');
                return false;
            }
            $btn.button('loading');
            return true;
        },
        success : function (res, statusText, xhr, $form) {
            $btn.button('reset')
            if(res.errcode == 0) {
                var data = { "id" : res.data.id,'parent' : res.data.parentid,"text" : res.data.name};

                var node = win.treeCatalog.get_node(data.id);
                if(node){
                    win.treeCatalog.rename_node({"id":data.id},data.text);
                }else {
                    var result = win.treeCatalog.create_node(res.data.parentid, data, 'last');
                    win.treeCatalog.deselect_all();
                    win.treeCatalog.select_node(data);
                    win.editor.clear();
                }
                $("#markdown-save").removeClass('change').addClass('disabled');
                $then.modal('hide');
            }else{
                formError.text(res.message);
            }
        }
    });
    /**
     * 实现保存文档编辑
     */
    $("#form-editormd").ajaxForm({
        dataType:"json",
        beforeSubmit:function (formData, jqForm, options) {
            $("#markdown-save").removeClass('change').addClass('disabled');
            var content = $.trim(win.editor.getMarkdown());
            var id = $(jqForm).find("input[name='id']").val();

            if(content === ""){
                layer.msg("保存成功");
                return false;
            }

            if(!id){
                layer.msg("没有需要保存的文档");
                return false;
            }
            layerIndex = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
        },
        success :function (res) {
            if(res.errcode === 0){
                $("#markdown-save").removeClass('change').addClass('disabled');
                layer.close(layerIndex);
                layer.msg("文档已保存");
            }else{
                $("#markdown-save").removeClass('disabled').addClass('change');
                layer.msg(res.message);
            }
        }
    });

})(window);