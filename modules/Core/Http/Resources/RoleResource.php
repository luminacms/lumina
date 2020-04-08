<?php

namespace Modules\Core\Http\Resources;

class RoleResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name
        ];
    }
}
