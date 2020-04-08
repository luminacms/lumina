<?php

namespace Modules\Cms\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class PostResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'created_at' => $this->created_at,
            'count' => intval($this->count) + rand(100, 999)
        ];
    }
}
