<?php

namespace Modules\Vod\Policies;

use App\Models\User;
use Modules\Vod\Models\VodOrder;

class VodOrderPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocVodOrder.
     *
     * @param  User  $user
     * @param  VodOrder  $vodorder
     * @return mixed
     */
    public function view(User $user, VodOrder $vodorder)
    {
        //
    }

    /**
     * Determine whether the user can create DocVodOrderPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocVodOrder.
     *
     * @param  User  $user
     * @param  VodOrder  $vodorder
     * @return mixed
     */
    public function update(User $user, VodOrder $vodorder)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocVodOrder.
     *
     * @param  User  $user
     * @param  VodOrder  $vodorder
     * @return mixed
     */
    public function delete(User $user, VodOrder $vodorder)
    {
        //
    }
}
