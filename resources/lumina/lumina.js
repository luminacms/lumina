;
! function (win) {
    "use strict";

    var doc = document,
        config = {
            modules: {}, //记录模块物理路径
            status: {}, //记录模块加载状态
            timeout: 10, //符合规范的模块请求最长等待秒数
            event: {}, //记录模块自定义事件
            version: '3.0.0'
        },
        Layui = function () {
            this.v = config.version; //版本号
        },

        //获取layui所在目录
        getPath = function () {
            var jsPath = doc.currentScript ? doc.currentScript.src : function () {
                var js = doc.scripts,
                    last = js.length - 1,
                    src;
                for (var i = last; i > 0; i--) {
                    if (js[i].readyState === 'interactive') {
                        src = js[i].src;
                        break;
                    }
                }
                return src || js[last].src;
            }();
            return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
        }(),

        //异常提示
        error = function (msg) {
            win.console && console.error && console.error('Layui hint: ' + msg);
        },
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        //内置模块
        modules = {
            laydate: 'packages/laydate/laydate', //日期
            laypage: 'packages/laypage', //分页
            layer: 'packages/layer',
            laytpl: 'packages/laytpl', //模板引擎
            form: 'packages/form', //表单集
            tree: 'packages/tree', //树结构
            table: 'packages/table', //表格
            element: 'packages/element', //常用元素操作
            rate: 'packages/rate', //评分组件
            colorpicker: 'packages/colorpicker', //颜色选择器
            slider: 'packages/slider', //滑块
            carousel: 'packages/carousel', //轮播
            flow: 'packages/flow', //流加载
            util: 'packages/util', //工具块
            code: 'packages/code/code', //代码修饰器
            dropdown: 'packages/dropdown', //下拉按钮
            transfer: 'packages/transfer', //穿梭

            // 三方组件
            jstree: 'libs/jstree/jstree.min',
            echarts: "libs/echarts.min",
            split: "libs/split.min",
            vue: "libs/vue.min",
            // 扩展包
            upload: "extends/upload/upload",
            autocomplete: "extends/autocomplete/autocomplete",
            formSelect: 'extends/formSelect/formSelect',
            wangEditor: 'extends/wangEditor/wangEditor',
            wangEditorLight: 'extends/wangEditor/wangEditor.light',
            circleProgress: 'extends/circle-progress',
            city: 'extends/city',
            // 服务包
            pickerUser: 'modules/picker/picker_user',
        };

    //记录基础数据
    Layui.prototype.cache = config;

    //定义模块
    Layui.prototype.define = function (deps, factory) {
        var that = this,
            type = typeof deps === 'function',
            callback = function () {
                var setApp = function (app, exports) {
                    layui[app] = exports;
                    config.status[app] = true;
                };
                typeof factory === 'function' && factory(function (app, exports) {
                    setApp(app, exports);
                    config.callback[app] = function () {
                        factory(setApp);
                    }
                });
                return this;
            };

        type && (
            factory = deps,
            deps = []
        );

        if (layui['layui.all'] || (!layui['layui.all'] && layui['layui.mobile'])) {
            return callback.call(that);
        }

        that.use(deps, callback);
        return that;
    };

    //使用特定模块
    Layui.prototype.use = function (apps, callback, exports) {
        var that = this,
            dir = config.dir = config.dir ? config.dir : getPath,
            head = doc.getElementsByTagName('head')[0];

        apps = typeof apps === 'string' ? [apps] : apps;

        //如果页面已经存在 jQuery 1.7+ 库且所定义的模块依赖 jQuery，则不加载内部 jquery 模块
        if (window.jQuery && jQuery.fn.on) {
            that.each(apps, function (index, item) {
                if (item === 'jquery') {
                    apps.splice(index, 1);
                }
            });
            layui.jquery = layui.$ = jQuery;
        }

        var item = apps[0],
            timeout = 0;
        exports = exports || [];

        //静态资源host
        config.host = config.host || (dir.match(/\/\/([\s\S]+?)\//) || ['//' + location.host + '/'])[0];

        //加载完毕
        function onScriptLoad(e, url) {
            var readyRegExp = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
            if (e.type === 'load' || (readyRegExp.test((e.currentTarget || e.srcElement).readyState))) {
                config.modules[item] = url;
                head.removeChild(node);
                (function poll() {
                    if (++timeout > config.timeout * 1000 / 4) {
                        return error(item + ' is not a valid module');
                    };
                    config.status[item] ? onCallback() : setTimeout(poll, 4);
                }());
            }
        }

        //回调
        function onCallback() {
            exports.push(layui[item]);
            apps.length > 1 ?
                that.use(apps.slice(1), callback, exports) :
                (typeof callback === 'function' && callback.apply(layui, exports));
        }

        //如果引入了完整库（layui.all.js），内置的模块则不必再加载
        if (apps.length === 0 ||
            (layui['layui.all'] && modules[item]) ||
            (!layui['layui.all'] && layui['layui.mobile'] && modules[item])
        ) {
            return onCallback(), that;
        }

        //获取加载的模块 URL
        //如果是内置模块，则按照 dir 参数拼接模块路径
        //如果是扩展模块，则判断模块路径值是否为 {/} 开头，
        //如果路径值是 {/} 开头，则模块路径即为后面紧跟的字符。
        //否则，则按照 base 参数拼接模块路径
        var url = (modules[item] ? (dir) :
            (/^\{\/\}/.test(that.modules[item]) ? '' : (config.base || ''))
        ) + (that.modules[item] || item) + '.js';

        url = url.replace(/^\{\/\}/, '');

        //如果扩展模块（即：非内置模块）对象已经存在，则不必再加载
        if (!config.modules[item] && layui[item]) {
            config.modules[item] = url; //并记录起该扩展模块的 url
        }

        //首次加载模块
        if (!config.modules[item]) {
            var node = doc.createElement('script');

            node.async = true;
            node.charset = 'utf-8';
            node.src = url + function () {
                var version = config.version === true ?
                    (config.v || (new Date()).getTime()) :
                    (config.version || '');
                return version ? ('?v=' + version) : '';
            }();

            head.appendChild(node);

            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
                node.attachEvent('onreadystatechange', function (e) {
                    onScriptLoad(e, url);
                });
            } else {
                node.addEventListener('load', function (e) {
                    onScriptLoad(e, url);
                }, false);
            }

            config.modules[item] = url;
        } else { //缓存
            (function poll() {
                if (++timeout > config.timeout * 1000 / 4) {
                    return error(item + ' is not a valid module');
                };
                (typeof config.modules[item] === 'string' && config.status[item]) ?
                onCallback(): setTimeout(poll, 4);
            }());
        }

        return that;
    };

    //获取节点的style属性值
    Layui.prototype.getStyle = function (node, name) {
        var style = node.currentStyle ? node.currentStyle : win.getComputedStyle(node, null);
        return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
    };

    //css外部加载器
    Layui.prototype.link = function (href, fn, cssname) {
        var that = this,
            link = doc.createElement('link'),
            head = doc.getElementsByTagName('head')[0];

        if (typeof fn === 'string') cssname = fn;

        var app = (cssname || href).replace(/\.|\//g, ''),
            id = link.id = 'layuicss-' + app,
            timeout = 0;

        link.rel = 'stylesheet';
        link.href = href + (config.debug ? '?v=' + new Date().getTime() : '');
        link.media = 'all';

        if (!doc.getElementById(id)) {
            head.appendChild(link);
        }

        if (typeof fn !== 'function') return that;

        //轮询css是否加载完毕
        (function poll() {
            if (++timeout > config.timeout * 1000 / 100) {
                return error(href + ' timeout');
            };
            parseInt(that.getStyle(doc.getElementById(id), 'width')) === 1989 ? function () {
                fn();
            }() : setTimeout(poll, 100);
        }());

        return that;
    };

    //存储模块的回调
    config.callback = {};

    //重新执行模块的工厂函数
    Layui.prototype.factory = function (modName) {
        if (layui[modName]) {
            return typeof config.callback[modName] === 'function' ?
                config.callback[modName] :
                null;
        }
    };

    //css内部加载器
    Layui.prototype.addcss = function (firename, fn, cssname) {
        return layui.link(config.base + firename, fn, cssname);
    };

    //图片预加载
    Layui.prototype.img = function (url, callback, error) {
        var img = new Image();
        img.src = url;
        if (img.complete) {
            return callback(img);
        }
        img.onload = function () {
            img.onload = null;
            typeof callback === 'function' && callback(img);
        };
        img.onerror = function (e) {
            img.onerror = null;
            typeof error === 'function' && error(e);
        };
    };

    //全局配置
    Layui.prototype.config = function (options) {
        options = options || {};
        for (var key in options) {
            config[key] = options[key];
        }
        return this;
    };

    //记录全部模块
    Layui.prototype.modules = function () {
        var clone = {};
        for (var o in modules) {
            clone[o] = modules[o];
        }
        return clone;
    }();

    //拓展模块
    Layui.prototype.extend = function (options) {
        var that = this;

        //验证模块是否被占用
        options = options || {};
        for (var o in options) {
            if (that[o] || that.modules[o]) {
                // error('\u6A21\u5757\u540D '+ o +' \u5DF2\u88AB\u5360\u7528');
            } else {
                that.modules[o] = options[o];
            }
        }
        return that;
    };

    //路由解析
    Layui.prototype.router = function (hash) {
        var that = this,
            hash = hash || location.hash,
            data = {
                path: [],
                search: {},
                hash: (hash.match(/[^#](#.*$)/) || [])[1] || ''
            };

        if (!/^#\//.test(hash)) return data; //禁止非路由规范
        hash = hash.replace(/^#\//, '');
        data.href = '/' + hash;
        hash = hash.replace(/([^#])(#.*$)/, '$1').split('/') || [];

        //提取Hash结构
        that.each(hash, function (index, item) {
            /^\w+=/.test(item) ? function () {
                item = item.split('=');
                data.search[item[0]] = item[1];
            }() : data.path.push(item);
        });

        return data;
    };

    //本地持久性存储
    Layui.prototype.data = function (table, settings, storage) {
        table = table || 'layui';
        storage = storage || localStorage;

        if (!win.JSON || !win.JSON.parse) return;

        //如果settings为null，则删除表
        if (settings === null) {
            return delete storage[table];
        }

        settings = typeof settings === 'object' ?
            settings : {
                key: settings
            };

        try {
            var data = JSON.parse(storage[table]);
        } catch (e) {
            var data = {};
        }

        if ('value' in settings) data[settings.key] = settings.value;
        if (settings.remove) delete data[settings.key];
        storage[table] = JSON.stringify(data);

        return settings.key ? data[settings.key] : data;
    };

    //本地会话性存储
    Layui.prototype.sessionData = function (table, settings) {
        return this.data(table, settings, sessionStorage);
    }

    //设备信息
    Layui.prototype.device = function (key) {
        var agent = navigator.userAgent.toLowerCase(),

            //获取版本号
            getVersion = function (label) {
                var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
                label = (agent.match(exp) || [])[1];
                return label || false;
            },
            //返回结果集
            result = {
                os: function () { //底层操作系统
                    if (/windows/.test(agent)) {
                        return 'windows';
                    } else if (/linux/.test(agent)) {
                        return 'linux';
                    } else if (/iphone|ipod|ipad|ios/.test(agent)) {
                        return 'ios';
                    } else if (/mac/.test(agent)) {
                        return 'mac';
                    }
                }(),
                ie: function () { //ie版本
                    return (!!win.ActiveXObject || "ActiveXObject" in win) ? (
                        (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
                    ) : false;
                }(),
                weixin: getVersion('micromessenger') //是否微信
            };

        //任意的key
        if (key && !result[key]) {
            result[key] = getVersion(key);
        }

        //移动设备
        result.android = /android/.test(agent);
        result.ios = result.os === 'ios';
        result.mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4))

        return result;
    };

    //提示
    Layui.prototype.hint = function () {
        return {
            error: error
        }
    };

    //遍历
    Layui.prototype.each = function (obj, fn) {
        var key, that = this;
        if (typeof fn !== 'function') return that;
        obj = obj || [];
        if (obj.constructor === Object) {
            for (key in obj) {
                if (fn.call(obj[key], key, obj[key])) break;
            }
        } else {
            for (key = 0; key < obj.length; key++) {
                if (fn.call(obj[key], key, obj[key])) break;
            }
        }
        return that;
    };

    //将数组中的对象按其某个成员排序
    Layui.prototype.sort = function (obj, key, desc) {
        var clone = JSON.parse(
            JSON.stringify(obj || [])
        );

        if (!key) return clone;

        //如果是数字，按大小排序，如果是非数字，按字典序排序
        clone.sort(function (o1, o2) {
            var isNum = /^-?\d+$/,
                v1 = o1[key],
                v2 = o2[key];

            if (isNum.test(v1)) v1 = parseFloat(v1);
            if (isNum.test(v2)) v2 = parseFloat(v2);

            if (v1 && !v2) {
                return 1;
            } else if (!v1 && v2) {
                return -1;
            }

            if (v1 > v2) {
                return 1;
            } else if (v1 < v2) {
                return -1;
            } else {
                return 0;
            }
        });

        desc && clone.reverse(); //倒序
        return clone;
    };

    //阻止事件冒泡
    Layui.prototype.stope = function (thisEvent) {
        thisEvent = thisEvent || win.event;
        try {
            thisEvent.stopPropagation()
        } catch (e) {
            thisEvent.cancelBubble = true;
        }
    };

    //自定义模块事件
    Layui.prototype.onevent = function (modName, events, callback) {
        if (typeof modName !== 'string' ||
            typeof callback !== 'function') return this;

        return Layui.event(modName, events, null, callback);
    };

    //执行自定义模块事件
    Layui.prototype.event = Layui.event = function (modName, events, params, fn) {
        var that = this,
            result = null,
            filter = events.match(/\((.*)\)$/) || [] //提取事件过滤器字符结构，如：select(xxx)
            ,
            eventName = (modName + '.' + events).replace(filter[0], '') //获取事件名称，如：form.select
            ,
            filterName = filter[1] || '' //获取过滤器名称,，如：xxx
            ,
            callback = function (_, item) {
                var res = item && item.call(that, params);
                res === false && result === null && (result = false);
            };

        //添加事件
        if (fn) {
            config.event[eventName] = config.event[eventName] || {};

            //这里不再对多次事件监听做支持，避免更多麻烦
            //config.event[eventName][filterName] ? config.event[eventName][filterName].push(fn) :
            config.event[eventName][filterName] = [fn];
            return this;
        }

        //执行事件回调
        layui.each(config.event[eventName], function (key, item) {
            //执行当前模块的全部事件
            if (filterName === '{*}') {
                layui.each(item, callback);
                return;
            }

            //执行指定事件
            key === '' && layui.each(item, callback);
            (filterName && key === filterName) && layui.each(item, callback);
        });

        return result;
    };

    win.layui = new Layui();

}(window);

/**

 @Name：layer v3.1.2 Web弹层组件
 @Author：贤心
 @Site：http://layer.layui.com
 @License：MIT
 */
;
! function (window, undefined) {
    "use strict";

    var isLayui = window.layui && layui.define,
        $, win, ready = {
            getPath: function () {
                var jsPath = document.currentScript ? document.currentScript.src : function () {
                    var js = document.scripts,
                        last = js.length - 1,
                        src;
                    for (var i = last; i > 0; i--) {
                        if (js[i].readyState === 'interactive') {
                            src = js[i].src;
                            break;
                        }
                    }
                    return src || js[last].src;
                }();
                return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
            }(),

            config: {},
            end: {},
            minIndex: 0,
            minLeft: [],
            btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],

            //五种原始层模式
            type: ['dialog', 'page', 'iframe', 'loading', 'tips'],

            //获取节点的style属性值
            getStyle: function (node, name) {
                var style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
                return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
            },

            //载入CSS配件
            link: function (href, fn, cssname) {

                //未设置路径，则不主动加载css
                if (!layer.path) return;

                var head = document.getElementsByTagName("head")[0],
                    link = document.createElement('link');
                if (typeof fn === 'string') cssname = fn;
                var app = (cssname || href).replace(/\.|\//g, '');
                var id = 'layuicss-' + app,
                    timeout = 0;

                link.rel = 'stylesheet';
                link.href = layer.path + href;
                link.id = id;

                if (!document.getElementById(id)) {
                    head.appendChild(link);
                }

                if (typeof fn !== 'function') return;

                //轮询css是否加载完毕
                // (function poll() {
                //     if (++timeout > 8 * 1000 / 100) {
                //         return window.console && console.error('layer.css: Invalid');
                //     };
                //     parseInt(ready.getStyle(document.getElementById(id), 'width')) === 1989 ? fn() : setTimeout(poll, 100);
                // }());
            }
        };

    //默认内置方法。
    var layer = {
        v: '3.1.1',
        ie: function () { //ie版本
            var agent = navigator.userAgent.toLowerCase();
            return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
                (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
            ) : false;
        }(),
        index: (window.layer && window.layer.v) ? 100000 : 0,
        path: ready.getPath,
        config: function (options, fn) {
            options = options || {};
            layer.cache = ready.config = $.extend({}, ready.config, options);
            layer.path = ready.config.path || layer.path;
            typeof options.extend === 'string' && (options.extend = [options.extend]);

            if (ready.config.path) layer.ready();

            if (!options.extend) return this;

            // isLayui
            //     ?
            //     layui.addcss('modules/layer/' + options.extend) :
            //     ready.link('theme/' + options.extend);

            return this;
        },

        //主体CSS等待事件
        ready: function (callback) {
            // var cssname = 'layer',
            //     ver = '',
            //     path = (isLayui ? 'modules/layer/' : 'theme/') + 'default/layer.css?v=' + layer.v + ver;
            // isLayui ? layui.addcss(path, callback, cssname) : ready.link(path, callback, cssname);
            return this;
        },

        //各种快捷引用
        alert: function (content, options, yes) {
            var type = typeof options === 'function';
            if (type) yes = options;
            return layer.open($.extend({
                content: content,
                yes: yes
            }, type ? {} : options));
        },

        confirm: function (content, options, yes, cancel) {
            var type = typeof options === 'function';
            if (type) {
                cancel = yes;
                yes = options;
            }
            return layer.open($.extend({
                content: content,
                btn: ready.btn,
                yes: yes,
                btn2: cancel
            }, type ? {} : options));
        },

        msg: function (content, options, end) { //最常用提示层
            var type = typeof options === 'function',
                rskin = ready.config.skin;
            var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '') || 'layui-layer-msg';
            var anim = doms.anim.length - 1;
            if (type) end = options;
            return layer.open($.extend({
                content: content,
                time: 3000,
                shade: false,
                skin: skin,
                title: false,
                closeBtn: false,
                btn: false,
                resize: false,
                end: end
            }, (type && !ready.config.skin) ? {
                skin: skin + ' layui-layer-hui',
                anim: anim
            } : function () {
                options = options || {};
                if (options.icon === -1 || options.icon === undefined && !ready.config.skin) {
                    options.skin = skin + ' ' + (options.skin || 'layui-layer-hui');
                }
                return options;
            }()));
        },

        load: function (icon, options) {
            return layer.open($.extend({
                type: 3,
                icon: icon || 1,
                resize: false,
                shade: 0.01
            }, options));
        },

        tips: function (content, follow, options) {
            return layer.open($.extend({
                type: 4,
                content: [content, follow],
                closeBtn: false,
                time: 3000,
                shade: false,
                resize: false,
                fixed: false,
                maxWidth: 210
            }, options));
        }
    };

    var Class = function (setings) {
        var that = this;
        that.index = ++layer.index;
        that.config = $.extend({}, that.config, ready.config, setings);
        document.body ? that.creat() : setTimeout(function () {
            that.creat();
        }, 30);
    };

    Class.pt = Class.prototype;

    //缓存常用字符
    var doms = ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'];
    doms.anim = ['layer-anim-00', 'layer-anim-01', 'layer-anim-02', 'layer-anim-03', 'layer-anim-04', 'layer-anim-05', 'layer-anim-06'];

    //默认配置
    Class.pt.config = {
        type: 0,
        shade: 0.3,
        fixed: true,
        move: doms[1],
        title: '&#x4FE1;&#x606F;',
        offset: 'auto',
        area: 'auto',
        closeBtn: 1,
        time: 0, //0表示不自动关闭
        zIndex: 19891014,
        maxWidth: 360,
        anim: 0,
        isOutAnim: true,
        icon: -1,
        moveType: 1,
        resize: true,
        scrollbar: true, //是否允许浏览器滚动条
        tips: 2
    };

    //容器
    Class.pt.vessel = function (conType, callback) {
        var that = this,
            times = that.index,
            config = that.config;
        var zIndex = config.zIndex + times,
            titype = typeof config.title === 'object';
        var ismax = config.maxmin && (config.type === 1 || config.type === 2);
        var titleHTML = (config.title ? '<div class="layui-layer-title" style="' + (titype ? config.title[1] : '') + '">' +
            (titype ? config.title[0] : config.title) +
            '</div>' : '');

        config.zIndex = zIndex;
        callback([
            //遮罩
            config.shade ? ('<div class="layui-layer-shade" id="layui-layer-shade' + times + '" times="' + times + '" style="' + ('z-index:' + (zIndex - 1) + '; ') + '"></div>') : '',

            //主体
            '<div class="' + doms[0] + (' layui-layer-' + ready.type[config.type]) + (((config.type == 0 || config.type == 2) && !config.shade) ? ' layui-layer-border' : '') + ' ' + (config.skin || '') + '" id="' + doms[0] + times + '" type="' + ready.type[config.type] + '" times="' + times + '" showtime="' + config.time + '" conType="' + (conType ? 'object' : 'string') + '" style="z-index: ' + zIndex + '; width:' + config.area[0] + ';height:' + config.area[1] + (config.fixed ? '' : ';position:absolute;') + '">' +
            (conType && config.type != 2 ? '' : titleHTML) +
            '<div id="' + (config.id || '') + '" class="layui-layer-content' + ((config.type == 0 && config.icon !== -1) ? ' layui-layer-padding' : '') + (config.type == 3 ? ' layui-layer-loading' + config.icon : '') + '">' +
            (config.type == 0 && config.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + config.icon + '"></i>' : '') +
            (config.type == 1 && conType ? '' : (config.content || '')) +
            '</div>' +
            '<span class="layui-layer-setwin">' + function () {
                var closebtn = ismax ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '';
                config.closeBtn && (closebtn += '<a class="layui-layer-ico ' + doms[7] + ' ' + doms[7] + (config.title ? config.closeBtn : (config.type == 4 ? '1' : '2')) + '" href="javascript:;"></a>');
                return closebtn;
            }() + '</span>' +
            (config.btn ? function () {
                var button = '';
                typeof config.btn === 'string' && (config.btn = [config.btn]);
                for (var i = 0, len = config.btn.length; i < len; i++) {
                    button += '<a class="' + doms[6] + '' + i + '">' + config.btn[i] + '</a>'
                }
                return '<div class="' + doms[6] + ' layui-layer-btn-' + (config.btnAlign || '') + '">' + button + '</div>'
            }() : '') +
            (config.resize ? '<span class="layui-layer-resize"></span>' : '') +
            '</div>'
        ], titleHTML, $('<div class="layui-layer-move"></div>'));
        return that;
    };

    //创建骨架
    Class.pt.creat = function () {
        var that = this,
            config = that.config,
            times = that.index,
            nodeIndex, content = config.content,
            conType = typeof content === 'object',
            body = $('body');

        if (config.id && $('#' + config.id)[0]) return;

        if (typeof config.area === 'string') {
            config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
        }

        //anim兼容旧版shift
        if (config.shift) {
            config.anim = config.shift;
        }

        if (layer.ie == 6) {
            config.fixed = false;
        }

        switch (config.type) {
            case 0:
                config.btn = ('btn' in config) ? config.btn : ready.btn[0];
                layer.closeAll('dialog');
                break;
            case 2:
                var content = config.content = conType ? config.content : [config.content || '', 'auto'];
                config.content = '<iframe scrolling="' + (config.content[1] || 'auto') + '" allowtransparency="true" id="' + doms[4] + '' + times + '" name="' + doms[4] + '' + times + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
                break;
            case 3:
                delete config.title;
                delete config.closeBtn;
                config.icon === -1 && (config.icon === 0);
                layer.closeAll('loading');
                break;
            case 4:
                conType || (config.content = [config.content, 'body']);
                config.follow = config.content[1];
                config.content = config.content[0] + '<i class="layui-layer-TipsG"></i>';
                delete config.title;
                config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
                config.tipsMore || layer.closeAll('tips');
                break;
        }

        //建立容器
        that.vessel(conType, function (html, titleHTML, moveElem) {
            body.append(html[0]);
            conType ? function () {
                (config.type == 2 || config.type == 4) ? function () {
                    $('body').append(html[1]);
                }() : function () {
                    if (!content.parents('.' + doms[0])[0]) {
                        content.data('display', content.css('display')).show().addClass('layui-layer-wrap').wrap(html[1]);
                        $('#' + doms[0] + times).find('.' + doms[5]).before(titleHTML);
                    }
                }();
            }() : body.append(html[1]);
            $('.layui-layer-move')[0] || body.append(ready.moveElem = moveElem);
            that.layero = $('#' + doms[0] + times);
            config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);
        }).auto(times);

        //遮罩
        $('#layui-layer-shade' + that.index).css({
            'background-color': config.shade[1] || '#000',
            'opacity': config.shade[0] || config.shade
        });

        config.type == 2 && layer.ie == 6 && that.layero.find('iframe').attr('src', content[0]);

        //坐标自适应浏览器窗口尺寸
        config.type == 4 ? that.tips() : that.offset();
        if (config.fixed) {
            win.on('resize', function () {
                that.offset();
                (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
                config.type == 4 && that.tips();
            });
        }

        config.time <= 0 || setTimeout(function () {
            layer.close(that.index)
        }, config.time);
        that.move().callback();

        //为兼容jQuery3.0的css动画影响元素尺寸计算
        if (doms.anim[config.anim]) {
            var animClass = 'layer-anim ' + doms.anim[config.anim];
            that.layero.addClass(animClass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass(animClass);
            });
        };

        //记录关闭动画
        if (config.isOutAnim) {
            that.layero.data('isOutAnim', true);
        }
    };

    //自适应
    Class.pt.auto = function (index) {
        var that = this,
            config = that.config,
            layero = $('#' + doms[0] + index);

        if (config.area[0] === '' && config.maxWidth > 0) {
            //为了修复IE7下一个让人难以理解的bug
            if (layer.ie && layer.ie < 8 && config.btn) {
                layero.width(layero.innerWidth());
            }
            layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
        }

        var area = [layero.innerWidth(), layero.innerHeight()],
            titHeight = layero.find(doms[1]).outerHeight() || 0,
            btnHeight = layero.find('.' + doms[6]).outerHeight() || 0,
            setHeight = function (elem) {
                elem = layero.find(elem);
                elem.height(area[1] - titHeight - btnHeight - 2 * (parseFloat(elem.css('padding-top')) | 0));
            };

        switch (config.type) {
            case 2:
                setHeight('iframe');
                break;
            default:
                if (config.area[1] === '') {
                    if (config.maxHeight > 0 && layero.outerHeight() > config.maxHeight) {
                        area[1] = config.maxHeight;
                        setHeight('.' + doms[5]);
                    } else if (config.fixed && area[1] >= win.height()) {
                        area[1] = win.height();
                        setHeight('.' + doms[5]);
                    }
                } else {
                    setHeight('.' + doms[5]);
                }
                break;
        };

        return that;
    };

    //计算坐标
    Class.pt.offset = function () {
        var that = this,
            config = that.config,
            layero = that.layero;
        var area = [layero.outerWidth(), layero.outerHeight()];
        var type = typeof config.offset === 'object';
        that.offsetTop = (win.height() - area[1]) / 2;
        that.offsetLeft = (win.width() - area[0]) / 2;

        if (type) {
            that.offsetTop = config.offset[0];
            that.offsetLeft = config.offset[1] || that.offsetLeft;
        } else if (config.offset !== 'auto') {

            if (config.offset === 't') { //上
                that.offsetTop = 0;
            } else if (config.offset === 'r') { //右
                that.offsetLeft = win.width() - area[0];
            } else if (config.offset === 'b') { //下
                that.offsetTop = win.height() - area[1];
            } else if (config.offset === 'l') { //左
                that.offsetLeft = 0;
            } else if (config.offset === 'lt') { //左上角
                that.offsetTop = 0;
                that.offsetLeft = 0;
            } else if (config.offset === 'lb') { //左下角
                that.offsetTop = win.height() - area[1];
                that.offsetLeft = 0;
            } else if (config.offset === 'rt') { //右上角
                that.offsetTop = 0;
                that.offsetLeft = win.width() - area[0];
            } else if (config.offset === 'rb') { //右下角
                that.offsetTop = win.height() - area[1];
                that.offsetLeft = win.width() - area[0];
            } else {
                that.offsetTop = config.offset;
            }

        }

        if (!config.fixed) {
            that.offsetTop = /%$/.test(that.offsetTop) ?
                win.height() * parseFloat(that.offsetTop) / 100 :
                parseFloat(that.offsetTop);
            that.offsetLeft = /%$/.test(that.offsetLeft) ?
                win.width() * parseFloat(that.offsetLeft) / 100 :
                parseFloat(that.offsetLeft);
            that.offsetTop += win.scrollTop();
            that.offsetLeft += win.scrollLeft();
        }

        if (layero.attr('minLeft')) {
            that.offsetTop = win.height() - (layero.find(doms[1]).outerHeight() || 0);
            that.offsetLeft = layero.css('left');
        }

        layero.css({
            top: that.offsetTop,
            left: that.offsetLeft
        });
    };

    //Tips
    Class.pt.tips = function () {
        var that = this,
            config = that.config,
            layero = that.layero;
        var layArea = [layero.outerWidth(), layero.outerHeight()],
            follow = $(config.follow);
        if (!follow[0]) follow = $('body');
        var goal = {
                width: follow.outerWidth(),
                height: follow.outerHeight(),
                top: follow.offset().top,
                left: follow.offset().left
            },
            tipsG = layero.find('.layui-layer-TipsG');

        var guide = config.tips[0];
        config.tips[1] || tipsG.remove();

        goal.autoLeft = function () {
            if (goal.left + layArea[0] - win.width() > 0) {
                goal.tipLeft = goal.left + goal.width - layArea[0];
                tipsG.css({
                    right: 12,
                    left: 'auto'
                });
            } else {
                goal.tipLeft = goal.left;
            };
        };

        //辨别tips的方位
        goal.where = [function () { //上
            goal.autoLeft();
            goal.tipTop = goal.top - layArea[1] - 10;
            tipsG.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
        }, function () { //右
            goal.tipLeft = goal.left + goal.width + 10;
            goal.tipTop = goal.top;
            tipsG.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]);
        }, function () { //下
            goal.autoLeft();
            goal.tipTop = goal.top + goal.height + 10;
            tipsG.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', config.tips[1]);
        }, function () { //左
            goal.tipLeft = goal.left - layArea[0] - 10;
            goal.tipTop = goal.top;
            tipsG.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
        }];
        goal.where[guide - 1]();

        /* 8*2为小三角形占据的空间 */
        if (guide === 1) {
            goal.top - (win.scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
        } else if (guide === 2) {
            win.width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 || goal.where[3]()
        } else if (guide === 3) {
            (goal.top - win.scrollTop() + goal.height + layArea[1] + 8 * 2) - win.height() > 0 && goal.where[0]();
        } else if (guide === 4) {
            layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]()
        }

        layero.find('.' + doms[5]).css({
            'background-color': config.tips[1],
            'padding-right': (config.closeBtn ? '30px' : '')
        });
        layero.css({
            left: goal.tipLeft - (config.fixed ? win.scrollLeft() : 0),
            top: goal.tipTop - (config.fixed ? win.scrollTop() : 0)
        });
    }

    //拖拽层
    Class.pt.move = function () {
        var that = this,
            config = that.config,
            _DOC = $(document),
            layero = that.layero,
            moveElem = layero.find(config.move),
            resizeElem = layero.find('.layui-layer-resize'),
            dict = {};

        if (config.move) {
            moveElem.css('cursor', 'move');
        }

        moveElem.on('mousedown', function (e) {
            e.preventDefault();
            if (config.move) {
                dict.moveStart = true;
                dict.offset = [
                    e.clientX - parseFloat(layero.css('left')), e.clientY - parseFloat(layero.css('top'))
                ];
                ready.moveElem.css('cursor', 'move').show();
            }
        });

        resizeElem.on('mousedown', function (e) {
            e.preventDefault();
            dict.resizeStart = true;
            dict.offset = [e.clientX, e.clientY];
            dict.area = [
                layero.outerWidth(), layero.outerHeight()
            ];
            ready.moveElem.css('cursor', 'se-resize').show();
        });

        _DOC.on('mousemove', function (e) {

            //拖拽移动
            if (dict.moveStart) {
                var X = e.clientX - dict.offset[0],
                    Y = e.clientY - dict.offset[1],
                    fixed = layero.css('position') === 'fixed';

                e.preventDefault();

                dict.stX = fixed ? 0 : win.scrollLeft();
                dict.stY = fixed ? 0 : win.scrollTop();

                //控制元素不被拖出窗口外
                if (!config.moveOut) {
                    var setRig = win.width() - layero.outerWidth() + dict.stX,
                        setBot = win.height() - layero.outerHeight() + dict.stY;
                    X < dict.stX && (X = dict.stX);
                    X > setRig && (X = setRig);
                    Y < dict.stY && (Y = dict.stY);
                    Y > setBot && (Y = setBot);
                }

                layero.css({
                    left: X,
                    top: Y
                });
            }

            //Resize
            if (config.resize && dict.resizeStart) {
                var X = e.clientX - dict.offset[0],
                    Y = e.clientY - dict.offset[1];

                e.preventDefault();

                layer.style(that.index, {
                    width: dict.area[0] + X,
                    height: dict.area[1] + Y
                })
                dict.isResize = true;
                config.resizing && config.resizing(layero);
            }
        }).on('mouseup', function (e) {
            if (dict.moveStart) {
                delete dict.moveStart;
                ready.moveElem.hide();
                config.moveEnd && config.moveEnd(layero);
            }
            if (dict.resizeStart) {
                delete dict.resizeStart;
                ready.moveElem.hide();
            }
        });

        return that;
    };

    Class.pt.callback = function () {
        var that = this,
            layero = that.layero,
            config = that.config;
        that.openLayer();
        if (config.success) {
            if (config.type == 2) {
                layero.find('iframe').on('load', function () {
                    config.success(layero, that.index);
                });
            } else {
                config.success(layero, that.index);
            }
        }
        layer.ie == 6 && that.IE6(layero);

        //按钮
        layero.find('.' + doms[6]).children('a').on('click', function () {
            var index = $(this).index();
            if (index === 0) {
                if (config.yes) {
                    config.yes(that.index, layero)
                } else if (config['btn1']) {
                    config['btn1'](that.index, layero)
                } else {
                    layer.close(that.index);
                }
            } else {
                var close = config['btn' + (index + 1)] && config['btn' + (index + 1)](that.index, layero);
                close === false || layer.close(that.index);
            }
        });

        //取消
        function cancel() {
            var close = config.cancel && config.cancel(that.index, layero);
            close === false || layer.close(that.index);
        }

        //右上角关闭回调
        layero.find('.' + doms[7]).on('click', cancel);

        //点遮罩关闭
        if (config.shadeClose) {
            $('#layui-layer-shade' + that.index).on('click', function () {
                layer.close(that.index);
            });
        }

        //最小化
        layero.find('.layui-layer-min').on('click', function () {
            var min = config.min && config.min(layero);
            min === false || layer.min(that.index, config);
        });

        //全屏/还原
        layero.find('.layui-layer-max').on('click', function () {
            if ($(this).hasClass('layui-layer-maxmin')) {
                layer.restore(that.index);
                config.restore && config.restore(layero);
            } else {
                layer.full(that.index, config);
                setTimeout(function () {
                    config.full && config.full(layero);
                }, 100);
            }
        });

        config.end && (ready.end[that.index] = config.end);
    };

    //for ie6 恢复select
    ready.reselect = function () {
        $.each($('select'), function (index, value) {
            var sthis = $(this);
            if (!sthis.parents('.' + doms[0])[0]) {
                (sthis.attr('layer') == 1 && $('.' + doms[0]).length < 1) && sthis.removeAttr('layer').show();
            }
            sthis = null;
        });
    };

    Class.pt.IE6 = function (layero) {
        //隐藏select
        $('select').each(function (index, value) {
            var sthis = $(this);
            if (!sthis.parents('.' + doms[0])[0]) {
                sthis.css('display') === 'none' || sthis.attr({
                    'layer': '1'
                }).hide();
            }
            sthis = null;
        });
    };

    //需依赖原型的对外方法
    Class.pt.openLayer = function () {
        var that = this;

        //置顶当前窗口
        layer.zIndex = that.config.zIndex;
        layer.setTop = function (layero) { -
            var setZindex = function () {
                layer.zIndex++;
                layero.css('z-index', layer.zIndex + 1);
            };
            layer.zIndex = parseInt(layero[0].style.zIndex);
            layero.on('mousedown', setZindex);
            return layer.zIndex;
        };
    };

    ready.record = function (layero) {
        var area = [
            layero.width(),
            layero.height(),
            layero.position().top,
            layero.position().left + parseFloat(layero.css('margin-left'))
        ];
        layero.find('.layui-layer-max').addClass('layui-layer-maxmin');
        layero.attr({
            area: area
        });
    };

    ready.rescollbar = function (index) {
        if (doms.html.attr('layer-full') == index) {
            if (doms.html[0].style.removeProperty) {
                doms.html[0].style.removeProperty('overflow');
            } else {
                doms.html[0].style.removeAttribute('overflow');
            }
            doms.html.removeAttr('layer-full');
        }
    };

    /** 内置成员 */

    window.layer = layer;

    //获取子iframe的DOM
    layer.getChildFrame = function (selector, index) {
        index = index || $('.' + doms[4]).attr('times');
        return $('#' + doms[0] + index).find('iframe').contents().find(selector);
    };

    //得到当前iframe层的索引，子iframe时使用
    layer.getFrameIndex = function (name) {
        return $('#' + name).parents('.' + doms[4]).attr('times');
    };

    //iframe层自适应宽高
    layer.iframeAuto = function (index) {
        if (!index) return;
        var heg = layer.getChildFrame('html', index).outerHeight();
        var layero = $('#' + doms[0] + index);
        var titHeight = layero.find(doms[1]).outerHeight() || 0;
        var btnHeight = layero.find('.' + doms[6]).outerHeight() || 0;
        layero.css({
            height: heg + titHeight + btnHeight
        });
        layero.find('iframe').css({
            height: heg
        });
    };

    //重置iframe url
    layer.iframeSrc = function (index, url) {
        $('#' + doms[0] + index).find('iframe').attr('src', url);
    };

    //设定层的样式
    layer.style = function (index, options, limit) {
        var layero = $('#' + doms[0] + index),
            contElem = layero.find('.layui-layer-content'),
            type = layero.attr('type'),
            titHeight = layero.find(doms[1]).outerHeight() || 0,
            btnHeight = layero.find('.' + doms[6]).outerHeight() || 0,
            minLeft = layero.attr('minLeft');

        if (type === ready.type[3] || type === ready.type[4]) {
            return;
        }

        if (!limit) {
            if (parseFloat(options.width) <= 260) {
                options.width = 260;
            };

            if (parseFloat(options.height) - titHeight - btnHeight <= 64) {
                options.height = 64 + titHeight + btnHeight;
            };
        }

        layero.css(options);
        btnHeight = layero.find('.' + doms[6]).outerHeight();

        if (type === ready.type[2]) {
            layero.find('iframe').css({
                height: parseFloat(options.height) - titHeight - btnHeight
            });
        } else {
            contElem.css({
                height: parseFloat(options.height) - titHeight - btnHeight -
                    parseFloat(contElem.css('padding-top')) -
                    parseFloat(contElem.css('padding-bottom'))
            })
        }
    };

    //最小化
    layer.min = function (index, options) {
        var layero = $('#' + doms[0] + index),
            titHeight = layero.find(doms[1]).outerHeight() || 0,
            left = layero.attr('minLeft') || (181 * ready.minIndex) + 'px',
            position = layero.css('position');

        ready.record(layero);

        if (ready.minLeft[0]) {
            left = ready.minLeft[0];
            ready.minLeft.shift();
        }

        layero.attr('position', position);

        layer.style(index, {
            width: 180,
            height: titHeight,
            left: left,
            top: win.height() - titHeight,
            position: 'fixed',
            overflow: 'hidden'
        }, true);
        layero.find('.layui-layer-min').hide();
        layero.attr('type') === 'page' && layero.find(doms[4]).hide();
        ready.rescollbar(index);

        if (!layero.attr('minLeft')) {
            ready.minIndex++;
        }
        layero.attr('minLeft', left);
    };

    //还原
    layer.restore = function (index) {
        var layero = $('#' + doms[0] + index),
            titHeight = layero.find(doms[1]).outerHeight() || 0,
            area = layero.attr('area').split(',');
        var type = layero.attr('type');
        layer.style(index, {
            width: parseFloat(area[0]),
            height: parseFloat(area[1]),
            top: parseFloat(area[2]),
            left: parseFloat(area[3]),
            position: layero.attr('position'),
            overflow: 'visible'
        }, true);
        //iframe resize
        $('#layui-layer-iframe' + index).css('height', parseFloat(area[1]) - titHeight)

        layero.find('.layui-layer-max').removeClass('layui-layer-maxmin');
        layero.find('.layui-layer-min').show();
        layero.attr('type') === 'page' && layero.find(doms[4]).show();
        ready.rescollbar(index);
    };

    //全屏
    layer.full = function (index) {
        var layero = $('#' + doms[0] + index),
            titHeight = layero.find(doms[1]).outerHeight() || 0,
            timer;
        ready.record(layero);
        if (!doms.html.attr('layer-full')) {
            doms.html.css('overflow', 'hidden').attr('layer-full', index);
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            var isfix = layero.css('position') === 'fixed';
            layer.style(index, {
                top: isfix ? 0 : win.scrollTop(),
                left: isfix ? 0 : win.scrollLeft(),
                width: win.width(),
                height: win.height()
            }, true);
            //iframe resize
            $('#layui-layer-iframe' + index).css('height', win.height() - titHeight)
            layero.find('.layui-layer-min').hide();
        }, 100);
    };

    //改变title
    layer.title = function (name, index) {
        var title = $('#' + doms[0] + (index || layer.index)).find(doms[1]);
        title.html(name);
    };

    //关闭layer总方法
    layer.close = function (index) {
        var layero = $('#' + doms[0] + index),
            type = layero.attr('type'),
            closeAnim = 'layer-anim-close';
        if (!layero[0]) return;
        var WRAP = 'layui-layer-wrap',
            remove = function () {
                if (type === ready.type[1] && layero.attr('conType') === 'object') {
                    layero.children(':not(.' + doms[5] + ')').remove();
                    var wrap = layero.find('.' + WRAP);
                    for (var i = 0; i < 2; i++) {
                        wrap.unwrap();
                    }
                    wrap.css('display', wrap.data('display')).removeClass(WRAP);
                } else {
                    //低版本IE 回收 iframe
                    if (type === ready.type[2]) {
                        try {
                            var iframe = $('#' + doms[4] + index)[0];
                            iframe.contentWindow.document.write('');
                            iframe.contentWindow.close();
                            layero.find('.' + doms[5])[0].removeChild(iframe);
                        } catch (e) {}
                    }
                    layero[0].innerHTML = '';
                    layero.remove();
                }
                typeof ready.end[index] === 'function' && ready.end[index]();
                delete ready.end[index];
            };

        if (layero.data('isOutAnim')) {
            layero.addClass('layer-anim ' + closeAnim);
        }

        $('#layui-layer-moves, #layui-layer-shade' + index).remove();
        layer.ie == 6 && ready.reselect();
        ready.rescollbar(index);
        if (layero.attr('minLeft')) {
            ready.minIndex--;
            ready.minLeft.push(layero.attr('minLeft'));
        }

        if ((layer.ie && layer.ie < 10) || !layero.data('isOutAnim')) {
            remove()
        } else {
            setTimeout(function () {
                remove();
            }, 200);
        }
    };

    //关闭所有层
    layer.closeAll = function (type) {
        $.each($('.' + doms[0]), function () {
            var othis = $(this);
            var is = type ? (othis.attr('type') === type) : 1;
            is && layer.close(othis.attr('times'));
            is = null;
        });
    };

    /**

     拓展模块，layui开始合并在一起

     */

    var cache = layer.cache || {},
        skin = function (type) {
            return (cache.skin ? (' ' + cache.skin + ' ' + cache.skin + '-' + type) : '');
        };

    //仿系统prompt
    layer.prompt = function (options, yes) {
        var style = '';
        options = options || {};

        if (typeof options === 'function') yes = options;

        if (options.area) {
            var area = options.area;
            style = 'style="width: ' + area[0] + '; height: ' + area[1] + ';"';
            delete options.area;
        }
        var prompt, content = options.formType == 2 ? '<textarea class="layui-layer-input"' + style + '></textarea>' : function () {
            return '<input type="' + (options.formType == 1 ? 'password' : 'text') + '" class="layui-layer-input">';
        }();

        var success = options.success;
        delete options.success;

        return layer.open($.extend({
            type: 1,
            btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
            content: content,
            skin: 'layui-layer-prompt' + skin('prompt'),
            maxWidth: win.width(),
            success: function (layero) {
                prompt = layero.find('.layui-layer-input');
                prompt.val(options.value || '').focus();
                typeof success === 'function' && success(layero);
            },
            resize: false,
            yes: function (index) {
                var value = prompt.val();
                if (value === '') {
                    prompt.focus();
                } else if (value.length > (options.maxlength || 500)) {
                    layer.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + (options.maxlength || 500) + '&#x4E2A;&#x5B57;&#x6570;', prompt, {
                        tips: 1
                    });
                } else {
                    yes && yes(value, index, prompt);
                }
            }
        }, options));
    };

    //tab层
    layer.tab = function (options) {
        options = options || {};

        var tab = options.tab || {},
            THIS = 'layui-this',
            success = options.success;

        delete options.success;

        return layer.open($.extend({
            type: 1,
            skin: 'layui-layer-tab' + skin('tab'),
            resize: false,
            title: function () {
                var len = tab.length,
                    ii = 1,
                    str = '';
                if (len > 0) {
                    str = '<span class="' + THIS + '">' + tab[0].title + '</span>';
                    for (; ii < len; ii++) {
                        str += '<span>' + tab[ii].title + '</span>';
                    }
                }
                return str;
            }(),
            content: '<ul class="layui-layer-tabmain">' + function () {
                var len = tab.length,
                    ii = 1,
                    str = '';
                if (len > 0) {
                    str = '<li class="layui-layer-tabli ' + THIS + '">' + (tab[0].content || 'no content') + '</li>';
                    for (; ii < len; ii++) {
                        str += '<li class="layui-layer-tabli">' + (tab[ii].content || 'no  content') + '</li>';
                    }
                }
                return str;
            }() + '</ul>',
            success: function (layero) {
                var btn = layero.find('.layui-layer-title').children();
                var main = layero.find('.layui-layer-tabmain').children();
                btn.on('mousedown', function (e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                    var othis = $(this),
                        index = othis.index();
                    othis.addClass(THIS).siblings().removeClass(THIS);
                    main.eq(index).show().siblings().hide();
                    typeof options.change === 'function' && options.change(index);
                });
                typeof success === 'function' && success(layero);
            }
        }, options));
    };

    //相册层
    layer.photos = function (options, loop, key) {
        var dict = {};
        options = options || {};
        if (!options.photos) return;
        var type = options.photos.constructor === Object;
        var photos = type ? options.photos : {},
            data = photos.data || [];
        var start = photos.start || 0;
        dict.imgIndex = (start | 0) + 1;

        options.img = options.img || 'img';

        var success = options.success;
        delete options.success;

        if (!type) { //页面直接获取
            var parent = $(options.photos),
                pushData = function () {
                    data = [];
                    parent.find(options.img).each(function (index) {
                        var othis = $(this);
                        othis.attr('layer-index', index);
                        data.push({
                            alt: othis.attr('alt'),
                            pid: othis.attr('layer-pid'),
                            src: othis.attr('layer-src') || othis.attr('src'),
                            thumb: othis.attr('src')
                        });
                    })
                };

            pushData();

            if (data.length === 0) return;

            loop || parent.on('click', options.img, function () {
                var othis = $(this),
                    index = othis.attr('layer-index');
                layer.photos($.extend(options, {
                    photos: {
                        start: index,
                        data: data,
                        tab: options.tab
                    },
                    full: options.full
                }), true);
                pushData();
            })

            //不直接弹出
            if (!loop) return;

        } else if (data.length === 0) {
            return layer.msg('&#x6CA1;&#x6709;&#x56FE;&#x7247;');
        }

        //上一张
        dict.imgprev = function (key) {
            dict.imgIndex--;
            if (dict.imgIndex < 1) {
                dict.imgIndex = data.length;
            }
            dict.tabimg(key);
        };

        //下一张
        dict.imgnext = function (key, errorMsg) {
            dict.imgIndex++;
            if (dict.imgIndex > data.length) {
                dict.imgIndex = 1;
                if (errorMsg) {
                    return
                };
            }
            dict.tabimg(key)
        };

        //方向键
        dict.keyup = function (event) {
            if (!dict.end) {
                var code = event.keyCode;
                event.preventDefault();
                if (code === 37) {
                    dict.imgprev(true);
                } else if (code === 39) {
                    dict.imgnext(true);
                } else if (code === 27) {
                    layer.close(dict.index);
                }
            }
        }

        //切换
        dict.tabimg = function (key) {
            if (data.length <= 1) return;
            photos.start = dict.imgIndex - 1;
            layer.close(dict.index);
            return layer.photos(options, true, key);
            setTimeout(function () {
                layer.photos(options, true, key);
            }, 200);
        }

        //一些动作
        dict.event = function () {
            dict.bigimg.hover(function () {
                dict.imgsee.show();
            }, function () {
                dict.imgsee.hide();
            });

            dict.bigimg.find('.layui-layer-imgprev').on('click', function (event) {
                event.preventDefault();
                dict.imgprev();
            });

            dict.bigimg.find('.layui-layer-imgnext').on('click', function (event) {
                event.preventDefault();
                dict.imgnext();
            });

            $(document).on('keyup', dict.keyup);
        };

        //图片预加载
        function loadImage(url, callback, error) {
            var img = new Image();
            img.src = url;
            if (img.complete) {
                return callback(img);
            }
            img.onload = function () {
                img.onload = null;
                callback(img);
            };
            img.onerror = function (e) {
                img.onerror = null;
                error(e);
            };
        };

        dict.loadi = layer.load(1, {
            shade: 'shade' in options ? false : 0.9,
            scrollbar: false
        });

        loadImage(data[start].src, function (img) {
            layer.close(dict.loadi);
            dict.index = layer.open($.extend({
                type: 1,
                id: 'layui-layer-photos',
                area: function () {
                    var imgarea = [img.width, img.height];
                    var winarea = [$(window).width() - 100, $(window).height() - 100];

                    //如果 实际图片的宽或者高比 屏幕大（那么进行缩放）
                    if (!options.full && (imgarea[0] > winarea[0] || imgarea[1] > winarea[1])) {
                        var wh = [imgarea[0] / winarea[0], imgarea[1] / winarea[1]]; //取宽度缩放比例、高度缩放比例
                        if (wh[0] > wh[1]) { //取缩放比例最大的进行缩放
                            imgarea[0] = imgarea[0] / wh[0];
                            imgarea[1] = imgarea[1] / wh[0];
                        } else if (wh[0] < wh[1]) {
                            imgarea[0] = imgarea[0] / wh[1];
                            imgarea[1] = imgarea[1] / wh[1];
                        }
                    }

                    return [imgarea[0] + 'px', imgarea[1] + 'px'];
                }(),
                title: false,
                shade: 0.9,
                shadeClose: true,
                closeBtn: false,
                move: '.layui-layer-phimg img',
                moveType: 1,
                scrollbar: false,
                moveOut: true,
                //anim: Math.random()*5|0,
                isOutAnim: false,
                skin: 'layui-layer-photos' + skin('photos'),
                content: '<div class="layui-layer-phimg">' +
                    '<img src="' + data[start].src + '" alt="' + (data[start].alt || '') + '" layer-pid="' + data[start].pid + '">' +
                    '<div class="layui-layer-imgsee">' +
                    (data.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : '') +
                    '<div class="layui-layer-imgbar" style="display:' + (key ? 'block' : '') + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (data[start].alt || '') + '</a><em>' + dict.imgIndex + '/' + data.length + '</em></span></div>' +
                    '</div>' +
                    '</div>',
                success: function (layero, index) {
                    dict.bigimg = layero.find('.layui-layer-phimg');
                    dict.imgsee = layero.find('.layui-layer-imguide,.layui-layer-imgbar');
                    dict.event(layero);
                    options.tab && options.tab(data[start], layero);
                    typeof success === 'function' && success(layero);
                },
                end: function () {
                    dict.end = true;
                    $(document).off('keyup', dict.keyup);
                }
            }, options));
        }, function () {
            layer.close(dict.loadi);
            layer.msg('&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;', {
                time: 30000,
                btn: ['&#x4E0B;&#x4E00;&#x5F20;', '&#x4E0D;&#x770B;&#x4E86;'],
                yes: function () {
                    data.length > 1 && dict.imgnext(true, true);
                }
            });
        });
    };

    //主入口
    ready.run = function (_$) {
        $ = _$;
        win = $(window);
        doms.html = $('html');
        layer.open = function (deliver) {
            var o = new Class(deliver);
            return o.index;
        };
    };
    //加载方式
    window.layui && layui.define ? (
        layer.ready(), layui.define('jquery', function (exports) { //layui加载
            layer.path = layui.cache.dir;
            ready.run(layui.$);

            //暴露模块
            window.layer = layer;
            exports('layer', layer);
        })
    ) : (
        (typeof define === 'function' && define.amd) ? define([], function () { //requirejs加载
            ready.run(window.jQuery);
            return layer;
        }) : function () { //普通script标签加载
            ready.run(window.jQuery);
            layer.ready();
        }()
    );

}(window);

/**

 @Name：layui.util 工具集
 @Author：贤心
 @License：MIT

*/
layui.define(['jquery'], function (exports) {
    "use strict";

    var $ = layui.$,

        //外部接口
        util = {
            loadJs: function (sUrl, fCallback) {
                var _script = document.createElement("script");
                _script.setAttribute("type", "text/javascript");
                _script.setAttribute("src", sUrl);
                document.getElementsByTagName("head")[0].appendChild(_script);

                if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
                    _script.onreadystatechange = function () {
                        if (this.readyState == "loaded" || this.readyState == "complete") {
                            fCallback();
                        }
                    };
                } else if (/gecko/.test(window.navigator.userAgent.toLowerCase())) {
                    _script.onload = function () {
                        fCallback();
                    };
                } else {
                    fCallback();
                }
            },
            //固定块
            fixbar: function (options) {
                var ELEM = 'layui-fixbar',
                    TOP_BAR = 'layui-fixbar-top',
                    dom = $(document),
                    body = $('body'),
                    is, timer;

                options = $.extend({
                    showHeight: 200 //出现TOP的滚动条高度临界值
                }, options);

                options.bar1 = options.bar1 === true ? '&#xe606;' : options.bar1;
                options.bar2 = options.bar2 === true ? '&#xe607;' : options.bar2;
                options.bgcolor = options.bgcolor ? ('background-color:' + options.bgcolor) : '';

                var icon = [options.bar1, options.bar2, '&#xe604;'] //图标：信息、问号、TOP
                    ,
                    elem = $(['<ul class="' + ELEM + '">', options.bar1 ? '<li class="fa" lay-type="bar1" style="' + options.bgcolor + '">' + icon[0] + '</li>' : '', options.bar2 ? '<li class="fa" lay-type="bar2" style="' + options.bgcolor + '">' + icon[1] + '</li>' : '', '<li class="fa ' + TOP_BAR + '" lay-type="top" style="' + options.bgcolor + '">' + icon[2] + '</li>', '</ul>'].join('')),
                    topBar = elem.find('.' + TOP_BAR),
                    scroll = function () {
                        var stop = dom.scrollTop();
                        if (stop >= (options.showHeight)) {
                            is || (topBar.show(), is = 1);
                        } else {
                            is && (topBar.hide(), is = 0);
                        }
                    };
                if ($('.' + ELEM)[0]) return;

                typeof options.css === 'object' && elem.css(options.css);
                body.append(elem), scroll();

                //bar点击事件
                elem.find('li').on('click', function () {
                    var othis = $(this),
                        type = othis.attr('lay-type');
                    if (type === 'top') {
                        $('html,body').animate({
                            scrollTop: 0
                        }, 200);
                    }
                    options.click && options.click.call(this, type);
                });

                //Top显示控制
                dom.on('scroll', function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        scroll();
                    }, 100);
                });
            },

            //倒计时
            countdown: function (endTime, serverTime, callback) {
                var that = this,
                    type = typeof serverTime === 'function',
                    end = new Date(endTime).getTime(),
                    now = new Date((!serverTime || type) ? new Date().getTime() : serverTime).getTime(),
                    count = end - now,
                    time = [
                        Math.floor(count / (1000 * 60 * 60 * 24)) //天
                        , Math.floor(count / (1000 * 60 * 60)) % 24 //时
                        , Math.floor(count / (1000 * 60)) % 60 //分
                        , Math.floor(count / 1000) % 60 //秒
                    ];

                if (type) callback = serverTime;

                var timer = setTimeout(function () {
                    that.countdown(endTime, now + 1000, callback);
                }, 1000);

                callback && callback(count > 0 ? time : [0, 0, 0, 0], serverTime, timer);

                if (count <= 0) clearTimeout(timer);
                return timer;
            },

            //某个时间在当前时间的多久前
            timeAgo: function (time, onlyDate) {
                var that = this,
                    arr = [
                        [],
                        []
                    ],
                    stamp = new Date().getTime() - new Date(time).getTime();

                //返回具体日期
                if (stamp > 1000 * 60 * 60 * 24 * 8) {
                    stamp = new Date(time);
                    arr[0][0] = that.digit(stamp.getFullYear(), 4);
                    arr[0][1] = that.digit(stamp.getMonth() + 1);
                    arr[0][2] = that.digit(stamp.getDate());

                    //是否输出时间
                    if (!onlyDate) {
                        arr[1][0] = that.digit(stamp.getHours());
                        arr[1][1] = that.digit(stamp.getMinutes());
                        arr[1][2] = that.digit(stamp.getSeconds());
                    }
                    return arr[0].join('-') + ' ' + arr[1].join(':');
                }

                //30天以内，返回“多久前”
                if (stamp >= 1000 * 60 * 60 * 24) {
                    return ((stamp / 1000 / 60 / 60 / 24) | 0) + '天前';
                } else if (stamp >= 1000 * 60 * 60) {
                    return ((stamp / 1000 / 60 / 60) | 0) + '小时前';
                } else if (stamp >= 1000 * 60 * 2) { //2分钟以内为：刚刚
                    return ((stamp / 1000 / 60) | 0) + '分钟前';
                } else if (stamp < 0) {
                    return '未来';
                } else {
                    return '刚刚';
                }
            },

            //数字前置补零
            digit: function (num, length) {
                var str = '';
                num = String(num);
                length = length || 2;
                for (var i = num.length; i < length; i++) {
                    str += '0';
                }
                return num < Math.pow(10, length) ? str + (num | 0) : num;
            },

            //转化为日期格式字符
            toDateString: function (time, format) {
                var that = this,
                    date = new Date(time || new Date()),
                    ymd = [
                        that.digit(date.getFullYear(), 4), that.digit(date.getMonth() + 1), that.digit(date.getDate())
                    ],
                    hms = [
                        that.digit(date.getHours()), that.digit(date.getMinutes()), that.digit(date.getSeconds())
                    ];

                format = format || 'yyyy-MM-dd HH:mm:ss';

                return format.replace(/yyyy/g, ymd[0])
                    .replace(/MM/g, ymd[1])
                    .replace(/dd/g, ymd[2])
                    .replace(/HH/g, hms[0])
                    .replace(/mm/g, hms[1])
                    .replace(/ss/g, hms[2]);
            },

            //防 xss 攻击
            escape: function (html) {
                return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
                    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    .replace(/'/g, '&#39;').replace(/"/g, '&quot;');
            },
            formatSize: function (value) {
                if (null == value || value == '') {
                    return "0 Bytes";
                }
                var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
                var index = 0,
                    srcsize = parseFloat(value);
                index = Math.floor(Math.log(srcsize) / Math.log(1024));
                var size = srcsize / Math.pow(1024, index);
                //  保留的小数位数
                size = size.toFixed(2);
                return size + unitArr[index];
            },
            getExtension: function (filepath) {
                var _extidx = filepath.lastIndexOf('.');
                if (_extidx < 0) {
                    return ''
                }
                return filepath.substr(_extidx + 1, filepath.length)
            },
            toRmb: function (a) {
                var b = 9.999999999999E10,
                    f = "\u96f6",
                    h = "\u58f9",
                    g = "\u8d30",
                    e = "\u53c1",
                    k = "\u8086",
                    p = "\u4f0d",
                    q = "\u9646",
                    r = "\u67d2",
                    s = "\u634c",
                    t = "\u7396",
                    l = "\u62fe",
                    d = "\u4f70",
                    i = "\u4edf",
                    m = "\u4e07",
                    j = "\u4ebf",
                    u = "人民币",
                    o = "\u5143",
                    c = "\u89d2",
                    n = "\u5206",
                    v = "\u6574";
                a = a.toString();
                if (a == "") {
                    alert("转换内容不能为空!");
                    return "";
                }
                if (a.match(/[^,.\d]/) != null) {
                    alert("输入有误,请输入小数点和纯数字!");
                    return "";
                }
                if (a.match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
                    alert("输入有误,请输入小数点和纯数字!");
                    return "";
                }
                a = a.replace(/,/g, "");
                a = a.replace(/^0+/, "");
                if (Number(a) > b) {
                    alert("\u5bf9\u4e0d\u8d77,\u4f60\u8f93\u5165\u7684\u6570\u5b57\u592a\u5927\u4e86!\u6700\u5927\u6570\u5b57\u4e3a99999999999.99\uff01");
                    return "";
                }
                b = a.split(".");
                if (b.length > 1) {
                    a = b[0];
                    b = b[1];
                    b = b.substr(0, 2);
                } else {
                    a = b[0];
                    b = "";
                }
                h = new Array(f, h, g, e, k, p, q, r, s, t);
                l = new Array("", l, d, i);
                m = new Array("", m, j);
                n = new Array(c, n);
                c = "";
                if (Number(a) > 0) {
                    for (d = j = 0; d < a.length; d++) {
                        e = a.length - d - 1;
                        i = a.substr(d, 1);
                        g = e / 4;
                        e = e % 4;
                        if (i == "0") j++;
                        else {
                            if (j > 0) c += h[0];
                            j = 0;
                            c += h[Number(i)] + l[e];
                        }
                        if (e == 0 && j < 4) c += m[g];
                    }
                    c += o;
                }
                if (b != "")
                    for (d = 0; d < b.length; d++) {
                        i = b.substr(d, 1);
                        if (i != "0") c += h[Number(i)] + n[d];
                    }
                if (c == "") c = f + o;
                if (b.length < 2) c += v;
                return c;
            }
        }

    //暴露接口
    exports('util', util);
});

