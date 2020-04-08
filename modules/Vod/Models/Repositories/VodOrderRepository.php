<?php

namespace Modules\Vod\Models\Repositories;

use App\Validators\VodOrderValidator;
use Modules\Core\Models\Criterias\CreateByCriteria;
use Modules\Vod\Models\VodOrder;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class VodOrderRepository.
 *
 * @package namespace Modules\Vod\Models\Repositories;
 */
class VodOrderRepository extends BaseRepository
{
    /**
     * 设定可搜索字段
     * @var array
     */
    protected $fieldSearchable = [
        'status' => '=',
        'order_id' => 'like'
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return VodOrder::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
