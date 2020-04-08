@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => '品牌管理', 'uri' => route('core.users.index')],
        ['name' => '新增', 'uri' => route('core.users.create'), 'right'=>true],
    ]" />

    <table class="layui-hide" id="test-table-simple" lay-filter="test-table-simple"></table>
@endsection


@push('script')
    <script type="text/html" id="test-table-toolbar-barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
    <script type="text/html" id="ticket_process">
        <div class="layui-progress" lay-showPercent="yes">
            <div class="layui-progress-bar layui-bg-red" lay-percent="10%"></div>
        </div>
    </script>

    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#test-table-simple',
                url: '{{ URL::full() }}',
                page: true,
                cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true","fixed":"left"},{"field":"create_by","title":"create_by"},{"field":"name","title":"name"},{"field":"status","title":"status"},{"field":"logo_src","title":"logo_src"},{"field":"description","title":"description"},{"field":"created_at","title":"创建时间","fixed":"right"},{"field":"updated_at","title":"更新时间","fixed":"right"},{"title":"\u64cd\u4f5c","toolbar":"#test-table-toolbar-barDemo","fixed":"right","width":150}]],
            });

            //监听行工具事件
            table.on('tool(test-table-simple)', function(obj){
                var data = obj.data;
                console.log(obj)
                if(obj.event === 'del'){
                    layer.confirm('真的删除行么', function(index){
                        obj.del();
                        layer.close(index);
                    });
                } else if(obj.event === 'edit'){
                    layer.prompt({
                        formType: 2
                        ,value: data.email
                    }, function(value, index){
                        obj.update({
                            email: value
                        });
                        layer.close(index);
                    });
                }
            });

        });
    </script>
@endpush
