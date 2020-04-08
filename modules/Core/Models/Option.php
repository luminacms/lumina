<?php

namespace Modules\Core\Models;

use Illuminate\Support\Str;
use Nwidart\Modules\Facades\Module;

class Option extends BaseModel
{
    public $timestamps = false;
    protected $oid = '';
    protected $cache;

    public $table = 'core_options';

    /**
     * The attributes that are mass assignable.
     *
     * @var [type]
     */
    protected $fillable = ['key', 'value', 'oid'];

    protected static function boot()
    {
        parent::boot();
        // 清除缓存
        $cache = (new self())->_getCacheObj();
        static::creating(function ($model) {
            // 新增数据必须要求登录
            $_oid = auth()->guard('org')->oid();
            if(!$_oid && !$model->oid) {
                return false;
            }
            $model->oid = $model->oid?$model->oid:$_oid;
        });
        static::created(function ($model) use($cache) {
            $cache->flush();
        });
        static::updated(function ($model) use($cache) {
            $cache->flush();
        });
        static::deleted(function ($model) use($cache) {
            $cache->flush();
        });
    }

    /**
     * Determine if the given option value exists.
     *
     * @param  string  $key
     * @return bool
     */
    public function exists($key)
    {
        return self::where('key', $key)->exists();
    }

    private function _getCacheObj()
    {
        if(!$this->cache) {
            $this->cache = app('cache');
            if(in_array($this->cache->getDefaultDriver(), ['redis', 'memcached'])) {
                $this->cache = $this->cache->tags('option');
            }
        }
        return $this->cache;
    }

    private function _getCacheKey($key)
    {
        return 'option_'.($this->_getOid() ?? 1).'_'.$key;
    }

    private function _getOid()
    {
        if(!$this->oid) {
            $this->oid = (\request('oid', request()->header('oid')) ?? auth()->guard('org')->oid()) ?? '1';
        }
        return $this->oid;
    }

    /**
     * Get the specified option value.
     *
     * @param  string  $key
     * @param  mixed   $default
     * @return mixed
     */
    public function get($key, $default = null)
    {
        $_cacheKey = $this->_getCacheKey($key);

        $cache = $this->_getCacheObj();
        $val = $cache->get($_cacheKey);
        if(!$val) {
            if ($option = self::where('key', $key)->where('oid', $this->_getOid())->first()) {
                $val = $option->value;
            }
            if(!$val) {
                // 数据库不存在时取配置文件
                $_config_options = collect();
                foreach(Module::getOrdered() as $module){
                    $_config = config($module->getAlias().'.options') ?? [];
                    $_config_options = $_config_options->merge($_config);
                }
                $_option_collect = $_config_options->pluck('default', 'name');
                $val = $_option_collect->get($key, $default);
                // 解析:oid
                if(Str::contains($val, ':oid')) {
                    $_oid = $this->_getOid();
                    if(!$_oid) {
                        abort(400, 'param missing: oid');
                    }
                    $val = Str::replaceFirst(':oid', $_oid, $val);
                }
            }
            $cache->set($_cacheKey, $val);
        }
        return $val;
    }

    /**
     * Set a given option value.
     *
     * @param  array|string  $key
     * @param  mixed   $value
     * @return void
     */
    public function set($key, $value = null)
    {
        $keys = is_array($key) ? $key : [$key => $value];

        foreach ($keys as $key => $value) {
            self::updateOrCreate(['key' => $key], ['value' => $value, 'oid' => $this->_getOid()]);
        }

        // @todo: return the option
    }

    /**
     * Remove/delete the specified option value.
     *
     * @param  string  $key
     * @return bool
     */
    public function remove($key)
    {
        return (bool) self::where('key', $key)->where('oid', $this->_getOid())->delete();
    }
}
