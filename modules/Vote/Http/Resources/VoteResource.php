<?php

namespace Modules\Vote\Http\Resources;

use Modules\Core\Http\Resources\BaseResource;
use Modules\Vote\Models\Vote;

class VoteResource extends BaseResource
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        if($request->get('id') || $request->route('id')) {
            return [
                'vote_id' => $this->id,
                'title' =>$this->title,
                'type' => $this->type,
                'description' => $this->description,
                'subjects' => VoteSubjectResource::collection($this->subjects->sortBy('sort')),
                'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            ];
        }
        return [
            'id' => $this->id,
            'uid' => $this->uid ?? $this->id,
            'title' =>$this->title,
            'type' => $this->type,
            'uid' =>$this->uid,
            'typeLabel' => Vote::getTypes()[$this->type],
            'vote_data' => $this->voteData->count(),
            'vote_data_valid' => $this->voteData()->distinct('mobile')->count('mobile'),
            'notice_webhook' => $this->notice_webhook,
            'notice_interval' => $this->notice_interval,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
