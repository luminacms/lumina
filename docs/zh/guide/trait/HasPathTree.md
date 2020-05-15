# HasPathTree 

```php
引入后自动开启树结构维护模式，并开放了几个接口，你可以轻松开启树结构数据维护！
在引入之前
// 对需要开启pathtree的model,数据库设计时需要调用pathtree方法（自定义blueprint）
Schema::create('core_departments', function(Blueprint $table) {
    
  ...
  $table->pathtree();
  ...
  
});
<?php
namespace Modules\Core\Traits;
use Illuminate\Support\Facades\DB;
use Modules\Core\Utils\Tree;
/**
 * Class RevisionableTrait
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
    public static function bootHasPathTree(){}
    /**
     * 获取数据结构option
     * @param $parentid
     * @param string $name
     * @return string
     */
    public static function getOptionsHtml($parentid, $name = 'name'){}
    /**
     * 获取树结构table
     * @param string $name
     * @param string $withCount
     * @return string
     */
    public static function getTableHtml($name = 'name', $withCount = false){}
    /**
     * 获取树
     * @param int $level
     * @param bool $withCount
     * @param bool $withCascade
     * @return array
     */
    public static function getTree($level = 1, $withCount = false, $withCascade = false){}
    /**
     * 获取所有子集
     * @param $path
     * @param bool $withSelf
     * @return mixed
     */
    public static function getChildren($path, $withSelf = true){}
}
1. select下拉示例.
{{ form()->select('parentid', \Modules\Core\Models\Department::getOptionsHtml($department->parentid??'')) }}
2. 树目录示例
$department_tree.jstree({
        core: {data: @json(\Modules\Cms\Models\CmsCategory::getTree(2, 'posts', true))}
}).on('changed.jstree', function (e, data) {
        ...
});
3. 树结构表格示例
 <table class="layui-hide" lay-filter="department_table">
 <thead>
 <tr>
   <th lay-data="{type:'checkbox', fixed: 'left'}"></th>
   <th lay-data="{field:'id', width:80, fixed: 'left'}">ID</th>
   <th lay-data="{field:'name', width:350}">名称</th>
   <th lay-data="{field:'path'}">路径</th>
   <th lay-data="{field:'level',width:80}">深度</th>
   <th lay-data="{field:'order',width:80}">排序</th>
   <th lay-data="{field:'updated_at'}">更新时间</th>
 </tr>
 </thead>
 <tbody>
    {!! \Modules\Core\Models\Department::getTableHtml() !!}
 </tbody>
 </table>
```
