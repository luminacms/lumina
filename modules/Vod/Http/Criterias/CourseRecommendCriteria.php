<?php
namespace Modules\Vod\Http\Criterias;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Modules\Vod\Models\Course;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class RequestCriteria
 * @package Prettus\Repository\Criteria
 */
class CourseRecommendCriteria implements CriteriaInterface
{
    /**
     * Apply criteria in query repository
     *
     * @param         Builder|Model     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     * @throws \Exception
     */
    public function apply($model, RepositoryInterface $repository)
    {
        $id = \request('id');

        $model = $model->where('id', '<>', $id);

        $exist_model = Course::find($id);
        if($exist_model && $exist_model->parentid != 0) {
            // 有父级
            $model = $model->where('parentid', $exist_model->parentid);
        }

        return $model;
    }
}
