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

Route::group(['prefix' => '/shop', 'as' => 'shop.','middleware' => 'auth:org'], function() {

    Route::resource('spu', 'SpuController');

    Route::get('/attrs', function(){

        return json_encode([
            'errcode' => 0,
            'data' => [
                ["value"=>"1", "title"=>"李白", "disabled"=>"", "checked"=>""],
                ["value"=>"2", "title"=>"杜甫", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
                ["value"=>"3", "title"=>"阿达", "disabled"=>"", "checked"=>""],
            ]
        ]);

    });

});
