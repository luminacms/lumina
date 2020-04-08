<?php

namespace Modules\Cms\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Cms\Http\Requests\PostRequest;
use Modules\Cms\Http\Resources\PostResource;
use Modules\Cms\Models\Post;
use Modules\Cms\Models\Repositories\PostRepository;
use Modules\Core\Http\Controllers\BaseController;

/**
 * Class PostsController.
 *
 * @package namespace Modules\Cms\Http\Controllers;
 */
class PostsController extends BaseController
{
    /**
     * @var Post
     */
    protected $repository;

    public function __construct(PostRepository $repository)
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
            $posts = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($posts, PostResource::class);
        }
        return view('cms::backend.posts.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Post::class);
        return view('cms::backend.posts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PostCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(PostRequest $request)
    {
        try {
            $post = $this->repository->create($request->all());
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
        $post = $this->repository->find($id);
        // $this->authorize('view', $post);
        return $this->toTable($post);
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
        $post = $this->repository->find($id);
        // $this->authorize('update', $post);

        return view('cms::backend.posts.edit', compact('post'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  PostUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(PostRequest $request, $id)
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
