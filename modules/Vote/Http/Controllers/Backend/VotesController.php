<?php

namespace Modules\Vote\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vote\Http\Requests\VoteRequest;
use Modules\Vote\Http\Resources\VoteResource;
use Modules\Vote\Models\Vote;
use Modules\Vote\Models\VoteOption;

/**
 * Class VotesController.
 *
 * @package namespace Modules\Vote\Http\Controllers;
 */
class VotesController extends BaseController
{
    /**
     * @var Vote
     */
    protected $vote;

    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     * @throws \Prettus\vote\Exceptions\voteException
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {

            $votes = $this->vote->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($votes, VoteResource::class);
        }
        return view('vote::backend.votes.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(Request $request)
    {
        // $this->authorize('create', vote::backend.class);
        $vote = new Vote();
        if($request->exists(['model', 'model_id'])){
            // 关联报名
            $_model = urldecode($request->get('model'));
            $_model_id = $request->get('model_id');
            $model = (new $_model)->find($_model_id);
            $vote->title = '【'.str_replace('\\', '_', $_model).'#'.$_model_id.'】'.$model->name;
            $vote->start_at = $model->start_at;
            $vote->end_at = $model->end_at;
        }
        return view('vote::backend.votes.create', compact('vote'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  VoteCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(VoteRequest $request)
    {
        try {
            DB::transaction(function () use($request){
                $vote = $this->vote->create($request->all());
                if($request->exists(['model', 'model_id'])){
                    // 关联报名
                    $_model = urldecode($request->get('model'));
                    $_model_id = $request->get('model_id');
                    $model = (new $_model)->find($_model_id);
                    $model->votes()->attach($vote->id);
                }
            });

            flash('新增操作成功', 'success');
            return redirect()->route('backend.vote.votes.create');
        } catch (ValidationException $e) {
            return $this->toException($e);
        }
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
        $vote = $this->vote->find($id);
        // $this->authorize('view', $vote);
        return view('vote::backend.votes.show', compact('vote'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $vote = $this->vote->find($id);
        // $this->authorize('update', $vote);

        return view('vote::backend.votes.edit', compact('vote'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  VoteUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(VoteRequest $request, $id)
    {
        try {
            $model = $this->vote->find($id);
            // $this->authorize('update', $model);

            $this->vote->find($id)->fill($request->all())->save();

            flash('更新操作成功', 'success');
            return redirect()->back();
        } catch (ValidationException $e) {
            return $this->toException($e);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = $this->vote->find($id);
        // $this->authorize('delete', $model);
        $this->vote->delet($id);

        return $this->toResponse([], '删除成功');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function state(Request $request)
    {
        $request->validate(['vote_id' => 'required']);
        $options = VoteOption::getRank($request->get('vote_id'));
        return view('vote::backend.votes.state', compact('options'));
    }
}
