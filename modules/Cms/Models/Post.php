<?php

namespace Modules\Cms\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCount;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Post.
 *
 * @package namespace Modules\Cms\Models;
 */
class Post extends BaseModel
{
    use HasCreateBy, HasCount;

    protected $hashConnect = 'cms';
    protected $table = 'cms__posts';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'content', 'category_id', 'post_at', 'author', 'origin', 'description', 'status', 'order', 'count'];

}
