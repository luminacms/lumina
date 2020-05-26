<?php

use Modules\Core\Models\Role;
use Modules\Core\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Modules\Core\Models\Permission;
use Modules\Core\Models\Organization;

class DatabaseSeeder extends Seeder
{

    /**
     * @throws Exception
     */
    public function run()
    {
        $this->genOrgazation();
        $this->genRole();

        $_user = User::firstOrCreate(['email' => 'jorycn@163.com'], [
            'name' => 'Jory',
            'userid' => 'jory',
            'email_verified_at' => now(),
            'password' => Hash::make('123456')
        ]);
        $_user->assignRole(1);
        $_user->organizations()->attach(1);

        // 只在开发模式下测试数据用
        if(app()->isLocal() === true) {
            $this->call(DemoSeed::class);
        }
    }

    protected function genOrgazation()
    {
        DB::table((new Organization())->getTable())->truncate();
        DB::table('core_organzation_user')->truncate();
        $departs = [
            ['name' => '默认组织', 'oid' => 1, 'parentid' => 0]
        ];
        foreach ($departs as $_depart) {
            Organization::create($_depart);
        }
    }

    protected function genRole()
    {
        $role = [
            ['id'=>1, 'name' => 'SUPER', 'label' => '超级管理员', 'guard_name' => 'web'],
            ['id'=>2, 'name' => 'ADMIN', 'label' => '管理员', 'guard_name' => 'web'],
            ['id'=>3, 'name' => 'ORG_A', 'label' => '一级运营商', 'guard_name' => 'org'],
            ['id'=>4, 'name' => 'ORG_B', 'label' => '二级运营商', 'guard_name' => 'org'],
            ['id'=>5, 'name' => 'ORG_C', 'label' => '三级运营商', 'guard_name' => 'org']
        ];
        $permission = [
            ['name' => 'module_shop', 'label' => '电商模块','guard_name' => 'org'],
            ['name' => 'module_cms', 'label' => 'CMS模块','guard_name' => 'org'],
            ['name' => 'module_game', 'label' => '移动营销模块','guard_name' => 'org'],
            ['name' => 'module_querylist', 'label' => '采集模块','guard_name' => 'org'],
            ['name' => 'module_vote', 'label' => '投票模块','guard_name' => 'org'],
            ['name' => 'module_ticket', 'label' => '工单','guard_name' => 'org'],
            ['name' => 'module_wechat', 'label' => '微信开放功能','guard_name' => 'org'],
            ['name' => 'module_vod', 'label' => '点播功能','guard_name' => 'org'],
            ['name' => 'module_doc', 'label' => '文档引擎','guard_name' => 'org'],
            ['name' => 'module_payment', 'label' => '支付引擎','guard_name' => 'org'],
        ];
        foreach ($role as $_depart) {
            Role::firstOrCreate($_depart);
        }
        foreach ($permission as $_depart) {
            Permission::firstOrCreate($_depart);
        }
    }
}
