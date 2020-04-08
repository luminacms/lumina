<?php

namespace Modules\Querylist\Models\Repositories;

use App\Validators\QlPostValidator;
use Modules\Querylist\Models\QlPost;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class QlPostRepository.
 *
 * @package namespace Modules\Querylist\Models\Repositories;
 */
class QlPostRepository extends BaseRepository
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
        return QlPost::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
