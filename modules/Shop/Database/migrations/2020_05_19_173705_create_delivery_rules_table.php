<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateDeliveryRulesTable.
 */
class CreateDeliveryRulesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__delivery_rules', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('delivery_id')->comment('配送模板id');
            $table->text('region')->comment('可配送区域(城市id集)');
            $table->decimal('first', 12, 2)->comment('首件(个)/首重(Kg)');
            $table->decimal('first_fee', 12, 2)->comment('运费(元)');

            $table->decimal('additional', 12, 2)->comment('续件/续重');
            $table->decimal('additional_fee', 12, 2)->comment('续费(元)');

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
		Schema::drop('shop__delivery_rules');
	}
}
