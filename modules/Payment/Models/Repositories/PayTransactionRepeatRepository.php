<?php

namespace Modules\Payment\Models\Repositories;

use App\Validators\PayTransactionRepeatValidator;
use Modules\Payment\Models\PayTransactionRepeat;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class PayTransactionRepeatRepository.
 *
 * @package namespace Modules\Payment\Models\Repositories;
 */
class PayTransactionRepeatRepository extends BaseRepository
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
        return PayTransactionRepeat::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
