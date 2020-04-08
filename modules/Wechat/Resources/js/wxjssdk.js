/*
WXJssdk.init(function(wx){
// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    wx.checkJsApi({
        jsApiList: ['getNetworkType', 'previewImage','chooseImage'],
        success: function(res) {
            alert(JSON.stringify(res));
        }
    });
})
*/
WXJssdkInit = function(options) {


    if (!options) options = {};
    var jssdk = location.protocol+'//res.wx.qq.com/open/js/jweixin-1.4.0.js'; //微信的sdk
    var jssdkGetSignature = "/server/wechat/getsign" //获取jssdk签名接口包含参数sServiceType=feiji和sUrl
    var jssdkGetSignatureCharset = 'utf-8' //获取jssdk签名接口编码


    var scriptLoader = function() {
        var firstScript = document.getElementsByTagName('script')[0];
        var scriptHead = firstScript.parentNode;
        var re = /ded|co/;
        var onload = 'onload';
        var onreadystatechange = 'onreadystatechange';
        var readyState = 'readyState';


        var load = function(src, fn, charset) {
            var script = document.createElement('script');
            script.charset = charset;
            script[onload] = script[onreadystatechange] = function() {
                if (!this[readyState] || re.test(this[readyState])) {
                    script[onload] = script[onreadystatechange] = null;
                    fn && fn(script);
                    script = null;
                }
            };
            script.async = true;
            script.src = src;
            scriptHead.insertBefore(script, firstScript);
        };
        return function(srces, fn, charset) {
            charset = charset || 'gb2312';
            if (typeof srces == 'string') {
                load(srces, fn, charset);
            } else {
                var src = srces.shift();
                load(src, function() {
                    if (srces.length) {
                        scriptLoader(srces, fn, charset);
                    } else {
                        fn && fn();
                    }
                }, charset);
            }
        };
    }();
    var xhrFactory = function() {
        this.init.apply(this, arguments);
    }
    xhrFactory.prototype = {
        init: function() {
            this.xhr = this.create();
        },
        create: function() {
            var xhr = null;
            try {
                xhr = new XMLHttpRequest();
            } catch (err) {
                xhr = new ActiveXObject("Microsoft.Xmlhttp");
            }
            return xhr;
        },
        readystate: function(timeout, callback) {
            var self = this;
            self.xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    callback(eval("(" + this.responseText + ")"));
                } else {
                    setTimeout(function() {
                        self.xhr.abort();
                    }, !timeout ? 15000 : timeout);
                }


            }
        },
        para: function(data) {
            return data;
        },
        get: function(url, data, callback, async, timeout) {
            this.readystate(timeout, callback);
            var newurl = url;
            var datastr = this.para(data);
            newurl = url + "?" + datastr;
            this.xhr.open("get", newurl, !async ? true : async);
            this.xhr.setRequestHeader("Accept", "application/json");
            this.xhr.send(null);
        },
        post: function(url, data, callback, async, timeout) {
            this.readystate(timeout, callback);
            var newurl = url;
            var datastr = this.para(data);
            this.xhr.open("post", newurl, !async ? true : async);
            this.xhr.setRequestHeader("Accept", "application/json");
            this.xhr.setRequestHeader("content-type", "x-www-form-urlencoded");
            this.xhr.send(!datastr ? null : datastr);
        }
    }


    /*
    fn为回调方法，传递wx对象
    appId 可选,为相应公众号appid,留空会根据页面url寻找
    jsApiList可选,为api功能接口，留空取得全部,
    ifDebug可选,为是否进行调试，留空不进行调试
    */
    this.init = function(fn, ifDebug) {
        var getSign = function(fn, ifDebug, options, definetmp) {
            if (options.sServiceType) {
                var sServiceType = options.sServiceType;
            } else {
                var r = window.location.host;
                if (r) {
                    var sServiceType = r;
                } else {
                    if (ifDebug) {
                        console.log('Not support local test,please use url start with http//.');
                        alert('Not support local test,please use url start with http//.');
                    }
                    return;
                }
            }
            var xhr = new xhrFactory();


            xhr.get(jssdkGetSignature, 'sServiceType=' + sServiceType + '&sUrl=' + encodeURIComponent(location.href.replace(/[\#][\s\S]*/, '')) + ((ifDebug) ? ('&debug=' + ifDebug) : ''), function(res) {


                if (res.errcode == '0') {
                    //获取签名
                    var ops = {
                        debug: ifDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.appId, // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.signature, // 必填，签名，见附录1
                        jsApiList: res.data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    };
                    if (typeof wx == 'object') {
                        wx.config(ops);
                        wx.ready(function() {
                            fn(wx);
                        });
                    } else {
                        fn({
                            'msg': 'wx is null.'
                        });
                    }
                    if (typeof define != 'undefined' && typeof define.amd != 'undefined' && typeof definetmp != 'undefined') {
                        Object.assign(define, {'amd': definetmp});
                    }
                } else {
                    console.log(data);
                    if (ifDebug) {
                        alert(data.sMsg);
                    }
                }
            });
        }
        //如果已经引进了jweixin-1.0.0.js
        if (typeof define != 'undefined' && typeof define.amd != 'undefined') {
            var definetmp = define.amd;
            Object.assign(define, {'amd': false});
        }
        scriptLoader(jssdk, function() {
            getSign(fn, ifDebug, options);
        }, jssdkGetSignatureCharset);
    }
}
window.WXJssdk = new WXJssdkInit();
