<?php

namespace Modules\Core\Models;

use Modules\Core\Utils\Tree;
use Modules\Core\Models\BaseModel;

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
    public $table = 'core_regions';

    /**
     * region tree
     *
     * @return void
     */
    public static function regionCache()
    {
        $cache_key = 'region_tree';
        if(!$res = cache($cache_key)){
            $_category = self::all()->map(function($item, $key){
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'value' => $item->id,
                    'parentid' => $item->parentid,
                ];
            });
            $tree = new Tree($_category->toArray());
            $res = array_values($tree->get_tree_array());

            // cache([$cache_key => $res]);
        }
        return $res;
    }

    /**
     * get function
     *
     * @param [type] $query
     * @return void
     */
    public static function getSimpleTree($query = null)
    {
        $object = $query ?? self::all();
        $_category = $object->map(function($item, $key){
            return [
                'id' => $item->id,
                'label' => $item->name,
                'value' => $item->id,
                'parentid' => $item->parentid,
            ];
        });
        $tree = new Tree($_category->toArray());
        return array_values($tree->get_tree_array());
    }

}
