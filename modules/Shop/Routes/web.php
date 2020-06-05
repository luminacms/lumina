<?php

use Xbhub\ShopDouyin\ShopDouyin;

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

    Route::post('shipping', 'OrderController@shipping')->name('order.shipping');
    Route::match(['get', 'post'], 'preview', 'SpuController@preview')->name('preview');

    Route::resource('spec', 'SpecController');
    Route::resource('category', 'CategoryController');
    Route::resource('brand', 'BrandController');
    Route::resource('spu', 'SpuController');
    Route::resource('sku', 'SkuController');
    Route::resource('order', 'OrderController');
    Route::resource('delivery', 'DeliveryController');
});

Route::get('/a', function(){

    $detail = ShopDouyin::product()->detail(['product_id' => '3417066667497389265']);

    dd($detail);

    // 食品饮料 9 =》 休闲食品 77 =》723
    // $cat = ShopDouyin::product()->detail(77);
    // dd($cat);

    // $spec = ShopDouyin::spec()->add("测试规格","颜色|黑色,白色,黄色");
    $spec = ShopDouyin::spec()->specDetail(42699897);
    dd($spec);

    // cid 10,81,757
    // 测试商品推送
    // $a = ShopDouyin::product()->add(
    //     '测试推送商品',
    //     'http://img.alicdn.com/imgextra/i1/729863055/TB2FG49iuOSBuNjy0FdXXbDnVXa_!!729863055.jpg',
    //     'http://img.alicdn.com/imgextra/i3/729863055/TB2BROYcamWBuNkHFJHXXaatVXa-729863055.jpg',
    //     '20200605001',
    //     '1',
    //     '10',
    //     '81',
    //     '757',
    //     '26136338',
    //     '15249196599',
    //     '100',
    //     '品牌:ss^货号:8888^上市年份季节:2018年秋季'
    // );


    dd($a);

});


Route::get('/b', function(){

header("Content-Type: text/html;charset=utf-8");
date_default_timezone_set('PRC');

$APP_KEY = '3416589279667832728';
$APP_SECRET = '1172840b08483f81cb2c42dd6d0ba24f';


$end_time = $timestamp = date('Y-m-d H:i:s', time());
$start_time = date('Y-m-d H:i:s', time() - 36000);
$host = "https://openapi.jinritemai.com";
$v = "1";
$c = "product";
$a = "add";
$method = $c . "." . $a;


// 参数按key值排序
$param_arr = array(
    'cos_ratio' => '0',
    'pay_type' => '1',
    'name' => '测试推送商品',
    'pic' => 'http://cdn.xbhub.com/img/avatar/0.jpg',
    'description' => 'http://cdn.xbhub.com/img/avatar/0.jpg',
    'out_product_id' => '234123',
    'market_price' => '12800',
    'discount_price'=>'11000',
    'first_cid' => '9',
    'second_cid' => '77',
    'third_cid' => '723',
    'spec_id' => '42699897',
    'mobile' => '15249196599',
    'weight' => '1000',
    'product_format' => '品牌|古方^上市时间|2020年',
    'usp' => '补水保湿',
    'recommend_remark' => '很好',
    'extra' => 'extra..',
);



ksort($param_arr);
$param_json = json_encode((object)$param_arr, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

// 计算签名
$str = "app_key" . $APP_KEY . "method" . $method . "param_json" . $param_json . "timestamp" . $timestamp . "v" . $v;
$md5_str = $APP_SECRET . $str . $APP_SECRET;
$sign = md5($md5_str);

// 构造请求url
$base_url = $host . '/' . $c . '/' . $a . '?';
$base_url = $host . '/' . $c . '/' . $a;


// 生成请求url
$url = $base_url;

$request_data = [
	'app_key' => $APP_KEY,
	'method' => $method,
	'param_json' => $param_json,
	'timestamp' => $timestamp,
	'v' => $v,
	'sign' => $sign,
];

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $base_url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($request_data));
$res = curl_exec($curl);
curl_close($curl);


dd($res);


});
