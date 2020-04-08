<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateProductBrandsTable.
 */
class CreateProductBrandsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mall__product_brands', function(Blueprint $table) {
            $table->increments('id');

            $table->createby();

            $table->string('name');
            $table->string('logo_src')->nullable();
            $table->string('description', 500)->nullable();

            $table->status();
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
		Schema::drop('mall__product_brands');
	}
}
