<?php

Route::group([], function(){

    Route::any('/attr/create', 'AttributeController@create');
    Route::post('/attr/val/create', 'AttributeController@createVal');

});
