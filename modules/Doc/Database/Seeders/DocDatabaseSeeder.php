<?php

namespace Modules\Doc\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DocDatabaseSeeder extends Seeder
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
