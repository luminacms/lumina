
layui.define('jquery', function (exports) {
    "use strict";
    var $ = layui.jquery,

        //字符常量
        MOD_NAME = 'upload',

        //外部接口
        ExportClass = {
            config: {},
            set: function (options) {
                var self = this;
                self.config = $.extend({}, self.config, options);
                return self;
            },
            on: function (events, callback) {
                return layui.onevent.call(this, MOD_NAME, events, callback);
            }
        },
        //操作当前实例
        thisClass = function () {
            var self = this, options = self.config;
            return {
                config: options
            }
        },
        //构造器
        Class = function (options) {
            var self = this;
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
        return layui.onevent.call(this, MOD_NAME, name, callback)
    };

    //评分渲染
    Class.prototype.render = function () {

        console.log(this.config)

    };

    //事件处理
    Class.prototype.events = function (name) {
        var self = this,
            options = self.config;

        console.log(name)
    };


    ExportClass.render = function (options) {
        return thisClass.call(new Class(options));
    }
    exports(MOD_NAME, ExportClass);
})
