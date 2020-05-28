<?php

namespace Modules\Core\Traits;

use Exception;
use Illuminate\Support\Facades\DB;
use Modules\Core\Utils\Tree;

/**
 * @package Venturecraft\Revisionable
 */
trait HasPathTree
{
    /**
     * Create the event listeners for the saving and saved events
     * This lets us save revisions whenever a save is made, no matter the
     * http method.
     *
     */
    public static function bootHasPathTree()
    {
        static::created(function($model){
            $tablename = $model->getTable();
            $model->level = 1;
            $model->path = '/0/'.$model->id.'/';
            if($model->parentid > 0){
                $parent = DB::table($tablename)->find($model->parentid);
                if($parent){
                    $model->path = $parent->path.$model->id.'/';
                    $model->level = $parent->level + 1;
                }
            }
            $model->save();
        });

        static::updated(function($model) {
            $tablename = $model->getTable();
            $original = $model->getOriginal();

            if(isset($original['parentid']) && $model->parentid != $original['parentid']) {
                // 树结构发生变更
                $parent = DB::table($tablename)->find($model->parentid);
                $old_parent = DB::table($tablename)->find($original['parentid']);

                if($model->parentid==0 || !$old_parent) {
                    $model->path = '/0/';
                    $model->level = 1;
                }else{
                    $level_delta = $old_parent->level - $parent->level;
                    $categories = DB::table($tablename)->where('path', 'like', '%/'.$model->id.'/%')->get();
                    foreach ($categories as $_category){
                        DB::table($tablename)->where('id', $_category->id)->update([
                            'path' =>  str_replace($old_parent->path, $parent->path, $_category->path),
                            'level' => $_category->level - $level_delta
                        ]);
                    }
                }
            }
        });

        static::deleted(function ($model) {
            $tablename = $model->getTable();
            DB::table($tablename)->where('path', 'like', '%/'.$model->id.'/%')->delete();
        });
    }

    /**
     * @param $parentid
     * @param string $name
     * @return string
     */
    public static function getOptionsHtml($parentid, $name = 'name')
    {
        $departs = self::all()->each(function($item, $key) use($parentid) {
            $item['selected'] =  $item['id']==$parentid?'selected':'';
        });
        $tree = new Tree($departs->toArray());
        $tree->icon = array('　│ ', '　├─ ', '　└─ ');
        $str = "<option value=\$id \$selected>\$spacer\$".$name."</option>";
        return "<option value=0></option>".$tree->get_tree(0, $str);
    }

    /**
     * @param string $name
     * @param string $option  [withCount]
     * @return string
     */
    public static function getTableHtml($query = '', $option = [])
    {
        $items = $query ? $query : self::all();
        $items ->map(function($item) use($option) {
            $item->_count = isset($option['withCount'])?"<span class='layui-badge ml-2 bg-green-500'>".$item->$option['withCount']->count()."</span>":'';
            $item->sort = $item->sort??50;
        });
        $tree = new Tree($items->toArray());
        $tree->icon = array('　│ ', '　├─ ', '　└─ ');
        $str = "<tr data-parentid='\$parentid' data-id='\$id'>
                    <td></td>
                    <td>\$id</td>
                    <td>\$spacer\$name\$_count</td>
                    <td>\$path</td>
                    <td>\$level</td>
                    <td>\$sort</td>
                    <td>\$updated_at</td>
                    <td></td>
                </tr>";
        return $tree->get_tree(0, $str);
    }

    /**
     * @param int $level
     * @param bool $withCount
     * @param bool $withCascade
     * @return array
     */
    public static function getTree($level = 1, $withCount = false, $withCascade = false)
    {
        $all_connect = '';
        $if_pivot = false; // 是否是pivot类型
        if($withCount && $withCascade) {
            $class = get_called_class();
            $_relaction = (new $class)->$withCount();

            if(method_exists($_relaction, 'getTable')){
                $if_pivot = true;
                $relationTable = $_relaction->getTable();
            }else{
                $relationTable = $_relaction->getRelated()->getTable();
            }
            $all_connect = DB::table($relationTable)->get();
        }
        $_category = self::all()->each(function($item, $key) use($level, $withCount, $all_connect, $withCascade, $if_pivot) {
            if(!$withCount) {
                $item['text'] =  $item['name'];
            }else{
                if($withCascade) {
                    $cate_ids = self::getChildren($item->id)->pluck('id')->toArray();
                    $relation = $item->$withCount();

                    if(!$if_pivot){
                        $forginKey = $relation->getForeignKeyName();
                    }else{
                        if($item->parentid == 0) {
                            $all_connect = $all_connect->unique($relation->getRelatedPivotKeyName());
                        }
                        $forginKey = $relation->getForeignPivotKeyName();
                    }
                    $r = $all_connect->filter(function($n) use($cate_ids, $forginKey){
                        return in_array($n->$forginKey, $cate_ids);
                    })->count();
                }else{
                    $r = $item->$withCount->count();
                }
                $item['text'] = $item['name'].'('.$r.')';
            }
            $item['spread'] = $item['level'] <= $level?true:false;
        });
        $tree = new Tree($_category->toArray());
        return array_values($tree->get_tree_array());
    }

    /**
     * simple tree
     *
     * @param integer $level
     * @return void
     */
    public static function getSimpleTree($level = 1)
    {
        $_category = self::all()->map(function($item, $key){
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

    /**
     * @param $path
     * @param bool $withSelf
     * @return mixed
     */
    public static function getChildren($id, $withSelf = true)
    {
        $me = self::findOrFail($id);
        $childs = self::where('path', 'like', $me->path.'%')->get();
        $res = collect();
        foreach ($childs as $_child) {
            if(!$withSelf && $_child['path']==$me->path) continue;
            $res->push($_child);
        }
        return $res;
    }

    /**
     * 获取父级全路径
     *
     * @param [type] $id
     * @return void
     */
    public static function getParents($id, $withSelf = true)
    {
        try{
            $_category = self::all();
            $res = collect((new Tree($_category->toArray()))->get_parents($id))->sortBy('level');
            if($withSelf) {
                $me = $_category->firstWhere('id', $id);
                $res = $me ? $res->push($me) : $res;
            }
            return $res;
        }catch(Exception $e){
            return [];
        }

    }
}
