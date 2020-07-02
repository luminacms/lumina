<?php
/**
 * 创建函数阻止全局org过滤
 * public function openOrgFilter()
 *   {
 *       return false;
 *   }
 */

namespace Modules\Core\Traits;

use Illuminate\Database\Eloquent\Builder;

/**
 * @package Venturecraft\Revisionable
 */
trait HasOrg
{

    /**
     * 获取oid
     *
     * @return void
     */
    public function getOid()
    {
        return auth()->guest() ? 0 : auth()->guard('org')->oid();
    }

    /**
     * Create the event listeners for the saving and saved events
     * This lets us save revisions whenever a save is made, no matter the
     * http method.
     *
     */
    public static function bootHasOrg()
    {
        static::creating(function ($model) {
            // 命令行工具
            if(app()->runningInConsole() && $model->oid) {
                return true;
            }
            // 新增数据必须要求登录
            $_oid = auth()->guard('org')->oid();
            if(!$_oid && (\request()->is('api/*') || \request()->is('interface/*'))) {
                // session不存在, jwt接口oid直接取路由oid
                $_oid = \request('oid', request()->header('oid'));
            }

            if(!$_oid && !$model->oid) {
                abort(500, 'oid缺失');
                return false;
            }
            $model->oid = $model->oid?$model->oid:$_oid;
        });

        // 全局oid过滤
        $starOrgFilter = method_exists(new self, 'openOrgFilter') ? (new self)->openOrgFilter() : true;
        if($starOrgFilter) {
            static::addGlobalScope('oid', function (Builder $builder){
                $_oid = \request('oid', request()->header('oid')) ?? auth()->guard('org')->oid();
                $builder->where('oid', $_oid ?? '-1'); //option使用默认组织，其他默认不存在
            });
        }
    }

}
