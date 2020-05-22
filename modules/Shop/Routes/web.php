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

use Modules\Shop\Models\Category;
use Modules\Shop\Models\Sku;
use Rap2hpoutre\FastExcel\FastExcel;

Route::group(['prefix' => '/shop', 'as' => 'shop.','middleware' => 'auth:org'], function() {

    Route::match(['get', 'post'], 'preview', 'SpuController@preview')->name('preview');

    Route::resource('category', 'CategoryController');
    Route::resource('brand', 'BrandController');
    Route::resource('spu', 'SpuController');
    Route::resource('sku', 'SkuController');
    Route::resource('order', 'OrderController');
    Route::resource('delivery', 'DeliveryController');
});
