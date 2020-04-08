<?php

namespace Modules\Core\Http\Middleware;

use Closure;

class CheckOidParams
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
        $_oid = request('oid', $request->header('oid'));

        if(!$_oid) {
            abort(404, '缺失oid参数或组织不存在！');
        }

        return $next($request);
    }
}
