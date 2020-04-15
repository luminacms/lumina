@extends('core::layouts.column_left')

@push('style')
    <style>
        #m-webide { min-width:320px; margin:0px auto 0 auto; background:white; border-radius:0px; padding:0px; overflow:hidden; }
        #webide__tree { width:100%;float:left; border-right:1px solid silver; overflow-x:hidden; padding:0px 0; }
        #data textarea { margin:0; padding:0; height:100%; width:100%; border:0; background:white; display:block; line-height:18px; resize:none; }
        #data, #code { font: normal normal normal 12px/18px 'Consolas', monospace !important; }
        #j_page_tab .icon-nosave{display: inline-block; width: 8px;height: 8px;background-color: #f19805;border-radius: 100%;margin-right: 5px;}
        #j_page_list .page_item{height: 65px;border: 1px solid #eee;padding: 5px 10px;margin: 10px 5px;}
        #j_page_list .qrcode{right:6px;top:10px;}

    </style>
@endpush

@section('leftside')
    <div id="webide__tree">
        <ul id="j_page_list"></ul>
    </div>
@stop

@section('content')
    {{-- <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('game.games.index'), 'on' => true],
       ]" /> --}}

    <div id="m-webide" role="main">

        <div id="webide__content">
            <div class="layui-tab layui-tab-card m-0" lay-allowClose="true" lay-filter="webideTab" id="j_page_tab">
                <ul class="layui-tab-title"></ul>
                <div class="layui-tab-content"></div>
            </div>

            {{-- <div class="content code" ><div id="code" style="width:100%;min-height:500px;"></div></div>
            <div class="content folder" style="display:none;"></div>
            <div class="content image" style="display:none; position:relative;"><img src="" alt="" style="display:block; position:absolute; left:50%; top:50%; padding:0; max-height:90%; max-width:90%;" /></div> --}}
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
    <script>var require = { paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.19.3/min/vs' } };</script>
    <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.19.3/min/vs/loader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.19.3/min/vs/editor/editor.main.nls.zh-cn.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.19.3/min/vs/editor/editor.main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script>
    <script>
        layui.use(['element', 'admin'], function(){
            var element = layui.element,
                admin = parent.layui == layui?layui.admin:parent.layui.admin,
                pageMap = [],
                vsMap = [];

                var INTERFACE_FILE = '/interface/core',
                    $tree = $("#m-webide").find("#webide__tree"),
                    $content = $("#m-webide").find("#webide__content"),
                    fileID;
                var $tab = $("#j_page_tab");

                $.ajaxSetup({headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),"Accept": "application/json"}});
                $("#j_submit").click(function(e){
                    e.preventDefault();

                    vsSaveValue()
                    return false;
                })

                function vsSaveValue() {
                    var $activeTab = $tab.find("ul>li.layui-this")
                    var activeId = $activeTab.attr("lay-id");
                    var vsEditor = _.find(vsMap, {'id': activeId});
                    if(vsEditor) {
                        $.post("{!! url('interface/game/page/update') !!}?uid="+activeId, {'content': vsEditor.vs.getValue()}, function(res){
                            layer.msg('提交成功')
                            $activeTab.find("i.icon-nosave").remove();
                        })
                    }
                }

                function createVsEditor(item){
                    var content_id = 'webide_'+item.uid,
                        tab_id = item.uid,
                        h = $(window).height() - 160;

                    element.tabAdd('webideTab', {
                        title: item.title,
                        content: '<div id="'+content_id+'" style="width:100%;min-height:'+h+'px;" class="wedide"></div>', //支持传入html
                        id: tab_id
                    });
                    var vsEditor = monaco.editor.create(document.getElementById(content_id), {
                        value: '加载中...',
                        language: 'html',
                        automaticLayout: true,
                        readOnly: false,
                        theme: "vs-dark",
                        value: item.content
                    });
                    // 添加自动补全
                    // vsEditor.languages.registerCompletionItemProvider('html', { // 这里以sql语言为例
                    //     provideCompletionItems () {
                    //         return [{
                    //         label: '${_DB',  // 显示的提示内容
                    //         kind: this.monaco.languages.CompletionItemKind['Function'], // 用来显示提示内容后的不同的图标
                    //         insertText: '{_DB', // 选择后粘贴到编辑器中的文字
                    //         detail: '' // 提示内容后的说明
                    //         }];
                    //     },
                    //     triggerCharacters: ['$'] // 触发提示的字符，可以写多个
                    // });
                    // 监听修改事件
                    vsEditor.onDidChangeModelContent(e => {
                        var value= vsEditor.getValue(); //使value和其值保持一致
                        var $activeTab = $tab.find("ul>li[lay-id="+tab_id+"]");

                        if($activeTab.find("i.icon-nosave").length < 1){
                            $activeTab.prepend("<i class='icon-nosave'></i>");
                        }
                    })
                    vsEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
                        vsSaveValue();
                    });

                    vsMap.push({'id': tab_id, 'vs': vsEditor})
                    element.tabChange('webideTab', tab_id);

                    $("#j_page_list").find("li.page_item>a[data-id='"+tab_id+"']").addClass("on");
                }

                // 获取邻居
                initWebide();
                function initWebide() {
                    $.get('/interface/game/page/neighbor', {'uid': '{{ $model->uid }}'}, function(res) {
                        pageMap = res.data

                        if($tab.find("li").length < 1){
                            // 创建初始化窗口
                            createVsEditor(res.data[0]);
                        }

                        // 列表渲染
                        var _html = '<li class="page_item relative cursor-pointer flex items-center" data-uid="__create"><span class="block my-0 mx-auto text-gray-600"><i class="fa fa-plus mr-1"></i>新增页面</span></li>';
                            $pageList = $("#j_page_list");

                        $.each(pageMap, function(idx, _item) {
                            var _game_show_url = '{{ route("game.show","_id_") }}'.replace('_id_', _item.uid)

                            _html += idx==0?'<li class="page_item relative on cursor-pointer" data-id='+_item.id+' data-uid='+_item.uid+'>':'<li class="page_item cursor-pointer relative" data-id='+_item.id+' data-uid='+_item.uid+'>'
                            _html += '<div><h3><a href="'+_game_show_url+'" target="_blank" class="underline whitespace-no-wrap mr-2 overflow-hidden" style="text-overflow: ellipsis;" title="'+_item.title+'">'+_item.title+'</a>'
                            _html += '<a href="javascript:;" class="j_edit ml-2"><i class="fa fa-edit"></i></a></h3>'
                            _html += '<div class="text-gray-600 text-xs overflow-hidden" style="width:230px;height:34px;">'+ (_item.desc || '') +'</div></div>'
                            _html += '<div class="qrcode absolute right-0"><img src="{{ route('service.qrcode') }}?key='+_game_show_url+'" width="45" height="45"/></div>'
                            _html += '</li>'
                        })
                        $("#j_page_list").html(_html)

                        // 修改页面
                        $pageList.find(".j_edit").on("click", function(e){
                            e.stopPropagation()
                            var _id = $(this).parents("li").data("id")
                            var _uid = $(this).parents("li").data("uid")
                            var createModal = admin.openDrawer('{{ route("game.game-page.edit", "_id_") }}'.replace('_id_', _id), '修改页面#'+_id, {
                                end: function(index, layero){
                                    element.tabDelete("webideTab", _uid);
                                    initWebide();
                                }
                            })
                            return;
                        })

                        // 列表点击事件
                        $pageList.find("li.page_item").on("click",  function(e){
                            var $self = $(this)
                            var uid = $self.data('uid')
                            var _page = _.find(pageMap, {'uid': uid})
                            var exist = $tab.find("li[lay-id='"+uid+"']");

                            if(uid == '__create') {
                                // 新建页面
                                var createModal = admin.openDrawer('{{ route("game.game-page.create", \request()->merge(["mode"=>"source"])->all()) }}', '创建页面', {
                                    end: function(index, layero){
                                        initWebide();
                                    }
                                })
                                return false;
                            }

                            if(exist.length < 1) {
                                createVsEditor(_page)
                            }else{
                                element.tabChange('webideTab', uid);
                            }
                            $self.parents("#j_page_list").find("li.page_item>a").removeClass("on");
                            $self.addClass('on')
                        })
                        // 二维码事件
                        var qrcodeTip = null
                        $pageList.find("li.page_item img").on("mouseenter", function(){
                            qrcodeTip = layer.tips('<img src="'+$(this).attr("src")+'" width="350" />', $(this), {'time': 0});
                        }).on("mouseleave", function(){
                            layer.close(qrcodeTip)
                        })

                    })
                }


                $(window).resize(function () {
                    var h = $(window).height()-140;
                    $('#m-webide, #webide__tree, #tree, #webide__content .wedide').height(h).filter('.default').css('lineHeight', h + 'px');
                }).resize();

        });
    </script>
@endpush
