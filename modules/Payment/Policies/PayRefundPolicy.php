<?php

namespace Modules\Payment\Policies;

use Modules\Core\Models\User;
use Modules\Payment\Models\PayRefund;

class PayRefundPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocPayRefund.
     *
     * @param  User  $user
     * @param  PayRefund  $payrefund
     * @return mixed
     */
    public function view(User $user, PayRefund $payrefund)
    {
        //
    }

    /**
     * Determine whether the user can create DocPayRefundPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPayRefund.
     *
     * @param  User  $user
     * @param  PayRefund  $payrefund
     * @return mixed
     */
    public function update(User $user, PayRefund $payrefund)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPayRefund.
     *
     * @param  User  $user
     * @param  PayRefund  $payrefund
     * @return mixed
     */
    public function delete(User $user, PayRefund $payrefund)
    {
        //
    }
}
