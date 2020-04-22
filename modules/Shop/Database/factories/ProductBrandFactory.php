<?php

use Faker\Generator as Faker;

$factory->define(\Modules\Mall\Models\ProductBrand::class, function (Faker $faker) {
    $brandName = $faker->randomElement([
        "联想","小米","鸿基","华为","魅族",'OPPO'
    ]);

    return [
        'create_by'       => 1,
        'name' =>   $brandName,
    ];
});
