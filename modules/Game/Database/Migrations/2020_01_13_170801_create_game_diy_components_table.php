<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateGameDiyComponentsTable.
 */
class CreateGameDiyComponentsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('game__diy_components', function(Blueprint $table) {
            $table->increments('id');

            $table->string('name')->comment('资源名称');
            $table->text('path')->comment('资源内容（url、脚本）');
            $table->string('version')->comment('版本');
            $table->integer('visibilitylevel')->default(0)->comment('显示状态（0私有，1公共开放）');
            $table->char('status', 15)->nullable();
            $table->string('desc', 500)->nullable();

            $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('game__diy_components');
	}
}
