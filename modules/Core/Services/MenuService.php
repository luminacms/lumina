<?php
namespace Modules\Core\Services;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Modules\Core\Models\Department;
use Modules\Core\Models\Permission;
use Modules\Core\Utils\Tree;
use Nwidart\Modules\Facades\Module;

/**
 * Created by PhpStorm.
 * User: v_sjzhou
 * Date: 2017/9/12
 * Time: 10:57
 */
class MenuService
{
    protected $roles;

    const _core_menu = [
        ["sort"=>0, "id"=>"system", "parentid"=>"0", "icon"=>"fa-cogs", "text"=>"全局配置", "route"=>"core.option.index"],

        ["sort"=>10,"id"=>"user", "parentid"=>"0", "icon"=>"fa-users", "text"=>"用户管理"],
        ["sort"=>101,"id"=>"user_organizations", "parentid"=>"user", "icon"=>"", "text"=>"组织管理", "route"=>"core.organizations.index", "auth"=>["ROLE"=>"SUPER"]],
        ["sort"=>102,"id"=>"user_departments", "parentid"=>"user","icon"=>"", "text"=>"部门管理", "route"=>"core.departments.index"],
        ["sort"=>103,"id"=>"user_layer", "parentid"=>"user","icon"=>"", "text"=>"权限管理", "route"=>"core.permission.index", "auth"=>["ROLE"=>"SUPER"]],
        ["sort"=>104,"id"=>"user_users", "parentid"=>"user","icon"=>"", "text"=>"员工管理", "route"=>"core.users.index"],
        ["sort"=>105,"id"=>"user_users_social", "parentid"=>"user","icon"=>"", "text"=>"粉丝管理", "route"=>"core.user-socialites.index"],
        ["sort"=>106,"id"=>"user_address", "parentid"=>"user", "icon"=>"", "text"=>"地址管理", "route"=>"core.user-addresses.index"],

        ["sort"=>999, "id"=>"tool", "parentid"=>"0", "icon"=>"fa-magic", "text"=>"系统工具", "auth"=>["ROLE"=>"SUPER"]],
        ["id"=>"tool_log", "parentid" => "tool", "icon"=>"", "text"=>"日志管理", "route"=>"core.tool.log"],
        ["id"=>"tool_apitest", "parentid" => "tool", "icon"=>"", "text"=>"接口管理", "route"=>"apitest.index"],
    ];

    /**
     * @return string
     */
    public function make()
    {
        $menus = collect()->merge(self::_core_menu);
        foreach(Module::getOrdered() as $module){
            $_permisson_key = 'module_'.$module->getAlias();

            // 开启组织模块权限，有权限的组织才有访问权限
            if(
                auth()->guard('org')->oid()=='1' || // 默认组织开启全部菜单
                !config('core.origanization_permission') || // 关闭组织管理
                in_array($module->getAlias(), ['core']) || //Core模块全部菜单不验证模块权限
                Permission::where('name', $_permisson_key)->exists()&&auth()->org()->hasPermissionTo($_permisson_key, 'org') // 模块权限组织验证
            ){
                $menus = $menus->merge($module->get('menus', []));
            }
        }

        $menus = $this->_parseMenu($menus)->sortBy('sort')->all();
        $menuTree = (new Tree($menus))->get_tree_array();

        // 构造html
        $menuHtml = '';
        foreach($menuTree as $_menu) {
            $menuHtml .= '<li data-id="'.$_menu['id'].'" class="layui-nav-item">';
            if(!isset($_menu['target'])) {
                $menuHtml .= '<a href="javascript:;" lay-tips="'.$_menu['text'].'" lay-direction="2" '.(!isset($_menu['children'])?'lay-href='.$_menu['url']:'').'>';
            }else{
                $menuHtml .= '<a href="'.$_menu['url'].'" target="'.$_menu['target'].'">';
            }
            $menuHtml .= '<i class="fa '.($_menu['icon'] ?? '').' absolute" style="left: 20px;top: 50%;margin-top: -5px;"></i><cite>'.$_menu['text'].'</cite>';

            if (isset($_menu['children'])) {
                $menuHtml .= '<i class="fa fa-angle-right ml-1"></i></a>'.$this->__buildChildHtml($_menu['children']);
            }else{
                $menuHtml .= '</a>';
            }
        }
        return $menuHtml;
    }

    /**
     * 权限检查, url生成
     * @param $menu
     * @return array
     */
    protected function _parseMenu($menus)
    {
        if (empty($menus)) return [];

        return $menus->filter(function($item){
            return !isset($item['auth']) || $this->__checkIfPass($item['auth']);
        })->map(function($item) {
            $item['url'] = $this->__buildUrl($item);
            return $item;
        });
    }

    /**
     * build item url
     *
     * @param [type] $item
     * @return void
     */
    protected function __buildUrl($item)
    {
        $_url = '';
        if(isset($item['route'])) {
            $_url = Route::has($item['route'])?route($item['route'], $item['params']??[]):'';
        }else if(isset($item['uri'])){
            $_url = $item['uri'].(isset($item['params'])?'?='.http_build_query($item['params']):'');
        }
        return $_url ?? 'javascript:;';
    }

    /**
     * @param $child
     * @return string
     */
    protected function __buildChildHtml($child)
    {
        $childHtml = '<dl class="layui-nav-child">';
        foreach ($child as $_child) {
            $childHtml .= '<dd data-id="'.$_child['id'].'">';
            $childHtml .= '<a '.(!isset($_child['children'])&&!empty($_child['url'])?'lay-href='.$_child['url']:'href="javascript:;"').'>'.(isset($_child['icon'])?'<i class="fa '.$_child['icon'].' mr-1"></i>':'').$_child['text'];
            if(isset($_child['children'])) {
                $childHtml .= '<i class="fa fa-angle-right ml-1"></i></a>'.$this->__buildChildHtml($_child['children']);
            }else{
                $childHtml .= '</a>';
            }
        }
        $childHtml .= '</dl>';
        return $childHtml;
    }

    /**
     * @param $auth
     * @return bool
     */
    protected function __checkIfPass($auth)
    {
        if(\is_bool($auth)){
            return $auth;
        }

        $user = \auth()->user();
        $pass = true;

        if(isset($auth['ROLE']) && !$user->isSuper()) {
            // 角色条件
            if(Str::contains($auth['ROLE'], '|')) {
                $pass = $user->hasAnyRole(explode('|', $auth['ROLE'])); // or
            }else if(Str::contains($auth['ROLE'], ',')) {
                $pass = $user->hasAllRole(explode(',', $auth['ROLE'])); // and
            }else{
                $pass = $user->hasRole($auth['ROLE']);
            }
        }

        return $pass;
    }
}
