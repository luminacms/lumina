@extends('cms::backend.layouts.master')

@section('content')
    <x-submenu :items="[
            ['name' => '列表管理', 'uri' => route('backend.cms.cms-pages.index')]
    ]" />

    <table class="layui-hide" id="data_cmspage_table" lay-filter="data_cmspage_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_cmspage_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('backend.cms.cms-pages.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true","fixed":"left","width":"120"},{"field":"title","title":"title"},{"field":"slug","title":"slug"},{"field":"seo_keyword","title":"seo_keyword"},{"field":"seo_desc","title":"seo_desc"},{"field":"create_by","title":"create_by"},{"field":"created_at","title":"创建时间"},{"field":"updated_at","title":"更新时间","fixed":"right"}]]
            });

            //监听行工具事件
            table.on('toolbar(data_cmspage_table)', function(obj){
                var checked = table.checkStatus('data_cmspage_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTab('{{ route('backend.cms.cms-pages.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('backend.cms.cms-pages.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_cmspage_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTab('{{route('backend.cms.cms-pages.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id)
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
