<?php

namespace Modules\Payment\Models\Repositories;

use App\Validators\PayNotifyLogValidator;
use Modules\Payment\Models\PayNotifyLog;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class PayNotifyLogRepository.
 *
 * @package namespace Modules\Payment\Models\Repositories;
 */
class PayNotifyLogRepository extends BaseRepository
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
        return PayNotifyLog::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
