<?php

namespace Modules\Game\Models\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Validator\Contracts\ValidatorInterface;
use Modules\Game\Models\GameDiyComponent;
use \Validators\GameDiyComponentValidator;

/**
 * Class GameDiyComponentRepository.
 *
 * @package namespace Modules\Game\Models\Repositories;
 */
class GameDiyComponentRepository extends BaseRepository
{
    /**
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
        return GameDiyComponent::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
