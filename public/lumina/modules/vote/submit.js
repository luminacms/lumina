layui.extend({
    'fingerprint': 'libs/fingerprint'
}).define(['fingerprint'], function(exports){
    var fingerprint = layui.fingerprint;
    var deviceid = undefined;
    var Submit = {

         fingerprintReport: function () {
             fingerprint.get(function(components) {
                 deviceid = fingerprint.x64hash128(components.map(function (pair) { return pair.value }).join(), 31)
            })
        },
        setDeviceId: function(){
            if (window.requestIdleCallback) {
                deviceid = requestIdleCallback(this.fingerprintReport)
            } else {
                deviceid = setTimeout(this.fingerprintReport, 500)
            }
        },
        render: function(option){
            this.setDeviceId();

            $(option.elem).click(function(){
                if(deviceid === undefined){
                    this.setDeviceId();
                    return;
                }
                $.post(option.url, $.extend(option.data, {'deviceid': deviceid}), function(res) {
                    (typeof option.done==='function')&&option.done(res)
                })
            })
        }
    }
    exports('submit', Submit)
})