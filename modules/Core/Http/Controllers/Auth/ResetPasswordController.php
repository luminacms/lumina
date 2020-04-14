<?php

namespace Modules\Core\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Modules\Core\Http\Controllers\BaseController;

class ResetPasswordController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    protected function rules()
    {
        return [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:5',
        ];
    }

    /**
     * reset pass
     *
     * @param Request $request
     * @param [type] $token
     * @return void
     */
    public function showResetForm(Request $request, $token = null)
    {
        return view('core::auth.passwords.reset')->with(
            ['token' => $token, 'email' => $request->email]
        );
    }
}
