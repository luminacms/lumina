<?php

namespace Modules\Core\Http\Resources;

class UserResource extends BaseResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'userid' => $this->userid,
            'name' => !empty($this->name)?$this->name:(!empty($this->username)?$this->username:$this->nickname),
            'avatar' => $this->avatar,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'is_admin' => $this->is_admin,
            'last_login_at' => $this->last_login_at,
            'roles' => RoleResource::collection($this->roles)
        ];
    }
}
