<?php

namespace Modules\Mall\Models\Repositories;

use App\Validators\ProductAttrValueValidator;
use Modules\Mall\Models\ProductAttrValue;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class ProductAttrValueRepository.
 *
 * @package namespace Modules\Mall\Models\Repositories;
 */
class ProductAttrValueRepository extends BaseRepository
{
    /**
     * 设定可搜索字段
     * @var array
     */
    protected $fieldSearchable = [
        'attr_id' => '=',
        'value' => 'like'
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ProductAttrValue::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
