<?php

namespace Modules\Mall\Policies;

use Modules\Core\Models\User;
use Modules\Mall\Models\ProductSku;

class ProductSkuPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocProductSku.
     *
     * @param  User  $user
     * @param  ProductSku  $productsku
     * @return mixed
     */
    public function view(User $user, ProductSku $productsku)
    {
        //
    }

    /**
     * Determine whether the user can create DocProductSkuPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocProductSku.
     *
     * @param  User  $user
     * @param  ProductSku  $productsku
     * @return mixed
     */
    public function update(User $user, ProductSku $productsku)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocProductSku.
     *
     * @param  User  $user
     * @param  ProductSku  $productsku
     * @return mixed
     */
    public function delete(User $user, ProductSku $productsku)
    {
        //
    }
}
