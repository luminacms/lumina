<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreatePointLogsTable.
 */
class CreatePointLogsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('point__point_logs', function(Blueprint $table) {
            $table->increments('id');

            $table->char('status', 15)->nullable();
            $table->char('type', 15);
            $table->integer('count');
            $table->integer('left_count');
            $table->string('desc', 500)->nullable();
            $table->morphs('model')->nullable();

            $table->integer('point_id');
            $table->char('point_type', 15)->nullable();
            $table->org();
            $table->createby();
            $table->trace();

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
		Schema::drop('point__point_logs');
	}
}
