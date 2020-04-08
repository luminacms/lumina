<?php

namespace Modules\Vod\Policies;

use Modules\Core\Models\User;
use Modules\Core\Policies\BasePolicy;
use Modules\Vod\Models\Course;

class CoursePolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocCourse.
     *
     * @param  User  $user
     * @param  Course  $course
     * @return mixed
     */
    public function view(User $user, Course $course)
    {
        //
    }

    /**
     * Determine whether the user can create DocCoursePluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocCourse.
     *
     * @param  User  $user
     * @param  Course  $course
     * @return mixed
     */
    public function update(User $user, Course $course)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocCourse.
     *
     * @param  User  $user
     * @param  Course  $course
     * @return mixed
     */
    public function delete(User $user, Course $course)
    {
        return $course->create_by == $user->user_id && $course->lesson->count()==0;
    }
}
