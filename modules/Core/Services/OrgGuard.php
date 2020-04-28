<?php
namespace Modules\Core\Services;

use BadMethodCallException;
use Illuminate\Http\Request;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Auth\SessionGuard;
use Modules\Core\Models\Organization;
use Illuminate\Support\Traits\Macroable;
use Illuminate\Contracts\Session\Session;
use Illuminate\Contracts\Auth\UserProvider;

class OrgGuard extends SessionGuard
{
    /**
     * The request instance.
     *
     * @var \Illuminate\Http\Request
     */
    protected $request;
    protected $session;
    protected $loggedOut = false;

    /**
     * Instantiate the class.
     *
     * @param  \Tymon\JWTAuth\JWT  $jwt
     * @param  \Illuminate\Contracts\Auth\UserProvider  $provider
     * @param  \Illuminate\Http\Request  $request
     *
     * @return void
     */
    public function __construct(UserProvider $provider, Session $session, Request $request)
    {
        $this->provider = $provider;
        $this->session = $session;
        $this->request = $request;
    }

    /**
     * check org
     *
     * @return void
     */
    // public function check()
    // {
    //     dd(parent::check() && $this->session->exists($this->getOrgName()));
    //     return parent::check() && $this->session->exists($this->getOrgName());
    // }

    /**
     * Attempt to authenticate the user using the given credentials and return the token.
     *
     * @param  array  $credentials
     * @param  bool  $login
     *
     * @return bool|string
     */
    public function attempt(array $credentials = [], $login = true)
    {
        if(parent::attempt($credentials, $login)) {
            $this->session->forget($this->getOrgName());

            // oid参数不存在，管理员取任意oid，普通管理员取自身所在组织
            $user = $this->user();
            $_oid = $user->hasRole('SUPER')?Organization::first()->oid:($user->organizations[0]->oid ?? -1);
            if($_oid && $_oid != -1){
                $org = Organization::where('oid', $_oid)->first();
                $this->session->put([$this->getOrgName() => $org]);
                return true;
            }
        }

        return false;
    }

    /**
     * logout
     *
     * @return void
     */
    public function logout()
    {
        parent::logout();

        $this->session->forget($this->getOrgName());
    }

    /**
     * get org obj
     *
     * @return void
     */
    public function org()
    {
        return $this->session->get($this->getOrgName());
    }

    /**
     * get oid
     *
     * @return void
     */
    public function oid()
    {
        return $this->session->get($this->getOrgName().'.oid');
    }

    /**
     * switch org
     *
     * @param Organization $org
     * @return void
     */
    public function switchTo(Organization $org)
    {
        $this->session->forget($this->getOrgName());
        $this->session->put([$this->getOrgName() => $org]);
    }

    /**
     * get org session name
     *
     * @return void
     */
    public function getOrgName()
    {
        return 'org_'.sha1(static::class);
    }
}
