<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class Delivery.
 *
 * @package namespace Modules\Shop\Models;
 */
class Delivery extends BaseModel
{
    CONST TYPE_BYCOUNT = '1';
    CONST TYPE_BYWEIGHT = '2';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'shop__deliveries';
    protected $fillable = ['name', 'type'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    /**
     * types
     *
     * @var array
     */
    public static $types = [
        self::TYPE_BYCOUNT => '按数量',
        self::TYPE_BYWEIGHT => '按重量'
    ];

    public function rules()
    {
        return $this->hasMany('Modules\Shop\Models\DeliveryRule', 'delivery_id', 'id');
    }

}
