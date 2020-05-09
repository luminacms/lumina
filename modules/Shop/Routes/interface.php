<?php

Route::group([], function(){

    Route::post('/attr/create', 'AttributeController@create');
    Route::post('/attr/val/create', 'AttributeController@createVal');

});
