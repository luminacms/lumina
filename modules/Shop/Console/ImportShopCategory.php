<?php
/*
 *  更新产品分类
 */

namespace Modules\Shop\Console;

use Illuminate\Console\Command;
use Modules\Shop\Models\Category;
use Illuminate\Support\Facades\DB;
use Rap2hpoutre\FastExcel\FastExcel;

class ImportShopCategory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'biu:shop_import_category';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'update shop category';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        ini_set("memory_limit", "2000M");
        set_time_limit(0);
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $file = storage_path('data/shop_category.xlsx');

        $data = (new FastExcel)->import($file);

        $no = 0;

        DB::table("shop__categories")->truncate();
        foreach($data as $_item) {
            if(!$_item['first_name']) continue;

            $first = Category::firstOrCreate(['name' => $_item['first_name']], ['parentid' => 0]);
            if($_item['second_name']) {
                // 二级类目
                $secend = Category::firstOrCreate(['name' => $_item['second_name']], ['parentid' => $first->id]);
                if($_item['third_name']) {
                    // 三级
                    Category::firstOrCreate(['name' => $_item['third_name']], ['parentid' => $secend->id]);
                }
            }
            $no ++;
        }

    }


}
