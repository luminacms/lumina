<?php

namespace Modules\Game\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Modules\Game\Models\Game;
use Modules\Game\Models\GamePage;
use Illuminate\Support\Facades\View;
use Modules\Game\Http\Requests\GamePageRequest;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Game\Http\Resources\GamePageResource;
use Prettus\Validator\Exceptions\ValidationException;
use Modules\Game\Models\Repositories\GamePageRepository;

/**
 * Class GamePageController.
 *
 * @package namespace Modules\Game\Http\Controllers;
 */
class GamePageController extends BaseController
{
    /**
     * @var GamePage
     */
    protected $repository;
    protected $game;

    public function __construct(GamePage $repository)
    {
        $this->repository = $repository;

        $game_id = \request('game_id');
        if($game_id) {
            $this->repository->where(function($query) use($game_id) {
                return $query->where('game_id', $game_id);
            });
            $this->game = Game::find($game_id);

            View::share('game', $this->game);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {
        $gamePage = collect();
        if($request->expectsJson()) {
            $gamePage = $this->repository->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($gamePage, GamePageResource::class);
        }
        return view('game::backend.gamePage.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', GamePage::class);
        return view('game::backend.gamePage.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  GamePageCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(GamePageRequest $request)
    {
        try {
            // 默认模板
            if($request->get('mode') == 'source') {
                // 源码模式注入微信分享代码
                $_jssdk = <<<EOF
                <script>
                WXJssdk.init(function(wx){
                    wx.checkJsApi({
                        jsApiList: ["getNetworkType", "previewImage","chooseImage"],
                        success: function(res) {
                            alert(JSON.stringify(res));
                        }
                    });
                })</script>
                EOF;
                $request->merge(['content' => $_jssdk]);
            }
            $gamePage = $this->repository->create($request->all());

            if($request->wantsJson()) {
                return $this->toResponse($gamePage, 'success');
            }

            flash('create success', 'success');
            return redirect()->back();
        } catch (\Exception $e) {
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
        $gamePage = $this->repository->find($id);
        // $this->authorize('view', $gamePage);
        return $this->toTable($gamePage);
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
        $gamePage = $this->repository->find($id);
        // $this->authorize('update', $gamePage);

        return view('game::backend.gamePage.edit', compact('gamePage'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  GamePageUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(GamePageRequest $request, $id)
    {
        try {
            // $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $this->repository->find($id)->fill($request->all())->save();

            if($request->wantsJson()) {
                return $this->toResponse($this->repository, '更新操作成功');
            }

            flash('update success', 'success');
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
        // $model = $this->repository->find($id);
        // $this->authorize('delete', $model);
        $this->repository->find($id)->delete();

        flash('delete success', 'success');
        return $this->toResponse([], '删除成功');
    }


    /**
     * web编辑器
     */
    public function webide(Request $request)
    {
        $request->validate(['uid' => 'required']);
        $model = $this->repository->where(['uid' => $request->get('uid')])->first();

        if($request->wantsJson()) {
            return $this->toResponse($model);
        }

        return view('game::webide', compact('model'));
    }

    /**
     * diy编辑器
     */
    public function diy(Request $request)
    {
        $request->validate(['uid' => 'required']);
        $model = $this->repository->where(['uid' => $request->get('uid')])->first();

        if($request->wantsJson()) {
            return $this->toResponse($model);
        }

        return view('game::diyide', compact('model'));
    }

    /**
     * 编辑器提交
     *
     * @param Request $request
     * @return void
     */
    public function submit(Request $request)
    {
        $request->validate(['id'=>'required']);

        $model = $this->repository->update($request->all(), $request->get('id'));
        return $this->toResponse($model, 'success');
    }

}
