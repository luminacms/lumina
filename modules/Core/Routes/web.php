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
Route::get('/', 'CoreController@index');

// 授权
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
// Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
// Route::post('register', 'Auth\RegisterController@register');

Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');

Route::get('password/confirm', 'Auth\ConfirmPasswordController@showConfirmForm')->name('password.confirm');
Route::post('password/confirm', 'Auth\ConfirmPasswordController@confirm');

// Route::get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
// Route::get('email/verify/{id}/{hash}', 'Auth\VerificationController@verify')->name('verification.verify');
// Route::post('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');

Route::get('/oauth/{driver}/{oid}', 'Auth\SocialiteAuthController@redirectToProvider')->name('ologin');
Route::get('/callback/oauth/{driver}/{oid}', 'Auth\SocialiteAuthController@handleProviderCallback');

// 全局服务
Route::group(['prefix' => 'service', 'middleware' => ['auth'], 'as' => 'service.'], function(){
    Route::get('/qrcode', 'ServiceController@qrcode')->name('qrcode');
    Route::get('/imgmix', 'ServiceController@imgMix')->name('imgmix');
});

// 图表dataset接口
Route::get('/chart/dataset', 'ChartController@dataset')->name('chart.dataset');

// pages 服务
//Route::get('/p/{module}', 'BaseController@page')->name('page');
//Route::post('/server/sendsmscode', 'CoreController@sendSmsCode');
//Route::post('/server/loginwithmobile', 'CoreController@loginWithMobile');

Route::view('/demo/{demo}', 'demo.index');

Route::redirect('home', 'dashboard');
Route::get('/dashboard/{oid?}', 'CoreController@home')->name('dashboard')->middleware(['auth:org']);
Route::group(['prefix' =>'backend', 'as' => 'core.', 'middleware' => ['auth:org']], function(){

    Route::get('/home', 'CoreController@dashboard')->name('dashboard');

    // 消息管理
    Route::get('/notification', 'NotificationController@index')->name('notification.index');

    // 权限管理
    Route::post('permission/attach', 'PermissionsController@attach')->name('permission.attach');
    Route::resource('permission', 'PermissionsController');
    Route::resource('roles', 'RolesController');

    // optios
    Route::group(['prefix' => 'option', 'as' => 'option.'], function(){
        // Route::view('/', 'core::options.index')->name('index');
        Route::get('/', 'OptionsController@index')->name('index');
        Route::post('/', 'OptionsController@store');
    });

    Route::group(['prefix' => 'tool', 'as' => 'tool.'], function(){
        Route::view('/webide', 'webide')->name('webide');
        Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index')->name('log');
    });

    // upload
    Route::get('/doc', 'CoreController@doc')->name('doc');

    Route::match(['get', 'post'], 'users/profile', 'UsersController@profile')->name('user.profile');
    Route::match(['get', 'post'], 'users/resetpasswd', 'UsersController@resetpasswd')->name('user.resetpasswd');

    Route::resource('user-socialites', 'UserSocialitesController');
    Route::resource('users', 'UsersController');
    Route::resource('organizations', 'OrganizationsController');
    Route::resource('departments', 'DepartmentsController');
    Route::resource('user-addresses', 'UserAddressesController');
});
