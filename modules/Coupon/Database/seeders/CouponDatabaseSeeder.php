<?php

namespace Modules\Coupon\Database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CouponDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // $this->call("OthersTableSeeder");
    }
}
