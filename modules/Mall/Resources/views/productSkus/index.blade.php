@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('core.users.index')],
            ['name' => '新增', 'uri' => route('core.users.create'), 'right'=>true]
       ]" />

    <table class="layui-hide" id="data_table" lay-filter="data_table"></table>
@endsection


@push('script')
    <script type="text/html" id="data_table_toolbar">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_table',
                url: '{{ URL::full() }}',
                page: true,
                cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true","fixed":"left"},{"field":"spu_id","title":"spu_id"},{"field":"attrs","title":"attrs"},{"field":"thumb","title":"thumb"},{"field":"pics","title":"pics"},{"field":"price_fee","title":"price_fee"},{"field":"market_price_fee","title":"market_price_fee"},{"field":"status","title":"status"},{"field":"create_by","title":"create_by"},{"field":"created_at","title":"创建时间","fixed":"right"},{"field":"updated_at","title":"更新时间","fixed":"right"},{"title":"\u64cd\u4f5c","toolbar":"#data_table_toolbar","fixed":"right","width":150}]]
            });

            //监听行工具事件
            table.on('tool(data_table)', function(obj){
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
