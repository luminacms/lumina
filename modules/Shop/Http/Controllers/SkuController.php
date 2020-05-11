<?php

namespace Modules\Shop\Http\Controllers;

use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Shop\Models\Sku;
use Modules\Shop\Http\Requests\SkuRequest;
use Modules\Shop\Http\Resources\SkuResource;

/**
 * Class SkuController.
 *
 * @package namespace Modules\Shop\Http\Controllers;
 */
class SkuController extends BaseController
{
    /**
     * @var Sku
     */
    protected $sku;

    public function __construct(Sku $sku)
    {
        $this->sku = $sku;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $sku = $this->sku->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($sku, SkuResource::class);
        }
        return view('shop::sku.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Sku::class);
        return view('shop::sku.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SkuCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(SkuRequest $request)
    {
        try {
            $sku = $this->sku->create($request->all());
            flash('create success', 'create success');

            return !$request->expectsJson()
                    ? redirect()->back()->withInput()
                    : $this->toResponse($sku, 'success');
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
        $sku = $this->sku->findOrFail($id);
        // $this->authorize('view', $sku);
        return $this->toTable($sku);
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
        $sku = $this->sku->findOrFail($id);
        // $this->authorize('update', $sku);

        return view('shop::sku.edit', compact('sku'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  SkuUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(SkuRequest $request, $id)
    {
        try {
            $model = $this->sku->findOrFail($id);
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
        $model = $this->sku->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], 'delete success');
    }
}
