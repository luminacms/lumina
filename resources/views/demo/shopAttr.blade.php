@extends('core::layouts.blank')

@section('content')

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/amazeui@2.7.2/dist/css/amazeui.min.css">
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
.goods-spec-many .fa { cursor: pointer; text-align: center; color: #ababab; font-size: 1.3rem; }
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
        <!-- 规格属性 -->
        <div class="spec-attr"></div>

        <!-- 添加规格：按钮 -->
        <div class="spec-group-button">
            <button type="button" class="btn-addSpecGroup layui-btn layui-btn-sm">添加规格</button>
        </div>

        <!-- 添加规格：表单 -->
        <div class="spec-group-add">
            <div class="spec-group-add-item am-form-group">
                <label class="am-form-label form-require">规格名 </label>
                <input type="text" class="input-specName tpl-form-input layui-input" placeholder="请输入规格名称">
            </div>
            <div class="spec-group-add-item am-form-group">
                <label class="am-form-label form-require">规格值 </label>
                <input type="text" class="input-specValue tpl-form-input layui-input" placeholder="请输入规格值">
            </div>
            <div class="spec-group-add-item am-margin-top">
                <button type="button" class="btn-addSpecName layui-btn layui-btn-sm"> 确定
                </button>
                <button type="button" class="layui-btn layui-btn-primary layui-btn-sm"> 取消
                </button>
            </div>
        </div>
        <!-- 商品多规格sku信息 -->
        <div class="goods-sku am-scrollable-horizontal">
            <!-- 分割线 -->
            <div class="goods-spec-line am-margin-top-lg am-margin-bottom-lg"></div>
            <!-- sku 批量设置 -->
            <div class="spec-batch layui-inline">
                <label class="layui-form-label w-48">批量设置</label>
                <div class="layui-input-inline" style="width: 100px;">
                  <input type="text" data-type="goods_no" placeholder="商家编码" class="layui-input">
                </div>
                <div class="layui-input-inline" style="width: 100px;">
                    <input type="number" data-type="goods_price" placeholder="销售价" class="layui-input">
                </div>
                <div class="layui-input-inline" style="width: 100px;">
                    <input type="number" data-type="line_price" placeholder="划线价" class="layui-input">
                </div>
                <div class="layui-input-inline" style="width: 100px;">
                    <input type="number" data-type="stock_num" placeholder="库存数量" class="layui-input">
                </div>
                <div class="layui-input-inline" style="width: 100px;">
                    <input type="number" data-type="goods_weight" placeholder="重量" class="layui-input">
                </div>

                <div class="layui-input-inline" style="width: 100px;">
                    <button type="button" class="btn-specBatchBtn layui-btn">确定</button>
                </div>
            </div>
            <!-- sku table -->
            <table class="spec-sku-tabel layui-table"></table>
        </div>
    </div>
</div>


<!-- 商品规格属性模板 -->
<script id="tpl_spec_attr" type="text/template">
    @{{ each spec_attr }}
    <div class="spec-group-item" data-index="@{{ $index }}" data-group-id="@{{ $value.group_id }}">
        <div class="spec-group-name">
            <span>@{{ $value.group_name }}</span>
            <i class="spec-group-delete fa fa-times-circle" title="点击删除"></i>
        </div>
        <div class="spec-list am-cf">
            @{{ each $value.spec_items item key }}
            <div class="spec-item am-fl" data-item-index="@{{ key }}">
                <span>@{{ item.spec_value }}</span>
                <i class="spec-item-delete fa fa-times-circle" title="点击删除"></i>
            </div>
            @{{ /each }}
            <div class="spec-item-add layui-inline">
                <div class="layui-input-inline">
                    <input type="text" class="ipt-specItem layui-input" style="height:32px">
                </div>
                <div class="layui-input-inline">
                    <button type="button" class="btn-addSpecItem layui-btn layui-btn-sm">添加</button>
                </div>
            </div>
        </div>
    </div>
    @{{ /each }}
</script>

<!-- 商品规格table模板 -->
<script id="tpl_spec_table" type="text/template">
    <thead>
        <tr>
            @{{ each spec_attr }}
            <th>@{{ $value.group_name }}</th>
            @{{ /each }}
            <th>商家编码</th>
            <th>销售价</th>
            <th>划线价</th>
            <th>库存</th>
            <th>重量(kg)</th>
        </tr>
    </thead>
    <tbody>
    @{{ each spec_list item }}
    <tr data-index="@{{ $index }}" data-sku-id="@{{ item.spec_sku_id }}">
        @{{ each item.rows td itemKey }}
        <td class="td-spec-value am-text-middle" rowspan="@{{ td.rowspan }}">
            @{{ td.spec_value }}
        </td>
        @{{ /each }}
        <td>
            <input type="text" name="goods_no" value="@{{ item.form.goods_no }}" class="ipt-goods-no layui-input am-field-valid">
        </td>
        <td>
            <input type="number" name="goods_price" value="@{{ item.form.goods_price }}" class="am-field-valid layui-input"
                   required>
        </td>
        <td>
            <input type="number" name="line_price" value="@{{ item.form.line_price }}" class="am-field-valid layui-input">
        </td>
        <td>
            <input type="number" name="stock_num" value="@{{ item.form.stock_num }}" class="am-field-valid layui-input"
                   required>
        </td>
        <td>
            <input type="number" name="goods_weight" value="@{{ item.form.goods_weight }}" class="am-field-valid layui-input"
                   required>
        </td>
    </tr>
    @{{ /each }}
    </tbody>
</script>


<script src="https://cdn.jsdelivr.net/npm/art-template@4.13.2/lib/template-web.js"></script>

<script type="text/javascript">
    (function () {

        // 商品规格数据
        var data = {
                spec_attr: [],
                spec_list: []
            }

            // 配置信息
            ,
            setting = {
                container: '.goods-spec-many'
            };

        function GoodsSpec(options, baseData) {
            // 配置信息
            setting = $.extend(true, {}, setting, options);
            // 已存在的规格数据
            typeof baseData !== 'undefined' && baseData !== null && (data = baseData);
            // 初始化
            this.initialize();
        }

        GoodsSpec.prototype = {
            /**
             * 初始化
             */
            initialize: function () {
                // 注册html容器
                this.$container = $(setting.container);
                this.$specAttr = this.$container.find('.spec-attr');
                // 显示添加规则组表单事件
                this.showAddSpecGroupEvent();
                // 确认新增规则组事件
                this.submitAddSpecGroupEvent();
                // 取消新增规则组事件
                this.cancelAddSpecGroupEvent();
                // 注册添加规格元素事件
                this.addSpecItemEvent();
                // 注册删除规则组事件
                this.deleteSpecGroupEvent();
                // 注册删除规则元素事件
                this.deleteSpecItemEvent();
                // 注册批量设置sku事件
                this.batchUpdateSku();
                // 注册表格input数据修改事件
                this.updateSpecInputEvent();
                // 渲染已存在的sku信息
                this.renderHtml();
            },

            /**
             * 显示添加规则组表单
             */
            showAddSpecGroupEvent: function () {
                // 显示添加规则组表单
                this.$container.on('click', '.btn-addSpecGroup', function () {
                    var $specGroupButton = $(this).parent(),
                        $specGroupAdd = $specGroupButton.next();
                    $specGroupButton.hide();
                    $specGroupAdd.show();
                });
            },

            /**
             * 确认新增规则组
             */
            submitAddSpecGroupEvent: function () {
                var _this = this;
                // 确认添加
                _this.$container.on('click', '.btn-addSpecName', function () {
                    var $specGroupAdd = $(this).parent().parent(),
                        $specGroupButton = $specGroupAdd.prev(),
                        $specNameInput = _this.$container.find('.input-specName'),
                        $specValueInput = _this.$container.find('.input-specValue'),
                        specValueInputValue = $specValueInput.val(),
                        specNameInputValue = $specNameInput.val();
                    if (specNameInputValue === '' || specValueInputValue === '') {
                        layer.msg('请填写规则名或规则值');
                        return false;
                    }
                    // 添加到数据库
                    var load = layer.load();
                    // $.post(STORE_URL + '/goods.spec/addSpec', {
                    //     spec_name: specNameInputValue,
                    //     spec_value: specValueInputValue
                    // }, function (result) {
                        layer.close(load);
                        // if (result.code !== 1) {
                        //     layer.msg(result.msg);
                        //     return false;
                        // }
                        // 清空输入内容
                        $specNameInput.val('') && $specValueInput.val('');
                        // 记录规格数据
                        // data.spec_attr.push({
                        //     group_id: result.data.spec_id,
                        //     group_name: specNameInputValue,
                        //     spec_items: [{
                        //         item_id: result.data
                        //             .spec_value_id,
                        //         spec_value: specValueInputValue
                        //     }]
                        // });

                        data.spec_attr.push({
                            group_id: 1,
                            group_name: specNameInputValue,
                            spec_items: [{
                                item_id: 2
                                    .spec_value_id,
                                spec_value: specValueInputValue
                            }]
                        });
                        // 渲染规格属性html
                        _this.renderHtml();
                        // 隐藏添加规格组表单
                        $specGroupAdd.hide() && $specGroupButton.show();
                    // });

                    console.log(data)

                });
            },

            /**
             * 取消新增规格组
             */
            cancelAddSpecGroupEvent: function () {
                this.$container.on('click', '.btn-cancleAddSpecName', function () {
                    var $specGroupAdd = $(this).parent().parent(),
                        $specGroupButton = $specGroupAdd.prev();
                    // 隐藏添加规格组表单
                    $specGroupAdd.hide() && $specGroupButton.show()
                });
            },

            /**
             * 添加规则元素事件
             */
            addSpecItemEvent: function () {
                var _this = this;
                _this.$container.on('click', '.btn-addSpecItem', function () {
                    var $this = $(this),
                        $iptSpecItem = $this.parents('.spec-item-add').find("input"),
                        specItemInputValue = $iptSpecItem.val(),
                        $specGroup = $this.parents(".spec-group-item");
                    if (specItemInputValue === '') {
                        layer.msg('规格值不能为空');
                        return false;
                    }
                    // 添加到数据库
                    // var load = layer.load();
                    // $.post(STORE_URL + '/goods.spec/addSpecValue', {
                    //     spec_id: $specGroup.data('group-id'),
                    //     spec_value: specItemInputValue
                    // }, function (result) {
                        // layer.close(load);
                        // if (result.code !== 1) {
                        //     layer.msg(result.msg);
                        //     return false;
                        // }
                        // 记录规格数据

                        console.log(data)
                        console.log($specGroup.data('index'))
                        data.spec_attr[$specGroup.data('index')].spec_items
                            .push({
                                item_id: 22,
                                spec_value: specItemInputValue
                            });
                        // 渲染规格属性html
                        _this.renderHtml();
                    // });
                });
            },

            /**
             * 删除规则组事件
             */
            deleteSpecGroupEvent: function () {
                var _this = this;
                _this.$container.on('click', '.spec-group-delete', function () {
                    // 规则组索引
                    var index = $(this).parent().parent().attr('data-index');
                    layer.confirm('确定要删除该规则组吗？确认后不可恢复请谨慎操作', function (layerIndex) {
                        // 删除指定规则组
                        data.spec_attr.splice(index, 1);
                        // 重新渲染规格属性html
                        _this.renderHtml();
                        layer.close(layerIndex);
                    });
                });
            },

            /**
             * 删除规则组事件
             */
            deleteSpecItemEvent: function () {
                var _this = this;
                _this.$container.on('click', '.spec-item-delete', function () {
                    var $item = $(this).parent(),
                        $specGroup = $item.parent().parent(),
                        groupIndex = $specGroup.attr('data-index'),
                        itemIndex = $item.attr('data-item-index');
                    layer.confirm('确定要删除该规则吗？确认后不可恢复请谨慎操作', function (layerIndex) {
                        // 删除指定规则组
                        data.spec_attr[groupIndex].spec_items.splice(itemIndex,
                            1);
                        // 重新渲染规格属性html
                        _this.renderHtml();
                        layer.close(layerIndex);
                    });
                });
            },

            /**
             * 注册批量设置sku事件
             */
            batchUpdateSku: function () {
                var _this = this,
                    $specBatch = _this.$container.find('.spec-batch');
                $specBatch.on('click', '.btn-specBatchBtn', function () {
                    var formData = {};
                    $specBatch.find('input').each(function () {
                        var $this = $(this),
                            formType = $this.data('type'),
                            value = $this.val();
                        if (typeof formType !== 'undefined' && formType !==
                            '' && value !== '') {
                            formData[formType] = value;
                        }
                    });
                    if (!$.isEmptyObject(formData)) {
                        data.spec_list.forEach(function (item, index) {
                            data.spec_list[index].form = $.extend({}, data
                                .spec_list[index].form, formData);
                        });
                        // 渲染商品规格table
                        _this.renderTabelHtml();
                    }
                });
            },

            /**
             * 渲染多规格模块html
             */
            renderHtml: function () {
                // 渲染商品规格元素
                this.$specAttr.html(template('tpl_spec_attr', data));
                // 渲染商品规格table
                this.renderTabelHtml();
            },

            /**
             * 渲染表格html
             */
            renderTabelHtml: function () {
                var $specTabel = this.$container.find('.spec-sku-tabel'),
                    $goodsSku = $specTabel.parent();
                // 商品规格为空：隐藏sku容器
                if (data.spec_attr.length === 0) {
                    $specTabel.empty();
                    $goodsSku.hide();
                    return false;
                }
                // 构建规格组合列表
                this.buildSpeclist();
                // 渲染table
                $specTabel.html(template('tpl_spec_table', data));
                // 显示sku容器
                $goodsSku.show();
            },

            /**
             * 构建规格组合列表
             */
            buildSpeclist: function () {
                // 规格组合总数 (table行数)
                var totalRow = 1;
                for (var i = 0; i < data.spec_attr.length; i++) {
                    totalRow *= data.spec_attr[i].spec_items.length;
                }
                // 遍历tr 行
                var spec_list = [];
                for (i = 0; i < totalRow; i++) {
                    var rowData = [],
                        rowCount = 1,
                        specSkuIdAttr = [];
                    // 遍历td 列
                    for (var j = 0; j < data.spec_attr.length; j++) {
                        var skuValues = data.spec_attr[j].spec_items;
                        rowCount *= skuValues.length;
                        var anInterBankNum = (totalRow / rowCount),
                            point = ((i / anInterBankNum) % skuValues.length);
                        if (0 === (i % anInterBankNum)) {
                            rowData.push({
                                rowspan: anInterBankNum,
                                item_id: skuValues[point].item_id,
                                spec_value: skuValues[point].spec_value
                            });
                        }
                        specSkuIdAttr.push(skuValues[parseInt(point.toString())].item_id);
                    }
                    spec_list.push({
                        spec_sku_id: specSkuIdAttr.join('_'),
                        rows: rowData,
                        form: {}
                    });
                }
                // 合并旧sku数据
                if (data.spec_list.length > 0 && spec_list.length > 0) {
                    for (i = 0; i < spec_list.length; i++) {
                        var overlap = data.spec_list.filter(function (val) {
                            return val.spec_sku_id === spec_list[i].spec_sku_id;
                        });
                        if (overlap.length > 0) spec_list[i].form = overlap[0].form;
                    }
                }
                data.spec_list = spec_list;
            },

            /**
             * 输入规格信息自动同步更新spec_list
             */
            updateSpecInputEvent: function () {
                var _this = this;
                _this.$container.find('.spec-sku-tabel').on('propertychange change', 'input',
                    function () {
                        var $this = $(this),
                            dataType = $this.attr('name'),
                            specIndex = $this.parent().parent().data('index');
                        data.spec_list[specIndex].form[dataType] = $this.val();
                    });
            },

            /**
             * 获取当前data
             */
            getData: function () {
                return data;
            },

            /**
             * sku列表是否为空
             * @returns {boolean}
             */
            isEmptySkuList: function () {
                return !data.spec_list.length;
            }

        };

        window.GoodsSpec = GoodsSpec;

    })();

</script>


<script>
     // 注册商品多规格组件
     var specMany = new GoodsSpec({
        container: '.goods-spec-many'
     })
    //  var specMany = new GoodsSpec({
    //         container: '.goods-spec-many'
    //     }, {
    //         spec_attr: [
    //             {'group_id': 1, 'group_name': '颜色', 'spec_items': [
    //                 {'item_id': 11, 'spec_value': '红色'},
    //                 {'item_id': 12, 'spec_value': '白色'},
    //                 {'item_id': 13, 'spec_value': '蓝色'},
    //             ]},
    //             {'group_id': 2, 'group_name': '内存', 'spec_items': [
    //                 {'item_id': 21, 'spec_value': '8G'},
    //                 {'item_id': 22, 'spec_value': '16G'},
    //             ]}
    //         ],
    //         spec_list: []
    //     });

        // 切换单/多规格
        $('input:radio[name="goods[spec_type]"]').change(function (e) {
            var $goodsSpecMany = $('.goods-spec-many')
                , $goodsSpecSingle = $('.goods-spec-single');
            if (e.currentTarget.value === '10') {
                $goodsSpecMany.hide() && $goodsSpecSingle.show();
            } else {
                $goodsSpecMany.show() && $goodsSpecSingle.hide();
            }
        });

</script>
@endsection
