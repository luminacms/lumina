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
    protected $fillable = ['brand_id', 'category_id', 'status', 'name', 'description', 'unit', 'thumb', 'pic_url', 'price_fee', 'market_price_fee','create_by'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
