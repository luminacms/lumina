<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Cms\Models\CmsCategory;
use Modules\Doc\Models\Document;
use Modules\Doc\Models\Project;

class DocSeed extends Seeder
{

    /**
     * @throws Exception
     */
    public function run()
    {
        DB::table((new Project())->getTable())->truncate();
        DB::table((new Document())->getTable())->truncate();

        $post = factory(Project::class)->times(2)->create()->each(function($pj){
            $pj->documents()->saveMany(factory(Document::class)->times(5)->make());
        });

    }

}
