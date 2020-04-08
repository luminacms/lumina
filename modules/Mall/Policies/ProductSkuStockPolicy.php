<?php

namespace Modules\Mall\Policies;

use Modules\Core\Models\User;
use Modules\Mall\Models\ProductSkuStock;

class ProductSkuStockPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocProductSkuStock.
     *
     * @param  User  $user
     * @param  ProductSkuStock  $productskustock
     * @return mixed
     */
    public function view(User $user, ProductSkuStock $productskustock)
    {
        //
    }

    /**
     * Determine whether the user can create DocProductSkuStockPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocProductSkuStock.
     *
     * @param  User  $user
     * @param  ProductSkuStock  $productskustock
     * @return mixed
     */
    public function update(User $user, ProductSkuStock $productskustock)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocProductSkuStock.
     *
     * @param  User  $user
     * @param  ProductSkuStock  $productskustock
     * @return mixed
     */
    public function delete(User $user, ProductSkuStock $productskustock)
    {
        //
    }
}
