<?php

namespace Modules\Querylist\Models\Repositories;

use App\Validators\QlRuleValidator;
use Modules\Querylist\Models\QlRule;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class QlRuleRepository.
 *
 * @package namespace Modules\Querylist\Models\Repositories;
 */
class QlRuleRepository extends BaseRepository
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
        return QlRule::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
