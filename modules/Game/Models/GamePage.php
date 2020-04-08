<?php

namespace Modules\Game\Models;

use Illuminate\Support\Str;
use Modules\Core\Traits\HasCount;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class GamePage.
 *
 * @package namespace Modules\Game\Models;
 */
class GamePage extends BaseModel
{
    use HasCreateBy, HasCount;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'game__pages';
    protected $fillable = [
        'game_id', 'mode', 'title', 'desc', 'content', 'content_draft', 'diy_content', 'diy_content_draft',
        'oauth', 'share_img', 'share_title', 'share_desc', 'oid', 'create_by', 'count', 'uid', 'status', 'cover',
        'start_at', 'end_at'
    ];

    const MODE_SOURCE = 'source';
    const MODE_DIY = 'diy';

    const STATUS_UP = 'up'; // 上线
    const STATUS_DOWN = 'down'; //下线

    public static function getModes()
    {
        return [
            self::MODE_SOURCE => '源码模式',
            self::MODE_DIY => 'DIY模式'
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uid = $model->uid ?? self::getRandom('uid', 6, true);
        });
    }

    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = Str::slug($value);
    }

}
