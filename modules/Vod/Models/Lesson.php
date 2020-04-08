<?php

namespace Modules\Vod\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCount;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;

/**
 * Class Lesson.
 *
 * @package namespace Modules\Vod\Models;
 */
class Lesson extends BaseModel
{
    use HasOrg, HasCount, HasCreateBy;

    public $hashConnect = 'vod';
    public $table = 'vod__lessons';

    const TYPE_VIDEO = 'video';
    const TYPE_AUDIO = 'audio';

    const PAY_TYPE_PARENT = 'parent';
    const PAY_TYPE_FREE = 'free';
    const PAY_TYPE_SELF = 'self';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['course_id', 'title', 'cover', 'price', 'content', 'start_at', 'count', 'sort', 'create_by', 'length', 'type', 'media_src', 'oid', 'description', 'pay_type'];

    /**
     * @return array
     */
    public static function getPayTypes()
    {
        return [
            self::PAY_TYPE_PARENT => '专栏付费',
            self::PAY_TYPE_FREE => '免费',
            self::PAY_TYPE_SELF => '单独付费'
        ];
    }
    /**
     * @return array
     */
    public static function getTypes()
    {
        return [
            self::TYPE_VIDEO => '视频',
            self::TYPE_AUDIO => '音频'
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function course()
    {
        return $this->belongsTo('Modules\Vod\Models\Course', 'course_id', 'id');
    }

    public function getOrderPrice()
    {
        return $this->price;
    }

}
