<?php

namespace Modules\Payment\Policies;

use Modules\Core\Models\User;
use Modules\Payment\Models\PayLog;

class PayLogPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocPayLog.
     *
     * @param  User  $user
     * @param  PayLog  $paylog
     * @return mixed
     */
    public function view(User $user, PayLog $paylog)
    {
        //
    }

    /**
     * Determine whether the user can create DocPayLogPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPayLog.
     *
     * @param  User  $user
     * @param  PayLog  $paylog
     * @return mixed
     */
    public function update(User $user, PayLog $paylog)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPayLog.
     *
     * @param  User  $user
     * @param  PayLog  $paylog
     * @return mixed
     */
    public function delete(User $user, PayLog $paylog)
    {
        //
    }
}
