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

Route::any('/callback/payment/{driver}/notify/{oid}', 'CallbackController@notify');
Route::any('/callback/payment/{driver}/return/{oid}', 'CallbackController@return');

Route::group(['prefix' => 'payment', 'as' => 'payment.', 'middleware' => 'backend'], function(){

    Route::post('/sync/{id}', 'PayTransactionsController@sync')->name('sync');
    Route::get('/detail', 'PayTransactionsController@detail')->name('detail');
    Route::resource('transaction', 'PayTransactionsController')->only('index', 'show');
    Route::resource('logs', 'PayLogsController')->only('index', 'show');

});
