<?php

namespace Modules\Payment\Policies;

use Modules\Core\Models\User;
use Modules\Payment\Models\PayNotifyLog;

class PayNotifyLogPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocPayNotifyLog.
     *
     * @param  User  $user
     * @param  PayNotifyLog  $paynotifylog
     * @return mixed
     */
    public function view(User $user, PayNotifyLog $paynotifylog)
    {
        //
    }

    /**
     * Determine whether the user can create DocPayNotifyLogPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPayNotifyLog.
     *
     * @param  User  $user
     * @param  PayNotifyLog  $paynotifylog
     * @return mixed
     */
    public function update(User $user, PayNotifyLog $paynotifylog)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPayNotifyLog.
     *
     * @param  User  $user
     * @param  PayNotifyLog  $paynotifylog
     * @return mixed
     */
    public function delete(User $user, PayNotifyLog $paynotifylog)
    {
        //
    }
}
