<?php

namespace Modules\Wechat\Models\Repositories;

use App\Validators\MsgValidator;
use Modules\Wechat\Models\Msg;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Eloquent\BaseRepository;

/**
 * Class MsgRepository.
 *
 * @package namespace Modules\Wechat\Models\Repositories;
 */
class MsgRepository extends BaseRepository
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
        return Msg::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
