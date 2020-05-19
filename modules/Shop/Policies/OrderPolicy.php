<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\Order;
use Modules\Core\Policies\BasePolicy;

class OrderPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocOrder.
     *
     * @param  User  $user
     * @param  Order  $order
     * @return mixed
     */
    public function view(User $user, Order $order)
    {
        //
    }

    /**
     * Determine whether the user can create DocOrderPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocOrder.
     *
     * @param  User  $user
     * @param  Order  $order
     * @return mixed
     */
    public function update(User $user, Order $order)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocOrder.
     *
     * @param  User  $user
     * @param  Order  $order
     * @return mixed
     */
    public function delete(User $user, Order $order)
    {
        //
    }
}
