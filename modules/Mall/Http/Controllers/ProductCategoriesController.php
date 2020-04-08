<?php

namespace Modules\Mall\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Mall\Http\Requests\ProductCategoryRequest;
use Modules\Mall\Http\Resources\ProductCategoryResource;
use Modules\Mall\Models\ProductCategory;
use Modules\Mall\Models\Repositories\ProductCategoryRepository;

/**
 * Class ProductCategoriesController.
 *
 * @package namespace Modules\Mall\Http\Controllers;
 */
class ProductCategoriesController extends BaseController
{
    /**
     * @var ProductCategory
     */
    protected $repository;

    public function __construct(ProductCategory $repository)
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

            $productCategories = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($productCategories, ProductCategoryResource::class);
        }
        return view('mall::productCategories.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', ProductCategory::class);
        return view('mall::productCategories.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProductCategoryCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(ProductCategoryRequest $request)
    {
        try {
            $productCategory = $this->repository->create($request->all());

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
        $productCategory = $this->repository->find($id);
        // $this->authorize('view', $productCategory);
        return view('mall::productCategories.show', compact('productCategory'));
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
        $productCategory = $this->repository->find($id);
        // $this->authorize('update', $productCategory);

        return view('mall::productCategories.edit', compact('productCategory'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ProductCategoryUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(ProductCategoryRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $this->repository->find($id)->fill($request->all())->save();

            return redirect()->back()->with('message', '更新操作成功');
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
        $this->repository->delet($id);
        return redirect()->back()->with('message', 'ProductCategory deleted.');
    }
}
