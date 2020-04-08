<?php


namespace Modules\Core\Http\Controllers\Api;


use Illuminate\Http\Request;
use Modules\Core\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Modules\Core\Http\Resources\UserResource;
use Modules\Core\Http\Controllers\BaseController;

class UsersController extends BaseController
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function userinfo()
    {
        $user = JWTAuth::parseToken()->authenticate();
        return $this->toResource($user, UserResource::class);
    }

    /**
     * user submit
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request)
    {
        $user = User::find(\auth()->id());
        $user->fill($request->get('userinfo'))->save();
        return $this->toResponse($user);
    }

}
