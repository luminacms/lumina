<?php

namespace Modules\Coupon\Policies;

use Modules\Core\Models\User;
use Modules\Coupon\Models\Coupon;
use Modules\Core\Policies\BasePolicy;

class CouponPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocCoupon.
     *
     * @param  User  $user
     * @param  Coupon  $coupon
     * @return mixed
     */
    public function view(User $user, Coupon $coupon)
    {
        //
    }

    /**
     * Determine whether the user can create DocCouponPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocCoupon.
     *
     * @param  User  $user
     * @param  Coupon  $coupon
     * @return mixed
     */
    public function update(User $user, Coupon $coupon)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocCoupon.
     *
     * @param  User  $user
     * @param  Coupon  $coupon
     * @return mixed
     */
    public function delete(User $user, Coupon $coupon)
    {
        //
    }
}
