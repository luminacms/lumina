<?php

namespace Modules\Vote\Policies;

use Modules\Core\Models\User;
use Modules\Core\Policies\BasePolicy;
use Modules\Vote\Models\VoteOption;

class VoteOptionPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocVoteOption.
     *
     * @param  User  $user
     * @param  VoteOption  $voteoption
     * @return mixed
     */
    public function view(User $user, VoteOption $voteoption)
    {
        //
    }

    /**
     * Determine whether the user can create DocVoteOptionPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocVoteOption.
     *
     * @param  User  $user
     * @param  VoteOption  $voteoption
     * @return mixed
     */
    public function update(User $user, VoteOption $voteoption)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocVoteOption.
     *
     * @param  User  $user
     * @param  VoteOption  $voteoption
     * @return mixed
     */
    public function delete(User $user, VoteOption $voteoption)
    {
        //
    }

    public function submit(User $user, VoteOption $voteOption)
    {
        return true;
    }
}
