/**

 @Name : layDate 5.0.9 日期时间控件
 @Site：http://www.layui.com/laydate/

 */

;
! function () {
    "use strict";

    var isLayui = window.layui && layui.define,
        ready = {
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

                //获取节点的style属性值
            getStyle: function (node, name) {
                    var style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
                    return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
                },

                //载入CSS配件
            link: function (href, fn, cssname) {

                //未设置路径，则不主动加载css
                if (!laydate.path) return;

                var head = document.getElementsByTagName("head")[0],
                    link = document.createElement('link');
                if (typeof fn === 'string') cssname = fn;
                var app = (cssname || href).replace(/\.|\//g, '');
                var id = 'layuicss-' + app,
                    timeout = 0;

                link.rel = 'stylesheet';
                link.href = laydate.path + href;
                link.id = id;

                if (!document.getElementById(id)) {
                    head.appendChild(link);
                }

                if (typeof fn !== 'function') return;

                //轮询css是否加载完毕
                (function poll() {
                    if (++timeout > 8 * 1000 / 100) {
                        return window.console && console.error('laydate.css: Invalid');
                    };
                    parseInt(ready.getStyle(document.getElementById(id), 'width')) === 1989 ? fn() : setTimeout(poll, 100);
                }());
            }
        }

        ,
        laydate = {
            v: '5.0.9',
            config: {}, //全局配置项
            index: (window.laydate && window.laydate.v) ? 100000 : 0,
            path: ready.getPath,

            //设置全局项
            set: function (options) {
                var that = this;
                that.config = lay.extend({}, that.config, options);
                return that;
            },

            //主体CSS等待事件
            ready: function (fn) {
                var cssname = 'laydate',
                    ver = '',
                    path = 'packages/laydate/laydate.css?v=' + laydate.v + ver;


                // layui.link(layui.cache.base + path, fn, cssname)
                // isLayui ? layui.addcss(path, fn, cssname) : ready.link(path, fn, cssname);
                return this;
            }
        },

        //操作当前实例
        thisDate = function () {
            var that = this;
            return {
                //提示框
                hint: function (content) {
                    that.hint.call(that, content);
                },
                config: that.config
            };
        },

        //字符常量
        MOD_NAME = 'laydate',
        ELEM = '.layui-laydate',
        THIS = 'layui-this',
        SHOW = 'layui-show',
        HIDE = 'layui-hide',
        DISABLED = 'laydate-disabled',
        TIPS_OUT = '开始日期超出了结束日期<br>建议重新选择',
        LIMIT_YEAR = [100, 200000],
        ELEM_STATIC = 'layui-laydate-static',
        ELEM_LIST = 'layui-laydate-list',
        ELEM_SELECTED = 'laydate-selected',
        ELEM_HINT = 'layui-laydate-hint',
        ELEM_PREV = 'fa-prev',
        ELEM_NEXT = 'fa-next',
        ELEM_FOOTER = 'layui-laydate-footer',
        ELEM_CONFIRM = '.laydate-btns-confirm',
        ELEM_TIME_TEXT = 'laydate-time-text',
        ELEM_TIME_BTN = '.laydate-btns-time',

        //组件构造器
        Class = function (options) {
            var that = this;
            that.index = ++laydate.index;
            that.config = lay.extend({}, that.config, laydate.config, options);
            that.init();
            // laydate.ready(function () {

            // });
        },

        //DOM查找
        lay = function (selector) {
            return new LAY(selector);
        },

        //DOM构造器
        LAY = function (selector) {
            var index = 0,
                nativeDOM = typeof selector === 'object' ? [selector] : (
                    this.selector = selector, document.querySelectorAll(selector || null)
                );
            for (; index < nativeDOM.length; index++) {
                this.push(nativeDOM[index]);
            }
        };


    /*
      lay对象操作
    */

    LAY.prototype = [];
    LAY.prototype.constructor = LAY;

    //普通对象深度扩展
    lay.extend = function () {
        var ai = 1,
            args = arguments,
            clone = function (target, obj) {
                target = target || (obj.constructor === Array ? [] : {});
                for (var i in obj) {
                    //如果值为对象，则进入递归，继续深度合并
                    target[i] = (obj[i] && (obj[i].constructor === Object)) ?
                        clone(target[i], obj[i]) :
                        obj[i];
                }
                return target;
            }

        args[0] = typeof args[0] === 'object' ? args[0] : {};

        for (; ai < args.length; ai++) {
            if (typeof args[ai] === 'object') {
                clone(args[0], args[ai])
            }
        }
        return args[0];
    };

    //ie版本
    lay.ie = function () {
        var agent = navigator.userAgent.toLowerCase();
        return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
            (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
        ) : false;
    }();

    //中止冒泡
    lay.stope = function (e) {
        e = e || window.event;
        e.stopPropagation ?
            e.stopPropagation() :
            e.cancelBubble = true;
    };

    //对象遍历
    lay.each = function (obj, fn) {
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

    //数字前置补零
    lay.digit = function (num, length, end) {
        var str = '';
        num = String(num);
        length = length || 2;
        for (var i = num.length; i < length; i++) {
            str += '0';
        }
        return num < Math.pow(10, length) ? str + (num | 0) : num;
    };

    //创建元素
    lay.elem = function (elemName, attr) {
        var elem = document.createElement(elemName);
        lay.each(attr || {}, function (key, value) {
            elem.setAttribute(key, value);
        });
        return elem;
    };

    //追加字符
    LAY.addStr = function (str, new_str) {
        str = str.replace(/\s+/, ' ');
        new_str = new_str.replace(/\s+/, ' ').split(' ');
        lay.each(new_str, function (ii, item) {
            if (!new RegExp('\\b' + item + '\\b').test(str)) {
                str = str + ' ' + item;
            }
        });
        return str.replace(/^\s|\s$/, '');
    };

    //移除值
    LAY.removeStr = function (str, new_str) {
        str = str.replace(/\s+/, ' ');
        new_str = new_str.replace(/\s+/, ' ').split(' ');
        lay.each(new_str, function (ii, item) {
            var exp = new RegExp('\\b' + item + '\\b')
            if (exp.test(str)) {
                str = str.replace(exp, '');
            }
        });
        return str.replace(/\s+/, ' ').replace(/^\s|\s$/, '');
    };

    //查找子元素
    LAY.prototype.find = function (selector) {
        var that = this;
        var index = 0,
            arr = [],
            isObject = typeof selector === 'object';

        this.each(function (i, item) {
            var nativeDOM = isObject ? [selector] : item.querySelectorAll(selector || null);
            for (; index < nativeDOM.length; index++) {
                arr.push(nativeDOM[index]);
            }
            that.shift();
        });

        if (!isObject) {
            that.selector = (that.selector ? that.selector + ' ' : '') + selector
        }

        lay.each(arr, function (i, item) {
            that.push(item);
        });

        return that;
    };

    //DOM遍历
    LAY.prototype.each = function (fn) {
        return lay.each.call(this, this, fn);
    };

    //添加css类
    LAY.prototype.addClass = function (className, type) {
        return this.each(function (index, item) {
            item.className = LAY[type ? 'removeStr' : 'addStr'](item.className, className)
        });
    };

    //移除css类
    LAY.prototype.removeClass = function (className) {
        return this.addClass(className, true);
    };

    //是否包含css类
    LAY.prototype.hasClass = function (className) {
        var has = false;
        this.each(function (index, item) {
            if (new RegExp('\\b' + className + '\\b').test(item.className)) {
                has = true;
            }
        });
        return has;
    };

    //添加或获取属性
    LAY.prototype.attr = function (key, value) {
        var that = this;
        return value === undefined ? function () {
            if (that.length > 0) return that[0].getAttribute(key);
        }() : that.each(function (index, item) {
            item.setAttribute(key, value);
        });
    };

    //移除属性
    LAY.prototype.removeAttr = function (key) {
        return this.each(function (index, item) {
            item.removeAttribute(key);
        });
    };

    //设置HTML内容
    LAY.prototype.html = function (html) {
        return this.each(function (index, item) {
            item.innerHTML = html;
        });
    };

    //设置值
    LAY.prototype.val = function (value) {
        return this.each(function (index, item) {
            item.value = value;
        });
    };

    //追加内容
    LAY.prototype.append = function (elem) {
        return this.each(function (index, item) {
            typeof elem === 'object' ?
                item.appendChild(elem) :
                item.innerHTML = item.innerHTML + elem;
        });
    };

    //移除内容
    LAY.prototype.remove = function (elem) {
        return this.each(function (index, item) {
            elem ? item.removeChild(elem) : item.parentNode.removeChild(item);
        });
    };

    //事件绑定
    LAY.prototype.on = function (eventName, fn) {
        return this.each(function (index, item) {
            item.attachEvent ? item.attachEvent('on' + eventName, function (e) {
                e.target = e.srcElement;
                fn.call(item, e);
            }) : item.addEventListener(eventName, fn, false);
        });
    };

    //解除事件
    LAY.prototype.off = function (eventName, fn) {
        return this.each(function (index, item) {
            item.detachEvent ?
                item.detachEvent('on' + eventName, fn) :
                item.removeEventListener(eventName, fn, false);
        });
    };


    /*
      组件操作
    */


    //是否闰年
    Class.isLeapYear = function (year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    //默认配置
    Class.prototype.config = {
        type: 'date' //控件类型，支持：year/month/date/time/datetime
            ,
        range: false //是否开启范围选择，即双控件
            ,
        format: 'yyyy-MM-dd' //默认日期格式
            ,
        value: null //默认日期，支持传入new Date()，或者符合format参数设定的日期格式字符
            ,
        isInitValue: true //用于控制是否自动向元素填充初始值（需配合 value 参数使用）
            ,
        min: '1900-1-1' //有效最小日期，年月日必须用“-”分割，时分秒必须用“:”分割。注意：它并不是遵循 format 设定的格式。
            ,
        max: '2099-12-31' //有效最大日期，同上
            ,
        trigger: 'focus' //呼出控件的事件
            ,
        show: false //是否直接显示，如果设置true，则默认直接显示控件
            ,
        showBottom: true //是否显示底部栏
            ,
        btns: ['clear', 'now', 'confirm'] //右下角显示的按钮，会按照数组顺序排列
            ,
        lang: 'cn' //语言，只支持cn/en，即中文和英文
            ,
        theme: 'default' //主题
            ,
        position: null //控件定位方式定位, 默认absolute，支持：fixed/absolute/static
            ,
        calendar: false //是否开启公历重要节日，仅支持中文版
            ,
        mark: {} //日期备注，如重要事件或活动标记
        ,
        zIndex: null //控件层叠顺序
            ,
        done: null //控件选择完毕后的回调，点击清空/现在/确定也均会触发
            ,
        change: null //日期时间改变后的回调
    };

    //多语言
    Class.prototype.lang = function () {
        var that = this,
            options = that.config,
            text = {
                cn: {
                    weeks: ['日', '一', '二', '三', '四', '五', '六'],
                    time: ['时', '分', '秒'],
                    timeTips: '选择时间',
                    startTime: '开始时间',
                    endTime: '结束时间',
                    dateTips: '返回日期',
                    month: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
                    tools: {
                        confirm: '确定',
                        clear: '清空',
                        now: '现在'
                    }
                },
                en: {
                    weeks: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    time: ['Hours', 'Minutes', 'Seconds'],
                    timeTips: 'Select Time',
                    startTime: 'Start Time',
                    endTime: 'End Time',
                    dateTips: 'Select Date',
                    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    tools: {
                        confirm: 'Confirm',
                        clear: 'Clear',
                        now: 'Now'
                    }
                }
            };
        return text[options.lang] || text['cn'];
    };

    //初始准备
    Class.prototype.init = function () {
        var that = this,
            options = that.config,
            dateType = 'yyyy|y|MM|M|dd|d|HH|H|mm|m|ss|s',
            isStatic = options.position === 'static',
            format = {
                year: 'yyyy',
                month: 'yyyy-MM',
                date: 'yyyy-MM-dd',
                time: 'HH:mm:ss',
                datetime: 'yyyy-MM-dd HH:mm:ss'
            };

        options.elem = lay(options.elem);
        options.eventElem = lay(options.eventElem);

        if (!options.elem[0]) return;

        //日期范围分隔符
        if (options.range === true) options.range = '-';

        //根据不同type，初始化默认format
        if (options.format === format.date) {
            options.format = format[options.type];
        }

        //将日期格式转化成数组
        that.format = options.format.match(new RegExp(dateType + '|.', 'g')) || [];


        //生成正则表达式
        that.EXP_IF = '';
        that.EXP_SPLIT = '';
        lay.each(that.format, function (i, item) {
            var EXP = new RegExp(dateType).test(item) ?
                '\\d{' + function () {
                    if (new RegExp(dateType).test(that.format[i === 0 ? i + 1 : i - 1] || '')) {
                        if (/^yyyy|y$/.test(item)) return 4;
                        return item.length;
                    }
                    if (/^yyyy$/.test(item)) return '1,4';
                    if (/^y$/.test(item)) return '1,308';
                    return '1,2';
                }() + '}' :
                '\\' + item;
            that.EXP_IF = that.EXP_IF + EXP;
            that.EXP_SPLIT = that.EXP_SPLIT + '(' + EXP + ')';
        });
        that.EXP_IF = new RegExp('^' + (
            options.range ?
            that.EXP_IF + '\\s\\' + options.range + '\\s' + that.EXP_IF :
            that.EXP_IF
        ) + '$');
        that.EXP_SPLIT = new RegExp('^' + that.EXP_SPLIT + '$', '');

        //如果不是input|textarea元素，则默认采用click事件
        if (!that.isInput(options.elem[0])) {
            if (options.trigger === 'focus') {
                options.trigger = 'click';
            }
        }

        //设置唯一KEY
        if (!options.elem.attr('lay-key')) {
            options.elem.attr('lay-key', that.index);
            options.eventElem.attr('lay-key', that.index);
        }

        //记录重要日期
        options.mark = lay.extend({}, (options.calendar && options.lang === 'cn') ? {
            '0-1-1': '元旦',
            '0-2-14': '情人',
            '0-3-8': '妇女',
            '0-3-12': '植树',
            '0-4-1': '愚人',
            '0-5-1': '劳动',
            '0-5-4': '青年',
            '0-6-1': '儿童',
            '0-9-10': '教师',
            '0-9-18': '国耻',
            '0-10-1': '国庆',
            '0-12-25': '圣诞'
        } : {}, options.mark);

        //获取限制内日期
        lay.each(['min', 'max'], function (i, item) {
            var ymd = [],
                hms = [];
            if (typeof options[item] === 'number') { //如果为数字
                var day = options[item],
                    time = new Date().getTime(),
                    STAMP = 86400000 //代表一天的时间戳
                    ,
                    thisDate = new Date(
                        day ? (
                            day < STAMP ? time + day * STAMP : day //如果数字小于一天的时间戳，则数字为天数，否则为时间戳
                        ) : time
                    );
                ymd = [thisDate.getFullYear(), thisDate.getMonth() + 1, thisDate.getDate()];
                day < STAMP || (hms = [thisDate.getHours(), thisDate.getMinutes(), thisDate.getSeconds()]);
            } else {
                ymd = (options[item].match(/\d+-\d+-\d+/) || [''])[0].split('-');
                hms = (options[item].match(/\d+:\d+:\d+/) || [''])[0].split(':');
            }
            options[item] = {
                year: ymd[0] | 0 || new Date().getFullYear(),
                month: ymd[1] ? (ymd[1] | 0) - 1 : new Date().getMonth(),
                date: ymd[2] | 0 || new Date().getDate(),
                hours: hms[0] | 0,
                minutes: hms[1] | 0,
                seconds: hms[2] | 0
            };
        });

        that.elemID = 'layui-laydate' + options.elem.attr('lay-key');

        if (options.show || isStatic) that.render();
        isStatic || that.events();

        //默认赋值
        if (options.value && options.isInitValue) {
            if (options.value.constructor === Date) {
                that.setValue(that.parse(0, that.systemDate(options.value)));
            } else {
                that.setValue(options.value);
            }
        }
    };

    //控件主体渲染
    Class.prototype.render = function () {
        var that = this,
            options = that.config,
            lang = that.lang(),
            isStatic = options.position === 'static'

            //主面板
            ,
            elem = that.elem = lay.elem('div', {
                id: that.elemID,
                'class': [
                    'layui-laydate', options.range ? ' layui-laydate-range' : '', isStatic ? (' ' + ELEM_STATIC) : '', options.theme && options.theme !== 'default' && !/^#/.test(options.theme) ? (' laydate-theme-' + options.theme) : ''
                ].join('')
            })

            //主区域
            ,
            elemMain = that.elemMain = [],
            elemHeader = that.elemHeader = [],
            elemCont = that.elemCont = [],
            elemTable = that.table = []

            //底部区域
            ,
            divFooter = that.footer = lay.elem('div', {
                'class': ELEM_FOOTER
            });

        if (options.zIndex) elem.style.zIndex = options.zIndex;

        //单双日历区域
        lay.each(new Array(2), function (i) {
            if (!options.range && i > 0) {
                return true;
            }

            //头部区域
            var divHeader = lay.elem('div', {
                    'class': 'layui-laydate-header'
                })

                //左右切换
                ,
                headerChild = [function () { //上一年
                    var elem = lay.elem('i', {
                        'class': 'fa laydate-icon fa-angle-double-left'
                    });
                    elem.innerHTML = '';
                    return elem;
                }(), function () { //上一月
                    var elem = lay.elem('i', {
                        'class': 'fa laydate-icon fa-angle-left'
                    });
                    elem.innerHTML = '';
                    return elem;
                }(), function () { //年月选择
                    var elem = lay.elem('div', {
                            'class': 'laydate-set-ym'
                        }),
                        spanY = lay.elem('span'),
                        spanM = lay.elem('span');
                    elem.appendChild(spanY);
                    elem.appendChild(spanM);
                    return elem;
                }(), function () { //下一月
                    var elem = lay.elem('i', {
                        'class': 'fa laydate-icon fa-angle-right'
                    });
                    elem.innerHTML = '';
                    return elem;
                }(), function () { //下一年
                    var elem = lay.elem('i', {
                        'class': 'fa laydate-icon fa-angle-double-right ml-3'
                    });
                    elem.innerHTML = '';
                    return elem;
                }()]

                //日历内容区域
                ,
                divContent = lay.elem('div', {
                    'class': 'layui-laydate-content'
                }),
                table = lay.elem('table'),
                thead = lay.elem('thead'),
                theadTr = lay.elem('tr');

            //生成年月选择
            lay.each(headerChild, function (i, item) {
                divHeader.appendChild(item);
            });

            //生成表格
            thead.appendChild(theadTr);
            lay.each(new Array(6), function (i) { //表体
                var tr = table.insertRow(0);
                lay.each(new Array(7), function (j) {
                    if (i === 0) {
                        var th = lay.elem('th');
                        th.innerHTML = lang.weeks[j];
                        theadTr.appendChild(th);
                    }
                    tr.insertCell(j);
                });
            });
            table.insertBefore(thead, table.children[0]); //表头
            divContent.appendChild(table);

            elemMain[i] = lay.elem('div', {
                'class': 'layui-laydate-main laydate-main-list-' + i
            });

            elemMain[i].appendChild(divHeader);
            elemMain[i].appendChild(divContent);

            elemHeader.push(headerChild);
            elemCont.push(divContent);
            elemTable.push(table);
        });

        //生成底部栏
        lay(divFooter).html(function () {
            var html = [],
                btns = [];
            if (options.type === 'datetime') {
                html.push('<span lay-type="datetime" class="laydate-btns-time">' + lang.timeTips + '</span>');
            }
            lay.each(options.btns, function (i, item) {
                var title = lang.tools[item] || 'btn';
                if (options.range && item === 'now') return;
                if (isStatic && item === 'clear') title = options.lang === 'cn' ? '重置' : 'Reset';
                btns.push('<span lay-type="' + item + '" class="laydate-btns-' + item + '">' + title + '</span>');
            });
            html.push('<div class="laydate-footer-btns">' + btns.join('') + '</div>');
            return html.join('');
        }());

        //插入到主区域
        lay.each(elemMain, function (i, main) {
            elem.appendChild(main);
        });
        options.showBottom && elem.appendChild(divFooter);

        //生成自定义主题
        if (/^#/.test(options.theme)) {
            var style = lay.elem('style'),
                styleText = [
                    '#{{id}} .layui-laydate-header{background-color:{{theme}};}', '#{{id}} .layui-this{background-color:{{theme}} !important;}'
                ].join('').replace(/{{id}}/g, that.elemID).replace(/{{theme}}/g, options.theme);

            if ('styleSheet' in style) {
                style.setAttribute('type', 'text/css');
                style.styleSheet.cssText = styleText;
            } else {
                style.innerHTML = styleText;
            }

            lay(elem).addClass('laydate-theme-molv');
            elem.appendChild(style);
        }

        //移除上一个控件
        that.remove(Class.thisElemDate);

        //如果是静态定位，则插入到指定的容器中，否则，插入到body
        isStatic ? options.elem.append(elem) : (
            document.body.appendChild(elem), that.position() //定位
        );

        that.checkDate().calendar(); //初始校验
        that.changeEvent(); //日期切换

        Class.thisElemDate = that.elemID;

        typeof options.ready === 'function' && options.ready(lay.extend({}, options.dateTime, {
            month: options.dateTime.month + 1
        }));
    };

    //控件移除
    Class.prototype.remove = function (prev) {
        var that = this,
            options = that.config,
            elem = lay('#' + (prev || that.elemID));
        if (!elem.hasClass(ELEM_STATIC)) {
            that.checkDate(function () {
                elem.remove();
            });
        }
        return that;
    };

    //定位算法
    Class.prototype.position = function () {
        var that = this,
            options = that.config,
            elem = that.bindElem || options.elem[0],
            rect = elem.getBoundingClientRect() //绑定元素的坐标
            ,
            elemWidth = that.elem.offsetWidth //控件的宽度
            ,
            elemHeight = that.elem.offsetHeight //控件的高度

            //滚动条高度
            ,
            scrollArea = function (type) {
                type = type ? 'scrollLeft' : 'scrollTop';
                return document.body[type] | document.documentElement[type];
            },
            winArea = function (type) {
                return document.documentElement[type ? 'clientWidth' : 'clientHeight']
            },
            margin = 5,
            left = rect.left,
            top = rect.bottom;

        //如果右侧超出边界
        if (left + elemWidth + margin > winArea('width')) {
            left = winArea('width') - elemWidth - margin;
        }

        //如果底部超出边界
        if (top + elemHeight + margin > winArea()) {
            top = rect.top > elemHeight //顶部是否有足够区域显示完全
                ?
                rect.top - elemHeight :
                winArea() - elemHeight;
            top = top - margin * 2;
        }

        if (options.position) {
            that.elem.style.position = options.position;
        }
        that.elem.style.left = left + (options.position === 'fixed' ? 0 : scrollArea(1)) + 'px';
        that.elem.style.top = top + (options.position === 'fixed' ? 0 : scrollArea()) + 'px';
    };

    //提示
    Class.prototype.hint = function (content) {
        var that = this,
            options = that.config,
            div = lay.elem('div', {
                'class': ELEM_HINT
            });

        if (!that.elem) return;

        div.innerHTML = content || '';
        lay(that.elem).find('.' + ELEM_HINT).remove();
        that.elem.appendChild(div);

        clearTimeout(that.hinTimer);
        that.hinTimer = setTimeout(function () {
            lay(that.elem).find('.' + ELEM_HINT).remove();
        }, 3000);
    };

    //获取递增/减后的年月
    Class.prototype.getAsYM = function (Y, M, type) {
        type ? M-- : M++;
        if (M < 0) {
            M = 11;
            Y--;
        }
        if (M > 11) {
            M = 0;
            Y++;
        }
        return [Y, M];
    };

    //系统消息
    Class.prototype.systemDate = function (newDate) {
        var thisDate = newDate || new Date();
        return {
            year: thisDate.getFullYear() //年
                ,
            month: thisDate.getMonth() //月
                ,
            date: thisDate.getDate() //日
                ,
            hours: newDate ? newDate.getHours() : 0 //时
                ,
            minutes: newDate ? newDate.getMinutes() : 0 //分
                ,
            seconds: newDate ? newDate.getSeconds() : 0 //秒
        }
    };

    //日期校验
    Class.prototype.checkDate = function (fn) {
        var that = this,
            thisDate = new Date(),
            options = that.config,
            dateTime = options.dateTime = options.dateTime || that.systemDate(),
            thisMaxDate, error

            , elem = that.bindElem || options.elem[0],
            valType = that.isInput(elem) ? 'val' : 'html',
            value = that.isInput(elem) ? elem.value : (options.position === 'static' ? '' : elem.innerHTML)

            //校验日期有效数字
            ,
            checkValid = function (dateTime) {
                if (dateTime.year > LIMIT_YEAR[1]) dateTime.year = LIMIT_YEAR[1], error = true; //不能超过20万年
                if (dateTime.month > 11) dateTime.month = 11, error = true;
                if (dateTime.hours > 23) dateTime.hours = 0, error = true;
                if (dateTime.minutes > 59) dateTime.minutes = 0, dateTime.hours++, error = true;
                if (dateTime.seconds > 59) dateTime.seconds = 0, dateTime.minutes++, error = true;

                //计算当前月的最后一天
                thisMaxDate = laydate.getEndDate(dateTime.month + 1, dateTime.year);
                if (dateTime.date > thisMaxDate) dateTime.date = thisMaxDate, error = true;
            }

            //获得初始化日期值
            ,
            initDate = function (dateTime, value, index) {
                var startEnd = ['startTime', 'endTime'];
                value = (value.match(that.EXP_SPLIT) || []).slice(1);
                index = index || 0;
                if (options.range) {
                    that[startEnd[index]] = that[startEnd[index]] || {};
                }
                lay.each(that.format, function (i, item) {
                    var thisv = parseFloat(value[i]);
                    if (value[i].length < item.length) error = true;
                    if (/yyyy|y/.test(item)) { //年
                        if (thisv < LIMIT_YEAR[0]) thisv = LIMIT_YEAR[0], error = true; //年不能低于100年
                        dateTime.year = thisv;
                    } else if (/MM|M/.test(item)) { //月
                        if (thisv < 1) thisv = 1, error = true;
                        dateTime.month = thisv - 1;
                    } else if (/dd|d/.test(item)) { //日
                        if (thisv < 1) thisv = 1, error = true;
                        dateTime.date = thisv;
                    } else if (/HH|H/.test(item)) { //时
                        if (thisv < 1) thisv = 0, error = true;
                        dateTime.hours = thisv;
                        options.range && (that[startEnd[index]].hours = thisv);
                    } else if (/mm|m/.test(item)) { //分
                        if (thisv < 1) thisv = 0, error = true;
                        dateTime.minutes = thisv;
                        options.range && (that[startEnd[index]].minutes = thisv);
                    } else if (/ss|s/.test(item)) { //秒
                        if (thisv < 1) thisv = 0, error = true;
                        dateTime.seconds = thisv;
                        options.range && (that[startEnd[index]].seconds = thisv);
                    }
                });
                checkValid(dateTime)
            };

        if (fn === 'limit') return checkValid(dateTime), that;

        value = value || options.value;
        if (typeof value === 'string') {
            value = value.replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
        }

        //如果点击了开始，单未选择结束就关闭，则重新选择开始
        if (that.startState && !that.endState) {
            delete that.startState;
            that.endState = true;
        };

        if (typeof value === 'string' && value) {
            if (that.EXP_IF.test(value)) { //校验日期格式
                if (options.range) {
                    value = value.split(' ' + options.range + ' ');
                    that.startDate = that.startDate || that.systemDate();
                    that.endDate = that.endDate || that.systemDate();
                    options.dateTime = lay.extend({}, that.startDate);
                    lay.each([that.startDate, that.endDate], function (i, item) {
                        initDate(item, value[i], i);
                    });
                } else {
                    initDate(dateTime, value)
                }
            } else {
                that.hint('日期格式不合法<br>必须遵循下述格式：<br>' + (
                    options.range ? (options.format + ' ' + options.range + ' ' + options.format) : options.format
                ) + '<br>已为你重置');
                error = true;
            }
        } else if (value && value.constructor === Date) { //如果值为日期对象时
            options.dateTime = that.systemDate(value);
        } else {
            options.dateTime = that.systemDate();
            delete that.startState;
            delete that.endState;
            delete that.startDate;
            delete that.endDate;
            delete that.startTime;
            delete that.endTime;
        }

        checkValid(dateTime);

        if (error && value) {
            that.setValue(
                options.range ? (that.endDate ? that.parse() : '') : that.parse()
            );
        }
        fn && fn();
        return that;
    };

    //公历重要日期与自定义备注
    Class.prototype.mark = function (td, YMD) {
        var that = this,
            mark, options = that.config;
        lay.each(options.mark, function (key, title) {
            var keys = key.split('-');
            if ((keys[0] == YMD[0] || keys[0] == 0) //每年的每月
                &&
                (keys[1] == YMD[1] || keys[1] == 0) //每月的每日
                &&
                keys[2] == YMD[2]) { //特定日
                mark = title || YMD[2];
            }
        });
        mark && td.html('<span class="laydate-day-mark">' + mark + '</span>');

        return that;
    };

    //无效日期范围的标记
    Class.prototype.limit = function (elem, date, index, time) {
        var that = this,
            options = that.config,
            timestrap = {},
            dateTime = options[index > 41 ? 'endDate' : 'dateTime'],
            isOut, thisDateTime = lay.extend({}, dateTime, date || {});
        lay.each({
            now: thisDateTime,
            min: options.min,
            max: options.max
        }, function (key, item) {
            timestrap[key] = that.newDate(lay.extend({
                year: item.year,
                month: item.month,
                date: item.date
            }, function () {
                var hms = {};
                lay.each(time, function (i, keys) {
                    hms[keys] = item[keys];
                });
                return hms;
            }())).getTime(); //time：是否比较时分秒
        });

        isOut = timestrap.now < timestrap.min || timestrap.now > timestrap.max;
        elem && elem[isOut ? 'addClass' : 'removeClass'](DISABLED);
        return isOut;
    };

    //日历表
    Class.prototype.calendar = function (value) {
        var that = this,
            options = that.config,
            dateTime = value || options.dateTime,
            thisDate = new Date(),
            startWeek, prevMaxDate, thisMaxDate, lang = that.lang()

            ,
            isAlone = options.type !== 'date' && options.type !== 'datetime',
            index = value ? 1 : 0,
            tds = lay(that.table[index]).find('td'),
            elemYM = lay(that.elemHeader[index][2]).find('span');

        if (dateTime.year < LIMIT_YEAR[0]) dateTime.year = LIMIT_YEAR[0], that.hint('最低只能支持到公元' + LIMIT_YEAR[0] + '年');
        if (dateTime.year > LIMIT_YEAR[1]) dateTime.year = LIMIT_YEAR[1], that.hint('最高只能支持到公元' + LIMIT_YEAR[1] + '年');

        //记录初始值
        if (!that.firstDate) {
            that.firstDate = lay.extend({}, dateTime);
        }

        //计算当前月第一天的星期
        thisDate.setFullYear(dateTime.year, dateTime.month, 1);
        startWeek = thisDate.getDay();

        prevMaxDate = laydate.getEndDate(dateTime.month || 12, dateTime.year); //计算上个月的最后一天
        thisMaxDate = laydate.getEndDate(dateTime.month + 1, dateTime.year); //计算当前月的最后一天

        //赋值日
        lay.each(tds, function (index, item) {
            var YMD = [dateTime.year, dateTime.month],
                st = 0;
            item = lay(item);
            item.removeAttr('class');
            if (index < startWeek) {
                st = prevMaxDate - startWeek + index;
                item.addClass('laydate-day-prev');
                YMD = that.getAsYM(dateTime.year, dateTime.month, 'sub');
            } else if (index >= startWeek && index < thisMaxDate + startWeek) {
                st = index - startWeek;
                if (!options.range) {
                    st + 1 === dateTime.date && item.addClass(THIS);
                }
            } else {
                st = index - thisMaxDate - startWeek;
                item.addClass('laydate-day-next');
                YMD = that.getAsYM(dateTime.year, dateTime.month);
            }
            YMD[1]++;
            YMD[2] = st + 1;
            item.attr('lay-ymd', YMD.join('-')).html(YMD[2]);
            that.mark(item, YMD).limit(item, {
                year: YMD[0],
                month: YMD[1] - 1,
                date: YMD[2]
            }, index);
        });

        //同步头部年月
        lay(elemYM[0]).attr('lay-ym', dateTime.year + '-' + (dateTime.month + 1));
        lay(elemYM[1]).attr('lay-ym', dateTime.year + '-' + (dateTime.month + 1));

        if (options.lang === 'cn') {
            lay(elemYM[0]).attr('lay-type', 'year').html(dateTime.year + '年')
            lay(elemYM[1]).attr('lay-type', 'month').html((dateTime.month + 1) + '月');
        } else {
            lay(elemYM[0]).attr('lay-type', 'month').html(lang.month[dateTime.month]);
            lay(elemYM[1]).attr('lay-type', 'year').html(dateTime.year);
        }

        //初始默认选择器
        if (isAlone) {
            if (options.range) {
                value ? that.endDate = (that.endDate || {
                    year: dateTime.year + (options.type === 'year' ? 1 : 0),
                    month: dateTime.month + (options.type === 'month' ? 0 : -1)
                }) : (that.startDate = that.startDate || {
                    year: dateTime.year,
                    month: dateTime.month
                });
                if (value) {
                    that.listYM = [
                        [that.startDate.year, that.startDate.month + 1],
                        [that.endDate.year, that.endDate.month + 1]
                    ];
                    that.list(options.type, 0).list(options.type, 1);
                    //同步按钮可点状态
                    options.type === 'time' ? that.setBtnStatus('时间', lay.extend({}, that.systemDate(), that.startTime), lay.extend({}, that.systemDate(), that.endTime)) : that.setBtnStatus(true);
                }
            }
            if (!options.range) {
                that.listYM = [
                    [dateTime.year, dateTime.month + 1]
                ];
                that.list(options.type, 0);
            }
        }

        //赋值双日历
        if (options.range && !value) {
            var EYM = that.getAsYM(dateTime.year, dateTime.month)
            that.calendar(lay.extend({}, dateTime, {
                year: EYM[0],
                month: EYM[1]
            }));
        }

        //通过检测当前有效日期，来设定确定按钮是否可点
        if (!options.range) that.limit(lay(that.footer).find(ELEM_CONFIRM), null, 0, ['hours', 'minutes', 'seconds']);

        //标记选择范围
        if (options.range && value && !isAlone) that.stampRange();
        return that;
    };

    //生成年月时分秒列表
    Class.prototype.list = function (type, index) {
        var that = this,
            options = that.config,
            dateTime = options.dateTime,
            lang = that.lang(),
            isAlone = options.range && options.type !== 'date' && options.type !== 'datetime' //独立范围选择器

            ,
            ul = lay.elem('ul', {
                'class': ELEM_LIST + ' ' + ({
                    year: 'laydate-year-list',
                    month: 'laydate-month-list',
                    time: 'laydate-time-list'
                })[type]
            }),
            elemHeader = that.elemHeader[index],
            elemYM = lay(elemHeader[2]).find('span'),
            elemCont = that.elemCont[index || 0],
            haveList = lay(elemCont).find('.' + ELEM_LIST)[0],
            isCN = options.lang === 'cn',
            text = isCN ? '年' : ''

            ,
            listYM = that.listYM[index] || {},
            hms = ['hours', 'minutes', 'seconds'],
            startEnd = ['startTime', 'endTime'][index];

        if (listYM[0] < 1) listYM[0] = 1;

        if (type === 'year') { //年列表
            var yearNum, startY = yearNum = listYM[0] - 7;
            if (startY < 1) startY = yearNum = 1;
            lay.each(new Array(15), function (i) {
                var li = lay.elem('li', {
                        'lay-ym': yearNum
                    }),
                    ymd = {
                        year: yearNum
                    };
                yearNum == listYM[0] && lay(li).addClass(THIS);
                li.innerHTML = yearNum + text;
                ul.appendChild(li);
                if (yearNum < that.firstDate.year) {
                    ymd.month = options.min.month;
                    ymd.date = options.min.date;
                } else if (yearNum >= that.firstDate.year) {
                    ymd.month = options.max.month;
                    ymd.date = options.max.date;
                }
                that.limit(lay(li), ymd, index);
                yearNum++;
            });
            lay(elemYM[isCN ? 0 : 1]).attr('lay-ym', (yearNum - 8) + '-' + listYM[1])
                .html((startY + text) + ' - ' + (yearNum - 1 + text));
        } else if (type === 'month') { //月列表
            lay.each(new Array(12), function (i) {
                var li = lay.elem('li', {
                        'lay-ym': i
                    }),
                    ymd = {
                        year: listYM[0],
                        month: i
                    };
                i + 1 == listYM[1] && lay(li).addClass(THIS);
                li.innerHTML = lang.month[i] + (isCN ? '月' : '');
                ul.appendChild(li);
                if (listYM[0] < that.firstDate.year) {
                    ymd.date = options.min.date;
                } else if (listYM[0] >= that.firstDate.year) {
                    ymd.date = options.max.date;
                }
                that.limit(lay(li), ymd, index);
            });
            lay(elemYM[isCN ? 0 : 1]).attr('lay-ym', listYM[0] + '-' + listYM[1])
                .html(listYM[0] + text);
        } else if (type === 'time') { //时间列表
            //检测时分秒状态是否在有效日期时间范围内
            var setTimeStatus = function () {
                lay(ul).find('ol').each(function (i, ol) {
                    lay(ol).find('li').each(function (ii, li) {
                        that.limit(lay(li), [{
                            hours: ii
                        }, {
                            hours: that[startEnd].hours,
                            minutes: ii
                        }, {
                            hours: that[startEnd].hours,
                            minutes: that[startEnd].minutes,
                            seconds: ii
                        }][i], index, [
                            ['hours'],
                            ['hours', 'minutes'],
                            ['hours', 'minutes', 'seconds']
                        ][i]);
                    });
                });
                if (!options.range) that.limit(lay(that.footer).find(ELEM_CONFIRM), that[startEnd], 0, ['hours', 'minutes', 'seconds']);
            };
            if (options.range) {
                if (!that[startEnd]) that[startEnd] = {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            } else {
                that[startEnd] = dateTime;
            }
            lay.each([24, 60, 60], function (i, item) {
                var li = lay.elem('li'),
                    childUL = ['<p>' + lang.time[i] + '</p><ol>'];
                lay.each(new Array(item), function (ii) {
                    childUL.push('<li' + (that[startEnd][hms[i]] === ii ? ' class="' + THIS + '"' : '') + '>' + lay.digit(ii, 2) + '</li>');
                });
                li.innerHTML = childUL.join('') + '</ol>';
                ul.appendChild(li);
            });
            setTimeStatus();
        }

        //插入容器
        if (haveList) elemCont.removeChild(haveList);
        elemCont.appendChild(ul);

        //年月
        if (type === 'year' || type === 'month') {
            //显示切换箭头
            lay(that.elemMain[index]).addClass('laydate-ym-show');

            //选中
            lay(ul).find('li').on('click', function () {
                var ym = lay(this).attr('lay-ym') | 0;
                if (lay(this).hasClass(DISABLED)) return;

                if (index === 0) {
                    dateTime[type] = ym;
                    if (isAlone) that.startDate[type] = ym;
                    that.limit(lay(that.footer).find(ELEM_CONFIRM), null, 0);
                } else { //范围选择
                    if (isAlone) { //非date/datetime类型
                        that.endDate[type] = ym;
                    } else { //date/datetime类型
                        var YM = type === 'year' ?
                            that.getAsYM(ym, listYM[1] - 1, 'sub') :
                            that.getAsYM(listYM[0], ym, 'sub');
                        lay.extend(dateTime, {
                            year: YM[0],
                            month: YM[1]
                        });
                    }
                }

                if (options.type === 'year' || options.type === 'month') {
                    lay(ul).find('.' + THIS).removeClass(THIS);
                    lay(this).addClass(THIS);

                    //如果为年月选择器，点击了年列表，则切换到月选择器
                    if (options.type === 'month' && type === 'year') {
                        that.listYM[index][0] = ym;
                        isAlone && (that[['startDate', 'endDate'][index]].year = ym);
                        that.list('month', index);
                    }
                } else {
                    that.checkDate('limit').calendar();
                    that.closeList();
                }

                that.setBtnStatus(); //同步按钮可点状态
                options.range || that.done(null, 'change');
                lay(that.footer).find(ELEM_TIME_BTN).removeClass(DISABLED);
            });
        } else {
            var span = lay.elem('span', {
                    'class': ELEM_TIME_TEXT
                }),
                scroll = function () { //滚动条定位
                    lay(ul).find('ol').each(function (i) {
                        var ol = this,
                            li = lay(ol).find('li')
                        ol.scrollTop = 30 * (that[startEnd][hms[i]] - 2);
                        if (ol.scrollTop <= 0) {
                            li.each(function (ii, item) {
                                if (!lay(this).hasClass(DISABLED)) {
                                    ol.scrollTop = 30 * (ii - 2);
                                    return true;
                                }
                            });
                        }
                    });
                },
                haveSpan = lay(elemHeader[2]).find('.' + ELEM_TIME_TEXT);
            scroll()
            span.innerHTML = options.range ? [lang.startTime, lang.endTime][index] : lang.timeTips
            lay(that.elemMain[index]).addClass('laydate-time-show');
            if (haveSpan[0]) haveSpan.remove();
            elemHeader[2].appendChild(span);

            lay(ul).find('ol').each(function (i) {
                var ol = this;
                //选择时分秒
                lay(ol).find('li').on('click', function () {
                    var value = this.innerHTML | 0;
                    if (lay(this).hasClass(DISABLED)) return;
                    if (options.range) {
                        that[startEnd][hms[i]] = value;
                    } else {
                        dateTime[hms[i]] = value;
                    }
                    lay(ol).find('.' + THIS).removeClass(THIS);
                    lay(this).addClass(THIS);

                    setTimeStatus();
                    scroll();
                    (that.endDate || options.type === 'time') && that.done(null, 'change');

                    //同步按钮可点状态
                    that.setBtnStatus();
                });
            });
        }

        return that;
    };

    //记录列表切换后的年月
    Class.prototype.listYM = [];

    //关闭列表
    Class.prototype.closeList = function () {
        var that = this,
            options = that.config;

        lay.each(that.elemCont, function (index, item) {
            lay(this).find('.' + ELEM_LIST).remove();
            lay(that.elemMain[index]).removeClass('laydate-ym-show laydate-time-show');
        });
        lay(that.elem).find('.' + ELEM_TIME_TEXT).remove();
    };

    //检测结束日期是否超出开始日期
    Class.prototype.setBtnStatus = function (tips, start, end) {
        var that = this,
            options = that.config,
            isOut, elemBtn = lay(that.footer).find(ELEM_CONFIRM),
            isAlone = options.range && options.type !== 'date' && options.type !== 'time';
        if (isAlone) {
            start = start || that.startDate;
            end = end || that.endDate;
            isOut = that.newDate(start).getTime() > that.newDate(end).getTime();

            //如果不在有效日期内，直接禁用按钮，否则比较开始和结束日期
            (that.limit(null, start) || that.limit(null, end)) ?
            elemBtn.addClass(DISABLED): elemBtn[isOut ? 'addClass' : 'removeClass'](DISABLED);

            //是否异常提示
            if (tips && isOut) that.hint(
                typeof tips === 'string' ? TIPS_OUT.replace(/日期/g, tips) : TIPS_OUT
            );
        }
    };

    //转义为规定格式的日期字符
    Class.prototype.parse = function (state, date) {
        var that = this,
            options = that.config,
            dateTime = date || (state ?
                lay.extend({}, that.endDate, that.endTime) :
                (options.range ? lay.extend({}, that.startDate, that.startTime) : options.dateTime)),
            format = that.format.concat();

        //转义为规定格式
        lay.each(format, function (i, item) {
            if (/yyyy|y/.test(item)) { //年
                format[i] = lay.digit(dateTime.year, item.length);
            } else if (/MM|M/.test(item)) { //月
                format[i] = lay.digit(dateTime.month + 1, item.length);
            } else if (/dd|d/.test(item)) { //日
                format[i] = lay.digit(dateTime.date, item.length);
            } else if (/HH|H/.test(item)) { //时
                format[i] = lay.digit(dateTime.hours, item.length);
            } else if (/mm|m/.test(item)) { //分
                format[i] = lay.digit(dateTime.minutes, item.length);
            } else if (/ss|s/.test(item)) { //秒
                format[i] = lay.digit(dateTime.seconds, item.length);
            }
        });

        //返回日期范围字符
        if (options.range && !state) {
            return format.join('') + ' ' + options.range + ' ' + that.parse(1);
        }

        return format.join('');
    };

    //创建指定日期时间对象
    Class.prototype.newDate = function (dateTime) {
        dateTime = dateTime || {};
        return new Date(
            dateTime.year || 1, dateTime.month || 0, dateTime.date || 1, dateTime.hours || 0, dateTime.minutes || 0, dateTime.seconds || 0
        );
    };

    //赋值
    Class.prototype.setValue = function (value) {
        var that = this,
            options = that.config,
            elem = that.bindElem || options.elem[0],
            valType = that.isInput(elem) ? 'val' : 'html'

        options.position === 'static' || lay(elem)[valType](value || '');
        return this;
    };

    //标记范围内的日期
    Class.prototype.stampRange = function () {
        var that = this,
            options = that.config,
            startTime, endTime, tds = lay(that.elem).find('td');

        if (options.range && !that.endDate) lay(that.footer).find(ELEM_CONFIRM).addClass(DISABLED);
        if (!that.endDate) return;

        startTime = that.newDate({
            year: that.startDate.year,
            month: that.startDate.month,
            date: that.startDate.date
        }).getTime();

        endTime = that.newDate({
            year: that.endDate.year,
            month: that.endDate.month,
            date: that.endDate.date
        }).getTime();

        if (startTime > endTime) return that.hint(TIPS_OUT);

        lay.each(tds, function (i, item) {
            var ymd = lay(item).attr('lay-ymd').split('-'),
                thisTime = that.newDate({
                    year: ymd[0],
                    month: ymd[1] - 1,
                    date: ymd[2]
                }).getTime();
            lay(item).removeClass(ELEM_SELECTED + ' ' + THIS);
            if (thisTime === startTime || thisTime === endTime) {
                lay(item).addClass(
                    lay(item).hasClass(ELEM_PREV) || lay(item).hasClass(ELEM_NEXT) ?
                    ELEM_SELECTED :
                    THIS
                );
            }
            if (thisTime > startTime && thisTime < endTime) {
                lay(item).addClass(ELEM_SELECTED);
            }
        });
    };

    //执行done/change回调
    Class.prototype.done = function (param, type) {
        var that = this,
            options = that.config,
            start = lay.extend({}, that.startDate ? lay.extend(that.startDate, that.startTime) : options.dateTime),
            end = lay.extend({}, lay.extend(that.endDate, that.endTime))

        lay.each([start, end], function (i, item) {
            if (!('month' in item)) return;
            lay.extend(item, {
                month: item.month + 1
            });
        });

        param = param || [that.parse(), start, end];
        typeof options[type || 'done'] === 'function' && options[type || 'done'].apply(options, param);

        return that;
    };

    //选择日期
    Class.prototype.choose = function (td) {
        var that = this,
            options = that.config,
            dateTime = options.dateTime

            ,
            tds = lay(that.elem).find('td'),
            YMD = td.attr('lay-ymd').split('-')

            ,
            setDateTime = function (one) {
                var thisDate = new Date();

                //同步dateTime
                one && lay.extend(dateTime, YMD);

                //记录开始日期
                if (options.range) {
                    that.startDate ? lay.extend(that.startDate, YMD) : (
                        that.startDate = lay.extend({}, YMD, that.startTime)
                    );
                    that.startYMD = YMD;
                }
            };

        YMD = {
            year: YMD[0] | 0,
            month: (YMD[1] | 0) - 1,
            date: YMD[2] | 0
        };

        if (td.hasClass(DISABLED)) return;

        //范围选择
        if (options.range) {

            lay.each(['startTime', 'endTime'], function (i, item) {
                that[item] = that[item] || {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            });

            if (that.endState) { //重新选择
                setDateTime();
                delete that.endState;
                delete that.endDate;
                that.startState = true;
                tds.removeClass(THIS + ' ' + ELEM_SELECTED);
                td.addClass(THIS);
            } else if (that.startState) { //选中截止
                td.addClass(THIS);

                that.endDate ? lay.extend(that.endDate, YMD) : (
                    that.endDate = lay.extend({}, YMD, that.endTime)
                );

                //判断是否顺时或逆时选择
                if (that.newDate(YMD).getTime() < that.newDate(that.startYMD).getTime()) {
                    var startDate = lay.extend({}, that.endDate, {
                        hours: that.startDate.hours,
                        minutes: that.startDate.minutes,
                        seconds: that.startDate.seconds
                    });
                    lay.extend(that.endDate, that.startDate, {
                        hours: that.endDate.hours,
                        minutes: that.endDate.minutes,
                        seconds: that.endDate.seconds
                    });
                    that.startDate = startDate;
                }

                options.showBottom || that.done();
                that.stampRange(); //标记范围内的日期
                that.endState = true;
                that.done(null, 'change');
            } else { //选中开始
                td.addClass(THIS);
                setDateTime();
                that.startState = true;
            }
            lay(that.footer).find(ELEM_CONFIRM)[that.endDate ? 'removeClass' : 'addClass'](DISABLED);
        } else if (options.position === 'static') { //直接嵌套的选中
            setDateTime(true);
            that.calendar().done().done(null, 'change');
        } else if (options.type === 'date') {
            setDateTime(true);
            that.setValue(that.parse()).remove().done();
        } else if (options.type === 'datetime') {
            setDateTime(true);
            that.calendar().done(null, 'change');
        }
    };

    //底部按钮
    Class.prototype.tool = function (btn, type) {
        var that = this,
            options = that.config,
            dateTime = options.dateTime,
            isStatic = options.position === 'static',
            active = {
                //选择时间
                datetime: function () {
                        if (lay(btn).hasClass(DISABLED)) return;
                        that.list('time', 0);
                        options.range && that.list('time', 1);
                        lay(btn).attr('lay-type', 'date').html(that.lang().dateTips);
                    }

                    //选择日期
                    ,
                date: function () {
                        that.closeList();
                        lay(btn).attr('lay-type', 'datetime').html(that.lang().timeTips);
                    }

                    //清空、重置
                    ,
                clear: function () {
                        that.setValue('').remove();
                        isStatic && (
                            lay.extend(dateTime, that.firstDate), that.calendar()
                        )
                        options.range && (
                            delete that.startState, delete that.endState, delete that.endDate, delete that.startTime, delete that.endTime
                        );
                        that.done(['', {}, {}]);
                    }

                    //现在
                    ,
                now: function () {
                        var thisDate = new Date();
                        lay.extend(dateTime, that.systemDate(), {
                            hours: thisDate.getHours(),
                            minutes: thisDate.getMinutes(),
                            seconds: thisDate.getSeconds()
                        });
                        that.setValue(that.parse()).remove();
                        isStatic && that.calendar();
                        that.done();
                    }

                    //确定
                    ,
                confirm: function () {
                    if (options.range) {
                        if (!that.endDate) return that.hint('请先选择日期范围');
                        if (lay(btn).hasClass(DISABLED)) return that.hint(
                            options.type === 'time' ? TIPS_OUT.replace(/日期/g, '时间') : TIPS_OUT
                        );
                    } else {
                        if (lay(btn).hasClass(DISABLED)) return that.hint('不在有效日期或时间范围内');
                    }
                    that.done();
                    that.setValue(that.parse()).remove()
                }
            };
        active[type] && active[type]();
    };

    //统一切换处理
    Class.prototype.change = function (index) {
        var that = this,
            options = that.config,
            dateTime = options.dateTime,
            isAlone = options.range && (options.type === 'year' || options.type === 'month')

            ,
            elemCont = that.elemCont[index || 0],
            listYM = that.listYM[index],
            addSubYeay = function (type) {
                var startEnd = ['startDate', 'endDate'][index],
                    isYear = lay(elemCont).find('.laydate-year-list')[0],
                    isMonth = lay(elemCont).find('.laydate-month-list')[0];

                //切换年列表
                if (isYear) {
                    listYM[0] = type ? listYM[0] - 15 : listYM[0] + 15;
                    that.list('year', index);
                }

                if (isMonth) { //切换月面板中的年
                    type ? listYM[0]-- : listYM[0]++;
                    that.list('month', index);
                }

                if (isYear || isMonth) {
                    lay.extend(dateTime, {
                        year: listYM[0]
                    });
                    if (isAlone) that[startEnd].year = listYM[0];
                    options.range || that.done(null, 'change');
                    that.setBtnStatus();
                    options.range || that.limit(lay(that.footer).find(ELEM_CONFIRM), {
                        year: listYM[0]
                    });
                }
                return isYear || isMonth;
            };

        return {
            prevYear: function () {
                if (addSubYeay('sub')) return;
                dateTime.year--;
                that.checkDate('limit').calendar();
                options.range || that.done(null, 'change');
            },
            prevMonth: function () {
                var YM = that.getAsYM(dateTime.year, dateTime.month, 'sub');
                lay.extend(dateTime, {
                    year: YM[0],
                    month: YM[1]
                });
                that.checkDate('limit').calendar();
                options.range || that.done(null, 'change');
            },
            nextMonth: function () {
                var YM = that.getAsYM(dateTime.year, dateTime.month);
                lay.extend(dateTime, {
                    year: YM[0],
                    month: YM[1]
                });
                that.checkDate('limit').calendar();
                options.range || that.done(null, 'change');
            },
            nextYear: function () {
                if (addSubYeay()) return;
                dateTime.year++
                that.checkDate('limit').calendar();
                options.range || that.done(null, 'change');
            }
        };
    };

    //日期切换事件
    Class.prototype.changeEvent = function () {
        var that = this,
            options = that.config;

        //日期选择事件
        lay(that.elem).on('click', function (e) {
            lay.stope(e);
        });

        //年月切换
        lay.each(that.elemHeader, function (i, header) {
            //上一年
            lay(header[0]).on('click', function (e) {
                that.change(i).prevYear();
            });

            //上一月
            lay(header[1]).on('click', function (e) {
                that.change(i).prevMonth();
            });

            //选择年月
            lay(header[2]).find('span').on('click', function (e) {
                var othis = lay(this),
                    layYM = othis.attr('lay-ym'),
                    layType = othis.attr('lay-type');

                if (!layYM) return;

                layYM = layYM.split('-');

                that.listYM[i] = [layYM[0] | 0, layYM[1] | 0];
                that.list(layType, i);
                lay(that.footer).find(ELEM_TIME_BTN).addClass(DISABLED);
            });

            //下一月
            lay(header[3]).on('click', function (e) {
                that.change(i).nextMonth();
            });

            //下一年
            lay(header[4]).on('click', function (e) {
                that.change(i).nextYear();
            });
        });

        //点击日期
        lay.each(that.table, function (i, table) {
            var tds = lay(table).find('td');
            tds.on('click', function () {
                that.choose(lay(this));
            });
        });

        //点击底部按钮
        lay(that.footer).find('span').on('click', function () {
            var type = lay(this).attr('lay-type');
            that.tool(this, type);
        });
    };

    //是否输入框
    Class.prototype.isInput = function (elem) {
        return /input|textarea/.test(elem.tagName.toLocaleLowerCase());
    };

    //绑定的元素事件处理
    Class.prototype.events = function () {
        var that = this,
            options = that.config,

            //绑定呼出控件事件
            showEvent = function (elem, bind) {
                elem.on(options.trigger, function () {
                    bind && (that.bindElem = this);
                    that.render();
                });
            };

        if (!options.elem[0] || options.elem[0].eventHandler) return;

        showEvent(options.elem, 'bind');
        showEvent(options.eventElem);

        //绑定关闭控件事件
        lay(document).on('click', function (e) {
            if (e.target === options.elem[0] ||
                e.target === options.eventElem[0] ||
                e.target === lay(options.closeStop)[0]) {
                return;
            }
            that.remove();
        }).on('keydown', function (e) {
            if (e.keyCode === 13) {
                if (lay('#' + that.elemID)[0] && that.elemID === Class.thisElem) {
                    e.preventDefault();
                    lay(that.footer).find(ELEM_CONFIRM)[0].click();
                }
            }
        });

        //自适应定位
        lay(window).on('resize', function () {
            if (!that.elem || !lay(ELEM)[0]) {
                return false;
            }
            that.position();
        });

        options.elem[0].eventHandler = true;
    };


    //核心接口
    laydate.render = function (options) {
        var inst = new Class(options);
        return thisDate.call(inst);
    };

    //得到某月的最后一天
    laydate.getEndDate = function (month, year) {
        var thisDate = new Date();
        //设置日期为下个月的第一天
        thisDate.setFullYear(
            year || thisDate.getFullYear(), month || (thisDate.getMonth() + 1), 1);
        //减去一天，得到当前月最后一天
        return new Date(thisDate.getTime() - 1000 * 60 * 60 * 24).getDate();
    };

    //暴露lay
    window.lay = window.lay || lay;

    //加载方式
    isLayui ? (
        laydate.ready(), layui.define(function (exports) { //layui加载
            laydate.path = layui.cache.dir;
            exports(MOD_NAME, laydate);
        })
    ) : (
        (typeof define === 'function' && define.amd) ? define(function () { //requirejs加载
            return laydate;
        }) : function () { //普通script标签加载
            laydate.ready();
            window.laydate = laydate
        }()
    );

}();


/**

 @Name：layui.form 表单组件
 @Author：贤心
 @License：MIT

 */

layui.define(['laydate', 'upload', 'admin'], function (exports) {
    "use strict";

    var $ = layui.$,
        laydate = layui.laydate,
        upload = layui.upload,
        layer = layui.layer,
        admin = layui.admin,
        hint = layui.hint(),
        device = layui.device(),
        MOD_NAME = 'form',
        ELEM = '.layui-form',
        THIS = 'layui-this',
        SHOW = 'layui-show',
        HIDE = 'layui-hide',
        DISABLED = 'layui-disabled';

    var Form = function () {
        this.config = {
            verify: {
                required: [
                    /[\S]+/, '必填项不能为空'
                ],
                phone: [
                    /^1\d{10}$/, '请输入正确的手机号'
                ],
                email: [
                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '邮箱格式不正确'
                ],
                url: [
                    /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, '链接格式不正确'
                ],
                number: function (value) {
                    if (!value || isNaN(value)) return '只能填写数字'
                },
                date: [
                    /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, '日期格式不正确'
                ],
                identity: [
                    /(^\d{15}$)|(^\d{17}(x|X|\d)$)/, '请输入正确的身份证号'
                ]
            }
        };
    };

    //全局设置
    Form.prototype.set = function (options) {
        var that = this;
        $.extend(true, that.config, options);
        return that;
    };

    //验证规则设定
    Form.prototype.verify = function (settings) {
        var that = this;
        $.extend(true, that.config.verify, settings);
        return that;
    };

    //表单事件监听
    Form.prototype.on = function (events, callback) {
        return layui.onevent.call(this, MOD_NAME, events, callback);
    };

    //初始赋值
    Form.prototype.val = function (filter, object) {
        var that = this,
            formElem = $(ELEM + '[lay-filter="' + filter + '"]');
        formElem.each(function (index, item) {
            var itemFrom = $(this);
            layui.each(object, function (key, value) {
                var itemElem = itemFrom.find('[name="' + key + '"]'),
                    type;

                //如果对应的表单不存在，则不执行
                if (!itemElem[0]) return;
                type = itemElem[0].type;

                //如果为复选框
                if (type === 'checkbox') {
                    itemElem[0].checked = value;
                } else if (type === 'radio') { //如果为单选框
                    itemElem.each(function () {
                        if (this.value === value) {
                            this.checked = true
                        }
                    });
                } else { //其它类型的表单
                    itemElem.val(value);
                }
            });
        });
        form.render(null, filter);
    };

    //表单控件渲染
    Form.prototype.render = function (type, filter) {
        var that = this,
            elemForm = $(ELEM + function () {
                return filter ? ('[lay-filter="' + filter + '"]') : '';
            }()),
            items = {
                //下拉选择框
                select: function () {
                    var TIPS = '请选择',
                        CLASS = 'layui-form-select',
                        TITLE = 'layui-select-title',
                        NONE = 'layui-select-none',
                        initValue = '',
                        thatInput, selects = elemForm.find('select'),

                        //隐藏 select
                        hide = function (e, clear) {
                            if (!$(e.target).parent().hasClass(TITLE) || clear) {
                                $('.' + CLASS).removeClass(CLASS + 'ed ' + CLASS + 'up');
                                thatInput && initValue && thatInput.val(initValue);
                            }
                            thatInput = null;
                        },

                        //各种事件
                        events = function (reElem, disabled, isSearch) {
                            var select = $(this),
                                title = reElem.find('.' + TITLE),
                                input = title.find('input'),
                                dl = reElem.find('dl'),
                                dds = dl.children('dd'),
                                index = this.selectedIndex //当前选中的索引
                                ,
                                nearElem; //select 组件当前选中的附近元素，用于辅助快捷键功能

                            if (disabled) return;

                            //展开下拉
                            var showDown = function () {
                                    var top = reElem.offset().top + reElem.outerHeight() + 5 - $win.scrollTop(),
                                        dlHeight = dl.outerHeight();

                                    index = select[0].selectedIndex; //获取最新的 selectedIndex
                                    reElem.addClass(CLASS + 'ed');
                                    dds.removeClass(HIDE);
                                    nearElem = null;

                                    //初始选中样式
                                    dds.eq(index).addClass(THIS).siblings().removeClass(THIS);

                                    //上下定位识别
                                    if (top + dlHeight > $win.height() && top >= dlHeight) {
                                        reElem.addClass(CLASS + 'up');
                                    }

                                    followScroll();
                                }

                                //隐藏下拉
                                ,
                                hideDown = function (choose) {
                                    reElem.removeClass(CLASS + 'ed ' + CLASS + 'up');
                                    input.blur();
                                    nearElem = null;

                                    if (choose) return;

                                    notOption(input.val(), function (none) {
                                        var selectedIndex = select[0].selectedIndex;

                                        //未查询到相关值
                                        if (none) {
                                            initValue = $(select[0].options[selectedIndex]).html(); //重新获得初始选中值

                                            //如果是第一项，且文本值等于 placeholder，则清空初始值
                                            if (selectedIndex === 0 && initValue === input.attr('placeholder')) {
                                                initValue = '';
                                            };

                                            //如果有选中值，则将输入框纠正为该值。否则清空输入框
                                            input.val(initValue || '');
                                        }
                                    });
                                }

                                //定位下拉滚动条
                                ,
                                followScroll = function () {
                                    var thisDd = dl.children('dd.' + THIS);

                                    if (!thisDd[0]) return;

                                    var posTop = thisDd.position().top,
                                        dlHeight = dl.height(),
                                        ddHeight = thisDd.height();

                                    //若选中元素在滚动条不可见底部
                                    if (posTop > dlHeight) {
                                        dl.scrollTop(posTop + dl.scrollTop() - dlHeight + ddHeight - 5);
                                    }

                                    //若选择玄素在滚动条不可见顶部
                                    if (posTop < 0) {
                                        dl.scrollTop(posTop + dl.scrollTop() - 5);
                                    }
                                };

                            //点击标题区域
                            title.on('click', function (e) {
                                reElem.hasClass(CLASS + 'ed') ? (
                                    hideDown()
                                ) : (
                                    hide(e, true),
                                    showDown()
                                );
                                dl.find('.' + NONE).remove();
                            });

                            //点击箭头获取焦点
                            title.find('.layui-edge').on('click', function () {
                                input.focus();
                            });

                            //select 中 input 键盘事件
                            input.on('keyup', function (e) { //键盘松开
                                var keyCode = e.keyCode;

                                //Tab键展开
                                if (keyCode === 9) {
                                    showDown();
                                }
                            }).on('keydown', function (e) { //键盘按下
                                var keyCode = e.keyCode;

                                //Tab键隐藏
                                if (keyCode === 9) {
                                    hideDown();
                                }

                                //标注 dd 的选中状态
                                var setThisDd = function (prevNext, thisElem1) {
                                    var nearDd, cacheNearElem
                                    e.preventDefault();

                                    //得到当前队列元素
                                    var thisElem = function () {
                                        var thisDd = dl.children('dd.' + THIS);

                                        //如果是搜索状态，且按 Down 键，且当前可视 dd 元素在选中元素之前，
                                        //则将当前可视 dd 元素的上一个元素作为虚拟的当前选中元素，以保证递归不中断
                                        if (dl.children('dd.' + HIDE)[0] && prevNext === 'next') {
                                            var showDd = dl.children('dd:not(.' + HIDE + ',.' + DISABLED + ')'),
                                                firstIndex = showDd.eq(0).index();
                                            if (firstIndex >= 0 && firstIndex < thisDd.index() && !showDd.hasClass(THIS)) {
                                                return showDd.eq(0).prev()[0] ? showDd.eq(0).prev() : dl.children(':last');
                                            }
                                        }

                                        if (thisElem1 && thisElem1[0]) {
                                            return thisElem1;
                                        }
                                        if (nearElem && nearElem[0]) {
                                            return nearElem;
                                        }

                                        return thisDd;
                                        //return dds.eq(index);
                                    }();

                                    cacheNearElem = thisElem[prevNext](); //当前元素的附近元素
                                    nearDd = thisElem[prevNext]('dd:not(.' + HIDE + ')'); //当前可视元素的 dd 元素

                                    //如果附近的元素不存在，则停止执行，并清空 nearElem
                                    if (!cacheNearElem[0]) return nearElem = null;

                                    //记录附近的元素，让其成为下一个当前元素
                                    nearElem = thisElem[prevNext]();

                                    //如果附近不是 dd ，或者附近的 dd 元素是禁用状态，则进入递归查找
                                    if ((!nearDd[0] || nearDd.hasClass(DISABLED)) && nearElem[0]) {
                                        return setThisDd(prevNext, nearElem);
                                    }

                                    nearDd.addClass(THIS).siblings().removeClass(THIS); //标注样式
                                    followScroll(); //定位滚动条
                                };

                                if (keyCode === 38) setThisDd('prev'); //Up 键
                                if (keyCode === 40) setThisDd('next'); //Down 键

                                //Enter 键
                                if (keyCode === 13) {
                                    e.preventDefault();
                                    dl.children('dd.' + THIS).trigger('click');
                                }
                            });

                            //检测值是否不属于 select 项
                            var notOption = function (value, callback, origin) {
                                var num = 0;
                                layui.each(dds, function () {
                                    var othis = $(this),
                                        text = othis.text(),
                                        not = text.indexOf(value) === -1;
                                    if (value === '' || (origin === 'blur') ? value !== text : not) num++;
                                    origin === 'keyup' && othis[not ? 'addClass' : 'removeClass'](HIDE);
                                });
                                var none = num === dds.length;
                                return callback(none), none;
                            };

                            //搜索匹配
                            var search = function (e) {
                                var value = this.value,
                                    keyCode = e.keyCode;

                                if (keyCode === 9 || keyCode === 13 ||
                                    keyCode === 37 || keyCode === 38 ||
                                    keyCode === 39 || keyCode === 40
                                ) {
                                    return false;
                                }

                                notOption(value, function (none) {
                                    if (none) {
                                        dl.find('.' + NONE)[0] || dl.append('<p class="' + NONE + '">无匹配项</p>');
                                    } else {
                                        dl.find('.' + NONE).remove();
                                    }
                                }, 'keyup');

                                if (value === '') {
                                    dl.find('.' + NONE).remove();
                                }

                                followScroll(); //定位滚动条
                            };

                            if (isSearch) {
                                input.on('keyup', search).on('blur', function (e) {
                                    var selectedIndex = select[0].selectedIndex;

                                    thatInput = input; //当前的 select 中的 input 元素
                                    initValue = $(select[0].options[selectedIndex]).html(); //重新获得初始选中值

                                    //如果是第一项，且文本值等于 placeholder，则清空初始值
                                    if (selectedIndex === 0 && initValue === input.attr('placeholder')) {
                                        initValue = '';
                                    };

                                    setTimeout(function () {
                                        notOption(input.val(), function (none) {
                                            initValue || input.val(''); //none && !initValue
                                        }, 'blur');
                                    }, 200);
                                });
                            }

                            //选择
                            dds.on('click', function () {
                                var othis = $(this),
                                    value = othis.attr('lay-value');
                                var filter = select.attr('lay-filter'); //获取过滤器

                                if (othis.hasClass(DISABLED)) return false;

                                if (othis.hasClass('layui-select-tips')) {
                                    input.val('');
                                } else {
                                    input.val(othis.text());
                                    othis.addClass(THIS);
                                }

                                othis.siblings().removeClass(THIS);
                                select.val(value).removeClass('layui-form-danger')
                                layui.event.call(this, MOD_NAME, 'select(' + filter + ')', {
                                    elem: select[0],
                                    value: value,
                                    othis: reElem
                                });

                                hideDown(true);
                                return false;
                            });

                            reElem.find('dl>dt').on('click', function (e) {
                                return false;
                            });

                            $(document).off('click', hide).on('click', hide); //点击其它元素关闭 select
                        }

                    selects.each(function (index, select) {
                        var othis = $(this),
                            hasRender = othis.next('.' + CLASS),
                            disabled = this.disabled,
                            value = select.value,
                            selected = $(select.options[select.selectedIndex]) //获取当前选中项
                            ,
                            optionsFirst = select.options[0];

                        if (typeof othis.attr('lay-ignore') === 'string') return othis.show();

                        var isSearch = typeof othis.attr('lay-search') === 'string',
                            placeholder = optionsFirst ? (
                                optionsFirst.value ? TIPS : (optionsFirst.innerHTML || TIPS)
                            ) : TIPS;

                        //替代元素
                        var reElem = $(['<div class="' + (isSearch ? '' : 'layui-unselect ') + CLASS, (disabled ? ' layui-select-disabled' : '') + '">', '<div class="' + TITLE + '">', ('<input type="text" placeholder="' + placeholder + '" ' +
                                ('value="' + (value ? selected.html() : '') + '"') //默认值
                                +
                                (isSearch ? '' : ' readonly') //是否开启搜索
                                +
                                ' class="layui-input' +
                                (isSearch ? '' : ' layui-unselect') +
                                (disabled ? (' ' + DISABLED) : '') + '">') //禁用状态
                            , '<i class="layui-edge"></i></div>', '<dl class="fa' + (othis.find('optgroup')[0] ? ' layui-select-group' : '') + '">',
                            function (options) {
                                var arr = [];
                                layui.each(options, function (index, item) {
                                    if (index === 0 && !item.value) {
                                        arr.push('<dd lay-value="" class="layui-select-tips">' + (item.innerHTML || TIPS) + '</dd>');
                                    } else if (item.tagName.toLowerCase() === 'optgroup') {
                                        arr.push('<dt>' + item.label + '</dt>');
                                    } else {
                                        arr.push('<dd lay-value="' + item.value + '" class="' + (value === item.value ? THIS : '') + (item.disabled ? (' ' + DISABLED) : '') + '">' + item.innerHTML + '</dd>');
                                    }
                                });
                                arr.length === 0 && arr.push('<dd lay-value="" class="' + DISABLED + '">没有选项</dd>');
                                return arr.join('');
                            }(othis.find('*')) + '</dl>', '</div>'
                        ].join(''));

                        hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
                        othis.after(reElem);
                        events.call(this, reElem, disabled, isSearch);
                    });
                },

                //复选框/开关
                checkbox: function () {
                    var CLASS = {
                            checkbox: ['layui-form-checkbox', 'layui-form-checked', 'checkbox'],
                            _switch: ['layui-form-switch', 'layui-form-onswitch', 'switch']
                        },
                        checks = elemForm.find('input[type=checkbox]'),
                        events = function (reElem, RE_CLASS) {
                            var check = $(this);
                            //勾选
                            reElem.on('click', function () {
                                var filter = check.attr('lay-filter') //获取过滤器
                                    ,
                                    text = (check.attr('lay-text') || '').split('|');

                                if (check[0].disabled) return;

                                check[0].checked ? (
                                    check[0].checked = false, reElem.removeClass(RE_CLASS[1]).find('em').text(text[1])
                                ) : (
                                    check[0].checked = true, reElem.addClass(RE_CLASS[1]).find('em').text(text[0])
                                );

                                layui.event.call(check[0], MOD_NAME, RE_CLASS[2] + '(' + filter + ')', {
                                    elem: check[0],
                                    value: check[0].value,
                                    othis: reElem
                                });
                            });
                        }

                    checks.each(function (index, check) {
                        var othis = $(this),
                            skin = othis.attr('lay-skin'),
                            text = (othis.attr('lay-text') || '').split('|'),
                            disabled = this.disabled;
                        if (skin === 'switch') skin = '_' + skin;
                        var RE_CLASS = CLASS[skin] || CLASS.checkbox;

                        if (typeof othis.attr('lay-ignore') === 'string') return othis.show();

                        //替代元素
                        var hasRender = othis.next('.' + RE_CLASS[0]),
                            reElem = $(['<div class="layui-unselect ' + RE_CLASS[0], (check.checked ? (' ' + RE_CLASS[1]) : '') //选中状态
                                , (disabled ? ' layui-checkbox-disbaled ' + DISABLED : '') //禁用状态
                                , '"', (skin ? ' lay-skin="' + skin + '"' : '') //风格
                                , '>',
                                function () { //不同风格的内容
                                    var title = check.title.replace(/\s/g, ''),
                                        type = {
                                            //复选框
                                            checkbox: [
                                                    (title ? ('<span>' + check.title + '</span>') : ''), '<i class="fa fa-check"></i>'
                                                ].join('')

                                                //开关
                                                ,
                                            _switch: '<em>' + ((check.checked ? text[0] : text[1]) || '') + '</em><i></i>'
                                        };
                                    return type[skin] || type['checkbox'];
                                }(), '</div>'
                            ].join(''));

                        hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
                        othis.after(reElem);
                        events.call(this, reElem, RE_CLASS);
                    });
                },

                //单选框
                radio: function () {
                    var CLASS = 'layui-form-radio',
                        radios = elemForm.find('input[type=radio]'),
                        events = function (reElem) {
                            var radio = $(this),
                                ANIM_BASE = 'fa-circle-o',
                                ANIM = 'fa-dot-circle-o';

                            reElem.on('click', function () {
                                var name = radio[0].name,
                                    forms = radio.parents(ELEM);
                                var filter = radio.attr('lay-filter'); //获取过滤器
                                var sameRadio = forms.find('input[name=' + name.replace(/(\.|#|\[|\])/g, '\\$1') + ']'); //找到相同name的兄弟

                                if (radio[0].disabled) return;

                                layui.each(sameRadio, function () {
                                    var next = $(this).next('.' + CLASS);
                                    this.checked = false;
                                    next.removeClass(CLASS + 'ed');
                                    next.find('.fa').removeClass(ANIM).addClass(ANIM_BASE);
                                });

                                radio[0].checked = true;
                                reElem.addClass(CLASS + 'ed');
                                reElem.find('.fa').addClass(ANIM).removeClass(ANIM_BASE);

                                layui.event.call(radio[0], MOD_NAME, 'radio(' + filter + ')', {
                                    elem: radio[0],
                                    value: radio[0].value,
                                    othis: reElem
                                });
                            });
                        };

                    radios.each(function (index, radio) {
                        var othis = $(this),
                            hasRender = othis.next('.' + CLASS),
                            disabled = this.disabled;

                        if (typeof othis.attr('lay-ignore') === 'string') return othis.show();
                        hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender

                        //替代元素
                        var reElem = $(['<div class="layui-unselect ' + CLASS, (radio.checked ? (' ' + CLASS + 'ed') : '') //选中状态
                            , (disabled ? ' layui-radio-disbaled ' + DISABLED : '') + '">' //禁用状态
                            , '<i class="fa '+(radio.checked ? 'fa-dot-circle-o': 'fa-circle-o')+'"></i>', '<div>' + function () {
                                var title = radio.title || '';
                                if (typeof othis.next().attr('lay-radio') === 'string') {
                                    title = othis.next().html();
                                    othis.next().remove();
                                }
                                return title
                            }() + '</div>', '</div>'
                        ].join(''));

                        othis.after(reElem);
                        events.call(this, reElem);
                    });
                },

                //上传
                img: function () {
                    var CLASS = 'layui-form-img',
                        imgs = elemForm.find('.' + CLASS),
                        imgTpl = '<li class="uploader__file" style="background-image: url(UPLOADEDFILE)"><div class="uploader__mask" style="display: none">' +
                        '<div class="mask__delete"><a href="javascript:;" class="j_delete" data-id="UPLOADEDFILE"><i class="fa fa-close"></i></a></div>' +
                        '</div></li>',
                        events = function (reElem) {
                            var img = $(this),
                                imgWrap = reElem.parents(".m-uploader"),
                                _imgBox = imgWrap.find('.uploader__files'),
                                _imgPicker = reElem,
                                _imgVal = img.find("input[type=hidden]"),
                                filter = img.attr('lay-filter'),
                                upload_limit = img.data('limit');

                            reElem.on('click', function () {
                                upload.render({
                                    url: '/interface/core/upload',
                                    fileNumLimit: upload_limit,
                                    done: function (res) {
                                        if (upload_limit == 1) {
                                            _imgBox.append(imgTpl.replace(new RegExp(/(UPLOADEDFILE)/g), res[0]))
                                            _imgVal.val(res[0])
                                            _imgPicker.hide()
                                        } else {
                                            var _val = _imgVal.val()
                                            _val = _val.length > 1 ? _val.split(',') : []
                                            if (_val.length >= upload_limit) return;

                                            $.each(res, function (i, n) {
                                                _val.push(n)
                                                if (_val.length >= upload_limit) {
                                                    // 数量限制
                                                    _imgPicker.hide();
                                                }
                                                _imgBox.append(imgTpl.replace(new RegExp(/(UPLOADEDFILE)/g), n))
                                            })
                                            _imgVal.val(_val.join(','))
                                        }
                                        // 删除事件
                                        _imgBox.on("mouseenter" ,".uploader__file", function(){
                                            $(this).find(".uploader__mask").show()
                                        }).on("mouseleave" ,".uploader__file", function(){
                                            $(this).find(".uploader__mask").hide()
                                        })
                                        _imgBox.on("click", ".j_delete", function(){
                                            if (upload_limit == 1) {
                                                _imgBox.remove();
                                                _imgPicker.show();
                                                _imgVal.val('')
                                            } else {
                                                $(this).parents(".uploader__file").remove();
                                                var url = $(this).attr("data-id")
                                                var _val = _imgVal.val();
                                                _val = _val.length > 1 ? _val.split(',') : []

                                                var _idx = _val.indexOf(url);
                                                if (_idx > -1) {
                                                    _val.splice(_idx, 1);
                                                }

                                                _imgPicker.show();
                                                _imgVal.val(_val)
                                            }
                                        });

                                        // 图选事件
                                        layui.event.call(img[0], MOD_NAME, 'img(' + filter + ')', {
                                            elem: img[0],
                                            value: _imgVal.val(),
                                            othis: reElem
                                        });
                                    }
                                })

                            });
                        };

                    imgs.each(function (index, radio) {
                        var othis = $(this),
                            limit = othis.data('limit') || 1,
                        reElem = $(['<div class="m-uploader clearfix">',
                            '<ul class="uploader__files"></ul>',
                            '<div class="img__picker" data-limit="'+limit+'" ></div>',
                        '</div>'].join(''));

                        if(othis.find('.m-uploader').length > 0) return;

                        othis.append(reElem);
                        events.call(this, reElem.find(".img__picker"));
                    });
                },

                // date
                date: function () {
                    var CLASS_DATE = 'layui-form-date',
                        CLASS_DATERANGE = 'layui-form-daterange';

                    elemForm.find('.' + CLASS_DATE).each(function (i, n) {
                        laydate.render({elem: n,type: $(n).attr("date-type") || 'date'});
                    });

                    // dateRange render
                    elemForm.find('.' + CLASS_DATERANGE).each(function (i, n) {
                        var othis = $(this),
                            insStart = '',
                            insEnd = '',
                            option = othis.data('options');

                        insStart = laydate.render({
                            elem: othis.find(".start_at")[0],
                            min: option.min || '1900-1-1',
                            max: option.max || '2999-12-31',
                            type: option.type || 'date',
                            value: othis.find(".start_at")[0].value,
                            done: function(value, date){
                            insEnd.config.min = lay.extend({}, date, {
                                month: date.month - 1
                            });
                            }
                        });
                        insEnd = laydate.render({
                            elem: othis.find(".end_at")[0],
                            min: option.min || '1900-1-1',
                            max: option.max || '2999-12-31',
                            type: option.type || 'date',
                            value: othis.find(".end_at")[0].value,
                            done: function(value, date){
                                insStart.config.max = lay.extend({}, date, {
                                    month: date.month - 1
                                });
                            }
                        });
                    });
                },
            };
        type ? (
            items[type] ? items[type]() : hint.error('不支持的' + type + '表单渲染')
        ) : layui.each(items, function (index, item) {
            item();
        });
        return that;
    };

    //表单提交校验
    var submit = function () {
        var button = $(this),
            verify = form.config.verify,
            stop = null,
            DANGER = 'layui-form-danger',
            field = {},
            elem = button.parents(ELEM),

            verifyElem = elem.find('*[lay-verify]'), //获取需要校验的元素
            formElem = button.parents('form')[0], //获取当前所在的form元素，如果存在的话
            fieldElem = elem.find('input,select,textarea'), //获取所有表单域
            filter = button.attr('lay-filter'), //获取过滤器
            ajaxsubmit = button.hasClass('J_ajax'); // 是否ajax提交

        //开始校验
        layui.each(verifyElem, function (_, item) {
            var othis = $(this),
                vers = othis.attr('lay-verify').split('|'),
                verType = othis.attr('lay-verType') //提示方式
                ,
                value = othis.val();

            othis.removeClass(DANGER);
            layui.each(vers, function (_, thisVer) {
                var isTrue //是否命中校验
                    , errorText = '' //错误提示文本
                    ,
                    isFn = typeof verify[thisVer] === 'function';

                //匹配验证规则
                if (verify[thisVer]) {
                    var isTrue = isFn ? errorText = verify[thisVer](value, item) : !verify[thisVer][0].test(value);
                    errorText = errorText || verify[thisVer][1];

                    //如果是必填项或者非空命中校验，则阻止提交，弹出提示
                    if (isTrue) {
                        //提示层风格
                        if (verType === 'tips') {
                            layer.tips(errorText, function () {
                                if (typeof othis.attr('lay-ignore') !== 'string') {
                                    if (item.tagName.toLowerCase() === 'select' || /^checkbox|radio$/.test(item.type)) {
                                        return othis.next();
                                    }
                                }
                                return othis;
                            }(), {
                                tips: 1
                            });
                        } else if (verType === 'alert') {
                            layer.alert(errorText, {
                                title: '提示',
                                shadeClose: true
                            });
                        } else {
                            layer.msg(errorText, {
                                icon: 5,
                                shift: 6
                            });
                        }
                        if (!device.android && !device.ios) item.focus(); //非移动设备自动定位焦点
                        othis.addClass(DANGER);
                        return stop = true;
                    }
                }
            });
            if (stop) return stop;
        });

        if (stop) return false;

        var nameIndex = {}; //数组 name 索引
        layui.each(fieldElem, function (_, item) {
            item.name = (item.name || '').replace(/^\s*|\s*&/, '');

            if (!item.name) return;

            //用于支持数组 name
            if (/^.*\[\]$/.test(item.name)) {
                var key = item.name.match(/^(.*)\[\]$/g)[0];
                nameIndex[key] = nameIndex[key] | 0;
                item.name = item.name.replace(/^(.*)\[\]$/, '$1[' + (nameIndex[key]++) + ']');
            }

            if (/^checkbox|radio$/.test(item.type) && !item.checked) return;
            field[item.name] = item.value;
        });


        // ajax提交
        var _form = button.parents('form')
        if(!ajaxsubmit) {
            return layui.event.call(this, MOD_NAME, 'submit(' + filter + ')', {
                elem: this,
                form: formElem,
                field: field
            });;
        }else{
            admin.request.ajax({
                type: _form.attr('method'),
                url: _form.attr('action'),
                data: field,
                success: function(res){
                    if(res.errcode == 0) {
                        layer.msg(res.msg);

                        if(res.data.redirect) {
                            setTimeout(function(){
                                admin.openTab(res.data.redirect, '列表')
                            }, 1500)
                            return;
                        }
                        if(parent.layer) {
                            setTimeout(function(){
                                parent.layer.close(parent.layer.getFrameIndex(window.name));
                            }, 1500)
                        }

                        _form[0].reset()
                        return layui.event.call(this, MOD_NAME, 'submit(' + filter + ')', {
                            elem: this,
                            form: formElem,
                            field: field
                        });
                    }else{
                        layer.alert(res.msg, {
                            title: '提示',
                            shadeClose: true
                        });
                    }
                }
            })
        }

        return false;
    };

    //自动完成渲染
    var form = new Form(),
        $dom = $("body"),
        $win = $(window);

    form.render();

    //表单reset重置渲染
    $dom.on('reset', ELEM, function () {
        var filter = $(this).attr('lay-filter');
        setTimeout(function () {
            form.render(null, filter);
        }, 50);
    });

    //表单提交事件
    $dom.on('submit', ELEM, submit).on('click', '*[lay-submit]', submit);
    $dom.on('click', '*[lay-submit-cancel]', function(){
        parent.layer.close(parent.layer.getFrameIndex(window.name))
    });

    exports(MOD_NAME, form);
});
