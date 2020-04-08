<?php

namespace Modules\Wechat\Http\Controllers\Backend;

use App\Http\Controllers\AccountBaseController;
use App\Http\Controllers\Controller;
use App\Models\Repositories\MsgRepository;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Wechat\Http\Requests\MsgRequest;
use Modules\Wechat\Models\Msg;

/**
 * Class MsgsController.
 *
 * @package namespace Module\Wechat\Http\Controllers;
 */
class MsgsController extends BaseController
{
    /**
     * @var Msg
     */
    protected $model;

    public function __construct(Msg $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $msgs = Msg::where('appid', $this->account->appid)->with('reply')->orderBy('created_at', 'desc')->paginate();
        return view('wechat::msgs.index', compact('msgs'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Msg::class);
        return view('wechat::msgs.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  MsgCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(MsgRequest $request)
    {
        try {
            $msg = $this->model->fill($request->all());
            $msg->save();

            $replys = [];
            foreach ($request->get('key') as $_key) {
                $replys[] = [
                    'appid' => $request->get('appid'),
                    'type' => $_key['type'],
                    'value' => $_key['value'],
                    'msg_id' => $msg->id
                ];
            }
            $msg->reply()->createMany($replys);

            return $this->toResponse($msg, '新增操作成功');
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
        $msg = Msg::findOrFail($id);
        // $this->authorize('view', $msg);

        return view('wechat::msgs.show', compact('msg'));
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
        $msg = Msg::findOrFail($id);
        // $this->authorize('update', $msg);

        return view('wechat::msgs.edit', compact('msg'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  MsgUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(MsgRequest $request, $id)
    {
        try {
            $model = Msg::findOrFail($id);
            // $this->authorize('update', $model);

            $msg = $model->fill($request->all())->save();

            return $this->toResponse($msg, '更新操作成功');
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
        $model = Msg::findOrFail($id);
        // $this->authorize('delete', $model);
        $deleted = $model->delete();

        return redirect()->back()->with('message', 'Msg deleted.');
    }
}
