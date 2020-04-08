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
Route::view('/vod', 'vod::pages.index')->name('p.vod.index');
Route::view('/vod/lessons', 'vod::pages.good.info')->name('p.vod.lesson.info');

// Frontend
Route::get('/v/{code}', 'VodController@media')->name('media');

// Backend
Route::group(['middleware' => 'auth:org', 'prefix' =>'backend/vod', 'as' => 'vod.', 'namespace' => 'Backend'], function () {

    Route::post('vod-orders/export', 'VodOrdersController@export')->name('vod-orders.export');
    Route::post('/vod-orders/{id}/refresh', 'VodOrdersController@refresh')->name('vod-orders.refresh');
    Route::resource('/vod-orders', 'VodOrdersController');
    Route::resource('/courses', 'CoursesController');
    Route::resource('/lessons', 'LessonsController');

});
