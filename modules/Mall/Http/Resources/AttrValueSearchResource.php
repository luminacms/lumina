<?php


namespace Modules\Mall\Http\Resources;


use Modules\Core\Http\Resources\BaseResource;

class AttrValueSearchResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'attr_id' => $this->attr_id,
            'attr_name' => $this->attr->name,
            'text' => $this->value,
            'value' => $this->value,
        ];
    }
}