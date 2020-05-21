<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Modules\Core\Models\Department;
use Modules\Core\Models\Organization;
use Modules\Core\Models\Permission;
use Modules\Core\Models\Role;
use Modules\Core\Models\User;
use Modules\Core\Models\UserAddress;

class UserSeed extends Seeder
{

    /**
     * @throws Exception
     */
    public function run()
    {
        $this->genOrgazation();
        $this->genDepartment();
        // 用户

        $department = Department::withoutGlobalScopes(['oid'])->get();

        DB::table("core_department_user")->truncate();
        $users = factory(User::class, 50)->create()->each(function($u) use($department){
            $_depart = $department->random(1)->first();
            // 加入部门
            $u->departments()->detach();
            $u->departments()->attach($_depart->id);

            // 加入组织
            $u->organizations()->detach();
            $u->organizations()->attach($_depart->oid);
        });

        // 地址
        DB::table((new UserAddress())->getTable())->truncate();
        $address = factory(UserAddress::class)->times(1000)->make();
        UserAddress::insert($address->toArray());

    }

    protected function genOrgazation()
    {
        $departs = [
            ['name' => '西安XX网络技术有限公司', 'parentid'=>0],
            ['name' => '北京XX信息技术有限公司', 'parentid'=>0]
        ];
        foreach ($departs as $_depart) {
            Organization::create($_depart);
        }
    }

    protected function genDepartment()
    {
        // 部门
        $depart_1 = [
            ['name' => '小白巷网络工作室', 'parentid' => 0, 'id'=>1],
            ['name' => '市场部','parentid' => 1, 'id'=>2],
            ['name' => '综合管理部','parentid' => 1, 'id'=>3],
            ['name' => '财务部','parentid' => 1, 'id'=>4],
            ['name' => '外阜事业部','parentid' => 1, 'id'=>5],
            ['name' => '政务部','parentid' => 1, 'id'=>6],
            ['name' => 'KA一部','parentid' => 1, 'id'=>7],
            ['name' => '新开中心','parentid' => 1, 'id'=>8],
            ['name' => '产品策略组','parentid' => 2, 'id'=>9],
            ['name' => '市场媒介组','parentid' => 2, 'id'=>10],
            ['name' => '设计开发组','parentid' => 2, 'id'=>11],
            ['name' => '内容运营组','parentid' => 2, 'id'=>12],
            ['name' => '人力资源组','parentid' => 3, 'id'=>13],
            ['name' => '新政部','parentid' => 3, 'id'=>14]
        ];
        $depart_2 = [
            ['name' => '北京XX信息技术有限公司', 'parentid' => 0, 'id'=>15],
            ['name' => '招商加盟组','parentid' => 15, 'id'=>16],
            ['name' => '教育培训组','parentid' => 15],
            ['name' => '婚纱摄影组','parentid' => 15],
            ['name' => '家具建材组','parentid' => 15],
            ['name' => '医美组','parentid' => 15],
            ['name' => '新开一部','parentid' => 16],
            ['name' => '新开二部','parentid' => 16],
        ];
        DB::table('core_departments')->truncate();
        DB::table('core_department_user')->truncate();
        foreach ($depart_1 as $_depart) {
            Department::create(array_merge($_depart, ['oid' =>1]));
        }
        foreach ($depart_2 as $_depart) {
            Department::create(array_merge($_depart, ['oid' =>Organization::where('oid', '<>', '1')->first()->oid]));
        }
    }
}
