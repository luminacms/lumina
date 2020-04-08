<?php

namespace Modules\Game\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class GameDiyComponent.
 *
 * @package namespace Modules\Game\Models;
 */
class GameDiyComponent extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'game__diy_components';
    protected $fillable = ['name', 'path', 'version', 'visibilitylevel', 'status', 'desc'];

}
