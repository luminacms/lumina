<?php

namespace Modules\Mall\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Mall\Models\ProductSpu;
use Modules\Mall\Models\ProductAttrValue;
use Illuminate\Validation\ValidationException;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Mall\Http\Requests\ProductSpuRequest;
use Modules\Mall\Http\Resources\ProductSpuResource;
use Modules\Mall\Models\Repositories\ProductSpuRepository;

/**
 * Class ProductSpusController.
 *
 * @package namespace Modules\Mall\Http\Controllers;
 */
class ProductSpusController extends BaseController
{
    /**
     * @var ProductSpu
     */
    protected $repository;

    public function __construct(ProductSpu $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param ProductSpuRepository $repository
     * @return \Illuminate\Http\Response
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {

            $productSpus = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($productSpus, ProductSpuResource::class);
        }
        return view('mall::productSpus.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', ProductSpu::class);
        return view('mall::productSpus.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProductSpuCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(ProductSpuRequest $request)
    {
        try {
            DB::transaction(function () use($request) {
                $productSpu = $this->repository->create($request->all());
                foreach ($request->get('sku') as $_sku) {
                    $sku = $productSpu->skus()->create($_sku);
                    // 更新属性值表
                    if(count($_sku['attrs']) > 0){
                        foreach ($_sku['attrs'] as $_attr_k=> $_attr_val){
                            ProductAttrValue::updateOrCreate(['attr_id' => $_attr_k, 'value' =>$_attr_val]);
                        }
                    }
                    // 更新库存表
                    $sku->stocks()->create(['quantity' => $_sku['quantity']]);
                }
            });

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
        $productSpu = $this->repository->find($id);
        // $this->authorize('view', $productSpu);
        return $this->toTable($productSpu);
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
        $productSpu = $this->repository->find($id);
        // $this->authorize('update', $productSpu);

        return view('mall::productSpus.edit', compact('productSpu'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ProductSpuUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(ProductSpuRequest $request, $id)
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
        return redirect()->back()->with('message', 'ProductSpu deleted.');
    }
}
