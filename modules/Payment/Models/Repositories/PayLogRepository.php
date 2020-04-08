<?php

namespace Modules\Payment\Models\Repositories;

use App\Validators\PayLogValidator;
use Modules\Payment\Models\PayLog;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class PayLogRepository.
 *
 * @package namespace Modules\Payment\Models\Repositories;
 */
class PayLogRepository extends BaseRepository
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
        return PayLog::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
