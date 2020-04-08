<?php

namespace Modules\Vod\Models\Repositories;

use App\Validators\LessonValidator;
use Modules\Vod\Http\Criterias\CourseCriteria;
use Modules\Vod\Models\Lesson;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class LessonRepository.
 *
 * @package namespace Modules\Vod\Models\Repositories;
 */
class LessonRepository extends BaseRepository
{
    /**
     * 设定可搜索字段
     * @var array
     */
    protected $fieldSearchable = [];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Lesson::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
        $this->pushCriteria(CourseCriteria::class);
    }
}
