<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::redirect('/case/{uid}', '/g/{uid}?'.http_build_query(array_merge(['old' => 1, 'p'=>\request('p')])));
// Route::redirect('/game/{uid}', '/g/{uid}?'.http_build_query(array_merge(['old' => 1, 'p'=>\request('p')])));

// Route::get("/g/{uid}", "GameController@show")->name("game.show")->middleware([Modules\Game\Http\Middleware\GameOauthCheck::class]);
Route::get("/g/{uid}", "GameController@show")->name("game.show")->middleware([Modules\Game\Http\Middleware\GameOauthCheck::class, 'responseCache']);

// Backend
Route::group(['middleware' => ['auth:org', 'permission.org:module_game'], 'prefix' =>'backend/game', 'as' => 'game.'], function () {

    Route::get('/page/webide', 'Backend\GamePageController@webide')->name('sourceide');
    Route::get('/page/diy', 'Backend\GamePageController@diy')->name('diyide');

    Route::resource('/games', 'Backend\GamesController');

    Route::post('game-page/store', 'Backend\GamePageController@submit')->name('gamePage.submit');
    Route::resource('game-page', 'Backend\GamePageController');
});
