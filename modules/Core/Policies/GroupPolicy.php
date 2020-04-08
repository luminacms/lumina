<?php

namespace Modules\Core\Policies;

use Modules\Core\Models\Group;
use Modules\Core\Models\User;

class GroupPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocGroup.
     *
     * @param  User  $user
     * @param  Group  $group
     * @return mixed
     */
    public function view(User $user, Group $group)
    {
        //
    }

    /**
     * Determine whether the user can create DocGroupPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocGroup.
     *
     * @param  User  $user
     * @param  Group  $group
     * @return mixed
     */
    public function update(User $user, Group $group)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocGroup.
     *
     * @param  User  $user
     * @param  Group  $group
     * @return mixed
     */
    public function delete(User $user, Group $group)
    {
        //
    }
}
