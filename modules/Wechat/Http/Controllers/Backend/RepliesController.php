<?php

namespace Modules\Wechat\Http\Controllers\Backend;

use App\Http\Controllers\AccountBaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReplyRequest;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Wechat\Models\Reply;
use Modules\Wechat\Models\Repositories\ReplyRepository;

/**
 * Class RepliesController.
 *
 * @package namespace Module\Wechat\Http\Controllers;
 */
class RepliesController extends BaseController
{
    /**
     * @var Reply
     */
    protected $model;

    public function __construct(Reply $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ReplyRepository $repository)
    {
        $repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $replies = $repository->paginate();
        $searchFields = $repository->getFieldsSearchable();

        return view('wechat::replies.index', compact('replies','searchFields'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Reply::class);
        return view('replies.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ReplyCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(ReplyRequest $request)
    {
        try {
            $reply = $this->model->fill($request->all());
            $reply->save();

            return $this->toResponse($reply,'新增操作成功');
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
        $reply = Reply::findOrFail($id);
        // $this->authorize('view', $reply);

        return view('replies.show', compact('reply'));
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
        $reply = Reply::findOrFail($id);
        // $this->authorize('update', $reply);

        return view('replies.edit', compact('reply'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ReplyUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(ReplyRequest $request, $id)
    {
        try {
            $model = Reply::findOrFail($id);
            // $this->authorize('update', $model);

            $reply = $model->fill($request->all())->save();

            return $this->toResponse($reply, '更新操作成功');
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
        $model = Reply::findOrFail($id);
        // $this->authorize('delete', $model);
        $deleted = $model->delete();

        return redirect()->back()->with('message', 'Reply deleted.');
    }
}
