<?php

namespace Modules\Shop\Models;

use Modules\Core\Traits\HasOrg;
use Illuminate\Support\Facades\DB;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasRegion;

/**
 * Class Order.
 *
 * @package namespace Modules\Shop\Models;
 */
class OrderAddress extends BaseModel
{
    use HasRegion;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'shop__order_address';
    protected $fillable = [
        'order_id', 'contact_name', 'contact_phone', 'province', 'city', 'region_id', 'address'
    ];

}
