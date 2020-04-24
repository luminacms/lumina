<?php

namespace Modules\Coupon\Http\Filters;

use Xbhub\Filter\Filter;
use Illuminate\Database\Eloquent\Builder;

class CouponFilter extends Filter
{
    /**
     * Filter values mappings.
     *
     * @var array
     */
    protected $mappings = [
        //
    ];

    /**
     * Filter records.
     *
     * @param Builder $builder
     * @param mixed   $value
     *
     * @return Builder
     */
    public function filter(Builder $builder, $value)
    {
        return $builder->where('coupon_id', $value);
    }
}
