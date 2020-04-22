<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\Sku;
use Modules\Core\Policies\BasePolicy;

class SkuPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocSku.
     *
     * @param  User  $user
     * @param  Sku  $sku
     * @return mixed
     */
    public function view(User $user, Sku $sku)
    {
        //
    }

    /**
     * Determine whether the user can create DocSkuPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocSku.
     *
     * @param  User  $user
     * @param  Sku  $sku
     * @return mixed
     */
    public function update(User $user, Sku $sku)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocSku.
     *
     * @param  User  $user
     * @param  Sku  $sku
     * @return mixed
     */
    public function delete(User $user, Sku $sku)
    {
        //
    }
}
