<?php

namespace Modules\Coupon\Http\Filters;

use Xbhub\Filter\Filter;
use Illuminate\Database\Eloquent\Builder;

class CouponCodeFilter extends Filter
{
    /**
     * Filter records.
     *
     * @param Builder $builder
     * @param mixed   $value received 已领取 | used 已使用 | expired 已使用已过期
     *
     * @return Builder
     */
    public function filter(Builder $builder, $value)
    {
        switch($value) {
            case 'received':
                $builder->whereNull('used_at')->where('expired_at', '>', now());
                break;
            case 'used':
                $builder->whereNotNull('used_at');
                break;
            case 'expired':
                $builder->whereNull('used_at')->where('expired_at', '<', now());
                break;
        }
        return $builder;
    }
}
