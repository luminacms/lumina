<?php


namespace Modules\Vote\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vote\Http\Requests\VoteDataRequest;
use Modules\Vote\Http\Requests\VoteLogRequest;
use Modules\Vote\Http\Requests\VoteRequest;
use Modules\Vote\Http\Resources\VoteDataResource;
use Modules\Vote\Http\Resources\VoteOptionResource;
use Modules\Vote\Models\Vote;
use Modules\Vote\Models\VoteData;
use Modules\Vote\Models\VoteLog;
use Modules\Vote\Models\VoteOption;

class VotesController extends BaseController
{

    protected $vote;
    public function __construct(Vote $vote, Request $request)
    {
        $this->middleware('auth')->only('my');

        $vote = $request->route('vote');
        if($vote) {
            // $vid = !is_numeric($vote)?current(Hashids::connection('vote')->decode($vote)):$vote;
            $this->vote = Vote::find($vote);
            if(!$request->wantsJson() && $this->vote) {
                $this->vote->addCount();
            }
            View::share('vote', $this->vote);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->wantsJson()) {
            $request->validate(['sid' =>'required']);

            $options = VoteOption::where('vote_id', $this->vote->id);
            if($subject_id = $request->get('subject_id')) {
                $options->where('subject_id', $subject_id);
            }
            $vote = $options->paginate($request->get('limit', 15));
            return $this->toCollection($vote, VoteOptionResource::class);
        }
        if($this->vote->type == Vote::TYPE_QUIZ) {

        }
        return view('vote::'.$this->vote->type.'.default.index');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(VoteDataRequest $request)
    {
        if(!$this->vote) abort(404);

        // 检查是否在投放期
        $request->checkTimeValidate($this->vote, $request);

        if(!auth()->guest()) {
            // 授权模式只允许提交一次
            $_existData = $this->vote->voteData()->where('create_by', auth()->user()->user_id)->first();
            if($_existData) {
                if($_existData['score'] > $request['score']) {
                    unset($request['score']);
                }
                $r = $_existData->fill($request->all())->save();
            }else{
                $r = $this->vote->voteData()->create($request->all());
            }
        }else{
            $r = $this->vote->voteData()->create($request->all());
        }

        if($request->wantsJson() || $request->ajax()){
            return $this->toResponse([], 'success');
        }
        flash('报名成功', 'success');
        return redirect()->back();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function option(Request $request)
    {
        $request->validate(['oid' =>'required', 'sid' =>'required']);

        $option = VoteOption::where([['id', $request->get('oid')], ['subject_id', $request->get('sid')]])->first();
        return view('vote::vote.default.option', compact('option'));
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function rule()
    {
        return view('vote::vote.default.rule');
    }

    /**
     * @param VoteRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function submit(VoteLogRequest $request)
    {
        $request->validate(['vid' => 'required', 'sid' => 'required', 'oid' => 'required', 'deviceid' => 'required']);
        $option = VoteOption::where([
            ['subject_id', $request->get('sid')],
            ['vote_id', $request->get('vid')],
            ['id', $request->get('oid')]
        ])->first();
        if($option) {
            $deviceid = $request->get('deviceid');
            DB::transaction(function () use($option, $request, $deviceid) {
                $option->addCount();
                VoteLog::recordLog($deviceid, $option);
            });
            return $this->toResponse(['count' => $option->count, 'times' => $option->getLastTimes($request)]);
        }
        return $this->toError(-1, '数据不存在');
    }


    /**
     * @param VoteRequest $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function rank(VoteRequest $request)
    {
        if(!$this->vote) abort(404);
        if($this->vote->type == Vote::TYPE_DEFAULT) {
            return $this->toCollection(VoteData::getRank(
                $this->vote->id, $request->get('limit', 15), $request->get('sortedBy', 'desc'), $request->exists('hasmobile')
            ), VoteDataResource::class);
        }else{
            $rank = VoteOption::getRank($this->vote->id, $request->get('sid'));
            return view('vote::vote.default.rank', compact('rank'));
        }
    }

    public function my(VoteRequest $request)
    {
        return view('vote::vote.default.my');
    }

    /**
     * 获取提交人信息
     */
    public function result(Request $request)
    {
        if(!$this->vote) abort(404);

        $data = $this->vote->voteData()->where('create_by', \auth()->user()->user_id)->first();

        return $this->toResource($data, VoteDataResource::class);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function apply(Request $request)
    {
        if($request->isMethod('get')) {
            return view('vote::vote.default.my');
        }
        $request->validate([
            'thumb' => 'required',
            'name' =>'required',
            'mobile' =>'required',
            'profile' =>'required'
        ]);

        VoteOption::create([
            'vote_id' => $this->vote->id,
            'status' => VoteOption::STATUS_PENDING,
            'thumb' => $request->get('thumb'),
            'name' => $request->get('name'),
            'mobile' => $request->get('mobile'),
            'profile' => $request->get('profile')
        ]);

        flash('报名成功', 'success');
        return redirect()->back();
    }

}
