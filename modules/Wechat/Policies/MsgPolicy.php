<?php

namespace Modules\Wechat\Policies;

use App\Models\User;
use Modules\Wechat\Models\Msg;

class MsgPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocMsg.
     *
     * @param  User  $user
     * @param  Msg  $msg
     * @return mixed
     */
    public function view(User $user, Msg $msg)
    {
        //
    }

    /**
     * Determine whether the user can create DocMsgPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocMsg.
     *
     * @param  User  $user
     * @param  Msg  $msg
     * @return mixed
     */
    public function update(User $user, Msg $msg)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocMsg.
     *
     * @param  User  $user
     * @param  Msg  $msg
     * @return mixed
     */
    public function delete(User $user, Msg $msg)
    {
        //
    }
}
