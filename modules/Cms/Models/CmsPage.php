<?php

namespace Modules\Cms\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class CmsPage.
 *
 * @package namespace Modules\Cms\Models;
 */
class CmsPage extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'cms__pages';
    protected $fillable = [];

}
