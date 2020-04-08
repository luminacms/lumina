<?php
/**
 * Created by PhpStorm.
 * User: jory
 * Date: 2018/11/7
 * Time: 13:54
 */

namespace Modules\Wechat\Services;

use EasyWeChat\Kernel\Contracts\EventHandlerInterface;
use Illuminate\Filesystem\Filesystem;
use Modules\Wechat\Models\Handler;

class ServiceHandler implements EventHandlerInterface
{
    protected $aid;

    /**
     * ServiceHandler constructor.
     * @param $aid
     */
    public function __construct($aid)
    {
        $this->aid = $aid;
    }

    /**
     * @param null $payload
     * @return mixed
     */
    public function handle($payload = null)
    {
        //其他服务类handler

        // 公众号自定义handler
        return $this->registerCustomHandlers($payload);
    }


    /**
     * 自定义回复接口
     * @param $payload
     * @return mixed
     */
    protected function registerCustomHandlers($payload)
    {
        $wechat_handle_path = storage_path('wechat/'.$this->aid.'/');
        $fileObj = new Filesystem();

        $handles = Handler::where('aid', $this->aid)->get();

        if($handles->count() > 0) {
            foreach($handles as $handle) {
                $class_name = $handle->class_name;
                $class_object = '\\'.$class_name;
                $handlerFile = $wechat_handle_path . $class_name . ".php";
                if($fileObj->exists($handlerFile)) {
                    try{
                        include_once $handlerFile;
                        return (new $class_object)->handle($payload);
                    }catch (\Exception $e){}
                }
            }
        }
    }

}