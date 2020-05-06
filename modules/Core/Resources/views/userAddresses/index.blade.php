@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('core.user-addresses.index')]
       ]" />

    <table class="layui-hide" id="data_useraddress_table" lay-filter="data_useraddress_table"></table>
@endsection


@push('script')
    <script type="text/html" id="data_useraddress_table">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_useraddress_table',
                url: '{!! URL::full() !!}?orderBy=created_at&sortedBy=desc',
                page: true,
                canSearch: true,
                autoShow: '{{ route('core.user-addresses.show', '_id_') }}',
                height: 'full-100',
                toolbar: [],
                cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true","fixed":"left"},{"field":"userid","title":"userid"},{"field":"province","title":"province"},{"field":"city","title":"city"},{"field":"district","title":"district"},{"field":"address","title":"address"},{"field":"zip","title":"zip"},{"field":"contact_name","title":"contact_name"},{"field":"contact_phone","title":"contact_phone"},{"field":"lastused_at","title":"lastused_at"},{"field":"created_at","title":"创建时间","fixed":"right"},{"field":"updated_at","title":"更新时间","fixed":"right"},{"title":"\u64cd\u4f5c","toolbar":"#data_useraddress_table","fixed":"right","width":150}]]
            });

            //监听行工具事件
            table.on('tool(data_useraddress_table)', function(obj){
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
