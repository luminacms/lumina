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

            $table->char('uid', 40);
            $table->char('spu_id', 40);
            $table->integer('stock')->default(0);
            $table->integer('weight')->default(0);

            $table->string('thumb')->nullable();
            $table->text('pics')->nullable();
            $table->decimal('price_fee',10,2);
            $table->decimal('market_price_fee',10,2)->nullable();

            $table->status();
            $table->createby();

            $table->timestamps();

            $table->unique('uid');
        });

        Schema::create('shop__skus_spec', function(Blueprint $table) {
            $table->increments('id');

            $table->char('sku_id', 40);
            $table->integer('spec_id');
            $table->integer('spec_val_id');
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
		Schema::drop('shop__skus_spec');
	}
}
