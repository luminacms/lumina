<?php

namespace Modules\Point\Http\Controllers;

use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Point\Models\Point;
use Modules\Point\Http\Requests\PointRequest;
use Modules\Point\Http\Resources\PointResource;

/**
 * Class PointController.
 *
 * @package namespace Modules\Point\Http\Controllers;
 */
class PointController extends BaseController
{
    /**
     * @var Point
     */
    protected $point;

    public function __construct(Point $point)
    {
        $this->point = $point;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $point = $this->point->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($point, PointResource::class);
        }
        return view('point::point.index');
    }

    
}
