<?php

namespace Modules\Payment\Policies;

use Modules\Core\Models\User;
use Modules\Payment\Models\PayTransactionExtension;

class PayTransactionExtensionPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocPayTransactionExtension.
     *
     * @param  User  $user
     * @param  PayTransactionExtension  $paytransactionextension
     * @return mixed
     */
    public function view(User $user, PayTransactionExtension $paytransactionextension)
    {
        //
    }

    /**
     * Determine whether the user can create DocPayTransactionExtensionPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPayTransactionExtension.
     *
     * @param  User  $user
     * @param  PayTransactionExtension  $paytransactionextension
     * @return mixed
     */
    public function update(User $user, PayTransactionExtension $paytransactionextension)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPayTransactionExtension.
     *
     * @param  User  $user
     * @param  PayTransactionExtension  $paytransactionextension
     * @return mixed
     */
    public function delete(User $user, PayTransactionExtension $paytransactionextension)
    {
        //
    }
}
