@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '报名数据', 'uri' => route('backend.vote.data.index')],
            ['name' => '文档', 'uri' => route('core.doc', ['path' => urlencode(module_path('vote').'\doc.md')]), 'right'=>'true']
       ]" />

    <table class="layui-hide" id="data_votedata_table" lay-filter="data_votedata_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_votedata_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('backend.vote.data.show', "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                export: {url: '{{ route('interface.vote.data.export', ['id'=>request('vote_id')]) }}', can: true, all: true},
                page: true,
                canSearch: true,
                toolbar: ['delete'],
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true","fixed":"left"},
                    {"field":"vote_id","title":"vote_id"},
                    {"field":"create_by","title":"create_by"},
                    {"field":"score","title":"score","sort":"true"},
                    {"field":"name","title":"name"},
                    {"field":"nickname","title":"nickname"},
                    {"field":"mobile","title":"mobile",width: 150},
                    {"field":"address","title":"address"},
                    {"field":"company","title":"company"},
                    {"field":"visit_no","title":"visit_no"},
                    {"field":"invited_by","title":"invited_by"},
                    {"field":"create_ip","title":"create_ip"},
                    {"field":"agent","title":"agent"},
                    {"field":"created_at","title":"创建时间",width:120}
                    ]]
            });

            //监听行工具事件
            table.on('toolbar(data_votedata_table)', function(obj){
                var checked = table.checkStatus('data_votedata_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ url("/voteDatas/create") }}', '新增数据')
                    return true;
                }

                if(_.indexOf(['delete', 'update'], obj.event) > -1 && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('backend.vote.data.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_votedata_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{ url("/voteDatas/_id_/edit") }}'.replace('_id_', checked.data[0].id), '新增数据')
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
