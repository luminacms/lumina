<?php

namespace Modules\Point\Models;

use Modules\Core\Traits\HasOrg;
use Illuminate\Support\Facades\DB;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Point.
 *
 * @package namespace Modules\Point\Models;
 */
class Point extends BaseModel
{
    use HasOrg, HasCreateBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'point__points';
    protected $fillable = ['type','count', 'org', 'create_by'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    public function pointLog()
    {
        return $this->hasMany('Modules\Point\Models\PointLog', 'point_id');
    }

}
