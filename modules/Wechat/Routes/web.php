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
Route::any('/callback/wechat', 'OpenController@index');
Route::get('/server/wechat/getsign', 'OpenController@getsign');

Route::group(['prefix' => 'wechat', 'as' => 'wechat.'],  function(){
    Route::get('/oauth/weapp', 'OpenController@weapp');

//    Route::get('/', 'WechatController@index');
});


Route::group(['prefix' => 'backend/wechat', 'as' => 'backend.wechat.', 'namespace'=>'Backend'],  function(){

    Route::get('/', 'WechatController@index')->name('index');
    Route::get('/emulator', 'WechatController@emulator')->name('emulator');

    // 自动回复
    Route::resource('replies', 'RepliesController');
    Route::resource('msg', 'MsgsController');

});
