@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => '积分管理', 'uri' => route('point.point.index')],
        ['name' => '积分日志', 'uri' => route('point.point-log.index')],
    ]" />

    <table class="layui-hide" id="data_pointlog_table" lay-filter="data_pointlog_table"></table>
@endsection


@push('script')
    <script id="tpl_status" type="text/html">
        @{{# if(d.status == 'cancel'){ }}
            <span class="layui-badge bg-red-600">已回滚</span>
        @{{# }else{ }}
            <a lay-event="rollback" class="layui-badge bg-green-600 cursor-pointer">回滚</a>
        @{{# } }}
    </script>
    <script id="tpl_count" type="text/html">
        @{{# if(d.status == 'cancel'){ }}
            <span class="line-through">
        @{{# }else{ }}
            <span>
        @{{# } }}
            @{{# if(d.type == 'decrease'){ }}
                <span class="text-error">- @{{ d.count }}</span>
            @{{# }else if(d.type == 'increase'){ }}
                <strong class="text-success">+ @{{ d.count }}</strong>
            @{{# } }}
        </span>
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#data_pointlog_table',
                url: '{!! URL::full() !!}',
                autoShow: '{{ route("point.point-log.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: [],
                height: 'full-110',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true"},
                    {"field":"status","title":"status","templet": "#tpl_status"},
                    {"field":"count","title":"count","templet": "#tpl_count"},
                    {"field":"left_count","title":"left_count"},
                    {"field":"desc","title":"desc","width": 200},
                    {"field":"create_by","title":"create_by"},
                    {"field":"trace_ip","title":"trace_ip"},
                    {"field":"trace_agent","title":"trace_agent"},
                    {"field":"created_at","title":"created_at","hide":"true"},
                    {"field":"updated_at","title":"updated_at"}
                ]]
            });

            //events
            table.on('tool(data_pointlog_table)', function(obj){
                var checked = table.checkStatus('data_pointlog_table');

                if(obj.event === 'rollback') {
                    admin.request.post('{{ route("point.point-log.rollback") }}', {'id': obj.data.id}, function(res) {
                        if(res.errcode == 0) {
                            layer.msg('操作成功');
                            table.reload('data_pointlog_table')
                        }
                    })
                }
            });

        });
    </script>
@endpush
