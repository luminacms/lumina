<?php

namespace Modules\Payment\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Payment\Http\Resources\PayLogResource;
use Modules\Payment\Models\PayLog;
use Modules\Payment\Models\Repositories\PayLogRepository;

/**
 * Class PayLogsController.
 *
 * @package namespace Modules\Payment\Http\Controllers;
 */
class PayLogsController extends BaseController
{
    /**
     * @var PayLog
     */
    protected $repository;

    public function __construct(PayLog $repository)
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
            $payLogs = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($payLogs, PayLogResource::class);
        }
        return view('payment::payLogs.index');
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
        $payLog = $this->repository->find($id);
        // $this->authorize('view', $payLog);
        return $this->toTable($payLog);
    }
}
