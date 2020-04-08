<?php

namespace Modules\Mall\Policies;

use Modules\Core\Models\User;
use Modules\Mall\Models\ProductAttrValue;

class ProductAttrValuePolicy extends Policy
{
    /**
     * Determine whether the user can view the DocProductAttrValue.
     *
     * @param  User  $user
     * @param  ProductAttrValue  $productattrvalue
     * @return mixed
     */
    public function view(User $user, ProductAttrValue $productattrvalue)
    {
        //
    }

    /**
     * Determine whether the user can create DocProductAttrValuePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocProductAttrValue.
     *
     * @param  User  $user
     * @param  ProductAttrValue  $productattrvalue
     * @return mixed
     */
    public function update(User $user, ProductAttrValue $productattrvalue)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocProductAttrValue.
     *
     * @param  User  $user
     * @param  ProductAttrValue  $productattrvalue
     * @return mixed
     */
    public function delete(User $user, ProductAttrValue $productattrvalue)
    {
        //
    }
}
