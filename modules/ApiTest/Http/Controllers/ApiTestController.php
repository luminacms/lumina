<?php declare(strict_types = 1);

namespace Modules\ApiTest\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\View\View;
use Nwidart\Modules\Facades\Module;
use Modules\Core\Http\Controllers\BaseController;
use Modules\ApiTest\Contracts\RouteRepositoryInterface;

class ApiTestController extends BaseController
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index():View
    {
        return view('apitest::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function data(RouteRepositoryInterface $repository):JsonResponse
    {
        $data = $repository->get(
            config('apitest.include'),
            config('apitest.exclude')
        );
        return $this->toResponse($data->groupBy('moduleid'));
    }
}
