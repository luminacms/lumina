<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateProductAttrsTable.
 */
class CreateProductAttrsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mall__product_attrs', function(Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->string('description', 500)->nullable();

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
		Schema::drop('mall__product_attrs');
	}
}
