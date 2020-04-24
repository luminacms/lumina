<?php

namespace Modules\Coupon\Policies;

use Modules\Core\Models\User;
use Modules\Coupon\Models\CouponCode;
use Modules\Core\Policies\BasePolicy;

class CouponCodePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocCouponCode.
     *
     * @param  User  $user
     * @param  CouponCode  $couponcode
     * @return mixed
     */
    public function view(User $user, CouponCode $couponcode)
    {
        //
    }

    /**
     * Determine whether the user can create DocCouponCodePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocCouponCode.
     *
     * @param  User  $user
     * @param  CouponCode  $couponcode
     * @return mixed
     */
    public function update(User $user, CouponCode $couponcode)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocCouponCode.
     *
     * @param  User  $user
     * @param  CouponCode  $couponcode
     * @return mixed
     */
    public function delete(User $user, CouponCode $couponcode)
    {
        //
    }

    /**
     * 领取优惠码权限验证
     *
     * @param User $user
     * @param CouponCode $couponCode
     * @return void
     */
    public function receive(User $user, CouponCode $couponCode)
    {
        return is_null($couponCode->owner_by);
    }

    /**
     * 使用优惠码
     * 验证：1：自己的码 2：未使用 3：未过期
     *
     * @param User $user
     * @param CouponCode $couponCode
     * @return void
     */
    public function use(User $user, CouponCode $couponCode)
    {
        return $couponCode->owner_by == $user->userid && is_null($couponCode->used_at) && now()->isBefore($couponCode->expired_at);
    }
}
