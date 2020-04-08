<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2017/1/16 0016
 * Time: 14:56
 */

namespace Modules\Doc\Http\Controllers;


use Modules\Doc\Models\WikiConfig;
use Request;

class SettingController extends BaseController
{
    public function site()
    {
        if($this->isPost()){
            $form = Request::all();
            if(empty($form) === false){
                foreach ($form as $key=>$value){
                    WikiConfig::where('key','=',$key)->update(['value'=>$value]);
                }
            }
            return  $this->jsonResult(0,null,'ok');
        }
        $result =  WikiConfig::get()->toArray();


        if(empty($result) === false && count($result) > 0){
            $this->data = array_merge($this->data,array_column($result,'value','key'));
        }

        $this->data['setting_site'] = true;
        return view('setting.site',$this->data);
    }
}
