<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\Spu;
use Modules\Core\Policies\BasePolicy;

class SpuPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocSpu.
     *
     * @param  User  $user
     * @param  Spu  $spu
     * @return mixed
     */
    public function view(User $user, Spu $spu)
    {
        //
    }

    /**
     * Determine whether the user can create DocSpuPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocSpu.
     *
     * @param  User  $user
     * @param  Spu  $spu
     * @return mixed
     */
    public function update(User $user, Spu $spu)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocSpu.
     *
     * @param  User  $user
     * @param  Spu  $spu
     * @return mixed
     */
    public function delete(User $user, Spu $spu)
    {
        //
    }
}
