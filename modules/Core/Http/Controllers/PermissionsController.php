<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Models\Role;
use Modules\Core\Models\Permission;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Http\Requests\PermissionRequest;

/**
 * Class PermissionsController.
 *
 * @package namespace Modules\Core\Http\Controllers;
 */
class PermissionsController extends BaseController
{
    /**
     * @var Permission
     */
    protected $repository;

    public function __construct(Permission $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        $role_id = $request->get('role_id');
        $role = $role_id?Role::findOrFail($role_id):Role::first();
        $role_guard = isset($role)?$role->guard_name:'web';
        return view('core::permissions.index', compact('role', 'role_guard'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Permission::class);
        return view('core::permissions.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PermissionCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(PermissionRequest $request)
    {
        try {
            $permission = $this->repository->create($request->all());

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
        $permission = $this->repository->find($id);
        // $this->authorize('view', $permission);
        return $this->toTable($permission);
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
        $permission = $this->repository->find($id);
        // $this->authorize('update', $permission);

        return view('core::permissions.edit', compact('permission'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  PermissionUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(PermissionRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $model->fill($request->all())->save();

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
        $model = $this->repository->find($id);
        // $this->authorize('delete', $model);
        $model->delete();

        return $this->toResponse([], '删除成功');
    }

    public function attach(Request $request)
    {
        $request->validate(['role_id' => 'required']);

        $role = Role::find($request->get('role_id'));

        $role->permissions()->detach();
        $r = $role->permissions()->attach($request->get('permission'));

        flash('保存成功', 'success');

        return redirect()->back();
    }
}
