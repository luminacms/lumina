<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2016/11/10 0010
 * Time: 18:40
 */

namespace Modules\Doc\Observers;

use Cache;
use Modules\Doc\Models\WikiConfig;

/**
 * 配置文件观察者
 * Class WikiConfigObservers
 * @package Modules\Doc\Observers
 */
class WikiConfigObservers
{
    public function creating(WikiConfig $config)
    {
        $config->created_at =  date('Y-m-d H:i:s');
    }
    public function updating(WikiConfig $config)
    {
        $config->updated_at =  date('Y-m-d H:i:s');
        $key = 'config.key.' . $config->key;
        //当更新时移除缓存
        Cache::forget($key);
    }

    public function updated(WikiConfig $config)
    {
        $key = 'config.key' . $config->key;
        //更新后重新写入缓存
        Cache::forever($key,$config);
    }
}