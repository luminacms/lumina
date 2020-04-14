<?php

namespace Modules\Vod\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Payment\Traits\HasPayment;
use Modules\Vod\Exports\OrderExport;
use Modules\Vod\Http\Requests\VodOrderRequest;
use Modules\vod\Http\Resources\VodOrderResource;
use Modules\Vod\Models\Repositories\VodOrderRepository;
use Modules\Vod\Models\VodOrder;

/**
 * Class VodOrdersController.
 *
 * @package namespace Modules\Vod\Http\Controllers;
 */
class VodOrdersController extends BaseController
{
    use HasPayment;
    /**
     * @var VodOrder
     */
    protected $repository;

    public function __construct(VodOrderRepository $repository)
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
            $vodOrders = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($vodOrders, VodOrderResource::class);
        }
        return view('vod::backend.vodOrders.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', VodOrder::class);
        return view('vod::backend.vodOrders.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  VodOrderCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(VodOrderRequest $request)
    {
        try {
            $vodOrder = $this->repository->create($request->all());

            flash('新增操作成功', 'success');
            return redirect()->back();
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
        $vodOrder = $this->repository->with('createBy:userid,id,name,nickname')->find($id);
        // $this->authorize('view', $vodOrder);
        return $this->toTable($vodOrder);
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
        $vodOrder = $this->repository->find($id);
        // $this->authorize('update', $vodOrder);

        return view('vod::backend.vodOrders.edit', compact('vodOrder'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  VodOrderUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(VodOrderRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $this->repository->find($id)->fill($request->all())->save();

            flash('更新操作成功', 'success');
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
//        $model = $this->repository->find($id);
        // $this->authorize('delete', $model);
        $this->repository->find($id)->delete();

        return $this->toResponse([], '删除成功');
    }


    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh($id)
    {
        $model = $this->repository->find($id);
        $this->syncTransaction($model->getMorphClass(), $model->order_id);

        return $this->toResponse([]);
    }

    /**
     * 导出
     *
     * @return void
     */
    public function export()
    {
        return $this->toAjaxExport(new OrderExport());
    }
}
