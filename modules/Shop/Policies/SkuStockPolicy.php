<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\SkuStock;
use Modules\Core\Policies\BasePolicy;

class SkuStockPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocSkuStock.
     *
     * @param  User  $user
     * @param  SkuStock  $skustock
     * @return mixed
     */
    public function view(User $user, SkuStock $skustock)
    {
        //
    }

    /**
     * Determine whether the user can create DocSkuStockPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocSkuStock.
     *
     * @param  User  $user
     * @param  SkuStock  $skustock
     * @return mixed
     */
    public function update(User $user, SkuStock $skustock)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocSkuStock.
     *
     * @param  User  $user
     * @param  SkuStock  $skustock
     * @return mixed
     */
    public function delete(User $user, SkuStock $skustock)
    {
        //
    }
}
