
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
            self.modal = null;
            self.config = $.extend({}, self.config, ExportClass.config, options);
            self.render();
        };

    //默认配置
    Class.prototype.config = {

    };
    Class.prototype.event = function(name, param){
        return layui.event.call(this, MOD_NAME, 'btn(' + name + ')', param)
    };
    Class.prototype.on = function(name, callback){
        return layui.onevent.call(this, MOD_NAME, 'btn(' + name +')', callback)
    };

    Class.prototype.hide = function(){
        layer.close(this.modal)
    }
    //评分渲染
    Class.prototype.render = function () {
        var api_user = '/interface/mall/product-attrs';
        var self = this;
        var _picker_html = '<div class="layui-card"><div class="layui-card-body"><table id="picker_user_table" lay-filter="picker_user_table"></table></div></div>'
        self.modal = layer.open({
            type: 1,
            btn: ['选择', '取消'],
            area: ['300px', '500px'],
            content: _picker_html,
            yes: function(index){
                var _checked = table.checkStatus('picker_user_table')
                self.event('yes', _checked.data)
            },
            success: function(){
                table.render({
                    elem: '#picker_user_table',
                    url: api_user,
                    size: 'sm',
                    page: false,
                    toolbar: true,
                    defaultToolbar: [],
                    autoSort: false,
                    cellMinWidth: 80,
                    cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field:'name',title: '名称'},
                        {field:'description', title: '备注'}
                    ]]
                })
            }
        })
    };

    ExportClass.render = function (options) {
        return new Class(options);
    }
    exports(MOD_NAME, ExportClass);
})
