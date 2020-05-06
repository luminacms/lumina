@extends('vod::backend.layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '课节管理', 'uri' => route('vod.lessons.index')]
       ]" />

    <table class="layui-hide" id="data_lesson_table" lay-filter="data_lesson_table"></table>
@endsection


@push('script')
    <script type="text/html" id="tpl_media">
        @{{ d.title }}<a href="javascript:;" data-uri="@{{ d.media_src }}" class="J_player layui-badge ml-2 bg-green-500" data-type="@{{ d.type }}"><i class="fa fa-play-circle"></i></a>
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                course_id = '{{ request('course_id') }}'
                element = layui.element;

            table.render({
                elem: '#data_lesson_table',
                url: '{!! URL::full() !!}',
                autoShow: '{{ route('vod.lessons.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc', 'course_id': course_id},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true","fixed":"left","width":"120"},
                    {"field":"title","title":"title", width: 350, templet: "#tpl_media"},
                    {"field":"course_title","title":"所属专栏", width: 150},
                    {"field": "type", "title": "类型"},
                    {"field": "length", "title": "时长"},
                    {"field":"price","title":"价格"},
                    {"field":"start_at","title":"start_at"},
                    {"field":"count","title":"浏览数"},
                    {"field":"sort","title":"sort"},
                    {"field":"create_by","title":"create_by"},
                    {"field":"created_at","title":"创建时间"},
                    {"field":"updated_at","title":"更新时间","fixed":"right"}
                ]],
                done: function(){
                    element.render('media')
                }
            });

            //监听行工具事件
            table.on('toolbar(data_lesson_table)', function(obj){
                var checked = table.checkStatus('data_lesson_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTab('{{ route('vod.lessons.create') }}?course_id='+course_id, '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('vod.lessons.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_lesson_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTab('{{route('vod.lessons.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id)
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
