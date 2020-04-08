<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2017/2/10 0010
 * Time: 9:55
 */

namespace Modules\Doc\Http\Controllers;


use Modules\Doc\Models\ApiClassify;
use Modules\Core\Http\Controllers\BaseController;

class ToolController extends BaseController
{
    public function runApi()
    {
        $classifyList = ApiClassify::getApiClassifyList($this->member_id,0);

        $this->data['classify'] = [];

        if(empty($classifyList) === false && count($classifyList) > 0){
            $this->data['classify'] = $classifyList;
        }
        return view('tool.runapi',$this->data);
    }


}
