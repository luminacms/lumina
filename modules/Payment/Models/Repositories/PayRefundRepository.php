<?php

namespace Modules\Payment\Models\Repositories;

use App\Validators\PayRefundValidator;
use Modules\Payment\Models\PayRefund;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class PayRefundRepository.
 *
 * @package namespace Modules\Payment\Models\Repositories;
 */
class PayRefundRepository extends BaseRepository
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
        return PayRefund::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
