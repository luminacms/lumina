<?php

namespace Modules\Payment\Models;

use Exception;
use Modules\Core\Traits\HasOrg;
use Modules\Payment\Facades\Pay;
use Modules\Core\Models\BaseModel;
use Illuminate\Support\Facades\Log;
use Modules\Core\Traits\HasCreateBy;
use Illuminate\Database\Eloquent\Builder;
use Modules\Payment\Exceptions\TransactionNotFound;

/**
 * Class PayTransaction.
 *
 * @package namespace Modules\Payment\Models;
 */
class PayTransaction extends BaseModel
{
    use HasCreateBy;

    protected $table = 'payment__transactions';

    const STATUS_NOPAY = 'nopay';
    const STATUS_SUCCESS = 'success';
    const STATUS_FAIL = 'fail';
    const STATUS_REFUND = 'refund';
    const STATUS_CLOSED = 'closed';
    const STATUS_REVOKED = 'revoked';
    const STATUS_PAYERROR = 'payerror';
    const STATUS_FINISHED = 'finished'; //支付完结后不允许对该交易再行操作

    const DRIVER_ALIPAY = 'alipay';
    const DRIVER_WECHAT = 'wechat';
    const DRIVER_TTPAY = 'ttpay';

    /**
     * @return array
     */
    public static  $statusMap = [
        self::STATUS_NOPAY => '未支付',
        self::STATUS_SUCCESS => '支付成功',
        self::STATUS_FAIL => '支付失败',
        self::STATUS_REFUND => '转入退款',
        self::STATUS_CLOSED => '支付关闭',
        self::STATUS_REVOKED => '支付撤销',
        self::STATUS_PAYERROR => '支付错误',
        self::STATUS_FINISHED => '支付完结'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'transaction_id','status','app_id','pay_driver','pay_gateway','pay_channel','total_fee',
        'fee_type','expired_at','return_url','notify_url','trade_no','transaction_code','payment__at','mobile',
        'sing_type', 'intput_charset', 'create_ip', 'model_type', 'model_order_id', 'mch_id', 'pre_total_fee',
        'payment_at', 'oid', 'buyer_id', 'app_id', 'title', 'create_by'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->transaction_id) {
                $model->transaction_id = self::getRandomByTime('transaction_id');
            }
            $model->create_ip = request()->ip();
            $model->oid = $model->oid ?? \request('oid', request()->header('oid'));
        });
        static::updated(function($model) {
            try{
                $obj = new $model->model_type;
                call_user_func_array([$obj, config('payment.model_notice_action')], [$model->model_order_id, $model]);
            }catch (Exception $e) {
                Log::error($e->getMessage());
            }
        });
        static::addGlobalScope('oid', function (Builder $builder){
            $_oid = \request('oid', request()->header('oid')) ?? session('__org.oid');
            $builder->where('oid', $_oid ?? '-1'); //option使用默认组织，其他默认不存在
        });
    }

    /**
     * @param $status
     * @return mixed|string
     */
    public static function getStatusLabel($status)
    {
        $_status_color_map = [
            self::STATUS_NOPAY => 'bg-gray-600',
            self::STATUS_SUCCESS => 'bg-green-600',
            self::STATUS_FAIL => 'bg-red-600',
            self::STATUS_REFUND => 'bg-yellow-600',
            self::STATUS_CLOSED => 'bg-gray-500',
            self::STATUS_REVOKED => 'bg-gray-800',
            self::STATUS_PAYERROR => 'bg-red-600'
        ];
        $_status_color = isset($_status_color_map[$status])?$_status_color_map[$status]:'bg-gray-600';
        return '<span class="layui-badge '.$_status_color.'">'.(self::getStatus()[$status]??'未知').'</span>';
    }

    /**
     * @param $model_type //当前模型
     * @param $app_id // 商户app_id
     * @param $driver // 支付方式
     * @param $gateway // 支付渠道
     * @param $model_order_id // 当前模型订单号
     * @param $pre_total_fee // 订单金额
     * @return string
     */
    public static function makeTransaction($model_type, $app_id, $driver, $gateway, $model_order_id, $pre_total_fee)
    {
        $trans = self::create([
            'app_id' => $app_id,
            'model_type' => $model_type,
            'status' => self::STATUS_NOPAY,
            'pay_driver' => $driver,
            'pay_gateway' => $gateway,
            'model_order_id' => $model_order_id,
            'pre_total_fee' => $pre_total_fee,
            'expired_at' => now()->addMinutes(config('payment.expired_time'))
        ]);
        return $trans?$trans['transaction_id']:'';
    }

    /**
     * @param $transaction_id
     * @param $status
     * @param $data
     * @throws TransactionNotFound
     */
    public static function updateTransaction($transaction_id, $status, $data)
    {
        $trans = self::withoutGlobalScopes(['oid'])->where('transaction_id', $transaction_id)->first();
        if(!$trans) {
            throw new TransactionNotFound('#'.$transaction_id.'['.$status.']'.json_encode($data));
        }
        $_status_map = config('payment')[$trans['pay_driver']]['statusMap'] ?? [];
        return $trans->update(array_merge($data, ['status' => $_status_map[$status] ?? $status ]));
    }

    /**
     * 更新交易信息
     *
     * @return void
     */
    public function syncTransation()
    {
        try{
            $_driver = $this->pay_driver;
            $sync = Pay::$_driver();

            $find = $sync->find(['out_trade_no' => $this->transaction_id]);

            if($find['trade_status'] == 'TRADE_SUCCESS') {
                return self::updateTransaction($this->transaction_id, $find['trade_status'], [
                    'transaction_code' => $find['trade_no'] ?? '',
                    'total_fee' => $find['total_amount'] ?? '',
                    'mch_id' => $find['seller_id'] ?? '',
                    'payment_at' => $find['gmt_payment'],
                    'pay_channel' => $find['fund_bill_list'] ?? '',
                    'buyer_id' => $find['buyer_logon_id']??''
                ]);
            }

            return true;
        }catch(Exception $e){
            abort(500, $e);
            return false;
        }
    }
}
