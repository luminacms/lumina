<?php

namespace Modules\Shop\Http\Controllers;

use Exception;
use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Shop\Models\Order;
use Modules\Shop\Http\Requests\OrderRequest;
use Modules\Shop\Http\Resources\OrderResource;
use Symfony\Component\Workflow\Workflow;

/**
 * Class OrderController.
 *
 * @package namespace Modules\Shop\Http\Controllers;
 */
class OrderController extends BaseController
{
    /**
     * @var Order
     */
    protected $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $order = $this->order->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($order, OrderResource::class);
        }
        return view('shop::order.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Order::class);
        return view('shop::order.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  OrderCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(OrderRequest $request)
    {
        try {
            $order = $this->order->create($request->all());
            flash('create success', 'success');

            return !$request->expectsJson()
                    ? redirect()->back()->withInput()
                    : $this->toResponse($order, 'success');
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
        $order = $this->order->with(['skus', 'address'])->where('order_id', $id)->first();
        // $this->authorize('view', $order);
        return view('shop::order.show', compact('order'));
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
        $order = $this->order->findOrFail($id);
        // $this->authorize('update', $order);

        return view('shop::order.edit', compact('order'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  OrderUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(OrderRequest $request, $id)
    {
        try {
            $model = $this->order->findOrFail($id);
            // $this->authorize('update', $model);

            $model->fill($request->all());
            if(!$model->isDirty()) {
                return $this->toError(-1, 'nothing changed');
            }
            if($model->save()){
                flash('update success', 'success');

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
        $model = $this->order->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], 'delete success');
    }

    /**
     * 订单发货
     *
     * @param Request $request
     * @param Workflow $workflow
     * @return void
     */
    public function shipping(Request $request)
    {
        $request->validate(['order_id' => 'required', 'express_company' => 'required', 'express_no' => 'required']);

        $order = $this->order->where('order_id', $request->get('order_id'))->firstOrFail();

        // 更新状态
        try{
            $workflow = app('workflow')->get($order);
            $r = $workflow->apply($order, 'to_shipping', [
                'delivery_at' => now(),
                'express_company' => $request->get('express_company'),
                'express_no' => $request->get('express_no'),
            ]);
        }catch(Exception $e){
            $r = false;
        }
        $r ? flash('发货成功', 'success'): flash('发货失败或订单状态不允许', 'error');

        return redirect()->back();
    }
}
