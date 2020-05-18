<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class AttributeValue.
 *
 * @package namespace Modules\Shop\Models;
 */
class SpecValue extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = "shop__spec_values";
    protected $fillable = ['spec_id', 'value'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
