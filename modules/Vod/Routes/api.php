<?php

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
Route::group(['prefix' =>'vod', 'middleware' => 'checkOidParams', 'as' => 'vod.'], function () {

    Route::get('/courses', 'CoursesController@index');
    Route::get('/courses/{id}', 'CoursesController@show');
    Route::get('/courses/{id}/recommend', 'CoursesController@recommend');

    Route::get('/courses/{course_id}/lessons', 'LessonsController@index');
    Route::get('/lessons/{id}', 'LessonsController@show');
    Route::get('/lessons/{id}/recommend', 'LessonsController@recommend');

});


Route::group(['middleware' => 'auth:api', 'prefix' => 'vod'], function(){

    Route::get('/order', 'VodOrdersController@index');
    Route::post('/makeorder', 'VodOrdersController@create');
    Route::get('/like', 'LikesController@index');
    Route::post('/like', 'LikesController@update');
    Route::get('/courses/{id}/checkorder', 'CoursesController@checkOrder');

});

