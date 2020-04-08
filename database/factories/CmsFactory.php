<?php

use Faker\Generator as Faker;

$factory->define(\Modules\Cms\Models\Post::class, function (Faker $faker) {
    $_cateall = \Modules\Cms\Models\CmsCategory::all();
    return [
        'category_id' => $_cateall->random(1)->first()->id,
        'title' => $faker->text(30),
        'content' => $faker->realText(800),
        'create_by' => 1
    ];
});