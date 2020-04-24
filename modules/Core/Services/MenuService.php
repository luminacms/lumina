<?php
namespace Modules\Core\Services;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Modules\Core\Models\Permission;
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
        ["sort"=>0, "name"=>"system", "icon"=>"fa-cogs", "label"=>"全局配置", "route"=>"core.option.index", "auth"=>true],
        ["sort"=>10,"name"=>"user", "icon"=>"fa-users", "label"=>"用户管理", "children"=>[
            ["name"=>"user_organizations", "icon"=>"", "label"=>"组织管理", "route"=>"core.organizations.index", "auth"=>["ROLE"=>"SUPER"]],
            ["name"=>"user_departments", "icon"=>"", "label"=>"部门管理", "route"=>"core.departments.index"],
            ["name"=>"user_layer", "icon"=>"", "label"=>"权限管理", "route"=>"core.permission.index", "auth"=>["ROLE"=>"SUPER"]],
            ["name"=>"user_users", "icon"=>"", "label"=>"员工管理", "route"=>"core.users.index"],
            ["name"=>"user_users_social", "icon"=>"", "label"=>"粉丝管理", "route"=>"core.user-socialites.index"],
            ["name"=>"user_address", "icon"=>"", "label"=>"地址管理", "route"=>"core.user-addresses.index"]
        ]],
        ["name"=>"tool", "icon"=>"fa-magic", "label"=>"系统工具", "auth"=>["ROLE"=>"SUPER"], "sort"=>999, "children"=>[
            ["name"=>"tool_log", "icon"=>"", "label"=>"日志管理", "route"=>"core.tool.log"],
            ["name"=>"tool_apitest", "icon"=>"", "label"=>"接口管理", "route"=>"apitest.index"],
        ]]
    ];

    /**
     * @return string
     */
    public function make()
    {
        $menus = collect()->merge($this->_parseMenu(self::_core_menu));
        foreach(Module::getOrdered() as $module){
            $_permisson_key = 'module_'.$module->getAlias();

            // 开启组织模块权限，有权限的组织才有访问权限
            if(
                auth()->guard('org')->oid()=='1' || // 默认组织开启全部菜单
                !config('core.origanization_permission') || // 关闭组织管理
                in_array($module->getAlias(), ['core']) || //Core模块全部菜单不验证模块权限
                Permission::where('name', $_permisson_key)->exists()&&auth()->org()->hasPermissionTo($_permisson_key, 'org') // 模块权限组织验证
            ){
                $menus = $menus->merge($this->_parseMenu($module->get('menus', [])));
            }
        }
        $menus = $menus->sortBy('sort')->values()->all();

        // 构造html
        $menuHtml = '';
        foreach($menus as $_menu) {
            $menuHtml .= '<li data-name="'.$_menu['name'].'" class="layui-nav-item">';
            if(!isset($_menu['target'])) {
                $menuHtml .= '<a href="javascript:;" lay-tips="'.$_menu['label'].'" lay-direction="2" '.(!isset($_menu['children'])?'lay-href='.$_menu['url']:'').'>';
            }else{
                $menuHtml .= '<a href="'.$_menu['url'].'" target="'.$_menu['target'].'">';
            }
            $menuHtml .= '<i class="fa '.$_menu['icon'].' absolute" style="left: 20px;top: 50%;margin-top: -5px;"></i><cite>'.$_menu['label'].'</cite>';

            if (isset($_menu['children'])) {
                $menuHtml .= '<i class="fa fa-angle-right ml-1"></i></a>'.$this->__buildChildHtml($_menu['children']);
            }else{
                $menuHtml .= '</a>';
            }
        }
        return $menuHtml;
    }

    /**
     * @param $menu
     * @return array
     */
    protected function _parseMenu($menu)
    {
        if (empty($menu)) return [];

        foreach ($menu as $_k => $_menu) {
            // 权限检查
            if(isset($_menu['auth'])) {
                if(!$this->__checkIfPass($_menu['auth']) || $_menu['auth']!=true) {
                    unset($menu[$_k]);
                    continue;
                }
            }
            $menu[$_k]['url'] = $this->__buildUrl($_menu);
            if(isset($_menu['children'])) {
                $menu[$_k]['children'] = $this->_parseMenu($_menu['children']);
            }
        }
        return $menu;
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
            $childHtml .= '<dd data-name="'.$_child['name'].'">';
            $childHtml .= '<a '.(!isset($_child['children'])&&!empty($_child['url'])?'lay-href='.$_child['url']:'href="javascript:;"').'>'.(isset($_child['icon'])?'<i class="fa '.$_child['icon'].' mr-1"></i>':'').$_child['label'];
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
