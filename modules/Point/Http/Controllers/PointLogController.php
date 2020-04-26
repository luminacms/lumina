<?php

namespace Modules\Point\Http\Controllers;

use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Point\Models\PointLog;
use Modules\Point\Http\Requests\PointLogRequest;
use Modules\Point\Http\Resources\PointLogResource;

/**
 * Class PointLogController.
 *
 * @package namespace Modules\Point\Http\Controllers;
 */
class PointLogController extends BaseController
{
    /**
     * @var PointLog
     */
    protected $pointLog;

    public function __construct(PointLog $pointLog)
    {
        $this->pointLog = $pointLog;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $pointLog = $this->pointLog->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($pointLog, PointLogResource::class);
        }
        return view('point::pointLog.index');
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
        $pointLog = $this->pointLog->findOrFail($id);
        // $this->authorize('view', $pointLog);
        return $this->toTable($pointLog);
    }

    /**
     * rollback point
     *
     * @param Request $request
     * @return void
     */
    public function rollback(Request $request)
    {
        $request->validate(['id' => 'required']);

        $res = $this->pointLog->findOrFail($request->get('id'))->rollback();
        return $this->toResponse($res);
    }
}
