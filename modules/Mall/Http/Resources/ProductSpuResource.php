<?php


namespace Modules\Mall\Http\Resources;


use Modules\Core\Http\Resources\BaseResource;

class ProductSpuResource extends BaseResource
{
    public function toArray($request)
    {
        return array_merge(parent::toArray($request));
    }
}