<?php

namespace Modules\Core\Models;

use DateTimeInterface;
use Xbhub\Filter\Filterable;
use Modules\Core\Traits\HasUnique;
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

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
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
