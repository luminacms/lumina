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

    Route::resource('category', 'CategoryController');
    Route::resource('brand', 'BrandController');
    Route::resource('spu', 'SpuController');
    Route::resource('sku', 'SkuController');
    Route::resource('order', 'OrderController');
    Route::resource('delivery', 'DeliveryController');
});

Route::get('/a', function(){

    $file = storage_path('data/shop_category.xlsx');

    $data = (new FastExcel)->import($file);

    $no = 0;
    foreach($data as $_item) {
        if(!$_item['first_name']) continue;

        $first = Category::updateOrCreate(['name' => $_item['first_name']], ['parentid' => 0]);
        if($_item['second_name']) {
            // 二级类目
            $secend = Category::updateOrCreate(['name' => $_item['second_name']], ['parentid' => $first->id]);
            if($_item['third_name']) {
                // 三级
                Category::updateOrCreate(['name' => $_item['third_name']], ['parentid' => $secend->id]);
            }
        }
        $no ++;
    }

    dd($no);
});

