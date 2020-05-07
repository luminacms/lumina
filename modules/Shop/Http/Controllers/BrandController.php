<?php

namespace Modules\Shop\Http\Controllers;

use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Shop\Models\Brand;
use Modules\Shop\Http\Requests\BrandRequest;
use Modules\Shop\Http\Resources\BrandResource;

/**
 * Class BrandController.
 *
 * @package namespace Modules\Shop\Http\Controllers;
 */
class BrandController extends BaseController
{
    /**
     * @var Brand
     */
    protected $brand;

    public function __construct(Brand $brand)
    {
        $this->brand = $brand;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $brand = $this->brand->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($brand, BrandResource::class);
        }
        return view('shop::brand.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Brand::class);
        return view('shop::brand.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  BrandCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(BrandRequest $request)
    {
        try {
            $brand = $this->brand->create($request->all());
            flash('create success', 'create success');

            return !$request->expectsJson()
                    ? redirect()->back()->withInput()
                    : $this->toResponse($brand, 'success');
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
        $brand = $this->brand->findOrFail($id);
        // $this->authorize('view', $brand);
        return $this->toTable($brand);
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
        $brand = $this->brand->findOrFail($id);
        // $this->authorize('update', $brand);

        return view('shop::brand.edit', compact('brand'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  BrandUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(BrandRequest $request, $id)
    {
        try {
            $model = $this->brand->findOrFail($id);
            // $this->authorize('update', $model);

            if(!$model->isDirty()) {
                return $this->toError([], 'nothing changed');
            }
            if($model->fill($request->all())->save()){
                flash('update success', 'update success');
                
                return !$request->expectsJson()
                    ? redirect()->back()
                    : $this->toResponse($model, 'update success');
            }
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
        $model = $this->brand->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], 'delete success');
    }
}
