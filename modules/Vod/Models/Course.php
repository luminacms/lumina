<?php

namespace Modules\Vod\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCount;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;
use Modules\Core\Traits\HasPathTree;

/**
 * Class Course.
 *
 * @package namespace Modules\Vod\Models;
 */
class Course extends BaseModel
{
    use HasPathTree, HasCreateBy, HasCount, HasOrg;

    public $table = 'vod__courses';
    protected $fillable = ['title', 'description', 'price', 'cover', 'content', 'count', 'create_by', 'parentid', 'path', 'level', 'oid', 'status', 'cover_video'];
    protected $attributes = [
        'status' => self::STATUS_UPDATING
    ];

    const STATUS_UPDATING = 'updating';
    const STATUS_FINISHED = 'finished';

    /**
     * @return array
     */
    public function getStatus()
    {
        return [
            self::STATUS_FINISHED => '已完结',
            self::STATUS_UPDATING => '更新中'
        ];
    }

    public static function getStatusLable($status)
    {
        return [

        ];
    }

    public function lesson()
    {
        return $this->hasMany('Modules\Vod\Models\Lesson', 'course_id', 'id');
    }

    /**
     * @return mixed
     */
    public function getOrderPrice()
    {
        return $this->price;
    }

}
