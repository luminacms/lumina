<?php

namespace Modules\Mall\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Mall\Http\Requests\ProductBrandRequest;
use Modules\Mall\Http\Resources\ProductBrandResource;
use Modules\Mall\Models\ProductBrand;
use Modules\Mall\Models\Repositories\ProductBrandRepository;

/**
 * Class ProductBrandsController.
 *
 * @package namespace Modules\Mall\Http\Controllers;
 */
class ProductBrandsController extends BaseController
{
    /**
     * @var ProductBrand
     */
    protected $repository;

    public function __construct(ProductBrand $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param ProductBrandRepository $repository
     * @return \Illuminate\Http\Response
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {

            $productBrands = $this->repository->paginate();
            $searchFields = $this->repository->orderBy('created_at', 'desc')->getFieldsSearchable();
            return $this->toCollection($productBrands, ProductBrandResource::class);
        }
        return view('mall::productBrands.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', ProductBrand::class);
        return view('mall::productBrands.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProductBrandCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(ProductBrandRequest $request)
    {
        try {
            $productBrand = $this->repository->create($request->all());

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
        $productBrand = $this->repository->find($id);
        // $this->authorize('view', $productBrand);
        return view('mall::productBrands.show', compact('productBrand'));
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
        $productBrand = $this->repository->find($id);
        // $this->authorize('update', $productBrand);

        return view('mall::productBrands.edit', compact('productBrand'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ProductBrandUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(ProductBrandRequest $request, $id)
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
        return redirect()->back()->with('message', 'ProductBrand deleted.');
    }
}
