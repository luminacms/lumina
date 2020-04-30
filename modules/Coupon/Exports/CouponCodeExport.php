<?php

namespace Modules\Coupon\Exports;

use Illuminate\Support\Arr;
use Modules\Vote\Models\Vote;
use Modules\Vote\Models\VoteData;
use Modules\Core\Exports\BaseExport;
use Modules\Coupon\Models\CouponCode;

class CouponCodeExport extends BaseExport
{
    protected $heads = [
        'code' => '#',
        'status' => '状态',
        'owner_by' => '领取人',
        'received_at' => '领取时间',
        'used_at' => '使用时间',
        'used_tag' => '核心标记',
        'used_at_ip' => '使用者IP地址',
        'expired_at' => '过期时间',
        'created_at' => '创建时间'
    ];

    public function headings(): array
    {
        return $this->heads;
    }

    public function map($row): array
    {
        return [
            'code' => $row->code,
            'status' => $row->getStatusLable(false),
            'owner_by' => $row->ownerBy->getName() ?? '',
            'received_at' => $row->received_at,
            'used_at' => $row->used_at,
            'used_tag' => $row->used_tag,
            'used_at_ip' => $row->used_at_ip,
            'expired_at' => $row->expired_at,
            'created_at' => $row->created_at,
        ];
    }

    /**
     * query result
     *
     * @return void
     */
    public function query()
    {
        $model = CouponCode::filter($this->request);

        if(is_array($this->ids)) {
            $model->whereIn('id', $this->ids);
        }
        return $model;
    }
}
