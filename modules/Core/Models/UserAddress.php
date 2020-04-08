<?php

namespace Modules\Core\Models;

/**
 * Class UserAddress.
 *
 * @package namespace Modules\Core\Models;
 */
class UserAddress extends BaseModel
{
    public $table = 'core_user_addresses';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'province', 'city', 'district', 'address', 'zip', 'contact_name', 'contact_phone', 'lastused_at'];

}
