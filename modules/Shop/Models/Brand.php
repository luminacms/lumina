<?php

namespace Modules\Shop\Models;

use Modules\Core\Traits\HasOrg;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Brand.
 *
 * @package namespace Modules\Shop\Models;
 */
class Brand extends BaseModel
{
    use HasCreateBy, HasOrg;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shop__brands';
    protected $fillable = ['oid','create_by', 'name', 'logo_src', 'description', 'status', 'reg_num','name_english'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

}
