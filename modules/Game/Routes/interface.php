<?php

if(!function_exists('test_resource')){
    function test_resource($data = []){
        return [
            'data' => $data,
            'code' => 1,
            'msg' => 'success'
        ];
    }
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
Route::post('game/component/useone', function(){
    return response()->json(test_resource(['id' => 11]));
});
Route::get('/game/statistics/report', function(){
    return response()->json(test_resource());
});
Route::get('/game/upload/getTocken', function(){
    return response()->json(test_resource());
});


Route::post('game/editor/pages/detail', 'GamePageController@detail');

// Route::group(['middleware' => 'interface'], function(){

    Route::post('/game-page/{id}/changestatus', 'GamePageController@changeStatus')->name('gamePage.changestatus');

    Route::get('game/component/searchByName', 'GamePageController@searchByName');
    Route::post('game/editor/pages/editor-detail', 'GamePageController@detail');
    Route::post('game/component/find', 'GamePageController@componentFind');
    Route::post('game/editor/pages/save', 'GamePageController@save');

    Route::group(['prefix' => 'game/page'], function(){

        Route::get('neighbor', 'GamePageController@neighbor');
        Route::post('update', 'GamePageController@update');

    });

// });

