<?php

namespace Modules\Shop\Models;

use Modules\Core\Traits\HasOrg;
use Illuminate\Support\Facades\DB;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasStatus;

/**
 * Class Order.
 *
 * @package namespace Modules\Shop\Models;
 */
class Order extends BaseModel
{
    use HasOrg, HasCreateBy, HasStatus;

    public $statusName = 'status';

    const TABLE_ORDER_SKUS = 'shop__order_skus';
    const TABLE_ORDER_ADDRESS = 'shop__order_address';

    CONST STATUS_NOPAY = 10; //待确认 (用户下单未付款 或者 货到付款订单商家未确认)
    CONST STATUS_CONFIRMED = 20; //备货中 (用户已付款) 此状态商户才可执行发货操作 (货到付款的订单, 商家需要先确认订单才会进入此状态)
    CONST STATUS_SHIPPING = 30; //已发货 (商家出库、已发货)
    CONST STATUS_CANCEL = 40; //已取消（1.用户未支付并取消订单2.或超时未支付后系统自动取消订单3.或货到付款订单用户拒收）
    CONST STATUS_FINISHED = 50; // 已完成（在线支付订单: 商家发货后, 用户收货、拒收或者15天无物流；货到付款订单: 用户确认收货）

    const STATUS_AFTER_REJECTED = 80; // 退货
    const SATTUS_AFTER_REJECTED_CONFIRMED= 81; // 退货中-商家同意退货
    const SATTUS_AFTER_REJECTED_SHIPPING= 82; // 退货中-用户填写完物流
    const SATTUS_AFTER_REJECTED_CANCEL= 83; // 退货取消
    const SATTUS_AFTER_REJECTED_DONE= 85; // 退货成功

    const STATUS_AFTER_REFUND = 9; // 退款
    const STATUS_AFTER_REFUND_CONFIRMED = 91; // 退款-商家已确认，退款中
    const STATUS_AFTER_REFUND_CANCEL = 92; // 退款-申请取消
    const STATUS_AFTER_REFUND_DONE = 95; // 退款成功

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'shop__orders';
    protected $fillable = [
        'order_id', 'status', 'pre_total_fee', 'total_fee', 'expired_at', 'payed_at', 'oid', 'msg', 'desc',
        'express_company', 'express_no', 'delivery_at', 'receipt_at', 'create_by', 'created_at_ip', 'status_after'
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
            $model->order_id = $model->order_id ?? self::getOrder('order_id');
            $model->created_at_ip = \request()->getClientIp();
        });
    }

    /**
     * order skus
     *
     * @return void
     */
    public function skus()
    {
        return $this->belongsToMany('Modules\Shop\Models\Sku', 'shop__order_skus', 'order_id', 'sku_id', 'order_id', 'uid')
                    ->withPivot('number', 'price_fee', 'subtotal')->with(['spu','specVals']);
    }

    public function address()
    {
        return $this->hasOne('Modules\Shop\Models\OrderAddress', 'order_id', 'order_id')->with('region');
    }


    /**
     * 下单
     *
     * @param array $skus
     * @param [type] $pre_total_fee
     * @param [type] $address
     * @param array $option
     * @return void
     */
    public static function makeOrder($skus = [], $pre_total_fee, $address, $option = [])
    {
        // 校验价格
        $_xtotal = 0;
        $orderSkus = collect();
        foreach($skus as $uid=>$number) {
            $sku = Sku::where('uid', $uid)->first();
            if($sku) {
                $subtotal = $sku->price_fee*$number;
                $orderSkus->push([
                    'sku_id' => $uid,
                    'number' => $number,
                    'price_fee' => $sku->price_fee,
                    'subtotal' => $subtotal
                ]);
                $_xtotal += $subtotal;
            }
        }

        if($_xtotal == $pre_total_fee) {
            // 实际价格跟传值一致
            return DB::transaction(function () use($pre_total_fee, $orderSkus, $address, $option) {
                $order = self::create([
                    'status' => self::STATUS_NOPAY,
                    'pre_total_fee' => $pre_total_fee,
                    'expired_at' => now()->addMinutes(15),
                    'msg' => $option['msg'] ?? ''
                ]);
                $orderSkus = $orderSkus->map(function($item) use($order){
                    return array_merge($item, ['order_id' => $order->order_id]);
                })->toArray();
                DB::table(self::TABLE_ORDER_SKUS)->insert($orderSkus);
                DB::table(self::TABLE_ORDER_ADDRESS)->insert([
                    "order_id" => $order->order_id,
                    "contact_name" => $address['contact_name'],
                    "contact_phone" => $address['contact_phone'],
                    "province" => $address['province'],
                    "city" => $address['city'],
                    "region" => $address['region'],
                    "address" => $address['address'],
                ]);

                return $order;
            });
        }
        return false;
    }

}
