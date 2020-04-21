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
}
