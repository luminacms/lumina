<?php declare(strict_types=1);

namespace Modules\Payment\Traits;

use Carbon\Carbon;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Modules\Payment\Exceptions\DriverNotConfig;
use Modules\Payment\Exceptions\TransactionMakeFialed;
use Modules\Payment\Facades\Pay;
use Modules\Payment\Models\PayTransaction;

/**
 * @package Venturecraft\Revisionable
 */
trait HasPayment
{

    /**
     * @param $order_id
     * @param $driver
     * @param $gateway
     * @param $total_amount
     * @param $title
     * @return mixed
     * @throws DriverNotConfig
     * @throws TransactionMakeFialed
     */
    public function makeTransaction(string $order_id, string $driver, string $gateway, float $total_amount, string $title)
    {
        // 支付代理
        $driver_proxy_map = ['ttpay' => 'alipay'];
        $_driver = isset($driver_proxy_map[$driver])?$driver_proxy_map[$driver]:$driver;
        $_appid = option('PAYMENT_'.strtoupper($_driver).'_APPID');
        if(!$_appid) {
            // 验证支付是否已配置
            throw new DriverNotConfig($_driver);
        }
//        try{
            $transaction = PayTransaction::create([
                'title' => $title,
                'app_id' => $_appid,
                'model_type' => self::getMorphClass(),
                'status' => PayTransaction::STATUS_NOPAY,
                'pay_driver' => $_driver,
                'pay_gateway' => $gateway,
                'model_order_id' => $order_id,
                'pre_total_fee' => $total_amount,
                'expired_at' => now()->addSeconds(intval(option('PAYMENT_EXPIRED_TIME')))
            ]);

            if($transaction) {
                switch ($driver) {
                    case PayTransaction::DRIVER_TTPAY:
                        return $this->_makeToutiaoOrder($transaction);
                        break;
                    case PayTransaction::DRIVER_ALIPAY:
                    case PayTransaction::DRIVER_WECHAT:
                        return Pay::$driver()->$gateway([
                            'out_trade_no' => $transaction['transaction_id'],
                            'subject' => $title,
                            'total_amount' => $total_amount,
                        ]);
                        break;
                }
            }
//        }catch (Exception $e){
//            throw new TransactionMakeFialed('order_id:'.$order_id.';model_type:'.self::getMorphClass());
//        }
    }

    /**
     * 同步订单状态
     * @param $model_type
     * @param $model_id
     */
    public function syncTransaction($model_type, $model_id)
    {
        $trans = PayTransaction::withoutGlobalScopes(['oid'])->where([
            ['model_type', $model_type],
            ['model_order_id', $model_id]
        ])->first();
        try{
            $obj = new $trans->model_type;
            call_user_func_array([$obj, config('payment.model_notice_action')], [$trans->model_order_id, $trans]);
        }catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }


    /**
     * @param $transaction
     * @return mixed
     */
    private function _makeToutiaoOrder($transaction)
    {
        $app_payload = [
            'out_trade_no' => $transaction['transaction_id'],
            'subject' => $transaction['title'],
            'total_amount' => $transaction['pre_total_fee']
        ];
        $ttpayload = [
            'app_id' => option('PAYMENT_TTPAY_APPID'),
            'merchant_id'=> option('PAYMENT_TTPAY_MERCHANT_ID'),
            'timestamp'=> strval(now()->timestamp), // 时间戳，秒
            'sign_type'=> 'MD5',
            'out_order_no'=> $transaction['transaction_id'], // 商户侧订单号
            'total_amount'=> round($transaction['pre_total_fee']*100),
            'product_code'=> 'pay',
            'payment_type'=> 'direct',
            'trade_type'=> 'H5',
            'version'=> '2.0',
            'currency'=> 'CNY',
            'subject'=> $transaction['title'] ?? '-',
            'body'=> $transaction['title'] ?? '-',   //商户订单详情
            'uid'=> auth()->user()->user_id,
            'trade_time'=> Carbon::parse($transaction['created_at'])->timestamp,
            'valid_time'=> option('PAYMENT_EXPIRED_TIME'), // 订单失效时间，单位：秒
            'notify_url'=> url('/callback/payment/alipay/notify/'.$transaction['oid']),
            'alipay_url'=> Pay::alipay()->app($app_payload)->getContent(),
            'wx_type'=> '',
            'wx_url'=> '',
            'risk_info'=> '{"ip":'.\request()->getClientIp().'}',
        ];

        $payload_sign = Arr::only($ttpayload, [
            'merchant_id','app_id', 'sign_type', 'timestamp', 'version','trade_type', 'product_code', 'payment_type',
            'out_order_no', 'uid', 'total_amount', 'currency', 'subject', 'body', 'trade_time', 'valid_time', 'notify_url',
            'alipay_url', 'wx_url', 'wx_type']);

        // 去掉空值
        $payload_sign = Arr::where($payload_sign, function ($value, $key) {
            return !empty($value);
        });

        ksort($payload_sign);
        $_sk = [];
        foreach ($payload_sign as $key => $value) {
            $_sk[] = $key.'='.$value;
        }

        $ttpayload['sign'] = md5(implode('&', $_sk).option('PAYMENT_TTPAY_SECRET'));

        return $ttpayload;
    }

}
