<?php

namespace Modules\Vote\Models;

use Facade\Ignition\QueryRecorder\Query;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class VoteData.
 *
 * @package namespace Modules\Vote\Models;
 */
class VoteData extends BaseModel
{
    use HasCreateBy;

    public $table = 'vote__datas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['vote_id', 'create_by', 'score', 'name', 'nickname', 'mobile', 'address', 'company', 'visit_no', 'invited_by', 'create_ip', 'agent', 'fields'];
    protected $hidden = ['create_ip', 'agent'];
    protected $casts = [
        'fields' => 'array'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->agent = request()->userAgent();
            $model->create_ip = request()->getClientIp();
        });
    }

    /**
     * @param $id
     * @param int $limit
     * @param string $sortedBy
     * @return mixed
     */
    public static function getRank($id, $limit = 15, $sortedBy = 'desc', $mobileValidate = false)
    {
        return self::where([
            ['vote_id', $id],
            ['create_by', '<>', '']
        ])->when($mobileValidate, function ($query, $mobileValidate) {
            return $query->whereNotNull('mobile');
        })->orderBy('score', $sortedBy)->limit($limit)->get();
    }

}
