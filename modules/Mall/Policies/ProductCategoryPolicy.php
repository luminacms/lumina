<?php

namespace Modules\Mall\Policies;

use Modules\Core\Models\User;
use Modules\Mall\Models\ProductCategory;

class ProductCategoryPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocProductCategory.
     *
     * @param  User  $user
     * @param  ProductCategory  $productcategory
     * @return mixed
     */
    public function view(User $user, ProductCategory $productcategory)
    {
        //
    }

    /**
     * Determine whether the user can create DocProductCategoryPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocProductCategory.
     *
     * @param  User  $user
     * @param  ProductCategory  $productcategory
     * @return mixed
     */
    public function update(User $user, ProductCategory $productcategory)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocProductCategory.
     *
     * @param  User  $user
     * @param  ProductCategory  $productcategory
     * @return mixed
     */
    public function delete(User $user, ProductCategory $productcategory)
    {
        //
    }
}
