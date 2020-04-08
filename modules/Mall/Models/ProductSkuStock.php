<?php

namespace Modules\Mall\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class ProductSkuStock.
 *
 * @package namespace Modules\Mall\Models;
 */
class ProductSkuStock extends BaseModel
{
    protected $table = 'mall__product_sku_stocks';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['sku_id','quantity'];

}
