<?php

namespace Modules\Shop\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class SkuResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'sku_id' => $this->uid,
            'spu_id' => $this->spu_id,
            'create_by' => $this->createBy->getName(),
            'price_fee' => $this->price_fee,
            'market_price_fee' => $this->market_price_fee,
            'stock' => $this->stock,
            'attrs' => $this->attrVals
        ];
    }
}
