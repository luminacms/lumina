<?php
return [
    'name' => 'Payment',
    'model_notice_action' => 'PaymentUpdate', // 支付状态变更通知模块
    'alipay' => [
        // optional，默认 warning；日志路径为：sys_get_temp_dir().'/logs/yansongda.pay.log'
        'log' => [
            'file' => storage_path('logs/alipay.log'),
            //  'level' => 'debug'
            //  'type' => 'single', // optional, 可选 daily.
            //  'max_file' => 30,
        ],
        // optional，设置此参数，将进入沙箱模式
        // 'mode' => 'dev',
    ],
    'wechat' => [
        // 客户端证书路径，退款、红包等需要用到。请填写绝对路径，linux 请确保权限问题。pem 格式。
        'cert_client' => '',
        // 客户端秘钥路径，退款、红包等需要用到。请填写绝对路径，linux 请确保权限问题。pem 格式。
        'cert_key' => '',
        // optional，默认 warning；日志路径为：sys_get_temp_dir().'/logs/yansongda.pay.log'
        'log' => [
            'file' => storage_path('logs/wechat.log'),
            //  'level' => 'debug'
            //  'type' => 'single', // optional, 可选 daily.
            //  'max_file' => 30,
        ],
        // optional
        // 'dev' 时为沙箱模式
        // 'hk' 时为东南亚节点
        // 'mode' => 'dev',
    ],
    'options' => [
        ['group' => '通用配置','name' => 'PAYMENT_EXPIRED_TIME', 'label' => '订单失效时间（单位秒）', 'default' => '900'],

        //支付宝==========================
        ['group' => '支付宝', 'name' => 'PAYMENT_ALIPAY_APPID', 'label' => 'app_id', 'default' => ''],
        // 支付宝异步通知地址
        ['group' => '支付宝', 'name' => 'PAYMENT_ALIPAY_NOTIFY_URL', 'label' => 'notify_url', 'default' => url('callback/payment/alipay/notify/:oid'), 'disabled' => true],
        // 支付成功后同步通知地址
        ['group' => '支付宝', 'name' => 'PAYMENT_ALIPAY_RETURN_URL', 'label' => 'return_url', 'default' => url('callback/payment/alipay/return/:oid'), 'disabled' => true],
        // 阿里公共密钥，验证签名时使用
        ['group' => '支付宝', 'name' => 'PAYMENT_ALIPAY_PUBLIC_KEY', 'label' => 'ali_public_key', 'default' => ''],
        // 自己的私钥，签名时使用
        ['group' => '支付宝', 'name' => 'PAYMENT_ALIPAY_PRIVATE_KEY', 'label' => 'private_key', 'default' => ''],

        // 微信支付==========================
        ['group' => '微信支付', 'name' => 'PAYMENT_WECHAT_APPID', 'label' => 'APP 引用的 appid', 'default' => ''],
        ['group' => '微信支付', 'name' => 'WECHAT_APP_ID', 'label' => '公众号 APPID', 'default' => ''],
        ['group' => '微信支付', 'name' => 'WECHAT_MINIAPP_ID', 'label' => '小程序 APPID', 'default' => ''],
        ['group' => '微信支付', 'name' => 'PAYMENT_WECHAT_MCH_ID', 'label' => '商户号', 'default' => ''],
        ['group' => '微信支付', 'name' => 'PAYMENT_WECHAT_NOTIFY_URL', 'label' => '微信支付异步通知地址', 'default' => ''],
        ['group' => '微信支付', 'name' => 'PAYMENT_WECHAT_WECHAT_KEY', 'label' => '微信支付签名秘钥', 'default' => ''],

        // 头条支付=========================
        ['group' => '头条支付', 'name' => 'PAYMENT_TTPAY_APPID', 'label' => 'app_id', 'default' => ''],
        ['group' => '头条支付', 'name' => 'PAYMENT_TTPAY_MERCHANT_ID', 'label' => '商户号', 'default' => ''],
        ['group' => '头条支付', 'name' => 'PAYMENT_TTPAY_SECRET', 'label' => '支付secret', 'default' => ''],
    ]
];
