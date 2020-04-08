<?php

namespace Modules\Vote\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class VoteOptionResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'vote_id' => $this->vote_id,
            'subject_id' => $this->subject_id,
            'option_id' => $this->id,
            'type' => $this->type,
            'value' =>$this->value,
            'thumb' => $this->thumb,
            'count' => $this->count
        ];
    }
}
