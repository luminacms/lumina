<?php

namespace Modules\Doc\Models;

use DB;
use Modules\Core\Traits\HasCreateBy;

/**
 * Modules\Doc\Models\DocumentHistory
 *
 * @mixin \Eloquent
 * @property integer $history_id
 * @property integer $id 文档ID
 * @property string $title 文档名称
 * @property integer $parentid 父ID
 * @property string $content 文档内容
 * @property string $updated_at
 * @property integer $modify_by
 * @property string $version 当前时间戳
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereHistoryId($value)
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereDocId($value)
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereDocName($value)
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereParentId($value)
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereDocContent($value)
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereModifyTime($value)
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereModifyAt($value)
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereVersion($value)
 * @property string $created_at 历史记录创建时间
 * @property integer $create_by 历史记录创建人
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereCreateTime($value)
 * @method static \Illuminate\Database\Query\Builder|DocumentHistory whereCreateAt($value)
 */
class DocumentHistory extends ModelBase
{
    use HasCreateBy;

    protected $table = 'doc__document_history';
    protected $dateFormat = 'Y-m-d H:i:s';
    protected $guarded = ['history_id'];

    /**
     * 获取指定文档的历史版本
     * @param int $id
     * @param int $pageIndex
     * @param int $pageSize
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public static function getDocumentHistoryByDocumentId($id,$pageIndex = 1, $pageSize = 20)
    {
        $query = DB::table('doc__document_history AS history')
            ->select(['history.*'])
            ->where('history.id','=',$id)
            ->orderBy('history.id','DESC')
            ->paginate($pageSize,['*'],'page',$pageIndex);

        return $query;
    }

    // 保存历史版本
    public static function saveHistory($document) {
        try {
            $exists = DocumentHistory::where('id', $document->id)->orderBy('created_at', 'asc')->get();

            // 历史只保留十条
            if(count($exists) > 9) {
                // 删掉最旧一条
                $oldest = DocumentHistory::where('history_id', $exists[0]->history_id)->delete();
            }

            $member = session_member();
            // 插入历史版本
            $store = new DocumentHistory();
            $store->doc_id = $document->id;
            $store->title = $document->title;
            $store->parentid = $document->parentid;
            $store->content = $document->content;
            $store->modify_by = $document->create_by;
            $store->version = $document->version;

            $store->save();
        }catch (Exception $e){
            report($e);
            return false;
        }
    }

    public function modifyBy()
    {
        return $this->hasOne('Modules\Core\Models\User', 'id', 'modify_by')->withDefault();
    }
}
