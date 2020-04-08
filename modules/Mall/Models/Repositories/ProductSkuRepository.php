<?php

namespace Modules\Mall\Models\Repositories;

use App\Validators\ProductSkuValidator;
use Modules\Mall\Models\ProductSku;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class ProductSkuRepository.
 *
 * @package namespace Modules\Mall\Models\Repositories;
 */
class ProductSkuRepository extends BaseRepository
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
        return ProductSku::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
