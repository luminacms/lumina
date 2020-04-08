<?php

namespace Modules\Core\Http\Middleware;

use Closure;
use Modules\Core\Utils\AesEncrypt;

class AesEncryptDecode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if($request->isMethod('post')) {
            $_payload = AesEncrypt::decrypt($request->get('__payload'));
            $request = is_array($_payload)?$request->merge($_payload):$request;
        }

        return $next($request);
    }
}
