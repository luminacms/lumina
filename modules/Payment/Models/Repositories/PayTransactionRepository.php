<?php

namespace Modules\Payment\Models\Repositories;

use App\Validators\PayTransactionValidator;
use Modules\Payment\Models\PayTransaction;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class PayTransactionRepository.
 *
 * @package namespace Modules\Payment\Models\Repositories;
 */
class PayTransactionRepository extends BaseRepository
{
    /**
     * 设定可搜索字段
     * @var array
     */
    protected $fieldSearchable = [
        'transaction_id' => 'like',
        'model_order_id' => 'like'
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return PayTransaction::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
