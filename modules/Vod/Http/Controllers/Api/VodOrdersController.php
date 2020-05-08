<?php

namespace Modules\Vod\Http\Controllers\Api;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Models\Criterias\CreateByCriteria;
use Modules\Payment\Models\PayTransaction;
use Modules\Vod\Http\Resources\LikeResource;
use Modules\vod\Http\Resources\VodOrderResource;
use Modules\Vod\Models\VodOrder;

class VodOrdersController extends BaseController
{

    protected $repository;

    public function __construct(VodOrder $repository)
    {
        $this->repository = $repository;
    }


    /**
     * @param Request $request
     * @return mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        $this->repository->pushCriteria(CreateByCriteria::class);
        $courses = $this->repository->paginate($request->get('limit', 15));
        return $this->toCollection($courses, VodOrderResource::class);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function create(Request $request)
    {
        $request->validate([
            'model_type' => 'required',
            'model_id' => 'required'
        ]);

        $res = VodOrder::makeOrder($request->get('model_type'), $request->get('model_id'));

       if(!isset($res['transaction_id'])) {
           return $this->toError(-1, $res['msg']);
       }

       $payload = [
           'app_id' => option('PAYMENT_TTPAY_APPID'),
           'method' => 'tp.trade.confirm',
           'merchant_id' => option('PAYMENT_TTPAY_MERCHANT_ID'),
           'sign' => '',
           'sign_type' => 'MD5',
           'timestamp' => strval(now()->timestamp*1000),
           'trade_no' => $res['transaction_id'],
           'uid' => $res['order']->createBy->socialite[0]->openid ?? now(),
           'total_amount' => 1,
           'pay_channel' => 'ALIPAY_NO_SIGN',
           'pay_type' => 'ALIPAY_APP',
           'risk_info' => '{"ip":'.\request()->getClientIp().'}',
           'params' => json_encode([
               'url' => $res['url']
           ])
       ];

       $payload_sign = Arr::only($payload, ['app_id', 'sign_type', 'timestamp', 'trade_no', 'merchant_id', 'uid', 'total_amount', 'params']);
       ksort($payload_sign);
       $_sk = [];
       foreach ($payload_sign as $key => $value) {
           $_sk[] = $key.'='.$value;
       }

       $payload['sign'] = md5(implode('&', $_sk).option('PAYMENT_TTPAY_SECRET'));
       try{
           $_tt_orderid = $this->__makeToutiaoOrder($payload);
       }catch (\Exception $e){
           return $this->toException($e);
       }
       return $this->toResponse([
           'transaction_id' => $res['transaction_id'],
           'payload'=>$payload,
           'order_id' => $_tt_orderid
       ]);
    }


    /**
     * @param $payload
     * @return |null
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function __makeToutiaoOrder($payload)
    {
        $_api = 'https://tp-pay.snssdk.com/gateway';

        $data = [
            'out_order_no' => $payload['trade_no'],
            'uid' => $payload['uid'],
            'merchant_id' => $payload['merchant_id'],
            'total_amount' => $payload['total_amount'],
            'currency' => 'CNY',
            'subject' => '#'.$payload['trade_no'],
            'body' => '#'.$payload['trade_no'],
            'trade_time' => now()->addSeconds(option('PAYMENT_EXPIRED_TIME'))->timestamp*1000,
            'valid_time' => option('PAYMENT_EXPIRED_TIME'),
            'notify_url' => option('PAYMENT_ALIPAY_NOTIFY_URL'),
            'risk_info' => '{"ip":'.\request()->getClientIp().'}',
            'ext_param' => ''
        ];
        $payload = [
            'app_id' => $payload['app_id'],
            'method' => 'tp.trade.create',
            'charset' => 'utf-8',
            'sign_type' => 'MD5',
            'timestamp' => now()->addSeconds(option('PAYMENT_EXPIRED_TIME'))->timestamp*1000,
            'version' => '1.0',
            'biz_content' => json_encode($data),
        ];

        ksort($payload);
        $_sk = [];
        foreach ($payload as $key => $value) {
            $_sk[] = $key.'='.$value;
        }

        $payload['sign'] = md5(implode('&', $_sk).option('PAYMENT_TTPAY_SECRET'));

        $client = new Client();
        $res = $client->request('POST', $_api, [
            'form_params' => $payload
        ]);
        $respnse = json_decode($res->getBody()->getContents(), true);

        if($respnse['response']['code'] != 10000) {
            abort(500, $respnse['response']['msg'].'：'.(isset($respnse['response']['sub_msg'])?$respnse['response']['sub_msg']:''));
        }
        return $respnse['response']['trade_no'] ?? null;
    }

}
