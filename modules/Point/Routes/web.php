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
Route::group(['prefix' => 'point', 'middleware' => 'auth:org', 'as' => 'point.'], function(){

    Route::resource('point', 'PointController')->only(['index']);

    Route::post('point-log/rollback', 'PointLogController@rollback')->name('point-log.rollback');
    Route::resource('point-log', 'PointLogController')->only(['index','show']);

});
