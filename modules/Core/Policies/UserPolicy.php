<?php

namespace Modules\Core\Policies;

use Modules\Core\Models\User;

class UserPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocUserGroup.
     *
     * @param  User  $user
     * @param  UserGroup  $usergroup
     * @return mixed
     */
    public function admin(User $user)
    {
        return $this->isAdmin($user);
    }

    /**
     * create
     *
     * @param User $user
     * @return void
     */
    public function create(User $user)
    {
        return $this->isAdmin($user);
    }

    /**
     * delete
     *
     * @param User $user
     * @return void
     */
    public function delete(User $user)
    {
        return $user->hasRole('ADMIN') && $user->email != 'jorycn@163.com';
    }

}
