<?php
namespace Modules\Vote\Http\Criterias;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class VoteDataCriteria implements CriteriaInterface
{
    /**
     * @param $model
     * @param RepositoryInterface $repository
     * @return mixed|void
     */
    public function apply($model, RepositoryInterface $repository)
    {
        $vote_id = request()->get('vote_id');
        if($vote_id) {
            $model->where('vote_id', $vote_id);
        }

        return $model;
    }
}