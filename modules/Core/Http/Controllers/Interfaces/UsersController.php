<?php
/**
 * Created by PhpStorm.
 * User: jory
 * Date: 2019/4/3
 * Time: 18:21
 */

namespace Modules\Core\Http\Controllers\Interfaces;


use Illuminate\Http\Request;
use Modules\Core\Exports\UsersExport;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Http\Resources\UserResource;
use Modules\Core\Models\User;

class UsersController extends BaseController
{

    protected $model;

    /**
     * UsersController constructor.
     * @param UserRepository $model
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * @param Request $request
     * @return mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        $users = $this->model->paginate(\request('limit', 15));

        return $this->toCollection($users, UserResource::class);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function export(Request $request)
    {
        $request->validate(['ids' =>'required']);
        $field = [
            'user_id' => 'USERID',
            'name' => '姓名',
            'mobile' => '电话',
            'created_at' =>'入职时间'
        ];
        return $this->toAjaxExport(new UsersExport($request->get('ids'), [], $field));
    }
}
