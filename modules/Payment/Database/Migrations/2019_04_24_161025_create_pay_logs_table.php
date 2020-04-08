<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreatePayLogsTable.
 */
class CreatePayLogsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment__logs', function(Blueprint $table) {
			$table->bigIncrements('id');

			$table->string('request_id');
			
			$table->string('driver')->nullable();
			$table->string('gateway')->nullable();
			$table->string('endpoint')->nullable();

            $table->string('type')->comment('日志类型，payment:支付; refund:退款; notify:异步通知; return:同步通知; query:查询');

            $table->text('input')->nullable();
            $table->text('output')->nullable();

            $table->ipAddress('create_ip');

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
		Schema::drop('payment__logs');
	}
}
