<?php

namespace Modules\Core\Models;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailConstruct;
use Laravel\Passport\HasApiTokens;

class User extends BaseModel implements
    JWTSubject,
    AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract,
    MustVerifyEmailConstruct
{
    use HasApiTokens, Authenticatable, Authorizable, CanResetPassword, MustVerifyEmail,
        Notifiable, SoftDeletes, HasRoles;

    protected $guard_name = 'web';

    const STATUS = ['ENABLED', 'DISABLED'];

    public $table = 'core_users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'userid', 'name', 'email', 'password', 'mobile','mobile_verified_at','create_ip_at',
        'last_login_at','last_login_ip_at','login_times','status','nickname','avatar', 'username', 'is_admin', 'level'
    ];
    public $fieldSearchable = [
        'name' => 'like',
        'email' => 'like',
        'mobile' => 'like'
    ];
    protected function filters()
    {
        return [
            'depart_id' => \Modules\Core\Http\Filters\DepartmentFilter::class,
            'role_id' => \Modules\Core\Http\Filters\RoleFilter::class,
        ];
    }

    /**
     * 获取组织下员工
     *
     * @param [type] $query
     * @return void
     */
    public function scopeOrg($query)
    {
        return $query->leftjoin('core_organzation_user', 'core_users.userid','=','core_organzation_user.userid')
        ->select('core_organzation_user.organzation_id','core_organzation_user.userid','core_users.*')
        ->where('core_organzation_user.organzation_id', auth()->guard('org')->oid());
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->create_ip_at = $model->create_ip_at ?? request()->ip();
            $model->userid = $model->userid ?? self::getAutoNumber('userid');
        });
    }


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * 获取用户姓名
     * 优先级 username => nickname => name
     * @return mixed
     */
    public function getName($mobileFirst = false)
    {
        return $this->mobile&&$mobileFirst
                    ? $this->mobile
                    : ($this->username ?: ($this->nickname ?: ( $this->name ?: '' )));
    }

    /**
     * 更新组织关系
     * @param $model
     */
    public static function attachOrg($model)
    {
        $_org = auth()->org();
        if(!$_org) {
            $_oid = request('oid', request()->header('oid'));
            $_org = Organization::where('oid', $_oid)->first();
        }
        !!$_org&&$model->organizations()->attach($_org);
    }

    public function socialite()
    {
        return $this->hasMany('Modules\Core\Models\UserSocialite', 'userid', 'id');
    }

    public function groups()
    {
        return $this->morphedByMany('Modules\Core\Models\Group', 'model', 'group_user', 'userid', 'group_id');
    }

    public function departments()
    {
        return $this->belongsToMany('Modules\Core\Models\Department', 'core_department_user', 'userid', 'department_id', 'userid');
    }

    public function organizations()
    {
        return $this->belongsToMany('Modules\Core\Models\Organization', 'core_organzation_user', 'userid', 'organzation_id', 'userid', 'oid');
    }

    public function address()
    {
        return $this->hasMany('Modules\Core\Models\UserAddress', 'userid', 'id');
    }

    /**
     * @return mixed
     */
    public function isSuper()
    {
        return $this->hasRole('SUPER');
    }

    /**
     * @param $driver
     * @param $openid
     * @param array $usinfo social info update
     * @return AuthenticatableContract
     */
    public static function loginWithSocial($driver, $openid, $usinfo = [], $oid = '')
    {
        $socialiteUser = new \Modules\Core\Models\UserSocialite();
        $oid = $oid?$oid:request('oid', request()->header('oid'));

        if(!$openid) {
            abort(400, 'openid获取失败');
            return;
        }

        $userData = [
            'name' => isset($usinfo['name'])?$usinfo['name']:'',
            'nickname' =>isset($usinfo['nickname'])?$usinfo['nickname']:'',
            'avatar' => isset($usinfo['avatar'])?$usinfo['avatar']:'',
        ];
        $user = $socialiteUser->getUser($oid, $driver, $openid, $userData);

        // Log::debug("driver:$driver, openid: $openid");

        if (!$user) {
            $user = self::create($userData);
            $socialiteUser->create(array_merge($userData, [
                'userid' => $user->userid,
                'token' => isset($usinfo['token'])?$usinfo['token']:'',
                'driver' => $driver,
                'openid' => $openid,
                'avatar' => isset($usinfo['avatar'])?$usinfo['avatar']:'',
                'oid' => $oid,
                'anonymous_openid' => isset($usinfo['anonymous_openid'])?$usinfo['anonymous_openid']:''
            ]));
        }

//        Auth::logout();
        Auth::loginUsingId($user->id) && self::logLogin($user->id);
        session(['__social' => array_merge([$driver => $user], session('__social')??[])]);
        session()->save();

        return !Auth::guest();
    }

    /**
     * 获取可以管理的组织，可以管理自己和自己子集的组织
     *
     * @return void
     */
    public function canAdminOrg()
    {
        if($this->isSuper()) {
            return Organization::all();
        }
        $orgObj = self::organizations()->orderBy('level', 'asc')->first();
        return Organization::getChildren($orgObj->id);
    }

    /**
     * 检测是否有登录权限
     *
     * @return boolean
     */
    public function canLogininOrg($org)
    {
        $subOrg = $this->canAdminOrg()->pluck('oid');
        return $subOrg->contains($org->oid);
    }

    /**
     * @param $mobile
     * @return array
     */
    public function loginOrRegistWithMobile($mobile)
    {
        $user = self::firstOrCreate(
            ['mobile' => $mobile],
            ['mobile_verified_at' => now()]
        );
        return [
            'token' => JWTAuth::fromUser($user),
            'expired_at' => now()->addMinutes(Auth::guard('api')->factory()->getTTL())->timestamp
        ];
    }

    public static function logLogin($userid = '')
    {
        if($userid || !auth()->guest()) {
            $model = self::find(Auth::user()->id);
            if($model) {
                $model->update([
                    'login_times' =>$model->login_times + 1,
                    'last_login_at' => now(),
                    'last_login_ip_at' => request()->ip()
                ]);
            }
        }
    }
}
