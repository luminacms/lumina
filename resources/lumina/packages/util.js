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
