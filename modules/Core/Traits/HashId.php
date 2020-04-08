<?php

namespace Modules\Core\Traits;

use Vinkla\Hashids\Facades\Hashids;

trait HashId
{
    private $hashId;

    public function getConnect()
    {
        return $this->hashConnect ?? 'main';
    }

    public static function decodeHashid($code)
    {
        $_classname = get_called_class();
        return current(Hashids::connection((new $_classname)->getConnect())->decode($code));
    }

    public function getHashIdAttribute()
    {
        if (!$this->hashId) {
            $this->hashId = Hashids::connection($this->getConnect())->encode($this->id);
        }

        return $this->hashId;
    }

    public function resolveRouteBinding($value)
    {
        // if (!is_numeric($value)) {
        //     $value = current(Hashids::connection($this->getConnect())->decode($value));
        //     if (!$value) {
        //         return;
        //     }
        // }
        // return parent::resolveRouteBinding($value);
    }

    public function getRouteKey()
    {
        return $this->hash_id;
    }

}
