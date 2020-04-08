<?php

namespace Modules\Core\Http\Resources;

class OrganizationResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'oid' => $this->oid,
            'name' => $this->name,
            'role' => $this->roles->pluck('label'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s')
        ];
    }
}
