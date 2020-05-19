<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\Delivery;
use Modules\Core\Policies\BasePolicy;

class DeliveryPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocDelivery.
     *
     * @param  User  $user
     * @param  Delivery  $delivery
     * @return mixed
     */
    public function view(User $user, Delivery $delivery)
    {
        //
    }

    /**
     * Determine whether the user can create DocDeliveryPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocDelivery.
     *
     * @param  User  $user
     * @param  Delivery  $delivery
     * @return mixed
     */
    public function update(User $user, Delivery $delivery)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocDelivery.
     *
     * @param  User  $user
     * @param  Delivery  $delivery
     * @return mixed
     */
    public function delete(User $user, Delivery $delivery)
    {
        //
    }
}
