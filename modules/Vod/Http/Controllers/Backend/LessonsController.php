<?php

namespace Modules\Vod\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vod\Http\Requests\LessonRequest;
use Modules\Vod\Http\Resources\LessonResource;
use Modules\Vod\Models\Lesson;
use Modules\Vod\Models\Repositories\LessonRepository;

/**
 * Class LessonsController.
 *
 * @package namespace Modules\Vod\Http\Controllers;
 */
class LessonsController extends BaseController
{
    /**
     * @var Lesson
     */
    protected $repository;

    public function __construct(LessonRepository $repository)
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
            $lessons = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($lessons, LessonResource::class);
        }
        return view('vod::backend.lessons.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Lesson::class);
        return view('vod::backend.lessons.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  LessonCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(LessonRequest $request)
    {
        try {
            $lesson = $this->repository->create($request->all());

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
        $lesson = $this->repository->find($id);
        // $this->authorize('view', $lesson);
        return $this->toTable($lesson);
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
        $lesson = $this->repository->find($id);
        // $this->authorize('update', $lesson);

        return view('vod::backend.lessons.edit', compact('lesson'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  LessonUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(LessonRequest $request, $id)
    {
        try {
//            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $this->repository->find($id)->fill($request->all())->save();

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
        $this->repository->find($id)->delete();

        flash('删除操作成功', 'success');
        return $this->toResponse([], '删除成功');
    }
}
