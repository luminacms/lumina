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
// 前端
Route::group(['prefix' =>'vote', 'as' => 'vote.'], function () {

    // 页面
    Route::get('/{vote}', 'VotesController@index')->name('index');
    Route::get('{vote}/option', 'VotesController@option')->name('option'); // 获取

    // 接口
    Route::post('/{vote}', 'VotesController@store')->name('form'); // 提交报名
    Route::get('/{vote}/result', 'VotesController@result')->middleware('auth'); // 获取已报名信息
    Route::post('{vote}/submit', 'VotesController@submit')->name('submit'); // 提交投票
    Route::get('{vote}/rank', 'VotesController@rank')->name('rank'); // 排行榜
    Route::get('{vote}/rule', 'VotesController@rule')->name('rule'); // 规则
    Route::match(['get', 'post'], '{vote}/apply', 'VotesController@apply')->name('apply'); // 申请加入投票
});

// 后台
Route::group(['middleware' => ['auth:org'], 'prefix' =>'backend/vote', 'as' => 'backend.vote.', 'namespace' => 'Backend'], function () {

    Route::view('/maker', 'vote::pages.exam')->name('maker');

    Route::get('/votes/data', 'VoteDatasController@index')->name('data.index');
    Route::get('/votes/data/export', 'VoteDatasController@export')->name('data.export');
    Route::get('/vote-datas/{id}', 'VoteDatasController@show')->name('data.show');
    Route::delete('/vote-datas/{id}', 'VoteDatasController@destroy')->name('data.destroy');

    Route::get('/votes/state', 'VotesController@state')->name('votes.state');
    Route::resource('/votes', 'VotesController');

    Route::resource('vote-subjects', 'VoteSubjectsController');
    Route::resource('vote-options', 'VoteOptionsController');

});

