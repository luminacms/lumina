<?php

namespace Modules\Shop\Policies;

use Modules\Core\Models\User;
use Modules\Shop\Models\Category;
use Modules\Core\Policies\BasePolicy;

class CategoryPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocCategory.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return mixed
     */
    public function view(User $user, Category $category)
    {
        //
    }

    /**
     * Determine whether the user can create DocCategoryPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocCategory.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return mixed
     */
    public function update(User $user, Category $category)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocCategory.
     *
     * @param  User  $user
     * @param  Category  $category
     * @return mixed
     */
    public function delete(User $user, Category $category)
    {
        //
    }
}
