<?php

namespace Modules\Vod\Http\Resources;

use Illuminate\Support\Str;
use Modules\Core\Http\Resources\BaseResource;
use Modules\Vod\Models\Lesson;
use Modules\Vod\Models\VodLike;
use Modules\Vod\Models\VodOrder;

class CourseApiResource extends BaseResource
{
    public function toArray($request)
    {
        if(!request('id')) {
            return [
                'id' => $this->id,
                'thumb' => asset($this->cover),
                'title' => $this->title,
                'price' => floatval($this->price),
                'count' => $this->count,
                'create_by' => $this->createBy->name,
                'oid' => $this->oid,
                'created_at' => $this->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
                'isLike' => VodLike::isLike('course', $this->id)
            ];
        }else{
            return [
                'id' => $this->id,
                'thumb' => asset($this->cover),
                'thumb_video' => $this->cover_video?(!Str::contains($this->cover_video, 'http')?asset($this->cover_video):$this->cover_video):'',
                'title' => $this->title,
                'price' => floatval($this->price),
                'count' => $this->count,
                'create_by' => $this->createBy->name,
                'oid' => $this->oid,
                'description' => $this->description,
                'content' => str_replace('<img', '<img style="width:100%;display:block;"', $this->content),
                'created_at' => $this->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
                'isLike' => VodLike::isLike('course', $this->id),
                'isPayed' => VodOrder::isPayed('course', $this->id),
                'items' => LessonListResource::collection($this->lesson)
            ];
        }
    }
}
