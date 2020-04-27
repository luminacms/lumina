<?php

namespace Modules\Coupon\Http\Controllers\Interfaces;

use Illuminate\Http\Request;
use Modules\Coupon\Models\CouponCode;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Coupon\Http\Resources\CouponMyCodeResource;
use Modules\Coupon\Http\Resources\CouponResource;
use Modules\Coupon\Models\Coupon;

/**
 * Class CouponCodeController.
 *
 * @package namespace Modules\Coupon\Http\Controllers;
 */
class CouponCodeController extends BaseController
{
    protected $couponCode;
    protected $request;
    public function __construct(CouponCode $couponCode, Request $request)
    {
        $this->couponCode = $couponCode;
        $this->request = $request;

        $request->validate(['oid' => 'required']);
    }

    /**
     * 获取优惠码
     *
     * @return void
     */
    public function code()
    {
        $this->request->validate(['coupon_id' => 'required']);

        $ids = explode(',', $this->request->get('coupon_id'));

        $data = [];
        if(count($ids) == 1) {
            $data = [$ids[0] =>  CouponCode::getCode($ids[0])];
        }else{
            foreach($ids as $_id) {
                $data = array_merge($data, [$_id => CouponCode::getCode($_id)]);
            }
        }
        return $this->toResponse($data);
    }

    /**
     * 领取优惠码
     *
     * @param Request $request
     * @return void
     */
    public function receive()
    {
        $this->request->validate(['code' => 'required']);

        $code = $this->couponCode->where('code', $this->request->get('code'))->firstOrFail();
        $this->authorize('receive', $code);

        $r = $code->update([
            'owner_by' => $this->request->user()->userid,
            'received_at' => now()
        ]);

        return $this->toResponse($r, 'success');
    }

    /**
     * 我的优惠码
     *
     * @return void
     */
    public function my()
    {
        $code = $this->couponCode->filter($this->request)->where('owner_by', $this->request->user()->userid)
                ->where('coupon__coupons.oid', request('oid'))
                ->leftJoin('coupon__coupons','coupon__codes.coupon_id','=','coupon__coupons.uid')
                ->select('coupon__codes.*','coupon__coupons.uid','coupon__coupons.oid')
                ->paginate();

        return $this->toCollection($code, CouponMyCodeResource::class);
    }

    /**
     * 核销
     *
     * @return void
     */
    public function use()
    {
        $this->request->validate(['code' => 'required']);

        $code = $this->couponCode->where('code', $this->request->get('code'))->firstOrFail();
        $this->authorize('use', $code);

        $r = $code->update([
            'used_at' => now(),
            'used_at_ip' => $this->request->getClientIp()
        ]);

        return $this->toResponse($r);
    }

}
