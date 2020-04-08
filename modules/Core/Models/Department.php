<?php

namespace Modules\Core\Models;


use Modules\Core\Traits\HasOrg;
use Modules\Core\Traits\HasPathTree;

/**
 * Class Department.
 *
 * @package namespace Modules\Core\Models;
 */
class Department extends BaseModel
{
    use HasPathTree, HasOrg;

    public $table = 'core_departments';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'parentid', 'path', 'level', 'order', 'oid'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany('Modules\Core\Models\User', 'core_department_user','department_id', 'user_id');
    }
}
