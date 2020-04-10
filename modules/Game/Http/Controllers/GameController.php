<?php
/**
 * Created by PhpStorm.
 * User: win10
 * Date: 2018/5/14
 * Time: 14:55
 */

namespace Modules\Game\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Game\Models\Game;
use Modules\Game\Models\GamePage;
use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Contracts\View\Factory as ViewFactory;

class GameController extends BaseController
{

    protected $case;
    protected $gamePage;
    public function __construct(Game $case, GamePage $gamePage)
    {
        $this->case = $case;
        $this->gamePage = $gamePage;
    }

    public function redirect($id)
    {
        return response()->redirectToRoute('game.show', $id);
    }


    /**
     * @param $id
     * @return mixed
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function show($uid, Request $request)
    {
        if($request->get('old')) {
            $game = Game::findOrFail($uid);

            $_gamePath = storage_path($game->getPath());
            $view = app(ViewFactory::class);
            $view->addLocation($_gamePath);
            $view->addNamespace('gamePath', $_gamePath);

            $subpage = request()->p??'index';
            return $view->make('gamePath::'.$subpage, compact('game'));

        }else{
            $game = $this->gamePage->where(['uid' => $uid])->first();

            $tpl = $game->mode == GamePage::MODE_SOURCE ? 'game' : 'game_diy';
            return view('game::'.$tpl, compact('game'));
        }
    }
}
