<?php

namespace Modules\Core\Policies;

use Modules\Core\Models\Address;
use Modules\Core\Models\User;

class AddressPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocAddress.
     *
     * @param  User  $user
     * @param  Address  $address
     * @return mixed
     */
    public function view(User $user, Address $address)
    {
        //
    }

    /**
     * Determine whether the user can create DocAddressPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocAddress.
     *
     * @param  User  $user
     * @param  Address  $address
     * @return mixed
     */
    public function update(User $user, Address $address)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocAddress.
     *
     * @param  User  $user
     * @param  Address  $address
     * @return mixed
     */
    public function delete(User $user, Address $address)
    {
        //
    }
}
