<?php
/**
 * Created by PhpStorm.
 * User: win10
 * Date: 2018/4/23
 * Time: 12:45
 */

namespace Modules\Core\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BaseRequest extends FormRequest
{
    public function authorize()
    {
        // Using policy for Authorization
        return true;
    }
}