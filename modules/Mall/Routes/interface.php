<?php

Route::group(['prefix' => 'mall'], function(){
    Route::get('product-attrs', 'ProductAttrsController@index');
    Route::get('product-attr-values', 'ProductAttrValuesController@index');
});