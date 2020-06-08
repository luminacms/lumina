<?php

use Modules\Shop\Models\Order;

return [
    'name' => 'OpenShop',
    'options' => [
        //社交登陆 ==========================
        ['group' => '抖音小店', 'name' => 'OPENSHOP_DOUYIN_APPID', 'label' => 'Appkey', 'default' => ''],
        ['group' => '抖音小店', 'name' => 'OPENSHOP_DOUYIN_APP_SECRET', 'label' => 'Appsercet', 'default' => '']
    ],
    'map' => [
        'douyin' => [
            'order' => [
                '0' => 0, //开始
                '1' => Order::STATUS_NOPAY, //待确认 (用户下单未付款 或者 货到付款订单商家未确认)
                '2' => Order::STATUS_CONFIRMED, //备货中 (用户已付款) 此状态商户才可执行发货操作 (货到付款的订单, 商家需要先确认订单才会进入此状态)
                '3' => Order::STATUS_SHIPPING, //已发货 (商家出库、已发货)
                '4' => Order::STATUS_CANCEL, //已取消
                '5' => Order::STATUS_FINISHED, //已完成
                // '6' => ,
                // '7' => '',
                // '8' => '',
                // '9' => '',
                // '10' => '',
                // '11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39'
            ]
        ]
    ]
];
