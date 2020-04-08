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

    public function __construct()
    {
        //
    }

    /**
     * @param $user
     * @param $ability
     * @return bool
     */
    public function before($user, $ability)
    {
        if($user->isSuper()) {
            return true;
        }
    }
}
