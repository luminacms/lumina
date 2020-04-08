<?php

namespace Modules\Mall\Models\Repositories;

use App\Validators\ProductCategoryValidator;
use Modules\Mall\Models\ProductCategory;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class ProductCategoryRepository.
 *
 * @package namespace Modules\Mall\Models\Repositories;
 */
class ProductCategoryRepository extends BaseRepository
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
        return ProductCategory::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
