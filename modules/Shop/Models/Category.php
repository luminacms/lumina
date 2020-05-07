<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class Category.
 *
 * @package namespace Modules\Shop\Models;
 */
class Category extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__categories';
    protected $fillable = ['oid','create_by', 'status', 'name', 'parentid', 'path', 'level', 'order', 'thumb'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
