<?php

namespace Modules\Cms\Policies;

use App\Models\User;
use Modules\Cms\Models\CmsPage;

class CmsPagePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocCmsPage.
     *
     * @param  User  $user
     * @param  CmsPage  $cmspage
     * @return mixed
     */
    public function view(User $user, CmsPage $cmspage)
    {
        //
    }

    /**
     * Determine whether the user can create DocCmsPagePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocCmsPage.
     *
     * @param  User  $user
     * @param  CmsPage  $cmspage
     * @return mixed
     */
    public function update(User $user, CmsPage $cmspage)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocCmsPage.
     *
     * @param  User  $user
     * @param  CmsPage  $cmspage
     * @return mixed
     */
    public function delete(User $user, CmsPage $cmspage)
    {
        //
    }
}
