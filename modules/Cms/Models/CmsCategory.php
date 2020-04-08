<?php

namespace Modules\Cms\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasPathTree;

/**
 * Class CmsCategory.
 *
 * @package namespace Modules\Cms\Models;
 */
class CmsCategory extends BaseModel
{
    use HasCreateBy, HasPathTree;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'cms__categories';
    protected $fillable = ['name', 'content', 'create_by', 'status', 'order', 'parentid', 'path', 'level'];

    public function posts()
    {
        return $this->hasMany('Modules\Cms\Models\Post', 'category_id');
    }

}
