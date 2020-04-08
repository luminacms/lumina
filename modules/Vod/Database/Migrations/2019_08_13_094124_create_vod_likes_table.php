<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateVodLikesTable.
 */
class CreateVodLikesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vod__likes', function(Blueprint $table) {
            $table->increments('id');

            $table->char('model_type', 15);
            $table->integer('model_id');

            $table->createby();
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
		Schema::drop('vod__likes');
	}
}
