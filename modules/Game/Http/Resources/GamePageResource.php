<?php

namespace Modules\Game\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class GamePageResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'uid' => $this->uid,
            'game_id' => $this->game_id,
            'slug' => $this->slug,
            'title' => $this->title,
            'count' => $this->count,
            'mode' => $this->mode,
            'status' => $this->status,
            'created_at' => $this->created_at
        ];
    }
}
