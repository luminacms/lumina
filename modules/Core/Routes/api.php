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

//Route::middleware('auth:api')->get('/core', function (Request $request) {
//    return $request->user();
//});

Route::get('/oauth/{driver}', 'AuthController@codeLogin')->name('codelogin');

// 授权
Route::group(['prefix' => 'auth'], function(){

    Route::post('/login', 'AuthController@login')->name('login');
    Route::post('/logout', 'AuthController@logout')->name('logout');

});

Route::group(['middleware' => ['auth:api']], function(){

    Route::post('/user/update', 'UsersController@update');
    Route::get('/userinfo', 'UsersController@userinfo')->name('userinfo');

});

