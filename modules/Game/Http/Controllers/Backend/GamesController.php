<?php

namespace Modules\Game\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Game\Http\Requests\GameRequest;
use Modules\Game\Http\Resources\GameResource;
use Modules\Game\Models\Game;
use Modules\Game\Models\GamePage;
use Modules\Game\Models\Repositories\GamePageRepository;
use Modules\Game\Models\Repositories\GameRepository;

/**
 * Class GamesController.
 *
 * @package namespace Modules\Game\Http\Controllers;
 */
class GamesController extends BaseController
{
    /**
     * @var Game
     */
    protected $repository;

    public function __construct(Game $repository)
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

            $games = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($games, GameResource::class);
        }
        return view('game::backend.games.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Game::class);
        return view('game::backend.games.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  GameCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(GameRequest $request)
    {
        try {
            $game = $this->repository->create($request->all());

            if($request->wantsJson()) {
                return $this->toResponse($game, 'success');
            }

            flash('新增操作成功', 'success');
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
        $game = $this->repository->find($id);
        // $this->authorize('view', $game);
        return view('game::backend.games.show', compact('game'));
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
        $game = $this->repository->find($id);
        // $this->authorize('update', $game);

        return view('game::backend.games.edit', compact('game'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  GameUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(GameRequest $request, $id)
    {
        try {
//            $model = $this->repository->find($id);
            // $this->authorize('update', $model);
            // $request['wechat_oauth'] = $request->get('wechat_oauth', 0);
            $this->repository->find($id)->fill($request->all())->save();

            if($request->wantsJson()) {
                return $this->toResponse($this->repository, '更新操作成功');
            }

            flash('更新操作成功', 'success');
            return redirect()->back();
        } catch (ValidationException $e) {
            return $this->toException($e);
        }
    }


    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy($id, GamePageRepository $gamePage)
    {
        // $this->authorize('delete', $model);
        // game page检查
        $pgCount = $gamePage->findWhere(['game_id' => $id])->count();
        if($pgCount > 0) {
            return $this->toError(-1, '请先清空页面再删除游戏项目');
        }

        $this->repository->find($id)->delete();

        return $this->toResponse([], '删除操作成功');
    }
}
