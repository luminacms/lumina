<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;

/**
 * Class Sku.
 *
 * @package namespace Modules\Shop\Models;
 */
class Sku extends BaseModel
{
    use HasCreateBy, HasOrg;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__skus';
    protected $fillable = ['spu_id','thumb', 'pics', 'price_fee', 'market_price_fee', 'status', 'create_by', 'uid', 'stock', 'weight'];

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

    public function attrVals()
    {
        return $this->belongsToMany('Modules\Shop\Models\AttributeValue', 'shop__skus_attribute_value', 'sku_id', 'attr_val_id', 'uid', 'id');
    }

}
