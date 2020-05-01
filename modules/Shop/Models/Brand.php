<?php

namespace Modules\Shop\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class Brand.
 *
 * @package namespace Modules\Shop\Models;
 */
class Brand extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__brands';
    protected $fillable = ['create_by', 'name', 'logo_src', 'description', 'status'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
