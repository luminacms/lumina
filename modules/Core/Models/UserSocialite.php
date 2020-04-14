<?php

namespace Modules\Core\Models;

use Modules\Core\Traits\HasOrg;
use Xbhub\Socialite\SocialiteManager;

/**
 * Class UserSocialite.
 * driver: facebook, github, google, linkedin, outlook, weibo, qq, wechat, douyin, and douban
 *
 * @package namespace Modules\Core\Models;
 */
class UserSocialite extends BaseModel
{
    const DRIVER_WECHAT = 'wechat';
    const DRIVER_TOUTIAO = 'toutiao';
    const DRIVER_GITHUB = 'github';

    public $table = 'core_user_socialites';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['driver', 'userid', 'openid','token','nickname','avatar','gender','country','province','city', 'anonymous_openid','oid'];

    /**
     * social drivers
     *
     * @return void
     */
    public static function getDrivers()
    {
        return [
            self::DRIVER_WECHAT => '微信',
            self::DRIVER_TOUTIAO => '头条',
            self::DRIVER_GITHUB => 'Github'
        ];
    }

    /**
     * Get user instance by driver and openid.
     *
     * @param  $driver  string
     * @param  $openid  string
     * @param array $userData
     * @return  /App/User|null
     */
    public function getUser($oid, $driver, $openid, $userData = [])
    {
        $finder =  $this->where([
            ['oid', $oid],
            ['driver', $driver],
            ['openid', $openid]
        ])->first();

        if($finder) {
            $finder->update($userData);
            $finder->user()->update($userData);
        }
        return $finder ? $finder->user : $finder;
    }

    /**
     * get related user model.
     *
     * @return /App/User||null
     */
    public function user()
    {
        return $this->belongsTo('Modules\Core\Models\User', 'userid', 'userid');
    }

    /**
     * Save a new record.
     *
     * @param  $userId  integer
     * @param  $driver  string
     * @param  $id  string
     * @return /App/SocialiteUser
     */
    public function saveOne($userId, $driver, $id)
    {
        return $this->create([
            'userid' => $userId,
            'driver' => $driver,
            'openid' => $id
        ]);
    }

    /**
     * 初始化社交登录
     *
     * @return void
     */
    public static function init()
    {
        return new SocialiteManager([
            'github' => [
                'client_id'     => option('SOCIAL_OAUTH_GITHUB_CLIENT_ID'),
                'client_secret' => option('SOCIAL_OAUTH_GITHUB_CLIENT_ID'),
                'redirect'      => option('SOCIAL_OAUTH_GITHUB_CLIENT_ID'),
            ],
            'toutiao' => [
                'client_id' => option('SOCIAL_OAUTH_TOUTIAO_CLIENT_ID'),
                'client_secret' => option('SOCIAL_OAUTH_TOUTIAO_CLIENT_SECRET'),
                'redirect' => option('SOCIAL_OAUTH_TOUTIAO_REDIRECT')
            ],
            'wechat' => [
                'client_id' => option('SOCIAL_OAUTH_WECHAT_CLIENT_ID'),
                'client_secret' => option('SOCIAL_OAUTH_WECHAT_CLIENT_SECRET'),
                'redirect' => option('SOCIAL_OAUTH_WECHAT_REDIRECT'),
            ]
        ]);
    }

}
