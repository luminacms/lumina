<?php


Route::group(['prefix' =>'vote', 'as' => 'vote.'], function () {

    Route::get('/{id}', 'VotesController@index')->name('index');
    Route::post('/{id}/data/export', 'VotesController@export')->name('data.export');
    Route::get('/{id}/rank', 'VotesController@rank')->name('rank');

    Route::post('/{id}/subject', 'VotesController@subjectStore');
    Route::post('/{id}/subject/delete', 'VotesController@subjectDelete');

});
