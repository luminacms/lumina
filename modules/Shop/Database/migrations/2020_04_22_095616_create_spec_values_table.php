<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateAttributeValuesTable.
 */
class CreateSpecValuesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__spec_values', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('spec_id');
            $table->string('name');
            $table->string('description', 500)->nullable();

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
		Schema::drop('shop__spec_values');
	}
}
