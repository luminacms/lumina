<?php

namespace Modules\Vod\Http\Resources;

use Illuminate\Support\Arr;
use Modules\Core\Http\Resources\BaseResource;
use Modules\Vod\Models\Lesson;
use Modules\Vod\Models\VodLike;
use Modules\Vod\Models\VodOrder;

class LessonListResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'course_id' => $this->course_id,
            'oid' => $this->oid,
            'title' => $this->title,
            'price' => floatval($this->price),
            'start_at' => $this->start_at,
            'thumb' => asset($this->cover),
            'count' => $this->count,
            'type' => $this->type,
            'pay_type' => $this->pay_type,
            'length' => $this->length,
            'description' => $this->description,
            'created_at' => $this->created_at->format('Y-m-d'),
            'isLike' => VodLike::isLike('lesson', $this->id),
            'isPayed' => VodOrder::isPayed('lesson', $this->id)
        ];
    }
}
