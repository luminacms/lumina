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
    protected $loggedOut = false;


    /**
     * check org
     *
     * @return void
     */
    public function check()
    {
        return parent::check() && $this->session->exists($this->getOrgName());
    }

    /**
     * Attempt to authenticate the user using the given credentials and return the token.
     *
     * @param  array  $credentials
     * @param  bool  $login
     *
     * @return bool|string
     */
    public function attempt(array $credentials = [], $remember = false)
    {
        if(parent::attempt($credentials, $remember)) {
            $this->session->forget($this->getOrgName());
            $user = $this->user();

            $_org = $user->isSuper()?Organization::where('oid', '1')->first():($user->organizations[0] ?? null);
            if($_org && $user->canLogininOrg($_org)) {
                $this->session->put([$this->getOrgName() => $_org]);
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
