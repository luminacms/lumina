<?php

use Illuminate\Http\Request;
use Modules\Game\Models\GamePage;
use Modules\Game\Models\GameDiyComponent;

Route::post('/game-page/{id}/changestatus', 'GamePageController@changeStatus')->name('gamePage.changestatus');


function test_resource($data = []){
    return [
        'data' => $data,
        'code' => 1,
        'msg' => 'success'
    ];
}
Route::get('game/editor/tags/list', function(){
    return response()->json(test_resource());
});
Route::post('game/editor/resources/list', function(){
    return response()->json(test_resource());
});
Route::post('game/editor/pages/publiclist', function(){
    return response()->json(test_resource());
});

Route::get('game/component/searchByName', function(){
    return response()->json(test_resource(
        GameDiyComponent::all()
    ));
});
Route::post('game/component/useone', function(){
    return response()->json(test_resource(['id' => 11]));
});
Route::post('game/editor/pages/save', function(){
    $page = GamePage::find(request()->get('id'));
    $page->fill(request()->all());
    $page->save();

    return response()->json(test_resource([]));
});

Route::post('game/editor/pages/editor-detail', 'GamePageController@detail');
Route::post('game/editor/pages/detail', 'GamePageController@detail');
Route::post('game/component/find', 'GamePageController@componentFind');

Route::group(['prefix' => 'game/page'], function(){

    Route::get('neighbor', 'GamePageController@neighbor');
    Route::post('update', 'GamePageController@update');


});
