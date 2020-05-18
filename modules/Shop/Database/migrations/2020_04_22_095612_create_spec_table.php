<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateAttributesTable.
 */
class CreateSpecTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__spec', function(Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->string('description', 500)->nullable();

            $table->org();
            $table->status();
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
		Schema::drop('shop__spec');
	}
}
