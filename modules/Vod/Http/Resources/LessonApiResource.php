<?php

namespace Modules\Vod\Http\Resources;

use Illuminate\Support\Str;
use Modules\Core\Http\Resources\BaseResource;
use Modules\Vod\Models\VodLike;
use Modules\Vod\Models\VodOrder;

class LessonApiResource extends BaseResource
{
    public function toArray($request)
    {
        if(!request('id')) {
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
                'length' => $this->length,
                'description' => $this->description,
                'created_at' => $this->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
                'isnew' => true,
                'isLike' => VodLike::isLike('lesson', $this->id)
            ];
        }else{
            $ispaied = VodOrder::isPayed('lesson', $this->id);
            return [
                'id' => $this->id,
                'oid' => $this->oid,
                'course_id' => $this->course_id,
                'title' => $this->title,
                'price' => floatval($this->price),
                'start_at' => $this->start_at,
                'thumb' => asset($this->cover),
                'count' => $this->count,
                'media_src' => $ispaied?(!Str::contains($this->media_src, 'http')?route('media', encrypt($this->media_src)):$this->media_src):'',
                'type' => $this->type,
                'length' => $this->length,
                'isnew' => true,
                'isLike' => VodLike::isLike('lesson', $this->id),
                'content' => str_replace('<img', '<img style="width:100%;display:block;"', $this->content),
                'description' => $this->description,
                'created_at' => $this->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            ];
        }
    }
}
