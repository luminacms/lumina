<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateSkuStocksTable.
 */
class CreateSkuStocksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__sku_stocks', function(Blueprint $table) {
            $table->increments('id');

            $table->bigInteger('sku_id');
            $table->integer('quantity')->default(0);

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
		Schema::drop('shop__sku_stocks');
	}
}
