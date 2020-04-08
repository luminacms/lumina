<?php

namespace Modules\Vod\Policies;

use App\Models\User;
use Modules\Vod\Models\VodLike;

class VodLikePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocVodLike.
     *
     * @param  User  $user
     * @param  VodLike  $vodlike
     * @return mixed
     */
    public function view(User $user, VodLike $vodlike)
    {
        //
    }

    /**
     * Determine whether the user can create DocVodLikePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocVodLike.
     *
     * @param  User  $user
     * @param  VodLike  $vodlike
     * @return mixed
     */
    public function update(User $user, VodLike $vodlike)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocVodLike.
     *
     * @param  User  $user
     * @param  VodLike  $vodlike
     * @return mixed
     */
    public function delete(User $user, VodLike $vodlike)
    {
        //
    }
}
