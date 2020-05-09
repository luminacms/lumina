<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Attribute.
 *
 * @package namespace Modules\Shop\Models;
 */
class Attribute extends BaseModel
{
    use HasCreateBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = "shop__attributes";
    protected $fillable = ['name','description','create_by'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    public function vals()
    {
        return $this->hasMany('Modules\Shop\Models\AttributeValue', 'attr_id', 'id');
    }

}
