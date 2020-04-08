<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateCmsCategoriesTable.
 */
class CreateCmsCategoriesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cms__categories', function(Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->text('content')->nullable();

            $table->createby();
            $table->status();
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
		Schema::drop('cms__categories');
	}
}
