<?php

namespace Modules\Cms\Models\Repositories;

use App\Validators\CmsCategoryValidator;
use Modules\Cms\Models\CmsCategory;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class CmsCategoryRepository.
 *
 * @package namespace Modules\Cms\Models\Repositories;
 */
class CmsCategoryRepository extends BaseRepository
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
        return CmsCategory::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
