<?php

namespace Modules\Core\Http\Filters;

use Xbhub\Filter\Filter;
use Modules\Core\Models\User;
use Illuminate\Database\Eloquent\Builder;

class RoleFilter extends Filter
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
        return $builder->leftjoin('auth_model_roles', 'core_users.id','=','auth_model_roles.model_id')
            ->where([
                ['auth_model_roles.role_id', $value],
                ['auth_model_roles.model_type', (new User())->getMorphClass()],
            ]);
    }
}
