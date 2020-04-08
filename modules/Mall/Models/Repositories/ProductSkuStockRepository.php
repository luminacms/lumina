<?php

namespace Modules\Mall\Models\Repositories;

use App\Validators\ProductSkuStockValidator;
use Modules\Mall\Models\ProductSkuStock;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class ProductSkuStockRepository.
 *
 * @package namespace Modules\Mall\Models\Repositories;
 */
class ProductSkuStockRepository extends BaseRepository
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
        return ProductSkuStock::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
