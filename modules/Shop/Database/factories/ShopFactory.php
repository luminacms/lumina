<?php

use Faker\Generator as Faker;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Modules\Core\Models\User;
use Modules\Payment\Models\PayTransaction;
use Ramsey\Uuid\Uuid;


$factory->define(\Modules\Shop\Models\Spu::class, function (Faker $faker) {
    $cate = \Modules\Shop\Models\Category::all();
    return [
        'name' => $faker->text(15),
        'thumb' => 'http://temp.im/300x300/'.Arr::random([
            '4CD964/fff',
            'FF9500/000',
            'FF2D55/000',
            '007AFF/fff',
            '3C3C3C/fff'
        ]),
        'category_id' => $cate->random(1)->first()->id,
        'description' => $faker->realText(500),
        'price_fee' => $faker->randomNumber(4),
        'create_by' => User::first()->userid
    ];
});


$factory->define(PayTransaction::class, function (Faker $faker) {
    return [
        'oid' => 1,
        'transaction_id' => Uuid::uuid4()->getHex(),
        'status' => Arr::random([PayTransaction::STATUS_SUCCESS, PayTransaction::STATUS_NOPAY]),
        'model_type' => get_class(new \Modules\Shop\Models\Spu()),
        'model_order_id' => now()->addDays(rand(-20, 20))->format('YmdHis').now()->timestamp,
        'pay_driver' => 'Wechat',
        'pay_gateway' => 'miniapp',
        'pre_total_fee' => $faker->randomNumber(4),
        'total_fee' => $faker->randomNumber(4),
        'fee_type' => 'CNY',
        'expired_at' => now()->addMinutes(rand(10, 20)),
        'transaction_code' => Str::random(32),
        'payment_at' => now()->addMinutes(rand(5, 10)),
        'create_ip' => '0.0.0.0',
        'create_by' => User::first()->userid
    ];
});
