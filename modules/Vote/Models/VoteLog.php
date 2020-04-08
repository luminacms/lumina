<?php

namespace Modules\Vote\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class VoteLog.
 *
 * @package namespace Modules\Vote\Models;
 */
class VoteLog extends BaseModel
{
    use HasCreateBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'vote__logs';
    protected $fillable = ['create_by', 'vote_id', 'subject_id', 'option_id', 'create_ip', 'agent', 'count', 'deviceid'];


    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->agent = request()->userAgent();
            $model->create_ip = request()->getClientIp();
        });
    }

    /**
     * @param $deviceid
     * @param $option
     * @return mixed
     */
    public static function recordLog($deviceid, $option)
    {
        return self::create([
            'vote_id' => $option['vote_id'],
            'subject_id' => $option['subject_id'],
            'option_id' => $option['id'],
            'count' => $option['count'],
            'deviceid' => $deviceid
        ]);
    }

}
