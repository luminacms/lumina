<?php

namespace Modules\Point\Policies;

use Modules\Core\Models\User;
use Modules\Point\Models\Point;
use Modules\Core\Policies\BasePolicy;

class PointPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocPoint.
     *
     * @param  User  $user
     * @param  Point  $point
     * @return mixed
     */
    public function view(User $user, Point $point)
    {
        //
    }

    /**
     * Determine whether the user can create DocPointPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPoint.
     *
     * @param  User  $user
     * @param  Point  $point
     * @return mixed
     */
    public function update(User $user, Point $point)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPoint.
     *
     * @param  User  $user
     * @param  Point  $point
     * @return mixed
     */
    public function delete(User $user, Point $point)
    {
        //
    }
}
