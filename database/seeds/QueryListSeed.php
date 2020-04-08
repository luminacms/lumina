<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Querylist\Models\QlPost;
use Modules\Querylist\Models\QlRule;

class QueryListSeed extends Seeder
{

    /**
     * @throws Exception
     */
    public function run()
    {
        DB::table((new QlRule())->getTable())->truncate();
        DB::table((new QlPost())->getTable())->truncate();

        $rule = QlRule::create([
            'title' => '第一条抓取规则',
            'type' => 'simple',
            'url' => 'http://www.tongchuan.gov.cn/html/zxzx/tcyw/index.html',
            'rules' => '{"list":"{\r\n    \"title\": [\".zilist_rlb>ul>li>a\",\"title\"],\r\n    \"link\": [\".zilist_rlb>ul>li>a\",\"href\"]\r\n}","body":"{\r\n    \"title\": [\".zxshow_nr .zishow_tit\",\"text\"],\r\n    \"content\": [\".zxshow_nr .show_jj\",\"html\",\"-script\"]\r\n}"}'
        ]);



    }

}
