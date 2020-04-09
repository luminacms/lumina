<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreatePayTransactionRepeatsTable.
 */
class CreatePayTransactionRepeatsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment__transaction_repeats', function(Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('app_id')->nullable()->comment('应用ID');
            $table->uuid('transaction_id')->comment('交易号');
            $table->string('transaction_code')->comment('支付成功时，该笔交易的 code');
            $table->string('trade_no')->comment('第三方对应的交易号');
            $table->string('pay_driver')->comment('支付方式，可以用来识别支付，如：支付宝、微信、Paypal等');
            $table->bigInteger('total_fee')->comment('金额');
            $table->char('currency_code', 5)->comment('支付选择的币种，CNY、HKD、USD等');
            $table->timestamp('payment__at')->comment('第三方交易时间');
            $table->char('repeat_type', 15)->comment('重复类型：1同渠道支付、2不同渠道支付');

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
		Schema::drop('payment__transaction_repeats');
	}
}
