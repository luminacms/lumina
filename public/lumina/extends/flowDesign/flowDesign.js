
layui.define(['jquery','laytpl','layer'], function (exports) {
    "use strict";

    var laytpl = layui.laytpl,
        layer = layui.layer;

    var MOD_NAME = 'flowDesign',
        FLOW_HTML = '',
        left_line = '<div class="top-left-cover-line"></div><div class="bottom-left-cover-line"></div>',
        right_line = '<div class="top-right-cover-line"></div><div class="bottom-right-cover-line"></div>',

        node_end = '<div class="end-node"><div class="end-node-circle"></div><div class="end-node-text">流程结束</div></div>',
        node_add = '<div class="add-node-btn-box"><div class="add-node-btn"><button class="btn j_btn" type="button"><i class="fa fa-plus"></i></button></div></div>',
        node_wrap = ['<div class="node-wrap">','<div class="node-wrap-box node_sid-startevent start-node">',
        '<div class="title" style="background: {{ d.bgColor }};"><i class="fa fa-{{ d.icon }}"></i><span class="">{{ d.title}}</span><i class="fa fa-close close"></i></div>',
        '<div class="content"><div class="text">周小杰</div><i class="fa fa-angle-right"></i></div></div>',node_add, '</div>'].join(''),

        col_box = ['<div class="col-box">','<div class="condition-node">', '<div class="condition-node-box"><div class="auto-judge">',
        '<div class="title-wrapper"><span class="editable-title">条件1</span><span class="priority-title">优先级1</span><i class="anticon anticon-close close"></i></div>',
        '<div class="content">请设置条件</div><div class="sort-right">&gt;</div></div>',node_add,'</div></div>{{ d.ccnode }}</div>'].join('');

    var ExportClass = {
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
    thisClass = function () {return {config: self.config}},
    Class = function (options) {
        var self = this;
        self.config = $.extend({}, self.config, ExportClass.config, options);
        layui.addcss('extends/flowDesign/flowDesign.css', function(){
            $(".dingflow-design").show()
            self.render();
            self.events();
        })
    };

    //默认配置
    Class.prototype.config = {
        data: {}
    };
    Class.prototype.event = function(name, param){
        return layui.event.call(this, MOD_NAME, 'btn(' + name + ')', param)
    };
    Class.prototype.on = function(name, callback){
        return layui.onevent.call(this, MOD_NAME, name, callback)
    };

    //评分渲染
    Class.prototype.render = function () {
        var option = this.config,
            self = this,
            $wrap = $(this.config.elem);

        $.each(option.data, function(i, n) {
            FLOW_HTML += self.renderNode(n)
        })
        $wrap.append(FLOW_HTML + node_end);
    };

    Class.prototype.renderNode = function(item) {
        var self = this;
        switch (item.type) {
            case 'approver':
                return laytpl(node_wrap).render({'bgColor': '#FF943E', 'title': '审批人', 'icon': 'user'})
                break;
            case 'cc':
                return laytpl(node_wrap).render({'bgColor': '#3296FA','title': '抄送人', 'icon': 'paper-plane'})
                break;
            case 'map':
                var _cnode = '',_ccnode = '';
                $.each(item.children, function(i, n) {
                    _ccnode = '';
                    if(i==0) _ccnode += left_line
                    if(i==item.children.length-1) _ccnode += right_line
                    $.each(n.map, function(ii, nn){
                        _ccnode += self.renderNode(nn)
                    })
                    _cnode += laytpl(col_box).render({'ccnode': _ccnode})
                })
                return ['<div class="branch-wrap"><div class="branch-box-wrap">',
                    '<div class="branch-box"><button class="add-branch">添加条件</button>',_cnode,'</div>',node_add,'</div></div>'].join('');
                break;
        }
    };

    //事件处理
    Class.prototype.events = function (name) {
        var self = this,
            options = self.config,
            _optionhtml = ['<a href="javascript:;">审批人</a>','<a href="javascript:;">抄送人</a>','<a href="javascript:;">条件分支</a>']

        $(options.elem).on("click", ".j_btn", function(){
            layer.tips(_optionhtml, $(this), {time: 0, shade : 0.1,shadeClose: true});
        })

        console.log(name)
    };


    ExportClass.render = function (options) {
        return thisClass.call(new Class(options));
    }

    exports(MOD_NAME, ExportClass);
})
