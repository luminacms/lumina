<?php

namespace Modules\Core\Policies;

use Modules\Core\Models\File;
use Modules\Core\Models\User;

class FilePolicy extends Policy
{
    /**
     * Determine whether the user can view the DocFile.
     *
     * @param  User  $user
     * @param  File  $file
     * @return mixed
     */
    public function view(User $user, File $file)
    {
        //
    }

    /**
     * Determine whether the user can create DocFilePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocFile.
     *
     * @param  User  $user
     * @param  File  $file
     * @return mixed
     */
    public function update(User $user, File $file)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocFile.
     *
     * @param  User  $user
     * @param  File  $file
     * @return mixed
     */
    public function delete(User $user, File $file)
    {
        //
    }
}
