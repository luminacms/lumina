<?php

namespace Modules\Payment\Http\Resources;

use Carbon\Carbon;
use Modules\Core\Http\Resources\BaseResource;
use Modules\Payment\Models\PayTransaction;

class PayTransactionResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'transaction_id' => $this->transaction_id,
            'status' => $this->status,
            'status_label' => PayTransaction::getStatusLabel($this->status),
            'model_type' => $this->model_type,
            'pay_driver' => $this->pay_driver,
            'pay_gateway' => $this->pay_gateway,
            'total_fee' => $this->total_fee,
            'pre_total_fee' => $this->pre_total_fee,
            'transaction_code' => $this->transaction_code,
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'model_order_id' => $this->model_order_id,
            'payment_at' => $this->payment_at,
            'buyer_id' => $this->buyer_id,
            'create_ip' => $this->create_ip
        ];
    }
}
