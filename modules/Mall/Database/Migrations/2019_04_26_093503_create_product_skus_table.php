<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateProductSkusTable.
 */
class CreateProductSkusTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mall__product_skus', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('spu_id');
            $table->text('attrs')->nullable();
            $table->string('thumb')->nullable();
            $table->text('pics')->nullable();
            $table->decimal('price_fee',10,2);
            $table->decimal('market_price_fee',10,2)->nullable();

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
		Schema::drop('mall__product_skus');
	}
}
