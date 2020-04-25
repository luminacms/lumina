@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => '列表管理', 'uri' => route('shop.spu.index')]
    ]" />

    <table class="layui-hide" id="data_spu_table" lay-filter="data_spu_table"></table>
@endsection


@push('script')
    <script type="text/html" id="product_thumb">
        <img src="@{{ d.thumb }}" alt="" height="65">
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                admin = parent.layui.admin,
                element = layui.element;

            table.render({
                elem: '#data_spu_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route("shop.spu.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                lineHeight: 65,
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"id","title":"id","sort":"true"},
                    {"field":"category_id","title":"category_id"},
                    {"field":"status","title":"status"},
                    {"field":"name","title":"name"},
                    {"field":"description","title":"description"},
                    {"field":"unit","title":"unit"},
                    {"field":"thumb","title":"thumb","templet":"#product_thumb"},{"field":"pic_url","title":"pic_url"},{"field":"price_fee","title":"price_fee"},{"field":"market_price_fee","title":"market_price_fee"},{"field":"create_by","title":"create_by"},{"field":"created_at","title":"created_at","hide":"true"},{"field":"updated_at","title":"updated_at"}]]
            });

            //监听行工具事件
            table.on('toolbar(data_spu_table)', function(obj){
                var checked = table.checkStatus('data_spu_table');

                if(obj.event == 'create') {
                    var createModal = admin.openTab('{{ route("shop.spu.create", \request()->all()) }}', '新增数据', {
                        end: function(index, layero){
                            table.reload('data_game_table')
                        }
                    })
                    return true;
                }

                if((obj.event == 'delete' || obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            admin.request.post('{{ route("shop.spu.destroy", "_id_") }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_spu_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        var createModal = admin.openTab('{{route("shop.spu.edit", "_id_")}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id, {
                            end: function(index, layero){
                                // table.reload('data_game_table')
                            }
                        })
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
