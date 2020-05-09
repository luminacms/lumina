<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Sku.
 *
 * @package namespace Modules\Shop\Models;
 */
class Sku extends BaseModel
{
    use HasCreateBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__skus';
    protected $fillable = ['attrs', 'thumb', 'pics', 'price_fee', 'market_price_fee', 'status', 'create_by', 'uid', 'stock', 'weight'];

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

}
