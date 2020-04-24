<?php

use Modules\Coupon\Http\Resources\CouponCodeResource;
use Modules\Coupon\Models\CouponCode;

Route::group(['prefix' => '/coupon'], function() {


    Route::get('my', 'CouponCodeController@my')->name('coupon.coupon-code.my');
    Route::post('receive', 'CouponCodeController@receive')->name('coupon.coupon-code.receive');
    Route::post('use', 'CouponCodeController@use')->name('coupon.coupon-code.use');


});
