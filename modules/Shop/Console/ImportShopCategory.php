<?php
/*
 *  更新产品分类
 */

namespace Modules\Shop\Console;

use Illuminate\Console\Command;
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

        $file = storage_path().'/data/industry.xlsx';

        $data = (new FastExcel)->import($file, function ($line) {
            return [
                'name' => $line['名称'],
                'parentname' => $line['父级名称'] ?? ''
            ];
        });

        DB::table("industries")->truncate();
        $data->each(function($item) {

            $data = ['name' => $item['name']];

            if($item['parentname']) {
                $parent = DB::table("industries")->where('name', $item['parentname'])->first();
                if($parent) {
                    $data['parentid'] = $parent->id;
                }
            }

            DB::table("industries")->updateOrInsert(['name' => $item['name']], $data);
        });

    }


}
