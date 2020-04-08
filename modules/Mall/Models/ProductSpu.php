<?php

namespace Modules\Mall\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class ProductSpu.
 *
 * @package namespace Modules\Mall\Models;
 */
class ProductSpu extends BaseModel
{
    protected $table = 'mall__product_spus';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['brand_id', 'category_id', 'status', 'name', 'description', 'unit', 'thumb', 'pic_url', 'price_fee', 'market_price_fee','create_by'];

    public function skus()
    {
        return $this->hasMany('Modules\Mall\Models\ProductSku', 'spu_id', 'id');
    }

}
