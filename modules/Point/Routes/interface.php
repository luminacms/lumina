<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'point'], function () {

    Route::get('/', 'PointController@index')->name('point.index');
    Route::get('/log', 'PointController@log')->name('point.log');
    Route::post('submit', 'PointController@submit')->name('point.submit');

});
