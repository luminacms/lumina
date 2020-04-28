<?php

use Modules\Coupon\Http\Resources\CouponCodeResource;
use Modules\Coupon\Models\CouponCode;

Route::group(['prefix' => '/coupon'], function() {

    Route::get('code', 'CouponCodeController@code')->name('coupon.coupon-code.code');
    Route::get('my', 'CouponCodeController@my')->name('coupon.coupon-code.my');
    Route::get('count', 'CouponCodeController@count')->name('coupon.coupon-code.count');
    Route::post('receive', 'CouponCodeController@receive')->name('coupon.coupon-code.receive');
    Route::post('use', 'CouponCodeController@use')->name('coupon.coupon-code.use');

});
