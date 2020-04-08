<?php

namespace Modules\Vote\Policies;

use Modules\Core\Models\User;
use Modules\Core\Policies\BasePolicy;
use Modules\Vote\Models\VoteLog;

class VoteLogPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocVoteLog.
     *
     * @param  User  $user
     * @param  VoteLog  $votelog
     * @return mixed
     */
    public function view(User $user, VoteLog $votelog)
    {
        //
    }

    /**
     * Determine whether the user can create DocVoteLogPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocVoteLog.
     *
     * @param  User  $user
     * @param  VoteLog  $votelog
     * @return mixed
     */
    public function update(User $user, VoteLog $votelog)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocVoteLog.
     *
     * @param  User  $user
     * @param  VoteLog  $votelog
     * @return mixed
     */
    public function delete(User $user, VoteLog $votelog)
    {
        //
    }
}
