<?php

namespace Modules\Coupon\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class CouponCodeResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'code' => substr_replace($this->code, '******', 6, 20),
            'owner_by' => $this->ownerBy->name,
            'received_at' => $this->received_at,
            'used_at' => $this->used_at,
            'expired_at' => $this->expired_at,
        ];
    }
}
