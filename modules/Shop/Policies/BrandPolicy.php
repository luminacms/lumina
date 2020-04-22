<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\Brand;
use Modules\Core\Policies\BasePolicy;

class BrandPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocBrand.
     *
     * @param  User  $user
     * @param  Brand  $brand
     * @return mixed
     */
    public function view(User $user, Brand $brand)
    {
        //
    }

    /**
     * Determine whether the user can create DocBrandPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocBrand.
     *
     * @param  User  $user
     * @param  Brand  $brand
     * @return mixed
     */
    public function update(User $user, Brand $brand)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocBrand.
     *
     * @param  User  $user
     * @param  Brand  $brand
     * @return mixed
     */
    public function delete(User $user, Brand $brand)
    {
        //
    }
}
