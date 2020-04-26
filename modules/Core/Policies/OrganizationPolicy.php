<?php

namespace Modules\Core\Policies;

use Modules\Core\Models\Organization;
use Modules\Core\Models\User;

class OrganizationPolicy extends BasePolicy
{
    /**
     * 可管理组织权限管理
     *
     * @param User $user
     * @param Organization $organization
     * @return void
     */
    public function admin(User $user, Organization $organization)
    {
        return  $user->isSuper() || $user->hasOrg($organization) && $user->hasAnyRole(['ADMIN']);
    }

    /**
     * Determine whether the user can view the DocOrganization.
     *
     * @param  User  $user
     * @param  Organization  $organization
     * @return mixed
     */
    public function view(User $user, Organization $organization)
    {
        //
    }

    /**
     * Determine whether the user can create DocOrganizationPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocOrganization.
     *
     * @param  User  $user
     * @param  Organization  $organization
     * @return mixed
     */
    public function update(User $user, Organization $organization)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocOrganization.
     *
     * @param  User  $user
     * @param  Organization  $organization
     * @return mixed
     */
    public function delete(User $user, Organization $organization)
    {
        //
    }
}
