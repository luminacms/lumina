<?php

namespace Modules\Vod\Exports;

use Modules\Payment\Models\PayTransaction;
use Modules\Vod\Models\VodOrder;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class OrderExport implements FromQuery, WithHeadings, WithMapping
{
    protected $ids = [];
    public function __construct()
    {
        $_ids = request('ids');
        $this->ids = $_ids!='all'?explode(',', $_ids):[];
    }

    public function headings(): array
    {
        return [
            'id' => '#',
            'order_id' => '订单号',
            'vod_title' => '标题',
            'status' => '状态',
            'price' => '金额',
            'payed_at' => '付款时间',
            'created_at' => '下单时间',
            'created_at_ip' => '下单ip',
        ];
    }

    public function map($row): array
    {
        return [
            $row->id,
            $row->order_id,
            $row->getModel($row->model_type, $row->model_id)->title,
            PayTransaction::$statusMap[$row->status],
            $row->price,
            $row->payed_at,
            $row->created_at,
            $row->created_at_ip,
        ];
    }

    public function query()
    {
        $model = VodOrder::query();
        if(count($this->ids) > 0) {
            $model->whereIn('id', $this->ids);
        }
        return $model;
    }
}
