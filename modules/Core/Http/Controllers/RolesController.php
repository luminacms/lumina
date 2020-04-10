<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Models\Role;
use Modules\Core\Http\Requests\RoleRequest;
use Modules\Core\Http\Resources\RoleResource;
use Illuminate\Validation\ValidationException;
use Modules\Core\Models\Repositories\RoleRepository;

/**
 * Class RolesController.
 *
 * @package namespace Modules\Core\Http\Controllers;
 */
class RolesController extends BaseController
{
    /**
     * @var Role
     */
    protected $model;

    public function __construct(Role $model)
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
            $roles = $this->model->paginate($request->get('limit', 15));
            return $this->toCollection($roles, RoleResource::class);
        }
        return view('core::roles.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Role::class);
        return view('core::roles.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  RoleCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(RoleRequest $request)
    {
        try {
            $role = $this->model->create($request->all());

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
        $role = $this->model->find($id);
        // $this->authorize('view', $role);
        return $this->toTable($role);
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
        $role = $this->model->find($id);
        // $this->authorize('update', $role);

        return view('core::roles.edit', compact('role'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  RoleUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(RoleRequest $request, $id)
    {
        try {
            $model = $this->model->find($id);
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
        $model = $this->model->find($id);
        // $this->authorize('delete', $model);
        $model->delete($id);

        return $this->toResponse([], '删除成功');
    }
}
