<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Models\UserSocialite;
use Modules\Core\Exceptions\ValidationException;
use Modules\Core\Http\Requests\UserSocialiteRequest;
use Modules\Core\Http\Resources\UserSocialiteResource;
use Modules\Core\Models\Repositories\UserSocialiteRepository;

/**
 * Class UserSocialitesController.
 *
 * @package namespace Modules\Core\Http\Controllers;
 */
class UserSocialitesController extends BaseController
{
    /**
     * @var UserSocialite
     */
    protected $repository;

    public function __construct(UserSocialite $repository)
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
            $userSocialites = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($userSocialites, UserSocialiteResource::class);
        }
        return view('core::userSocialites.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', UserSocialite::class);
        return view('core::userSocialites.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  UserSocialiteCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(UserSocialiteRequest $request)
    {
        try {
            $userSocialite = $this->repository->create($request->all());

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
        $userSocialite = $this->repository->find($id);
        // $this->authorize('view', $userSocialite);
        return $this->toTable($userSocialite);
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
        $userSocialite = $this->repository->find($id);
        // $this->authorize('update', $userSocialite);

        return view('core::userSocialites.edit', compact('userSocialite'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserSocialiteUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(UserSocialiteRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $model->fill($request->all())->save();

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
        $model->delete($id);

        return $this->toResponse([], '删除成功');
    }
}
