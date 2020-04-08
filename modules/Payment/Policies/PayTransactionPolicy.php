<?php

namespace Modules\Payment\Policies;

use Modules\Core\Models\User;
use Modules\Payment\Models\PayTransaction;

class PayTransactionPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocPayTransaction.
     *
     * @param  User  $user
     * @param  PayTransaction  $paytransaction
     * @return mixed
     */
    public function view(User $user, PayTransaction $paytransaction)
    {
        //
    }

    /**
     * Determine whether the user can create DocPayTransactionPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPayTransaction.
     *
     * @param  User  $user
     * @param  PayTransaction  $paytransaction
     * @return mixed
     */
    public function update(User $user, PayTransaction $paytransaction)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPayTransaction.
     *
     * @param  User  $user
     * @param  PayTransaction  $paytransaction
     * @return mixed
     */
    public function delete(User $user, PayTransaction $paytransaction)
    {
        //
    }
}
