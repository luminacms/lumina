<?php

namespace Modules\Core\Policies;

use Modules\Core\Models\Department;
use Modules\Core\Models\User;

class DepartmentPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocDepartment.
     *
     * @param  User  $user
     * @param  Department  $department
     * @return mixed
     */
    public function view(User $user, Department $department)
    {
        //
    }

    /**
     * Determine whether the user can create DocDepartmentPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocDepartment.
     *
     * @param  User  $user
     * @param  Department  $department
     * @return mixed
     */
    public function update(User $user, Department $department)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocDepartment.
     *
     * @param  User  $user
     * @param  Department  $department
     * @return mixed
     */
    public function delete(User $user, Department $department)
    {
        //
    }
}
