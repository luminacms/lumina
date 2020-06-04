<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasPathTree;

/**
 * Class AttributeValue.
 *
 * @package namespace Modules\Shop\Models;
 */
class SpecValue extends BaseModel
{
    use HasPathTree;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = "shop__spec_values";
    protected $fillable = ['spec_id', 'name', 'parentid', 'level', 'path'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
