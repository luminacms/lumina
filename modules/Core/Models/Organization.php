<?php

namespace Modules\Core\Models;

use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasPathTree;
use Modules\Core\Traits\HasUnique;
use Spatie\Permission\Traits\HasRoles;

/**
 * Class Organization.
 *
 * @package namespace Modules\Core\Models;
 */
class Organization extends BaseModel
{
    use HasPathTree, HasUnique, HasCreateBy, HasRoles;

    public $table = 'core_organizations';
    protected $guard_name = 'org';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'parentid', 'path', 'level', 'order', 'oid', 'create_by'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->oid = $model->oid ?? self::getUuid('oid');
        });
    }

    /**
     * @param $name
     * @return bool
     */
    public function hasModuleAccess($name)
    {
        return Permission::where('name', $name)->exists()&&(new self())->hasPermissionTo($name, 'org');
    }

    /**
     * 组织下员工
     *
     * @return void
     */
    public function users()
    {
        return $this->belongsToMany('Modules\Core\Models\User', 'core_organzation_user', 'oid', 'organzation_id', 'userid', 'userid');
    }
}
