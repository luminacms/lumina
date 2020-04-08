<?php

namespace Modules\Mall\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class ProductAttr.
 *
 * @package namespace Modules\Mall\Models;
 */
class ProductAttr extends BaseModel
{
    protected $table = 'mall__product_attrs';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

}
