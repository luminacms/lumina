<?php
/**
 * Created by PhpStorm.
 * User: win10
 * Date: 2018/4/23
 * Time: 12:51
 */

namespace Modules\Core\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;

class BasePolicy
{
    use HandlesAuthorization;

    // 超级管理员
    protected function isAdmin($user)
    {
        return $user->isSuper() || $user->hasRole('ADMIN');
    }
}
