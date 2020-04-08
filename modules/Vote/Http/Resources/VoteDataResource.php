<?php

namespace Modules\Vote\Http\Resources;

use Illuminate\Support\Arr;
use Modules\Core\Http\Resources\BaseResource;

class VoteDataResource extends BaseResource
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'create_by' => $this->create_by,
            'createBy' => Arr::only($this->createBy->toArray(), ['nickname', 'avatar']),
            'score' => $this->score,
            'name' => $this->name,
            'nickname' => $this->nickname,
            'mobile' => $this->mobile,
            'address' => $this->address,
            'company' => $this->company,
            'visit_no' => $this->visit_no,
            'invited_by' => $this->invited_by,
            'fields' => $this->fields,
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s')
        ];
    }
}