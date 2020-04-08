<?php
namespace Modules\Core\Traits;

use Modules\Core\Models\User;

trait HasCreateBy
{

    public static function bootHasCreateBy()
    {
        static::saving(function($model) {
             $model->create_by = $model->create_by ?? (auth()->guest()?0:\auth()->user()->user_id);
        });
    }

    /**
     * @return mixed
     */
    public function createBy()
    {
        return $this->belongsTo(User::class, 'create_by', 'user_id')->withTrashed()->withDefault();
    }
}
