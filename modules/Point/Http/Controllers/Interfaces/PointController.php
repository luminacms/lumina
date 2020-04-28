<?php

namespace Modules\Point\Http\Controllers\Interfaces;

use Illuminate\Http\Request;
use Modules\Point\Models\Point;
use Modules\Point\Models\PointLog;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Point\Http\Resources\PointLogInterfaceResource;

/**
 * Class PointController.
 *
 * @package namespace Modules\Point\Http\Controllers;
 */
class PointController extends BaseController
{
    protected $request;
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * point total
     *
     * @return void
     */
    public function index()
    {
        $this->request->validate(['oid' => 'required', 'type' => 'required']);
        return $this->toResponse(Point::total($this->request->get('type')));
    }

    /**
     * 累计积分
     *
     * @return void
     */
    public function submit()
    {
        $this->request->validate(['oid' => 'required', 'type' => 'required', 'count' => 'required|numeric']);

        $request = $this->request;
        $r = Point::increase($request->get('count'), [
            'type' => $request->get('type')
        ]);
        return $this->toResponse(
            Point::total($request->get('type'))
        );
    }

    /**
     * 积分日志
     *
     * $unique 日志唯一 ，默认不启用
     * @return void
     */
    public function log()
    {
        $this->request->validate(['oid' => 'required', 'type' => 'required']);

        $request = $this->request;
        $model = PointLog::where('point_type', $request->get('type'))->when($request->get('log_type'), function($model, $val) {
            return $model->where('type', $val);
        })->when($request->get('unique'), function($model, $val) {
            return $model->groupBy('create_by');
        })->paginate($request->get('page', 15));

        return $this->toCollection($model, PointLogInterfaceResource::class);
    }

}
