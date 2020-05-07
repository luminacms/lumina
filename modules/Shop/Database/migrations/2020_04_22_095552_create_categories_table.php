<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateCategoriesTable.
 */
class CreateCategoriesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__categories', function(Blueprint $table) {
            $table->increments('id');

            $table->createby();
            $table->status();

            $table->string('name');
            $table->string('thumb', 500)->nullable();

            $table->org();
            $table->sort();
            $table->pathtree();

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
		Schema::drop('shop__categories');
	}
}
