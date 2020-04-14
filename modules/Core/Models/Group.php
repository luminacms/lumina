<?php

namespace Modules\Core\Models;

/**
 * Class Group.
 *
 * @package namespace Modules\Core\Models;
 */
class Group extends BaseModel
{
    public $table = 'core_groups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description'];

    public function users()
    {
        return $this->morphToMany('Modules\Core\Models\User', 'model', 'group_user', 'userid', 'group_id');
    }

}
