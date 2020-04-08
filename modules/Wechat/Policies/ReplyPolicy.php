<?php

namespace Modules\Wechat\Policies;

use App\Models\User;
use Modules\Wechat\Models\Reply;

class ReplyPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocReply.
     *
     * @param  User  $user
     * @param  Reply  $reply
     * @return mixed
     */
    public function view(User $user, Reply $reply)
    {
        //
    }

    /**
     * Determine whether the user can create DocReplyPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocReply.
     *
     * @param  User  $user
     * @param  Reply  $reply
     * @return mixed
     */
    public function update(User $user, Reply $reply)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocReply.
     *
     * @param  User  $user
     * @param  Reply  $reply
     * @return mixed
     */
    public function delete(User $user, Reply $reply)
    {
        //
    }
}
