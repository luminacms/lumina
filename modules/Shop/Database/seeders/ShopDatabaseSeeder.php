<?php

namespace Modules\Shop\Database\seeders;

use Modules\Shop\Models\Spu;
use Modules\Shop\Models\Brand;
use Illuminate\Database\Seeder;
use Modules\Shop\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Modules\Payment\Models\PayTransaction;
use Modules\Shop\Models\Attribute;
use Modules\Shop\Models\AttributeValue;
use Modules\Shop\Models\Sku;
use Modules\Shop\Models\Spec;
use Modules\Shop\Models\SpecValue;

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
        $this->genAttr();
        // $this->genSpus();
        // $this->genPayments();
    }

    public function genAttr()
    {
        DB::table((new Spec())->getTable())->truncate();
        Spec::insert([
            ["id" => 1, "name" => "颜色"],
            ["id" => 2, "name" => "内存"]
        ]);

        DB::table((new SpecValue())->getTable())->truncate();
        SpecValue::insert([
            ["spec_id" => 1, "value" => "红色"],
            ["spec_id" => 1, "value" => "白色"],
            ["spec_id" => 1, "value" => "黑色"],
            ["spec_id" => 2, "value" => "32G"],
            ["spec_id" => 2, "value" => "64G"],
        ]);
    }

    public function fakeProductBrand()
    {
        DB::table((new Brand())->getTable())->truncate();
        Brand::insert([
            ["name" => "苹果"],
            ["name" => "小米"],
            ["name" => "华为"],
            ["name" => "VIVO"],
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
        $attrv = SpecValue::all();

        DB::table((new Spu())->getTable())->truncate();
        $spus = factory(Spu::class, 10)->create()->each(function($item) use($attrv){
            $sku = $item->sku()->save(factory(Sku::class)->make());
            $sku->attrVals()->attach($attrv->random(rand(1, 3))->pluck('id'));
        });
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
