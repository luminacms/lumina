<?php


namespace Modules\Vod\Http\Controllers\Api;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vod\Http\Resources\CourseResource;
use Modules\Vod\Http\Resources\LikeResource;
use Modules\Vod\Models\Repositories\CourseRepository;
use Modules\Vod\Models\Repositories\VodLikeRepository;
use Modules\Vod\Models\VodLike;
use Modules\Vod\Models\VodOrder;

class LikesController extends BaseController
{
    protected $repository;

    public function __construct(VodLikeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $courses = $this->repository->paginate($request->get('limit', 2));
        return $this->toCollection($courses, LikeResource::class);
    }

    /**
     * @param Request $request
     * @param VodLike $like
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, VodLike $like)
    {
        $request->validate([
            'model_id' => 'required',
            'model_type' => 'required'
        ]);
        if(!VodOrder::checkModelExist($request->get('model_type'), $request->get('model_id'))) {
            return $this->toError(404, '对应课程已下线或不存在，收藏失败');
        }
        $liked = $like->where([
            ['model_id', $request->get('model_id')],
            ['model_type', $request->get('model_type')],
            ['create_by', auth()->user()->getKey()]
        ])->first();
        if(!$liked) {
            $like->create($request->all());
            $type = 'in';
        }else{
            $liked->delete();
            $type = 'out';
        }
        return $this->toResponse(['result' => $type]);
    }

}