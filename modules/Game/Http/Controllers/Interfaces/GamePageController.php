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
use Modules\Game\Models\Repositories\GamePageRepository;

class GamePageController extends BaseController
{
    protected $repository;

    public function __construct(GamePage $repository)
    {
        $this->repository = $repository;
    }

    /**
     * 更新状态
     *
     * @param Request $request
     * @return void
     */
    public function changeStatus($id, Request $request)
    {
        $game = $this->repository->find($id)->update(['status' => $request->get('status')]);
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

        $model = $this->repository->where(['uid' => $request->get('uid')])->first();
        $neibor = $this->repository->orderBy('created_at', 'desc')->where(['mode' => $model->mode, 'game_id' => $model->game_id])->get();

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

        $model = $this->repository->updateOrCreate(['uid' => $request->get('uid')], $request->all());
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

        $model = $this->repository->findWhere(['uid' => $request->get('uid')])->first();
        return $this->toResponse($model, 'success');
    }

    public function componentFind()
    {
        return [];
    }
}
