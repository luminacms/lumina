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

Route::group(['prefix' => 'apitest', 'middleware' => ['auth']], function() {

    Route::get('/', 'ApiTestController@index')->name('home');
    Route::get('/data', 'ApiTestController@data');
    Route::get('/modules', 'ApiTestController@modules');

});


