
layui.define(['table', 'admin', 'laytpl'], function (exports) {
    "use strict";
    var table = layui.table,
        layer = window.layer,
        laytpl = layui.laytpl,

        //字符常量
        MOD_NAME = 'MallProductAttrPicker',

        //外部接口
        ExportClass = {
            config: {},
            set: function (options) {
                var self = this;
                self.config = $.extend({}, self.config, options);
                return self;
            },
            on: function (events, callback) {
                return layui.onevent.call(MOD_NAME, 'user(' + name + ')', callback);
            }
        },
        //构造器
        Class = function (options) {
            var self = this;
            self.selected = [];
            self.config = $.extend({}, self.config, ExportClass.config, options);
            self.render();
            self.events();
        };

    //默认配置
    Class.prototype.config = {

    };
    Class.prototype.event = function(name, param){
        return layui.event.call(this, MOD_NAME, 'submit(' + name + ')', param)
    };
    Class.prototype.on = function(name, callback){
        return layui.onevent.call(this, MOD_NAME, 'submit(' + name +')', callback)
    };

    //评分渲染
    Class.prototype.render = function () {
        var api_user = '/interface/mall/product-attrs';
        var self = this;
        var _picker_html = '<div class="layui-row" id="product_attr_layer">' +
                '<div class="layui-col-sm5"><div class="layui-card"><div class="layui-card-body"><table id="picker_user_table" lay-filter="picker_user_table"></table></div></div></div>' +
                '<div class="layui-col-sm2" style="text-align: center; padding-top: 166px;">' +
                    '<div id="moveRight" style="margin-bottom: 10px;"><button data-type="0" data-index="1" class="layui-btn  layui-btn-disabled btn"> <i class="fa"></i></button></div>' +
                '</div>' +
                '<div class="layui-col-sm5">' +
                    '<div class="layui-card"><div class="layui-card-body" style="border: 1px solid #e6e6e6;margin: 15px 15px;height: 360px;overflow-y: scroll;"><form class="layui-form layui-form-pane" id="product_attr_form">' +
                    '</form></div></div>' +
                '</div>' +
            '</div>'
        layer.open({
            type: 1,
            btn: ['选择', '取消'],
            area: ['800px', '500px'],
            content: _picker_html,
            yes: function(index){
                var _form = ''
                // var _checked = table.checkStatus('picker_user_table')
                // self.event('submit(yes)', _checked.data[0])
            },
            no: function(){
                layer.close(picker_modal)
            },
            success: function(){
                table.render({
                    elem: '#picker_user_table',
                    url: api_user,
                    size: 'sm',
                    width: '500px',
                    height: '360px',
                    page: false,
                    toolbar: true,
                    defaultToolbar: [],
                    autoSort: false,
                    cellMinWidth: 80,
                    cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field:'name', width: 80,title: '名称'},
                        {field:'description', title: '备注'}
                    ]]
                })
            }
        })
    };

    Class.prototype.updateIptRender = function(){
        var $itemWrap = $("#product_attr_layer").find("#product_attr_form");
        var optHtml = '';
        var itemTpl =  '<div class="layui-form-item">' +
            '<label for="" class="layui-form-label">{{ d.name }}：</label>' +
            '<div class="layui-input-block"><input type="text" class="layui-input" name="{{ d.id }}"></div>' +
            '</div>';
        $.each(this.selected, function(i, n){
            optHtml += (laytpl(itemTpl).render({
                'id': n.id,
                'name': n.name
            }))
        })
        $itemWrap.html(optHtml)
    }

    //事件处理
    Class.prototype.events = function (name) {
        var self = this,
            selected = 0,
            options = self.config;

        table.on('checkbox(picker_user_table)', function(obj){
            var checkStatus = table.checkStatus('picker_user_table');
            self.selected = checkStatus.data;
            selected = self.selected.length;

            self.updateIptRender();
        });
    };


    ExportClass.render = function (options) {
        return new Class(options);
    }
    exports(MOD_NAME, ExportClass);
})
