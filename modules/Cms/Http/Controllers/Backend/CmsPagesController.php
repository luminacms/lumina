<?php

namespace Modules\Cms\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Cms\Http\Requests\CmsPageRequest;
use Modules\Cms\Http\Resources\CmsPageResource;
use Modules\Cms\Models\CmsPage;
use Modules\Cms\Models\Repositories\CmsPageRepository;
use Modules\Core\Http\Controllers\BaseController;

/**
 * Class CmsPagesController.
 *
 * @package namespace Modules\Cms\Http\Controllers;
 */
class CmsPagesController extends BaseController
{
    /**
     * @var CmsPage
     */
    protected $repository;

    public function __construct(CmsPageRepository $repository)
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
            $cmsPages = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($cmsPages, CmsPageResource::class);
        }
        return view('cms::backend.cmsPages.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', CmsPage::class);
        return view('cms::backend.cmsPages.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CmsPageCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(CmsPageRequest $request)
    {
        try {
            $cmsPage = $this->repository->create($request->all());

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
        $cmsPage = $this->repository->find($id);
        // $this->authorize('view', $cmsPage);
        return $this->toTable($cmsPage);
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
        $cmsPage = $this->repository->find($id);
        // $this->authorize('update', $cmsPage);

        return view('cms::backend.cmsPages.edit', compact('cmsPage'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CmsPageUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(CmsPageRequest $request, $id)
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
