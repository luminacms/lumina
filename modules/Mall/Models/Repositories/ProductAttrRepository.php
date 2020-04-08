<?php

namespace Modules\Mall\Models\Repositories;

use App\Validators\ProductAttrValidator;
use Modules\Mall\Models\ProductAttr;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class ProductAttrRepository.
 *
 * @package namespace Modules\Mall\Models\Repositories;
 */
class ProductAttrRepository extends BaseRepository
{
    /**
     * 设定可搜索字段
     * @var array
     */
    protected $fieldSearchable = [
        'name' =>'like'
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ProductAttr::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
