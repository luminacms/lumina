<?php

namespace Modules\Querylist\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class QlRule.
 *
 * @package namespace Modules\Querylist\Models;
 */
class QlRule extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'ql__rules';
    protected $fillable = ['type', 'title', 'url', 'rules'];
    protected $casts = [
        'rules' =>'array'
    ];

}
