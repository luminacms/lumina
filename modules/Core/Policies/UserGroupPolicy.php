<?php

namespace Modules\Core\Policies;

use Modules\Core\Models\User;
use Modules\Core\Models\UserGroup;

class UserGroupPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocUserGroup.
     *
     * @param  User  $user
     * @param  UserGroup  $usergroup
     * @return mixed
     */
    public function view(User $user, UserGroup $usergroup)
    {
        //
    }

    /**
     * Determine whether the user can create DocUserGroupPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocUserGroup.
     *
     * @param  User  $user
     * @param  UserGroup  $usergroup
     * @return mixed
     */
    public function update(User $user, UserGroup $usergroup)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocUserGroup.
     *
     * @param  User  $user
     * @param  UserGroup  $usergroup
     * @return mixed
     */
    public function delete(User $user, UserGroup $usergroup)
    {
        //
    }
}
