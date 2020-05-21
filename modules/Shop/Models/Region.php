<?php

namespace Modules\Shop\Models;

use Modules\Core\Utils\Tree;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasPathTree;

/**
 * Class Delivery.
 *
 * @package namespace Modules\Shop\Models;
 */
class Region extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'region';

    public static function regionCache()
    {
        $cache_key = 'shop_region_tree';
        if(!$res = cache($cache_key)){
            $_category = self::all()->map(function($item, $key){
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'value' => $item->id,
                    'parentid' => $item->pid,
                ];
            });
            $tree = new Tree($_category->toArray());
            $res = array_values($tree->get_tree_array());

            cache([$cache_key => $res]);
        }
        return $res;
    }

}
