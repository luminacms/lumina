
<style>
    @charset "UTF-8";


/*# sourceMappingURL=goods.css.map */

</style>

<div class="goods-spec-many am-form-group">

    <div class="goods-spec-box am-u-sm-9 am-u-sm-push-2 am-u-end">
        <x-input.select name="spec_id" :options="Modules\Shop\Models\Spec::getOptions()" search lay-filter="spec" :value="$spu->spec_id ?? ''"/>

        <!-- 商品多规格sku信息 -->
        <div class="goods-sku am-scrollable-horizontal">
            <!-- 分割线 -->
            <div class="goods-spec-line my-4"></div>
            <!-- sku 批量设置 -->
            <div class="spec-batch layui-inline">
                <div class="layui-input-inline" style="width: 100px;">
                  <input type="text" data-type="uid" placeholder="商家编码" class="layui-input">
                </div>
                <div class="layui-input-inline" style="width: 100px;">
                    <input type="number" data-type="price_fee" placeholder="销售价" class="layui-input">
                </div>
                <div class="layui-input-inline" style="width: 100px;">
                    <input type="number" data-type="market_price_fee" placeholder="划线价" class="layui-input">
                </div>
                <div class="layui-input-inline" style="width: 100px;">
                    <input type="number" data-type="stock" placeholder="库存数量" class="layui-input">
                </div>
                <div class="layui-input-inline" style="width: 100px;">
                    <input type="number" data-type="weight" placeholder="重量" class="layui-input">
                </div>

                <div class="layui-input-inline" style="width: 100px;">
                    <button type="button" class="btn-specBatchBtn layui-btn layui-btn-sm mb-4">批量设置</button>
                </div>
            </div>
            <!-- sku table -->
            <table class="spec-sku-tabel layui-table"></table>
        </div>
    </div>
</div>




<!-- 商品规格table模板 -->
<script id="tpl_spec_table" type="text/template">
    <thead>
        <tr>
            @{{ each spec_attr }}
            <th>@{{ $value.label }}</th>
            @{{ /each }}
            <th>商家编码（全局唯一，不支持修改）</th>
            <th>销售价</th>
            <th>划线价</th>
            <th>库存</th>
            <th>重量(kg)</th>
        </tr>
    </thead>
    <tbody>
    @{{ each spec_list item }}
    <tr data-index="@{{ $index }}" data-attr-id="@{{ item.id }}">
        @{{ each item.rows td itemKey }}
        <td class="td-spec-value am-text-middle" rowspan="@{{ td.rowspan }}">
            @{{ td.label }}
        </td>
        @{{ /each }}
        <td>
            <input type="text" name="sku[@{{$index}}][uid]" value="@{{ item.form.uid }}" class="ipt-goods-no layui-input am-field-valid" @{{ item.form.readonly?"readonly=readonly":"" }} required lay-verify="required">
            <input type="hidden" name="sku[@{{$index}}][spec_val_ids]" value="@{{ item.spec_val_ids }}" />
        </td>
        <td>
            <input type="number" name="sku[@{{$index}}][price_fee]" value="@{{ item.form.price_fee }}" class="am-field-valid layui-input" required lay-verify="required">
        </td>
        <td>
            <input type="number" name="sku[@{{$index}}][market_price_fee]" value="@{{ item.form.market_price_fee }}" class="am-field-valid layui-input" lay-verify="required">
        </td>
        <td>
            <input type="number" name="sku[@{{$index}}][stock]" value="@{{ item.form.stock }}" class="am-field-valid layui-input" required lay-verify="required">
        </td>
        <td>
            <input type="number" name="sku[@{{$index}}][weight]" value="@{{ item.form.weight }}" class="am-field-valid layui-input" required lay-verify="required">
        </td>
    </tr>
    @{{ /each }}
    </tbody>
</script>
<script src="https://cdn.jsdelivr.net/npm/art-template@4.13.2/lib/template-web.js"></script>

@push('script')

<script>
    layui.extend({
        'attr': 'modules/shop/attr'
    }).use(['attr', 'form', 'element','admin'], function(){
        var attr = layui.attr,
            form = layui.form,
            admin = layui.admin,
            element = layui.element;

        var spec_ids = '{{ $spu->spec_id ?? '' }}'

        renderSpecTable(spec_ids)
        function renderSpecTable(spec_id)
        {
            if(spec_id) {
                var index = layer.load();
                admin.request.get('/interface/shop/sku', {'spec_id': spec_id, 'spu_id': {{ $spu->uid ?? '0'}}}, function(res) {
                    var data = res.data
                    attr.render({
                        container: '.goods-spec-many'
                    }, {
                        spec_attr: data['attr'],
                        spec_list: data['list']
                    })

                    layer.close(index)
                })
            }else{
                attr.render({
                    container: '.goods-spec-many'
                }, {
                    spec_attr: [],
                    spec_list: []
                })
            }
        }
        form.on('select(spec)', function(data){
            renderSpecTable(data.value)
        });

        form.on('submit(*)', function(){
            window.location.reload()
        })
    })

</script>
@endpush

