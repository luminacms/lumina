<?php

namespace Modules\Wechat\Models\Repositories;

use App\Validators\ReplyValidator;
use Modules\Wechat\Models\Reply;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class ReplyRepository.
 *
 * @package namespace Modules\Wechat\Models\Repositories;
 */
class ReplyRepository extends BaseRepository
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
        return Reply::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
