<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2016/11/10 0010
 * Time: 18:37
 */

namespace Modules\Doc\Observers;

use Cache;
use Carbon\Carbon;
use Modules\Doc\Models\Document;
use Modules\Doc\Models\DocumentHistory;
use Modules\Doc\Models\Project;

/**
 * 文档更改的观察者
 * Class DocumentObservers
 * @package Modules\Doc\Observers
 */
class DocumentObservers
{
    public function creating(Document $document)
    {
        $document->created_at =  date('Y-m-d H:i:s');
    }

    public function created(Document $document)
    {
        $project = Project::find($document->project_id);
        if($project){
            $project->doc_count = Document::where('project_id','=',$document->project_id)->count();
            $project->save();
        }

        $key = 'document.id.'.$document->id;
        $expiresAt = Carbon::now()->addHour(12);

        Cache::put($key,$document,$expiresAt);
    }

    public function updating(Document $document)
    {
        $document->updated_at =  date('Y-m-d H:i:s');

        Cache::forever('document.'.$document->id,$document);
    }

    /**
     * 当文档更新后执行
     * @param Document $document
     */
    public function updated(Document $document)
    {
        $create_by = $document->modify_by;

        if(empty($create_by)){
            $create_by = 0;
        }
        $enableHistory = wiki_config('ENABLED_HISTORY');

        $document = Cache::pull('document.'.$document->id);

        if($enableHistory && $document instanceof Document){
            $history = new DocumentHistory();
            $history->id = $document->id;
            $history->title = $document->title;
            $history->parentid = $document->parentid;
            $history->content = $document->content;
            $history->modify_by = $document->modify_by;
            $history->updated_at = $document->updated_at;
            $history->version = $document->version;
            $history->created_at = date('Y-m-d H:i:s');
            $history->create_by = $create_by;
            $history->save();
        }
        $key = 'document.id.'.$document->id;

        $expiresAt = Carbon::now()->addHour(12);

        Cache::put($key,$document,$expiresAt);
    }

    /**
     * 当文档被删除事删除保存的文档历史
     * @param Document $document
     */
    public function deleted(Document $document)
    {
        $project = Project::find($document->project_id);
        if($project){
            $project->doc_count = Document::where('project_id','=',$document->project_id)->count();
            $project->save();
        }
        
        DocumentHistory::where('id','=',$document->id)->delete();
        $key = 'document.id.'.$document->id;
        Cache::forget($key);
    }
}