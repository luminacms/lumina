<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2016/11/10 0010
 * Time: 18:41
 */

namespace Modules\Doc\Observers;

use Cache;
use Carbon\Carbon;
use Modules\Doc\Models\Document;
use Modules\Doc\Models\Project;

/**
 * 项目模型观察者
 * Class ProjectObservers
 * @package Modules\Doc\Observers
 */
class ProjectObservers
{
    public function creating(Project $project)
    {
        $project->created_at = date('Y-m-d H:i:s');
    }

    public function updating(Project $project)
    {
        $project->updated_at = date('Y-m-d H:i:s');
        $key = 'project.id.' . $project->project_id;
        Cache::forget($key);
    }
    public function updated(Project $project)
    {
        $key = 'project.id.' . $project->project_id;

        $expiresAt = Carbon::now()->addHour(12);

        Cache::put($key,$project,$expiresAt);
    }

    public function created(Project $project)
    {
        $key = 'project.id.' . $project->project_id;

        $expiresAt = Carbon::now()->addHour(12);

        Cache::put($key,$project,$expiresAt);

        $document = new Document();
        $document->title = '空白文档';
        $document->create_by = $project->create_by;
        $document->created_at = $project->created_at;
        $document->sort = 0;
        $document->parentid = 0;
        $document->project_id = $project->project_id;
        $document->save();
    }

    public function deleted(Project $project)
    {
        $key = 'project.id.' . $project->project_id;
        Cache::forget($key);
    }
}
