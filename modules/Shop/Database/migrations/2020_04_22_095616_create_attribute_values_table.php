<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateAttributeValuesTable.
 */
class CreateAttributeValuesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__attribute_values', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('attr_id');
            $table->string('value', 500);
            $table->string('description', 500)->nullable();

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
		Schema::drop('shop__attribute_values');
	}
}
