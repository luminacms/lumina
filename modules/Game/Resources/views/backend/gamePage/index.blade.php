@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('game.game-page.index')]
       ]" />

    <table class="layui-hide" id="data_gamepage_table" lay-filter="data_gamepage_table"></table>
@endsection


@push('script')
    <script type="text/html" id="game_view">
        <a class="cursor-pointer" title="查看" lay-event="show"><i class="fa fa-eye"></i></a>
    </script>
    <script type="text/html" id="game_slug">
        @{{# if(d.mode == 'source'){ }}
            <a class="layui-badge mr-2 cursor-pointer" title="点击进入源码编辑模式" lay-event="sourceIde"><i class="fa fa-code"></i></a>
        @{{# }else if(d.mode == 'diy'){ }}
            <a class="layui-badge bg-green-500 mr-2 cursor-pointer" title="点击进入DIY模式" lay-event="diyIde"><i class="fa fa-cubes"></i></a>
        @{{# } }}
        @{{ d.uid }}
    </script>
    <script type="text/html" id="game_title">
        @{{# if(d.oauth){ }}
            @{{# if(d.oauth == 'wechat'){ }}
                <span class="layui-badge bg-green-500 mr-2 cursor-pointer" title="微信登陆"><i class="fa fa-wechat"></i></span>
            @{{# }else{ }}
                <span class="layui-badge bg-green-500 mr-2 cursor-pointer">@{{ d.oauth }}</span>
            @{{# } }}
        @{{# } }}

        @{{ d.title }}
    </script>
    <script type="text/html" id="game_status">
        <input type="checkbox" name="switch" lay-skin="switch" lay-text="上线|下线" lay-filter="updown" value="@{{ d.id }}"
            @{{# if(d.status=='up'){ }} checked @{{# } }}
            >
    </script>
    <script>
        layui.use(['table', 'element', 'form'], function(){
            var table = layui.table,
                form = layui.form,
                admin = parent.layui.admin,
                element = layui.element;
            var GAME_MODEL = '{{ urlencode((new \Modules\Game\Models\GamePage())->getMorphClass()) }}'

            table.render({
                elem: '#data_gamepage_table',
                url: '{{ URL::full() }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                action: [{'text': '关联报名系统', 'event': 'connectVote'}], // 自定义方法
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                done: tableDone,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"uid","title":"uid",width:180,templet:"#game_slug"},
                    {"field":"title","title":"title",width:350,templet:"#game_title"},
                    {"field":"mode","title":"mode"},
                    {"field":"status","title":"状态",templet: "#game_status",width:95},
                    {"field":"create_by","title":"create_by"},
                    {"field":"count","title":"count"},
                    {"field":"created_at","title":"created_at","hide":"true"},
                    {"field":"updated_at","title":"updated_at"},
                    {"field": "uid", "title": "查看", templet:"#game_view"}
                ]]
            });

            //监听行工具事件
            table.on('toolbar(data_gamepage_table)', function(obj){
                var checked = table.checkStatus('data_gamepage_table');

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("game.game-page.create", \request()->all()) }}', '创建页面', {
                        end: function(index, layero){
                            // table.reload('data_gamepage_table')
                        }
                    })
                    return true;
                }

                if(obj.event == 'delete' || obj.event == 'update') {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            admin.request.post('{{ route("game.game-page.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_gamepage_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var updateModal = admin.openModal('{{route("game.game-page.edit", ["_id_"])}}'.replace('_id_', checked.data[0].id), '更新页面#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload('data_game_table')
                            }
                        })
                        return true;
                    }else if(obj.event == 'connectVote'){
                        admin.openTab('{{ url("/backend/vote/votes/create") }}?model_id='+checked.data[0].id+'&model='+GAME_MODEL, '新增报名')
                        return true;
                    }
                }
            });

            // tool event
            table.on('tool(data_gamepage_table)', function(obj){
                if(obj.event == 'sourceIde'){
                    admin.openTab('{{ route("game.sourceide", \request()->all()) }}&uid='+obj.data.uid)
                    return true;
                }else if(obj.event == 'diyIde') {
                    admin.openTab('{{ route("game.diyide", \request()->all()) }}&uid='+obj.data.uid)
                    return true;
                }else if(obj.event == 'show') {
                    window.top.open("{{ url("/g") }}/"+obj.data.uid, '', '_target')
                    return true;
                }
            })

             // 上下线
            function tableDone() {
                form.on('switch(updown)', function(e){
                    var _status = e.elem.checked?'up':'down';
                    admin.request.post("{{ route('interface.gamePage.changestatus', '_id_')}}".replace('_id_', e.value), {'status': _status}, function(res) {
                        layer.msg('已'+(_status=='up'?'上线':'下线'))
                    })
                })
            }
        });
    </script>
@endpush
