<?php

namespace Modules\Mall\Policies;

use Modules\Core\Models\User;
use Modules\Mall\Models\ProductAttr;

class ProductAttrPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocProductAttr.
     *
     * @param  User  $user
     * @param  ProductAttr  $productattr
     * @return mixed
     */
    public function view(User $user, ProductAttr $productattr)
    {
        //
    }

    /**
     * Determine whether the user can create DocProductAttrPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocProductAttr.
     *
     * @param  User  $user
     * @param  ProductAttr  $productattr
     * @return mixed
     */
    public function update(User $user, ProductAttr $productattr)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocProductAttr.
     *
     * @param  User  $user
     * @param  ProductAttr  $productattr
     * @return mixed
     */
    public function delete(User $user, ProductAttr $productattr)
    {
        //
    }
}
