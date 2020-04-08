<?php


namespace Modules\Vod\Http\Controllers\Api;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vod\Http\Criterias\CourseRecommendCriteria;
use Modules\Vod\Http\Resources\CourseApiResource;
use Modules\Vod\Http\Resources\CourseResource;
use Modules\Vod\Models\Repositories\CourseRepository;
use Modules\Vod\Models\VodLike;
use Modules\Vod\Models\VodOrder;
use Tymon\JWTAuth\Facades\JWTAuth;

class CoursesController extends BaseController
{
    protected $repository;

    public function __construct(CourseRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $courses = $this->repository->paginate($request->get('limit', 15));
        return $this->toCollection($courses, CourseResource::class);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function show($id, Request $request)
    {
        $course = $this->repository->find($id);
        $course->addCount();

        $this->getJwtUser();
        return $this->toResource($course, CourseApiResource::class);
    }

    /**
     * @param Request $request
     * @param VodLike $like
     * @return \Illuminate\Http\JsonResponse
     */
    public function like(Request $request, VodLike $like)
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


    /**
     * @param $id
     * @param Request $request
     * @return mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function recommend($id, Request $request)
    {
       $this->repository->pushCriteria(CourseRecommendCriteria::class);
        $courses = $this->repository->paginate($request->get('limit', 15));
        return $this->toCollection($courses, CourseResource::class);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function checkOrder($id)
    {
        $course = $this->repository->find($id);
        return $this->toResource($course, CourseApiResource::class);
    }

}