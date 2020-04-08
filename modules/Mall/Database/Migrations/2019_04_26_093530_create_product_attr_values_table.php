<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateProductAttrValuesTable.
 */
class CreateProductAttrValuesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mall__product_attr_values', function(Blueprint $table) {
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
		Schema::drop('mall__product_attr_values');
	}
}
