<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;

/**
 * Class Spu.
 *
 * @package namespace Modules\Shop\Models;
 */
class Spu extends BaseModel
{
    use HasOrg, HasCreateBy;

    const TYPE_SINGLE = 1;
    CONST TYPE_MULTIPLE = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__spus';
    protected $fillable = ['uid', 'brand_id', 'category_id', 'status', 'name', 'description', 'unit', 'thumb', 'pic_url','create_by','type'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];
    public $types = [
        self::TYPE_SINGLE => '单规格',
        self::TYPE_MULTIPLE => '多规格'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uid = $model->uid ?? self::getRandomNumber('uid', $model->category->id);
        });
    }

    public function brand()
    {
        return $this->hasOne('Modules\Shop\Models\Brand', 'id', 'brand_id');
    }

    public function category()
    {
        return $this->hasOne('Modules\Shop\Models\Category', 'id', 'category_id');
    }

    public function sku()
    {
        return $this->hasMany('Modules\Shop\Models\Sku', 'spu_id', 'uid');
    }

}
