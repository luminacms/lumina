<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreatePointsTable.
 */
class CreatePointsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('point__points', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('count')->default(0);
            $table->char('type', 15)->nullable();

            $table->org();
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
		Schema::drop('point__points');
	}
}
