<?php

namespace Modules\Payment\Policies;

use Modules\Core\Models\User;
use Modules\Payment\Models\PayTransactionRepeat;

class PayTransactionRepeatPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocPayTransactionRepeat.
     *
     * @param  User  $user
     * @param  PayTransactionRepeat  $paytransactionrepeat
     * @return mixed
     */
    public function view(User $user, PayTransactionRepeat $paytransactionrepeat)
    {
        //
    }

    /**
     * Determine whether the user can create DocPayTransactionRepeatPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPayTransactionRepeat.
     *
     * @param  User  $user
     * @param  PayTransactionRepeat  $paytransactionrepeat
     * @return mixed
     */
    public function update(User $user, PayTransactionRepeat $paytransactionrepeat)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPayTransactionRepeat.
     *
     * @param  User  $user
     * @param  PayTransactionRepeat  $paytransactionrepeat
     * @return mixed
     */
    public function delete(User $user, PayTransactionRepeat $paytransactionrepeat)
    {
        //
    }
}
