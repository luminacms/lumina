<?php

namespace Modules\Vote\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vote\Http\Requests\VoteOptionRequest;
use Modules\Vote\Http\Resources\VoteOptionResource;
use Modules\Vote\Models\Repositories\VoteOptionRepository;
use Modules\Vote\Models\VoteOption;

/**
 * Class VoteOptionsController.
 *
 * @package namespace Modules\Vote\Http\Controllers;
 */
class VoteOptionsController extends BaseController
{
    /**
     * @var VoteOption
     */
    protected $repository;

    public function __construct(VoteOption $repository)
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
        if($request->expectsJson()) {
            $voteOptions = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($voteOptions, VoteOptionResource::class);
        }
        return view('vote::backend.voteOptions.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', VoteOption::class);
        return view('vote::backend.voteOptions.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  VoteOptionCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(VoteOptionRequest $request)
    {
        try {
            $voteOption = $this->repository->create($request->all());

            flash('新增操作成功', 'success');
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
        $voteOption = $this->repository->find($id);
        // $this->authorize('view', $voteOption);
        return $this->toTable($voteOption);
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
        $voteOption = $this->repository->find($id);
        // $this->authorize('update', $voteOption);

        return view('vote::backend.voteOptions.edit', compact('voteOption'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  VoteOptionUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(VoteOptionRequest $request, $id)
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
