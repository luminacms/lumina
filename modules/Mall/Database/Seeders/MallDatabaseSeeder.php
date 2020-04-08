<?php

namespace Modules\Mall\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Mall\Models\ProductBrand;

class MallDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->fakeProductBrand();
        // $this->call("OthersTableSeeder");
    }

    public function fakeProductBrand()
    {
        factory(ProductBrand::class, 30)->create();

    }
}
