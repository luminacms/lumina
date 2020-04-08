<?php


namespace Modules\Vod\Http\Controllers\Api;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vod\Http\Resources\LessonApiResource;
use Modules\Vod\Models\Repositories\LessonRepository;
use Tymon\JWTAuth\Facades\JWTAuth;

class LessonsController extends BaseController
{
    protected $repository;

    public function __construct(LessonRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function index($course_id, Request $request)
    {
        $lessons = $this->repository->scopeQuery(function($query) use($course_id){
            return $query->where('course_id', $course_id);
        })->paginate($request->get('limit', 15));
        return $this->toCollection($lessons, LessonApiResource::class);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function show($id, Request $request)
    {
        $lesson = $this->repository->find($id);
        $lesson->addCount();

        $this->getJwtUser();

        return $this->toResource($lesson, LessonApiResource::class);
    }

    /**
     * @param $id
     * @param Request $request
     * @return mixed
     */
    public function recommend($id, Request $request)
    {
        $_selfLesson = $this->repository->find($id);
        $lessons = $this->repository->scopeQuery(function($query) use($_selfLesson){
            return $query->where('course_id', $_selfLesson->course_id)->where('id', '<>', $_selfLesson->id);
        })->orderBy('count', 'desc')->paginate($request->get('limit', 15));
        return $this->toCollection($lessons, LessonApiResource::class);
    }

}