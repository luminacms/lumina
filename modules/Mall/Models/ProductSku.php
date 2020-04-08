<?php

namespace Modules\Mall\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class ProductSku.
 *
 * @package namespace Modules\Mall\Models;
 */
class ProductSku extends BaseModel
{
    use HasCreateBy;

    protected $table = 'mall__product_skus';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['attrs', 'thumb', 'pics', 'price_fee', 'market_price_fee', 'status', 'create_by'];

    protected $casts = [
        'attrs' => 'array'
    ];

    public function stocks()
    {
        return $this->hasOne('Modules\Mall\Models\ProductSkuStock', 'sku_id', 'id');
    }

}
