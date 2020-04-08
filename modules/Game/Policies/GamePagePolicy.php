<?php

namespace Modules\Game\Policies;

use App\Models\User;
use Modules\Game\Models\GamePage;

class GamePagePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocGamePage.
     *
     * @param  User  $user
     * @param  GamePage  $gamepage
     * @return mixed
     */
    public function view(User $user, GamePage $gamepage)
    {
        //
    }

    /**
     * Determine whether the user can create DocGamePagePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocGamePage.
     *
     * @param  User  $user
     * @param  GamePage  $gamepage
     * @return mixed
     */
    public function update(User $user, GamePage $gamepage)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocGamePage.
     *
     * @param  User  $user
     * @param  GamePage  $gamepage
     * @return mixed
     */
    public function delete(User $user, GamePage $gamepage)
    {
        //
    }
}
