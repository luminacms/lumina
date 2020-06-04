
<style>
    @charset "UTF-8";
/* 多规格 */
.goods-spec-many { display: block; /* 添加规格组 */ /* sku容器 */ }
.goods-spec-many .goods-spec-box { margin-top: 15px; border: 1px solid #e4e4e4; padding: 20px; border-radius: 4px; }
.goods-spec-many input { font-size: 1.3rem !important; padding-left: 10px !important; border: 1px solid #e3e2e5 !important; }
.goods-spec-many input.am-field-error { border-color: #dd514c !important; }
.goods-spec-many .spec-group-item { margin-bottom: 25px; }
.goods-spec-many .spec-group-item .spec-group-name { margin-bottom: 15px; }
.goods-spec-many .spec-group-item .spec-group-name span { font-size: 1.5rem; }
.goods-spec-many .spec-group-item .spec-group-name .fa { display: inline-block; }
.goods-spec-many .spec-group-item .spec-list .spec-item { position: relative; margin-right: 12px; margin-bottom: 12px; }
.goods-spec-many .spec-group-item .spec-list .spec-item span { min-width: 50px; display: inline-block; border: 1px solid #ddd; text-align: center; padding: 0 15px; border-radius: 2px; font-size: 1.3rem; line-height: 30px; }
.goods-spec-many .spec-group-item .spec-list .spec-item:hover .fa { visibility: visible; }
.goods-spec-many .spec-group-item .spec-list .spec-item .fa { position: absolute; width: 20px; top: -9px; right: -9px; visibility: hidden; }
.goods-spec-many .spec-group-item .spec-item-add input { width: 110px; border-top-left-radius: 4px; border-bottom-left-radius: 4px; }
.goods-spec-many .spec-group-item .spec-item-add button { display: table-cell; height: 32px; font-size: 1.3rem; border-color: #e3e2e5; border-left: none; border-top-right-radius: 4px; border-bottom-right-radius: 4px; outline: none; }
/* .goods-spec-many .fa { cursor: pointer; text-align: center; color: #ababab; font-size: 1.3rem; } */
.goods-spec-many .fa:hover { color: #6b6b6b; }
.goods-spec-many .spec-group-add { display: none; }
.goods-spec-many .spec-group-add .spec-group-add-item { margin-bottom: 10px; }
.goods-spec-many .spec-group-add .spec-group-add-item input { width: 160px; border-radius: 4px; display: inline-block; margin-left: 12px; }
.goods-spec-many .goods-sku { display: none; /* 批量设置sku */ /* 商品sku表格 */ }
.goods-spec-many .goods-sku .goods-spec-line { border: 1px dashed #e3e2e5; }
.goods-spec-many .goods-sku .spec-batch { margin-bottom: 2rem; }
.goods-spec-many .goods-sku .spec-batch .am-form-label { padding-top: 0; }
.goods-spec-many .goods-sku .spec-batch .am-form-group { margin-left: .6rem; }
.goods-spec-many .goods-sku .spec-batch .am-form-group input { width: 140px; }
.goods-spec-many .goods-sku .spec-sku-tabel td.td-spec-value { padding: .7rem 1.3rem !important; }
.goods-spec-many .goods-sku .spec-sku-tabel input { display: inline-block !important; }

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
    })

</script>
@endpush

