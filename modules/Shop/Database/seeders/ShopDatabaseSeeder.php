<?php

namespace Modules\Shop\Database\seeders;

use Modules\Shop\Models\Spu;
use Modules\Shop\Models\Brand;
use Illuminate\Database\Seeder;
use Modules\Shop\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Modules\Payment\Models\PayTransaction;

class ShopDatabaseSeeder extends Seeder
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

        $this->fakeProductBrand();

        $this->genCategory();
        $this->genSpus();
        $this->genPayments();
    }

    public function fakeProductBrand()
    {
        DB::table((new Brand())->getTable())->truncate();
        Brand::insert([
            ["name" => "联想"],
            ["name" => "小米"],
            ["name" => "鸿基"],
            ["name" => "华为"],
            ["name" => "魅族"],
            ["name" => 'OPPO']
        ]);

    }


    protected function genPayments()
    {
        DB::table((new PayTransaction())->getTable())->truncate();
        $spus = factory(PayTransaction::class)->times(6)->make();
        PayTransaction::insert($spus->toArray());
    }

    protected function genSpus()
    {
        DB::table((new Spu())->getTable())->truncate();
        $spus = factory(Spu::class)->times(500)->make();
        Spu::insert($spus->toArray());
    }

    protected function genCategory()
    {
        // 部门
        $departs = [
            ['name' => '居家生活', 'parentid' => 0, 'id'=>1],
            ['name' => '服饰鞋包','parentid' => 0, 'id'=>2],
            ['name' => '美食酒水','parentid' => 0, 'id'=>3],
            ['name' => '个户清理','parentid' => 0, 'id'=>4],
            ['name' => '母婴亲子','parentid' => 0, 'id'=>5],
            ['name' => '运动旅行','parentid' => 0, 'id'=>6],
            ['name' => '数码家电','parentid' => 0, 'id'=>7],
            ['name' => '床上用品','parentid' => 1, 'id'=>8],
            ['name' => '家居饰品','parentid' => 1, 'id'=>9],
            ['name' => '家具家装','parentid' => 1, 'id'=>10],
            ['name' => '收纳日用','parentid' => 1, 'id'=>11],
            ['name' => '厨房用品','parentid' => 1, 'id'=>12],
            ['name' => '男装','parentid' => 2, 'id'=>13],
            ['name' => '女装','parentid' => 2, 'id'=>14],
            ['name' => '鞋靴','parentid' => 2, 'id'=>15],
            ['name' => '箱包','parentid' => 2, 'id'=>16],
        ];
        DB::table((new Category())->getTable())->truncate();
        foreach ($departs as $_depart) {
            Category::create($_depart);
        }
    }
}
