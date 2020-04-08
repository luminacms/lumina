<?php

namespace Modules\Doc\Models;

use Cache;


/**
 * Modules\Doc\Models\WikiConfig
 *
 * @property integer $id
 * @property string $name 名称
 * @property string $key 键
 * @property string $value 值
 * @property string $config_type 变量类型：system 系统内置/user 用户定义
 * @property string $remark 备注
 * @property string $created_at 创建时间
 * @property string $updated_at 修改时间
 * @method static \Illuminate\Database\Query\Builder|WikiConfig whereId($value)
 * @method static \Illuminate\Database\Query\Builder|WikiConfig whereName($value)
 * @method static \Illuminate\Database\Query\Builder|WikiConfig whereKey($value)
 * @method static \Illuminate\Database\Query\Builder|WikiConfig whereValue($value)
 * @method static \Illuminate\Database\Query\Builder|WikiConfig whereRemark($value)
 * @method static \Illuminate\Database\Query\Builder|WikiConfig whereCreateTime($value)
 * @method static \Illuminate\Database\Query\Builder|WikiConfig whereModifyTime($value)
 * @mixin \Eloquent
 * @method static \Illuminate\Database\Query\Builder|WikiConfig whereConfigType($value)
 */
class WikiConfig extends ModelBase
{
    protected $table = 'config';
    protected $primaryKey = 'id';
    protected $dateFormat = 'Y-m-d H:i:s';
    protected $guarded = ['id'];

    public $timestamps = false;

    /**
     * 获取指定键名的值如果不存在则设置默认值
     * @param string $key
     * @param null $default
     * @return mixed|null|string
     */
    public static function getFirstOrDefault($key,$default = null)
    {
        $config = WikiConfig::where('key','=',$key)->first();

        return $config ? $config->value : $default;
    }

    /**
     * 从缓存中获取配置信息
     * @param string $key
     * @param bool $update
     * @return bool|WikiConfig|null
     */
    public static function getConfigFromCache($key, $update = false)
    {
        $_config = config('doc');
        return $_config[$key] ?? null;
    }
}
