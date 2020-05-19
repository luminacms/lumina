<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;

/**
 * Class Order.
 *
 * @package namespace Modules\Shop\Models;
 */
class Order extends BaseModel
{
    use HasOrg, HasCreateBy;

    CONST STATUS_NOPAY = 1; //待确认 (用户下单未付款 或者 货到付款订单商家未确认)
    CONST STATUS_CONFIRMED = 2; //备货中 (用户已付款) 此状态商户才可执行发货操作 (货到付款的订单, 商家需要先确认订单才会进入此状态)
    CONST STATUS_SHIPPING = 3; //已发货 (商家出库、已发货)
    CONST STATUS_CANCEL = 4; //已取消（1.用户未支付并取消订单2.或超时未支付后系统自动取消订单3.或货到付款订单用户拒收）
    CONST STATUS_FINISHED = 5; // 已完成（在线支付订单: 商家发货后, 用户收货、拒收或者15天无物流；货到付款订单: 用户确认收货）

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'shop__orders';
    protected $fillable = [
        'order_id', 'status', 'pre_total_fee', 'total_fee', 'expired_at', 'payed_at', 'oid',
        'express_company', 'express_no', 'delivery_at', 'receipt_at', 'create_by', 'created_at_ip'
    ];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [
        'order_id' => '='
    ];
    public static $status = [
        self::STATUS_NOPAY => '待付款',
        self::STATUS_CONFIRMED => '待发货',
        self::STATUS_SHIPPING => '已发货',
        self::STATUS_CANCEL => '已取消',
        self::STATUS_FINISHED => '已完成'
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function($model) {
            $model->order_id = $model->order_id ?? self::getRandomNumber('order_id');
            $model->created_at_ip = \request()->getClientIp();
        });
    }

}
