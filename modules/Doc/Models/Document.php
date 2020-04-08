<?php

namespace Modules\Doc\Models;

use Cache;
use Carbon\Carbon;
use Modules\Core\Traits\HasCreateBy;

/**
 * Modules\Doc\Models\Document
 *
 * @mixin \Eloquent
 * @property integer $id
 * @property string $title 文档名称
 * @property integer $parentid 父ID
 * @property integer $project_id 所属项目
 * @property integer $sort 排序
 * @property string $content 文档内容
 * @property string $created_at
 * @property integer $create_by
 * @property string $updated_at
 * @property integer $modify_by
 * @property string $version 当前时间戳
 * @method static \Illuminate\Database\Query\Builder|Document whereDocId($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereDocName($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereParentId($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereProjectId($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereDocSort($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereDocContent($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereCreateTime($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereCreateAt($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereModifyTime($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereModifyAt($value)
 * @method static \Illuminate\Database\Query\Builder|Document whereVersion($value)
 */
class Document extends ModelBase
{
    use HasCreateBy;
    protected $table = 'doc__document';
    protected $dateFormat = 'Y-m-d H:i:s';
    protected $guarded = ['id'];

    public $timestamps = false;

    /**
     * 从缓存中获取指定的文档
     * @param $id
     * @param bool $update 是否强制更新缓存
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|null|Document|Document[]
     */
    public static function getDocumentFromCache($id,$update = false)
    {
        $key = 'document.id.'.$id;
        $document = $update or Cache::get($key);

        if(empty($document) or $update){
            $document = Document::find($id);
            $expiresAt = Carbon::now()->addHour(12);

            Cache::put($key,$document,$expiresAt);
        }
        return $document;
    }

    /**
     * 从换成中获取解析后的文档内容
     * @param int $id
     * @param bool $update
     * @return bool|string
     */
    public static function getDocumnetHtmlFromCache($id,$update = false)
    {
        $key = 'document.html.' . $id;

        $html = null;//$update or Cache::get($key);

        if(empty($html)) {
            $document = self::getDocumentFromCache($id, $update);

            if (empty($document)) {
                return false;
            }
            if(empty($document->content)){
                return '';
            }
//            $parsedown = new \Parsedown();
//
//            $html  = $parsedown->text($document->content);

            $html = markdown_converter($document->content);

            $html = str_replace('class="language-','class="',$html);
            $expiresAt = Carbon::now()->addHour(12);

            Cache::put($key,$html,$expiresAt);
        }
        return $html;
    }

    public static function deleteDocument($id)
    {
        $documents = [];
        $doc = Document::find($id);
        if (empty($doc) === false) {
            $documents[] = $doc;
            $recursion = function ($id, $callback) use (&$documents) {
                $docs = Document::where('parentid', '=', $id)->get();

                foreach ($docs as $doc) {
                    $documents[] = $doc;
                    $callback($doc->id, $callback);
                }

            };
            $recursion($doc->id, $recursion);
        }
        foreach ($documents as $document){
            $document->delete();
        }
        return true;
    }
}
