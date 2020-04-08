<?php

namespace Modules\Vote\Policies;

use Modules\Core\Models\User;
use Modules\Core\Policies\BasePolicy;
use Modules\Vote\Models\VoteSubject;

class VoteSubjectPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocVoteSubject.
     *
     * @param  User  $user
     * @param  VoteSubject  $votesubject
     * @return mixed
     */
    public function view(User $user, VoteSubject $votesubject)
    {
        //
    }

    /**
     * Determine whether the user can create DocVoteSubjectPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocVoteSubject.
     *
     * @param  User  $user
     * @param  VoteSubject  $votesubject
     * @return mixed
     */
    public function update(User $user, VoteSubject $votesubject)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocVoteSubject.
     *
     * @param  User  $user
     * @param  VoteSubject  $votesubject
     * @return mixed
     */
    public function delete(User $user, VoteSubject $votesubject)
    {
        //
    }
}
