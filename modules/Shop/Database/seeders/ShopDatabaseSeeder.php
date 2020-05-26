<?php

namespace Modules\Shop\Database\seeders;

use Modules\Shop\Models\Spu;
use Modules\Shop\Models\Brand;
use Illuminate\Database\Seeder;
use Modules\Shop\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
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
        Artisan::call('biu:shop_import_category');
    }
}
