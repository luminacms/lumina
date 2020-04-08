<?php

namespace Modules\Mall\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasPathTree;

/**
 * Class ProductCategory.
 *
 * @package namespace Modules\Mall\Models;
 */
class ProductCategory extends BaseModel
{
    use HasPathTree, HasCreateBy;

    const STATUS_ENABLED = 'ENABLED';
    const STATUS_DISABLED = 'DISABLED';

    public static function STATUS_MAP()
    {
        return [
            self::STATUS_ENABLED => '启用',
            self::STATUS_DISABLED => '禁用'
        ];
    }
    protected $table = 'mall__product_categories';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['create_by', 'status', 'name', 'parentid', 'path', 'level', 'order', 'thumb'];



}
