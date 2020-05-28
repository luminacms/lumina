<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;
use Modules\Core\Traits\HasPathTree;

/**
 * Class Category.
 *
 * @package namespace Modules\Shop\Models;
 */
class Category extends BaseModel
{
    use HasPathTree, HasCreateBy;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__categories';
    protected $fillable = ['create_by', 'status', 'name', 'parentid', 'path', 'level', 'order', 'thumb'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [
        'name' => 'like'
    ];

}
