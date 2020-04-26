<?php

namespace Modules\Point\Policies;

use Modules\Core\Models\User;
use Modules\Point\Models\PointLog;
use Modules\Core\Policies\BasePolicy;

class PointLogPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocPointLog.
     *
     * @param  User  $user
     * @param  PointLog  $pointlog
     * @return mixed
     */
    public function view(User $user, PointLog $pointlog)
    {
        //
    }

    /**
     * Determine whether the user can create DocPointLogPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPointLog.
     *
     * @param  User  $user
     * @param  PointLog  $pointlog
     * @return mixed
     */
    public function update(User $user, PointLog $pointlog)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPointLog.
     *
     * @param  User  $user
     * @param  PointLog  $pointlog
     * @return mixed
     */
    public function delete(User $user, PointLog $pointlog)
    {
        //
    }
}
