<?php

namespace Modules\Core\Policies;

use Modules\Core\Models\User;
use Modules\Core\Models\UserAddress;

class UserAddressPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocUserAddress.
     *
     * @param  User  $user
     * @param  UserAddress  $useraddress
     * @return mixed
     */
    public function view(User $user, UserAddress $useraddress)
    {
        //
    }

    /**
     * Determine whether the user can create DocUserAddressPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocUserAddress.
     *
     * @param  User  $user
     * @param  UserAddress  $useraddress
     * @return mixed
     */
    public function update(User $user, UserAddress $useraddress)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocUserAddress.
     *
     * @param  User  $user
     * @param  UserAddress  $useraddress
     * @return mixed
     */
    public function delete(User $user, UserAddress $useraddress)
    {
        //
    }
}
