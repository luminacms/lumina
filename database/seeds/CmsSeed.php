<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Cms\Models\CmsCategory;
use Modules\Cms\Models\Post;

class CmsSeed extends Seeder
{

    /**
     * @throws Exception
     */
    public function run()
    {
        $this->genCategory();

        DB::table((new Post())->getTable())->truncate();
        $post = factory(Post::class)->times(500)->make();
        Post::insert($post->toArray());


    }

    protected function genCategory()
    {
        // 部门
        $departs = [
            ['name' => '新闻', 'parentid' => 0, 'id'=>1],
            ['name' => '娱乐','parentid' => 0, 'id'=>2],
            ['name' => '体育','parentid' => 0, 'id'=>3],
            ['name' => '教育','parentid' => 0, 'id'=>4],
            ['name' => '文化','parentid' => 0, 'id'=>5],
            ['name' => '财经','parentid' => 0, 'id'=>6],
            ['name' => '旅游','parentid' => 0, 'id'=>7],
            ['name' => '天下','parentid' => 1, 'id'=>8],
            ['name' => '要闻','parentid' => 1, 'id'=>9],
            ['name' => '电影','parentid' => 2, 'id'=>10],
            ['name' => '综艺','parentid' => 2, 'id'=>11],
            ['name' => '明星','parentid' => 2, 'id'=>12]
        ];
        DB::table((new CmsCategory())->getTable())->truncate();
        foreach ($departs as $_depart) {
            CmsCategory::create($_depart);
        }
    }
}
