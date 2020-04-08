<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateProductSkuStocksTable.
 */
class CreateProductSkuStocksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mall__product_sku_stocks', function(Blueprint $table) {
            $table->bigIncrements('id');

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
		Schema::drop('mall__product_sku_stocks');
	}
}
