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
    use HasCreateBy;

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
    protected $fieldSearchable = [
        'uid' => '='
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uid = $model->uid ?? self::getRandomNumber('uid', $model->spu->id);
        });
    }

    /**
     * sku对应属性
     *
     * @return void
     */
    public function specVals()
    {
        return $this->belongsToMany('Modules\Shop\Models\SpecValue', 'shop__skus_spec', 'sku_id', 'spec_val_id', 'uid', 'id');
    }

    /**
     * spu
     *
     * @return void
     */
    public function spu()
    {
        return $this->hasOne('Modules\Shop\Models\Spu', 'uid', 'spu_id');
    }

}
