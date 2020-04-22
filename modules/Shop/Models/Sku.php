<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class Sku.
 *
 * @package namespace Modules\Shop\Models;
 */
class Sku extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__skus';
    protected $fillable = ['attrs', 'thumb', 'pics', 'price_fee', 'market_price_fee', 'status', 'create_by'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
