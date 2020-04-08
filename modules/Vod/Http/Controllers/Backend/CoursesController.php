<?php

namespace Modules\Vod\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vod\Http\Requests\CourseRequest;
use Modules\Vod\Http\Resources\CourseResource;
use Modules\Vod\Models\Course;
use Modules\Vod\Models\Repositories\CourseRepository;

/**
 * Class CoursesController.
 *
 * @package namespace Modules\Vod\Http\Controllers;
 */
class CoursesController extends BaseController
{
    /**
     * @var Course
     */
    protected $repository;

    public function __construct(CourseRepository $repository)
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
        if($request->expectsJson()) {
            $courses = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($courses, CourseResource::class);
        }
        return view('vod::backend.courses.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Course::class);
        return view('vod::backend.courses.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CourseCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(CourseRequest $request)
    {
        try {
            $course = $this->repository->create($request->all());

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
        $course = $this->repository->find($id);
        // $this->authorize('view', $course);
        return $this->toTable($course);
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
        $course = $this->repository->find($id);
        // $this->authorize('update', $course);

        return view('vod::backend.courses.edit', compact('course'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CourseUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(CourseRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $this->repository->find($id)->fill($request->all())->save();

            flash('更新操作成功', 'success');
            return redirect()->back();
        } catch (ValidationException $e) {
            return $this->toException($e);
        }
    }


    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($id)
    {
        $model = $this->repository->find($id);
        $this->authorize('delete', $model);

        $model->delete();

        flash('删除操作成功', 'success');
        return $this->toResponse([], '删除成功');
    }
}
