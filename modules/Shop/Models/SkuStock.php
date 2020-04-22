<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class SkuStock.
 *
 * @package namespace Modules\Shop\Models;
 */
class SkuStock extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__sku_stocks';
    protected $fillable = ['sku_id','quantity'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
