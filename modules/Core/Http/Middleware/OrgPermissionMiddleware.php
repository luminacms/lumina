<?php

namespace Modules\Core\Http\Middleware;

use Closure;
use Spatie\Permission\Exceptions\UnauthorizedException;

class OrgPermissionMiddleware
{
    public function handle($request, Closure $next, $permission)
    {
        if(app('auth')->oid() == '1') {
            return $next($request);
        }
        if (app('auth')->guest()) {
            throw UnauthorizedException::notLoggedIn();
        }

        $permissions = is_array($permission)
            ? $permission
            : explode('|', $permission);

        foreach ($permissions as $permission) {
            if (app('auth')->org()->hasPermissionTo($permission, 'org')) {
                return $next($request);
            }
        }

        throw UnauthorizedException::forPermissions($permissions);
    }
}
