@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('mall.product-spus.index')]
       ]" />

    <table class="layui-hide" id="data_productspu_table" lay-filter="data_productspu_table"></table>
@endsection


@push('script')
    <script type="text/html" id="data_productspu_table">
        <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
    <script type="text/html" id="product_thumb">
        <img src="@{{ d.thumb }}" alt="" height="65">
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_productspu_table',
                url: '{{ URL::full() }}?orderBy=created_at&sortedBy=desc',
                autoShow: '{{ route('mall.product-spus.show', '_id_') }}',
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: "full-100",
                lineHeight: 65,
                cellMinWidth: 80,
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true","fixed":"left",width:80,align:"center"},{"field":"thumb","templet":"#product_thumb"},{"field":"brand_id","title":"brand_id"},{"field":"category_id","title":"category_id"},{"field":"status","title":"status"},{"field":"name","title":"name"},{"field":"description","title":"description"},{"field":"unit","title":"unit"},{"field":"pic_url","title":"pic_url"},{"field":"price_fee","title":"price_fee"},{"field":"market_price_fee","title":"market_price_fee"},{"field":"create_by","title":"create_by"},{"field":"created_at","title":"创建时间","fixed":"right"},{"field":"updated_at","title":"更新时间","fixed":"right"},{"title":"\u64cd\u4f5c","toolbar":"#data_productspu_table","fixed":"right","width":150}]]
            });

            //监听行工具事件
            table.on('toolbar(data_productspu_table)', function(obj){
                var checked = table.checkStatus('data_productspu_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ route('mall.product-spus.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('mall.product-spus.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_qlpost_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{route('mall.product-spus.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '新增数据')
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
