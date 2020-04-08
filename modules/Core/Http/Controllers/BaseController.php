<?php declare(strict_types=1);

namespace Modules\Core\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Modules\Core\Traits\ResponseTrait;
use Nwidart\Modules\Facades\Module;
use Tymon\JWTAuth\Facades\JWTAuth;

class BaseController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, ResponseTrait;

    /**
     * @param $module
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function page($module, Request $request)
    {
        $_tpl = $module.'::pages.'.$request->get('__id', 'index');
        if(Module::has(Str::studly($module)) && view()->exists($_tpl)){
            return view($_tpl);
        }
        abort(404);
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getJwtUser()
    {
        if(JWTAuth::parser()->setRequest(\request())->hasToken()) {
            JWTAuth::parseToken()->authenticate();
        }
    }
}
