<?php

namespace Modules\Cms\Models\Repositories;

use App\Validators\CmsPageValidator;
use Modules\Cms\Models\CmsPage;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class CmsPageRepository.
 *
 * @package namespace Modules\Cms\Models\Repositories;
 */
class CmsPageRepository extends BaseRepository
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
        return CmsPage::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
