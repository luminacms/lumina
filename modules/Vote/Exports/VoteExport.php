<?php

namespace Modules\Vote\Exports;

use Illuminate\Support\Arr;
use Modules\Vote\Models\Vote;
use Modules\Vote\Models\VoteData;
use Modules\Core\Exports\BaseExport;

class VoteExport extends BaseExport
{
    protected $heads = [
        'id' => '#',
        'company' => '公司名称',
        'name' => '姓名',
        'mobile' => '电话',
        'score' => '分数',
        'nickname' => '昵称',
        'address' => '地址',
        'visit_no' => '来访人数',
        'invited_by' => '受邀人',
        'created_at' => '报名时间',
        'create_ip' => '报名ip',
    ];

    public function headings(): array
    {
        return $this->heads;
    }

    public function map($row): array
    {
        $data = [
            'id' => $row->id,
            'company' => $row->company,
            'name' => $row->name,
            'mobile' => $row->mobile,
            'score' => $row->score,
            'nickname' => $row->nickname,
            'address' => $row->address,
            'visit_no' => $row->visit_no,
            'invited_by' => $row->invited_by,
            'invited_by' => $row->invited_by,
            'created_at' => $row->created_at,
            'create_ip' => $row->create_ip,
        ];
        if(count($row->fields) > 0) {
            // 附加表头
            foreach($row->fields as $_k => $_v) {
                $data[$_k] = $_k.':'.$_v;
            }
        }
        return $data;
    }

    public function query()
    {
        $model = VoteData::query();
        if($this->ids && is_array($this->ids)) {
            $model->whereIn('id', $this->ids);
        }
        if(isset($this->params['vote_id'])) {
            $model->where('vote_id', $this->params['vote_id']);
        }
        return $model;
    }
}
