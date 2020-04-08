<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateProductSpusTable.
 */
class CreateProductSpusTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mall__product_spus', function(Blueprint $table) {
            $table->bigIncrements('id');

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
		Schema::drop('mall__product_spus');
	}
}
