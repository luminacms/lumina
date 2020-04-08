<?php

namespace Modules\Mall\Http\Controllers;


use Illuminate\Http\Request;
use Modules\Mall\Models\ProductSku;
use Illuminate\Validation\ValidationException;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Mall\Http\Requests\ProductSkuRequest;
use Modules\Mall\Http\Resources\ProductSkuResource;
use Modules\Mall\Models\Repositories\ProductSkuRepository;

/**
 * Class ProductSkusController.
 *
 * @package namespace Modules\Mall\Http\Controllers;
 */
class ProductSkusController extends BaseController
{
    /**
     * @var ProductSku
     */
    protected $repository;

    public function __construct(ProductSku $repository)
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

            $productSkus = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($productSkus, ProductSkuResource::class);
        }
        return view('mall::productSkus.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', ProductSku::class);
        return view('mall::productSkus.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProductSkuCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(ProductSkuRequest $request)
    {
        try {
            $productSku = $this->repository->create($request->all());

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
        $productSku = $this->repository->find($id);
        // $this->authorize('view', $productSku);
        return view('mall::productSkus.show', compact('productSku'));
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
        $productSku = $this->repository->find($id);
        // $this->authorize('update', $productSku);

        return view('mall::productSkus.edit', compact('productSku'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ProductSkuUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(ProductSkuRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $model->fill($request->all())->save();

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
        return redirect()->back()->with('message', 'ProductSku deleted.');
    }
}
