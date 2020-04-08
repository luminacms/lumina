<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Mall\Models\ProductCategory;
use Modules\Mall\Models\ProductSpu;
use Modules\Payment\Models\PayTransaction;

class MallSeed extends Seeder
{

    /**
     * @throws Exception
     */
    public function run()
    {
        $this->genCategory();
        $this->genSpus();
        $this->genPayments();


    }

    protected function genPayments()
    {
        DB::table((new PayTransaction())->getTable())->truncate();
        $spus = factory(PayTransaction::class)->times(6)->make();
        PayTransaction::insert($spus->toArray());
    }

    protected function genSpus()
    {
        DB::table((new ProductSpu())->getTable())->truncate();
        $spus = factory(ProductSpu::class)->times(500)->make();
        ProductSpu::insert($spus->toArray());
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
        DB::table((new ProductCategory())->getTable())->truncate();
        foreach ($departs as $_depart) {
            ProductCategory::create($_depart);
        }
    }
}
