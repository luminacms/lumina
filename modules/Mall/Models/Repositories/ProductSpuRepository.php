<?php

namespace Modules\Mall\Models\Repositories;

use App\Validators\ProductSpuValidator;
use Modules\Mall\Models\ProductSpu;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class ProductSpuRepository.
 *
 * @package namespace Modules\Mall\Models\Repositories;
 */
class ProductSpuRepository extends BaseRepository
{
    /**
     * 设定可搜索字段
     * @var array
     */
    protected $fieldSearchable = [
        'name' => 'like'
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ProductSpu::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
