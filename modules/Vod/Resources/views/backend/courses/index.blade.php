@extends('vod::backend.layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '专栏管理', 'uri' => route('vod.courses.index')],
            ['name' => '接口文档', 'uri' => route('core.doc', ['path' => urlencode(module_path('vod').'/doc.md')]), 'right'=>'true']
       ]" />

    <table class="layui-hide" id="data_course_table" lay-filter="data_course_table"></table>
@endsection


@push('script')
    <script type="text/html" id="product_thumb">
        @{{# if(d.cover){ }}
        <img src="@{{ d.cover }}" alt="" height="50">
        @{{# } }}
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_course_table',
                url: '{!! URL::full() !!}',
                autoShow: '{{ route('vod.courses.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-110',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true","fixed":"left","width":"80"},
                    {"field":"title","title":"标题", width: 350, templet: "<div><a lay-href='{{ route('vod.lessons.index') }}?course_id=@{{ d.id }}'>@{{ d.title }}</a></div>"},
                    {field: 'status', 'title': '状态'},
                    {field: 'parentid', 'title': '父级栏目', templet: '<div>@{{ !!d.parent?d.parent.title:"" }}</div>'},
                    {"field":"price","title":"价格"},
                    {"field":"count","title":"统计"},
                    {"field":"create_by","title":"创建人"},
                    {"field":"created_at","title":"创建时间",width: 150},
                    {"field":"updated_at","title":"更新时间","fixed":"right",width: 250}
                    ]]
            });

            //监听行工具事件
            table.on('toolbar(data_course_table)', function(obj){
                var checked = table.checkStatus('data_course_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTab('{{ route('vod.courses.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('vod.courses.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                if(res.errcode == 0) {
                                    layer.msg('删除成功');
                                    table.reload('data_course_table')
                                }
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTab('{{route('vod.courses.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id)
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
