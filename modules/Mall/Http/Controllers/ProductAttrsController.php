<?php

namespace Modules\Mall\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Mall\Http\Requests\ProductAttrRequest;
use Modules\Mall\Models\ProductAttr;
use Modules\Mall\Models\Repositories\ProductAttrRepository;

/**
 * Class ProductAttrsController.
 *
 * @package namespace Modules\Mall\Http\Controllers;
 */
class ProductAttrsController extends BaseController
{
    /**
     * @var ProductAttr
     */
    protected $repository;

    public function __construct(ProductAttr $repository)
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

            $productAttrs = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($productAttrs, productAttrsResource::class);
        }
        return view('mall::productAttrs.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', ProductAttr::class);
        return view('mall::productAttrs.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProductAttrCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(ProductAttrRequest $request)
    {
        try {
            $productAttr = $this->repository->create($request->all());

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
        $productAttr = $this->repository->find($id);
        // $this->authorize('view', $productAttr);
        return view('mall::productAttrs.show', compact('productAttr'));
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
        $productAttr = $this->repository->find($id);
        // $this->authorize('update', $productAttr);

        return view('mall::productAttrs.edit', compact('productAttr'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ProductAttrUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(ProductAttrRequest $request, $id)
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
        return redirect()->back()->with('message', 'ProductAttr deleted.');
    }
}
