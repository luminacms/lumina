<?php

namespace Modules\Payment\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Payment\Http\Resources\PayTransactionResource;
use Modules\Payment\Models\PayTransaction;
use Modules\Payment\Models\Repositories\PayTransactionRepository;

/**
 * Class PayTransactionsController.
 *
 * @package namespace Modules\Payment\Http\Controllers;
 */
class PayTransactionsController extends BaseController
{
    /**
     * @var PayTransaction
     */
    protected $repository;

    public function __construct(PayTransactionRepository $repository)
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
            $payTransactions = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($payTransactions, PayTransactionResource::class);
        }
        return view('payment::payTransactions.index');
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
        $payTransaction = $this->repository->with('createBy:id,user_id,name,nickname,mobile')->find($id);
        // $this->authorize('view', $payTransaction);
        return $this->toTable($payTransaction);
    }

    /**
     * @param Request $request
     * @return string
     */
    public function detail(Request $request)
    {
        $request->validate([
            'model_type' => 'required',
            'model_order_id' => 'required'
        ]);
        $payTransaction = $this->repository->findWhere([
            'model_type' =>  $request->get('model_type'),
            'model_order_id'=> $request->get('model_order_id')
        ])->first();
        $html = $this->toTable($payTransaction);
        return view('payment::payTransactions.detail', compact('html'));
    }

    public function sync($id)
    {
        $trans = $this->repository->findOrFail($id);
        if($trans) {
            $trans->syncTransation();
        }

        return $trans->syncTransation()
                ? $this->toResponse([], '交易更新成功')
                : $this->toError(-1, '更新失败，请稍后重试');
    }
}
