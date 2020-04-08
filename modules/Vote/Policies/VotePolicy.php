<?php

namespace Modules\Vote\Policies;

use Modules\Core\Models\User;
use Modules\Core\Policies\BasePolicy;
use Modules\Vote\Models\Vote;

class VotePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocVote.
     *
     * @param  User  $user
     * @param  Vote  $vote
     * @return mixed
     */
    public function view(User $user, Vote $vote)
    {
        //
    }

    /**
     * Determine whether the user can create DocVotePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocVote.
     *
     * @param  User  $user
     * @param  Vote  $vote
     * @return mixed
     */
    public function update(User $user, Vote $vote)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocVote.
     *
     * @param  User  $user
     * @param  Vote  $vote
     * @return mixed
     */
    public function delete(User $user, Vote $vote)
    {
        return $user->user_id == $vote->create_by;
    }

}
