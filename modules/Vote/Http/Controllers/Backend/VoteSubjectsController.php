<?php

namespace Modules\Vote\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vote\Http\Requests\VoteSubjectRequest;
use Modules\Vote\Models\Repositories\VoteSubjectRepository;
use Modules\Vote\Models\Vote;
use Modules\Vote\Models\VoteOption;
use Modules\Vote\Models\VoteSubject;

/**
 * Class VoteSubjectsController.
 *
 * @package namespace Modules\Vote\Http\Controllers;
 */
class VoteSubjectsController extends BaseController
{
    /**
     * @var VoteSubject
     */
    protected $repository;

    public function __construct(VoteSubject $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        $request->validate(['vote_id' => 'required']);
        $vote_id = $request->get('vote_id');
        $vote = Vote::findOrFail($vote_id);
        return view('vote::backend.voteSubjects.index', compact('vote'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', VoteSubject::class);
        return view('vote::backend.voteSubjects.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  VoteSubjectCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(VoteSubjectRequest $request)
    {
        try {
            $_vote_id = $request->get('vote_id');
            foreach ($request->get('subject') as $_subject) {
                $subject = $this->repository->updateOrCreate(['id'=>$_subject['subject_id']], ['title' => $_subject['title'], 'vote_id' => $_vote_id]);
                if (isset($_subject['option'])) {
                    foreach ($_subject['option'] as $_option) {
                        VoteOption::updateOrCreate(['id' => $_option['option_id']], array_merge($_option, [
                            'subject_id' => $subject->id,
                            'vote_id' => $_vote_id
                        ]));
                    }
                }
            }
            flash('保存成功', 'success');
            return redirect()->back();
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
        $voteSubject = $this->repository->find($id);
        // $this->authorize('view', $voteSubject);
        return $this->toTable($voteSubject);
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
        $voteSubject = $this->repository->find($id);
        // $this->authorize('update', $voteSubject);

        return view('vote::backend.voteSubjects.edit', compact('voteSubject'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  VoteSubjectUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(VoteSubjectRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $this->repository->find($id)->fill($request->all())->save();

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
        $model = $this->repository->find($id);
        // $this->authorize('delete', $model);
        $this->repository->find($id)->delete();

        return $this->toResponse([], '删除成功');
    }
}
