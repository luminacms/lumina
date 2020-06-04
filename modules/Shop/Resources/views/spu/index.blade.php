@extends('core::layouts.master')

@section('content')
    <x-submenu :items="[
        ['name' => '商品列表', 'uri' => route('shop.spu.index')],
        ['name' => 'SKU管理', 'uri' => route('shop.sku.index')],
    ]" />

    <table class="layui-hide" id="data_spu_table" lay-filter="data_spu_table"></table>
@endsection

@push('script')
    <script type="text/html" id="tpl_title">
        <a lay-event="preview" class="layui-badge mr-1 bg-gray-900">预览</a><span>@{{ d.name }}</span>
    </script>
    <script type="text/html" id="game_status">
        <input type="checkbox" name="switch" lay-skin="switch" lay-text="上架|下架" lay-filter="updown" value="@{{ d.id }}"
            @{{# if(d.status=='up'){ }}
             checked
            @{{# } }}
        >
    </script>
    <script type="text/html" id="product_thumb">
        <img src="@{{ d.thumb || "/assets/empty.jpg" }}" alt="" height="65" class="block cursor-pointer">
    </script>
    <script>
        layui.use(['table', 'element', 'form'], function(){
            var table = layui.table,
                admin = parent.layui.admin,
                form = layui.form,
                element = layui.element,
                url = {
                    preview: '{{ route('shop.preview') }}'
                };

            table.render({
                elem: '#data_spu_table',
                url: '{!! URL::full() !!}',
                autoShow: '{{ route("shop.spu.show", "_id_") }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-110',
                lineHeight: 65,
                cellMinWidth: 80,
                done: tableDone,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"uid","title":"商品ID","width":150},
                    {"field":"thumb","title":"thumb","templet":"#product_thumb","width":100},
                    {"field":"name","title":"name","width":250, "templet": "#tpl_title"},
                    {"field":"category_id","title":"总库存"},
                    {"field":"category_id","title":"销量"},
                    {"field":"status","title":"状态",templet: "#game_status",width:95},
                    {"field":"created_at","title":"创建时间"},
                ]]
            });

            //监听行工具事件
            table.on('toolbar(data_spu_table)', function(obj){
                var checked = table.checkStatus('data_spu_table');

                if(obj.event == 'create') {
                    var createModal = admin.openTab('{{ route("shop.spu.create", \request()->all()) }}', '新增数据', {
                        area: '1000px',
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
                        var createModal = admin.openModal(
                            '{{route("shop.spu.edit", "_id_")}}'.replace('_id_', checked.data[0].id)+'?type='+checked.data[0].type,
                            '修改数据#'+checked.data[0].id,
                            {
                                area: '1000px',
                                end: function(index, layero){
                                    // table.reload('data_game_table')
                                }
                            })
                        return true;
                    }
                }
            });

            table.on('tool(data_spu_table)', function(obj){
                parent.layer.open({
                    type: 2,
                    area: ['375px', '90%'],
                    content: url.preview + '?uid=' + obj.data.uid
                })
            });

            // 上下线
            function tableDone() {
                form.on('switch(updown)', function(e){
                    var _status = e.elem.checked?'up':'down';
                    admin.request.post("{{ route('interface.gamePage.changestatus', '_id_')}}".replace('_id_', e.value), {'status': _status}, function(res) {
                        layer.msg('已'+(_status=='up'?'上线':'下线'))
                    })
                })

                //图片预览
                layer.photos({
                    photos: "#lumina_app"
                })
            }
        });
    </script>
@endpush
