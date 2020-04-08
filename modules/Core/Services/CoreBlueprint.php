<?php


namespace Modules\Core\Services;


use Illuminate\Database\Schema\Blueprint;

class CoreBlueprint
{

    /**
     * 组织code
     * @param Blueprint $table
     */
    public static function org(Blueprint $table)
    {
        $table->char('oid', 32)->nullable()->comment('组织id');
    }

    /**
     * 创建人
     * @param Blueprint $table
     */
    public static function createby(Blueprint $table)
    {
        $table->char('create_by', 40)->comment('创建人');
        $table->index('create_by');
    }

    /**
     * 栏目树
     * @param Blueprint $table
     */
    public static function pathtree(Blueprint $table)
    {
        $table->integer('parentid')->nullable()->comment('父级id');
        $table->string('path', 500)->nullable()->comment('路径');
        $table->integer('level')->nullable()->comment('路径深度');
    }

    /**
     * 状态
     * @param Blueprint $table
     */
    public static function status(Blueprint $table)
    {
        $table->char('status', 15)->nullable()->comment('状态');
    }

    /**
     * 状态
     * @param Blueprint $table
     */
    public static function count(Blueprint $table)
    {
        $table->integer('count')->default(0)->comment('计数');
    }

    /**
     * 排序
     * @param Blueprint $table
     */
    public static function sort(Blueprint $table)
    {
        $table->integer('sort')->default(50)->comment('排序');
    }
}
