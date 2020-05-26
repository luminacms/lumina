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

use Modules\Core\Utils\KuaiDi;

Route::group(['prefix' => '/shop', 'as' => 'shop.','middleware' => 'auth:org'], function() {

    Route::post('shipping', 'OrderController@shipping')->name('order.shipping');
    Route::match(['get', 'post'], 'preview', 'SpuController@preview')->name('preview');

    Route::resource('category', 'CategoryController');
    Route::resource('brand', 'BrandController');
    Route::resource('spu', 'SpuController');
    Route::resource('sku', 'SkuController');
    Route::resource('order', 'OrderController');
    Route::resource('delivery', 'DeliveryController');
});

Route::get('/a', function(){

    $a = ['信息', 's搜索'];

    $r = $a == array_values($a);

    dd($r);

    $kuaidi = new KuaiDi();

    $r = $kuaidi->guestName('YT9153969219613');

    // $r = KuaiDi::numCode()->where('code', 'zhongtong')->first();

    dd($r);



    // dd($r);

});
