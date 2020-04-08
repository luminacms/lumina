<?php

namespace Modules\Querylist\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Core\Models\BaseModel;

/**
 * Class QlPost.
 *
 * @package namespace Modules\Querylist\Models;
 */
class QlPost extends BaseModel
{
    use softDeletes;

    public $table = 'ql__posts';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['rule_id', 'title', 'url', 'origin', 'post_at', 'fields', 'content', 'uuid', 'deleted_at'];


}
