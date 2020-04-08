<?php

Route::group(['prefix' => 'querylist'], function(){

    Route::post('rules/{id}/test', 'QlRulesController@test');
    Route::post('rules/{id}/restore', 'QlRulesController@restore');
});