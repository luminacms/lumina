<?php

namespace Modules\Vote\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Vote\Http\Requests\VoteDataRequest;
use Modules\Vote\Http\Resources\VoteDataResource;
use Modules\Vote\Models\Repositories\VoteDataRepository;
use Modules\Vote\Models\VoteData;

/**
 * Class VoteDatasController.
 *
 * @package namespace Modules\Vote\Http\Controllers;
 */
class VoteDatasController extends BaseController
{
    /**
     * @var VoteData
     */
    protected $repository;

    public function __construct(VoteData $repository)
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
            $voteDatas = $this->repository->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($voteDatas, VoteDataResource::class);
        }
        return view('vote::backend.voteDatas.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', VoteData::class);
        return view('vote::backend.voteDatas.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  VoteDataCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(VoteDataRequest $request)
    {
        try {
            $voteDatum = $this->repository->create($request->all());

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
        $voteDatum = $this->repository->find($id);
        // $this->authorize('view', $voteDatum);
        return $this->toTable($voteDatum);
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
        $voteDatum = $this->repository->find($id);
        // $this->authorize('update', $voteDatum);

        return view('vote::backend.voteDatas.edit', compact('voteDatum'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  VoteDataUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(VoteDataRequest $request, $id)
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
        $this->authorize('delete', $model);
        $this->repository->find($id)->delete();

        return $this->toResponse([], '删除成功');
    }
}
