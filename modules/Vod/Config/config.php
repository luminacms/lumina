<?php

return [
    'name' => 'Vod',
    'order_expired' => 15, //vod  订单失效时间（分钟）
    'options' => [
        // 头条小程序支付
        ['name' => 'VOD_MINIAPP_TT_PAY_MERCHANT_ID', 'label' => '商户号', 'default' => '1900019400'],
        ['name' => 'VOD_MINIAPP_TT_PAY_APPD_ID', 'label' => 'app_id', 'default' => '800194008359'],
        ['name' => 'VOD_MINIAPP_TT_PAY_SECRET', 'label' => '支付secret', 'default' => '9upm05kd1xe38h9smekyv9pufrntc7y1z958sed6'],
        ['name' => 'VOD_MINIAPP_TT_EXPIRED_TIME', 'label' => '订单失效时间（单位秒）', 'default' => '15']
    ]
];
