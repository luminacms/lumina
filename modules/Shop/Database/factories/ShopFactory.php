<?php

use Faker\Generator as Faker;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Modules\Core\Models\User;
use Modules\Payment\Models\PayTransaction;
use Modules\Shop\Models\AttributeValue;
use Modules\Shop\Models\Spu;
use Ramsey\Uuid\Uuid;


$factory->define(\Modules\Shop\Models\Spu::class, function (Faker $faker) {
    $cate = \Modules\Shop\Models\Category::withoutGlobalScope('oid')->get();
    return [
        'uid' => time(),
        'name' => $faker->text(15),
        'thumb' => Arr::random([
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1274727566,4055847375&fm=11&gp=0.jpg',
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3363810843,3231664163&fm=26&gp=0.jpg',
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3245626480,1182662462&fm=26&gp=0.jpg',
        ], 1)[0],
        'oid' => 1,
        'type' => Spu::TYPE_MULTIPLE,
        'category_id' => $cate->random(1)->first()->id,
        'description' => $faker->realText(500),
        'create_by' => User::first()->userid
    ];
});

$factory->define(\Modules\Shop\Models\Sku::class, function (Faker $faker) {
    $pf = rand(2000, 9999);
    return [
        'uid' => time(),
        'price_fee' => $pf,
        'oid' => 1,
        'market_price_fee' => rand(500, 2000),
        'weight' => rand(1, 100),
        'stock' => rand(100, 500)
    ];
});

$factory->define(\Modules\Shop\Models\AttributeValue::class, function (Faker $faker) {
    $av = AttributeValue::all();
    return [
        'attr_val_id' => $av->random(1)->first()->id
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
