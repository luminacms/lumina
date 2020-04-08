<?php

namespace Modules\Vod\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;
use Modules\Vod\Models\Course;
use Modules\Vod\Models\Lesson;

class LikeResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'model_type' => $this->model_type,
            'model_id' => $this->model_id,
            'model' => $this->model_type=='course'?(new CourseApiResource(Course::find($this->model_id)))
                                                 :(new LessonApiResource(Lesson::find($this->model_id)))
        ];
    }
}
