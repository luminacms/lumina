<?php

namespace Modules\Shop\Http\Controllers;

use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Shop\Models\Spu;
use Modules\Shop\Http\Requests\SpuRequest;
use Modules\Shop\Http\Resources\SpuResource;

/**
 * Class SpuController.
 *
 * @package namespace Modules\Shop\Http\Controllers;
 */
class SpuController extends BaseController
{
    /**
     * @var Spu
     */
    protected $spu;

    public function __construct(Spu $spu)
    {
        $this->spu = $spu;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $spu = $this->spu->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($spu, SpuResource::class);
        }
        return view('shop::spu.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Spu::class);
        return view('shop::spu.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SpuCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(SpuRequest $request)
    {
        try {
            $spu = $this->spu->create($request->all());
            flash('create success', 'create success');

            return !$request->expectsJson()
                    ? redirect()->back()->withInput()
                    : $this->toResponse($spu, 'success');
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
        $spu = $this->spu->findOrFail($id);
        // $this->authorize('view', $spu);
        return $this->toTable($spu);
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
        $spu = $this->spu->findOrFail($id);
        // $this->authorize('update', $spu);

        return view('shop::spu.edit', compact('spu'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  SpuUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(SpuRequest $request, $id)
    {
        try {
            $model = $this->spu->findOrFail($id);
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
        $model = $this->spu->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], '删除成功');
    }
}
