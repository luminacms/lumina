<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;

class OptionsController extends BaseController
{

    public function index()
    {
        return view("core::options.index");
    }

    public function store(Request $request)
    {
        foreach ($request->get('option') as $_key => $_option) {
            if(!empty($_option)) {
                option([$_key => $_option]);
            }
        }
        flash('配置保存成功，若未生效请手动清除缓存!', 'success');
        return redirect()->back();
    }

}
