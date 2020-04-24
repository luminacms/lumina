<?php

namespace Modules\Coupon\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;

/**
 * Class Coupon.
 *
 * @package namespace Modules\Coupon\Models;
 */
class Coupon extends BaseModel
{
    use HasOrg, HasCreateBy;

    const TYPE_DEFAULT = 'default';
    const TYPE_PRICEBREAK = 'pb';
    const TYPE_DISCOUNT = 'discount';

    const RANGE_ALL = 'all';
    const RANGE_SKP = 'skp';

    const EXPIRED_TYPE_FIXED = 'fixed'; //固定失效时间
    const EXPIRED_TYPE_DELAY = 'delay'; // 领取之后多久失效

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'coupon__coupons';
    protected $fillable = [
        'oid', 'type', 'status', 'title', 'range', 'expired_type', 'expired_hours',
        'start_at','end_at','times','desc','create_by'
    ];
    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    protected static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $model->uid = self::getUuid('uid');
        });
    }

    public static $typeMap = [
        self::TYPE_DEFAULT => '无条件立减',
        self::TYPE_PRICEBREAK => '满减',
        self::TYPE_DISCOUNT => '折扣券',
    ];
    public static $rangeMap = [
        self::RANGE_ALL => '全场',
        self::RANGE_SKP => '指定商品',
    ];
    public static $expiredtypeMap = [
        self::EXPIRED_TYPE_FIXED => '固定使用期限',
        self::EXPIRED_TYPE_DELAY => '领取优惠券规定使用时限'
    ];

    public function code()
    {
        return $this->hasMany('Modules\Coupon\Models\CouponCode', 'coupon_id', 'uid');
    }

}
