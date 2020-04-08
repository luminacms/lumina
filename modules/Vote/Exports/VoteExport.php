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
        'nickname' => '昵称',
        'address' => '地址',
        'visit_no' => '来访人数',
        'invited_by' => '受邀人',
        'fields' => '附加字段',
        'created_at' => '报名时间',
        'create_ip' => '报名ip',
    ];

    public function __construct(string $ids = '', array $params = [])
    {
        parent::__construct($ids, $params);

        if(isset($params['vote_id'])) {
            $vote = Vote::find($params['vote_id']);
            if($vote && !empty($vote['addon_fields'])) {
                // 附加字段不为空，增加导出表头
                $_heads = $this->heads;
                unsset($_heads['fields']);
                $this->heads = array_merge($_heads, explode(';', $vote['addon_fields']));
            }
        }
    }

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
            'nickname' => $row->nickname,
            'address' => $row->address,
            'visit_no' => $row->visit_no,
            'invited_by' => $row->invited_by,
            'fields' => is_array($row->fields)?array_to_info($row->fields):$row->fields,
            'invited_by' => $row->invited_by,
            'created_at' => $row->created_at,
            'create_ip' => $row->create_ip,
        ];
        if(!isset($this->heads['fields'])) {
            // 附加表头
            foreach(explode(';', $row->fields) as $_v) {
                $__item = explode(':', $_v);
                $data[$__item[0]] = $__item[1];
            }
        }else{
            $data['fields'] = is_array($row->fields)?array_to_info($row->fields):$row->fields;
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
