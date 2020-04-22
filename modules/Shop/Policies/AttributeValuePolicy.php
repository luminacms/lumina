<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\AttributeValue;
use Modules\Core\Policies\BasePolicy;

class AttributeValuePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocAttributeValue.
     *
     * @param  User  $user
     * @param  AttributeValue  $attributevalue
     * @return mixed
     */
    public function view(User $user, AttributeValue $attributevalue)
    {
        //
    }

    /**
     * Determine whether the user can create DocAttributeValuePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocAttributeValue.
     *
     * @param  User  $user
     * @param  AttributeValue  $attributevalue
     * @return mixed
     */
    public function update(User $user, AttributeValue $attributevalue)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocAttributeValue.
     *
     * @param  User  $user
     * @param  AttributeValue  $attributevalue
     * @return mixed
     */
    public function delete(User $user, AttributeValue $attributevalue)
    {
        //
    }
}
