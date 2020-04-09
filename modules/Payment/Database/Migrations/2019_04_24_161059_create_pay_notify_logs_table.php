<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreatePayNotifyLogsTable.
 */
class CreatePayNotifyLogsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment__notify_logs', function(Blueprint $table) {
            $table->increments('id');

            $table->string('app_id')->nullable()->comment('应用ID');
            $table->uuid('transaction_id');
            $table->string('pay_driver')->comment('支付方式，可以用来识别支付，如：支付宝、微信、Paypal等');
            $table->string('pay_channel')->comment('选择的支付渠道，比如：支付宝中的花呗、信用卡等');
            $table->string('transaction_code')->comment('支付成功时，该笔交易的 code');
            $table->string('sign_type')->comment('采用的签名方式：MD5 RSA RSA2 HASH-MAC等');
            $table->string('input_charset')->default('UTF-8');
            $table->bigInteger('total_fee')->default(0);
            $table->string('trade_no')->comment('第三方交易号');
            $table->timestamp('payment__at')->comment('支付时间');

            $table->char('type', 15)->comment('paid/refund/canceled');

            $table->status();
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
		Schema::drop('payment__notify_logs');
	}
}
