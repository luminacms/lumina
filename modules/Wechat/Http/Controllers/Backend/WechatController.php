<?php

namespace Modules\Wechat\Http\Controllers\Backend;

use Illuminate\Routing\Controller;

class WechatController extends Controller
{

    public function emulator()
    {
        return view('wechat::backend.emulator');
    }

    public function index()
    {
        return view('wechat::index');
    }

}
