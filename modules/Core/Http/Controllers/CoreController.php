<?php declare(strict_types=1);

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Modules\Core\Models\User;
use Illuminate\Filesystem\Filesystem;
use Modules\Core\Models\Organization;

class CoreController extends BaseController
{

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function home($oid)
    {
        $org = Organization::where('oid', $oid)->first();

        if(!auth()->oid() || auth()->oid() != $oid) {
            // 组织发生变更
            $user = auth()->user();
            if($user->can('admin', $org)) {
                auth()->switchTo($org);

                return redirect()->route('dashboard', auth()->oid());
            }
            flash('暂无权限，请确定你在该组织中且是管理员身份', 'error');
            return redirect('/');
        }
        return view('core::index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function dashboard()
    {
        return view()->first(['dashboard', 'core::dashboard']);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function doc(Request $request)
    {
        $request->validate(['path' => 'required']);
        $_doc = (new Filesystem())->get(urldecode($request->get('path')));

        $html = markdown_converter($_doc);
        return view('core::file.doc', compact('html'));
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendSmsCode(Request $request)
    {
        $_code = Str::random(6, true);
        $_xcode = ['code' => $_code, 'expired_at' => now()->addMinutes(5)];
        return $this->toResponse(['code' => $_code, 'xcode' => encrypt($_xcode)]);
    }


    /**
     * @param User $user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function loginWithMobile(User $user, Request $request)
    {
        $request->validate([
            'mobile' => 'required',
            'code' => 'required',
            'xcode' => 'required'
        ]);
        $_xcode = decrypt($request->get('xcode'));
        if($request->get('code') == $_xcode['code'] && now()->isBefore($_xcode['expired_at'])) {
            // 验证通过
            return $this->toResponse($user->loginOrRegistWithMobile($request->get('mobile')), 'success');
        }
        return $this->toError(-1, '验证码错误或者已失效');
    }
}
