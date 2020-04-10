<?php
/**
 * Created by PhpStorm.
 * User: win10
 * Date: 2018/5/14
 * Time: 14:55
 */

namespace Modules\Game\Http\Controllers\Interfaces;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Game\Models\GamePage;
use Modules\Game\Models\Repositories\GamePagegamePage;

class GamePageController extends BaseController
{
    protected $gamePage;

    public function __construct(GamePage $gamePage)
    {
        $this->gamePage = $gamePage;
    }

    /**
     * 更新状态
     *
     * @param Request $request
     * @return void
     */
    public function changeStatus($id, Request $request)
    {
        $game = $this->gamePage->find($id)->update(['status' => $request->get('status')]);
        return $this->toResponse($game);
    }


    /**
     * 获取相关页面
     *
     * @param Request $request
     * @return void
     */
    public function neighbor(Request $request)
    {
        $request->validate(['uid' => 'required']);

        $model = $this->gamePage->where(['uid' => $request->get('uid')])->first();
        $neibor = $this->gamePage->orderBy('created_at', 'desc')->where(['mode' => $model->mode, 'game_id' => $model->game_id])->get();

        return $this->toResponse($neibor);
    }

    /**
     * 代码保存
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request)
    {
        $request->validate(['uid' => 'required']);

        $model = $this->gamePage->updateOrCreate(['uid' => $request->get('uid')], $request->all());
        return $this->toResponse($model, 'success');
    }


    /**
     * 页面详情
     *
     * @param Request $request
     * @return void
     */
    public function detail(Request $request)
    {
        $request->validate(['uid' => 'required']);

        $model = $this->gamePage->where(['uid' => $request->get('uid')])->first();
        return $this->toResponse($model, 'success');
    }

    public function searchByName()
    {
        return response()->json([
            'data' => config('game.diy.components'),
            'code' => 1,
            'msg' => 'success'
        ]);
    }

    public function componentFind()
    {
        return response()->json([
            'data' => [],
            'code' => 1,
            'msg' => 'success'
        ]);
    }

    /**
     * save gamePage
     *
     * @param Request $request
     * @return void
     */
    public function save(Request $request)
    {
        $page = GamePage::find($request->get('id'));
        $page->fill($request->all());
        $page->save();

        return response()->json([
            'data' => $page,
            'code' => 1,
            'msg' => 'success'
        ]);
    }
}
