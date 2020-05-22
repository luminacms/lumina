<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateDeliveriesTable.
 */
class CreateDeliveriesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shop__deliveries', function(Blueprint $table) {
            $table->increments('id');

            $table->string('name')->comment('模板名称');
            $table->tinyInteger('type')->comment('计费方式：1按件数 2按重量');


            $table->softDeletes();
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
		Schema::drop('shop__deliveries');
	}
}
