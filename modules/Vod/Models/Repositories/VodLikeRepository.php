<?php

namespace Modules\Vod\Models\Repositories;

use App\Validators\VodLikeValidator;
use Modules\Core\Models\Criterias\CreateByCriteria;
use Modules\Vod\Models\VodLike;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class VodLikeRepository.
 *
 * @package namespace Modules\Vod\Models\Repositories;
 */
class VodLikeRepository extends BaseRepository
{
    /**
     * 设定可搜索字段
     * @var array
     */
    protected $fieldSearchable = [
        'model_type' => '='
    ];

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return VodLike::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
        $this->pushCriteria(CreateByCriteria::class);
    }
}
