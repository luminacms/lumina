<?php

namespace Modules\Coupon\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class CouponCodeResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            // 'code' => substr_replace($this->code, '******', 6, 20),
            'code' => $this->code,
            'status' => $this->getStatusLable(),
            'owner_by' => $this->owner_by,
            'owner_by_name' => $this->ownerBy ? $this->ownerBy->getName(true) : '',
            'received_at' => $this->received_at,
            'used_at' => $this->used_at,
            'expired_at' => $this->expired_at,
            'created_at' => $this->created_at
        ];
    }
}
