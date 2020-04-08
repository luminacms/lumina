<?php

namespace Modules\Querylist\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Querylist\Http\Requests\QlPostRequest;
use Modules\Querylist\Http\Resources\QlPostResource;
use Modules\Querylist\Models\QlPost;
use Modules\Querylist\Models\Repositories\QlPostRepository;

/**
 * Class QlPostsController.
 *
 * @package namespace Modules\Querylist\Http\Controllers;
 */
class QlPostsController extends BaseController
{
    /**
     * @var QlPost
     */
    protected $repository;

    public function __construct(QlPostRepository $repository)
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
            $qlPosts = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($qlPosts, QlPostResource::class);
        }
        return view('querylist::qlPosts.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', QlPost::class);
        return view('querylist::qlPosts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  QlPostCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(QlPostRequest $request)
    {
        try {
            $qlPost = $this->repository->create($request->all());

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
        $qlPost = $this->repository->find($id);
        // $this->authorize('view', $qlPost);
        return $this->toTable($qlPost);
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
        $qlPost = $this->repository->find($id);
        // $this->authorize('update', $qlPost);

        return view('querylist::qlPosts.edit', compact('qlPost'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  QlPostUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(QlPostRequest $request, $id)
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

        return $this->toResponse([], '删除成功');
    }
}
