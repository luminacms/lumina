```php

// https://github.com/yansongda/laravel-pay
use HasPayment;


// 下单返回交易ID
$out_trade_no = PayTransaction::makeTransaction($app_id, $driver, $gateway, $model_order_id, $pre_total_fee)

// 发起支付
$payload = [
    'out_trade_no' => $out_trade_no, 
    'subject' => '【专栏】'.$model->title,
    'total_amount' => $order->price,
];
Pay::alipay()->app($payload)->getContent(),






```
