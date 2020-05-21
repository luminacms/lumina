<?php

namespace Modules\Shop\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Shop\Models\Delivery;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Shop\Http\Requests\DeliveryRequest;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Shop\Http\Resources\DeliveryResource;

/**
 * Class DeliveryController.
 *
 * @package namespace Modules\Shop\Http\Controllers;
 */
class DeliveryController extends BaseController
{
    /**
     * @var Delivery
     */
    protected $delivery;

    public function __construct(Delivery $delivery)
    {
        $this->delivery = $delivery;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $delivery = $this->delivery->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($delivery, DeliveryResource::class);
        }
        return view('shop::delivery.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Delivery::class);
        return view('shop::delivery.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  DeliveryCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(DeliveryRequest $request)
    {
        try {
            $res = DB::transaction(function () use($request) {
                $delivery = $this->delivery->create($request->all());
                $delivery->rules()->createMany($request->get('rule'));

                return $delivery;
            });

            if($request->expectsJson()) {
                return $this->toResponse($res, 'success');
            }

            flash('create success', 'success');
            return redirect()->back()->withInput();
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
        $delivery = $this->delivery->findOrFail($id);
        // $this->authorize('view', $delivery);
        return $this->toTable($delivery);
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
        $delivery = $this->delivery->findOrFail($id);
        // $this->authorize('update', $delivery);

        return view('shop::delivery.edit', compact('delivery'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  DeliveryUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(DeliveryRequest $request, $id)
    {
        try {
            $model = $this->delivery->findOrFail($id);
            // $this->authorize('update', $model);

            $model->fill($request->all());
            if(!$model->isDirty()) {
                return $this->toError(-1, 'nothing changed');
            }
            $model->save();
            if($request->expectsJson()) {
                return $this->toResponse($model, 'update success');
            }

            flash('update success', 'success');
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
        $model = $this->delivery->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], 'delete success');
    }
}
