<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateSkusTable.
 */
class CreateSkusTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__skus', function(Blueprint $table) {
            $table->increments('id');

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
		Schema::drop('shop__skus');
	}
}
