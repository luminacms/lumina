<?php

namespace Modules\Vod\Policies;

use App\Models\User;
use Modules\Vod\Models\Lesson;

class LessonPolicy extends BasePolicy
{
    /**
     * Determine whether the user can view the DocLesson.
     *
     * @param  User  $user
     * @param  Lesson  $lesson
     * @return mixed
     */
    public function view(User $user, Lesson $lesson)
    {
        //
    }

    /**
     * Determine whether the user can create DocLessonPluralModel.
     *
     * @param  User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the DocLesson.
     *
     * @param  User  $user
     * @param  Lesson  $lesson
     * @return mixed
     */
    public function update(User $user, Lesson $lesson)
    {
        //
    }

    /**
     * Determine whether the user can delete the DocLesson.
     *
     * @param  User  $user
     * @param  Lesson  $lesson
     * @return mixed
     */
    public function delete(User $user, Lesson $lesson)
    {
        //
    }
}
