# 路由约定


|  名称 | 前缀  | 驱动  | 中间件 |
| ------------- | ------------- |:-------------:| -----:|
| 全局      | 无 | session | \Modules\Http\Middleware\EncryptCookies::class<br/>\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,<br>\Illuminate\View\Middleware\ShareErrorsFromSession::class,<br/>\Modules\Http\Middleware\VerifyCsrfToken::class,<br>\Illuminate\Routing\Middleware\SubstituteBindings::class,<br/>\Laravel\Passport\Http\Middleware\CreateFreshApiToken::class |
|  web接口 | interface  | passport  | auth:interface|
|  Api | api  |  jwt | auth:jwt<br/>\Modules\Core\Http\Middleware\AesEncryptDecode::class|


中间件AesEncryptDecode集成api加解密方案，如无需要可自行去除或自行选择具体解决进行加解密传输