/**

 @Name : layui.laytpl 模板引擎
 @Author：贤心
 @License：MIT

 */

layui.define(function (exports) {

    "use strict";

    var config = {
        open: '{{',
        close: '}}'
    };

    var tool = {
        exp: function (str) {
            return new RegExp(str, 'g');
        },
        //匹配满足规则内容
        query: function (type, _, __) {
            var types = [
                '#([\\s\\S])+?', //js语句
                '([^{#}])*?' //普通字段
            ][type || 0];
            return exp((_ || '') + config.open + types + config.close + (__ || ''));
        },
        escape: function (html) {
            return String(html || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
        },
        error: function (e, tplog) {
            var error = 'Laytpl Error：';
            typeof console === 'object' && console.error(error + e + '\n' + (tplog || ''));
            return error + e;
        }
    };

    var exp = tool.exp,
        Tpl = function (tpl) {
            this.tpl = tpl;
        };

    Tpl.pt = Tpl.prototype;

    window.errors = 0;

    //编译模版
    Tpl.pt.parse = function (tpl, data) {
        var that = this,
            tplog = tpl;
        var jss = exp('^' + config.open + '#', ''),
            jsse = exp(config.close + '$', '');

        tpl = tpl.replace(/\s+|\r|\t|\n/g, ' ')
            .replace(exp(config.open + '#'), config.open + '# ')
            .replace(exp(config.close + '}'), '} ' + config.close).replace(/\\/g, '\\\\')

            //不匹配指定区域的内容
            .replace(exp(config.open + '!(.+?)!' + config.close), function (str) {
                str = str.replace(exp('^' + config.open + '!'), '')
                    .replace(exp('!' + config.close), '')
                    .replace(exp(config.open + '|' + config.close), function (tag) {
                        return tag.replace(/(.)/g, '\\$1')
                    });
                return str
            })

            //匹配JS规则内容
            .replace(/(?="|')/g, '\\').replace(tool.query(), function (str) {
                str = str.replace(jss, '').replace(jsse, '');
                return '";' + str.replace(/\\/g, '') + ';view+="';
            })

            //匹配普通字段
            .replace(tool.query(1), function (str) {
                var start = '"+(';
                if (str.replace(/\s/g, '') === config.open + config.close) {
                    return '';
                }
                str = str.replace(exp(config.open + '|' + config.close), '');
                if (/^=/.test(str)) {
                    str = str.replace(/^=/, '');
                    start = '"+_escape_(';
                }
                return start + str.replace(/\\/g, '') + ')+"';
            });

        tpl = '"use strict";var view = "' + tpl + '";return view;';

        try {
            that.cache = tpl = new Function('d, _escape_', tpl);
            return tpl(data, tool.escape);
        } catch (e) {
            delete that.cache;
            return tool.error(e, tplog);
        }
    };

    Tpl.pt.render = function (data, callback) {
        var that = this,
            tpl;
        if (!data) return tool.error('no data');
        tpl = that.cache ? that.cache(data, tool.escape) : that.parse(that.tpl, data);
        if (!callback) return tpl;
        callback(tpl);
    };

    var laytpl = function (tpl) {
        if (typeof tpl !== 'string') return tool.error('Template not found');
        return new Tpl(tpl);
    };

    laytpl.config = function (options) {
        options = options || {};
        for (var i in options) {
            config[i] = options[i];
        }
    };

    laytpl.v = '1.2.0';

    exports('laytpl', laytpl);

});


/**
 * @license
 * Lodash (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash core -o ./dist/lodash.core.js`
 */
;(function(){function n(n){return H(n)&&pn.call(n,"callee")&&!yn.call(n,"callee")}function t(n,t){return n.push.apply(n,t),n}function r(n){return function(t){return null==t?Z:t[n]}}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return j(t,function(t){return n[t]})}function o(n){return n instanceof i?n:new i(n)}function i(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function c(n,t,r){if(typeof n!="function")throw new TypeError("Expected a function");
return setTimeout(function(){n.apply(Z,r)},t)}function f(n,t){var r=true;return mn(n,function(n,e,u){return r=!!t(n,e,u)}),r}function a(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===Z?i===i:r(i,c)))var c=i,f=o}return f}function l(n,t){var r=[];return mn(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function p(n,r,e,u,o){var i=-1,c=n.length;for(e||(e=R),o||(o=[]);++i<c;){var f=n[i];0<r&&e(f)?1<r?p(f,r-1,e,u,o):t(o,f):u||(o[o.length]=f)}return o}function s(n,t){return n&&On(n,t,Dn);
}function h(n,t){return l(t,function(t){return U(n[t])})}function v(n,t){return n>t}function b(n,t,r,e,u){return n===t||(null==n||null==t||!H(n)&&!H(t)?n!==n&&t!==t:y(n,t,r,e,b,u))}function y(n,t,r,e,u,o){var i=Nn(n),c=Nn(t),f=i?"[object Array]":hn.call(n),a=c?"[object Array]":hn.call(t),f="[object Arguments]"==f?"[object Object]":f,a="[object Arguments]"==a?"[object Object]":a,l="[object Object]"==f,c="[object Object]"==a,a=f==a;o||(o=[]);var p=An(o,function(t){return t[0]==n}),s=An(o,function(n){
return n[0]==t});if(p&&s)return p[1]==t;if(o.push([n,t]),o.push([t,n]),a&&!l){if(i)r=T(n,t,r,e,u,o);else n:{switch(f){case"[object Boolean]":case"[object Date]":case"[object Number]":r=J(+n,+t);break n;case"[object Error]":r=n.name==t.name&&n.message==t.message;break n;case"[object RegExp]":case"[object String]":r=n==t+"";break n}r=false}return o.pop(),r}return 1&r||(i=l&&pn.call(n,"__wrapped__"),f=c&&pn.call(t,"__wrapped__"),!i&&!f)?!!a&&(r=B(n,t,r,e,u,o),o.pop(),r):(i=i?n.value():n,f=f?t.value():t,
r=u(i,f,r,e,o),o.pop(),r)}function g(n){return typeof n=="function"?n:null==n?X:(typeof n=="object"?d:r)(n)}function _(n,t){return n<t}function j(n,t){var r=-1,e=M(n)?Array(n.length):[];return mn(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function d(n){var t=_n(n);return function(r){var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&b(n[u],r[u],3)))return false}return true}}function m(n,t){return n=Object(n),C(t,function(t,r){return r in n&&(t[r]=n[r]),t},{})}function O(n){return xn(I(n,void 0,X),n+"");
}function x(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function A(n){return x(n,0,n.length)}function E(n,t){var r;return mn(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function w(n,r){return C(r,function(n,r){return r.func.apply(r.thisArg,t([n],r.args))},n)}function k(n,t,r){var e=!r;r||(r={});for(var u=-1,o=t.length;++u<o;){var i=t[u],c=Z;if(c===Z&&(c=n[i]),e)r[i]=c;else{var f=r,a=f[i];pn.call(f,i)&&J(a,c)&&(c!==Z||i in f)||(f[i]=c);
}}return r}function N(n){return O(function(t,r){var e=-1,u=r.length,o=1<u?r[u-1]:Z,o=3<n.length&&typeof o=="function"?(u--,o):Z;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function F(n){return function(){var t=arguments,r=dn(n.prototype),t=n.apply(r,t);return V(t)?t:r}}function S(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==on&&this instanceof e?u:n;++c<f;)a[c]=r[c];for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");
var u=F(n);return e}function T(n,t,r,e,u,o){var i=n.length,c=t.length;if(i!=c&&!(1&r&&c>i))return false;for(var c=-1,f=true,a=2&r?[]:Z;++c<i;){var l=n[c],p=t[c];if(void 0!==Z){f=false;break}if(a){if(!E(t,function(n,t){if(!P(a,t)&&(l===n||u(l,n,r,e,o)))return a.push(t)})){f=false;break}}else if(l!==p&&!u(l,p,r,e,o)){f=false;break}}return f}function B(n,t,r,e,u,o){var i=1&r,c=Dn(n),f=c.length,a=Dn(t).length;if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:pn.call(t,p)))return false}for(a=true;++l<f;){var p=c[l],s=n[p],h=t[p];
if(void 0!==Z||s!==h&&!u(s,h,r,e,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function R(t){return Nn(t)||n(t)}function D(n){var t=[];if(null!=n)for(var r in Object(n))t.push(r);return t}function I(n,t,r){return t=jn(t===Z?n.length-1:t,0),function(){for(var e=arguments,u=-1,o=jn(e.length-t,0),i=Array(o);++u<o;)i[u]=e[t+u];for(u=-1,
o=Array(t+1);++u<t;)o[u]=e[u];return o[t]=r(i),n.apply(this,o)}}function $(n){return(null==n?0:n.length)?p(n,1):[]}function q(n){return n&&n.length?n[0]:Z}function P(n,t,r){var e=null==n?0:n.length;r=typeof r=="number"?0>r?jn(e+r,0):r:0,r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1}function z(n,t){return mn(n,g(t))}function C(n,t,r){return e(n,g(t),r,3>arguments.length,mn)}function G(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Fn(n),
function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=Z),r}}function J(n,t){return n===t||n!==n&&t!==t}function M(n){var t;return(t=null!=n)&&(t=n.length,t=typeof t=="number"&&-1<t&&0==t%1&&9007199254740991>=t),t&&!U(n)}function U(n){return!!V(n)&&(n=hn.call(n),"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n)}function V(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function H(n){return null!=n&&typeof n=="object"}function K(n){
return typeof n=="number"||H(n)&&"[object Number]"==hn.call(n)}function L(n){return typeof n=="string"||!Nn(n)&&H(n)&&"[object String]"==hn.call(n)}function Q(n){return typeof n=="string"?n:null==n?"":n+""}function W(n){return null==n?[]:u(n,Dn(n))}function X(n){return n}function Y(n,r,e){var u=Dn(r),o=h(r,u);null!=e||V(r)&&(o.length||!u.length)||(e=r,r=n,n=this,o=h(r,Dn(r)));var i=!(V(e)&&"chain"in e&&!e.chain),c=U(n);return mn(o,function(e){var u=r[e];n[e]=u,c&&(n.prototype[e]=function(){var r=this.__chain__;
if(i||r){var e=n(this.__wrapped__);return(e.__actions__=A(this.__actions__)).push({func:u,args:arguments,thisArg:n}),e.__chain__=r,e}return u.apply(n,t([this.value()],arguments))})}),n}var Z,nn=1/0,tn=/[&<>"']/g,rn=RegExp(tn.source),en=/^(?:0|[1-9]\d*)$/,un=typeof self=="object"&&self&&self.Object===Object&&self,on=typeof global=="object"&&global&&global.Object===Object&&global||un||Function("return this")(),cn=(un=typeof exports=="object"&&exports&&!exports.nodeType&&exports)&&typeof module=="object"&&module&&!module.nodeType&&module,fn=function(n){
return function(t){return null==n?Z:n[t]}}({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}),an=Array.prototype,ln=Object.prototype,pn=ln.hasOwnProperty,sn=0,hn=ln.toString,vn=on._,bn=Object.create,yn=ln.propertyIsEnumerable,gn=on.isFinite,_n=function(n,t){return function(r){return n(t(r))}}(Object.keys,Object),jn=Math.max,dn=function(){function n(){}return function(t){return V(t)?bn?bn(t):(n.prototype=t,t=new n,n.prototype=Z,t):{}}}();i.prototype=dn(o.prototype),i.prototype.constructor=i;
var mn=function(n,t){return function(r,e){if(null==r)return r;if(!M(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(s),On=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}(),xn=X,An=function(n){return function(t,r,e){var u=Object(t);if(!M(t)){var o=g(r);t=Dn(t),r=function(n){return o(u[n],n,u)}}return r=n(t,r,e),-1<r?u[o?t[r]:r]:Z}}(function(n,t,r){var e=null==n?0:n.length;
if(!e)return-1;r=null==r?0:Fn(r),0>r&&(r=jn(e+r,0));n:{for(t=g(t),e=n.length,r+=-1;++r<e;)if(t(n[r],r,n)){n=r;break n}n=-1}return n}),En=O(function(n,t,r){return S(n,t,r)}),wn=O(function(n,t){return c(n,1,t)}),kn=O(function(n,t,r){return c(n,Sn(t)||0,r)}),Nn=Array.isArray,Fn=Number,Sn=Number,Tn=N(function(n,t){k(t,_n(t),n)}),Bn=N(function(n,t){k(t,D(t),n)}),Rn=O(function(n,t){n=Object(n);var r,e=-1,u=t.length,o=2<u?t[2]:Z;if(r=o){r=t[0];var i=t[1];if(V(o)){var c=typeof i;if("number"==c){if(c=M(o))var c=o.length,f=typeof i,c=null==c?9007199254740991:c,c=!!c&&("number"==f||"symbol"!=f&&en.test(i))&&-1<i&&0==i%1&&i<c;
}else c="string"==c&&i in o;r=!!c&&J(o[i],r)}else r=false}for(r&&(u=1);++e<u;)for(o=t[e],r=In(o),i=-1,c=r.length;++i<c;){var f=r[i],a=n[f];(a===Z||J(a,ln[f])&&!pn.call(n,f))&&(n[f]=o[f])}return n}),Dn=_n,In=D,$n=function(n){return xn(I(n,Z,$),n+"")}(function(n,t){return null==n?{}:m(n,t)});o.assignIn=Bn,o.before=G,o.bind=En,o.chain=function(n){return n=o(n),n.__chain__=true,n},o.compact=function(n){return l(n,Boolean)},o.concat=function(){var n=arguments.length;if(!n)return[];for(var r=Array(n-1),e=arguments[0];n--;)r[n-1]=arguments[n];
return t(Nn(e)?A(e):[e],p(r,1))},o.create=function(n,t){var r=dn(n);return null==t?r:Tn(r,t)},o.defaults=Rn,o.defer=wn,o.delay=kn,o.filter=function(n,t){return l(n,g(t))},o.flatten=$,o.flattenDeep=function(n){return(null==n?0:n.length)?p(n,nn):[]},o.iteratee=g,o.keys=Dn,o.map=function(n,t){return j(n,g(t))},o.matches=function(n){return d(Tn({},n))},o.mixin=Y,o.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");return function(){return!n.apply(this,arguments)}},o.once=function(n){
return G(2,n)},o.pick=$n,o.slice=function(n,t,r){var e=null==n?0:n.length;return r=r===Z?e:+r,e?x(n,null==t?0:+t,r):[]},o.sortBy=function(n,t){var e=0;return t=g(t),j(j(n,function(n,r,u){return{value:n,index:e++,criteria:t(n,r,u)}}).sort(function(n,t){var r;n:{r=n.criteria;var e=t.criteria;if(r!==e){var u=r!==Z,o=null===r,i=r===r,c=e!==Z,f=null===e,a=e===e;if(!f&&r>e||o&&c&&a||!u&&a||!i){r=1;break n}if(!o&&r<e||f&&u&&i||!c&&i||!a){r=-1;break n}}r=0}return r||n.index-t.index}),r("value"))},o.tap=function(n,t){
return t(n),n},o.thru=function(n,t){return t(n)},o.toArray=function(n){return M(n)?n.length?A(n):[]:W(n)},o.values=W,o.extend=Bn,Y(o,o),o.clone=function(n){return V(n)?Nn(n)?A(n):k(n,_n(n)):n},o.escape=function(n){return(n=Q(n))&&rn.test(n)?n.replace(tn,fn):n},o.every=function(n,t,r){return t=r?Z:t,f(n,g(t))},o.find=An,o.forEach=z,o.has=function(n,t){return null!=n&&pn.call(n,t)},o.head=q,o.identity=X,o.indexOf=P,o.isArguments=n,o.isArray=Nn,o.isBoolean=function(n){return true===n||false===n||H(n)&&"[object Boolean]"==hn.call(n);
},o.isDate=function(n){return H(n)&&"[object Date]"==hn.call(n)},o.isEmpty=function(t){return M(t)&&(Nn(t)||L(t)||U(t.splice)||n(t))?!t.length:!_n(t).length},o.isEqual=function(n,t){return b(n,t)},o.isFinite=function(n){return typeof n=="number"&&gn(n)},o.isFunction=U,o.isNaN=function(n){return K(n)&&n!=+n},o.isNull=function(n){return null===n},o.isNumber=K,o.isObject=V,o.isRegExp=function(n){return H(n)&&"[object RegExp]"==hn.call(n)},o.isString=L,o.isUndefined=function(n){return n===Z},o.last=function(n){
var t=null==n?0:n.length;return t?n[t-1]:Z},o.max=function(n){return n&&n.length?a(n,X,v):Z},o.min=function(n){return n&&n.length?a(n,X,_):Z},o.noConflict=function(){return on._===this&&(on._=vn),this},o.noop=function(){},o.reduce=C,o.result=function(n,t,r){return t=null==n?Z:n[t],t===Z&&(t=r),U(t)?t.call(n):t},o.size=function(n){return null==n?0:(n=M(n)?n:_n(n),n.length)},o.some=function(n,t,r){return t=r?Z:t,E(n,g(t))},o.uniqueId=function(n){var t=++sn;return Q(n)+t},o.each=z,o.first=q,Y(o,function(){
var n={};return s(o,function(t,r){pn.call(o.prototype,r)||(n[r]=t)}),n}(),{chain:false}),o.VERSION="4.17.15",mn("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?String.prototype:an)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);o.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(Nn(u)?u:[],n)}return this[r](function(r){return t.apply(Nn(r)?r:[],n);
})}}),o.prototype.toJSON=o.prototype.valueOf=o.prototype.value=function(){return w(this.__wrapped__,this.__actions__)},typeof define=="function"&&typeof define.amd=="object"&&define.amd?(on._=o, define(function(){return o})):cn?((cn.exports=o)._=o,un._=o):on._=o}).call(this);
