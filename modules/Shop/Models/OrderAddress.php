<?php

namespace Modules\Shop\Models;

use Modules\Core\Traits\HasOrg;
use Illuminate\Support\Facades\DB;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Order.
 *
 * @package namespace Modules\Shop\Models;
 */
class OrderAddress extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'shop__order_address';
    protected $fillable = [
        'order_id', 'status', 'pre_total_fee', 'total_fee', 'expired_at', 'payed_at', 'oid',
        'express_company', 'express_no', 'delivery_at', 'receipt_at', 'create_by', 'created_at_ip'
    ];

}
