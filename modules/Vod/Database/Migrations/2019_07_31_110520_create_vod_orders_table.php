<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateVodOrdersTable.
 */
class CreateVodOrdersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vod__orders', function(Blueprint $table) {
            $table->increments('id');

            $table->char('order_id', 32);
            $table->createby();
            $table->char('type', 15)->nullable();
            $table->integer('model_id');

            $table->char('status', 15)->nullable();
            $table->decimal('price', 12, 2);
            $table->timestamp('expired_at');
            $table->timestamp('payed_at')->nullable();

            $table->ipAddress('created_at_ip');
            $table->org();
            $table->timestamps();

            $table->index('order_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vod__orders');
	}
}
