<?php

namespace Modules\Mall\Policies;

use Modules\Core\Models\User;
use Modules\Mall\Models\ProductBrand;

class ProductBrandPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocProductBrand.
     *
     * @param  User  $user
     * @param  ProductBrand  $productbrand
     * @return mixed
     */
    public function view(User $user, ProductBrand $productbrand)
    {
        //
    }

    /**
     * Determine whether the user can create DocProductBrandPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocProductBrand.
     *
     * @param  User  $user
     * @param  ProductBrand  $productbrand
     * @return mixed
     */
    public function update(User $user, ProductBrand $productbrand)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocProductBrand.
     *
     * @param  User  $user
     * @param  ProductBrand  $productbrand
     * @return mixed
     */
    public function delete(User $user, ProductBrand $productbrand)
    {
        //
    }
}
