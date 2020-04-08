<?php

namespace Modules\Vote\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;

class VoteSubjectResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'subject_id' => $this->id,
            'title' => $this->title,
            'tip' => $this->tip,
            'type' => $this->type,
            'right_option' => $this->right_option,
            'required' => $this->required,
            'options' => VoteOptionResource::collection($this->options)
        ];
    }
}
