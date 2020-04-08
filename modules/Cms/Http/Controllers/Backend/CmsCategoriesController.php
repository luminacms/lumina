<?php

namespace Modules\Cms\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Cms\Http\Requests\CmsCategoryRequest;
use Modules\Cms\Http\Resources\CmsCategoryResource;
use Modules\Cms\Models\CmsCategory;
use Modules\Cms\Models\Repositories\CmsCategoryRepository;
use Modules\Core\Http\Controllers\BaseController;

/**
 * Class CmsCategoriesController.
 *
 * @package namespace Modules\Cms\Http\Controllers;
 */
class CmsCategoriesController extends BaseController
{
    /**
     * @var CmsCategory
     */
    protected $repository;

    public function __construct(CmsCategoryRepository $repository)
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
            $cmsCategories = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($cmsCategories, CmsCategoryResource::class);
        }
        return view('cms::backend.cmsCategories.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', CmsCategory::class);
        return view('cms::backend.cmsCategories.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CmsCategoryCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(CmsCategoryRequest $request)
    {
        try {
            $cmsCategory = $this->repository->create($request->all());

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
        $cmsCategory = $this->repository->find($id);
        // $this->authorize('view', $cmsCategory);
        return $this->toTable($cmsCategory);
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
        $cmsCategory = $this->repository->find($id);
        // $this->authorize('update', $cmsCategory);

        return view('cms::backend.cmsCategories.edit', compact('cmsCategory'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CmsCategoryUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(CmsCategoryRequest $request, $id)
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

        return $this->toResponse([], '删除成功');
    }
}
