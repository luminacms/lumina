<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2016/11/15 0015
 * Time: 17:35
 */

namespace Modules\Doc\Exceptions;

/**
 * 数据为空异常
 * Class DataNullException
 * @package Modules\Doc\Exceptions3
 */
class DataNullException extends DataException
{
    public function __construct($message, $code, \Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}