<?php

namespace Modules\Game\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class GameResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'share_pic' => $this->share_pic,
            'create_by' => $this->createBy->name,
            'oauth' => $this->oauth,
            'count' => $this->pages()->sum('count'),
            'status' => $this->status,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s')
        ];
    }
}
