@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => '列表管理', 'uri' => route('game.games.index')]
    ]" />

    <table class="layui-hide" id="data_game_table" lay-filter="data_game_table"></table>
@endsection


@push('script')
    <script type="text/html" id="game_operate">
        <a class="layui-btn layui-btn-xs" lay-event="gamePages">页面管理</a>
    </script>

    <script type="text/html" id="game_title">
        <a class="cursor-pointer" lay-event="gamePages">@{{ d.name }}</a>
    </script>
    <script>
        layui.use(['table', 'element', 'form'], function(){
            var table = layui.table,
                admin = parent.layui.admin,
                form = layui.form;
            var GAME_MODEL = '{{ urlencode((new \Modules\Game\Models\Game())->getMorphClass()) }}'

            table.render({
                elem: '#data_game_table',
                url: '{{ URL::full() }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"#","width":80},
                    {"field":"name","title":"标题",width: 500,templet: "#game_title"},
                    {"field":"create_by","title":"创建人"},
                    {"field":"count","title":"访问量"},
                    {"field":"created_at","title":"创建时间"},
                    {"field":"updated_at","title":"更新时间"},
                    {toolbar: "#game_operate", "title":"操作",fixed: 'right', width: 150}
                    ]]
            });

            table.on('tool(data_game_table)', function(obj){
                if(obj.event == 'gamePages'){
                    admin.openTab('{{ route("game.game-page.index", ['game_id' => '_id_']) }}'.replace('_id_', obj.data.id), '页面管理')
                    return true;
                }
            })

            //监听行工具事件
            table.on('toolbar(data_game_table)', function(obj){
                var checked = table.checkStatus('data_game_table');

                if(obj.event == 'create') {
                    var createModal = admin.openModal('{{ route("game.games.create") }}', '创建页面', {
                        end: function(index, layero){
                            // table.reload('data_game_table')
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
                            parent.layui.admin.request.post('{{ url("/backend/game/games/_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_game_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var updateModal = admin.openModal('{{ url("/backend/game/games/_id_/edit") }}'.replace('_id_', checked.data[0].id), '更新页面#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload('data_game_table')
                            }
                        })
                        return true;
                    }
                }
            });
            form.on('admin()')

        });
    </script>
@endpush
