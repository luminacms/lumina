@extends('vote::backend.layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('backend.vote.vote-options.index')]
       ]" />

    <table class="layui-hide" id="data_voteoption_table" lay-filter="data_voteoption_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_voteoption_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('backend.vote.vote-options.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true","fixed":"left","width":"120"},{"field":"title","title":"title"},{"field":"type","title":"type"},{"field":"isright","title":"isright"},{"field":"thumb","title":"thumb"},{"field":"cheat_count","title":"cheat_count"},{"field":"count","title":"count"},{"field":"created_at","title":"创建时间"},{"field":"updated_at","title":"更新时间","fixed":"right"}]]
            });

            //监听行工具事件
            table.on('toolbar(data_voteoption_table)', function(obj){
                var checked = table.checkStatus('data_voteoption_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTab('{{ route('backend.vote.vote-options.create', request()->all()) }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('backend.vote.vote-options.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_voteoption_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTab('{{route('backend.vote.vote-options.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id)
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
