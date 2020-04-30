<?php

use Modules\Cms\Models\Post;

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

Route::group(['prefix' => 'cms', 'as' => 'cms.'], function () {
    Route::get('/{id}', 'PostsController@category')->name('category');
//    Route::get('/{id}/list', 'PostsController@list')->name('list');
//    Route::get('/a/{post}', 'PostsController@detail')->name('detail');

    Route::view('/p/index', 'cms::pages.index')->name('p.index');
    Route::view('/p/about', 'cms::pages.about.index')->name('p.about');
});

Route::group(['prefix' => 'backend/cms', 'as' => 'backend.cms.', 'namespace' => 'Backend', 'middleware' => 'auth:org'], function () {
    Route::resource('posts', 'PostsController');
    Route::resource('cms-categories', 'CmsCategoriesController');
    Route::resource('cms-pages', 'CmsPagesController');
});
