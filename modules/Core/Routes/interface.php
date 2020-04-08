<?php

Route::get('users', 'UsersController@index');

Route::group(['prefix' =>'core', 'as' => 'core.'], function() {

    // 用户管理
    Route::post('/users/export', 'UsersController@export')->name('user.export');
    Route::post('/roles/attach', 'RolesController@attach')->name('role.attach');
    Route::post('/roles/detach', 'RolesController@detach')->name('role.detach');

    // 消息管理
    Route::get('/notification', 'NotificationController@index')->name('notification.index');
    Route::get('/notification/count', 'NotificationController@count')->name('notification.count');
    Route::post('/notification/markread', 'NotificationController@markread')->name('notification.markread');
    Route::post('/notification/delete', 'NotificationController@delete')->name('notification.delete');

    // job
    Route::get('/job/status', 'JobController@status')->name('job.status');

    // 上传
    Route::post('upload', 'UploadController@upload')->name('upload');

    // 文件管理
    Route::get('file', 'FileController@index')->name('file.index');
    Route::post('file', 'FileController@store')->name('file.store');
    Route::post('file/get', 'FileController@get')->name('file.get');
    Route::post('file/delete', 'FileController@delete')->name('file.delete');
    Route::post('file/rename', 'FileController@rename')->name('file.rename');
    Route::post('file/create', 'FileController@create')->name('file.create');

    // 日程管理
    Route::get('/calendars', 'CalendarController@index')->name('calendar.index');
});
