(function (factory) {

    if (typeof window.define === 'function') {
        if (window.define.amd) {
            // AMD模式
            window.define('wangEditorLight', ["jquery"], factory);
        } else if (window.define.cmd) {
            // CMD模式
            window.define(function (require, exports, module) {
                return factory;
            });
        } else {
            // 全局模式
            factory(window.jQuery);
        }
    } else if (typeof module === "object" && typeof module.exports === "object") {
        // commonjs

        // 引用 css —— webapck
        require('../css/wangEditorLight.css');
        module.exports = factory(
            // 传入 jquery ，支持使用 npm 方式或者自己定义jquery的路径
            require('jquery')
    );
    }else if (window.layui && layui.define) {
        layui.define('jquery', function(exports) { //layui加载
            layui.link(layui.cache.base + '/extends/wangEditor/css/wangEditor.css')
            var wangEditorLight = factory(layui.jquery)

            wangEditorLight.config.menus = [
                'bold',
                'underline',
                'italic',
                'quote',
                'head',
                'unorderlist',
                'emotion'
            ];

            exports('wangEditorLight', wangEditorLight);
        })
    }  else {
        // 全局模式
        factory(window.jQuery);
    }
})(function($){

    // 验证是否引用jquery
    if (!$ || !$.fn || !$.fn.jquery) {
        alert('在引用wangEditorLight.js之前，先引用jQuery，否则无法使用 wangEditorLight');
        return;
    }

    // 定义扩展函数
    var _e = function (fn) {
        var E = window.wangEditorLight;
        if (E) {
            // 执行传入的函数
            fn(E, $);
        }
    };
// 定义构造函数
(function (window, $) {

    // 编辑器（整体）构造函数
    var E = function (elem) {
        // 支持 id 和 element 两种形式
        if (typeof elem === 'string') {
            elem = '#' + elem;
        }

        // ---------------获取基本节点------------------
        var $elem = $(elem);
        if ($elem.length !== 1) {
            return;
        }
        var nodeName = $elem[0].nodeName;
        if (nodeName !== 'TEXTAREA' && nodeName !== 'DIV') {
            // 只能是 textarea 和 div ，其他类型的元素不行
            return;   
        }
        this.valueNodeName = nodeName.toLowerCase();
        this.$valueContainer = $elem;

        // 记录 elem 的 prev 和 parent（最后渲染 editor 要用到）
        this.$prev = $elem.prev();
        this.$parent = $elem.parent();

        // ------------------初始化------------------
        this.init();
    };

    E.fn = E.prototype;

    E.$body = $('body');
    E.$document = $(document);
    E.$window = $(window);
    E.userAgent = navigator.userAgent;
    E.getComputedStyle = window.getComputedStyle;
    E.w3cRange = typeof document.createRange === 'function';
    E.hostname = location.hostname.toLowerCase();
    E.websiteHost = 'wangeditor.github.io|www.wangeditor.com|wangeditor.coding.me';
    E.isOnWebsite = E.websiteHost.indexOf(E.hostname) >= 0;
    E.docsite = 'http://www.kancloud.cn/wangfupeng/wangeditor2/113961';

    // 暴露给全局对象
    window.wangEditorLight = E;

    // 注册 plugin 事件，用于用户自定义插件
    // 用户在引用 wangEditorLight.js 之后，还可以通过 E.plugin() 注入自定义函数，
    // 该函数将会在 editor.create() 方法的最后一步执行
    E.plugin = function (fn) {
        if (!E._plugins) {
            E._plugins = [];
        }

        if (typeof fn === 'function') {
            E._plugins.push(fn);
        }
    };

})(window, $);
// editor 绑定事件
_e(function (E, $) {

    E.fn.init = function () {

        // 初始化 editor 默认配置
        this.initDefaultConfig();

        // 增加container
        this.addEditorContainer();

        // 增加编辑区域
        this.addTxt();

        // 增加menuContainer
        this.addMenuContainer();

        // 初始化菜单集合
        this.menus = {};

        // 初始化commandHooks
        this.commandHooks();

    };

});
// editor api
_e(function (E, $) {

    // 预定义 ready 事件
    E.fn.ready = function (fn) {

        if (!this.readyFns) {
            this.readyFns = [];
        }

        this.readyFns.push(fn);
    };

    // 处理ready事件
    E.fn.readyHeadler = function () {
        var fns = this.readyFns;

        while (fns.length) {
            fns.shift().call(this);
        }
    };

    // 更新内容到 $valueContainer
    E.fn.updateValue = function () {
        var editor = this;
        var $valueContainer = editor.$valueContainer;
        var $txt = editor.txt.$txt;

        if ($valueContainer === $txt) {
            // 传入生成编辑器的div，即是编辑区域
            return;
        }

        var value = $txt.html();
        $valueContainer.val(value);
    };

    // 获取初始化的内容
    E.fn.getInitValue = function () {
        var editor = this;
        var $valueContainer = editor.$valueContainer;
        var currentValue = '';
        var nodeName = editor.valueNodeName;
        if (nodeName === 'div') {
            currentValue = $valueContainer.html();
        } else if (nodeName === 'textarea') {
            currentValue = $valueContainer.val();
        }

        return currentValue;
    };

    // 触发菜单updatestyle
    E.fn.updateMenuStyle = function () {
        var menus = this.menus;

        $.each(menus, function (k, menu) {
            menu.updateSelected();
        });
    };

    // 除了传入的 menuIds，其他全部启用
    E.fn.enableMenusExcept = function (menuIds) {
        if (this._disabled) {
            // 编辑器处于禁用状态，则不执行改操作
            return;
        }
        // menuIds参数：支持数组和字符串
        menuIds = menuIds || [];
        if (typeof menuIds === 'string') {
            menuIds = [menuIds];
        }

        $.each(this.menus, function (k, menu) {
            if (menuIds.indexOf(k) >= 0) {
                return;
            }
            menu.disabled(false);
        });
    };

    // 除了传入的 menuIds，其他全部禁用
    E.fn.disableMenusExcept = function (menuIds) {
        if (this._disabled) {
            // 编辑器处于禁用状态，则不执行改操作
            return;
        }
        // menuIds参数：支持数组和字符串
        menuIds = menuIds || [];
        if (typeof menuIds === 'string') {
            menuIds = [menuIds];
        }

        $.each(this.menus, function (k, menu) {
            if (menuIds.indexOf(k) >= 0) {
                return;
            }
            menu.disabled(true);
        });
    };

    // 隐藏所有 dropPanel droplist modal
    E.fn.hideDropPanelAndModal = function () {
        var menus = this.menus;

        $.each(menus, function (k, menu) {
            var m = menu.dropPanel || menu.dropList || menu.modal;
            if (m && m.hide) {
                m.hide();
            }
        });
    };

});
// selection range API
_e(function (E, $) {

    // 用到 w3c range 的函数，如果检测到浏览器不支持 w3c range，则赋值为空函数
    var ieRange = !E.w3cRange;
    function emptyFn() {}

    // 设置或读取当前的range
    E.fn.currentRange = function (cr){
        if (cr) {
            this._rangeData = cr;
        } else {
            return this._rangeData;
        }
    };

    // 将当前选区折叠
    E.fn.collapseRange = function (range, opt) {
        // opt 参数说明：'start'-折叠到开始; 'end'-折叠到结束
        opt = opt || 'end';
        opt = opt === 'start' ? true : false;

        range = range || this.currentRange();
        
        if (range) {
            // 合并，保存
            range.collapse(opt);
            this.currentRange(range);
        }
    };

    // 获取选区的文字
    E.fn.getRangeText = ieRange ? emptyFn : function (range) {
        range = range || this.currentRange();
        if (!range) {
            return;
        }
        return range.toString();
    };

    // 获取选区对应的DOM对象
    E.fn.getRangeElem = ieRange ? emptyFn : function (range) {
        range = range || this.currentRange();
        var dom = range.commonAncestorContainer;

        if (dom.nodeType === 1) {
            return dom;
        } else {
            return dom.parentNode;
        }
    };

    // 选区内容是否为空？
    E.fn.isRangeEmpty = ieRange ? emptyFn : function (range) {
        range = range || this.currentRange();

        if (range && range.startContainer) {
            if (range.startContainer === range.endContainer) {
                if (range.startOffset === range.endOffset) {
                    return true;
                }
            }
        }

        return false;
    };

    // 保存选区数据
    E.fn.saveSelection = ieRange ? emptyFn : function (range) {
        var self = this,
            _parentElem,
            selection,
            txt = self.txt.$txt.get(0);

        if (range) {
            _parentElem = range.commonAncestorContainer;
        } else {
            selection = document.getSelection();
            if (selection.getRangeAt && selection.rangeCount) {
                range = document.getSelection().getRangeAt(0);
                _parentElem = range.commonAncestorContainer;
            }
        }
        // 确定父元素一定要包含在编辑器区域内
        if (_parentElem && ($.contains(txt, _parentElem) || txt === _parentElem) ) {
            // 保存选择区域
            self.currentRange(range);
        }
    };

    // 恢复选中区域
    E.fn.restoreSelection = ieRange ? emptyFn : function (range) {
        var selection;

        range = range || this.currentRange();

        if (!range) {
            return;
        }

        // 使用 try catch 来防止 IE 某些情况报错
        try {
            selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } catch (ex) {
            E.error('执行 editor.restoreSelection 时，IE可能会有异常，不影响使用');
        }
    };

    // 根据elem恢复选区
    E.fn.restoreSelectionByElem = ieRange ? emptyFn : function (elem, opt) {
        // opt参数说明：'start'-折叠到开始，'end'-折叠到结束，'all'-全部选中
        if (!elem) {
            return;
        }
        opt = opt || 'end'; // 默认为折叠到结束

        // 根据elem获取选区
        this.setRangeByElem(elem);

        // 根据 opt 折叠选区
        if (opt === 'start') {
            this.collapseRange(this.currentRange(), 'start');
        }
        if (opt === 'end') {
            this.collapseRange(this.currentRange(), 'end');
        }
        
        // 恢复选区
        this.restoreSelection();
    };

    // 初始化选区
    E.fn.initSelection = ieRange ? emptyFn : function () {
        var editor = this;
        if( editor.currentRange() ){
            //如果currentRange有值，则不用再初始化
            return;
        }

        var range;
        var $txt = editor.txt.$txt;
        var $firstChild = $txt.children().first();
        
        if ($firstChild.length) {
            editor.restoreSelectionByElem($firstChild.get(0));
        }
    };

    // 根据元素创建选区
    E.fn.setRangeByElem = ieRange ? emptyFn : function (elem) {
        var editor = this;
        var txtElem = editor.txt.$txt.get(0);
        if (!elem || !$.contains(txtElem, elem)) {
            return;
        }

        // 找到elem的第一个 textNode 和 最后一个 textNode
        var firstTextNode = elem.firstChild;
        while (firstTextNode) {
            if (firstTextNode.nodeType === 3) {
                break;
            }
            // 继续向下
            firstTextNode = firstTextNode.firstChild;
        }
        var lastTextNode = elem.lastChild;
        while (lastTextNode) {
            if (lastTextNode.nodeType === 3) {
                break;
            }
            // 继续向下
            lastTextNode = lastTextNode.lastChild;
        }
        
        var range = document.createRange();
        if (firstTextNode && lastTextNode) {
            // 说明 elem 有内容，能取到子元素
            range.setStart(firstTextNode, 0);
            range.setEnd(lastTextNode, lastTextNode.textContent.length);
        } else {
            // 说明 elem 无内容
            range.setStart(elem, 0);
            range.setEnd(elem, 0);
        }

        // 保存选区
        editor.saveSelection(range);
    };

});
// selection range API - IE8及以下
_e(function (E, $) {

    if (E.w3cRange) {
        // 说明支持 W3C 的range方法
        return;
    }

    // -----------------IE8时，需要重写以下方法-------------------

    // 获取选区的文字
    E.fn.getRangeText = function (range) {
        range = range || this.currentRange();
        if (!range) {
            return;
        }
        return range.text;
    };

    // 获取选区对应的DOM对象
    E.fn.getRangeElem = function (range) {
        range = range || this.currentRange();
        if (!range) {
            return;
        }
        var dom = range.parentElement();

        if (dom.nodeType === 1) {
            return dom;
        } else {
            return dom.parentNode;
        }
    };

    // 选区内容是否为空？
    E.fn.isRangeEmpty = function (range) {
        range = range || this.currentRange();

        if (range && range.text) {
            return false;
        }

        return true;
    };

    // 保存选区数据
    E.fn.saveSelection = function (range) {
        var self = this,
            _parentElem,
            selection,
            txt = self.txt.$txt.get(0);

        if (range) {
            _parentElem = range.parentElement();
        } else {
            range = document.selection.createRange();
            if(typeof range.parentElement === 'undefined'){
                //IE6、7中，insertImage后会执行此处
                //由于找不到range.parentElement，所以干脆将_parentElem赋值为null
                _parentElem = null;
            }else{
                _parentElem = range.parentElement();
            }
        }

        // 确定父元素一定要包含在编辑器区域内
        if (_parentElem && ($.contains(txt, _parentElem) || txt === _parentElem) ) {
            // 保存选择区域
            self.currentRange(range);
        }
    };

    // 恢复选中区域
    E.fn.restoreSelection = function (currentRange){
        var editor = this,
            selection,
            range;

        currentRange = currentRange || editor.currentRange();
        if(!currentRange){
            return;
        }

        range = document.selection.createRange();
        try {
            // 此处，plupload上传上传图片时，IE8-会报一个『参数无效』的错误
            range.setEndPoint('EndToEnd', currentRange);
        } catch (ex) {

        }
        
        if(currentRange.text.length === 0){
            try {
                // IE8 插入表情会报错
                range.collapse(false);
            } catch (ex) {
                
            }
            
        }else{
            range.setEndPoint('StartToStart', currentRange);
        }
        range.select();
    };

});
// editor command hooks
_e(function (E, $) {
    
    E.fn.commandHooks = function () {
        var editor = this;
        var commandHooks = {};
        
        // insertHtml
        commandHooks.insertHtml = function (html) {
            var $elem = $(html);
            var rangeElem = editor.getRangeElem();
            var targetElem;
            
            targetElem = editor.getLegalTags(rangeElem);
            if (!targetElem) {
                return;
            }

            $(targetElem).after($elem);
        };

        // 保存到对象
        editor.commandHooks = commandHooks;
    };

});
// editor command API
_e(function (E, $) {

    // 基本命令
    E.fn.command = function (e, commandName, commandValue, callback) {
        var editor = this;
        var hooks;
        
        function commandFn() {
            if (!commandName) {
                return;
            }
            if (editor.queryCommandSupported(commandName)) {
                // 默认命令
                document.execCommand(commandName, false, commandValue);
            } else {
                // hooks 命令
                hooks = editor.commandHooks;
                if (commandName in hooks) {
                    hooks[commandName](commandValue);
                }
            }
        }

        this.customCommand(e, commandFn, callback);
    };

    // 针对一个elem对象执行基础命令
    E.fn.commandForElem = function (elemOpt, e, commandName, commandValue, callback) {
        // 取得查询elem的查询条件和验证函数
        var selector;
        var check;
        if (typeof elemOpt === 'string') {
            selector = elemOpt;
        } else {
            selector = elemOpt.selector;
            check = elemOpt.check;
        }

        // 查询elem
        var rangeElem = this.getRangeElem();
        rangeElem = this.getSelfOrParentByName(rangeElem, selector, check);

        // 根据elem设置range
        if (rangeElem) {
            this.setRangeByElem(rangeElem);
        }

        // 然后执行基础命令
        this.command(e, commandName, commandValue, callback);
    };

    // 自定义命令
    E.fn.customCommand = function (e, commandFn, callback) {
        var editor = this;
        var range = editor.currentRange();

        if (!range) {
            // 目前没有选区，则无法执行命令
            e && e.preventDefault();
            return;
        }

        // 恢复选区（有 range 参数）
        this.restoreSelection(range);

        // 执行命令事件
        commandFn.call(editor);

        // 保存选区（无参数，要从浏览器直接获取range信息）
        this.saveSelection();
        // 重新恢复选区（无参数，要取得刚刚从浏览器得到的range信息）
        this.restoreSelection();

        // 执行 callback
        if (callback && typeof callback === 'function') {
            callback.call(editor);
        }

        // 最后插入空行
        editor.txt.insertEmptyP();

        // 包裹暴露的img和text
        editor.txt.wrapImgAndText();

        // 更新内容
        editor.updateValue();

        // 更新菜单样式
        editor.updateMenuStyle();

        // 隐藏 dropPanel dropList modal  设置 200ms 间隔
        function hidePanelAndModal() {
            editor.hideDropPanelAndModal();
        } 
        setTimeout(hidePanelAndModal, 200);

        if (e) {
            e.preventDefault();
        }
    };

    // 封装 document.queryCommandValue 函数
    // IE8 直接执行偶尔会报错，因此直接用 try catch 封装一下
    E.fn.queryCommandValue = function (commandName) {
        var result = '';
        try {
            result = document.queryCommandValue(commandName);
        } catch (ex) {

        }
        return result;
    };

    // 封装 document.queryCommandState 函数
    // IE8 直接执行偶尔会报错，因此直接用 try catch 封装一下
    E.fn.queryCommandState = function (commandName) {
        var result = false;
        try {
            result = document.queryCommandState(commandName);
        } catch (ex) {

        }
        return result;
    };

    // 封装 document.queryCommandSupported 函数
    E.fn.queryCommandSupported = function (commandName) {
        var result = false;
        try {
            result = document.queryCommandSupported(commandName);
        } catch (ex) {

        }
        return result;
    };

});
// dom selector
_e(function (E, $) {

    var matchesSelector;

    // matchesSelector hook
    function _matchesSelectorForIE(selector) {
        var elem = this;
        var $elems = $(selector);
        var result = false;

        // 用jquery查找 selector 所有对象，如果其中有一个和传入 elem 相同，则证明 elem 符合 selector
        $elems.each(function () {
            if (this === elem) {
                result = true;
                return false;
            }
        });

        return result;
    }

    // 从当前的elem，往上去查找合法标签 如 p head table blockquote ul ol 等
    E.fn.getLegalTags = function (elem) {
        var legalTags = this.config.legalTags;
        if (!legalTags) {
            E.error('配置项中缺少 legalTags 的配置');
            return;
        }
        return this.getSelfOrParentByName(elem, legalTags);
    };

    // 根据条件，查询自身或者父元素，符合即返回
    E.fn.getSelfOrParentByName = function (elem, selector, check) {

        if (!elem || !selector) {
            return;
        }

        if (!matchesSelector) {
            // 定义 matchesSelector 函数
            matchesSelector = elem.webkitMatchesSelector || 
                              elem.mozMatchesSelector ||
                              elem.oMatchesSelector || 
                              elem.matchesSelector;
        }
        if (!matchesSelector) {
            // 如果浏览器本身不支持 matchesSelector 则使用自定义的hook
            matchesSelector = _matchesSelectorForIE;
        }

        var txt = this.txt.$txt.get(0);

        while (elem && txt !== elem && $.contains(txt, elem)) {
            if (matchesSelector.call(elem, selector)) {
                // 符合 selector 查询条件

                if (!check) {
                    // 没有 check 验证函数，直接返回即可
                    return elem;
                }

                if (check(elem)) {
                    // 如果有 check 验证函数，还需 check 函数的确认
                    return elem;
                }
            }

            // 如果上一步没经过验证，则将跳转到父元素
            elem = elem.parentNode;
        }

        return;
    };

});
// 暴露给用户的 API
_e(function (E, $) {

    // 创建编辑器
    E.fn.create = function () {
        var editor = this;

        // 检查 E.$body 是否有值
        // 如果在 body 之前引用了 js 文件，body 尚未加载，可能没有值
        if (!E.$body || E.$body.length === 0) {
            E.$body = $('body');
            E.$document = $(document);
            E.$window = $(window);
        }

        // 执行 addMenus 之前：
        // 1. 允许用户修改 editor.UI 自定义配置UI
        // 2. 允许用户通过修改 editor.menus 来自定义配置菜单
        // 因此要在 create 时执行，而不是 init           
        editor.addMenus();

        // 渲染
        editor.renderMenus();
        editor.renderMenuContainer();
        editor.renderTxt();
        editor.renderEditorContainer();

        // 绑定事件
        editor.eventMenus();
        editor.eventMenuContainer();
        editor.eventTxt();

        // 处理ready事件
        editor.readyHeadler();

        // 初始化选区
        editor.initSelection();

        // $txt 快捷方式
        editor.$txt = editor.txt.$txt;

        // 执行用户自定义事件，通过 E.ready() 添加
        var _plugins = E._plugins;
        if (_plugins && _plugins.length) {
            $.each(_plugins, function (k, val) {
                val.call(editor);
            });
        }
    };

    // 禁用编辑器
    E.fn.disable = function () {
        this.txt.$txt.removeAttr('contenteditable');
        this.disableMenusExcept();

        // 先禁用，再记录状态
        this._disabled = true;
    };
    // 启用编辑器
    E.fn.enable = function () {
        // 先解除状态记录，再启用
        this._disabled = false;
        this.txt.$txt.attr('contenteditable', 'true');
        this.enableMenusExcept();
    };

    // 销毁编辑器
    E.fn.destroy = function () {
        var self = this;
        var $valueContainer = self.$valueContainer;
        var $editorContainer = self.$editorContainer;
        var valueNodeName = self.valueNodeName;

        if (valueNodeName === 'div') {
            // div 生成的编辑器
            $valueContainer.removeAttr('contenteditable');
            $editorContainer.after($valueContainer);
            $editorContainer.hide();
        } else {
            // textarea 生成的编辑器
            $valueContainer.show();
            $editorContainer.hide();
        }
    };

    // 撤销 销毁编辑器
    E.fn.undestroy = function () {
        var self = this;
        var $valueContainer = self.$valueContainer;
        var $editorContainer = self.$editorContainer;
        var $menuContainer = self.menuContainer.$menuContainer;
        var valueNodeName = self.valueNodeName;

        if (valueNodeName === 'div') {
            // div 生成的编辑器
            $valueContainer.attr('contenteditable', 'true');
            $menuContainer.after($valueContainer);
            $editorContainer.show();
        } else {
            // textarea 生成的编辑器
            $valueContainer.hide();
            $editorContainer.show();
        }
    };

    // 清空内容的快捷方式
    E.fn.clear = function () {
        var editor = this;
        var $txt = editor.txt.$txt;
        $txt.html('<p><br></p>');
        editor.restoreSelectionByElem($txt.find('p').get(0));
    };

});
// menuContainer 构造函数
_e(function (E, $) {

    // 定义构造函数
    var MenuContainer = function (editor) {
        this.editor = editor;
        this.init();
    };

    MenuContainer.fn = MenuContainer.prototype;

    // 暴露给 E 即 window.wangEditorLight
    E.MenuContainer = MenuContainer;

});
// MenuContainer.fn bind fn
_e(function (E, $) {

    var MenuContainer = E.MenuContainer;

    // 初始化
    MenuContainer.fn.init = function () {
        var self = this;
        var $menuContainer = $('<div class="wangEditor-menu-container clearfix"></div>');

        self.$menuContainer = $menuContainer;

        // change shadow
        self.changeShadow();
    };

    // 编辑区域滚动时，增加shadow
    MenuContainer.fn.changeShadow = function () {
        var $menuContainer = this.$menuContainer;
        var editor = this.editor;
        var $txt = editor.txt.$txt;

        $txt.on('scroll', function () {
            if ($txt.scrollTop() > 10) {
                $menuContainer.addClass('wangEditorLight-menu-shadow');
            } else {
                $menuContainer.removeClass('wangEditorLight-menu-shadow');
            }
        });
    };

});
// MenuContainer.fn API
_e(function (E, $) {

    var MenuContainer = E.MenuContainer;

    MenuContainer.fn.render = function () {
        var $menuContainer = this.$menuContainer;
        var $editorContainer = this.editor.$editorContainer;

        $editorContainer.append($menuContainer);
    };
    
    // 获取菜单栏的高度
    MenuContainer.fn.height = function () {
        var $menuContainer = this.$menuContainer;
        return $menuContainer.height();
    };

    // 添加菜单
    MenuContainer.fn.appendMenu = function (groupIdx, menu) {
        // 判断是否需要新增一个菜单组
        this._addGroup(groupIdx);
        // 增加菜单（返回 $menuItem）
        return this._addOneMenu(menu);
    };
    MenuContainer.fn._addGroup = function (groupIdx) {
        var $menuContainer = this.$menuContainer;
        var $menuGroup;
        if (!this.$currentGroup || this.currentGroupIdx !== groupIdx) {
            $menuGroup = $('<div class="menu-group clearfix"></div>');
            $menuContainer.append($menuGroup);

            this.$currentGroup = $menuGroup;
            this.currentGroupIdx = groupIdx;
        }
    };
    MenuContainer.fn._addOneMenu = function (menu) {
        var $menuNormal = menu.$domNormal;
        var $menuSelected = menu.$domSelected;

        var $menuGroup = this.$currentGroup;
        var $item = $('<div class="menu-item clearfix"></div>');
        $menuSelected.hide();
        $item.append($menuNormal).append($menuSelected);
        $menuGroup.append($item);

        return $item;
    };

});
// menu 构造函数
_e(function (E, $) {

    // 定义构造函数
    var Menu = function (opt) {
        this.editor = opt.editor;
        this.id = opt.id;
        this.title = opt.title;
        this.$domNormal = opt.$domNormal;
        this.$domSelected = opt.$domSelected || opt.$domNormal;

        // document.execCommand 的参数
        this.commandName = opt.commandName;
        this.commandValue = opt.commandValue;
        this.commandNameSelected = opt.commandNameSelected || opt.commandName;
        this.commandValueSelected = opt.commandValueSelected || opt.commandValue;
    };

    Menu.fn = Menu.prototype;

    // 暴露给 E 即 window.wangEditorLight
    E.Menu = Menu;
});
// Menu.fn 初始化绑定的事件
_e(function (E, $) {

    var Menu = E.Menu;

    // 初始化UI
    Menu.fn.initUI = function () {
        var editor = this.editor;
        var uiConfig = editor.UI.menus;
        var menuId = this.id;
        var menuUI = uiConfig[menuId];

        if (this.$domNormal && this.$domSelected) {
            // 自定义的菜单中，已经传入了 $dom 无需从配置文件中查找生成
            return;
        }

        if (menuUI == null) {
            E.warn('editor.UI配置中，没有菜单 "' + menuId + '" 的UI配置，只能取默认值');
            
            // 必须写成 uiConfig['default'];
            // 写成 uiConfig.default IE8会报错
            menuUI = uiConfig['default'];
        }

        // 正常状态
        this.$domNormal = $(menuUI.normal);

        // 选中状态
        if (/^\./.test(menuUI.selected)) {
            // 增加一个样式
            this.$domSelected = this.$domNormal.clone().addClass(menuUI.selected.slice(1));
        } else {
            // 一个新的dom对象
            this.$domSelected = $(menuUI.selected);
        }
    };

});
// Menu.fn API
_e(function (E, $) {

    var Menu = E.Menu;

    // 渲染菜单
    Menu.fn.render = function (groupIdx) {
        // 渲染UI
        this.initUI();
        
        var editor = this.editor;
        var menuContainer = editor.menuContainer;
        var $menuItem = menuContainer.appendMenu(groupIdx, this);
        var onRender = this.onRender;

        // 渲染tip
        this._renderTip($menuItem);

        // 执行 onRender 函数
        if (onRender && typeof onRender === 'function') {
            onRender.call(this);
        }
    };
    Menu.fn._renderTip = function ($menuItem) {
        var self = this;
        var editor = self.editor;
        var title = self.title;
        var $tip = $('<div class="menu-tip"></div>');
        // var $triangle = $('<i class="tip-triangle"></i>'); // 小三角

        // 计算 tip 宽度
        var $tempDiv;
        if (!self.tipWidth) {
            // 设置一个纯透明的 p（absolute;top:-10000px;不会显示在内容区域）
            // 内容赋值为 title ，为了计算tip宽度
            $tempDiv = $('<p style="opacity:0; filter:Alpha(opacity=0); position:absolute;top:-10000px;">' + title + '</p>');
            // 先添加到body，计算完再 remove
            E.$body.append($tempDiv);
            editor.ready(function () {
                var editor = this;
                var titleWidth = $tempDiv.outerWidth() + 5; // 多出 5px 的冗余
                var currentWidth = $tip.outerWidth();
                var currentMarginLeft = parseFloat($tip.css('margin-left'), 10);
                // 计算完，拿到数据，则弃用
                $tempDiv.remove();
                $tempDiv = null;

                // 重新设置样式
                $tip.css({
                    width: titleWidth,
                    'margin-left': currentMarginLeft + (currentWidth - titleWidth)/2
                });

                // 存储
                self.tipWidth = titleWidth;
            });
        }

        // $tip.append($triangle);
        $tip.append(title);
        $menuItem.append($tip);

        function show() {
            $tip.show();
        }
        function hide() {
            $tip.hide();
        }

        var timeoutId;
        $menuItem.find('a').on('mouseenter', function (e) {
            if (!self.active() && !self.disabled()) {
                timeoutId = setTimeout(show, 200);
            }
        }).on('mouseleave', function (e) {
            timeoutId && clearTimeout(timeoutId);
            hide();
        }).on('click', hide);
    };

    // 绑定事件
    Menu.fn.bindEvent = function () {
        var self = this;

        var $domNormal = self.$domNormal;
        var $domSelected = self.$domSelected;

        // 试图获取该菜单定义的事件（未selected），没有则自己定义
        var clickEvent = self.clickEvent;
        if (!clickEvent) {
            clickEvent = function (e) {
                // -----------dropPanel dropList modal-----------
                var dropObj = self.dropPanel || self.dropList || self.modal;
                if (dropObj && dropObj.show) {
                    if (dropObj.isShowing) {
                        dropObj.hide();
                    } else {
                        dropObj.show();
                    }
                    return;
                }

                // -----------command-----------
                var editor = self.editor;
                var commandName;
                var commandValue;

                var selected = self.selected;
                if (selected) {
                    commandName = self.commandNameSelected;
                    commandValue = self.commandValueSelected;
                } else {
                    commandName = self.commandName;
                    commandValue = self.commandValue;
                }

                if (commandName) {
                    // 执行命令
                    editor.command(e, commandName, commandValue);
                } else {
                    // 提示
                    E.warn('菜单 "' + self.id + '" 未定义click事件');
                    e.preventDefault();
                }
            };
        }
        // 获取菜单定义的selected情况下的点击事件
        var clickEventSelected = self.clickEventSelected || clickEvent;

        // 将事件绑定到菜单dom上
        $domNormal.click(function (e) {
            if (!self.disabled()) {
                clickEvent.call(self, e);
                self.updateSelected();
            }
            e.preventDefault();
        });
        $domSelected.click(function (e) {
            if (!self.disabled()) {
                clickEventSelected.call(self, e);
                self.updateSelected();
            }
            e.preventDefault();
        });
    };

    // 更新选中状态
    Menu.fn.updateSelected = function () {
        var self = this;
        var editor = self.editor;

        // 试图获取用户自定义的判断事件
        var updateSelectedEvent = self.updateSelectedEvent;
        if (!updateSelectedEvent) {
            // 用户未自定义，则设置默认值
            updateSelectedEvent = function () {
                var self = this;
                var editor = self.editor;
                var commandName = self.commandName;
                var commandValue = self.commandValue;

                if (commandValue) {
                    if (editor.queryCommandValue(commandName).toLowerCase() === commandValue.toLowerCase()) {
                        return true;
                    }
                } else if (editor.queryCommandState(commandName)) {
                    return true;
                }

                return false;
            };
        }

        // 获取结果
        var result = updateSelectedEvent.call(self);
        result = !!result;

        // 存储结果、显示效果
        self.changeSelectedState(result);
    };

    // 切换选中状态、显示效果
    Menu.fn.changeSelectedState = function (state) {
        var self = this;
        var selected = self.selected;

        if (state != null && typeof state === 'boolean') {
            if (selected === state) {
                // 计算结果和当前的状态一样
                return;
            }
            // 存储结果
            self.selected = state;

            // 切换菜单的显示
            if (state) {
                // 选中
                self.$domNormal.hide();
                self.$domSelected.show();
            } else {
                // 未选中
                self.$domNormal.show();
                self.$domSelected.hide();
            }
        } // if
    };

    // 点击菜单，显示了 dropPanel modal 时，菜单的状态 
    Menu.fn.active = function (active) {
        if (active == null) {
            return this._activeState;
        }
        this._activeState = active;
    };
    Menu.fn.activeStyle = function (active) {
        var selected = this.selected;
        var $dom = this.$domNormal;
        var $domSelected = this.$domSelected;

        if (active) {
            $dom.addClass('active');
            $domSelected.addClass('active');
        } else {
            $dom.removeClass('active');
            $domSelected.removeClass('active');
        }

        // 记录状态 （ menu hover 时会取状态用 ）
        this.active(active);
    };

    // 菜单的启用和禁用
    Menu.fn.disabled = function (opt) {
        // 参数为空，取值
        if (opt == null) {
            return !!this._disabled;
        }

        if (this._disabled === opt) {
            // 要设置的参数值和当前参数只一样，无需再次设置
            return;
        }

        var $dom = this.$domNormal;
        var $domSelected = this.$domSelected;

        // 设置样式
        if (opt) {
            $dom.addClass('disable');
            $domSelected.addClass('disable');
        } else {
            $dom.removeClass('disable');
            $domSelected.removeClass('disable');
        }

        // 存储
        this._disabled = opt;
    };

});
// dropList 构造函数
_e(function (E, $) {

    // 定义构造函数
    var DropList = function (editor, menu, opt) {
        this.editor = editor;
        this.menu = menu;

        // list 的数据源，格式 {'commandValue': 'title', ...}
        this.data = opt.data;
        // 要为每个item自定义的模板
        this.tpl = opt.tpl;
        // 为了执行 editor.commandForElem 而传入的elem查询方式
        this.selectorForELemCommand = opt.selectorForELemCommand;

        // 执行事件前后的钩子
        this.beforeEvent = opt.beforeEvent;
        this.afterEvent = opt.afterEvent;

        // 初始化
        this.init();
    };

    DropList.fn = DropList.prototype;

    // 暴露给 E 即 window.wangEditorLight
    E.DropList = DropList;
});
// dropList fn bind
_e(function (E, $) {

    var DropList = E.DropList;

    // init
    DropList.fn.init = function () {
        var self = this;

        // 生成dom对象
        self.initDOM();

        // 绑定command事件
        self.bindEvent();

        // 声明隐藏的事件
        self.initHideEvent();
    };

    // 初始化dom结构
    DropList.fn.initDOM = function () {
        var self = this;
        var data = self.data;
        var tpl = self.tpl || '<span>{#title}</span>';
        var $list = $('<div class="wangEditor-drop-list clearfix"></div>');

        var itemContent;
        var $item;
        $.each(data, function (commandValue, title) {
            itemContent = tpl.replace(/{#commandValue}/ig, commandValue).replace(/{#title}/ig, title);
            $item = $('<a href="#" commandValue="' + commandValue + '"></a>');
            $item.append(itemContent);
            $list.append($item);
        });

        self.$list = $list;
    };

    // 绑定事件
    DropList.fn.bindEvent = function () {
        var self = this;
        var editor = self.editor;
        var menu = self.menu;
        var commandName = menu.commandName;
        var selectorForELemCommand = self.selectorForELemCommand;
        var $list = self.$list;

        // 执行事件前后的钩子函数
        var beforeEvent = self.beforeEvent;
        var afterEvent = self.afterEvent;

        $list.on('click', 'a[commandValue]', function (e) {
            // 正式命令执行之前
            if (beforeEvent && typeof beforeEvent === 'function') {
                beforeEvent.call(e);
            }

            // 执行命令
            var commandValue = $(e.currentTarget).attr('commandValue');
            if (menu.selected && editor.isRangeEmpty() && selectorForELemCommand) {
                // 当前处于选中状态，并且选中内容为空
                editor.commandForElem(selectorForELemCommand, e, commandName, commandValue);
            } else {
                // 当前未处于选中状态，或者有选中内容。则执行默认命令
                editor.command(e, commandName, commandValue);
            }

            // 正式命令之后的钩子
            if (afterEvent && typeof afterEvent === 'function') {
                afterEvent.call(e);
            }
        });
    };

    // 点击其他地方，立即隐藏 droplist
    DropList.fn.initHideEvent = function () {
        var self = this;

        // 获取 list elem
        var thisList = self.$list.get(0);

        E.$body.on('click', function (e) {
            if (!self.isShowing) {
                return;
            }
            var trigger = e.target;

            // 获取菜单elem
            var menu = self.menu;
            var menuDom;
            if (menu.selected) {
                menuDom = menu.$domSelected.get(0);
            } else {
                menuDom = menu.$domNormal.get(0);
            }

            if (menuDom === trigger || $.contains(menuDom, trigger)) {
                // 说明由本菜单点击触发的
                return;
            }

            if (thisList === trigger || $.contains(thisList, trigger)) {
                // 说明由本list点击触发的
                return;
            }

            // 其他情况，隐藏 list
            self.hide();
        });

        E.$window.scroll(function () {
            self.hide();
        });

        E.$window.on('resize', function () {
            self.hide();
        });
    };

});
// dropListfn api
_e(function (E, $) {
    
    var DropList = E.DropList;

    // 渲染
    DropList.fn._render = function () {
        var self = this;
        var editor = self.editor;
        var $list = self.$list;

        // 渲染到页面
        editor.$editorContainer.append($list);

        // 记录状态
        self.rendered = true;
    };

    // 定位
    DropList.fn._position = function () {
        var self = this;
        var $list = self.$list;
        var editor = self.editor;
        var menu = self.menu;
        var $menuContainer = editor.menuContainer.$menuContainer;
        var $menuDom = menu.selected ? menu.$domSelected : menu.$domNormal;
        // 注意这里的 offsetParent() 要返回 .menu-item 的 position
        // 因为 .menu-item 是 position:relative
        var menuPosition = $menuDom.offsetParent().position();

        // 取得 menu 的位置、尺寸属性
        var menuTop = menuPosition.top;
        var menuLeft = menuPosition.left;
        var menuHeight = $menuDom.offsetParent().height();
        var menuWidth = $menuDom.offsetParent().width();

        // 取得 list 的尺寸属性
        var listWidth = $list.outerWidth();
        // var listHeight = $list.outerHeight();

        // 取得 $txt 的尺寸
        var txtWidth = editor.txt.$txt.outerWidth();

        // ------------开始计算-------------

        // 初步计算 list 位置属性
        var top = menuTop + menuHeight;
        var left = menuLeft + menuWidth/2;
        var marginLeft = 0 - menuWidth/2;

        // 如果超出了有边界，则要左移（且和右侧有间隙）
        var valWithTxt = (left + listWidth) - txtWidth;
        if (valWithTxt > -10) {
            marginLeft = marginLeft - valWithTxt - 10;
        }
        // 设置样式
        $list.css({
            top: top,
            left: left,
            'margin-left': marginLeft
        });

        // 如果因为向下滚动而导致菜单fixed，则再加一步处理
        if (editor._isMenufixed) {
            top = top + (($menuContainer.offset().top + $menuContainer.outerHeight()) - $list.offset().top);

            // 重新设置top
            $list.css({
                top: top
            });
        }
    };

    // 显示
    DropList.fn.show = function () {
        var self = this;
        var menu = self.menu;
        if (!self.rendered) {
            // 第一次show之前，先渲染
            self._render();
        }

        if (self.isShowing) {
            return;
        }

        var $list = self.$list;
        $list.show();

        // 定位
        self._position();

        // 记录状态
        self.isShowing = true;

        // 菜单状态
        menu.activeStyle(true);
    };

    // 隐藏
    DropList.fn.hide = function () {
        var self = this;
        var menu = self.menu;
        if (!self.isShowing) {
            return;
        }

        var $list = self.$list;
        $list.hide();

        // 记录状态
        self.isShowing = false;

        // 菜单状态
        menu.activeStyle(false);
    };
});
// dropPanel 构造函数
_e(function (E, $) {

    // 定义构造函数
    var DropPanel = function (editor, menu, opt) {
        this.editor = editor;
        this.menu = menu;
        this.$content = opt.$content;
        this.width = opt.width || 200;
        this.height = opt.height;
        this.onRender = opt.onRender;

        // init
        this.init();
    };

    DropPanel.fn = DropPanel.prototype;

    // 暴露给 E 即 window.wangEditorLight
    E.DropPanel = DropPanel;
});
// dropPanel fn bind
_e(function (E, $) {

    var DropPanel = E.DropPanel;

    // init
    DropPanel.fn.init = function () {
        var self = this;

        // 生成dom对象
        self.initDOM();

        // 声明隐藏的事件
        self.initHideEvent();
    };

    // init DOM
    DropPanel.fn.initDOM = function () {
        var self = this;
        var $content = self.$content;
        var width = self.width;
        var height = self.height;
        var $panel = $('<div class="wangEditor-drop-panel clearfix"></div>');
        var $triangle = $('<div class="tip-triangle"></div>');

        $panel.css({
            width: width,
            height: height ? height : 'auto'
        });
        $panel.append($triangle);
        $panel.append($content);

        // 添加对象数据
        self.$panel = $panel;
        self.$triangle = $triangle;
    };

    // 点击其他地方，立即隐藏 dropPanel
    DropPanel.fn.initHideEvent = function () {
        var self = this;

        // 获取 panel elem
        var thisPanle = self.$panel.get(0);

        E.$body.on('click', function (e) {
            if (!self.isShowing) {
                return;
            }
            var trigger = e.target;

            // 获取菜单elem
            var menu = self.menu;
            var menuDom;
            if (menu.selected) {
                menuDom = menu.$domSelected.get(0);
            } else {
                menuDom = menu.$domNormal.get(0);
            }

            if (menuDom === trigger || $.contains(menuDom, trigger)) {
                // 说明由本菜单点击触发的
                return;
            }

            if (thisPanle === trigger || $.contains(thisPanle, trigger)) {
                // 说明由本panel点击触发的
                return;
            }

            // 其他情况，隐藏 panel
            self.hide();
        });

        E.$window.scroll(function (e) {
            self.hide();
        });

        E.$window.on('resize', function () {
            self.hide();
        });
    };

});
// dropPanel fn api
_e(function (E, $) {
   
    var DropPanel = E.DropPanel;

    // 渲染
    DropPanel.fn._render = function () {
        var self = this;
        var onRender = self.onRender;
        var editor = self.editor;
        var $panel = self.$panel;

        // 渲染到页面
        editor.$editorContainer.append($panel);

        // 渲染后的回调事件
        onRender && onRender.call(self);

        // 记录状态
        self.rendered = true;
    };

    // 定位
    DropPanel.fn._position = function () {
        var self = this;
        var $panel = self.$panel;
        var $triangle = self.$triangle;
        var editor = self.editor;
        var $menuContainer = editor.menuContainer.$menuContainer;
        var menu = self.menu;
        var $menuDom = menu.selected ? menu.$domSelected : menu.$domNormal;
        // 注意这里的 offsetParent() 要返回 .menu-item 的 position
        // 因为 .menu-item 是 position:relative
        var menuPosition = $menuDom.offsetParent().position();

        // 取得 menu 的位置、尺寸属性
        var menuTop = menuPosition.top;
        var menuLeft = menuPosition.left;
        var menuHeight = $menuDom.offsetParent().height();
        var menuWidth = $menuDom.offsetParent().width();

        // 取得 panel 的尺寸属性
        var panelWidth = $panel.outerWidth();
        // var panelHeight = $panel.outerHeight();

        // 取得 $txt 的尺寸
        var txtWidth = editor.txt.$txt.outerWidth();

        // ------------开始计算-------------

        // 初步计算 panel 位置属性
        var top = menuTop + menuHeight;
        var left = menuLeft + menuWidth/2;
        var marginLeft = 0 - panelWidth/2;
        var marginLeft2 = marginLeft;  // 下文用于和 marginLeft 比较，来设置三角形tip的位置

        // 如果超出了左边界，则移动回来（要和左侧有10px间隙）
        if ((0 - marginLeft) > (left - 10)) {
            marginLeft = 0 - (left - 10);
        }

        // 如果超出了有边界，则要左移（且和右侧有10px间隙）
        var valWithTxt = (left + panelWidth + marginLeft) - txtWidth;
        if (valWithTxt > -10) {
            marginLeft = marginLeft - valWithTxt - 10;
        }

        // 设置样式
        $panel.css({
            top: top,
            left: left,
            'margin-left': marginLeft
        });

        // 如果因为向下滚动而导致菜单fixed，则再加一步处理
        if (editor._isMenufixed) {
            top = top + (($menuContainer.offset().top + $menuContainer.outerHeight()) - $panel.offset().top);

            // 重新设置top
            $panel.css({
                top: top
            });
        }

        // 设置三角形 tip 的位置
        $triangle.css({
            'margin-left': marginLeft2 - marginLeft - 5
        });
    };

    // focus 第一个 input
    DropPanel.fn.focusFirstInput = function () {
        var self = this;
        var $panel = self.$panel;
        $panel.find('input[type=text],textarea').each(function () {
            var $input = $(this);
            if ($input.attr('disabled') == null) {
                $input.focus();
                return false;
            }
        });
    };

    // 显示
    DropPanel.fn.show = function () {
        var self = this;
        var menu = self.menu;
        if (!self.rendered) {
            // 第一次show之前，先渲染
            self._render();
        }

        if (self.isShowing) {
            return;
        }

        var $panel = self.$panel;
        $panel.show();

        // 定位
        self._position();

        // 记录状态
        self.isShowing = true;

        // 菜单状态
        menu.activeStyle(true);

        if (E.w3cRange) {
            // 高级浏览器
            self.focusFirstInput();
        } else {
            // 兼容 IE8 input placeholder
            E.placeholderForIE8($panel);
        }
    };

    // 隐藏
    DropPanel.fn.hide = function () {
        var self = this;
        var menu = self.menu;
        if (!self.isShowing) {
            return;
        }

        var $panel = self.$panel;
        $panel.hide();

        // 记录状态
        self.isShowing = false;

        // 菜单状态
        menu.activeStyle(false);
    };

});
// modal 构造函数
_e(function (E, $) {

    // 定义构造函数
    var Modal = function (editor, menu, opt) {
        this.editor = editor;
        this.menu = menu;
        this.$content = opt.$content;

        this.init();
    };

    Modal.fn = Modal.prototype;

    // 暴露给 E 即 window.wangEditorLight
    E.Modal = Modal;
});
// modal fn bind
_e(function (E, $) {

    var Modal = E.Modal;

    Modal.fn.init = function () {
        var self = this;

        // 初始化dom
        self.initDom();

        // 初始化隐藏事件
        self.initHideEvent();
    };

    // 初始化dom
    Modal.fn.initDom = function () {
        var self = this;
        var $content = self.$content;
        var $modal = $('<div class="wangEditor-modal"></div>');
        var $close = $('<div class="wangEditor-modal-close"><i class="wangeditor-menu-img-cancel-circle"></i></div>');

        $modal.append($close);
        $modal.append($content);

        // 记录数据
        self.$modal = $modal;
        self.$close = $close;
    };

    // 初始化隐藏事件
    Modal.fn.initHideEvent = function () {
        var self = this;
        var $close = self.$close;
        var modal = self.$modal.get(0);

        // 点击 $close 按钮，隐藏
        $close.click(function () {
            self.hide();
        });

        // 点击其他部分，隐藏
        E.$body.on('click', function (e) {
            if (!self.isShowing) {
                return;
            }
            var trigger = e.target;

            // 获取菜单elem
            var menu = self.menu;
            var menuDom;
            if (menu) {
                if (menu.selected) {
                    menuDom = menu.$domSelected.get(0);
                } else {
                    menuDom = menu.$domNormal.get(0);
                }

                if (menuDom === trigger || $.contains(menuDom, trigger)) {
                    // 说明由本菜单点击触发的
                    return;
                }
            }

            if (modal === trigger || $.contains(modal, trigger)) {
                // 说明由本panel点击触发的
                return;
            }

            // 其他情况，隐藏 panel
            self.hide();
        });
    };
});
// modal fn api
_e(function (E, $) {

    var Modal = E.Modal;

    // 渲染
    Modal.fn._render = function () {
        var self = this;
        var editor = self.editor;
        var $modal = self.$modal;

        // $modal的z-index，在配置的z-index基础上再 +10
        $modal.css('z-index', editor.config.zindex + 10 + '');

        // 渲染到body最后面
        E.$body.append($modal);

        // 记录状态
        self.rendered = true;
    };

    // 定位
    Modal.fn._position = function () {
        var self = this;
        var $modal = self.$modal;
        var top = $modal.offset().top;
        var width = $modal.outerWidth();
        var height = $modal.outerHeight();
        var marginLeft = 0 - (width / 2);
        var marginTop = 0 - (height / 2);
        var sTop = E.$window.scrollTop();

        // 保证modal最顶部，不超过浏览器上边框
        if ((height / 2) > top) {
            marginTop = 0 - top;
        }

        $modal.css({
            'margin-left': marginLeft + 'px',
            'margin-top': (marginTop + sTop) + 'px'
        });
    };

    // 显示
    Modal.fn.show = function () {
        var self = this;
        var menu = self.menu;
        if (!self.rendered) {
            // 第一次show之前，先渲染
            self._render();
        }

        if (self.isShowing) {
            return;
        }
        // 记录状态
        self.isShowing = true;

        var $modal = self.$modal;
        $modal.show();

        // 定位
        self._position();

        // 激活菜单状态
        menu && menu.activeStyle(true);
    };

    // 隐藏
    Modal.fn.hide = function () {
        var self = this;
        var menu = self.menu;
        if (!self.isShowing) {
            return;
        }
        // 记录状态
        self.isShowing = false;

        // 隐藏
        var $modal = self.$modal;
        $modal.hide();

        // 菜单状态
        menu && menu.activeStyle(false);
    };
});
// txt 构造函数
_e(function (E, $) {

    // 定义构造函数
    var Txt = function (editor) {
        this.editor = editor;

        // 初始化
        this.init();
    };

    Txt.fn = Txt.prototype;

    // 暴露给 E 即 window.wangEditorLight
    E.Txt = Txt;
});
// Txt.fn bind fn
_e(function (E, $) {

    var Txt = E.Txt;

    // 初始化
    Txt.fn.init = function () {
        var self = this;
        var editor = self.editor;
        var $valueContainer = editor.$valueContainer;
        var currentValue = editor.getInitValue();
        var $txt;

        if ($valueContainer.get(0).nodeName === 'DIV') {
            // 如果传入生成编辑器的元素就是div，则直接使用
            $txt = $valueContainer;
            $txt.addClass("wangEditorLight-txt");
            $txt.attr('contentEditable', 'true');
        } else {
            // 如果不是div（是textarea），则创建一个div
            $txt = $(
                '<div class="wangEditor-txt" contentEditable="true">' +
                    currentValue +
                '</div>'
            );
        }

        // 试图最后插入一个空行，ready之后才行
        editor.ready(function () {
            self.insertEmptyP();
        });

        self.$txt = $txt;

        // 删除时，如果没有内容了，就添加一个 <p><br></p>
        self.contentEmptyHandle();

        // enter时，不能使用 div 换行
        self.bindEnterForDiv();

        // enter时，用 p 包裹 text
        self.bindEnterForText();

        // tab 插入4个空格
        self.bindTabEvent();

        // 处理粘贴内容
        self.bindPasteFilter();

        // $txt.formatText() 方法
        self.bindFormatText();

        // 定义 $txt.html() 方法
        self.bindHtml();
    };

    // 删除时，如果没有内容了，就添加一个 <p><br></p>
    Txt.fn.contentEmptyHandle = function () {
        var self = this;
        var editor = self.editor;
        var $txt = self.$txt;
        var $p;

        $txt.on('keydown', function (e) {
            if (e.keyCode !== 8) {
                return;
            }
            var txtHtml = $.trim($txt.html().toLowerCase());
            if (txtHtml === '<p><br></p>') {
                // 如果最后还剩余一个空行，就不再继续删除了
                e.preventDefault();
                return;
            }
        });

        $txt.on('keyup', function (e) {
            if (e.keyCode !== 8) {
                return;
            }
            var txtHtml = $.trim($txt.html().toLowerCase());
            // ff时用 txtHtml === '<br>' 判断，其他用 !txtHtml 判断
            if (!txtHtml || txtHtml === '<br>') {
                // 内容空了
                $p = $('<p><br/></p>');
                $txt.html(''); // 一定要先清空，否则在 ff 下有问题
                $txt.append($p);
                editor.restoreSelectionByElem($p.get(0));
            }
        });
    };

    // enter时，不能使用 div 换行
    Txt.fn.bindEnterForDiv = function () {
        var tags = E.config.legalTags; // 配置中编辑器要求的合法标签，如 p head table blockquote ul ol 等
        var self = this;
        var editor = self.editor;
        var $txt = self.$txt;

        var $keydownDivElem;
        function divHandler() {
            if (!$keydownDivElem) {
                return;
            }

            var $pElem = $('<p>' + $keydownDivElem.html() + '</p>');
            $keydownDivElem.after($pElem);
            $keydownDivElem.remove();
        }

        $txt.on('keydown keyup', function (e) {
            if (e.keyCode !== 13) {
                return;
            }
            // 查找合法标签
            var rangeElem = editor.getRangeElem();
            var targetElem = editor.getLegalTags(rangeElem);
            var $targetElem;
            var $pElem;

            if (!targetElem) {
                // 没找到合法标签，就去查找 div
                targetElem = editor.getSelfOrParentByName(rangeElem, 'div');
                if (!targetElem) {
                    return;
                }
                $targetElem = $(targetElem);

                if (e.type === 'keydown') {
                    // 异步执行（同步执行会出现问题）
                    $keydownDivElem = $targetElem;
                    setTimeout(divHandler, 0);
                }

                if (e.type === 'keyup') {
                    // 将 div 的内容移动到 p 里面，并移除 div
                    $pElem = $('<p>' + $targetElem.html() + '</p>');
                    $targetElem.after($pElem);
                    $targetElem.remove();

                    // 如果是回车结束，将选区定位到行首
                    editor.restoreSelectionByElem($pElem.get(0), 'start');
                }
            }
        });
    };

    // enter时，用 p 包裹 text
    Txt.fn.bindEnterForText = function () {
        var self = this;
        var $txt = self.$txt;
        var handle;
        $txt.on('keyup', function (e) {
            if (e.keyCode !== 13) {
                return;
            }
            if (!handle) {
                handle = function() {
                    self.wrapImgAndText();
                };
            }
            setTimeout(handle);
        });
    };

    // tab 时，插入4个空格
    Txt.fn.bindTabEvent = function () {
        var self = this;
        var editor = self.editor;
        var $txt = self.$txt;

        $txt.on('keydown', function (e) {
            if (e.keyCode !== 9) {
                // 只监听 tab 按钮
                return;
            }
            // 如果浏览器支持 insertHtml 则插入4个空格。如果不支持，就不管了
            if (editor.queryCommandSupported('insertHtml')) {
                editor.command(e, 'insertHtml', '&nbsp;&nbsp;&nbsp;&nbsp;');
            }
        });
    };

    // 处理粘贴内容
    Txt.fn.bindPasteFilter = function () {
        var self = this;
        var editor = self.editor;
        var resultHtml = '';  //存储最终的结果
        var $txt = self.$txt;
        var legalTags = editor.config.legalTags;
        var legalTagArr = legalTags.split(',');

        $txt.on('paste', function (e) {
            if (!editor.config.pasteFilter) {
                // 配置中取消了粘贴过滤
                return;
            }

            var currentNodeName = editor.getRangeElem().nodeName;
            if (currentNodeName === 'TD' || currentNodeName === 'TH') {
                // 在表格的单元格中粘贴，忽略所有内容。否则会出现异常情况
                return;
            }

            resultHtml = ''; // 先清空 resultHtml

            var pasteHtml, $paste, docSplitHtml;
            var data = e.clipboardData || e.originalEvent.clipboardData;
            var ieData = window.clipboardData;

            if (editor.config.pasteText) {
                // 只粘贴纯文本

                if (data && data.getData) {
                    // w3c
                    pasteHtml = data.getData('text/plain');
                } else if (ieData && ieData.getData) {
                    // IE
                    pasteHtml = ieData.getData('text');
                } else {
                    // 其他情况
                    return;
                }

                // 拼接为 <p> 标签
                if (pasteHtml) {
                    resultHtml = '<p>' + pasteHtml + '</p>';
                }

            } else {
                // 粘贴过滤了样式的、只有标签的 html

                if (data && data.getData) {
                    // w3c

                    // 获取粘贴过来的html
                    pasteHtml = data.getData('text/html');

                    // 过滤从 word excel 粘贴过来的乱码
                    docSplitHtml = pasteHtml.split('</html>');
                    if (docSplitHtml.length === 2) {
                        pasteHtml = docSplitHtml[0];
                    }

                    if (pasteHtml) {
                        // 创建dom
                        $paste = $('<div>' + pasteHtml + '</div>');
                        // 处理，并将结果存储到 resultHtml 『全局』变量
                        handle($paste.get(0));
                    } else {
                        // 得不到html，试图获取text
                        pasteHtml = data.getData('text/plain');
                        if (pasteHtml) {
                            // 替换特殊字符
                            pasteHtml = pasteHtml.replace(/[ ]/g, '&nbsp;')
                                                 .replace(/</g, '&lt;')
                                                 .replace(/>/g, '&gt;')
                                                 .replace(/\n/g, '</p><p>');
                            // 拼接
                            resultHtml = '<p>' + pasteHtml + '</p>';

                            // 查询链接
                            resultHtml = resultHtml.replace(/<p>(https?:\/\/.*?)<\/p>/ig, function (match, link) {
                                return '<p><a href="' + link + '" target="_blank">' + link + '</p>';
                            });
                        }
                    }
                    
                } else if (ieData && ieData.getData) {
                    // IE 直接从剪切板中取出纯文本格式
                    resultHtml = ieData.getData('text');
                    if (!resultHtml) {
                        return;
                    }
                    // 拼接为 <p> 标签
                    resultHtml = '<p>' + resultHtml + '</p>';
                    resultHtml = resultHtml.replace(new RegExp('\n', 'g'), '</p><p>');
                } else {
                    // 其他情况
                    return;
                }
            }

            // 执行命令
            if (resultHtml) {
                editor.command(e, 'insertHtml', resultHtml);

                // 删除内容为空的 p 和嵌套的 p
                self.clearEmptyOrNestP();
            }
        });

        // 处理粘贴的内容
        function handle(elem) {
            if (!elem || !elem.nodeType || !elem.nodeName) {
                return;
            }
            var $elem;
            var nodeName = elem.nodeName.toLowerCase();
            var nodeType = elem.nodeType;
            var childNodesClone;

            // 只处理文本和普通node标签
            if (nodeType !== 3 && nodeType !== 1) {
                return;
            }

            $elem = $(elem);

            // 如果是容器，则继续深度遍历
            if (nodeName === 'div') {
                childNodesClone = [];
                $.each(elem.childNodes, function (index, item) {
                    // elem.childNodes 可获取TEXT节点，而 $elem.children() 就获取不到
                    // 先将 elem.childNodes 拷贝一份，一面在循环递归过程中 elem 发生变化
                    childNodesClone.push(item);
                });
                // 遍历子元素，执行操作
                $.each(childNodesClone, function () {
                    handle(this);
                });
                return;
            }
            
            if (legalTagArr.indexOf(nodeName) >= 0) {
                // 如果是合法标签之内的，则根据元素类型，获取值
                resultHtml += getResult(elem);
            } else if (nodeType === 3) {
                // 如果是文本，则直接插入 p 标签
                resultHtml += '<p>' + elem.textContent + '</p>';
            } else if (nodeName === 'br') {
                // <br>保留
                resultHtml += '<br/>';
            }
            else {
                // 忽略的标签
                if (['meta', 'style', 'script', 'object', 'form', 'iframe', 'hr'].indexOf(nodeName) >= 0) {
                    return;
                }
                // 其他标签，移除属性，插入 p 标签
                $elem = $(removeAttrs(elem));
                // 注意，这里的 clone() 是必须的，否则会出错
                resultHtml += $('<div>').append($elem.clone()).html();
            }
        }

        // 获取元素的结果
        function getResult(elem) {
            var nodeName = elem.nodeName.toLowerCase();
            var $elem;
            var htmlForP = '';
            var htmlForLi = '';

            if (['blockquote'].indexOf(nodeName) >= 0) {

                // 直接取出元素text即可
                $elem = $(elem);
                return '<' + nodeName + '>' + $elem.text() + '</' + nodeName + '>';

            } else if (['p', 'h1', 'h2', 'h3', 'h4', 'h5'].indexOf(nodeName) >= 0) {

                //p head 取出 text 和链接
                elem = removeAttrs(elem);
                $elem = $(elem);
                htmlForP = $elem.html();

                // 剔除 a img 之外的元素
                htmlForP = htmlForP.replace(/<.*?>/ig, function (tag) {
                    if (tag === '</a>' || tag.indexOf('<a ') === 0 || tag.indexOf('<img ') === 0) {
                        return tag;
                    } else {
                        return '';
                    }
                });

                return '<' + nodeName + '>' + htmlForP + '</' + nodeName + '>';

            } else if (['ul', 'ol'].indexOf(nodeName) >= 0) {
                
                // ul ol元素，获取子元素（li元素）的text link img，再拼接
                $elem = $(elem);
                $elem.children().each(function () {
                    var $li = $(removeAttrs(this));
                    var html = $li.html();

                    html = html.replace(/<.*?>/ig, function (tag) {
                        if (tag === '</a>' || tag.indexOf('<a ') === 0 || tag.indexOf('<img ') === 0) {
                            return tag;
                        } else {
                            return '';
                        }
                    });

                    htmlForLi += '<li>' + html + '</li>';
                });
                return '<' + nodeName + '>' + htmlForLi + '</' + nodeName + '>';
            
            } else {
                
                // 其他元素，移除元素属性
                $elem = $(removeAttrs(elem));
                return $('<div>').append($elem).html();
            }
        }

        // 移除一个元素（子元素）的attr
        function removeAttrs(elem) {
            var attrs = elem.attributes || [];
            var attrNames = [];
            var exception = ['href', 'target', 'src', 'alt', 'rowspan', 'colspan']; //例外情况

            // 先存储下elem中所有 attr 的名称
            $.each(attrs, function (key, attr) {
                if (attr && attr.nodeType === 2) {
                    attrNames.push(attr.nodeName);
                }
            });
            // 再根据名称删除所有attr
            $.each(attrNames, function (key, attr) {
                if (exception.indexOf(attr) < 0) {
                    // 除了 exception 规定的例外情况，删除其他属性
                    elem.removeAttribute(attr);
                }
            });


            // 递归子节点
            var children = elem.childNodes;
            if (children.length) {
                $.each(children, function (key, value) {
                    removeAttrs(value);
                });
            }

            return elem;
        }
    };

    // 绑定 $txt.formatText() 方法
    Txt.fn.bindFormatText = function () {
        var self = this;
        var editor = self.editor;
        var $txt = self.$txt;
        var legalTags = E.config.legalTags;
        var legalTagArr = legalTags.split(',');
        var length = legalTagArr.length;
        var regArr = [];

        // 将 E.config.legalTags 配置的有效字符，生成正则表达式
        $.each(legalTagArr, function (k, tag) {
            var reg = '\>\\s*\<(' + tag + ')\>';
            regArr.push(new RegExp(reg, 'ig'));
        });

        // 增加 li 
        regArr.push(new RegExp('\>\\s*\<(li)\>', 'ig'));

        // 增加 tr
        regArr.push(new RegExp('\>\\s*\<(tr)\>', 'ig'));

        // 增加 code
        regArr.push(new RegExp('\>\\s*\<(code)\>', 'ig'));

        // 生成 formatText 方法
        $txt.formatText = function () {
            var $temp = $('<div>');
            var html = $txt.html();

            // 去除空格
            html = html.replace(/\s*</ig, '<');

            // 段落、表格之间换行
            $.each(regArr, function (k, reg) {
                if (!reg.test(html)) {
                    return;
                }
                html = html.replace(reg, function (matchStr, tag) {
                    return '>\n<' + tag + '>';
                });
            });

            $temp.html(html);
            return $temp.text();
        };
    };

    // 定制 $txt.html 方法
    Txt.fn.bindHtml = function () {
        var self = this;
        var editor = self.editor;
        var $txt = self.$txt;
        var $valueContainer = editor.$valueContainer;
        var valueNodeName = editor.valueNodeName;

        $txt.html = function (html) {
            var result;

            if (valueNodeName === 'div') {
                // div 生成的编辑器，取值、赋值，都直接触发jquery的html方法
                result = $.fn.html.call($txt, html);
            }

            // textarea 生成的编辑器，则需要考虑赋值时，也给textarea赋值

            if (html === undefined) {
                // 取值，直接触发jquery原生html方法
                result = $.fn.html.call($txt);

                // 替换 html 中，src和href属性中的 & 字符。
                // 因为 .html() 或者 .innerHTML 会把所有的 & 字符都改成 &amp; 但是 src 和 href 中的要保持 &
                result = result.replace(/(href|src)\=\"(.*)\"/igm, function (a, b, c) {
                    return b + '="' + c.replace('&amp;', '&') + '"';
                });
            } else {
                // 赋值，需要同时给 textarea 赋值
                result = $.fn.html.call($txt, html);
                $valueContainer.val(html);
            }

            if (html === undefined) {
                return result;
            } else {
                // 手动触发 change 事件，因为 $txt 监控了 change 事件来判断是否需要执行 editor.onchange 
                $txt.change();
            }
        };
    };
});
// Txt.fn api
_e(function (E, $) {

    var Txt = E.Txt;

    var txtChangeEventNames = 'propertychange change click keyup input paste';

    // 渲染
    Txt.fn.render = function () {
        var $txt = this.$txt;
        var $editorContainer = this.editor.$editorContainer;
        $editorContainer.append($txt);
    };

    // 计算高度
    Txt.fn.initHeight = function () {
        var editor = this.editor;
        var $txt = this.$txt;
        var valueContainerHeight = editor.$valueContainer.height();
        var menuHeight = editor.menuContainer.height();
        var txtHeight = valueContainerHeight - menuHeight;

        // 限制最小为 50px
        txtHeight = txtHeight < 50 ? 150 : txtHeight;

        $txt.height(txtHeight);

        // 记录原始高度
        editor.valueContainerHeight = valueContainerHeight;

        // 设置 max-height
        this.initMaxHeight(txtHeight, menuHeight);
    };

    // 计算最大高度
    Txt.fn.initMaxHeight = function (txtHeight, menuHeight) {
        var editor = this.editor;
        var $menuContainer = editor.menuContainer.$menuContainer;
        var $txt = this.$txt;
        var $wrap = $('<div>');

        // 需要浏览器支持 max-height，否则不管
        if (window.getComputedStyle && 'max-height'in window.getComputedStyle($txt.get(0))) {
            // 获取 max-height 并判断是否有值
            var maxHeight = parseInt(editor.$valueContainer.css('max-height'));
            if (isNaN(maxHeight)) {
                return;
            }

            // max-height 和『全屏』暂时有冲突
            if (editor.menus.fullscreen) {
                E.warn('max-height和『全屏』菜单一起使用时，会有一些问题尚未解决，请暂时不要两个同时使用');
                return;
            }

            // 标记
            editor.useMaxHeight = true;

            // 设置maxheight
            $wrap.css({
                'max-height': (maxHeight - menuHeight) + 'px',
                'overflow-y': 'auto'
            });
            $txt.css({
                'height': 'auto',
                'overflow-y': 'visible',
                'min-height': txtHeight + 'px'
            });

            // 滚动式，菜单阴影
            $wrap.on('scroll', function () {
                if ($txt.parent().scrollTop() > 10) {
                    $menuContainer.addClass('wangEditor-menu-shadow');
                } else {
                    $menuContainer.removeClass('wangEditor-menu-shadow');
                }
            });

            // 需在编辑器区域外面再包裹一层
            $txt.wrap($wrap);
        }
    };

    // 保存选区
    Txt.fn.saveSelectionEvent = function () {
        var $txt = this.$txt;
        var editor = this.editor;
        var timeoutId;
        var dt = Date.now();

        function save() {
            editor.saveSelection();
        }

        // 同步保存选区
        function saveSync() {
            // 100ms之内，不重复保存
            if (Date.now() - dt < 100) {
                return;
            }

            dt = Date.now();
            save();
        }

        // 异步保存选区
        function saveAync() {
            // 节流，防止高频率重复操作
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(save, 300);
        }

        // txt change 、focus、blur 时随时保存选区
        $txt.on(txtChangeEventNames + ' focus blur', function (e) {
            // 先同步保存选区，为了让接下来就马上要执行 editor.getRangeElem() 的程序
            // 能够获取到正确的 rangeElem
            saveSync();

            // 再异步保存选区，为了确定更加准确的选区，为后续的操作做准备
            saveAync();
        });

        // 鼠标拖拽选择时，可能会拖拽到编辑器区域外面再松手，此时 $txt 就监听不到 click事件了
        $txt.on('mousedown', function () {
            $txt.on('mouseleave.saveSelection', function (e) {
                // 先同步后异步，如上述注释
                saveSync();
                saveAync();

                // 顺道吧菜单状态也更新了
                editor.updateMenuStyle();
            });
        }).on('mouseup', function () {
            $txt.off('mouseleave.saveSelection');
        });
        
    };

    // 随时更新 value
    Txt.fn.updateValueEvent = function () {
        var $txt = this.$txt;
        var editor = this.editor;
        var timeoutId, oldValue;

        // 触发 onchange 事件
        function doOnchange() {
            var val = $txt.html();
            if (oldValue === val) {
                // 无变化
                return;
            }

            // 触发 onchange 事件
            if (editor.onchange && typeof editor.onchange === 'function') {
                editor.onchange.call(editor);
            }

            // 更新内容
            editor.updateValue();

            // 记录最新内容
            oldValue = val;
        }

        // txt change 时随时更新内容
        $txt.on(txtChangeEventNames, function (e) {
            // 初始化
            if (oldValue == null) {
                oldValue = $txt.html();
            }

            // 监控内容变化（停止操作 100ms 之后立即执行）
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(doOnchange, 100);
        });
    };

    // 随时更新 menustyle
    Txt.fn.updateMenuStyleEvent = function () {
        var $txt = this.$txt;
        var editor = this.editor;

        // txt change 时随时更新内容
        $txt.on(txtChangeEventNames, function (e) {
            editor.updateMenuStyle();
        });
    };

    // 最后插入试图插入 <p><br><p>
    Txt.fn.insertEmptyP = function () {
        var $txt = this.$txt;
        var $children = $txt.children();

        if ($children.length === 0) {
            $txt.append($('<p><br></p>'));
            return;
        }

        if ($.trim($children.last().html()).toLowerCase() !== '<br>') {
            $txt.append($('<p><br></p>'));
        }
    };

    // 将编辑器暴露出来的文字和图片，都用 p 来包裹
    Txt.fn.wrapImgAndText = function () {
        var $txt = this.$txt;
        var $imgs = $txt.children('img');
        var txt = $txt[0];
        var childNodes = txt.childNodes;
        var childrenLength = childNodes.length;
        var i, childNode, p;

        // 处理图片
        $imgs.length && $imgs.each(function () {
            $(this).wrap('<p>');
        });

        // 处理文字
        for (i = 0; i < childrenLength; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 3 && childNode.textContent && $.trim(childNode.textContent)) {
                $(childNode).wrap('<p>');
            }
        }
    };

    // 清空内容为空的<p>，以及重复包裹的<p>（在windows下的chrome粘贴文字之后，会出现上述情况）
    Txt.fn.clearEmptyOrNestP = function () {
        var $txt = this.$txt;
        var $pList = $txt.find('p');

        $pList.each(function () {
            var $p = $(this);
            var $children = $p.children();
            var childrenLength = $children.length;
            var $firstChild;
            var content = $.trim($p.html());

            // 内容为空的p
            if (!content) {
                $p.remove();
                return;
            }

            // 嵌套的p
            if (childrenLength === 1) {
                $firstChild = $children.first();
                if ($firstChild.get(0) && $firstChild.get(0).nodeName === 'P') {
                    $p.html( $firstChild.html() );
                }
            }
        });
    };

    // 获取 scrollTop
    Txt.fn.scrollTop = function (val) {
        var self = this;
        var editor = self.editor;
        var $txt = self.$txt;

        if (editor.useMaxHeight) {
            return $txt.parent().scrollTop(val);
        } else {
            return $txt.scrollTop(val);
        }
    };

    // 鼠标hover时候，显示p、head的高度
    Txt.fn.showHeightOnHover = function () {
        var editor = this.editor;
        var $editorContainer = editor.$editorContainer;
        var menuContainer = editor.menuContainer;
        var $txt = this.$txt;
        var $tip = $('<i class="height-tip"><i>');
        var isTipInTxt = false;

        function addAndShowTip($target) {
            if (!isTipInTxt) {
                $editorContainer.append($tip);
                isTipInTxt = true;
            }

            var txtTop = $txt.position().top;
            var txtHeight = $txt.outerHeight();

            var height = $target.height();
            var top = $target.position().top;
            var marginTop = parseInt($target.css('margin-top'), 10);
            var paddingTop = parseInt($target.css('padding-top'), 10);
            var marginBottom = parseInt($target.css('margin-bottom'), 10);
            var paddingBottom = parseInt($target.css('padding-bottom'), 10);

            // 计算初步的结果
            var resultHeight = height + paddingTop + marginTop + paddingBottom + marginBottom;
            var resultTop = top + menuContainer.height();
            
            // var spaceValue;

            // // 判断是否超出下边界
            // spaceValue = (resultTop + resultHeight) - (txtTop + txtHeight);
            // if (spaceValue > 0) {
            //     resultHeight = resultHeight - spaceValue;
            // }

            // // 判断是否超出了下边界
            // spaceValue = txtTop > resultTop;
            // if (spaceValue) {
            //     resultHeight = resultHeight - spaceValue;
            //     top = top + spaceValue;
            // }

            // 按照最终结果渲染
            $tip.css({
                height: height + paddingTop + marginTop + paddingBottom + marginBottom,
                top: top + menuContainer.height()
            });
        }
        function removeTip() {
            if (!isTipInTxt) {
                return;
            }
            $tip.remove();
            isTipInTxt = false;
        }

        $txt.on('mouseenter', 'ul,ol,blockquote,p,h1,h2,h3,h4,h5,table,pre', function (e) {
            addAndShowTip($(e.currentTarget));
        }).on('mouseleave', function () {
            removeTip();
        });
    };

});
// 工具函数
_e(function (E, $) {

    // IE8 [].indexOf()
    if(!Array.prototype.indexOf){
        //IE低版本不支持 arr.indexOf 
        Array.prototype.indexOf = function(elem){
            var i = 0,
                length = this.length;
            for(; i<length; i++){
                if(this[i] === elem){
                    return i;
                }
            }
            return -1;
        };
        //IE低版本不支持 arr.lastIndexOf
        Array.prototype.lastIndexOf = function(elem){
            var length = this.length;
            for(length = length - 1; length >= 0; length--){
                if(this[length] === elem){
                    return length;
                }
            }
            return -1;
        };
    }

    // IE8 Date.now()
    if (!Date.now) {
        Date.now = function () {
            return new Date().valueOf(); 
        };
    }

    // console.log && console.warn && console.error
    var console = window.console;
    var emptyFn = function () {};
    $.each(['info', 'log', 'warn', 'error'], function (key, value) {
        if (console == null) {
            E[value] = emptyFn;
        } else {
            E[value] = function (info) {
                // 通过配置来控制打印输出
                if (E.config && E.config.printLog) {
                    console[value]('wangEditorLight提示: ' + info);
                }
            };
        }
    });

    // 获取随机数
    E.random = function () {
        return Math.random().toString().slice(2);
    };

    // 浏览器是否支持 placeholder
    E.placeholder = 'placeholder' in document.createElement('input');

    // 兼容IE8的 input placeholder
    E.placeholderForIE8 = function ($container) {
        if (E.placeholder) {
            return;
        }
        $container.find('input[placeholder]').each(function () {
            var $input = $(this);
            var placeholder = $input.attr('placeholder');

            if ($input.val() === '') {
                $input.css('color', '#666');
                $input.val(placeholder);

                $input.on('focus.placeholder click.placeholder', function () {
                    $input.val('');
                    $input.css('color', '#333');
                    $input.off('focus.placeholder click.placeholder');
                });
            }
        });
    };
});
// 语言包
_e(function (E, $) {
    E.langs = {};
    
    // 中文
    E.langs['zh-cn'] = {
        bold: '粗体',
        underline: '下划线',
        italic: '斜体',
        source: '源码',
        quote: '引用',
        fontfamily: '字体',
        fontsize: '字号',
        head: '标题',
        unorderlist: '无序列表',
        alignleft: '左对齐',
        aligncenter: '居中',
        alignright: '右对齐',
        link: '链接',
        text: '文本',
        submit: '提交',
        cancel: '取消',
        unlink: '取消链接',
        table: '表格',
        emotion: '表情',
        img: '图片',
        uploadImg: '上传图片',
        linkImg: '网络图片',
        video: '视频',
        'width': '宽',
        'height': '高',
        location: '位置',
        loading: '加载中',
        searchlocation: '搜索位置',
        dynamicMap: '动态地图',
        clearLocation: '清除位置',
        langDynamicOneLocation: '动态地图只能显示一个位置',
        insertcode: '插入代码',
        fullscreen: '全屏',
        openLink: '打开链接',
        upload: '上传',
    };

    // 英文
    E.langs.en = {
        bold: 'Bold',
        underline: 'Underline',
        italic: 'Italic',
        source: 'Codeview',
        quote: 'Quote',
        fontfamily: 'Font family',
        fontsize: 'Font size',
        head: 'Head',
        unorderlist: 'Unordered list',
        alignleft: 'Align left',
        aligncenter: 'Align center',
        alignright: 'Align right',
        link: 'Insert link',
        text: 'Text',
        submit: 'Submit',
        cancel: 'Cancel',
        unlink: 'Unlink',
        table: 'Table',
        emotion: 'Emotions',
        img: 'Image',
        uploadImg: 'Upload',
        linkImg: 'Link',
        video: 'Video',
        'width': 'width',
        'height': 'height',
        location: 'Location',
        loading: 'Loading',
        searchlocation: 'search',
        dynamicMap: 'Dynamic',
        clearLocation: 'Clear',
        langDynamicOneLocation: 'Only one location in dynamic map',
        insertcode: 'Insert Code',
        fullscreen: 'Full screnn',
        openLink: 'open link',
        upload: 'Upload',
    };
});
// 全局配置
_e(function (E, $) {

    E.config = {};

    // 全屏时的 z-index
    E.config.zindex = 10000;

    // 是否打印log
    E.config.printLog = true;

    // 菜单吸顶：false - 不吸顶；number - 吸顶，值为top值
    E.config.menuFixed = 0;

    // 编辑源码时，过滤 javascript
    E.config.jsFilter = true;

    // 编辑器允许的标签
    E.config.legalTags = 'p,h1,h2,h3,h4,h5,h6,blockquote,table,ul,ol,pre';

    // 语言包
    E.config.lang = E.langs['zh-cn'];

    // 菜单配置
    E.config.menus = [
        'source',
        '|',
        'bold',
        'underline',
        'italic',
        '|',
        'quote',
        'fontfamily',
        'fontsize',
        'head',
        'unorderlist',
        'alignleft',
        'aligncenter',
        'alignright',
        '|',
        'link',
        'unlink',
        'table',
        'emotion',
        '|',
        'img',
        'video',
        'location',
        'insertcode',
        '|',
        'fullscreen'
    ];

    // 颜色配置
    E.config.colors = {
        // 'value': 'title'
        '#880000': '暗红色',
        '#800080': '紫色',
        '#ff0000': '红色',
        '#ff00ff': '鲜粉色',
        '#000080': '深蓝色',
        '#0000ff': '蓝色',
        '#00ffff': '湖蓝色',
        '#008080': '蓝绿色',
        '#008000': '绿色',
        '#808000': '橄榄色',
        '#00ff00': '浅绿色',
        '#ffcc00': '橙黄色',
        '#808080': '灰色',
        '#c0c0c0': '银色',
        '#000000': '黑色',
        '#ffffff': '白色'
    };

    // 字体
    E.config.familys = [
        '宋体', '黑体', '楷体', '微软雅黑',
        'Arial', 'Verdana', 'Georgia',
        'Times New Roman', 'Microsoft JhengHei',
        'Trebuchet MS', 'Courier New', 'Impact', 'Comic Sans MS', 'Consolas'
    ];

    // 字号
    E.config.fontsizes = {
        // 格式：'value': 'title'
        1: '12px',
        2: '13px',
        3: '16px',
        4: '18px',
        5: '24px',
        6: '32px',
        7: '48px'
    };

    // 表情包
    E.config.emotionsShow = 'Core.Resources.assets.layui.layer.icon'; // 显示项，默认为'icon'，也可以配置成'value'
    E.config.emotions = {
        // 'default': {
        //     title: '默认',
        //     data: './emotions.data'
        // },
        'weibo': {
            title: '微博表情',
            data: [
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
                    value: '[草泥马]'    
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif',
                    value: '[神马]'    
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif',
                    value: '[浮云]'    
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_thumb.gif',
                    value: '[给力]'    
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_thumb.gif',
                    value: '[围观]'    
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_thumb.gif',
                    value: '[威武]'
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_thumb.gif',
                    value: '[熊猫]'
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_thumb.gif',
                    value: '[兔子]'
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_thumb.gif',
                    value: '[奥特曼]'
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_thumb.gif',
                    value: '[囧]'
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_thumb.gif',
                    value: '[互粉]'
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_thumb.gif',
                    value: '[礼物]'
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_thumb.gif',
                    value: '[呵呵]'
                },
                {
                    icon: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_thumb.gif',
                    value: '[哈哈]'
                }
            ]
        }
    };

    // 百度地图的key
    E.config.mapAk = 'TVhjYjq1ICT2qqL5LdS8mwas';

    // 上传图片的配置
    // server地址
    E.config.uploadImgUrl = '';
    // 超时时间
    E.config.uploadTimeout = 20 * 1000;
    // 用于存储上传回调事件
    E.config.uploadImgFns = {};
    // 自定义上传图片的filename
    // E.config.uploadImgFileName = 'customFileName';

    // 自定义上传，设置为 true 之后，显示上传图标
    E.config.customUpload = false;
    // 自定义上传的init事件
    // E.config.customUploadInit = function () {....};

    // 自定义上传时传递的参数（如 token）
    E.config.uploadParams = {
        /* token: 'abcdef12345' */
    };

    // 自定义上传是的header参数
    E.config.uploadHeaders = {
         /* 'Accept' : 'text/x-json' */
    };

    // 跨域上传时传递 cookie，默认为 true
    E.config.withCredentials = true;

    // 隐藏网络图片，默认为 false
    E.config.hideLinkImg = false;

    // 是否过滤粘贴内容
    E.config.pasteFilter = true;

    // 是否粘贴纯文本，当 editor.config.pasteFilter === false 时候，此配置将失效
    E.config.pasteText = false;

    // 插入代码时，默认的语言
    E.config.codeDefaultLang = 'javascript';

});
// 全局UI
_e(function (E, $) {

     E.UI = {};

     // 为菜单自定义配置的UI
     E.UI.menus = {
        // 这个 default 不加引号，在 IE8 会报错
        'default': {
            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-command"></i></a>',
            selected: '.selected'
        },
        bold: {
            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-bold"></i></a>',
            selected: '.selected'
        },
        underline: {
            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-underline"></i></a>',
            selected: '.selected'
        },
        italic: {
            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-italic"></i></a>',
            selected: '.selected'
        },
        quote: {
            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-quotes-left"></i></a>',
            selected: '.selected'
        },
        head: {
            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-header"></i></a>',
            selected: '.selected'
        },
        unorderlist: {
            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-bullet"></i></a>',
            selected: '.selected'
        },
        emotion: {
            normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-happy"></i></a>',
            selected: '.selected'
        }
     };
     
});
// 对象配置
_e(function (E, $) {

    E.fn.initDefaultConfig = function () {
        var editor = this;
        editor.config = $.extend({}, E.config);
        editor.UI = $.extend({}, E.UI);
    };

});
// 增加 container
_e(function (E, $) {

    E.fn.addEditorContainer = function () {
        this.$editorContainer = $('<div class="wangEditor-container"></div>');
    };

});
// 增加编辑区域对象
_e(function (E, $) {

    E.fn.addTxt = function () {
        var editor = this;
        var txt = new E.Txt(editor);

        editor.txt = txt;
    };

});
// 增加menuContainer对象
_e(function (E, $) {

    E.fn.addMenuContainer = function () {
        var editor = this;
        editor.menuContainer = new E.MenuContainer(editor);
    };

});
// 增加menus
_e(function (E, $) {

    // 存储创建菜单的函数
    E.createMenuFns = [];
    E.createMenu = function (fn) {
        E.createMenuFns.push(fn);
    };

    // 创建所有菜单
    E.fn.addMenus = function () {
        var editor = this;
        var menuIds = editor.config.menus;

        // 检验 menuId 是否在配置中存在
        function check(menuId) {
            if (menuIds.indexOf(menuId) >= 0) {
                return true;
            }
            return false;
        }

        // 遍历所有的菜单创建函数，并执行
        $.each(E.createMenuFns, function (k, createMenuFn) {
            createMenuFn.call(editor, check);
        });
    };

});
// bold菜单
_e(function (E, $) {

    E.createMenu(function (check) {
        var menuId = 'bold';
        if (!check(menuId)) {
            return;
        }

        var editor = this;
        var lang = editor.config.lang;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,
            id: menuId,
            title: lang.bold,
            commandName: 'Bold'
        });

        // 定义选中状态下的click事件
        menu.clickEventSelected = function (e) {
            var isRangeEmpty = editor.isRangeEmpty();
            if (!isRangeEmpty) {
                // 如果选区有内容，则执行基础命令
                editor.command(e, 'Bold');
            } else {
                // 如果选区没有内容
                editor.commandForElem('b,strong,h1,h2,h3,h4,h5', e, 'Bold');
            }
        };

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });

});
// underline菜单
_e(function (E, $) {

    E.createMenu(function (check) {
        var menuId = 'underline';
        if (!check(menuId)) {
            return;
        }

        var editor = this;
        var lang = editor.config.lang;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,
            id: menuId,
            title: lang.underline,
            commandName: 'Underline'
        });

        // 定义选中状态下的click事件
        menu.clickEventSelected = function (e) {
            var isRangeEmpty = editor.isRangeEmpty();
            if (!isRangeEmpty) {
                // 如果选区有内容，则执行基础命令
                editor.command(e, 'Underline');
            } else {
                // 如果选区没有内容
                editor.commandForElem('u,a', e, 'Underline');
            }
        };

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });

});
// italic 菜单
_e(function (E, $) {
    
    E.createMenu(function (check) {
        var menuId = 'italic';
        if (!check(menuId)) {
            return;
        }
        var editor = this;
        var lang = editor.config.lang;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,
            id: menuId,
            title: lang.italic,
            commandName: 'Italic'
        });

        // 定义选中状态下的click事件
        menu.clickEventSelected = function (e) {
            var isRangeEmpty = editor.isRangeEmpty();
            if (!isRangeEmpty) {
                // 如果选区有内容，则执行基础命令
                editor.command(e, 'Italic');
            } else {
                // 如果选区没有内容
                editor.commandForElem('i', e, 'Italic');
            }
        };

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });

});
// quote 菜单
_e(function (E, $) {

    E.createMenu(function (check) {
        var menuId = 'quote';
        if (!check(menuId)) {
            return;
        }
        var editor = this;
        var lang = editor.config.lang;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,
            id: menuId,
            title: lang.quote,
            commandName: 'formatBlock',
            commandValue: 'blockquote'
        });

        // 定义click事件
        menu.clickEvent = function (e) {
            var rangeElem = editor.getRangeElem();
            var $rangeElem;
            if (!rangeElem) {
                e.preventDefault();
                return;
            }
            var currentQuote = editor.getSelfOrParentByName(rangeElem, 'blockquote');
            var $quote;

            if (currentQuote) {
                // 说明当前在quote之内，不做任何处理
                e.preventDefault();
                return;
            }

            rangeElem = editor.getLegalTags(rangeElem);
            $rangeElem = $(rangeElem);

            // 无文字，则不允许执行引用
            if (!$rangeElem.text()) {
                return;
            }


            if (!rangeElem) {
                // 执行默认命令
                // IE8 下执行此处（不过，经测试代码无效，也不报错）
                editor.command(e, 'formatBlock', 'blockquote');
                return;
            }

            // 自定义command事件
            function commandFn() {
                $quote = $('<p>' + $rangeElem.text() + '</p>');
                $rangeElem.after($quote).remove();
                $quote.wrap('<blockquote>');
            }

            // 自定义 callback 事件
            function callback() {
                // callback中，设置range为quote
                var editor = this;
                if ($quote) {
                    editor.restoreSelectionByElem($quote.get(0));
                }
            }

            // 执行自定义命令
            editor.customCommand(e, commandFn, callback);
        };

        // 定义选中状态下的click事件
        menu.clickEventSelected = function (e) {
            var rangeElem;
            var quoteElem;
            var $lastChild;

            // 获取当前选区的elem，并试图往上找 quote 元素
            rangeElem = editor.getRangeElem();
            quoteElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
            if (!quoteElem) {
                // 没找到，则返回
                e.preventDefault();
                return;
            }

            // 自定义的command事件
            function commandFn() {
                var $quoteElem;
                var $children;

                $quoteElem = $(quoteElem);
                $children = $quoteElem.children();
                if ($children.length) {
                    $children.each(function (k) {
                        var $item = $(this);
                        if ($item.get(0).nodeName === 'P') {
                            $quoteElem.after($item);
                        } else {
                            $quoteElem.after('<p>' + $item.text() + '</p>');
                        }
                        $lastChild = $item;  // 记录最后一个子元素，用于callback中的range定位
                    });
                    $quoteElem.remove();
                    return;
                }
            }

            // 自定义的callback函数
            function callback() {
                // callback中，设置range为lastChild
                var editor = this;
                if ($lastChild) {
                    editor.restoreSelectionByElem($lastChild.get(0));
                }
            }

            // 执行自定义命令
            editor.customCommand(e, commandFn, callback);
        };

        // 定义更新选中状态的事件
        menu.updateSelectedEvent = function () {
            var self = this; //菜单对象
            var editor = self.editor;
            var rangeElem;

            rangeElem = editor.getRangeElem();
            rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');

            if (rangeElem) {
                return true;
            }

            return false;
        };

        // 增加到editor对象中
        editor.menus[menuId] = menu;

        // --------------- 两次点击 enter 跳出引用 ---------------
        editor.ready(function () {
            var editor = this;
            var $txt = editor.txt.$txt;
            var isPrevEnter = false;  // 是不是刚刚在quote中按了 enter 键
            $txt.on('keydown', function (e) {
                if (e.keyCode !== 13) {
                    // 不是 enter 键
                    isPrevEnter = false;
                    return;
                }

                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
                if (!rangeElem) {
                    // 选区不是 quote
                    isPrevEnter = false;
                    return;
                }

                if (!isPrevEnter) {
                    // 最近没有在qote中按enter键
                    isPrevEnter = true;
                    return;
                }

                var currentRangeElem = editor.getRangeElem();
                var $currentRangeElem = $(currentRangeElem);
                if ($currentRangeElem.length) {
                    $currentRangeElem.parent().after($currentRangeElem);
                }

                // 设置选区
                editor.restoreSelectionByElem(currentRangeElem, 'start');

                isPrevEnter = false;
                // 阻止默认行文
                e.preventDefault();

            });
        }); // editor.ready(

        // --------------- 处理quote中无内容时不能删除的问题 ---------------
        editor.ready(function () {
            var editor = this;
            var $txt = editor.txt.$txt;
            var $rangeElem;

            function commandFn() {
                $rangeElem && $rangeElem.remove();
            }
            function callback() {
                if (!$rangeElem) {
                    return;
                }
                var $prev = $rangeElem.prev();
                if ($prev.length) {
                    // 有 prev 则定位到 prev 最后
                    editor.restoreSelectionByElem($prev.get(0));
                } else {
                    // 无 prev 则初始化选区
                    editor.initSelection();
                }
            }

            $txt.on('keydown', function (e) {
                if (e.keyCode !== 8) {
                    // 不是 backspace 键
                    return;
                }

                var rangeElem = editor.getRangeElem();
                rangeElem = editor.getSelfOrParentByName(rangeElem, 'blockquote');
                if (!rangeElem) {
                    // 选区不是 quote
                    return;
                }
                $rangeElem = $(rangeElem);

                var text = $rangeElem.text();
                if (text) {
                    // quote 中还有内容
                    return;
                }
                editor.customCommand(e, commandFn, callback);

            }); // $txt.on
        }); // editor.ready(
    });

});
// head 菜单
_e(function (E, $) {
    E.createMenu(function (check) {
        var menuId = 'head';
        if (!check(menuId)) {
            return;
        }
        var editor = this;
        var lang = editor.config.lang;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,
            id: menuId,
            title: lang.head,
            commandName: 'formatBlock'
        });

        // 初始化数据
        var data  = {
            '<h1>': '标题1',
            '<h2>': '标题2',
            '<h3>': '标题3',
            '<h4>': '标题4',
            '<h5>': '标题5'
        };
        /*
            data 需要的结构
            {
                'commandValue': 'title'
                ...
            }
        */

        var isOrderedList;
        function beforeEvent(e) {
            if (editor.queryCommandState('InsertOrderedList')) {
                isOrderedList = true;

                // 先取消有序列表
                editor.command(e, 'InsertOrderedList');
            } else {
                isOrderedList = false;
            }
        }

        function afterEvent(e) {
            if (isOrderedList) {
                // 再设置有序列表
                editor.command(e, 'InsertOrderedList');
            }
        }

        // 创建droplist
        var tpl = '{#commandValue}{#title}';
        menu.dropList = new E.DropList(editor, menu, {
            data: data,
            tpl: tpl,
            // 对 ol 直接设置 head，会出现每个 li 的 index 都变成 1 的问题，因此要先取消 ol，然后设置 head，最后再增加上 ol
            beforeEvent: beforeEvent,
            afterEvent: afterEvent
        });

        // 定义 update selected 事件
        menu.updateSelectedEvent = function () {
            var rangeElem = editor.getRangeElem();
            rangeElem = editor.getSelfOrParentByName(rangeElem, 'h1,h2,h3,h4,h5');
            if (rangeElem) {
                return true;
            }
            return false;
        };

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });
});
// unorderlist 菜单
_e(function (E, $) {

    E.createMenu(function (check) {
        var menuId = 'unorderlist';
        if (!check(menuId)) {
            return;
        }
        var editor = this;
        var lang = editor.config.lang;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,
            id: menuId,
            title: lang.unorderlist,
            commandName: 'InsertUnorderedList'
        });

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });

});
// emotion 菜单
_e(function (E, $) {

    E.createMenu(function (check) {
        var menuId = 'emotion';
        if (!check(menuId)) {
            return;
        }
        var editor = this;
        var config = editor.config;
        var lang = config.lang;
        var configEmotions = config.emotions;
        var emotionsShow = config.emotionsShow;

        // 记录每一个表情图片的地址
        editor.emotionUrls = [];

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,
            id: menuId,
            title: lang.emotion
        });

        // 添加表情图片的函数
        function insertEmotionImgs(data, $tabContent) {
            // 添加表情图片
            $.each(data, function (k, emotion) {
                var src = emotion.icon || emotion.url;
                var value = emotion.value || emotion.title;
                // 通过配置 editor.config.emotionsShow 的值来修改插入到编辑器的内容（图片/value）
                var commandValue = emotionsShow === 'Core.Resources.assets.layui.layer.icon' ? src : value;
                var $command = $('<a href="#" commandValue="' + commandValue + '"></a>');
                var $img = $('<img>');
                $img.attr('_src', src);  // 先将 src 复制到 '_src' 属性，先不加载

                $command.append($img);
                $tabContent.append($command);

                // 记录下每一个表情图片的地址
                editor.emotionUrls.push(src);
            });
        }

        // 拼接 dropPanel 内容
        var $panelContent = $('<div class="panel-tab"></div>');
        var $tabContainer = $('<div class="tab-container"></div>');
        var $contentContainer = $('<div class="content-container emotion-content-container"></div>');
        $.each(configEmotions, function (k, emotion) {
            var title = emotion.title;
            var data = emotion.data;

            E.log('正在处理 ' + title + ' 表情的数据...');

            // 增加该组表情的tab和content
            var $tab = $('<a href="#">' + title +' </a>');
            $tabContainer.append($tab);
            var $tabContent = $('<div class="content"></div>');
            $contentContainer.append($tabContent);

            // tab 切换事件
            $tab.click(function (e) {
                $tabContainer.children().removeClass('selected');
                $contentContainer.children().removeClass('selected');
                $tabContent.addClass('selected');
                $tab.addClass('selected');
                e.preventDefault();
            });

            // 处理data
            if (typeof data === 'string') {
                // url 形式，需要通过ajax从该url获取数据
                E.log('将通过 ' + data + ' 地址ajax下载表情包');
                $.get(data, function (result) {
                    result = $.parseJSON(result);
                    E.log('下载完毕，得到 ' + result.length + ' 个表情');
                    insertEmotionImgs(result, $tabContent);
                });

            } else if ( Object.prototype.toString.call(data).toLowerCase().indexOf('array') > 0 ) {
                // 数组，即 data 直接就是表情包数据
                insertEmotionImgs(data, $tabContent);
            } else {
                // 其他情况，data格式不对
                E.error('data 数据格式错误，请修改为正确格式，参考文档：' + E.docsite);
                return;
            }
        });
        $panelContent.append($tabContainer).append($contentContainer);

        // 默认显示第一个tab
        $tabContainer.children().first().addClass('selected');
        $contentContainer.children().first().addClass('selected');

        // 插入表情command事件
        $contentContainer.on('click', 'a[commandValue]', function (e) {
            var $a = $(e.currentTarget);
            var commandValue = $a.attr('commandValue');
            var img;

            // commandValue 有可能是图片url，也有可能是表情的 value，需要区别对待

            if (emotionsShow === 'Core.Resources.assets.layui.layer.icon') {
                // 插入图片
                editor.command(e, 'InsertImage', commandValue);
            } else {
                // 插入value
                editor.command(e, 'insertHtml', '<span>' + commandValue + '</span>');
            }

            e.preventDefault();
        });

        // 添加panel
        menu.dropPanel = new E.DropPanel(editor, menu, {
            $content: $panelContent,
            width: 350
        });

        // 定义click事件（异步加载表情图片）
        menu.clickEvent = function (e) {
            var menu = this;
            var dropPanel = menu.dropPanel;

            // -------------隐藏-------------
            if (dropPanel.isShowing) {
                dropPanel.hide();
                return;
            }

            // -------------显示-------------
            dropPanel.show();

            // 异步加载图片
            if (menu.imgLoaded) {
                return;
            }
            $contentContainer.find('img').each(function () {
                var $img = $(this);
                var _src = $img.attr('_src');
                $img.on('error', function () {
                    E.error('加载不出表情图片 ' + _src);
                });
                $img.attr('src', _src);
                $img.removeAttr('_src');
            });
            menu.imgLoaded = true;
        };

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });

});
// 渲染menus
_e(function (E, $) {

    E.fn.renderMenus = function () {

        var editor = this;
        var menus = editor.menus;
        var menuIds = editor.config.menus;
        var menuContainer = editor.menuContainer;

        var menu;
        var groupIdx = 0;
        $.each(menuIds, function (k, v) {
            if (v === '|') {
                groupIdx++;
                return;
            }

            menu = menus[v];
            if (menu) {
                menu.render(groupIdx);
            }
        });
    };

});
// 渲染menus
_e(function (E, $) {

    E.fn.renderMenuContainer = function () {

        var editor = this;
        var menuContainer = editor.menuContainer;
        var $editorContainer = editor.$editorContainer;

        menuContainer.render();

    };

});
// 渲染 txt
_e(function (E, $) {

    E.fn.renderTxt = function () {

        var editor = this;
        var txt = editor.txt;

        txt.render();

        // ready 时候，计算txt的高度
        editor.ready(function () {
            txt.initHeight();
        });
    };

});
// 渲染 container
_e(function (E, $) {

    E.fn.renderEditorContainer = function () {

        var editor = this;
        var $valueContainer = editor.$valueContainer;
        var $editorContainer = editor.$editorContainer;
        var $txt = editor.txt.$txt;
        var $prev, $parent;

        // 将编辑器渲染到页面中
        if ($valueContainer === $txt) {
            $prev = editor.$prev;
            $parent = editor.$parent;

            if ($prev && $prev.length) {
                // 有前置节点，就插入到前置节点的后面
                $prev.after($editorContainer);
            } else {
                // 没有前置节点，就直接插入到父元素
                $parent.prepend($editorContainer);
            }

        } else {
            $valueContainer.after($editorContainer);
            $valueContainer.hide();
        }

        // 设置宽度（这样设置宽度有问题）
        // $editorContainer.css('width', $valueContainer.css('width'));
    };

});
// 菜单事件
_e(function (E, $) {

    // 绑定每个菜单的click事件
    E.fn.eventMenus = function () {

        var menus = this.menus;

        // 绑定菜单的点击事件
        $.each(menus, function (k, v) {
            v.bindEvent();
        });

    };

});
// 菜单container事件
_e(function (E, $) {

    E.fn.eventMenuContainer = function () {

    };

});
// 编辑区域事件
_e(function (E, $) {

    E.fn.eventTxt = function () {

        var txt = this.txt;

        // txt内容变化时，保存选区
        txt.saveSelectionEvent();

        // txt内容变化时，随时更新 value
        txt.updateValueEvent();

        // txt内容变化时，随时更新 menu style
        txt.updateMenuStyleEvent();

        // // 鼠标hover时，显示 p head 高度（暂时关闭这个功能）
        // if (!/ie/i.test(E.userAgent)) {
        //     // 暂时不支持IE
        //     txt.showHeightOnHover();
        // }
    };

});
// 进度条
_e(function (E, $) {

    E.plugin(function () {

        var editor = this;
        var menuContainer = editor.menuContainer;
        var menuHeight = menuContainer.height();
        var $editorContainer = editor.$editorContainer;
        var width = $editorContainer.width();
        var $progress = $('<div class="wangEditor-upload-progress"></div>');

        // 渲染事件
        var isRender = false;
        function render() {
            if (isRender) {
                return;
            }
            isRender = true;

            $progress.css({
                top: menuHeight + 'px'
            });
            $editorContainer.append($progress);
        }

        // ------ 显示进度 ------
        editor.showUploadProgress = function (progress) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // 显示之前，先判断是否渲染
            render();

            $progress.show();
            $progress.width(progress * width / 100);
        };

        // ------ 隐藏进度条 ------
        var timeoutId;
        function hideProgress() {
            $progress.hide();
            timeoutId = null;
        }
        editor.hideUploadProgress = function (time) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            time = time || 750;
            timeoutId = setTimeout(hideProgress, time);
        };
    });
});
// menu吸顶
_e(function (E, $) {

    E.plugin(function () {
        var editor = this;
        var menuFixed = editor.config.menuFixed;
        if (menuFixed === false || typeof menuFixed !== 'number') {
            // 没有配置菜单吸顶
            return;
        }
        var bodyMarginTop = parseFloat(E.$body.css('margin-top'), 10);
        if (isNaN(bodyMarginTop)) {
            bodyMarginTop = 0;
        }

        var $editorContainer = editor.$editorContainer;
        var editorTop = $editorContainer.offset().top;
        var editorHeight = $editorContainer.outerHeight();
        
        var $menuContainer = editor.menuContainer.$menuContainer;
        var menuCssPosition = $menuContainer.css('position');
        var menuCssTop = $menuContainer.css('top');
        var menuTop = $menuContainer.offset().top;
        var menuHeight = $menuContainer.outerHeight();
        
        var $txt = editor.txt.$txt;

        // E.$window.scroll(function () {
        //     //全屏模式不支持
        //     if (editor.isFullScreen) {
        //         return;
        //     }
        //
        //     var sTop = E.$window.scrollTop();
        //
        //     // 需要重新计算宽度，因为浏览器可能此时出现滚动条
        //     var menuWidth = $menuContainer.width();
        //
        //     // 如果 menuTop === 0 说明此前编辑器一直隐藏，后来显示出来了，要重新计算相关数据
        //     if (menuTop === 0) {
        //         menuTop = $menuContainer.offset().top;
        //         editorTop = $editorContainer.offset().top;
        //         editorHeight = $editorContainer.outerHeight();
        //         menuHeight = $menuContainer.outerHeight();
        //     }
        //
        //     // if (sTop >= menuTop && sTop + menuFixed + menuHeight + 30 < editorTop + editorHeight) {
        //         // 吸顶
        //         // $menuContainer.css({
        //         //     position: 'fixed',
        //         //     top: menuFixed
        //         // });
        //
        //         // 固定宽度
        //         // $menuContainer.width(menuWidth);
        //
        //         // 增加body margin-top
        //         // E.$body.css({
        //         //     'margin-top': bodyMarginTop + menuHeight
        //         // });
        //
        //         // 记录
        //         // if (!editor._isMenufixed) {
        //         //     editor._isMenufixed = true;
        //         // }
        //     // } else {
        //         // 取消吸顶
        //         // $menuContainer.css({
        //         //     position: menuCssPosition,
        //         //     top: menuCssTop
        //         // });
        //
        //         // 取消宽度固定
        //         // $menuContainer.css('width', '100%');
        //
        //         // 还原 body margin-top
        //         // E.$body.css({
        //         //     'margin-top': bodyMarginTop
        //         // });
        //         //
        //         // // 撤销记录
        //         // if (editor._isMenufixed) {
        //         //     editor._isMenufixed = false;
        //         // }
        //     // }
        // });
    });

});
// 缩进 菜单插件
_e(function (E, $) {

    // 用 createMenu 方法创建菜单
    E.createMenu(function (check) {

        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
        var menuId = 'indent';

        // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
        if (!check(menuId)) {
            return;
        }

        // this 指向 editor 对象自身
        var editor = this;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,  // 编辑器对象
            id: menuId,  // 菜单id
            title: '缩进', // 菜单标题

            // 正常状态和选中装下的dom对象，样式需要自定义
            $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-indent-left"></i></a>'),
            $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-indent-left"></i></a>')
        });

        // 菜单正常状态下，点击将触发该事件
        menu.clickEvent = function (e) {
            var elem = editor.getRangeElem();
            var p = editor.getSelfOrParentByName(elem, 'p');
            var $p;

            if (!p) {
                // 未找到 p 元素，则忽略
                return e.preventDefault();
            }
            $p = $(p);

            // 使用自定义命令
            function commandFn() {
                $p.css('text-indent', '2em');
            }
            editor.customCommand(e, commandFn);
        };

        // 菜单选中状态下，点击将触发该事件
        menu.clickEventSelected = function (e) {
            var elem = editor.getRangeElem();
            var p = editor.getSelfOrParentByName(elem, 'p');
            var $p;

            if (!p) {
                // 未找到 p 元素，则忽略
                return e.preventDefault();
            }
            $p = $(p);

            // 使用自定义命令
            function commandFn() {
                $p.css('text-indent', '0');
            }
            editor.customCommand(e, commandFn);
        };

        // 根据当前选区，自定义更新菜单的选中状态或者正常状态
        menu.updateSelectedEvent = function () {
            // 获取当前选区所在的父元素
            var elem = editor.getRangeElem();
            var p = editor.getSelfOrParentByName(elem, 'p');
            var $p;
            var indent;

            if (!p) {
                // 未找到 p 元素，则标记为未处于选中状态
                return false;
            }
            $p = $(p);
            indent = $p.css('text-indent');

            if (!indent || indent === '0px') {
                // 得到的p，text-indent 属性是 0，则标记为未处于选中状态
                return false;
            }

            // 找到 p 元素，并且 text-indent 不是 0，则标记为选中状态
            return true;
        };

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });

});
// 行高 菜单插件
_e(function (E, $) {

    // 用 createMenu 方法创建菜单
    E.createMenu(function (check) {

        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
        var menuId = 'lineheight';

        // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
        if (!check(menuId)) {
            return;
        }

        // this 指向 editor 对象自身
        var editor = this;

        // 由于浏览器自身不支持 lineHeight 命令，因此要做一个hook
        editor.commandHooks.lineHeight = function (value) {
            var rangeElem = editor.getRangeElem();
            var targetElem = editor.getSelfOrParentByName(rangeElem, 'p,h1,h2,h3,h4,h5,pre');
            if (!targetElem) {
                return;
            }
            $(targetElem).css('line-height', value + '');
        };

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,  // 编辑器对象
            id: menuId,  // 菜单id
            title: '行高', // 菜单标题
            commandName: 'lineHeight', // 命令名称

            // 正常状态和选中装下的dom对象，样式需要自定义
            $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-arrows-v"></i></a>'),
            $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-arrows-v"></i></a>')
        });

        // 数据源
        var data  = {
            // 格式： 'value' : 'title'
            '1.0': '1.0倍',
            '1.5': '1.5倍',
            '1.8': '1.8倍',
            '2.0': '2.0倍',
            '2.5': '2.5倍',
            '3.0': '3.0倍'
        };

        // 为menu创建droplist对象
        var tpl = '<span style="line-height:{#commandValue}">{#title}</span>';
        menu.dropList = new E.DropList(editor, menu, {
            data: data,  // 传入数据源
            tpl: tpl  // 传入模板
        });

        // 增加到editor对象中
        editor.menus[menuId] = menu;

    });

});
    
    // 最终返回wangEditorLight构造函数
    return window.wangEditorLight;
});