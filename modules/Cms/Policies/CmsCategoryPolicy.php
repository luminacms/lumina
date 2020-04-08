<?php

namespace Modules\Cms\Policies;

use App\Models\User;
use Modules\Cms\Models\CmsCategory;

class CmsCategoryPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocCmsCategory.
     *
     * @param  User  $user
     * @param  CmsCategory  $cmscategory
     * @return mixed
     */
    public function view(User $user, CmsCategory $cmscategory)
    {
        //
    }

    /**
     * Determine whether the user can create DocCmsCategoryPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocCmsCategory.
     *
     * @param  User  $user
     * @param  CmsCategory  $cmscategory
     * @return mixed
     */
    public function update(User $user, CmsCategory $cmscategory)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocCmsCategory.
     *
     * @param  User  $user
     * @param  CmsCategory  $cmscategory
     * @return mixed
     */
    public function delete(User $user, CmsCategory $cmscategory)
    {
        //
    }
}
