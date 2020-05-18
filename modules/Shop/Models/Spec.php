<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;

/**
 * Class Attribute.
 *
 * @package namespace Modules\Shop\Models;
 */
class Spec extends BaseModel
{
    use HasCreateBy, HasOrg;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = "shop__spec";
    protected $fillable = ['name','description','create_by','oid'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    public function vals()
    {
        return $this->hasMany('Modules\Shop\Models\SpecValue', 'spec_id', 'id');
    }

}
