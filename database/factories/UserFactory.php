<?php

use Faker\Generator as Faker;
use Modules\Core\Models\User;
use Modules\Core\Models\UserAddress;
use Ramsey\Uuid\Uuid;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'mobile' => $faker->phoneNumber,
        'password' => Hash::make('123456'), // secret
        'remember_token' => Str::random(10),
    ];
});

$factory->define(UserAddress::class, function (Faker $faker) {
    $user = User::all();
    return [
        'province'      => $faker->state,
        'city'          => $faker->city,
        'district'      => Str::random(8),
        'userid'       => $user->random(1)->first()->id,
        'address'       => sprintf('第%d街道第%d号', $faker->randomNumber(2), $faker->randomNumber(3)),
        'zip'           => $faker->randomNumber(8),
        'contact_name'  => $faker->name,
        'contact_phone' => $faker->phoneNumber,
    ];
});
