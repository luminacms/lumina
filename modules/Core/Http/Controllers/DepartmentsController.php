<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Models\Department;
use Modules\Core\Models\Departments;
use Illuminate\Validation\ValidationException;
use Modules\Core\Http\Requests\DepartmentsRequest;

/**
 * Class DepartmentsController.
 *
 * @package namespace Modules\Core\Http\Controllers;
 */

class DepartmentsController extends BaseController
{
    /**
     * @var Departments
     */
    protected $model;

    /**
     * DepartmentsController constructor.
     * @param DepartmentRepository $model
     */
    public function __construct(Department $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     *
     * @param DepartmentsRepository $model
     * @return \Illuminate\Http\Response
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        return view('core::departments.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Departments::class);
        return view('core::departments.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  DepartmentsCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(DepartmentsRequest $request)
    {
        try {
            $department = $this->model->create($request->all());

            return redirect()->back()->with('message', '新增操作成功');
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
        $department = $this->model->find($id);
        // $this->authorize('view', $department);
        return view('core::departments.show', compact('department'));
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
        $department = $this->model->find($id);
        // $this->authorize('update', $department);

        return view('core::departments.edit', compact('department'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  DepartmentsUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(DepartmentsRequest $request, $id)
    {
        try {
            $model = $this->model->find($id);
            // $this->authorize('update', $model);

            if(!$model->isDirty()) {
                return $this->toError([], 'nothing changed');
            }
            if($model->fill($request->all())->save()){
                flash('update success', 'update success');

                return $request->expectsJson()
                        ? $this->toResponse($model, 'update success')
                        : redirect()->back();
            }
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
        $this->model->delet($id);
        return redirect()->back()->with('message', 'Departments deleted.');
    }
}
