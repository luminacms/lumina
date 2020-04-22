<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateSpusTable.
 */
class CreateSpusTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__spus', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('brand_id')->nullable();
            $table->integer('category_id');
            $table->status();

            $table->string('name');
            $table->string('description', 500)->nullable();
            $table->string('unit')->nullable();
            $table->string('thumb')->nullable();
            $table->text('pic_url')->nullable();

            $table->decimal('price_fee', 10, 2)->nullable();
            $table->decimal('market_price_fee',10,2)->nullable();

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
		Schema::drop('shop__spus');
	}
}
