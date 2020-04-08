<?php

namespace Modules\Game\Policies;

use App\Models\User;
use Modules\Game\Models\GameDiyComponent;

class GameDiyComponentPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocGameDiyComponent.
     *
     * @param  User  $user
     * @param  GameDiyComponent  $gamediycomponent
     * @return mixed
     */
    public function view(User $user, GameDiyComponent $gamediycomponent)
    {
        //
    }

    /**
     * Determine whether the user can create DocGameDiyComponentPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocGameDiyComponent.
     *
     * @param  User  $user
     * @param  GameDiyComponent  $gamediycomponent
     * @return mixed
     */
    public function update(User $user, GameDiyComponent $gamediycomponent)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocGameDiyComponent.
     *
     * @param  User  $user
     * @param  GameDiyComponent  $gamediycomponent
     * @return mixed
     */
    public function delete(User $user, GameDiyComponent $gamediycomponent)
    {
        //
    }
}
