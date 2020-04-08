<?php

namespace Modules\Querylist\Policies;

use Modules\Core\Models\User;
use Modules\Querylist\Models\QlPost;

class QlPostPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocQlPost.
     *
     * @param  User  $user
     * @param  QlPost  $qlpost
     * @return mixed
     */
    public function view(User $user, QlPost $qlpost)
    {
        //
    }

    /**
     * Determine whether the user can create DocQlPostPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocQlPost.
     *
     * @param  User  $user
     * @param  QlPost  $qlpost
     * @return mixed
     */
    public function update(User $user, QlPost $qlpost)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocQlPost.
     *
     * @param  User  $user
     * @param  QlPost  $qlpost
     * @return mixed
     */
    public function delete(User $user, QlPost $qlpost)
    {
        //
    }
}
