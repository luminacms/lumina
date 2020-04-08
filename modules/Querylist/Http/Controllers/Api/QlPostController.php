<?php


namespace Modules\Querylist\Http\Controllers\Api;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Querylist\Models\QlPost;
use Modules\Querylist\Http\Resources\QlPostResource;

class QlPostController extends BaseController
{

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $request->validate(['rule_id' =>'required']);

        $qlposts = QlPost::where('rule_id', $request->get('rule_id'))->orderBy('post_at', 'desc')->paginate(10);
        return $this->toCollection($qlposts, QlPostResource::class);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function show(Request $request)
    {
        $request->validate(['id' =>'required']);

        $qlposts = QlPost::find($request->get('id'));
        return $this->toResource($qlposts, QlPostResource::class);
    }

}
