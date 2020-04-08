<?php

namespace Modules\Vod\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class VodLike.
 *
 * @package namespace Modules\Vod\Models;
 */
class VodLike extends BaseModel
{
    use HasCreateBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'vod__likes';
    protected $fillable = ['model_type', 'model_id', 'create_by'];

    /**
     * @param $model_type
     * @param $model_id
     * @return mixed
     */
    public static function isLike($model_type, $model_id)
    {
        return auth()->guest()?false:self::where([
            ['model_id', $model_id],
            ['model_type', $model_type],
            ['create_by', auth()->user()->getKey()]
        ])->exists();
    }

}
