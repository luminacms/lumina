<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Models\Organization;
use Illuminate\Validation\ValidationException;
use Modules\Core\Http\Requests\OrganizationRequest;
use Modules\Core\Http\Resources\OrganizationResource;
use Modules\Core\Models\Department;
use Modules\Core\Models\Repositories\OrganizationRepository;

/**
 * Class OrganizationsController.
 *
 * @package namespace Modules\Core\Http\Controllers;
 */
class OrganizationsController extends BaseController
{
    /**
     * @var Organization
     */
    protected $model;

    public function __construct(Organization $model)
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
            $category = $this->model->filter($request)->get();
            return $this->toCollection($category, OrganizationResource::class);
        }
        return view('core::organizations.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Organization::class);
        return view('core::organizations.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  OrganizationCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(OrganizationRequest $request)
    {
        try {
            $organization = $this->model->create($request->all());

            if($permission = $request->get('permisson')) {
                $organization->syncPermissions(array_values($request->get('permisson')));
            }
            $organization->department()->create(['name' => '默认部门']);

            // auth()->org()->switchTo(auth()->org());

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
        $organization = $this->model->with(['roles:label,name'])->find($id);
        // $this->authorize('view', $organization);
        return $this->toTable($organization);
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
        $organization = $this->model->find($id);

        // $this->authorize('update', $organization);

        return view('core::organizations.edit', compact('organization'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  OrganizationUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(OrganizationRequest $request, $id)
    {
        try {
            $model = $this->model->find($id);
            // $this->authorize('update', $model);

            $model->fill($request->all())->save();
//            $model->syncRoles(array_values($request->get('org')));

            $model->syncPermissions(array_values($request->get('permisson')));

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
        $model = $this->model->find($id)->delete();
        // $this->authorize('delete', $model);

        return $this->toResponse([], '删除成功');
    }
}
