<?php

namespace Modules\Core\Models;

use DateTimeInterface;
use Illuminate\Http\Request;
use Xbhub\Filter\Filterable;
use Modules\Core\Traits\HasUnique;
use Xbhub\Filter\FiltrationEngine;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as LaravelModel;

/**
 * Class Setting.
 *
 * @package namespace App\Models;
 */
class BaseModel extends LaravelModel
{
    use HasUnique, Filterable;

//    protected $connection = 'lumina';

    /**
     * 格式化时间
     *
     * @param DateTimeInterface $date
     * @return void
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    /**
     * 获取对象键值对
     *
     * @param [type] $val
     * @param [type] $label
     * @return void
     */
    public static function getOptions($val = 'id', $label = 'name')
    {
        return self::all()->mapWithKeys(function($item) use($val, $label){
            return [$item[$val] => $item[$label]];
        })->all();
    }

}
