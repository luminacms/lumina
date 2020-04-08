<?php

namespace Modules\Payment\Models\Repositories;

use App\Validators\PayTransactionExtensionValidator;
use Modules\Payment\Models\PayTransactionExtension;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class PayTransactionExtensionRepository.
 *
 * @package namespace Modules\Payment\Models\Repositories;
 */
class PayTransactionExtensionRepository extends BaseRepository
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
        return PayTransactionExtension::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
