<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateProductCategoriesTable.
 */
class CreateProductCategoriesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mall__product_categories', function(Blueprint $table) {
            $table->increments('id');

            $table->createby();
            $table->status();

            $table->string('name');
            $table->string('thumb', 500)->nullable();

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
		Schema::drop('mall__product_categories');
	}
}
