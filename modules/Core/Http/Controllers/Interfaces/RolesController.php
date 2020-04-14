<?php
/**
 * Created by PhpStorm.
 * User: jory
 * Date: 2019/4/3
 * Time: 18:21
 */

namespace Modules\Core\Http\Controllers\Interfaces;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Models\Role;
use Modules\Core\Models\User;

class RolesController extends BaseController
{

    protected $model;

    /**
     * UsersController constructor.
     * @param UserRepository $model
     */
    public function __construct(Role $model)
    {
        $this->model = $model;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function attach(Request $request)
    {
        $request->validate(['role_id'=>'required', 'userids' =>'required']);

        try{
            $role = $this->model->find($request->get('role_id'));
            foreach (explode(',', $request->get('userids')) as $_userid) {
                $_user = User::find($_userid);
                $_user->assignRole($role);
            }
            return $this->toResponse([], 'success');
        }catch (\Exception $e){
            return $this->toException($e);
        }
    }

    public function detach(Request $request)
    {
        $request->validate(['role_id'=>'required', 'userids' =>'required']);

        try{
            $role = $this->model->find($request->get('role_id'));
            foreach (explode(',', $request->get('userids')) as $_userid) {
                $_user = User::find($_userid);
                $_user->removeRole($role);
            }
            return $this->toResponse([], 'success');
        }catch (\Exception $e){
            return $this->toException($e);
        }
    }
}
