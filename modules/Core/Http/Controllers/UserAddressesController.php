<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Models\UserAddress;
use Illuminate\Validation\ValidationException;
use Modules\Core\Http\Requests\UserAddressRequest;
use Modules\Core\Http\Resources\UserAddressesResource;
use Modules\Core\Models\Repositories\UserAddressRepository;

/**
 * Class UserAddressesController.
 *
 * @package namespace Modules\Core\Http\Controllers;
 */
class UserAddressesController extends BaseController
{
    /**
     * @var UserAddress
     */
    protected $repository;

    public function __construct(UserAddress $repository)
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
            $userAddresses = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($userAddresses, UserAddressesResource::class);
        }
        return view('core::userAddresses.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', UserAddress::class);
        return view('core::userAddresses.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  UserAddressCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(UserAddressRequest $request)
    {
        try {
            $userAddress = $this->repository->create($request->all());

            return redirect()->back()->with('message', '新增操作成功');
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
        $userAddress = $this->repository->find($id);
        // $this->authorize('view', $userAddress);
        return $this->toTable($userAddress);
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
        $userAddress = $this->repository->find($id);
        // $this->authorize('update', $userAddress);

        return view('core::userAddresses.edit', compact('userAddress'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserAddressUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(UserAddressRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $model->fill($request->all())->save();

            return redirect()->back()->with('message', '更新操作成功');
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
        $this->repository->delet($id);
        return redirect()->back()->with('message', 'UserAddress deleted.');
    }
}
