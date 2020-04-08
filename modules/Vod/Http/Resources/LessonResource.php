<?php

namespace Modules\Vod\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class LessonResource extends BaseResource
{
    public function toArray($request)
    {
        if(!request('id')) {
            return [
                'id' => $this->id,
                'course_id' => $this->course_id,
                'course_title' => $this->course->title,
                'oid' => $this->oid,
                'title' => $this->title,
                'price' => floatval($this->price),
                'start_at' => $this->start_at,
                'thumb' => $this->cover,
                'count' => $this->count,
                'media_src' => $this->media_src,
                'type' => $this->type,
                'isnew' => true
            ];
        }else{
            return [
                'id' => $this->id,
                'oid' => $this->oid,
                'course_id' => $this->course_id,
                'title' => $this->title,
                'price' => floatval($this->price),
                'start_at' => $this->start_at,
                'thumb' => asset($this->cover),
                'count' => $this->count,
                'media_src' => $this->media_src,
                'type' => $this->type,
                'isnew' => true,
                'content' => $this->content
            ];
        }
    }
}
