<?php


namespace Modules\Payment\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Payment\Facades\Pay;
use Modules\Payment\Models\PayTransaction;
use Modules\Payment\Traits\HasPayment;

class CallbackController extends BaseController
{
    use HasPayment;


    /**
     * @param $driver
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function notify($driver)
    {
        $alipay = Pay::$driver();

        try{
            $data = $alipay->verify(); // 是的，验签就这么简单！

            Log::info(json_encode($data));
            // 目前只开放支付宝
            if($driver == 'alipay') {
                // 付款成功
                PayTransaction::updateTransaction($data['out_trade_no'], $data['trade_status'], [
                    'transaction_code' => $data['trade_no'] ?? '',
                    'total_fee' => $data['total_amount'] ?? '',
                    'mch_id' => $data['seller_id'] ?? '',
                    'payment_at' => $data['gmt_payment'],
                    'pay_channel' => $data['fund_bill_list'] ?? '',
                    'buyer_id' => $data['buyer_logon_id']??''
                ]);
            }
        } catch (\Exception $e) {
            return $this->toException($e);
        }

        return $alipay->success();
    }

    /**
     * @param Request $request
     */
    public function return($driver, Request $request)
    {
        Log::info('i am return'.$driver);

        $data = Pay::$driver()->verify(); // 是的，验签就这么简单！

        Log::debug(json_encode($data->all()));
        // 订单号：$data->out_trade_no
        // 支付宝交易号：$data->trade_no
        // 订单总金额：$data->total_amount

    }

}
