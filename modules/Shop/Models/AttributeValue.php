<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class AttributeValue.
 *
 * @package namespace Modules\Shop\Models;
 */
class AttributeValue extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = "shop__attribute_values";
    protected $fillable = ['attr_id', 'value'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
