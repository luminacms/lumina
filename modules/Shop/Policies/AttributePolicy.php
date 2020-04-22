<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\Attribute;
use Modules\Core\Policies\BasePolicy;

class AttributePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocAttribute.
     *
     * @param  User  $user
     * @param  Attribute  $attribute
     * @return mixed
     */
    public function view(User $user, Attribute $attribute)
    {
        //
    }

    /**
     * Determine whether the user can create DocAttributePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocAttribute.
     *
     * @param  User  $user
     * @param  Attribute  $attribute
     * @return mixed
     */
    public function update(User $user, Attribute $attribute)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocAttribute.
     *
     * @param  User  $user
     * @param  Attribute  $attribute
     * @return mixed
     */
    public function delete(User $user, Attribute $attribute)
    {
        //
    }
}
