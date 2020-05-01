@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => '积分管理', 'uri' => route('point.point.index')],
        ['name' => '积分日志', 'uri' => route('point.point-log.index')],
        ['name' => '文档', 'uri' => route('core.doc', ['path' => urlencode(module_path('point').'/doc.md')]), 'right'=>'true']
    ]" />

    <table class="layui-hide" id="data_point_table" lay-filter="data_point_table"></table>
@endsection


@push('script')
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#data_point_table',
                url: '{!! URL::full() !!}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: [],
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true"},{"field":"type","title":"type"},{"field":"count","title":"count"},{"field":"oid","title":"oid"},{"field":"create_by","title":"create_by"},{"field":"created_at","title":"created_at","hide":"true"},{"field":"updated_at","title":"updated_at"}]]
            });

            //events
            table.on('toolbar(data_point_table)', function(obj){
                var checked = table.checkStatus('data_point_table');



            });

        });
    </script>
@endpush
