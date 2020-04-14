<?php

namespace Modules\Core\Http\Filters;

use Xbhub\Filter\Filter;
use Illuminate\Database\Eloquent\Builder;

class DepartmentFilter extends Filter
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
        return $builder->leftjoin('core_department_user', 'core_users.userid','=','core_department_user.userid')
            ->select('core_department_user.department_id','core_department_user.userid','core_users.*')
            ->where('core_department_user.department_id', $value);
    }
}
