<?php

namespace Modules\Vote\Traits;

trait VoteTrait
{

    /**
     * @return mixed
     */
    public function votes()
    {
        return $this->morphToMany(
            'Modules\Vote\Models\Vote',
            'model',
            'vote__model',
            'model_id',
            'vote_id'
        );
    }

    /**
     * @return array
     */
    public function getVoteCount()
    {
        $_count = [];
        foreach ($this->votes as $_vote){
            $_count[] = ['vote_id' => $_vote->id,'count' => $_vote->voteData()->count(), 'count_valid' =>$_vote->voteData()->distinct('mobile')->count()];
        }
        return $_count;
    }

}