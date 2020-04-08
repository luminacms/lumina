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
Route::group(['prefix' => 'mall', 'as' => 'mall.', 'middleware' => ['auth:org', 'permission.org:module_mall']], function(){
    Route::resource('product-brand', 'ProductBrandsController');
    Route::resource('product-spus', 'ProductSpusController');
    Route::resource('product-sku', 'ProductSkusController');
    Route::resource('product-category', 'ProductCategoriesController');

});
