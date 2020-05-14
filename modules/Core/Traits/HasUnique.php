<?php declare(strict_types=1);

namespace Modules\Core\Traits;

use Ramsey\Uuid\Uuid;
use Illuminate\Support\Str;

/**
 * @package Venturecraft\Revisionable
 */
trait HasUnique
{

    /**
     * 生成uuid
     * @param $key
     * @param bool $hex
     * @return string
     * @throws \Exception
     */
    public static function getUuid($key, $hex = true, $orderd = false)
    {
        do {
            $uuid = !$orderd ? Str::uuid() : Str::orderedUuid();
            $no = $hex?$uuid->getHex():$uuid;
            $no = (String) $no;
        } while (self::query()->where($key, $no)->exists());
        return $no;
    }

    /**
     * 生成按照时间的随机数
     * @param $key
     * @return string
     */
    public static function getRandomByTime($key, $len = 14)
    {
        do {
            $no = now()->format('YmdHis').mt_rand(pow(10, $len-1), pow(10, $len)-1);
        } while (self::query()->where($key, $no)->exists());
        return $no;
    }

    /**
     * 订单生产
     * @param $key
     * @param $sign //模块标识 v:点播
     * @return string
     */
    public static function getOrder($key, $sign)
    {
        do {
            $no = $sign.auth()->id().mt_rand(10000, 99999);
        } while (self::query()->where($key, $no)->exists());
        return $no;
    }

    /**
     * 生成model随机数
     * @param $key
     * @param $length
     * @param bool $numeric
     * @return string
     */
    public static function getRandom($key, $length, $lower = false)
    {
        do {
            $hash = $lower ? strtolower(Str::random($length)) : Str::random($length);
        } while (self::query()->where($key, $hash)->exists());
        return $hash;
    }


    /**
     * 获取随机数字
     *
     * @param [type] $key
     * @param [type] $length
     * @return void
     */
    public static function getRandomNumber($key, $prefix = '', $length = 11)
    {
        do {
            $seed = base_convert(md5(microtime().$_SERVER['DOCUMENT_ROOT']), 16, 10);
            if(!$prefix){
                $seed = str_replace('0', '', $seed);
            }
            $hash = '';
            $max = strlen($seed) - 1;
            for($i = 0; $i < $length; $i++) {
                $hash .= $seed{mt_rand(0, $max)};
            }
            $hash = $prefix ? $prefix.$hash : $hash;
        } while (self::query()->where($key, $hash)->exists());
        return intval($hash);
    }


}
