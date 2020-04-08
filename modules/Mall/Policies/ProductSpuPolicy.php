<?php

namespace Modules\Mall\Policies;

use Modules\Core\Models\User;
use Modules\Mall\Models\ProductSpu;

class ProductSpuPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocProductSpu.
     *
     * @param  User  $user
     * @param  ProductSpu  $productspu
     * @return mixed
     */
    public function view(User $user, ProductSpu $productspu)
    {
        //
    }

    /**
     * Determine whether the user can create DocProductSpuPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocProductSpu.
     *
     * @param  User  $user
     * @param  ProductSpu  $productspu
     * @return mixed
     */
    public function update(User $user, ProductSpu $productspu)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocProductSpu.
     *
     * @param  User  $user
     * @param  ProductSpu  $productspu
     * @return mixed
     */
    public function delete(User $user, ProductSpu $productspu)
    {
        //
    }
}
