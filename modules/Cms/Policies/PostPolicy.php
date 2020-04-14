<?php

namespace Modules\Cms\Policies;

use Modules\Cms\Models\Post;
use Modules\Core\Models\User;

class PostPolicy extends Policy
{
    /**
     * Determine whether the user can view the DocPost.
     *
     * @param  User  $user
     * @param  Post  $post
     * @return mixed
     */
    public function view(User $user, Post $post)
    {
        //
    }

    /**
     * Determine whether the user can create DocPostPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocPost.
     *
     * @param  User  $user
     * @param  Post  $post
     * @return mixed
     */
    public function update(User $user, Post $post)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocPost.
     *
     * @param  User  $user
     * @param  Post  $post
     * @return mixed
     */
    public function delete(User $user, Post $post)
    {
        return $user->userid === $post->create_by && $user->hasRole('ADMIN');
    }
}
