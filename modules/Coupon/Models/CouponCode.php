<?php

namespace Modules\Coupon\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class CouponCode.
 *
 * @package namespace Modules\Coupon\Models;
 */
class CouponCode extends BaseModel
{
    use HasCreateBy;

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
    protected $fieldSearchable = ['code' => 'like'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $model->code = self::getUuid('code', 32);
        });
    }

    public function ownerBy()
    {
        return $this->hasOne('Modules\Core\Models\User', 'owner_by', 'userid')->withDefault();
    }


    public static function genCode($coupon_id, $num)
    {


    }

}
