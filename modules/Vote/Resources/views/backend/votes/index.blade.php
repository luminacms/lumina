@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('backend.vote.votes.index')],
            ['name' => '文档', 'uri' => route('core.doc', ['path' => urlencode(module_path('vote').'/doc.md')]), 'right'=>'true']
       ]" />

    <table class="layui-hide" id="data_vote_table" lay-filter="data_vote_table"></table>
@endsection


@push('script')
    <script type="text/html" id="data_vote_tool">
        @{{# if(d.type == 'quiz' || d.type == 'vote'){ }}
        <a class="layui-btn layui-btn-xs" lay-href="{{ route('backend.vote.maker') }}?id=@{{ d.id }}">主题管理</a>
        <a class="layui-btn layui-btn-xs bg-red-800" lay-href="{{ route('backend.vote.votes.state') }}?vote_id=@{{ d.id }}">数据</a>
        @{{# } }}
    </script>
    <script type="text/html" id="data_vote_title">
        @{{ d.title }}<a lay-event="goVoteDemo" target="_blank" class="cursor-pointer ml-1"><i class="fa fa-eye"></i></a>
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_vote_table',
                url: '{{ URL::full() }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: ['create', 'update'],
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true","fixed":"left",width: 80},
                    {"field":"title","title":"title",width: 600,templet: '#data_vote_title'},
                    {"field":"typeLabel","title":"type"},
                    {"title":"参与人数","templet":"<div><a class='cursor-pointer underline' lay-event='goVoteData'><strong class='text-red-600 text-2xl'>@{{ d.vote_data }}</strong></a>/<span>@{{ d.vote_data_valid }}</span></div>"},
                    {"field":"notice_webhook","title":"notice_webhook"},
                    {"field":"notice_interval","title":"notice_interval"},{"field":"created_at","title":"创建时间","fixed":"right"},{"field":"updated_at","title":"更新时间","fixed":"right"},{"title":"\u64cd\u4f5c","toolbar":"#data_vote_tool","fixed":"right","width":150}]]
            });

            //监听行工具事件
            table.on('toolbar(data_vote_table)', function(obj){
                var checked = table.checkStatus('data_vote_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTab('{{ route("backend.vote.votes.create") }}', '新增报名')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update')) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route("backend.vote.votes.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_vote_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTab('{{ route("backend.vote.votes.edit", "_id_") }}'.replace('_id_', checked.data[0].id), '更新报名')
                        return true;
                    }

                }
            });

            table.on('tool(data_vote_table)', function(obj){
                if(obj.event == 'goVoteData') {
                    parent.layui.admin.openTab('{{ route("backend.vote.data.index") }}?vote_id='+obj.data.id, '报名数据#'+obj.data.id)
                    return true;
                }else if(obj.event == 'goVoteDemo') {
                    var tempwindow=parent.window.open('_blank');
                    tempwindow.location.href = '{{ route("vote.index", "_id_") }}'.replace('_id_', obj.data.uid)
                    return true;
                }
            })
        });
    </script>
@endpush
