<?php

namespace Modules\Vod\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;
use Modules\Vod\Models\Course;
use Modules\Vod\Models\VodLike;

class CourseResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'thumb' => asset($this->cover),
            'title' => $this->title,
            'price' => floatval($this->price),
            'count' => $this->count,
            'create_by' => $this->createBy->name,
            'oid' => $this->oid,
            'status' => $this->status,
            'parent' => new CourseResource(Course::find($this->parentid)),
            'status_label' => Course::getStatusLable($this->status),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'isLike' => VodLike::isLike('course', $this->id)
        ];
    }
}
