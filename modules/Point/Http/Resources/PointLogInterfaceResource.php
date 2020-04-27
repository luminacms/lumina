<?php

namespace Modules\Point\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class PointLogInterfaceResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'count' => $this->count,
            'create_by' => $this->createBy->getName(),
            'left_count' => $this->left_count,
            'desc' => $this->desc,
        ];
    }
}
