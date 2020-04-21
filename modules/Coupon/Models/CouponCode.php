<?php

namespace Modules\Coupon\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class CouponCode.
 *
 * @package namespace Modules\Coupon\Models;
 */
class CouponCode extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'coupon__codes';
    protected $fillable = ['coupon_id', 'status', 'owner_by', 'received_at', 'used_at', 'expired_at'];
    protected $date = ['received_at', 'used_at', 'expired_at'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
