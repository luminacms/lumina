<?php

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

