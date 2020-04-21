<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Modules\Core\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\Core\Http\Requests\UserRequest;
use Modules\Core\Http\Resources\UserResource;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

/**
 * Class UsersController.
 *
 * @package namespace Modules\Core\Http\Controllers;
 */
class UsersController extends BaseController
{
    use AuthenticatesUsers;
    /**
     * @var User
     */
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $users = $this->model->filter($request)->org()->paginate($request->get('limit', 15));
            return $this->toCollection($users, UserResource::class);
        }
        return view('core::users.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
         $this->authorize('create', User::class);
        return view('core::users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  UserCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(UserRequest $request)
    {
        try {
            if($request->get('password')) {
                $request->merge(['password' => Hash::make($request->get('password'))]);
            }else{
                unset($request['password']);
            }
            $user = $this->model->create($request->all());

            $user->departments()->attach($request->get('department'));
            $user->organizations()->attach(auth()->org());

            flash('新增操作成功', 'success');
            return redirect()->back();
        } catch (ValidationException $e) {
            return $this->toException($e);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = $this->model->with([
            'organizations:name,oid',
            'departments:name,level',
            'address:userid,province,city,address,contact_name,contact_phone'
        ])->find($id);

        // $this->authorize('view', $user);
        return $this->toTable($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = $this->model->find($id);
        // $this->authorize('update', $user);

        return view('core::users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(UserRequest $request, $id)
    {
        try {
            $model = $this->model->find($id);
            // $this->authorize('update', $model);

            if($request->get('password')) {
                $request->merge(['password' => Hash::make($request->get('password'))]);
            }else{
                unset($request['password']);
            }

            $model->fill($request->all())->save();

            // 更新部门
            $depart = $model->departments();
            $depart->detach();
            $depart->attach($request->get('department'));

            flash('更新操作成功', 'success');
            return redirect()->back();
        } catch (ValidationException $e) {
            return $this->toException($e);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = $this->model->find($id);
        $this->authorize('delete', $model);
        $model->delete($id);

        return $this->toResponse([], '删除成功');
    }

    public function profile(Request $request)
    {
        $user = auth()->user();
        if($request->isMethod('post')) {
            $model = $this->model->where('userid', $user->userid)->first();
            $model->fill($request->except('password'))->save();
            flash('保存成功', 'success');
        }

        return view('core::users.profile', compact('user'));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function resetpasswd(Request $request)
    {
        $user = auth()->user();
        if($request->isMethod('post')) {
            $request->validate(['password' => 'required', 'oldpasswd' => 'required', 'password_confirmation' => 'required']);
            $userModel = $this->model->where('userid', $user->userid)->first();
            $pass = true;
            $message = '';

            if($request->get('password') != $request->get('password_confirmation')) {
                $pass = false;
                $message = '两次密码输入不一致';
            }
            if(!Auth::guard()->validate(['email' => $userModel->email, 'password' => $request->get('oldpasswd')])){
                $pass = false;
                $message = '旧密码输入错误';
            }

            if($pass) {
                $userModel->fill([
                    'password' => Hash::make($request->get('password')),
                    'remember_token' => Str::random(60)
                ])->save();
                flash('保存成功', 'success');
            }else{
                flash($message, 'error');
            }
        }

        return view('core::users.resetpasswd', compact('user'));
    }
}
