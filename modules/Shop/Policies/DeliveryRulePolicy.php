<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\DeliveryRule;
use Modules\Core\Policies\BasePolicy;

class DeliveryRulePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocDeliveryRule.
     *
     * @param  User  $user
     * @param  DeliveryRule  $deliveryrule
     * @return mixed
     */
    public function view(User $user, DeliveryRule $deliveryrule)
    {
        //
    }

    /**
     * Determine whether the user can create DocDeliveryRulePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocDeliveryRule.
     *
     * @param  User  $user
     * @param  DeliveryRule  $deliveryrule
     * @return mixed
     */
    public function update(User $user, DeliveryRule $deliveryrule)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocDeliveryRule.
     *
     * @param  User  $user
     * @param  DeliveryRule  $deliveryrule
     * @return mixed
     */
    public function delete(User $user, DeliveryRule $deliveryrule)
    {
        //
    }
}
