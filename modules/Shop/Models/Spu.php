<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class Spu.
 *
 * @package namespace Modules\Shop\Models;
 */
class Spu extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__spus';
    protected $fillable = ['uid', 'brand_id', 'category_id', 'status', 'name', 'description', 'unit', 'thumb', 'pic_url', 'price_fee', 'market_price_fee','create_by'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uid = $model->uid ?? self::getRandom('uid', 8, true);
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
