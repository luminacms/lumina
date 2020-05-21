<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class DeliveryRule.
 *
 * @package namespace Modules\Shop\Models;
 */
class DeliveryRule extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'shop__delivery_rules';
    protected $fillable = ['delivery_id', 'region', 'first', 'first_fee', 'additional', 'additional_fee'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
