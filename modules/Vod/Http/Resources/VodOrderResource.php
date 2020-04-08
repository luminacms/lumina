<?php

namespace Modules\Vod\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;
use Modules\Payment\Models\PayTransaction;
use Modules\Vod\Models\VodOrder;

class VodOrderResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'status' => $this->status,
            'status_label' => PayTransaction::getStatusLabel($this->status),
            'create_by' => '【'.$this->create_by.'】'.$this->createBy->getName(),
            'model_type' => $this->model_type,
            'model_id' => $this->model_id,
            'model' => VodOrder::getModel($this->type, $this->model_id),
            'price' => floatval($this->price),
            'expired_at' => $this->expired_at,
            'payed_at' => $this->payed_at,
            'created_at_ip' => $this->created_at_ip,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s')
        ];
    }
}
