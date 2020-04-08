<?php

namespace Modules\Vote\Policies;

use Modules\Core\Models\User;
use Modules\Core\Policies\BasePolicy;
use Modules\Vote\Models\VoteData;

class VoteDataPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocVoteData.
     *
     * @param  User  $user
     * @param  VoteData  $votedata
     * @return mixed
     */
    public function view(User $user, VoteData $votedata)
    {
        //
    }

    /**
     * Determine whether the user can create DocVoteDataPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocVoteData.
     *
     * @param  User  $user
     * @param  VoteData  $votedata
     * @return mixed
     */
    public function update(User $user, VoteData $votedata)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocVoteData.
     *
     * @param  User  $user
     * @param  VoteData  $votedata
     * @return mixed
     */
    public function delete(User $user, VoteData $votedata)
    {
        return false;
    }
}
